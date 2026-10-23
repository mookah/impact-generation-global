import { cookies } from 'next/headers';
import { AppError, env, errorResponse, json, rate, sameOrigin } from '@/lib/server/core';

export async function POST(request: Request) {
  try {
    sameOrigin(request); await rate(request, 'admin-login', 8, 900);
    const body = await json(request);
    if (typeof body.email !== 'string' || typeof body.password !== 'string') throw new AppError('Enter your sign-in details.');
    const response = await fetch(`${env('SUPABASE_URL')}/auth/v1/token?grant_type=password`, { method: 'POST', headers: { apikey: env('SUPABASE_SERVICE_ROLE_KEY'), 'Content-Type': 'application/json' }, body: JSON.stringify({ email: body.email, password: body.password }), signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new AppError('Sign-in failed.', 401);
    const session = await response.json();
    if (!session.user?.email_confirmed_at || !env('ADMIN_EMAILS').toLowerCase().split(',').map(s => s.trim()).includes(String(session.user.email).toLowerCase())) throw new AppError('Administrator access required.', 403);
    (await cookies()).set('igg_session', session.access_token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: Math.min(session.expires_in || 3600, 3600), path: '/' });
    return Response.json({ ok: true });
  } catch (e) { return errorResponse(e); }
}
export async function DELETE(request: Request) {
  try { sameOrigin(request); (await cookies()).delete('igg_session'); return Response.json({ ok: true }); } catch (e) { return errorResponse(e); }
}
