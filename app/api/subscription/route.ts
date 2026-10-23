import { AppError, db, errorResponse, hash, json, rate, rpc, sameOrigin } from '@/lib/server/core';
import { frequencies, managementId, normalizeEmail, subscribe } from '@/lib/server/email';

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.has('token')) {
      // RFC 8058 one-click unsubscribe, authenticated by an unguessable signed capability.
      const id = managementId(url.searchParams.get('token') || '');
      await db(`igg_subscribers?id=eq.${id}`, 'PATCH', { status: 'unsubscribed', confirm_hash: null });
      return Response.json({ message: 'Unsubscribed.' });
    }
    sameOrigin(request);
    const body = await json(request);
    if (body.action === 'confirm') {
      if (typeof body.token !== 'string' || !/^[a-f0-9]{64}$/.test(body.token)) throw new AppError('Invalid confirmation link.');
      const ok = await rpc<boolean>('igg_confirm', { p_hash: hash(body.token) });
      if (!ok) throw new AppError('This link has expired or has already been used.');
      return Response.json({ message: 'Subscription confirmed. Thank you for joining us!' });
    }
    if (body.action === 'preferences') {
      const id = managementId(String(body.token || ''));
      if (!frequencies.includes(body.frequency) && body.frequency !== 'unsubscribe') throw new AppError('Invalid preference.');
      await db(`igg_subscribers?id=eq.${id}`, 'PATCH', body.frequency === 'unsubscribe' ? { status: 'unsubscribed', confirm_hash: null } : { frequency: body.frequency });
      return Response.json({ message: body.frequency === 'unsubscribe' ? 'You have been unsubscribed.' : 'Your email preference has been saved.' });
    }
    await rate(request, 'subscribe', 5);
    if (body.consent !== true) throw new AppError('Please agree to receive the emails you select.');
    if (body.website) return Response.json({ message: 'Check your inbox to confirm your subscription.' });
    await subscribe(normalizeEmail(body.email), body.frequency);
    return Response.json({ message: 'If confirmation is needed, an email is on its way. Check your inbox and spam folder.' });
  } catch (e) { return errorResponse(e); }
}
