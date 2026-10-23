import 'server-only';
import { createHash, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';

export class AppError extends Error {
  constructor(message: string, public status = 400) { super(message); }
}
export function env(name: string) {
  const value = process.env[name];
  if (!value) throw new AppError(`Service configuration required: ${name}`, 503);
  return value;
}
export const configured = () => Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
export const hash = (text: string) => createHash('sha256').update(text).digest('hex');
export function equal(a: string, b: string) { return timingSafeEqual(Buffer.from(hash(a)), Buffer.from(hash(b))); }
const JWT_SHAPE = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/;
/**
 * Supabase API key sent only in `apikey`. New `sb_secret_` keys are opaque strings,
 * not JWTs, so they must never be placed in `Authorization`. Legacy service-role
 * keys are JWTs and are additionally copied to `Authorization` when no user is signed in.
 */
export function supabaseHeaders(userJwt?: string): Record<string, string> {
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  const headers: Record<string, string> = { apikey: key };
  if (userJwt) headers.Authorization = `Bearer ${userJwt}`;
  else if (!key.startsWith('sb_') && JWT_SHAPE.test(key)) headers.Authorization = `Bearer ${key}`;
  return headers;
}
/** API key plus an authenticated user's access token, kept separate from the server key. */
export const authHeaders = (userJwt: string) => supabaseHeaders(userJwt);
export async function db<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(`${env('SUPABASE_URL')}/rest/v1/${path}`, {
    method, cache: 'no-store', signal: AbortSignal.timeout(20000),
    headers: { ...supabaseHeaders(), 'Content-Type': 'application/json', Prefer: 'return=representation,resolution=merge-duplicates' },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!response.ok) {
    // Paths and response bodies may contain private records. Log only HTTP status.
    console.error('[server-db] Request failed', { status: response.status });
    throw new AppError('Database operation failed. Check the migration and server configuration.', 503);
  }
  return response.status === 204 ? undefined as T : response.json();
}
export const rpc = <T>(name: string, body: unknown) => db<T>(`rpc/${name}`, 'POST', body);
export async function admin() {
  const token = (await cookies()).get('igg_session')?.value;
  if (!token) throw new AppError('Administrator sign-in required.', 401);
  const response = await fetch(`${env('SUPABASE_URL')}/auth/v1/user`, { cache: 'no-store', headers: supabaseHeaders(token), signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new AppError('Session expired. Sign in again.', 401);
  const user = await response.json();
  const allowed = env('ADMIN_EMAILS').toLowerCase().split(',').map(s => s.trim());
  if (!user.email_confirmed_at || !allowed.includes(String(user.email).toLowerCase())) throw new AppError('Administrator access required.', 403);
  return user.email as string;
}
export function sameOrigin(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) throw new AppError('Request origin not allowed.', 403);
}
export async function json(request: Request) {
  if (Number(request.headers.get('content-length') || 0) > 60000) throw new AppError('Request too large.', 413);
  const text = await request.text();
  if (text.length > 60000) throw new AppError('Request too large.', 413);
  try { return JSON.parse(text); } catch { throw new AppError('Invalid request.'); }
}
export function errorResponse(error: unknown) {
  return Response.json({ error: error instanceof AppError && error.status !== 503 ? error.message : 'The service is temporarily unavailable. Please try again.' }, { status: error instanceof AppError ? error.status : 503, headers: { 'Cache-Control': 'no-store' } });
}
export async function rate(request: Request, scope: string, limit: number, seconds = 3600) {
  // On Vercel this header is set by the trusted edge, not the visitor.
  const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0] || 'local';
  const ok = await rpc<boolean>('igg_rate', { p_key: hash(`${env('RATE_LIMIT_SALT')}:${scope}:${ip}`), p_limit: limit, p_seconds: seconds });
  if (!ok) throw new AppError('Please try again later.', 429);
}
export async function audit(action: string, detail: string) {
  await db('igg_audit', 'POST', { action, detail: detail.slice(0, 300) });
}
export const origin = () => env('SITE_URL').replace(/\/$/, '');
export const escapeHtml = (text: string) => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
