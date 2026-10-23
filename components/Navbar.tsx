"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const PAYPAL_DONATE_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA";

const GOFUNDME_LINK = "https://gofund.me/7f8b19b5e";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Updates" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  // The menu remembers which route it was opened on, so navigating to a new
  // page closes it without needing a state-syncing effect.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const open = menuPath === pathname;

  const setOpen = (value: boolean | ((current: boolean) => boolean)) => {
    setMenuPath((current) => {
      const isOpen = current === pathname;
      const next = typeof value === "function" ? value(isOpen) : value;
      return next ? pathname : null;
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scrolling while the mobile menu is open, and close it on Escape.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled || open
          ? "border-b border-slate-200/80 shadow-[0_1px_12px_rgba(7,28,55,0.06)]"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-20">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Impact Generation Global — home"
        >
          <Image
            src="/logo-new.png"
            alt="Impact Generation Global"
            width={220}
            height={80}
            priority
            className="h-10 w-auto object-contain sm:h-12"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                isActive(link.href)
                  ? "bg-brand-50 text-brand-800"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="rounded-full bg-brand-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-brand-900 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Donate
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:bg-slate-50 xl:hidden"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "✕" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {/* MOBILE / TABLET MENU */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-slate-100 bg-white px-5 pb-10 pt-2 xl:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between border-b border-slate-100 py-4 text-base font-semibold ${
                  isActive(link.href) ? "text-brand-800" : "text-slate-800"
                }`}
              >
                {link.label}
                <span aria-hidden="true" className="text-slate-300">
                  →
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-6 grid gap-3">
            <a
              href={PAYPAL_DONATE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full"
            >
              Donate with PayPal
            </a>

            <a
              href={GOFUNDME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline w-full"
            >
              Support on GoFundMe
            </a>

            <Link
              href="/donate"
              onClick={() => setOpen(false)}
              className="pt-2 text-center text-sm font-semibold text-slate-500"
            >
              Learn about our mission →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
