import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function loader(mocks={}){
  const cache=new Map();
  function load(file){
    const initial=resolve(file);const path=[initial,`${initial}.ts`,`${initial}.tsx`].find(existsSync);
    if(cache.has(path))return cache.get(path).exports;
    const compiled={exports:{}};cache.set(path,compiled);
    const code=ts.transpileModule(readFileSync(path,'utf8'),{fileName:path,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
    new Function('require','module','exports',code)(id=>id in mocks?mocks[id]:id==='server-only'?{}:id.endsWith('.module.css')?{default:new Proxy({},{get:(_,k)=>String(k)})}:id==='next/headers'?{}:id.startsWith('@/')?load(id.slice(2)):id.startsWith('.')?load(resolve(dirname(path),id)):require(id),compiled,compiled.exports);
    return compiled.exports;
  }
  return load;
}
const post=(id,text='Our team visited the school for a discipleship session.')=>({id,text,published_at:'2026-09-18T08:00:00Z',updated_at:'2026-09-18T08:00:00Z',url:`https://www.facebook.com/posts/${id}`,category:'School Ministry',hash:`hash-${id}`});
const article=p=>({id:`article-${p.id}`,source_id:p.id,source_hash:p.hash,slug:`story-${p.id}`,title:'A school discipleship visit',body:'Our team visited the school for a discipleship session.',status:'draft',media_id:null});
function setup({sources=[post('one')],articles=[],prior=[],status='draft',aiFailure=false}={}){
  const writes=[];const calls=[];let current={id:'september-id',slug:'september-2026',month:'2026-09-01',title:'September 2026 — Ministry Newsletter',status,articles:prior,notify:false};
  class AppError extends Error{constructor(message,status=400){super(message);this.status=status;}}
  const core={AppError,env:n=>n==='OPENAI_MODEL'?'test-model':'test-key',hash:t=>t,audit:async()=>{},rpc:async(name,body)=>{if(name==='igg_rate')return true;if(name==='igg_save_rewrite'){const p=sources.find(p=>p.id===body.p_source);const a={...article(p),title:body.p_content.headline,body:body.p_content.article};articles.push(a);return[a];}},db:async(path,method='GET',body)=>{
    if(method!=='GET'){writes.push({path,body});if(path.startsWith('igg_issues')){current={...current,...structuredClone(body)};return[current];}return[];}
    if(path.startsWith('igg_issues?'))return[current];
    if(path.startsWith('igg_sources?id='))return sources.filter(p=>p.id===decodeURIComponent(path.split('eq.')[1]));
    if(path.startsWith('igg_sources?'))return sources;
    if(path.startsWith('igg_articles?source_id=eq.'))return articles.filter(a=>a.source_id===decodeURIComponent(path.split('eq.')[1]));
    if(path.startsWith('igg_articles?source_id=in.'))return articles;
    if(path.startsWith('igg_articles?status=eq.published'))return[];
    if(path.startsWith('igg_media?')){assert(path.includes('approved=eq.true&consent=eq.true'));return[{id:'photo-one',source_id:'one',approved:true,consent:true,caption:'Approved photograph'},{id:'photo-two',source_id:'one',approved:true,consent:true,caption:'Another approved photograph'}];}
    throw new Error(`Unexpected query ${path}`);
  }};
  const load=loader({'./core':core});const content=load('lib/server/content.ts');
  const fetch=async(url,options)=>{calls.push({url:String(url),options});assert.equal(new URL(url).hostname,'api.openai.com');if(aiFailure)return new Response(null,{status:429});return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({caption:'Verified source caption',article:'Our team visited the school for a discipleship session.',summary:'A source-based school visit.',headline:'A school discipleship visit',description:'A report based on the original source.'})}]}]});};
  return{content,core,load,sources,articles,writes,calls,fetch,get current(){return current;}};
}

