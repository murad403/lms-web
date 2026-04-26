"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, UserCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/affiliate/affiliate.api";
import { resolveImageUrl, shouldBypassImageOptimization } from "@/utils/image";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Phone must be at least 7 digits"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export interface ProfileInformationCardProps {
  className?: string;
}

export function ProfileInformationCard({
  className = "",
}: ProfileInformationCardProps) {
  const t = useTranslations("AffiliateAccount");
  const { data: profileResponse, isLoading: isProfileLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    const profile = profileResponse?.data;
    if (!profile) return;

    form.reset({
      name: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
    });
  }, [form, profileResponse]);

  const onAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      setAvatarPreview((loadEvent.target?.result as string) || null);
      setSelectedAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", data.phone);

      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
      }

      const response = await updateProfile(formData).unwrap();
      toast.success(response.message || "Profile updated successfully.");
      setSelectedAvatar(null);
      setAvatarPreview(null);
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

  const resolvedAvatar = resolveImageUrl(profileResponse?.data?.avatar);
  const currentAvatar = avatarPreview || (resolvedAvatar && resolvedAvatar.trim() ? resolvedAvatar : null);

  if (isProfileLoading && !profileResponse) {
    return (
      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 ${className}`}>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl" />
          <Skeleton className="h-6 w-44" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full" />
          <Skeleton className="h-11 w-full sm:col-span-2" />
        </div>

        <Skeleton className="h-11 w-32 self-end" />
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
          <UserCircle className="w-5 h-5 text-blue-500" />
        </div>
        <h2 className="text-[18px] font-bold text-background-base">
          {t("profileInformation")}
        </h2>
      </div>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-gray-200 bg-gray-50">
              {currentAvatar ? (
                <Image
                  src={currentAvatar}
                  alt={form.getValues("name") || "Affiliate"}
                  fill
                  className="object-cover"
                  unoptimized={shouldBypassImageOptimization(currentAvatar)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UserCircle className="h-10 w-10 text-gray-400" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="affiliate-avatar-input"
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Camera className="h-4 w-4" />
                Upload Image
              </label>
              <input
                id="affiliate-avatar-input"
                type="file"
                accept="image/*"
                onChange={onAvatarChange}
                className="hidden"
              />
              <p className="text-xs text-gray-400">JPG, PNG, WEBP up to 5MB</p>
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 font-medium">
                    {t("fullName")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t("fullName")}
                      className="h-11 border-gray-200 text-sm text-gray-800 rounded-lg focus-visible:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700 font-medium">
                    {t("email")}
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("email")}
                      readOnly
                      className="h-11 border-gray-200 text-sm text-gray-500 rounded-lg bg-gray-50 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel className="text-sm text-gray-700 font-medium">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone"
                      className="h-11 border-gray-200 text-sm text-gray-800 rounded-lg focus-visible:ring-blue-500"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isUpdatingProfile}
              className="px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg h-11"
            >
              {isUpdatingProfile ? t("saving") : t("saveChanges")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
