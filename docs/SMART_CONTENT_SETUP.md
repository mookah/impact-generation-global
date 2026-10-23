# Smart content setup and Preview acceptance

The existing repository, feature branch, PR #1 and linked Vercel project are retained. Do not merge or promote to Production until Preview acceptance is complete. Original local work is preserved in the Git stash `Preserve existing website edits before smart content integration` and ignored `.local-backups/pre-integration-20261023.bundle`.

## Secure configuration

Use the existing database if it is Supabase; otherwise select one Supabase project. Run `supabase/migrations/20261023_content.sql` in its SQL editor **once**. This creates isolated `igg_` tables, restricted server-only RPCs, row-level security and a private `impact-media` bucket. Do not grant public table or RPC access. Use a separate Preview database or an isolated test project for acceptance with test addresses; never test delivery against production subscribers.

In the **existing Vercel project → Settings → Environment Variables**, add the names below to Preview, scoped to `feature/smart-content-foundation-20261023`. Enter secrets directly into Vercel's secret fields. Do not paste tokens into chat, source, terminal arguments or logs. The `.env.example` contains names and nonsecret defaults only.

| Name | Value / source |
| --- | --- |
| `SITE_URL` | The exact HTTPS Preview URL for Preview; canonical website URL for eventual Production. Email links use this origin. |
| `SUPABASE_URL` | Selected database project URL. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server secret from that project. Never prefix with `NEXT_PUBLIC_`. |
| `ADMIN_EMAILS` | Comma-separated administrator emails, with no public registration. |
| `RATE_LIMIT_SALT` | Independently generated random secret, at least 32 bytes. |
| `SUBSCRIBER_TOKEN_SECRET` | Different random secret, at least 32 bytes. Retain this key to keep existing preference links valid. |
| `CRON_SECRET` | Different random secret, at least 32 bytes. Vercel authenticates scheduled requests using this value. |
| `FACEBOOK_PAGE_ID` | `370924362777718` |
| `FACEBOOK_GRAPH_VERSION` | `v26.0` |
| `FACEBOOK_PAGE_ACCESS_TOKEN` | Authorized Page token for Impact Generation Global Inc, issued through Meta. Existing permissions: pages_show_list, pages_read_engagement, pages_manage_posts. Validate expiry and Page access in Meta. |
| `OPENAI_API_KEY` | Server-side project key with an account spending limit. |
| `OPENAI_MODEL` | An available model supporting the Responses API and Structured Outputs. No model is silently selected. |
| `AI_DAILY_REQUEST_LIMIT` | Default `100`; each request has bounded input/output sizes. Set provider budget alerts too. |
| `RESEND_API_KEY` | Server key from your Resend account. |
| `EMAIL_FROM` | Sender on a Resend-verified domain. Configure its DNS authentication before delivery tests. |
| `ADMIN_NOTIFY_EMAIL` | Administrator recipient for monthly draft alerts. |

Create the named administrator in Supabase Authentication and confirm their email. The dashboard uses Supabase password authentication, checks the confirmed-email allowlist on **every** admin request and stores a one-hour session in an HttpOnly, Secure, SameSite cookie. Admin endpoints enforce same-origin mutations and durable rate limits. A session expires after an hour; sign in again. No public API can list subscribers or approve/publish content.

## Facebook and September 2026

After configuring the Page token and redeploying Preview, open `/admin` → Facebook Connection → **Retrieve September & create draft** immediately. This authenticates with Meta, follows pagination using trusted Graph endpoints and filters actual timestamps for September 1–30 in Zambia (UTC+2). Retrieval must finish successfully before the month is stored. The scheduled worker also retrieves September on its first configured run while the draft is awaiting connection.

The draft is `/newsletter/september-2026`. Only an authenticated administrator can see its reports before publication. Without retrieved content, the public route displays an honest preparation message and is not indexed. August remains intact at `/newsletter/august-2026`.

With an AI key/model, source posts are rewritten into professional reports. Without AI, exact source text is saved for manual editing and is **not** represented as a completed professional issue. Review every fact, quotation and source date. A post date is not necessarily the event date. Approve and archive only photographs with documented rights/consent (especially children). Add approved photographs in the newsletter editor; save edits, approve the saved version, then publish. Enable subscriber notification only when intentionally sending the issue.

