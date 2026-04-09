import { AffiliateSideBar } from "@/components/affiliate/AffiliateSideBar";
import { NotificationsDropdown } from "@/components/shared/NotificationDialog";

import { PageHeader } from "@/components/shared/PageHeader";
import RoleProfileDropdown from "@/components/shared/RoleProfileDropdown";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getDashboardPathByRole, getProfilePathByRole } from "@/utils/auth-shared";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "18rem",
          "--sidebar-width-mobile": "18rem",
        } as React.CSSProperties
      }
    >
      <AffiliateSideBar />
      <main className="w-full">
        <div className="border-b p-2 flex items-center justify-between">
          <div className="flex gap-2">
            <SidebarTrigger />
            <PageHeader></PageHeader>
          </div>
          <div className="flex items-center gap-4">
            <NotificationsDropdown />
            <RoleProfileDropdown
              name="Affiliate User"
              roleLabel="Affiliate account"
              avatarSrc="/home/banner.jpg"
              avatarAlt="Affiliate User"
              profileHref={getProfilePathByRole("affiliate")}
              dashboardHref={getDashboardPathByRole("affiliate")}
              profileLabel="My Profile"
              dashboardLabel="Go to Dashboard"
              logoutLabel="Log Out"
            />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
