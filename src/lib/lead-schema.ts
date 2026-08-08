import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

export const locationBuckets = ['one', 'small', 'medium', 'large'] as const;

/** Primary markets. A bare national number is tried against these in order. */
const defaultCountries = ['MD', 'RO'] as const;

/**
 * Accepts an international number, or a national one from Moldova or Romania,
 * and returns it in E.164. Normalising here rather than in the UI means sales
 * and the spreadsheet always get one consistent format, no matter how the
 * visitor typed it.
 */
export function normalisePhone(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith('+')) {
    const parsed = parsePhoneNumberFromString(trimmed);
    return parsed?.isValid() ? parsed.number : null;
  }

  for (const country of defaultCountries) {
    const parsed = parsePhoneNumberFromString(trimmed, country);
    if (parsed?.isValid()) return parsed.number;
  }

  return null;
}

export type LeadMessages = {
  name: string;
  company: string;
  phone: string;
  email: string;
  consent: string;
};

/**
 * Built as a factory so the same rules run on the client (with localised
 * messages) and on the server (where the message text does not matter but the
 * validation absolutely does — client-side validation is a convenience, not a
 * boundary).
 */
export function createLeadSchema(m: LeadMessages) {
  return z.object({
    name: z.string().trim().min(2, m.name).max(120),
    company: z.string().trim().min(2, m.company).max(160),
    phone: z
      .string()
      .trim()
      .min(6, m.phone)
      .max(32)
      .refine((v) => normalisePhone(v) !== null, m.phone)
      .transform((v) => normalisePhone(v) ?? v),
    email: z
      .union([z.literal(''), z.email(m.email)])
      .optional()
      .transform((v) => (v === '' ? undefined : v)),
    locations: z.enum(locationBuckets).optional(),
    message: z.string().trim().max(2000).optional(),
    consent: z.literal(true, m.consent),

    /* Anti-spam: real users never see this field, bots fill everything.
       Deliberately permissive — the route handler inspects it and answers 200
       so the bot believes it succeeded. Rejecting it here would return a 400
       and tell the bot exactly what to change. */
    website: z.string().optional(),

    // Attribution — captured silently so sales knows where the lead came from.
    locale: z.string().max(8).optional(),
    page: z.string().max(300).optional(),
    referrer: z.string().max(500).optional(),
    utmSource: z.string().max(160).optional(),
    utmMedium: z.string().max(160).optional(),
    utmCampaign: z.string().max(160).optional(),
    utmContent: z.string().max(160).optional(),
  });
}

const serverMessages: LeadMessages = {
  name: 'Invalid name',
  company: 'Invalid company',
  phone: 'Invalid phone',
  email: 'Invalid email',
  consent: 'Consent required',
};

export const leadSchema = createLeadSchema(serverMessages);
export type LeadInput = z.input<ReturnType<typeof createLeadSchema>>;
export type LeadPayload = z.output<typeof leadSchema>;
