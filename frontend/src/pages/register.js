/**
 * Register Page
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthLayout } from '../components/layout';
import { Button, Input } from '../components/ui';
import useAuthStore from '../store/authStore';

const registerSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9._ -]+$/, 'Username can only contain letters, numbers, spaces, dots, dashes, and underscores'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isAuthenticated, isLoading, isInitialized, error, clearError, initialize } = useAuthStore();
  const [submitError, setSubmitError] = useState('');
  const redirectHandled = useRef(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  // Initialize auth on mount
  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Only redirect after initialization is complete
    if (isInitialized && isAuthenticated && !isLoading && !redirectHandled.current) {
      redirectHandled.current = true;
      router.replace('/dashboard');
    }
    // Reset flag when not authenticated
    if (!isAuthenticated) {
      redirectHandled.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, isAuthenticated, isLoading]);

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  const onSubmit = async (data) => {
    setSubmitError('');
    const { confirmPassword, ...registerData } = data;
    const result = await registerUser(registerData);

    if (result.success) {
      if (result.requiresVerification) {
        // Redirect to verify email page
        router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
      }
      // If no verification required, the auto-redirect to dashboard will handle it
    } else {
      setSubmitError(result.error);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle={
        <>
          Already have an account?{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {(submitError || error) && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg">
            {submitError || error}
          </div>
        )}

        <Input
          label="Username"
          type="text"
          autoComplete="username"
          {...register('username')}
          error={errors.username?.message}
        />

        <Input
          label="Email address"
          type="email"
          autoComplete="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          showToggle
          {...register('password')}
          error={errors.password?.message}
        />

        <Input
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          showToggle
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <div className="flex items-start">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-0.5"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the{' '}
            <Link href="/terms" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </Link>
          </label>
        </div>

        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
        >
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
}
