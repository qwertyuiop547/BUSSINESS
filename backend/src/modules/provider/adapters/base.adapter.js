/**
 * Base Provider Adapter
 * 
 * Abstract base class for SMM provider integrations.
 */

class BaseProviderAdapter {
  constructor(provider) {
    this.provider = provider;
    this.apiUrl = provider.apiUrl;
    this.apiKey = provider.apiKey;
  }

  /**
   * Get provider balance
   */
  async getBalance() {
    throw new Error('Method not implemented');
  }

  /**
   * Get available services from provider
   */
  async getServices() {
    throw new Error('Method not implemented');
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
    throw new Error('Method not implemented');
  }

  /**
   * Get order status from provider
   * @param {string} orderId - Provider order ID
   */
  async getOrderStatus(orderId) {
    throw new Error('Method not implemented');
  }

  /**
   * Get multiple order statuses
   * @param {string[]} orderIds - Array of provider order IDs
   */
  async getMultipleOrderStatus(orderIds) {
    throw new Error('Method not implemented');
  }

  /**
   * Cancel order at provider
   * @param {string} orderId - Provider order ID
   */
  async cancelOrder(orderId) {
    throw new Error('Method not implemented');
  }

  /**
   * Refill order at provider
   * @param {string} orderId - Provider order ID
   */
  async refillOrder(orderId) {
    throw new Error('Method not implemented');
  }
}

module.exports = BaseProviderAdapter;
