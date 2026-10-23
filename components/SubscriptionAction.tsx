"use client";
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
export default function SubscriptionAction({ confirm = false }: { confirm?: boolean }) {
  const search = useSearchParams(); const [message,setMessage] = useState(''); const [busy,setBusy] = useState(false);
  return <form className="card mx-auto max-w-lg space-y-5 p-8" onSubmit={async e => { e.preventDefault(); setBusy(true); const frequency = new FormData(e.currentTarget).get('frequency'); try { const r = await fetch('/api/subscription',{ method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ action:confirm?'confirm':'preferences',token:search.get('token'),frequency }) }); const b=await r.json(); setMessage(b.error||b.message); } catch { setMessage('Service unavailable. Please try again.'); } finally { setBusy(false); } }}>
    <h1 className="text-2xl font-bold">{confirm?'Confirm your subscription':'Email preferences'}</h1>
    {confirm ? <p>Confirm that you would like to receive Impact Generation emails.</p> : <label className="block">Choose your emails<select name="frequency" className="mt-3 w-full rounded-lg border p-3"><option value="monthly">Monthly newsletter</option><option value="daily">Daily digest</option><option value="immediate">Immediate updates</option><option value="unsubscribe">Unsubscribe from all emails</option></select></label>}
    <button className="btn btn-primary" disabled={busy||!search.get('token')}>{busy?'Saving…':confirm?'Confirm subscription':'Save preference'}</button><p role="status">{message}</p>
  </form>;
}
