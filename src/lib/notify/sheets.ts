import { createSign } from 'node:crypto';
import type { LeadPayload } from '@/lib/lead-schema';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

export function isSheetsConfigured() {
  return Boolean(
    process.env.GOOGLE_SHEETS_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
}

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Signs a service-account JWT and trades it for an access token.
 * Doing this by hand keeps `googleapis` (and its ~50 transitive packages) out
 * of the bundle for what is ultimately one HTTP call.
 */
async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  // Vercel stores multi-line secrets with escaped newlines.
  const privateKey = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
    }),
  );

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claim}`);
  const signature = base64url(signer.sign(privateKey));
  const assertion = `${header}.${claim}.${signature}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  });

  if (!res.ok) {
    throw new Error(`Google token exchange failed: ${res.status}`);
  }

  const { access_token } = (await res.json()) as { access_token: string };
  return access_token;
}

export async function appendLeadRow(lead: LeadPayload) {
  const token = await getAccessToken();
  const sheetId = process.env.GOOGLE_SHEETS_ID!;
  const range = process.env.GOOGLE_SHEETS_RANGE ?? 'Leads!A:P';

  const values = [
    [
      new Date().toISOString(),
      lead.locale ?? '',
      lead.name,
      lead.company,
      lead.phone,
      lead.email ?? '',
      lead.locations ?? '',
      lead.message ?? '',
      lead.page ?? '',
      lead.referrer ?? '',
      lead.utmSource ?? '',
      lead.utmMedium ?? '',
      lead.utmCampaign ?? '',
      lead.utmContent ?? '',
      'yes',
      'new', // sales-owned status column — never overwritten by this code
    ],
  ];

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/` +
    `${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
  });

  if (!res.ok) {
    throw new Error(`Sheets append failed: ${res.status} ${await res.text()}`);
  }
}
