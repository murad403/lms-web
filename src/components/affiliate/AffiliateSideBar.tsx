/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  Link as LinkIcon,
  History,
  Wallet,
  CreditCard,
  Settings,
  GraduationCap,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageHeader } from "@/redux/slice/pageHeaderSlice";
import { LogoutDialog } from "../shared/LogoutDialog";

export function AffiliateSideBar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale;
  const dispatch = useDispatch();

  const routes = [
    {
      title: "Dashboard",
      href: `/${locale}/affiliate/overview`,
      icon: LayoutDashboard,
      info: "Overview of your affiliate stats and earnings",
    },
    {
      title: "Course Lists",
      href: `/${locale}/affiliate/courses`,
      icon: BookOpen,
      info: "View all courses you are promoting",
    },
    {
      title: "My Referral Link",
      href: `/${locale}/affiliate/my-refarrel`,
      icon: LinkIcon,
      info: "Share your referral link and earn commissions",
    },
    {
      title: "Sales History",
      href: `/${locale}/affiliate/sales-history`,
      icon: History,
      info: "Track all your affiliate sales",
    },
    {
      title: "Commission Wallet",
      href: `/${locale}/affiliate/commission`,
      icon: Wallet,
      info: "View your total commissions and payouts",
    },
    {
      title: "Payment Status",
      href: `/${locale}/affiliate/payment-status`,
      icon: CreditCard,
      info: "Check your payment history and status",
    },
    {
      title: "Account Settings",
      href: `/${locale}/affiliate/account-setting`,
      icon: Settings,
      info: "Update your account and profile settings",
    },
  ];

  // Update page header when route changes
  useEffect(() => {
    const activeRoute = routes.find((route) => route.href === pathname);
    if (activeRoute) {
      dispatch(
        setPageHeader({
          title: activeRoute.title,
          info: activeRoute.info,
        }),
      );
    }
  }, [pathname, dispatch]);

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="bg-background-base py-4 ">
        <div className="flex items-center gap-4 justify-center">
          <div className="rounded-lg bg-[#042F54] p-2">
            <GraduationCap className="w-8 h-8 text-nav-text-active" />
          </div>
          <span className="text-[28px] font-bold text-nav-text-active">
            Form-Cert
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 bg-background-base ">
        <div className="flex flex-col gap-2">
          {routes.map((route) => {
            const Icon = route.icon;
            const isActive = pathname === route.href;

            return (
              <Link
                key={route.href}
                href={route.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium transition-all
                  ${
                    isActive
                      ? "bg-background-active text-nav-text-active shadow-md"
                      : "text-nav-text hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                {route.title}
              </Link>
            );
          })}
          <LogoutDialog></LogoutDialog>
        </div>
      </SidebarContent>

      <SidebarFooter className="bg-[#1E293B]" />
    </Sidebar>
  );
}
