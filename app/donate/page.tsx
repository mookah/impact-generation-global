import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { programs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Impact Generation Global — help provide mentorship, camps, school ministry, dignity programs and leadership development for young people in Zambia.",
  alternates: { canonical: "/donate" },
};

const giftUses = [
  {
    title: "Youth camps",
    desc: "Teaching, worship, meals, materials and transport for camp participants.",
  },
  {
    title: "School ministry",
    desc: "Getting our team into schools with mentorship and life-skills sessions.",
  },
  {
    title: "Pad A Girl",
    desc: "Dignity kits that keep girls in school and confident each month.",
  },
  {
    title: "Boys To Men",
    desc: "Mentorship, leadership training and the annual Boys 2 Men Conference.",
  },
  {
    title: "Cycle For Change",
    desc: "Bicycles, safety equipment and community awareness rides.",
  },
  {
    title: "Leadership development",
    desc: "Training and support for the local leaders who run these programs.",
  },
];

export default function DonatePage() {
  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-brand-950 text-white">
        <Image
          src="/images/hero.webp"
          alt="Young people supported by Impact Generation Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />

        <div className="absolute inset-0 bg-linear-to-b from-brand-950/90 via-brand-950/85 to-brand-950/95" />

        <div className="shell relative grid gap-10 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center md:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
              Give With Confidence
            </p>

            <h1 className="display mt-3 max-w-2xl text-4xl sm:text-5xl md:text-6xl">
              Your gift changes a life.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
              Every donation goes straight into the programs that walk with
              young people in Zambia — mentorship, camps, school ministry,
              dignity and leadership development.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.paypal}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                Donate with PayPal
              </a>

              <a
                href={site.gofundme}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Support on GoFundMe
              </a>
            </div>

            <p className="mt-5 text-xs leading-5 text-brand-200/70">
              Secure payments handled by PayPal. No card details touch this
              website.
            </p>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:p-7">
            <h2 className="text-base font-bold text-white">
              Prefer another way to give?
            </h2>

            <ul className="mt-4 space-y-3 text-sm leading-6 text-brand-100/80">
              <li>
                <span className="font-semibold text-white">Bank transfer</span>
                <br />
                Contact our team for account details.
              </li>
              <li>
                <span className="font-semibold text-white">
                  Partner with a program
                </span>
                <br />
                Sponsor a camp, outreach or school term directly.
              </li>
              <li>
                <span className="font-semibold text-white">Give in kind</span>
                <br />
                Materials, equipment, transport or venue support.
              </li>
            </ul>

            <Link
              href="/contact"
              className="mt-5 inline-flex text-sm font-bold text-gold-300 hover:underline"
            >
              Talk to our team →
            </Link>
          </aside>
        </div>
      </section>

      {/* WHERE IT GOES */}
      <section className="section">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Where Your Gift Goes</p>
            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              Directly into the work
            </h2>
            <p className="prose-body mx-auto mt-4">
              We keep overheads lean and put donations to work in the programs
              that reach young people every week.
            </p>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {giftUses.map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="text-base font-bold text-brand-950">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="section bg-cream-100">
        <div className="shell">
          <h2 className="display text-2xl text-brand-950 sm:text-3xl">
            Support a specific program
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="card card-hover flex items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="text-sm font-bold text-brand-950">
                    {program.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {program.summary}
                  </p>
                </div>
                <span aria-hidden="true" className="text-brand-700">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="section">
        <div className="shell max-w-3xl text-center">
          <h2 className="display text-2xl text-brand-950 sm:text-3xl">
            Responsible stewardship
          </h2>

          <p className="prose-body mx-auto mt-4">
            Impact Generation Global is committed to transparency and careful
            stewardship. Donations support ministry activities, leadership
            development, youth empowerment and community transformation in
            Zambia. Reach out any time for an update on how funds are being
            used.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.paypal}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Donate with PayPal
            </a>
            <Link href="/newsletter" className="btn btn-outline">
              Read our updates
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
