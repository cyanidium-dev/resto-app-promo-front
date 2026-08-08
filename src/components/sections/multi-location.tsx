import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { ImageSlot } from '@/components/ui/image-slot';
import { LaptopFrame } from '@/components/ui/laptop-frame';
import { screens } from '@/config/site';

type Item = { title: string; text: string };

export async function MultiLocation() {
  const t = await getTranslations('home.multiLocation');
  const items = t.raw('items') as Item[];

  return (
    <section className="section-y relative isolate border-b border-border">
      <Atmosphere variant="glow" glow="center" />
      <Container>
        <SectionLabel id="08">{t('label')}</SectionLabel>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
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

          <LaptopFrame className="lg:sticky lg:top-24">
            <ImageSlot
              src={screens.multiLocation}
              alt={t('imageAlt')}
              ratio="16 / 10"
              sizes="(min-width: 1024px) 560px, 100vw"
              chamfer={false}
            />
          </LaptopFrame>
        </div>
      </Container>
    </section>
  );
}
