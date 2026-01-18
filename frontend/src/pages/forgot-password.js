/**
 * Forgot Password Page
 */

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { AuthLayout } from '../components/layout';
import { Button, Input } from '../components/ui';
import api from '../lib/api';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post('/v1/auth/forgot-password', { email: data.email });
      setSubmitted(true);
      toast.success('If the email exists, a 6-digit reset code was sent to your Gmail.');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to request password reset');
    }
  };

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we’ll send a 6-digit reset code to your Gmail."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
          disabled={isSubmitting || submitted}
        />

        <Button type="submit" className="w-full" isLoading={isSubmitting} disabled={submitted}>
          Send reset code
        </Button>

        {submitted && (
          <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/60 dark:bg-gray-900/30 p-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Check your Gmail inbox for a <span className="font-semibold">6-digit reset code</span>.
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              If you don’t see it, check Spam/Promotions. Code expires in 1 hour.
            </p>
            <div className="mt-3">
              <Link
                href="/reset-password"
                className="text-sm font-semibold text-primary-600 hover:text-primary-500"
              >
                I have a code →
              </Link>
            </div>
          </div>
        )}

        <div className="pt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Remembered your password?{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-500 font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}


