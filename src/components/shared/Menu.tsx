"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";

const Menu = () => {
  const [language, setLanguage] = useState("English");
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const languages = ["English", "Italiano", "Español", "Deutsch", "Francais"];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setShowLanguages(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Certifications", href: "/certifications" },
    { label: "For Trainers", href: "/for-trainers" },
    { label: "For School", href: "/for-school" },
    { label: "Partnerships", href: "/partnerships" },
  ];

  return (
    <div className="bg-[#1e3a8a] text-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Menu Items */}
        <div className="flex items-center gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm hover:text-gray-200 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Language Selector */}
        <div className="relative" ref={languageRef}>
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="flex items-center gap-2 text-sm hover:text-gray-200 transition-colors"
          >
            {language}
            <svg
              className={`w-4 h-4 transition-transform ${
                showLanguages ? "rotate-180" : ""
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

          {/* Language Dropdown */}
          {showLanguages && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguages(false);
                  }}
                  className="w-full px-4 py-2 text-left text-[#1e3a8a] hover:bg-gray-50 flex items-center justify-between"
                >
                  {lang}
                  {language === lang && (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
