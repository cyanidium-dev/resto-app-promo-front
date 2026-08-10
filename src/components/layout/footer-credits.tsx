import Image from 'next/image';

import { credits } from '@/config/site';

/**
 * "Created by" watermark, matching the treatment used in the nbyg footer:
 * a small uppercase label with the two studio logos stacked beside it, each
 * easing in as the footer scrolls into view.
 */
export function FooterCredits() {
  return (
    <div className="reveal-scroll flex flex-col items-center md:flex-row">
      <p className="mb-2 font-mono text-[0.6875rem] font-medium uppercase tracking-wider text-text-subtle md:mb-0 md:mr-6">
        Created by
      </p>

      {/* Side by side on phones, stacked from md up. Stacking two logos on a
          375px screen cost ~60px of a footer that was already too tall. */}
      <div className="flex items-center gap-5 md:flex-col md:items-start md:gap-1">
        <a
          href={credits.webBond.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="inline-block rounded-sm py-1 transition-opacity duration-300 hover:opacity-80"
        >
          {/* Same problem as the CodeSite mark below: the artwork is white on
              transparent, drawn for a dark footer, so on the light theme it
              was white-on-near-white and effectively invisible. Invert on
              light, leave alone on dark. */}
          <Image
            src={credits.webBond.logo}
            alt="WebBond"
            width={96}
            height={32}
            className="invert dark:invert-0"
          />
        </a>

        <a
          href={credits.codeSite.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-sm transition-opacity duration-300 hover:opacity-80"
        >
          {/* The source SVG is filled white throughout — it was drawn for a
              dark footer. So it needs inverting on the LIGHT theme and left
              alone on the dark one, not the other way round. */}
          <Image
            src={credits.codeSite.logo}
            alt="CodeSite"
            width={126}
            height={24}
            className="invert dark:invert-0"
          />
        </a>
      </div>
    </div>
  );
}
