/**
 * Redis Configuration
 * 
 * Redis client setup for BullMQ background job processing.
 * Connection is optional - the app will work without Redis,
 * but background jobs will be disabled.
 */

const Redis = require('ioredis');
const config = require('./index');

let redis = null;
let isRedisConnected = false;

/**
 * Initialize Redis connection
 */
const initRedis = () => {
  // Skip Redis if explicitly disabled or not configured
  if (process.env.REDIS_DISABLED === 'true' || !config.redis.host) {
    return null;
  }

  try {
    redis = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password || undefined,
      maxRetriesPerRequest: null, // Required for BullMQ
      enableReadyCheck: false,
      lazyConnect: true, // Don't connect immediately
      retryStrategy: (times) => {
        if (times > 1) {
          // Silent fail - don't show warning
          return null; // Stop retrying
        }
        return Math.min(times * 200, 1000);
      },
    });

    redis.on('connect', () => {
      isRedisConnected = true;
      console.log('✅ Redis connected');
    });

    redis.on('error', (err) => {
      isRedisConnected = false;
      // Silent fail - don't show errors if connection refused
      if (err.code !== 'ECONNREFUSED' && err.code !== 'ENOTFOUND') {
        // Only show non-connection errors
      }
    });

    redis.on('close', () => {
      isRedisConnected = false;
    });

    // Try to connect, but fail silently
    redis.connect().catch(() => {
      // Silent fail
    });

    return redis;
  } catch (error) {
    // Silent fail
    return null;
  }
};

/**
 * Get Redis client instance
 */
const getRedis = () => redis;

/**
 * Check if Redis is connected
 */
const isConnected = () => isRedisConnected;

module.exports = {
  initRedis,
  getRedis,
  isConnected,
};
