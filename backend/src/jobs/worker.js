/**
 * BullMQ Worker for Background Jobs
 */

const { Worker, Queue } = require('bullmq');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

const redisConnection = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
};

// Order Processing Worker
const orderWorker = new Worker(
  'order-processing',
  async (job) => {
    const { orderId } = job.data;
    console.log(`Processing order: ${orderId}`);

    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          service: {
            include: {
              apiProvider: true,
            },
          },
        },
      });

      if (!order) {
        throw new Error('Order not found');
      }

      if (order.status !== 'PENDING') {
        console.log(`Order ${orderId} is not pending, skipping`);
        return;
      }

      // Check if service has an API provider
      if (order.service.apiProvider && order.service.apiServiceId) {
        const provider = order.service.apiProvider;

        // Send order to external provider
        const response = await axios.post(provider.apiUrl, {
          key: provider.apiKey,
          action: 'add',
          service: order.service.apiServiceId,
          link: order.link,
          quantity: order.quantity,
        });

        if (response.data.order) {
          await prisma.order.update({
            where: { id: orderId },
            data: {
              status: 'PROCESSING',
              providerOrderId: response.data.order.toString(),
            },
          });
          console.log(`Order ${orderId} submitted to provider`);
        } else {
          throw new Error(response.data.error || 'Provider error');
        }
      } else {
        // Manual order - just mark as processing
        await prisma.order.update({
          where: { id: orderId },
          data: { status: 'PROCESSING' },
        });
      }
    } catch (error) {
      console.error(`Error processing order ${orderId}:`, error.message);
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'FAILED',
          statusNote: error.message,
        },
      });
      throw error;
    }
  },
  { connection: redisConnection }
);

// Order Status Check Worker
const statusWorker = new Worker(
  'order-status-check',
  async (job) => {
    const { orderId } = job.data;
    console.log(`Checking status for order: ${orderId}`);

    try {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          service: {
            include: {
              apiProvider: true,
            },
          },
        },
      });

      if (!order || !order.providerOrderId) {
        return;
      }

      const provider = order.service.apiProvider;
      if (!provider) return;

      const response = await axios.post(provider.apiUrl, {
        key: provider.apiKey,
        action: 'status',
        order: order.providerOrderId,
      });

      const statusData = response.data;

      // Map provider status to our status
      let newStatus = order.status;
      if (statusData.status === 'Completed') {
        newStatus = 'COMPLETED';
      } else if (statusData.status === 'In progress') {
        newStatus = 'IN_PROGRESS';
      } else if (statusData.status === 'Partial') {
        newStatus = 'PARTIAL';
      } else if (statusData.status === 'Canceled') {
        newStatus = 'CANCELED';
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: newStatus,
          startCount: statusData.start_count ? parseInt(statusData.start_count) : order.startCount,
          remains: statusData.remains ? parseInt(statusData.remains) : order.remains,
        },
      });

      console.log(`Order ${orderId} status updated to ${newStatus}`);
    } catch (error) {
      console.error(`Error checking status for order ${orderId}:`, error.message);
    }
  },
  { connection: redisConnection }
);

// Schedule periodic status checks
const statusQueue = new Queue('order-status-check', { connection: redisConnection });
const orderQueue = new Queue('order-processing', { connection: redisConnection });

const scheduleStatusChecks = async () => {
  // Check processing orders every 5 minutes
  setInterval(async () => {
    try {
      const orders = await prisma.order.findMany({
        where: {
          status: { in: ['PROCESSING', 'IN_PROGRESS'] },
          providerOrderId: { not: null },
        },
        take: 100,
      });

      for (const order of orders) {
        await statusQueue.add('check-status', { orderId: order.id });
      }

      console.log(`Scheduled status check for ${orders.length} orders`);
    } catch (error) {
      console.error('Error scheduling status checks:', error.message);
    }
  }, 5 * 60 * 1000); // 5 minutes
};

// Schedule periodic retry for pending orders (every 2 minutes)
const schedulePendingOrderRetry = async () => {
  setInterval(async () => {
    try {
      // Find PENDING orders that are older than 1 minute (to avoid retrying immediately)
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      const pendingOrders = await prisma.order.findMany({
        where: {
          status: 'PENDING',
          createdAt: { lt: oneMinuteAgo },
        },
        include: {
          service: {
            include: {
              apiProvider: true,
            },
          },
        },
        take: 50, // Process in batches
      });

      for (const order of pendingOrders) {
        // Only retry if service has provider configured
        if (order.service?.apiProvider && order.service?.apiServiceId) {
          await orderQueue.add('process-order', { orderId: order.id }, {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 5000,
            },
          });
        }
      }

      if (pendingOrders.length > 0) {
        console.log(`Scheduled retry for ${pendingOrders.length} pending orders`);
      }
    } catch (error) {
      console.error('Error scheduling pending order retry:', error.message);
    }
  }, 2 * 60 * 1000); // Every 2 minutes
};

// Maintenance mode expiry checker job
const scheduleMaintenanceModeCheck = async () => {
  // Check for expired maintenance mode every 1 minute
  setInterval(async () => {
    try {
      const now = Date.now();
      
      const setting = await prisma.setting.findUnique({
        where: { key: 'maintenanceMode' },
      });
      
      if (setting && setting.value && typeof setting.value === 'object' && setting.value.enabled === true && setting.value.expiry) {
        // Check if maintenance mode has expired
        if (now > setting.value.expiry) {
          console.log('Maintenance mode has expired, disabling automatically...');
          
          // Update the setting to disable maintenance mode
          await prisma.setting.update({
            where: { key: 'maintenanceMode' },
            data: {
              value: { enabled: false, expiry: null, reason: null },
              updatedAt: new Date(),
            },
          });
          
          // Import and clear the maintenance cache
          const { clearMaintenanceCache } = require('../middleware/maintenance');
          clearMaintenanceCache();
          
          console.log('Maintenance mode automatically disabled - expiry reached');
        }
      }
    } catch (error) {
      console.error('Error checking maintenance mode expiry:', error.message);
    }
  }, 60 * 1000); // Every 1 minute
};

// Error handlers
orderWorker.on('failed', (job, err) => {
  console.error(`Order job ${job.id} failed:`, err.message);
});

statusWorker.on('failed', (job, err) => {
  console.error(`Status job ${job.id} failed:`, err.message);
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('Shutting down workers...');
  await orderWorker.close();
  await statusWorker.close();
  await prisma.$disconnect();
  process.exit(0);
});

console.log('Workers started...');
scheduleStatusChecks();
schedulePendingOrderRetry();
scheduleMaintenanceModeCheck();