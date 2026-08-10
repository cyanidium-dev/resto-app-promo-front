'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

/**
 * Cross-fades the page between themes.
 *
 * next-themes swaps a class on <html> and every colour in the document changes
 * in one frame. The provider was additionally running `disableTransitionOnChange`,
 * which suppresses transitions outright, so the flip was as hard as it gets.
 *
 * The obvious fix — a permanent colour transition on everything — is worse than
 * the problem: every hover, focus and active state on the site would then take
 * a second to settle. So the transition is gated behind an attribute that only
 * exists while a swap is in flight. Outside that window the CSS does not apply
 * and interaction states keep their own timings.
 *
 * The timeout is the single source of truth for how long the attribute lives;
 * the duration it is paired with lives in globals.css as `--theme-swap`. Keep
 * the two in step, or the attribute is removed mid-fade and colours jump.
 */
const SWAP_MS = 1000;

export function ThemeTransition() {
  const { resolvedTheme } = useTheme();
  const previous = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (!resolvedTheme) return;

    // First resolved value is the initial paint, not a swap.
    if (previous.current === undefined) {
      previous.current = resolvedTheme;
      return;
    }
    if (previous.current === resolvedTheme) return;
    previous.current = resolvedTheme;

    const root = document.documentElement;
    root.setAttribute('data-theme-swap', '');
    const timer = window.setTimeout(
      () => root.removeAttribute('data-theme-swap'),
      SWAP_MS,
    );

    return () => window.clearTimeout(timer);
  }, [resolvedTheme]);

  return null;
}
