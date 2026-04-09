import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ROLE_COOKIE,
  type UserRole,
  normalizeUserRole,
} from "@/utils/auth-shared";

type CookieOptions = {
  maxAge?: number;
  path?: string;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
};

const isBrowser = () => typeof document !== "undefined";

const getRawCookie = (name: string): string | undefined => {
  if (!isBrowser()) {
    return undefined;
  }

  const encodedName = encodeURIComponent(name);
  const cookiePart = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${encodedName}=`));

  if (!cookiePart) {
    return undefined;
  }

  const value = cookiePart.split("=").slice(1).join("=");
  return decodeURIComponent(value);
};

const setRawCookie = (name: string, value: string, options: CookieOptions = {}) => {
  if (!isBrowser()) {
    return;
  }

  const {
    maxAge = 60 * 60 * 24 * 7,
    path = "/",
    secure = process.env.NODE_ENV === "production",
    sameSite = "lax",
  } = options;

  const parts = [
    `${encodeURIComponent(name)}=${encodeURIComponent(value)}`,
    `Path=${path}`,
    `Max-Age=${maxAge}`,
    `SameSite=${sameSite}`,
  ];

  if (secure) {
    parts.push("Secure");
  }

  document.cookie = parts.join("; ");
};

const removeRawCookie = (name: string) => {
  if (!isBrowser()) {
    return;
  }

  document.cookie = `${encodeURIComponent(name)}=; Path=/; Max-Age=0; SameSite=Lax`;
};

export const saveAuthCookies = (params: {
  accessToken: string;
  refreshToken: string;
  role: string;
}) => {
  setRawCookie(ACCESS_TOKEN_COOKIE, params.accessToken);
  setRawCookie(REFRESH_TOKEN_COOKIE, params.refreshToken);
  setRawCookie(ROLE_COOKIE, params.role);
};

export const clearAuthCookies = () => {
  removeRawCookie(ACCESS_TOKEN_COOKIE);
  removeRawCookie(REFRESH_TOKEN_COOKIE);
  removeRawCookie(ROLE_COOKIE);
};

export const getCookie = (name: string): string | undefined => getRawCookie(name);

export const getClientSession = (): {
  accessToken?: string;
  refreshToken?: string;
  role: UserRole | null;
  rawRole?: string;
} => {
  const accessToken = getRawCookie(ACCESS_TOKEN_COOKIE);
  const refreshToken = getRawCookie(REFRESH_TOKEN_COOKIE);
  const rawRole = getRawCookie(ROLE_COOKIE);

  return {
    accessToken,
    refreshToken,
    rawRole,
    role: normalizeUserRole(rawRole),
  };
};
