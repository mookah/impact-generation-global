import { admin, db, env } from '@/lib/server/core';
import type { Media } from '@/lib/content-types';
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!/^[a-f0-9-]{36}$/.test(id)) return new Response(null, { status: 404 });
    const [media] = await db<Media[]>(`igg_media?id=eq.${id}`);
    if (!media) return new Response(null, { status: 404 });
    if (!media.approved || !media.consent) await admin();
    const response = await fetch(`${env('SUPABASE_URL')}/storage/v1/object/authenticated/impact-media/${encodeURIComponent(media.storage_path)}`, { headers: { Authorization: `Bearer ${env('SUPABASE_SERVICE_ROLE_KEY')}` }, signal: AbortSignal.timeout(15000), cache: 'no-store' });
    if (!response.ok) return new Response(null, { status: 404 });
    return new Response(response.body, { headers: { 'Content-Type': response.headers.get('content-type') || 'image/jpeg', 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' } });
  } catch { return new Response(null, { status: 404 }); }
}
