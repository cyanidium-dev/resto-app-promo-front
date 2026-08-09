import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/container';
import { Button, ButtonLink } from '@/components/ui/button';
import { DemoDialog } from '@/components/forms/demo-dialog';
import { ImageSlot } from '@/components/ui/image-slot';
import { LaptopFrame } from '@/components/ui/laptop-frame';
import { PhoneFrame } from '@/components/ui/phone-frame';
import { photos, screens } from '@/config/site';

/**
 * The hero is dark in both themes: it sits on kitchen photography, so its
 * text colours are hard-coded light values rather than theme tokens — a
 * token-driven hero would turn black-on-black when the light theme kicks in.
 */
export async function Hero() {
  const t = await getTranslations('home.hero');
  const t2 = await getTranslations('home.trust');
  const benefits = t.raw('benefits') as string[];
  const audiences = t2.raw('items') as string[];

  return (
    <section className="border-b border-border">
      {/* From lg up the photo band is locked to one viewport minus the sticky
          header, so the fold sits in the same place on every locale instead of
          moving with the length of the headline. SiteHeader publishes its own
          measured height as --header-h; the fallback covers the first paint,
          before that effect runs.
          It stays a minimum rather than a fixed height: on a short laptop the
          band grows to fit the copy rather than clipping it. */}
      {/* The band is also pulled up by the header height and padded back by the
          same amount, so the photograph runs under the floating header plate
          rather than starting below it. */}
      <div className="relative isolate flex flex-col justify-center overflow-hidden lg:-mt-[var(--header-h,4.5rem)] lg:min-h-svh lg:pt-[var(--header-h,4.5rem)]">
        {/* Plain kitchen photography, one file at every breakpoint. The
            three-way "kitchen dissolving into the UI" crop that sat here put a
            second interface behind a headline that already has a laptop and a
            phone under it, and the hero read as two product shots fighting.
            A quiet room behind the type does the job the photograph is for. */}
        <Image
          src={photos.kitchen}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />

        {/* One directional scrim, heavy on the left where the copy sits and
            releasing to 55% on the right so the room stays legible as a room.
            This source is ordinary photography, not the near-black split
            render, so it needs far more density than that crop did. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(100deg, rgb(6 7 8 / 0.95) 0%, rgb(6 7 8 / 0.88) 42%, rgb(6 7 8 / 0.55) 100%),' +
              'radial-gradient(ellipse 80% 60% at 15% -10%, rgb(34 211 238 / 0.16), transparent 60%)',
          }}
        />

        {/* From lg the block is centred in the band, so this padding is only
            the floor for short screens — keep it small or the copy stops
            fitting inside one viewport on a 1366×768 laptop. */}
        <Container className="pt-20 pb-16 md:pt-28 md:pb-24 lg:py-8">
          <p className="font-mono text-label uppercase text-[#7ee8f7]">
            {t('eyebrow')}
          </p>

          <h1 className="mt-6 max-w-3xl text-display font-bold text-[#fafafa]">
            {t('title')}
          </h1>

          <p className="mt-6 max-w-2xl text-body-lg text-[#c9ccd1]">
            {t('subtitle')}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <DemoDialog
              trigger={<Button size="lg">{t('primaryCta')}</Button>}
            />
            <ButtonLink href="/platform" size="lg" variant="onImage">
              {t('secondaryCta')}
            </ButtonLink>
          </div>

          <p className="mt-5 font-mono text-[0.8125rem] text-[#9aa0a6]">
            {t('microcopy')}
          </p>

          {/* Readout strip — the four claims as instrument labels rather than a
              row of icons in circles. */}
          <ul className="mt-14 grid grid-cols-2 gap-px border-t border-white/15 bg-white/15 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <li
                key={benefit}
                className="bg-[#08090a]/70 px-4 pt-4 pb-5 backdrop-blur-sm"
              >
                <span className="font-mono text-label text-[#7ee8f7]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-[0.9375rem] leading-snug text-[#fafafa]">
                  {benefit}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </div>

      {/* The product shot leaves the photo behind and sits on the page surface
          inside a device shell, so it reads as an interface being used rather
          than as a flat panel blending into the section. */}
      <div className="relative bg-bg pt-14 md:pt-20">
        <Container className="pb-16 md:pb-24">
          {/* Manager's view and the employee's view, arriving from opposite
              sides — the two halves of the product meeting in one frame.

              Side by side with a real gap rather than overlapping: the phone
              was covering the dashboard's data, which is the one thing this
              shot exists to show. The two widths are tuned so the devices come
              out the same height. Measured, not guessed: the laptop renders at
              0.621 × its width once the lid, hinge and base are added, and the
              phone at (w − 10px padding) × 2.167 + 10. 68% and 20% of the row
              solve to within a couple of pixels of each other.
              `items-end` keeps them standing on one line. */}
          <div className="mx-auto flex max-w-4xl items-end justify-center gap-5 sm:gap-7">
            <LaptopFrame className="slide-from-left w-[68%] max-w-[610px]">
              <ImageSlot
                src={screens.heroDashboard}
                alt={t('imageAlt')}
                ratio="16 / 10"
                sizes="(min-width: 1024px) 660px, 78vw"
                priority
                chamfer={false}
              />
            </LaptopFrame>

            <PhoneFrame className="slide-from-right w-[20%] max-w-[180px]">
              <ImageSlot
                src={screens.mobileChecklist}
                alt=""
                ratio="852 / 1846"
                sizes="186px"
                fit="contain"
                chamfer={false}
              />
            </PhoneFrame>
          </div>

          {/* Was a section of its own directly beneath the hero. It is one line
              of text, so a full section band around it bought nothing but a
              scroll stop. It stays in the light band rather than moving up into
              the photo: the dark band is locked to one viewport, and anything
              added there comes straight out of the headline's breathing room. */}
          <div className="mt-16 border-t border-border pt-8 md:mt-20">
            <h2 className="font-mono text-label uppercase text-text-subtle">
              {t2('title')}
            </h2>
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3">
              {audiences.map((item, index) => (
                <li key={item} className="flex items-center gap-3">
                  {index > 0 && (
                    <span aria-hidden className="text-text-subtle">
                      ·
                    </span>
                  )}
                  <span className="text-[0.9375rem] text-text-muted">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
