/**
 * Service Service
 * 
 * Business logic for SMB services.
 * Optimized with caching for high performance.
 */

const serviceRepository = require('./service.repository');
const { cache, CacheKeys } = require('../../utils/cache');
const config = require('../../config');

class ServiceService {
  /**
   * Get all services (with caching)
   */
  async getServices(options) {
    const { page = 1, limit = 500, platform, categoryId, search } = options;
    
    // Enforce max limit to prevent large queries (increased to 1000 for order page)
    const safeLimit = Math.min(limit, config.pagination.maxLimit || 1000);
    const skip = (page - 1) * safeLimit;

    // Build where clause
    const where = {};
    if (platform) {
      where.platform = platform;
    }
    if (categoryId) {
      where.categoryId = categoryId;
    }

    // If search query provided, use search (no cache for search)
    if (search) {
      return serviceRepository.search(search, { skip, take: safeLimit });
    }

    // Cache key based on filters
    const cacheKey = platform 
      ? CacheKeys.servicesByCategory(categoryId || 'all')
      : CacheKeys.services();

    return cache(
      `${cacheKey}:${page}:${safeLimit}`,
      () => serviceRepository.findAll({
        skip,
        take: safeLimit,
        where,
        orderBy: [{ category: { sortOrder: 'asc' } }, { sortOrder: 'asc' }],
      }),
      600 // Cache for 10 minutes (services don't change often)
    );
  }

  /**
   * Get service by ID (with caching)
   */
  async getServiceById(id) {
    return cache(
      CacheKeys.service(id),
      async () => {
        const service = await serviceRepository.findById(id);
        if (!service) {
          throw { statusCode: 404, message: 'Service not found' };
        }
        if (!service.isActive) {
          throw { statusCode: 404, message: 'Service is not available' };
        }
        return service;
      },
      600 // Cache for 10 minutes
    );
  }

  /**
   * Get all categories (with caching)
   */
  async getCategories() {
    return cache(
      CacheKeys.categories(),
      () => serviceRepository.findAllCategories(),
      600 // Cache for 10 minutes
    );
  }

  /**
   * Get services by category slug
   */
  async getServicesByCategory(slug, options) {
    const category = await serviceRepository.findCategoryBySlug(slug);
    if (!category) {
      throw { statusCode: 404, message: 'Category not found' };
    }

    const { page = 1, limit = 50 } = options;
    const skip = (page - 1) * limit;

    const result = await serviceRepository.findByCategory(category.id, {
      skip,
      take: limit,
    });

    return {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
      },
      ...result,
    };
  }

  /**
   * Get services by platform
   */
  async getServicesByPlatform(platform, options) {
    const { page = 1, limit = 50 } = options;
    const skip = (page - 1) * limit;

    return serviceRepository.findByPlatform(platform.toUpperCase(), {
      skip,
      take: limit,
    });
  }

  /**
   * Calculate order charge
   */
  calculateCharge(service, quantity) {
    // Rate is per 1000
    const charge = (parseFloat(service.rate) * quantity) / 1000;
    return parseFloat(charge.toFixed(4));
  }

  /**
   * Validate quantity for service
   */
  validateQuantity(service, quantity) {
    if (quantity < service.minQuantity) {
      throw {
        statusCode: 400,
        message: `Minimum quantity is ${service.minQuantity}`,
      };
    }
    if (quantity > service.maxQuantity) {
      throw {
        statusCode: 400,
        message: `Maximum quantity is ${service.maxQuantity}`,
      };
    }
    return true;
  }
}

module.exports = new ServiceService();
