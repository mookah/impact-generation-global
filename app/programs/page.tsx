"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";

type Program = {
  title: string;
  slug: string;
  icon: string;
  desc: string;
};

const PROGRAMS: Program[] = [
  {
    title: "Boys To Men",
    slug: "boys-to-men",
    icon: "👨‍👦",
    desc: "Mentorship for confidence, discipline, character, and leadership.",
  },
  {
    title: "Pad A Girl",
    slug: "pad-a-girl",
    icon: "🩸",
    desc: "Hygiene, dignity, education, and empowerment support for girls.",
  },
  {
    title: "School Ministry",
    slug: "school-ministry",
    icon: "🏫",
    desc: "Guiding students toward purpose, faith, and wise choices.",
  },
  {
    title: "Cycle For Change",
    slug: "cycle-for-change",
    icon: "🚴",
    desc: "Cycling to connect communities and raise awareness.",
  },
  {
    title: "Pastors Kids",
    slug: "pastors-kids",
    icon: "👨‍👩‍👧",
    desc: "Support, mentorship, and identity care for pastors' children.",
  },
  {
    title: "Prison Ministry",
    slug: "prison-ministry",
    icon: "🔓",
    desc: "Restoring hope and transforming lives through discipleship.",
  },
  {
    title: "Camp Meetings",
    slug: "camp-meetings",
    icon: "🏕️",
    desc: "Faith-based camps focused on leadership and spiritual growth.",
  },
];

/* Dropdown portal component:
   - Renders into document.body so it can't be clipped by parent overflow.
   - Positions itself under the anchor button using getBoundingClientRect.
   - Closes on outside pointerdown and Escape.
*/
function ProgramsDropdown({
  anchorRef,
  open,
  onClose,
  programs,
}: {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  onClose: () => void;
  programs: Program[];
}) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    const anchor = anchorRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const width = Math.min(360, Math.max(240, rect.width)); // sensible width
    const left = Math.max(12, rect.left + rect.width - width); // align right edge
    const top = rect.bottom + 8; // small gap
    setPos({ top, left, width });

    function onPointerDown(e: PointerEvent) {
      const target = e.target as Node | null;
      if (!target) return;
      if (elRef.current?.contains(target)) return;
      if (anchor.contains(target)) return;
      onClose();
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, anchorRef, onClose]);

  useEffect(() => {
    if (!open || !elRef.current) return;
    const first = elRef.current.querySelector<HTMLAnchorElement>("a[role='menuitem']");
    first?.focus();
  }, [open]);

  if (!open || !pos) return null;

  return createPortal(
    <div
      ref={elRef}
      role="menu"
      aria-label="Programs"
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width,
        zIndex: 9999,
      }}
      className="rounded-2xl border border-slate-100 bg-white shadow-2xl ring-1 ring-black/10"
    >
      <div className="p-2">
        {programs.map((p) => (
          <Link
            key={p.slug}
            href={`/${p.slug}`}
            role="menuitem"
            tabIndex={0}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
            onClick={onClose}
          >
            <span className="text-2xl" aria-hidden>
              {p.icon}
            </span>
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-xs text-slate-500">{p.desc}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="border-t border-slate-100 px-3 py-2">
        <Link
          href="/programs"
          className="block rounded-md px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
          onClick={onClose}
        >
          View all programs
        </Link>
      </div>
    </div>,
    document.body
  );
}

export default function ProgramsPage() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const anchorRef = useRef<HTMLButtonElement | null>(null);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return PROGRAMS;
    return PROGRAMS.filter((program) =>
      `${program.title} ${program.desc}`.toLowerCase().includes(search)
    );
  }, [query]);

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[85vh] overflow-hidden text-white">
        <Image
          src="/images/programs-hero.jpg"
          alt="Impact Generation Global Programs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/45 via-slate-950/15 to-transparent" />

        <div className="relative z-20 flex min-h-[85vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/20 p-8 backdrop-blur-sm md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
                Impact Generation Global
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Our Programs
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-xl">
                Transforming lives through discipleship, mentorship, education,
                outreach, empowerment, and practical support.
              </p>

              <div className="relative mt-8 max-w-md">
                <button
                  type="button"
                  ref={anchorRef}
                  onClick={() => setOpen((s) => !s)}
                  aria-expanded={open}
                  aria-controls="programs-menu"
                  className="flex w-full items-center justify-between rounded-full border border-white/20 bg-white px-6 py-4 font-bold text-slate-900 shadow-xl"
                >
                  View All Programs
                  <span>{open ? "▲" : "▼"}</span>
                </button>

                {/* Portal dropdown ensures visibility above hero image */}
                <ProgramsDropdown
                  anchorRef={anchorRef}
                  open={open}
                  onClose={() => setOpen(false)}
                  programs={PROGRAMS}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            What We Do
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            Programs That Transform Lives
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Every program is designed to empower, guide, equip, and support
            individuals and communities through faith, dignity, mentorship,
            education, and practical care.
          </p>
        </div>
      </section>

      {/* SEARCH */}
      <section className="bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs..."
            className="w-full rounded-full border border-slate-200 bg-white px-6 py-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
          />
        </div>
      </section>

      {/* PROGRAMS GRID */}
      <section className="bg-slate-50 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((program) => (
              <Link
                key={program.slug}
                href={`/${program.slug}`}
                className="group rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-3xl text-white shadow-lg">
                  {program.icon}
                </div>

                <h3 className="mt-6 text-2xl font-black text-slate-900">
                  {program.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {program.desc}
                </p>

                <div className="mt-5 font-bold text-emerald-700 transition group-hover:translate-x-1">
                  Learn More →
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="rounded-3xl bg-white p-10 text-center shadow-sm mt-8">
              <h3 className="text-2xl font-black">No program found</h3>
              <p className="mt-2 text-slate-600">
                Try searching with another word.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
            Our Impact
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-6xl">
            One Mission, Many Programs
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            Through every program, we are raising a generation transformed by
            faith, purpose, dignity, leadership, and practical support.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Faith", "Christ-centered discipleship"],
              ["Purpose", "Identity and direction"],
              ["Dignity", "Practical care and support"],
              ["Transformation", "Lasting community impact"],
            ].map(([title, desc]) => (
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-black text-emerald-300">
                  {title}
                </h3>
                <p className="mt-3 text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700 px-6 py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 className="text-4xl font-black md:text-5xl">
              Partner With Our Programs
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
              Your support helps us reach more young people through mentorship,
              discipleship, education, outreach, and practical care.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              href="/donate"
              className="rounded-full bg-white px-8 py-4 text-center font-bold text-emerald-800 transition hover:-translate-y-1"
            >
              Donate Today
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-white/30 px-8 py-4 text-center font-bold text-white transition hover:bg-white/10"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
