import { cookies } from "next/headers";

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ROLE_COOKIE,
  normalizeUserRole,
  type UserRole,
} from "@/utils/auth-shared";

export type AuthSessionSnapshot = {
  accessToken?: string;
  refreshToken?: string;
  rawRole?: string;
  role: UserRole | null;
};

export const getServerAuthSession = async (): Promise<AuthSessionSnapshot> => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  const rawRole = cookieStore.get(ROLE_COOKIE)?.value;

  return {
    accessToken,
    refreshToken,
    rawRole,
    role: normalizeUserRole(rawRole),
  };
};
