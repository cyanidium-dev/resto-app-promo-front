import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.privacy' });
  return { title: t('title') };
}

/**
 * Placeholder. Romania is in the EU, so the published text has to come from
 * the client's legal side along with company details, processing basis and
 * retention period — see docs/TZ.md §9, question 10.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.privacy');

  return (
    <section className="section-y">
      <Container>
        <SectionLabel id="00">GDPR</SectionLabel>
        <h1 className="mt-10 max-w-2xl text-h1 font-bold">{t('title')}</h1>
        <p className="mt-6 max-w-2xl border-l-2 border-warning pl-5 text-body-lg text-text-muted">
          {t('notice')}
        </p>
      </Container>
    </section>
  );
}
