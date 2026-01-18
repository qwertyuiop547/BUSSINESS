/**
 * API Response Helpers
 * 
 * Standardized response format for all API endpoints.
 */

/**
 * Serialize BigInt and Decimal values to Numbers in objects/arrays
 * @param {*} data - Data to serialize
 * @returns {*} - Serialized data with BigInt/Decimal converted to Number
 */
const serializeBigInt = (data) => {
  if (data === null || data === undefined) {
    return data;
  }

  if (typeof data === 'bigint') {
    // Convert to Number if within safe integer range, otherwise to string
    return Number(data);
  }

  // Handle Prisma Decimal type
  if (data && typeof data === 'object' && data.constructor && data.constructor.name === 'Decimal') {
    return parseFloat(data.toString());
  }

  // Handle objects with toNumber method (like Prisma Decimal)
  if (data && typeof data.toNumber === 'function') {
    return data.toNumber();
  }

  if (Array.isArray(data)) {
    return data.map(serializeBigInt);
  }

  if (typeof data === 'object' && data !== null) {
    // Handle Date objects
    if (data instanceof Date) {
      return data;
    }
    
    const serialized = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeBigInt(value);
    }
    return serialized;
  }

  return data;
};

/**
 * Success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Optional success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {Object} meta - Optional metadata (pagination, etc.)
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200, meta = null) => {
  // Serialize BigInt values before sending response
  const serializedData = serializeBigInt(data);
  
  const response = {
    success: true,
    message,
    data: serializedData,
  };

  if (meta) {
    response.meta = serializeBigInt(meta);
  }

  return res.status(statusCode).json(response);
};

/**
 * Error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 400)
 * @param {Array} errors - Optional validation errors array
 */
const errorResponse = (res, message = 'Error', statusCode = 400, errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Paginated response
 * @param {Object} res - Express response object
 * @param {Array} data - Array of items
 * @param {number} total - Total count
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @param {string} message - Optional message
 */
const paginatedResponse = (res, data, total, page, limit, message = 'Success') => {
  const totalPages = Math.ceil(total / limit);
  // Serialize BigInt values before sending response
  const serializedData = serializeBigInt(data);
  
  return res.status(200).json({
    success: true,
    message,
    data: serializedData,
    meta: {
      total: typeof total === 'bigint' ? Number(total) : total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  });
};

module.exports = {
  successResponse,
  errorResponse,
  paginatedResponse,
};
