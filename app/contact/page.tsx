import Link from "next/link";
import Image from "next/image";

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[70vh] overflow-hidden text-white">
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
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Impact Generation Global
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Contact Us
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                Partner with us, volunteer, sponsor a program, or simply learn
                more about how we are transforming lives through faith,
                mentorship, education, and community impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT INFO */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Get In Touch
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              We'd Love To Hear From You
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Whether you want to support a program, volunteer, donate, or
              partner with us, our team is ready to connect.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl">📧</div>
              <h3 className="mt-5 text-2xl font-bold">Email</h3>
              <p className="mt-3 text-slate-600 break-all">
                innocentwino@impactgenerationglobal.org
              </p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl">📍</div>
              <h3 className="mt-5 text-2xl font-bold">Location</h3>
              <p className="mt-3 text-slate-600">Zambia</p>
            </div>

            <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition">
              <div className="text-4xl">🌍</div>
              <h3 className="mt-5 text-2xl font-bold">Focus Areas</h3>
              <p className="mt-3 text-slate-600">
                Youth Development, Discipleship, Education, Community
                Transformation, Mentorship & Empowerment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Programs
            </p>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Areas You Can Support
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {["Boys To Men", "Pastors Kids", "Cycle For Change", "Pad A Girl"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm hover:shadow-md transition"
                >
                  <h3 className="font-bold">{item}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700 px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-bold md:text-5xl">
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
