import 'server-only';
import { AppError,db } from './core';
import { EVENT_CATEGORIES,safeEventLink } from '@/lib/events';
import { events,programs } from '@/lib/site';
import type { EventRecord } from '@/lib/content-types';
const uuid=(v:unknown)=>typeof v==='string'&&/^[a-f0-9-]{36}$/.test(v);
export async function saveEvent(b:Record<string,unknown>){
  if(b.id&&!uuid(b.id))throw new AppError('Choose a valid event.');
  if(typeof b.title!=='string'||!b.title.trim()||typeof b.location!=='string'||!b.location.trim()||typeof b.description!=='string')throw new AppError('Enter an event title, venue and description.');
  // Every input carries an explicit timezone; never parse a browser-local timestamp.
  const validDate=(v:unknown)=>typeof v==='string'&&/T\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:\d{2})$/.test(v)&&Number.isFinite(Date.parse(v));
  if(!validDate(b.date)||(b.end_date&&!validDate(b.end_date)))throw new AppError('Enter valid dates and times in Africa/Lusaka.');
  if(b.end_date&&Date.parse(String(b.end_date))<Date.parse(String(b.date)))throw new AppError('The ending date cannot be before the start.');
  if(b.approved===true&&b.reviewed!==true)throw new AppError('Review event facts, dates and image consent before publishing.');
  if(!EVENT_CATEGORIES.includes(b.category as typeof EVENT_CATEGORIES[number]))throw new AppError('Choose an event category.');
  if(!['scheduled','cancelled','postponed','completed'].includes(String(b.state)))throw new AppError('Choose a valid event status.');
  if(b.program_slug&&!programs.some(p=>p.slug===b.program_slug))throw new AppError('Choose an existing ministry program.');
  if(b.legacy_id&&!events.some(e=>e.id===b.legacy_id))throw new AppError('Choose an existing legacy listing.');
  const link=b.registration_url?safeEventLink(b.registration_url):'';if(b.registration_url&&!link)throw new AppError('Use an HTTPS registration link or a website page path.');
  if(!Array.isArray(b.media_ids)||b.media_ids.length>12||b.media_ids.some(id=>!uuid(id)))throw new AppError('Choose up to 12 approved photographs or posters.');
  if(b.media_ids.length){const media=await db<{id:string}[]>('igg_media?approved=eq.true&consent=eq.true&select=id&limit=1000');if(b.media_ids.some(id=>!media.some(m=>m.id===id)))throw new AppError('An image is unavailable or lacks approval and consent.');}
  if(b.id){const [existing]=await db<EventRecord[]>(`igg_events?id=eq.${b.id}`);if(!existing)throw new AppError('This event no longer exists.');if(existing.legacy_id&&b.legacy_id!==existing.legacy_id)throw new AppError('The original listing identity cannot be changed.');}
  else if(b.legacy_id){const existing=await db<EventRecord[]>(`igg_events?legacy_id=eq.${encodeURIComponent(String(b.legacy_id))}`);if(existing.length)throw new AppError('This listing already has a managed event. Reload Events and edit it.',409);}
  const values={title:b.title.trim().slice(0,200),location:b.location.trim().slice(0,200),description:b.description.slice(0,5000),date:new Date(String(b.date)).toISOString(),end_date:b.end_date?new Date(String(b.end_date)).toISOString():null,all_day:b.all_day===true,category:b.category,program_slug:b.program_slug||null,state:b.state,archived:b.archived===true,approved:b.approved===true&&b.archived!==true,media_ids:[...new Set(b.media_ids)],registration_url:link||null,legacy_id:b.legacy_id||null};
  const saved=await db<EventRecord[]>(b.id?`igg_events?id=eq.${b.id}`:'igg_events',b.id?'PATCH':'POST',values);if(!saved.length)throw new AppError('Event not saved. Reload and try again.',409);return saved[0];
}
