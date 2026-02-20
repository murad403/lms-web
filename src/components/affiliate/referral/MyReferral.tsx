import { AffiliateCardLink } from "./AffiliateCardLink";
import { QuickShareCard } from "./QuickShare";

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
  return (
    <div className="flex flex-col gap-3 p-6 lg:w-2/3">
      {/* Page Title */}
      <div className="flex flex-col gap-1 mb-2">
        <h1 className="text-xl font-bold text-gray-900">My Referral Link</h1>
        <p className="text-sm text-gray-400">
          Share your unique referral link to start earning commissions
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
