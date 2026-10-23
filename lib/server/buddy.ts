import 'server-only';
import { DEFAULT_BUDDY,activitySummary,meaningfulActivities,type BuddySettings } from '@/lib/buddy';
import { getFacebookUpdates } from '@/lib/facebook';
import type { SourcePost } from '@/lib/content-types';
import { configured,db } from './core';
export async function buddySettings():Promise<{settings:BuddySettings;ready:boolean}>{
  if(!configured())return{settings:DEFAULT_BUDDY,ready:false};
  try{const [record]=await db<{value:BuddySettings}[]>('igg_settings?key=eq.impact_buddy');return{settings:record?{...DEFAULT_BUDDY,...record.value}:DEFAULT_BUDDY,ready:true};}
  catch{return{settings:{...DEFAULT_BUDDY,enabled:false},ready:false};}
}
export async function buddyPublic(){
  const {settings}=await buddySettings();
  const feed=await getFacebookUpdates(30);let posts=feed.posts;
  // Only specifically reviewed featured sources may be used from stored records.
  if(feed.status!=='connected'&&settings.featuredSourceIds.length&&configured()){
    try{const ids=settings.featuredSourceIds.map(encodeURIComponent).join(',');const sources=await db<SourcePost[]>(`igg_sources?id=in.(${ids})&order=published_at.desc&limit=20`);posts=sources.map(p=>({id:p.id,text:p.text,publishedAt:p.published_at,url:p.url,imageUrl:null,isVideo:p.is_video,event:p.category}));}catch{posts=[];}
  }
  const activities=meaningfulActivities(posts,settings.featuredSourceIds);
  return{welcome:settings.welcome,enabled:settings.enabled,frequency:settings.frequency,style:settings.style||'cycling',updates:activities.map(p=>({id:p.id,title:`Discover our ${p.event.toLowerCase()} update`,summary:activitySummary(p.text),publishedAt:p.publishedAt,url:p.url})),sourceStatus:feed.status};
}
