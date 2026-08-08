import type { LeadPayload } from '@/lib/lead-schema';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEAD_TO_EMAIL);
}

/** Called via fetch rather than the SDK — one endpoint, no dependency. */
async function send(payload: Record<string, unknown>) {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
  }
}

function row(label: string, value?: string) {
  return value ? `<tr><td><strong>${label}</strong></td><td>${value}</td></tr>` : '';
}

export async function sendSalesNotification(lead: LeadPayload) {
  const from = process.env.LEAD_FROM_EMAIL ?? 'MySaniTrace <noreply@mysanitrace.com>';

  await send({
    from,
    to: process.env.LEAD_TO_EMAIL,
    reply_to: lead.email,
    subject: `New demo request — ${lead.company}`,
    html: `
      <h2>New demo request</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        ${row('Name', lead.name)}
        ${row('Company', lead.company)}
        ${row('Phone', lead.phone)}
        ${row('Email', lead.email)}
        ${row('Locations', lead.locations)}
        ${row('Message', lead.message)}
        ${row('Language', lead.locale)}
        ${row('Page', lead.page)}
        ${row('Referrer', lead.referrer)}
        ${row('utm_source', lead.utmSource)}
        ${row('utm_medium', lead.utmMedium)}
        ${row('utm_campaign', lead.utmCampaign)}
        ${row('utm_content', lead.utmContent)}
      </table>
    `,
  });
}

const autoReply: Record<string, { subject: string; body: string }> = {
  ro: {
    subject: 'Am primit solicitarea ta — MySaniTrace',
    body: 'Îți mulțumim pentru solicitare. Un coleg te va contacta în cel mai scurt timp pentru a stabili demonstrația.',
  },
  en: {
    subject: 'We received your request — MySaniTrace',
    body: 'Thank you for your request. A colleague will contact you shortly to arrange the demonstration.',
  },
  ru: {
    subject: 'Мы получили вашу заявку — MySaniTrace',
    body: 'Спасибо за заявку. Наш коллега свяжется с вами в ближайшее время, чтобы согласовать демонстрацию.',
  },
};

export async function sendAutoReply(lead: LeadPayload) {
  if (!lead.email) return;

  const copy = autoReply[lead.locale ?? 'ro'] ?? autoReply.ro;
  const from = process.env.LEAD_FROM_EMAIL ?? 'MySaniTrace <noreply@mysanitrace.com>';

  await send({
    from,
    to: lead.email,
    subject: copy.subject,
    html: `<p>${lead.name},</p><p>${copy.body}</p><p>— MySaniTrace</p>`,
  });
}
