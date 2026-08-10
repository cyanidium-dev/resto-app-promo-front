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
import { ImageSlot } from '@/components/ui/image-slot';
import { photos } from '@/config/site';

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

/**
 * `limit` trims the grid without touching the copy deck: the homepage shows the
 * first six and sends the reader to /platform for the rest, which is what the
 * CTA underneath is for. /platform still walks all eight, so the "eight modules"
 * promise in its heading stays true.
 */
export async function Modules({ limit }: { limit?: number } = {}) {
  const t = await getTranslations('home.modules');
  const all = t.raw('items') as Item[];
  const items = limit ? all.slice(0, limit) : all;

  return (
    <section className="section-y relative isolate border-b border-border">
      <Atmosphere variant="glow" glow="bl" />
      <Container>
        <SectionLabel id="04">{t('label')}</SectionLabel>

        {/* Photograph on the left, opposite the one in the problem section, so
            the two picture blocks on the way down the page do not read as the
            same layout twice. */}
        <div className="reveal-scroll mt-10 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <ImageSlot
            src={photos.bakery}
            alt={t('imageAlt')}
            ratio="3 / 2"
            sizes="(min-width: 1024px) 520px, 100vw"
            className="lg:order-1"
          />
          <h2 className="text-h1 font-bold lg:order-2">{t('title')}</h2>
        </div>

        {/* Three columns, not four: the homepage shows six of the eight, and a
            four-column track leaves two dead cells in the second row. */}
        <ul className="reveal-scroll mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
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

        <div className="reveal-scroll mt-10">
          <ButtonLink href="/platform" variant="secondary" size="lg">
            {t('cta')}
            <ArrowRight className="size-4" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
