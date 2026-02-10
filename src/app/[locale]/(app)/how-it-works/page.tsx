import { getTranslations } from 'next-intl/server';
import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import CTABanner from '@/components/reusable/CTABanner';
import { Search, BookOpen, Award, UserCheck, FileText, Users, CheckCircle, BookCheck, GraduationCap } from 'lucide-react';

const HowItWorksPage = async () => {
    const t = await getTranslations("HowItWorks");

    const learnerSteps = [
        {
            step: t("learnerStep1"),
            icon: Search,
            description: t("learnerStep1Desc"),
        },
        {
            step: t("learnerStep2"),
            icon: BookOpen,
            description: t("learnerStep2Desc"),
        },
        {
            step: t("learnerStep3"),
            icon: Award,
            description: t("learnerStep3Desc"),
        },
    ];

    const trainerSteps = [
        {
            step: t("trainerStep1"),
            icon: UserCheck,
            description: t("trainerStep1Desc"),
        },
        {
            step: t("trainerStep2"),
            icon: FileText,
            description: t("trainerStep2Desc"),
        },
        {
            step: t("trainerStep3"),
            icon: Users,
            description: t("trainerStep3Desc"),
        },
    ];

    const schoolSteps = [
        {
            step: t("schoolStep1"),
            icon: CheckCircle,
            description: t("schoolStep1Desc"),
        },
        {
            step: t("schoolStep2"),
            icon: BookCheck,
            description: t("schoolStep2Desc"),
        },
        {
            step: t("schoolStep3"),
            icon: GraduationCap,
            description: t("schoolStep3Desc"),
        },
    ];

    return (
        <div>
            <FooterNavigationBanner
                title={t("title")}
                description={t("description")}
            />

            {/* For Learners Section */}
            <section className="py-16 container max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header text-center mb-12">{t("forLearners")}</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {learnerSteps.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="bg-[#DBEAFE] p-4 rounded-full w-fit mx-auto mb-4">
                                    <Icon className="size-8 text-main" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-medium text-main mb-2">{t("step")} {index + 1}</h3>
                                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{item.step}</h4>
                                <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* For Trainers Section */}
            <section className=" max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="container py-16 mx-auto bg-[#F9FAFB] rounded-md">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header text-center mb-12">{t("forTrainers")}</h2>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {trainerSteps.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div key={index} className="text-center p-8">
                                    <div className="bg-[#DBEAFE] p-4 rounded-full w-fit mx-auto mb-4">
                                        <Icon className="size-8 text-main" />
                                    </div>
                                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-main mb-2">{t("step")} {index + 1}</h3>
                                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{item.step}</h4>
                                    <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* For Schools & Institutions Section */}
            <section className="py-16 container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-header text-center mb-12">{t("forSchools")}</h2>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {schoolSteps.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="bg-[#DBEAFE] p-4 rounded-full w-fit mx-auto mb-4">
                                    <Icon className="size-8 text-main" />
                                </div>
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-main mb-2">{t("step")} {index + 1}</h3>
                                <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-header mb-3">{item.step}</h4>
                                <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed">{item.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Banner */}
            <section className="pt-16">
                <CTABanner
                    title={t("ctaTitle")}
                    description={t("ctaDescription")}
                    buttonText={t("ctaButton")}
                    route="/auth/sign-up"
                />
            </section>
        </div>
    );
};

export default HowItWorksPage;
