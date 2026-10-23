/* eslint-disable @next/next/no-img-element -- Revocable media is served directly without an image optimizer cache. */
import Link from 'next/link';
import { approvedMedia } from '@/lib/server/public-content';
export const dynamic='force-dynamic';
export const metadata={title:'Event photo albums',description:'Approved photographs organized by program and event.',alternates:{canonical:'/gallery/events'}};
export default async function Page(){
 const photos=await approvedMedia(); const albums=[...new Set(photos.map(m=>m.event||m.category))];
 return <section className="section shell"><Link href="/gallery" className="font-semibold text-brand-800">? Main gallery</Link><h1 className="display mt-6 text-4xl text-brand-950">Event photo albums</h1><p className="mt-4 text-slate-600">Approved ministry photographs, organized by event and program.</p><div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{albums.map(name=>{const images=photos.filter(m=>(m.event||m.category)===name);const slug=name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');return <Link className="card card-hover overflow-hidden" key={name} href={`/gallery/events/${slug}`}><img src={`/api/media/${images[0].id}`} alt={images[0].caption} loading="lazy" className="aspect-video w-full object-cover"/><div className="p-5"><h2 className="text-xl font-bold">{name}</h2><p className="mt-2 text-sm">{images.length} photographs ?</p></div></Link>;})}</div>{!photos.length&&<p className="card mt-8 p-6">Event albums will appear after photographs have been reviewed and approved. <Link href="/gallery" className="underline">Browse our existing gallery</Link>.</p>}</section>;
}
