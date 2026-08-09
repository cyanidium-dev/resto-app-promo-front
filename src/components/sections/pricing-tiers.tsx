import { getTranslations } from 'next-intl/server';
import { Check } from 'lucide-react';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { Button } from '@/components/ui/button';
import { DemoDialog } from '@/components/forms/demo-dialog';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { pricingPlaceholder, type PricingTierId } from '@/config/site';
import type { AppPathname, Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type Tier = {
  id: PricingTierId;
  name: string;
  audience: string;
  features: string[];
};

/**
 * Shared by the homepage and /pricing, so the two can never quote different
 * numbers. The figures come from `pricingPlaceholder` in config, which is
 * where the "replace before launch" warning lives — this component deliberately
 * has no fallback for a missing price, so a bad tier id fails the build rather
 * than rendering an empty card.
 *
 * The middle tier carries the emphasis: a full-strength border and the
 * "most chosen" flag, no accent fill. The accent is reserved for CTAs, and
 * three cards competing for it would flatten the hierarchy the flag creates.
 *
 * `lead` makes this block open a page instead of sitting inside one. /pricing
 * used to stack a PageHero on top of it, and the two repeated the same intro
 * paragraph verbatim two hundred pixels apart, under two headings that said
 * the same thing. The block absorbs the hero's jobs — breadcrumbs, the h1 and
 * the run-up under the floating header — rather than being introduced by one.
 */
export async function PricingTiers({
  labelId,
  lead,
}: {
  labelId: string;
  lead?: { page: AppPathname; locale: Locale };
}) {
  const t = await getTranslations('pages.pricing');
  const tiers = t.raw('tiers') as Tier[];
  const { currency, monthlyPerLocation, setupFrom } = pricingPlaceholder;
  const Heading = lead ? 'h1' : 'h2';

  return (
    <section
      className={cn(
        'relative isolate border-b border-border',
        /* Explicit padding rather than `section-y` in the lead case: the
           pull-up needs its own padding-top, and a longhand override of the
           utility's padding-block shorthand is decided by stylesheet order. */
        lead
          ? 'pt-8 pb-16 md:pt-10 md:pb-20 lg:-mt-[var(--header-h,4.5rem)] lg:pt-[calc(var(--header-h,4.5rem)+4rem)] lg:pb-24'
          : 'section-y',
      )}
    >
      <Atmosphere
        variant={lead ? 'both' : 'glow'}
        glow={lead ? 'tl' : 'bl'}
        grid="top"
      />
      <Container>
        {lead && (
          <div className="mb-8">
            <Breadcrumbs
              page={lead.page}
              label={t('label')}
              locale={lead.locale}
            />
          </div>
        )}

        {/* Leading the page, the label names the page; inside one, it names
            the block. */}
        <SectionLabel id={labelId}>
          {lead ? t('label') : t('tiersLabel')}
        </SectionLabel>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <Heading className="text-h1 font-bold">
            {lead ? t('title') : t('tiersTitle')}
          </Heading>
          <p className="text-body-lg text-text-muted lg:pt-2">{t('intro')}</p>
        </div>

        <ul className="mt-14 grid gap-px border border-border bg-border lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const featured = index === 1;

            return (
              <li
                key={tier.id}
                className={cn(
                  'flex flex-col bg-bg p-7 md:p-8',
                  featured && 'lg:bg-band',
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-mono text-label uppercase text-text-subtle">
                    {tier.name}
                  </h3>
                  {featured && (
                    <span className="font-mono text-label uppercase text-accent">
                      {t('popular')}
                    </span>
                  )}
                </div>

                <p className="mt-1.5 text-[0.9375rem] text-text-muted">
                  {tier.audience}
                </p>

                {/* Tabular figures keep the three prices on the same optical
                    baseline; without them the currency glyph drifts. */}
                <p className="mt-7 flex items-baseline gap-1.5">
                  <span className="font-display text-[2.5rem] leading-none font-bold tracking-tight">
                    {monthlyPerLocation[tier.id]}
                  </span>
                  <span className="text-h3 text-text-muted">{currency}</span>
                </p>
                <p className="mt-2 font-mono text-[0.8125rem] text-text-subtle">
                  {t('perLocation')}
                </p>

                <ul className="mt-8 flex-1 border-t border-border">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 border-b border-border py-3.5"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-text-subtle"
                        strokeWidth={2}
                        aria-hidden
                      />
                      <span className="text-[0.9375rem] leading-snug text-text-muted">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <DemoDialog
                    trigger={
                      <Button
                        variant={featured ? 'primary' : 'secondary'}
                        size="lg"
                        className="w-full"
                      >
                        {t('tierCta')}
                      </Button>
                    }
                  />
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-2xl border-l-2 border-text pl-5 text-body-lg text-text-muted">
          {t('setupNote', { price: `${setupFrom} ${currency}` })}
        </p>
      </Container>
    </section>
  );
}
