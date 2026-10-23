import { admin, AppError, audit, db, env, errorResponse, json, rate, rpc, sameOrigin } from '@/lib/server/core';
import { generateIssue, rewritePost, syncFacebook } from '@/lib/server/content';
import { deliverEmails } from '@/lib/server/email';
import { archiveFacebookImage, storeMedia } from '@/lib/server/media';
import type { Article, Issue, SourcePost } from '@/lib/content-types';
import { buddySettings } from '@/lib/server/buddy';
import { DEFAULT_BUDDY } from '@/lib/buddy';
import { saveEvent } from '@/lib/server/event-admin';
import { eventRecords } from '@/lib/server/events';
export const maxDuration = 300;

const uuid = (value: unknown) => { if (typeof value !== 'string' || !/^[a-f0-9-]{36}$/.test(value)) throw new AppError('Invalid record.'); return value; };
export async function GET() {
  try {
    await admin();
    const tables = ['igg_sources', 'igg_articles', 'igg_issues', 'igg_subscribers', 'igg_deliveries', 'igg_media', 'igg_events', 'igg_audit'];
    const data = await Promise.all(tables.map(t => t==='igg_events'?eventRecords():db(`${t}?order=${t === 'igg_sources' ? 'published_at' : t === 'igg_deliveries' ? 'due_at' : 'created_at'}.desc&limit=100`)));
    const buddy=await buddySettings();
    return Response.json({ ...Object.fromEntries(tables.map((t, i) => [t.replace('igg_', ''), data[i]])), buddy:buddy.settings, services: { facebook: Boolean(process.env.FACEBOOK_PAGE_ACCESS_TOKEN), ai: Boolean(process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL), email: Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM), cron: Boolean(process.env.CRON_SECRET), database: true, settings_ready:buddy.ready } }, { headers: { 'Cache-Control': 'no-store' } });
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
      case 'issue.generate': result = await generateIssue(String(b.month), b.refresh === true); break;
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
        if (!n?.articles.length || n.status === 'published' || n.articles.some(a=>a.generation==='pending'||!a.title.trim()||!a.body.trim())) throw new AppError('Complete every report and confirm human review before approval.');
        result = await db(`igg_issues?id=eq.${uuid(b.id)}`, 'PATCH', { status: 'approved' }); break;
      }
      case 'issue.report.generate': {
        const id=uuid(b.id);
        const [issue]=await db<Issue[]>(`igg_issues?id=eq.${id}`);
        const report=issue?.articles.find(a=>a.source_id===b.source_id);
        if(!issue||issue.status!=='draft'||!report||report.generation!=='pending'||report.edited)throw new AppError('Only an unfinished, unedited draft report can be generated. Save or review your edits first.');
        const [article]=await rewritePost(String(b.source_id));
        const [latest]=await db<Issue[]>(`igg_issues?id=eq.${id}`);
        if(!latest||latest.status!=='draft'||JSON.stringify(latest.articles)!==JSON.stringify(issue.articles))throw new AppError('The newsletter changed during AI generation. The AI article was saved separately; reload to reuse it.',409);
        const articles=latest.articles.map(a=>a.source_id===b.source_id?{...a,title:article.title,body:article.body,article_id:article.id,source_hash:article.source_hash||undefined,generation:'saved_article'}:a);
        const saved=await db<Issue[]>(`igg_issues?id=eq.${id}&status=eq.draft`,'PATCH',{articles,notify:false});
        if(!saved.length)throw new AppError('The draft changed. Reload to continue.',409);
        result=saved[0];break;
      }
      case 'issue.save': {
        if (!Array.isArray(b.articles) || !b.articles.length || b.articles.length > 500) throw new AppError('Save between 1 and 500 reports.');
        const id=uuid(b.id);
        const [issue]=await db<Issue[]>(`igg_issues?id=eq.${id}`);
        if(!issue||issue.status==='published')throw new AppError('Published newsletters cannot be changed here.');
        const media=await db<{id:string}[]>('igg_media?approved=eq.true&consent=eq.true&select=id&limit=1000');
        const seen=new Set<string>();
        const articles = b.articles.map((a: Issue['articles'][number]) => {
          if (!a || typeof a.title !== 'string' || typeof a.body !== 'string' || typeof a.source !== 'string' || typeof a.date !== 'string' || !Number.isFinite(Date.parse(a.date))) throw new AppError('Each report requires a title, body, source and valid date.');
          // Source identity and dates come from the saved draft, never client input.
          const prior=issue.articles.find(p=>p.source===a.source);
          if(!prior)throw new AppError('Reports must originate from a retrieved source.');
          const key=prior.source_id||prior.source;
          if(seen.has(key))throw new AppError('Duplicate source reports are not allowed.');seen.add(key);
          const ids=a.media_ids??(a.media_id?[a.media_id]:[]);
          if(!Array.isArray(ids)||ids.length>20)throw new AppError('Use up to 20 approved photographs per report.');
          const media_ids=[...new Set(ids.map(uuid))];
          if(media_ids.some(id=>!media.some(m=>m.id===id)))throw new AppError('A selected photograph is unavailable or lacks approval and consent. Remove it or choose another.');
          const changed=a.title!==prior.title||a.body!==prior.body||a.category!==prior.category;
          return {...prior,title:a.title.slice(0,300),body:a.body.slice(0,20000),media_ids,media_id:media_ids[0]||null,category:typeof a.category==='string'?a.category.slice(0,100):prior.category,edited:prior.edited||changed,generation:changed?'newsletter_edit':prior.generation};
        });
        const saved=await db<Issue[]>(`igg_issues?id=eq.${id}&status=neq.published`, 'PATCH', { articles, status: 'draft', notify:false });
        if(!saved.length)throw new AppError('The newsletter changed. Reload it before saving.',409);
        result=saved[0];break;
      }
      case 'media.archive':
        if (b.consent !== true) throw new AppError('Confirm image rights and consent, including children where applicable.');
        result = await archiveFacebookImage(String(b.id), String(b.caption || ''), String(b.event || '')); break;
      case 'media.save':
        result = await db(`igg_media?id=eq.${uuid(b.id)}`, 'PATCH', { caption: String(b.caption || '').slice(0,300), event: String(b.event || '').slice(0,150), category: String(b.category || '').slice(0,100), approved: b.approved === true && b.consent === true, consent: b.consent === true }); break;
      case 'subscriber.remove': result = await db(`igg_subscribers?id=eq.${uuid(b.id)}`, 'PATCH', { status: 'unsubscribed', confirm_hash: null }); break;
      case 'emails.run': result = await deliverEmails(true); break;
      case 'event.save': result=await saveEvent(b);break;
      case 'event.unpublish': case 'event.archive': {
        result=await db(`igg_events?id=eq.${uuid(b.id)}`,'PATCH',{approved:false,...(b.action==='event.archive'?{archived:true}:{})});break;
      }
      case 'buddy.save': case 'buddy.restore': {
        const value=b.action==='buddy.restore'?DEFAULT_BUDDY:b.settings;
        if(value?.style&&!['cycling','welcome'].includes(value.style))throw new AppError('Choose a supported Buddy style.');
        if(!value||typeof value.welcome!=='string'||!value.welcome.trim()||value.welcome.length>400||typeof value.enabled!=='boolean'||!['session','daily','manual'].includes(value.frequency)||!Array.isArray(value.featuredSourceIds)||value.featuredSourceIds.length>20||value.featuredSourceIds.some((id:unknown)=>typeof id!=='string'||!/^\d+_\d+$/.test(id)))throw new AppError('Use a welcome message up to 400 characters, a greeting frequency, and up to 20 verified Facebook posts.');
        if(value.featuredSourceIds.length){
          if(b.reviewed!==true)throw new AppError('Confirm facts, source availability and privacy review for featured updates.');
          const sources=await db<SourcePost[]>(`igg_sources?id=in.(${value.featuredSourceIds.map(encodeURIComponent).join(',')})&select=id`);
          if(value.featuredSourceIds.some((id:string)=>!sources.some(p=>p.id===id)))throw new AppError('A featured Facebook source is no longer available.');
        }
        await db('igg_settings?on_conflict=key','POST',{key:'impact_buddy',value,updated_at:new Date().toISOString()});result=value;break;
      }
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
