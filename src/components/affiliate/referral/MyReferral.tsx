"use client";
import { AffiliateCardLink } from "./AffiliateCardLink";
import { QuickShareCard } from "./QuickShare";
import { useTranslations } from "next-intl";

interface MyReferralLinkPageProps {
  affiliateCode?: string;
  referralLink?: string;
  commissionPercent?: number;
}

export function MyReferralLinkPage({
  affiliateCode = "AFF-83921",
  referralLink = "https://platform.com/course?id=123&ref=AFF-83921",
  commissionPercent = 15,
}: MyReferralLinkPageProps) {
  const t = useTranslations("AffiliateReferral");
  return (
    <div className="flex flex-col gap-3 p-4 sm:p-6 w-full lg:w-2/3">
      {/* Page Title */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-xl font-bold text-gray-900">{t("myReferralLink")}</h1>
        <p className="text-sm text-gray-400">
          {t("shareDescription")}
        </p>
      </div>

      {/* Affiliate Link Card */}
      <AffiliateCardLink
        affiliateCode={affiliateCode}
        referralLink={referralLink}
        commissionPercent={commissionPercent}
      />

      {/* Quick Share */}
      <div className="mt-5">
        <QuickShareCard referralLink={referralLink} />
      </div>
    </div>
  );
}
