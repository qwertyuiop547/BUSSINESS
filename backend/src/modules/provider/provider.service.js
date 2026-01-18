/**
 * Provider Service
 * 
 * Business logic for provider management.
 */

const providerRepository = require('./provider.repository');
const SMMProviderAdapter = require('./adapters/smm.adapter');
const MockProviderAdapter = require('./adapters/mock.adapter');

// Cache for provider adapters
const adapterCache = new Map();

class ProviderService {
  /**
   * Get provider adapter instance
   * Uses real SMM adapter for production, mock for testing
   */
  getAdapter(provider) {
    // Check cache
    if (adapterCache.has(provider.id)) {
      return adapterCache.get(provider.id);
    }

    // Use real SMM adapter if provider has valid API credentials
    // Fall back to mock adapter only if apiUrl contains 'mock' or is empty
    let adapter;
    if (provider.apiUrl && provider.apiKey && !provider.apiUrl.toLowerCase().includes('mock')) {
      adapter = new SMMProviderAdapter(provider);
    } else {
      adapter = new MockProviderAdapter(provider);
    }
    
    adapterCache.set(provider.id, adapter);
    return adapter;
  }

  /**
   * Get all providers
   */
  async getAllProviders() {
    return providerRepository.findAll();
  }

  /**
   * Get provider by ID
   */
  async getProviderById(id) {
    const provider = await providerRepository.findById(id);
    if (!provider) {
      throw { statusCode: 404, message: 'Provider not found' };
    }
    return provider;
  }

  /**
   * Create provider
   */
  async createProvider(data) {
    return providerRepository.create(data);
  }

  /**
   * Update provider
   */
  async updateProvider(id, data) {
    await this.getProviderById(id);
    
    // Clear adapter cache if API details changed
    if (data.apiUrl || data.apiKey) {
      adapterCache.delete(id);
    }
    
    return providerRepository.update(id, data);
  }

  /**
   * Delete provider
   */
  async deleteProvider(id) {
    await this.getProviderById(id);
    adapterCache.delete(id);
    return providerRepository.delete(id);
  }

  /**
   * Test provider connection
   */
  async testConnection(id) {
    const provider = await this.getProviderById(id);
    const adapter = this.getAdapter(provider);
    
    try {
      const balance = await adapter.getBalance();
      return {
        success: true,
        message: 'Connection successful',
        balance: balance.balance,
        currency: balance.currency,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Connection failed',
      };
    }
  }

  /**
   * Get provider balance
   */
  async getProviderBalance(id) {
    const provider = await this.getProviderById(id);
    const adapter = this.getAdapter(provider);
    
    const balance = await adapter.getBalance();
    
    // Update stored balance
    await providerRepository.updateBalance(id, parseFloat(balance.balance));
    
    return balance;
  }

  /**
   * Get provider services
   */
  async getProviderServices(id) {
    const provider = await this.getProviderById(id);
    const adapter = this.getAdapter(provider);
    
    return adapter.getServices();
  }

  /**
   * Send order to provider
   */
  async sendOrderToProvider(provider, orderData) {
    const adapter = this.getAdapter(provider);
    
    return adapter.createOrder({
      service: orderData.providerServiceId,
      link: orderData.link,
      quantity: orderData.quantity,
      comments: orderData.comments,
    });
  }

  /**
   * Get order status from provider
   */
  async getOrderStatusFromProvider(provider, providerOrderId) {
    const adapter = this.getAdapter(provider);
    return adapter.getOrderStatus(providerOrderId);
  }

  /**
   * Sync order statuses with provider
   */
  async syncOrderStatuses(providerId, orderIds) {
    const provider = await this.getProviderById(providerId);
    const adapter = this.getAdapter(provider);
    
    return adapter.getMultipleOrderStatus(orderIds);
  }
}

module.exports = new ProviderService();
