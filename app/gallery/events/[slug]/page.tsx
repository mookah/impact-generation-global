import Link from 'next/link';
import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import { approvedMedia } from '@/lib/server/public-content';
export const dynamic='force-dynamic';
export const metadata={title:'Event album'};
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const photos=(await approvedMedia()).filter(m=>(m.event||m.category).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')===slug);if(!photos.length)notFound();
  return <section className="section shell"><Link href="/gallery/events" className="font-semibold text-brand-800">← All event albums</Link><h1 className="display my-8 text-4xl">{photos[0].event||photos[0].category}</h1><GalleryGrid includeExisting={false} extraImages={photos.map(m=>({src:`/api/media/${m.id}`,alt:m.caption,category:m.category}))}/></section>;
}
