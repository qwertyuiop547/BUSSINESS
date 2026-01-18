/**
 * Wallet Validation Schemas
 */

const { z } = require('zod');

// Top-up request schema
const createTopUpSchema = z.object({
  amount: z
    .number()
    .positive('Amount must be positive')
    .min(10, 'Minimum top-up amount is 10')
    .max(100000, 'Maximum top-up amount is 100,000'),
  paymentMethod: z.enum(['GCASH', 'PAYMAYA', 'PAYPAL', 'BANK_TRANSFER', 'VISA', 'MASTERCARD', 'OTHER'], {
    errorMap: () => ({ message: 'Invalid payment method' }),
  }),
  referenceNumber: z.string().min(1, 'Reference number is required').max(100).optional(),
  proofUrl: z.string().url('Invalid URL').optional().nullable(),
});

// Query schema for transactions
const transactionQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  type: z.enum(['TOP_UP', 'ORDER_PAYMENT', 'ORDER_REFUND', 'ADMIN_ADJUST']).optional(),
});

// Query schema for top-ups
const topUpQuerySchema = z.object({
  page: z.string().optional().transform((v) => parseInt(v) || 1),
  limit: z.string().optional().transform((v) => parseInt(v) || 20),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']).optional(),
});

module.exports = {
  createTopUpSchema,
  transactionQuerySchema,
  topUpQuerySchema,
};
