import Image from "next/image";
import Link from "next/link";


export const metadata = {
  title: "Boys To Men — Impact Generation Global",
  description:
    "Transforming boys into responsible, confident, purpose-driven men through mentorship, leadership training and faith-based guidance.",
};

const galleryImages = [
  "/images/boys-to-men-1.jpg",
  "/images/boys-to-men-2.jpg",
  "/images/boys-to-men-3.jpg",
  "/images/boys-to-men-4.jpg",
  "/images/boys-to-men-5.jpg",
  "/images/boys-to-men-6.jpg",
];

export default function BoysToMenPage() {
  return (
    <main className="bg-white text-slate-900 antialiased">
      {/* HERO */}
      <section className="relative min-h-[78vh] md:min-h-[85vh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/boys-to-men-hero.jpg"
            alt="Boys To Men Program"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-amber-900/30 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-28 flex items-center">
          <div className="w-full max-w-3xl text-white">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-200">
                Impact Generation Global
              </span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Boys To Men
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-amber-100 max-w-2xl leading-relaxed">
              Transforming boys into responsible, confident, disciplined, purpose-driven men through mentorship,
              leadership training, character development and faith-based guidance.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300"
                aria-label="Support the Boys To Men program"
              >
                Support The Program
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/6 px-6 py-3 text-base font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20"
                aria-label="Get involved with Boys To Men"
              >
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">
              Mentorship • Discipline • Purpose
            </p>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">
              Helping boys become responsible men
            </h2>

            <p className="mt-6 text-lg text-slate-700 leading-relaxed max-w-xl">
              The Boys To Men initiative equips young boys with mentorship, values and life skills necessary to become
              strong, responsible and impactful men in their families, communities and nation.
            </p>

            <p className="mt-4 text-lg text-slate-700 leading-relaxed max-w-xl">
              Through mentorship camps, leadership development, practical life lessons and faith formation, we help
              young people discover identity, purpose and potential.
            </p>

            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                href="/programs"
                className="rounded-full border border-amber-600 px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 transition"
              >
                Explore Programs
              </Link>
              <Link
                href="/volunteer"
                className="rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:brightness-105 transition"
              >
                Become a Mentor
              </Link>
            </div>
          </div>

          <div className="relative h-[360px] md:h-[460px] overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/images/boys-to-men-hero.jpg"
              alt="Boys To Men mentorship"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-slate-950 px-6 py-12 text-white">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ["500+", "Young Men Mentored"],
            ["25+", "Communities Reached"],
            ["50+", "Mentorship Sessions"],
            ["10+", "Partner Organizations"],
          ].map(([value, label]) => (
            <div key={label} className="py-4">
              <h3 className="text-3xl md:text-4xl font-extrabold text-amber-400">{value}</h3>
              <p className="mt-2 text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CORE PILLARS */}
      <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Our Core Pillars</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">What we teach</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🛡️",
                title: "Identity",
                desc: "Helping boys understand who they are, build confidence and develop self-worth rooted in values and purpose.",
              },
              {
                icon: "🎯",
                title: "Discipline",
                desc: "Teaching responsibility, integrity, accountability, respect and wise decision-making.",
              },
              {
                icon: "👑",
                title: "Leadership",
                desc: "Raising future leaders who positively influence homes, schools, churches and communities.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="text-3xl">{item.icon}</div>
                <h4 className="mt-4 text-2xl font-extrabold text-slate-900">{item.title}</h4>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY (client component) */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Program Moments</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">Boys To Men In Action</h3>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
              Moments from mentorship camps, leadership sessions, empowerment activities and life-changing encounters.
            </p>
          </div>

          {/* Client gallery component */}
          
        </div>
      </section>

      {/* Remaining sections (testimonials, donors, CTAs) */}
      <section className="bg-slate-50 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-600">Voices Of Impact</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-extrabold text-slate-900">Lives being shaped</h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <blockquote className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-lg text-slate-700 leading-relaxed">
                “The Boys To Men program helped me understand leadership, discipline and the importance of making wise decisions.”
              </p>
              <footer className="mt-4 font-semibold">Program Participant</footer>
            </blockquote>

            <blockquote className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
              <p className="text-lg text-slate-700 leading-relaxed">
                “This initiative is helping young people build confidence, character and a strong sense of responsibility.”
              </p>
              <footer className="mt-4 font-semibold">Community Mentor</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-amber-500 px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-4xl">
          <h3 className="text-3xl md:text-4xl font-extrabold">Invest in the next generation</h3>
          <p className="mt-4 text-lg leading-relaxed">
            Together we can shape young boys into men of character, purpose, leadership and faith.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/donate" className="rounded-full bg-white px-8 py-3 font-bold text-amber-700 shadow">
              Donate Today
            </Link>
            <Link href="/contact" className="rounded-full border border-white px-8 py-3 font-bold text-white hover:bg-white/10">
              Become A Mentor
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
