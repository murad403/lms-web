import SchoolBanner from './SchoolBanner'
import AboutSchool from './AboutSchool'
import SchoolWhatYouCanDo from './SchoolWhatYouCanDo'
import SchoolHowItsWorks from './SchoolHowItsWorks'
import SchoolSolutions from './SchoolSolutions'
import CTABanner from '@/components/reusable/CTABanner'
import { getTranslations } from "next-intl/server"

const page = async () => {
    const t = await getTranslations("ForSchool");
    return (
        <div>
            <SchoolBanner />
            <div className="px-3 sm:px-4 md:px-6 lg:px-0 container mx-auto space-y-20">
                <AboutSchool/>
                <SchoolWhatYouCanDo/>
                <SchoolHowItsWorks/>
                <SchoolSolutions/>
                <CTABanner title={t("ctaTitle")} description={t("ctaDescription")} buttonText={t("ctaButton")} route='/auth/organization-sign-up' />
            </div>
        </div>
    )
}

export default page
