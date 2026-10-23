import type { ImpactUpdate } from './facebook';
import { cleanFacebookCaption } from './facebook-display';
export type BuddySettings={welcome:string;enabled:boolean;frequency:'session'|'daily'|'manual';featuredSourceIds:string[];style?:'welcome'|'cycling'};
export const DEFAULT_BUDDY:BuddySettings={welcome:"Hello! Welcome to Impact Generation Global. I'm IMPACT Buddy, your friendly virtual assistant. Discover our programs, ministry updates and ways to take part!",enabled:true,frequency:'session',featuredSourceIds:[],style:'cycling'};
export function friendlyReply(question:string):string|null{
  const q=question.toLowerCase().replace(/[!?.,’']/g,'').trim().replace(/\s+/g,' ');
  if(/^(?:hi|hello|hey|greetings|good morning|good afternoon|good evening)(?: there| buddy| impact buddy)?$/.test(q))return "Hello! I'm IMPACT Buddy. How can I help today? You can ask about our ministry or a general knowledge question.";
  if(/^(?:hi |hello |hey )?(?:how are you|how are you doing|hows it going|how do you do)(?: today| buddy| impact buddy)?$/.test(q))return "I'm ready to help—thanks for asking! How are you? We can explore our ministry, talk about cycling or learn something new together.";
  if(/^(?:thanks|thank you|thank you buddy|thanks buddy|thanks a lot)$/.test(q))return "You're welcome! I'm here whenever you need a hand.";
  if(/^(?:who are you|what is your name|whats your name)$/.test(q))return "I'm IMPACT Buddy, Impact Generation Global's AI assistant. I can guide you through our verified ministry updates and help with general knowledge. I can make mistakes, so check important information.";
  return null;
}
export function ministryQuestion(question:string){return /impact|\b(?:our|your)\s+(?:ministry|team|program|mission|event|work)|ministry|pad a girl|boys\s*(?:to|2)\s*men|cycle for change|linda west|\b(?:programs?|newsletters?|donat\w*|outreach|galler\w*|upcoming events?|facebook|school visit\w*)\b/i.test(question);}
export function activitySummary(text:string){
  const topics:[RegExp,string][]=[[/school|students/i,'school updates'],[/mentor/i,'mentorship'],[/discipleship|fellowship/i,'discipleship and fellowship'],[/camp/i,'youth camps'],[/pad a girl|menstrual/i,'Pad a Girl'],[/cycl|bicycl/i,'Cycle for Change'],[/outreach/i,'community outreach']];
  const matches=topics.filter(([pattern])=>pattern.test(text)).slice(0,2).map(([,label])=>label);
  return matches.length?`Explore our update on ${matches.join(' and ')}. Read the original story for the details.`:'Discover a recent ministry update from our official Facebook Page.';
}
export function greetingDue(settings:BuddySettings,sessionSeen:boolean,lastDay:string|null,today:string){return settings.enabled&&settings.frequency!=='manual'&&!sessionSeen&&(settings.frequency!=='daily'||lastDay!==today);}
export function meaningfulActivities(posts:ImpactUpdate[],featured:string[]=[],now=Date.now()){
  const unique=new Map<string,ImpactUpdate>();
  for(const p of posts){
    const text=cleanFacebookCaption(p.text).replace(/https?:\/\/\S+/g,'').trim();
    const date=Date.parse(p.publishedAt);if(!Number.isFinite(date)||date>now||now-date>60*86400000)continue;
    if((text.match(/\p{L}+/gu)||[]).length<5||!/(school|visit|outreach|camp|mentor|discipleship|community|ministry|partner|cycle|pad a girl|boys.{0,5}men|youth|fellowship)/i.test(text))continue;
    try{const u=new URL(p.url);if(u.protocol!=='https:'||!(u.hostname==='facebook.com'||u.hostname.endsWith('.facebook.com')))continue;}catch{continue;}
    unique.set(p.id,{...p,text});
  }
  return [...unique.values()].filter(p=>!featured.length||featured.includes(p.id)).sort((a,b)=>Date.parse(b.publishedAt)-Date.parse(a.publishedAt)).slice(0,3);
}
