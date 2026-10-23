import Link from 'next/link';
import { publicArticles } from '@/lib/server/public-content';
export default async function PublishedStories() {
  const articles = await publicArticles(); if(!articles.length)return null;
  return <section className="section"><div className="shell"><h2 className="display text-3xl text-brand-950">Latest ministry stories</h2><div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{articles.map(a=><Link key={a.id} href={`/news/${a.slug}`} className="card card-hover p-6"><p className="text-xs font-semibold text-brand-700">{a.category} · {new Date(a.published_at!).toLocaleDateString('en-GB',{timeZone:'Africa/Lusaka'})}</p><h3 className="mt-3 text-xl font-bold">{a.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{a.summary}</p><span className="mt-4 block text-sm font-bold text-brand-800">Read full story →</span></Link>)}</div></div></section>;
}
