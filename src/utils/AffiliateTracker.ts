"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTrackReferralClickMutation } from "@/redux/features/affiliate/affiliate.api";



const AffiliateTracker = () => {
  const searchParams = useSearchParams();

  const ref = searchParams.get("ref"); 
  const [trackAffiliateClick] = useTrackReferralClickMutation();

  useEffect(() => {
    if (!ref) return;

    const alreadyTracked = localStorage.getItem(`tracked_${ref}`);

    if (alreadyTracked) return;

    trackAffiliateClick({
      referral_code: ref,
    });

    localStorage.setItem(`tracked_${ref}`, "true");

    // future use
    localStorage.setItem("affiliate_ref", ref);
  }, [ref, trackAffiliateClick]);

  return null;
}

export default AffiliateTracker;