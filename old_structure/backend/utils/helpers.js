const { HTTP_STATUS, ERROR_MESSAGES } = require('./constants');
const logger = require('./logger');

const handleError = (error, res) => {
  logger.error(error);

  if (error.name === 'ValidationError') {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      error: {
        message: ERROR_MESSAGES.INVALID_INPUT,
        details: error.message,
      },
    });
  }

  if (error.name === 'UnauthorizedError') {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      error: {
        message: ERROR_MESSAGES.UNAUTHORIZED,
      },
    });
  }

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    error: {
      message: ERROR_MESSAGES.SERVER_ERROR,
    },
  });
};

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const formatDate = (date) => {
  return new Date(date).toISOString();
};

const generateRandomString = (length = 10) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const sanitizeObject = (obj, allowedFields) => {
  const sanitized = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) {
      sanitized[key] = obj[key];
    }
  });
  return sanitized;
};

module.exports = {
  handleError,
  validateEmail,
  formatDate,
  generateRandomString,
  sanitizeObject,
}; 