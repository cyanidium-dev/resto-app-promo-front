import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { ComparisonTable } from '@/components/sections/comparison';

type Item = { id: string; title: string; text: string };

/**
 * Problem and comparison were two sections making one argument: here is what
 * goes wrong today, and here is the same list with the product in place. Read
 * back to back they repeated themselves, so the ledger now closes this section
 * rather than opening the next one. /solutions still renders the table as its
 * own section, where it has no problem statement in front of it.
 */
export async function Problem() {
  const t = await getTranslations('home.problem');
  const c = await getTranslations('home.comparison');
  const items = t.raw('items') as Item[];

  return (
    <section className="section-y relative isolate border-b border-border">
      <Atmosphere variant="glow" glow="tr" />
      <Container>
        <SectionLabel id="01">{t('label')}</SectionLabel>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <h2 className="text-h1 font-bold">{t('title')}</h2>
          <p className="text-body-lg text-text-muted lg:pt-2">{t('intro')}</p>
        </div>

        <ul className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.id} className="bg-bg p-7 md:p-8">
              <span className="font-mono text-label text-text-subtle">
                {item.id}
              </span>
              <h3 className="mt-3 text-h3">{item.title}</h3>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-text-muted">
                {item.text}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="mt-20 max-w-2xl text-h2 font-bold">{c('title')}</h3>
        <ComparisonTable className="mt-8" />
      </Container>
    </section>
  );
}
