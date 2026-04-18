"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Upload, Trash2, User, X } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import ChangePassword from "@/components/reusable/for-dashboard/ChangePassword";
import { useGetStudentProfileQuery, useUpdateStudentProfileMutation } from "@/redux/features/student/student.api";
import { toast } from "sonner";
import { appendImageVersion, resolveImageUrl, shouldBypassImageOptimization } from "@/utils/image";
import { Skeleton } from "@/components/ui/skeleton";

type ProfileFormData = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    username: string;
    email: string;
    title: string;
    bio: string;
    avatar?: File | null;
};

const SettingsPage = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [avatarVersion, setAvatarVersion] = useState(0);
    const selectedFileRef = useRef<File | null>(null);

    const { data: profileData, refetch, isLoading: isProfileLoading } = useGetStudentProfileQuery();
    const [updateStudentProfile, { isLoading: isUpdatingProfile }] = useUpdateStudentProfileMutation();
    const t = useTranslations("SettingsPage");

    const { register: registerProfile, handleSubmit: handleProfileSubmit, setValue, reset } = useForm<ProfileFormData>();

    useEffect(() => {
        const profile = profileData?.data;
        if (!profile) return;

        const fullNameParts = (profile.user?.name || "").trim().split(/\s+/).filter(Boolean);
        const fallbackFirstName = fullNameParts[0] || "";
        const fallbackLastName = fullNameParts.slice(1).join(" ");

        reset({
            firstName: profile.first_name || fallbackFirstName,
            lastName: profile.last_name || fallbackLastName,
            phoneNumber: profile.user?.phone || "",
            username: profile.user?.name || "",
            email: profile.user?.email || "",
            title: profile.title || "",
            bio: profile.bio || "",
            avatar: null,
        });
    }, [profileData, reset]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target?.result as string);
            setSelectedFile(file);
            selectedFileRef.current = file;
            setValue("avatar", file);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setPreviewImage(null);
        setSelectedFile(null);
        selectedFileRef.current = null;
        setValue("avatar", null);
    };

    const onProfileSubmit = async (data: ProfileFormData) => {
        try {
            const formData = new FormData();
            formData.append("first_name", data.firstName);
            formData.append("last_name", data.lastName);
            formData.append("phone", data.phoneNumber);
            formData.append("title", data.title);
            formData.append("bio", data.bio);

            // selectedFileRef দিয়ে সবসময় latest file নেওয়া হচ্ছে
            if (selectedFileRef.current) {
                formData.append("avatar", selectedFileRef.current);
            }

            const response = await updateStudentProfile(formData).unwrap();
            toast.success(response.message || "Profile updated successfully.");

            const updatedProfile = response.data;
            const fullNameParts = (updatedProfile.user?.name || "").trim().split(/\s+/).filter(Boolean);
            const fallbackFirstName = fullNameParts[0] || "";
            const fallbackLastName = fullNameParts.slice(1).join(" ");

            reset({
                firstName: updatedProfile.first_name || fallbackFirstName,
                lastName: updatedProfile.last_name || fallbackLastName,
                phoneNumber: updatedProfile.user?.phone || "",
                username: updatedProfile.user?.name || "",
                email: updatedProfile.user?.email || "",
                title: updatedProfile.title || "",
                bio: updatedProfile.bio || "",
                avatar: null,
            });

            setPreviewImage(null);
            setSelectedFile(null);
            selectedFileRef.current = null;
            setValue("avatar", null);

            if (selectedFileRef.current) {
                setAvatarVersion((prev) => prev + 1);
            }

            await refetch();

        } catch (error) {
            const message =
                typeof error === "object" &&
                    error !== null &&
                    "data" in error &&
                    typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to update profile";

            toast.error(message);
        }
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(false);
    };

    const resolvedApiAvatar = resolveImageUrl(profileData?.data?.user?.avatar);
    const currentAvatar =
        previewImage ||
        (resolvedApiAvatar && resolvedApiAvatar.trim()
            ? appendImageVersion(resolvedApiAvatar, avatarVersion)
            : null);

    if (isProfileLoading) {
        return (
            <div className="space-y-6">
                <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>
                <div className="bg-white rounded-md border border-border-light p-4 sm:p-6 space-y-4">
                    <Skeleton className="h-32 w-32" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} className="h-11 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-title">{t("title")}</h2>

            <form
                onSubmit={handleProfileSubmit(onProfileSubmit)}
                className="bg-white rounded-md border border-border-light p-4 sm:p-6"
            >
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar Upload */}
                    <div className="flex flex-col items-center gap-3 shrink-0">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-md overflow-hidden border border-border-light group">
                            {currentAvatar ? (
                                <Image
                                    src={currentAvatar}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                    unoptimized={shouldBypassImageOptimization(currentAvatar)}
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <User className="w-10 h-10 text-gray-400" />
                                </div>
                            )}
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

                        {selectedFile && (
                            <p className="text-[10px] text-green-600 text-center max-w-35">
                                {t("imageReady")}
                            </p>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-title mb-1 block">
                                        {t("firstNameLabel")}
                                    </label>
                                    <input
                                        {...registerProfile("firstName")}
                                        placeholder={t("firstNamePlaceholder")}
                                        className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-title mb-1 block">
                                        {t("lastNameLabel")}
                                    </label>
                                    <input
                                        {...registerProfile("lastName")}
                                        placeholder={t("lastNamePlaceholder")}
                                        className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                {t("phoneNumber")}
                            </label>
                            <input
                                {...registerProfile("phoneNumber")}
                                placeholder={t("phoneNumberPlaceholder")}
                                className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                {t("username")}
                            </label>
                            <input
                                {...registerProfile("username")}
                                placeholder={t("usernamePlaceholder")}
                                readOnly
                                className="w-full px-3 py-3 border border-gray-200 text-sm bg-gray-50 text-description cursor-not-allowed"
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

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                Bio
                            </label>
                            <textarea
                                {...registerProfile("bio")}
                                rows={4}
                                className="w-full px-3 py-3 border border-gray-300 text-sm focus:outline-none focus:border-main"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdatingProfile}
                            className="px-6 py-3 bg-main text-white text-sm font-semibold hover:bg-main/90 transition-colors"
                        >
                            {isUpdatingProfile ? "Saving..." : t("saveChanges")}
                        </button>
                    </div>
                </div>
            </form>

            <ChangePassword />

            {/* Delete Account */}
            <div className="bg-red-50 rounded-xl border border-red-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-red-700">{t("deleteAccount")}</h3>
                        <p className="text-sm text-red-600 mt-1">{t("deleteAccountDesc")}</p>
                        <p className="text-xs text-red-500 mt-1 font-medium">{t("deleteAccountWarning")}</p>
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