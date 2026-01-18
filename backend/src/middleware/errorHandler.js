/**
 * Global Error Handler Middleware
 * 
 * Catches all errors and returns consistent error responses.
 */

const config = require('../config');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Not Found handler (404)
 */
const notFoundHandler = (req, res) => {
  return errorResponse(res, `Route ${req.method} ${req.originalUrl} not found`, 404);
};

/**
 * Global error handler
 */
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Prisma errors
  if (err.code) {
    switch (err.code) {
      case 'P2002':
        return errorResponse(res, 'A record with this value already exists', 409);
      case 'P2025':
        return errorResponse(res, 'Record not found', 404);
      case 'P2003':
        return errorResponse(res, 'Related record not found', 400);
      default:
        break;
    }
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Invalid token', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Token expired', 401);
  }

  // Validation errors
  if (err.name === 'ZodError') {
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    return errorResponse(res, 'Validation failed', 400, errors);
  }

  // Syntax errors (invalid JSON)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return errorResponse(res, 'Invalid JSON', 400);
  }

  // Custom application errors
  if (err.statusCode) {
    return errorResponse(res, err.message, err.statusCode);
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = config.env === 'production' 
    ? 'Internal server error' 
    : err.message || 'Internal server error';

  return errorResponse(res, message, statusCode);
};

module.exports = {
  notFoundHandler,
  errorHandler,
};
