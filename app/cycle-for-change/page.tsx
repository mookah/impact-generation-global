"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function CycleForChangePage() {
  const galleryImages = [
    "/images/cycle-for-change-1.jpg",
    "/images/cycle-for-change-2.jpg",
    "/images/cycle-for-change-3.jpg",
    "/images/cycle-for-change-4.jpg",
    "/images/cycle-for-change-5.jpg",
    "/images/cycle-for-change-6.jpg",
    "/images/cycle-for-change-7.jpg",
    "/images/cycle-for-change-8.jpg",
    "/images/cycle-for-change-9.jpg",
    "/images/cycle-for-change-10.jpg",
    "/images/cycle-for-change-11.jpg",
    "/images/cycle-for-change-12.jpg",
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setIsReducedMotion(mq.matches);

    update();
    mq.addEventListener("change", update);

    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    track.style.animationPlayState =
      isReducedMotion || lightboxIndex >= 0 ? "paused" : "running";
  }, [isReducedMotion, lightboxIndex]);

  return (
    <>
      <main className="bg-white text-slate-900">
        {/* HERO */}
        <section className="relative min-h-[85vh] overflow-hidden text-white">
          <Image
            src="/images/cycle-for-change-hero.jpg"
            alt="Cycle For Change"
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
                  Cycle For Change
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                  Riding for awareness, community transformation, youth
                  empowerment and positive social impact.
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
                    Join The Ride
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
                Awareness • Community • Impact
              </p>

              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Every Ride Creates Change
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                Cycle For Change uses cycling as a platform to inspire
                communities, raise awareness, engage young people and promote
                social transformation through movement, advocacy and action.
              </p>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[2rem] shadow-xl md:h-[460px]">
              <Image
                src="/images/cycle-for-change-hero.jpg"
                alt="Cycle For Change riders"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-slate-950 px-6 py-16 text-white">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              ["1200+", "Kilometers Covered"],
              ["30+", "Community Campaigns"],
              ["500+", "Youth Reached"],
              ["15+", "Partner Organizations"],
            ].map(([value, label]) => (
              <div key={label}>
                <h3 className="text-4xl font-black text-emerald-400">
                  {value}
                </h3>
                <p className="mt-2 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* PILLARS */}
        <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                What We Promote
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Driving Positive Change
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🚴",
                  title: "Healthy Living",
                  desc: "Encouraging fitness, wellness and active lifestyles through cycling.",
                },
                {
                  icon: "🌍",
                  title: "Community Awareness",
                  desc: "Using rides to spotlight important social and community issues.",
                },
                {
                  icon: "🔥",
                  title: "Youth Empowerment",
                  desc: "Inspiring young people to become leaders and agents of change.",
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
        <section className="overflow-hidden bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
                Ride Highlights
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Cycle For Change In Action
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Moments from awareness rides, community outreach campaigns,
                youth engagement programs and transformational journeys.
              </p>
            </div>

            <div className="gallery-wrapper">
              <div ref={trackRef} className="gallery-track">
                {[...galleryImages, ...galleryImages].map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    onClick={() =>
                      setLightboxIndex(index % galleryImages.length)
                    }
                    className="gallery-card"
                  >
                    <Image
                      src={image}
                      alt={`Cycle For Change ${
                        (index % galleryImages.length) + 1
                      }`}
                      fill
                      sizes="360px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-slate-700">
                  “The ride helped connect communities and created awareness in
                  a powerful way.”
                </p>
                <h4 className="mt-5 font-bold">Community Participant</h4>
              </div>

              <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
                <p className="text-lg leading-relaxed text-slate-700">
                  “Cycle For Change inspired young people to believe they can
                  influence society positively.”
                </p>
                <h4 className="mt-5 font-bold">Youth Leader</h4>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-700 px-6 py-20 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">
            Ride With Purpose
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
            Join us as we cycle toward stronger communities, empowered youth and
            lasting impact.
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
              Join The Ride
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
              src={galleryImages[lightboxIndex]}
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
          animation: scrollGallery 45s linear infinite;
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
            animation-duration: 28s;
          }
        }
      `}</style>
    </>
  );
}