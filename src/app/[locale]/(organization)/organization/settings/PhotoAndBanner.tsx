"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { photoAndBannerSchema } from "@/validation/auth.validation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { resolveImageUrl } from "@/utils/image";
import { useGetWhiteLabelQuery, useUpdateWhiteLabelMutation } from "@/redux/features/organization/organization.api";
import { Skeleton } from "@/components/ui/skeleton";

type PhotoAndBannerFormData = z.infer<typeof photoAndBannerSchema>;

const PhotoAndBanner = () => {
  const [photoPreview, setPhotoPreview] = useState<string>("/home/user1.png");
  const [bannerPreview, setBannerPreview] = useState<string>("/home/user1.png");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("OrganizationSettings");

  const { data: whiteLabelData, isLoading } = useGetWhiteLabelQuery();
  const [updateWhiteLabel] = useUpdateWhiteLabelMutation();

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<PhotoAndBannerFormData>({
    resolver: zodResolver(photoAndBannerSchema),
  });

  useEffect(() => {
    if (whiteLabelData?.data) {
      if (whiteLabelData.data.photo) {
        setPhotoPreview(resolveImageUrl(whiteLabelData.data.photo));
      }
      if (whiteLabelData.data.banner) {
        setBannerPreview(resolveImageUrl(whiteLabelData.data.banner));
      }
    }
  }, [whiteLabelData]);

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate using Zod schema
    const validationResult = photoAndBannerSchema.safeParse({ photo: file });
    if (!validationResult.success) {
      const errorMessage = validationResult.error.format().photo?._errors[0] || "Invalid photo file";
      toast.error(errorMessage);
      return;
    }

    // Set local preview for instant feedback
    setPhotoPreview(URL.createObjectURL(file));
    setIsUploadingPhoto(true);

    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await updateWhiteLabel(formData).unwrap();
      toast.success(res.message || "Profile photo updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile photo");
      // Revert preview on failure
      if (whiteLabelData?.data?.photo) {
        setPhotoPreview(resolveImageUrl(whiteLabelData.data.photo));
      } else {
        setPhotoPreview("/home/user1.png");
      }
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const handleBannerChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate using Zod schema
    const validationResult = photoAndBannerSchema.safeParse({ banner: file });
    if (!validationResult.success) {
      const errorMessage = validationResult.error.format().banner?._errors[0] || "Invalid banner file";
      toast.error(errorMessage);
      return;
    }

    // Set local preview for instant feedback
    setBannerPreview(URL.createObjectURL(file));
    setIsUploadingBanner(true);

    try {
      const formData = new FormData();
      formData.append("banner", file);
      const res = await updateWhiteLabel(formData).unwrap();
      toast.success(res.message || "Banner updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update banner");
      // Revert preview on failure
      if (whiteLabelData?.data?.banner) {
        setBannerPreview(resolveImageUrl(whiteLabelData.data.banner));
      } else {
        setBannerPreview("/home/user1.png");
      }
    } finally {
      setIsUploadingBanner(false);
    }
  };

  const onSubmit = async (data: PhotoAndBannerFormData) => {
    // Kept for form schema/onSubmit compatibility
    console.log("Photo and banner submitted:", data);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-4">
        <div className="flex flex-col sm:flex-row gap-3 overflow-hidden border border-border-light bg-white">
          <Skeleton className="w-full sm:w-50 h-[200px] shrink-0" />
          <Skeleton className="flex-1 h-[230px]" />
        </div>
      </div>
    );
  }

  return (
    <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row gap-3 overflow-hidden border border-border-light bg-white">
        {/* Photo */}
        <div
          className={`relative w-full sm:w-50 shrink-0 cursor-pointer group ${isUploadingPhoto ? "pointer-events-none opacity-80" : ""}`}
          onClick={() => photoInputRef.current?.click()}
        >
          <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
            <Image src={photoPreview} alt="Profile photo" fill className="object-cover" suppressHydrationWarning />
          </div>
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 flex items-center justify-center gap-1.5">
            {isUploadingPhoto ? (
              <span className="text-white text-xs font-medium animate-pulse">Uploading...</span>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs font-medium">{t("uploadPhoto")}</span>
              </>
            )}
          </div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>

        {/* Banner */}
        <div
          className={`relative flex-1 cursor-pointer group ${isUploadingBanner ? "pointer-events-none opacity-80" : ""}`}
          style={{ height: "230px" }}
          onClick={() => bannerInputRef.current?.click()}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image src={bannerPreview} alt="Banner" fill className="object-cover" suppressHydrationWarning />
          </div>
          {/* Overlay */}
          <div className="absolute bottom-3 right-3 bg-black/50 rounded-md px-3 py-1.5 flex items-center gap-1.5">
            {isUploadingBanner ? (
              <span className="text-white text-xs font-medium animate-pulse">Uploading...</span>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-xs font-medium">{t("uploadBanner")}</span>
              </>
            )}
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleBannerChange}
          />
        </div>
      </div>

      {/* Validation errors */}
      {(errors.photo || errors.banner) && (
        <div className="mt-2 space-y-1">
          {errors.photo?.message && (
            <p className="text-xs text-red-500">{String(errors.photo.message)}</p>
          )}
          {errors.banner?.message && (
            <p className="text-xs text-red-500">{String(errors.banner.message)}</p>
          )}
        </div>
      )}
    </form>
  );
};

export default PhotoAndBanner;
