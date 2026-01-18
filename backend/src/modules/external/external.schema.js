/**
 * External API Schemas
 * 
 * Validation for external/reseller API endpoints.
 */

const { z } = require('zod');

// External API - Add Order
const externalAddOrderSchema = z.object({
  service: z.number().int().positive('Service ID is required'),
  link: z.string().url('Valid URL is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
});

// External API - Order Status
const externalOrderStatusSchema = z.object({
  order: z.number().int().positive('Order ID is required'),
});

// External API - Multiple Order Status
const externalMultipleOrderStatusSchema = z.object({
  orders: z.string().min(1, 'Order IDs are required')
    .regex(/^(\d+,)*\d+$/, 'Orders must be comma-separated numbers'),
});

// External API - Create Refill
const externalCreateRefillSchema = z.object({
  order: z.number().int().positive('Order ID is required'),
});

// External API - Refill Status
const externalRefillStatusSchema = z.object({
  refill: z.number().int().positive('Refill ID is required'),
});

// External API - Cancel Order
const externalCancelOrderSchema = z.object({
  orders: z.string().min(1, 'Order IDs are required')
    .regex(/^(\d+,)*\d+$/, 'Orders must be comma-separated numbers'),
});

module.exports = {
  externalAddOrderSchema,
  externalOrderStatusSchema,
  externalMultipleOrderStatusSchema,
  externalCreateRefillSchema,
  externalRefillStatusSchema,
  externalCancelOrderSchema,
};
