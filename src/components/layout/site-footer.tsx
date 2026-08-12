import { Mail, MessageCircle, Phone, Send } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { Logo } from '@/components/layout/logo';
import { FooterCredits } from '@/components/layout/footer-credits';
import { siteConfig } from '@/config/site';

const productLinks: {
  href: AppPathname;
  key: 'platform' | 'solutions' | 'pricing' | 'gallery';
}[] = [
  { href: '/platform', key: 'platform' },
  { href: '/solutions', key: 'solutions' },
  { href: '/pricing', key: 'pricing' },
  { href: '/gallery', key: 'gallery' },
];

const messengers = [
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    label: 'Telegram',
    icon: Send,
    href: `https://t.me/${siteConfig.telegram}`,
  },
  {
    label: 'Email',
    icon: Mail,
    href: `mailto:${siteConfig.email}`,
  },
];

const linkClass =
  'rounded-sm text-[0.9375rem] text-text-muted transition-colors hover:text-text';

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const nav = await getTranslations('nav');

  const currentYear = new Date().getFullYear();
  const years =
    currentYear > siteConfig.launchYear
      ? `${siteConfig.launchYear}–${currentYear}`
      : `${siteConfig.launchYear}`;

  return (
    <footer className="border-t border-border bg-band">
      <div className="container-site py-10 md:py-14">
        {/* Two columns from the smallest breakpoint: stacking four blocks in a
            single column made the footer taller than the phone screen twice
            over. The brand and contact blocks span both columns because their
            content does not fit half a phone width. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:gap-y-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo size="lg" />
            <p className="mt-4 max-w-xs font-mono text-[0.8125rem] leading-relaxed text-text-muted">
              {t('tagline')}
            </p>

            <ul className="mt-6 flex items-center gap-2">
              {messengers.map(({ label, icon: Icon, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                    aria-label={label}
                    title={label}
                    className="chamfer-sm inline-flex size-9 items-center justify-center border border-border text-text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={t('product')}>
            <h2 className="font-mono text-label uppercase text-text-subtle">
              {t('product')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {productLinks.map(({ href, key }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-mono text-label uppercase text-text-subtle">
              {t('company')}
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/contact" className={linkClass}>
                  {nav('contact')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t('privacy')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="font-mono text-label uppercase text-text-subtle">
              {t('contacts')}
            </h2>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone
                  className="mt-0.5 size-4 shrink-0 text-text-subtle"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="rounded-sm font-mono text-[0.875rem] text-text-muted transition-colors hover:text-text"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="mt-0.5 size-4 shrink-0 text-text-subtle"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="rounded-sm font-mono text-[0.875rem] break-all text-text-muted transition-colors hover:text-text"
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <h2 className="mt-6 font-mono text-label uppercase text-text-subtle">
              {t('address')}
            </h2>
            <address className="mt-3 text-[0.875rem] leading-relaxed text-text-muted not-italic">
              {siteConfig.address.street}
              <br />
              {siteConfig.address.postal} {siteConfig.address.city}
              <br />
              {siteConfig.address.country}
            </address>
          </div>
        </div>

        <div className="mt-9 flex flex-col items-center gap-5 border-t border-border pt-6 md:mt-12 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="font-mono text-[0.75rem] text-text-subtle">
              © {years} {siteConfig.name}. {t('rights')}
            </p>
            <p className="mt-1 font-mono text-[0.75rem] text-text-subtle">
              {t('regNumber')} {siteConfig.regNumberPlaceholder}
            </p>
          </div>

          <FooterCredits />
        </div>
      </div>
    </footer>
  );
}
