import Image from "next/image";
import Link from "next/link";

export default function DonatePage() {
  const givingOptions = [
    {
      title: "Support Youth Mentorship",
      amount: "K250",
      desc: "Helps provide mentorship materials, refreshments, and support for one youth session.",
    },
    {
      title: "Sponsor A Program Session",
      amount: "K750",
      desc: "Supports a Boys To Men, Pastors Kids, Pad A Girl, or school outreach session.",
    },
    {
      title: "Become A Monthly Partner",
      amount: "K1,500+",
      desc: "Helps sustain ongoing mentorship, outreach, education, and community programs.",
    },
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
      <section className="relative min-h-[75vh] overflow-hidden text-white">
        <Image
          src="/images/donate-hero.jpg"
          alt="Support Impact Generation Global"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/60 to-emerald-900/40" />

        <div className="relative z-20 flex min-h-[75vh] items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-200">
                  Impact Generation Global
                </span>
              </div>

              <h1 className="mt-6 text-5xl font-black leading-[0.95] tracking-tight md:text-7xl">
                Give With Purpose
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200 md:text-xl">
                Your donation helps us mentor young people, support vulnerable
                communities, empower girls, strengthen families, and create
                lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DONATION INFO */}
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Your Support Matters
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Every Gift Helps Build The Next Generation
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-700">
              When you give to Impact Generation Global, you help create safe
              spaces for mentorship, discipleship, education, counselling,
              dignity support, youth empowerment, and community transformation.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">One-Time Giving</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Make a single donation toward current programs and outreach.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <h3 className="font-bold">Monthly Partnership</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Support consistent impact through monthly giving.
                </p>
              </div>
            </div>
          </div>

          {/* DONATION CARD */}
          <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6 shadow-xl md:p-8">
            <h3 className="text-2xl font-bold">Donation Details</h3>

            <p className="mt-2 text-sm text-slate-600">
              Use the details below to support Impact Generation Global.
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Mobile Money
                </p>
                <p className="mt-3 text-slate-700">
                  <strong>Name:</strong> Impact Generation Global
                </p>
                <p className="mt-2 text-slate-700">
                  <strong>Number:</strong> +260 000 000 000
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  Bank Transfer
                </p>
                <p className="mt-3 text-slate-700">
                  <strong>Bank:</strong> Add Bank Name
                </p>
                <p className="mt-2 text-slate-700">
                  <strong>Account Name:</strong> Impact Generation Global
                </p>
                <p className="mt-2 text-slate-700">
                  <strong>Account Number:</strong> 0000000000
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-600">
                  After Giving
                </p>
                <p className="mt-3 text-slate-700">
                  Send proof of payment to:
                </p>
                <p className="mt-2 break-all font-semibold text-slate-900">
                  innocentwino@impactgenerationglobal.org
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-full justify-center rounded-full bg-emerald-700 px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-emerald-800"
            >
              Contact Us After Giving
            </Link>
          </div>
        </div>
      </section>

      {/* GIVING OPTIONS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Giving Options
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Choose How You Want To Support
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {givingOptions.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
              >
                <p className="text-4xl font-black text-emerald-700">
                  {item.amount}
                </p>

                <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS SUPPORTED */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-600">
              Where Your Gift Goes
            </p>

            <h2 className="mt-3 text-4xl font-bold md:text-5xl">
              Programs You Help Support
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              Your giving helps us reach young people and communities through
              programs that provide care, mentorship, dignity, discipleship, and
              practical support.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* FINAL CTA */}
      <section className="bg-emerald-700 px-6 py-20 text-center text-white">
        <h2 className="text-4xl font-bold md:text-5xl">
          Thank You For Supporting The Mission
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-emerald-50">
          Together, we can raise a generation transformed by faith, purpose,
          dignity, education, and practical support.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-8 py-4 font-bold text-emerald-800 transition hover:-translate-y-1"
          >
            Contact The Team
          </Link>

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