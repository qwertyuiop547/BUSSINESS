/**
 * Provider Validation Schemas
 */

const { z } = require('zod');

// Create provider schema
const createProviderSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  apiUrl: z.string().url('Invalid URL'),
  apiKey: z.string().min(1, 'API key is required'),
  description: z.string().max(500).optional().nullable(),
});

// Update provider schema
const updateProviderSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  apiUrl: z.string().url('Invalid URL').optional(),
  apiKey: z.string().min(1).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ERROR']).optional(),
  description: z.string().max(500).optional().nullable(),
});

module.exports = {
  createProviderSchema,
  updateProviderSchema,
};
