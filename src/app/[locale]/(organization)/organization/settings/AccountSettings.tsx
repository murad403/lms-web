"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accountSettingsSchema } from "@/validation/auth.validation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { useGetWhiteLabelQuery, useUpdateWhiteLabelMutation } from "@/redux/features/organization/organization.api";
import { Skeleton } from "@/components/ui/skeleton";

type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;

const AccountSettings = () => {
    const t = useTranslations("OrganizationSettings");

    const { data: whiteLabelData, isLoading } = useGetWhiteLabelQuery();
    const [updateWhiteLabel, { isLoading: isUpdating }] = useUpdateWhiteLabelMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<AccountSettingsFormData>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            phone: "",
            biography: "",
        },
    });

    useEffect(() => {
        if (whiteLabelData?.data) {
            const profile = whiteLabelData.data;

            reset({
                schoolName: profile.name || "",
                phone: profile.phone || "",
                biography: profile.bio || "",
            });
        }
    }, [whiteLabelData, reset]);

    const onSubmit = async (data: AccountSettingsFormData) => {
        try {
            const formData = new FormData();
            formData.append("name", data.schoolName);
            formData.append("phone", data.phone);
            if (whiteLabelData?.data?.username) {
                formData.append("username", whiteLabelData.data.username);
            }
            if (data.biography !== undefined) {
                formData.append("bio", data.biography || "");
            }
            const res = await updateWhiteLabel(formData).unwrap();
            toast.success(res.message || "Account settings updated successfully!");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update account settings");
        }
    };

    if (isLoading) {
        return (
            <div className="bg-white border border-border-light p-6 mt-4 rounded-md space-y-6">
                <Skeleton className="h-6 w-48 mb-6" />
                <div className="space-y-5">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-28 w-full" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-border-light p-6 mt-4 rounded-md">
            <h2 className="text-lg font-bold text-title mb-6">{t("accountSettings")}</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* School Name */}
                <div>
                    <label className="block text-sm text-description mb-1.5">{t("schoolName")}</label>
                    <input
                        {...register("schoolName")}
                        placeholder={t("schoolNamePlaceholder")}
                        className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main text-title placeholder:text-description"
                    />
                    {errors.schoolName && (
                        <p className="text-xs text-red-500 mt-1">{errors.schoolName.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm text-description mb-1.5">{t("phoneNumber")}</label>
                    <input
                        {...register("phone")}
                        type="tel"
                        placeholder={t("phonePlaceholder")}
                        className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main text-title placeholder:text-description"
                    />
                    {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Biography */}
                <div>
                    <label className="block text-sm text-description mb-1.5">{t("biography")}</label>
                    <textarea
                        {...register("biography")}
                        rows={4}
                        placeholder={t("biographyPlaceholder")}
                        className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main text-title placeholder:text-description resize-none"
                    />
                </div>

                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        disabled={isSubmitting || isUpdating}
                        className="px-6 py-2.5 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-60"
                    >
                        {(isSubmitting || isUpdating) ? t("saving") : t("saveChanges")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;
