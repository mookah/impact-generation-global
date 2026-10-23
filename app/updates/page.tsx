import type { Metadata } from "next";
import Link from "next/link";
import { getFacebookUpdates } from "@/lib/facebook";
import { FACEBOOK_PAGE_URL } from "@/lib/site";
import FacebookVideoPreview from "@/components/FacebookVideoPreview";

export const metadata: Metadata = {
  title: "Latest News & Updates",
  description: "Follow Impact Generation Global's youth empowerment, mentorship, discipleship, missions, and community outreach updates from Zambia.",
  alternates: { canonical: "/updates" },
};

export default async function UpdatesPage() {
  const feed = await getFacebookUpdates(18);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 text-slate-900">
      <section className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-900 px-6 pb-20 pt-40 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[.25em] text-amber-300">Impact Generation Global</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Latest News & Updates</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Follow our youth camps, school ministry, mentorship, community outreach, and stories of transformation.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold">From our Facebook Page</h2>
          <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer"
            className="rounded-full bg-blue-700 px-5 py-3 text-sm font-bold text-white hover:bg-blue-800">
            Visit Facebook →
          </a>
        </div>
        {feed.posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {feed.posts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">{post.event}</span>
                  <time className="text-xs text-slate-500" dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
                  </time>
                </div>
                {post.isVideo ? (
                  <div className="mt-5"><FacebookVideoPreview url={post.url} title={"Impact Generation Facebook video " + post.id}/></div>
                ) : post.imageUrl ? (
                  <a href={post.url} target="_blank" rel="noopener noreferrer" aria-label="Open original Facebook photograph">
                    {/* Facebook media URLs expire; do not rely on them for permanent archival. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.imageUrl} alt={"Photograph from " + post.event}
                      loading="lazy" className="mt-5 aspect-video w-full rounded-2xl object-cover" />
                  </a>
                ) : null}
                <p className="mt-5 whitespace-pre-line break-words text-base leading-7 text-slate-700">
                  {post.text || "A new update from the Impact Generation Global Facebook Page."}
                </p>
                <a href={post.url} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex text-sm font-bold text-emerald-800 underline underline-offset-4">
                  View original Facebook post →
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-8">
            <h3 className="text-xl font-bold">
              {feed.status === "unconfigured" ? "Facebook connection is being set up" : "Recent updates are temporarily unavailable"}
            </h3>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Follow our official Page for the latest ministry news while website synchronization is being configured.
              Our existing programs and newsletters remain available below.
            </p>
            <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-block font-bold text-emerald-800 underline">Open official Facebook Page →</a>
          </div>
        )}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/gallery/events" className="rounded-full bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-900">Browse event photos</Link>
          <Link href="/newsletter" className="rounded-full border border-emerald-800 px-6 py-3 font-bold text-emerald-900 hover:bg-emerald-50">Read our newsletter</Link>
        </div>
      </section>
    </main>
  );
}
