/**
 * User Service
 * 
 * Business logic for user operations.
 * Optimized with caching for high performance.
 */

const userRepository = require('./user.repository');
const { hashPassword, comparePassword } = require('../../utils/hash');
const { cache, CacheKeys, invalidateUser } = require('../../utils/cache');

class UserService {
  /**
   * Get user profile (with caching)
   */
  async getProfile(userId) {
    return cache(
      CacheKeys.userProfile(userId),
      async () => {
        const user = await userRepository.findById(userId);
        if (!user) {
          throw { statusCode: 404, message: 'User not found' };
        }
        return user;
      },
      300 // Cache for 5 minutes
    );
  }

  /**
   * Update user profile (invalidates cache)
   */
  async updateProfile(userId, data) {
    // Check if username is taken (if updating)
    if (data.username) {
      const existingUser = await userRepository.findByUsername(data.username);
      if (existingUser && existingUser.id !== userId) {
        throw { statusCode: 409, message: 'Username already taken' };
      }
    }

    const updated = await userRepository.update(userId, data);
    
    // Invalidate user cache after update
    await invalidateUser(userId);
    
    return updated;
  }

  /**
   * Change user password
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await userRepository.findById(userId, true);
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    // Verify current password
    const isValid = await comparePassword(currentPassword, user.password);
    if (!isValid) {
      throw { statusCode: 400, message: 'Current password is incorrect' };
    }

    // Hash new password and update
    const hashedPassword = await hashPassword(newPassword);
    await userRepository.update(userId, { password: hashedPassword });

    return true;
  }

  /**
   * Get user dashboard statistics (with caching)
   */
  async getDashboardStats(userId) {
    return cache(
      CacheKeys.userStats(userId),
      () => userRepository.getDashboardStats(userId),
      60 // Cache for 1 minute (stats change frequently)
    );
  }

  /**
   * Get user balance (with short cache)
   */
  async getBalance(userId) {
    return cache(
      CacheKeys.userBalance(userId),
      () => userRepository.getBalance(userId),
      30 // Cache for 30 seconds (balance changes often)
    );
  }

  /**
   * Upload profile picture (invalidates cache)
   */
  async uploadProfilePicture(userId, filename) {
    const fs = require('fs');
    const path = require('path');

    // Get current user to check for existing profile picture
    const user = await userRepository.findById(userId);

    // Delete old profile picture if it exists
    if (user?.profilePicture) {
      const oldPath = path.join(__dirname, '../../../uploads/profiles', user.profilePicture);
      if (fs.existsSync(oldPath)) {
        // Use unlink asynchronously to avoid blocking
        fs.unlink(oldPath, () => {});
      }
    }

    // Update user with new profile picture
    const updated = await userRepository.update(userId, { profilePicture: filename });
    
    // Invalidate user cache
    await invalidateUser(userId);
    
    return updated;
  }

  /**
   * Delete profile picture (invalidates cache)
   */
  async deleteProfilePicture(userId) {
    const fs = require('fs');
    const path = require('path');

    // Get current user
    const user = await userRepository.findById(userId);

    if (!user?.profilePicture) {
      throw { statusCode: 404, message: 'No profile picture to delete' };
    }

    // Delete file from filesystem (async to avoid blocking)
    const filePath = path.join(__dirname, '../../../uploads/profiles', user.profilePicture);
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, () => {});
    }

    // Update user record
    const updated = await userRepository.update(userId, { profilePicture: null });
    
    // Invalidate user cache
    await invalidateUser(userId);
    
    return updated;
  }

  /**
   * Delete user account (only if balance is zero)
   */
  async deleteAccount(userId) {
    const user = await userRepository.findById(userId);
    
    if (!user) {
      throw { statusCode: 404, message: 'User not found' };
    }

    // Check if user has any balance
    const balance = parseFloat(user.balance || 0);
    if (balance > 0) {
      throw { 
        statusCode: 400, 
        message: 'Cannot delete account with remaining balance. Please withdraw all funds first.' 
      };
    }

    // Delete profile picture if exists
    if (user.profilePicture) {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.join(__dirname, '../../../uploads/profiles', user.profilePicture);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, () => {});
      }
    }

    // Delete user account (Cascade will handle related records)
    await userRepository.delete(userId);
    
    // Invalidate all user cache
    await invalidateUser(userId);
    
    return true;
  }
}

module.exports = new UserService();
