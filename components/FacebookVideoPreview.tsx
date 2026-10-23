/* eslint-disable @next/next/no-img-element -- Expiring Facebook thumbnails use a direct image with fallback. */
"use client";
import { Play,ExternalLink,X } from 'lucide-react';
import { useEffect,useState } from 'react';
import { facebookImageUrl,facebookVideoUrl } from '@/lib/facebook-display';
import { isTrustedFacebookUrl } from '@/lib/facebook';
export default function FacebookVideoPreview({url,sourceUrl=url,title,imageUrl=null}:{url:string;sourceUrl?:string;title:string;imageUrl?:string|null}){
  const [show,setShow]=useState(false);const [loaded,setLoaded]=useState(false);const [failed,setFailed]=useState(false);const [posterFailed,setPosterFailed]=useState(false);
  const canonical=facebookVideoUrl(url);const original=isTrustedFacebookUrl(sourceUrl)?sourceUrl:null;const poster=facebookImageUrl(imageUrl);
  useEffect(()=>{if(!show||loaded)return;const timeout=setTimeout(()=>{setShow(false);setFailed(true);},12000);return()=>clearTimeout(timeout);},[show,loaded]);
  return <div className="overflow-hidden bg-brand-950 text-white">
    <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-brand-800 via-brand-950 to-slate-900">
      {poster&&!posterFailed&&<img src={poster} alt="" width={640} height={360} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={()=>setPosterFailed(true)} className="absolute inset-0 h-full w-full object-cover"/>}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-brand-950/10 to-transparent"/>
      {!show&&<div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-5 text-center">{canonical&&!failed?<button type="button" onClick={()=>{setLoaded(false);setShow(true);}} aria-label={`Play Facebook video: ${title}`} className="group rounded-full bg-white/15 p-3 ring-1 ring-white/40 backdrop-blur-sm"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-300 text-brand-950 shadow-xl transition-transform motion-safe:group-hover:scale-105"><Play fill="currentColor" size={25} aria-hidden="true"/></span></button>:original?<a href={original} target="_blank" rel="noopener noreferrer" className="rounded-full bg-gold-300 p-5 text-brand-950" aria-label={`Watch on Facebook: ${title}`}><ExternalLink size={25}/></a>:null}<span className="text-[10px] font-bold uppercase tracking-[.2em]">{failed?'Watch this video on Facebook':canonical?'Play video · Facebook':'Original Facebook video'}</span>{!poster&&<p className="max-w-xs text-xs leading-5 text-white/70">{title}</p>}</div>}
      {show&&canonical&&<><iframe title={title} src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(canonical)}&show_text=false&autoplay=false&auto_play=false`} className={`absolute inset-0 h-full w-full border-0 bg-transparent ${loaded?'':'opacity-0'}`} onLoad={()=>setLoaded(true)} onError={()=>{setShow(false);setFailed(true);}} allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin"/>{!loaded&&<p role="status" className="absolute inset-0 flex items-center justify-center bg-brand-950/50 text-xs">Loading the official Facebook player…</p>}<button type="button" aria-label="Close Facebook player" onClick={()=>{setShow(false);setFailed(true);}} className="absolute right-2 top-2 rounded-full bg-white p-2 text-brand-950 shadow"><X size={17}/></button></>}
    </div>
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-4 py-3 text-[10px]"><span className="font-bold uppercase tracking-widest text-white/70">Official Facebook video</span>{original&&<a href={original} target="_blank" rel="noopener noreferrer" className="font-bold text-gold-200 underline">Watch on Facebook ↗</a>}{show&&<p className="w-full leading-5 text-white/70">Playback depends on Facebook permissions and your browser. If it is restricted, close the player and use the original link.</p>}</div>
  </div>;
}
