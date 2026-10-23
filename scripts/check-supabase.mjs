// Read-only connection check. Never prints credentials, URLs, or database rows.
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import ts from 'typescript';

const missing=['SUPABASE_URL','SUPABASE_SERVICE_ROLE_KEY'].filter(name=>!process.env[name]);
if(missing.length){console.log(JSON.stringify({connected:false,missing}));process.exitCode=2;}
else{
  const require=createRequire(import.meta.url);
  const code=ts.transpileModule(readFileSync(new URL('../lib/server/core.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const compiled={exports:{}};
  new Function('require','module','exports',code)(id=>id==='server-only'?{}:id==='next/headers'?{}:require(id),compiled,compiled.exports);
  const originalFetch=global.fetch;let httpStatus=null;
  global.fetch=async(...args)=>{const response=await originalFetch(...args);httpStatus=response.status;return response;};
  try{
    await compiled.exports.db('igg_issues?select=id&limit=0');
    console.log(JSON.stringify({connected:true,httpStatus,readOnly:true,rowsRequested:0,keyFormat:process.env.SUPABASE_SERVICE_ROLE_KEY.startsWith('sb_secret_')?'secret':'legacy_or_other'}));
  }catch{
    console.log(JSON.stringify({connected:false,httpStatus,readOnly:true,message:'Check the configured Supabase URL, server key, permissions and migration.'}));process.exitCode=1;
  }finally{global.fetch=originalFetch;}
}
