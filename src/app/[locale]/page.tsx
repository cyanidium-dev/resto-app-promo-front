import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildAlternates } from '@/lib/metadata';
import {
  OrganizationJsonLd,
  SoftwareApplicationJsonLd,
} from '@/components/seo/json-ld';
import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { Problem } from '@/components/sections/problem';
import { Cycle } from '@/components/sections/cycle';
import { Architecture } from '@/components/sections/architecture';
import { Modules } from '@/components/sections/modules';
import { Comparison } from '@/components/sections/comparison';
import { MultiLocation } from '@/components/sections/multi-location';
import { Adoption } from '@/components/sections/adoption';
import { LocalAdvantage } from '@/components/sections/local-advantage';
import { Implementation } from '@/components/sections/implementation';
import { FinalCta } from '@/components/sections/final-cta';
import type { Locale } from '@/i18n/routing';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return { alternates: buildAlternates('/', locale as Locale) };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const meta = await getTranslations('meta');

  return (
    <>
      <OrganizationJsonLd description={meta('defaultDescription')} />
      <SoftwareApplicationJsonLd
        name="MySaniTrace"
        description={meta('defaultDescription')}
        locale={locale}
      />
      <Hero />
      <TrustBar />
      <Problem />
      <Cycle />
      <Architecture />
      <Modules />
      <Comparison labelId="07" />
      <MultiLocation />
      <Adoption />
      <LocalAdvantage />
      <Implementation />
      <FinalCta labelId="12" />
    </>
  );
}
