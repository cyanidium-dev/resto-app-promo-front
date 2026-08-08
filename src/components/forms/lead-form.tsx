'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { AlertCircle } from 'lucide-react';

import { Link, useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { siteConfig } from '@/config/site';
import { createLeadSchema, locationBuckets, type LeadInput } from '@/lib/lead-schema';
import { cn } from '@/lib/utils';

/* The chamfered edge is drawn by the `.tech-field` wrapper, so the control
   itself is transparent and borderless — a real border would be sliced flat
   across the corner cuts. */
const fieldClasses =
  'h-11 w-full bg-transparent px-3 text-body text-text ' +
  'placeholder:text-text-subtle outline-none';

/**
 * Strips anything that cannot appear in a phone number as it is typed, and
 * allows `+` only in the leading position.
 *
 * Validation alone was not enough: it runs on blur, so the visitor could fill
 * the field with letters and only find out after leaving it. Rejecting the
 * keystroke is the clearer signal.
 *
 * The caret is restored by hand — rewriting `value` otherwise sends it to the
 * end of the field, which makes editing the middle of a number impossible.
 */
function sanitisePhoneInput(el: HTMLInputElement) {
  const before = el.value;
  const cleaned = before
    .replace(/[^\d+()\s-]/g, '')
    .replace(/(?!^)\+/g, '');

  if (cleaned === before) return;

  const caret = el.selectionStart ?? cleaned.length;
  const removed = before.length - cleaned.length;
  el.value = cleaned;
  const next = Math.max(0, caret - removed);
  el.setSelectionRange(next, next);
}

export function LeadForm() {
  const t = useTranslations('form');
  const locale = useLocale();
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = createLeadSchema({
    name: t('errors.name'),
    company: t('errors.company'),
    phone: t('errors.phone'),
    email: t('errors.email'),
    consent: t('errors.consent'),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(schema),
    // Validate when a field is left rather than only on submit: the visitor
    // finds out about a bad phone number while still looking at it.
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: { locale },
  });

  // Attribution is read on the client because it lives in the URL and the
  // referrer, neither of which the server sees on a static page.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setValue('page', window.location.pathname);
    setValue('referrer', document.referrer || undefined);
    setValue('utmSource', params.get('utm_source') ?? undefined);
    setValue('utmMedium', params.get('utm_medium') ?? undefined);
    setValue('utmCampaign', params.get('utm_campaign') ?? undefined);
    setValue('utmContent', params.get('utm_content') ?? undefined);
  }, [setValue]);

  const phoneField = register('phone');

  async function onSubmit(values: LeadInput) {
    setSubmitError(null);
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      router.push('/thank-you');
    } catch {
      setSubmitError(t('errors.generic', { email: siteConfig.email }));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
      {/* Honeypot — hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label={t('name')}
          error={errors.name?.message}
          required
        >
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClasses}
            {...register('name')}
          />
        </Field>

        <Field
          id="company"
          label={t('company')}
          error={errors.company?.message}
          required
        >
          <input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder={t('companyPlaceholder')}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            className={fieldClasses}
            {...register('company')}
          />
        </Field>

        <Field
          id="phone"
          label={t('phone')}
          error={errors.phone?.message}
          required
        >
          <input
            id="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t('phonePlaceholder')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={cn(fieldClasses, 'font-mono')}
            {...phoneField}
            onChange={(event) => {
              sanitisePhoneInput(event.currentTarget);
              phoneField.onChange(event);
            }}
          />
        </Field>

        <Field
          id="email"
          label={t('email')}
          hint={t('optional')}
          error={errors.email?.message}
        >
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClasses}
            {...register('email')}
          />
        </Field>
      </div>

      <Field id="locations" label={t('locations')} hint={t('optional')} bare>
        <Controller
          name="locations"
          control={control}
          render={({ field }) => (
            <Select
              id="locations"
              value={field.value}
              onValueChange={field.onChange}
              placeholder="—"
              options={locationBuckets.map((bucket) => ({
                value: bucket,
                label: t(`locationsOptions.${bucket}`),
              }))}
            />
          )}
        />
      </Field>

      <Field id="message" label={t('message')} hint={t('optional')}>
        <textarea
          id="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className={cn(fieldClasses, 'h-auto resize-y py-3')}
          {...register('message')}
        />
      </Field>

      <div>
        <label className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-text-muted">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 rounded-[2px] accent-[var(--accent)]"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent')}
          />
          <span>
            {t('consent')}{' '}
            <Link
              href="/privacy"
              className="rounded-sm text-text underline underline-offset-2"
            >
              {t('consentLink')}
            </Link>
            .
          </span>
        </label>
        {errors.consent?.message && (
          <p
            id="consent-error"
            role="alert"
            className="mt-2 text-[0.8125rem] text-violation"
          >
            {errors.consent.message}
          </p>
        )}
      </div>

      {submitError && (
        <p
          role="alert"
          className="flex items-start gap-2 border border-violation/40 bg-violation/5 p-3 text-[0.875rem] text-violation"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {submitError}
        </p>
      )}

      <div>
        <Button type="submit" size="lg" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  bare,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  /** For controls that draw their own `.tech-field` edge, such as Select. */
  bare?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline gap-2 font-mono text-label uppercase text-text-muted"
      >
        {label}
        {required && (
          <span aria-hidden className="text-text-subtle">
            *
          </span>
        )}
        {hint && <span className="normal-case text-text-subtle">({hint})</span>}
      </label>
      {bare ? (
        children
      ) : (
        <div className="tech-field" data-invalid={error ? 'true' : undefined}>
          {children}
        </div>
      )}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[0.8125rem] text-violation"
        >
          {error}
        </p>
      )}
    </div>
  );
}
