import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { cn } from '@/lib/utils';

type Row = { without: string; with: string };

/**
 * The ledger itself, split out from the section wrapper: the homepage folds it
 * into the problem section, /solutions still runs it as a section of its own.
 * The two columns are separated by a hard rule, and the contrast between muted
 * and full-strength text carries the argument. No accent colour and no
 * compliance colours — the typographic weight does the work, which is what
 * keeps it from reading as a marketing "before/after" cliché.
 */
export async function ComparisonTable({ className }: { className?: string }) {
  const t = await getTranslations('home.comparison');
  const rows = t.raw('rows') as Row[];

  return (
    <div className={cn('overflow-x-auto border border-border bg-bg', className)}>
      <table className="w-full min-w-[34rem] border-collapse text-left">
        <caption className="sr-only">{t('title')}</caption>
        <thead>
          <tr className="border-b border-border">
            <th
              scope="col"
              className="w-12 px-4 py-4 font-mono text-label font-normal text-text-subtle"
            >
              <span className="sr-only">#</span>
            </th>
            <th
              scope="col"
              className="px-4 py-4 font-mono text-label font-normal uppercase text-text-subtle"
            >
              {t('withoutTitle')}
            </th>
            <th
              scope="col"
              className="border-l-2 border-text px-6 py-4 font-mono text-label font-medium uppercase text-text"
            >
              {t('withTitle')}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.with} className="border-b border-border last:border-b-0">
              <td className="px-4 py-4 align-top font-mono text-label text-text-subtle">
                {String(index + 1).padStart(2, '0')}
              </td>
              <td className="px-4 py-4 align-top text-[0.9375rem] text-text-subtle">
                {row.without}
              </td>
              <td className="border-l-2 border-text bg-band px-6 py-4 align-top text-[0.9375rem] font-medium text-text">
                {row.with}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Standalone section. Used on /solutions; the homepage embeds the table instead. */
export async function Comparison({ labelId }: { labelId: string }) {
  const t = await getTranslations('home.comparison');

  return (
    <section className="section-y relative isolate border-b border-border bg-band">
      <Atmosphere variant="glow" glow="tr" />
      <Container>
        <SectionLabel id={labelId}>{t('label')}</SectionLabel>

        <h2 className="mt-10 max-w-2xl text-h1 font-bold">{t('title')}</h2>

        <ComparisonTable className="mt-12" />
      </Container>
    </section>
  );
}
