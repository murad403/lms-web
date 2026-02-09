'use client';

import React, { useState } from 'react';
import FooterNavigationBanner from '@/components/reusable/FooterNavigationBanner';
import { ChevronDown } from 'lucide-react';

const faqData = [
    {
        question: 'What is Form-Cert?',
        answer: 'Form-Cert is a professional training and certification platform that connects learners, trainers, and institutions. We offer EU-grade certifications and expert-led courses across multiple industries.',
    },
    {
        question: 'Are the certifications recognized?',
        answer: 'Yes! All certifications on Form-Cert meet rigorous EU standards and are designed by professionals in collaboration with EU-level bodies. They are recognized by employers and institutions across Europe.',
    },
    {
        question: 'How do I create an account?',
        answer: 'Simply click on "Sign Up" in the navigation menu, choose your account type (Learner, Trainer, or Organization), fill in your details, and verify your email address to get started.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers for institutional clients. All payments are processed securely through our encrypted payment gateway.',
    },
    {
        question: 'Can I get a refund?',
        answer: 'Yes, we offer a 14-day money-back guarantee for all courses. If you\'re not satisfied with a course within 14 days of purchase and haven\'t completed more than 30% of the content, you can request a full refund.',
    },
    {
        question: 'How long do I have access to a course?',
        answer: 'Once you enroll in a course, you have lifetime access to all course materials, including any future updates. You can learn at your own pace and revisit the content anytime.',
    },
    {
        question: 'Do you offer certificates for course completion?',
        answer: 'Yes! Upon successful completion of a course and passing the final assessment, you\'ll receive an EU-grade certificate that you can download and share with employers or on professional networks.',
    },
    {
        question: 'Can I become a trainer on Form-Cert?',
        answer: 'Absolutely! We welcome experienced professionals to become trainers. You\'ll need to submit your credentials and go through our verification process. Once approved, you can create and publish courses.',
    },
    {
        question: 'How do institutions partner with Form-Cert?',
        answer: 'Schools, universities, and organizations can partner with Form-Cert to offer our courses to their students or employees. Contact our partnerships team to discuss custom solutions and pricing.',
    },
    {
        question: 'Is there a mobile app available?',
        answer: 'Currently, Form-Cert is fully responsive and works seamlessly on all devices through your web browser. We\'re working on dedicated mobile apps for iOS and Android, coming soon!',
    },
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <FooterNavigationBanner
                title="Frequently Asked Questions"
                description={
                    <>
                    Find answers to common questions about Form-Cert, courses, certifications, <br /> and more.
                    </>
                }
            />

            <section className="pt-16 container mx-auto">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition"
                                >
                                    <span className="font-semibold text-header text-lg">{faq.question}</span>
                                    <ChevronDown
                                        className={`size-5 text-main transition-transform shrink-0 ml-4 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                {openIndex === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <p className="text-[#364153] text-[16px] leading-relaxed">{faq.answer}</p>
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
