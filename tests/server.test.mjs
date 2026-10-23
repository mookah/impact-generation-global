import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function load(file, mocks={}) {
  const source=readFileSync(new URL(`../${file}`,import.meta.url),'utf8');
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const compiled={exports:{}};
  new Function('require','module','exports',code)(id=>id==='server-only'?{}:id in mocks?mocks[id]:require(id),compiled,compiled.exports);
  return compiled.exports;
}
test('Facebook pagination uses trusted endpoints, local month boundaries and unique post IDs',async()=>{
  const calls=[];const writes=[];const originalFetch=global.fetch;
  const core={AppError:class extends Error{},env:()=> 'TEST_TOKEN',hash:t=>t,rpc:async()=>{},audit:async()=>{},db:async(path,method,body)=>{writes.push({path,method,body});return [];}};
  const fb=load('lib/facebook.ts');const content=load('lib/server/content.ts',{'@/lib/facebook':fb,'./core':core});
  assert.deepEqual(content.monthRange('2026-09'),{start:'2026-08-31T22:00:00.000Z',end:'2026-09-30T22:00:00.000Z'});
  assert.throws(()=>content.monthRange('2026-13'));
  const post={id:'370924362777718_1',message:'Verified outreach',created_time:'2026-09-10T12:00:00+0000',updated_time:'2026-09-11T12:00:00+0000',permalink_url:'https://www.facebook.com/1'};
  global.fetch=async(url,options)=>{calls.push({url:String(url),options});return Response.json(calls.length===1?{data:[post,{...post,id:'outside',created_time:'2026-10-01T00:00:00+0000'}],paging:{next:'https://attacker.invalid/?access_token=SECRET',cursors:{after:'cursor-1'}}}:{data:[{...post,message:'Edited verified outreach'}]});};
  try{
    const result=await content.syncFacebook('2026-09');assert.equal(result.length,1);assert.equal(result[0].text,'Edited verified outreach');
    assert(calls.every(c=>new URL(c.url).hostname==='graph.facebook.com'));assert(calls.every(c=>!c.url.includes('TEST_TOKEN')));assert.equal(calls[1].options.headers.Authorization,'Bearer TEST_TOKEN');assert.equal(new URL(calls[1].url).searchParams.get('after'),'cursor-1');assert.equal(writes.length,1);
    writes.length=0;global.fetch=async()=>new Response('provider secret error',{status:403});
    await assert.rejects(()=>content.syncFacebook('2026-09'),e=>!e.message.includes('secret'));assert.equal(writes.length,0,'failed retrieval does not save an incomplete month');
  }finally{global.fetch=originalFetch;}
});
test('server authorization and subscription capabilities reject tampering',async()=>{
 const core=load('lib/server/core.ts',{'next/headers':{cookies:async()=>({get:()=>undefined})}});
 await assert.rejects(()=>core.admin(),e=>e.status===401);
 assert.throws(()=>core.sameOrigin(new Request('https://example.org/api/admin',{headers:{origin:'https://attacker.invalid'}})),e=>e.status===403);
 const email=load('lib/server/email.ts',{'./core':{...core,env:()=> 'test-secret-used-only-in-tests'}});
 const id='00000000-0000-4000-8000-000000000001';const token=email.managementToken(id);
 assert.equal(email.managementId(token),id);assert.throws(()=>email.managementId(token+'0'));assert.throws(()=>email.normalizeEmail('bad\r\nBcc:a@example.org'));
 assert.equal(email.normalizeEmail('  Person@Example.org  '),'person@example.org');
 const response=core.errorResponse(new Error('access_token=NEVER_DISCLOSE'));assert.equal(response.status,503);assert(!(await response.text()).includes('NEVER_DISCLOSE'));
});
