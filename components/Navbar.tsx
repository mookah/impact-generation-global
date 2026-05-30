"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const programs = [
  { href: "/boys-to-men", label: "Boys To Men" },
  { href: "/pad-a-girl", label: "Pad A Girl" },
  { href: "/school-ministry", label: "School Ministry" },
  { href: "/cycle-for-change", label: "Cycle For Change" },
  { href: "/pastors-kids", label: "Pastors Kids" },
  { href: "/youth-camps", label: "Youth Camps" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-3">
        <div className="flex h-[78px] items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/45 px-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl">
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo-new.png"
              alt="Impact Generation Global"
              width={220}
              height={80}
              className="h-auto w-[170px] object-contain"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-semibold text-white hover:text-red-300">
              Home
            </Link>
            <Link href="/about" className="text-sm font-semibold text-white hover:text-red-300">
              About
            </Link>
            <Link href="/newsletter" className="text-sm font-semibold text-white hover:text-red-300">
              Newsletter
            </Link>
            <Link href="/gallery" className="text-sm font-semibold text-white hover:text-red-300">
              Gallery
            </Link>

            <div className="relative">
              <button
                onClick={() => setProgramOpen(!programOpen)}
                className="text-sm font-semibold text-white hover:text-red-300"
              >
                Programs ▾
              </button>

              {programOpen && (
                <div className="absolute left-0 top-full mt-4 w-64 rounded-3xl bg-white p-3 shadow-2xl">
                  <Link
                    href="/programs"
                    onClick={() => setProgramOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-bold text-emerald-700 hover:bg-emerald-50"
                  >
                    All Programs
                  </Link>

                  {programs.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setProgramOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact" className="text-sm font-semibold text-white hover:text-red-300">
              Contact
            </Link>

            <Link
              href="/donate"
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg hover:bg-red-700"
            >
              Get Involved
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {open && (
          <div className="mt-3 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-5">
              <Link href="/" onClick={() => setOpen(false)} className="font-semibold text-white">
                Home
              </Link>
              <Link href="/about" onClick={() => setOpen(false)} className="font-semibold text-white">
                About
              </Link>
              <Link href="/newsletter" onClick={() => setOpen(false)} className="font-semibold text-white">
                Newsletter
              </Link>
              <Link href="/gallery" onClick={() => setOpen(false)} className="font-semibold text-white">
                Gallery
              </Link>

              <div>
                <p className="mb-3 font-bold text-emerald-300">Programs</p>
                <div className="ml-4 flex flex-col gap-3">
                  <Link href="/programs" onClick={() => setOpen(false)} className="text-white">
                    All Programs
                  </Link>
                  {programs.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-white/85"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/contact" onClick={() => setOpen(false)} className="font-semibold text-white">
                Contact
              </Link>

              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="rounded-full bg-red-600 px-6 py-3 text-center text-sm font-bold text-white"
              >
                Get Involved
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}