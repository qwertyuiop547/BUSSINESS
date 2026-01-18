/**
 * Suggestion Controller
 */

const suggestionService = require('./suggestion.service');
const { successResponse } = require('../../utils/apiResponse');

class SuggestionController {
  /**
   * Create suggestion (user)
   */
  async create(req, res, next) {
    try {
      const suggestion = await suggestionService.create(req.user.id, req.body);
      return successResponse(res, suggestion, 'Suggestion submitted successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user's suggestions
   */
  async getUserSuggestions(req, res, next) {
    try {
      const { page, limit, status, category } = req.query;
      const result = await suggestionService.getUserSuggestions(req.user.id, {
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        status,
        category,
      });
      return successResponse(res, result.data, 'Suggestions retrieved', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all suggestions (admin)
   */
  async getAll(req, res, next) {
    try {
      const { page, limit, status, category, search } = req.query;
      const result = await suggestionService.getAll({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 20,
        status,
        category,
        search,
      });
      return successResponse(res, result.data, 'Suggestions retrieved', 200, result.pagination);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get suggestion by ID
   */
  async getById(req, res, next) {
    try {
      const suggestion = await suggestionService.getById(req.params.id);
      return successResponse(res, suggestion, 'Suggestion retrieved');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update suggestion status (admin)
   */
  async updateStatus(req, res, next) {
    try {
      const { status, adminNote } = req.body;
      const suggestion = await suggestionService.updateStatus(
        req.params.id,
        status,
        req.user.id,
        adminNote
      );
      return successResponse(res, suggestion, 'Suggestion updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete suggestion (admin)
   */
  async delete(req, res, next) {
    try {
      await suggestionService.delete(req.params.id);
      return successResponse(res, null, 'Suggestion deleted');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get stats (admin)
   */
  async getStats(req, res, next) {
    try {
      const stats = await suggestionService.getStats();
      return successResponse(res, stats, 'Stats retrieved');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SuggestionController();
