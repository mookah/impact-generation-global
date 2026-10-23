import Link from 'next/link';
import { notFound } from 'next/navigation';
import { calendarEvents } from '@/lib/server/events';
import { site } from '@/lib/site';
import EventDetails from '@/components/EventDetails';
export const dynamic='force-dynamic';
export default async function Page({params}:{params:Promise<{id:string}>}){
  const {id}=await params;const event=(await calendarEvents()).find(e=>e.id===id);if(!event)notFound();
  const schema={'@context':'https://schema.org','@type':'Event',name:event.title,startDate:event.startsAt||event.date,endDate:event.endsAt||event.endDate,eventStatus:`https://schema.org/${event.state==='cancelled'?'EventCancelled':event.state==='postponed'?'EventPostponed':'EventScheduled'}`,description:event.description,location:{'@type':'Place',name:event.location},organizer:{'@type':'Organization',name:site.name,url:site.url}};
  return <section className="section shell max-w-4xl"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><Link className="mb-6 inline-block font-semibold text-brand-800" href="/events">← Events calendar</Link><EventDetails event={event}/></section>;
}
