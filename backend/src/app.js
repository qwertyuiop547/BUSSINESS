/**
 * Express Application
 * 
 * Main Express app configuration and middleware setup.
 */

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const config = require('./config');
const corsConfig = require('./config/cors');
const { errorHandler } = require('./middleware/errorHandler');
const { globalLimiter, readOnlyLimiter } = require('./middleware/rateLimiter');
const { maintenanceMode, getMaintenanceStatusHandler } = require('./middleware/maintenance');
const routes = require('./routes');
const logger = require('./utils/logger');

// Create Express app
const app = express();

// Security middleware - configure helmet to allow images
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false, // Disable CSP for development, or configure properly for images
}));

// CORS
app.use(cors(corsConfig));

// Compression - Optimized for high traffic
app.use(compression({
  level: 6, // Balance between compression and CPU usage
  threshold: 1024, // Only compress responses > 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    // Use compression for JSON and text responses
    return compression.filter(req, res);
  },
}));

// Request parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging - Optimized for high traffic
const isDev = config.isDevelopment || config.env === 'development';
if (isDev) {
  app.use(morgan('dev'));
} else {
  // Use 'tiny' format in production for less overhead
  app.use(morgan('tiny', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
    skip: (req) => {
      // Skip logging for health checks and static files
      return req.path === '/health' || req.path.startsWith('/uploads');
    },
  }));
}

// Global rate limiting (exclude auth routes as they have their own limiter)
// Separate GET/HEAD read traffic from write traffic so dashboards don't block updates.
app.use((req, res, next) => {
  // Skip global limiter for auth routes
  if (req.path.startsWith('/api/v1/auth')) {
    return next();
  }
  if (req.method === 'GET' || req.method === 'HEAD') {
    return readOnlyLimiter(req, res, next);
  }
  return globalLimiter(req, res, next);
});

// Serve uploaded files with CORS headers
app.use('/uploads', (req, res, next) => {
  // Add CORS headers for static files
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}, express.static(path.join(__dirname, '../uploads')));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.nodeEnv,
  });
});

// Maintenance status check (public endpoint)
app.get('/api/v1/public/maintenance', getMaintenanceStatusHandler);

// Maintenance mode middleware (applied before routes)
// Note: This runs AFTER auth middleware on protected routes
app.use('/api', maintenanceMode);

// API routes
app.use('/api', routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Error handler
app.use(errorHandler);

module.exports = app;