Imported posts have an original ID and original link. Rewrites never create another Facebook post. Administrators copy the revised caption and edit the original inside Facebook. No automatic editing is attempted because post-specific API edit eligibility has not been verified. New website-created stories can publish a caption to Facebook once; the returned ID is stored. Failed/ambiguous publication stays blocked pending reconciliation; automatic retries cannot duplicate a post.

## Subscribers, publications and delivery

`/subscribe` collects explicit consent and a frequency. Confirmation links expire after 24 hours, are stored only as hashes, require a confirmation button (GET does not opt anyone in), and can be used once. Existing confirmed subscriptions cannot be changed anonymously. Preferences and unsubscribe use signed capabilities in emails. Keep the token signing key private. Unsubscribe is available through a preferences page and RFC 8058 one-click email headers.

The publication transaction snapshots only eligible confirmed subscribers into a durable unique `(publication_id, subscriber_id)` queue. Facebook sync, source edits, draft creation and published edits cannot enqueue notifications. Immediate delivery runs on publication when enabled. Daily items are combined into a single digest per subscriber/day. Monthly subscribers receive approved newsletter issues only. The worker rechecks consent and frequency before sending, uses leases and persists exact provider payloads with Resend idempotency keys. Ambiguous attempts older than 23 hours are marked `uncertain` and require reconciliation against Resend; never blindly reset those rows. Queue `sent` means provider accepted, not verified inbox delivery. Monitor bounces and complaints in Resend; webhook-based bounce suppression is not included yet.

Daily cron (`/api/cron`, 05:00 UTC / 07:00 Zambia) handles sync, due deliveries and previous-month drafts. Vercel cron normally runs on Production deployments; in Preview, use admin sync, newsletter generation and **Process due email queue** controls. A more frequent sync/worker requires a suitable Vercel plan or an authenticated external scheduler. Publication processes the first 30 due immediate deliveries; larger queues drain in subsequent worker runs. Monthly drafts use approved published articles and approved media and never auto-publish/send. Administrator alerts are sent only to `ADMIN_NOTIFY_EMAIL`. Audit history remains visible even if email delivery fails.

## Preview acceptance checklist

1. Run `npm ci`, `npm test`, `npm run lint`, `npm run build`. GitHub Actions performs these checks for PR #1.
2. Redeploy the existing project's **Preview** for this branch. Confirm the deployment is Preview before testing. Do not promote it.
3. Verify `/admin` sign-in. Anonymous GET/POST requests must not return private data. Try an unauthorized Supabase user; access must be denied.
4. Sync twice and verify one row per Facebook ID. Edit a test original inside Facebook, resync, and confirm text/hash changes and any unpublished approval is invalidated.
5. Retrieve September with pagination. Verify actual source timestamps and all references. Public visitors cannot see draft reports. Inspect newsletter Preview, mobile layout, print/PDF, and preserved August issue.
6. With a dedicated test email, subscribe, confirm, choose preferences, unsubscribe and attempt repeat confirmation. No update may be sent while pending/unsubscribed. A failed confirmation send allows another signup attempt.
7. Publish an approved test story with notifications disabled: no mail. Publish a second with notifications enabled: one immediate notification. Retry publication, edit the article and resync Facebook: no duplicate send. Test daily digest with two stories and a due worker; monthly mail is sent only on approved issue publication.
8. Try AI follow-up questions, recent activities and unsupported claims. Check source links, request limits, safe provider failures, and absence of private records. Verify mobile chat, close/minimize and conversation restart.
9. Upload an approved photo twice: hash deduplication returns the existing asset. Assign an event album, view fullscreen, then revoke approval and verify it is no longer served publicly.

## Known external blockers

No Facebook token, Supabase credentials, email key or OpenAI key was present locally at implementation time. Live access, September report content and actual mail delivery cannot be verified until configuration. PR history reports Vercel daily deployment limits; wait for the quota to reset if the existing project's Preview is rejected. No production deployment or merge is authorized.

Dependency audit fixes stay within the installed major versions. Remaining advisories affecting development lint tooling are documented in the implementation report; do not downgrade Next.js or eslint-config-next to satisfy `npm audit fix --force`.

Implementation references: [OpenAI Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [Supabase API security](https://supabase.com/docs/guides/api/securing-your-api).
