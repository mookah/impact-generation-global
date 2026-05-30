import Image from "next/image";
import Link from "next/link";

const highlights = [
  "Mentorship",
  "Character Building",
  "Leadership",
  "Discipline",
];

const focusAreas = [
  {
    title: "Mentorship Sessions",
    desc: "Regular guidance from trusted mentors who help boys make wise choices.",
  },
  {
    title: "Leadership Training",
    desc: "Practical lessons that develop responsibility, confidence, and service.",
  },
  {
    title: "Faith & Purpose",
    desc: "Teaching boys to build their lives on values, faith, and positive identity.",
  },
];

export default function BoysToMenPage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[85vh] overflow-hidden text-white">
        <Image
          src="/images/boys-to-men-hero.jpg"
          alt="Boys To Men"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/40 to-transparent" />

        <div className="relative z-20 flex min-h-[85vh] items-center px-6 pt-32">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl rounded-[2rem] border border-white/10 bg-black/25 p-8 shadow-2xl backdrop-blur-sm md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-amber-300">
                Impact Generation Global
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] md:text-7xl">
                Boys To Men
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
                Raising responsible, confident, disciplined, and purpose-driven
                young men through mentorship, leadership training, character
                development, and faith-based guidance.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/donate"
                  className="rounded-full bg-amber-500 px-8 py-4 text-center font-bold text-white shadow-xl transition hover:bg-amber-600"
                >
                  Support The Program
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur transition hover:bg-white/20"
                >
                  Partner With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
            About The Program
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-black md:text-6xl">
            Guiding boys into responsible manhood
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-slate-600">
            Boys To Men creates safe spaces where boys are mentored, encouraged,
            corrected, and equipped with values that shape their future. The
            program helps young men grow in confidence, discipline, emotional
            strength, faith, leadership, and positive decision-making.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item) => (
              <div
                key={item}
                className="group rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-3 hover:shadow-[0_30px_80px_rgba(15,23,42,0.16)]"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
                  ⭐
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  {item}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  Helping boys grow with wisdom, purpose, discipline,
                  leadership, and direction.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
            What We Build
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Mentorship with purpose
          </h2>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {focusAreas.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(15,23,42,0.14)]"
              >
                <h3 className="text-2xl font-black text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AUTO INFINITE SCROLL GALLERY */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
            Program Gallery
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            Moments From Boys To Men
          </h2>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            A glimpse of mentorship, learning, fellowship, and transformation.
          </p>
        </div>

        <div className="mt-12 overflow-hidden">
          <div className="gallery-track flex">
            {[...Array(2)].flatMap((_, set) =>
              [1, 2, 3, 4, 5, 6].map((num) => (
                <div
                  key={`${set}-${num}`}
                  className="relative mx-4 h-[420px] w-[340px] flex-shrink-0 overflow-hidden rounded-[2rem] shadow-2xl"
                >
                  <Image
                    src={`/images/boys-to-men-${num}.jpg`}
                    alt={`Boys To Men ${num}`}
                    fill
                    sizes="340px"
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6">
                    <p className="text-xs uppercase tracking-widest text-white/70">
                      Boys To Men
                    </p>

                    <h3 className="text-xl font-black text-white">
                      Impact Generation Global
                    </h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-500 px-6 py-20 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <h2 className="text-4xl font-black md:text-5xl">
              Help us raise responsible young men
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-amber-50">
              Your support helps provide mentorship sessions, materials,
              transport, meals, and safe learning spaces for boys.
            </p>
          </div>

          <Link
            href="/donate"
            className="rounded-full bg-white px-8 py-4 font-bold text-amber-700 shadow-xl transition hover:-translate-y-1"
          >
            Donate Today
          </Link>
        </div>
      </section>
    </main>
  );
}