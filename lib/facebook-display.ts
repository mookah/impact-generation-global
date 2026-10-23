import type { ImpactUpdate } from './facebook';

/** Presentation only: imported source text stays unchanged in the database. */
export function cleanFacebookCaption(text: string): string {
  return text.replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g, '').split(/\r?\n/).map(line => line.trim()).filter(line =>
    !/^(?:[a-z]:[\\/]|file:\/\/|\\\\|\/(?:users|home|tmp|public|images|uploads)\/|(?:public|images|uploads)\/)/i.test(line) &&
    !/^Sent from\s+WhatsApp\s*$/i.test(line) &&
    !/^WhatsApp\s+(?:Image|Video|Audio|Document)\b/i.test(line) &&
    !/^(?:IMG|VID|DSC)[-_][\w-]+\.(?:jpe?g|png|webp|mp4)$/i.test(line) &&
    !/^(?:WhatsApp:?\s*)?(?:https?:\/\/)?(?:wa\.me|(?:api|chat)\.whatsapp\.com)\/\S+$/i.test(line) &&
    !/^https?:\/\/\S+$/i.test(line)
  ).join('\n').replace(/https?:\/\/\S+/gi,'').replace(/\b[a-z]:[\\/][^\r\n]*/gi,'').replace(/[ \t]{2,}/g,' ').replace(/\n{3,}/g, '\n\n').trim();
}

export function facebookImageUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.searchParams.has('access_token') && ['fbcdn.net', 'fbsbx.com', 'facebook.com'].some(host => url.hostname === host || url.hostname.endsWith(`.${host}`)) ? value : null;
  } catch { return null; }
}

export function latestFacebookPosts(posts: ImpactUpdate[], limit = 3): ImpactUpdate[] {
  const unique = new Map<string, ImpactUpdate>();
  for (const post of posts) {
    if (!post.id || !Number.isFinite(Date.parse(post.publishedAt))) continue;
    try {
      const url = new URL(post.url);
      if (url.protocol !== 'https:' || !(url.hostname === 'facebook.com' || url.hostname.endsWith('.facebook.com'))) continue;
    } catch { continue; }
    const text = cleanFacebookCaption(post.text);
    if (!/[\p{L}\p{N}]/u.test(text) && !facebookImageUrl(post.imageUrl) && !post.isVideo) continue;
    unique.set(post.id, { ...post, text, imageUrl: facebookImageUrl(post.imageUrl) });
  }
  return [...unique.values()].sort((a,b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, limit);
}

export function facebookCardText(post: ImpactUpdate) {
  const text = cleanFacebookCaption(post.text);
  const [first, ...rest] = text.split('\n');
  if (first && first.length <= 110) return { headline: first, caption: rest.join('\n').trim() };
  return { headline: `${post.event} ${post.isVideo ? 'video' : !text && post.imageUrl ? 'photo' : 'update'}`, caption: text };
}
/** Canonical video permalinks only. Post and share URLs retain an external fallback. */
export function facebookVideoUrl(value:string):string|null{
  try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password||u.searchParams.has('access_token')||!(u.hostname==='facebook.com'||u.hostname.endsWith('.facebook.com')))return null;
    const match=u.pathname.match(/\/(videos|reel)\/(\d+)(?:\/|$)/i);if(match)return `https://www.facebook.com/${match[1].toLowerCase()}/${match[2]}/`;
    if(/^\/watch\/?$/.test(u.pathname)&&/^\d+$/.test(u.searchParams.get('v')||''))return `https://www.facebook.com/watch/?v=${u.searchParams.get('v')}`;
    return null;
  }catch{return null;}
}
