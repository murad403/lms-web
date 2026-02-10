'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import { ChevronDown } from 'lucide-react';

const FAQPage = () => {
    const t = useTranslations("FAQ");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData = [
        { question: t("q1"), answer: t("a1") },
        { question: t("q2"), answer: t("a2") },
        { question: t("q3"), answer: t("a3") },
        { question: t("q4"), answer: t("a4") },
        { question: t("q5"), answer: t("a5") },
        { question: t("q6"), answer: t("a6") },
        { question: t("q7"), answer: t("a7") },
        { question: t("q8"), answer: t("a8") },
        { question: t("q9"), answer: t("a9") },
        { question: t("q10"), answer: t("a10") },
    ];

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <FooterNavigationBanner
                title={t("title")}
                description={t("description")}
            />

            <section className="pt-16 container mx-auto px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition"
                                >
                                    <span className="font-semibold text-header text-base sm:text-lg md:text-xl">{faq.question}</span>
                                    <ChevronDown
                                        className={`size-5 text-main transition-transform shrink-0 ml-4 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <p className="text-[#364153] text-xs sm:text-sm md:text-base leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
