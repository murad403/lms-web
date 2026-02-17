"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { LayoutDashboard, BookOpen, Video, DollarSign, MessageSquare, Award, Bot, Settings, LogOut, PlusCircle} from "lucide-react";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import { PiGraduationCap } from "react-icons/pi";

type SidebarItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const mainMenuItems: SidebarItem[] = [
  { label: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
  { label: "Create New Course", href: "/instructor/create-course", icon: PlusCircle },
  { label: "My Courses", href: "/instructor/my-courses", icon: BookOpen },
  { label: "LIVE Classes", href: "/instructor/live-classes", icon: Video },
  { label: "Earning", href: "/instructor/earnings", icon: DollarSign },
  { label: "Message", href: "/instructor/messages", icon: MessageSquare },
  { label: "Accreditation", href: "/instructor/accreditation", icon: Award },
  { label: "AI Assistant", href: "/instructor/ai-assistant", icon: Bot },
  { label: "Settings", href: "/instructor/settings", icon: Settings },
];

const InstructorSidebar = () => {
  const pathname = usePathname();
  const [showLogout, setShowLogout] = useState(false);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <div>
      <aside className="hidden lg:flex flex-col w-80 bg-title min-h-screen fixed left-0 top-0 z-50">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <PiGraduationCap className="size-7 text-white" />
            <span className="text-lg font-bold text-white">From-Cert</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
          {mainMenuItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 py-3 px-6 text-sm transition-colors ${
                  active
                    ? "bg-[#4F9BEF] text-white font-semibold"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
                {item.label === "Message" && (
                  <span className="ml-auto w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                    3
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="px-3 py-4 border-t border-white/10">
          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5 shrink-0" />
            <span>Sign-out</span>
          </button>
        </div>
      </aside>

      <LogoutModal open={showLogout} onClose={() => setShowLogout(false)} />
    </div>
  );
};

export default InstructorSidebar;
