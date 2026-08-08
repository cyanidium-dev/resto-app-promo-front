import { cn } from '@/lib/utils';

/**
 * Phone shell drawn in markup, wrapping a screenshot slot.
 *
 * The generated mockups each bake in their own bezel, and the two renders do
 * not agree: one silhouette is square-cornered, the other rounded. Matching a
 * border-radius to that geometry is a losing game — too small leaves the
 * asset's square corners showing, too large shaves its bezel, and the right
 * number differs per file and changes whenever an asset is regenerated.
 *
 * So nothing is clipped off the asset. The frame supplies its own rounded
 * corner and a few pixels of near-black padding; because the baked-in bezels
 * are also near-black they melt into it, and both phones end up with the same
 * outer silhouette whatever the render did. The hairline inner ring is what
 * keeps the device readable as an object on the light theme.
 */
export function PhoneFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[26px] p-[5px]',
        // The body is an object, so it takes the theme the way a real device
        // would: a light chassis on the light theme, a dark one on the dark.
        // The inner ring keeps its edge readable against either page surface.
        'bg-[#d4d4d8] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]',
        'dark:bg-[#0a0b0d] dark:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)]',
        className,
      )}
    >
      <div className="overflow-hidden rounded-[21px]">{children}</div>
    </div>
  );
}
