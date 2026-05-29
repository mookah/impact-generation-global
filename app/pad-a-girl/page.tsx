"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PadAGirlPage() {
  const heroImage = "/images/pad-a-girl-hero.jpg";

  const gallery = [
    "/images/pad-a-girl-school-session-1.jpg",
    "/images/pad-a-girl-school-session-2.jpg",
    "/images/pad-a-girl-community-outreach.jpg",
    "/images/pad-a-girl-community-engagement.jpg",
    "/images/pad-a-girl-youth-ambassadors.jpg",
    "/images/pad-a-girl-empowerment-team.jpg",
    "/images/pad-a-girl-mentorship.jpg",
  ];

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <main className="bg-white text-slate-900">
        {/* HERO */}
        <section className="relative min-h-[85vh] overflow-hidden text-white">
          <Image
            src={heroImage}
            alt="Pad a Girl"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-emerald-900/40" />

          <div className="relative z-20 flex min-h-[85vh] items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                    Impact Generation Global
                  </span>
                </div>

                <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  Pad a Girl
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                  Restoring dignity and empowering girls through hygiene
                  support, education, mentorship, and community care.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/donate"
                    className="inline-flex justify-center rounded-full bg-white px-8 py-4 font-bold text-emerald-800 shadow-xl transition hover:-translate-y-1"
                  >
                    Donate Today
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                  >
                    Get Involved
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Dignity • Health • Education
              </p>

              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Why Pad a Girl Matters
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                Many girls miss school and opportunities because they lack
                access to menstrual hygiene support and education. Pad a Girl
                helps girls stay healthy, confident, and in school through
                practical care, mentorship, and empowerment.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="font-bold">Hygiene Support</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Providing pads, hygiene education, and dignity-focused
                    support for girls.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                  <h3 className="font-bold">Mentorship</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Creating safe spaces where girls receive guidance,
                    encouragement, and confidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[2rem] shadow-xl md:h-[460px]">
              <Image
                src="/images/pad-a-girl-school-session-1.jpg"
                alt="Pad a Girl school session"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section className="bg-slate-50 px-6 py-16">
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-3">
            {[
              ["1,200+", "Girls Supported"],
              ["150+", "School Sessions"],
              ["80+", "Community Partners"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-sm"
              >
                <div className="text-4xl font-black text-emerald-700">
                  {value}
                </div>
                <div className="mt-2 text-sm text-slate-600">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CORE PILLARS */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Our Focus
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                What We Provide
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🩸",
                  title: "Dignity Kits",
                  desc: "Practical hygiene support that helps girls attend school with confidence.",
                },
                {
                  icon: "📚",
                  title: "Health Education",
                  desc: "Teaching girls about menstrual health, self-care, and personal dignity.",
                },
                {
                  icon: "🤝",
                  title: "Safe Mentorship",
                  desc: "Creating safe spaces for guidance, encouragement, and emotional support.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="overflow-hidden bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Program Moments
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Pad a Girl In Action
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Moments of mentorship, school engagement, community outreach,
                and girls’ empowerment.
              </p>
            </div>

            <div className="gallery-wrapper">
              <div className="gallery-track">
                {[...gallery, ...gallery].map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    onClick={() => setLightboxIndex(index % gallery.length)}
                    className="gallery-card"
                  >
                    <Image
                      src={src}
                      alt={`Pad a Girl ${index + 1}`}
                      fill
                      sizes="320px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Voices of Impact
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Restoring Confidence
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-slate-700">
                  “When girls are supported with dignity and education, they
                  gain confidence to stay in school and pursue their future.”
                </p>
                <h4 className="mt-5 font-bold">Community Mentor</h4>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-slate-700">
                  “Pad a Girl creates safe spaces where young girls can learn,
                  ask questions, and feel valued.”
                </p>
                <h4 className="mt-5 font-bold">Program Supporter</h4>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-700 px-6 py-20 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">
            Help Keep Girls in School
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
            Your gift provides hygiene support, education, mentorship, and
            confidence-building opportunities for girls.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="rounded-full bg-white px-8 py-4 font-bold text-emerald-800 transition hover:-translate-y-1"
            >
              Donate Today
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Partner With Us
            </Link>
          </div>
        </section>
      </main>

      {/* LIGHTBOX */}
      {lightboxIndex >= 0 && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxIndex(-1)}
        >
          <div className="relative w-full max-w-4xl overflow-hidden rounded-xl">
            <button
              onClick={() => setLightboxIndex(-1)}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/20 px-3 py-2 text-white"
            >
              ✕
            </button>

            <Image
              src={gallery[lightboxIndex]}
              alt={`Preview ${lightboxIndex + 1}`}
              width={1200}
              height={800}
              className="bg-black object-contain"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .gallery-wrapper {
          width: 100%;
          overflow: hidden;
        }

        .gallery-track {
          display: flex;
          width: max-content;
          animation: scrollGallery 38s linear infinite;
        }

        .gallery-card {
          position: relative;
          width: 360px;
          height: 240px;
          margin-right: 20px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.14);
        }

        .gallery-wrapper:hover .gallery-track {
          animation-play-state: paused;
        }

        @keyframes scrollGallery {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .gallery-card {
            width: 280px;
            height: 190px;
          }

          .gallery-track {
            animation-duration: 24s;
          }
        }
      `}</style>
    </>
  );
}