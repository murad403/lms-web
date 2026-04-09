"use client";

import user from "@/assets/partnership/user2.png";
import { getClientSession } from "@/utils/auth-client";
import { getDashboardPathByRole, getProfilePathByRole } from "@/utils/auth-shared";
import RoleProfileDropdown from "./RoleProfileDropdown";

export function UserProfileDropdown() {
  const session = getClientSession();
  const name = session.role === "affiliate" ? "Affiliate User" : "John Doe";
  const roleLabel = session.role ? `${session.role} account` : "Affiliate account";

  return (
    <RoleProfileDropdown
      name={name}
      roleLabel={roleLabel}
      avatarSrc={user}
      avatarAlt={name}
      profileHref={getProfilePathByRole(session.rawRole ?? "affiliate")}
      dashboardHref={getDashboardPathByRole(session.rawRole ?? "affiliate")}
      profileLabel="My Profile"
      dashboardLabel="Go to Dashboard"
      logoutLabel="Log Out"
    />
  );
}
