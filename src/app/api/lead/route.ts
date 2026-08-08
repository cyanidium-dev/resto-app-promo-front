import { NextResponse } from 'next/server';

import { leadSchema } from '@/lib/lead-schema';
import { rateLimit } from '@/lib/rate-limit';
import {
  isEmailConfigured,
  sendAutoReply,
  sendSalesNotification,
} from '@/lib/notify/email';
import { appendLeadRow, isSheetsConfigured } from '@/lib/notify/sheets';
import { storeLeadLocally } from '@/lib/notify/store';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!rateLimit(`lead:${ip}`)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 });
  }

  const lead = parsed.data;

  // Honeypot: answer 200 so the bot believes it succeeded and moves on.
  if (lead.website) {
    return NextResponse.json({ ok: true });
  }

  const emailReady = isEmailConfigured();
  const sheetsReady = isSheetsConfigured();

  if (!emailReady && !sheetsReady) {
    // No delivery channel exists. In development, keep the lead on disk so the
    // flow stays testable. In production, fail loudly rather than tell someone
    // their request was sent when it was not.
    if (process.env.NODE_ENV === 'production') {
      console.error('[lead] no delivery channel configured — lead rejected');
      return NextResponse.json({ error: 'not_configured' }, { status: 500 });
    }
    await storeLeadLocally(lead);
    console.warn('[lead] stored in .leads/leads.jsonl (no provider configured)');
    return NextResponse.json({ ok: true });
  }

  /* Durability first: the lead is written to at least one durable place before
     anything else runs. A Sheets outage or a mail provider hiccup must never
     be the reason a request disappears. */
  const results = await Promise.allSettled([
    sheetsReady ? appendLeadRow(lead) : Promise.resolve(),
    emailReady ? sendSalesNotification(lead) : Promise.resolve(),
  ]);

  const failures = results.filter((r) => r.status === 'rejected');

  if (failures.length === results.length) {
    for (const failure of failures) {
      console.error('[lead] delivery failed:', (failure as PromiseRejectedResult).reason);
    }
    return NextResponse.json({ error: 'delivery_failed' }, { status: 502 });
  }

  // Partial failure still counts as received — log it for follow-up, but do not
  // make the visitor submit twice.
  for (const failure of failures) {
    console.error('[lead] partial delivery failure:', (failure as PromiseRejectedResult).reason);
  }

  if (emailReady) {
    try {
      await sendAutoReply(lead);
    } catch (error) {
      console.error('[lead] auto-reply failed:', error);
    }
  }

  return NextResponse.json({ ok: true });
}
