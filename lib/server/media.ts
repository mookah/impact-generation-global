import 'server-only';
import { randomUUID } from 'node:crypto';
import { AppError, db, env, hash } from './core';
import type { Media, SourcePost } from '@/lib/content-types';

function imageType(bytes: Uint8Array) {
  if (bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return 'image/jpeg';
  if (Buffer.from(bytes.slice(0, 8)).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'image/png';
  if (Buffer.from(bytes.slice(0,4)).toString() === 'RIFF' && Buffer.from(bytes.slice(8,12)).toString() === 'WEBP') return 'image/webp';
  throw new AppError('Only JPEG, PNG and WebP photographs are supported.');
}
export async function storeMedia(bytes: Uint8Array, caption: string, category: string, event: string, sourceId?: string) {
  if (bytes.length > 10485760 || bytes.length < 12) throw new AppError('Photographs must be smaller than 10 MB.');
  const mime = imageType(bytes);
  const digest = hash(Buffer.from(bytes).toString('base64'));
  const [existing] = await db<Media[]>(`igg_media?hash=eq.${digest}`);
  if (existing) return existing;
  const path = `${randomUUID()}.${mime.split('/')[1]}`;
  const response = await fetch(`${env('SUPABASE_URL')}/storage/v1/object/impact-media/${path}`, { method: 'POST', headers: { Authorization: `Bearer ${env('SUPABASE_SERVICE_ROLE_KEY')}`, 'Content-Type': mime }, body: new Blob([Buffer.from(bytes)], { type: mime }), signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new AppError('Permanent media storage is unavailable.', 503);
  const [media] = await db<Media[]>('igg_media', 'POST', { storage_path: path, caption: caption.slice(0, 300), category: category.slice(0, 100), event: event.slice(0, 150), source_id: sourceId || null, hash: digest, consent: true, approved: true });
  return media;
}
export async function archiveFacebookImage(id: string, caption: string, event: string) {
  const [p] = await db<SourcePost[]>(`igg_sources?id=eq.${encodeURIComponent(id)}`);
  if (!p?.image_url) throw new AppError('No photograph is available for this post.');
  const url = new URL(p.image_url);
  if (url.protocol !== 'https:' || !(url.hostname.endsWith('.fbcdn.net') || url.hostname.endsWith('.fbsbx.com'))) throw new AppError('Untrusted media source.');
  const response = await fetch(url, { redirect: 'error', signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new AppError('Facebook photograph has expired. Sync again.', 502);
  const reader = response.body?.getReader();
  if (!reader) throw new AppError('Image unavailable.');
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) { const part = await reader.read(); if (part.done) break; size += part.value.length; if (size > 10485760) { await reader.cancel(); throw new AppError('Image exceeds 10 MB.'); } chunks.push(part.value); }
  return storeMedia(Buffer.concat(chunks), caption || p.category, p.category, event, p.id);
}
