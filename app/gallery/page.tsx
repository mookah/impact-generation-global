import type { Metadata } from "next";
import Link from "next/link";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo moments from Impact Generation Global — youth camps, mentorship, school ministry, Pad A Girl, Cycle For Change and community outreach in Zambia.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            Gallery
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Impact in pictures
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            Real moments of mentorship, worship, outreach, dignity and growth —
            captured across our programs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <GalleryGrid />
        </div>
      </section>

      <section className="section bg-cream-100">
        <div className="shell text-center">
          <h2 className="display text-2xl text-brand-950 sm:text-3xl">
            Be part of the next story
          </h2>
          <p className="prose-body mx-auto mt-4 max-w-xl">
            Every photo here began with someone who said yes — a volunteer, a
            partner, a donor, a mentor.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/donate" className="btn btn-primary">
              Support the mission
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Volunteer with us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
