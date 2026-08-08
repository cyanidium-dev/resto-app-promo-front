import type { Variants } from 'motion/react';

/**
 * Shared motion variants.
 *
 * Deliberately small movements and slow-out easing: on a site selling
 * operational control, motion should read as composure, not as a showreel.
 * Anything that delays reading the content is not worth the frame budget.
 *
 * Reduced motion is handled globally — globals.css collapses every transition
 * and animation duration under `prefers-reduced-motion`.
 */
const ease = [0.16, 1, 0.3, 1] as const;

export function fadeIn({ delay = 0 } = {}): Variants {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, delay, ease },
    },
  };
}

export function fadeUp({ delay = 0, distance = 16 } = {}): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease },
    },
  };
}

export function staggerChildren({ delay = 0, stagger = 0.07 } = {}): Variants {
  return {
    hidden: {},
    visible: {
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };
}

/** Standard viewport trigger — fires once, slightly before the block is fully in. */
export const inView = { once: true, amount: 0.15 } as const;
