import { getTranslations } from 'next-intl/server';
import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import CTABanner from '@/components/reusable/CTABanner';
import { Target, Eye, Users, GraduationCap, Building2 } from 'lucide-react';

const AboutPage = async () => {
    const t = await getTranslations("About");

    const audienceCards = [
        {
            id: 1,
            title: t("forLearners"),
            description: t("forLearnersDesc"),
            icon: Users,
        },
        {
            id: 2,
            title: t("forTrainers"),
            description: t("forTrainersDesc"),
            icon: GraduationCap,
        },
        {
            id: 3,
            title: t("forInstitutions"),
            description: t("forInstitutionsDesc"),
            icon: Building2,
        },
    ];

    return (
        <div>
            <FooterNavigationBanner
                title={t("title")}
                description={t("description")}
            />

            {/* Who We Are Section */}
            <section className="py-14 max-w-7xl container mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-header mb-6">{t("whoWeAre")}</h2>
                    <p className="text-description text-base md:text-lg leading-relaxed mb-4">
                        {t("whoWeAreP1")}
                    </p>
                    <p className="text-description text-base md:text-lg leading-relaxed">
                        {t("whoWeAreP2")}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mx-auto">
                    {/* Our Mission */}
                    <div className="bg-[#EFF6FF] rounded-md p-8">

                        <Target className="size-8 text-main mb-3" />

                        <h3 className="text-2xl font-semibold text-header mb-3">{t("ourMission")}</h3>
                        <p className="text-description text-base leading-relaxed">
                            {t("ourMissionDesc")}
                        </p>
                    </div>

                    {/* Our Vision */}
                    <div className="bg-[#EFF6FF] rounded-md p-8">

                        <Eye className="size-8 text-main mb-3" />

                        <h3 className="text-2xl font-semibold text-header mb-3">{t("ourVision")}</h3>
                        <p className="text-description text-base leading-relaxed">
                            {t("ourVisionDesc")}
                        </p>
                    </div>
                </div>
            </section>

            {/* What We Do Section */}
            <section className="py-14">
                <div className="container max-w-7xl mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-header mb-12">{t("whatWeDo")}</h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {
                            audienceCards.map((card) => (
                                <div key={card.id} className="rounded-md border flex flex-col items-center border-gray-100 p-8 text-center">

                                    <card.icon className="size-8 text-main mb-3" />

                                    <h3 className="text-xl font-semibold text-header mb-3">{card.title}</h3>
                                    <p className="text-description text-base leading-relaxed">{card.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Trust, Quality, Certifications Section */}
            <section className="py-14 container max-w-7xl bg-[#F9FAFB] rounded-md mx-auto px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-header mb-6 text-center">{t("trustTitle")}</h2>
                    <p className="text-description text-base md:text-lg leading-relaxed mb-4">
                        {t("trustP1")}
                    </p>
                    <p className="text-description text-base md:text-lg leading-relaxed">
                        {t("trustP2")}
                    </p>
                </div>
            </section>

            {/* CTA Banner */}
            <section className='pt-14 px-4 md:px-5 lg:px-6 xl:px-0 2xl:px-0'>
                <CTABanner
                    title={t("ctaTitle")}
                    buttonText={t("ctaButton")}
                    route="/contacts"
                />
            </section>
        </div>
    );
};

export default AboutPage;
