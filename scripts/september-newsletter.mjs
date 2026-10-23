// Local September draft repair. AI requires --ai; email and publication are always disabled.
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import ts from 'typescript';
import { renderToStaticMarkup } from 'react-dom/server';
process.loadEnvFile('.env.local');
const require=createRequire(import.meta.url);const modules=new Map();
function load(filename){
  const initial=resolve(filename);const path=[initial,`${initial}.ts`,`${initial}.tsx`].find(p=>existsSync(p));if(!path)throw new Error('Local module unavailable');if(modules.has(path))return modules.get(path).exports;
  const compiled={exports:{}};modules.set(path,compiled);
  const code=ts.transpileModule(readFileSync(path,'utf8'),{fileName:path,compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
  new Function('require','module','exports',code)(id=>id.endsWith('.module.css')?{default:new Proxy({},{get:(_,key)=>String(key)})}:id==='server-only'?{}:id==='next/headers'?{}:id.startsWith('@/')?load(id.slice(2)):id.startsWith('.')?load(resolve(dirname(path),id)):require(id),compiled,compiled.exports);
  return compiled.exports;
}
const originalFetch=global.fetch;let pages=0;let graphPosts=0;
global.fetch=async(url,options)=>{
  const host=new URL(String(url)).hostname;
  if((host==='api.openai.com'&&!process.argv.includes('--ai'))||host==='api.resend.com')throw new Error('Paid AI and email are disabled for this operation.');
  const response=await originalFetch(url,options);
  if(host==='graph.facebook.com'){pages++;const body=await response.clone().json();graphPosts+=(body.data||[]).length;}
  return response;
};
const core=load('lib/server/core.ts');const content=load('lib/server/content.ts');
try{
  const [before]=await core.db('igg_issues?slug=eq.september-2026');
  if(process.argv.includes('--inspect')){
    const range=content.monthRange('2026-09');
    const sources=await core.db(`igg_sources?published_at=gte.${range.start}&published_at=lt.${range.end}`);
    const articles=await core.db('igg_articles?source_id=not.is.null');
    const media=await core.db('igg_media?select=id,source_id,approved,consent');
    console.log(JSON.stringify({issue:{status:before?.status,reports:before?.articles.length},sources:sources.map(p=>({id:p.id,date:p.published_at,category:p.category,usableText:content.usableReportText(p.text),savedArticles:articles.filter(a=>a.source_id===p.id).map(a=>({id:a.id,status:a.status,usable:Boolean(a.title?.trim()&&a.body?.trim()),unchanged:a.source_hash===p.hash})),approvedPhotos:media.filter(m=>m.source_id===p.id&&m.approved&&m.consent).length})),reports:before?.articles.map(a=>({title:a.title,source:a.source,generation:a.generation,photos:a.media_ids?.length||(a.media_id?1:0)}))}));
  }else if(process.argv.includes('--preview')){
    // Isolated server-render checks: no real login or website authorization is changed.
    const Component=load('components/DynamicNewsletter.tsx').default;
    core.admin=async()=>{throw new core.AppError('Sign-in required',401);};
    const anonymous=renderToStaticMarkup(await Component({slug:'september-2026'}));
    core.admin=async()=> 'local-preview-render-test';
    const html=renderToStaticMarkup(await Component({slug:'september-2026'}));
    const reportCount=(html.match(/class="newsletter-report(?: |")/g)||[]).length;
    const previewWorks=html.includes('PRIVATE DRAFT')&&reportCount===before.articles.length;
    if(process.argv.includes('--html')){mkdirSync('.local-backups',{recursive:true});const css=readFileSync('components/DynamicNewsletter.module.css','utf8');const localHtml=html.replace('/logo-new.png',`data:image/png;base64,${readFileSync('public/logo-new.png').toString('base64')}`);writeFileSync('.local-backups/september-preview.html',`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>September draft preview</title><style>*{box-sizing:border-box}body{margin:0;font-family:Arial,sans-serif}figure{margin:0}a{color:inherit}button{font:inherit}${css}</style></head><body>${localHtml}<script>document.querySelector(".printButton")?.addEventListener("click",()=>window.print())</script></body></html>`);}
    const privateContentProtected=!anonymous.includes('PRIVATE DRAFT')&&anonymous.includes('awaiting editorial approval');
    console.log(JSON.stringify({previewWorks,reportsRendered:reportCount,privateContentProtected,status:before.status,notify:before.notify}));
    if(!previewWorks||!privateContentProtected)process.exitCode=1;
  }else if((process.argv.includes('--save')||process.argv.includes('--save-cached'))){
    const original=await core.db('igg_sources?published_at=gte.2026-08-31T22:00:00.000Z&published_at=lt.2026-09-30T22:00:00.000Z');
    mkdirSync('.local-backups',{recursive:true});
    writeFileSync(`.local-backups/september-before-${Date.now()}.json`,JSON.stringify({issue:before,sources:original}));
    const draft=await content.generateIssue('2026-09',!process.argv.includes('--save-cached'));
    const [saved]=await core.db('igg_issues?slug=eq.september-2026');
    const sources=await core.db('igg_sources?select=id&published_at=gte.2026-08-31T22:00:00.000Z&published_at=lt.2026-09-30T22:00:00.000Z');
    console.log(JSON.stringify({saved:true,pages,graphPosts,septemberPosts:sources.length,reports:saved.articles.length,status:saved.status,notify:saved.notify,retrieval:saved.retrieval_status,matchesDraft:saved.articles.length===draft.articles.length,generated:draft.generated_count,reused:draft.reused_count,pending:draft.pending_count,excluded:draft.skipped_count,missingPhotos:draft.missing_photo_count,warnings:draft.warnings}));
  }else{
    const range=content.monthRange('2026-09');
    const url=new URL(`https://graph.facebook.com/${process.env.FACEBOOK_GRAPH_VERSION||'v26.0'}/${process.env.FACEBOOK_PAGE_ID||'370924362777718'}/posts`);
    url.searchParams.set('fields','id,message,created_time,updated_time,permalink_url,full_picture,attachments{media_type,type}');url.searchParams.set('limit','100');url.searchParams.set('since',String(Date.parse(range.start)/1000));url.searchParams.set('until',String(Date.parse(range.end)/1000));
    const response=await fetch(url,{headers:{Authorization:`Bearer ${process.env.FACEBOOK_PAGE_ACCESS_TOKEN}`},signal:AbortSignal.timeout(20000)});const body=await response.json();
    let message=String(body.error?.message||'');for(const name of ['FACEBOOK_PAGE_ACCESS_TOKEN','SUPABASE_SERVICE_ROLE_KEY','RESEND_API_KEY','OPENAI_API_KEY']){if(process.env[name])message=message.replaceAll(process.env[name],'[redacted]');}
    console.log(JSON.stringify({existing:{status:before?.status,retrieval:before?.retrieval_status,reports:before?.articles.length},graph:{status:response.status,code:body.error?.code,message:firstSafe(message),firstPagePosts:body.data?.length,hasNext:Boolean(body.paging?.next)}}));
  }
}catch(error){console.log(JSON.stringify({saved:false,error:error instanceof core.AppError?error.message:'Operation failed; no credentials or provider payloads are logged.'}));process.exitCode=1;}
function firstSafe(message){return message.replace(/https?:\/\/\S+/g,'[provider URL]').slice(0,500);}
