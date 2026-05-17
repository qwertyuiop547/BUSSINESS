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
  if (process.env.REDIS_DISABLED === 'true' || (!config.redis.url && !config.redis.host)) {
    return null;
  }

  try {
    // Use REDIS_URL if available (Render, Railway, etc.), otherwise use host/port
    const redisOptions = config.redis.url
      ? {
          maxRetriesPerRequest: null, // Required for BullMQ
          enableReadyCheck: false,
          lazyConnect: true,
          retryStrategy: (times) => {
            if (times > 1) return null;
            return Math.min(times * 200, 1000);
          },
        }
      : {
          host: config.redis.host,
          port: config.redis.port,
          password: config.redis.password || undefined,
          maxRetriesPerRequest: null, // Required for BullMQ
          enableReadyCheck: false,
          lazyConnect: true,
          retryStrategy: (times) => {
            if (times > 1) return null;
            return Math.min(times * 200, 1000);
          },
        };

    redis = config.redis.url
      ? new Redis(config.redis.url, redisOptions)
      : new Redis(redisOptions);

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
