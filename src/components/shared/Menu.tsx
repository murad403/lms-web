"use client";
import { menuItems, TMenuItem } from "@/lib/header";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
import { usePathname } from "next/navigation";

const Menu = () => {
  const [language, setLanguage] = useState("English");
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  

  return (
    <div className="bg-main text-white hidden md:block">
      <div className="container mx-auto flex justify-between items-center px-3 sm:px-4 md:px-6 lg:px-0">
        {/* Menu Items */}
        <div className="flex items-center gap-3 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide">
          {menuItems.map((item: TMenuItem) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-[13px] sm:text-sm md:text-[15px] hover:text-gray-200 transition-colors whitespace-nowrap border-t-[3px] py-4 ${
                  isActive
                    ? "border-white font-semibold"
                    : "border-transparent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Language Selector */}
        <div className="relative ml-2 sm:ml-4" ref={languageRef}>
          <button
            onClick={() => setShowLanguages(!showLanguages)}
            className="flex items-center gap-1 sm:gap-2 text-[15px] hover:text-gray-200 transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">{language}</span>
            <span className="sm:hidden">EN</span>
            <ChevronDown
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
                showLanguages ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Language Dropdown */}
          {showLanguages && (
            <div className="absolute right-0 top-full mt-2 w-36 sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguages(false);
                  }}
                  className="w-full px-3 sm:px-4 py-2 text-left text-main hover:bg-gray-50 flex items-center justify-between text-sm"
                >
                  {lang}
                  {language === lang && <Check className="w-4 h-4" />}
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
