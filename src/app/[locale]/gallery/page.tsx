import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageHero } from '@/components/layout/page-hero';
import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { ImageLightboxGrid } from '@/components/ui/image-lightbox';
import { FinalCta } from '@/components/sections/final-cta';
import { photos, screens } from '@/config/site';
import { publicFileExists } from '@/lib/public-file';
import { buildAlternates } from '@/lib/metadata';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });
  return {
    title: t('title'),
    description: t('intro'),
    alternates: buildAlternates('/gallery', locale as Locale),
    openGraph: { title: t('title'), description: t('intro') },
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations('gallery');
  const modules = await getTranslations('home.modules');
  const solutions = await getTranslations('pages.solutions');

  const moduleItems = modules.raw('items') as { title: string }[];
  const industryItems = solutions.raw('items') as { title: string }[];

  /* Several config keys still point at the same stand-in file while the rest
     of the asset set is produced. Deduplicate by path so the gallery does not
     show the same screenshot four times under different captions. */
  const seen = new Set<string>();
  const screenItems = [
    { src: screens.heroDashboard, alt: moduleItems[0]?.title ?? 'Dashboard' },
    { src: screens.checklists, alt: moduleItems[0]?.title ?? '' },
    { src: screens.temperatures, alt: moduleItems[1]?.title ?? '' },
    { src: screens.cleaning, alt: moduleItems[2]?.title ?? '' },
    { src: screens.tasks, alt: moduleItems[3]?.title ?? '' },
    { src: screens.photoEvidence, alt: moduleItems[4]?.title ?? '' },
    { src: screens.alerts, alt: moduleItems[5]?.title ?? '' },
    { src: screens.correctiveActions, alt: moduleItems[6]?.title ?? '' },
    { src: screens.reports, alt: moduleItems[7]?.title ?? '' },
  ].filter((item) => {
    if (seen.has(item.src) || !publicFileExists(item.src)) return false;
    seen.add(item.src);
    return true;
  });

  const mobileItems = [
    { src: screens.mobileChecklist, alt: moduleItems[0]?.title ?? '', ratio: '852 / 1846' },
    { src: screens.mobileTemperature, alt: moduleItems[1]?.title ?? '', ratio: '862 / 1825' },
  ].filter((item) => publicFileExists(item.src));

  const seenPhotos = new Set<string>();
  const photoItems = [
    { src: photos.kitchen, alt: industryItems[0]?.title ?? '' },
    { src: photos.hotel, alt: industryItems[1]?.title ?? '' },
    { src: photos.catering, alt: industryItems[2]?.title ?? '' },
    { src: photos.bakery, alt: industryItems[3]?.title ?? '' },
    { src: photos.production, alt: industryItems[4]?.title ?? '' },
    { src: photos.coldRoom, alt: industryItems[5]?.title ?? '' },
  ].filter((item) => {
    if (seenPhotos.has(item.src) || !publicFileExists(item.src)) return false;
    seenPhotos.add(item.src);
    return true;
  });

  return (
    <>
      <PageHero
        label={t('label')}
        title={t('title')}
        intro={t('intro')}
        page="/gallery"
        breadcrumbLabel={t('label')}
        locale={locale as Locale}
      />

      <section className="section-y relative isolate border-b border-border">
        <Atmosphere variant="glow" glow="bl" />
        <Container>
          <SectionLabel id="01">{t('screensTitle')}</SectionLabel>
          <ImageLightboxGrid className="mt-10" items={screenItems} />

          {mobileItems.length > 0 && (
            <ImageLightboxGrid
              className="mt-4 sm:grid-cols-3 lg:grid-cols-6"
              items={mobileItems}
            />
          )}
        </Container>
      </section>

      <section className="section-y border-b border-border bg-band">
        <Container>
          <SectionLabel id="02">{t('photosTitle')}</SectionLabel>
          <ImageLightboxGrid
            className="mt-10"
            items={photoItems.map((p) => ({ ...p, ratio: '3 / 2' }))}
          />
        </Container>
      </section>

      <FinalCta labelId="03" />
    </>
  );
}
