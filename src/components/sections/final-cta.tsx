import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { LeadForm } from '@/components/forms/lead-form';
import { photos } from '@/config/site';

/**
 * `labelId` is required rather than defaulted: this section is reused on every
 * page, and its number depends on where it lands in that page's sequence. A
 * default would silently keep whatever value happened to fit the homepage.
 */
export async function FinalCta({ labelId }: { labelId: string }) {
  const t = await getTranslations('home.finalCta');
  const f = await getTranslations('form');

  return (
    <section id="demo" className="section-y relative isolate overflow-hidden">
      <Image
        src={photos.catering}
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(260deg, rgb(6 7 8 / 0.96) 0%, rgb(6 7 8 / 0.9) 45%, rgb(6 7 8 / 0.6) 100%),' +
            'radial-gradient(ellipse 70% 60% at 85% 0%, rgb(34 211 238 / 0.14), transparent 60%)',
        }}
      />

      <Container>
        <SectionLabel id={labelId} tone="onImage">
          {t('label')}
        </SectionLabel>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-h1 font-bold text-[#fafafa]">{t('title')}</h2>
            <p className="mt-5 text-body-lg text-[#c9ccd1]">{t('intro')}</p>
            <p className="mt-10 border-t border-white/15 pt-6 font-mono text-[0.9375rem] text-[#7ee8f7]">
              {t('tagline')}
            </p>
          </div>

          {/* The form panel returns to theme tokens: it is an interface, and
              inputs need the same contrast rules as everywhere else. */}
          <div className="chamfer-md bg-bg p-6 md:p-8">
            <h3 className="text-h3">{f('title')}</h3>
            <p className="mt-2 mb-8 text-[0.9375rem] text-text-muted">
              {f('intro')}
            </p>
            <LeadForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
