"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveImageUrl, shouldBypassImageOptimization } from "@/utils/image";
import { useGetInstructorProfileQuery, useUpdateInstructorProfileMutation} from "@/redux/features/instructor/instructor.api";

const TITLE_MAX = 50;

const accountSettingsSchema = z.object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Email must be valid"),
    phone: z.string().min(6, "Phone number must be at least 6 characters"),
    title: z.string().max(TITLE_MAX, `Title must be ${TITLE_MAX} characters or less`).optional(),
    biography: z.string().optional(),
});

type AccountSettingsForm = z.infer<typeof accountSettingsSchema>;

const AccountSettings = () => {
    const { data: profileResponse, isLoading: isProfileLoading, isFetching: isProfileFetching, refetch } = useGetInstructorProfileQuery();
    const [updateInstructorProfile, { isLoading: isUpdatingProfile }] = useUpdateInstructorProfileMutation();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const t = useTranslations("InstructorSettings");

    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<AccountSettingsForm>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            title: "",
            biography: "",
        },
    });

    useEffect(() => {
        const profile = profileResponse?.data;
        if (!profile) return;

        reset({
            name: profile.user?.name ?? "",
            email: profile.user?.email ?? "",
            phone: profile.user?.phone ?? "",
            title: profile.title ?? "",
            biography: profile.biography ?? "",
        });
    }, [profileResponse, reset]);

    const titleValue = useWatch({ control, name: "title" }) || "";
    const currentAvatar = previewImage || resolveImageUrl(profileResponse?.data?.user?.avatar);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setPreviewImage(event.target?.result as string);
            setSelectedFile(file);
        };
        reader.readAsDataURL(file);
    };

    const onSubmit = async (data: AccountSettingsForm) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title ?? "");
            formData.append("biography", data.biography ?? "");
            formData.append("user.name", data.name);
            formData.append("user.phone", data.phone);

            if (selectedFile) {
                formData.append("user.avatar", selectedFile);
            }

            const response = await updateInstructorProfile(formData).unwrap();

            toast.success(response.message || "Instructor profile updated successfully.");
            setPreviewImage(null);
            setSelectedFile(null);
            await refetch();
        } catch (error) {
            console.log(error)
            const message =
                typeof error === "object" &&
                error !== null &&
                "data" in error &&
                typeof (error as { data?: { message?: string } }).data?.message === "string"
                    ? (error as { data?: { message?: string } }).data?.message
                    : "Failed to update instructor profile.";

            toast.error(message);
        }
    };

    if (isProfileLoading && !profileResponse) {
        return (
            <div className="bg-white rounded-lg border border-border-light p-4 sm:p-6 space-y-5">
                <Skeleton className="h-6 w-48" />
                <div className="flex flex-col-reverse md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                        <Skeleton className="h-11 w-full" />
                        <Skeleton className="h-11 w-full" />
                        <Skeleton className="h-11 w-full" />
                        <Skeleton className="h-28 w-full" />
                        <Skeleton className="h-12 w-36" />
                    </div>
                    <div className="flex flex-col items-center gap-3 shrink-0 md:pt-6">
                        <Skeleton className="h-36 w-36 rounded-md" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-lg border border-border-light p-4 sm:p-6"
        >
            <h3 className="text-base font-bold text-title mb-5">
                {t("accountSettings")}
            </h3>

            <div className="flex flex-col-reverse md:flex-row gap-8">
                <div className="flex-1 space-y-4">
                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("fullName")}
                        </label>
                        <input
                            {...register("name")}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            placeholder={t("fullNamePlaceholder")}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("emailAddress")}
                        </label>
                        <input
                            {...register("email")}
                            disabled
                            className="w-full border border-border-light px-3 py-3 text-sm bg-gray-50 text-description cursor-not-allowed"
                        />
                        <p className="text-xs text-description mt-1">{t("emailCannotBeUpdated")}</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-title mb-1.5 block">
                            {t("phoneNumber")}
                        </label>
                        <input
                            {...register("phone")}
                            className="w-full border border-border-light px-3 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
                            placeholder={t("phoneNumberPlaceholder")}
                        />
                        {errors.phone && (
                            <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                        )}
                    </div>

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
                            disabled={isUpdatingProfile || isProfileFetching}
                            className="px-6 py-3 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors cursor-pointer"
                        >
                            {isUpdatingProfile ? t("saving") : t("saveChanges")}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3 shrink-0 md:pt-6">
                    <div className="relative w-36 h-36 overflow-hidden border border-border-light group rounded-md bg-gray-50">
                        {currentAvatar ? (
                            <Image
                                src={currentAvatar}
                                alt="Profile"
                                fill
                                className="object-cover"
                                unoptimized={shouldBypassImageOptimization(currentAvatar)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-description">
                                <User className="w-12 h-12" />
                            </div>
                        )}
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
                    <div className="text-center space-y-1">
                        <p className="text-sm font-medium text-title">
                            {profileResponse?.data?.user?.name || t("fullName")}
                        </p>
                        <p className="text-xs text-description">
                            {profileResponse?.data?.user?.email || t("emailAddress")}
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default AccountSettings;
