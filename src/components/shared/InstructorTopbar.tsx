"use client";
import { useState, useRef, useEffect } from "react";
import { Bell, CreditCard, Menu as MenuIcon, X } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { notifications, TNotification } from "@/lib/header";
import user from "@/assets/partnership/user2.png";
import { LayoutDashboard, BookOpen, Video, DollarSign, MessageSquare, Award, Bot, Settings, LogOut, PlusCircle } from "lucide-react";
import LogoutModal from "./LogoutModal";
import { PiGraduationCap } from "react-icons/pi";
import { useTranslations } from "next-intl";

type SidebarItem = {
    labelKey: string;
    href: string;
    icon: React.ElementType;
};

const mobileMenuItems: SidebarItem[] = [
    { labelKey: "dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
    { labelKey: "createNewCourse", href: "/instructor/create-course", icon: PlusCircle },
    { labelKey: "myCourses", href: "/instructor/my-courses", icon: BookOpen },
    { labelKey: "liveClasses", href: "/instructor/live-classes", icon: Video },
    { labelKey: "earning", href: "/instructor/earnings", icon: DollarSign },
    { labelKey: "message", href: "/instructor/messages", icon: MessageSquare },
    { labelKey: "accreditation", href: "/instructor/accreditation", icon: Award },
    { labelKey: "aiAssistant", href: "/instructor/ai-assistant", icon: Bot },
    { labelKey: "settings", href: "/instructor/settings", icon: Settings },
];

const InstructorTopbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const t = useTranslations("InstructorTopbar");

    // Derive page title from pathname
    const getPageTitle = () => {
        const segments = pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1] || "dashboard";
        const titleKeys: Record<string, string> = {
            dashboard: "dashboard",
            "create-course": "createNewCourse",
            "my-courses": "myCourses",
            "live-classes": "liveClasses",
            earnings: "earning",
            messages: "message",
            accreditation: "accreditation",
            "ai-assistant": "aiAssistant",
            settings: "settings",
            profile: "profile",
        };
        const key = titleKeys[lastSegment];
        return key ? t(key) : lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1).replace(/-/g, " ");
    };

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setShowNotifications(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-6 xl:px-10 py-2.5">
                    {/* Left - Mobile menu + Title */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        >
                            {showMobileMenu ? (
                                <X className="w-6 h-6 text-gray-700" />
                            ) : (
                                <MenuIcon className="w-6 h-6 text-gray-700" />
                            )}
                        </button>

                        <div>
                            <p className="text-xs sm:text-sm text-[#6E7485] font-medium">{t("goodMorning")}</p>
                            <h1 className="text-base sm:text-xl font-bold text-title">{getPageTitle()}</h1>
                        </div>
                    </div>

                    {/* Right - Notification + Profile */}
                    <div className="flex items-center gap-3">
                        {/* Notification */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                            >
                                <Bell className="size-6 text-gray-700" />
                            </button>

                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden">
                                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-title">{t("notifications")}</h3>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">{t("all")}</button>
                                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">{t("unread")}</button>
                                        </div>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.map((notification: TNotification) => (
                                            <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100 flex gap-3">
                                                <div className={`w-10 h-10 ${notification.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                                                    {notification.icon === "bell" ? (
                                                        <Bell className="w-5 h-5 text-blue-600" />
                                                    ) : (
                                                        <CreditCard className="w-5 h-5 text-green-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-title text-sm">{notification.title}</h4>
                                                    <p className="text-xs text-description mt-0.5">{notification.description}</p>
                                                    <p className="text-[10px] text-gray-400 mt-1">{notification.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile */}
                        <Link href="/instructor/settings" className="size-10 sm:size-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-main transition-colors">
                            <Image src={user} alt="User" width={48} height={48} className="w-full h-full object-cover" />
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-gray-200 bg-[#0F1B35]">
                        <div className="px-3 py-4">
                            {/* Mobile Logo */}
                            <div className="px-3 pb-3 mb-3 border-b border-white/10">
                                <Link href="/" className="flex items-center gap-2" onClick={() => setShowMobileMenu(false)}>
                                    <PiGraduationCap className="size-7 text-white" />
                                    <span className="text-lg font-bold text-white">Forma-Cert</span>
                                </Link>
                            </div>
                            <nav className="space-y-1">
                                {mobileMenuItems.map((item) => {
                                    const active = isActive(item.href);
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setShowMobileMenu(false)}
                                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active
                                                ? "bg-main text-white font-semibold"
                                                : "text-gray-300 hover:bg-white/10 hover:text-white"
                                                }`}
                                        >
                                            <Icon className="w-5 h-5 shrink-0" />
                                            <span>{t(item.labelKey)}</span>
                                        </Link>
                                    );
                                })}
                                <button
                                    onClick={() => {
                                        setShowMobileMenu(false);
                                        setShowLogout(true);
                                    }}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-full"
                                >
                                    <LogOut className="w-5 h-5 shrink-0" />
                                    <span>{t("signOut")}</span>
                                </button>
                            </nav>
                        </div>
                    </div>
                )}
            </header>

            <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
        </>
    );
};

export default InstructorTopbar;
