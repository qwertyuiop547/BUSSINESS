/**
 * Pagination Helpers
 * 
 * Utilities for handling pagination in list endpoints.
 */

const config = require('../config');

/**
 * Parse pagination parameters from query
 * @param {Object} query - Express request query object
 */
const parsePagination = (query) => {
  let page = parseInt(query.page, 10) || 1;
  let limit = parseInt(query.limit, 10) || config.pagination.defaultLimit;

  // Ensure valid ranges
  page = Math.max(1, page);
  limit = Math.min(Math.max(1, limit), config.pagination.maxLimit);

  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Build Prisma orderBy from query
 * @param {Object} query - Express request query object
 * @param {Object} allowedFields - Map of allowed sort fields
 */
const parseSort = (query, allowedFields = { createdAt: true }) => {
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 'asc' : 'desc';

  // Only allow sorting by allowed fields
  if (!allowedFields[sortBy]) {
    return { createdAt: 'desc' };
  }

  return { [sortBy]: sortOrder };
};

/**
 * Build pagination metadata
 * @param {number} total - Total count
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 */
const buildPaginationMeta = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = {
  parsePagination,
  parseSort,
  buildPaginationMeta,
};
