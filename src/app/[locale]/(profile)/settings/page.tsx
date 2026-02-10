"use client";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Upload, Trash2 } from "lucide-react";
import { userProfile } from "@/lib/profile";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ProfileFormData = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  title: string;
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

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
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

  const onProfileSubmit = (data: ProfileFormData) => {
    // TODO: API call to update profile
    console.log("Profile update:", data);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    // TODO: API call to change password
    console.log("Password change:", data);
  };

  const handleDeleteAccount = () => {
    // TODO: API call to delete account
    setShowDeleteModal(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg sm:text-xl font-bold text-title">Settings</h2>

      {/* Profile Settings */}
      <form
        onSubmit={handleProfileSubmit(onProfileSubmit)}
        className="bg-white rounded-xl border border-border-light p-4 sm:p-6"
      >
        <div className="flex flex-col md:flex-row gap-6">
          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-lg overflow-hidden border border-border-light">
              <Image
                src={userProfile.avatar}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-main font-medium hover:text-main/80 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Photo
            </button>
            <p className="text-[10px] text-description text-center max-w-[140px]">
              Image size should be under 1MB and image ratio needs to be 1:1
            </p>
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
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main"
                />
                <input
                  {...registerProfile("lastName")}
                  placeholder="Last name"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main"
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main"
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
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-description cursor-not-allowed"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-title mb-1 block">
                Title
              </label>
              <input
                {...registerProfile("title")}
                placeholder="Your title, profession or short biography"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main pr-10"
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
              <button
                type="button"
                className="text-xs text-red-500 hover:text-red-600 font-medium"
              >
                Forgot password?
              </button>
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main pr-10"
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
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main pr-10"
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
            className="px-6 py-2.5 bg-main text-white rounded-lg text-sm font-semibold hover:bg-main/90 transition-colors"
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
            className="px-5 py-2.5 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors flex items-center gap-1.5 shrink-0"
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
              className="flex-1 px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-title hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteAccount}
              className="flex-1 px-6 py-2.5 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
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
