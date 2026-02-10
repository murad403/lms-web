import { defineRouting } from "next-intl/routing";

export const locales = ["en", "it", "es", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  es: "Español",
  de: "Deutsch",
  fr: "Francais",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
});
