import assert from 'node:assert/strict';
const base=(process.env.SMOKE_BASE_URL||'http://localhost:3001').replace(/\/$/,'');
const results=await Promise.all(['/', '/admin', '/blog', '/newsletter', '/newsletter/august-2026', '/newsletter/september-2026', '/subscribe', '/subscribe/confirm', '/subscribe/preferences', '/gallery', '/gallery/events', '/events', '/sitemap.xml', '/robots.txt'].map(async path=>{
 const r=await fetch(base+path);const text=await r.text();assert.equal(r.status,200,path);
 if(path==='/newsletter/september-2026'){assert(text.includes('awaiting editorial approval'));assert(!text.includes('PRIVATE DRAFT'));}
 if(path==='/subscribe')assert(text.includes('Email frequency'));
 if(path==='/robots.txt')assert(text.includes('Disallow: /admin'));
 return {path,status:r.status};
}));
const privateData=await fetch(base+'/api/admin');assert.equal(privateData.status,401);assert(!JSON.stringify(await privateData.json()).includes('subscribers'));
const forged=await fetch(base+'/api/admin',{method:'POST',headers:{Origin:'https://attacker.invalid','Content-Type':'application/json'},body:JSON.stringify({action:'sync'})});assert.equal(forged.status,403);
const cron=await fetch(base+'/api/cron');assert.equal(cron.status,401);
const source=await fetch(base+'/api/impact-updates');assert.equal(source.status,200);const text=await source.text();assert(!/access_token|Bearer|EAA[A-Za-z0-9]{30,}/.test(text));
console.log(JSON.stringify({pages:results,privateAdmin:privateData.status,forgedMutation:forged.status,unauthorizedCron:cron.status,secretLeak:false},null,2));
