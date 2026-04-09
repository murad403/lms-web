export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";
export const ROLE_COOKIE = "role";

export type UserRole = "student" | "instructor" | "organization" | "affiliate";

export const normalizeUserRole = (rawRole?: string | null): UserRole | null => {
  if (!rawRole) {
    return null;
  }

  const normalized = rawRole.trim().toLowerCase();

  if (normalized === "student" || normalized === "learner") {
    return "student";
  }

  if (normalized === "instructor" || normalized === "trainer") {
    return "instructor";
  }

  if (normalized === "organization" || normalized === "org_admin" || normalized === "or_admin") {
    return "organization";
  }

  if (normalized === "affiliate") {
    return "affiliate";
  }

  return null;
};

export const getDashboardPathByRole = (rawRole?: string | null): string => {
  const role = normalizeUserRole(rawRole);

  if (role === "instructor") {
    return "/instructor/dashboard";
  }

  if (role === "organization") {
    return "/organization/dashboard";
  }

  if (role === "affiliate") {
    return "/affiliate/overview";
  }

  return "/dashboard";
};
