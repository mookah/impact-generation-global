"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const events = [
  {
    title: "Youth Camp 2026",
    date: "18–23 August 2026",
    image: "/images/events/youth-camp-2026-poster.jpg",
    imageAlt: "Impact Generation Youth Camp 2026",
    description:
      "A transformational week of discipleship, worship, mentorship, leadership development, fellowship and team-building activities.",
    link: "/youth-camps",
  },
  {
    title: "Cycle for Change Festival 2026",
    date: "22 August 2026",
    image: "/images/events/cycle-for-change-city-ride.jpg",
    imageAlt: "Young people participating in Cycle for Change",
    description:
      "Join our city-wide cycling event as we raise awareness about mental health, addiction and crime while sharing the hope and love of Jesus Christ.",
    link: "/cycle-for-change",
  },
];

export default function UpcomingEventsPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = () => {
    setIsOpen(false);

    sessionStorage.setItem(
      "impact-generation-events-popup-2026",
      "closed"
    );
  };

  useEffect(() => {
    const popupClosed = sessionStorage.getItem(
      "impact-generation-events-popup-2026"
    );

    if (!popupClosed) {
      const timer = window.setTimeout(() => {
        setIsOpen(true);
      }, 1500);

      return () => window.clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="events-popup-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closePopup();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Close button */}
        <button
          type="button"
          onClick={closePopup}
          aria-label="Close upcoming events popup"
          className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-3xl leading-none text-white transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-white"
        >
          ×
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-600 px-6 py-9 text-center text-white sm:px-10">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-300 sm:text-sm">
            Impact Generation Global Movement
          </p>

          <h2
            id="events-popup-title"
            className="text-3xl font-bold sm:text-4xl"
          >
            Upcoming Events
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/90 sm:text-base">
            Join us as we equip, disciple, empower and inspire the next
            generation.
          </p>
        </div>

        {/* Events */}
        <div className="grid gap-6 p-5 sm:p-7 md:grid-cols-2">
          {events.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
            >
              <div className="relative h-52 w-full sm:h-60">
                <Image
                  src={event.image}
                  alt={event.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <span className="absolute bottom-4 left-4 rounded-full bg-amber-500 px-4 py-2 text-sm font-bold text-blue-950 shadow-lg">
                  {event.date}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-blue-950 sm:text-2xl">
                  {event.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  {event.description}
                </p>

                <Link
                  href={event.link}
                  onClick={closePopup}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-blue-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-900 focus:ring-offset-2"
                >
                  View Event Details
                  <span aria-hidden="true" className="ml-2">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Continue button */}
        <div className="border-t border-slate-200 px-5 py-5 sm:px-7">
          <button
            type="button"
            onClick={closePopup}
            className="w-full rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:border-blue-950 hover:bg-slate-100 hover:text-blue-950"
          >
            Continue to Website
          </button>
        </div>
      </div>
    </div>
  );
}