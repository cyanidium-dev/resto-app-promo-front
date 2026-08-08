import { cn } from '@/lib/utils';

/**
 * Scroll reveal. Small rise, long ease-out.
 *
 * CSS, not JS, and a server component — no hydration, no bundle cost, and
 * crucially no way for the copy to end up stranded at opacity 0 if a client
 * library fails to take over. On browsers with scroll-driven timelines the
 * rise is tied to the element entering the viewport; everywhere else it plays
 * on load, which is a fine downgrade because the end state is visible either
 * way.
 *
 * `immediate` opts out of the scroll trigger for content above the fold.
 *
 * `prefers-reduced-motion` is handled globally in globals.css, which collapses
 * animation durations to ~0 — the `both` fill still leaves the end state
 * applied, so nothing disappears.
 */
export function Reveal({
  children,
  delay = 0,
  immediate = false,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  immediate?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(immediate ? 'reveal' : 'reveal-scroll', className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
