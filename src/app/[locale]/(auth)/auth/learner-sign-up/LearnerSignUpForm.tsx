'use client';
import React, { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { learnerSignUpSchema, type LearnerSignUpFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSignUpMutation } from '@/redux/features/auth/auth.api';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';

const LearnerSignUpForm = () => {
    const t = useTranslations('Auth');
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUp, { isLoading }] = useSignUpMutation();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LearnerSignUpFormData>({
        resolver: zodResolver(learnerSignUpSchema),
        defaultValues: { terms: false },
    });

    const onSubmit = async (data: LearnerSignUpFormData) => {
        if (!data.terms) {
            setError('terms', { message: 'You must agree to the terms' });
            return;
        }

        try {
            const response = await signUp({
                name: data.fullName,
                email: data.email,
                password: data.password,
                confirm_password: data.confirmPassword,
                accepted_terms: data.terms,
                type: 'learner',
            }).unwrap();

            toast.success(response.message || 'Registration completed successfully.');

            const verifyUrl = `/auth/verify-otp?user_id=${encodeURIComponent(response.data.id)}&email=${encodeURIComponent(data.email)}`;
            router.push(verifyUrl);
        } catch (error: unknown) {
            // console.log(error)
            const message =
                typeof error === 'object' &&
                error !== null &&
                'data' in error &&
                typeof (error as { data?: { message?: string } }).data?.message === 'string'
                    ? (error as { data?: { message?: string } }).data?.message
                    : 'Registration failed';

            toast.error(message);
        }
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-10 md:py-0">
            <div className='w-full px-6 md:px-8 lg:px-12 xl:px-16 max-w-xl'>
                <Link
                    href="/auth/sign-up"
                    className="text-sm text-description hover:text-main transition inline-flex items-center gap-1 mb-4"
                >
                    {t('backToAccountType')}
                </Link>

                <Link href="/" className="flex items-center gap-2 mb-6">
                    <PiGraduationCap className="size-10 text-main" />
                    <span className="text-3xl font-bold text-main">Form-Cert</span>
                </Link>

                <h1 className="text-3xl font-bold text-header mb-2">{t('learnerRegistrationTitle')}</h1>
                <p className="text-description mb-6">{t('registrationSubtitle')}</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">{t('fullName')}</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('fullNamePlaceholder')}
                                {...register('fullName')}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">{t('emailAddress')}</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder={t('emailPlaceholder')}
                                {...register('email')}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">{t('password')}</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('passwordPlaceholder')}
                                {...register('password')}
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
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">{t('confirmPassword')}</label>
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
                        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
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
                            <Link href="/terms-and-conditions" className="text-main hover:underline">{t('termsAndConditions')}</Link>
                            <span> {t('and')} </span>
                            <Link href="/privacy-policy" className="text-main hover:underline">{t('privacyPolicy')}</Link>
                        </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting || isLoading}
                        className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                    >
                        {t('createAccount')}
                    </button>
                </form>

                <p className="text-sm text-description mt-6 text-center">
                    {t('alreadyHaveAccount')}{' '}
                    <Link href="/auth/sign-in" className="text-main font-semibold hover:underline">
                        {t('signIn')}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LearnerSignUpForm;
