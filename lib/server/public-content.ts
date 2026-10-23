import 'server-only';
import { cache } from 'react';
import type { Article, Issue, Media } from '@/lib/content-types';
import { configured, db } from './core';
export const publicArticles = cache(async () => configured() ? db<Article[]>('igg_articles?status=eq.published&order=published_at.desc&limit=100') : []);
export const publicIssues = cache(async () => configured() ? db<Issue[]>('igg_issues?status=eq.published&order=month.desc&limit=100') : []);
export const approvedMedia = cache(async () => configured() ? db<Media[]>('igg_media?approved=eq.true&consent=eq.true&order=created_at.desc&limit=200') : []);
export const getIssue = cache(async (slug: string) => {
  if (!configured() || !/^[a-z0-9-]{1,80}$/.test(slug)) return null;
  const [issue] = await db<Issue[]>(`igg_issues?slug=eq.${slug}`); return issue || null;
});
