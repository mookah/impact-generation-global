# Premium upgrade — consolidated local checkpoint

Branch: `feature/smart-content-foundation-20261023`  
Existing PR: <https://github.com/mookah/impact-generation-global/pull/1>

All existing local work is retained. No commits, pushes, subscriber emails, production database migrations or deployments were made for this upgrade.

## Implemented

| Area | Changes | Main files |
| --- | --- | --- |
| Calendar | Month/week/year/list, selected-day details, category colors, upcoming cards, Zambia timezone, multiday ranges, cancelled/postponed/past states, sharing and ICS downloads | `components/EventsCalendar.tsx`, `components/EventsCalendar.module.css`, `components/EventDetails.tsx`, `lib/events.ts`, `lib/server/events.ts`, `app/events/`, `app/api/events/` |
| Event administration | Create/edit private drafts; review and publish; posters/photos; program/category; registration; unpublish/archive; legacy listing replacement | `components/EventsManager.tsx`, `components/AdminDashboard.tsx`, `app/api/admin/route.ts`, `lib/server/event-admin.ts` |
| Buddy | Original vector doll, cycling/helmet and waving styles, reduced motion, session/daily/manual greeting, admin preview/settings, verified recent topic summaries | `components/ImpactBuddy.tsx`, `components/ImpactBuddy.module.css`, `components/BuddyGreeting.tsx`, `components/BuddySettings.tsx`, `components/ImpactAssistant.tsx`, `lib/buddy.ts`, `lib/server/buddy.ts`, `app/api/impact-buddy/route.ts` |
| Conversation | Free common greetings; general knowledge answers; source-grounded ministry answers; existing model, per-visitor and daily limits retained | `app/api/impact-ai/route.ts`, `components/ImpactAssistant.tsx` |
| Facebook presentation | Shared readable cards; authorized thumbnails; canonical video/Reel handling; click-only official iframe; timeout/network fallback and persistent original link; article/album placement | `lib/facebook.ts`, `lib/facebook-display.ts`, `components/FacebookVideoPreview.tsx`, `components/FacebookFeed.tsx`, `app/updates/page.tsx`, `app/news/[slug]/page.tsx`, `app/gallery/events/[slug]/page.tsx` |
| Existing newsletter | Saved September draft, reusable AI article, individual editing/photo/report order and print layout retained; August untouched | `components/NewsletterEditor.tsx`, `components/DynamicNewsletter.tsx`, `components/DynamicNewsletter.module.css`, `lib/server/content.ts` |
| Database | Additive event columns, legacy replacement index and private Buddy settings; no event policy changes or event seeds | `supabase/migrations/20261024_premium_events_buddy.sql`, `lib/content-types.ts` |
| Training | Step-by-step administration instructions | `docs/WEBSITE_ADMIN_GUIDE.md` |

## Verification

- 28 focused tests pass across `tests/premium.test.mjs`, `tests/server.test.mjs`, `tests/newsletter.test.mjs`, `tests/facebook-display.test.mjs`, and `tests/supabase.test.mjs`.
- TypeScript passes with `--noEmit --incremental false`.
- Focused ESLint passes; the unused type import found in the first pass was removed.
- One optimized Next.js production build completed successfully. This is a local build, not a deployment.
- The additive migration ran twice against an isolated PGlite database. Existing event data, RLS and policies survived; private settings remain inaccessible to anonymous roles.
- Both Buddy SVG styles were rendered and visually inspected. Preview: `.local-backups/impact-buddy-styles.png`.
- Common greetings, general knowledge routing, ministry source routing, duplicate rewrite prevention and API failures use mocks; no paid API calls were made during tests.

## External checks still required

1. **Apply the migration to the intended Preview database.** Only the REST service key is configured locally; no direct SQL connection or Supabase management credential is available. The website does not expose a SQL execution endpoint. Until the migration is installed, event-writing and Buddy-settings controls display a setup notice and remain disabled. Existing event records are retained.
2. **Refresh the official Facebook token.** A read-only check returned HTTP 401, Meta code 190: expired Page token. No new Facebook posts were imported. September still contains one private report based on an existing AI draft, from three previously imported authentic source records; two unsuitable captions remain excluded. There are no approved September photographs selected.
3. **Check permitted video playback in real browsers.** Canonical URLs, thumbnail fallback and lazy loading are covered by tests. Facebook's cross-origin permissions/cookie restrictions cannot be verified from mocked tests, and an iframe load event does not prove playable media. The original Facebook link is always available.
4. **Check desktop/mobile and print rendering on the actual Preview.** Browser automation surfaces were unavailable in this session. Server rendering, calendar interaction logic and mascot artwork were checked; live browser layout/playback is not claimed as verified.
5. **Verify Vercel deployment quota.** The checkout is linked to the existing `impact-generation-global` project. No Vercel API credential or CLI is available for a quota check. No deployment request was made or retried.

PR #1 is open on the expected branch. Its remote contents have not been updated with this local checkpoint. Once the external setup/checks are complete and the owner authorizes the checkpoint, use the existing repository and Vercel project for one Preview deployment. Do not deploy production or send subscriber notifications as part of verification.
