/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useParams, usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { LayoutDashboard, BookOpen, Link as LinkIcon, History, Wallet, CreditCard, Settings, GraduationCap, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPageHeader } from "@/redux/slice/pageHeaderSlice";
import LogoutModal from "../shared/LogoutModal";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function AffiliateSideBar() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale;
  const dispatch = useDispatch();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const t = useTranslations("AffiliateSidebar");

  const routes = [
    {
      titleKey: "dashboard",
      infoKey: "dashboardInfo",
      href: `/${locale}/affiliate/overview`,
      icon: LayoutDashboard,
    },
    {
      titleKey: "courseLists",
      infoKey: "courseListsInfo",
      href: `/${locale}/affiliate/courses`,
      icon: BookOpen,
    },
    {
      titleKey: "salesHistory",
      infoKey: "salesHistoryInfo",
      href: `/${locale}/affiliate/sales-history`,
      icon: History,
    },
    {
      titleKey: "commissionWallet",
      infoKey: "commissionWalletInfo",
      href: `/${locale}/affiliate/commission`,
      icon: Wallet,
    },
    {
      titleKey: "withdrawal",
      infoKey: "withdrawalInfo",
      href: `/${locale}/affiliate/withdrawal`,
      icon: CreditCard,
    },
    {
      titleKey: "accountSettings",
      infoKey: "accountSettingsInfo",
      href: `/${locale}/affiliate/account-setting`,
      icon: Settings,
    },
  ];

  // Update page header when route changes
  useEffect(() => {
    const activeRoute = routes.find((route) => route.href === pathname);
    if (activeRoute) {
      dispatch(
        setPageHeader({
          title: t(activeRoute.titleKey),
          info: t(activeRoute.infoKey),
        }),
      );
    }
  }, [pathname, dispatch, t]);

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="bg-background-base py-4">
        <Link href={"/"} className="flex items-center gap-4 justify-center">
          <div className="rounded-lg bg-navy-blue p-2">
            <GraduationCap className="w-8 h-8 text-nav-text-active" />
          </div>
          <span className="text-[28px] font-bold text-nav-text-active">
            Form-Cert
          </span>
        </Link>
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
                className={`flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-medium transition-all
                  ${isActive
                    ? "bg-background-active text-nav-text-active shadow-md"
                    : "text-nav-text hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon size={18} />
                {t(route.titleKey)}
              </Link>
            );
          })}
          <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
          <button
            onClick={() => setLogoutOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-md text-[14px] font-medium transition-all text-nav-text hover:bg-white/5 hover:text-white w-full"
          >
            <LogOut size={18} />
            {t("logout")}
          </button>
        </div>
      </SidebarContent>

      <SidebarFooter className="bg-[#1E293B]" />
    </Sidebar>
  );
}
