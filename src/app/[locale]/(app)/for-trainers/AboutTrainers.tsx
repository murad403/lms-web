import { getTranslations } from "next-intl/server";

type TFeature = {
    title: string;
    description: string;
}
const AboutTrainers = async () => {
    const t = await getTranslations("ForTrainers");

    const features: TFeature[] = [
        { title: t("noUpfrontCosts"), description: t("noUpfrontCostsDesc") },
        { title: t("noTechnicalSkills"), description: t("noTechnicalSkillsDesc") },
        { title: t("fullControl"), description: t("fullControlDesc") },
        { title: t("officialCert"), description: t("officialCertDesc") },
        { title: t("continuousSupport"), description: t("continuousSupportDesc") },
        { title: t("visibility"), description: t("visibilityDesc") },
    ];
    return (
        <div className="container mx-auto max-w-7xl">

            {/* Do You Want to Teach */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold text-navy-blue mb-4">
                    {t("doYouWantToTeach")}
                </h2>
                <p className="text-description text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mb-4 ">
                    {t("doYouWantToTeachDesc")}
                </p>
                <p className="text-navy-blue text-base sm:text-lg md:text-xl font-semibold">
                    {t("youCreate")}
                </p>
            </div>

            {/* Why Become an Instructor */}
            <div className="border border-gray-100 rounded-md p-5 md:p-12 mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-main mb-6">
                    {t("whyTeachTitle")}
                </h2>

                <ul className="text-description text-xs sm:text-sm md:text-base space-y-1 mb-8">
                    <li>• {t("noUpfrontCosts")}</li>
                    <li>• {t("noTechnicalSkills")}</li>
                    <li>• {t("fullControl")}</li>
                    <li>• {t("continuousSupport")}</li>
                    <li>• {t("officialCert")}</li>
                    <li>• {t("visibility")}</li>
                </ul>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-6 gap-3">
                    {
                        features.map((feature: TFeature, index: number) => (
                            <div key={index} className="border border-gray-100 rounded-md p-5">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-title mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-description text-xs sm:text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default AboutTrainers
