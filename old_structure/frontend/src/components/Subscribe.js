import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = async (plan) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/subscriptions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan }),
      });

      if (!response.ok) {
        throw new Error('Failed to create subscription');
      }

      const { sessionId } = await response.json();
      // Redirect to Stripe Checkout
      window.location.href = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      features: [
        '5 reflections per month',
        'Basic analysis',
        'Email support',
      ],
    },
    {
      name: 'Pro',
      price: '$19.99',
      features: [
        'Unlimited reflections',
        'Advanced analysis',
        'Priority support',
        'Custom insights',
      ],
    },
  ];

  return (
    <div className="container">
      <h1>Choose Your Plan</h1>
      <div className="plans-container">
        {plans.map((plan) => (
          <div key={plan.name} className="plan-card">
            <h2>{plan.name}</h2>
            <div className="price">{plan.price}/month</div>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.name.toLowerCase())}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe; 