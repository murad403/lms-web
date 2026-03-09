/* eslint-disable react-hooks-incompatible-library */
"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { instructorProfile } from "@/lib/instructor";
import { useTranslations } from "next-intl";

const TITLE_MAX = 50;

const accountSettingsSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(3, "Username must be at least 3 characters"),
    title: z.string().max(TITLE_MAX, `Title must be ${TITLE_MAX} characters or less`).optional(),
    biography: z.string().optional(),
});

type AccountSettingsForm = z.infer<typeof accountSettingsSchema>;

const AccoutSettings = () => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("");
    const t = useTranslations("InstructorSettings");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<AccountSettingsForm>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            firstName: instructorProfile.firstName,
            lastName: instructorProfile.lastName,
            username: "fillipo_franzies",
            title: instructorProfile.title,
            biography: instructorProfile.bio,
        },
    });

    const titleValue = watch("title") || "";
    const currentAvatar = previewImage || instructorProfile.avatar;

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUploadError("");
        if (!file) return;

        if (file.size > 1048576) {
            setUploadError("Image must be less than 1MB");
            return;
        }
        if (!file.type.startsWith("image/")) {
            setUploadError("Please upload an image file");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target?.result as string);
            setSelectedFile(file);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = (data: AccountSettingsForm) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => {
            if (val) formData.append(key, val as string);
        });
        if (selectedFile) formData.append("avatar", selectedFile);
        // TODO: API call
        console.log("Profile update:", data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg border border-border-light p-4 sm:p-6"
        >
            <h3 className="text-base font-bold text-title mb-5">
                {t("accountSettings")}
            </h3>

            <div className="flex flex-col-reverse md:flex-row gap-8">
                {/* Form Fields - Left Side */}
                <div className="flex-1 space-y-4">
                    {/* Full Name Row */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("fullName")}
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <input
                                    {...register("firstName")}
                                    className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    placeholder={t("firstNamePlaceholder")}
                                />
                                {errors.firstName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>
                                )}
                            </div>
                            <div>
                                <input
                                    {...register("lastName")}
                                    className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    placeholder={t("lastNamePlaceholder")}
                                />
                                {errors.lastName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("username")}
                        </label>
                        <input
                            {...register("username")}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            placeholder={t("usernamePlaceholder")}
                        />
                        {errors.username && (
                            <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
                        )}
                    </div>


                    {/* Title with counter */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("title")}
                        </label>
                        <div className="relative">
                            <input
                                {...register("title")}
                                maxLength={TITLE_MAX}
                                className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                                placeholder={t("titlePlaceholder")}
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                                {titleValue.length}/{TITLE_MAX}
                            </span>
                        </div>
                    </div>

                    {/* Biography */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("biography")}
                        </label>
                        <textarea
                            {...register("biography")}
                            rows={4}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                            placeholder={t("biographyPlaceholder")}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            {t("saveChanges")}
                        </button>
                    </div>
                </div>

                {/* Avatar Upload - Right Side */}
                <div className="flex flex-col items-center gap-3 shrink-0 md:pt-6">
                    <div className="relative w-36 h-36 overflow-hidden border border-border-light group">
                        <Image
                            src={currentAvatar}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                            <div className="flex items-center gap-1.5 text-white text-sm font-medium">
                                <Upload className="w-4 h-4" />
                                {t("uploadPhoto")}
                            </div>
                        </label>
                    </div>
                    <p className="text-xs text-description text-center max-w-36">
                        Image size should be under 1MB<br />
                        and image ration needs to be 1:1
                    </p>
                    {uploadError && (
                        <p className="text-xs text-red-500 text-center max-w-36">
                            {uploadError}
                        </p>
                    )}
                </div>
            </div>
        </form>
    );
};

export default AccoutSettings;
