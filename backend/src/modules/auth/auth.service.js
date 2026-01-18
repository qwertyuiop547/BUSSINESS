/**
 * Auth Service
 * 
 * Business logic for authentication operations.
 * Optimized for high concurrent users with transactions.
 */

const { prisma } = require('../../config/database');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { generateTokens, verifyRefreshToken, getExpirationMs } = require('../../utils/jwt');
const crypto = require('crypto');
const { generateResetCode } = require('../../utils/generateKey');
const config = require('../../config');
const notificationService = require('../notification/notification.service');
const { sendMail } = require('../../utils/mailer');

class AuthService {
  /**
   * Register a new user - With email verification
   */
  async register(data) {
    const { email, username, password } = data;

    // Hash password first (CPU intensive, do before transaction)
    const hashedPassword = await hashPassword(password);

    // Generate 6-digit verification code
    const verifyCode = generateResetCode();
    const verifyExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Use transaction for atomic operations
    const result = await prisma.$transaction(async (tx) => {
      // Check if email exists
      const existingEmail = await tx.user.findUnique({
        where: { email },
        select: { id: true, emailVerified: true },
      });
      if (existingEmail) {
        throw { statusCode: 409, message: 'Email already registered' };
      }

      // Check if username exists
      const existingUsername = await tx.user.findUnique({
        where: { username },
        select: { id: true },
      });
      if (existingUsername) {
        throw { statusCode: 409, message: 'Username already taken' };
      }

      // Create user with emailVerified = false
      const user = await tx.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
          role: 'USER',
          status: 'ACTIVE',
          balance: 0,
          emailVerified: false,
          emailVerifyCode: crypto.createHash('sha256').update(verifyCode).digest('hex'),
          emailVerifyExpiry: verifyExpiry,
        },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          status: true,
          emailVerified: true,
          createdAt: true,
        },
      });

      return { user };
    }, {
      maxWait: 5000,
      timeout: 10000,
    });

    // Send verification email (non-blocking)
    setImmediate(async () => {
      try {
        const subject = 'Verify your SMB Panel account';
        const text = `Your verification code is: ${verifyCode}\n\nThis code will expire in 15 minutes.`;
        const html = `
          <div style="font-family:Arial,sans-serif;line-height:1.5">
            <h2 style="margin:0 0 8px 0">Welcome to SMB Panel!</h2>
            <p style="margin:0 0 12px 0">Use this code to verify your email:</p>
            <div style="font-size:32px;font-weight:700;letter-spacing:8px;margin:16px 0;padding:16px 24px;background:#f3f4f6;border-radius:8px;display:inline-block">
              ${verifyCode}
            </div>
            <p style="margin:12px 0 0 0;color:#6b7280">This code expires in 15 minutes.</p>
          </div>
        `;
        await sendMail({ to: email, subject, text, html });
      } catch (err) {
        console.error('Failed to send verification email:', err.message);
      }
    });

    // Return user without tokens (they need to verify first)
    return {
      user: result.user,
      message: 'Registration successful! Please check your email for verification code.',
      requiresVerification: true,
    };
  }

  /**
   * Verify email with code
   */
  async verifyEmail(email, code) {
    const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

    const user = await prisma.user.findFirst({
      where: {
        email,
        emailVerifyCode: hashedCode,
        emailVerifyExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw { statusCode: 400, message: 'Invalid or expired verification code' };
    }

    // Mark email as verified
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerifyCode: null,
        emailVerifyExpiry: null,
      },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        balance: true,
        profilePicture: true,
        emailVerified: true,
      },
    });

    // Generate tokens now that email is verified
    const tokens = generateTokens(updatedUser);

    // Save refresh token
    const expiresAt = new Date(
      Date.now() + getExpirationMs(config.jwt.refreshExpiresIn)
    );
    await prisma.refreshToken.create({
      data: {
        userId: updatedUser.id,
        token: tokens.refreshToken,
        expiresAt,
      },
    });

    // Send welcome notification
    setImmediate(async () => {
      try {
        await notificationService.createNotification({
          userId: updatedUser.id,
          type: 'SYSTEM_ANNOUNCEMENT',
          title: 'Welcome to SMB Panel!',
          message: 'Your email is verified. Explore our services and start growing your social presence today.',
          link: '/dashboard',
        });
      } catch (error) {
        console.error('Failed to send welcome notification:', error);
      }
    });

    return { user: updatedUser, ...tokens };
  }

  /**
   * Resend verification code
   */
  async resendVerificationCode(email) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerified: true },
    });

    if (!user) {
      // Don't reveal if user exists
      return { message: 'If the email exists, a new code has been sent.' };
    }

    if (user.emailVerified) {
      throw { statusCode: 400, message: 'Email is already verified' };
    }

    // Generate new code
    const verifyCode = generateResetCode();
    const verifyExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifyCode: crypto.createHash('sha256').update(verifyCode).digest('hex'),
        emailVerifyExpiry: verifyExpiry,
      },
    });

    // Send email
    setImmediate(async () => {
      try {
        const subject = 'Your new SMB Panel verification code';
        const html = `
          <div style="font-family:Arial,sans-serif;line-height:1.5">
            <h2 style="margin:0 0 8px 0">New Verification Code</h2>
            <p style="margin:0 0 12px 0">Use this code to verify your email:</p>
            <div style="font-size:32px;font-weight:700;letter-spacing:8px;margin:16px 0;padding:16px 24px;background:#f3f4f6;border-radius:8px;display:inline-block">
              ${verifyCode}
            </div>
            <p style="margin:12px 0 0 0;color:#6b7280">This code expires in 15 minutes.</p>
          </div>
        `;
        await sendMail({ to: email, subject, text: `Your code: ${verifyCode}`, html });
      } catch (err) {
        console.error('Failed to send verification email:', err.message);
      }
    });

    return { message: 'If the email exists, a new code has been sent.' };
  }

  /**
   * Login user - Optimized with parallel operations
   */
  async login(email, password) {
    // #region agent log
    const fs = require('fs'); const path = require('path'); const logPath = path.join(process.cwd(), '.cursor', 'debug.log'); try { fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.service.js:111', message: 'login service called', data: { email, hasPassword: !!password }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'K' }) + '\n'); } catch (e) { }
    // #endregion
    // Find user with only necessary fields
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        username: true,
        password: true,
        role: true,
        status: true,
        balance: true,
        profilePicture: true,
        emailVerified: true,
      },
    });

    // #region agent log
    try { fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.service.js:127', message: 'user lookup result', data: { userFound: !!user, status: user?.status }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'L' }) + '\n'); } catch (e) { }
    // #endregion

    if (!user) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.password);
    // #region agent log
    try { fs.appendFileSync(logPath, JSON.stringify({ location: 'auth.service.js:133', message: 'password check result', data: { isValidPassword }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'M' }) + '\n'); } catch (e) { }
    // #endregion
    if (!isValidPassword) {
      throw { statusCode: 401, message: 'Invalid email or password' };
    }

    // Check user status
    if (user.status === 'BANNED') {
      throw { statusCode: 403, message: 'Account is banned' };
    }
    if (user.status === 'SUSPENDED') {
      throw { statusCode: 403, message: 'Account is suspended' };
    }

    // Check email verification
    if (!user.emailVerified) {
      throw {
        statusCode: 403,
        message: 'Email not verified. Please check your email for verification code.',
        requiresVerification: true,
        email: user.email
      };
    }

    // Generate tokens
    const tokens = generateTokens(user);

    // Prepare refresh token data
    const expiresAt = new Date(
      Date.now() + getExpirationMs(config.jwt.refreshExpiresIn)
    );

    // Run update and token save in parallel (non-blocking)
    await Promise.all([
      // Update last login (fire and forget pattern for non-critical)
      prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      }).catch(() => { }), // Ignore errors for lastLoginAt

      // Save refresh token
      prisma.refreshToken.create({
        data: {
          userId: user.id,
          token: tokens.refreshToken,
          expiresAt,
        },
      }),
    ]);

    // Return user data (without password)
    const userData = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      status: user.status,
      balance: user.balance,
      profilePicture: user.profilePicture,
    };

    return { user: userData, ...tokens };
  }

  /**
   * Logout user (invalidate refresh token)
   */
  async logout(userId, refreshToken) {
    if (refreshToken) {
      await prisma.refreshToken.deleteMany({
        where: {
          userId,
          token: refreshToken,
        },
      });
    }
    return true;
  }

  /**
   * Refresh access token
   */
  async refreshToken(token) {
    // Verify refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(token);
    } catch {
      throw { statusCode: 401, message: 'Invalid refresh token' };
    }

    // Check if token exists in database
    const storedToken = await prisma.refreshToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!storedToken) {
      throw { statusCode: 401, message: 'Refresh token not found' };
    }

    // Check if token is expired
    if (new Date() > storedToken.expiresAt) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      throw { statusCode: 401, message: 'Refresh token expired' };
    }

    // Check user status
    if (storedToken.user.status !== 'ACTIVE') {
      throw { statusCode: 403, message: 'Account is not active' };
    }

    // Generate new tokens
    const tokens = generateTokens(storedToken.user);

    // Delete old token and save new one
    await prisma.refreshToken.delete({ where: { id: storedToken.id } });
    await this.saveRefreshToken(storedToken.userId, tokens.refreshToken);

    return tokens;
  }

  /**
   * Request password reset
   */
  async forgotPassword(email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Don't reveal if user exists
    // Generate reset code (always generate to keep timing consistent)
    const resetCode = generateResetCode();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    if (user) {
      // Store hashed code in DB (never store raw code)
      const hashed = crypto.createHash('sha256').update(resetCode).digest('hex');
      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: hashed,
          resetTokenExpiry,
        },
      });

      // Send code to Gmail (SMTP). Do not return code via API.
      // Keep message simple; no sensitive user data.
      const subject = 'Your SMB Panel password reset code';
      const text = `Your password reset code is: ${resetCode}\n\nThis code will expire in 1 hour.\nIf you did not request this, you can ignore this email.`;
      const html = `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2 style="margin:0 0 8px 0">Password reset code</h2>
          <p style="margin:0 0 12px 0">Use this code to reset your password:</p>
          <div style="font-size:24px;font-weight:700;letter-spacing:6px;margin:12px 0;padding:12px 16px;border:1px solid #e5e7eb;border-radius:8px;display:inline-block">
            ${resetCode}
          </div>
          <p style="margin:12px 0 0 0;color:#6b7280">This code expires in 1 hour.</p>
          <p style="margin:12px 0 0 0;color:#6b7280">If you did not request this, you can ignore this email.</p>
        </div>
      `;

      // Non-blocking email send (avoid slowing API)
      setImmediate(async () => {
        try {
          await sendMail({ to: email, subject, text, html });
        } catch (err) {
          // Intentionally do not leak email errors to caller; log for server admin.
          console.error('Failed to send reset code email:', err.message);
        }
      });
    }

    return true;
  }

  /**
   * Reset password with token
   */
  async resetPassword(token, newPassword) {
    const hashed = crypto.createHash('sha256').update(token).digest('hex');
    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashed,
        resetTokenExpiry: { gt: new Date() },
      },
    });

    if (!user) {
      throw { statusCode: 400, message: 'Invalid or expired reset token' };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // Invalidate all refresh tokens
    await prisma.refreshToken.deleteMany({
      where: { userId: user.id },
    });

    return true;
  }

  /**
   * Get current user profile (lightweight, optimized query)
   */
  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        balance: true,
        profilePicture: true,
        createdAt: true,
        lastLoginAt: true,
        updatedAt: true,
        _count: {
          select: {
            orders: true,
            tickets: true,
            apiKeys: true,
          },
        },
      },
    });

    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    return user;
  }

  /**
   * Save refresh token to database
   */
  async saveRefreshToken(userId, token) {
    const expiresAt = new Date(
      Date.now() + getExpirationMs(config.jwt.refreshExpiresIn)
    );

    await prisma.refreshToken.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  }

  /**
   * Clean up expired refresh tokens
   */
  async cleanupExpiredTokens() {
    await prisma.refreshToken.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  }
}

module.exports = new AuthService();
