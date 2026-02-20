"use client";

import { useState } from "react";
import { Link2, Copy, Check } from "lucide-react";

interface AffiliateCardProps {
  affiliateCode?: string;
  referralLink?: string;
  commissionPercent?: number;
  className?: string;
}

export function AffiliateCardLink({
  affiliateCode = "AFF-83921",
  referralLink = "https://platform.com/course?id=123&ref=AFF-83921",
  commissionPercent = 15,
  className = "",
}: AffiliateCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
          <Link2 className="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p className="text-[18px] font-bold text-gray-900">
            Your Affiliate Link
          </p>
          <p className="text-sm text-gray-500">Code: {affiliateCode}</p>
        </div>
      </div>

      {/* Link + Copy */}
      <div className="flex items-center gap-2">
        <div className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 bg-white overflow-hidden">
          <span className="text-sm text-gray-700 truncate block">
            {referralLink}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors duration-150 whitespace-nowrap"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          {copied ? "Copied!" : "Copy Link"}
        </button>
      </div>

      {/* Tip */}
      <div className="bg-blue-50 rounded-xl px-4 py-3 text-sm text-blue-600">
        <span className="font-semibold">Tip:</span> Share this link on your
        blog, social media, or email to start earning{" "}
        <span className="font-semibold">{commissionPercent}% commission</span>{" "}
        on every sale!
      </div>
    </div>
  );
}
