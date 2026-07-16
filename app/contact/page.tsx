import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[70vh] overflow-hidden pt-28 text-white">
        <Image
          src="/images/contact-hero.jpg"
          alt="Contact Impact Generation Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-emerald-900/40" />

        <div className="relative z-20 flex min-h-[70vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-200">
                Impact Generation Global
              </p>

              <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
                Contact Us
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">
                Partner with us, volunteer, sponsor a program, or learn more
                about how we are transforming lives through faith, mentorship,
                education, and community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              Get In Touch
            </p>

            <h2 className="mt-3 text-3xl font-black md:text-5xl">
              We'd Love To Hear From You
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Whether you want to support a program, volunteer, donate, or
              partner with us, our team is ready to connect.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <div className="text-4xl">🇺🇸</div>
              <h3 className="mt-5 text-2xl font-bold">USA Office</h3>
              <p className="mt-3 font-semibold text-slate-800">David Luby</p>

              <a
                href="mailto:dluby60@gmail.com"
                className="mt-3 block break-all text-slate-600 hover:text-emerald-700"
              >
                dluby60@gmail.com
              </a>

              <a
                href="tel:+17169842636"
                className="mt-2 block text-slate-600 hover:text-emerald-700"
              >
                +1 (716) 984-2636
              </a>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-xl">
              <div className="text-4xl">🇿🇲</div>
              <h3 className="mt-5 text-2xl font-bold">Zambia Office</h3>
              <p className="mt-3 font-semibold text-slate-800">Fred Mbewe</p>

              <a
                href="mailto:mbewefred1@gmail.com"
                className="mt-3 block break-all text-slate-600 hover:text-emerald-700"
              >
                mbewefred1@gmail.com
              </a>

              <a
                href="tel:+260977427127"
                className="mt-2 block text-slate-600 hover:text-emerald-700"
              >
                +260 977 427127
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
              Why Reach Out?
            </p>

            <h2 className="mt-4 text-3xl font-black md:text-5xl">
              Let's Build Impact Together
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Whether you're an individual, church, business, school, or
              ministry, we'd love to explore how we can work together to empower
              young people, strengthen families, and transform communities
              across Zambia and beyond.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🤝</div>
              <h3 className="text-2xl font-bold">Become A Partner</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Churches, organizations, and businesses can partner with us to
                expand youth mentorship, discipleship, education, and community
                outreach.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">❤️</div>
              <h3 className="text-2xl font-bold">Support The Mission</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Every donation directly supports youth programs, school
                ministry, community outreach, girls' empowerment, and leadership
                development.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-2 hover:shadow-2xl">
              <div className="mb-6 text-5xl">🌍</div>
              <h3 className="text-2xl font-bold">Volunteer With Us</h3>
              <p className="mt-4 leading-7 text-slate-600">
                Join our growing family of volunteers, mentors, and supporters
                who are passionate about raising a generation with faith,
                dignity, and purpose.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-emerald-700 px-6 py-20 text-center text-white">
        <h2 className="text-3xl font-black md:text-5xl">
          Let's Make A Difference Together
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
          Every partnership, donation, volunteer hour, and act of support helps
          transform lives and strengthen communities.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/donate"
            className="rounded-full bg-white px-8 py-4 font-bold text-emerald-800 transition hover:-translate-y-1"
          >
            Donate Today
          </Link>

          <Link
            href="/about"
            className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}