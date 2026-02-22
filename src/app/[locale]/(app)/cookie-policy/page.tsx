import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import { getTranslations } from 'next-intl/server';
import React from 'react';

const CookiePolicyPage = async () => {
    const t = await getTranslations('Cookie');

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

                    {/* 2. What Are Cookies? */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section2Title")}</h2>
                        <div className="ml-6 space-y-2">
                            <p className="text-description text-xs sm:text-sm md:text-base">
                                <span className="font-semibold">{t("section2Intro")}</span>
                            </p>
                            <ul className="list-disc ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                                <li>{t("cookie1")}</li>
                                <li>{t("cookie2")}</li>
                                <li>{t("cookie3")}</li>
                                <li>{t("cookie4")}</li>
                                <li>{t("cookie5")}</li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. How We Use Cookies */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section3Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">{t("section3Intro")}</p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>{t("cu1")}</li>
                            <li>{t("cu2")}</li>
                            <li>{t("cu3")}</li>
                            <li>{t("cu4")}</li>
                            <li>{t("cu5")}</li>
                        </ul>
                    </div>

                    {/* 4. Third-Party Services */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section4Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            {t("section4Desc")}
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>{t("cp1")}</li>
                            <li>{t("cp2")}</li>
                            <li>{t("cp3")}</li>
                            <li>{t("cp4")}</li>
                        </ul>
                    </div>

                    {/* 5. Updates to Cookie Policy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section5Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            {t("section5Desc")}
                        </p>
                        <div className="ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                            <p>
                                <span className="font-semibold">{t("emailLabel")}:</span> {t("contactEmail")}
                            </p>
                            <p>
                                <span className="font-semibold">{t("addressLabel")}:</span> {t("contactAddress")}
                            </p>
                        </div>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mt-4">
                            {t("section5Consent")}
                        </p>
                    </div>

                    {/* 6. Data Sharing and Disclosure */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section6Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            {t("section6Intro")}
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>{t("cs1")}</li>
                            <li>{t("cs2")}</li>
                            <li>{t("cs3")}</li>
                        </ul>
                    </div>

                    {/* 7. Data Security */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section7Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                            {t("section7Desc")}
                        </p>
                    </div>

                    {/* 8. Data Retention */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section8Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                            {t("section8Desc")}
                        </p>
                    </div>

                    {/* 9. Your Rights and Choices */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section9Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            {t("section9Desc")}
                        </p>
                    </div>

                    {/* 10. Children's Privacy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section10Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                            {t("section10Desc")}
                        </p>
                    </div>

                    {/* 11. Changes to This Policy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section11Title")}</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                            {t("section11Desc")}
                        </p>
                    </div>

                    {/* 12. Contact Us */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">{t("section12Title")}</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                            {t("section12Intro")}
                        </p>
                        <div className="ml-6 space-y-1 text-description text-xs sm:text-sm">
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

export default CookiePolicyPage;
