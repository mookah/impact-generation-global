import { configured, db } from "@/lib/server/core";
import type { Metadata } from "next";
import Link from "next/link";
import EventsCalendar from "@/components/EventsCalendar";
import { events } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events Calendar",
  description:
    "The full Impact Generation Global event calendar — browse upcoming programs, camps, outreach and meetings by year, month or week.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  const approved = configured() ? await db<{id:string;title:string;date:string;location:string}[]>("igg_events?approved=eq.true&order=date.asc&limit=100") : [];
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            Calendar
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Events &amp; gatherings
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            Every camp, outreach, fellowship and meeting for the year — in one
            place. Browse by month, zoom into a week, or scan the whole year.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="mb-8 grid gap-4 sm:grid-cols-2">{approved.map(e=><Link className="card p-5" key={e.id} href={`/events/${e.id}`}><h2 className="text-xl font-bold">{e.title}</h2><p className="mt-2 text-sm">{new Date(e.date).toLocaleString('en-GB',{timeZone:'Africa/Lusaka'})} ? {e.location}</p></Link>)}</div><EventsCalendar events={events} />
        </div>
      </section>

      <section className="section bg-cream-100">
        <div className="shell grid gap-6 md:grid-cols-2 md:gap-10">
          <div>
            <h2 className="display text-2xl text-brand-950 sm:text-3xl">
              Want us at your school, church or community?
            </h2>
            <p className="prose-body mt-4">
              We partner with schools, churches and community organisations
              throughout the year. Get in touch and we will find a date.
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-end">
            <Link href="/contact" className="btn btn-primary">
              Invite our team
            </Link>
            <Link href="/blog" className="btn btn-outline">
              Read updates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
