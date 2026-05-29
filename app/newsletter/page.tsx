"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";

export default function NewsletterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("");

    if (!name.trim() || !email.trim()) {
      setStatus("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      if (res.ok) {
        setStatus("✅ Subscription successful!");
        setName("");
        setEmail("");
      } else {
        setStatus("❌ Something went wrong. Try again.");
      }
    } catch {
      setStatus("❌ Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[70vh] overflow-hidden text-white">
        <Image
          src="/images/newsletter-hero.jpg"
          alt="Impact Generation Global Newsletter"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
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
                Newsletter
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                Stay connected with stories of impact, program updates,
                community transformation reports, and opportunities to support
                the next generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER FORM */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Stay Updated
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Join Our Impact Community
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
              Receive updates from Boys To Men, Pastors Kids, Cycle For Change,
              Pad A Girl, youth camps, school ministry, outreach events and
              partner opportunities.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">Impact Stories</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Read real stories from our community programs.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">Program Updates</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Be the first to know about new initiatives.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-xl md:p-8"
          >
            <h3 className="text-2xl font-bold">Subscribe Today</h3>

            <p className="mt-2 text-sm text-slate-600">
              Enter your details below to join the newsletter.
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="Your name"
              />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-emerald-700 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>

            {status && (
              <p
                className={`mt-4 text-sm font-semibold ${
                  status.includes("✅") ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* WHAT TO EXPECT */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              What You Receive
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Updates That Matter
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "📩",
                title: "Monthly Updates",
                desc: "Receive meaningful updates from our programs and outreach activities.",
              },
              {
                icon: "🌍",
                title: "Impact Reports",
                desc: "See how your support is helping young people and communities.",
              },
              {
                icon: "🤝",
                title: "Partner Opportunities",
                desc: "Learn when and how you can volunteer, support, or partner with us.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-4xl">{item.icon}</div>
                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-700 px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-bold md:text-5xl">
          Stay Connected To The Mission
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
          Follow the stories, see the impact, and be part of transforming the
          next generation.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/donate"
            className="rounded-full bg-white px-8 py-4 font-bold text-emerald-800 transition hover:-translate-y-1"
          >
            Donate Today
          </Link>

          <Link
            href="/contact"
            className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
          >
            Partner With Us
          </Link>
        </div>
      </section>
    </main>
  );
}