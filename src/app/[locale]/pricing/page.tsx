import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { FinalCta } from '@/components/sections/final-cta';
import { PricingTiers } from '@/components/sections/pricing-tiers';
import { buildAlternates } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

type Step = { id: string; title: string; text: string };

/**
 * TODO (still blocked on the client — docs/TZ.md §9, question 3):
 * the three tiers quote PLACEHOLDER figures from `pricingPlaceholder` in
 * config, not numbers the business has agreed. Get the real ones before launch.
 * The "how the price is built" cards that used to sit here are gone: the tier
 * table states the same thing with numbers attached. So is the PageHero — it
 * carried the same intro paragraph as the tier block directly beneath it.
 * PricingTiers leads the page instead and carries the h1 and the breadcrumbs.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.pricing' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: buildAlternates('/pricing', locale as Locale),
    openGraph: { title: t('title'), description: t('intro') },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.pricing');
  const impl = await getTranslations('home.implementation');
  const steps = impl.raw('steps') as Step[];

  return (
    <>
      <PricingTiers
        labelId="00"
        lead={{ page: '/pricing', locale: locale as Locale }}
      />

      <section className="section-y border-b border-border bg-band">
        <Container>
          <SectionLabel id="01">{t('processTitle')}</SectionLabel>
          <ol className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.id} className="bg-bg p-7">
                <span className="font-mono text-label text-text-subtle">
                  {step.id}
                </span>
                <h2 className="mt-4 text-h3">{step.title}</h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 max-w-2xl border-l-2 border-text pl-5 text-body-lg text-text-muted">
            {t('note')}
          </p>
        </Container>
      </section>

      <FinalCta labelId="02" />
    </>
  );
}
