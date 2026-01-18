/**
 * Prisma Database Client
 * 
 * Singleton pattern to ensure only one Prisma client instance
 * is created throughout the application lifecycle.
 * Optimized for high concurrent connections.
 */

const { PrismaClient } = require('@prisma/client');

// Create Prisma client with optimized settings for high traffic
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['warn', 'error'] // Reduced logging for better performance
    : ['error'],
  // Connection pool settings are configured in DATABASE_URL
  // Example: postgresql://user:pass@host:5432/db?connection_limit=20&pool_timeout=30
  // For production with clustering: connection_limit should be 20 per worker
  // 4 workers × 20 connections = 80 total connections (good for 5,000+ users)
});

// Handle connection errors gracefully
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected');
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err.message);
  });

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = { prisma };
