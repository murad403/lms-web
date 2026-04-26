"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

export interface CourseSearchFilterProps {
  search?: string;
  onSearchChange?: (value: string) => void;
  category?: string;
  onCategoryChange?: (value: string) => void;
  categories?: string[];
  className?: string;
}

export function CourseSearchFilter({
  search = "",
  onSearchChange,
  className = "",
}: CourseSearchFilterProps) {
  const t = useTranslations("AffiliateCourses");
  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className} justify-between`}>
      {/* Search */}
      <div className="flex flex-col gap-1.5 w-full sm:w-64 lg:w-80 xl:w-96">
        <label className="text-xs text-gray-400 font-medium">{t("search")}</label>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 " />
          <Input
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-10 rounded-none h-11  border-gray-200 text-sm text-gray-500 border-none shadow-none bg-gray-50 placeholder:text-gray-400 focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
