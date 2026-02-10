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
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">1. Introduction</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            Form-Cert SRL is dedicated to ensuring transparency and protecting your privacy. This Cookie Policy explains how we use cookies and similar technologies to enhance your experience on our platform.
                        </p>
                    </div>

                    {/* 2. What Are Cookies? */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">2. What Are Cookies?</h2>
                        <div className="ml-6 space-y-2">
                            <p className="text-description text-xs sm:text-sm md:text-base">
                                <span className="font-semibold">We utilize the following types of cookies:</span>
                            </p>
                            <ul className="list-disc ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                                <li>Essential cookies (necessary for basic site functionality)</li>
                                <li>Performance cookies (analyze site usage to improve performance)</li>
                                <li>Functional cookies (enhance user experience with personalized features)</li>
                                <li>
                                    Advertising cookies (track browsing habits to deliver targeted ads)
                                </li>
                                <li>
                                    Third-party cookies (set by external services integrated into our site)
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 3. How We Use Cookies */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">3. How We Use Cookies</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">We use cookies to:</p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>Keep you signed in</li>
                            <li>Understand how you interact with our Site</li>
                            <li>Personalize content and ads</li>
                            <li>Analyze site traffic and user behavior</li>
                            <li>Improve Site functionality and performance</li>
                        </ul>
                    </div>

                    {/* 4. Third-Party Services */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">4. Analyze site traffic and user behavior</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            Personalize your experience and remember your preferences
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>Provide relevant content and advertising</li>
                            <li>Improve site functionality and performance</li>
                            <li>You can manage your cookie preferences through your browser settings. You can choose to block all cookies, accept </li>
                            <li>More Information</li>
                            <li>For more details on how we handle data, please see our Privacy Policy.</li>
                            <li>6. Updates to This Policy</li>
                        </ul>
                    </div>

                    {/* 5. Updates to Cookie Policy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">
                            5. We may update this Cookie Policy periodically.
                        </h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            If you have any questions or concerns about our use of cookies, please contact us:
                        </p>
                        <div className="ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                            <p>
                                <span className="font-semibold">Email:</span> privacy@form-cert.eu
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span> Form-Cert SRL, Via Roma 123, 20121
                                Milano, Italy
                            </p>
                        </div>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mt-4">
                            By continuing to use our Site, you consent to our use of cookies as described in this
                            policy.
                        </p>
                    </div>

                    {/* 6. Data Sharing and Disclosure */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">6. Data Sharing and Disclosure</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            We do not sell your personal data. We may share your information with:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>Legal authorities when required by law</li>
                            <li>Payment processors for transaction processing</li>
                            <li>Service providers who assist in operating our platform</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </div>

                    {/* 7. Data Security */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">7. Data Security</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                           We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </div>

                    {/* 8. Data Retention */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">8. Data Retention</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                        </p>
                    </div>

                    {/* 9. Your Rights and Choices */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">9. Your Rights and Choices</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            You can update your account information, unsubscribe from marketing communications, or request deletion of your data by contacting us at privacy@form-cert.eu.
                        </p>
                    </div>

                    {/* 10. Children's Privacy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">10. Children&apos;s Privacy</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                            Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.
                        </p>
                    </div>

                    {/* 11. Changes to This Policy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">11. Changes to This Policy</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed">
                           We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </div>

                    {/* 12. Contact Us */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">12. Contact Us</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                            If you have questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="ml-6 space-y-1 text-description text-xs sm:text-sm">
                            <p>
                                <span className="font-semibold">Email:</span> privacy@form-cert.eu
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span> +39 02 1234 5678
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span> Form-Cert SRL, Via Roma 123, 20121
                                Milano, Italy
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CookiePolicyPage;
