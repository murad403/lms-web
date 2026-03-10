"use client";

import { Share2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface SharePlatform {
  label: string;
  getUrl: (link: string) => string;
}

const platforms: SharePlatform[] = [
  {
    label: "Twitter",
    getUrl: (link) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}`,
  },
  {
    label: "Facebook",
    getUrl: (link) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
  },
  {
    label: "LinkedIn",
    getUrl: (link) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
  },
];

interface QuickShareCardProps {
  referralLink?: string;
  className?: string;
}

export function QuickShareCard({
  referralLink = "https://platform.com/course?id=123&ref=AFF-83921",
  className = "",
}: QuickShareCardProps) {
  const t = useTranslations("AffiliateReferral");
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 ${className}`}
    >
      <p className="text-[18px] font-bold text-gray-900">{t("quickShare")}</p>

      <div className="flex items-center gap-3 flex-wrap">
        {platforms.map((platform) => (
          <a
            key={platform.label}
            href={platform.getUrl(referralLink)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors duration-150"
          >
            <Share2 className="w-4 h-4 text-gray-500" />
            {platform.label}
          </a>
        ))}
      </div>
    </div>
  );
}
