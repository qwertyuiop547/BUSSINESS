/**
 * Order Validation Schemas
 */

const { z } = require('zod');

// Create order schema
const createOrderSchema = z.object({
  serviceId: z.string().min(1, 'Service is required'),
  link: z
    .string()
    .url('Invalid URL')
    .min(1, 'Link is required')
    .max(500, 'Link is too long'),
  quantity: z
    .number()
    .int('Quantity must be a whole number')
    .positive('Quantity must be positive'),
  comments: z.string().max(5000).optional().nullable(),
  usernames: z.string().max(5000).optional().nullable(),
  hashtags: z.string().max(1000).optional().nullable(),
  dripFeed: z.boolean().optional().default(false),
  dripFeedInterval: z.number().int().positive().optional().nullable(),
  dripFeedQuantity: z.number().int().positive().optional().nullable(),
});

// Query schema for orders list
const orderQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  status: z.enum([
    'PENDING', 'PROCESSING', 'IN_PROGRESS', 'COMPLETED',
    'PARTIAL', 'FAILED', 'CANCELED', 'REFUNDED'
  ]).optional(),
  serviceId: z.string().optional(),
});

module.exports = {
  createOrderSchema,
  orderQuerySchema,
};
