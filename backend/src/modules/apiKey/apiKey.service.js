/**
 * API Key Service
 * 
 * Business logic for API key management.
 */

const apiKeyRepository = require('./apiKey.repository');
const { generateApiKey } = require('../../utils/generateKey');

class ApiKeyService {
  /**
   * Create new API key
   * Key is only returned once at creation - never shown again
   */
  async createApiKey(userId, name) {
    // Generate unique key
    const key = generateApiKey('sk_live_');

    const apiKey = await apiKeyRepository.create({
      userId,
      name,
      key,
      isActive: true,
    });

    // Return the full key only at creation time
    return {
      id: apiKey.id,
      name: apiKey.name,
      key: apiKey.key, // Full key - only shown once!
      isActive: apiKey.isActive,
      createdAt: apiKey.createdAt,
    };
  }

  /**
   * Get user's API keys (with masked keys - never show full key after creation)
   */
  async getUserApiKeys(userId) {
    const apiKeys = await apiKeyRepository.findByUser(userId);
    
    // Mask the keys - only show first 8 and last 4 characters
    return apiKeys.map(apiKey => ({
      ...apiKey,
      key: `${apiKey.key.slice(0, 12)}${'*'.repeat(20)}${apiKey.key.slice(-4)}`,
      keyPrefix: apiKey.key.slice(0, 12), // For identification
    }));
  }

  /**
   * Revoke (delete) API key
   */
  async revokeApiKey(userId, keyId) {
    const apiKey = await apiKeyRepository.findById(keyId);

    if (!apiKey) {
      throw { statusCode: 404, message: 'API key not found' };
    }

    if (apiKey.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    await apiKeyRepository.delete(keyId);
    return { message: 'API key revoked' };
  }

  /**
   * Toggle API key active status
   */
  async toggleApiKey(userId, keyId) {
    const apiKey = await apiKeyRepository.findById(keyId);

    if (!apiKey) {
      throw { statusCode: 404, message: 'API key not found' };
    }

    if (apiKey.userId !== userId) {
      throw { statusCode: 403, message: 'Access denied' };
    }

    return apiKeyRepository.update(keyId, {
      isActive: !apiKey.isActive,
    });
  }

  /**
   * Validate API key (used by middleware)
   */
  async validateApiKey(key) {
    const apiKey = await apiKeyRepository.findByKey(key);

    if (!apiKey) {
      return null;
    }

    if (!apiKey.isActive) {
      return null;
    }

    if (apiKey.user.status !== 'ACTIVE') {
      return null;
    }

    return apiKey;
  }

  /**
   * Get API documentation
   */
  getApiDocs() {
    return {
      baseUrl: '/api/v1/external/v1',
      authentication: {
        type: 'API Key',
        header: 'X-API-Key',
        description: 'Include your API key in the X-API-Key header or as a "key" query parameter',
      },
      endpoints: [
        {
          method: 'GET',
          path: '/services',
          description: 'Get list of available services',
          response: {
            services: [
              {
                id: 'string',
                name: 'string',
                category: 'string',
                platform: 'string',
                rate: 'number (per 1000)',
                min: 'number',
                max: 'number',
              },
            ],
          },
        },
        {
          method: 'POST',
          path: '/order',
          description: 'Create new order',
          body: {
            service: 'string (service ID)',
            link: 'string (target URL)',
            quantity: 'number',
          },
          response: {
            order: 'string (order ID)',
            status: 'string',
            charge: 'number',
            balance: 'number (remaining balance)',
          },
        },
        {
          method: 'GET',
          path: '/order/:id',
          description: 'Get order status',
          response: {
            order: 'string',
            status: 'string',
            charge: 'number',
            startCount: 'number',
            remains: 'number',
          },
        },
        {
          method: 'GET',
          path: '/orders',
          description: 'Get all orders',
          query: {
            page: 'number (optional)',
            limit: 'number (optional)',
            status: 'string (optional)',
          },
        },
        {
          method: 'GET',
          path: '/balance',
          description: 'Get current balance',
          response: {
            balance: 'number',
            currency: 'string',
          },
        },
      ],
      errorCodes: {
        invalid_api_key: 'API key is invalid or deactivated',
        insufficient_balance: 'Not enough balance for this order',
        invalid_service: 'Service not found or inactive',
        invalid_quantity: 'Quantity is outside allowed range',
        rate_limit_exceeded: 'Too many requests',
      },
    };
  }
}

module.exports = new ApiKeyService();
