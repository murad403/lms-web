"use client";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { locales, localeNames, Locale } from "@/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Globe } from "lucide-react";

type LanguageSwitcherProps = {
  variant?: "desktop" | "mobile" | "footer";
};

const LanguageSwitcher = ({ variant = "desktop" }: LanguageSwitcherProps) => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

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

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setShowLanguages(false);
  };

  if (variant === "mobile") {
    return (
      <div>
        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>Language: {localeNames[locale]}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showLanguages ? "rotate-180" : ""
              }`}
          />
        </button>

        {showLanguages && (
          <div className="mt-2 ml-4 space-y-1">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleLocaleChange(l)}
                className="w-full flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                {localeNames[l]}
                {locale === l && <Check className="w-4 h-4 text-main" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className="relative border-t border-gray-200 pt-4 mt-4" ref={languageRef}>
        {showLanguages && (
          <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleLocaleChange(l)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {localeNames[l]}
                {locale === l && <Check className="w-4 h-4 text-main" />}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowLanguages(!showLanguages)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>Language: {localeNames[locale]}</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showLanguages ? "rotate-180" : ""
              }`}
          />
        </button>
      </div>
    );
  }

  // Desktop variant (used in Menu bar)
  return (
    <div className="relative ml-2 sm:ml-4" ref={languageRef}>
      <button
        onClick={() => setShowLanguages(!showLanguages)}
        className="flex items-center gap-1 sm:gap-2 text-[15px] hover:text-gray-200 transition-colors whitespace-nowrap"
      >
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
        <ChevronDown
          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${showLanguages ? "rotate-180" : ""
            }`}
        />
      </button>

      {showLanguages && (
        <div className="absolute right-0 top-full mt-2 w-36 sm:w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => handleLocaleChange(l)}
              className="w-full px-3 sm:px-4 py-2 text-left text-main hover:bg-gray-50 flex items-center justify-between text-sm"
            >
              {localeNames[l]}
              {locale === l && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
