'use client';

import React, { useState } from 'react';
import { Link, useRouter } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordSchema, type ResetPasswordFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AuthBanner from '@/components/auth/AuthBanner';
import { useResetPasswordMutation } from '@/redux/features/auth/auth.api';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const ResetPassword = () => {
    const t = useTranslations('Auth');
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    const userId = searchParams.get('user_id') ?? '';
    const secretKey = searchParams.get('secret_key') ?? '';

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: { terms: false },
    });

    const onSubmit = async (data: ResetPasswordFormData) => {
        if (!data.terms) {
            setError('terms', { message: 'You must agree to the terms' });
            return;
        }

        if (!userId || !secretKey) {
            toast.error('Missing reset context. Please restart the forgot password flow.');
            return;
        }

        try {
            const response = await resetPassword({
                secret_key: secretKey,
                user_id: userId,
                new_password: data.newPassword,
                confirm_password: data.confirmPassword,
            }).unwrap();

            toast.success(response.message || 'Password Reset Successful!');
            router.replace('/auth/sign-in');
        } catch (error: unknown) {
            const message =
                typeof error === 'object' &&
                error !== null &&
                'data' in error &&
                typeof (error as { data?: { message?: string } }).data?.message === 'string'
                    ? (error as { data?: { message?: string } }).data?.message
                    : 'Failed to reset password';

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

                    <h1 className="text-3xl font-bold text-header mb-2">{t('resetPasswordTitle')}</h1>
                    <p className="text-description mb-8">{t('resetPasswordSubtitle')}</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                {t('newPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t('passwordPlaceholder')}
                                    {...register('newPassword')}
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                            {errors.newPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {/* Confirm New Password */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                {t('confirmNewPassword')}
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder={t('confirmPasswordPlaceholder')}
                                    {...register('confirmPassword')}
                                    className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                >
                                    {showConfirmPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register('terms')}
                                className="size-4 rounded border-gray-300 accent-main mt-0.5"
                            />
                            <span className="text-sm text-description">
                                {t('iAgree')}{' '}
                                <Link href="#" className="text-main hover:underline">
                                    {t('termsOfService')}
                                </Link>
                                <span> {t('and')} </span>
                                <Link href="#" className="text-main hover:underline">
                                    {t('privacyPolicy')}
                                </Link>
                            </span>
                        </label>
                        {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isLoading}
                            className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                        >
                            {t('resetPasswordButton')}
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side - Image */}
            <AuthBanner/>
        </div>
    );
};

export default ResetPassword;
