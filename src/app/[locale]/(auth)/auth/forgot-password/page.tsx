'use client';
import { Link } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { Mail } from 'lucide-react';
import AuthBanner from '@/components/auth/AuthBanner';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log('Forgot password:', data);
    // Navigate to verify OTP page after successful submission
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

          <h1 className="text-3xl font-bold text-header mb-2">Forgot Password?</h1>
          <p className="text-description mb-8">
            Enter your email and we&apos;ll send you a OTP to verify
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <AuthBanner/>
    </div>
  );
};

export default ForgotPassword;
