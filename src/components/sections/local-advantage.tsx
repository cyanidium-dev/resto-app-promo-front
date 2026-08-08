import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { ImageSlot } from '@/components/ui/image-slot';
import { photos } from '@/config/site';

type Item = { title: string; text: string };

/**
 * Promoted from a footnote in the client's copy deck. Local presence is the
 * one thing FoodDocs and Operandio cannot match, so it gets a section rather
 * than a parenthetical at the end.
 */
export async function LocalAdvantage() {
  const t = await getTranslations('home.local');
  const items = t.raw('items') as Item[];

  return (
    <section className="section-y border-b border-border">
      <Container>
        <SectionLabel id="10">{t('label')}</SectionLabel>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <ImageSlot
            src={photos.kitchen}
            alt={t('imageAlt')}
            ratio="3 / 2"
            sizes="(min-width: 1024px) 560px, 100vw"
          />

          <div>
            <h2 className="text-h1 font-bold">{t('title')}</h2>
            <p className="mt-5 text-body-lg text-text-muted">{t('intro')}</p>

            <ul className="mt-10 border-t border-border">
              {items.map((item) => (
                <li key={item.title} className="border-b border-border py-5">
                  <h3 className="text-[1.0625rem] font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
