'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUp, Mail, MessageCircle, Phone, PhoneCall, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

const contacts = [
  {
    label: 'Telefon',
    icon: Phone,
    href: `tel:${siteConfig.phoneRaw}`,
  },
  {
    label: 'WhatsApp',
    icon: MessageCircle,
    href: `https://wa.me/${siteConfig.whatsapp}`,
  },
  {
    label: 'Email',
    icon: Mail,
    href: `mailto:${siteConfig.email}`,
  },
];

export function FloatingActions() {
  const ui = useTranslations('ui');
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Escape closes the contact fan, matching the modal's behaviour.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            key="top"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label={ui('scrollTop')}
            title={ui('scrollTop')}
            className="chamfer-sm pointer-events-auto inline-flex size-11 items-center justify-center border border-border bg-bg/85 text-text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ArrowUp className="size-4" aria-hidden />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="fan"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className="pointer-events-auto flex flex-col items-end gap-2.5"
          >
            {contacts.map(({ label, icon: Icon, href }) => (
              <motion.li
                key={label}
                variants={{
                  hidden: { opacity: 0, y: 10, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  title={label}
                  className="chamfer-sm inline-flex size-11 items-center justify-center border border-border bg-bg/85 text-text-muted backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? ui('closeContacts') : ui('contactUs')}
        title={open ? ui('closeContacts') : ui('contactUs')}
        className={cn(
          'chamfer-sm pointer-events-auto inline-flex size-12 items-center justify-center',
          'bg-accent text-accent-fg transition-colors duration-300',
        )}
      >
        {/* A handset rather than a plus: the button opens contact methods, and
            "+" reads as "add something". */}
        {open ? (
          <X className="size-5" aria-hidden />
        ) : (
          <PhoneCall className="size-5" aria-hidden />
        )}
      </button>
    </div>
  );
}
