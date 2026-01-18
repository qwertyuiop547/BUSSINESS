/**
 * Login Page - Modern Design
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
import { Clock, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading, isInitialized, error, clearError, initialize } = useAuthStore();
  const [submitError, setSubmitError] = useState('');
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [retryAfter, setRetryAfter] = useState(null);
  const submitTimeoutRef = useRef(null);
  const retryTimerRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const redirectHandled = useRef(false);

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
    return () => {
      clearError();
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
      if (retryTimerRef.current) clearInterval(retryTimerRef.current);
    };
  }, [clearError]);

  // Countdown timer for rate limit
  useEffect(() => {
    if (retryAfter && retryAfter > 0) {
      retryTimerRef.current = setInterval(() => {
        setRetryAfter((prev) => {
          if (prev <= 1) {
            if (retryTimerRef.current) clearInterval(retryTimerRef.current);
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (retryTimerRef.current) clearInterval(retryTimerRef.current);
    };
  }, [retryAfter]);

  const onSubmit = async (data) => {
    // Prevent multiple rapid submissions
    if (isSubmittingForm) {
      console.log('Login already in progress, ignoring submit');
      return;
    }

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login.js:86', message: 'onSubmit called', data: { email: data.email, hasPassword: !!data.password }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A' }) }).catch(() => { });
    // #endregion

    setSubmitError('');
    setIsSubmittingForm(true);

    // Clear any existing timeout
    if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);

    try {
      console.log('Attempting login for:', data.email);
      const result = await login(data.email, data.password);
      console.log('Login result:', result);

      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login.js:103', message: 'login result received', data: { success: result.success, error: result.error }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'B' }) }).catch(() => { });
      // #endregion

      if (!result.success) {
        const errorMsg = result.error || '';
        console.error('Login failed:', errorMsg);

        // Check if it's an email not verified error
        if (errorMsg.toLowerCase().includes('not verified') || errorMsg.toLowerCase().includes('verification')) {
          // Redirect to verify email page
          router.push(`/verify-email?email=${encodeURIComponent(data.email)}`);
          return;
        }

        // Check if it's a rate limit error
        if (errorMsg.toLowerCase().includes('too many') || errorMsg.toLowerCase().includes('rate limit')) {
          // Extract retry time if available, otherwise default to 5 minutes
          const match = errorMsg.match(/(\d+)\s*(minute|second|min|sec)/i);
          const timeValue = match ? parseInt(match[1]) : 5;
          const timeUnit = match ? match[2].toLowerCase() : 'minute';
          const seconds = timeUnit.includes('min') ? timeValue * 60 : timeValue;

          setRetryAfter(seconds);
          setSubmitError(`${errorMsg} Please wait ${Math.ceil(seconds / 60)} minute(s) before trying again.`);
        } else {
          setSubmitError(errorMsg || 'Login failed. Please check your credentials.');
        }
      } else {
        console.log('Login successful, should redirect...');
      }
    } catch (err) {
      console.error('Login error caught:', err);
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/344d8f42-c2de-485e-8e1f-b018a2df1d67', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'login.js:124', message: 'login error caught', data: { message: err.message, status: err.response?.status, responseData: err.response?.data, hasRequest: !!err.request }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'C' }) }).catch(() => { });
      // #endregion
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err.message) {
        errorMessage = err.message;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.request) {
        errorMessage = 'Unable to connect to server. Please check your connection and try again.';
      }

      setSubmitError(errorMessage);
    } finally {
      // Prevent rapid clicks - add 1 second cooldown
      submitTimeoutRef.current = setTimeout(() => {
        setIsSubmittingForm(false);
      }, 1000);
    }
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle={
        <>
          Or{' '}
          <Link href="/register" className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500">
            create a new account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Error Alert */}
        {(submitError || error) && (
          <div className="p-4 text-sm duration-300 border border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/30 rounded-xl dark:border-red-800/50 animate-in slide-in-from-top-2">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-red-100 rounded-full dark:bg-red-900/50">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-red-800 dark:text-red-300">
                  {submitError || error || 'An error occurred'}
                </p>
                {retryAfter && retryAfter > 0 && (
                  <div className="flex items-center gap-2 mt-2 text-xs font-medium text-red-600 dark:text-red-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Retry in {Math.floor(retryAfter / 60)}:{(retryAfter % 60).toString().padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {(isSubmitting || isSubmittingForm) && !submitError && !error && (
          <div className="p-4 text-sm border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl dark:border-blue-800/50">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 dark:text-blue-400 animate-spin" />
              <span className="font-medium text-blue-800 dark:text-blue-300">Signing you in...</span>
            </div>
          </div>
        )}

        {/* Email Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Mail className="w-4 h-4 text-gray-400" />
            Email address
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className="h-12 rounded-xl"
            {...register('email')}
            error={errors.email?.message}
          />
        </div>

        {/* Password Input */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Lock className="w-4 h-4 text-gray-400" />
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            className="h-12 rounded-xl"
            showToggle
            {...register('password')}
            error={errors.password?.message}
          />
        </div>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="w-4 h-4 transition-colors bg-gray-100 border-gray-300 rounded text-cyan-600 dark:bg-slate-700 dark:border-slate-600 focus:ring-cyan-500 focus:ring-2"
            />
            <span className="text-sm text-gray-600 transition-colors dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
              Remember me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-sm font-medium transition-colors text-cyan-600 dark:text-cyan-400 hover:text-cyan-500"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-12 transition-all duration-300 shadow-lg rounded-xl bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-700 hover:to-teal-600 shadow-cyan-600/25 hover:shadow-xl hover:shadow-cyan-600/30 group"
          isLoading={isSubmitting || isSubmittingForm}
          disabled={isSubmittingForm || (retryAfter && retryAfter > 0)}
        >
          {retryAfter && retryAfter > 0 ? (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Wait {Math.floor(retryAfter / 60)}:{(retryAfter % 60).toString().padStart(2, '0')}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Sign in
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 text-gray-500 bg-white dark:bg-slate-800 dark:text-gray-400">
              New to SMB Panel?
            </span>
          </div>
        </div>

        {/* Register Link */}
        <Link
          href="/register"
          className="flex items-center justify-center w-full h-12 gap-2 font-medium text-gray-700 transition-all duration-300 border-2 border-gray-200 rounded-xl dark:border-slate-700 dark:text-gray-300 hover:border-cyan-500 hover:text-cyan-600 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
        >
          Create an account
          <ArrowRight className="w-4 h-4" />
        </Link>
      </form>
    </AuthLayout>
  );
}
