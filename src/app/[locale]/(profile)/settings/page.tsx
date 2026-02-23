"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Upload, Trash2, X } from "lucide-react";
import { userProfile } from "@/lib/profile";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import ChangePassword from "@/components/reusable/for-dashboard/ChangePassword";

type ProfileFormData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    title: string;
    avatar?: File | null;
};

const SettingsPage = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string>("");
    const t = useTranslations("SettingsPage");

    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        setValue,
    } = useForm<ProfileFormData>({
        defaultValues: {
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            username: userProfile.username,
            email: userProfile.email,
            title: userProfile.title,
        },
    });

    

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUploadError("");

        if (!file) return;

        // Validate file size (1MB = 1048576 bytes)
        if (file.size > 1048576) {
            setUploadError(t("imageSizeError"));
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setUploadError(t("invalidImageError"));
            return;
        }

        // Create image to check dimensions
        const img = new window.Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.src = event.target?.result as string;

            img.onload = () => {
                // Optional: Check if image is square (1:1 ratio)
                const aspectRatio = img.width / img.height;
                if (Math.abs(aspectRatio - 1) > 0.1) {
                    setUploadError(t("imageRatioError"));
                    return;
                }
                setPreviewImage(event.target?.result as string);
                setSelectedFile(file);
                setValue("avatar", file);
            };
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        setValue("avatar", null);
        setUploadError("");
    };

    const onProfileSubmit = async (data: ProfileFormData) => {
        try {
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("username", data.username);
            formData.append("title", data.title);

            if (selectedFile) {
                formData.append("avatar", selectedFile);
            }

            console.log("Profile update:", data);
            console.log("Selected file:", selectedFile);

        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    

    const handleDeleteAccount = () => {
        // TODO: API call to delete account
        setShowDeleteModal(false);
    };

    const currentAvatar = previewImage || userProfile.avatar;

    return (
        <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>

            {/* Profile Settings */}
            <form
                onSubmit={handleProfileSubmit(onProfileSubmit)}
                className="bg-white rounded-md border border-border-light p-4 sm:p-6"
            >
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-border-light group">
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
                                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
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
                            {previewImage ? t("changePhoto") : t("uploadPhoto")}
                        </label>

                        <p className="text-[10px] text-description text-center max-w-35">
                            {t("imageSizeHint")}
                        </p>

                        {uploadError && (
                            <p className="text-[10px] text-red-500 text-center max-w-35">
                                {uploadError}
                            </p>
                        )}

                        {selectedFile && !uploadError && (
                            <p className="text-[10px] text-green-600 text-center max-w-35">
                                {t("imageReady")}
                            </p>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                {t("fullName")}
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    {...registerProfile("firstName")}
                                    placeholder={t("firstNamePlaceholder")}
                                    className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                                />
                                <input
                                    {...registerProfile("lastName")}
                                    placeholder={t("lastNamePlaceholder")}
                                    className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                {t("username")}
                            </label>
                            <input
                                {...registerProfile("username")}
                                placeholder={t("usernamePlaceholder")}
                                className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                {t("email")}
                            </label>
                            <input
                                {...registerProfile("email")}
                                placeholder={t("emailPlaceholder")}
                                readOnly
                                className="w-full px-3 py-3 border border-gray-200 text-sm bg-gray-50 text-description cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                {t("titleLabel")}
                            </label>
                            <input
                                {...registerProfile("title")}
                                placeholder={t("titlePlaceholder")}
                                className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors"
                        >
                            {t("saveChanges")}
                        </button>
                    </div>
                </div>
            </form>

            {/* Change Password */}
            <ChangePassword/>

            {/* Delete Account */}
            <div className="bg-red-50 rounded-xl border border-red-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-red-700">{t("deleteAccount")}</h3>
                        <p className="text-sm text-red-600 mt-1">
                            {t("deleteAccountDesc")}
                        </p>
                        <p className="text-xs text-red-500 mt-1 font-medium">
                            {t("deleteAccountWarning")}
                        </p>
                    </div>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-5 py-3 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-1.5 shrink-0"
                    >
                        <Trash2 className="w-4 h-4" />
                        {t("delete")}
                    </button>
                </div>
            </div>

            {/* Delete Account Modal */}
            <AlertDialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
                <AlertDialogContent className="max-w-sm">
                    <AlertDialogHeader className="items-center">
                        <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mb-2">
                            <Trash2 className="w-6 h-6 text-red-500" />
                        </div>
                        <AlertDialogTitle className="text-lg font-bold text-title">
                            {t("deleteAccount")}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-description text-center">
                            {t("deleteAccountConfirm")}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row gap-3 sm:justify-center">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                        >
                            {t("cancel")}
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                            {t("yesDelete")}
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SettingsPage;