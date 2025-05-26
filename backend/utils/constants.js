module.exports = {
  // API Routes
  ROUTES: {
    REFLECTIONS: '/api/reflections',
    PEOPLE: '/api/people',
    AUTH: '/api/auth',
    SUBSCRIPTIONS: '/api/subscriptions',
    DEMO: '/api/demo',
  },

  // HTTP Status Codes
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },

  // Subscription Plans
  SUBSCRIPTION_PLANS: {
    BASIC: {
      id: 'price_basic',
      name: 'Basic',
      price: 9.99,
      features: ['5 reflections per month', 'Basic analysis', 'Email support'],
    },
    PRO: {
      id: 'price_pro',
      name: 'Pro',
      price: 19.99,
      features: ['Unlimited reflections', 'Advanced analysis', 'Priority support', 'Custom insights'],
    },
  },

  // Error Messages
  ERROR_MESSAGES: {
    INVALID_INPUT: 'Invalid input provided',
    UNAUTHORIZED: 'Unauthorized access',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Internal server error',
    SUBSCRIPTION_REQUIRED: 'Subscription required for this feature',
  },

  // Database Tables
  TABLES: {
    REFLECTIONS: 'reflections',
    PEOPLE: 'people',
    SUBSCRIPTIONS: 'subscriptions',
    USERS: 'users',
  },
}; 