"use client"
import Link from "next/link";
import { Linkedin, Facebook, Instagram, Twitter, ChevronDown, Check, Globe } from "lucide-react";
import { useState } from "react";

const footerLinks = {
    platform: {
        title: "Platform",
        links: [
            { label: "About Us", href: "/about" },
            { label: "How It Works", href: "/how-it-works" },
            { label: "FAQ", href: "/faq" },
        ],
    },
    courses: {
        title: "Courses",
        links: [
            { label: "Online Courses", href: "/categories/Online%20Courses" },
            { label: "In-Person Courses", href: "/categories/In-Person%20Courses" },
            { label: "Certifications", href: "/certifications" },
        ],
    },
    collaborations: {
        title: "Collaborations",
        links: [
            { label: "Become a Trainer", href: "/for-trainers" },
            { label: "Schools & Institutions", href: "/for-school" },
            { label: "Partnerships", href: "/partnerships" },
        ],
    },
    legal: {
        title: "Legal & Contacts",
        links: [
            { label: "Contacts", href: "/contacts" },
            { label: "Privacy Policy", href: "/privacy-policy" },
            { label: "Cookie Policy", href: "/cookie-policy" },
        ],
    },
};

const languages = ["English", "Italiano", "Español", "Deutsch", "Francais"];

const socialIcons = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
    const [language, setLanguage] = useState("English");
    const [showMobileLanguage, setShowMobileLanguage] = useState(false);
    return (
        <footer className="bg-[#E5E7EB] border-t md:mt-28 mt-20 border-gray-200">
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
                            <Link
                                key={social.label}
                                href={social.href}
                                className="w-10 h-10 bg-main rounded-lg flex items-center justify-center hover:bg-main/90 transition-colors"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5 text-white" />
                            </Link>
                        ))}
                    </div>

                    {/* Language Selector in Mobile Menu */}
                    <div className="relative border-t border-gray-200 pt-4 mt-4">
                        {showMobileLanguage && (
                            <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                                {languages.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => {
                                            setLanguage(lang);
                                            setShowMobileLanguage(false);
                                        }}
                                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                        {lang}
                                        {language === lang && (
                                            <Check className="w-4 h-4 text-main" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                        
                        <button
                            onClick={() => setShowMobileLanguage(!showMobileLanguage)}
                            className="w-full flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <Globe className="w-5 h-5" />
                                <span>Language: {language}</span>
                            </div>
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${showMobileLanguage ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Copyright */}
                    <p className="text-xs sm:text-sm text-description">
                        © Form-Cert. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
