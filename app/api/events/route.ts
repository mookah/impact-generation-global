import { calendarEvents } from '@/lib/server/events';
export const dynamic='force-dynamic';
export async function GET(){try{return Response.json({events:await calendarEvents()},{headers:{'Cache-Control':'no-store'}});}catch{return Response.json({error:'The event calendar is temporarily unavailable.'},{status:503});}}
