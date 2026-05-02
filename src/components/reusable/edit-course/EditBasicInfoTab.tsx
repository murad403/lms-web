"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import type { InstructorCategoryItem } from "@/redux/features/instructor/instructor.type";

const TITLE_MAX = 80;
const SUBTITLE_MAX = 120;

export const basicInfoSchema = z.object({
  title: z.string().min(1, "Title is required").max(TITLE_MAX),
  subtitle: z.string().min(1, "Subtitle is required").max(SUBTITLE_MAX),
  category: z.string().min(1, "Category is required"),
  topic: z.string().min(1, "Topic is required"),
  language: z.string().min(1, "Language is required"),
  level: z.string().min(1, "Level is required"),
  price: z.string().min(1, "Price is required"),
  couponCode: z.string().optional(),
  discountPrice: z.string().optional(),
  expiryPeriod: z.string().optional(),
});

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const levelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const expiryOptions = [
  { value: "1_week", label: "1 Week" },
  { value: "1_month", label: "1 Month" },
  { value: "3_months", label: "3 Months" },
  { value: "lifetime", label: "Lifetime" },
];

type Props = {
  onNext: () => Promise<boolean>;
  onCancel: () => void;
  categories: InstructorCategoryItem[];
};

const EditBasicInfoTab = ({ onNext, onCancel, categories }: Props) => {
  const t = useTranslations("InstructorCreateCourse");
  const {
    register,
    trigger,
    watch,
    formState: { errors },
  } = useFormContext<BasicInfoFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleValue = watch("title") || "";
  const subtitleValue = watch("subtitle") || "";

  const handleNext = async () => {
    const valid = await trigger([
      "title",
      "subtitle",
      "category",
      "topic",
      "language",
      "level",
      "price",
      "couponCode",
      "discountPrice",
      "expiryPeriod",
    ]);
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
      <h3 className="text-xl font-bold text-title">{t("basicInformation")}</h3>
      <div className="border-b border-border-light" />

      <div>
        <label className="text-sm font-medium text-title mb-1.5 block">
          {t("title")}
        </label>
        <div className="relative">
          <input
            {...register("title")}
            maxLength={TITLE_MAX}
            placeholder={t("titlePlaceholder")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
            {titleValue.length}/{TITLE_MAX}
          </span>
        </div>
        {errors.title && (
          <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-title mb-1.5 block">
          {t("subtitle")}
        </label>
        <div className="relative">
          <input
            {...register("subtitle")}
            maxLength={SUBTITLE_MAX}
            placeholder={t("subtitlePlaceholder")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main pr-16"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-description">
            {subtitleValue.length}/{SUBTITLE_MAX}
          </span>
        </div>
        {errors.subtitle && (
          <p className="text-xs text-red-500 mt-1">{errors.subtitle.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            {t("courseCategory")}
          </label>
          <select
            {...register("category")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
          >
            <option value="">{t("courseCategoryPlaceholder")}</option>
            {categories.map((opt) => (
              <option key={opt.id} value={String(opt.id)}>
                {opt.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-title mb-1.5 block">
          {t("courseTopic")}
        </label>
        <input
          {...register("topic")}
          placeholder={t("courseTopicPlaceholder")}
          className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
        />
        {errors.topic && (
          <p className="text-xs text-red-500 mt-1">{errors.topic.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            {t("courseLanguage")}
          </label>
          <select
            {...register("language")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
          >
            <option value="">{t("selectPlaceholder")}</option>
            {languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="text-xs text-red-500 mt-1">{errors.language.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            {t("courseLevel")}
          </label>
          <select
            {...register("level")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
          >
            <option value="">{t("selectPlaceholder")}</option>
            {levelOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-xs text-red-500 mt-1">{errors.level.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            {t("coursePrice")}
          </label>
          <input
            {...register("price")}
            placeholder={t("pricePlaceholder")}
            type="number"
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
          />
          {errors.price && (
            <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            Coupon Code
          </label>
          <input
            {...register("couponCode")}
            placeholder={t("couponPlaceholder")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            {t("discountPrice")}
          </label>
          <input
            {...register("discountPrice")}
            placeholder={t("pricePlaceholder")}
            type="number"
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-title mb-1.5 block">
            Coupon Expiry Duration
          </label>
          <select
            {...register("expiryPeriod")}
            className="w-full border border-border-light rounded-md p-3 text-sm focus:outline-none focus:ring-1 focus:ring-main bg-white text-description"
          >
            <option value="">{t("selectPlaceholder")}</option>
            {expiryOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-border-light">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-5 py-3 border border-border-light rounded-md text-sm font-medium text-title hover:bg-gray-50 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {t("cancel")}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-main/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
          Save and Update
        </button>
      </div>
    </form>
  );
};

export default EditBasicInfoTab;
