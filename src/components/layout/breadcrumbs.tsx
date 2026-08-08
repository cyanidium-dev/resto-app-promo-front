import { ChevronRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { AppPathname, Locale } from '@/i18n/routing';
import { pageUrl } from '@/lib/metadata';

/**
 * Renders the trail and its BreadcrumbList markup from one source, so the
 * visible path and what Google indexes can never disagree.
 */
export async function Breadcrumbs({
  page,
  label,
  locale,
}: {
  page: AppPathname;
  label: string;
  locale: Locale;
}) {
  const ui = await getTranslations('ui');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: ui('home'),
        item: pageUrl('/', locale),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: label,
        item: pageUrl(page, locale),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label={ui('breadcrumb')}>
        <ol className="flex items-center gap-2 font-mono text-[0.75rem] uppercase tracking-wider">
          <li>
            <Link
              href="/"
              className="rounded-sm text-text-subtle transition-colors hover:text-text"
            >
              {ui('home')}
            </Link>
          </li>
          <li aria-hidden className="text-text-subtle">
            <ChevronRight className="size-3" />
          </li>
          <li className="text-text-muted" aria-current="page">
            {label}
          </li>
        </ol>
      </nav>
    </>
  );
}
