"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const programs = [
  {
    icon: "👨‍👦",
    title: "Boys to Men",
    slug: "boys-to-men",
    desc: "Mentoring young men in character, responsibility, confidence, faith, and leadership.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Pastors Kids",
    slug: "pastors-kids",
    desc: "Creating a safe community of identity, encouragement, support, and spiritual growth.",
  },
  {
    icon: "🚴",
    title: "Cycle for Change",
    slug: "cycle-for-change",
    desc: "Using cycling to connect communities, inspire healthy living, and raise awareness.",
  },
  {
    icon: "🏕️",
    title: "Youth Camps",
    slug: "youth-camps",
    desc: "Faith-filled experiences helping young people grow, heal, discover purpose, and build relationships.",
  },
  {
    icon: "🏫",
    title: "School Ministry",
    slug: "school-ministry",
    desc: "Reaching students with mentorship, encouragement, life skills, and biblical values.",
  },
  {
    icon: "🩸",
    title: "Pad a Girl",
    slug: "pad-a-girl",
    desc: "Restoring dignity and keeping girls in school through menstrual hygiene support.",
  },
];

const impactStats = [
  {
    value: "100s",
    label: "Young People Reached",
  },
  {
    value: "6+",
    label: "Active Programs",
  },
  {
    value: "100 KM",
    label: "Cycle for Change",
  },
  {
    value: "Zambia",
    label: "Growing Impact",
  },
];

