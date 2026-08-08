import type { ComponentProps } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'onImage';
type Size = 'md' | 'lg';

/**
 * Chamfered "tech" button — the corner cuts, the two-layer edge/fill and the
 * tracked uppercase label all live in globals.css under `.tech-btn`, because
 * clip-path cannot be expressed with border utilities.
 *
 * `onImage` exists for CTAs sitting over photography, where theme tokens have
 * no guaranteed contrast.
 */
export function buttonClasses({
  className,
}: { className?: string } = {}) {
  return cn('tech-btn', className);
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<'button'> & ButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      className={buttonClasses({ className })}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonProps) {
  return (
    <Link
      data-variant={variant}
      data-size={size}
      className={buttonClasses({ className })}
      {...props}
    />
  );
}
