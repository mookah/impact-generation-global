"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Shot = { src: string; alt: string; category: string };

const IMAGES: Shot[] = [
  // Youth Camps
  { src: "/images/youth-camps/youth-camps-hero.webp", alt: "Youth Camp 2026 gathering", category: "Youth Camps" },
  { src: "/images/events/youth-camp-worship-session.webp", alt: "Worship session at Youth Camp", category: "Youth Camps" },
  { src: "/images/events/youth-camp-team-building.webp", alt: "Team building activities", category: "Youth Camps" },
  { src: "/images/youth-camps/youth-camps-2.webp", alt: "Camp group activity", category: "Youth Camps" },
  { src: "/images/youth-camps/youth-camps-4.webp", alt: "Camp participants learning together", category: "Youth Camps" },
  { src: "/images/youth-camps/youth-camps-6.webp", alt: "Youth Camp fellowship", category: "Youth Camps" },
  { src: "/images/youth-camps/youth-camps-8.webp", alt: "Youth Camp group photo", category: "Youth Camps" },
  { src: "/images/youth-camps/youth-camps-10.webp", alt: "Camp games and activities", category: "Youth Camps" },

  // Boys To Men
  { src: "/images/boys-to-men/boys-to-men-hero.webp", alt: "Boys 2 Men Conference", category: "Boys To Men" },
  { src: "/images/boys-to-men/boys-to-men-2.webp", alt: "Mentorship session with young men", category: "Boys To Men" },
  { src: "/images/boys-to-men/boys-to-men-4.webp", alt: "Leadership teaching", category: "Boys To Men" },
  { src: "/images/boys-to-men/boys-to-men-6.webp", alt: "Boys To Men participants", category: "Boys To Men" },

  // Pad A Girl
  { src: "/images/pad-a-girl/pad-a-girl-hero.webp", alt: "Pad A Girl school outreach", category: "Pad A Girl" },
  { src: "/images/pad-a-girl/pad-a-girl-2.webp", alt: "Dignity kits distribution", category: "Pad A Girl" },
  { src: "/images/pad-a-girl/pad-a-girl-5.webp", alt: "Girls at a Pad A Girl session", category: "Pad A Girl" },
  { src: "/images/pad-a-girl/pad-a-girl-9.webp", alt: "Mentorship with girls", category: "Pad A Girl" },
  { src: "/images/pad-a-girl/pad-a-girl-13.webp", alt: "Community outreach", category: "Pad A Girl" },

  // School Ministry
  { src: "/images/school-ministry/school-ministry-hero.webp", alt: "School ministry assembly", category: "School Ministry" },
  { src: "/images/school-ministry/school-ministry-2.webp", alt: "Students in a session", category: "School Ministry" },
  { src: "/images/school-ministry/school-ministry-5.webp", alt: "Classroom mentorship", category: "School Ministry" },
  { src: "/images/school-ministry/school-ministry-8.webp", alt: "School outreach team", category: "School Ministry" },

  // Cycle For Change
  { src: "/images/cycle-for-change-hero.webp", alt: "Cycle For Change riders", category: "Cycle For Change" },
  { src: "/images/events/cycle-for-change-city-ride.webp", alt: "City awareness ride", category: "Cycle For Change" },
  { src: "/images/events/cycle-for-change-community-ride.webp", alt: "Community ride", category: "Cycle For Change" },
  { src: "/images/events/cycle-for-change-kids-bikes.webp", alt: "Young cyclists", category: "Cycle For Change" },
  { src: "/images/events/cycle-for-change-festival-2.webp", alt: "Cycle For Change festival", category: "Cycle For Change" },
  { src: "/images/events/cycle-for-change-team-building.webp", alt: "Cycling team", category: "Cycle For Change" },

  // Pastors Kids
  { src: "/images/pastors-kids-hero.webp", alt: "Pastors Kids gathering", category: "Pastors Kids" },
  { src: "/images/pastors-kids-2.webp", alt: "Pastors Kids fellowship", category: "Pastors Kids" },
  { src: "/images/pastors-kids-4.webp", alt: "Pastors Kids mentorship", category: "Pastors Kids" },
  { src: "/images/pastors-kids-6.webp", alt: "Pastors Kids event", category: "Pastors Kids" },
];


export default function GalleryGrid({ extraImages = [], includeExisting = true }: { extraImages?: Shot[]; includeExisting?: boolean }) {
  const images = useMemo(() => [...extraImages, ...(includeExisting ? IMAGES : [])], [extraImages, includeExisting]);
  const categories = ["All", ...Array.from(new Set(images.map(image => image.category)))];
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(-1);

  const visible = useMemo(
    () => (active === "All" ? images : images.filter((i) => i.category === active)),
    [active, images]
  );

  useEffect(() => {
    if (lightbox < 0) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(-1);
      if (event.key === "ArrowRight")
        setLightbox((index) => (index + 1) % visible.length);
      if (event.key === "ArrowLeft")
        setLightbox((index) => (index - 1 + visible.length) % visible.length);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, visible.length]);

  return (
    <>
      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActive(category);
              setLightbox(-1);
            }}
            aria-pressed={active === category}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
              active === category
                ? "border-brand-800 bg-brand-800 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {visible.map((image, index) => (
          <button
            key={`${image.src}-${index}`}
            type="button"
            onClick={() => setLightbox(index)}
            aria-label={`Open photo: ${image.alt}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-slate-100"
          >
            <Image
              src={image.src}
                  unoptimized={image.src.startsWith("/api/media/")}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-950/85 to-transparent p-2.5 pt-10 text-left text-[11px] font-semibold leading-4 text-white opacity-0 transition group-hover:opacity-100 sm:text-xs">
              {image.alt}
            </span>
          </button>
        ))}
      </div>

      {/* LIGHTBOX */}
      {lightbox >= 0 && visible[lightbox] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={visible[lightbox].alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
          onClick={() => setLightbox(-1)}
        >
          <button
            type="button"
            onClick={() => setLightbox(-1)}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20"
          >
            ✕
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((index) => (index - 1 + visible.length) % visible.length);
            }}
            aria-label="Previous photo"
            className="absolute left-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:left-6"
          >
            ‹
          </button>

          <figure
            className="relative max-h-[85vh] w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={visible[lightbox].src}
                  unoptimized={visible[lightbox].src.startsWith("/api/media/")}
                alt={visible[lightbox].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="rounded-lg object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {visible[lightbox].alt}
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setLightbox((index) => (index + 1) % visible.length);
            }}
            aria-label="Next photo"
            className="absolute right-2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition hover:bg-white/20 sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
