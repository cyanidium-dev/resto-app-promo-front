'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { DemoDialog } from '@/components/forms/demo-dialog';
import { Logo } from '@/components/layout/logo';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { MenuIcon } from '@/components/icons/menu-icon';
import { cn } from '@/lib/utils';

const navKeys = [
  { href: '/platform', key: 'platform' },
  { href: '/solutions', key: 'solutions' },
  { href: '/gallery', key: 'gallery' },
  { href: '/pricing', key: 'pricing' },
  { href: '/contact', key: 'contact' },
] as const satisfies readonly { href: AppPathname; key: string }[];

/**
 * Header built on the Kondor treatment: from lg up the bar detaches from the
 * top edge and becomes a chamfered plate with a gradient rim (see `.header-bar`
 * in globals.css); below that it spans full width with the gradient reduced to
 * a bottom hairline.
 *
 * Nav links are small, tracked and uppercase, each with a rule that wipes in
 * from the left on hover — the movement is horizontal and 1px tall, so it reads
 * as precision rather than decoration.
 */
export function SiteHeader() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Publish the measured height so the mobile menu can sit exactly beneath it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const sync = () =>
      document.documentElement.style.setProperty(
        '--header-h',
        `${el.offsetHeight}px`,
      );
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    window.addEventListener('resize', sync);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', sync);
    };
  }, []);

  const navItems = navKeys.map((n) => ({ href: n.href, label: t(n.key) }));

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled={scrolled}
        data-menu-open={menuOpen}
        className="sticky top-0 z-30 isolate bg-bg lg:top-4 lg:bg-transparent"
      >
        {/* Below lg the plate's gradient rim collapses to this bottom line. */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 border-b lg:hidden',
            'transition-opacity duration-300',
            '[border-image:linear-gradient(90deg,color-mix(in_srgb,var(--accent)_25%,transparent)_0%,var(--accent)_100%)_1]',
            scrolled ? 'opacity-100' : 'opacity-60',
          )}
        />

        <div className="container-site">
          <div className="header-bar">
            <span aria-hidden className="header-bar__edge" />
            <span aria-hidden className="header-bar__fill" />

            <div className="relative z-10 flex items-center justify-between gap-4 py-3.5 lg:px-7 lg:py-4">
              <Link
                href="/"
                aria-label="MySaniTrace"
                className="group/logo relative inline-flex items-center rounded-sm transition-opacity duration-200 hover:opacity-90"
              >
                <Logo asLink={false} />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-text/50 transition-transform duration-300 ease-out group-hover/logo:scale-x-100"
                />
              </Link>

              <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
                {navKeys.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    aria-current={pathname === n.href ? 'page' : undefined}
                    className={cn(
                      'group/nav relative rounded-sm px-1.5 py-1.5 xl:px-3',
                      'font-mono text-[0.5rem] font-medium uppercase tracking-[0.18em] xl:text-[0.625rem]',
                      'transition-colors duration-200 ease-out',
                      pathname === n.href
                        ? 'text-accent'
                        : 'text-text-muted hover:text-text',
                    )}
                  >
                    {t(n.key)}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-text/40 transition-transform duration-300 ease-out group-hover/nav:scale-x-100"
                    />
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-3.5 lg:gap-5">
                <div className="hidden sm:block">
                  <LocaleSwitcher />
                </div>
                <ThemeToggle />

                <button
                  type="button"
                  aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  onClick={() => setMenuOpen((v) => !v)}
                  className="inline-flex size-9 items-center justify-center rounded-sm text-text-muted transition-transform duration-200 ease-out active:scale-95 lg:hidden"
                >
                  <span className="relative block h-4 w-6">
                    <MenuIcon
                      className={cn(
                        'absolute inset-0 h-4 w-6 transition duration-300 ease-out',
                        menuOpen ? 'scale-75 opacity-0' : 'scale-100 opacity-100',
                      )}
                    />
                    <X
                      className={cn(
                        'absolute inset-0 size-5 transition-all duration-200',
                        menuOpen ? 'scale-100 opacity-100' : 'scale-75 opacity-0',
                      )}
                      aria-hidden
                    />
                  </span>
                </button>

                {/* Desktop only — the mobile CTA lives inside the menu sheet. */}
                <DemoDialog
                  trigger={
                    <Button className="ml-1 hidden h-[34px] lg:inline-flex">
                      {t('requestDemo')}
                    </Button>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div id="mobile-menu">
        <MobileMenu
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          navItems={navItems}
        />
      </div>
    </>
  );
}
