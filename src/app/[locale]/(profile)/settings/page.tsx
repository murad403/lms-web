"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, Trash2, X } from "lucide-react";
import { userProfile } from "@/lib/profile";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Link } from "@/i18n/navigation";

type ProfileFormData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    title: string;
    avatar?: File | null;
};

type PasswordFormData = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

const SettingsPage = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadError, setUploadError] = useState<string>("");

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

    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
    } = useForm<PasswordFormData>();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setUploadError("");

        if (!file) return;

        // Validate file size (1MB = 1048576 bytes)
        if (file.size > 1048576) {
            setUploadError("Image size must be under 1MB");
            return;
        }

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setUploadError("Please select a valid image file");
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
                    setUploadError("Image should have 1:1 ratio (square)");
                    return;
                }

                // If all validations pass, set the preview and file
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
            // Create FormData for file upload
            const formData = new FormData();
            formData.append("firstName", data.firstName);
            formData.append("lastName", data.lastName);
            formData.append("username", data.username);
            formData.append("title", data.title);

            if (selectedFile) {
                formData.append("avatar", selectedFile);
            }

            // TODO: API call to update profile
            console.log("Profile update:", data);
            console.log("Selected file:", selectedFile);

            // Example API call:
            // const response = await fetch('/api/profile', {
            //     method: 'PATCH',
            //     body: formData,
            // });
            // if (!response.ok) throw new Error('Failed to update profile');

            // Reset preview after successful save
            // setPreviewImage(null);
            // setSelectedFile(null);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };

    const onPasswordSubmit = (data: PasswordFormData) => {
        // TODO: API call to change password
        console.log("Password change:", data);
    };

    const handleDeleteAccount = () => {
        // TODO: API call to delete account
        setShowDeleteModal(false);
    };

    const currentAvatar = previewImage || userProfile.avatar;

    return (
        <div className="space-y-6">
            <h2 className="text-lg sm:text-xl font-bold text-title">Settings</h2>

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
                            {previewImage ? "Change Photo" : "Upload Photo"}
                        </label>

                        <p className="text-[10px] text-description text-center max-w-35">
                            Image size should be under 1MB and image ratio needs to be 1:1
                        </p>

                        {uploadError && (
                            <p className="text-[10px] text-red-500 text-center max-w-35">
                                {uploadError}
                            </p>
                        )}

                        {selectedFile && !uploadError && (
                            <p className="text-[10px] text-green-600 text-center max-w-35">
                                ✓ Image ready to save
                            </p>
                        )}
                    </div>

                    {/* Form Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                Full name
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    {...registerProfile("firstName")}
                                    placeholder="First name"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
                                />
                                <input
                                    {...registerProfile("lastName")}
                                    placeholder="Last name"
                                    className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                Username
                            </label>
                            <input
                                {...registerProfile("username")}
                                placeholder="Enter your username"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                Email
                            </label>
                            <input
                                {...registerProfile("email")}
                                placeholder="Email address"
                                readOnly
                                className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm bg-gray-50 text-description cursor-not-allowed"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-medium text-title mb-1 block">
                                Title
                            </label>
                            <input
                                {...registerProfile("title")}
                                placeholder="Your title, profession or short biography"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main"
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>

            {/* Change Password */}
            <form
                onSubmit={handlePasswordSubmit(onPasswordSubmit)}
                className="bg-white rounded-xl border border-border-light p-4 sm:p-6"
            >
                <h3 className="text-base font-bold text-title mb-4">Change Password</h3>

                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="text-xs font-medium text-title mb-1 block">
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                {...registerPassword("currentPassword")}
                                type={showCurrentPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-title"
                            >
                                {showCurrentPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                        <div className="text-right mt-1">
                            <Link href={"/auth/forgot-password"}
                                className="text-xs text-red-500 hover:text-red-600 font-medium"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-title mb-1 block">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                {...registerPassword("newPassword")}
                                type={showNewPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-title"
                            >
                                {showNewPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-title mb-1 block">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                {...registerPassword("confirmPassword")}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm new password"
                                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-main pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-description hover:text-title"
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4" />
                                ) : (
                                    <Eye className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-main text-white rounded-md text-sm font-semibold hover:bg-main/90 transition-colors"
                    >
                        Change Password
                    </button>
                </div>
            </form>

            {/* Delete Account */}
            <div className="bg-red-50 rounded-xl border border-red-200 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-base font-bold text-red-700">Delete Account</h3>
                        <p className="text-sm text-red-600 mt-1">
                            Permanently delete your account and all associated data
                        </p>
                        <p className="text-xs text-red-500 mt-1 font-medium">
                            Warning: This action is irreversible. All your data will be permanently deleted.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-5 py-2.5 bg-red-500 text-white rounded-md text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-1.5 shrink-0"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
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
                            Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm text-description text-center">
                            Are you sure you want to delete your account? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-row gap-3 sm:justify-center">
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className="flex-1 px-6 py-2.5 border border-gray-300 rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors"
                        >
                            Yes, Delete
                        </button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default SettingsPage;