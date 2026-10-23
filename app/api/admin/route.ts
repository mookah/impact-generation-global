import { admin, AppError, audit, db, env, errorResponse, json, rate, rpc, sameOrigin } from '@/lib/server/core';
import { generateIssue, rewritePost, syncFacebook } from '@/lib/server/content';
import { deliverEmails } from '@/lib/server/email';
import { archiveFacebookImage, storeMedia } from '@/lib/server/media';
import type { Article, Issue, SourcePost } from '@/lib/content-types';
export const maxDuration = 300;

const uuid = (value: unknown) => { if (typeof value !== 'string' || !/^[a-f0-9-]{36}$/.test(value)) throw new AppError('Invalid record.'); return value; };
export async function GET() {
  try {
    await admin();
    const tables = ['igg_sources', 'igg_articles', 'igg_issues', 'igg_subscribers', 'igg_deliveries', 'igg_media', 'igg_events', 'igg_audit'];
    const data = await Promise.all(tables.map(t => db(`${t}?order=${t === 'igg_sources' ? 'published_at' : t === 'igg_deliveries' ? 'due_at' : 'created_at'}.desc&limit=100`)));
    return Response.json({ ...Object.fromEntries(tables.map((t, i) => [t.replace('igg_', ''), data[i]])), services: { facebook: Boolean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN), ai: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL), email: Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM), cron: Boolean(process.env.CRON_SECRET), database: true } }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) { return errorResponse(e); }
}
export async function POST(request: Request) {
  try {
    sameOrigin(request); const actor = await admin(); await rate(request, 'admin-actions', 120);
    if (request.headers.get('content-type')?.includes('multipart/form-data')) {
      if (Number(request.headers.get('content-length') || 0) > 11000000) throw new AppError('Upload too large.');
      const form = await request.formData();
      const file = form.get('file');
      if (!(file instanceof File) || form.get('consent') !== 'true') throw new AppError('Choose a photograph and confirm publication consent.');
      const result = await storeMedia(new Uint8Array(await file.arrayBuffer()), String(form.get('caption') || ''), String(form.get('category') || 'Community Updates'), String(form.get('event') || ''));
      await audit('media.upload', actor); return Response.json({ result });
    }
    const b = await json(request); let result: unknown = null;
    switch (b.action) {
      case 'sync': result = await syncFacebook(b.month || undefined); break;
      case 'september': result = await generateIssue('2026-09', true); break;
      case 'issue.generate': result = await generateIssue(String(b.month), false); break;
      case 'rewrite': result = await rewritePost(String(b.id)); break;
      case 'article.new': result = await db('igg_articles', 'POST', { slug: `story-${crypto.randomUUID()}`, title: 'New story', body: '', summary: '', status: 'draft' }); break;
      case 'article.save': {
        const id = uuid(b.id); const [a] = await db<Article[]>(`igg_articles?id=eq.${id}`);
        if (!a) throw new AppError('Article not found.');
        const fields = ['title','body','summary','caption','description','category'] as const;
        const changes = Object.fromEntries(fields.map(k => [k, String(b[k] ?? a[k]).slice(0, k === 'body' ? 20000 : 3000)]));
        result = await db(`igg_articles?id=eq.${id}&published_at=${a.published_at ? 'not.is.null' : 'is.null'}`, 'PATCH', { ...changes, media_id: b.media_id ? uuid(b.media_id) : null, status: a.published_at ? 'published' : 'draft' }); break;
      }
      case 'article.approve': {
        if (b.reviewed !== true) throw new AppError('Confirm factual and privacy review.');
        const id = uuid(b.id); const [a] = await db<Article[]>(`igg_articles?id=eq.${id}`);
        if (!a?.title.trim() || !a.body.trim() || !a.summary.trim() || a.published_at) throw new AppError('Complete the unpublished article first.');
        const [p] = a.source_id ? await db<SourcePost[]>(`igg_sources?id=eq.${encodeURIComponent(a.source_id)}`) : [];
        result = await db(`igg_articles?id=eq.${id}`, 'PATCH', { status: 'approved', source_hash: p?.hash || null }); break;
      }
      case 'article.reject': result = await db(`igg_articles?id=eq.${uuid(b.id)}&published_at=is.null`, 'PATCH', { status: 'rejected' }); break;
      case 'article.publish': case 'issue.publish':
        result = await rpc('igg_publish', { p_id: uuid(b.id), p_issue: b.action === 'issue.publish', p_notify: b.notify === true });
        if (b.notify && process.env.RESEND_API_KEY) { try { await deliverEmails(); } catch { await audit('email.queue', 'Publication saved; queued mail awaits worker'); } }
        break;
      case 'issue.approve': {
        if (b.reviewed !== true) throw new AppError('Confirm factual and photograph consent review.');
        const [n] = await db<Issue[]>(`igg_issues?id=eq.${uuid(b.id)}`);
        if (!n?.articles.length || n.status === 'published') throw new AppError('Verified reports are required before approval.');
        result = await db(`igg_issues?id=eq.${uuid(b.id)}`, 'PATCH', { status: 'approved' }); break;
      }
      case 'issue.save': {
        if (!Array.isArray(b.articles) || b.articles.length > 100) throw new AppError('Invalid reports.');
        const articles = b.articles.map((a: { title: string; body: string; source: string; date: string; media_id?: string }) => {
          if (typeof a.title !== 'string' || typeof a.body !== 'string' || typeof a.source !== 'string' || typeof a.date !== 'string') throw new AppError('Invalid report.');
          if (!(a.source.startsWith('/news/') || /^https:\/\/([a-z0-9-]+\.)?facebook\.com\//.test(a.source))) throw new AppError('Reports require an authentic source link.');
          return { title: a.title.slice(0,300), body: a.body.slice(0,20000), source: a.source, date: a.date, media_id: a.media_id ? uuid(a.media_id) : null };
        });
        result = await db(`igg_issues?id=eq.${uuid(b.id)}&status=neq.published`, 'PATCH', { articles, status: 'draft' }); break;
      }
      case 'media.archive':
        if (b.consent !== true) throw new AppError('Confirm image rights and consent, including children where applicable.');
        result = await archiveFacebookImage(String(b.id), String(b.caption || ''), String(b.event || '')); break;
      case 'media.save':
        result = await db(`igg_media?id=eq.${uuid(b.id)}`, 'PATCH', { caption: String(b.caption || '').slice(0,300), event: String(b.event || '').slice(0,150), category: String(b.category || '').slice(0,100), approved: b.approved === true && b.consent === true, consent: b.consent === true }); break;
      case 'subscriber.remove': result = await db(`igg_subscribers?id=eq.${uuid(b.id)}`, 'PATCH', { status: 'unsubscribed', confirm_hash: null }); break;
      case 'emails.run': result = await deliverEmails(true); break;
      case 'event.save':
        if (!b.title || !b.location || !Number.isFinite(Date.parse(b.date))) throw new AppError('Enter title, date and location.');
        result = await db('igg_events', 'POST', { title: String(b.title).slice(0,200), date: new Date(b.date).toISOString(), location: String(b.location).slice(0,200), description: String(b.description || '').slice(0,5000), approved: b.approved === true }); break;
      case 'facebook.publish': {
        const token = env('FACEBOOK_PAGE_ACCESS_TOKEN'); const id = uuid(b.id);
        const [a] = await db<Article[]>(`igg_articles?id=eq.${id}`);
        if (!a || a.source_id || a.facebook_id || !a.caption.trim() || !['approved','published'].includes(a.status)) throw new AppError('Only approved new website posts can be published to Facebook. Copy revisions for imported posts.');
        const locked = await db<Article[]>(`igg_articles?id=eq.${id}&facebook_state=eq.none`, 'PATCH', { facebook_state: 'sending' });
        if (!locked.length) throw new AppError('Publication was already attempted. Reconcile with Facebook; automatic retry is disabled.');
        try {
          const version = process.env.FACEBOOK_GRAPH_VERSION || 'v26.0'; const page = process.env.FACEBOOK_PAGE_ID || '370924362777718';
          if (!/^v\d+\.\d+$/.test(version) || !/^\d+$/.test(page)) throw new AppError('Invalid Facebook configuration.');
          const response = await fetch(`https://graph.facebook.com/${version}/${page}/feed`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ message: a.caption }), signal: AbortSignal.timeout(20000) });
          const published = await response.json();
          if (!response.ok || !published.id) throw new AppError('Facebook publication could not be confirmed. Check the original Page before any further action.', 502);
          result = await db(`igg_articles?id=eq.${id}`, 'PATCH', { facebook_id: published.id, facebook_state: 'published' });
        } catch (e) { await db(`igg_articles?id=eq.${id}`, 'PATCH', { facebook_state: 'uncertain' }); throw e; }
        break;
      }
      default: throw new AppError('Unknown action.');
    }
    await audit(String(b.action), actor);
    return Response.json({ ok: true, result }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (e) { return errorResponse(e); }
}
