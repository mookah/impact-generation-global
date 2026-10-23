import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
import { PGlite } from '@electric-sql/pglite';
const require=createRequire(import.meta.url);
function load(file,mocks={}){
  const source=readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const compiled={exports:{}};
  new Function('require','module','exports',code)(id=>id==='server-only'?{}:id in mocks?mocks[id]:require(id),compiled,compiled.exports);
  return compiled.exports;
}
test('subscription API: valid, duplicate, confirmation, preferences, unsubscribe and provider failures',async()=>{
  const pg=new PGlite();const savedFetch=global.fetch;
  const settings={SITE_URL:'https://preview.example.org',RESEND_API_KEY:'test-provider-key',EMAIL_FROM:'Impact Test <test@example.org>',SUBSCRIBER_TOKEN_SECRET:'a-test-only-signing-key-with-at-least-32-bytes'};
  const attempts=[];let provider='accepted';
  try{
    await pg.exec('create role anon;create role authenticated;create role service_role;create schema storage;create table storage.buckets(id text primary key,name text,public boolean,file_size_limit integer,allowed_mime_types text[]);');
    await pg.exec(readFileSync(new URL('../supabase/migrations/20261023_content.sql',import.meta.url),'utf8').replace('create extension if not exists pgcrypto;',''));
    const realCore=load('lib/server/core.ts',{'next/headers':{}});
    const core={...realCore,env:name=>{if(!settings[name])throw new realCore.AppError(`Service configuration required: ${name}`,503);return settings[name];},origin:()=>settings.SITE_URL,rate:async()=>{}};
    core.rpc=async(name,b)=>{
      if(name==='igg_subscribe')return (await pg.query('select igg_subscribe($1,$2,$3) ok',[b.p_email,b.p_frequency,b.p_hash])).rows[0].ok;
      if(name==='igg_confirm')return (await pg.query('select igg_confirm($1) ok',[b.p_hash])).rows[0].ok;
      throw new Error('Unexpected RPC');
    };
    core.db=async(path,method='GET',body)=>{
      const [table,query]=path.split('?');assert.equal(table,'igg_subscribers');
      const params=new URLSearchParams(query);const bindings=[];const clauses=[];
      for(const [key,filter]of params){assert(['id','email','confirm_hash'].includes(key));assert(filter.startsWith('eq.'));bindings.push(filter.slice(3));clauses.push(`${key}=$${bindings.length}`);}
      const where=clauses.join(' and ');
      if(method==='PATCH'){
        const fields=Object.entries(body).map(([k,v])=>{assert(['status','confirm_hash','confirm_expires','frequency'].includes(k));bindings.push(v);return `${k}=$${bindings.length}`;});
        return (await pg.query(`update igg_subscribers set ${fields.join(',')} where ${where} returning *`,bindings)).rows;
      }
      return (await pg.query(`select * from igg_subscribers where ${where}`,bindings)).rows;
    };
    const email=load('lib/server/email.ts',{'./core':core});
    const route=load('app/api/subscription/route.ts',{'@/lib/server/core':core,'@/lib/server/email':email});
    global.fetch=async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');attempts.push(JSON.parse(options.body));if(provider==='rejected')return Response.json({error:'failure'},{status:503});if(provider==='unconfirmed')return Response.json({});return Response.json({id:`test-accepted-${attempts.length}`});};
    const post=body=>route.POST(new Request(settings.SITE_URL+'/api/subscription',{method:'POST',headers:{Origin:settings.SITE_URL,'Content-Type':'application/json'},body:JSON.stringify(body)}));
    const signup={email:'Member@Example.org',frequency:'monthly',consent:true};
    assert.equal((await post(signup)).status,200);assert.equal(attempts.length,1);
    const [member]=(await pg.query("select * from igg_subscribers where email='member@example.org'")).rows;
    assert.equal(member.status,'pending','provider acceptance does not opt people in');
    assert.equal((await post(signup)).status,200);assert.equal(attempts.length,1,'duplicates do not send another confirmation');
    assert.equal((await post({...signup,email:'bad-email'})).status,400);
    assert.equal((await post({...signup,consent:false})).status,400);
    const token=new URL(attempts[0].html.match(/href="([^"]+)"/)[1]).searchParams.get('token');assert(token);assert.notEqual(member.confirm_hash,token);
    assert.equal((await post({action:'confirm',token})).status,200);
    assert.equal((await post({action:'confirm',token})).status,400);
    const capability=email.managementToken(member.id);
    assert.equal((await post({action:'preferences',token:capability,frequency:'daily'})).status,200);
    assert.equal((await pg.query('select frequency from igg_subscribers where id=$1',[member.id])).rows[0].frequency,'daily');
    assert.equal((await post({action:'preferences',token:capability+'0',frequency:'immediate'})).status,403);
    assert.equal((await post({action:'preferences',token:capability,frequency:'unsubscribe'})).status,200);
    assert.equal((await pg.query('select status from igg_subscribers where id=$1',[member.id])).rows[0].status,'unsubscribed');
    const oneClick=await route.POST(new Request(`${settings.SITE_URL}/api/subscription?token=${capability}`,{method:'POST',body:'List-Unsubscribe=One-Click'}));assert.equal(oneClick.status,200);
    delete settings.RESEND_API_KEY;
    const missing=await post({...signup,email:'missing@example.org'});assert.equal(missing.status,503);assert(!(await missing.text()).includes('RATE_LIMIT_SALT'));assert.equal(attempts.length,1);
    assert.equal((await pg.query("select count(*)::int n from igg_subscribers where email='missing@example.org'")).rows[0].n,0);
    settings.RESEND_API_KEY='test-provider-key';provider='rejected';
    assert.equal((await post({...signup,email:'retry@example.org'})).status,502,'provider rejection is not success');
    provider='accepted';assert.equal((await post({...signup,email:'retry@example.org'})).status,200,'failed confirmation can be retried');
    provider='unconfirmed';assert.equal((await post({...signup,email:'unknown@example.org'})).status,502,'HTTP success without an acceptance ID is not success');
  }finally{global.fetch=savedFetch;await pg.close();}
});
test('rate limiting salts network identifiers without transmitting the salt',async()=>{
  const {randomBytes}=require('node:crypto');const salt=randomBytes(32).toString('hex');const envBefore={...process.env};const savedFetch=global.fetch;let payload;
  process.env.RATE_LIMIT_SALT=salt;process.env.SUPABASE_URL='https://database.example.org';process.env.SUPABASE_SERVICE_ROLE_KEY='test-service-key';
  try{
    global.fetch=async(_url,options)=>{payload=JSON.parse(options.body);return Response.json(true);};
    const core=load('lib/server/core.ts',{'next/headers':{}});
    await core.rate(new Request('https://preview.example.org/api/subscription',{headers:{'x-vercel-forwarded-for':'192.0.2.1'}}),'subscribe',5);
    assert.match(payload.p_key,/^[a-f0-9]{64}$/);assert(!JSON.stringify(payload).includes(salt));assert(!JSON.stringify(payload).includes('192.0.2.1'));
  }finally{global.fetch=savedFetch;for(const k of ['RATE_LIMIT_SALT','SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY']){if(envBefore[k]===undefined)delete process.env[k];else process.env[k]=envBefore[k];}}
});