test('stored September sources reuse saved AI, exclude attachments, deduplicate and persist a draft',async()=>{
  const p=post('one');const s=setup({sources:[p,p,post('two','C:\\uploads\\WhatsApp Image.jpg'),post('three','https://broken.example/attachment.jpg')],articles:[article(p)]});
  const original=global.fetch;global.fetch=async()=>{throw new Error('No network or paid call expected');};
  try{
    const first=await s.content.generateIssue('2026-09');assert.equal(first.articles.length,1);assert.equal(first.reused_count,1);assert.equal(first.generated_count,0);assert.equal(first.skipped_count,2);assert.equal(first.articles[0].source_id,'one');assert.equal(first.articles[0].date,p.published_at);assert.equal(first.retrieval_status,'stored_facebook_sources');assert.equal(first.notify,false);
    const reloaded=structuredClone(s.current);assert.deepEqual(reloaded.articles,first.articles);assert.equal(reloaded.id,'september-id');
    const again=await s.content.generateIssue('2026-09');assert.equal(again.articles.length,1);assert.equal(again.generated_count,0);assert(s.writes.every(w=>w.body.slug==='september-2026'));
  }finally{global.fetch=original;}
});

test('regeneration preserves manual edits, report order, approved articles and photograph order',async()=>{
  const a=post('one'),b=post('two');const first={title:'My manually reviewed heading',body:'This manually edited source report must remain unchanged.',source:b.url,source_id:b.id,date:b.published_at,edited:true,media_ids:['photo-two','photo-one']};
  const s=setup({sources:[a,b],articles:[article(a),{...article(b),status:'approved'}],prior:[first]});
  const issue=await s.content.generateIssue('2026-09');assert.equal(issue.articles.length,2);assert.equal(issue.articles[0].body,first.body);assert.equal(issue.articles[0].title,first.title);assert.deepEqual(issue.articles[0].media_ids,first.media_ids);assert.equal(issue.articles[1].source_id,'one');assert.equal(s.articles[1].status,'approved');
});

test('missing reports are generated once with bounded paid requests; failures preserve progress',async()=>{
  const original=global.fetch;const s=setup({sources:[post('one'),post('two'),post('three'),post('four')]});global.fetch=s.fetch;
  try{const issue=await s.content.generateIssue('2026-09');assert.equal(s.calls.length,3);assert.equal(issue.generated_count,3);assert.equal(issue.pending_count,1);assert.equal(issue.articles.length,4);assert.equal(issue.notify,false);for(const c of s.calls){const body=JSON.parse(c.options.body);assert.equal(body.store,false);assert.equal(body.text.format.type,'json_schema');assert(body.instructions.includes('Never invent'));}
    const failed=setup({sources:[post('five'),post('six')],aiFailure:true});global.fetch=failed.fetch;const partial=await failed.content.generateIssue('2026-09');assert.equal(failed.calls.length,1);assert.equal(partial.pending_count,2);assert(partial.warnings.some(w=>/quota or rate limit/.test(w)));assert.equal(partial.status,'draft');
  }finally{global.fetch=original;}
});

test('duplicate simultaneous rewrites share one request and unchanged drafts never call AI',async()=>{
  const original=global.fetch;const s=setup();global.fetch=s.fetch;
  try{const [a,b]=await Promise.all([s.content.rewritePost('one'),s.content.rewritePost('one')]);assert.equal(s.calls.length,1);assert.equal(a[0].id,b[0].id);await s.content.rewritePost('one');assert.equal(s.calls.length,1);s.articles[0].status='approved';s.articles[0].body='A human approved this manually edited report.';assert.equal((await s.content.rewritePost('one'))[0].body,s.articles[0].body);assert.equal(s.calls.length,1);
  }finally{global.fetch=original;}
});

test('failed Facebook refresh and protected editions never replace the saved issue',async()=>{
  const original=global.fetch;const s=setup({prior:[{title:'Saved report',body:'A verified saved report remains here.',source:post('one').url,date:post('one').published_at}]});
  global.fetch=async()=>Response.json({error:{code:190,message:'Expired test-key'}},{status:401});
  try{await assert.rejects(()=>s.content.generateIssue('2026-09',true),/Meta code 190/);assert.equal(s.writes.length,0);for(const status of ['approved','published']){const protectedIssue=setup({status});await assert.rejects(()=>protectedIssue.content.generateIssue('2026-09'),/approved or published/);assert.equal(protectedIssue.writes.length,0);}}finally{global.fetch=original;}
});

