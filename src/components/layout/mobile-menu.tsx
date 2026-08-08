'use client';

import { useEffect, useRef } from 'react';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link, usePathname } from '@/i18n/navigation';
import type { AppPathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { DemoDialog } from '@/components/forms/demo-dialog';
import { LocaleSwitcher } from '@/components/layout/locale-switcher';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

type NavItem = { href: AppPathname; label: string };

/**
 * Mobile menu, following the Kondor treatment: a full-height sheet that drops
 * from under the header, a blurred backdrop behind it, tracked uppercase links
 * with an arrow and a hairline that scales in, and a three-up contact row
 * under the primary action.
 *
 * It sits below the header rather than over it (`top: var(--header-h)`), which
 * is why the header publishes its measured height as a CSS variable.
 */
export function MobileMenu({
  isOpen,
  onClose,
  navItems,
}: {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}) {
  const t = useTranslations('nav');
  const ui = useTranslations('ui');
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // `inert` is applied through the DOM rather than as a JSX prop: React can
  // omit it during SSR and the mismatch shows up as a hydration error.
  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    if (isOpen) el.removeAttribute('inert');
    else el.setAttribute('inert', '');
  }, [isOpen]);

  // Close when the route changes.
  useEffect(() => {
    if (isOpen) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const contactTile =
    'flex flex-col items-center gap-1.5 rounded-sm border border-border bg-surface/50 py-3 ' +
    'font-mono text-[0.625rem] uppercase tracking-wider text-text-muted ' +
    'transition hover:border-accent hover:text-accent';

  return (
    <div
      ref={menuRef}
      className={cn(
        'fixed inset-x-0 bottom-0 top-[var(--header-h,64px)] z-20 lg:hidden',
        'transition-opacity duration-200 ease-out',
        isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
      )}
    >
      <button
        type="button"
        aria-label={ui('close')}
        onClick={onClose}
        className="absolute inset-0 size-full cursor-default bg-[#08090a]/70 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t('openMenu')}
        className={cn(
          'absolute inset-x-0 top-0 flex max-h-full flex-col overflow-y-auto',
          'border-b border-border bg-bg/95 backdrop-blur-xl',
          'shadow-[0_24px_48px_-20px_rgb(0_0_0/0.5)]',
          'transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'translate-y-0' : '-translate-y-4',
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none h-px w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent"
        />

        <nav className="container-site flex flex-col gap-1 pt-4 pb-2">
          {navItems.map((item) => (
            <MobileLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
              onClose={onClose}
            />
          ))}
        </nav>

        <div className="container-site pb-6 pt-4">
          <DemoDialog
            trigger={
              <Button size="lg" className="w-full">
                {t('requestDemo')}
              </Button>
            }
          />

          <div className="mt-5 grid grid-cols-3 gap-2">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              onClick={onClose}
              className={contactTile}
            >
              <Phone className="size-4" strokeWidth={1.75} aria-hidden />
              Telefon
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className={contactTile}
            >
              <MessageCircle
                className="size-4"
                strokeWidth={1.75}
                aria-hidden
              />
              WhatsApp
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              onClick={onClose}
              className={contactTile}
            >
              <Mail className="size-4" strokeWidth={1.75} aria-hidden />
              Email
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center border-t border-border pt-5">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileLink({
  href,
  label,
  active,
  onClose,
}: {
  href: AppPathname;
  label: string;
  active: boolean;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      data-active={active}
      className={cn(
        'group/mitem relative flex items-center justify-between py-3.5',
        'font-mono text-xs font-medium uppercase tracking-[0.22em] text-text-muted',
        'transition-colors duration-200 ease-out',
        'hover:text-text data-[active=true]:text-accent',
      )}
    >
      <span>{label}</span>
      <span
        aria-hidden
        className="font-mono text-[0.625rem] text-text-subtle transition-transform duration-300 ease-out group-hover/mitem:translate-x-0.5"
      >
        →
      </span>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-text/20',
          'transition-transform duration-300 ease-out',
          'scale-x-0 group-hover/mitem:scale-x-100 data-[active=true]:scale-x-100',
        )}
      />
    </Link>
  );
}
