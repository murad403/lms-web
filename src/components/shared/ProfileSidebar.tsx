"use client";
import { Link, usePathname } from "@/i18n/navigation";
import {
    LayoutDashboard, User, BookOpen, TrendingUp, Video, Bot, Award, Heart, Star, HelpCircle, History, MessageSquare, Settings, LogOut,
} from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import LogoutModal from "./LogoutModal";


type SidebarItem = {
    labelKey: string;
    href: string;
    icon: React.ElementType;
    color?: string;
};

const mainMenuItems: SidebarItem[] = [
    { labelKey: "myDashboard", href: "/dashboard", icon: LayoutDashboard },
    { labelKey: "myProfile", href: "/profile", icon: User },
    { labelKey: "enrolledCourses", href: "/enrolled-courses", icon: BookOpen },
    { labelKey: "learningProgress", href: "/learning-progress", icon: TrendingUp },
    { labelKey: "liveClasses", href: "/live-classes", icon: Video },
    { labelKey: "aiTutor", href: "/ai-tutor", icon: Bot },
    { labelKey: "myCertificates", href: "/my-certificates", icon: Award },
    { labelKey: "wishlist", href: "/wishlist", icon: Heart},
    { labelKey: "reviews", href: "/reviews", icon: Star },
    { labelKey: "myQuizAttempts", href: "/quiz-attempts", icon: HelpCircle },
    { labelKey: "purchaseHistory", href: "/purchase-history", icon: History },
    { labelKey: "messages", href: "/messages", icon: MessageSquare },
];

const accountSettingsItems: SidebarItem[] = [
    { labelKey: "settings", href: "/settings", icon: Settings },
];

const ProfileSidebar = () => {
    const pathname = usePathname();
    const [showLogout, setShowLogout] = useState(false);
    const t = useTranslations("ProfileSidebar");

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };

    const renderItem = (item: SidebarItem) => {
        const active = isActive(item.href);
        const Icon = item.icon;
        return (
            <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${active
                    ? "bg-sidebar-hover text-main font-semibold"
                    : "text-description hover:bg-gray-50 hover:text-title"
                    }`}
            >
                <Icon className={`w-4 h-4 shrink-0 ${active ? "text-main" : item.color || "text-description"}`} />
                <span className="truncate">{t(item.labelKey)}</span>
            </Link>
        );
    };

    return (
        <>
            <aside className="w-full lg:w-60 xl:w-84 shrink-0">
                <div className="bg-white rounded-md border border-border-light p-4 sticky top-20">
                    {/* Main Menu */}
                    <div className="mb-4">
                        <h3 className="text-[16px] font-bold text-title uppercase tracking-wider mb-2 px-3">
                            {t("mainMenu")}
                        </h3>
                        <nav className="space-y-0.5">
                            {mainMenuItems.map(renderItem)}
                        </nav>
                    </div>

                    {/* Account Settings */}
                    <div className="border-t border-border-light pt-4">
                        <h3 className="text-xs font-bold text-title uppercase tracking-wider mb-2 px-3">
                            {t("accountSettings")}
                        </h3>
                        <nav className="space-y-0.5">
                            {accountSettingsItems.map(renderItem)}
                            <button
                                onClick={() => setShowLogout(true)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-description hover:bg-gray-50 hover:text-title transition-colors w-full"
                            >
                                <LogOut className="w-4 h-4 shrink-0 text-description" />
                                <span className="truncate">{t("logout")}</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </aside>

            <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
        </>
    );
};

export default ProfileSidebar;