test('newsletter preview protects draft content and renders approved photographs in saved order',async()=>{
  const p=post('one');const issue={id:'issue',month:'2026-09-01',title:'September 2026',status:'draft',retrieval_status:'stored_facebook_sources',articles:[{...article(p),source:p.url,date:p.published_at,media_ids:['photo-two','unapproved','photo-one']}]};let authenticated=false;
  const load=loader({'@/lib/server/core':{admin:async()=>{if(!authenticated)throw new Error('Private');}},'@/lib/server/public-content':{getIssue:async()=>issue,approvedMedia:async()=>[{id:'photo-one',caption:'First approved photo',approved:true,consent:true},{id:'photo-two',caption:'Second approved photo',approved:true,consent:true},{id:'unapproved',caption:'Private photo',approved:false,consent:false}]}});
  const render=load('components/DynamicNewsletter.tsx').default;
  const anonymous=renderToStaticMarkup(await render({slug:'september-2026'}));assert(!anonymous.includes(issue.articles[0].body));assert(anonymous.includes('awaiting editorial approval'));
  authenticated=true;const html=renderToStaticMarkup(await render({slug:'september-2026'}));assert(html.includes('PRIVATE DRAFT'));assert(html.includes('/logo-new.png'));assert(html.includes(p.url));assert(!html.includes('Private photo'));assert(html.indexOf('Second approved photo')<html.indexOf('First approved photo'));for(const href of ['/donate','/contact','/subscribe'])assert(html.includes(`href="${href}"`));assert(html.includes('Source published 18 September 2026'));
});

test('editor saves report and photo order, keeps source identity, disables notifications and requires review',async()=>{
  const id='00000000-0000-4000-8000-000000000001';
  const photo='00000000-0000-4000-8000-000000000002';
  const source=post('one');
  let saved={id,status:'draft',notify:true,articles:[{title:'Original title',body:'Original source report for human review.',source:source.url,source_id:source.id,date:source.published_at,generation:'saved_article'}]};
  class AppError extends Error{constructor(message,status=400){super(message);this.status=status;}}
  const core={AppError,audit:async()=>{},admin:async()=> 'admin',sameOrigin:()=>{},rate:async()=>{},json:r=>r.json(),errorResponse:e=>Response.json({error:e.message},{status:e.status||500}),db:async(path,method='GET',body)=>{
    if(path.startsWith('igg_media?'))return[{id:photo}];
    if(path.startsWith('igg_issues?')){if(method==='PATCH'){saved={...saved,...structuredClone(body)};}return[structuredClone(saved)];}
    throw new Error('Unexpected table access');
  }};
  const load=loader({'@/lib/server/core':core,'@/lib/server/content':{},'@/lib/server/email':{},'@/lib/server/media':{}});
  const route=load('app/api/admin/route.ts');const call=body=>route.POST(new Request('https://test.invalid/api/admin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}));
  const edited={...saved.articles[0],title:'Reviewed heading',body:'A manually edited factual newsletter report.',media_ids:[photo],source_id:'tampered-id',date:'2026-09-01'};
  const response=await call({action:'issue.save',id,articles:[edited]});assert.equal(response.status,200);const result=(await response.json()).result;assert.equal(result.notify,false);assert.equal(result.status,'draft');assert.equal(result.articles[0].source_id,source.id);assert.equal(result.articles[0].date,source.published_at);assert.equal(result.articles[0].edited,true);assert.deepEqual(result.articles[0].media_ids,[photo]);
  assert.equal((await call({action:'issue.save',id,articles:[edited,edited]})).status,400);
  assert.equal((await call({action:'issue.approve',id})).status,400);
  saved.articles[0].generation='pending';assert.equal((await call({action:'issue.approve',id,reviewed:true})).status,400);
  saved.status='published';assert.equal((await call({action:'issue.save',id,articles:[edited]})).status,400);
});
