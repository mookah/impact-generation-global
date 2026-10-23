import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const pages = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/programs", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/boys-to-men", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pad-a-girl", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/school-ministry", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/cycle-for-change", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/pastors-kids", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/youth-camps", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/updates", priority: 0.9, changeFrequency: "daily" as const },
  { path: "/gallery", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/gallery/events", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/newsletter", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/donate", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, changeFrequency, priority }) => ({
    url: SITE_URL + path,
    changeFrequency,
    priority,
  }));
}
