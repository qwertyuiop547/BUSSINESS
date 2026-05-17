/**
 * Application Configuration
 * 
 * Centralized configuration management using environment variables.
 * Optimized for high concurrent users.
 */

const config = {
  // Server
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',

  // Database
  databaseUrl: process.env.DATABASE_URL,

  // JWT
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET || 'default-access-secret',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'default-refresh-secret',
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },

  // Redis (optional - set REDIS_DISABLED=true to disable)
  redis: {
    url: process.env.REDIS_URL || null, // Full URL (used by Render, Railway, etc.)
    host: process.env.REDIS_DISABLED === 'true' ? null : (process.env.REDIS_HOST || 'localhost'),
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // CORS
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Email (SMTP) - used for password reset codes
  email: {
    provider: process.env.EMAIL_PROVIDER || 'gmail',
    smtpHost: process.env.SMTP_HOST || 'smtp.gmail.com',
    smtpPort: parseInt(process.env.SMTP_PORT, 10) || 465,
    smtpSecure: (process.env.SMTP_SECURE || 'true') === 'true',
    smtpUser: process.env.SMTP_USER || '',
    smtpPass: process.env.SMTP_PASS || '', // Gmail App Password recommended
    fromEmail: process.env.EMAIL_FROM || process.env.SMTP_USER || '',
    fromName: process.env.EMAIL_FROM_NAME || 'SMB Panel',
  },

  // Rate Limiting - Optimized for high traffic
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 500, // Increased from 100
  },

  // Auth Rate Limiting - Separate config for auth endpoints
  authRateLimit: {
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // 15 minutes
    maxLoginAttempts: parseInt(process.env.AUTH_MAX_LOGIN_ATTEMPTS, 10) || 30, // Per IP
    maxRegisterAttempts: parseInt(process.env.AUTH_MAX_REGISTER_ATTEMPTS, 10) || 10, // Per IP per hour
  },

  // Pagination defaults - Optimized to prevent large queries
  pagination: {
    defaultLimit: 500, // Increased for services list
    maxLimit: 10000, // Maximum items per page (increased for all services)
    maxOrderLimit: 50, // Maximum orders per page (most critical)
  },

  // Scalability settings
  scalability: {
    // Enable clustering (for production)
    enableCluster: process.env.ENABLE_CLUSTER === 'true',
    // Number of workers (0 = auto based on CPU cores)
    workers: parseInt(process.env.WORKERS, 10) || 0,
  },
};

module.exports = config;
