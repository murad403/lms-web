"use client";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown } from "lucide-react";
import { accountSettingsSchema } from "@/validation/auth.validation";
import { useTranslations } from "next-intl";

type AccountSettingsFormData = z.infer<typeof accountSettingsSchema>;

const countryCodes = [
    { code: "+880", country: "BD" },
    { code: "+1", country: "US" },
    { code: "+44", country: "GB" },
    { code: "+91", country: "IN" },
    { code: "+61", country: "AU" },
    { code: "+49", country: "DE" },
    { code: "+33", country: "FR" },
];

const AccountSettings = () => {
    const [showCodeDropdown, setShowCodeDropdown] = useState(false);
    const [titleLength, setTitleLength] = useState(0);
    const t = useTranslations("OrganizationSettings");

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<AccountSettingsFormData>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            phoneCode: "+880",
            title: "",
            biography: "",
        },
    });

    const selectedCode = useWatch({ control, name: "phoneCode" });

    const onSubmit = async (data: AccountSettingsFormData) => {
        // TODO: connect to API
        console.log("Account settings saved:", data);
    };

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

                {/* Username */}
                <div>
                    <label className="block text-sm text-description mb-1.5">{t("username")}</label>
                    <input
                        {...register("username")}
                        placeholder={t("usernamePlaceholder")}
                        className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main text-title placeholder:text-description"
                    />
                    {errors.username && (
                        <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm text-description mb-1.5">{t("phoneNumber")}</label>
                    <div className="flex items-stretch border border-border-light focus-within:border-main overflow-visible">
                        {/* Country code selector */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowCodeDropdown(!showCodeDropdown)}
                                className="flex items-center gap-1 px-3 py-2.5 text-sm text-main font-medium border-r border-border-light bg-gray-50-md h-full"
                            >
                                {selectedCode}
                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>
                            {showCodeDropdown && (
                                <div className="absolute left-0 top-full mt-1 bg-white border border-border-light shadow-lg z-20 w-32">
                                    {countryCodes.map((c) => (
                                        <button
                                            key={c.code}
                                            type="button"
                                            onClick={() => {
                                                setValue("phoneCode", c.code);
                                                setShowCodeDropdown(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${selectedCode === c.code ? "text-main font-medium" : "text-title"
                                                }`}
                                        >
                                            {c.code} <span className="text-description">{c.country}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* Phone input */}
                        <input
                            {...register("phone")}
                            type="tel"
                            placeholder={t("phonePlaceholder")}
                            className="flex-1 px-4 py-2.5 text-sm focus:outline-none text-title placeholder:text-description bg-transparent"
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                </div>

                {/* Title */}
                <div>
                    <label className="block text-sm text-description mb-1.5">{t("title")}</label>
                    <div className="relative">
                        <input
                            {...register("title", {
                                onChange: (e) => setTitleLength(e.target.value.length),
                            })}
                            maxLength={50}
                            placeholder={t("titlePlaceholder")}
                            className="w-full px-4 py-2.5 pr-14 text-sm border border-border-light focus:outline-none focus:border-main text-title placeholder:text-description"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                            {titleLength}/50
                        </span>
                    </div>
                    {errors.title && (
                        <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
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
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors disabled:opacity-60"
                    >
                        {isSubmitting ? t("saving") : t("saveChanges")}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AccountSettings;
