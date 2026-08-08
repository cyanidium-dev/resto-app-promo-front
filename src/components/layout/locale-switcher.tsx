'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { locales, localeNames } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/**
 * Real links rather than a JS dropdown: crawlable, keyboard-native, and it
 * keeps the visitor on the same page instead of dumping them on the homepage.
 * The active locale is one of the few places the accent colour is allowed —
 * it marks an active state, which is inside its role.
 */
export function LocaleSwitcher() {
  const t = useTranslations('nav');
  const active = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t('language')} className="flex items-center">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && (
            <span aria-hidden className="px-1 text-text-subtle">
              ·
            </span>
          )}
          <Link
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={locale === active ? 'true' : undefined}
            className={cn(
              'rounded-sm px-1 font-mono text-label uppercase transition-colors',
              locale === active
                ? 'text-accent'
                : 'text-text-subtle hover:text-text',
            )}
          >
            <span className="sr-only">{localeNames[locale]}</span>
            <span aria-hidden>{locale}</span>
          </Link>
        </span>
      ))}
    </nav>
  );
}
