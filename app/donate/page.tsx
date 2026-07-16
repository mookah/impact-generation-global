import Image from "next/image";
import Link from "next/link";

const PAYPAL_DONATE_LINK =
  "https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA";

const GOFUNDME_LINK = "https://gofund.me/41ae9b3bf";

const campaignGoal = 8000;
const amountRaised = 0;
const progress = Math.min(
  100,
  Math.round((amountRaised / campaignGoal) * 100)
);

export default function DonatePage() {
  const missionPoints = [
    {
      title: "Strengthen Leadership",
      desc: "Meet with ministry leaders and encourage local teams.",
    },
    {
      title: "Invest In Youth",
      desc: "Spend time with young people and support life-changing programs.",
    },
    {
      title: "Build Partnerships",
      desc: "Connect with churches, schools, and community partners.",
    },
    {
      title: "Plan For The Future",
      desc: "Develop new initiatives that create lasting impact.",
    },
  ];

  const giftUses = [
    {
      title: "International Airfare",
      desc: "Helping David Luby and Joe travel to Zambia in August.",
    },
    {
      title: "Local Transportation",
      desc: "Travel between ministry sites, schools, churches, and communities.",
    },
    {
      title: "Accommodation",
      desc: "Providing safe lodging during ministry and leadership activities.",
    },
    {
      title: "Youth Programs",
      desc: "Supporting mentorship events, youth gatherings, and outreach activities.",
    },
    {
      title: "Ministry Resources",
      desc: "Training materials, discipleship tools, and program support.",
    },
    {
      title: "Community Outreach",
      desc: "Helping meet practical needs while bringing hope and encouragement.",
    },
  ];

  const impactAreas = [
    "Youth mentorship",
    "Leadership development",
    "School ministry",
    "Pad A Girl outreach",
    "Pastors Kids support",
    "Community programs",
  ];

  const programs = [
    "Boys To Men",
    "Pastors Kids",
    "Cycle For Change",
    "Pad A Girl",
    "Youth Camps",
    "School Ministry",
  ];

  return (
    <main className="bg-white text-slate-900">
      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden pt-32 text-white md:pt-36">
        <Image
          src="/images/donate-hero.jpg"
          alt="Support Impact Generation Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/70 to-emerald-950/55" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.28),transparent_35%)]" />

        <div className="relative z-20 mx-auto flex min-h-[calc(100vh-128px)] max-w-7xl items-center px-6 pb-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-200">
                August Zambia Leadership Mission
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Building Hope. Empowering Youth. Transforming Communities.
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl">
              This August, David Luby, Executive Director of Impact Generation
              Global, and Joe, one of our newest Board Members, will travel to
              Zambia to strengthen ministry leaders, encourage young people,
              build partnerships, and support life-changing programs on the
              ground.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 px-8 py-4 text-center font-bold text-white shadow-lg shadow-red-950/30 transition hover:-translate-y-1 hover:bg-red-700"
              >
                Donate With PayPal
              </a>

              <a
                href={GOFUNDME_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-600 px-8 py-4 text-center font-bold text-white shadow-lg shadow-emerald-950/30 transition hover:-translate-y-1 hover:bg-emerald-700"
              >
                Support On GoFundMe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK MISSION POINTS */}
      <section className="-mt-12 px-6 pb-10">
        <div className="relative z-30 mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-emerald-100 bg-white p-5 shadow-2xl md:grid-cols-4 md:p-8">
          {missionPoints.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-slate-100 bg-emerald-50/40 p-5"
            >
              <h3 className="font-bold text-slate-950">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CAMPAIGN */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              Current Campaign
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Help Send David Luby & Joe To Zambia
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              This leadership mission will help strengthen relationships with
              our Zambian team leaders, encourage local youth, support our
              existing programs, and prepare the way for greater impact across
              Zambia.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-slate-700">
              The sooner support comes in, the better we can prepare for travel,
              ministry logistics, youth meetings, leadership gatherings, and
              program needs on the ground.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-xl md:p-8">
            <h3 className="text-2xl font-black">August Zambia Mission</h3>
            <p className="mt-2 text-slate-600">
              Help cover travel and ministry costs for this important visit.
            </p>

            <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Raised
                  </p>
                  <p className="mt-1 text-2xl font-black text-emerald-700">
                    ${amountRaised.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Goal
                  </p>
                  <p className="mt-1 text-2xl font-black">
                    ${campaignGoal.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Progress
                  </p>
                  <p className="mt-1 text-2xl font-black">{progress}%</p>
                </div>
              </div>

              <div className="mt-6 h-4 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-600 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <a
                href={PAYPAL_DONATE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-red-600 px-8 py-4 text-center font-bold text-white transition hover:-translate-y-1 hover:bg-red-700"
              >
                Donate Securely With PayPal
              </a>

              <a
                href={GOFUNDME_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-emerald-700 px-8 py-4 text-center font-bold text-white transition hover:-translate-y-1 hover:bg-emerald-800"
              >
                Give Through GoFundMe
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE TEAM */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              Meet The Team
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Traveling To Serve, Listen, And Strengthen
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-lg">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-black text-emerald-700">
                DL
              </div>
              <h3 className="mt-6 text-3xl font-black">David Luby</h3>
              <p className="mt-2 font-bold text-emerald-700">
                Executive Director
              </p>
              <p className="mt-5 leading-relaxed text-slate-600">
                Providing strategic leadership, strengthening international
                partnerships, and working alongside local ministry leaders to
                advance the vision of Impact Generation Global in Zambia.
              </p>
            </div>

            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-lg">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-3xl font-black text-emerald-700">
                J
              </div>
              <h3 className="mt-6 text-3xl font-black">Joe</h3>
              <p className="mt-2 font-bold text-emerald-700">Board Member</p>
              <p className="mt-5 leading-relaxed text-slate-600">
                Supporting youth engagement, leadership development, and
                sustainable partnerships that will help strengthen ministry
                programs for years to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHERE GIFTS GO */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              Where Your Gift Goes
            </p>

            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Your Support Helps Cover
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Every donation helps prepare the team for meaningful ministry,
              leadership connection, and program support in Zambia.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {giftUses.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <h3 className="text-2xl font-black">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">
              Why This Mission Matters
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Together We Are Making A Difference
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              Your generosity helps us invest in youth, strengthen families,
              empower girls, develop future leaders, partner with churches, and
              bring hope to communities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {impactAreas.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 font-bold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
            Programs You Help Support
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
            Impact Generation Global Programs
          </h2>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <div
                key={program}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center font-bold shadow-sm"
              >
                {program}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="bg-emerald-50 px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-tight md:text-5xl">
            Your Gift Makes A Difference
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-700">
            Impact Generation Global is committed to responsible stewardship and
            transparency. Every donation supports ministry activities,
            leadership development, youth empowerment, and community
            transformation throughout Zambia.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-emerald-700 px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
          Together We Can Change Lives
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
          Join us in empowering young people, strengthening communities, and
          sharing the love of Christ across Zambia.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href={PAYPAL_DONATE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-8 py-4 font-bold text-emerald-800 transition hover:-translate-y-1"
          >
            Donate Today
          </a>

          <a
            href={GOFUNDME_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
          >
            Support On GoFundMe
          </a>

          <Link
            href="/newsletter"
            className="rounded-full border border-white/30 px-8 py-4 font-bold text-white transition hover:bg-white/10"
          >
            Join Newsletter
          </Link>
        </div>
      </section>
    </main>
  );
}
