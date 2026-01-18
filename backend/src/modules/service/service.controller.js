/**
 * Service Controller
 * 
 * Handles HTTP requests for service endpoints.
 */

const serviceService = require('./service.service');
const { successResponse, paginatedResponse } = require('../../utils/apiResponse');
const { prisma } = require('../../config/database');

class ServiceController {
  /**
   * GET /services
   */
  async getServices(req, res, next) {
    try {
      const { page, limit, platform, categoryId, search } = req.query;
      const result = await serviceService.getServices({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
        platform,
        categoryId,
        search,
      });
      return paginatedResponse(
        res,
        result.data,
        result.total,
        parseInt(page) || 1,
        parseInt(limit) || 50
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /services/:id
   */
  async getServiceById(req, res, next) {
    try {
      const service = await serviceService.getServiceById(req.params.id);
      return successResponse(res, service);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /services/categories
   */
  async getCategories(req, res, next) {
    try {
      const categories = await serviceService.getCategories();
      return successResponse(res, categories);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /services/category/:slug
   */
  async getServicesByCategory(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await serviceService.getServicesByCategory(req.params.slug, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
      });
      return successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /services/platform/:platform
   */
  async getServicesByPlatform(req, res, next) {
    try {
      const { page, limit } = req.query;
      const result = await serviceService.getServicesByPlatform(req.params.platform, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 50,
      });
      return paginatedResponse(
        res,
        result.data,
        result.total,
        parseInt(page) || 1,
        parseInt(limit) || 50
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /services/coming-soon/:category
   * Get the notification count for a coming soon category
   */
  async getComingSoonCount(req, res, next) {
    try {
      const { category } = req.params;
      const key = `coming_soon_${category.toLowerCase()}`;
      
      const setting = await prisma.setting.findUnique({ where: { key } });
      const count = setting?.value?.count || 0;
      
      return successResponse(res, { category, count });
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /services/coming-soon/:category/notify
   * Increment the notification count for a coming soon category
   */
  async incrementComingSoonCount(req, res, next) {
    try {
      const { category } = req.params;
      const key = `coming_soon_${category.toLowerCase()}`;
      
      const existing = await prisma.setting.findUnique({ where: { key } });
      const currentCount = existing?.value?.count || 0;
      const newCount = currentCount + 1;
      
      await prisma.setting.upsert({
        where: { key },
        update: { value: { count: newCount } },
        create: { key, value: { count: newCount } },
      });
      
      return successResponse(res, { category, count: newCount });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ServiceController();
