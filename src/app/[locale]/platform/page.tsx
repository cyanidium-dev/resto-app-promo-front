import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ImageSlot } from '@/components/ui/image-slot';
import { FinalCta } from '@/components/sections/final-cta';
import { screens } from '@/config/site';
import { buildAlternates } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

type Item = { id: string; title: string; text: string };

const moduleScreens = [
  screens.checklists,
  screens.temperatures,
  screens.cleaning,
  screens.tasks,
  screens.photoEvidence,
  screens.alerts,
  screens.correctiveActions,
  screens.reports,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.platform' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: buildAlternates('/platform', locale as Locale),
    openGraph: { title: t('title'), description: t('intro') },
  };
}

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.platform');
  const m = await getTranslations('home.modules');
  const items = m.raw('items') as Item[];

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        intro={t('intro')}
        page="/platform"
        breadcrumbLabel={t('label')}
        locale={locale as Locale}
      >
        <ButtonLink href="/contact" size="lg">
          {t('cta')}
        </ButtonLink>
      </PageHero>

      {items.map((item, index) => (
        <section
          key={item.id}
          className={
            index % 2 === 1
              ? 'section-y border-b border-border bg-band'
              : 'section-y border-b border-border'
          }
        >
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div className={index % 2 === 1 ? 'lg:order-2' : undefined}>
                <span className="font-mono text-label text-text-subtle">
                  {item.id}
                </span>
                <h2 className="mt-3 text-h2 font-bold">{item.title}</h2>
                <p className="mt-4 text-body-lg text-text-muted">{item.text}</p>
              </div>
              <ImageSlot
                src={moduleScreens[index]}
                alt={item.title}
                ratio="16 / 10"
                sizes="(min-width: 1024px) 560px, 100vw"
                className={index % 2 === 1 ? 'lg:order-1' : undefined}
              />
            </div>
          </Container>
        </section>
      ))}

      <FinalCta labelId="09" />
    </>
  );
}
