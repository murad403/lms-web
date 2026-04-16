import React from 'react'
import PartnerBanner from './PartnerBanner'
import AboutPartner from './AboutPartner'
import PartnerShipHowItsWorks from './PartnerShipHowItsWorks'
import PartnershipOpportunity from './PartnershipOpportunity'
import CTABanner from '@/components/reusable/CTABanner'
import { getTranslations } from "next-intl/server"

const page = async () => {
    const t = await getTranslations("Partnerships");
    return (
        <div>
            <PartnerBanner />
            <div className="px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0 container mx-auto space-y-20 max-w-7xl">
                <AboutPartner />
                <PartnerShipHowItsWorks/>
                <PartnershipOpportunity/>
                <CTABanner title={t("ctaTitle")} description={t("ctaDescription")} buttonText={t("ctaButton")} route='/auth/affiliate-sign-up' guardWhenLoggedIn />
            </div>
        </div>
    )
}

export default page
