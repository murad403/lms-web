"use client";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const Menu = () => {
  const t = useTranslations("Menu");
  const pathname = usePathname();

  const menuItems = [
    { label: t("home"), href: "/" as const },
    { label: t("courses"), href: "/courses" as const },
    { label: t("certifications"), href: "/certifications" as const },
    { label: t("forTrainers"), href: "/for-trainers" as const },
    { label: t("forSchool"), href: "/for-school" as const },
    { label: t("partnerships"), href: "/partnerships" as const },
  ];

  return (
    <div className="bg-main text-white hidden md:block">
      <div className="container mx-auto flex justify-between items-center px-2 sm:px-4 md:px-4 lg:px-6 xl:px-0">
        {/* Menu Items */}
        <div className="flex items-center gap-3 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[13px] sm:text-sm md:text-[15px] hover:text-gray-200 transition-colors whitespace-nowrap border-t-[3px] py-4 ${isActive
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
        <LanguageSwitcher variant="desktop" />
      </div>
    </div>
  );
};

export default Menu;
