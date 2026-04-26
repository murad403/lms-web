"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type ChangePasswordForm = z.infer<typeof changePasswordSchema>;

const ChangePassword = ({
    buttonColor = "bg-main",
    isPageLoading = false,
}: {
    buttonColor?: string;
    isPageLoading?: boolean;
}) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const t = useTranslations("InstructorSettings");
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<ChangePasswordForm>({
        resolver: zodResolver(changePasswordSchema),
    });
    const isSubmitting = isLoading;

    const onSubmit = async (data: ChangePasswordForm) => {
        try {
            const response = await changePassword({
                old_password: data.currentPassword,
                new_password: data.newPassword,
                confirm_password: data.confirmPassword,
            }).unwrap();

            toast.success(response.message || "Password changed successfully.");
            reset();
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to change password";

            toast.error(message);
        }
    };

    if (isPageLoading) {
        return (
            <div className="bg-white rounded-xl shadow max-w-2xl border border-border-light p-4 sm:p-6 space-y-5">
                <Skeleton className="h-6 w-40" />

                <div className="space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-11 w-full" />
                    <Skeleton className="h-3 w-28 ml-auto" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-11 w-full" />
                </div>

                <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-11 w-full" />
                </div>

                <Skeleton className="h-11 w-36" />
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-xl shadow max-w-2xl border border-border-light p-4 sm:p-6"
        >
            <h3 className="text-base font-bold text-title mb-5">
                {t("changePassword")}
            </h3>

            <div className="space-y-4">
                {/* Current Password */}
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        {t("currentPassword")}
                    </label>
                    <div className="relative">
                        <input
                            {...register("currentPassword")}
                            type={showCurrentPassword ? "text" : "password"}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-10"
                            placeholder={t("passwordPlaceholder")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-description"
                        >
                            {showCurrentPassword ? (
                                <Eye className="w-4 h-4" />
                            ) : (
                                <EyeOff className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    {errors.currentPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>
                    )}
                    <div className="flex justify-end mt-1">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-red-500 hover:underline"
                        >
                            {t("forgotPassword")}
                        </Link>
                    </div>
                </div>

                {/* New Password */}
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        {t("newPassword")}
                    </label>
                    <div className="relative">
                        <input
                            {...register("newPassword")}
                            type={showNewPassword ? "text" : "password"}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-10"
                            placeholder={t("passwordPlaceholder")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-description"
                        >
                            {showNewPassword ? (
                                <Eye className="w-4 h-4" />
                            ) : (
                                <EyeOff className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="text-sm font-medium text-title mb-1.5 block">
                        {t("confirmPassword")}
                    </label>
                    <div className="relative">
                        <input
                            {...register("confirmPassword")}
                            type={showConfirmPassword ? "text" : "password"}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-10"
                            placeholder={t("confirmPasswordPlaceholder")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-description"
                        >
                            {showConfirmPassword ? (
                                <Eye className="w-4 h-4" />
                            ) : (
                                <EyeOff className="w-4 h-4" />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                    )}
                </div>

                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${buttonColor} px-6 py-3 cursor-pointer text-white text-sm font-medium hover:opacity-90 transition-opacity`}
                    >
                        {isSubmitting ? "Updating..." : t("changePassword")}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ChangePassword;
