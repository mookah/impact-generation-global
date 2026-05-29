import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About — Impact Generation Global",
  description:
    "Impact Generation Global is raising a generation transformed by faith, purpose, mentorship, discipleship, and practical support.",
};

export default function AboutPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[85vh] overflow-hidden text-white">
        <Image
          src="/images/about-hero.jpg"
          alt="Impact Generation Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/25 to-transparent" />

        <div className="relative z-20 flex min-h-[85vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/20 p-8 backdrop-blur-sm md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
                Impact Generation Global
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                About Us
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-xl">
                A Christ-centered nonprofit committed to raising a transformed
                generation through discipleship, mentorship, counseling,
                education, and practical community support.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/donate"
                  className="rounded-full bg-emerald-600 px-8 py-4 text-center font-bold text-white shadow-xl transition hover:-translate-y-1 hover:bg-emerald-700"
                >
                  Donate Today
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-md transition hover:bg-white/20"
                >
                  Get Involved
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Who We Are
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-6xl">
              Raising a generation with faith and purpose
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-700">
              Impact Generation Global walks alongside young people, families,
              schools, churches, and communities through programs that inspire
              transformation, dignity, leadership, and purpose.
            </p>

            <p className="mt-4 text-lg leading-8 text-slate-700">
              Through discipleship, mentorship, education, counseling,
              community outreach, and practical support, we help individuals
              discover their God-given potential and positively impact society.
            </p>
          </div>

          <div className="relative h-[420px] overflow-hidden rounded-[2rem] shadow-2xl">
            <Image
              src="/images/mission.jpg"
              alt="Impact Generation Global mission work"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] bg-white p-10 shadow-lg">
            <div className="text-5xl">👁️</div>

            <h3 className="mt-6 text-3xl font-black">Our Vision</h3>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              To see young people transformed, empowered, and equipped to live
              with purpose, faith, dignity, leadership, and lasting impact.
            </p>
          </div>

          <div className="rounded-[2rem] bg-emerald-700 p-10 text-white shadow-lg">
            <div className="text-5xl">🎯</div>

            <h3 className="mt-6 text-3xl font-black">Our Mission</h3>

            <p className="mt-4 text-lg leading-8 text-emerald-50">
              To walk alongside the next generation through spiritual,
              emotional, educational, and practical support programs that
              transform lives and strengthen communities.
            </p>
          </div>
        </div>
      </section>

      {/* AREAS OF IMPACT */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              What We Do
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Areas of Impact
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Programs designed to meet practical needs, foster spiritual
              growth, and build strong communities.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Boys To Men",
              "Pastors Kids",
              "Cycle For Change",
              "School Ministry",
              "Pad A Girl",
              "Prison Ministry",
              "Camp Meetings",
              "Youth Empowerment",
              "Community Outreach",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-xl font-black text-slate-900">{item}</h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Serving communities through {item.toLowerCase()} with faith,
                  compassion, dignity, and practical care.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-400">
              Our Values
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              What Guides Us
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Faith",
                desc: "Christ-centered discipleship and mentorship.",
              },
              {
                title: "Integrity",
                desc: "Living with honesty, accountability, and dignity.",
              },
              {
                title: "Community",
                desc: "Building safe and supportive spaces.",
              },
              {
                title: "Empowerment",
                desc: "Equipping youth with skills and confidence.",
              },
              {
                title: "Compassion",
                desc: "Serving with love, care, and understanding.",
              },
              {
                title: "Transformation",
                desc: "Creating lasting impact in lives and communities.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
              >
                <h3 className="text-2xl font-black text-emerald-300">
                  {value.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-300">{value.desc}</p>
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
              Partner with us
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-emerald-50">
              Join us in raising a generation with faith and purpose. Your
              support helps us reach more young people through discipleship,
              mentorship, education, and practical care.
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