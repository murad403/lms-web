"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Users, Copy, Check, MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

export interface CourseCardProps {
  image: string;
  category?: string;
  title: string;
  rating?: number;
  students?: number;
  price: number;
  currency?: string;
  affiliateUrl?: string;
  className?: string;
}

export function CourseCard({
  image,
  category = "DEVELOPMENTS",
  title,
  rating = 4.9,
  students = 982941,
  price,
  currency = "$",
  affiliateUrl = "",
  className = "",
}: CourseCardProps) {
  const [copied, setCopied] = useState(false);
  const t = useTranslations("AffiliateCourses");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(affiliateUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`bg-white rounded-sm border border-gray-100  overflow-hidden  flex flex-col ${className}`}
    >
      {/* Thumbnail */}
      <div className="relative w-full h-64 bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="280px"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Category Badge */}
        <span className="inline-block self-start px-2.5 py-1  bg-[#EBEBFF] text-[#342F98] text-[10px] font-semibold tracking-wider  uppercase">
          {category}
        </span>

        {/* Title */}
        <h3 className=" flex-1 text-[14.53px] font-medium text-gray-900  line-clamp-2">
          {title}
        </h3>

        <div className="border-t border-gray-100" />
        {/* Rating + Students */}
        <div className="flex items-center justify-between gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-gray-700">{rating}</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4 text-gray-400" />
            <span>{t("students", { count: students.toLocaleString() })}</span>
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100" />

        {/* Price + More */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {currency}
            {price.toFixed(2)}
          </span>
          <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Copy URL Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-md transition-colors duration-150"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? t("copied") : t("copyUrl")}
        </button>
      </div>
    </div>
  );
}
