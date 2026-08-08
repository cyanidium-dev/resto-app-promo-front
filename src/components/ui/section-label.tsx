import { cn } from '@/lib/utils';

/**
 * The site's connective tissue: every section is labelled like a readout on an
 * instrument panel. Deliberately monochrome — the accent colour is reserved for
 * CTAs and active states, so it never appears here.
 */
export function SectionLabel({
  id,
  children,
  className,
  tone = 'default',
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** `onImage` for sections sitting on photography, where tokens lose contrast. */
  tone?: 'default' | 'onImage';
}) {
  const onImage = tone === 'onImage';

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span
        className={cn(
          'font-mono text-label uppercase whitespace-nowrap',
          onImage ? 'text-[#9aa0a6]' : 'text-text-subtle',
        )}
      >
        [ {id} / {children} ]
      </span>
      <span
        aria-hidden
        className={cn('h-px flex-1', onImage ? 'bg-white/15' : 'bg-border')}
      />
    </div>
  );
}
