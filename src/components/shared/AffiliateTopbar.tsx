"use client";

import { NotificationsDropdown } from "@/components/shared/NotificationDialog";
import { PageHeader } from "@/components/shared/PageHeader";
import RoleProfileDropdown from "@/components/shared/RoleProfileDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useGetProfileQuery } from "@/redux/features/affiliate/affiliate.api";
import { getDashboardPathByRole, getProfilePathByRole } from "@/utils/auth-shared";
import { resolveImageUrl } from "@/utils/image";

export default function AffiliateTopbar() {
  const { data: profileResponse, isLoading } = useGetProfileQuery();

  return (
    <div className="border-b p-2 flex items-center justify-between">
      <div className="flex gap-2">
        <SidebarTrigger />
        <PageHeader />
      </div>
      <div className="flex items-center gap-4">
        <NotificationsDropdown />
        {isLoading ? (
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <Skeleton className="hidden sm:block h-4 w-24" />
          </div>
        ) : (
          <RoleProfileDropdown
            name={profileResponse?.data?.name || "Affiliate User"}
            roleLabel="Affiliate account"
            avatarSrc={resolveImageUrl(profileResponse?.data?.avatar) || "/home/user1.png"}
            avatarAlt={profileResponse?.data?.name || "Affiliate User"}
            profileHref={getProfilePathByRole("affiliate")}
            dashboardHref={getDashboardPathByRole("affiliate")}
            profileLabel="My Profile"
            dashboardLabel="Go to Dashboard"
            logoutLabel="Log Out"
          />
        )}
      </div>
    </div>
  );
}
