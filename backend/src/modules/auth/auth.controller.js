/**
 * Auth Controller
 * 
 * Handles HTTP requests for authentication endpoints.
 */

const authService = require('./auth.service');
const { successResponse, errorResponse } = require('../../utils/apiResponse');

class AuthController {
  /**
   * POST /auth/register
   */
  async register(req, res, next) {
    try {
      const result = await authService.register(req.body);
      return successResponse(res, result, 'Registration successful', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/login
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // #region agent log
      const fs = require('fs'); const path = require('path'); const logPath = path.join(process.cwd(), '.cursor', 'debug.log'); try { fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.controller.js:28', message: 'login controller called', data: { email, hasPassword: !!password }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'H' }) + '\n'); } catch (e) { }
      // #endregion
      const result = await authService.login(email, password);
      // #region agent log
      try { fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.controller.js:30', message: 'login service result', data: { hasUser: !!result.user, hasTokens: !!result.accessToken }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'I' }) + '\n'); } catch (e) { }
      // #endregion
      return successResponse(res, result, 'Login successful');
    } catch (error) {
      // #region agent log
      const fs = require('fs'); const path = require('path'); const logPath = path.join(process.cwd(), '.cursor', 'debug.log'); try { fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.controller.js:33', message: 'login controller error', data: { statusCode: error.statusCode, message: error.message }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'J' }) + '\n'); } catch (e) { }
      // #endregion
      next(error);
    }
  }

  /**
   * POST /auth/logout
   */
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.body;
      await authService.logout(req.user.id, refreshToken);
      return successResponse(res, null, 'Logged out successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/refresh
   */
  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const tokens = await authService.refreshToken(refreshToken);
      return successResponse(res, tokens, 'Token refreshed');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/forgot-password
   */
  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      await authService.forgotPassword(email);
      return successResponse(
        res,
        null,
        'If an account exists with this email, a 6-digit reset code was sent to your email.'
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/reset-password
   */
  async resetPassword(req, res, next) {
    try {
      const { token, password } = req.body;
      await authService.resetPassword(token, password);
      return successResponse(res, null, 'Password reset successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /auth/me
   */
  async getProfile(req, res, next) {
    try {
      const user = await authService.getProfile(req.user.id);
      return successResponse(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/verify-email
   */
  async verifyEmail(req, res, next) {
    try {
      const { email, code } = req.body;
      const result = await authService.verifyEmail(email, code);
      return successResponse(res, result, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /auth/resend-verification
   */
  async resendVerificationCode(req, res, next) {
    try {
      const { email } = req.body;
      const result = await authService.resendVerificationCode(email);
      return successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
