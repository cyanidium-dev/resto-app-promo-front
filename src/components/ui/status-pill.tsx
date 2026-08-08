import { cn } from '@/lib/utils';

type Status = 'ok' | 'warning' | 'violation';

/**
 * The ONLY place the semantic colour trio is allowed. Keeping compliance colour
 * locked to this component is what lets the cyan accent stay unambiguous as
 * "this is an action" everywhere else on the site.
 */
const styles: Record<Status, string> = {
  ok: 'border-ok/35 text-ok',
  warning: 'border-warning/35 text-warning',
  violation: 'border-violation/35 text-violation',
};

export function StatusPill({
  status,
  children,
  className,
}: {
  status: Status;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5',
        'font-mono text-[0.6875rem] uppercase tracking-wider',
        styles[status],
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}
