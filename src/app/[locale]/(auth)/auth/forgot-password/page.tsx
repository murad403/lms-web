'use client';
import { Link } from '@/i18n/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '@/validation/auth.validation';
import { PiGraduationCap } from 'react-icons/pi';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';
import AuthBanner from '@/components/auth/AuthBanner';
import { useForgotPasswordMutation } from '@/redux/features/auth/auth.api';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';

const ForgotPassword = () => {
  const t = useTranslations('Auth');
  const router = useRouter();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const response = await forgotPassword({ email: data.email }).unwrap();

      toast.success(response.message || 'Reset password code sent successfully.');

      router.push(
        `/auth/verify-otp?mode=reset&user_id=${encodeURIComponent(response.data.user_id)}&email=${encodeURIComponent(data.email)}&expires_at=${encodeURIComponent(String(response.data.expires_at))}`
      );
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'data' in error &&
        typeof (error as { data?: { message?: string } }).data?.message === 'string'
          ? (error as { data?: { message?: string } }).data?.message
          : 'Failed to send reset code';

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

          <h1 className="text-3xl font-bold text-header mb-2">{t('forgotPasswordTitle')}</h1>
          <p className="text-description mb-8">
            {t('forgotPasswordSubtitle')}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-header mb-2">
                {t('emailAddress')}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={t('emailPlaceholder')}
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
              disabled={isSubmitting || isLoading}
              className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
            >
              {t('sendOtp')}
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
