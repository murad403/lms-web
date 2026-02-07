"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showBrowse, setShowBrowse] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const notificationRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const browseRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

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

  const notifications = [
    {
      id: 1,
      icon: "bell",
      iconBg: "bg-blue-100",
      title: "New Class lesson updated",
      description: "Check out the new lesson on conditional formatting",
      time: "5 minutes ago",
    },
    {
      id: 2,
      icon: "bell",
      iconBg: "bg-blue-100",
      title: "New Class lesson updated",
      description: "Check out the new lesson on conditional formatting",
      time: "5 minutes ago",
    },
    {
      id: 3,
      icon: "bell",
      iconBg: "bg-blue-100",
      title: "New Class lesson updated",
      description: "Check out the new lesson on conditional formatting",
      time: "5 minutes ago",
    },
    {
      id: 4,
      icon: "bell",
      iconBg: "bg-blue-100",
      title: "New Class lesson updated",
      description: "Check out the new lesson on conditional formatting",
      time: "5 minutes ago",
    },
    {
      id: 5,
      icon: "bell",
      iconBg: "bg-blue-100",
      title: "New Class lesson updated",
      description: "Check out the new lesson on conditional formatting",
      time: "5 minutes ago",
    },
    {
      id: 6,
      icon: "credit",
      iconBg: "bg-green-100",
      title: "New course purchased $169.69",
      description: "Check out the new health care course you just purchased",
      time: "5 minutes ago",
    },
  ];

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
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#1e3a8a]">From-Cert</span>
        </Link>

        {/* Search Section */}
        <div className="flex items-center gap-2 flex-1 max-w-2xl">
          {/* Browse Dropdown */}
          <div className="relative" ref={browseRef}>
            <button
              onClick={() => setShowBrowse(!showBrowse)}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
            >
              Browse
              <svg
                className={`w-4 h-4 transition-transform ${
                  showBrowse ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Browse Category Popup */}
            {showBrowse && (
              <div className="absolute left-0 top-full mt-2 w-115 bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50">
                <h3 className="text-xl font-bold text-header mb-6">
                  Browse Category
                </h3>

                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <div key={index} className="pb-4 border-b border-gray-100">
                      <h4 className="font-semibold text-title text-sm mb-1">
                        {category.name}
                      </h4>
                      <p className="text-sm text-description">{category.count}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-6 py-3 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e3a8a]/90 transition-colors">
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
              className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#1e3a8a]"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Right Section - Icons and Auth */}
        <div className="flex items-center gap-4">
          {/* Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg relative"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            {/* Notification Popup */}
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-112.5 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
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
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 border-b border-gray-100 flex gap-4"
                    >
                      <div
                        className={`w-12 h-12 ${notif.iconBg} rounded-lg flex items-center justify-center shrink-0`}
                      >
                        {notif.icon === "bell" ? (
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-title text-sm mb-1">
                          {notif.title}
                        </h4>
                        <p className="text-sm text-description mb-1">
                          {notif.description}
                        </p>
                        <p className="text-xs text-gray-400">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Cart Icon */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setShowCart(!showCart)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>

            {/* Cart Popup */}
            {showCart && (
              <div className="absolute right-0 top-full mt-2 w-115 bg-white border border-gray-200 rounded-lg shadow-xl p-6 z-50">
                <h3 className="text-2xl font-bold text-header mb-6">
                  Cart
                </h3>

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
                      <svg
                        className="w-4 h-4 text-orange-500 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
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
                  <button className="w-full py-3 bg-[#1e3a8a] text-white rounded-lg font-semibold hover:bg-[#1e3a8a]/90 transition-colors">
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
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-[#1e3a8a] transition-colors"
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
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <Link
                      href="/courses"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                        />
                      </svg>
                      <span className="font-medium">Courses</span>
                    </Link>

                    <Link
                      href="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-title"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                      <span className="font-medium">Go to Dashboard</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 pt-2">
                    <button className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-red-600 w-full">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="font-medium">Log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="px-6 py-2.5 text-[#1e3a8a] font-semibold hover:bg-gray-100 rounded-lg transition-colors"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-[#1e3a8a] text-white font-semibold rounded-lg hover:bg-[#1e3a8a]/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
