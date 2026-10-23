import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: post.image ? [{ url: post.image }] : undefined,
    },
  };
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);

  if (!post) notFound();

  const more = posts
    .filter((item) => item.slug !== post.slug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    image: post.image ? `${site.url}${post.image}` : undefined,
  };

  return (
    <main className="bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article>
        <header className="bg-brand-950 text-white">
          <div className="shell py-12 md:py-16">
            <nav
              aria-label="Breadcrumb"
              className="text-xs font-semibold text-brand-200/80"
            >
              <Link href="/blog" className="hover:text-gold-300">
                Updates
              </Link>
              <span className="mx-2" aria-hidden="true">
                /
              </span>
              <span className="text-white">{post.category}</span>
            </nav>

            <h1 className="display mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-4 text-sm font-semibold text-gold-300">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-2 text-brand-300" aria-hidden="true">
                ·
              </span>
              {post.category}
            </p>
          </div>
        </header>

        {post.image && (
          <div className="shell -mt-6 md:-mt-10">
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={post.image}
                alt={post.imageAlt ?? post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        <div className="shell py-10 md:py-14">
          <div className="mx-auto max-w-3xl">
            <p className="text-lg font-medium leading-8 text-brand-950">
              {post.excerpt}
            </p>

            <div className="mt-6 space-y-5">
              {post.body.map((paragraph) => (
                <p key={paragraph} className="prose-body">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-slate-100 pt-8 sm:flex-row">
              <Link href="/subscribe" className="btn btn-outline">Subscribe to updates</Link>
              <Link href="/donate" className="btn btn-primary">
                Support this work
              </Link>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                See more on Facebook
              </a>
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section className="section bg-cream-100">
          <div className="shell">
            <h2 className="display text-2xl text-brand-950 sm:text-3xl">
              More updates
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {more.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="card card-hover p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-700">
                    {formatDate(item.date)}
                  </p>
                  <h3 className="mt-2 text-base font-bold leading-snug text-brand-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
