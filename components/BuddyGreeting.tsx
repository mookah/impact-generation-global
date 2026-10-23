"use client";
import Link from 'next/link';
import { useState } from 'react';
import ImpactBuddy from './ImpactBuddy';
import styles from './BuddyLayout.module.css';
export type BuddyPublic={welcome:string;enabled:boolean;frequency:'session'|'daily'|'manual';style?:'welcome'|'cycling';updates:{id:string;title:string;summary:string;publishedAt:string;url:string}[];sourceStatus?:string};
export default function BuddyGreeting({content,onClose,onAsk,preview=false}:{content:BuddyPublic;onClose:()=>void;onAsk:()=>void;preview?:boolean}){
  const [expanded,setExpanded]=useState(false);
  return <section aria-label={preview?'IMPACT Buddy greeting preview':'Welcome from IMPACT Buddy'} data-details-open={expanded} className={`${styles.greeting} mb-3 max-h-[65dvh] w-[min(360px,calc(100vw-32px))] overflow-y-auto rounded-3xl border border-brand-100 bg-white p-5 shadow-2xl`}>
    <div className={`${styles.greetingHeader} flex items-start justify-between`}><div className="flex items-center gap-2"><ImpactBuddy variant={content.style}/><div><p className="text-[10px] font-bold uppercase tracking-widest text-brand-700">Your ministry guide</p><h2 className="text-xl font-black text-brand-950">IMPACT Buddy</h2></div></div><button type="button" aria-label="Dismiss welcome greeting" onClick={onClose} className="rounded-full border px-2 py-1 text-lg leading-none text-slate-500">×</button></div>
    <p className={`${styles.welcome} mt-2 text-sm leading-6 text-slate-600`}>{content.welcome}</p>
    <div className={styles.details}>
    {!!content.updates.length&&<div className="mt-4 space-y-3 border-t pt-4"><p className="text-[10px] font-bold uppercase tracking-widest text-brand-700">From our official Facebook Page</p>{content.updates.map(u=><a href={u.url} target="_blank" rel="noopener noreferrer" key={u.id} className="block rounded-xl bg-brand-50 p-3 text-xs leading-5"><strong className="text-brand-900">{u.title} ↗</strong><span className="mt-1 block text-slate-600">{u.summary}</span><time className="mt-1 block text-[10px] text-slate-500" dateTime={u.publishedAt}>Published {new Date(u.publishedAt).toLocaleDateString('en-GB',{timeZone:'Africa/Lusaka'})} · publication date</time></a>)}</div>}
    <div className="mt-4 grid grid-cols-2 gap-2">{[['Latest Updates','/updates'],['Our Programs','/programs'],['Upcoming Events','/events'],['Photo Gallery','/gallery'],['Newsletter','/newsletter'],['Support Our Mission','/donate']].map(([label,href])=><Link href={href} key={href} onClick={onClose} className="rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-brand-800 hover:bg-brand-50">{label}</Link>)}</div></div><div className={styles.greetingFooter}><button type="button" className={styles.more} aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>{expanded?'Show less':'Explore'}</button><button type="button" onClick={onAsk} className="mt-3 w-full rounded-xl bg-brand-800 py-3 text-sm font-bold text-white">Ask IMPACT AI</button></div>
  </section>;
}
