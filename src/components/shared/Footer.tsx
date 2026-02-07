import Link from "next/link";
import { Linkedin, Facebook, Instagram, Twitter, ChevronDown } from "lucide-react";

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
            { label: "Online Courses", href: "/courses/online" },
            { label: "In-Person Courses", href: "/courses/in-person" },
            { label: "Certifications", href: "/certifications" },
        ],
    },
    collaborations: {
        title: "Collaborations",
        links: [
            { label: "Become a Trainer", href: "/trainer" },
            { label: "Schools & Institutions", href: "/schools" },
            { label: "Partnerships", href: "/partnerships" },
        ],
    },
    legal: {
        title: "Legal & Contacts",
        links: [
            { label: "Contacts", href: "/contacts" },
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Cookie Policy", href: "/cookie-policy" },
        ],
    },
};

const socialIcons = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 py-12 md:py-16">
                {/* Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
                    {Object.values(footerLinks).map((section) => (
                        <div key={section.title}>
                            <h4 className="font-bold text-title text-sm mb-4">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-description hover:text-main transition-colors"
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

                    {/* Language */}
                    <button className="flex items-center gap-1 text-sm text-description hover:text-title transition-colors">
                        English
                        <ChevronDown className="w-4 h-4" />
                    </button>

                    {/* Copyright */}
                    <p className="text-sm text-description">
                        © Form-Cert. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
