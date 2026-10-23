import Link from 'next/link';
import { notFound } from 'next/navigation';
import { configured, db } from '@/lib/server/core';
import { site } from '@/lib/site';
type Event={id:string;title:string;date:string;location:string;description:string};
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{id:string}>}){
  const {id}=await params;if(!configured()||!/^[a-f0-9-]{36}$/.test(id))notFound();const [event]=await db<Event[]>(`igg_events?id=eq.${id}&approved=eq.true`);if(!event)notFound();
  const schema={'@context':'https://schema.org','@type':'Event',name:event.title,startDate:event.date,description:event.description,location:{'@type':'Place',name:event.location},organizer:{'@type':'Organization',name:site.name,url:site.url}};
  return <article className="section shell max-w-3xl"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><Link className="font-semibold text-brand-800" href="/events">← Events calendar</Link><h1 className="display mt-6 text-4xl">{event.title}</h1><p className="mt-6 font-semibold">{new Date(event.date).toLocaleString('en-GB',{timeZone:'Africa/Lusaka'})} · Zambia time</p><p className="mt-3">{event.location}</p><p className="prose-body mt-6 whitespace-pre-line">{event.description}</p><Link className="btn btn-primary mt-8" href="/contact">Enquire about this event</Link></article>;
}
