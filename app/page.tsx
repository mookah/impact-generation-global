"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const icons = ["👨‍👦", "👨‍👩‍👧", "🚴", "🏕️", "🏫", "🩸"];

const programs = [
  { title: "Boys to Men", slug: "boys-to-men", desc: "Mentorship for confidence and leadership." },
  { title: "Pastors Kids", slug: "pastors-kids", desc: "Support and identity care for pastors’ children." },
  { title: "Cycle for Change", slug: "cycle-for-change", desc: "Cycling to connect communities and raise awareness." },
  { title: "Youth Camps", slug: "youth-camps", desc: "Faith-based camps for growth and development." },
  { title: "School Ministry", slug: "school-ministry", desc: "Guiding students to wise choices and purpose." },
  { title: "Pad a Girl", slug: "pad-a-girl", desc: "Hygiene and dignity support for girls." },
];

export default function Home() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.jpg"
            alt="Impact Generation Global"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-emerald-950/35 to-black/20" />
        </div>

        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-44 sm:pt-40 md:pt-32">
          <div className="w-full max-w-3xl text-white">
            <p className="inline-flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-amber-300 sm:text-sm">
              <span className="rounded-full bg-amber-300/20 px-3 py-1 text-amber-300">
                Faith-led
              </span>
              <span>Impact Generation Global</span>
            </p>

            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Raising a generation with faith and purpose
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-emerald-50 sm:text-xl">
              A Christ-centered nonprofit devoted to discipleship, youth
              empowerment, and community transformation.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-base font-bold text-white shadow-xl transition hover:bg-emerald-700"
              >
                Explore Programs
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:bg-white/20"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-2 text-sm text-emerald-100">
              <span className="mr-2 font-semibold">Trusted partners</span>
              <span className="rounded bg-white/10 px-3 py-1">Local Churches</span>
              <span className="rounded bg-white/10 px-3 py-1">Schools</span>
              <span className="rounded bg-white/10 px-3 py-1">Volunteers</span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <FadeIn>
        <section id="mission" className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-5xl">
                Walking with the next generation
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
                We support youth through discipleship, education, counseling,
                and practical programs that bring hope and dignity.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {["Discipleship", "Counseling", "Empowerment", "Healthy Living"].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <h3 className="font-bold text-slate-900">{item}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Helping young people grow with faith, dignity, and guidance.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-80 overflow-hidden rounded-3xl shadow-xl md:h-96">
              <Image
                src="/images/mission.jpg"
                alt="Mission work"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>
      </FadeIn>

      {/* PROGRAMS */}
      <FadeIn>
        <section id="programs" className="bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
                  What We Do
                </p>
                <h3 className="mt-2 text-3xl font-black text-slate-900 md:text-5xl">
                  Programs that change lives
                </h3>
                <p className="mt-3 max-w-md text-slate-600">
                  We empower youth through mentorship, discipleship, and
                  community programs.
                </p>
              </div>

              <Link href="/programs" className="font-bold text-emerald-700 hover:underline">
                View all programs →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <Link
                  href={`/${program.slug}`}
                  key={program.slug}
                  className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-2xl text-white shadow">
                      {icons[index]}
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-slate-900">
                        {program.title}
                      </h4>
                      <p className="mt-1 text-sm text-slate-600">{program.desc}</p>
                    </div>
                  </div>

                  <div className="mt-5 font-bold text-emerald-700 transition group-hover:translate-x-1">
                    Learn more →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-950 px-8 py-12 text-white shadow-xl">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-emerald-100">
                  Join the Mission
                </p>
                <h3 className="mt-3 text-3xl font-black md:text-5xl">
                  Support the next generation
                </h3>
                <p className="mt-4 max-w-xl text-emerald-50">
                  Help us reach youth through mentorship, camps, and dignity programs.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/donate"
                  className="rounded-full bg-white px-7 py-4 text-center font-bold text-emerald-800"
                >
                  Donate Now
                </Link>
                <Link
                  href="/newsletter"
                  className="rounded-full border border-white/30 px-7 py-4 text-center font-bold text-white"
                >
                  Join Newsletter
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}