"use client";

import React from "react";
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

export default function Home(): JSX.Element {
  return (
    <main className="bg-white text-slate-900 antialiased">
      {/* HERO */}
      <section className="relative isolate min-h-[72vh] md:min-h-[88vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero.jpg"
            alt="Impact Generation Global"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-emerald-900/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28 flex items-center">
          <div className="w-full max-w-3xl text-white">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <span className="rounded-full bg-amber-300/20 px-2 py-1 text-amber-200">Faith-led</span>
              Impact Generation Global
            </p>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Raising a generation with faith and purpose
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-emerald-100 max-w-2xl">
              A Christ-centered nonprofit devoted to discipleship, youth empowerment, and community transformation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-700 px-6 py-3 text-base font-semibold shadow-lg hover:scale-[1.02] transform transition focus:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
                aria-label="Explore programs"
              >
                Explore Programs
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/6 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                aria-label="Learn more about us"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-6 text-sm text-emerald-200">
              <span className="inline-block mr-3">Trusted partners</span>
              <span className="inline-flex gap-2 items-center">
                <span className="px-2 py-1 rounded bg-white/10">Local Churches</span>
                <span className="px-2 py-1 rounded bg-white/10">Schools</span>
                <span className="px-2 py-1 rounded bg-white/10">Volunteers</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <FadeIn>
        <section id="mission" className="px-6 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900">
                Walking with the next generation
              </h2>

              <p className="mt-4 text-base text-slate-600 max-w-xl">
                We support youth through discipleship, education, counseling, and practical programs that bring hope and dignity.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Discipleship", "Counseling", "Empowerment", "Healthy Living"].map((item) => (
                  <div
                    key={item}
                    className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-4 sm:p-5 shadow-sm hover:shadow-md transition"
                  >
                    <h3 className="font-semibold text-slate-900">{item}</h3>
                    <p className="text-sm text-slate-600">Helping young people grow with faith, dignity, and guidance.</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-lg h-64 sm:h-80 md:h-96">
              <Image
                src="/images/mission.jpg"
                alt="Mission work"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 to-transparent p-6 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">Faith in Action</p>
                <p className="mt-2 text-sm text-slate-200 max-w-sm">Reaching young people with practical support, hope, and community.</p>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* PROGRAMS */}
      <FadeIn>
        <section id="programs" className="bg-slate-50 px-6 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-700">What We Do</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">Programs that change lives</h3>
                <p className="mt-2 text-sm text-slate-600 max-w-md">We empower youth through mentorship, discipleship, and community programs.</p>
              </div>
              <div className="hidden sm:flex gap-3">
                <Link href="/programs" className="text-sm font-semibold text-emerald-700 hover:underline">View all programs</Link>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, index) => (
                <Link
                  href={`/${program.slug}`}
                  key={program.slug}
                  className="group block rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg transform hover:-translate-y-2 transition"
                  aria-label={`Learn more about ${program.title}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-700 text-white text-2xl shadow">
                      <span aria-hidden>{icons[index]}</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-extrabold text-slate-900">{program.title}</h4>
                      <p className="mt-1 text-sm text-slate-600">{program.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 text-sm font-semibold text-emerald-700 group-hover:translate-x-1 transition">Learn more →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* IMPACT CARDS */}
      <FadeIn>
        <section className="px-6 py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-7xl grid gap-6 lg:grid-cols-3">
            {[
              ["Why We Matter", "Building hope through consistent presence"],
              ["Community", "Safe spaces where young people grow and belong"],
              ["Transformation", "Lasting spiritual, emotional, and practical impact"],
            ].map(([small, title], idx) => (
              <div
                key={title}
                className={`rounded-2xl p-6 sm:p-8 shadow-sm ${idx === 0 ? "bg-gradient-to-br from-slate-900 to-emerald-800 text-white" : "bg-white border border-slate-100 text-slate-900"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-300">{small}</p>
                <h4 className="mt-3 text-xl font-extrabold">{title}</h4>
                <p className={`mt-3 text-sm leading-6 ${idx === 0 ? "text-slate-200" : "text-slate-600"}`}>
                  Real change happens when young people are seen, supported, and guided with love, truth, and practical care.
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn>
        <section className="px-6 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-900 px-6 py-10 sm:px-10 sm:py-14 text-white shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">Join the Mission</p>
                <h3 className="mt-2 text-2xl font-extrabold">Support the next generation</h3>
                <p className="mt-2 text-sm text-emerald-50 max-w-lg">Help us reach youth through mentorship, camps, and dignity programs.</p>
              </div>

              <div className="flex gap-3">
                <Link href="/donate" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow hover:scale-[1.02] transition">Donate Now</Link>
                <Link href="/newsletter" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition">Join Newsletter</Link>
                <Link href="/volunteer" className="rounded-full bg-emerald-800/10 px-6 py-3 text-sm font-semibold text-emerald-100 hover:bg-emerald-800/20 transition">Volunteer</Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* FOOTER */}
      <footer className="px-6 py-8 bg-white border-t">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white font-bold">IG</div>
            <div>
              <p className="text-sm font-semibold">Impact Generation Global</p>
              <p className="text-xs text-slate-500">A Christ-centered nonprofit</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-sm text-slate-600">© {new Date().getFullYear()} Impact Generation Global</p>
            <div className="flex gap-3">
              <Link href="/privacy" className="text-sm text-slate-600 hover:underline">Privacy</Link>
              <Link href="/contact" className="text-sm text-slate-600 hover:underline">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
