"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const icons = ["👨‍👦", "👨‍👩‍👧", "🚴", "🏕️", "🏫", "🩸"];

const programs = [
  {
    title: "Boys to Men",
    slug: "boys-to-men",
    desc: "Mentorship for confidence, character, and leadership.",
  },
  {
    title: "Pastors Kids",
    slug: "pastors-kids",
    desc: "Identity care and support for pastors’ children.",
  },
  {
    title: "Cycle for Change",
    slug: "cycle-for-change",
    desc: "Cycling to connect communities and raise awareness.",
  },
  {
    title: "Youth Camps",
    slug: "youth-camps",
    desc: "Faith-based camps for growth, healing, and purpose.",
  },
  {
    title: "School Ministry",
    slug: "school-ministry",
    desc: "Guiding students toward wise choices and destiny.",
  },
  {
    title: "Pad a Girl",
    slug: "pad-a-girl",
    desc: "Restoring dignity through hygiene support for girls.",
  },
];

const stats = [
  { value: "6+", label: "Life-changing programs" },
  { value: "100s", label: "Youth reached" },
  { value: "Faith", label: "At the center" },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f8faf7] text-slate-950 antialiased">
      {/* HERO */}
      <section className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/hero.jpg"
            alt="Impact Generation Global"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.28),transparent_35%),linear-gradient(115deg,rgba(2,6,23,0.92),rgba(6,78,59,0.72),rgba(0,0,0,0.35))]" />

        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-20 pt-44 sm:pt-40 md:pt-32">
          <div className="max-w-4xl text-white">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-200 shadow-2xl backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              Faith-led • Youth-focused • Zambia
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              Raising a generation with faith, dignity, and purpose.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50 sm:text-xl">
              Impact Generation Global is a Christ-centered movement serving
              young people through discipleship, mentorship, education,
              counseling, and practical community programs.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-base font-black text-slate-950 shadow-2xl transition hover:-translate-y-1 hover:bg-amber-300"
              >
                Explore Programs
              </a>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur"
                >
                  <p className="text-3xl font-black text-amber-300">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-emerald-50">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ANDY ROVENGO MEMORIAL */}
      <FadeIn>
        <section className="relative px-6 py-24">
          <div className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-white to-transparent" />

          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-[2rem] border border-amber-200 bg-white shadow-2xl lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[520px] bg-slate-900">
                <Image
                  src="/images/andy-rovengo-memorial.jpg"
                  alt="In loving memory of Andy R0vengo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-3xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-200">
                    In Loving Memory
                  </p>
                  <p className="mt-2 text-2xl font-black">Andy Rovengo</p>
                </div>
              </div>

              <div className="p-8 sm:p-12 lg:p-14">
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-700">
                  Honoring a faithful servant
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                  A legacy of wisdom, faith, and impact.
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Andy was a dear friend, mentor, and board member of Impact
                  Generation Global. His faithful service, wisdom, and
                  encouragement helped strengthen our ministry and the youth
                  discipleship work in Zambia.
                </p>

                <p className="mt-4 text-lg leading-8 text-slate-600">
                  We thank God for Andy’s life and the lasting impact he made on
                  so many. His love, guidance, and faithfulness will always be
                  remembered.
                </p>

                <div className="mt-8 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">
                  <p className="text-2xl font-black text-slate-950">
                    “Well done, thou good and faithful servant.”
                  </p>
                  <p className="mt-2 font-bold text-amber-700">Matthew 25:21</p>
                </div>

                <div className="mt-10 border-t border-amber-200 pt-8">
                  <p className="text-lg italic leading-8 text-slate-600">
                    “A faithful servant, a trusted mentor, and a dear friend.
                    Andy’s legacy continues to inspire our mission and the
                    generations to come.”
                  </p>

                  <p className="mt-6 font-black text-emerald-700">
                    — Impact Generation Global Team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* MISSION */}
      <FadeIn>
        <section id="mission" className="px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                Walking with the next generation.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                We support youth through discipleship, education, counseling,
                mentorship, and practical programs that bring hope and dignity.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {["Discipleship", "Counseling", "Empowerment", "Healthy Living"].map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="mb-4 h-10 w-10 rounded-2xl bg-emerald-100" />
                    <h3 className="text-lg font-black text-slate-950">
                      {item}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Helping young people grow with faith, dignity, guidance,
                      and hope.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-emerald-200 to-amber-200 blur-2xl" />
              <div className="relative h-[520px] overflow-hidden rounded-[2rem] shadow-2xl">
                <Image
                  src="/images/mission.jpg"
                  alt="Mission work"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>


      {/* ZAMBIA MISSION FUNDRAISING */}
      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white shadow-2xl sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-300 sm:text-sm">
                  August Zambia Mission
                </p>

                <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Help send David Luby & Joe to Zambia.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                  David Luby, Executive Director, and Joe, one of our newest
                  Board Members, will travel to Zambia this August to encourage
                  youth, strengthen ministry partnerships, meet with local
                  leaders, and support life-changing programs on the ground.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Youth mentorship",
                    "Leadership development",
                    "School outreach",
                    "Community transformation",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4"
                    >
                      <span className="font-semibold text-white">✓ {item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-red-600 px-8 py-4 text-center font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-red-700"
                  >
                    Donate with PayPal
                  </a>

                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-7 text-center backdrop-blur sm:p-8">
                <p className="text-5xl">🇺🇸 ✈️ 🇿🇲</p>

                <h3 className="mt-6 text-2xl font-black leading-tight sm:text-3xl">
                  Together we can change lives.
                </h3>

                <p className="mt-4 text-base leading-7 text-slate-300">
                  Your gift helps support travel, ministry logistics, youth
                  meetings, leadership gatherings, and program needs in Zambia.
                </p>

                <Link
                  href="/donate"
                  className="mt-6 inline-flex rounded-full border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  Learn More About The Mission
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>


      {/* PROGRAMS */}
      <FadeIn>
        <section id="programs" className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                  What We Do
                </p>
                <h3 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                  Programs that change lives.
                </h3>
                <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
                  Practical, faith-centered programs designed to build
                  character, restore dignity, and release purpose.
                </p>
              </div>

              <Link
                href="/programs"
                className="inline-flex rounded-full bg-slate-950 px-6 py-3 font-black text-white transition hover:-translate-y-1 hover:bg-emerald-800"
              >
                View all programs →
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program, index) => (
                <Link
                  href={`/${program.slug}`}
                  key={program.slug}
                  className="group rounded-[2rem] border border-slate-200 bg-[#f8faf7] p-7 shadow-sm transition hover:-translate-y-2 hover:border-emerald-200 hover:bg-white hover:shadow-2xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-700 to-emerald-500 text-3xl text-white shadow-lg">
                    {icons[index]}
                  </div>

                  <h4 className="mt-6 text-2xl font-black text-slate-950">
                    {program.title}
                  </h4>

                  <p className="mt-3 leading-7 text-slate-600">
                    {program.desc}
                  </p>

                  <div className="mt-6 font-black text-emerald-700 transition group-hover:translate-x-2">
                    Learn more →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>


      {/* WATCH OUR MINISTRY */}
      <FadeIn>
        <section className="bg-slate-950 px-6 py-24 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">
                  Watch Our Ministry
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight md:text-5xl">
                  See Impact In Action
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                  Experience sermons, youth outreach, Pad A Girl, Boys To Men,
                  mission trips, conferences, testimonies, and ministry updates
                  from Zambia and beyond.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <a
                    href="https://youtu.be/L-N1JguS_Ok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-red-600 px-8 py-4 text-center font-black text-white transition hover:-translate-y-1 hover:bg-red-700"
                  >
                    ▶ Watch on YouTube
                  </a>

                  <Link
                    href="/gallery"
                    className="rounded-full border border-white/20 px-8 py-4 text-center font-black text-white transition hover:bg-white/10"
                  >
                    View Gallery
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur sm:p-8">
                <div className="overflow-hidden rounded-3xl shadow-2xl">
                  <div className="aspect-video">
                    <iframe
                      className="h-full w-full"
                      src="https://www.youtube.com/embed/L-N1JguS_Ok"
                      title="Impact Generation Global Ministry Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>

                <h3 className="mt-8 text-2xl font-black">
                  Watch Our Latest Ministry Video
                </h3>

                <p className="mt-4 leading-7 text-slate-300">
                  Watch how God is transforming lives through youth mentorship,
                  community outreach, discipleship, and leadership development
                  across Zambia.
                </p>

                <div className="mt-6">
                  <a
                    href="https://youtu.be/L-N1JguS_Ok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-full bg-red-600 px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-red-700"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FadeIn>


      {/* CTA */}
      <FadeIn>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 p-8 text-white shadow-2xl sm:p-12">
            <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                  Join the Mission
                </p>
                <h3 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                  Help us reach the next generation.
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-emerald-50">
                  Your partnership helps provide mentorship, youth camps, school
                  ministry, dignity programs, and discipleship resources.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Link
                  href="/donate"
                  className="rounded-full bg-amber-400 px-8 py-4 text-center font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-amber-300"
                >
                  Partner With Us
                </Link>
                <Link
                  href="/newsletter"
                  className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
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
