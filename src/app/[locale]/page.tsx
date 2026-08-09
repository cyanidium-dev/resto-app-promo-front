import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { buildAlternates } from '@/lib/metadata';
import {
  OrganizationJsonLd,
  SoftwareApplicationJsonLd,
} from '@/components/seo/json-ld';
import { Hero } from '@/components/sections/hero';
import { Problem } from '@/components/sections/problem';
import { Cycle } from '@/components/sections/cycle';
import { Architecture } from '@/components/sections/architecture';
import { Modules } from '@/components/sections/modules';
import { MultiLocation } from '@/components/sections/multi-location';
import { Adoption } from '@/components/sections/adoption';
import { PricingTiers } from '@/components/sections/pricing-tiers';
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
      {/* Eight sections after the hero, down from twelve. The trust list now
          closes the hero, the comparison ledger closes Problem, local advantage
          closes Adoption, and the implementation steps moved to /pricing, which
          is the page where anyone reading about rollout has already landed. */}
      <Hero />
      <Problem />
      <Cycle />
      <Architecture />
      <Modules limit={6} />
      <MultiLocation />
      <Adoption />
      <PricingTiers labelId="07" />
      <FinalCta labelId="08" />
    </>
  );
}
