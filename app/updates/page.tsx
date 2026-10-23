import type { Metadata } from "next";
import Link from "next/link";
import { getFacebookUpdates } from "@/lib/facebook";
import { FACEBOOK_PAGE_URL } from "@/lib/site";
import { UpdateCard } from "@/components/FacebookFeed";
import { latestFacebookPosts } from "@/lib/facebook-display";

export const metadata: Metadata = {
  title: "Latest News & Updates",
  description: "Follow Impact Generation Global's youth empowerment, mentorship, discipleship, missions, and community outreach updates from Zambia.",
  alternates: { canonical: "/updates" },
};

export default async function UpdatesPage() {
  const feed = await getFacebookUpdates(30);
  const updates=latestFacebookPosts(feed.posts,18);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 text-slate-900">
      <section className="bg-gradient-to-r from-slate-950 via-brand-950 to-slate-900 px-6 pb-20 pt-40 text-white">
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
        {updates.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {updates.map(post=><UpdateCard key={post.id} post={post} pageName="Impact Generation Global"/>)}
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
              className="mt-5 inline-block font-bold text-brand-800 underline">Open official Facebook Page →</a>
          </div>
        )}
        <div className="mt-12 flex flex-wrap gap-4">
          <Link href="/gallery/events" className="rounded-full bg-brand-800 px-6 py-3 font-bold text-white hover:bg-brand-900">Browse event photos</Link>
          <Link href="/newsletter" className="rounded-full border border-brand-800 px-6 py-3 font-bold text-brand-900 hover:bg-brand-50">Read our newsletter</Link>
        </div>
      </section>
    </main>
  );
}
