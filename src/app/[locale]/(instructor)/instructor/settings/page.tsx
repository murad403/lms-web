"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, X } from "lucide-react";
import { instructorProfile } from "@/lib/instructor";
import { Link } from "@/i18n/navigation";

type ProfileFormData = {
    firstName: string;
    lastName: string;
    username: string;
    phone: string;
    title: string;
    biography: string;
    avatar?: File | null;
};

type PasswordFormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const TITLE_MAX = 50;

const InstructorSettingsPage = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState("");

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        setValue,
        watch,
    } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: instructorProfile.firstName,
            lastName: instructorProfile.lastName,
            username: "fillipo_franzies",
            phone: instructorProfile.phone,
            title: instructorProfile.title,
            biography: instructorProfile.bio,
        },
    });

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
    } = useForm<PasswordFormData>();

    const titleValue = watch("title") || "";

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
            setValue("avatar", file);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        setValue("avatar", null);
        setUploadError("");
    };

    const onProfileSubmit = (data: ProfileFormData) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, val]) => {
            if (val && key !== "avatar") formData.append(key, val as string);
        });
        if (selectedFile) formData.append("avatar", selectedFile);
        // TODO: API call
        console.log("Profile update:", data);
    };

    const onPasswordSubmit = (data: PasswordFormData) => {
        // TODO: API call
        console.log("Password change:", data);
    };

    const currentAvatar = previewImage || instructorProfile.avatar;

    return (
        <div className="space-y-6">
            {/* Account Settings */}
            <form
                onSubmit={handleProfileSubmit(onProfileSubmit)}
                className="bg-white rounded-lg border border-border-light p-4 sm:p-6"
            >
                <h3 className="text-base font-bold text-title mb-5">
                    Account Settings
                </h3>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-border-light group">
                            <Image
                                src={currentAvatar}
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                            {previewImage && (
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>

                        <input
                            type="file"
                            id="avatar-upload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="avatar-upload"
                            className="flex items-center gap-1.5 text-xs text-main font-medium hover:text-main/80 transition-colors cursor-pointer"
                        >
                            <Upload className="w-3.5 h-3.5" />
                            {previewImage ? "Change Photo" : "Upload Photo"}
                        </label>
                        <p className="text-[10px] text-description text-center max-w-35">
                            Image size should be under 1MB and ratio 1:1
                        </p>
                        {uploadError && (
                            <p className="text-[10px] text-red-500 text-center max-w-35">
                                {uploadError}
                            </p>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                        {/* Name Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-title mb-1.5 block">
                                    Full Name
                                </label>
                                <input
                                    {...registerProfile("firstName")}
                                    className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    placeholder="First name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-title mb-1.5 block">
                                    Username
                                </label>
                                <input
                                    {...registerProfile("username")}
                                    className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    placeholder="Username"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Phone Number
                            </label>
                            <div className="flex gap-2">
                                <select className="border border-border-light rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white w-20">
                                    <option value="+880">+880</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+39">+39</option>
                                </select>
                                <input
                                    {...registerProfile("phone")}
                                    className="flex-1 border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                                    placeholder="Phone number"
                                />
                            </div>
                        </div>

                        {/* Title with counter */}
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Title
                            </label>
                            <div className="relative">
                                <input
                                    {...registerProfile("title", {
                                        maxLength: TITLE_MAX,
                                    })}
                                    maxLength={TITLE_MAX}
                                    className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                                    placeholder="e.g. Web Designer & Instructor"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                                    {titleValue.length}/{TITLE_MAX}
                                </span>
                            </div>
                        </div>

                        {/* Biography */}
                        <div>
                            <label className="text-sm font-medium text-title mb-1.5 block">
                                Biography
                            </label>
                            <textarea
                                {...registerProfile("biography")}
                                rows={4}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main resize-none"
                                placeholder="Tell us about yourself"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {/* Change Password */}
            <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="bg-white rounded-lg border border-border-light p-4 sm:p-6"
            >
                <h3 className="text-base font-bold text-title mb-5">
                    Change Password
                </h3>

                <div className="space-y-4 max-w-lg">
                    {/* Current Password */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                {...registerPassword("currentPassword", { required: true })}
                                type={showCurrentPassword ? "text" : "password"}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-10"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-description"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                {...registerPassword("newPassword", { required: true })}
                                type={showNewPassword ? "text" : "password"}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-10"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-description"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                {...registerPassword("confirmPassword", { required: true })}
                                type={showConfirmPassword ? "text" : "password"}
                                className="w-full border border-border-light rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-10"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-description"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-main hover:underline"
                        >
                            Forgot Password?
                        </Link>
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-main text-white rounded-lg text-sm font-medium hover:bg-main/90 transition-colors"
                        >
                            Change Password
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InstructorSettingsPage;
