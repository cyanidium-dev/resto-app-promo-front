import { getTranslations } from 'next-intl/server';
import {
  Bell,
  Camera,
  ClipboardCheck,
  FileText,
  ListTodo,
  SprayCan,
  Thermometer,
  Wrench,
  ArrowRight,
} from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { ButtonLink } from '@/components/ui/button';

type Item = { id: string; title: string; text: string };

const icons = [
  ClipboardCheck,
  Thermometer,
  SprayCan,
  ListTodo,
  Camera,
  Bell,
  Wrench,
  FileText,
];

export async function Modules() {
  const t = await getTranslations('home.modules');
  const items = t.raw('items') as Item[];

  return (
    <section className="section-y relative isolate border-b border-border">
      <Atmosphere variant="glow" glow="bl" />
      <Container>
        <SectionLabel id="06">{t('label')}</SectionLabel>

        <h2 className="mt-10 max-w-3xl text-h1 font-bold">{t('title')}</h2>

        <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const Icon = icons[index] ?? ClipboardCheck;
            return (
              <li key={item.id} className="bg-bg p-6">
                <div className="flex items-center justify-between">
                  <Icon
                    className="size-5 text-text-muted"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <span className="font-mono text-label text-text-subtle">
                    {item.id}
                  </span>
                </div>
                <h3 className="mt-5 text-[1.0625rem] font-semibold leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-10">
          <ButtonLink href="/platform" variant="secondary" size="lg">
            {t('cta')}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
