/**
 * Rate Limiting Middleware
 * 
 * Prevents abuse by limiting requests per IP/user.
 * Optimized for high concurrent users.
 */

const rateLimit = require('express-rate-limit');
const config = require('../config');

/**
 * General API rate limiter - High capacity
 */
const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.maxRequests, // 500 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    // Use user ID if authenticated, otherwise use forwarded IP or direct IP
    return req.user?.id || req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  },
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

/**
 * Rate limiter for auth endpoints - Balanced for high traffic
 */
const authLimiter = rateLimit({
  windowMs: config.authRateLimit?.windowMs || 15 * 60 * 1000, // 15 minutes
  max: config.authRateLimit?.maxLoginAttempts || 30, // 30 attempts per window per IP
  message: {
    success: false,
    message: 'Too many login attempts. Please try again in a few minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // Only count failed requests
  keyGenerator: (req) => {
    // Use forwarded IP for proxy setups
    return req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  },
});

/**
 * Rate limiter for registration - Allow more registrations
 */
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: config.authRateLimit?.maxRegisterAttempts || 10, // 10 registrations per hour per IP
  message: {
    success: false,
    message: 'Too many registration attempts, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    return req.headers['x-forwarded-for']?.split(',')[0] || req.ip;
  },
});

/**
 * Rate limiter for order creation
 */
const orderLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 orders per minute (increased from 30)
  message: {
    success: false,
    message: 'Order limit reached, please wait before creating more orders.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.id || req.ip,
});

/**
 * Rate limiter for external API (resellers) - Higher limits
 */
const externalApiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 120, // 120 requests per minute (doubled)
  message: {
    success: false,
    error: 'rate_limit_exceeded',
    message: 'Too many API requests, please slow down.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.apiKey?.userId || req.ip,
});

/**
 * Lighter rate limiter for read-only endpoints
 */
const readOnlyLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  // Higher read capacity so dashboards/notifications won't trip global limits
  max: 2000, // 2000 requests per minute for read operations
  message: {
    success: false,
    message: 'Too many requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.user?.id || req.ip,
});

module.exports = {
  apiLimiter,
  authLimiter,
  registerLimiter,
  orderLimiter,
  externalApiLimiter,
  readOnlyLimiter,
  globalLimiter: apiLimiter,
};
