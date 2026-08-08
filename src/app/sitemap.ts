import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';
import { getPathname } from '@/i18n/navigation';
import { locales, type AppPathname } from '@/i18n/routing';

// /thank-you and /privacy are intentionally absent: one is a conversion
// endpoint, the other has no indexable content yet.
const indexable: AppPathname[] = [
  '/',
  '/platform',
  '/solutions',
  '/gallery',
  '/pricing',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return indexable.flatMap((href) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}${getPathname({ href, locale })}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: href === '/' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [
            l,
            `${siteConfig.url}${getPathname({ href, locale: l })}`,
          ]),
        ),
      },
    })),
  );
}

export const dynamic = 'force-static';
