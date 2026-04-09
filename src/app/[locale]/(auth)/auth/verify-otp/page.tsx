'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, type VerifyOtpFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { useTranslations } from 'next-intl';
import AuthBanner from '@/components/auth/AuthBanner';
import { useResendVerificationCodeMutation, useVerifyEmailMutation } from '@/redux/features/auth/auth.api';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { getCurrentTimestampMs } from '@/utils/time';

const VerifyOtp = () => {
    const t = useTranslations('Auth');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(49);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [verifyEmail, { isLoading: isVerifyLoading }] = useVerifyEmailMutation();
    const [resendVerificationCode, { isLoading: isResendLoading }] = useResendVerificationCodeMutation();

    const userId = searchParams.get('user_id') ?? '';
    const email = searchParams.get('email') ?? '';

    const {
        handleSubmit,
        setValue,
        formState: { isSubmitting },
    } = useForm<VerifyOtpFormData>({
        resolver: zodResolver(verifyOtpSchema),
    });

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    useEffect(() => {
        if (!userId || !email) {
            toast.error('Missing verification context. Please sign up again.');
        }
    }, [userId, email]);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        setValue('otp', newOtp.join(''));

        // Auto focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')]);
        setValue('otp', pastedData);

        const lastFilledIndex = Math.min(pastedData.length - 1, 5);
        inputRefs.current[lastFilledIndex]?.focus();
    };

    const onSubmit = async (data: VerifyOtpFormData) => {
        if (!userId) {
            toast.error('Missing user id. Please sign up again.');
            return;
        }

        try {
            const response = await verifyEmail({
                user_id: userId,
                code: data.otp,
            }).unwrap();

            toast.success(response.message || 'Email verified successfully');
            router.replace('/auth/sign-in');
        } catch (error: unknown) {
            console.log(error)
            const message =
                typeof error === 'object' &&
                error !== null &&
                'data' in error &&
                typeof (error as { data?: { message?: string } }).data?.message === 'string'
                    ? (error as { data?: { message?: string } }).data?.message
                    : 'OTP verification failed';

            toast.error(message);
        }
    };

    const handleResend = async () => {
        if (!email) {
            toast.error('Missing email. Please sign up again.');
            return;
        }

        try {
            const response = await resendVerificationCode({ email }).unwrap();
            const now = getCurrentTimestampMs();
            const nextCountdown = Math.max(0, Math.floor((response.data.expires_at - now) / 1000));
            setCountdown(nextCountdown || 49);
            toast.success(response.message || 'Verification code sent successfully');
        } catch (error: unknown) {
            const message =
                typeof error === 'object' &&
                error !== null &&
                'data' in error &&
                typeof (error as { data?: { message?: string } }).data?.message === 'string'
                    ? (error as { data?: { message?: string } }).data?.message
                    : 'Failed to resend verification code';

            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                <div className="w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-xl">
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <PiGraduationCap className="size-10 text-main" />
                        <span className="text-3xl font-bold text-main">Form-Cert</span>
                    </Link>

                    <h1 className="text-3xl font-bold text-header mb-2">{t('verifyTitle')}</h1>
                    <p className="text-description mb-8">
                        {t('verifySubtitle')}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                        {/* OTP Inputs */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-3">
                                {t('enterOtp')}
                            </label>
                            <div className="flex gap-2 justify-between">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="size-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Resend Link */}
                        <div className="text-center">
                            <span className="text-sm text-description">{t('didntReceiveCode')} </span>
                            {countdown > 0 ? (
                                <span className="text-sm text-main font-semibold">{t('resendWithTimer', { seconds: countdown })}</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    disabled={isResendLoading}
                                    className="text-sm text-main font-semibold hover:underline"
                                >
                                    {t('resend')}
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isVerifyLoading || otp.join('').length !== 6}
                            className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                        >
                            {t('verify')}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <AuthBanner/>
        </div>
    );
};

export default VerifyOtp;
