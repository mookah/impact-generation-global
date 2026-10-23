import type { EventItem } from './site';
import type { EventRecord } from './content-types';
export const EVENT_CATEGORIES=['Program','Camp','Outreach','Meeting','Community'] as const;
export type CalendarEvent=EventItem&{startsAt?:string;endsAt?:string;allDay?:boolean;state?:EventRecord['state'];mediaIds?:string[];registrationUrl?:string;legacy?:boolean};
export const lusakaDay=(value:Date|string=new Date())=>new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Lusaka',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));
export const dayDate=(key:string)=>new Date(`${key}T12:00:00Z`);
export const dayKey=(date:Date)=>date.toISOString().slice(0,10);
export function addDays(key:string,days:number){const d=dayDate(key);d.setUTCDate(d.getUTCDate()+days);return dayKey(d);}
export function weekStart(key:string){return addDays(key,-((dayDate(key).getUTCDay()+6)%7));}
export function monthDays(key:string){const first=key.slice(0,7)+'-01';const start=weekStart(first);return Array.from({length:42},(_,i)=>addDays(start,i));}
export function shiftPeriod(key:string,view:string,direction:number){if(view==='week')return addDays(key,direction*7);const d=dayDate(key.slice(0,7)+'-01');if(view==='year')d.setUTCFullYear(d.getUTCFullYear()+direction);else d.setUTCMonth(d.getUTCMonth()+direction);return dayKey(d);}
export const coversDay=(event:CalendarEvent,key:string)=>event.date<=key&&(event.endDate||event.date)>=key;
export const dateLabel=(key:string)=>dayDate(key).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
export const eventLabel=(event:CalendarEvent)=>`${dateLabel(event.date)}${event.endDate&&event.endDate!==event.date?` – ${dateLabel(event.endDate)}`:''}`;
export function eventStatus(event:CalendarEvent,today=lusakaDay()){
  if(event.state==='cancelled')return 'Cancelled';if(event.state==='postponed')return 'Postponed';
  if(event.state==='completed'||(event.endDate||event.date)<today)return 'Past';return event.date<=today?'In progress':'Upcoming';
}
export function safeEventLink(value:unknown){if(typeof value!=='string'||!value)return '';if(/^\/(?!\/)[a-z0-9/?=&%#_.-]*$/i.test(value))return value;try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password?u.href:'';}catch{return '';}}
export function fromRecord(e:EventRecord):CalendarEvent{
  const time=(v:string)=>new Date(v).toLocaleTimeString('en-GB',{timeZone:'Africa/Lusaka',hour:'2-digit',minute:'2-digit'});
  return{id:e.id,title:e.title,date:lusakaDay(e.date),endDate:e.end_date?lusakaDay(e.end_date):undefined,time:e.all_day?'All day':`${time(e.date)}${e.end_date?` – ${time(e.end_date)}`:''} CAT`,startsAt:e.date,endsAt:e.end_date||undefined,allDay:e.all_day,location:e.location,description:e.description,category:e.category||'Community',state:e.state||'scheduled',mediaIds:e.media_ids||[],registrationUrl:safeEventLink(e.registration_url)};
}
export function mergeEvents(legacy:EventItem[],records:EventRecord[]):CalendarEvent[]{
  const overrides=new Set(records.map(e=>e.legacy_id).filter(Boolean));
  const approved=records.filter(e=>e.approved&&!e.archived).map(fromRecord);
  const fingerprint=(e:EventItem)=>`${e.title.trim().toLowerCase()}|${e.date}|${e.location.trim().toLowerCase()}`;
  const seen=new Set(approved.map(fingerprint));
  const prior=legacy.filter(e=>!overrides.has(e.id)&&!seen.has(fingerprint(e))).map(e=>({...e,legacy:true,allDay:!e.time}));
  return [...approved,...prior].sort((a,b)=>a.date.localeCompare(b.date)||a.id.localeCompare(b.id));
}
const icsEscape=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\r?\n/g,'\\n').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r/g,'');
function fold(line:string){let out='',part='',size=0;for(const char of line){const bytes=new TextEncoder().encode(char).length;if(size+bytes>75){out+=part+'\r\n';part=' ';size=1;}part+=char;size+=bytes;}return out+part;}
export function eventICS(event:CalendarEvent,now=new Date()){
  const stamp=(v:Date)=>v.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}Z$/,'Z');
  const times=event.time?.match(/\d{2}:\d{2}/g)||[];
  const allDay=event.allDay??!times.length;
  const start=event.startsAt||`${event.date}T${times[0]||'00:00'}:00+02:00`;
  const end=event.endsAt||(times[1]?`${event.endDate||event.date}T${times[1]}:00+02:00`:new Date(Date.parse(start)+3600000).toISOString());
  const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Impact Generation Global//Events//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','BEGIN:VEVENT',`UID:${icsEscape(event.id)}@impactgenerationglobal.org`,`DTSTAMP:${stamp(now)}`,
    allDay?`DTSTART;VALUE=DATE:${event.date.replaceAll('-','')}`:`DTSTART:${stamp(new Date(start))}`,
    allDay?`DTEND;VALUE=DATE:${addDays(event.endDate||event.date,1).replaceAll('-','')}`:`DTEND:${stamp(new Date(end))}`,
    `SUMMARY:${icsEscape(event.title)}`,`LOCATION:${icsEscape(event.location)}`,`DESCRIPTION:${icsEscape(event.description)}`,`STATUS:${event.state==='cancelled'?'CANCELLED':event.state==='postponed'?'TENTATIVE':'CONFIRMED'}`,'END:VEVENT','END:VCALENDAR'];
  return lines.map(fold).join('\r\n')+'\r\n';
}
