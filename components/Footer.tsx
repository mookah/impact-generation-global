import Link from "next/link";

const FACEBOOK_LINK = "https://web.facebook.com/impactgeneration.com2022";

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
    <footer className="bg-slate-950 px-6 pb-10 pt-16 text-center text-white md:pt-20 md:text-left">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="mb-5 text-3xl font-bold leading-tight md:text-4xl">
            Impact Generation Global
          </h2>

          <p className="mx-auto mb-8 max-w-xl leading-relaxed text-slate-300 md:mx-0">
            A Christ-centered nonprofit devoted to discipleship, youth
            empowerment, education, counseling, and community transformation.
          </p>

          <Link
            href="/donate"
            className="inline-block rounded-full bg-amber-500 px-8 py-4 font-semibold text-white transition hover:-translate-y-1 hover:bg-amber-600"
          >
            Support The Mission
          </Link>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            Quick Links
          </h3>

          <div className="space-y-4 text-slate-300">
            <Link href="/" className="block transition hover:text-amber-400">
              Home
            </Link>
            <Link href="/about" className="block transition hover:text-amber-400">
              About
            </Link>
            <Link href="/gallery" className="block transition hover:text-amber-400">
              Gallery
            </Link>
            <Link href="/newsletter" className="block transition hover:text-amber-400">
              Newsletter
            </Link>
            <Link href="/contact" className="block transition hover:text-amber-400">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
            Programs
          </h3>

          <div className="space-y-4 text-slate-300">
            <Link href="/boys-to-men" className="block transition hover:text-amber-400">
              Boys To Men
            </Link>
            <Link href="/pastors-kids" className="block transition hover:text-amber-400">
              Pastors Kids
            </Link>
            <Link href="/cycle-for-change" className="block transition hover:text-amber-400">
              Cycle For Change
            </Link>
            <Link href="/pad-a-girl" className="block transition hover:text-amber-400">
              Pad A Girl
            </Link>
            <Link href="/school-ministry" className="block transition hover:text-amber-400">
              School Ministry
            </Link>
            <Link href="/youth-camps" className="block transition hover:text-amber-400">
              Youth Camps
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl border-t border-white/10 pt-8">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
              Contact
            </h3>

            <div className="grid gap-8 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/5 p-5">
                <h4 className="mb-3 font-semibold text-white">USA Office</h4>

                <p className="text-slate-300">David Luby</p>

                <a
                  href="mailto:dluby60@gmail.com"
                  className="mt-1 block break-all text-slate-300 transition hover:text-amber-400"
                >
                  dluby60@gmail.com
                </a>

                <a
                  href="tel:+17169842636"
                  className="mt-1 block text-slate-300 transition hover:text-amber-400"
                >
                  +1 (716) 984-2636
                </a>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <h4 className="mb-3 font-semibold text-white">Zambia Office</h4>

                <p className="text-slate-300">Fred Mbewe</p>

                <a
                  href="mailto:mbewefred1@gmail.com"
                  className="mt-1 block break-all text-slate-300 transition hover:text-amber-400"
                >
                  mbewefred1@gmail.com
                </a>

                <a
                  href="tel:+260977427127"
                  className="mt-1 block text-slate-300 transition hover:text-amber-400"
                >
                  +260 977 427127
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-5 md:items-end">
            <h3 className="text-sm font-bold uppercase tracking-[0.25em] text-amber-400">
              Follow Us
            </h3>

            <div className="flex justify-center gap-4 md:justify-end">
              <a
                href={FACEBOOK_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-amber-500"
              >
                <FacebookIcon />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-amber-500"
              >
                <InstagramIcon />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:-translate-y-1 hover:bg-amber-500"
              >
                <YoutubeIcon />
              </a>
            </div>

            <p className="max-w-sm text-center text-sm leading-6 text-slate-400 md:text-right">
              Follow Impact Generation Global for updates, outreach moments,
              youth programs, and ministry stories from Zambia and beyond.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center md:flex-row md:text-left">
          <p className="text-sm text-slate-500">
            © 2026 Impact Generation Global. All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 md:justify-end">
            <Link href="/privacy" className="transition hover:text-amber-400">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-amber-400">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
