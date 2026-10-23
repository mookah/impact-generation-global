import type { Metadata } from "next";
import Link from "next/link";
import { getFacebookUpdates } from "@/lib/facebook";

export const metadata: Metadata = {
  title: "Event Photo Albums",
  description: "See Impact Generation Global's latest event photographs grouped by ministry and activity.",
  alternates: { canonical: "/gallery/events" },
};

export default async function EventGalleryPage() {
  const feed = await getFacebookUpdates(50);
  const photos = feed.posts.filter((post) => post.imageUrl && !post.isVideo);
  const albums = Object.groupBy
    ? null
    : null;
  // Group by identified program/event. Editorial event IDs and permanent
  // cloud image storage can replace keyword classification in phase two.
  const grouped = new Map<string, typeof photos>();
  for (const photo of photos) {
    const group = grouped.get(photo.event) || [];
    group.push(photo);
    grouped.set(photo.event, group);
  }
  void albums;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="bg-slate-950 px-6 pb-16 pt-40 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-300">Our story in pictures</p>
          <h1 className="mt-4 text-5xl font-black">Event Photo Albums</h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-200">
            See moments from youth empowerment programs, camps, mission activities, and community outreach.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-6 py-14">
        <Link href="/gallery" className="font-bold text-emerald-800 hover:underline">← Main gallery</Link>
        {photos.length === 0 ? (
          <div className="mt-9 rounded-3xl border bg-white p-8">
            <h2 className="text-xl font-bold">Connected event albums are not available yet</h2>
            <p className="mt-3 text-slate-600">
              Explore our existing gallery while Facebook photo synchronization is being connected.
            </p>
            <Link href="/gallery" className="mt-5 inline-block font-bold text-emerald-800 underline">View the photo gallery →</Link>
          </div>
        ) : (
          [...grouped].map(([event, items]) => (
            <section key={event} className="mt-14">
              <h2 className="mb-6 text-3xl font-extrabold">{event}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <a key={item.id} href={item.url} target="_blank" rel="noopener noreferrer"
                    className="group overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.imageUrl!} alt={"Impact Generation - " + event}
                      loading="lazy" className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
                    <div className="p-4">
                      <p className="line-clamp-3 text-sm text-slate-700">{item.text || "Facebook event photograph"}</p>
                      <span className="mt-3 inline-block text-sm font-bold text-emerald-800">Open on Facebook →</span>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
