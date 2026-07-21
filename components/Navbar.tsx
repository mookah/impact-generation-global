"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const PAYPAL_DONATE_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA";

const GOFUNDME_LINK = "https://gofund.me/7f8b19b5e";

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

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm font-semibold text-white transition hover:text-red-300"
            >
              Home
            </Link>

            <Link
              href="/about"
              className="text-sm font-semibold text-white transition hover:text-red-300"
            >
              About
            </Link>

            <Link
              href="/newsletter"
              className="text-sm font-semibold text-white transition hover:text-red-300"
            >
              Newsletter
            </Link>

            <Link
              href="/gallery"
              className="text-sm font-semibold text-white transition hover:text-red-300"
            >
              Gallery
            </Link>

            {/* PROGRAMS DROPDOWN - AUTO CLOSE ON MOUSE LEAVE */}
            <div className="group relative py-6">
              <button className="text-sm font-semibold text-white transition hover:text-red-300">
                Programs ▾
              </button>

              <div className="invisible absolute left-0 top-full z-50 w-72 translate-y-3 rounded-3xl border border-slate-100 bg-white p-3 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <Link
                  href="/programs"
                  className="block rounded-2xl px-5 py-4 font-bold text-emerald-700 transition hover:bg-emerald-50"
                >
                  All Programs
                  <p className="mt-1 text-sm font-normal text-slate-500">
                    Explore all Impact Generation Global programs.
                  </p>
                </Link>

                <div className="my-2 h-px bg-slate-100" />

                {programs.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="text-sm font-semibold text-white transition hover:text-red-300"
            >
              Contact
            </Link>

            {/* DONATE DROPDOWN - AUTO CLOSE ON MOUSE LEAVE */}
            <div className="group relative py-6">
              <button className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-red-700">
                Donate ▾
              </button>

              <div className="invisible absolute right-0 top-full z-50 w-80 translate-y-3 overflow-hidden rounded-3xl border border-slate-100 bg-white opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <a
                  href={PAYPAL_DONATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-6 py-5 transition hover:bg-emerald-50"
                >
                  <p className="font-bold text-slate-900">Donate with PayPal</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Make a secure online donation to support the mission.
                  </p>
                </a>

                <a
                  href={GOFUNDME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-t border-slate-100 px-6 py-5 transition hover:bg-emerald-50"
                >
                  <p className="font-bold text-slate-900">Donate with GoFundMe</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    Support David Luby & Joe&apos;s Zambia leadership mission.
                  </p>
                </a>

                <Link
                  href="/donate"
                  className="block border-t border-slate-100 px-6 py-5 transition hover:bg-emerald-50"
                >
                  <p className="font-bold text-emerald-700">
                    Learn About The Mission →
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">
                    See how your support helps transform lives in Zambia.
                  </p>
                </Link>
              </div>
            </div>
          </nav>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white md:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="mt-3 rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-5">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="font-semibold text-white"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="font-semibold text-white"
              >
                About
              </Link>

              <Link
                href="/newsletter"
                onClick={() => setOpen(false)}
                className="font-semibold text-white"
              >
                Newsletter
              </Link>

              <Link
                href="/gallery"
                onClick={() => setOpen(false)}
                className="font-semibold text-white"
              >
                Gallery
              </Link>

              <div>
                <p className="mb-3 font-bold text-emerald-300">Programs</p>

                <div className="ml-4 flex flex-col gap-3">
                  <Link
                    href="/programs"
                    onClick={() => setOpen(false)}
                    className="text-white"
                  >
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

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="font-semibold text-white"
              >
                Contact
              </Link>

              <div className="rounded-3xl bg-white p-4">
                <p className="mb-3 font-bold text-slate-900">Donate</p>

                <a
                  href={PAYPAL_DONATE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl bg-red-600 px-5 py-3 text-center text-sm font-bold text-white"
                >
                  Donate with PayPal
                </a>

                <a
                  href={GOFUNDME_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-3 block rounded-2xl bg-emerald-700 px-5 py-3 text-center text-sm font-bold text-white"
                >
                  Donate with GoFundMe
                </a>

                <Link
                  href="/donate"
                  onClick={() => setOpen(false)}
                  className="mt-3 block rounded-2xl border border-emerald-200 px-5 py-3 text-center text-sm font-bold text-emerald-700"
                >
                  Learn About The Mission
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
