"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

const PAYPAL_DONATE_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA";

const GOFUNDME_LINK = "https://gofund.me/7f8b19b5e";

const slides = [
  "/images/youth-camps/youth-camps-hero.jpg",
  "/images/youth-camps/youth-camps-2.jpg",
  "/images/youth-camps/youth-camps-3.jpg",
  "/images/youth-camps/youth-camps-4.jpg",
  "/images/youth-camps/youth-camps-5.jpg",
  "/images/youth-camps/youth-camps-6.jpg",
  "/images/youth-camps/youth-camps-7.jpg",
  "/images/youth-camps/youth-camps-8.jpg",
  "/images/youth-camps/youth-camps-9.jpg",
  "/images/youth-camps/youth-camps-10.jpg",
  "/images/youth-camps/youth-camps-11.jpg",
];

const stats = [
  { value: "Faith", label: "At the center" },
  { value: "Teamwork", label: "Built through activities" },
  { value: "Purpose", label: "Discovered through mentorship" },
  { value: "Leaders", label: "Raised for the future" },
];

const focusAreas = [
  {
    icon: "🏕️",
    title: "Faith-Based Camps",
    desc: "Creating a focused environment where young people encounter God, grow, and build strong foundations.",
  },
  {
    icon: "🤝",
    title: "Team Building",
    desc: "Using group activities, games, and challenges to develop unity, trust, leadership, and confidence.",
  },
  {
    icon: "📖",
    title: "Discipleship",
    desc: "Teaching young people biblical truth, identity, purpose, and practical steps for spiritual growth.",
  },
  {
    icon: "🎯",
    title: "Purpose Discovery",
    desc: "Helping youth understand their value, gifts, future, and responsibility to lead with integrity.",
  },
  {
    icon: "❤️",
    title: "Mentorship",
    desc: "Connecting young people with caring leaders who encourage, guide, listen, and walk with them.",
  },
  {
    icon: "🌍",
    title: "Community Impact",
    desc: "Raising young leaders who serve with humility and become a blessing to families and communities.",
  },
];

export default function YouthCampsPage() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <main className="overflow-hidden bg-[#f8faf7] text-slate-950 antialiased">
      {/* HERO SLIDESHOW */}
      <section className="relative isolate min-h-screen overflow-hidden pt-32 text-white md:pt-36">
        {slides.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt={`Youth Camps slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/70 to-emerald-950/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.28),transparent_35%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center px-6 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">
                Youth Camps
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Equipping youth to lead with faith, courage, and purpose.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg md:text-xl">
              Youth Camps create space for discipleship, team building,
              mentorship, spiritual awakening, leadership development, and
              life-changing friendships.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 px-8 py-4 text-center font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-red-700"
              >
                Support Youth Camps
              </a>

              <Link
                href="/contact"
                className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous youth camp photo"
          className="absolute bottom-8 right-24 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl backdrop-blur transition hover:bg-white/20 md:flex"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next youth camp photo"
          className="absolute bottom-8 right-8 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl backdrop-blur transition hover:bg-white/20 md:flex"
        >
          ›
        </button>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === current ? "w-8 bg-amber-300" : "w-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* STATS */}
      <FadeIn>
        <section className="-mt-14 px-6 pb-12">
          <div className="relative z-20 mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-amber-100 bg-white p-5 shadow-2xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl bg-amber-50/70 p-6 text-center"
              >
                <p className="text-3xl font-black text-emerald-700">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* MISSION */}
      <FadeIn>
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                A place for young people to grow, belong, and awaken purpose.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Through Youth Camps, Impact Generation Global helps young people
                step away from daily pressures and enter a focused environment
                of teaching, worship, mentorship, activities, and friendship.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                Our desire is to raise the next generation of leaders who walk
                with God, serve others, and stand firm in purpose.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200 to-emerald-200 blur-2xl" />
              <div className="relative h-[340px] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[480px]">
                <Image
                  src="/images/youth-camps/youth-camps-8.jpg"
                  alt="Youth camp group"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* WHAT WE DO */}
      <FadeIn>
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                What We Do
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Discipleship, team building, and leadership formation.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Youth Camps combine spiritual growth with practical activities
                that build courage, character, unity, and leadership.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {focusAreas.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-slate-100 bg-[#f8faf7] p-7 shadow-sm transition hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* FEATURE STORY */}
      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl lg:grid-cols-2">
            <div className="relative min-h-[360px]">
              <Image
                src="/images/youth-camps/youth-camps-2.jpg"
                alt="Youth camp team building"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-8 text-white sm:p-12 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
                Camp Experience
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                More than activities. It is formation.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                Camp moments give youth a chance to laugh, learn, reflect, pray,
                build friendships, and discover strength they did not know they
                had.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
                Through games, group sessions, teaching, and mentorship, we help
                young people understand that leadership begins with character,
                service, humility, and faith.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* VIDEO */}
      <FadeIn>
        <section className="bg-slate-950 px-6 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
                Watch The Camp
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                See Youth Camps in action.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                Watch a glimpse of Impact Generation Global youth camp moments,
                team building, discipleship, and young people growing together.
              </p>

              <div className="mt-8">
                <a
                  href="https://youtube.com/shorts/bWIZLBb7TK4?feature=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-red-600 px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-red-700"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-8">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-[9/16]">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/bWIZLBb7TK4"
                    title="Youth Camps Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <h3 className="mt-7 text-2xl font-black">
                Youth Camp Short
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                A quick video glimpse of youth camp life, growth, and
                fellowship.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* GALLERY SLIDER */}
      <FadeIn>
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                Photo Moments
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Youth camp in pictures.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Use the slider to view camp games, group sessions, worship,
                mentorship, and team-building moments.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-4 shadow-2xl sm:p-6">
              <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] sm:h-[460px] lg:h-[560px]">
                {slides.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Youth camp gallery slide ${index + 1}`}
                    fill
                    sizes="100vw"
                    className={`object-cover transition-opacity duration-700 ${
                      index === current ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous gallery photo"
                className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-slate-950 shadow-xl transition hover:bg-amber-300"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next gallery photo"
                className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-black text-slate-950 shadow-xl transition hover:bg-amber-300"
              >
                ›
              </button>

              <div className="mt-5 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrent(index)}
                    aria-label={`Show gallery photo ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      index === current ? "w-8 bg-amber-300" : "w-2.5 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* DONATE CTA */}
      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 p-8 text-center text-white shadow-2xl sm:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
              Support Youth Camps
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Help us raise the next generation of leaders.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
              Your support helps provide camp programming, mentorship, meals,
              teaching materials, transportation support, and discipleship
              opportunities for young people.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-4 font-black text-emerald-800 transition hover:-translate-y-1"
              >
                Donate with PayPal
              </a>

              <a
                href={GOFUNDME_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 bg-white/10 px-8 py-4 font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Support on GoFundMe
              </a>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
