import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { newsletters } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "Read and download the Impact Generation Global newsletter — monthly stories, ministry updates and prayer requests from Zambia.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  const issues = [...newsletters].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month.localeCompare(a.month);
  });

  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            Newsletter
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Our latest news
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            Read the full issue here on the website, or download a copy to keep
            and share.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell space-y-6">
          {issues.map((issue, index) => (
            <article
              key={issue.slug}
              className="card grid overflow-hidden lg:grid-cols-[300px_1fr]"
            >
              <div className="relative aspect-[16/10] bg-slate-100 lg:aspect-auto lg:min-h-[260px]">
                <Image
                  src={issue.cover}
                  alt={`${issue.title} cover`}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 300px"
                  className="object-cover"
                />
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-800 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Current Issue
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {issue.month} {issue.year}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-brand-950 sm:text-2xl">
                  {issue.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {issue.summary}
                </p>

                <ul className="mt-4 grid gap-1.5">
                  {issue.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm leading-6 text-slate-700"
                    >
                      <span aria-hidden="true" className="mt-0.5 text-brand-700">
                        •
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/newsletter/${issue.slug}`}
                    className="btn btn-primary text-sm"
                  >
                    Read online
                  </Link>

                  <a href={issue.printUrl} className="btn btn-outline text-sm">
                    Download PDF
                    <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-cream-100">
        <div className="shell grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
          <div>
            <h2 className="display text-2xl text-brand-950 sm:text-3xl">
              Never miss an update
            </h2>
            <p className="prose-body mt-4">
              Follow us on Facebook for daily stories from the field, or ask our
              team to add you to the mailing list.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link href="/blog" className="btn btn-primary">
              Daily updates
            </Link>
            <Link href="/contact" className="btn btn-outline">
              Join the mailing list
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
