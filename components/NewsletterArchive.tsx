import Link from 'next/link';
import { publicIssues } from '@/lib/server/public-content';
export default async function NewsletterArchive() {
  const issues=await publicIssues();
  return <section className="shell space-y-4 py-8">{issues.map(n=><Link key={n.id} href={`/newsletter/${n.slug}`} className="card block p-6"><p className="text-xs font-semibold uppercase text-brand-700">Monthly edition</p><h2 className="mt-2 text-2xl font-bold">{n.title}</h2><p className="mt-3 text-sm">{n.articles.length} verified ministry reports · Read issue →</p></Link>)}{!issues.some(n=>n.slug==='september-2026')&&<div className="card p-6"><h2 className="text-xl font-bold">September 2026</h2><p className="mt-3 text-sm text-slate-600">This edition is being prepared from verified ministry updates and will be available after editorial approval.</p></div>}</section>;
}
