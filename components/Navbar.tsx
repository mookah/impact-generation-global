"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/newsletter", label: "Newsletter" },
    { href: "/gallery", label: "Gallery" },
    { href: "/programs", label: "Programs" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-3">
        <div className="flex h-[78px] items-center justify-between rounded-[28px] border border-white/10 bg-slate-950/45 px-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl backdrop-saturate-150">

          {/* LOGO */}
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src="/logo-new.png"
              alt="Impact Generation"
              width={220}
              height={80}
              className="h-auto w-[170px] object-contain"
              priority
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-sm font-semibold text-white transition duration-300 hover:text-red-300 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/donate"
              className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-red-700"
            >
              Get Involved
            </Link>
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
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base font-semibold text-white"
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white"
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