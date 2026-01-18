/**
 * Logger Utility
 * 
 * Simple logging utility with different log levels.
 * Can be extended to use Winston or other logging libraries.
 */

const config = require('../config');

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = config.env === 'production' ? 'info' : 'debug';

/**
 * Format log message with timestamp
 */
const formatMessage = (level, message, meta = {}) => {
  const timestamp = new Date().toISOString();
  const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
};

/**
 * Check if log level should be displayed
 */
const shouldLog = (level) => {
  return LOG_LEVELS[level] <= LOG_LEVELS[currentLevel];
};

const logger = {
  error: (message, meta = {}) => {
    if (shouldLog('error')) {
      console.error(formatMessage('error', message, meta));
    }
  },

  warn: (message, meta = {}) => {
    if (shouldLog('warn')) {
      console.warn(formatMessage('warn', message, meta));
    }
  },

  info: (message, meta = {}) => {
    if (shouldLog('info')) {
      console.info(formatMessage('info', message, meta));
    }
  },

  debug: (message, meta = {}) => {
    if (shouldLog('debug')) {
      console.log(formatMessage('debug', message, meta));
    }
  },
};

module.exports = logger;
