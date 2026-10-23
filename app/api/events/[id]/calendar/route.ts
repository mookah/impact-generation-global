import { calendarEvents } from '@/lib/server/events';
import { eventICS } from '@/lib/events';
export async function GET(_request:Request,{params}:{params:Promise<{id:string}>}){
  const {id}=await params;if(!/^[a-z0-9-]{1,100}$/i.test(id))return new Response(null,{status:404});
  const event=(await calendarEvents()).find(e=>e.id===id);if(!event)return new Response(null,{status:404});
  return new Response(eventICS(event),{headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':`attachment; filename="impact-event-${id}.ics"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
}
