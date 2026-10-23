import Image from "next/image";
import Link from "next/link";
import { programs, site } from "@/lib/site";

const FACEBOOK_LINK = site.facebook;

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.03 3.66 9.2 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.53 1.49-3.93 3.77-3.93 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.9h2.78l-.44 2.91h-2.34V22C18.34 21.26 22 17.09 22 12.06Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-5 w-5 fill-current"
    >
      <path d="M7.75 2h8.5A5.76 5.76 0 0 1 22 7.75v8.5A5.76 5.76 0 0 1 16.25 22h-8.5A5.76 5.76 0 0 1 2 16.25v-8.5A5.76 5.76 0 0 1 7.75 2Zm0 2A3.75 3.75 0 0 0 4 7.75v8.5A3.75 3.75 0 0 0 7.75 20h8.5A3.75 3.75 0 0 0 20 16.25v-8.5A3.75 3.75 0 0 0 16.25 4h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-2.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-6 w-6 fill-current"
    >
      <path d="M21.58 7.19a2.76 2.76 0 0 0-1.94-1.96C17.93 4.77 12 4.77 12 4.77s-5.93 0-7.64.46a2.76 2.76 0 0 0-1.94 1.96A28.8 28.8 0 0 0 2 12a28.8 28.8 0 0 0 .42 4.81 2.76 2.76 0 0 0 1.94 1.96c1.71.46 7.64.46 7.64.46s5.93 0 7.64-.46a2.76 2.76 0 0 0 1.94-1.96A28.8 28.8 0 0 0 22 12a28.8 28.8 0 0 0-.42-4.81ZM10 15.27V8.73L15.45 12 10 15.27Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="shell grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-16">
        {/* BRAND */}
        <div className="md:col-span-5">
          <Image
            src="/logo-new.png"
            alt="Impact Generation Global"
            width={200}
            height={72}
            className="h-12 w-auto object-contain"
          />

          <p className="mt-5 max-w-sm text-sm leading-7 text-brand-100/80">
            A Christ-centered nonprofit raising young people in Zambia with
            faith, character, dignity and purpose.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/donate" className="btn btn-gold !px-6 !py-3 text-sm">
              Donate
            </Link>

            <Link
              href="/newsletter"
              className="btn !border !border-white/20 !bg-white/5 !px-6 !py-3 text-sm text-white hover:!bg-white/10"
            >
              Newsletter
            </Link>
          </div>
        </div>

        {/* EXPLORE */}
        <nav className="md:col-span-2" aria-label="Footer navigation">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
            Explore
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
            {[
              { href: "/about", label: "About & Vision" },
              { href: "/programs", label: "Programs" },
              { href: "/events", label: "Events" },
              { href: "/gallery", label: "Gallery" },
              { href: "/blog", label: "Updates" },
              { href: "/contact", label: "Contact" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-gold-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* PROGRAMS */}
        <nav className="md:col-span-2" aria-label="Programs">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
            Programs
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
            {programs.map((program) => (
              <li key={program.slug}>
                <Link
                  href={`/programs/${program.slug}`}
                  className="transition hover:text-gold-300"
                >
                  {program.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CONTACT */}
        <div className="md:col-span-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
            Contact
          </h2>

          <ul className="mt-4 space-y-3 text-sm text-brand-100/80">
            <li>
              <span className="block text-xs uppercase tracking-wider text-brand-200/60">
                Zambia
              </span>
              <a href="tel:+260977427127" className="hover:text-gold-300">
                +260 977 427127
              </a>
            </li>

            <li>
              <span className="block text-xs uppercase tracking-wider text-brand-200/60">
                United States
              </span>
              <a href="tel:+17169842636" className="hover:text-gold-300">
                +1 (716) 984-2636
              </a>
            </li>

            <li>
              <a
                href="mailto:dluby60@gmail.com"
                className="break-all hover:text-gold-300"
              >
                dluby60@gmail.com
              </a>
            </li>
          </ul>

          <div className="mt-5 flex gap-3">
            <a
              href={FACEBOOK_LINK}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-gold-400 hover:text-brand-950"
            >
              <FacebookIcon />
            </a>

            <a
              href={site.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-gold-400 hover:text-brand-950"
            >
              <YoutubeIcon />
            </a>

            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-gold-400 hover:text-brand-950"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-center justify-between gap-3 py-6 text-center text-xs text-brand-200/70 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Impact Generation Global. All rights
            reserved.
          </p>

          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-gold-300">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-gold-300">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
