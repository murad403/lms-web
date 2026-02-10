import CTABanner from '@/components/reusable/CTABanner';
import { getTranslations } from "next-intl/server";
import AboutTrainers from './AboutTrainers';
import TrainersBanner from './TrainersBanner';
import TrainersHowItsWorks from './TrainersHowItsWorks';
import TrainersOngoingSupport from './TrainersOngoingSupport';
import TrainersOpportunity from './TrainersOpportunity';


const page = async () => {
    const t = await getTranslations("ForTrainers");
    return (
        <div>
            {/* banner */}
            <TrainersBanner />

            {/* certifications */}
            <div className="px-3 sm:px-4 md:px-6 lg:px-0 container mx-auto space-y-20">
                <AboutTrainers />
                <TrainersHowItsWorks />
                <TrainersOpportunity />
                <TrainersOngoingSupport />
                <CTABanner title={t("ctaTitle")} description={t("ctaDescription")} buttonText={t("ctaButton")} route='/auth/trainer-sign-up' />
            </div>
        </div>
    )
}

export default page
