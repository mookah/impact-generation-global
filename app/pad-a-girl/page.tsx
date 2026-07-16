"use client";

import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const PAYPAL_DONATE_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA";

const GOFUNDME_LINK = "https://gofund.me/41ae9b3bf";

const stats = [
  { value: "1,000+", label: "Girls encouraged" },
  { value: "25+", label: "School outreaches" },
  { value: "40+", label: "Volunteers & supporters" },
  { value: "Dignity", label: "At the center" },
];

const workAreas = [
  {
    icon: "❤️",
    title: "Menstrual Hygiene Support",
    desc: "Providing dignity kits and practical support so girls can stay confident and focused.",
  },
  {
    icon: "🎓",
    title: "School Outreach",
    desc: "Reaching students through school visits, teaching sessions, and encouragement.",
  },
  {
    icon: "🤝",
    title: "Mentorship",
    desc: "Creating safe spaces where girls can ask questions, grow, and discover purpose.",
  },
  {
    icon: "🌍",
    title: "Community Engagement",
    desc: "Working with families, schools, and communities to strengthen dignity and care.",
  },
  {
    icon: "📖",
    title: "Life Skills",
    desc: "Helping girls develop confidence, resilience, healthy choices, and leadership.",
  },
  {
    icon: "✝️",
    title: "Faith & Encouragement",
    desc: "Sharing hope, identity, and spiritual encouragement rooted in the love of Christ.",
  },
];

const galleryImages = [
  "/images/pad-a-girl/pad-a-girl-2.jpg",
  "/images/pad-a-girl/pad-a-girl-3.jpg",
  "/images/pad-a-girl/pad-a-girl-4.jpg",
  "/images/pad-a-girl/pad-a-girl-5.jpg",
  "/images/pad-a-girl/pad-a-girl-7.jpg",
  "/images/pad-a-girl/pad-a-girl-8.jpg",
  "/images/pad-a-girl/pad-a-girl-9.jpg",
  "/images/pad-a-girl/pad-a-girl-10.jpg",
  "/images/pad-a-girl/pad-a-girl-11.jpg",
  "/images/pad-a-girl/pad-a-girl-12.jpg",
  "/images/pad-a-girl/pad-a-girl-13.jpg",
  "/images/pad-a-girl/pad-a-girl-14.jpg",
  "/images/pad-a-girl/pad-a-girl-16.jpg",
  "/images/pad-a-girl/pad-a-girl-17.jpg",
];

