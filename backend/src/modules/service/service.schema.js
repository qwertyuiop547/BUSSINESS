/**
 * Service Validation Schemas
 */

const { z } = require('zod');

// Query schema for services list
const serviceQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 50),
  platform: z.enum([
    'INSTAGRAM', 'FACEBOOK', 'TWITTER', 'TIKTOK',
    'YOUTUBE', 'TELEGRAM', 'DISCORD', 'SPOTIFY', 'TWITCH', 'OTHER'
  ]).optional(),
  categoryId: z.string().optional(),
  search: z.string().optional(),
});

module.exports = {
  serviceQuerySchema,
};
