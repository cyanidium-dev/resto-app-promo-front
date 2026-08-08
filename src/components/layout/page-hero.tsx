import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { Reveal } from '@/components/ui/reveal';
import type { AppPathname, Locale } from '@/i18n/routing';

export function PageHero({
  label,
  title,
  intro,
  page,
  breadcrumbLabel,
  locale,
  children,
}: {
  label: string;
  title: string;
  intro?: string;
  page?: AppPathname;
  breadcrumbLabel?: string;
  locale?: Locale;
  children?: React.ReactNode;
}) {
  /* Pulled up under the floating header and padded back by the same amount, so
     the grid and glow run behind the plate instead of starting below it and
     leaving a blank band at the top of the page. lg only — below that the
     header is solid and flush, so there is nothing to run under. */
  return (
    <section className="relative isolate border-b border-border lg:-mt-[var(--header-h,4.5rem)]">
      <Atmosphere variant="both" glow="tl" grid="top" />
      {/* +4rem, not +2rem: the pull-up is exactly the header height, so the
          padding past it is the entire visible gap. At +2rem that left 16px
          between a floating plate and the breadcrumbs, which read as a
          collision. */}
      <Container className="pt-8 pb-16 md:pt-10 md:pb-20 lg:pt-[calc(var(--header-h,4.5rem)+4rem)]">
        {page && breadcrumbLabel && locale && (
          <div className="mb-8">
            <Breadcrumbs page={page} label={breadcrumbLabel} locale={locale} />
          </div>
        )}
        <SectionLabel id="00">{label}</SectionLabel>
        {/* immediate: a page hero is always above the fold, so it must never
            depend on a scroll trigger to become visible. */}
        <Reveal immediate>
          <h1 className="mt-10 max-w-3xl text-h1 font-bold">{title}</h1>
        </Reveal>
        {intro && (
          <Reveal immediate delay={0.08}>
            <p className="mt-5 max-w-2xl text-body-lg text-text-muted">
              {intro}
            </p>
          </Reveal>
        )}
        {children && <div className="mt-9">{children}</div>}
      </Container>
    </section>
  );
}
