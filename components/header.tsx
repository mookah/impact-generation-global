"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PROGRAMS = [
  { title: "Boys to Men", slug: "boys-to-men" },
  { title: "Pad A Girl", slug: "pad-a-girl" },
  { title: "School Ministry", slug: "school-ministry" },
  { title: "Cycle For Change", slug: "cycle-for-change" },
  { title: "Pastors Kids", slug: "pastors-kids" },
  { title: "Prison Ministry", slug: "prison-ministry" },
  { title: "Camp Meetings", slug: "camp-meetings" },
];

export default function Header(): JSX.Element {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current) return;
      if (menuRef.current.contains(e.target as Node)) return;
      setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  // Focus first item when opening
  useEffect(() => {
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    first?.focus();
  }, [open]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white text-lg font-black shadow">
            IG
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-700">Impact Generation</p>
            <p className="text-sm font-bold -mt-0.5">Global</p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Primary">
          <a href="#mission" className="text-slate-700 hover:text-emerald-700 transition">Mission</a>

          {/* Programs dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              ref={buttonRef}
              onClick={() => setOpen((s) => !s)}
              aria-expanded={open}
              aria-haspopup="menu"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-slate-700 hover:text-emerald-700 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Programs
              <svg
                className={`h-3 w-3 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden
              >
                <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <div
                role="menu"
                aria-label="Programs"
                className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-100 bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none"
              >
                <div className="p-2">
                  {PROGRAMS.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/${p.slug}`}
                      role="menuitem"
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200"
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-lg" aria-hidden>
                        {/* lightweight icon fallback */}
                        {p.title === "Pad A Girl" ? "🩸" : p.title === "Boys to Men" ? "👨‍👦" : "📌"}
                      </span>
                      <span className="font-semibold">{p.title}</span>
                    </Link>
                  ))}
                </div>

                <div className="border-t border-slate-100 px-3 py-2">
                  <Link
                    href="/programs"
                    className="block rounded-md px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                    onClick={() => setOpen(false)}
                  >
                    View all programs
                  </Link>
                </div>
              </div>
            )}
          </div>

          <a href="#programs" className="text-slate-700 hover:text-emerald-700 transition">Programs (anchor)</a>
          <Link href="/about" className="text-slate-700 hover:text-emerald-700 transition">About</Link>
          <Link href="/contact" className="text-slate-700 hover:text-emerald-700 transition">Contact</Link>

          <Link
            href="/donate"
            className="ml-2 rounded-full bg-emerald-600 px-4 py-2 text-white font-semibold shadow hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            Donate
          </Link>
        </nav>

        <div className="md:hidden">
          <Link href="/donate" className="rounded-full bg-emerald-600 px-3 py-2 text-white text-sm font-semibold shadow">
            Donate
          </Link>
        </div>
      </div>
    </header>
  );
}