const values = [
  {
    icon: "✝",
    title: "Discipleship",
    desc: "Helping young people know Christ, grow spiritually, and live out their faith.",
  },
  {
    icon: "💬",
    title: "Counseling",
    desc: "Providing guidance, encouragement, and a safe environment for young people.",
  },
  {
    icon: "🚀",
    title: "Empowerment",
    desc: "Equipping youth with confidence, skills, leadership, and opportunities.",
  },
  {
    icon: "❤️",
    title: "Healthy Living",
    desc: "Promoting healthy choices for the body, mind, relationships, and future.",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f8faf7] text-slate-950 antialiased">

      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative isolate min-h-[94vh] overflow-hidden">
        <div className="absolute inset-0 -z-30">
          <Image
            src="/images/hero.jpg"
            alt="Impact Generation Global"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/95 via-emerald-950/80 to-slate-950/30" />

        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_25%,rgba(245,158,11,0.20),transparent_32%)]" />

        <div className="mx-auto flex min-h-[94vh] max-w-7xl items-center px-6 pb-24 pt-40 lg:px-8">
          <div className="max-w-5xl">

            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-black uppercase tracking-[0.22em] text-amber-300 shadow-xl backdrop-blur-md">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-400" />
              Faith • Purpose • Transformation
            </div>

            <h1 className="mt-7 max-w-5xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Empowering a
              <span className="block text-amber-400">
                Generation.
              </span>
              Transforming Lives.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Impact Generation Global is raising young people with faith,
              character, dignity, and purpose through discipleship, mentorship,
              education, counseling, and practical community transformation.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#programs"
                className="inline-flex items-center justify-center rounded-full bg-amber-400 px-8 py-4 text-base font-black text-slate-950 shadow-[0_15px_50px_rgba(245,158,11,0.25)] transition duration-300 hover:-translate-y-1 hover:bg-amber-300"
              >
                Explore Our Programs
                <span className="ml-2">→</span>
              </a>

              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-black text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Partner With Us
              </Link>
            </div>

            <div className="mt-14 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {impactStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-xl backdrop-blur-md"
                >
                  <p className="text-2xl font-black text-amber-300 sm:text-3xl">
                    {stat.value}
                  </p>

                  <p className="mt-1 text-xs font-semibold text-white/80 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8faf7] to-transparent" />
      </section>


      {/* =========================================================
          WHO WE ARE
      ========================================================= */}
      <FadeIn>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">

            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">

              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                  Who We Are
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Every young person has
                  <span className="text-emerald-700">
                    {" "}God-given potential.
                  </span>
                </h2>
              </div>

              <div>
                <p className="text-lg leading-8 text-slate-600">
                  Impact Generation Global walks alongside young people as they
                  discover purpose, build character, strengthen their faith,
                  and become agents of positive change in their families and
                  communities.
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-600">
                  Through discipleship, mentorship, education, counseling,
                  leadership development, healthy living, and practical
                  outreach, we are building a generation prepared to influence
                  the future.
                </p>

                <Link
                  href="/about"
                  className="mt-8 inline-flex items-center gap-2 font-black text-emerald-700 transition hover:gap-4"
                >
                  Discover Our Story
                  <span>→</span>
                </Link>
              </div>

            </div>

          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          MISSION IMAGE + VALUES
      ========================================================= */}
      <FadeIn>
        <section
          id="mission"
          className="bg-white px-6 py-24"
        >
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-emerald-200 to-amber-200 opacity-70 blur-3xl" />

              <div className="relative h-[560px] overflow-hidden rounded-[2rem] shadow-2xl">
                <Image
                  src="/images/mission.jpg"
                  alt="Impact Generation mission work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />

                <div className="absolute bottom-7 left-7 right-7 rounded-3xl border border-white/20 bg-slate-950/40 p-6 text-white backdrop-blur-md">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                    Our Mission
                  </p>

                  <p className="mt-2 text-2xl font-black">
                    Walking with the next generation.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                Our Approach
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                Building the whole person.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Transformation is more than one event. We intentionally walk
                with young people spiritually, emotionally, socially, and
                practically.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {values.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-slate-200 bg-[#f8faf7] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:bg-white hover:shadow-xl"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl">
                      {item.icon}
                    </div>

                    <h3 className="mt-5 text-xl font-black">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          PROGRAMS
      ========================================================= */}
      <FadeIn>
        <section
          id="programs"
          className="px-6 py-24"
        >
          <div className="mx-auto max-w-7xl">

            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                  What We Do
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                  Programs that
                  <span className="text-emerald-700">
                    {" "}change lives.
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Practical, faith-centered programs designed to build
                  character, restore dignity, encourage healthy choices,
                  and release purpose.
                </p>
              </div>

              <Link
                href="/programs"
                className="inline-flex w-fit rounded-full bg-slate-950 px-7 py-3.5 font-black text-white transition hover:-translate-y-1 hover:bg-emerald-800"
              >
                View All Programs →
              </Link>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {programs.map((program) => (
                <Link
                  href={`/${program.slug}`}
                  key={program.slug}
                  className="group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl"
                >

                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-emerald-50 transition duration-500 group-hover:scale-150" />

                  <div className="relative">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-500 text-3xl shadow-lg">
                      {program.icon}
                    </div>

                    <h3 className="mt-7 text-2xl font-black">
                      {program.title}
                    </h3>

                    <p className="mt-3 leading-7 text-slate-600">
                      {program.desc}
                    </p>

                    <div className="mt-7 flex items-center gap-2 font-black text-emerald-700 transition-all group-hover:gap-4">
                      Learn More
                      <span>→</span>
                    </div>
                  </div>

                </Link>
              ))}

            </div>
          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          CYCLE FOR CHANGE FEATURE
      ========================================================= */}
      <FadeIn>
        <section className="bg-slate-950 px-6 py-24 text-white">
          <div className="mx-auto max-w-7xl">

            <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">

              <div className="relative min-h-[580px] overflow-hidden rounded-[2.5rem] shadow-2xl">

                <Image
                  src="/images/events/cycle-for-change-festival-2.jpg"
                  alt="Cycle for Change"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-flex rounded-full bg-amber-400 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                    Featured Program
                  </div>

                  <h3 className="mt-4 text-4xl font-black sm:text-5xl">
                    Cycle for Change
                  </h3>

                  <p className="mt-3 max-w-xl text-lg text-slate-200">
                    Riding with purpose. Inspiring healthy communities.
                  </p>
                </div>

              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                  Movement With A Mission
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  Riding for change.
                  <span className="block text-emerald-400">
                    Building stronger communities.
                  </span>
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-300">
                  Cycle for Change brings young people together through
                  cycling, healthy living, teamwork, community engagement,
                  awareness, and leadership.
                </p>

                <p className="mt-5 text-lg leading-8 text-slate-300">
                  Through long-distance rides and community activities, young
                  people discover that they are capable of going further than
                  they imagined.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-4xl font-black text-amber-300">
                      100 KM
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Challenge Ride
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                    <p className="text-4xl font-black text-amber-300">
                      70+
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Young Cyclists
                    </p>
                  </div>
                </div>

                <Link
                  href="/cycle-for-change"
                  className="mt-9 inline-flex rounded-full bg-amber-400 px-8 py-4 font-black text-slate-950 transition hover:-translate-y-1 hover:bg-amber-300"
                >
                  Explore Cycle for Change →
                </Link>
              </div>

            </div>
          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          IMPACT IN ACTION
      ========================================================= */}
      <FadeIn>
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-emerald-700">
                Impact In Action
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                More than programs.
                <span className="block text-emerald-700">
                  These are lives.
                </span>
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600">
                Every activity creates an opportunity for mentorship,
                friendship, discipleship, leadership, and transformation.
              </p>
            </div>


            <div className="mt-14 grid gap-6 md:grid-cols-3">

              <div className="group relative min-h-[450px] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/events/youth-camp-worship-session.jpg"
                  alt="Youth Camp Worship"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-0 p-7 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                    Discipleship
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    Youth Camp
                  </h3>

                  <p className="mt-2 text-slate-200">
                    Creating unforgettable moments of worship, friendship,
                    learning, and spiritual growth.
                  </p>
                </div>
              </div>


              <div className="group relative min-h-[450px] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/events/cycle-for-change-kids-bikes.jpg"
                  alt="Young cyclists"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-0 p-7 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                    Healthy Living
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    Active Generation
                  </h3>

                  <p className="mt-2 text-slate-200">
                    Encouraging young people to live healthy, active,
                    disciplined, and purpose-driven lives.
                  </p>
                </div>
              </div>


              <div className="group relative min-h-[450px] overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/events/youth-camp-team-building.jpg"
                  alt="Youth leadership and teamwork"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />

                <div className="absolute bottom-0 p-7 text-white">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
                    Leadership
                  </p>

                  <h3 className="mt-2 text-3xl font-black">
                    Building Leaders
                  </h3>

                  <p className="mt-2 text-slate-200">
                    Developing teamwork, confidence, responsibility, and
                    leadership in the next generation.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          ZAMBIA MISSION
      ========================================================= */}
      <FadeIn>
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-950 p-8 text-white shadow-2xl sm:p-12 lg:p-16">

            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">

              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                  Zambia Mission 2026
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                  Impact in action.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
                  The Impact Generation Global team joined young people,
                  families, churches, and local leaders in Zambia for
                  mentorship, discipleship, leadership development, youth
                  activities, and community outreach.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    "Youth mentorship",
                    "Leadership development",
                    "School outreach",
                    "Community transformation",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur"
                    >
                      <span className="font-semibold">
                        ✓ {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                  <Link
                    href="/gallery"
                    className="rounded-full bg-amber-400 px-8 py-4 text-center font-black text-slate-950 transition hover:-translate-y-1 hover:bg-amber-300"
                  >
                    See The Mission
                  </Link>

                  <Link
                    href="/donate"
                    className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center font-black text-white transition hover:bg-white/20"
                  >
                    Support Future Missions
                  </Link>

                </div>
              </div>


              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 text-center backdrop-blur-md sm:p-10">

                <div className="text-6xl">
                  🇺🇸 ✈️ 🇿🇲
                </div>

                <h3 className="mt-6 text-3xl font-black">
                  Together we can change lives.
                </h3>

                <p className="mt-4 leading-7 text-emerald-50">
                  Your partnership helps us continue mentorship, camps,
                  outreach, education support, discipleship, and youth
                  development programs.
                </p>

                <a
                  href="https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 font-black text-emerald-900 transition hover:-translate-y-1"
                >
                  Donate with PayPal
                </a>

              </div>

            </div>
          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          MEMORIAL
      ========================================================= */}
      <FadeIn>
        <section className="bg-white px-6 py-24">
          <div className="mx-auto max-w-7xl">

            <div className="grid overflow-hidden rounded-[2.5rem] border border-amber-200 bg-[#fffdf8] shadow-2xl lg:grid-cols-[0.85fr_1.15fr]">

              <div className="relative min-h-[500px] bg-slate-900">

                <Image
                  src="/images/andy-rovengo-memorial.jpg"
                  alt="In loving memory of Andy Rovengo"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />

                <div className="absolute bottom-7 left-7 right-7 text-white">
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                    In Loving Memory
                  </p>

                  <p className="mt-2 text-3xl font-black">
                    Andy Rovengo
                  </p>
                </div>

              </div>


              <div className="p-8 sm:p-12 lg:p-14">

                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-700">
                  Honoring a faithful servant
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                  A legacy of wisdom,
                  <span className="text-amber-700">
                    {" "}faith, and impact.
                  </span>
                </h2>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  Andy was a dear friend, mentor, and board member of Impact
                  Generation Global. His faithful service, wisdom, and
                  encouragement helped strengthen our ministry and youth
                  discipleship work in Zambia.
                </p>

                <p className="mt-4 text-lg leading-8 text-slate-600">
                  We thank God for Andy&apos;s life and the lasting impact he
                  made on so many. His love, guidance, and faithfulness will
                  always be remembered.
                </p>

                <div className="mt-8 rounded-3xl bg-amber-50 p-6 ring-1 ring-amber-200">

                  <p className="text-2xl font-black">
                    “Well done, thou good and faithful servant.”
                  </p>

                  <p className="mt-2 font-bold text-amber-700">
                    Matthew 25:21
                  </p>

                </div>

                <p className="mt-8 font-black text-emerald-700">
                  — Impact Generation Global Team
                </p>

              </div>
            </div>

          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          VIDEO
      ========================================================= */}
      <FadeIn>
        <section className="bg-slate-950 px-6 py-24 text-white">

          <div className="mx-auto max-w-7xl">

            <div className="grid items-center gap-14 lg:grid-cols-2">

              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-red-400">
                  Watch Our Ministry
                </p>

                <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
                  See Impact
                  <span className="block text-emerald-400">
                    in action.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                  Experience youth outreach, discipleship, Pad a Girl,
                  Boys to Men, mission trips, conferences, camps,
                  testimonies, and ministry updates from Zambia and beyond.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">

                  <a
                    href="https://youtu.be/L-N1JguS_Ok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-red-600 px-8 py-4 text-center font-black transition hover:-translate-y-1 hover:bg-red-700"
                  >
                    ▶ Watch on YouTube
                  </a>

                  <Link
                    href="/gallery"
                    className="rounded-full border border-white/20 px-8 py-4 text-center font-black transition hover:bg-white/10"
                  >
                    View Gallery
                  </Link>

                </div>
              </div>


              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-7">

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

                <h3 className="mt-7 text-2xl font-black">
                  Watch Our Latest Ministry Video
                </h3>

                <p className="mt-3 leading-7 text-slate-300">
                  Discover how young lives and communities are being
                  transformed through mentorship, discipleship, outreach,
                  and leadership development.
                </p>

              </div>

            </div>
          </div>
        </section>
      </FadeIn>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <FadeIn>
        <section className="px-6 py-24">

          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 via-emerald-800 to-slate-950 p-9 text-white shadow-2xl sm:p-14 lg:p-16">

            <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-center">

              <div>
                <p className="text-sm font-black uppercase tracking-[0.22em] text-amber-300">
                  Join The Mission
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
                  Help us reach the
                  <span className="block text-amber-300">
                    next generation.
                  </span>
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50">
                  Your partnership helps provide mentorship, youth camps,
                  school ministry, dignity programs, leadership development,
                  outreach, and discipleship resources.
                </p>
              </div>


              <div className="flex flex-col gap-4">

                <Link
                  href="/donate"
                  className="rounded-full bg-amber-400 px-8 py-4 text-center text-lg font-black text-slate-950 shadow-xl transition hover:-translate-y-1 hover:bg-amber-300"
                >
                  Donate & Partner With Us
                </Link>

                <Link
                  href="/about"
                  className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center font-black backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
                >
                  Learn More About IGG
                </Link>

              </div>

            </div>
          </div>
        </section>
      </FadeIn>

    </main>
  );
}