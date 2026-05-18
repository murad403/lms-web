"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, UserCircle } from "lucide-react";

import { Link } from "@/i18n/navigation";
import LogoutModal from "./LogoutModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type RoleProfileDropdownProps = {
  name: string;
  roleLabel: string;
  avatarSrc?: string | StaticImageData | null;
  avatarAlt: string;
  profileHref: string;
  dashboardHref: string;
  profileLabel: string;
  dashboardLabel: string;
  logoutLabel: string;
  triggerClassName?: string;
  contentClassName?: string;
  align?: "start" | "center" | "end";
  triggerId?: string;
};

const RoleProfileDropdown = ({
  name,
  roleLabel,
  avatarSrc,
  avatarAlt,
  profileHref,
  dashboardHref,
  profileLabel,
  dashboardLabel,
  logoutLabel,
  triggerClassName = "flex items-center gap-2 hover:opacity-80 transition-opacity outline-none",
  contentClassName = "w-72 p-0 rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
  align = "end",
  triggerId,
}: RoleProfileDropdownProps) => {
  const [showLogout, setShowLogout] = useState(false);
  const stableTriggerId =
    triggerId ||
    `role-profile-trigger-${dashboardHref.replace(/[^a-zA-Z0-9_-]/g, "-")}`;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild id={stableTriggerId}>
          <button className={triggerClassName}>
            <div className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden bg-blue-600 text-white text-sm font-bold shrink-0">
              {avatarSrc ? (
                <Image src={avatarSrc} alt={avatarAlt} width={36} height={36} className="w-full h-full object-cover" />
              ) : (
                <span className="uppercase">{name ? name.charAt(0) : "O"}</span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-800 hidden sm:inline truncate max-w-28">
              {name}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500 hidden sm:block" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align={align} className={contentClassName}>
          <div className="px-4 py-4">
            <p className="text-base font-bold text-gray-900 truncate">{name}</p>
            <p className="text-sm text-gray-400 truncate">{roleLabel}</p>
          </div>

          <DropdownMenuSeparator className="my-0 bg-gray-100" />

          <Link href={profileHref} className="flex items-center gap-3 w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
            <UserCircle className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-semibold text-gray-800">{profileLabel}</span>
          </Link>

          <Link href={dashboardHref} className="flex items-center gap-3 w-full px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
            <LayoutDashboard className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-semibold text-gray-800">{dashboardLabel}</span>
          </Link>

          <DropdownMenuSeparator className="my-0 bg-gray-100" />

          <button
            type="button"
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 w-full px-4 py-3.5 text-left hover:bg-red-50 transition-colors group"
          >
            <LogOut className="w-5 h-5 text-red-500" />
            <span className="text-sm font-semibold text-red-500">{logoutLabel}</span>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>

      <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
};

export default RoleProfileDropdown;