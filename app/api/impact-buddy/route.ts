import { buddyPublic } from '@/lib/server/buddy';
export async function GET(){try{return Response.json(await buddyPublic(),{headers:{'Cache-Control':'public, max-age=60, s-maxage=60'}});}catch{return Response.json({error:'The welcome guide is temporarily unavailable.'},{status:503});}}
