import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync,existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve,dirname } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
import { PGlite } from '@electric-sql/pglite';
const require=createRequire(import.meta.url);
function loader(mocks={}){const cache=new Map();function load(file){const initial=resolve(file);const path=[initial,initial+'.ts',initial+'.tsx'].find(existsSync);if(cache.has(path))return cache.get(path).exports;const compiled={exports:{}};cache.set(path,compiled);const code=ts.transpileModule(readFileSync(path,'utf8'),{fileName:path,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;new Function('require','module','exports',code)(id=>id in mocks?mocks[id]:id==='server-only'?{}:id.endsWith('.module.css')?{default:new Proxy({},{get:(_,k)=>String(k)})}:id==='next/headers'?{}:id.startsWith('@/')?load(id.slice(2)):id.startsWith('.')?load(resolve(dirname(path),id)):require(id),compiled,compiled.exports);return compiled.exports;}return load;}
const plain=loader();const helpers=plain('lib/events.ts');
const event={id:'00000000-0000-4000-8000-000000000001',title:'Verified gathering',date:'2026-09-30T22:30:00Z',end_date:'2026-10-02T10:00:00Z',location:'Verified venue',description:'A verified event description.',approved:true,category:'Community',state:'scheduled',all_day:false,media_ids:[]};

test('Lusaka dates, multiday coverage and calendar navigation do not drift with browser timezone',()=>{
  const {lusakaDay,fromRecord,coversDay,shiftPeriod,monthDays,weekStart}=helpers;
  assert.equal(lusakaDay(event.date),'2026-10-01');const mapped=fromRecord(event);assert.equal(mapped.date,'2026-10-01');assert.equal(mapped.endDate,'2026-10-02');assert(mapped.time.includes('00:30'));
  assert(coversDay(mapped,'2026-10-01'));assert(coversDay(mapped,'2026-10-02'));assert(!coversDay(mapped,'2026-09-30'));
  assert.equal(shiftPeriod('2026-12-31','month',1),'2027-01-01');assert.equal(shiftPeriod('2026-12-31','week',1),'2027-01-07');assert.equal(shiftPeriod('2026-10-01','year',-1),'2025-10-01');assert.equal(monthDays('2026-10-01').length,42);assert.equal(weekStart('2026-10-04'),'2026-09-28');
});
test('managed approved events replace legacy listings while drafts and archives remain private',()=>{
  const legacy=[{id:'old-listing',title:event.title,date:'2026-10-01',location:event.location,description:event.description,category:'Community'}];
  assert.equal(helpers.mergeEvents(legacy,[{...event,legacy_id:'old-listing'}]).length,1);
  assert.equal(helpers.mergeEvents(legacy,[{...event,legacy_id:'old-listing',approved:false}]).length,0);
  assert.equal(helpers.mergeEvents(legacy,[{...event,legacy_id:'old-listing',archived:true}]).length,0);
  const cancelled=helpers.mergeEvents([], [{...event,state:'cancelled'}]);assert.equal(helpers.eventStatus(cancelled[0],'2026-10-01'),'Cancelled');assert.equal(helpers.eventStatus({...cancelled[0],state:'postponed'},'2026-10-01'),'Postponed');assert.equal(helpers.eventStatus({...cancelled[0],state:'scheduled'},'2026-10-03'),'Past');
});
test('downloadable ICS escapes data, folds UTF-8 lines and includes exclusive all-day end dates',()=>{
  const e=helpers.fromRecord({...event,title:'Title, with; punctuation\nand Unicode '+ 'é'.repeat(100),all_day:true});const ics=helpers.eventICS(e,new Date('2026-10-01T00:00:00Z'));
  assert(ics.includes('DTSTART;VALUE=DATE:20261001\r\n'));assert(ics.includes('DTEND;VALUE=DATE:20261003\r\n'));assert(ics.includes('Title\\, with\\; punctuation\\n'));assert(ics.endsWith('END:VCALENDAR\r\n'));assert(ics.split('\r\n').every(line=>Buffer.byteLength(line)<=75));
  const timed=helpers.eventICS(helpers.fromRecord(event));assert(timed.includes('DTSTART:20260930T223000Z'));assert(timed.includes('DTEND:20261002T100000Z'));
});
test('calendar UI switches month/week/year/list, navigates periods and selects an event',()=>{
  let cursor=0;const state=[];const react={useState:init=>{const i=cursor++;if(!(i in state))state[i]=typeof init==='function'?init():init;return[state[i],value=>state[i]=typeof value==='function'?value(state[i]):value];},useEffect:()=>{}};
  const component=loader({react})('components/EventsCalendar.tsx').default;const e=helpers.fromRecord(event);const render=()=>{cursor=0;return component({events:[e],initialEventId:e.id});};
  function find(node,p,out=[]){if(Array.isArray(node))node.forEach(n=>find(n,p,out));else if(node&&typeof node==='object'){if(p(node))out.push(node);find(node.props?.children,p,out);}return out;}
  const clickView=v=>{const button=find(render(),n=>n.type==='button'&&n.props.children===v)[0];assert(button);button.props.onClick();};
  clickView('week');assert.equal(state[3],'week');clickView('year');assert.equal(find(render(),n=>n.type==='h4').length,12);clickView('list');assert.equal(state[3],'list');clickView('month');const next=find(render(),n=>n.props?.['aria-label']==='Next period')[0];next.props.onClick();assert.equal(state[2],'2026-11-01');find(render(),n=>n.props?.['aria-label']==='Previous period')[0].props.onClick();assert.equal(state[2],'2026-10-01');
});
test('event saves edit existing IDs, require approval review and reject invalid images/links/dates',async()=>{
  class AppError extends Error{}const writes=[];const core={AppError,db:async(path,method='GET',body)=>{if(method==='GET'){if(path.startsWith('igg_media'))return[];return[event];}writes.push({path,method,body});return[{...event,...body}];}};
  const save=loader({'./core':core})('lib/server/event-admin.ts').saveEvent;
  const body={...event,reviewed:true,media_ids:[]};await save(body);assert.equal(writes[0].method,'PATCH');assert(writes[0].path.includes(event.id));assert.equal(writes[0].body.approved,true);
  for(const bad of [{...body,reviewed:false},{...body,end_date:'2026-01-01T00:00:00Z'},{...body,registration_url:'javascript:alert(1)'},{...body,media_ids:['00000000-0000-4000-8000-000000000002']},{...body,date:'2026-10-01T00:00'}])await assert.rejects(()=>save(bad));assert.equal(writes.length,1);
});
test('migration is additive and idempotent; existing records and event RLS policies survive',async()=>{
  const pg=new PGlite();try{await pg.exec("create role anon;create role authenticated;create role service_role;create table igg_events(id uuid primary key,title text,date timestamptz,approved boolean);alter table igg_events enable row level security;create policy existing_event_policy on igg_events for select using(approved);insert into igg_events values('00000000-0000-4000-8000-000000000001','Existing event','2026-10-01T10:00:00Z',true);");const sql=readFileSync('supabase/migrations/20261024_premium_events_buddy.sql','utf8');await pg.exec(sql);await pg.exec(sql);assert.equal((await pg.query('select * from igg_events')).rows.length,1);assert.equal((await pg.query('select state from igg_events')).rows[0].state,'scheduled');assert.equal((await pg.query("select count(*)::int as n from pg_policies where tablename='igg_events' and policyname='existing_event_policy'")).rows[0].n,1);assert.equal((await pg.query("select relrowsecurity from pg_class where relname='igg_settings'")).rows[0].relrowsecurity,true);assert.equal((await pg.query("select has_table_privilege('anon','igg_settings','SELECT') as allowed")).rows[0].allowed,false);}finally{await pg.close();}
});
test('Buddy greetings are free, frequency is bounded and summaries contain no invented details',()=>{
  const buddy=plain('lib/buddy.ts');assert(buddy.friendlyReply('Hello!'));assert(buddy.friendlyReply('How are you?'));assert.equal(buddy.friendlyReply('What is gravity?'),null);assert.equal(buddy.ministryQuestion('What is gravity?'),false);assert(buddy.ministryQuestion('What happened at Linda West School?'));
  assert(buddy.greetingDue(buddy.DEFAULT_BUDDY,false,null,'2026-10-23'));assert(!buddy.greetingDue(buddy.DEFAULT_BUDDY,true,null,'2026-10-23'));assert(!buddy.greetingDue({...buddy.DEFAULT_BUDDY,frequency:'daily'},false,'2026-10-23','2026-10-23'));assert(!buddy.greetingDue({...buddy.DEFAULT_BUDDY,frequency:'manual'},false,null,'2026-10-23'));assert(!buddy.greetingDue({...buddy.DEFAULT_BUDDY,enabled:false},false,null,'2026-10-23'));
  const p={id:'1',text:'Our team visited the school for a mentorship session.',publishedAt:'2026-10-20T12:00:00Z',url:'https://www.facebook.com/posts/1',event:'School Ministry'};const activities=buddy.meaningfulActivities([p,p,{...p,id:'old',publishedAt:'2025-01-01'},{...p,id:'path',text:'C:\\uploads\\image.jpg'},{...p,id:'unsafe',url:'https://facebook.com.attacker.invalid/1'}],[],Date.parse('2026-10-23'));assert.equal(activities.length,1);const summary=buddy.activitySummary(p.text);assert(summary.includes('school'));assert(!summary.includes('Linda'));assert(!summary.includes('2026'));
});
test('Buddy provides safe program fallback without AI; general knowledge does not read private records',async()=>{
  let aiCalls=0,dbCalls=0;class AppError extends Error{constructor(message,status=400){super(message);this.status=status;}}const core={AppError,configured:()=>true,db:async()=>{dbCalls++;throw new Error('No database reads for general knowledge');},sameOrigin:()=>{},rate:async()=>{},json:r=>r.json(),errorResponse:e=>Response.json({error:e.message},{status:e.status||500})};
  const route=loader({'@/lib/server/core':core,'@/lib/facebook':{getFacebookUpdates:async()=>{throw new Error('No Facebook call expected');}},'@/lib/server/content':{ai:async(instructions)=>{aiCalls++;assert(instructions.includes('general knowledge'));assert(instructions.includes('ONLY the provided public sources'));return 'Gravity attracts objects with mass.';}}})('app/api/impact-ai/route.ts');const ask=text=>route.POST(new Request('https://local.invalid/api/impact-ai',{method:'POST',body:JSON.stringify({messages:[{role:'visitor',text}]})}));
  const greeting=await ask('How are you?');assert.equal(greeting.status,200);assert.equal(aiCalls,0);const reply=await ask('What is gravity?');assert.equal(reply.status,200);const body=await reply.json();assert.equal(body.answerType,'general');assert.deepEqual(body.sources,[]);assert.equal(aiCalls,1);assert.equal(dbCalls,0);
  const publicBuddy=loader({'./core':{configured:()=>false},'@/lib/facebook':{getFacebookUpdates:async()=>({status:'unavailable',posts:[]})}})('lib/server/buddy.ts');const content=await publicBuddy.buddyPublic();assert.deepEqual(content.updates,[]);assert.equal(content.style,'cycling');assert(!JSON.stringify(content).includes('subscriber'));
});
test('canonical video checks reject unsafe URLs; SSR previews never load a player automatically',()=>{
  const display=plain('lib/facebook-display.ts');assert.equal(display.facebookVideoUrl('https://www.facebook.com/example/videos/1234/?tracking=1'),'https://www.facebook.com/videos/1234/');assert.equal(display.facebookVideoUrl('https://www.facebook.com/reel/789/'),'https://www.facebook.com/reel/789/');for(const u of ['https://facebook.com.evil.invalid/videos/1','https://www.facebook.com/posts/1','https://www.facebook.com/videos/1?access_token=secret','javascript:alert(1)'])assert.equal(display.facebookVideoUrl(u),null);
  const Video=plain('components/FacebookVideoPreview.tsx').default;const html=renderToStaticMarkup(Video?require('react').createElement(Video,{url:'https://www.facebook.com/reel/789/',title:'Verified video',imageUrl:'https://scontent.example.fbcdn.net/thumb.jpg'}):null);assert(html.includes('thumb.jpg'));assert(html.includes('Play Facebook video'));assert(!html.includes('<iframe'));assert(html.includes('Watch on Facebook'));
  const Buddy=plain('components/ImpactBuddy.tsx').default;const cycling=renderToStaticMarkup(require('react').createElement(Buddy,{variant:'cycling'}));const waving=renderToStaticMarkup(require('react').createElement(Buddy,{variant:'welcome'}));assert(cycling.includes('190 210'));assert(waving.includes('160 190'));assert(readFileSync('components/ImpactBuddy.module.css','utf8').includes('prefers-reduced-motion'));
});

test('Facebook rewriting highlights one card and locks duplicate simultaneous requests',async()=>{
  const posts=['370924362777718_1','370924362777718_2'].map(id=>({id,text:'Verified school ministry source update.',published_at:'2026-09-18T08:00:00Z',updated_at:'2026-09-18T08:00:00Z',category:'School Ministry',url:`https://www.facebook.com/posts/${id}`}));
  const data={sources:posts,articles:[],issues:[],media:[],events:[],subscribers:[],deliveries:[],audit:[],services:{}};
  const state=[data,'Facebook Posts','',false,null,null,false,false,false];let cursor=0,resolveRequest;const requests=[];
  const react={useState(init){const i=cursor++;if(!(i in state))state[i]=init;return[state[i],v=>state[i]=v];},useRef(init){const i=cursor++;return state[i]??(state[i]={current:init});},useEffect(){}};
  const Component=loader({react})('components/AdminDashboard.tsx').default;const render=()=>{cursor=0;return Component();};
  function find(n,p,out=[]){if(Array.isArray(n))n.forEach(v=>find(v,p,out));else if(n&&typeof n==='object'){if(p(n))out.push(n);find(n.props?.children,p,out);}return out;}
  const original=global.fetch;global.fetch=async(_u,o)=>{if(!o)return{ok:true,json:async()=>data};requests.push(JSON.parse(o.body));return new Promise(r=>resolveRequest=r);};
  try{let cards=find(render(),n=>n.type==='article');cards[1].props.onClick();cards=find(render(),n=>n.type==='article');assert.equal(cards.filter(c=>c.props.className.includes('ring-2')).length,1);const rewrite=c=>find(c,n=>n.type==='button')[0];rewrite(cards[1]).props.onClick();rewrite(cards[0]).props.onClick();assert.equal(requests.length,1);assert.equal(requests[0].id,posts[1].id);cards=find(render(),n=>n.type==='article');assert.equal(rewrite(cards[1]).props.children,'Rewriting...');assert.equal(rewrite(cards[0]).props.children,'Generate professional rewrite');resolveRequest({ok:true,json:async()=>({result:[{id:'saved-article',source_id:posts[1].id}]})});for(let i=0;i<30;i++)await Promise.resolve();assert.equal(state[1],'AI Content Editor');assert.equal(state[4].source_id,posts[1].id);assert.equal(data.sources.length,2);}finally{global.fetch=original;}
});
