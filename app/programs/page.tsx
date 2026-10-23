"use client";

import Image from "next/image";
import Link from "next/link";
import { programs } from "@/lib/site";

export default function ProgramsPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="bg-brand-950 text-white">
        <div className="shell py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            What We Do
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Our programs
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            Six practical, faith-centered programs â€” each designed to meet
            young people where they are and walk with them toward purpose,
            dignity and leadership.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="section">
        <div className="shell">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="card card-hover group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={program.image}
                    alt={program.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />

                  {program.stat && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-800 backdrop-blur">
                      {program.stat.value} {program.stat.label}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-brand-950">
                    {program.title}
                  </h2>

                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {program.summary}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800">
                    Learn more
                    <span
                      aria-hidden="true"
                      className="transition group-hover:translate-x-1"
                    >
                      â†’
                    </span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ETHOS */}
      <section className="section bg-cream-100">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">One Mission, Many Expressions</p>
            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              Every program shares the same foundation
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Faith", "Christ-centered discipleship"],
              ["Purpose", "Identity and direction"],
              ["Dignity", "Practical care and respect"],
              ["Transformation", "Lasting community impact"],
            ].map(([title, desc]) => (
              <div key={title} className="card p-5 text-center">
                <h3 className="text-base font-bold text-brand-950">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="shell">
          <div className="rounded-2xl bg-brand-900 px-6 py-12 text-center text-white sm:px-12">
            <h2 className="display text-3xl sm:text-4xl">
              Partner with our programs
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-brand-100/85">
              Your support helps us reach more young people through mentorship,
              discipleship, education, outreach and practical care.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/donate" className="btn btn-gold">
                Donate today
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
