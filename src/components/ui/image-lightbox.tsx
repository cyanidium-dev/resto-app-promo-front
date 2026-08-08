'use client';

import { useState } from 'react';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export type LightboxItem = {
  src: string;
  alt: string;
  ratio?: string;
};

/**
 * A grid of images that opens into a zoomable lightbox.
 *
 * Screenshots are the point of this page — the visitor wants to read the
 * interface, and at grid size the numbers and labels are unreadable. Opening
 * full-size is the whole reason the gallery exists.
 */
export function ImageLightboxGrid({
  items,
  className,
  itemClassName,
}: {
  items: LightboxItem[];
  className?: string;
  itemClassName?: string;
}) {
  const ui = useTranslations('ui');
  const [index, setIndex] = useState(-1);

  return (
    <>
      <ul className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}>
        {items.map((item, i) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`${ui('openImage')}: ${item.alt}`}
              className={cn(
                'chamfer-md group relative block w-full overflow-hidden bg-[#08090a]',
                'transition-transform duration-500 ease-out hover:scale-[1.015]',
                itemClassName,
              )}
              style={{ aspectRatio: item.ratio ?? '16 / 10' }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={items.map((item) => ({ src: item.src, alt: item.alt }))}
        plugins={[Zoom]}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: 'rgba(8, 9, 10, 0.94)' } }}
        animation={{ fade: 300, swipe: 400 }}
      />
    </>
  );
}
