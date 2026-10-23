# Impact Generation Global: Smart Content Platform

## Current implementation (this branch)
- Search index readiness: site metadata, open-graph sharing information, structured Organization data, robots and sitemap.
- Official Facebook Page feed reader on the server, using authorized Page credentials. No tokens are published to the browser.
- /updates displays recent Page posts, photographs, and click-to-play Facebook video previews (where Facebook embedding is supported).
- /gallery/events groups photos attached to recent Facebook posts by program-based keywords. This is **not** a permanent media archive or Facebook album API integration.
- Impact Guide supports non-generative answers from verified website pages; the "Latest" choice fetches current Page posts when connected.
- Removed the automatic popup that advertised already-past August 2026 events. The Impact Guide is opt-in.
- Corrected broken original /gallery image paths.

## IMPORTANT: The automatic Facebook feed remains off until Meta Page credentials are provided in Vercel
Required server-side environment variables:
- NEXT_PUBLIC_SITE_URL=https://www.impactgenerationglobal.org
- FACEBOOK_PAGE_ID=<numeric ID of official Impact Generation Facebook Page>
- FACEBOOK_PAGE_ACCESS_TOKEN=<Meta Page access token for Page with authorized access>
- FACEBOOK_GRAPH_VERSION=v26.0 (check current supported API version)

Only authorized Facebook Page administrators should obtain tokens through Meta's official developer tools. Meta permissions/features and App Review depend on the app's use case. Typically seek pages_read_engagement and any other Page permissions the current Graph API requires for your Page. Do not paste Page tokens into source files or chat and do not use scraping. Treat tokens as secrets and rotate on compromise. Confirm the connected Page is the **official** Page.

How to test:
1. Configure Vercel environment variables for a preview deployment before production.
2. Redeploy, visit /updates and ensure it shows the official Page's real posts.
3. Confirm /api/impact-updates returns a connected status and contains no credentials.
4. Visit /gallery/events and verify event grouping; classify unusual posts manually later.
5. Click Play on a public Facebook video to load its embed. Private/deleted/region-blocked videos may fail.
6. Use the Impact Guide and choose Latest.
7. Confirm /robots.txt and /sitemap.xml list the right production domain and run an indexing test in Search Console.

## Phase 2 — permanent editorial CMS and automatic publishing
Recommended: Supabase database + Supabase Storage (or equivalent), with an admin-only dashboard and authenticated editors. Proposed entities:
- events: id, title, slug, start_date, end_date, description, location, status
- articles: id, source, source_id, event_id, headline, body, slug, published_at, review_status, source_link
- gallery_images: id, event_id, storage_url, alt_text, captured_at, source_post_id, consent_status, review_status
- newsletter_issues: id, date_range, summary, editor, status, sent_at
- subscribers: id, email, consent_at, consent_source, unsubscribe_at
- sync_runs: id, started_at, finished_at, status, error_summary
- chatbot_knowledge: id, content_id, updated_at, approved

Automated ingest: Meta Page webhook (where available and approved) plus a scheduled reconciliation task. Deduplicate using original Facebook Post ID. Associate photos with event ID where possible using a caption convention such as "#IGGYouthCamp2026" or editor assignment. Do not trust keyword matching as a final event ID. Download only content you own or have the necessary rights/consent to store permanently. For photos of minors, obtain appropriate consent before public reuse; an already-public social post does not automatically establish reuse consent for all contexts.

Suggested workflow:
Facebook published post -> authorized webhook or poll -> draft record -> privacy/relevance filter -> editor approval -> publish original editorial web story -> upload approved photographs to durable object storage -> create event album -> regenerate sitemap.
The current phase 1 feed is read-only; it does **not** create permanent articles or copy photos into a storage account.

## Phase 3 — automatic newsletters
- Combine approved articles, selected Facebook updates, and media uploaded in the CMS.
- Generate a monthly newsletter draft with section highlights, source links, event dates and photo credits.
- Require editor preview and approval before sending; check factual accuracy and child privacy.
- Store issues as SEO-friendly HTML archives and optional PDF.
- Use a consent-based provider such as Brevo, Mailchimp, or Resend for email delivery, double opt-in where appropriate, unsubscribe link, sender authentication (SPF/DKIM/DMARC), and delivery reporting.
- Never automatically subscribe Facebook followers or extract emails without consent.

## Phase 4 — AI assistant
- Replace the deterministic Impact Guide with a server-side model and retrieval over approved CMS records.
- Prefer clear citations to website articles, event pages and Facebook originals.
- Rate limit traffic, cap token spend, provide a human contact option, and disclose automation.
- Block exposure of credentials, unpublished drafts, donor records and any private details about young people.
- Make the launcher unobtrusive and avoid overlaying navigation.

## SEO and growth
- Register verified production property in Google Search Console.
- Submit https://www.impactgenerationglobal.org/sitemap.xml.
- Improve original text on each program, write SEO-friendly event reports with dates and locations, and add measured impact metrics with sources.
- Add page-specific metadata for static client pages using layout-level metadata or refactor to server pages.
- Compress large existing images and remove ZIP/RAR backups from public/ to reduce exposure and performance costs.
- Measure Core Web Vitals and site performance, especially for mobile in Zambia.

## Nonprofit grants and monetization
- Google for Nonprofits is available in Zambia for eligible registered nonprofit structures, subject to Goodstack verification and country/product requirements.
- Google Ad Grants offers ad credit, not cash donations; eligibility and ongoing compliance are separate from AdSense.
- Google's current Ad Grants website policy states not to display AdSense ads on the website used for Ad Grants. Prioritize grant eligibility and mission-specific support over display advertising.
- For actual charitable grants, prepare registration documents, governance, policies, bank details, program budgets, evidenced impact, financial reports, safeguarding, and clear project proposals. Do not publicly post sensitive documentation.
- Do not add AdSense scripts unless the organization explicitly chooses that revenue path and independently verifies Google policy compliance.
