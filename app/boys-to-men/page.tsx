"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

const PAYPAL_DONATE_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA";

const GOFUNDME_LINK = "https://gofund.me/41ae9b3bf";

const slides = [
  "/images/boys-to-men/boys-to-men-hero.jpg",
  "/images/boys-to-men/boys-to-men-2.jpg",
  "/images/boys-to-men/boys-to-men-3.jpg",
  "/images/boys-to-men/boys-to-men-4.jpg",
  "/images/boys-to-men/boys-to-men-5.jpg",
  "/images/boys-to-men/boys-to-men-6.jpg",
  "/images/boys-to-men/boys-to-men-7.jpg",
];

const stats = [
  { value: "Mentorship", label: "Guidance for young men" },
  { value: "Character", label: "Built through teaching" },
  { value: "Leadership", label: "Raised with purpose" },
  { value: "Faith", label: "At the foundation" },
];

const focusAreas = [
  {
    icon: "🤝",
    title: "Mentorship Sessions",
    desc: "Regular guidance from trusted mentors who help boys make wise choices and build confidence.",
  },
  {
    icon: "🛡️",
    title: "Character Building",
    desc: "Teaching integrity, discipline, respect, responsibility, emotional strength, and self-control.",
  },
  {
    icon: "🎤",
    title: "Leadership Conferences",
    desc: "Gathering boys and men for powerful teaching, encouragement, prayer, and practical leadership lessons.",
  },
  {
    icon: "📖",
    title: "Faith & Purpose",
    desc: "Helping boys build their lives on biblical values, positive identity, and God-given purpose.",
  },
  {
    icon: "💪",
    title: "Discipline & Responsibility",
    desc: "Equipping young men to make healthy decisions, serve others, and take responsibility for their future.",
  },
  {
    icon: "🌍",
    title: "Community Impact",
    desc: "Raising young men who strengthen families, churches, schools, and communities.",
  },
];

export default function BoysToMenPage() {
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
            alt={`Boys To Men slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/70 to-red-950/35" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.28),transparent_35%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center px-6 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">
                Boys To Men
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Raising responsible young men with character, faith, and purpose.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg md:text-xl">
              Boys To Men mentors and equips young men through leadership
              training, character development, discipline, faith-based guidance,
              and positive role models.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 px-8 py-4 text-center font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-red-700"
              >
                Support Boys To Men
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
          aria-label="Previous Boys To Men photo"
          className="absolute bottom-8 right-24 z-20 hidden h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl backdrop-blur transition hover:bg-white/20 md:flex"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next Boys To Men photo"
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
                <p className="text-3xl font-black text-red-700">
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
              <p className="text-sm font-black uppercase tracking-[0.25em] text-red-700">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Guiding boys into responsible manhood.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Boys To Men creates safe spaces where boys are mentored,
                encouraged, corrected, and equipped with values that shape their
                future.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                Through mentorship, teaching, leadership training, and
                faith-based guidance, we help young men grow in confidence,
                discipline, emotional strength, and positive decision-making.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200 to-red-200 blur-2xl" />
              <div className="relative h-[340px] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[480px]">
                <Image
                  src="/images/boys-to-men/boys-to-men-2.jpg"
                  alt="Boys To Men mentorship"
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
              <p className="text-sm font-black uppercase tracking-[0.25em] text-red-700">
                What We Build
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Mentorship with purpose.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Boys To Men combines mentorship, leadership, character building,
                faith, discipline, and service.
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

      {/* CONFERENCE SECTION */}
      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl lg:grid-cols-2">
            <div className="relative min-h-[460px]">
              <Image
                src="/images/boys-to-men/boys-to-men-hero.jpg"
                alt="The Boys 2 Men Conference"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-8 text-white sm:p-12 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
                Conference Highlight
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                The Boys 2 Men Conference
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                The Boys 2 Men Conference gathers speakers, mentors, leaders,
                and young men for teaching, encouragement, discipleship,
                mentorship, and personal transformation.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Mentorship",
                  "Faith & identity",
                  "Leadership",
                  "Character building",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4"
                  >
                    <span className="font-semibold text-white">✓ {item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* JOURNEY */}
      <FadeIn>
        <section className="bg-amber-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-red-700">
                The Journey
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                From boyhood to responsible manhood.
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-4">
              {[
                ["1", "Identity", "Helping boys understand who they are."],
                ["2", "Discipline", "Building self-control and wise choices."],
                ["3", "Leadership", "Teaching service, courage, and responsibility."],
                ["4", "Purpose", "Guiding young men toward God-given destiny."],
              ].map(([number, title, desc]) => (
                <div
                  key={title}
                  className="rounded-[2rem] bg-white p-7 text-center shadow-lg"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-xl font-black text-white">
                    {number}
                  </div>
                  <h3 className="mt-5 text-2xl font-black">{title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* GALLERY SLIDER */}
      <FadeIn>
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-red-700">
                Photo Moments
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Boys To Men in pictures.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Use the slider to view conference moments, mentorship,
                teaching, and leadership training.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 p-4 shadow-2xl sm:p-6">
              <div className="relative h-[300px] overflow-hidden rounded-[1.5rem] sm:h-[460px] lg:h-[560px]">
                {slides.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Boys To Men gallery slide ${index + 1}`}
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
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-red-700 via-red-800 to-slate-950 p-8 text-center text-white shadow-2xl sm:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
              Support Boys To Men
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Help us raise responsible, faith-filled young men.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-red-50 sm:text-lg">
              Your support helps provide mentorship sessions, materials,
              transportation, meals, safe learning spaces, and leadership
              training opportunities for boys.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-4 font-black text-red-800 transition hover:-translate-y-1"
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
