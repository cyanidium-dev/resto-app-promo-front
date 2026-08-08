import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import type { LeadPayload } from '@/lib/lead-schema';

const dir = path.join(process.cwd(), '.leads');
const file = path.join(dir, 'leads.jsonl');

/**
 * Local development sink so the form can be exercised end to end before any
 * provider credentials exist. Never relied upon in production — see the guard
 * in the route handler.
 */
export async function storeLeadLocally(lead: LeadPayload) {
  await mkdir(dir, { recursive: true });
  await appendFile(
    file,
    `${JSON.stringify({ receivedAt: new Date().toISOString(), ...lead })}\n`,
    'utf8',
  );
}
