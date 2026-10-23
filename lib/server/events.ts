import 'server-only';
import { events } from '@/lib/site';
import type { EventRecord } from '@/lib/content-types';
import { mergeEvents } from '@/lib/events';
import { configured,db } from './core';
export async function eventRecords(){
  if(!configured())return [];
  const records:EventRecord[]=[];
  for(let offset=0;;offset+=500){const page=await db<EventRecord[]>(`igg_events?order=date.asc,id.asc&limit=500&offset=${offset}`);records.push(...page);if(page.length<500)break;}
  return records;
}
export async function calendarEvents(){
  const records=await eventRecords();
  const ids=[...new Set(records.filter(e=>e.approved&&!e.archived).flatMap(e=>e.media_ids||[]))];
  const media=ids.length?await db<{id:string}[]>(`igg_media?id=in.(${ids.join(',')})&approved=eq.true&consent=eq.true&select=id&limit=1000`):[];
  return mergeEvents(events,records.map(e=>({...e,media_ids:(e.media_ids||[]).filter(id=>media.some(m=>m.id===id))})));
}
