/**
 * Mock Provider Adapter
 * 
 * Simulates an SMM provider for testing purposes.
 * Returns mock data and simulates order processing.
 */

const BaseProviderAdapter = require('./base.adapter');

class MockProviderAdapter extends BaseProviderAdapter {
  constructor(provider) {
    super(provider);
    this.mockOrders = new Map();
    this.orderCounter = 1000;
  }

  /**
   * Get mock balance
   */
  async getBalance() {
    return {
      balance: '1250.50',
      currency: 'USD',
    };
  }

  /**
   * Get mock services
   */
  async getServices() {
    return [
      {
        id: 'mock_ig_followers',
        name: 'Instagram Followers [Mock]',
        category: 'Instagram',
        rate: '1.50',
        min: 100,
        max: 50000,
        type: 'Default',
      },
      {
        id: 'mock_ig_likes',
        name: 'Instagram Likes [Mock]',
        category: 'Instagram',
        rate: '0.60',
        min: 50,
        max: 10000,
        type: 'Default',
      },
      {
        id: 'mock_tt_followers',
        name: 'TikTok Followers [Mock]',
        category: 'TikTok',
        rate: '2.00',
        min: 100,
        max: 100000,
        type: 'Default',
      },
      {
        id: 'mock_yt_views',
        name: 'YouTube Views [Mock]',
        category: 'YouTube',
        rate: '1.20',
        min: 100,
        max: 100000,
        type: 'Default',
      },
    ];
  }

  /**
   * Create mock order
   */
  async createOrder(params) {
    const orderId = `MOCK_${++this.orderCounter}`;
    
    // Simulate random start count
    const startCount = Math.floor(Math.random() * 10000);
    
    this.mockOrders.set(orderId, {
      id: orderId,
      service: params.service,
      link: params.link,
      quantity: params.quantity,
      startCount,
      status: 'In progress',
      remains: params.quantity,
      createdAt: new Date(),
    });

    return {
      order: orderId,
      status: 'In progress',
      startCount,
    };
  }

  /**
   * Get mock order status
   */
  async getOrderStatus(orderId) {
    const order = this.mockOrders.get(orderId);
    
    if (!order) {
      // Return a mock "not found" or completed order
      return {
        order: orderId,
        status: 'Completed',
        charge: '0.00',
        startCount: 0,
        remains: 0,
      };
    }

    // Simulate progress - reduce remains over time
    const elapsed = (Date.now() - order.createdAt.getTime()) / 1000;
    const progress = Math.min(elapsed / 60, 1); // Complete in ~60 seconds
    const delivered = Math.floor(order.quantity * progress);
    const remains = order.quantity - delivered;

    // Update status
    let status = 'In progress';
    if (remains === 0) {
      status = 'Completed';
    } else if (progress > 0.1) {
      status = 'In progress';
    } else {
      status = 'Pending';
    }

    return {
      order: orderId,
      status,
      charge: ((order.quantity / 1000) * 1.5).toFixed(4),
      startCount: order.startCount,
      remains,
    };
  }

  /**
   * Get multiple mock order statuses
   */
  async getMultipleOrderStatus(orderIds) {
    const results = {};
    for (const orderId of orderIds) {
      results[orderId] = await this.getOrderStatus(orderId);
    }
    return results;
  }

  /**
   * Cancel mock order
   */
  async cancelOrder(orderId) {
    const order = this.mockOrders.get(orderId);
    
    if (!order) {
      throw new Error('Order not found');
    }

    // Calculate refund based on remaining quantity
    const status = await this.getOrderStatus(orderId);
    const refundQuantity = status.remains;
    
    this.mockOrders.delete(orderId);

    return {
      order: orderId,
      status: 'Canceled',
      refundQuantity,
    };
  }

  /**
   * Refill mock order
   */
  async refillOrder(orderId) {
    return {
      order: orderId,
      refill: `REFILL_${orderId}`,
      status: 'In progress',
    };
  }
}

module.exports = MockProviderAdapter;
