"use client";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
    Bell, Heart, ShoppingCart, Search, ChevronDown, User, LayoutDashboard, LogOut, Menu as MenuIcon, X, Star, CreditCard, Grid3x3,
} from "lucide-react";
import { categories, notifications, TCategory, TNotification } from "@/lib/header";
import { PiGraduationCap } from "react-icons/pi";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import LogoutModal from "./LogoutModal";
import user from "@/assets/partnership/user2.png"

const Navbar = () => {
    const t = useTranslations("Navbar");
    const tMenu = useTranslations("Menu");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showBrowse, setShowBrowse] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const notificationRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const browseRef = useRef<HTMLDivElement>(null);
    const mobileBrowseRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    const [showLogout, setShowLogout] = useState(false);

    const menuItems = [
        { label: tMenu("home"), href: "/" as const },
        { label: tMenu("courses"), href: "/courses" as const },
        { label: tMenu("certifications"), href: "/certifications" as const },
        { label: tMenu("forTrainers"), href: "/for-trainers" as const },
        { label: tMenu("forSchool"), href: "/for-school" as const },
        { label: tMenu("partnerships"), href: "/partnerships" as const },
    ];

    // Change this to true if user is logged in
    const isLoggedIn = true;

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
            if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
                setShowCart(false);
            }
            if (
                (!browseRef.current || !browseRef.current.contains(event.target as Node)) &&
                (!mobileBrowseRef.current || !mobileBrowseRef.current.contains(event.target as Node))
            ) {
                setShowBrowse(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target as Node)
            ) {
                setShowProfile(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="container mx-auto py-3 md:py-4 px-3 sm:px-4 md:px-6 lg:px-0">
                <div className="flex items-center justify-between gap-2 md:gap-4">
                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                        {showMobileMenu ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <MenuIcon className="w-6 h-6 text-gray-700" />
                        )}
                    </button>

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">

                        <PiGraduationCap className="size-8 text-main" />

                        <span className="text-lg md:text-2xl font-bold text-main">
                            From-Cert
                        </span>
                    </Link>

                    {/* Desktop Search Section */}
                    <div className="hidden lg:flex items-center gap-2 flex-1 max-w-2xl">
                        {/* Browse Dropdown */}
                        <div className="relative" ref={browseRef}>
                            <button
                                onClick={() => setShowBrowse(!showBrowse)}
                                className="flex items-center gap-8 px-6 py-3 border border-gray-300 rounded-lg text-sm sm:text-[15px] md:text-base text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                            >
                                {t("browse")}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${showBrowse ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Browse Category Popup */}
                            {showBrowse && (
                                <div className="absolute left-0 top-full mt-2 w-[90vw] sm:w-96 md:w-115 bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50 max-h-[80vh] overflow-y-auto">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-header mb-6">
                                        {t("browseCategory")}
                                    </h3>

                                    <div className="space-y-4">
                                        {categories.map((category: TCategory, index) => (
                                            <Link onClick={() => setShowBrowse(false)} href={`/categories/${category.name}`}
                                                key={index}
                                                className="pb-4 border-b block border-gray-100"
                                            >
                                                <h4 className="font-semibold text-title text-xs sm:text-sm md:text-base mb-1">
                                                    {category.name}
                                                </h4>
                                                <p className="text-xs sm:text-sm text-description">
                                                    {category.count}
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t("searchPlaceholder")}
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-sm sm:text-[15px] md:text-base focus:outline-none focus:border-main"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Right Section - Icons and Auth */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Notification Icon */}
                        <div className="static sm:relative" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                            >
                                <Bell className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                            </button>

                            {/* Notification Popup */}
                            {showNotifications && (
                                <div className="absolute left-0 right-0 mx-4 sm:left-auto sm:mx-0 sm:right-0 top-full mt-2 sm:w-96 md:w-112.5 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden">
                                    {/* Header */}
                                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-header">
                                            {t("recentNotifications")}
                                        </h3>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                {t("all")}
                                            </button>
                                            <button className="px-3 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                {t("unread")}
                                            </button>
                                            <button className="px-3 py-1 text-xs sm:text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                {t("read")}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="max-h-125 overflow-y-auto">
                                        {notifications.map((notification: TNotification) => (
                                            <div
                                                key={notification.id}
                                                className="p-4 hover:bg-gray-50 border-b border-gray-100 flex gap-4"
                                            >
                                                <div
                                                    className={`w-12 h-12 ${notification.iconBg} rounded-lg flex items-center justify-center shrink-0`}
                                                >
                                                    {notification.icon === "bell" ? (
                                                        <Bell className="w-6 h-6 text-blue-600" />
                                                    ) : (
                                                        <CreditCard className="w-6 h-6 text-green-600" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-title text-xs sm:text-sm md:text-base mb-1">
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-xs sm:text-sm text-description mb-1">
                                                        {notification.description}
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-gray-400">{notification.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Wishlist Icon */}
                        <Link href="/wishlist" className="p-2 hover:bg-gray-100 rounded-lg">
                            <Heart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                        </Link>

                        {/* Cart Icon */}
                        <div className="static sm:relative" ref={cartRef}>
                            <button
                                onClick={() => setShowCart(!showCart)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ShoppingCart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                            </button>

                            {/* Cart Popup */}
                            {showCart && (
                                <div className="absolute left-0 right-0 mx-4 sm:left-auto sm:mx-0 sm:right-0 top-full mt-2 sm:w-96 md:w-115 bg-white border border-gray-200 rounded-lg shadow-xl p-4 sm:p-6 z-50">
                                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-header mb-6">{t("cart")}</h3>

                                    {/* Cart Item */}
                                    <div className="flex gap-4 pb-6 border-b border-gray-200">
                                        <div className="w-32 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                                            <Image
                                                src="/home/banner.jpg"
                                                alt="Course"
                                                width={128}
                                                height={96}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-start gap-2 mb-2">
                                                <Star className="w-4 h-4 text-orange-500 fill-orange-500 mt-0.5" />
                                                <span className="text-xs sm:text-sm font-semibold">
                                                    4.6{" "}
                                                    <span className="text-gray-400 font-normal">
                                                        (451,444 Review)
                                                    </span>
                                                </span>
                                            </div>
                                            <h4 className="text-xs sm:text-sm md:text-base font-semibold text-title mb-2">
                                                The Ultimate Drawing Course - Beginner to Advanced
                                            </h4>
                                            <p className="text-base sm:text-lg md:text-xl font-bold text-title">$37.00</p>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="mt-6 mb-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-base sm:text-lg md:text-xl font-bold text-header">
                                                {t("total")}:
                                            </span>
                                            <span className="text-base sm:text-lg md:text-xl font-bold text-header">
                                                $37.00
                                            </span>
                                        </div>
                                        <Link href="/checkout" className="block w-full py-3 bg-main text-white rounded-lg text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors text-center">
                                            {t("goToCheckout")}
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Auth Section */}
                        {isLoggedIn ? (
                            <div className="relative" ref={profileRef}>
                                <button
                                    onClick={() => setShowProfile(!showProfile)}
                                    className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-main transition-colors"
                                >
                                    <Image
                                        src={user}
                                        alt="User"
                                        width={40}
                                        height={40}
                                        className="w-full h-full object-cover"
                                    />
                                </button>

                                {/* Profile Popup */}
                                {showProfile && (
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                                    <Image
                                                        src={user}
                                                        alt="User"
                                                        width={40}
                                                        height={40}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-xs sm:text-sm md:text-base text-title">
                                                        alexmarcel@gmail.com
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-description">
                                                        Student Account
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                                                onClick={() => setShowProfile(false)}
                                            >
                                                <User className="w-5 h-5" />
                                                <span className="font-medium text-xs sm:text-sm md:text-base">{t("myProfile")}</span>
                                            </Link>

                                            <Link
                                                href="/enrolled-courses"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                                                onClick={() => setShowProfile(false)}
                                            >
                                                <Grid3x3 className="w-5 h-5" />
                                                <span className="font-medium text-xs sm:text-sm md:text-base">{t("courses")}</span>
                                            </Link>

                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                                                onClick={() => setShowProfile(false)}
                                            >
                                                <LayoutDashboard className="w-5 h-5" />
                                                <span className="font-medium text-xs sm:text-sm md:text-base">{t("goToDashboard")}</span>
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-200 pt-2">
                                            <button onClick={() => setShowLogout(true)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600 w-full">
                                                <LogOut className="w-5 h-5" />
                                                <span className="font-medium text-xs sm:text-sm md:text-base">{t("logOut")}</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2 md:gap-3">
                                <Link
                                    href="/auth/sign-in"
                                    className="px-3 md:px-6 py-2 md:py-3 text-main font-semibold hover:bg-gray-100  transition-colors text-sm md:text-base bg-main-light"
                                >
                                    {t("logIn")}
                                </Link>
                                <Link
                                    href="/auth/sign-up"
                                    className="px-3 md:px-6 py-2 md:py-3 bg-main text-white font-semibold  hover:bg-main/90 transition-colors text-sm md:text-base"
                                >
                                    {t("signUp")}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="lg:hidden px-2 mt-3 flex items-center gap-2">
                    {/* Browse Dropdown for Mobile */}
                    <div className="relative" ref={mobileBrowseRef}>
                        <button
                            onClick={() => setShowBrowse(!showBrowse)}
                            className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                        >
                            {t("browse")}
                            <ChevronDown
                                className={`w-4 h-4 transition-transform ${showBrowse ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {/* Browse Category Popup for Mobile */}
                        {showBrowse && (
                            <div className="absolute left-0 top-full mt-2 w-[85vw] sm:w-96 bg-white border border-gray-200 rounded-lg shadow-xl p-5 z-50 max-h-[70vh] overflow-y-auto">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold text-header mb-4">
                                    {t("browseCategory")}
                                </h3>

                                <div className="space-y-3">
                                    {categories.map((category: TCategory, index) => (
                                        <div
                                            key={index}
                                            className="pb-3 border-b border-gray-100"
                                        >
                                            <h4 className="font-semibold text-title text-xs sm:text-sm md:text-base mb-1">
                                                {category.name}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-description">
                                                {category.count}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <button className="w-full mt-4 py-3 bg-main text-white rounded-lg text-xs sm:text-sm md:text-base font-semibold hover:bg-main/90 transition-colors">
                                    {t("browseAllCategories")}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Search Input for Mobile */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t("searchPlaceholder")}
                            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-main"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
                <div className="md:hidden border-t border-gray-200 bg-white">
                    <div className="container mx-auto px-4 py-4">
                        <nav className="space-y-2">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`block px-4 py-2 text-xs sm:text-sm hover:bg-gray-100 rounded-lg ${isActive
                                            ? "bg-main/10 text-main font-semibold border-l-4 border-main"
                                            : "text-gray-700"
                                            }`}
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}

                            {/* Language Selector in Mobile Menu */}
                            <div className="border-t border-gray-200 pt-4 mt-4">
                                <LanguageSwitcher variant="mobile" />
                            </div>

                            {/* Auth Buttons in Mobile Menu */}
                            {!isLoggedIn && (
                                <div className="sm:hidden border-t border-gray-200 pt-4 mt-4 flex gap-3">
                                    <Link
                                        href="/auth/sign-in"
                                        className="flex-1 text-center px-4 py-2.5 text-main font-semibold bg-main-light rounded-lg text-xs sm:text-sm"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        {t("logIn")}
                                    </Link>
                                    <Link
                                        href="/auth/sign-up"
                                        className="flex-1 text-center px-4 py-2.5 bg-main text-white font-semibold rounded-lg text-xs sm:text-sm"
                                        onClick={() => setShowMobileMenu(false)}
                                    >
                                        {t("signUp")}
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            )}
            <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
        </div>
    );
};

export default Navbar;
