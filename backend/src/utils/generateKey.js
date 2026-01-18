/**
 * Key Generation Utilities
 * 
 * Generates secure random keys for API keys and tokens.
 */

const crypto = require('crypto');

/**
 * Generate a random API key
 * @param {string} prefix - Key prefix (e.g., 'sk_live_')
 * @param {number} length - Length of random part
 */
const generateApiKey = (prefix = 'sk_live_', length = 32) => {
  const randomPart = crypto.randomBytes(length).toString('hex');
  return `${prefix}${randomPart}`;
};

/**
 * Generate a random token
 * @param {number} length - Length in bytes
 */
const generateToken = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

/**
 * Generate a short random ID
 * @param {number} length - Length of ID
 */
const generateShortId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  
  return result;
};

/**
 * Generate a password reset code (6 digits)
 */
const generateResetCode = () => {
  // 000000 - 999999
  return String(crypto.randomInt(0, 1000000)).padStart(6, '0');
};

module.exports = {
  generateApiKey,
  generateToken,
  generateShortId,
  generateResetCode,
};
