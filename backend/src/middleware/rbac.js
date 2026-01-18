/**
 * Role-Based Access Control (RBAC) Middleware
 * 
 * Controls access to routes based on user roles.
 */

const { errorResponse } = require('../utils/apiResponse');

/**
 * Require specific role(s) to access route
 * @param  {...string} allowedRoles - Roles that can access the route
 */
const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return errorResponse(res, 'Insufficient permissions', 403);
    }

    next();
  };
};

/**
 * Require admin role
 */
const requireAdmin = requireRole('ADMIN');

/**
 * Require user to be the owner of a resource
 * @param {Function} getResourceUserId - Function to extract userId from request
 */
const requireOwner = (getResourceUserId) => {
  return async (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    // Admins can access any resource
    if (req.user.role === 'ADMIN') {
      return next();
    }

    try {
      const resourceUserId = await getResourceUserId(req);
      
      if (resourceUserId !== req.user.id) {
        return errorResponse(res, 'Access denied', 403);
      }

      next();
    } catch (error) {
      return errorResponse(res, 'Resource not found', 404);
    }
  };
};

/**
 * Require user to be owner OR admin
 */
const requireOwnerOrAdmin = (getResourceUserId) => {
  return async (req, res, next) => {
    if (!req.user) {
      return errorResponse(res, 'Authentication required', 401);
    }

    if (req.user.role === 'ADMIN') {
      return next();
    }

    try {
      const resourceUserId = await getResourceUserId(req);
      
      if (resourceUserId !== req.user.id) {
        return errorResponse(res, 'Access denied', 403);
      }

      next();
    } catch (error) {
      return errorResponse(res, 'Resource not found', 404);
    }
  };
};

module.exports = {
  requireRole,
  requireAdmin,
  requireOwner,
  requireOwnerOrAdmin,
};
