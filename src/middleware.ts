import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { locales, routing } from "@/i18n/routing";
import {
  ACCESS_TOKEN_COOKIE,
  ROLE_COOKIE,
  getDashboardPathByRole,
  normalizeUserRole,
} from "@/utils/auth-shared";

const intlMiddleware = createMiddleware(routing);

const studentProtectedPrefixes = new Set([
  "dashboard",
  "profile",
  "wishlist",
  "enrolled-courses",
  "learning-progress",
  "live-classes",
  "ai-tutor",
  "my-certificates",
  "reviews",
  "quiz-attempts",
  "purchase-history",
  "messages",
  "settings",
]);

const redirectTo = (request: NextRequest, pathname: string) => {
  const url = new URL(pathname, request.url);
  return NextResponse.redirect(url);
};

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (!maybeLocale || !locales.includes(maybeLocale as (typeof locales)[number])) {
    return intlMiddleware(request);
  }

  const locale = maybeLocale;
  const firstSegmentAfterLocale = segments[1] ?? "";
  const secondSegmentAfterLocale = segments[2] ?? "";

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const role = normalizeUserRole(request.cookies.get(ROLE_COOKIE)?.value);

  const isAuthenticated = Boolean(accessToken && role);

  if (
    firstSegmentAfterLocale === "auth" &&
    ["sign-in", "sign-up"].includes(secondSegmentAfterLocale) &&
    isAuthenticated
  ) {
    return redirectTo(request, `/${locale}${getDashboardPathByRole(role)}`);
  }

  if (firstSegmentAfterLocale === "affiliate") {
    if (!isAuthenticated) {
      return redirectTo(request, `/${locale}/auth/sign-in`);
    }
    if (role !== "affiliate") {
      return redirectTo(request, `/${locale}${getDashboardPathByRole(role)}`);
    }
  }

  if (firstSegmentAfterLocale === "instructor" || firstSegmentAfterLocale === "mentor") {
    if (!isAuthenticated) {
      return redirectTo(request, `/${locale}/auth/sign-in`);
    }
    if (role !== "instructor") {
      return redirectTo(request, `/${locale}${getDashboardPathByRole(role)}`);
    }
  }

  if (firstSegmentAfterLocale === "organization") {
    if (!isAuthenticated) {
      return redirectTo(request, `/${locale}/auth/sign-in`);
    }
    if (role !== "organization") {
      return redirectTo(request, `/${locale}${getDashboardPathByRole(role)}`);
    }
  }

  if (studentProtectedPrefixes.has(firstSegmentAfterLocale)) {
    if (!isAuthenticated) {
      return redirectTo(request, `/${locale}/auth/sign-in`);
    }
    if (role !== "student") {
      return redirectTo(request, `/${locale}${getDashboardPathByRole(role)}`);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|it|es|de|fr)/:path*",
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
