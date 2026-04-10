/**
 * Verify Email Page
 * 
 * Page for users to enter the 6-digit verification code sent to their email.
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AuthLayout } from '../components/layout';
import { Button } from '../components/ui';
import useAuthStore from '../store/authStore';

export default function VerifyEmailPage() {
    const router = useRouter();
    const { email } = router.query;
    const { verifyEmail, resendVerificationCode, isAuthenticated, isLoading, error, clearError, initialize } = useAuthStore();

    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [submitError, setSubmitError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef([]);
    const redirectHandled = useRef(false);

    // Initialize auth on mount
    useEffect(() => {
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated && !redirectHandled.current) {
            redirectHandled.current = true;
            router.replace('/dashboard');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    // Cooldown timer for resend
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Clear errors on unmount
    useEffect(() => {
        return () => clearError();
    }, [clearError]);

    // Handle input change
    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setSubmitError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all 6 digits entered
        if (value && index === 5 && newCode.every(digit => digit !== '')) {
            handleSubmit(newCode.join(''));
        }
    };

    // Handle key down (backspace)
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData.length === 6) {
            const newCode = pastedData.split('');
            setCode(newCode);
            inputRefs.current[5]?.focus();
            handleSubmit(pastedData);
        }
    };

    // Submit verification
    const handleSubmit = async (codeString) => {
        if (!email) {
            setSubmitError('Email not found. Please register again.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError('');

        const result = await verifyEmail(email, codeString);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setSubmitError(result.error);
            setCode(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        }

        setIsSubmitting(false);
    };

    // Resend code
    const handleResend = async () => {
        if (resendCooldown > 0 || !email) return;

        setSuccessMessage('');
        setSubmitError('');

        const result = await resendVerificationCode(email);

        if (result.success) {
            setSuccessMessage('A new verification code has been sent to your email.');
            setResendCooldown(60); // 60 second cooldown
        } else {
            setSubmitError(result.error);
        }
    };

    // Button submit (for manual submit)
    const onButtonSubmit = () => {
        const codeString = code.join('');
        if (codeString.length === 6) {
            handleSubmit(codeString);
        } else {
            setSubmitError('Please enter the complete 6-digit code');
        }
    };

    if (!email) {
        return (
            <AuthLayout
                title="Verify your email"
                subtitle="Please check your email for the verification code"
            >
                <div className="text-center space-y-4">
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="text-yellow-800 dark:text-yellow-200">
                            No email address provided. Please register first.
                        </p>
                    </div>
                    <Link href="/register">
                        <Button className="w-full">Go to Register</Button>
                    </Link>
                </div>
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title="Verify your email"
            subtitle={
                <>
                    We sent a verification code to{' '}
                    <span className="font-medium text-primary-600">{email}</span>
                </>
            }
        >
            <div className="space-y-6">
                {/* Error Message */}
                {(submitError || error) && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        {submitError || error}
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        {successMessage}
                    </div>
                )}

                {/* Code Input */}
                <div className="flex justify-center gap-2 sm:gap-3">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:bg-gray-800 dark:text-white transition-all duration-200"
                            disabled={isSubmitting}
                            autoFocus={index === 0}
                        />
                    ))}
                </div>

                {/* Submit Button */}
                <Button
                    onClick={onButtonSubmit}
                    className="w-full"
                    isLoading={isSubmitting || isLoading}
                    disabled={code.some(d => d === '')}
                >
                    Verify Email
                </Button>

                {/* Resend Code */}
                <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Didn't receive the code?{' '}
                        {resendCooldown > 0 ? (
                            <span className="text-gray-500">
                                Resend in {resendCooldown}s
                            </span>
                        ) : (
                            <button
                                onClick={handleResend}
                                className="text-primary-600 hover:text-primary-500 font-medium"
                                disabled={isLoading}
                            >
                                Resend Code
                            </button>
                        )}
                    </p>
                </div>

                {/* Back to Login */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/login"
                        className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
