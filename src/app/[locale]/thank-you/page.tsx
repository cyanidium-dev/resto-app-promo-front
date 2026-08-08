import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { Atmosphere } from '@/components/ui/atmosphere';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.thankYou' });
  // Kept out of the index: this URL only makes sense as a conversion endpoint.
  return { title: t('title'), robots: { index: false, follow: false } };
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.thankYou');

  return (
    <section className="relative isolate">
      <Atmosphere variant="both" glow="center" grid="top" />
      <Container className="flex min-h-[60vh] flex-col justify-center py-20">
        <CheckCircle2
          className="size-8 text-ok"
          strokeWidth={1.5}
          aria-hidden
        />
        <h1 className="mt-6 max-w-2xl text-h1 font-bold">{t('title')}</h1>
        <p className="mt-4 max-w-xl text-body-lg text-text-muted">
          {t('text')}
        </p>
        <div className="mt-9">
          <ButtonLink href="/" variant="secondary" size="lg">
            {t('back')}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
