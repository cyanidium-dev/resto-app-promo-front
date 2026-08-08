import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/ui/container';
import { ImageSlot } from '@/components/ui/image-slot';
import { Comparison } from '@/components/sections/comparison';
import { FinalCta } from '@/components/sections/final-cta';
import { photos } from '@/config/site';
import { buildAlternates } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

type Item = { title: string; text: string };

const industryPhotos = [
  photos.kitchen,
  photos.hotel,
  photos.catering,
  photos.bakery,
  photos.production,
  photos.coldRoom,
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.solutions' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: buildAlternates('/solutions', locale as Locale),
    openGraph: { title: t('title'), description: t('intro') },
  };
}

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('pages.solutions');
  const items = t.raw('items') as Item[];

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        intro={t('intro')}
        page="/solutions"
        breadcrumbLabel={t('label')}
        locale={locale as Locale} />

      <section className="section-y border-b border-border">
        <Container>
          <ul className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {items.map((item, index) => (
              <li key={item.title} className="bg-bg">
                <ImageSlot
                  src={industryPhotos[index]}
                  alt={item.title}
                  ratio="3 / 2"
                  sizes="(min-width: 1024px) 380px, (min-width: 768px) 50vw, 100vw"
                  chamfer={false}
                />
                <div className="p-6">
                  <h2 className="text-h3">{item.title}</h2>
                  <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <Comparison labelId="01" />
      <FinalCta labelId="02" />
    </>
  );
}
