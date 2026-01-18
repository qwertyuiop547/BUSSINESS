/**
 * Authentication Middleware
 * 
 * Verifies JWT access tokens and attaches user to request.
 */

const jwt = require('jsonwebtoken');
const config = require('../config');
const { prisma } = require('../config/database');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Authenticate user via JWT access token
 */
const authenticate = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Access token required', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.accessSecret);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return errorResponse(res, 'Access token expired', 401);
      }
      return errorResponse(res, 'Invalid access token', 401);
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        status: true,
        balance: true,
        createdAt: true,
      },
    });

    if (!user) {
      return errorResponse(res, 'User not found', 401);
    }

    // Check if user is banned
    if (user.status === 'BANNED') {
      return errorResponse(res, 'Account is banned', 403);
    }

    if (user.status === 'SUSPENDED') {
      return errorResponse(res, 'Account is suspended', 403);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return errorResponse(res, 'Authentication failed', 500);
  }
};

/**
 * Optional authentication - doesn't fail if no token
 */
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, config.jwt.accessSecret);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          status: true,
          balance: true,
        },
      });

      if (user && user.status === 'ACTIVE') {
        req.user = user;
      }
    } catch {
      // Token invalid, continue without user
    }

    next();
  } catch (error) {
    next();
  }
};

module.exports = {
  authenticate,
  optionalAuth,
};
