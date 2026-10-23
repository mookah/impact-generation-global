import { audit, configured, db, env, equal, errorResponse } from '@/lib/server/core';
import { generateIssue, syncFacebook } from '@/lib/server/content';
import { deliverEmails, sendEmail } from '@/lib/server/email';
import { origin } from '@/lib/server/core';
import type { Issue } from '@/lib/content-types';
export const maxDuration = 300;
export async function GET(request: Request) {
  try {
    if (!process.env.CRON_SECRET || !equal(request.headers.get('authorization') || '', `Bearer ${env('CRON_SECRET')}`)) return new Response(null, { status: 401 });
    if (!configured()) return Response.json({ error: 'Database configuration required.' }, { status: 503 });
    const results: Record<string, unknown> = {};
    if (process.env.FACEBOOK_PAGE_ACCESS_TOKEN) {
      try {
        results.facebook = (await syncFacebook()).length;
        const [september] = await db<Issue[]>('igg_issues?slug=eq.september-2026');
        if (!september || ['awaiting_facebook_connection','no_verified_content'].includes(september.retrieval_status)) results.september = await generateIssue('2026-09', true);
      } catch { results.facebook = 'failed'; await audit('cron.error', 'Facebook sync or September retrieval failed; check Page authorization'); }
    }
    // First daily run after month-end. Unique month prevents duplicate issues, including retries.
    const now = new Date(); const local = new Date(now.getTime()+7200000);
    const previousMonth = new Date(Date.UTC(local.getUTCFullYear(),local.getUTCMonth()-1,15)).toISOString().slice(0,7);
    try {
      const [existing] = await db<Issue[]>(`igg_issues?month=eq.${previousMonth}-01`);
      if (!existing) {
        const issue = await generateIssue(previousMonth);
        results.newsletter = issue.slug;
        if (process.env.ADMIN_NOTIFY_EMAIL && process.env.RESEND_API_KEY) await sendEmail(`admin-issue-${issue.slug}`, { from: env('EMAIL_FROM'), to: env('ADMIN_NOTIFY_EMAIL'), subject: `Newsletter draft ready: ${issue.title}`, html: `<p>A newsletter draft is ready for review. No subscriber email has been sent.</p><p><a href="${origin()}/admin">Open admin dashboard</a></p>` });
      }
    } catch { results.newsletter = 'failed'; await audit('cron.error', 'Monthly newsletter generation or administrator notification failed'); }
    if (process.env.RESEND_API_KEY) results.email = await deliverEmails(true);
    return Response.json(results);
  } catch (e) { return errorResponse(e); }
}
