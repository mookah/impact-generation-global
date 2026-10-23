/* eslint-disable @next/next/no-img-element -- Approved revocable event media is served directly. */
"use client";
import Link from 'next/link';
import { useState } from 'react';
import { eventLabel,eventStatus,safeEventLink,type CalendarEvent } from '@/lib/events';
export default function EventDetails({event,preview=false}:{event:CalendarEvent;preview?:boolean}){
  const [shareMessage,setShareMessage]=useState('');
  const [failedImages,setFailedImages]=useState<string[]>([]);
  const status=eventStatus(event);const registration=safeEventLink(event.registrationUrl);
  async function share(){const url=new URL(`/events/${event.id}`,window.location.origin).href;try{if(navigator.share)await navigator.share({title:event.title,url});else{await navigator.clipboard.writeText(url);setShareMessage('Event link copied.');}}catch{setShareMessage('Use the event page link to share this event.');}}
  return <article className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
    <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-brand-50 px-3 py-1 text-brand-800">{event.category}</span><span className={`rounded-full px-3 py-1 ${status==='Cancelled'?'bg-red-50 text-red-800':status==='Postponed'?'bg-amber-50 text-amber-900':'bg-gold-100 text-brand-900'}`}>{status}</span>{event.legacy&&<span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">Legacy listing · confirm details</span>}</div>
    <h3 className="display break-words text-2xl font-bold text-brand-950 sm:text-3xl">{event.title}</h3>
    <div className="space-y-2 text-sm text-slate-600"><p className="font-bold text-brand-800">{eventLabel(event)}</p><p>{event.time||'Time to be confirmed'} · Africa/Lusaka (UTC+2)</p><p>{event.location}</p>{status==='Postponed'&&<p className="font-semibold text-amber-900">The dates above are the previous schedule. Contact us for a confirmed new date.</p>}</div>
    <p className="whitespace-pre-line break-words text-sm leading-7 text-slate-600">{event.description}</p>
    {!!event.mediaIds?.length&&<div className="grid gap-4 sm:grid-cols-2">{event.mediaIds.filter(id=>!failedImages.includes(id)).map(id=><a key={id} href={`/api/media/${id}`} target="_blank" rel="noreferrer"><img src={`/api/media/${id}`} alt={`Approved poster or photograph for ${event.title}`} onError={()=>setFailedImages(v=>[...v,id])} loading="lazy" className="max-h-96 w-full rounded-xl bg-slate-50 object-contain"/></a>)}</div>}
    <div className="flex flex-wrap gap-3">{!preview&&<><a className="btn btn-outline text-sm" href={`/api/events/${event.id}/calendar`}>Add to calendar (.ics)</a><button type="button" className="btn btn-outline text-sm" onClick={()=>void share()}>Share event</button></>}{registration&&status!=='Cancelled'&&status!=='Postponed'?<a className="btn btn-primary text-sm" href={registration} rel="noopener noreferrer" target={registration.startsWith('https:')?'_blank':undefined}>Registration / details</a>:<Link className="btn btn-primary text-sm" href="/contact">Contact our team</Link>}{event.link&&<Link className="text-sm font-bold text-brand-800 underline" href={event.link}>About this ministry</Link>}</div>
    {!!shareMessage&&<p role="status" className="text-xs text-slate-600">{shareMessage}</p>}
  </article>;
}
