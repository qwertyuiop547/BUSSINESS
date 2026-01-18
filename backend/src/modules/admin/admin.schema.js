/**
 * Admin Validation Schemas
 */

const { z } = require('zod');

// Update user schema (admin)
const adminUpdateUserSchema = z.object({
  role: z.enum(['USER', 'ADMIN']).optional(),
  status: z.enum(['ACTIVE', 'BANNED', 'SUSPENDED']).optional(),
});

// Adjust balance schema
const adjustBalanceSchema = z.object({
  amount: z.number().refine((val) => val !== 0, 'Amount cannot be zero'),
  description: z.string().min(1, 'Description is required').max(200),
});

// Top-up review schema
const reviewTopUpSchema = z.object({
  adminNote: z.string().max(500).optional(),
});

// Create service schema
const createServiceSchema = z.object({
  categoryId: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Name is required').max(200),
  description: z.string().max(1000).optional().nullable(),
  platform: z.enum([
    'INSTAGRAM', 'FACEBOOK', 'TWITTER', 'TIKTOK',
    'YOUTUBE', 'TELEGRAM', 'DISCORD', 'SPOTIFY', 'TWITCH', 'OTHER'
  ]),
  type: z.string().min(1, 'Type is required').max(50),
  rate: z.number().positive('Rate must be positive'),
  minQuantity: z.number().int().positive().default(100),
  maxQuantity: z.number().int().positive().default(10000),
  providerId: z.string().optional().nullable(),
  providerServiceId: z.string().optional().nullable(),
  providerRate: z.number().positive().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  isDripFeed: z.boolean().optional().default(false),
  isRefill: z.boolean().optional().default(false),
  averageTime: z.string().max(50).optional().nullable(),
  sortOrder: z.number().int().optional().default(0),
});

// Update service schema
const updateServiceSchema = createServiceSchema.partial();

// Create category schema
const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  slug: z.string().min(1, 'Slug is required').max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().max(500).optional().nullable(),
  sortOrder: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
});

// Update category schema
const updateCategorySchema = createCategorySchema.partial();

// Update order schema (admin)
const adminUpdateOrderSchema = z.object({
  status: z.enum([
    'PENDING', 'PROCESSING', 'IN_PROGRESS', 'COMPLETED',
    'PARTIAL', 'FAILED', 'CANCELED', 'REFUNDED'
  ]).optional(),
  startCount: z.number().int().optional().nullable(),
  currentCount: z.number().int().optional().nullable(),
  remains: z.number().int().optional().nullable(),
  statusNote: z.string().max(500).optional().nullable(),
});

// Refund order schema
const refundOrderSchema = z.object({
  amount: z.number().positive('Refund amount must be positive').optional(),
  reason: z.string().min(1, 'Reason is required').max(500),
});

// Query schemas
const adminUserQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  status: z.enum(['ACTIVE', 'BANNED', 'SUSPENDED']).optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  search: z.string().optional(),
});

const adminOrderQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  status: z.enum([
    'PENDING', 'PROCESSING', 'IN_PROGRESS', 'COMPLETED',
    'PARTIAL', 'FAILED', 'CANCELED', 'REFUNDED'
  ]).optional(),
  userId: z.string().optional(),
  serviceId: z.string().optional(),
});

const adminTopUpQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
  userId: z.string().optional(),
});

module.exports = {
  adminUpdateUserSchema,
  adjustBalanceSchema,
  reviewTopUpSchema,
  createServiceSchema,
  updateServiceSchema,
  createCategorySchema,
  updateCategorySchema,
  adminUpdateOrderSchema,
  refundOrderSchema,
  adminUserQuerySchema,
  adminOrderQuerySchema,
  adminTopUpQuerySchema,
};
