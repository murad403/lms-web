"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload } from "lucide-react";
import { photoAndBannerSchema } from "@/validation/auth.validation";

type PhotoAndBannerFormData = z.infer<typeof photoAndBannerSchema>;

const PhotoAndBanner = () => {
  const [photoPreview, setPhotoPreview] = useState<string>("/home/banner.jpg");
  const [bannerPreview, setBannerPreview] = useState<string>("/home/banner.jpg");

  const photoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<PhotoAndBannerFormData>({
    resolver: zodResolver(photoAndBannerSchema),
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("photo", file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setValue("banner", file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (data: PhotoAndBannerFormData) => {
    // TODO: connect to API
    console.log("Photo and banner saved:", data);
  };

  return (
    <form className="bg-white p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col sm:flex-row gap-3 overflow-hidden border border-border-light bg-white">
        {/* Photo */}
        <div
          className="relative w-full sm:w-50 shrink-0 cursor-pointer group"
          onClick={() => photoInputRef.current?.click()}
        >
          <div className="relative w-full overflow-hidden" style={{ height: "200px" }}>
            <Image src={photoPreview} alt="Profile photo" fill className="object-cover" suppressHydrationWarning />
          </div>
          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 py-2 flex items-center justify-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-medium">Upload Photo</span>
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
          className="relative flex-1 cursor-pointer group"
          style={{ height: "230px" }}
          onClick={() => bannerInputRef.current?.click()}
        >
          <div className="relative w-full h-full overflow-hidden">
            <Image src={bannerPreview} alt="Banner" fill className="object-cover" suppressHydrationWarning />
          </div>
          {/* Overlay */}
          <div className="absolute bottom-3 right-3 bg-black/50 rounded-md px-3 py-1.5 flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-white" />
            <span className="text-white text-xs font-medium">Upload Banner</span>
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
