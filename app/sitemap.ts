import type { MetadataRoute } from "next";
import { newsletters, posts, programs, site } from "@/lib/site";
import { publicArticles, publicIssues } from "@/lib/server/public-content";
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/programs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${site.url}/newsletter`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/donate`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const programRoutes: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${site.url}/programs/${program.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const newsletterRoutes: MetadataRoute.Sitemap = newsletters.map((issue) => ({
    url: `${site.url}/newsletter/${issue.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  const [articles, issues] = await Promise.all([publicArticles(), publicIssues()]);
  return [...staticRoutes, ...programRoutes, ...postRoutes, ...newsletterRoutes,
    ...articles.map(a => ({ url: `${site.url}/news/${a.slug}`, lastModified: new Date(a.published_at!) })),
    ...issues.map(n => ({ url: `${site.url}/newsletter/${n.slug}`, lastModified: new Date(n.created_at) })),
    { url: `${site.url}/subscribe` }, { url: `${site.url}/updates` }, { url: `${site.url}/gallery/events` },
  ];
}
