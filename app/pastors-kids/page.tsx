"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function PastorsKidsPage() {
  const galleryImages = [
    "/images/pastors-kids-1.jpg",
    "/images/pastors-kids-2.jpg",
    "/images/pastors-kids-3.jpg",
    "/images/pastors-kids-4.jpg",
    "/images/pastors-kids-5.jpg",
    "/images/pastors-kids-6.jpg",
  ];

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotion = () => setIsReducedMotion(mq.matches);
    updateMotion();

    mq.addEventListener("change", updateMotion);

    return () => mq.removeEventListener("change", updateMotion);
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
            src="/images/pastors-kids-hero.jpg"
            alt="Pastors Kids Program"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-emerald-900/30" />

          <div className="relative z-20 flex min-h-[85vh] items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200">
                    Impact Generation Global
                  </span>
                </div>

                <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  Pastors Kids
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                  Supporting, mentoring and empowering pastors’ children to grow
                  with confidence, identity, purpose, emotional strength and
                  spiritual stability.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="/donate"
                    className="inline-flex justify-center rounded-full bg-amber-500 px-8 py-4 font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-amber-600"
                  >
                    Support The Program
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
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                Identity • Support • Purpose
              </p>

              <h2 className="mt-4 text-4xl font-bold md:text-5xl">
                Raising Strong Children Behind The Calling
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
                Pastors’ children often grow up carrying expectations, pressure
                and responsibility connected to ministry life. This program
                creates a safe and encouraging space where they can be seen,
                heard, mentored and strengthened.
              </p>

              <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-700">
                Through mentorship, emotional support, spiritual guidance and
                peer connection, we help pastors’ kids discover identity,
                confidence and purpose.
              </p>
            </div>

            <div className="relative h-[360px] overflow-hidden rounded-[2rem] shadow-xl md:h-[460px]">
              <Image
                src="/images/pastors-kids-hero.jpg"
                alt="Pastors Kids"
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
              ["300+", "Children Reached"],
              ["40+", "Mentorship Sessions"],
              ["20+", "Church Families Served"],
              ["10+", "Support Partners"],
            ].map(([value, label]) => (
              <div key={label}>
                <h3 className="text-4xl font-black text-amber-400">{value}</h3>
                <p className="mt-2 text-sm text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOCUS AREAS */}
        <section className="bg-gradient-to-b from-slate-50 to-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                Our Focus Areas
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                How We Support Them
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🤍",
                  title: "Emotional Support",
                  desc: "Creating safe spaces for pastors’ children to express themselves, process pressure and receive encouragement.",
                },
                {
                  icon: "🌱",
                  title: "Identity Formation",
                  desc: "Helping them discover who they are beyond expectations, labels and assumptions attached to ministry life.",
                },
                {
                  icon: "🕊️",
                  title: "Spiritual Growth",
                  desc: "Guiding them into a personal walk with God rooted in love, understanding, purpose and conviction.",
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
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-600">
                Program Moments
              </p>

              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Pastors Kids In Action
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                Moments of mentorship, encouragement, fellowship, healing and
                personal development.
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
                    aria-label={`Open gallery image ${
                      (index % galleryImages.length) + 1
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`Pastors Kids Gallery ${
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

        {/* FINAL CTA */}
        <section className="bg-amber-500 px-6 py-20 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">
            Help Pastors’ Children Grow Strong
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg">
            Together we can create safe spaces where pastors’ kids are loved,
            mentored, encouraged and empowered to walk in purpose.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="rounded-full bg-white px-8 py-4 font-bold text-black"
            >
              Donate Today
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white px-8 py-4 font-bold text-white hover:bg-white/10"
            >
              Become A Partner
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
          animation: scrollGallery 35s linear infinite;
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
            animation-duration: 22s;
          }
        }
      `}</style>
    </>
  );
}