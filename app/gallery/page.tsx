"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function GalleryPage() {
  const images = [
    { src: "/images/boys-to-men-hero.jpg", alt: "Boys To Men Program", category: "Boys To Men" },
    { src: "/images/boys-to-men-1.jpg", alt: "Mentorship Session", category: "Boys To Men" },
    { src: "/images/boys-to-men-2.jpg", alt: "Leadership Training", category: "Boys To Men" },

    { src: "/images/pastors-kids-hero.jpg", alt: "Pastors Kids Event", category: "Pastors Kids" },
    { src: "/images/pastors-kids-1.jpg", alt: "Pastors Kids Fellowship", category: "Pastors Kids" },
    { src: "/images/pastors-kids-2.jpg", alt: "Mentorship Gathering", category: "Pastors Kids" },

    { src: "/images/cycle-for-change-hero.jpg", alt: "Cycle For Change", category: "Cycle For Change" },
    { src: "/images/cycle-for-change-1.jpg", alt: "Community Ride", category: "Cycle For Change" },
    { src: "/images/cycle-for-change-2.jpg", alt: "Youth Riders", category: "Cycle For Change" },

    { src: "/images/pad-a-girl-hero.jpg", alt: "Pad A Girl Program", category: "Pad A Girl" },
    { src: "/images/pad-a-girl-school-session-1.jpg", alt: "School Session", category: "Pad A Girl" },
    { src: "/images/pad-a-girl-community-outreach.jpg", alt: "Community Outreach", category: "Pad A Girl" },
  ];

  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <main className="bg-white text-slate-900">
        {/* HERO */}
        <section className="relative min-h-[70vh] overflow-hidden text-white">
          <Image
            src="/images/cycle-for-change-hero.jpg"
            alt="Impact Generation Global Gallery"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-emerald-900/40" />

          <div className="relative z-20 flex min-h-[70vh] items-center">
            <div className="mx-auto w-full max-w-7xl px-6">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                    Impact Generation Global
                  </span>
                </div>

                <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                  Gallery
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                  Explore moments of mentorship, youth empowerment, outreach,
                  discipleship, dignity support, and community transformation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Stories In Pictures
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Impact In Action
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Every image tells a story of hope, mentorship, empowerment,
              education, dignity, and transformed lives.
            </p>
          </div>
        </section>

        {/* GALLERY */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="columns-1 gap-6 space-y-6 sm:columns-2 lg:columns-3">
              {images.map((img, index) => (
                <button
                  key={`${img.src}-${index}`}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative w-full break-inside-avoid overflow-hidden rounded-[2rem] text-left shadow-lg"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    className="w-full rounded-[2rem] object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-100 transition duration-500" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                      {img.category}
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-white">
                      {img.alt}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT SECTION */}
        <section className="bg-slate-50 px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-4">
              {[
                ["Youth Empowerment", "Building future leaders"],
                ["Community Outreach", "Serving communities"],
                ["Discipleship", "Growing faith and purpose"],
                ["Transformation", "Changing lives together"],
              ].map(([title, desc]) => (
                <div key={title} className="rounded-3xl bg-white p-8 shadow-sm">
                  <h3 className="text-xl font-bold">{title}</h3>
                  <p className="mt-3 text-slate-600">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-emerald-700 px-6 py-20 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">
            Be Part Of The Story
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
            Join us as we continue transforming lives through mentorship,
            discipleship, education, dignity support, and community outreach.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="rounded-full bg-white px-8 py-4 font-bold text-emerald-800 transition hover:-translate-y-1"
            >
              Support The Mission
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightboxIndex(-1)}
        >
          <div className="relative w-full max-w-5xl overflow-hidden rounded-xl">
            <button
              onClick={() => setLightboxIndex(-1)}
              className="absolute right-3 top-3 z-20 rounded-full bg-white/20 px-3 py-2 text-white hover:bg-white/30"
            >
              ✕
            </button>

            <Image
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              width={1400}
              height={900}
              className="max-h-[85vh] w-full bg-black object-contain"
            />

            <div className="bg-black px-5 py-4 text-white">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold">
                {images[lightboxIndex].category}
              </span>

              <h3 className="mt-3 text-xl font-bold">
                {images[lightboxIndex].alt}
              </h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}