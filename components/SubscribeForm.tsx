"use client";
import Link from 'next/link';
import { useId, useState } from 'react';
export default function SubscribeForm() {
  const id = useId(); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  return <form className="mx-auto max-w-xl space-y-4 rounded-2xl border border-slate-200 bg-white p-6 text-slate-900" onSubmit={async e => {
    e.preventDefault(); setBusy(true); setMessage(''); const form = e.currentTarget; const data = new FormData(form);
    try { const r = await fetch('/api/subscription', { method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify({ email: data.get('email'), frequency: data.get('frequency'), consent: data.get('consent') === 'on', website: data.get('website') }) }); const b = await r.json(); setMessage(b.error || b.message); if (r.ok) form.reset(); } catch { setMessage('Subscription service unavailable. Please try again later.'); } finally { setBusy(false); }
  }}>
    <h2 className="text-2xl font-bold text-brand-950">Stay connected</h2><p className="text-sm text-slate-600">Ministry stories and news, at the pace you choose.</p>
    <label className="block text-sm font-semibold" htmlFor={`${id}-email`}>Email address</label><input className="w-full rounded-lg border border-slate-300 p-3" id={`${id}-email`} name="email" type="email" maxLength={254} required autoComplete="email" />
    <label className="block text-sm font-semibold" htmlFor={`${id}-frequency`}>Email frequency</label><select id={`${id}-frequency`} name="frequency" className="w-full rounded-lg border border-slate-300 p-3" defaultValue="monthly"><option value="monthly">Monthly newsletter</option><option value="daily">Daily digest</option><option value="immediate">As stories are published</option></select>
    <div aria-hidden="true" className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label className="flex items-start gap-2 text-sm"><input type="checkbox" name="consent" required className="mt-1"/><span>I agree to receive these emails. I can unsubscribe at any time. <Link href="/privacy" className="underline">Privacy notice</Link>.</span></label>
    <button className="btn btn-primary w-full" disabled={busy}>{busy ? 'Submitting…' : 'Subscribe'}</button><p role="status" className="text-sm leading-6">{message}</p>
  </form>;
}
