import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { LeadForm } from '@/components/forms/lead-form';
import { FaqJsonLd } from '@/components/seo/json-ld';
import { siteConfig } from '@/config/site';
import { buildAlternates } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

type Faq = { q: string; a: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.contact' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: buildAlternates('/contact', locale as Locale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.contact');
  const f = await getTranslations('form');
  const faq = t.raw('faq') as Faq[];

  return (
    <>
      <FaqJsonLd items={faq} />
      {/* Same pull-up as PageHero — this page builds its own hero because of
          the two-column form layout, so it needs the offset applied here. */}
      <section className="relative isolate border-b border-border lg:-mt-[var(--header-h,4.5rem)]">
        <Atmosphere variant="both" glow="br" grid="right" />
        <Container className="pt-14 pb-16 md:pt-20 md:pb-20 lg:pt-[calc(var(--header-h,4.5rem)+4rem)]">
          <SectionLabel id="00">{t('label')}</SectionLabel>

          <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h1 className="text-h1 font-bold">{t('title')}</h1>
              <p className="mt-5 text-body-lg text-text-muted">{t('intro')}</p>

              <div className="mt-10 border-t border-border pt-6">
                <h2 className="font-mono text-label uppercase text-text-subtle">
                  {t('directTitle')}
                </h2>
                <ul className="mt-4 space-y-2">
                  <li>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="rounded-sm font-mono text-[0.9375rem] text-text underline underline-offset-4"
                    >
                      {siteConfig.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                      className="rounded-sm font-mono text-[0.9375rem] text-text underline underline-offset-4"
                    >
                      {siteConfig.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-border bg-bg p-6 md:p-8">
              <h2 className="text-h3">{f('title')}</h2>
              <p className="mt-2 mb-8 text-[0.9375rem] text-text-muted">
                {f('intro')}
              </p>
              <LeadForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-y">
        <Container>
          <SectionLabel id="01">{t('faqTitle')}</SectionLabel>
          <dl className="mt-10 border-t border-border">
            {faq.map((item) => (
              <div
                key={item.q}
                className="grid gap-2 border-b border-border py-7 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
              >
                <dt className="text-h3">{item.q}</dt>
                <dd className="text-[0.9375rem] leading-relaxed text-text-muted">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
