import FacebookVideoPreview from '@/components/FacebookVideoPreview';
import { db } from '@/lib/server/core';
import type { SourcePost } from '@/lib/content-types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import { approvedMedia } from '@/lib/server/public-content';
export const dynamic='force-dynamic';
export const metadata={title:'Event album'};
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const photos=(await approvedMedia()).filter(m=>(m.event||m.category).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')===slug);if(!photos.length)notFound();
  const ids=[...new Set(photos.map(p=>p.source_id).filter(Boolean))];
  const videos=ids.length?await db<SourcePost[]>(`igg_sources?id=in.(${ids.map(id=>encodeURIComponent(id!)).join(',')})&is_video=eq.true&limit=50`):[];
  return <section className="section shell"><Link href="/gallery/events" className="font-semibold text-brand-800">← All event albums</Link><h1 className="display my-8 text-4xl">{photos[0].event||photos[0].category}</h1><GalleryGrid includeExisting={false} extraImages={photos.map(m=>({src:`/api/media/${m.id}`,alt:m.caption,category:m.category}))}/>{!!videos.length&&<section className="mt-12"><h2 className="mb-5 text-2xl font-bold">Videos from these original updates</h2><div className="grid gap-5 sm:grid-cols-2">{videos.map(v=><FacebookVideoPreview key={v.id} url={v.url} title={v.category} imageUrl={v.image_url}/>)}</div></section>}</section>;
}
