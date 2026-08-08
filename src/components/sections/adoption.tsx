import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { SectionLabel } from '@/components/ui/section-label';
import { Atmosphere } from '@/components/ui/atmosphere';
import { ImageSlot } from '@/components/ui/image-slot';
import { PhoneFrame } from '@/components/ui/phone-frame';
import { screens } from '@/config/site';

type Item = { title: string; text: string };

/**
 * Not in the client's copy deck, added deliberately: "my staff won't use it"
 * is the first objection every HoReCa manager raises, and nothing in the
 * original 15 sections addressed it.
 */
export async function Adoption() {
  const t = await getTranslations('home.adoption');
  const items = t.raw('items') as Item[];

  return (
    <section className="section-y relative isolate border-b border-border bg-band">
      <Atmosphere variant="both" glow="tr" grid="left" />
      <Container>
        <SectionLabel id="09">{t('label')}</SectionLabel>

        <div className="mt-10 grid items-start gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div>
            <h2 className="max-w-xl text-h1 font-bold">{t('title')}</h2>
            <p className="mt-5 max-w-xl text-body-lg text-text-muted">
              {t('intro')}
            </p>

            <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.title} className="bg-bg p-6">
                  <h3 className="text-[1.0625rem] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Exact source ratios rather than a shared 9/19.5: the two renders
              came out slightly different, and a shared ratio shaved the bezel
              off one of them. `contain` keeps it that way if the assets are
              ever regenerated at another size. PhoneFrame supplies the outer
              corner so neither asset gets clipped. */}
          {/* items-start is load-bearing: flex stretches children to the row
              height by default, and the second phone's mt-10 offset made that
              row taller than the first phone, padding it out with ~33px of
              dead space under the screenshot. */}
          <div className="flex items-start gap-4 justify-self-center lg:justify-self-end">
            <PhoneFrame className="w-[150px] shrink-0 sm:w-[180px]">
              <ImageSlot
                src={screens.mobileChecklist}
                alt={t('imageAlt')}
                ratio="852 / 1846"
                sizes="180px"
                fit="contain"
                chamfer={false}
              />
            </PhoneFrame>
            <PhoneFrame className="mt-10 w-[150px] shrink-0 sm:w-[180px]">
              <ImageSlot
                src={screens.mobileTemperature}
                alt=""
                ratio="862 / 1825"
                sizes="180px"
                fit="contain"
                chamfer={false}
              />
            </PhoneFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
