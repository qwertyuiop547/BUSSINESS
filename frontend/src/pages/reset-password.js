/**
 * Reset Password Page
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/layout';
import { Button, Input } from '../components/ui';
import api from '../lib/api';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password is too long')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one lowercase letter, one uppercase letter, and one number'
  );

const schema = z
  .object({
    token: z
      .string()
      .min(6, 'Reset code must be 6 digits')
      .max(6, 'Reset code must be 6 digits')
      .regex(/^\d{6}$/, 'Reset code must be 6 digits'),
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export default function ResetPasswordPage() {
  const router = useRouter();
  const tokenFromQuery = typeof router.query.token === 'string' ? router.query.token : '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      token: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (tokenFromQuery) {
      setValue('token', tokenFromQuery);
    }
  }, [tokenFromQuery, setValue]);

  const onSubmit = async (data) => {
    try {
      await api.post('/v1/auth/reset-password', {
        token: data.token,
        password: data.password,
      });
      toast.success('Password reset successful. Please sign in.');
      router.push('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your 6-digit reset code and choose a new password."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Reset code"
          type="text"
          placeholder="6-digit code"
          {...register('token')}
          error={errors.token?.message}
          disabled={isSubmitting}
        />

        <Input
          label="New password"
          type="password"
          placeholder="Enter new password"
          {...register('password')}
          error={errors.password?.message}
          disabled={isSubmitting}
        />

        <Input
          label="Confirm new password"
          type="password"
          placeholder="Re-enter new password"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
        />

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Reset password
        </Button>

        <div className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Back to{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-500 font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}


