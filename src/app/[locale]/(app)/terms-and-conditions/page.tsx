import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import { getTranslations } from 'next-intl/server';

const TermsAndConditions = async () => {
    const t = await getTranslations('Terms');

    return (
        <div>
            <FooterNavigationBanner title={t("title")} description={`${t("lastUpdated")}: January 27, 2025`} />

            <section className="pt-16 container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* 1. Introduction */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section1Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            {t("section1Desc")}
                        </p>
                    </div>

                    {/* 2. Information We Collect */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section2Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                            {t("section2Intro")}
                        </p>
                        <div className="ml-6 space-y-3">
                            <div>
                                <p className="text-title text-base sm:text-lg md:text-xl font-semibold mb-1">{t("personalDataTitle")}</p>
                                <ul className="list-disc ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                                    <li>{t("pd1")}</li>
                                    <li>{t("pd2")}</li>
                                    <li>{t("pd3")}</li>
                                    <li>{t("pd4")}</li>
                                    <li>{t("pd5")}</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-title text-base sm:text-lg md:text-xl font-semibold mb-1">{t("usageDataTitle")}</p>
                                <ul className="list-disc ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                                    <li>{t("ud1")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 3. How We Use Your Information */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section3Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">{t("section3Intro")}</p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>{t("use1")}</li>
                            <li>{t("use2")}</li>
                            <li>{t("use3")}</li>
                            <li>{t("use4")}</li>
                            <li>{t("use5")}</li>
                            <li>{t("use6")}</li>
                            <li>{t("use7")}</li>
                        </ul>
                    </div>

                    {/* 4. GDPR Compliance */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section4Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                            {t("section4Intro")}
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>{t("gdpr1")}</li>
                            <li>{t("gdpr2")}</li>
                            <li>{t("gdpr3")}</li>
                            <li>{t("gdpr4")}</li>
                            <li>{t("gdpr5")}</li>
                            <li>{t("gdpr6")}</li>
                            <li>{t("gdpr7")}</li>
                        </ul>
                    </div>

                    {/* 5. Data Sharing and Disclosure */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section5Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                            {t("section5Intro")}
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>{t("share1")}</li>
                            <li>{t("share2")}</li>
                            <li>{t("share3")}</li>
                            <li>{t("share4")}</li>
                        </ul>
                    </div>

                    {/* 6. Data Security */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section6Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            {t("section6Desc")}
                        </p>
                    </div>

                    {/* 7. Data Retention */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section7Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            {t("section7Desc")}
                        </p>
                    </div>

                    {/* 8. Your Rights and Choices */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section8Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            {t("section8Desc")}
                        </p>
                    </div>

                    {/* 9. Children's Privacy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section9Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            {t("section9Desc")}
                        </p>
                    </div>

                    {/* 10. Changes to This Policy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section10Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            {t("section10Desc")}
                        </p>
                    </div>

                    {/* 11. Contact Us */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section11Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            {t("section11Intro")}
                        </p>
                        <div className="ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                            <p>
                                <span className="font-semibold">{t("emailLabel")}:</span> {t("contactEmail")}
                            </p>
                            <p>
                                <span className="font-semibold">{t("phoneLabel")}:</span> {t("contactPhone")}
                            </p>
                            <p>
                                <span className="font-semibold">{t("addressLabel")}:</span> {t("contactAddress")}
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditions;

