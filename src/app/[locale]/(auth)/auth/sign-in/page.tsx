"use client";
import React, { useState } from "react";
import { Link } from "@/i18n/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  type SignInFormData,
} from "@/validation/auth.validation";
import { PiGraduationCap } from "react-icons/pi";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import AuthBanner from "@/components/auth/AuthBanner";
import { useSignInMutation } from "@/redux/features/auth/auth.api";
import { saveAuthCookies } from "@/utils/auth-client";
import { getDashboardPathByRole } from "@/utils/auth-shared";
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";

const SignIn = () => {
  const t = useTranslations("Auth");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [signIn, { isLoading }] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "mahedi.dev2002@gmail.com",
      password: "12345678@"
    }
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await signIn(data).unwrap();

      if (!response?.success || !response?.data?.access_token) {
        toast.error(response?.message || "Unable to sign in");
        return;
      }

      saveAuthCookies({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        role: response.data.role,
      });

      toast.success(response.message || "Login successful");
      
      const invitationToken = localStorage.getItem('invitation_token');
      if (invitationToken) {
        router.replace('/organization-invitation');
      } else {
        router.replace(getDashboardPathByRole(response.data.role));
      }
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "data" in error &&
          typeof (error as { data?: { message?: string } }).data?.message === "string"
          ? (error as { data?: { message?: string } }).data?.message
          : "Invalid email or password";

      toast.error(message || "Sign in failed");
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

          <h1 className="text-3xl font-bold text-header mb-2">{t("signInTitle")}</h1>
          <p className="text-description mb-8">
            {t("signInSubtitle")}
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-header mb-2">
                {t("emailAddress")}
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-header mb-2">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={"Enter your password"}
                  {...register("password")}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition placeholder:text-gray-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-300 accent-main"
                />
                <span className="text-sm text-description">{t("rememberMe")}</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-main font-semibold hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3 bg-main text-white font-semibold rounded-md hover:bg-main/90 transition disabled:opacity-50 cursor-pointer"
            >
              {t("signInButton")}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-description">{t("or")}</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Sign up link */}
          <p className="text-sm text-description text-center">
            {t("dontHaveAccount")}{" "}
            <Link
              href="/auth/sign-up"
              className="text-main font-semibold hover:underline"
            >
              {t("signUp")}
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <AuthBanner />
    </div>
  );
};

export default SignIn;
