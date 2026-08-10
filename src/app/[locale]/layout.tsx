import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Inter, JetBrains_Mono, Unbounded } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { ThemeProvider } from '@/components/theme-provider';
import { ThemeTransition } from '@/components/theme-transition';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { FloatingActions } from '@/components/layout/floating-actions';
import { siteConfig } from '@/config/site';
import { publicFileExists } from '@/lib/public-file';
import { locales, routing, type Locale } from '@/i18n/routing';
import '../globals.css';

/* latin-ext carries the Romanian comma-below diacritics (ș ț), cyrillic covers
   the Russian locale. next/font emits per-subset files with unicode-range, so
   a Romanian visitor never downloads the Cyrillic glyphs.
   The subset arrays are repeated literally on purpose — next/font is compiled
   at build time and cannot read a shared constant. */
/* Unbounded carries the display voice — wide, geometric and distinctly not a
   default grotesk. Body copy stays on Inter: Unbounded is unreadable at 16px
   across dense Romanian and Russian paragraphs. */
const unbounded = Unbounded({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['600', '700'],
  variable: '--font-unbounded',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  // Only advertise the OG image once the asset actually exists — a preview
  // card pointing at a 404 looks worse than no card at all.
  const ogImage = '/images/og.png';
  const hasOgImage = publicFileExists(ogImage);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('defaultTitle'),
      template: `%s — ${siteConfig.name}`,
    },
    description: t('defaultDescription'),
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale,
      title: t('defaultTitle'),
      description: t('defaultDescription'),
      ...(hasOgImage && {
        images: [{ url: ogImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: hasOgImage ? 'summary_large_image' : 'summary',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${unbounded.variable} ${inter.variable} ${jetBrainsMono.variable}`}
    >
      <body className="min-h-dvh text-text antialiased">
        {/* Dark by default, and deliberately not following the OS. The hero
            photography, the product screenshots and the device shells are all
            dark-first, so a visitor arriving on the light theme sees the
            weaker version of the design. System detection is off rather than
            merely overridden, so the first paint is deterministic — the
            toggle still switches, and the choice is remembered. */}
        {/* `disableTransitionOnChange` is deliberately absent: ThemeTransition
            paints the swap instead, gating a colour transition behind an
            attribute that only exists while the theme is actually changing. */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <ThemeTransition />
          <NextIntlClientProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
            >
              {locale === 'ro'
                ? 'Sari la conținut'
                : locale === 'ru'
                  ? 'Перейти к содержимому'
                  : 'Skip to content'}
            </a>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter />
            <FloatingActions />
          </NextIntlClientProvider>
          {/* Scroll reveals start at opacity 0 and are raised by JS. Without
              this, a no-JS client or a crawler that does not execute scripts
              would see a page of invisible content. */}
          <noscript>
            <style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
          </noscript>
        </ThemeProvider>
      </body>
    </html>
  );
}
