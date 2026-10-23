import Image from "next/image";
import Link from "next/link";
import { mission, missionPillars, values, vision } from "@/lib/site";

export const metadata = {
  title: "About, Vision & Mission",
  description:
    "Learn the vision, mission and values of Impact Generation Global â€” a Christ-centered nonprofit raising young people in Zambia through discipleship, mentorship and practical outreach.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <Image
          src="/images/about-hero-new.webp"
          alt="Impact Generation Global community"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />

        <div className="absolute inset-0 bg-linear-to-b from-brand-950/85 via-brand-950/75 to-brand-950/95" />

        <div className="shell relative py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            About Us
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            A Christ-centered movement for the next generation.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            Impact Generation Global is committed to raising a transformed
            generation through discipleship, mentorship, counselling, education
            and practical community support.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/programs" className="btn btn-gold">
              Our programs
            </Link>
            <Link href="/donate" className="btn btn-ghost">
              Donate
            </Link>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="card relative overflow-hidden bg-cream-100 p-6 sm:p-9">
              <span className="inline-flex h-9 items-center rounded-full bg-brand-800 px-4 text-xs font-bold uppercase tracking-[0.15em] text-white">
                Our Vision
              </span>

              <p className="mt-5 text-lg leading-8 text-brand-950 sm:text-xl sm:leading-9">
                {vision}
              </p>
            </article>

            <article className="card p-6 sm:p-9">
              <span className="inline-flex h-9 items-center rounded-full bg-gold-400 px-4 text-xs font-bold uppercase tracking-[0.15em] text-brand-950">
                Our Mission
              </span>

              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                {mission}
              </p>
            </article>
          </div>

          <h2 className="display mt-12 text-2xl text-brand-950 sm:text-3xl">
            What our mission looks like in practice
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {missionPillars.map((pillar) => (
              <div key={pillar.title} className="card card-hover p-5">
                <h3 className="text-base font-bold text-brand-950">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="section bg-cream-100">
        <div className="shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
            <Image
              src="/images/mission.jpg"
              alt="Impact Generation Global serving young people"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="eyebrow">Who We Are</p>

            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              Walking with young people, not observing from a distance.
            </h2>

            <p className="prose-body mt-5">
              Impact Generation Global walks alongside young people, families,
              schools, churches and communities through programs that inspire
              transformation, dignity, leadership and purpose.
            </p>

            <p className="prose-body mt-4">
              Our teams work where young people actually are â€” in schools, on
              community routes, at camps and in churches â€” listening first, then
              investing time, mentorship and practical support.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section bg-brand-950 text-white">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
              Our Values
            </p>
            <h2 className="display mt-3 text-3xl sm:text-4xl">
              What guides us
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-lg font-bold text-gold-300">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-brand-100/80">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="shell text-center">
          <h2 className="display text-3xl text-brand-950 sm:text-4xl">
            Partner with us
          </h2>
          <p className="prose-body mx-auto mt-4 max-w-xl">
            Your support helps us reach more young people through discipleship,
            mentorship, education and practical care.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/donate" className="btn btn-primary">
              Donate today
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Get involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
