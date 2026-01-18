/**
 * SMB Panel API Server Entry Point
 * 
 * This is the main entry point for the Express server.
 * Supports clustering for production environments to handle high traffic.
 */

require('dotenv').config();
const cluster = require('cluster');
const os = require('os');
const app = require('./src/app');
const { prisma } = require('./src/config/database');
const { initRedis } = require('./src/config/redis');
const config = require('./src/config');

// Import worker for background job processing
// Only start worker in single instance mode or in primary cluster process
let backgroundWorker = null;

const PORT = process.env.PORT || 5000;
const ENABLE_CLUSTER = process.env.ENABLE_CLUSTER === 'true';
const NUM_WORKERS = parseInt(process.env.WORKERS, 10) || os.cpus().length;

// Graceful shutdown handler
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  
  // Close database connection
  await prisma.$disconnect();
  console.log('Database connection closed.');
  
  process.exit(0);
};

// Start single server instance
const startServer = async () => {
  try {
    // Initialize Redis for caching (optional, fails gracefully if not available)
    initRedis();
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    // Start background worker for order processing (only in single instance or primary)
    if (!ENABLE_CLUSTER || cluster.isPrimary) {
      try {
        // Only require worker if Redis is available
        if (process.env.REDIS_DISABLED !== 'true') {
          require('./src/jobs/worker');
          console.log('✅ Background worker started for order processing');
        } else {
          console.log('⚠️  Redis disabled - background worker not started');
          console.log('⚠️  Order status updates will need manual processing');
        }
      } catch (workerError) {
        console.warn('⚠️  Failed to start background worker:', workerError.message);
        console.warn('⚠️  Order processing will still work, but status updates may be delayed');
      }
    }

    // Optimize server for high traffic
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      if (cluster.isWorker) {
        console.log(`👷 Worker ${process.pid} started`);
      } else if (!ENABLE_CLUSTER) {
        console.log(`⚠️  Clustering disabled - limited to ~1,000-2,000 users`);
        console.log(`💡 Enable clustering: Set ENABLE_CLUSTER=true in .env`);
      }
    });

    // Increase server limits for high traffic
    server.maxConnections = 10000;
    server.keepAliveTimeout = 65000; // Slightly higher than ALB idle timeout
    server.headersTimeout = 66000;

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

    // Handle uncaught errors gracefully
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      // Give time to log the error, then exit
      setTimeout(() => process.exit(1), 1000);
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Cluster mode for production (handles more concurrent connections)
if (ENABLE_CLUSTER && cluster.isPrimary) {
  console.log(`🔧 Master ${process.pid} is running`);
  console.log(`🔧 Starting ${NUM_WORKERS} workers for high traffic...`);
  console.log(`📊 Expected capacity: ~${NUM_WORKERS * 2000}-${NUM_WORKERS * 4000} concurrent users`);

  // Fork workers
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }

  // Handle worker deaths
  cluster.on('exit', (worker, code, signal) => {
    console.log(`👷 Worker ${worker.process.pid} died (${signal || code}). Restarting...`);
    cluster.fork();
  });

  // Handle master shutdown
  process.on('SIGTERM', () => {
    console.log('Master received SIGTERM. Shutting down workers...');
    for (const id in cluster.workers) {
      cluster.workers[id].process.kill('SIGTERM');
    }
  });

} else {
  // Single instance mode (development) or worker in cluster mode
  startServer();
}
