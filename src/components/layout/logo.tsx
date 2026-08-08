import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/* Source lockup is 600x133 (4.51:1) with the tagline, and the same box with
   the tagline erased for the compact version — the shield extends below the
   wordmark, so the tagline could not simply be cropped off. */
const RATIO = 600 / 133;

const sizes = {
  sm: 26,
  md: 30,
  lg: 40,
} as const;

/**
 * Two files per lockup rather than a CSS filter.
 *
 * The supplied artwork is white type with a cyan mark, drawn for a dark
 * background. `invert()` would flip the cyan to orange, and `brightness(0)`
 * would throw the brand colour away entirely — so the light-theme file is a
 * recolour that maps only the near-white pixels to near-black and leaves the
 * cyan alone.
 */
export function Logo({
  className,
  size = 'md',
  variant = 'compact',
  asLink = true,
}: {
  className?: string;
  size?: keyof typeof sizes;
  /** `full` keeps the SAFETY · CONTROL · TRUST tagline. */
  variant?: 'compact' | 'full';
  asLink?: boolean;
}) {
  const height = sizes[size];
  const width = Math.round(height * RATIO);
  const base = variant === 'full' ? 'logo-full' : 'logo';

  const mark = (
    <>
      <Image
        src={`/images/brand/${base}-light.png`}
        alt={siteConfig.name}
        width={width}
        height={height}
        priority
        className="block dark:hidden"
      />
      <Image
        src={`/images/brand/${base}-dark.png`}
        alt=""
        aria-hidden
        width={width}
        height={height}
        priority
        className="hidden dark:block"
      />
    </>
  );

  if (!asLink) {
    return <span className={cn('inline-flex', className)}>{mark}</span>;
  }

  return (
    <Link
      href="/"
      aria-label={siteConfig.name}
      className={cn('inline-flex rounded-sm', className)}
    >
      {mark}
    </Link>
  );
}
