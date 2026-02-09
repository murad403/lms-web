import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';

const PrivacyPolicyPage = () => {
    return (
        <div>
            <FooterNavigationBanner title="Privacy Policy" description="Last updated: January 27, 2025" />

            <section className="pt-16 container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* 1. Introduction */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">1. Introduction</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            Form-Cert SRL ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform and use our services.
                        </p>
                    </div>

                    {/* 2. Information We Collect */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">2. Information We Collect</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                            We may collect personal information that you provide to us, such as:
                        </p>
                        <div className="ml-6 space-y-3">
                            <div>
                                <p className="text-title text-base sm:text-lg md:text-xl font-semibold mb-1">Personal Data:</p>
                                <ul className="list-disc ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                                    <li>Name and contact information (email address, phone number)</li>
                                    <li>Professional information (job title, company, industry)</li>
                                    <li>Account credentials (username, password)</li>
                                    <li>Payment information (processed securely through third-party payment processors)</li>
                                    <li>Course enrollment and progress data</li>
                                </ul>
                            </div>
                            <div>
                                <p className="text-title text-base sm:text-lg md:text-xl font-semibold mb-1">Usage Data:</p>
                                <ul className="list-disc ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                                    <li>We automatically collect information about your device and how you interact with our platform, including IP address, browser type, pages visited, time spent on pages, and other diagnostic data.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 3. How We Use Your Information */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">3. How We Use Your Information</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">We use the information we collect to:</p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>Provide, operate, and maintain our services</li>
                            <li>Process your course enrollments and certifications</li>
                            <li>Send you course updates, notifications, and marketing communications</li>
                            <li>Improve and personalize your experience</li>
                            <li>Respond to your inquiries and provide customer support</li>
                            <li>Detect, prevent, and address technical issues and fraud</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </div>

                    {/* 4. GDPR Compliance */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">4. GDPR Compliance</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                            Form-Cert complies with the General Data Protection Regulation (GDPR). If you are a resident of the European Economic Area (EEA), you have certain data protection rights, including:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>Right to access your personal data</li>
                            <li>Right to rectification of inaccurate data</li>
                            <li>Right to erasure ("right to be forgotten")</li>
                            <li>Right to restrict processing</li>
                            <li>Right to data portability</li>
                            <li>Right to object to processing</li>
                            <li>Right to withdraw consent</li>
                        </ul>
                    </div>

                    {/* 5. Data Sharing and Disclosure */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">5. Data Sharing and Disclosure</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base leading-relaxed mb-3">
                            We do not sell your personal information. However, we may share your information with:
                        </p>
                        <ul className="list-disc ml-6 space-y-2 text-description text-xs sm:text-sm md:text-base">
                            <li>Course instructors and training institutions (limited to enrollment information)</li>
                            <li>Service providers who assist in operating our platform</li>
                            <li>Payment processors for transaction processing</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </div>

                    {/* 6. Data Security */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">6. Data Security</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                        </p>
                    </div>

                    {/* 7. Data Retention */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">7. Data Retention</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                        </p>
                    </div>

                    {/* 8. Your Rights and Choices */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">8. Your Rights and Choices</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            You can update your account information, unsubscribe from marketing communications, or request deletion of your data by contacting us at privacy@form-cert.eu.
                        </p>
                    </div>

                    {/* 9. Children's Privacy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">9. Children&apos;s Privacy</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.
                        </p>
                    </div>

                    {/* 10. Changes to This Policy */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">10. Changes to This Policy</h2>
                        <p className="text-description text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                        </p>
                    </div>

                    {/* 11. Contact Us */}
                    <div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-4">11. Contact Us</h2>
                        <p className="text-description text-sm sm:text-base md:text-lg leading-relaxed mb-3">
                            If you have questions about this Privacy Policy, please contact us:
                        </p>
                        <div className="ml-6 space-y-1 text-description text-xs sm:text-sm md:text-base">
                            <p>
                                <span className="font-semibold">Email:</span> privacy@form-cert.eu
                            </p>
                            <p>
                                <span className="font-semibold">Phone:</span> +39 02 1234 5678
                            </p>
                            <p>
                                <span className="font-semibold">Address:</span> Form-Cert SRL, Via Roma 123, 20121 Milano,
                                Italy
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
