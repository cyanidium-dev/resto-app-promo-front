'use client';

import { useState, type ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LeadForm } from '@/components/forms/lead-form';
import { cn } from '@/lib/utils';

/**
 * Demo request in a modal rather than a jump to /contact: the visitor keeps
 * their place on the page, which matters most at the bottom of a long read
 * where the decision actually gets made.
 *
 * The overlay both dims and blurs. Blur alone leaves text legible enough to
 * compete with the form; dim alone leaves the page feeling merely greyed out.
 */
export function DemoDialog({
  trigger,
  className,
}: {
  trigger: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('form');
  const ui = useTranslations('ui');

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-50 bg-[#08090a]/70 backdrop-blur-md',
            'data-[state=open]:animate-[fade-in_280ms_cubic-bezier(0.16,1,0.3,1)]',
            'data-[state=closed]:animate-[fade-out_200ms_ease-out]',
          )}
        />

        {/* Centred by this flex wrapper rather than by left/top + translate.
            Transform-based centring is overwritten by the enter animation's
            own `transform`, which made the panel flash in the corner before
            snapping to the middle. */}
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
          <Dialog.Content
            className={cn(
              'panel-chamfer pointer-events-auto relative w-full max-w-lg',
              'max-h-[calc(100dvh-2rem)] overflow-y-auto p-6 md:p-8',
              'data-[state=open]:animate-[dialog-in_360ms_cubic-bezier(0.16,1,0.3,1)_both]',
              'data-[state=closed]:animate-[fade-out_200ms_ease-out_both]',
              className,
            )}
          >
          <div className="mb-6 flex items-start justify-between gap-6">
            <div>
              <Dialog.Title className="text-h3">{t('title')}</Dialog.Title>
              <Dialog.Description className="mt-2 text-[0.9375rem] text-text-muted">
                {t('intro')}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label={ui('close')}
              className="-mt-1 -mr-1 inline-flex size-9 shrink-0 items-center justify-center rounded-sm text-text-subtle transition-colors hover:text-text"
            >
              <X className="size-4" aria-hidden />
            </Dialog.Close>
          </div>

            <LeadForm />
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
