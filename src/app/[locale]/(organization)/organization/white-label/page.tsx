"use client";
import { useState, useRef, useEffect } from "react";
import { Upload, Eye, Pencil, Save, X, Phone, User, Loader2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import WhiteLabelPreviewModal from "@/components/modal/WhiteLabelPreviewModal";
import { useTranslations } from "next-intl";
import { useGetWhiteLabelQuery, useUpdateWhiteLabelMutation } from "@/redux/features/organization/organization.api";
import { toast } from "sonner";
import { resolveImageUrl } from "@/utils/image";

type WhiteLabelForm = {
  name: string;
  username: string;
  phone: string;
  bio: string;
};

const WhiteLabel = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const t = useTranslations("OrganizationWhiteLabel");

  const { data: whiteLabelData, isLoading: isFetching } = useGetWhiteLabelQuery();
  const [updateWhiteLabel, { isLoading: isUpdating }] = useUpdateWhiteLabelMutation();

  const { register, handleSubmit, control, reset } = useForm<WhiteLabelForm>({
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      bio: "",
    },
  });

  const watchedValues = useWatch({ control });

  useEffect(() => {
    if (whiteLabelData?.data) {
      const { name, username, phone, bio, photo, banner } = whiteLabelData.data;
      reset({
        name: name || "",
        username: username || "",
        phone: phone || "",
        bio: bio || "",
      });
      setPhotoPreview(photo ? resolveImageUrl(photo) : null);
      setBannerPreview(banner ? resolveImageUrl(banner) : null);
    }
  }, [whiteLabelData, reset]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: WhiteLabelForm) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("username", data.username);
      formData.append("phone", data.phone);
      formData.append("bio", data.bio);

      if (photoFile) {
        formData.append("photo", photoFile);
      }
      if (bannerFile) {
        formData.append("banner", bannerFile);
      }

      const response = await updateWhiteLabel(formData).unwrap();
      if (response.success) {
        toast.success(response.message || "Branding updated successfully!");
        setIsEditing(false);
        setPhotoFile(null);
        setBannerFile(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update branding");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (whiteLabelData?.data) {
      const { name, username, phone, bio, photo, banner } = whiteLabelData.data;
      reset({ name, username, phone, bio });
      setPhotoPreview(photo ? resolveImageUrl(photo) : null);
      setBannerPreview(banner ? resolveImageUrl(banner) : null);
    }
    setPhotoFile(null);
    setBannerFile(null);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-10 h-10 animate-spin text-main" />
          <p className="text-sm text-description animate-pulse">Loading white label settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-title">{t("title")}</h1>
          <p className="text-sm text-description mt-1">{t("description")}</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-border-light text-description hover:bg-gray-50 transition-colors flex-1 sm:flex-none justify-center"
          >
            <Eye className="w-4 h-4" /> {t("preview")}
          </button>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-main text-white hover:bg-main/90 transition-colors flex-1 sm:flex-none justify-center"
            >
              <Pencil className="w-4 h-4" /> {t("editBranding")}
            </button>
          ) : (
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors flex-1 sm:flex-none justify-center"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-border-light">
        <div className="p-6 border-b border-border-light flex items-center justify-between">
          <h3 className="text-base font-semibold text-title">{t("accountSettings")}</h3>
          {isEditing && (
            <div className="text-[10px] font-bold text-main bg-main/10 px-2 py-0.5 rounded-full uppercase tracking-wider">Editing</div>
          )}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="space-y-8">
            {/* Banner Section */}
            <div className="relative group">
              <div
                className={`relative w-full h-48 bg-gray-50 border border-border-light overflow-hidden transition-all ${isEditing ? 'cursor-pointer border-dashed border-2 hover:border-main/50' : ''}`}
                onClick={() => isEditing && bannerInputRef.current?.click()}
              >
                {bannerPreview ? (
                  <Image src={resolveImageUrl(bannerPreview)} alt="Banner" fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-description/40">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="text-sm">Upload Banner</p>
                  </div>
                )}

                {isEditing && (
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <div className="bg-white/90 p-2 rounded-full shadow-lg">
                      <Upload className="w-5 h-5 text-main" />
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Photo Overlay */}
              <div className="absolute -bottom-10 left-8">
                <div
                  className={`relative w-24 h-24 rounded-xl border-4 border-white bg-gray-100 overflow-hidden shadow-xl group/photo transition-transform ${isEditing ? 'cursor-pointer hover:scale-105 active:scale-95' : ''}`}
                  onClick={() => isEditing && photoInputRef.current?.click()}
                >
                  {photoPreview ? (
                    <Image src={resolveImageUrl(photoPreview)} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-description/40">
                      <User className="w-8 h-8" />
                    </div>
                  )}

                  {isEditing && (
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity">
                      <Upload className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Hidden Inputs */}
              <input type="file" ref={bannerInputRef} className="hidden" accept="image/*" onChange={handleBannerUpload} />
              <input type="file" ref={photoInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
            </div>

            <div className="pt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-description/70 uppercase tracking-widest mb-2">{t("organizationName")}</label>
                  <div className="relative">
                    <input
                      {...register("name")}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 pl-11 text-sm border border-border-light focus:outline-none focus:border-main disabled:bg-gray-50/50 disabled:text-description/70 transition-all font-medium text-title"
                      placeholder={t("organizationNamePlaceholder")}
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-description/40" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-description/70 uppercase tracking-widest mb-2">Username</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-description/40 text-sm font-bold">@</span>
                    <input
                      {...register("username")}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 pl-9 text-sm border border-border-light focus:outline-none focus:border-main disabled:bg-gray-50/50 disabled:text-description/70 transition-all font-medium text-title"
                      placeholder="username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-description/70 uppercase tracking-widest mb-2">Phone Number</label>
                  <div className="relative">
                    <input
                      {...register("phone")}
                      disabled={!isEditing}
                      className="w-full px-4 py-3 pl-11 text-sm border border-border-light focus:outline-none focus:border-main disabled:bg-gray-50/50 disabled:text-description/70 transition-all font-medium text-title"
                      placeholder="e.g. +1 234 567 890"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-description/40" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-description/70 uppercase tracking-widest mb-2">{t("biography")}</label>
                <textarea
                  {...register("bio")}
                  disabled={!isEditing}
                  rows={9}
                  className="w-full px-4 py-3 text-sm border border-border-light focus:outline-none focus:border-main resize-none disabled:bg-gray-50/50 disabled:text-description/70 transition-all font-medium text-title leading-relaxed"
                  placeholder={t("biographyPlaceholder")}
                />
              </div>
            </div>

            {isEditing && (
              <div className="pt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-3 text-sm font-bold text-description hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center gap-2 px-10 py-3 bg-main text-white text-sm font-bold hover:bg-main/90 transition-all shadow-xl shadow-main/20 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {t("saveChanges")}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      <WhiteLabelPreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        logoPreview={photoPreview}
        bannerPreview={bannerPreview}
        organizationName={watchedValues.name ?? ""}
        biography={watchedValues.bio ?? ""}
        phone={watchedValues.phone ?? ""}
        username={watchedValues.username ?? ""}
      />
    </div>
  );
};

export default WhiteLabel;
