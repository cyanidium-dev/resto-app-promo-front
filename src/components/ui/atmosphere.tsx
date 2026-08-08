import { cn } from '@/lib/utils';

/**
 * Decorative background layer for a section: technical grid, cyan glow, or both.
 *
 * Renders as a child rather than as classes on the section itself for two
 * reasons. The grid needs `mask-image` to fade at its edges, and a mask on the
 * section would clip its headings and copy too. And a negative-z-index child
 * paints above the parent's own background but below its content, which is
 * exactly the layering an atmosphere layer needs.
 *
 * `glow` and `grid` take placements on purpose: repeating one wash in one
 * corner down the whole page makes the sections read as the same block
 * duplicated. Neighbouring sections should never share a placement.
 *
 * The parent must carry `relative isolate`.
 */
export type GlowPlacement = 'tl' | 'tr' | 'bl' | 'br' | 'center';
export type GridPlacement = 'top' | 'left' | 'right';

const glowClass: Record<GlowPlacement, string> = {
  tl: 'atmos-glow-tl',
  tr: 'atmos-glow-tr',
  bl: 'atmos-glow-bl',
  br: 'atmos-glow-br',
  center: 'atmos-glow-center',
};

const gridClass: Record<GridPlacement, string> = {
  top: 'atmos-grid',
  left: 'atmos-grid-left',
  right: 'atmos-grid-right',
};

export function Atmosphere({
  variant = 'grid',
  glow = 'tl',
  grid = 'top',
  className,
}: {
  variant?: 'grid' | 'glow' | 'both';
  glow?: GlowPlacement;
  grid?: GridPlacement;
  className?: string;
}) {
  return (
    <>
      {(variant === 'glow' || variant === 'both') && (
        <div
          aria-hidden
          className={cn(
            glowClass[glow],
            'pointer-events-none absolute inset-0 -z-10',
            className,
          )}
        />
      )}
      {(variant === 'grid' || variant === 'both') && (
        <div
          aria-hidden
          className={cn(
            gridClass[grid],
            'pointer-events-none absolute inset-0 -z-10',
            className,
          )}
        />
      )}
    </>
  );
}
