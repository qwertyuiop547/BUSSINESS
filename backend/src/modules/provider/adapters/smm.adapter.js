/**
 * SMM Provider Adapter
 * 
 * Generic adapter for standard SMM panel APIs.
 * Works with most SMM providers (JAPSMP, SMMCost, Perfect Panel, etc.)
 * Note: "SMM" in class name refers to the API format type, not the panel name.
 * 
 * Standard API format uses POST requests with:
 * - key: API key
 * - action: The action to perform (services, add, status, etc.)
 */

const BaseProviderAdapter = require('./base.adapter');

class SMMProviderAdapter extends BaseProviderAdapter {
  constructor(provider) {
    super(provider);
  }

  /**
   * Make API request to provider
   */
  async makeRequest(params) {
    const body = new URLSearchParams({
      key: this.apiKey,
      ...params,
    });

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      const data = await response.json();

      // Check for API errors
      if (data.error) {
        throw new Error(data.error);
      }

      return data;
    } catch (error) {
      console.error(`[SMM API Error] ${this.provider.name}:`, error.message);
      throw error;
    }
  }

  /**
   * Get provider balance
   */
  async getBalance() {
    const data = await this.makeRequest({ action: 'balance' });
    
    return {
      balance: data.balance || '0.00',
      currency: data.currency || 'USD',
    };
  }

  /**
   * Get available services from provider
   */
  async getServices() {
    const data = await this.makeRequest({ action: 'services' });
    
    // Normalize service format
    if (Array.isArray(data)) {
      return data.map(service => ({
        id: String(service.service),
        name: service.name,
        category: service.category,
        rate: service.rate,
        min: parseInt(service.min) || 1,
        max: parseInt(service.max) || 10000,
        type: service.type || 'Default',
        refill: service.refill === true || service.refill === 'true',
        dripfeed: service.dripfeed === true || service.dripfeed === 'true',
        description: service.description || '',
      }));
    }
    
    return [];
  }

  /**
   * Create order at provider
   * @param {Object} params - Order parameters
   * @param {string} params.service - Provider service ID
   * @param {string} params.link - Target URL
   * @param {number} params.quantity - Quantity to order
   * @param {string} params.comments - Comments (for comment services)
   */
  async createOrder(params) {
    const requestParams = {
      action: 'add',
      service: params.service,
      link: params.link,
      quantity: params.quantity,
    };

    // Add optional parameters
    if (params.comments) {
      requestParams.comments = params.comments;
    }
    if (params.usernames) {
      requestParams.usernames = params.usernames;
    }
    if (params.hashtags) {
      requestParams.hashtags = params.hashtags;
    }
    // Drip feed parameters
    if (params.runs) {
      requestParams.runs = params.runs;
    }
    if (params.interval) {
      requestParams.interval = params.interval;
    }

    const data = await this.makeRequest(requestParams);

    return {
      order: String(data.order),
      status: 'Pending',
      startCount: 0,
    };
  }

  /**
   * Get order status from provider
   * @param {string} orderId - Provider order ID
   */
  async getOrderStatus(orderId) {
    const data = await this.makeRequest({
      action: 'status',
      order: orderId,
    });

    return {
      order: orderId,
      status: this.normalizeStatus(data.status),
      charge: data.charge || '0.00',
      startCount: parseInt(data.start_count) || 0,
      remains: parseInt(data.remains) || 0,
      currency: data.currency || 'USD',
    };
  }

  /**
   * Get multiple order statuses
   * @param {string[]} orderIds - Array of provider order IDs
   */
  async getMultipleOrderStatus(orderIds) {
    const data = await this.makeRequest({
      action: 'status',
      orders: orderIds.join(','),
    });

    const results = {};
    
    // Handle different response formats
    if (typeof data === 'object' && !Array.isArray(data)) {
      for (const [orderId, orderData] of Object.entries(data)) {
        results[orderId] = {
          order: orderId,
          status: this.normalizeStatus(orderData.status),
          charge: orderData.charge || '0.00',
          startCount: parseInt(orderData.start_count) || 0,
          remains: parseInt(orderData.remains) || 0,
        };
      }
    }

    return results;
  }

  /**
   * Cancel order at provider
   * @param {string} orderId - Provider order ID
   */
  async cancelOrder(orderId) {
    const data = await this.makeRequest({
      action: 'cancel',
      order: orderId,
    });

    return {
      order: orderId,
      status: 'Canceled',
      refund: data.refund || null,
    };
  }

  /**
   * Refill order at provider
   * @param {string} orderId - Provider order ID
   */
  async refillOrder(orderId) {
    const data = await this.makeRequest({
      action: 'refill',
      order: orderId,
    });

    return {
      order: orderId,
      refill: data.refill || null,
      status: 'Refill in progress',
    };
  }

  /**
   * Normalize status from different provider formats
   */
  normalizeStatus(status) {
    if (!status) return 'Pending';
    
    const statusLower = status.toLowerCase();
    
    if (statusLower.includes('completed')) return 'Completed';
    if (statusLower.includes('partial')) return 'Partial';
    if (statusLower.includes('processing') || statusLower.includes('progress')) return 'In progress';
    if (statusLower.includes('pending')) return 'Pending';
    if (statusLower.includes('cancel')) return 'Canceled';
    if (statusLower.includes('refund')) return 'Refunded';
    if (statusLower.includes('fail') || statusLower.includes('error')) return 'Failed';
    
    return status;
  }
}

module.exports = SMMProviderAdapter;

