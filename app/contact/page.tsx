import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Impact Generation Global in Zambia or the United States — partner with a program, volunteer, invite our team to your school or church, or ask a question.",
  alternates: { canonical: "/contact" },
};

const offices = [
  {
    country: "Zambia",
    flag: "🇿🇲",
    name: "Fred Mbewe",
    role: "Zambia Director",
    email: "mbewefred1@gmail.com",
    phone: "+260 977 427127",
    tel: "+260977427127",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    name: "David Luby",
    role: "USA Director",
    email: "dluby60@gmail.com",
    phone: "+1 (716) 984-2636",
    tel: "+17169842636",
  },
];

const reasons = [
  {
    title: "Partner with a program",
    desc: "Churches, schools, businesses and organisations can partner with us on any program.",
  },
  {
    title: "Volunteer",
    desc: "Join our team of volunteers, mentors and supporters on the ground or remotely.",
  },
  {
    title: "Invite us",
    desc: "Ask us to visit your school, church or community for a session or outreach.",
  },
  {
    title: "Support the mission",
    desc: "Sponsor a program, a camp or a school term — or give once and let us allocate it.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            Contact
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            We&apos;d love to hear from you
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            Whether you want to partner, volunteer, sponsor a program or simply
            learn more — our team is ready to connect.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-5 md:grid-cols-2">
          {offices.map((office) => (
            <article key={office.country} className="card p-6 sm:p-8">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl" aria-hidden="true">
                  {office.flag}
                </span>
                <h2 className="text-lg font-bold text-brand-950">
                  {office.country} Office
                </h2>
              </div>

              <p className="mt-4 text-sm font-semibold text-brand-950">
                {office.name}
              </p>
              <p className="text-sm text-slate-500">{office.role}</p>

              <div className="mt-5 space-y-2 text-sm">
                <a
                  href={`mailto:${office.email}`}
                  className="block break-all font-semibold text-brand-800 hover:underline"
                >
                  {office.email}
                </a>
                <a
                  href={`tel:${office.tel}`}
                  className="block font-semibold text-brand-800 hover:underline"
                >
                  {office.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-cream-100">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Ways To Connect</p>
            <h2 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
              Let&apos;s build impact together
            </h2>
          </div>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason) => (
              <div key={reason.title} className="card p-5">
                <h3 className="text-base font-bold text-brand-950">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-950 text-white">
        <div className="shell grid gap-8 py-2 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="display text-2xl sm:text-3xl">
              Follow the work daily
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-brand-100/80">
              Our Facebook page carries the most current stories, photos and
              requests.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
            >
              Facebook
            </a>
            <Link href="/donate" className="btn btn-ghost">
              Donate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
