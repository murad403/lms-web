'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { partnerSignUpSchema, type PartnerSignUpFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react';

const PartnerSignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<PartnerSignUpFormData>({
        resolver: zodResolver(partnerSignUpSchema),
        defaultValues: { terms: false },
    });

    const onSubmit = async (data: PartnerSignUpFormData) => {
        if (!data.terms) {
            setError('terms', { message: 'You must agree to the terms' });
            return;
        }
        console.log('Partner sign up:', data);
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center py-10 md:py-0">
            <div className="w-full md:w-1/2 px-5 md:px-0">
                <Link
                    href="/auth/sign-up"
                    className="text-sm text-description hover:text-main transition inline-flex items-center gap-1 mb-4"
                >
                    &larr; Back to account type
                </Link>

                <Link href="/" className="flex items-center gap-2 mb-6">
                    <PiGraduationCap className="size-10 text-main" />
                    <span className="text-3xl font-bold text-main">Form-Cert</span>
                </Link>

                <h1 className="text-3xl font-bold text-header mb-2">Become a Partner</h1>
                <p className="text-description mb-6">Complete your registration to get started</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                    {/* Contact Person Name */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">Contact Person Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                {...register('contactPersonName')}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.contactPersonName && <p className="text-red-500 text-xs mt-1">{errors.contactPersonName.message}</p>}
                    </div>

                    {/* Organization Name */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">Organization Name</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Your Organization Name"
                                {...register('organizationName')}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.organizationName && <p className="text-red-500 text-xs mt-1">{errors.organizationName.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                {...register('email')}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-semibold text-header mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Minimum 8 characters"
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
                        <label className="block text-sm font-semibold text-header mb-2">Confirm Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Re-enter your password"
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
                            I agree to the{' '}
                            <Link href="/terms-of-service" className="text-main hover:underline">Terms of Service</Link>
                            <span> and </span>
                            <Link href="/privacy-policy" className="text-main hover:underline">Privacy Policy</Link>
                        </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-sm text-description mt-6 text-center">
                    Already have an account?{' '}
                    <Link href="/auth/sign-in" className="text-main font-semibold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PartnerSignUpForm;
