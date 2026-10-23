import 'server-only';
import { createHmac, randomBytes } from 'node:crypto';
import { AppError, db, env, equal, escapeHtml as esc, hash, origin, rpc } from './core';
import type { Subscriber } from '@/lib/content-types';

export const frequencies = ['immediate', 'daily', 'monthly'];
export function normalizeEmail(value: unknown) {
  if (typeof value !== 'string') throw new AppError('Enter a valid email address.');
  const email = value.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new AppError('Enter a valid email address.');
  return email;
}
export function managementToken(id: string) {
  return `${id}.${createHmac('sha256', env('SUBSCRIBER_TOKEN_SECRET')).update(id).digest('hex')}`;
}
export function managementId(token: string) {
  const id = token.split('.')[0];
  if (!/^[a-f0-9-]{36}$/.test(id) || !equal(token, managementToken(id))) throw new AppError('This subscription link is invalid.', 403);
  return id;
}
export async function sendEmail(key: string, payload: unknown) {
  const response = await fetch('https://api.resend.com/emails', { method: 'POST', signal: AbortSignal.timeout(20000), headers: { Authorization: `Bearer ${env('RESEND_API_KEY')}`, 'Content-Type': 'application/json', 'Idempotency-Key': key }, body: JSON.stringify(payload) });
  if (!response.ok) throw new AppError('Email delivery is temporarily unavailable.', 502);
  const result = await response.json();
  if (typeof result.id !== 'string' || !result.id) throw new AppError('Email provider acceptance could not be confirmed.', 502);
  return result as { id: string };
}
export async function subscribe(email: string, frequency: string) {
  if (!frequencies.includes(frequency)) throw new AppError('Choose an email frequency.');
  env('RESEND_API_KEY'); env('EMAIL_FROM'); env('SUBSCRIBER_TOKEN_SECRET'); origin();
  const token = randomBytes(32).toString('hex');
  const created = await rpc<boolean>('igg_subscribe', { p_email: email, p_frequency: frequency, p_hash: hash(token) });
  if (!created) return;
  try {
    const url = `${origin()}/subscribe/confirm?token=${token}`;
    await sendEmail(`confirm-${hash(token)}`, { from: env('EMAIL_FROM'), to: email, subject: 'Confirm your Impact Generation subscription', html: `<h1>Stay connected with Impact Generation</h1><p>Please confirm your ${esc(frequency)} email subscription. This link expires in 24 hours.</p><p><a href="${esc(url)}">Confirm subscription</a></p><p>If you did not request this, ignore this email. You will not receive updates without confirmation.</p>` });
  } catch (e) {
    // Failed confirmations can be requested again; no permanently stuck pending records.
    await db(`igg_subscribers?email=eq.${encodeURIComponent(email)}&confirm_hash=eq.${hash(token)}`, 'PATCH', { confirm_expires: new Date(0).toISOString() });
    throw e;
  }
}
type Delivery = { id: string; subscriber_id: string; frequency: string; title: string; summary: string; url: string; media_id: string | null; stories: { title: string; summary: string; url: string }[]; payload: Record<string, unknown> | null };
export async function deliverEmails(daily = false) {
  env('RESEND_API_KEY'); env('EMAIL_FROM'); env('SUBSCRIBER_TOKEN_SECRET');
  if (daily) await rpc('igg_prepare_digests', {});
  const deliveries = await rpc<Delivery[]>('igg_claim_mail', { p_daily: daily });
  let sent = 0;
  for (const d of deliveries) {
    const [s] = await db<Subscriber[]>(`igg_subscribers?id=eq.${d.subscriber_id}`);
    if (s?.status !== 'confirmed' || !s.confirmed_at || s.frequency !== (d.frequency === 'digest' ? 'daily' : d.frequency)) {
      await db(`igg_deliveries?id=eq.${d.id}`, 'PATCH', { state: 'cancelled' }); continue;
    }
    const manage = `${origin()}/subscribe/preferences?token=${managementToken(s.id)}`;
    const unsubscribe = `${origin()}/api/subscription?token=${managementToken(s.id)}`;
    const image = d.media_id ? `<img src="${esc(origin())}/api/media/${d.media_id}" alt="Approved ministry photograph" width="560" style="max-width:100%" />` : '';
    const stories = (d.stories || []).map(a => `<h2>${esc(a.title)}</h2><p>${esc(a.summary)}</p><p><a href="${esc(origin()+a.url)}">Read Full Story</a></p>`).join('');
    const payload = d.payload || { from: env('EMAIL_FROM'), to: s.email, subject: `Impact Generation | ${d.title}`, html: `<div style="max-width:600px;margin:auto;font-family:Arial;color:#123f78"><h2>IMPACT GENERATION GLOBAL</h2>${image}<h1>${esc(d.title)}</h1><p>${esc(d.summary)}</p>${stories}<p><a href="${esc(origin() + d.url)}">Read Full Story</a></p><hr/><p>You opted in to ${esc(s.frequency)} updates.</p><p><a href="${esc(manage)}">Email preferences / Unsubscribe</a></p></div>`, headers: { 'List-Unsubscribe': `<${unsubscribe}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } };
    // Persist exact request before sending; every retry uses the same provider key and payload.
    if (!d.payload) await db(`igg_deliveries?id=eq.${d.id}`, 'PATCH', { payload });
    try {
      const result = await sendEmail(`delivery-${d.id}`, payload);
      await db(`igg_deliveries?id=eq.${d.id}`, 'PATCH', { state: 'sent', provider_id: result.id, last_error: null }); sent++;
    } catch {
      await db(`igg_deliveries?id=eq.${d.id}`, 'PATCH', { state: 'pending', due_at: new Date(Date.now() + 10 * 60000).toISOString(), last_error: 'Provider error; retry scheduled with original idempotency key' });
    }
  }
  return { processed: deliveries.length, sent };
}
