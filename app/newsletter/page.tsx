"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const newsletters = [
    {
      month: "April 2026",
      title: "Cycle For Change Festival",
      desc: "Youth cycling initiatives, community awareness, and preparations for city impact.",
      href: "#",
    },
    {
      month: "March 2026",
      title: "Pad A Girl Outreach",
      desc: "Dignity support, school sessions, mentorship, and girls empowerment activities.",
      href: "#",
    },
    {
      month: "February 2026",
      title: "Boys To Men Mentorship",
      desc: "Leadership development, character building, discipline, and mentorship highlights.",
      href: "#",
    },
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim()) {
      setStatus("Please fill in all fields.");
      return;
    }

    setStatus("✅ Subscription successful!");
    setName("");
    setEmail("");
  };

  return (
    <main className="bg-white text-slate-900">
      <section className="relative min-h-[70vh] overflow-hidden text-white">
        <Image
          src="/images/newsletter-hero.jpg"
          alt="Impact Generation Global Newsletter"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-20 flex min-h-[70vh] items-center px-6 pt-28">
          <div className="mx-auto w-full max-w-7xl">
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-emerald-300">
                Stay Connected
              </p>

              <h1 className="mt-5 text-5xl font-black leading-[0.95] md:text-7xl">
                Newsletter
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">
                Receive impact stories, program updates, outreach reports, and
                opportunities to partner with Impact Generation Global.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Join Our Community
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Get Monthly Updates
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              Stay informed about Boys To Men, Pad A Girl, Cycle For Change,
              Pastors Kids, School Ministry, outreach events, and community
              transformation stories.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-slate-50 p-8 shadow-xl"
          >
            <h3 className="text-2xl font-black">Subscribe Today</h3>

            <div className="mt-6 space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-600"
              />

              <button
                type="submit"
                className="rounded-full bg-emerald-600 px-8 py-4 font-bold text-white transition hover:bg-emerald-700"
              >
                Subscribe
              </button>

              {status && (
                <p className="font-semibold text-emerald-700">{status}</p>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-700">
              Newsletter Archive
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              Previous Monthly Newsletters
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Catch up on previous updates, stories, and reports from our
              ministry and community programs.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {newsletters.map((item) => (
              <article
                key={item.month}
                className="rounded-3xl bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">
                  {item.month}
                </p>

                <h3 className="mt-4 text-2xl font-black">{item.title}</h3>

                <p className="mt-4 leading-7 text-slate-600">{item.desc}</p>

                <Link
                  href={item.href}
                  className="mt-6 inline-flex font-bold text-emerald-700"
                >
                  Read Newsletter →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}