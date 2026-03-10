"use client";

import { UserCircle, Settings, LogOut, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function UserProfileDropdown() {
  const t = useTranslations("UserProfile");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 hover:opacity-80 transition-opacity outline-none">
          {/* Avatar */}
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-600 text-white text-sm font-bold">
            JD
          </div>
          <span className="text-sm font-medium text-gray-800">John Doe</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[220px] p-0 rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      >
        {/* User Info */}
        <div className="px-4 py-4">
          <p className="text-base font-bold text-gray-900">{t("affiliateUser")}</p>
          <p className="text-sm text-gray-400">{t("affiliateAccount")}</p>
        </div>

        <DropdownMenuSeparator className="my-0 bg-gray-100" />

        {/* Profile */}
        <button className="flex items-center gap-3 w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
          <UserCircle className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-800">{t("profile")}</span>
        </button>

        {/* Settings */}
        <button className="flex items-center gap-3 w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
          <Settings className="w-5 h-5 text-gray-700" />
          <span className="text-sm font-semibold text-gray-800">{t("settings")}</span>
        </button>

        <DropdownMenuSeparator className="my-0 bg-gray-100" />

        {/* Log out */}
        <button className="flex items-center gap-3 w-full px-4 py-3.5 text-left hover:bg-red-50 transition-colors group">
          <LogOut className="w-5 h-5 text-red-500" />
          <span className="text-sm font-semibold text-red-500">{t("logOut")}</span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
