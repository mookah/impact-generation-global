import { Suspense } from 'react';
import SubscriptionAction from '@/components/SubscriptionAction';
export const metadata = { title: 'Email preferences', robots: { index: false, follow: false }, referrer: 'no-referrer' as const };
export default function Page() { return <section className="section"><Suspense fallback={<p>Loading…</p>}><SubscriptionAction/></Suspense></section>; }
