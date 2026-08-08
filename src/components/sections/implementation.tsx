import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';

type Step = { id: string; title: string; text: string };

export async function Implementation() {
  const t = await getTranslations('home.implementation');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="section-y border-b border-border bg-band">
      <Container>
        <SectionLabel id="11">{t('label')}</SectionLabel>

        <h2 className="mt-10 max-w-3xl text-h1 font-bold">{t('title')}</h2>

        <ol className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-4">
          {steps.map((step) => (
            <li key={step.id} className="bg-bg p-7">
              <span className="font-mono text-label text-text-subtle">
                {step.id}
              </span>
              <h3 className="mt-4 text-h3">{step.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
