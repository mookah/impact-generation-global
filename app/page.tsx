import Image from "next/image";
import Link from "next/link";
import { mission, programs, values, vision } from "@/lib/site";

const impactStats = [
  { value: "100s", label: "Young people reached" },
  { value: "6", label: "Active programs" },
  { value: "100 KM", label: "Cycle For Change" },
  { value: "2", label: "Countries served" },
];

export default function Home() {
  const featured = programs.slice(0, 3);

  return (
    <main className="bg-white text-slate-900">
      {/* ============================= HERO ============================= */}
      <section className="relative isolate overflow-hidden bg-brand-950">
        <Image
          src="/images/hero.webp"
          alt="Young people from Impact Generation Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-70"
        />

        <div className="absolute inset-0 bg-linear-to-b from-brand-950/90 via-brand-950/75 to-brand-950/95" />

        <div className="shell relative flex min-h-[min(78vh,640px)] flex-col justify-center py-16 md:py-24">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-sm sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Faith • Purpose • Transformation
          </p>

          <h1 className="display mt-5 max-w-3xl text-4xl text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Empowering a generation.
            <span className="block text-gold-400">Transforming lives.</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-brand-100/90 sm:text-lg sm:leading-8">
            Impact Generation Global walks with young people in Zambia —
            building faith, character, dignity and purpose through
            discipleship, mentorship, education and practical outreach.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/programs" className="btn btn-gold">
              Explore Our Programs
              <span aria-hidden="true">→</span>
            </Link>

            <Link href="/donate" className="btn btn-ghost">
              Donate
            </Link>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-4 gap-y-6 border-t border-white/10 pt-6 sm:grid-cols-4 sm:gap-6">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-bold text-gold-400 sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-xs font-medium leading-5 text-brand-100/70 sm:text-sm">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================= WHO WE ARE ============================= */}
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow">Who We Are</p>

            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl lg:text-5xl">
              Every young person has God-given potential.
            </h2>

            <p className="prose-body mt-5">
              Impact Generation Global is a Christ-centered nonprofit walking
              alongside young people as they discover purpose, build character
              and become agents of positive change in their families and
              communities.
            </p>

            <p className="prose-body mt-4">
              Through discipleship, mentorship, education, counselling,
              leadership development and healthy living, we are building a
              generation prepared to influence the future.
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-800 transition hover:gap-3"
            >
              Read our vision and mission
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 sm:aspect-[5/4]">
            <Image
              src="/images/mission.webp"
              alt="Impact Generation Global team serving the community"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============================= VISION & MISSION ============================= */}
      <section className="section bg-cream-100">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Our Direction</p>
            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              Vision &amp; mission
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
            <article className="card p-6 sm:p-8">
              <span className="inline-flex h-10 items-center rounded-full bg-brand-800 px-4 text-xs font-bold uppercase tracking-[0.15em] text-white">
                Vision
              </span>

              <p className="mt-5 text-lg leading-8 text-brand-950 sm:text-xl sm:leading-9">
                {vision}
              </p>
            </article>

            <article className="card p-6 sm:p-8">
              <span className="inline-flex h-10 items-center rounded-full bg-gold-400 px-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-950">
                Mission
              </span>

              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                {mission}
              </p>
            </article>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.slice(0, 4).map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="text-base font-bold text-brand-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= PROGRAMS ============================= */}
      <section id="programs" className="section">
        <div className="shell">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow">What We Do</p>
              <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
                Programs that change lives
              </h2>
              <p className="prose-body mt-4">
                Practical, faith-centered programs designed to build character,
                restore dignity, encourage healthy choices and release purpose.
              </p>
            </div>

            <Link href="/programs" className="btn btn-outline shrink-0 text-sm">
              All programs
            </Link>
          </div>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="card card-hover group overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={program.image}
                    alt={program.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-brand-950">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {program.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= UPCOMING ============================= */}
      <section className="section bg-brand-950 text-white">
        <div className="shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
              What&apos;s Coming Up
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              Join us at a program or event.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-brand-100/80">
              From weekly fellowship to annual camps, our calendar shows every
              gathering for the year — browse by month or week.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/events" className="btn btn-gold">
                View the calendar
              </Link>
              <Link href="/blog" className="btn btn-ghost">
                Latest updates
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ["18–23 Aug 2026", "Youth Camp 2026"],
              ["22 Aug 2026", "Cycle For Change Festival"],
              ["12 Dec 2026", "Year-End Thanksgiving"],
            ].map(([date, title]) => (
              <div
                key={title}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-4"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  {date}
                </p>
                <p className="mt-1 text-base font-semibold">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= IMPACT IN ACTION ============================= */}
      <section className="section bg-white">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Impact In Action</p>
            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              More than programs. These are lives.
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-3">
            {[
              {
                src: "/images/events/youth-camp-worship-session.webp",
                alt: "Youth Camp worship session",
                label: "Discipleship",
                title: "Youth Camp",
              },
              {
                src: "/images/events/cycle-for-change-kids-bikes.webp",
                alt: "Young cyclists",
                label: "Healthy Living",
                title: "Active Generation",
              },
              {
                src: "/images/events/youth-camp-team-building.webp",
                alt: "Youth teamwork and leadership",
                label: "Leadership",
                title: "Building Leaders",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-900"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-950 via-brand-950/70 to-transparent p-5 pt-16 text-white">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold-300">
                    {item.label}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-7 text-center">
            <Link href="/gallery" className="btn btn-outline text-sm">
              See the full gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ============================= FINAL CTA ============================= */}
      <section className="section">
        <div className="shell">
          <div className="overflow-hidden rounded-2xl bg-brand-900 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
              Join The Mission
            </p>

            <h2 className="display mx-auto mt-3 max-w-2xl text-3xl sm:text-4xl">
              Help us reach the next generation.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-brand-100/85">
              Your partnership provides mentorship, camps, school ministry,
              dignity programs, leadership development and discipleship
              resources.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/donate" className="btn btn-gold">
                Donate &amp; partner with us
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Get involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
