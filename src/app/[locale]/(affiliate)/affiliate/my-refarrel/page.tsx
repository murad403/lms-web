import { MyReferralLinkPage } from "@/components/affiliate/referral/MyReferral";
import React from "react";

const page = () => {
  return (
    <div className="p-8 space-y-8">
      <MyReferralLinkPage
        affiliateCode="AFF-83921"
        referralLink="https://platform.com/course?id=123&ref=AFF-83921"
        commissionPercent={15}
      />
    </div>
  );
};

export default page;
