"use client";
import { MousePointerClick, LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
interface AffiliateStatCardProps {
  title?: string;
  value?: string | number;
  change?: number;
  trendLabel?: string;
  compareLabel?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  iconBgClassName?: string;
  className?: string;
}

export function AffiliateStatCard({
  title = "Total Clicks",
  value = "0",
  change = 0,
  trendLabel,
  compareLabel = "",
  icon: Icon = MousePointerClick,
  iconClassName = "text-blue-500",
  iconBgClassName = "bg-blue-50",
  className = "",
}: AffiliateStatCardProps) {
  const hasTrendLabel = typeof trendLabel === "string";
  const isPositive = hasTrendLabel
    ? !trendLabel.startsWith("-")
    : change >= 0;
  const t = useTranslations("AffiliateDashboard");

  return (
    <div
      className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${className}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl ${iconBgClassName}`}
        >
          <Icon className={`w-5 h-5 ${iconClassName}`} />
        </div>
      </div>

      {/* Value */}
      <p className="mt-1 text-[2rem] font-bold text-gray-900 tracking-tight leading-none">
        {typeof value === "number" ? value.toLocaleString() : value}
      </p>

      {/* Change */}
      <p className="mt-3 text-sm font-medium">
        <span className={isPositive ? "text-green-500" : "text-red-500"}>
          {hasTrendLabel ? trendLabel : `${isPositive ? "+" : ""}${change}%`}
        </span>
        <span className="text-gray-400 ml-1">{compareLabel || t("vsLastMonth")}</span>
      </p>
    </div>
  );
}
