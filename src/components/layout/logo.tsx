import Image from 'next/image';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';

/* Source lockup is 770x194 (3.97:1): shield, wordmark and the "Trace safety.
   Ensure quality." line, cut off the white it was supplied on. The compact
   pair currently points at the same artwork — the tagline sits hard against
   the descender of the "y", so it cannot be masked off without clipping the
   letter, and neither call site asks for compact today. */
const RATIO = 770 / 194;

/* Sized so the tagline still resolves. The lockup is ~4.5:1 with the tagline
   occupying the bottom sixth, so anything under ~32px tall turns it into a
   grey smear. */
const sizes = {
  sm: 30,
  md: 36,
  lg: 46,
} as const;

/**
 * Two files per lockup rather than a CSS filter.
 *
 * The supplied artwork is blue-into-cyan type, drawn for white paper. On the
 * near-black theme its blue end falls to 3.3:1, so the dark-theme file has its
 * channels scaled up rather than blended toward white: blending desaturates,
 * which would pull the blue and the cyan toward one pale grey and flatten the
 * gradient the wordmark is built on. Scaling lifts it to 4.3:1 and leaves hue
 * and saturation where the brand put them.
 *
 * Both files sit in the DOM with CSS deciding which shows, because the theme
 * is only known on the client. Neither is marked `priority`: they are small,
 * and preloading two logos would compete with the hero image for the LCP.
 */
export function Logo({
  className,
  size = 'md',
  asLink = true,
}: {
  className?: string;
  size?: keyof typeof sizes;
  asLink?: boolean;
}) {
  const height = sizes[size];
  const width = Math.round(height * RATIO);

  const mark = (
    <>
      <Image
        src="/images/brand/logo-lockup-light.png"
        alt={siteConfig.name}
        width={width}
        height={height}
        className="block dark:hidden"
      />
      <Image
        src="/images/brand/logo-lockup-dark.png"
        alt=""
        aria-hidden
        width={width}
        height={height}
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
