import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { locales, routing, type AppPathname, type Locale } from '@/i18n/routing';

function absolute(href: AppPathname, locale: Locale) {
  return `${siteConfig.url}${getPathname({ href, locale })}`;
}

/**
 * Builds canonical + hreflang for one page across all three locales.
 * Derived from the routing table rather than hand-written, so a localised path
 * can never drift out of sync with the tag that points at it.
 */
export function buildAlternates(
  href: AppPathname,
  locale: Locale,
): Metadata['alternates'] {
  return {
    canonical: absolute(href, locale),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, absolute(href, l)])),
      'x-default': absolute(href, routing.defaultLocale),
    },
  };
}

export function pageUrl(href: AppPathname, locale: Locale) {
  return absolute(href, locale);
}
