'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, type VerifyOtpFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import AuthBanner from '@/components/auth/AuthBanner';

const VerifyOtp = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [countdown, setCountdown] = useState(49);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
        console.log('Verify OTP:', data);
        // Navigate to reset password page after successful verification
    };

    const handleResend = () => {
        setCountdown(49);
        console.log('Resend OTP');
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
                <div className="w-full md:w-1/2 px-5 md:px-0">
                    <Link href="/" className="flex items-center gap-2 mb-10">
                        <PiGraduationCap className="size-10 text-main" />
                        <span className="text-3xl font-bold text-main">Form-Cert</span>
                    </Link>

                    <h1 className="text-3xl font-bold text-header mb-2">Verify your email</h1>
                    <p className="text-description mb-8">
                        Enter your OTP we sent to your email address
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* OTP Inputs */}
                        <div>
                            <label className="block text-sm font-semibold text-header mb-3">
                                Enter your OTP
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
                            <span className="text-sm text-description">Didn&apos;t Receive Code? </span>
                            {countdown > 0 ? (
                                <span className="text-sm text-main font-semibold">Resend ({countdown}s)</span>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResend}
                                    className="text-sm text-main font-semibold hover:underline"
                                >
                                    Resend
                                </button>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || otp.join('').length !== 6}
                            className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
                        >
                            Verify
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
