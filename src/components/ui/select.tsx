'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * A native <select> renders its popup through the OS, which cannot be styled —
 * on the dark theme it came out as a white sheet with unreadable grey items.
 * Radix gives a real listbox we own the markup of, so the panel follows the
 * site's tokens and chamfer language and stays keyboard- and screen-reader
 * accessible.
 */
export function Select({
  value,
  onValueChange,
  placeholder,
  options,
  id,
  invalid,
  className,
}: {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
  id?: string;
  invalid?: boolean;
  className?: string;
}) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <div className="tech-field" data-invalid={invalid ? 'true' : undefined}>
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={invalid}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-2 bg-transparent px-3',
            'text-body text-text outline-none data-[placeholder]:text-text-subtle',
            className,
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              className="size-4 shrink-0 text-text-subtle transition-transform duration-200"
              aria-hidden
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      </div>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            'chamfer-sm z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden',
            'border border-border-strong bg-surface',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0',
          )}
        >
          <SelectPrimitive.Viewport className="p-1">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className={cn(
                  'relative flex cursor-pointer select-none items-center justify-between gap-3',
                  'px-3 py-2.5 text-[0.9375rem] text-text-muted outline-none',
                  'data-[highlighted]:bg-accent-subtle data-[highlighted]:text-text',
                  'data-[state=checked]:text-text',
                )}
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator asChild>
                  <Check className="size-4 shrink-0 text-accent" aria-hidden />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
