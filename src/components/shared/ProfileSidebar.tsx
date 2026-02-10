"use client";
import { Link, usePathname } from "@/i18n/navigation";
import {
  LayoutDashboard,
  User,
  BookOpen,
  TrendingUp,
  Video,
  Bot,
  Award,
  Heart,
  Star,
  HelpCircle,
  History,
  MessageSquare,
  Settings,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import LogoutModal from "@/components/shared/LogoutModal";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  color?: string;
};

const mainMenuItems: SidebarItem[] = [
  { label: "My Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Profile", href: "/profile", icon: User },
  { label: "Enrolled Courses", href: "/enrolled-courses", icon: BookOpen },
  { label: "Learning Progress", href: "/learning-progress", icon: TrendingUp },
  { label: "Live Classes", href: "/live-classes", icon: Video },
  { label: "AI Tutor", href: "/ai-tutor", icon: Bot },
  { label: "My Certificates", href: "/my-certificates", icon: Award },
  { label: "Wishlist", href: "/wishlist", icon: Heart, color: "text-blue-600" },
  { label: "Reviews", href: "/reviews", icon: Star },
  { label: "My Quiz Attempts", href: "/quiz-attempts", icon: HelpCircle },
  { label: "Purchase History", href: "/purchase-history", icon: History },
  { label: "Messages", href: "/messages", icon: MessageSquare },
];

const accountSettingsItems: SidebarItem[] = [
  { label: "Settings", href: "/settings", icon: Settings },
];

const ProfileSidebar = () => {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  const renderItem = (item: SidebarItem) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          active
            ? "bg-sidebar-hover text-main font-semibold"
            : "text-description hover:bg-gray-50 hover:text-title"
        }`}
      >
        <Icon className={`w-4 h-4 shrink-0 ${active ? "text-main" : item.color || "text-description"}`} />
        <span className="truncate">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      <aside className="w-full lg:w-60 xl:w-64 shrink-0">
        <div className="bg-white rounded-xl border border-border-light p-4 sticky top-20">
          {/* Main Menu */}
          <div className="mb-4">
            <h3 className="text-xs font-bold text-title uppercase tracking-wider mb-2 px-3">
              Main Menu
            </h3>
            <nav className="space-y-0.5">
              {mainMenuItems.map(renderItem)}
            </nav>
          </div>

          {/* Account Settings */}
          <div className="border-t border-border-light pt-4">
            <h3 className="text-xs font-bold text-title uppercase tracking-wider mb-2 px-3">
              Account Settings
            </h3>
            <nav className="space-y-0.5">
              {accountSettingsItems.map(renderItem)}
              <button
                onClick={() => setShowLogout(true)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-description hover:bg-gray-50 hover:text-title transition-colors w-full"
              >
                <LogOut className="w-4 h-4 shrink-0 text-description" />
                <span className="truncate">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>

      <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
};

export default ProfileSidebar;
