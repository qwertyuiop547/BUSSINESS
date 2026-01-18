/**
 * Zod Validation Middleware
 * 
 * Validates request body, query, or params against Zod schemas.
 */

const { ZodError } = require('zod');
const { errorResponse } = require('../utils/apiResponse');

/**
 * Validate request body against a Zod schema
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 */
const validateBody = (schema) => {
  return async (req, res, next) => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return errorResponse(res, 'Validation failed', 400, errors);
      }
      return errorResponse(res, 'Validation error', 400);
    }
  };
};

/**
 * Validate request query against a Zod schema
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 */
const validateQuery = (schema) => {
  return async (req, res, next) => {
    try {
      req.query = await schema.parseAsync(req.query);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return errorResponse(res, 'Validation failed', 400, errors);
      }
      return errorResponse(res, 'Validation error', 400);
    }
  };
};

/**
 * Validate request params against a Zod schema
 * @param {import('zod').ZodSchema} schema - Zod schema to validate against
 */
const validateParams = (schema) => {
  return async (req, res, next) => {
    try {
      req.params = await schema.parseAsync(req.params);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return errorResponse(res, 'Validation failed', 400, errors);
      }
      return errorResponse(res, 'Validation error', 400);
    }
  };
};

module.exports = {
  validateBody,
  validateQuery,
  validateParams,
};
