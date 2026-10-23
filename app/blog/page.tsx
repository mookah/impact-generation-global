import type { Metadata } from "next";
import Link from "next/link";
import BlogFeed from "@/components/BlogFeed";
import FacebookFeed from "@/components/FacebookFeed";
import { posts, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Daily Updates & News",
  description:
    "Stories, news and daily updates from Impact Generation Global — plus our live Facebook feed from Zambia.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-14 md:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-300">
            Updates
          </p>

          <h1 className="display mt-3 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
            Stories from the field
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-brand-100/85 sm:text-lg sm:leading-8">
            What is happening in our programs, in our communities and in the
            lives of the young people we serve.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_360px] lg:gap-10">
          {/* MANUAL POSTS */}
          <div>
            <div className="flex items-baseline justify-between">
              <h2 className="text-lg font-bold text-brand-950 sm:text-xl">
                Latest posts
              </h2>
              <Link
                href="/newsletter"
                className="text-sm font-semibold text-brand-800 hover:underline"
              >
                Newsletter →
              </Link>
            </div>

            <div className="mt-5">
              <BlogFeed posts={posts} />
            </div>
          </div>

          {/* FACEBOOK */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h2 className="text-base font-bold text-brand-950">
              Daily from Facebook
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Everything we post on Facebook appears here automatically.
            </p>

            <div className="mt-4">
              <FacebookFeed
                pageUrl={site.facebook}
                pageName="Impact Generation Global"
              />
            </div>

            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline mt-4 w-full text-sm"
            >
              Follow us on Facebook
            </a>
          </aside>
        </div>
      </section>
    </main>
  );
}
