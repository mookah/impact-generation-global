import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';
const require=createRequire(import.meta.url);
function loadCore(cookies={get:()=>undefined}) {
  const code=ts.transpileModule(readFileSync(new URL('../lib/server/core.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const compiled={exports:{}};
  new Function('require','module','exports',code)(id=>id==='server-only'?{}:id==='next/headers'?{cookies:async()=>cookies}:require(id),compiled,compiled.exports);
  return compiled.exports;
}
test('Supabase REST and RPC use secret keys only as apikey; legacy JWT keys remain compatible',async()=>{
  const previous={key:process.env.SUPABASE_SERVICE_ROLE_KEY,url:process.env.SUPABASE_URL};const savedFetch=global.fetch;const calls=[];
  process.env.SUPABASE_URL='https://test-project.supabase.co';
  global.fetch=async(url,options)=>{calls.push({url,options});return Response.json([]);};
  try{
    const core=loadCore();
    process.env.SUPABASE_SERVICE_ROLE_KEY='sb_secret_test-only-not-a-real-key';
    await core.db('igg_issues?select=id&limit=1');await core.rpc('igg_rate',{p_key:'test',p_limit:1,p_seconds:60});
    for(const call of calls){assert.equal(call.options.headers.apikey,process.env.SUPABASE_SERVICE_ROLE_KEY);assert.equal(call.options.headers.Authorization,undefined);assert(!call.url.includes(process.env.SUPABASE_SERVICE_ROLE_KEY));}
    assert.equal(calls[1].options.method,'POST');
    process.env.SUPABASE_SERVICE_ROLE_KEY='legacyHeader.legacyPayload.legacySignature';
    await core.db('igg_issues?select=id&limit=1');
    assert.equal(calls.at(-1).options.headers.Authorization,`Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`);
    process.env.SUPABASE_SERVICE_ROLE_KEY='sb_secret_test.with.dots';
    assert.equal(core.supabaseHeaders().Authorization,undefined,'sb_ keys must never become JWT bearer tokens');
    global.fetch=async()=>new Response('provider response containing a secret',{status:401});
    await assert.rejects(()=>core.db('igg_issues?select=id&limit=1'),e=>e.status===503&&!e.message.includes('provider response'));
  }finally{global.fetch=savedFetch;if(previous.key===undefined)delete process.env.SUPABASE_SERVICE_ROLE_KEY;else process.env.SUPABASE_SERVICE_ROLE_KEY=previous.key;if(previous.url===undefined)delete process.env.SUPABASE_URL;else process.env.SUPABASE_URL=previous.url;}
});
test('API keys containing dots are still never sent as bearer tokens; legacy JWTs remain compatible',async()=>{
  const previous=process.env.SUPABASE_SERVICE_ROLE_KEY;const savedFetch=global.fetch;const calls=[];
  process.env.SUPABASE_URL='https://test-project.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY='sb_secret_part.one.two';
  global.fetch=async(url,options)=>{calls.push({url,options});return Response.json([]);};
  try{
    const core=loadCore();
    await core.db('igg_issues?select=id&limit=1');
    const headers=new Headers(calls[0].options.headers);
    assert.equal(headers.get('apikey'),'sb_secret_part.one.two');
    assert.equal(headers.get('authorization'),null,'a dotted sb_ key must not become a bearer token');
    assert.equal(core.supabaseHeaders('').Authorization,undefined);
    assert.equal(core.authHeaders('user.a.b').Authorization,'Bearer user.a.b');
    assert.equal(core.authHeaders('user.a.b').apikey,'sb_secret_part.one.two');
  }finally{global.fetch=savedFetch;if(previous===undefined)delete process.env.SUPABASE_SERVICE_ROLE_KEY;else process.env.SUPABASE_SERVICE_ROLE_KEY=previous;}
});
test('administrator sign-in uses the shared key headers without putting a secret in Authorization',async()=>{
  const source=readFileSync(new URL('../app/api/admin/session/route.ts',import.meta.url),'utf8');
  assert.match(source,/grant_type=password[\s\S]*?\.\.\.supabaseHeaders\(\)/);
  assert(!/apikey: env\('SUPABASE_SERVICE_ROLE_KEY'\)/.test(source));
  assert(!/Authorization: `Bearer \$\{env\('SUPABASE_SERVICE_ROLE_KEY'\)\}`/.test(source));
});
test('administrator verification sends the user JWT separately from either server key type',async()=>{
  const before={key:process.env.SUPABASE_SERVICE_ROLE_KEY,url:process.env.SUPABASE_URL,admins:process.env.ADMIN_EMAILS};const savedFetch=global.fetch;
  const userJwt='userHeader.userPayload.userSignature';
  process.env.SUPABASE_URL='https://test-project.supabase.co';process.env.ADMIN_EMAILS='admin@example.org';
  const core=loadCore({get:()=>({value:userJwt})});
  try{
    for(const key of ['sb_secret_test-only-not-real','legacyHeader.legacyPayload.legacySignature']){
      process.env.SUPABASE_SERVICE_ROLE_KEY=key;
      global.fetch=async(_url,options)=>{assert.equal(options.headers.apikey,key);assert.equal(options.headers.Authorization,`Bearer ${userJwt}`);return Response.json({email:'admin@example.org',email_confirmed_at:'2026-10-01T00:00:00Z'});};
      assert.equal(await core.admin(),'admin@example.org');
    }
  }finally{global.fetch=savedFetch;for(const [name,value]of Object.entries({SUPABASE_SERVICE_ROLE_KEY:before.key,SUPABASE_URL:before.url,ADMIN_EMAILS:before.admins})){if(value===undefined)delete process.env[name];else process.env[name]=value;}}
});
