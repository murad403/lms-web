import React from 'react'
import PartnerBanner from './PartnerBanner'
import AboutPartner from './AboutPartner'
import PartnerShipHowItsWorks from './PartnerShipHowItsWorks'
import PartnershipOpportunity from './PartnershipOpportunity'
import CTABanner from '@/components/reusable/CTABanner'

const page = () => {
    return (
        <div>
            <PartnerBanner />
            <div className="px-3 sm:px-4 md:px-6 lg:px-0 container mx-auto space-y-20 max-w-7xl">
                <AboutPartner />
                <PartnerShipHowItsWorks/>
                <PartnershipOpportunity/>
                <CTABanner title='Become a Local Guidance Center' description={
    <>
      Be the reference point for your territory
      and earn through your <br/> affiliate code.
    </>
  } buttonText='Become a Partner' route='/auth/partner-sign-up' />
            </div>
        </div>
    )
}

export default page
