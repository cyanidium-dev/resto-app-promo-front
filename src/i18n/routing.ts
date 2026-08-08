import { defineRouting } from 'next-intl/routing';

export const locales = ['ro', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  ro: 'Română',
  en: 'English',
  ru: 'Русский',
};

/**
 * RO lives at the root without a prefix — it is the primary market.
 * EN and RU are prefixed. Paths are localised so each market gets URLs in its
 * own language, which matters for organic traffic.
 */
export const routing = defineRouting({
  locales,
  defaultLocale: 'ro',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/platform': {
      ro: '/platforma',
      en: '/platform',
      ru: '/platforma',
    },
    '/solutions': {
      ro: '/solutii',
      en: '/solutions',
      ru: '/resheniya',
    },
    '/pricing': {
      ro: '/preturi',
      en: '/pricing',
      ru: '/tseny',
    },
    '/gallery': {
      ro: '/galerie',
      en: '/gallery',
      ru: '/galereya',
    },
    '/contact': {
      ro: '/contact',
      en: '/contact',
      ru: '/kontakty',
    },
    '/thank-you': {
      ro: '/multumim',
      en: '/thank-you',
      ru: '/spasibo',
    },
    '/privacy': {
      ro: '/confidentialitate',
      en: '/privacy',
      ru: '/konfidentsialnost',
    },
  },
});

export type AppPathname = keyof typeof routing.pathnames;
