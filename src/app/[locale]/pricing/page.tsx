import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { FinalCta } from '@/components/sections/final-cta';
import { buildAlternates } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

type ModelItem = { title: string; text: string };
type Step = { id: string; title: string; text: string };

/**
 * TODO (blocked on the client — see docs/TZ.md §9, question 3):
 * this page explains how the price is built but quotes no figures, because
 * none have been supplied. A published range ("from X € per location") is the
 * single biggest conversion lever missing from this site — chase it.
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
  const modelItems = t.raw('modelItems') as ModelItem[];
  const steps = impl.raw('steps') as Step[];

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        intro={t('intro')}
        page="/pricing"
        breadcrumbLabel={t('label')}
        locale={locale as Locale} />

      <section className="section-y border-b border-border">
        <Container>
          <SectionLabel id="01">{t('modelTitle')}</SectionLabel>
          <ul className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-3">
            {modelItems.map((item, index) => (
              <li key={item.title} className="bg-bg p-7">
                <span className="font-mono text-label text-text-subtle">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h2 className="mt-4 text-h3">{item.title}</h2>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-text-muted">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-2xl border-l-2 border-text pl-5 text-body-lg text-text-muted">
            {t('note')}
          </p>
        </Container>
      </section>

      <section className="section-y border-b border-border bg-band">
        <Container>
          <SectionLabel id="02">{t('processTitle')}</SectionLabel>
          <ol className="mt-10 grid gap-px border border-border bg-border lg:grid-cols-4">
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

      <FinalCta labelId="03" />
    </>
  );
}
