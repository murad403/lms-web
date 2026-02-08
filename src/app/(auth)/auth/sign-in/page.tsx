'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type SignInFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import authImage from '@/assets/auth/auth.png';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        console.log('Sign in:', data);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                <div className='w-full md:w-1/2 px-5 md:px-0'>
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <PiGraduationCap className="size-10 text-main" />
                        <span className="text-3xl font-bold text-main">Form-Cert</span>
                    </Link>

                    <h1 className="text-3xl font-bold text-header mb-2">Welcome Back</h1>
                    <p className="text-description mb-8">
                        Sign in to access your courses and certifications
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type="email"
                                    placeholder="your.email@example.com"
                                    {...register('email')}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
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
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Remember me & Forgot password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="size-4 rounded border-gray-300 accent-main"
                                />
                                <span className="text-sm text-description">Remember me</span>
                            </label>
                            <Link
                                href="#"
                                className="text-sm text-main font-semibold hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-sm text-description">or</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Sign up link */}
                    <p className="text-sm text-description text-center">
                        Don&apos;t have an account?{' '}
                        <Link href="/auth/sign-up" className="text-main font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="hidden lg:flex w-1/2 bg-main items-center justify-center p-12">
                <Image
                    src={authImage}
                    alt="Learning illustration"
                    width={500}
                    height={500}
                    className="max-w-full h-auto object-contain"
                    priority
                />
            </div>
        </div>
    );
};

export default SignIn;
