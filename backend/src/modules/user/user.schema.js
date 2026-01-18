/**
 * User Validation Schemas
 */

const { z } = require('zod');

// Update profile schema
const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be at most 30 characters')
    .regex(/^[a-zA-Z0-9._ -]+$/, 'Username can only contain letters, numbers, spaces, dots, dashes, and underscores')
    .transform((v) => v.trim())
    .optional(),
});

// Change password schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password is too long')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
});

module.exports = {
  updateProfileSchema,
  changePasswordSchema,
};
