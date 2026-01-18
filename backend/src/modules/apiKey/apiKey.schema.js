/**
 * API Key Validation Schemas
 */

const { z } = require('zod');

// Create API key schema
const createApiKeySchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long'),
});

module.exports = {
  createApiKeySchema,
};
