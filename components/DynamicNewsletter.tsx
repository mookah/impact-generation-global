/* eslint-disable @next/next/no-img-element -- Revocable media is served directly without an image optimizer cache. */
import Link from 'next/link';
import { isTrustedFacebookUrl } from '@/lib/facebook';
import styles from './DynamicNewsletter.module.css';
import { notFound } from 'next/navigation';
import { admin } from '@/lib/server/core';
import { approvedMedia, getIssue } from '@/lib/server/public-content';
import PrintButton from '@/app/newsletter/[slug]/PrintButton';
export default async function DynamicNewsletter({slug}:{slug:string}) {
  const issue=await getIssue(slug); let authenticated=false;
  if(issue?.status!=='published'){try{await admin();authenticated=true;}catch{ /* Draft content remains private. */ }}
  if(!issue&&!authenticated&&slug!=='september-2026')notFound();
  if(!issue||(issue.status!=='published'&&!authenticated))return <section className="section shell"><p className="text-xs font-bold uppercase text-brand-700">Newsletter archive</p><h1 className="display mt-3 text-4xl">{slug==='september-2026'?'September 2026':'Monthly newsletter'}</h1><p className="mt-6 max-w-2xl leading-7">This edition is being prepared from verified ministry updates and is awaiting editorial approval.</p><Link className="btn btn-primary mt-6" href="/newsletter">Browse published editions</Link></section>;
  const media=await approvedMedia();
  const reportPhotos=(report:typeof issue.articles[number])=>(report.media_ids??(report.media_id?[report.media_id]:[])).flatMap(id=>{const photo=media.find(m=>m.id===id&&m.approved&&m.consent);return photo?[photo]:[];});
  const cover=issue.articles.flatMap(reportPhotos)[0];
  const month=new Date(`${issue.month.slice(0,7)}-15T12:00:00Z`).toLocaleDateString('en-GB',{month:'long',year:'numeric',timeZone:'Africa/Lusaka'});
  return <main className={`newsletter-edition ${styles.site}`}>
    <div className={`newsletter-controls ${styles.toolbar}`}><Link href="/newsletter">← Newsletter archive</Link><PrintButton className={styles.printButton}/></div>
    <article className={styles.edition}>
      <header className={styles.cover}>
        <div className={styles.masthead}><img src="/logo-new.png" alt="Impact Generation Global logo" width="100" height="100"/><div><p>Impact Generation Global</p><span>Faith · Character · Dignity · Purpose</span></div></div>
        <div className={styles.coverTitle}><p className={styles.eyebrow}>From our ministry community · Zambia</p><h1>{month}<span>Ministry Newsletter</span></h1><div className={styles.goldRule}/><p className={styles.intro}>Welcome to our {month} edition. These reports bring together ministry updates shared through our community, with the original sources alongside each story. Thank you for reading and walking with us in prayer and partnership.</p></div>
        {cover?<figure className={styles.coverPhoto}><img src={`/api/media/${cover.id}`} alt={cover.caption}/><figcaption>{cover.caption}</figcaption></figure>:<div className={styles.coverNote}><span>THE MONTHLY EDITION</span><p>Stories with a source.<br/>A purpose we share.</p></div>}
        <div className={styles.coverBottom}><span>{issue.articles.length} ministry {issue.articles.length===1?'report':'reports'}</span><span>{month} · Zambia</span></div>
      </header>
      {issue.status!=='published'&&<aside className={styles.draft} role="note"><strong>PRIVATE DRAFT — human review required</strong><p>{issue.retrieval_status==='stored_facebook_sources'?'Built from previously stored Facebook sources. Refresh Facebook to verify month completeness.':'Review source facts, wording and photograph consent before approving.'} Subscriber notifications are OFF until explicitly selected at publication.</p>{issue.articles.some(a=>a.generation==='pending')&&<p>Some reports still contain original source text awaiting AI generation or editorial completion.</p>}</aside>}
      <nav className={styles.contents} aria-label="In this edition"><p className={styles.eyebrow}>In this edition</p>{issue.articles.map((a,i)=><a key={a.source_id||a.source} href={`#report-${i+1}`}><span>{String(i+1).padStart(2,'0')}</span><strong>{a.title}</strong><small>{a.category||'Community Updates'}</small></a>)}</nav>
      <div className={styles.reports}>{issue.articles.map((a,i)=>{
        const photos=reportPhotos(a);const sourceValid=isTrustedFacebookUrl(a.source)||/^\/news\/[a-z0-9-]+$/.test(a.source);
        return <section className={`newsletter-report ${styles.report}`} id={`report-${i+1}`} key={a.source_id||a.source}>
          <header className={styles.reportHeader}><span className={styles.reportNumber}>{String(i+1).padStart(2,'0')}</span><div><p className={styles.eyebrow}>{a.category||'Community Updates'}</p><h2>{a.title}</h2><p className={styles.sourceDate}>Source published {new Date(a.date).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'Africa/Lusaka'})}</p></div></header>
          <div className={styles.body}>{a.body.split(/\n\s*\n|\n/).map(p=>p.trim()).filter(Boolean).map((p,j)=><p key={j}>{p}</p>)}</div>
          {!!photos.length&&<div className={styles.photos}>{photos.map(photo=><figure key={photo.id}><img src={`/api/media/${photo.id}`} alt={photo.caption} loading="eager"/><figcaption>{photo.caption}</figcaption></figure>)}</div>}
          <div className={styles.reference}>{sourceValid?<a href={a.source} target="_blank" rel="noopener noreferrer">Read the original {a.source.startsWith('/news/')?'website story':'Facebook update'} ↗</a>:<span>Source link requires editorial review.</span>}{a.source_id&&<small>Facebook post {a.source_id}</small>}</div>
        </section>;
      })}</div>
      <footer className={styles.footer}><p className={styles.eyebrow}>Prayer. Partnership. Possibility.</p><h2>Walk alongside<br/>the next generation.</h2><p>Thank you for your prayers, generosity and partnership with Impact Generation Global. Connect with us to learn how you can take part.</p><div className={styles.footerLinks}><Link href="/donate">Give & support</Link><Link href="/contact">Become a partner</Link><Link href="/subscribe">Subscribe</Link></div><div className={styles.footerBottom}><span>Impact Generation Global · Zambia</span><span>{month}</span></div></footer>
    </article>
  </main>;
}
