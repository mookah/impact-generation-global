# Chatbot production deployment

The browser posts to `/api/impact-ai` on its current origin. Next.js runs this
Node.js route on Vercel and calls `https://api.openai.com/v1/responses` with
server-only credentials. No localhost service, separate AI backend, browser
API key, CORS wildcard or visitor sign-in is required. Keep same-origin checking.

## Findings

On 24 October 2026, the public production `/api/impact-buddy` returned 200,
while a same-origin POST of a synthetic greeting to `/api/impact-ai` returned
503. In the previous route, the database-backed visitor rate limit ran before
greetings and before any OpenAI request. Therefore the observed failure is in
the rate-limit/configuration/database step, rather than a browser connection to
OpenAI. The exact missing variable or database error cannot be confirmed without
Vercel Production settings and function logs. Local Supabase credentials passed
a read-only database check. Local `.env.local` values do not prove that the
Production deployment has the same configuration or code.

## Required Vercel Production environment variables

| Name | Purpose |
| --- | --- |
| `SUPABASE_URL` | Hosted Supabase HTTPS project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server secret/service-role key for the same project |
| `RATE_LIMIT_SALT` | Stable random secret used for hashed visitor rate-limit keys |
| `OPENAI_API_KEY` | Active OpenAI API key with API billing/quota |
| `OPENAI_MODEL` | Model accessible to that key and supporting the Responses API |

Optional: `AI_DAILY_REQUEST_LIMIT` defaults to `100`. For Facebook-backed recent
updates, configure `FACEBOOK_PAGE_ACCESS_TOKEN`, `FACEBOOK_PAGE_ID` and
`FACEBOOK_GRAPH_VERSION`. Facebook failure already falls back to other public
sources. No chatbot secret should have a `NEXT_PUBLIC_` prefix.

## Deployment and verification

1. Verify the five required variables are populated for **Production**, without
   literal surrounding quotes or accidental whitespace. Keep all secrets out of
   Git and browser bundles. Do not upload `.env.local`.
2. The selected Supabase project must have the existing migrations applied,
   including `20261023_content.sql` (`igg_rate`, `igg_limits`, `igg_audit` and
   public-content tables) and subsequent migrations used by the website. The
   server key must be allowed to call `igg_rate` and access those tables. Do not
   reapply migrations blindly or make private tables public.
3. Deploy the corrected code as a new Production deployment. Environment variable
   changes only apply to new deployments. The AI route declares the Node.js
   runtime and a 180-second function maximum; source requests run concurrently
   and the OpenAI fetch has a 45-second timeout. The client request is bounded
   to 185 seconds and handles non-JSON gateway responses.
4. Check `GET /api/impact-buddy`, a same-origin `POST /api/impact-ai` greeting,
   a general question, a ministry question and a follow-up on the deployed
   domain. A greeting alone does not test Supabase or OpenAI. Use synthetic text.
5. Inspect Vercel function logs for `[impact-ai]` and `[server-db]` if a question
   fails. The error response supplies `X-Request-Id`; correlate it with the
   route log. `configuration` identifies missing variable names;
   `visitor_rate_limit` points to Supabase/`igg_rate`; `public_sources` points to
   published-content retrieval; `generation` points to daily allowance,
   OpenAI or audit storage. Provider HTTP 401/403 indicates credentials/access;
   429 indicates quota/rate limiting. Logs deliberately omit bodies, credentials,
   IP addresses, database paths and exception messages.

Code changes preserve the chat layout, mobile styles and conversation history.
No packages are required. Local automated tests mock OpenAI and database failures;
they do not establish that the Production account has quota or correct variables.

## Verification results (24 October 2026)

- `npm.cmd run build`: passed, including TypeScript and dynamic API route output.
- `npm.cmd test`: all 31 tests passed, including conversation history, missing
  configuration, input validation, origin rejection, rate limits, provider
  network errors, non-JSON output and incomplete responses.
- ESLint on the four changed application files: passed.
- HTTP tests against `next start` at `http://localhost:3108`: greeting 200,
  cross-origin request 403, real AI question 429 (`The daily AI allowance has
  been reached.`). The last check reached the database-backed global limiter;
  no generation was performed and the spending cap was not increased. Wait for
  the reservation to expire or intentionally revise `AI_DAILY_REQUEST_LIMIT`
  before verifying a real generated answer. Limits are stored in Supabase.
- Vercel deployment/settings access was unavailable in this session. The fix has
  not been deployed and the exact failing Production variable/migration remains
  unverified.

References: [Vercel environment variables](https://vercel.com/docs/environment-variables)
and [official OpenAI text generation documentation](https://developers.openai.com/api/docs/guides/text).
