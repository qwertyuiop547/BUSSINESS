/**
 * Redis Cache Utility
 * 
 * Provides caching layer for frequently accessed data to improve performance
 * and reduce database load under high traffic.
 */

const { getRedis, isConnected } = require('../config/redis');

const DEFAULT_TTL = 300; // 5 minutes default cache time

/**
 * Get cached value
 */
async function get(key) {
  if (!isConnected()) return null;
  
  try {
    const redis = getRedis();
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error.message);
    return null; // Fail silently, return null if cache fails
  }
}

/**
 * Set cached value with TTL
 */
async function set(key, value, ttl = DEFAULT_TTL) {
  if (!isConnected()) return false;
  
  try {
    const redis = getRedis();
    await redis.setex(key, ttl, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error.message);
    return false; // Fail silently
  }
}

/**
 * Delete cached value
 */
async function del(key) {
  if (!isConnected()) return false;
  
  try {
    const redis = getRedis();
    await redis.del(key);
    return true;
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error.message);
    return false;
  }
}

/**
 * Delete multiple keys by pattern
 */
async function delPattern(pattern) {
  if (!isConnected()) return false;
  
  try {
    const redis = getRedis();
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return true;
  } catch (error) {
    console.error(`Cache delete pattern error for ${pattern}:`, error.message);
    return false;
  }
}

/**
 * Cache wrapper - executes function and caches result
 */
async function cache(key, fn, ttl = DEFAULT_TTL) {
  // Try to get from cache first
  const cached = await get(key);
  if (cached !== null) {
    return cached;
  }
  
  // Execute function and cache result
  const result = await fn();
  await set(key, result, ttl);
  return result;
}

/**
 * Invalidate user-related caches
 */
async function invalidateUser(userId) {
  await Promise.all([
    del(`user:${userId}`),
    del(`user:profile:${userId}`),
    del(`user:stats:${userId}`),
    del(`user:balance:${userId}`),
  ]);
}

/**
 * Invalidate all user caches (when needed)
 */
async function invalidateAllUsers() {
  await delPattern('user:*');
}

/**
 * Cache keys
 */
const CacheKeys = {
  user: (userId) => `user:${userId}`,
  userProfile: (userId) => `user:profile:${userId}`,
  userStats: (userId) => `user:stats:${userId}`,
  userBalance: (userId) => `user:balance:${userId}`,
  services: () => 'services:all',
  servicesByCategory: (categoryId) => `services:category:${categoryId}`,
  service: (serviceId) => `service:${serviceId}`,
  categories: () => 'categories:all',
  orders: (userId, page, status) => `orders:${userId}:${page}:${status || 'all'}`,
  topUps: (userId, page) => `topups:${userId}:${page}`,
};

module.exports = {
  get,
  set,
  del,
  delPattern,
  cache,
  invalidateUser,
  invalidateAllUsers,
  CacheKeys,
  DEFAULT_TTL,
};

