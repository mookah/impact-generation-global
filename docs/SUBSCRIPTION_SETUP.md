# Newsletter subscription configuration

The existing form design is preserved. `RATE_LIMIT_SALT` is used only on the server to hash a visitor's network identifier and rate-limit scope before storing request counters. Neither the salt nor the plain network identifier is sent to the database as the rate-limit key.

A cryptographically random 32-byte salt has been generated in the ignored local `.env.local`. Its value has not been printed or committed. Restart the local Next.js process after changing environment variables.

## Vercel

The initial local Vercel login returned HTTP 403 (`Not authorized`). The official CLI subsequently refreshed the session and confirmed account `mookah` with access to `mookahs-projects/impact-generation-global`. The same local `RATE_LIMIT_SALT` has now been stored as a hidden Secret in Development, Preview and Production. No Production deployment was performed. The steps below are for future configuration recovery.

1. Sign in to Vercel and open **mookahs-projects → impact-generation-global → Settings → Environment Variables**.
2. Add the server-only key **`RATE_LIMIT_SALT`**. Copy its value directly from your local `.env.local` in the editor into Vercel's secret-value field. Do not paste the value into chat, source code or logs. Do not use a `NEXT_PUBLIC_` prefix.
3. Select **Development, Preview and Production**, then save. Use the same value for this key. Adding configuration does not deploy code.
4. Redeploy only the existing feature branch's **Preview** so the new configuration is loaded. Leave Production deployment for explicit approval.

## Remaining required services

The local file currently has no configured database or email provider. Setting the salt alone does not establish subscriber storage or enable delivery. Add these values privately in local development and the matching Vercel environment:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: the selected Supabase project, with `supabase/migrations/20261023_content.sql` applied once.
- `RESEND_API_KEY`, `EMAIL_FROM`: a Resend key and sender on a verified domain.
- `SITE_URL`: the exact local or Preview origin used for confirmation and preference links.
- `SUBSCRIBER_TOKEN_SECRET`: a separate cryptographically random secret of at least 32 bytes. Do not reuse the rate-limit salt.

Use an isolated Preview database and test recipient for verification. No live email acceptance has been verified. A confirmation request is successful only after Resend returns an acceptance ID; acceptance does not prove inbox delivery. Rejected or unconfirmed provider responses return an error and allow retry. Duplicate pending/confirmed requests do not generate duplicate confirmation emails.

## Focused verification

Run `node --test tests/subscription.test.mjs`. This exercises the actual subscription handler and SQL migration in an isolated Postgres engine with a simulated provider: valid signup, normalized duplicates, confirmation and repeated-token rejection, preferences, tamper rejection, unsubscribe, missing provider configuration, provider rejection, retry, and success responses without acceptance IDs. A separate test verifies salted rate-limit identifiers.

For live acceptance after configuration: submit a dedicated test email, confirm the email's provider ID in Resend, open the confirmation link and press Confirm, retry signup, change preferences, then unsubscribe. No update may be sent before confirmation or after unsubscribe.
