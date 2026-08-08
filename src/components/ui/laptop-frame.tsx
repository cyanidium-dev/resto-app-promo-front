import { cn } from '@/lib/utils';

/**
 * Laptop shell drawn in markup, wrapping a swappable screenshot slot.
 *
 * Built as chrome rather than baked into the image for two reasons: the
 * screenshot inside stays a one-line swap when the real assets arrive, and a
 * generated bitmap mockup would carry its own lighting and perspective that
 * fights the flat, straight-on look of the rest of the site.
 *
 * Deliberately dark in both themes — a device is an object, not a surface, so
 * it should not repaint itself when the page theme flips.
 */
export function LaptopFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative', className)}>
      {/* The taper comes from narrowing the lid rather than widening the base:
          a base wider than its wrapper pushes past the container padding and
          gives the whole page a horizontal scrollbar. */}
      <div className="relative mx-auto w-[93%] rounded-t-[12px] border border-b-0 border-[#3f4247] bg-[#1b1d21] p-[6px] pb-[7px] shadow-[inset_0_1px_0_rgb(255_255_255/0.06)] md:p-2.5 md:pb-3">
        {/* Camera dot */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-[2px] flex justify-center md:top-1"
        >
          <span className="size-[3px] rounded-full bg-[#3f4247]" />
        </div>
        <div className="overflow-hidden rounded-[2px] bg-[#08090a]">
          {children}
        </div>
      </div>

      {/* Hinge */}
      <div
        aria-hidden
        className="mx-auto h-[3px] w-[96%] bg-[#2a2d31]"
      />

      {/* Base: wider than the lid and tapering, which is what reads as a
          laptop rather than a framed picture. */}
      <div
        aria-hidden
        className="h-[10px] w-full md:h-[14px]"
        style={{
          background: 'linear-gradient(to bottom, #303339 0%, #1b1d21 100%)',
          clipPath: 'polygon(0 0, 100% 0, 98.5% 100%, 1.5% 100%)',
        }}
      >
        {/* Thumb groove */}
        <span className="absolute left-1/2 top-0 h-[3px] w-16 -translate-x-1/2 rounded-b-full bg-[#131417] md:w-24" />
      </div>
    </div>
  );
}
