/**
* User Controller
* 
* Handles HTTP requests for user endpoints.
*/

const userService = require('./user.service');
const { successResponse } = require('../../utils/apiResponse');

class UserController {
  /**
   * GET /users/profile
   */
  async getProfile(req, res, next) {
    try {
      const user = await userService.getProfile(req.user.id);
      return successResponse(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /users/profile
   */
  async updateProfile(req, res, next) {
    try {
      const user = await userService.updateProfile(req.user.id, req.body);
      return successResponse(res, user, 'Profile updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * PATCH /users/password
   */
  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      await userService.changePassword(req.user.id, currentPassword, newPassword);
      return successResponse(res, null, 'Password changed successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /users/dashboard
   */
  async getDashboard(req, res, next) {
    try {
      const stats = await userService.getDashboardStats(req.user.id);
      return successResponse(res, stats);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /users/profile/picture
   */
  async uploadProfilePicture(req, res, next) {
    try {
      if (!req.file) {
        throw { statusCode: 400, message: 'No file uploaded' };
      }

      const user = await userService.uploadProfilePicture(req.user.id, req.file.filename);
      return successResponse(res, user, 'Profile picture uploaded successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /users/profile/picture
   */
  async deleteProfilePicture(req, res, next) {
    try {
      const user = await userService.deleteProfilePicture(req.user.id);
      return successResponse(res, user, 'Profile picture deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /users/profile/account
   */
  async deleteAccount(req, res, next) {
    try {
      await userService.deleteAccount(req.user.id);
      return successResponse(res, null, 'Account deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
