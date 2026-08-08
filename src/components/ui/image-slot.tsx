import Image from 'next/image';
import { publicFileExists } from '@/lib/public-file';
import { cn } from '@/lib/utils';

/**
 * Every product visual on the site is a swappable slot, not a coded panel —
 * the screenshots are placeholders until the real product exists, and they will
 * be replaced through the CMS later.
 *
 * The slot holds its aspect ratio whether or not the file is present, so
 * dropping the final images in cannot shift the layout.
 *
 * Screens are dark-only on purpose: a dark product shot reads correctly on
 * both themes, which halves the asset set. See docs/IMAGE-BRIEF.md.
 *
 * No border or backing plate — the images carry their own edges, and a drawn
 * frame around them fought with the phone bezels and the photography. The
 * chamfer does the framing instead.
 */
export function ImageSlot({
  src,
  alt,
  ratio = '16 / 10',
  sizes = '(min-width: 1024px) 60vw, 100vw',
  priority = false,
  fit = 'cover',
  chamfer = true,
  className,
}: {
  src: string;
  alt: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /**
   * `contain` for assets whose own edges matter — a phone mockup carries its
   * bezel, and cropping even a couple of percent off the sides shaves it.
   */
  fit?: 'cover' | 'contain';
  /**
   * Off for assets that already have their own edge treatment (phone bezels)
   * or that sit inside another frame (a laptop lid). A prop rather than a
   * `[clip-path:none]` override: both are utilities, so tailwind-merge does
   * not treat them as conflicting and the chamfer survives.
   */
  chamfer?: boolean;
  className?: string;
}) {
  const exists = publicFileExists(src);

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        chamfer && 'chamfer-md',
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {exists ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={fit === 'contain' ? 'object-contain' : 'object-cover'}
        />
      ) : (
        <Placeholder src={src} ratio={ratio} />
      )}
    </div>
  );
}

/**
 * Paints its own dark surface and light-on-dark type rather than inheriting
 * theme tokens: the slot frame is dark in both themes, so theme-aware text
 * would disappear against it on the light theme.
 */
function Placeholder({ src, ratio }: { src: string; ratio: string }) {
  const filename = src.split('/').pop();

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#08090a] p-6 text-center"
      style={{
        backgroundImage:
          'radial-gradient(rgb(250 250 250 / 0.1) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <span className="font-mono text-label uppercase text-[#71717a]">
        [ asset pending ]
      </span>
      <span className="font-mono text-[0.8125rem] text-[#a1a1aa]">
        {filename}
      </span>
      <span className="font-mono text-[0.6875rem] text-[#71717a]">
        {ratio.replace(/\s/g, '')}
      </span>
    </div>
  );
}
