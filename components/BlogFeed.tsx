"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Post } from "@/lib/site";

const FILTERS = ["All", "News", "Story", "Event", "Devotional"] as const;

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogFeed({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
    [posts]
  );

  const visible =
    filter === "All" ? sorted : sorted.filter((post) => post.category === filter);

  const [featured, ...rest] = visible;

  return (
    <div>
      {/* FILTERS */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            aria-pressed={filter === option}
            className={`rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
              filter === option
                ? "border-brand-800 bg-brand-800 text-white"
                : "border-slate-200 bg-white text-slate-600 hover:border-brand-300 hover:text-brand-800"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-10 text-sm text-slate-600">
          No posts in this category yet — check back soon.
        </p>
      ) : (
        <>
          {/* FEATURED */}
          <Link
            href={`/blog/${featured.slug}`}
            className="card card-hover group mt-6 grid overflow-hidden md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] bg-slate-100 md:aspect-auto md:min-h-[300px]">
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.imageAlt ?? featured.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                />
              ) : null}
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                <span className="rounded-full bg-gold-100 px-2.5 py-1 text-brand-900">
                  {featured.category}
                </span>
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
              </div>

              <h2 className="mt-4 text-xl font-bold leading-snug text-brand-950 sm:text-2xl">
                {featured.title}
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {featured.excerpt}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-800">
                Read the story
                <span
                  aria-hidden="true"
                  className="transition group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>

          {/* GRID */}
          {rest.length > 0 && (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="card card-hover group flex flex-col overflow-hidden"
                >
                  <div className="relative aspect-[16/10] bg-slate-100">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.imageAlt ?? post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="rounded-full bg-cream-100 px-2 py-0.5 text-brand-800">
                        {post.category}
                      </span>
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>

                    <h3 className="mt-2.5 text-base font-bold leading-snug text-brand-950">
                      {post.title}
                    </h3>

                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                      {post.excerpt}
                    </p>

                    <span className="mt-4 text-sm font-bold text-brand-800">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
