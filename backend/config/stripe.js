const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const logger = require('../utils/logger');

const createSubscription = async (customerId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
  } catch (error) {
    logger.error('Error creating subscription:', error);
    throw error;
  }
};

const createCheckoutSession = async (priceId) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscribe`,
    });

    return session;
  } catch (error) {
    logger.error('Error creating checkout session:', error);
    throw error;
  }
};

const handleWebhook = async (payload, sig) => {
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        // Handle subscription events
        break;
      case 'customer.subscription.deleted':
        // Handle subscription cancellation
        break;
      default:
        logger.info(`Unhandled event type: ${event.type}`);
    }

    return event;
  } catch (error) {
    logger.error('Error handling webhook:', error);
    throw error;
  }
};

module.exports = {
  createSubscription,
  createCheckoutSession,
  handleWebhook,
}; 