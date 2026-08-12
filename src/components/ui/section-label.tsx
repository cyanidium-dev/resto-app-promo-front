import { cn } from '@/lib/utils';

/**
 * The site's connective tissue: every section is labelled like a readout on an
 * instrument panel.
 *
 * Set in the second accent, the logo's blue. These labels are the clearest case
 * of what that colour is for — they name the structure of the page and are not
 * interactive, so they carry brand colour without ever being mistaken for
 * something to click. Cyan stays with the buttons.
 *
 * `tone` is gone: it existed for labels sitting on photography, back when the
 * hero and the closing CTA were dark in both themes and hard-coded their own
 * light values. Both scrims follow the theme now, so the tokens hold.
 */
export function SectionLabel({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span className="font-mono text-label whitespace-nowrap text-accent-2 uppercase">
        [ {id} / {children} ]
      </span>
      <span aria-hidden className="h-px flex-1 bg-border" />
    </div>
  );
}
