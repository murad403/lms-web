"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";

interface AffiliateReferralCardProps {
  affiliateCode?: string;
  referralLink?: string;
  className?: string;
}

export function AffiliateReferralCard({
  affiliateCode = "AFF-83921",
  referralLink = "https://platform.com/course?id=123&ref=AFF-83921",
  className = "",
}: AffiliateReferralCardProps) {
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const t = useTranslations("AffiliateDashboard");

  const handleCopy = async (text: string, type: "code" | "link") => {
    await navigator.clipboard.writeText(text);
    if (type === "code") {
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    } else {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-5 ${className}`}
    >
      {/* Affiliate Code */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500 font-medium">{t("yourAffiliateCode")}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 bg-white">
            <span className="text-gray-900 font-bold text-sm tracking-wide">
              {affiliateCode}
            </span>
          </div>
          <button
            onClick={() => handleCopy(affiliateCode, "code")}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap"
          >
            {codeCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {codeCopied ? t("copied") : t("copyCode")}
          </button>
        </div>
      </div>

      {/* Referral Link */}
      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-500 font-medium">{t("yourReferralLink")}</p>
        <div className="flex items-center gap-3">
          <div className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 bg-white overflow-hidden">
            <span className="text-gray-500 text-sm truncate block">
              {referralLink}
            </span>
          </div>
          <button
            onClick={() => handleCopy(referralLink, "link")}
            className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 active:bg-gray-100 text-blue-600 text-sm font-semibold rounded-lg border border-gray-200 transition-colors duration-150 whitespace-nowrap"
          >
            {linkCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            {linkCopied ? t("copied") : t("copyLink")}
          </button>
        </div>
      </div>
    </div>
  );
}