export default function PadAGirlPage() {
  return (
    <main className="overflow-hidden bg-[#f8faf7] text-slate-950 antialiased">
      <section className="relative isolate min-h-screen overflow-hidden pt-32 text-white md:pt-36">
        <Image
          src="/images/pad-a-girl/pad-a-girl-hero.jpg"
          alt="Pad A Girl outreach"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/95 via-slate-950/70 to-emerald-950/45" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.28),transparent_35%)]" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center px-6 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">
                Pad A Girl
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Restoring dignity. Keeping girls in school. Building confidence.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg md:text-xl">
              Pad A Girl supports girls with menstrual hygiene products,
              mentorship, life-skills education, and faith-filled encouragement
              so they can walk with dignity, confidence, and hope.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 px-8 py-4 text-center font-black text-white shadow-xl transition hover:-translate-y-1 hover:bg-red-700"
              >
                Support Pad A Girl
              </a>

              <Link
                href="/contact"
                className="rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FadeIn>
        <section className="-mt-14 px-6 pb-12">
          <div className="relative z-20 mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-amber-100 bg-white p-5 shadow-2xl sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-3xl bg-amber-50/70 p-6 text-center"
              >
                <p className="text-3xl font-black text-emerald-700">
                  {item.value}
                </p>
                <p className="mt-2 text-sm font-bold text-slate-600">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="px-6 py-16 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                Our Mission
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Every girl deserves dignity, confidence, education, and hope.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                Through Pad A Girl, Impact Generation Global provides menstrual
                hygiene support, mentorship, life-skills training, and spiritual
                encouragement to help girls stay in school and thrive.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                We believe dignity is not a luxury. It is part of helping young
                women understand their value, build confidence, and step into
                their God-given purpose.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-200 to-emerald-200 blur-2xl" />
              <div className="relative h-[340px] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[480px]">
                <Image
                  src="/images/pad-a-girl/pad-a-girl-community-engagement.jpg"
                  alt="Pad A Girl community engagement"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                What We Do
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Practical care with lasting impact.
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
                Pad A Girl combines practical dignity support with mentorship,
                education, and encouragement.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {workAreas.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[2rem] border border-slate-100 bg-[#f8faf7] p-7 shadow-sm transition hover:-translate-y-2 hover:bg-white hover:shadow-2xl"
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-5 text-2xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 shadow-2xl lg:grid-cols-2">
            <div className="relative min-h-[360px]">
              <Image
                src="/images/pad-a-girl/pad-a-girl-school-session-1.jpg"
                alt="Pad A Girl school session"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-8 text-white sm:p-12 lg:p-14">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
                Featured Story
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
                More than pads. It is dignity, identity, and hope.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                Many girls miss school or lose confidence because they lack the
                basic support they need. Pad A Girl helps restore confidence by
                meeting practical needs and creating space for honest
                conversations, mentorship, and encouragement.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
                Every outreach is an opportunity to remind girls that they are
                seen, valued, loved, and capable of building a meaningful future.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
                Gallery
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                Moments of dignity and hope.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                A glimpse of outreach, school sessions, mentorship, and
                community engagement through Pad A Girl.
              </p>
            </div>

            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
              {galleryImages.map((src, index) => (
                <div
                  key={src}
                  className="mb-5 break-inside-avoid overflow-hidden rounded-[1.5rem] bg-slate-100 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  <div
                    className={`relative ${
                      index % 5 === 0
                        ? "h-[360px]"
                        : index % 3 === 0
                        ? "h-[300px]"
                        : "h-[240px]"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Pad A Girl gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeIn>


      {/* PAD A GIRL VIDEO */}
      <FadeIn>
        <section className="bg-slate-950 px-6 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
                Watch The Story
              </p>

              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                See Pad A Girl in action.
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                Watch how Pad A Girl is helping restore dignity, encourage
                confidence, support school attendance, and remind girls that
                their future matters.
              </p>

              <div className="mt-8">
                <a
                  href="https://youtu.be/vmWsK6x1yl4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full bg-red-600 px-8 py-4 font-black text-white transition hover:-translate-y-1 hover:bg-red-700"
                >
                  Watch on YouTube
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur sm:p-8">
              <div className="overflow-hidden rounded-3xl shadow-2xl">
                <div className="aspect-video">
                  <iframe
                    className="h-full w-full"
                    src="https://www.youtube.com/embed/vmWsK6x1yl4"
                    title="Pad A Girl Ministry Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              <h3 className="mt-7 text-2xl font-black">
                Pad A Girl Ministry Video
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                A visual story of dignity, mentorship, outreach, and hope
                through Impact Generation Global.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="bg-amber-50 px-6 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-emerald-700">
              Why It Matters
            </p>

            <blockquote className="mt-5 text-2xl font-black leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
              “Dignity support helps a girl stay in school, grow in confidence,
              and remember that her future matters.”
            </blockquote>

            <p className="mt-6 text-lg font-bold text-emerald-700">
              Impact Generation Global
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-950 p-8 text-center text-white shadow-2xl sm:p-12">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-amber-300">
              Support Pad A Girl
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Help restore dignity and keep girls moving forward.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">
              Your support helps provide hygiene products, school outreach,
              mentorship, life-skills education, and encouragement for girls in
              Zambia.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-8 py-4 font-black text-emerald-800 transition hover:-translate-y-1"
              >
                Donate with PayPal
              </a>

              <a
                href={GOFUNDME_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/25 bg-white/10 px-8 py-4 font-black text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/20"
              >
                Support on GoFundMe
              </a>
            </div>
          </div>
        </section>
      </FadeIn>
    </main>
  );
}
