# Impact Generation Global — website administration

Ordinary content updates happen through **/admin**. No source-file editing or redeployment is needed after the upgrade and its database migration are installed. Keep your sign-in and API keys private.

## Update the calendar

1. Sign in and open **Events**. Select **Add new event**, or select an existing managed event to edit it.
2. Enter the title, description and venue. Choose the category and optional ministry program.
3. Set the start and optional end. All date and time fields use **Zambia time, Africa/Lusaka (UTC+2)**, regardless of your computer's timezone. Select **All-day event** when appropriate. A multiday event includes the final selected day.
4. Add an optional HTTPS registration link. Leave it empty to direct visitors to the contact page.
5. Select an approved poster or photograph. To upload a new one, use **Upload an approved flyer or photograph**, supply an accurate caption and confirm publication rights and consent. JPEG, PNG and WebP files up to 10 MB are supported. Save the event after uploading so the image selection is retained. Use **Earlier** to move an image toward the front.
6. Leave **Publish this event after review** unchecked and choose **Save event draft**. This keeps the event private.
7. Choose **Preview event**. Check the title, dates, venue, status, description and images.
8. Select the publication checkbox, confirm the factual and image review, then choose **Save & publish event**. The event now appears inside the public calendar. Reload the public calendar to see it immediately; an already-open calendar refreshes every minute and when the visitor returns to the tab.

To correct an event, select it, change the fields, review again and save. To cancel or postpone it, change **Status**, review and save while leaving it public so visitors can see the notice. A postponed event retains its previous dates until you enter confirmed new dates; the public details explain this.

**Unpublish** removes an event from the public calendar while retaining its private record. **Archive** removes it from the public calendar and retains its history. To restore an archived event, edit it, clear the archive checkbox and review before publishing. Events are not permanently deleted.

The **Existing website listings** section contains older entries. They are not proof of newly confirmed dates, and weekly/monthly recurrences are not automatically invented. Select an entry, verify it, then save it as a managed event. This managed record replaces that legacy listing rather than duplicating it. Unpublishing its replacement also hides the old listing.

Visitors can select Month, Week, Year or List, choose Today, select a date, inspect an event, share its link or download an **.ics** calendar file. Registration and contact links appear in the details.

## Manage IMPACT Buddy

1. Open **Impact AI** in the administrator dashboard.
2. Choose **Cycle for Change — Buddy on a bicycle** or **Welcome and wave**. Both styles use the same assistant. Reduced-motion visitors see a still character.
3. Edit the welcome message. It can contain up to 400 characters.
4. Enable or disable automatic greetings. This does not disable the visitor's manually opened guide or conversation.
5. Choose once per browsing session, once per day, or manual opening only. Session dismissal is remembered. Visitors who disable browser storage can open the guide manually.
6. Optionally select verified Facebook updates to feature. Review their original links, public availability and children's privacy, then confirm the review checkbox. Up to three meaningful updates from the last 60 days appear. With no selection, the authorized recent Facebook feed supplies them. If no appropriate updates are available, visitors still receive program and navigation links.
7. Choose **Preview greeting**, then **Save Buddy settings**. Visitors receive the updated settings within about a minute or on their next page load.

**Restore default greeting** changes the form; select Save to apply it. Greetings and topic summaries do not call OpenAI. Common greetings, thanks and “How are you?” also use local replies. General knowledge questions use the existing OpenAI model and usage limits. Ministry claims require verified source material; Buddy has no live web search and cannot verify breaking news or changing prices. Check important answers.

## Manage Facebook content

1. Open **Facebook Connection** or **Facebook Posts**.
2. Sync recent posts or retrieve a particular month. A month import follows all accessible pagination. Errors leave the previous newsletter draft intact.
3. If Facebook reports **Meta code 190**, ask the person managing the official Page connection to refresh the Page token through your existing configuration. Never paste tokens into public forms or chat.
4. Review each original post. Select **Generate professional rewrite** for that post only. Its own button shows progress. A usable saved article is reused rather than paid for again.
5. Review the article in **AI Content Editor**, edit and save it. Confirm factual/privacy review, approve it and explicitly publish the website story when ready. Imported Facebook posts are not automatically reposted to Facebook.
6. Approve image rights and consent before archiving a source photograph. Facebook thumbnails can expire; archived approved photographs provide persistent website images.

Video cards display authorized thumbnails when available. Eligible canonical video/Reel links load Facebook's own player only after Play is selected. Playback depends on Facebook visibility, permissions, cookies and browser restrictions. A **Watch on Facebook** link is always available; close an unavailable player and use that link. The website does not download or rehost Facebook videos.

## Prepare a newsletter

1. Open **Newsletters**. Save any unsaved report edits before generating again.
2. **Build September from saved sources** reuses existing synchronized posts and saved articles. **Refresh Facebook & build September** checks Facebook again first. Other months use the month field.
3. Read the result counts and warnings. Attachment-only captions and technical paths are excluded from AI reports. A run makes at most three new AI requests and stops after an API failure; completed articles remain saved.
4. Edit each report's heading, body and category. Verify its original source and publication date; the publication date does not prove the date of an activity.
5. Use **Move up / Move down** to reorder reports. Select approved photographs, use **Earlier / Later** to reorder them, or remove an image. Upload new images through Gallery first.
6. Choose **Save Draft**. Saved text, report order and image order survive page reloads. **Preview / Print PDF** uses the saved version. In the browser print dialog choose **Save as PDF**, A4 paper and background graphics for the blue and gold cover.
7. After reviewing every report and image, select the factual/privacy review and **Approve saved draft**. Only then is **Publish approved issue** available.
8. Subscriber notifications default to **OFF**. Saving, generating and approving do not send emails. Select notification consent only when you intentionally want eligible confirmed subscribers notified during explicit publication.

Never send test newsletters to real subscribers. August's existing edition remains separate. September remains a private draft until you approve and publish it.

## One-time release setup

The developer must apply `supabase/migrations/20261024_premium_events_buddy.sql` to the **Preview database first**. It adds event fields and private Buddy settings without deleting existing data or changing event RLS policies. Test the preview with the existing administrator account and approved images. Do not point tests at private subscriber records.

If settings say the migration is unavailable, stop and ask the developer to finish that setup. Real Facebook playback, Page access and deployment quota must be checked before release. No production deployment, GitHub push or subscriber email is authorized by this guide.
