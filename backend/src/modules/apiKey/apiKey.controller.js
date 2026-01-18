/**
 * API Key Controller
 * 
 * Handles HTTP requests for API key management.
 */

const apiKeyService = require('./apiKey.service');
const { successResponse } = require('../../utils/apiResponse');

class ApiKeyController {
  /**
   * POST /api-keys
   */
  async createApiKey(req, res, next) {
    try {
      const apiKey = await apiKeyService.createApiKey(req.user.id, req.body.name);
      return successResponse(res, apiKey, 'API key created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api-keys
   */
  async getApiKeys(req, res, next) {
    try {
      const apiKeys = await apiKeyService.getUserApiKeys(req.user.id);
      return successResponse(res, apiKeys);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api-keys/:id
   */
  async revokeApiKey(req, res, next) {
    try {
      const result = await apiKeyService.revokeApiKey(req.user.id, req.params.id);
      return successResponse(res, null, result.message);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /api-keys/:id/toggle
   */
  async toggleApiKey(req, res, next) {
    try {
      const apiKey = await apiKeyService.toggleApiKey(req.user.id, req.params.id);
      return successResponse(
        res,
        apiKey,
        `API key ${apiKey.isActive ? 'activated' : 'deactivated'}`
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api-keys/docs
   */
  async getApiDocs(req, res, next) {
    try {
      const docs = apiKeyService.getApiDocs();
      return successResponse(res, docs);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ApiKeyController();
