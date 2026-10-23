# One consolidated Preview deployment

Status: deployment attempts and GitHub pushes are paused while Vercel reports `api-deployments-free-per-day`. Do not automatically retry, schedule retries, push test-only checkpoints, merge PR #1, or deploy Production. Local development and testing may continue. Current local test additions remain uncommitted for a consolidated checkpoint.

## Existing destination

- Account: `mookah`
- Team: `mookahs-projects`
- Project: `impact-generation-global`
- Project ID: `prj_HHkLfVY3SaLOB6uOtrHuMsexZAmX`
- Existing PR: https://github.com/mookah/impact-generation-global/pull/1
- Existing branch: `feature/smart-content-foundation-20261023`

Keep the current `.vercel/project.json` link. `.vercelignore` excludes local secrets, dependency caches and backup archives. Original work remains backed up in the retained stash and `.local-backups/pre-integration-20261023.bundle`.

## Configuration gate

The local rate-limit salt is at least 32 random bytes, ignored by Git, and not printed by verification. Vercel lists it as a hidden Secret for Development, Preview and Production. Other required service variables are still missing from the local file and Preview environment:

- Subscriber storage/authentication: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`; apply the existing migration once. The server key variable accepts either a new `sb_secret_` API key or a legacy service-role JWT. New API keys are sent only in `apikey`; user JWTs remain separate in `Authorization`.
- Email: `RESEND_API_KEY`, verified `EMAIL_FROM`, `SITE_URL`, separate `SUBSCRIBER_TOKEN_SECRET`.
- Authentic Facebook retrieval: `FACEBOOK_PAGE_ACCESS_TOKEN`. Page ID `370924362777718` and Graph version `v26.0` already have server defaults.
- Chat and rewrites: `OPENAI_API_KEY`, `OPENAI_MODEL`.
- Administration/scheduling: `ADMIN_EMAILS`, `CRON_SECRET`; administrator draft email additionally needs `ADMIN_NOTIFY_EMAIL`.

Enter credentials directly into secure local/Vercel configuration. Use an isolated Preview database and test recipient. No real email or AI response is verified by mocked-provider tests. No authentic September reports have been retrieved; September remains awaiting verified content and approval.

Supabase connection follow-up: the user reports that Supabase settings are saved in Preview. The most recent read-only listing for the linked project still showed only `RATE_LIMIT_SALT`; the branch-scoped connection check could not obtain `SUPABASE_URL` or `SUPABASE_SERVICE_ROLE_KEY`. Confirm the project and variable names before claiming live database access. `scripts/check-supabase.mjs` uses the actual server request helper for a zero-row, read-only query and never prints credentials, URLs or database rows. No deployment is required for that check.

Secret-key request handling (code complete, live access unverified): `lib/server/core.ts` sends the server key only in `apikey`. Values starting with `sb_` are treated as opaque API keys and are never placed in `Authorization`, even if they contain dots; only JWT-shaped legacy service-role keys are additionally copied to `Authorization` when no user is signed in. A signed-in user's access token is always used as `Authorization: Bearer` in `admin()` and `authHeaders()`, kept separate from the server key. Administrator sign-in now uses the same `supabaseHeaders()` helper. Local state: 12 tests pass and lint passes; `.env.local` contains no Supabase URL or service key (`SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY`), so no live query has been run against the Preview project. Secret keys are rejected when sent from a browser and bypass Row Level Security, so they must stay in server-only code. Nothing was pushed or deployed.

## Local acceptance

Latest local run: **8 test cases passed**, covering all four requested systems; TypeScript checking passed. HTTP smoke checks passed for **14 pages**, including both monthly archive routes; anonymous admin and cron requests were denied, and forged admin mutations were rejected. The chatbot follow-up recommendation fix and added tests remain local for the consolidated checkpoint. Changed files passed a scan against local secret values.

Run `npm test` for subscriptions, confirmation, preferences, unsubscribe, duplicate delivery prevention, complete Facebook pagination, September draft boundaries, source/media approval, chatbot public-data access, follow-up conversations and AI cost limits. These tests use isolated PostgreSQL and simulated external providers, without live sends or AI charges.

Run `npm run lint` for changed source/tests. The application build already passed; do not repeat build repairs. Run a fresh build only when application changes require it or immediately before the eventual consolidated release checkpoint. For local HTTP checks use the existing server and `scripts/smoke-content.mjs` (set `SMOKE_BASE_URL` if needed).

## When quota and configuration are ready

1. Review all local changes together, scan for secrets, and create one consolidated commit on the existing feature branch.
2. Choose **one** deployment trigger. Pushing the branch may already trigger Vercel through GitHub. Earlier GitHub checks listed several existing Vercel projects for this repository, which can multiply deployment requests; review that routing before the consolidated push. If GitHub triggers the intended Preview, use it; do not also run a CLI deployment. If automatic deployment is unavailable, use one explicit CLI Preview deployment against the existing project (`--environment preview`, verified project/team). Do not change unrelated Vercel projects or integrations.
3. Verify the resulting commit, project ID and Preview target. If Vercel still rejects the request, stop; do not retry in a loop.
4. Test subscription with a dedicated recipient and verify Resend acceptance ID, then confirm, change preferences and unsubscribe. Verify duplicate requests do not send again.
5. Retrieve authentic September posts with full pagination, review the private draft, verify sources and approved photos, and confirm August is unchanged. Do not publish or send the draft without approval.
6. Verify Facebook sync/edit detection and chatbot follow-ups with configured providers. Confirm safe failures and absence of private subscriber records.
7. Record the Preview URL and results. Leave PR #1 open and Production unchanged.
