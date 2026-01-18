/**
 * Provider Controller
 * 
 * Handles HTTP requests for provider endpoints (admin only).
 */

const providerService = require('./provider.service');
const { successResponse } = require('../../utils/apiResponse');

class ProviderController {
  /**
   * GET /admin/providers
   */
  async getProviders(req, res, next) {
    try {
      const providers = await providerService.getAllProviders();
      return successResponse(res, providers);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /admin/providers/:id
   */
  async getProviderById(req, res, next) {
    try {
      const provider = await providerService.getProviderById(req.params.id);
      return successResponse(res, provider);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/providers
   */
  async createProvider(req, res, next) {
    try {
      const provider = await providerService.createProvider(req.body);
      return successResponse(res, provider, 'Provider created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /admin/providers/:id
   */
  async updateProvider(req, res, next) {
    try {
      const provider = await providerService.updateProvider(req.params.id, req.body);
      return successResponse(res, provider, 'Provider updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /admin/providers/:id
   */
  async deleteProvider(req, res, next) {
    try {
      await providerService.deleteProvider(req.params.id);
      return successResponse(res, null, 'Provider deleted');
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /admin/providers/:id/test
   */
  async testConnection(req, res, next) {
    try {
      const result = await providerService.testConnection(req.params.id);
      return successResponse(res, result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /admin/providers/:id/balance
   */
  async getBalance(req, res, next) {
    try {
      const balance = await providerService.getProviderBalance(req.params.id);
      return successResponse(res, balance);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /admin/providers/:id/services
   */
  async getServices(req, res, next) {
    try {
      const services = await providerService.getProviderServices(req.params.id);
      return successResponse(res, services);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProviderController();
