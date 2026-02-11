"use client"
import { Link } from "@/i18n/navigation";
import { Linkedin, Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

const socialIcons = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
    const t = useTranslations("Footer");

    const footerLinks = {
        platform: {
            title: t("platform"),
            links: [
                { label: t("aboutUs"), href: "/about" as const },
                { label: t("howItWorks"), href: "/how-it-works" as const },
                { label: t("faq"), href: "/faq" as const },
            ],
        },
        courses: {
            title: t("coursesTitle"),
            links: [
                { label: t("onlineCourses"), href: "/categories/Online%20Courses" as const },
                { label: t("inPersonCourses"), href: "/categories/In-Person%20Courses" as const },
                { label: t("certifications"), href: "/certifications" as const },
            ],
        },
        collaborations: {
            title: t("collaborations"),
            links: [
                { label: t("becomeTrainer"), href: "/for-trainers" as const },
                { label: t("schoolsInstitutions"), href: "/for-school" as const },
                { label: t("partnerships"), href: "/partnerships" as const },
            ],
        },
        legal: {
            title: t("legalContacts"),
            links: [
                { label: t("contacts"), href: "/contacts" as const },
                { label: t("privacyPolicy"), href: "/privacy-policy" as const },
                { label: t("cookiePolicy"), href: "/cookie-policy" as const },
            ],
        },
    };

    return (
        <footer className="bg-border-light border-t md:mt-28 mt-20 border-gray-200">
            <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-0 py-12 md:py-16">
                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title}>
                            <h4 className="font-bold text-title text-sm sm:text-base md:text-lg mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-xs sm:text-sm md:text-base text-description hover:text-main transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Social Icons */}
                    <div className="flex gap-3">
                        {socialIcons.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                className="w-10 h-10 bg-main rounded-lg flex items-center justify-center hover:bg-main/90 transition-colors"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5 text-white" />
                            </a>
                        ))}
                    </div>

                    {/* Language Selector */}
                    <LanguageSwitcher variant="footer" />

                    {/* Copyright */}
                    <p className="text-xs sm:text-sm text-description">
                        {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
