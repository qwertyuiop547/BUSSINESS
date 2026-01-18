/**
 * JWT Utilities
 * 
 * Token generation and verification helpers.
 */

const jwt = require('jsonwebtoken');
const config = require('../config');

/**
 * Generate access token (short-lived)
 * @param {Object} payload - Token payload
 */
const generateAccessToken = (payload) => {
  return jwt.sign(payload, config.jwt.accessSecret, {
    expiresIn: config.jwt.accessExpiresIn,
  });
};

/**
 * Generate refresh token (long-lived)
 * @param {Object} payload - Token payload
 */
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.jwt.refreshSecret, {
    expiresIn: config.jwt.refreshExpiresIn,
  });
};

/**
 * Verify access token
 * @param {string} token - JWT token
 */
const verifyAccessToken = (token) => {
  return jwt.verify(token, config.jwt.accessSecret);
};

/**
 * Verify refresh token
 * @param {string} token - JWT token
 */
const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.jwt.refreshSecret);
};

/**
 * Decode token without verification
 * @param {string} token - JWT token
 */
const decodeToken = (token) => {
  return jwt.decode(token);
};

/**
 * Generate token pair (access + refresh)
 * @param {Object} user - User object
 */
const generateTokens = (user) => {
  const payload = {
    userId: user.id,
    role: user.role,
  };

  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

/**
 * Get expiration time in milliseconds
 * @param {string} expiresIn - Express format (e.g., '7d', '15m')
 */
const getExpirationMs = (expiresIn) => {
  const units = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  const match = expiresIn.match(/^(\d+)([smhd])$/);
  if (!match) {
    return 7 * 24 * 60 * 60 * 1000; // Default 7 days
  }

  const [, value, unit] = match;
  return parseInt(value, 10) * units[unit];
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
  generateTokens,
  getExpirationMs,
};
