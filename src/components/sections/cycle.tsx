import { getTranslations } from 'next-intl/server';
import { RotateCcw } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';

type Step = { key: string; title: string; text: string };

/**
 * Drawn in markup rather than shipped as an image: the step names are
 * translated into three languages, and baked-in text would mean regenerating
 * the whole diagram per locale.
 */
export async function Cycle() {
  const t = await getTranslations('home.cycle');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="section-y relative isolate border-b border-border bg-band">
      <Atmosphere variant="both" glow="br" grid="right" />
      <Container>
        <SectionLabel id="02">{t('label')}</SectionLabel>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <h2 className="text-h1 font-bold">{t('title')}</h2>
          <p className="text-body-lg text-text-muted lg:pt-2">{t('intro')}</p>
        </div>

        <ol className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-5">
          {steps.map((step, index) => (
            <li key={step.key} className="bg-bg p-6">
              <div className="flex items-center gap-2.5">
                <span aria-hidden className="size-2 rounded-[1px] bg-text" />
                <span className="font-mono text-label text-text-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 font-mono text-[0.9375rem] font-medium uppercase tracking-wide">
                {step.title}
              </h3>
              <p className="mt-2.5 text-[0.875rem] leading-relaxed text-text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>

        {/* The loop back to step 01 — what makes this a cycle rather than
            a five-step onboarding. */}
        <div className="flex items-center gap-3 border-x border-b border-border bg-bg px-6 py-4">
          <RotateCcw
            className="size-4 shrink-0 text-text-subtle"
            aria-hidden
          />
          <p className="font-mono text-[0.8125rem] text-text-muted">
            {t('caption')}
          </p>
        </div>
      </Container>
    </section>
  );
}
