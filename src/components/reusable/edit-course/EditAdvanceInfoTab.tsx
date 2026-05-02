"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Plus, Upload, Image as ImageIcon, CirclePlay, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const MAX_ITEMS = 8;
const ITEM_MAX_LENGTH = 120;
const MAX_TRAILER_SIZE_MB = 80;

export const advanceInfoSchema = z.object({
  description: z.string().optional(),
  whatYouWillTeach: z.array(z.object({
    value: z.string().min(1, "Outcome is required").max(ITEM_MAX_LENGTH),
  })).min(1, "At least one outcome is required"),
  requirements: z.array(z.object({
    value: z.string().min(1, "Requirement is required").max(ITEM_MAX_LENGTH),
  })).min(1, "At least one requirement is required"),
});

export type AdvanceInfoFormData = z.infer<typeof advanceInfoSchema>;

type Props = {
  onNext: () => Promise<boolean>;
  onPrev: () => void;
  onThumbnailChange: (file: File | null) => void;
  onTrailerChange: (file: File | null) => void;
  initialThumbnailPreview?: string | null;
  initialTrailerPreview?: string | null;
};

const EditAdvanceInfoTab = ({
  onNext,
  onPrev,
  onThumbnailChange,
  onTrailerChange,
  initialThumbnailPreview = null,
  initialTrailerPreview = null,
}: Props) => {
  const t = useTranslations("InstructorCreateCourse");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(initialThumbnailPreview);
  const [trailerPreview, setTrailerPreview] = useState<string | null>(initialTrailerPreview);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, trigger, control, watch, formState: { errors }} = useFormContext<AdvanceInfoFormData>();

  const { fields: teachFields, append: appendTeach, remove: removeTeach} = useFieldArray({ control, name: "whatYouWillTeach" });

  const {
    fields: reqFields,
    append: appendReq,
    remove: removeReq,
  } = useFieldArray({ control, name: "requirements" });

  const watchTeach = watch("whatYouWillTeach");
  const watchReq = watch("requirements");

  useEffect(() => {
    return () => {
      if (thumbnailPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      if (trailerPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(trailerPreview);
      }
    };
  }, [thumbnailPreview, trailerPreview]);

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (thumbnailPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview(URL.createObjectURL(file));
    onThumbnailChange(file);
  };

  const handleTrailer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_TRAILER_SIZE_MB * 1024 * 1024) {
      toast.error(`Trailer video must be ${MAX_TRAILER_SIZE_MB}MB or smaller`);
      e.target.value = "";
      onTrailerChange(null);
      return;
    }
    if (trailerPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(trailerPreview);
    }
    setTrailerPreview(URL.createObjectURL(file));
    onTrailerChange(file);
  };

  const handleNext = async () => {
    const valid = await trigger(["description", "whatYouWillTeach", "requirements"]);
    if (valid) {
      setIsSubmitting(true);
      try {
        await onNext();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
      <h3 className="text-xl font-bold text-title">{t("advanceInfoHeading")}</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-title mb-3 block">
            {t("courseThumbnail")}
          </label>
          <div className="flex gap-4">
            <div className="w-32 h-28 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
              {thumbnailPreview ? (
                <Image
                  src={thumbnailPreview}
                  alt="Course thumbnail preview"
                  width={128}
                  height={112}
                  className="w-full h-full object-cover"
                />
              ) : (
                <ImageIcon className="size-20 text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-description mb-2">
                {t("thumbnailGuidelines")}
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-3 bg-[#EDF5FD] text-main rounded-md text-sm font-medium hover:bg-main/5 transition-colors cursor-pointer">
                <span>{t("uploadImage")}</span>
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg"
                  onChange={handleThumbnail}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-title mb-3 block">
            {t("courseTrailer")}
          </label>
          <div className="flex gap-4">
            <div className="w-32 h-28 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden shrink-0">
              {trailerPreview ? (
                <video
                  src={trailerPreview}
                  controls
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-main/10 flex items-center justify-center">
                  <CirclePlay className="size-12 text-[#B7BAC7]" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm text-description mb-2">
                {t("trailerGuideline")}
              </p>
              <label className="inline-flex items-center gap-2 px-4 py-3 bg-[#EDF5FD] rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors cursor-pointer">
                <span>{t("uploadVideo")}</span>
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleTrailer}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-title mb-1.5 block">
          {t("courseDescriptions")}
        </label>
        <div className="border border-border-light rounded-md overflow-hidden">
          <textarea
            {...register("description")}
            rows={6}
            placeholder={t("descriptionPlaceholder")}
            className="w-full px-3 py-3.5 text-sm focus:outline-none resize-none"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-medium text-title">
            {t("whatYouWillTeach")} ({teachFields.length}/{MAX_ITEMS})
          </label>
          {teachFields.length < MAX_ITEMS && (
            <button
              type="button"
              onClick={() => appendTeach({ value: "" })}
              className="flex items-center gap-1 text-sm text-main font-medium hover:text-main/80"
            >
              <Plus className="w-4 h-4" />
              {t("addNew")}
            </button>
          )}
        </div>

        <div className="space-y-3">
          {typeof errors.whatYouWillTeach?.message === "string" && (
            <p className="text-xs text-red-500">{errors.whatYouWillTeach.message}</p>
          )}
          {teachFields.map((field, index) => (
            <div key={field.id}>
              <span className="text-xs text-description mb-1 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <input
                  {...register(`whatYouWillTeach.${index}.value`)}
                  maxLength={ITEM_MAX_LENGTH}
                  placeholder={t("teachPlaceholder")}
                  className="w-full border border-border-light rounded-md px-3 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                  {watchTeach?.[index]?.value?.length || 0}/{ITEM_MAX_LENGTH}
                </span>
              </div>
              {errors.whatYouWillTeach?.[index]?.value?.message && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.whatYouWillTeach[index]?.value?.message}
                </p>
              )}
              <div className="mt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeTeach(index)}
                  className="text-xs text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-base font-medium text-title">
            {t("courseRequirements")} ({reqFields.length}/{MAX_ITEMS})
          </label>
          {reqFields.length < MAX_ITEMS && (
            <button
              type="button"
              onClick={() => appendReq({ value: "" })}
              className="flex items-center gap-1 text-sm text-main font-medium hover:text-main/80"
            >
              <Plus className="w-4 h-4" />
              {t("addNew")}
            </button>
          )}
        </div>

        <div className="space-y-3">
          {typeof errors.requirements?.message === "string" && (
            <p className="text-xs text-red-500">{errors.requirements.message}</p>
          )}
          {reqFields.map((field, index) => (
            <div key={field.id}>
              <span className="text-xs text-description mb-1 block">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <input
                  {...register(`requirements.${index}.value`)}
                  maxLength={ITEM_MAX_LENGTH}
                  placeholder={t("requirementsPlaceholder")}
                  className="w-full border border-border-light rounded-md px-3 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
                  {watchReq?.[index]?.value?.length || 0}/{ITEM_MAX_LENGTH}
                </span>
              </div>
              {errors.requirements?.[index]?.value?.message && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.requirements[index]?.value?.message}
                </p>
              )}
              <div className="mt-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => removeReq(index)}
                  className="text-xs text-red-500 hover:text-red-600 cursor-pointer"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border-light">
        <button
          type="button"
          onClick={onPrev}
          disabled={isSubmitting}
          className="px-5 py-3.5 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {t("previous")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-3.5 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          Save and Update
        </button>
      </div>
    </form>
  );
};

export default EditAdvanceInfoTab;
