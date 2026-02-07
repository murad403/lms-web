"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import {
    Bell,
    Heart,
    ShoppingCart,
    Search,
    ChevronDown,
    User,
    LayoutDashboard,
    LogOut,
    Menu as MenuIcon,
    X,
    Star,
    CreditCard,
    Grid3x3,
    Check,
    Globe,
} from "lucide-react";
import { menuItems, notifications, TMenuItem, TNotification } from "@/lib/header";
import { usePathname } from "next/navigation";
import { PiGraduationCap } from "react-icons/pi";

const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [showBrowse, setShowBrowse] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showMobileLanguage, setShowMobileLanguage] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [language, setLanguage] = useState("English");

    const notificationRef = useRef<HTMLDivElement>(null);
    const cartRef = useRef<HTMLDivElement>(null);
    const browseRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    const languages = ["English", "Italiano", "Español", "Deutsch", "Francais"];

    // Change this to true if user is logged in
    const isLoggedIn = false;

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
                browseRef.current &&
                !browseRef.current.contains(event.target as Node)
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



    const categories = [
        { name: "HEALTHCARE & MEDICAL CERTIFICATIONS", count: "20,126 Courses" },
        { name: "SCHOOL & ACADEMIC CERTIFICATIONS", count: "20,126 Courses" },
        { name: "CFU – University Educational Credits", count: "20,126 Courses" },
        { name: "MIUR-Recognized Language Certifications", count: "20,126 Courses" },
        {
            name: "Certifications for Teachers & Educators",
            count: "20,126 Courses",
        },
    ];

    return (
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
            <div className="container mx-auto px-4 py-3 md:py-4">
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

                        <span className="text-lg md:text-2xl font-bold text-main hidden sm:block">
                            From-Cert
                        </span>
                    </Link>

                    {/* Desktop Search Section */}
                    <div className="hidden lg:flex items-center gap-2 flex-1 max-w-2xl">
                        {/* Browse Dropdown */}
                        <div className="relative" ref={browseRef}>
                            <button
                                onClick={() => setShowBrowse(!showBrowse)}
                                className="flex items-center gap-8 px-6 py-3 border border-gray-300 rounded-lg text-[15px] text-gray-700 hover:bg-gray-50 whitespace-nowrap"
                            >
                                Browse
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${showBrowse ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Browse Category Popup */}
                            {showBrowse && (
                                <div className="absolute left-0 top-full mt-2 w-115 bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50">
                                    <h3 className="text-xl font-bold text-header mb-6">
                                        Browse Category
                                    </h3>

                                    <div className="space-y-4">
                                        {categories.map((category, index) => (
                                            <div
                                                key={index}
                                                className="pb-4 border-b border-gray-100"
                                            >
                                                <h4 className="font-semibold text-title text-sm mb-1">
                                                    {category.name}
                                                </h4>
                                                <p className="text-sm text-description">
                                                    {category.count}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <button className="w-full mt-6 py-3 bg-main text-white rounded-lg font-semibold hover:bg-main/90 transition-colors">
                                        Browse All Categories
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Search Input */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="What do you want learn..."
                                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:border-main"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Mobile Search Button */}
                    <button className="lg:hidden py-3 hover:bg-gray-100 rounded-lg">
                        <Search className="w-5 h-5 text-gray-700" />
                    </button>

                    {/* Right Section - Icons and Auth */}
                    <div className="flex items-center gap-2 md:gap-3">
                        {/* Notification Icon */}
                        <div className="relative hidden md:block" ref={notificationRef}>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 hover:bg-gray-100 rounded-lg relative"
                            >
                                <Bell className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                            </button>

                            {/* Notification Popup */}
                            {showNotifications && (
                                <div className="absolute right-0 top-full mt-2 w-112.5 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-[90vh] overflow-hidden">
                                    {/* Header */}
                                    <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-xl font-bold text-header">
                                            Recent Notifications
                                        </h3>
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                All
                                            </button>
                                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                Unread
                                            </button>
                                            <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                                                Read
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
                                                    <h4 className="font-semibold text-title text-sm mb-1">
                                                        {notification.title}
                                                    </h4>
                                                    <p className="text-sm text-description mb-1">
                                                        {notification.description}
                                                    </p>
                                                    <p className="text-xs text-gray-400">{notification.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Wishlist Icon */}
                        <button className="p-2 hover:bg-gray-100 rounded-lg hidden md:block">
                            <Heart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                        </button>

                        {/* Cart Icon */}
                        <div className="relative" ref={cartRef}>
                            <button
                                onClick={() => setShowCart(!showCart)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ShoppingCart className="w-5 md:w-6 h-5 md:h-6 text-gray-700" />
                            </button>

                            {/* Cart Popup */}
                            {showCart && (
                                <div className="absolute right-0 top-full mt-2 w-[90vw] md:w-115 bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50">
                                    <h3 className="text-2xl font-bold text-header mb-6">Cart</h3>

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
                                                <span className="text-sm font-semibold">
                                                    4.6{" "}
                                                    <span className="text-gray-400 font-normal">
                                                        (451,444 Review)
                                                    </span>
                                                </span>
                                            </div>
                                            <h4 className="text-sm font-semibold text-title mb-2">
                                                The Ultimate Drawing Course - Beginner to Advanced
                                            </h4>
                                            <p className="text-lg font-bold text-title">$37.00</p>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="mt-6 mb-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-lg font-bold text-header">
                                                Total:
                                            </span>
                                            <span className="text-lg font-bold text-header">
                                                $37.00
                                            </span>
                                        </div>
                                        <button className="w-full py-3 bg-main text-white rounded-lg font-semibold hover:bg-main/90 transition-colors">
                                            Go To Cart
                                        </button>
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
                                        src="/home/banner.jpg"
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
                                                        src="/home/banner.jpg"
                                                        alt="User"
                                                        width={40}
                                                        height={40}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-title">
                                                        alexmarcel@gmail.com
                                                    </p>
                                                    <p className="text-xs text-description">
                                                        Student Account
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="py-2">
                                            <Link
                                                href="/profile"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                                            >
                                                <User className="w-5 h-5" />
                                                <span className="font-medium">My Profile</span>
                                            </Link>

                                            <Link
                                                href="/courses"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                                            >
                                                <Grid3x3 className="w-5 h-5" />
                                                <span className="font-medium">Courses</span>
                                            </Link>

                                            <Link
                                                href="/dashboard"
                                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                                            >
                                                <LayoutDashboard className="w-5 h-5" />
                                                <span className="font-medium">Go to Dashboard</span>
                                            </Link>
                                        </div>

                                        <div className="border-t border-gray-200 pt-2">
                                            <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600 w-full">
                                                <LogOut className="w-5 h-5" />
                                                <span className="font-medium">Log out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 md:gap-3">
                                <Link
                                    href="/login"
                                    className="px-3 md:px-6 py-2 md:py-2.5 text-main font-semibold hover:bg-gray-100 rounded-lg transition-colors text-sm md:text-base"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-3 md:px-6 py-2 md:py-2.5 bg-main text-white font-semibold rounded-lg hover:bg-main/90 transition-colors text-sm md:text-base"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <div className="lg:hidden mt-3">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="What do you want learn..."
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
                            {menuItems.map((item: TMenuItem) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={`block px-4 py-2 text-sm hover:bg-gray-100 rounded-lg ${isActive
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
                                <button
                                    onClick={() => setShowMobileLanguage(!showMobileLanguage)}
                                    className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
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

                                {showMobileLanguage && (
                                    <div className="mt-2 ml-4 space-y-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang}
                                                onClick={() => {
                                                    setLanguage(lang);
                                                    setShowMobileLanguage(false);
                                                }}
                                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                            >
                                                {lang}
                                                {language === lang && (
                                                    <Check className="w-4 h-4 text-main" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
