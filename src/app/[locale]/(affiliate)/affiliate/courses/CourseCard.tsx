"use client";
import Image from "next/image";
import { Star, Users, Link2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { resolveImageUrl } from "@/utils/image";

export interface CourseCardProps {
  id: number;
  image: string;
  category?: string;
  title: string;
  rating?: number;
  students?: number;
  price: number;
  discountPrice?: number;
  currency?: string;
  className?: string;
  onGenerateLink: (courseId: number) => void;
  isGenerating?: boolean;
}

export function CourseCard({
  id,
  image,
  category = "",
  title,
  rating = 0,
  students = 0,
  price,
  discountPrice,
  currency = "$",
  className = "",
  onGenerateLink,
  isGenerating = false,
}: CourseCardProps) {
  const t = useTranslations("AffiliateCourses");

  return (
    <div className={`bg-white rounded-sm border border-gray-100 overflow-hidden flex flex-col ${className}`}>
      {/* Thumbnail */}
      <div className="relative w-full h-48 bg-gray-100">
        <Image src={resolveImageUrl(image)} alt={title} fill className="object-cover" sizes="280px" />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        <span className="inline-block self-start px-2.5 py-1 bg-[#EBEBFF] text-[#342F98] text-[10px] font-semibold tracking-wider uppercase">
          {category}
        </span>

        <h3 className="flex-1 text-[14.53px] font-medium text-gray-900 line-clamp-2">{title}</h3>

        <div className="border-t border-gray-100" />

        <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-700">{rating}</span>
          </span>
          {students > 0 && (
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{t("students", { count: students.toLocaleString() })}</span>
            </span>
          )}
        </div>

        <div className="border-t border-gray-100" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discountPrice && (
              <span className="text-lg font-bold text-gray-900">{currency}{discountPrice}</span>
            )}
            <span className={`${discountPrice ? "text-sm text-gray-400 line-through" : "text-lg font-bold text-gray-900"}`}>
              {currency}{price}
            </span>
          </div>
        </div>
      </div>

      {/* Generate Referral Link Button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => onGenerateLink(id)}
          disabled={isGenerating}
          className="w-full flex items-center justify-center cursor-pointer gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-blue-400 text-white text-sm font-semibold rounded-md transition-colors duration-150"
        >
          <Link2 className="w-4 h-4" />
          {isGenerating ? t("generating") : t("generateReferralLink")}
        </button>
      </div>
    </div>
  );
}