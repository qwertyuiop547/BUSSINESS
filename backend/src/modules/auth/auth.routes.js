/**
 * Auth Routes
 * 
 * Authentication API endpoints.
 */

const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const { authenticate } = require('../../middleware/auth');
const { validateBody } = require('../../middleware/validate');
const { authLimiter, registerLimiter } = require('../../middleware/rateLimiter');
const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('./auth.schema');

// Public routes
router.post(
  '/register',
  registerLimiter,
  validateBody(registerSchema),
  authController.register
);

router.post(
  '/login',
  authLimiter,
  validateBody(loginSchema),
  authController.login
);

router.post(
  '/refresh',
  validateBody(refreshTokenSchema),
  authController.refreshToken
);

router.post(
  '/forgot-password',
  authLimiter,
  validateBody(forgotPasswordSchema),
  authController.forgotPassword
);

router.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  authController.resetPassword
);

router.post(
  '/verify-email',
  authLimiter,
  authController.verifyEmail
);

router.post(
  '/resend-verification',
  authLimiter,
  authController.resendVerificationCode
);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.get('/me', authenticate, authController.getProfile);

module.exports = router;
