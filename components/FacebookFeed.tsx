/* eslint-disable @next/next/no-img-element -- Expiring Facebook media is loaded directly with an error fallback. */
"use client";

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useId, useState } from 'react';
import FacebookVideoPreview from './FacebookVideoPreview';
import { facebookCardText, latestFacebookPosts } from '@/lib/facebook-display';
import type { FacebookFeed as Feed, ImpactUpdate } from '@/lib/facebook';

export function UpdateCard({post,pageName}:{post:ImpactUpdate;pageName:string}) {
  const [expanded,setExpanded]=useState(false);
  const [failedImage,setFailedImage]=useState<string|null>(null);
  const captionId=useId();
  const {headline,caption}=facebookCardText(post);
  const long=caption.length>220;
  const excerpt=long?`${caption.slice(0,220).replace(/\s+\S*$/,'')}\u2026`:caption;
  return <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-md">
    {post.isVideo?<FacebookVideoPreview url={post.videoUrl||post.url} sourceUrl={post.url} title={headline} imageUrl={post.imageUrl}/>:post.imageUrl&&failedImage!==post.imageUrl?<a href={post.url} target="_blank" rel="noopener noreferrer" aria-label={`View photograph on ${pageName}'s Facebook Page`} className="block overflow-hidden bg-cream-100"><img src={post.imageUrl} alt={`Facebook photograph accompanying: ${headline}`} width={640} height={400} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setFailedImage(post.imageUrl)} className="aspect-[16/10] h-auto w-full object-cover"/></a>:null}
    <div className="p-5 sm:p-6 lg:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold"><span className="rounded-full bg-gold-100 px-2.5 py-1 text-brand-900">{post.event}</span><time dateTime={post.publishedAt} className="text-slate-500">{new Date(post.publishedAt).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Africa/Lusaka'})}</time></div>
      <h3 className="mt-4 break-words text-lg font-bold leading-snug text-brand-950">{headline}</h3>
      {caption&&<p id={captionId} className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-slate-600">{expanded?caption:excerpt}</p>}
      {long&&<button type="button" aria-expanded={expanded} aria-controls={captionId} onClick={()=>setExpanded(!expanded)} className="mt-2 rounded text-sm font-semibold text-brand-800 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-800">{expanded?'Show less':'Read more'}</button>}
      <div className="mt-5 border-t border-slate-100 pt-4"><p className="flex items-start gap-2 text-[11px] leading-5 text-slate-500"><span aria-hidden="true" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[12px] font-extrabold leading-none text-white">f</span><span>{pageName} &middot; Official Facebook Page post</span></p><a href={post.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-bold leading-5 text-brand-800 hover:underline">View Original Facebook Post<ArrowUpRight aria-hidden="true" size={14}/></a></div>
    </div>
  </article>;
}

export default function FacebookFeed({pageUrl,pageName}:{pageUrl:string;pageName:string;height?:number}) {
  const [feed,setFeed]=useState<Feed|null>(null);
  const [failed,setFailed]=useState(false);
  useEffect(()=>{
    const controller=new AbortController();
    async function load(){try{const response=await fetch('/api/impact-updates',{signal:controller.signal});if(!response.ok)throw new Error();const data:Feed=await response.json();if(controller.signal.aborted)return;if(data.status==='connected'&&Array.isArray(data.posts)){setFeed(data);setFailed(false);}else setFailed(true);}catch{if(!controller.signal.aborted)setFailed(true);}}
    void load();const timer=setInterval(()=>void load(),600000);
    return()=>{controller.abort();clearInterval(timer);};
  },[]);
  const posts=latestFacebookPosts(feed?.posts||[]);
  return <section aria-label={`${pageName} Facebook Page posts`} className="min-w-0">
    {failed&&!posts.length?<div className="rounded-2xl border border-slate-200 bg-cream-100 p-6 text-sm leading-7"><p className="font-semibold text-brand-950">Stay connected with our community</p><p className="mt-2 text-slate-600">Facebook updates are temporarily unavailable here. You can still read the latest posts on our official Page.</p><a className="mt-4 inline-flex font-bold text-brand-800 underline" href={pageUrl} target="_blank" rel="noopener noreferrer">Visit our Facebook Page</a></div>:feed===null&&!failed?<div role="status" className="rounded-2xl border border-slate-200 bg-cream-100 p-6 text-sm text-slate-600">Loading the latest Page updates...</div>:!posts.length?<p className="rounded-2xl border border-slate-200 p-6 text-sm leading-7 text-slate-600">New Page updates will appear here. <a className="font-semibold text-brand-800 underline" href={pageUrl} target="_blank" rel="noopener noreferrer">Visit Facebook</a>.</p>:<div className="grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-1">{posts.map(post=><UpdateCard key={post.id} post={post} pageName={pageName}/>)}</div>}
    <Link href="/updates" className="btn btn-outline mt-5 w-full text-sm">View All Updates<ArrowUpRight aria-hidden="true" size={16}/></Link>
  </section>;
}
