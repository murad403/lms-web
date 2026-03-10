"use client";
import { useState, useRef } from "react";
import { Upload, Eye, Pencil } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import WhiteLabelPreviewModal from "@/components/modal/WhiteLabelPreviewModal";
import { useTranslations } from "next-intl";

type WhiteLabelForm = {
  organizationName: string;
  biography: string;
};

const WhiteLabel = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations("OrganizationWhiteLabel");

  const { register, handleSubmit, control } = useForm<WhiteLabelForm>({
    defaultValues: {
      organizationName: "",
      biography: "",
    },
  });

  const watchedValues = useWatch({ control });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: WhiteLabelForm) => {
    console.log("Save White Label:", data, logoPreview);
  };

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
          <button
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-main text-white hover:bg-main/90 transition-colors flex-1 sm:flex-none justify-center"
          >
            <Pencil className="w-4 h-4" /> {t("editBranding")}
          </button>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white">
        <div className="p-6">
          <h3 className="text-base font-semibold text-title">{t("accountSettings")}</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left - Form Fields */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <label className="block text-sm font-medium text-description mb-1.5">{t("organizationName")}</label>
                <input
                  {...register("organizationName")}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main"
                  placeholder={t("organizationNamePlaceholder")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-description mb-1.5">{t("biography")}</label>
                <textarea
                  {...register("biography")}
                  rows={6}
                  className="w-full px-4 py-2.5 text-sm border border-border-light focus:outline-none focus:border-main resize-none"
                  placeholder={t("biographyPlaceholder")}
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-main text-white text-sm font-medium hover:bg-main/90 transition-colors"
              >
                {t("saveChanges")}
              </button>
            </div>

            {/* Right - Logo Upload */}
            <div>
              <div
                className="relative border border-border-light overflow-hidden cursor-pointer h-64 flex items-center justify-center bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                {logoPreview ? (
                  <div className="relative w-full h-full">
                    <Image src={logoPreview} alt="Logo preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-description p-6">
                    <Upload className="w-8 h-8 mb-2" />
                    <p className="text-sm text-center">{t("clickToUploadLogo")}</p>
                  </div>
                )}

                {/* Upload overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/40 flex items-center justify-center gap-2 py-2.5">
                  <Upload className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-medium">{t("uploadLogo")}</span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
              </div>
              {logoPreview && (
                <button
                  type="button"
                  onClick={() => setLogoPreview(null)}
                  className="text-xs text-red-500 mt-2 hover:text-red-600"
                >
                  {t("removeLogo")}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      <WhiteLabelPreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        logoPreview={logoPreview}
        organizationName={watchedValues.organizationName ?? ""}
        biography={watchedValues.biography ?? ""}
      />
    </div>
  );
};

export default WhiteLabel;
