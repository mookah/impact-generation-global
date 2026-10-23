import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const code=ts.transpileModule(readFileSync(new URL('../lib/facebook-display.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const compiled={exports:{}};
new Function('exports',code)(compiled.exports);
const {cleanFacebookCaption,facebookImageUrl,latestFacebookPosts,facebookCardText}=compiled.exports;
const post=(id,date,text='A verified ministry update.')=>({id,text,publishedAt:date,url:`https://www.facebook.com/posts/${id}`,imageUrl:null,isVideo:false,event:'School Ministry'});

test('sidebar shows three newest meaningful Page posts without duplicate IDs',()=>{
  const posts=[post('old','2026-09-01'),post('new','2026-10-20'),post('mid','2026-10-15'),post('new','2026-10-20','Edited original post.'),post('metadata','2026-10-22','WhatsApp Image 2026-10-22 at 08.00.jpg'),post('link','2026-10-23','https://share.google/example'),post('third','2026-10-10'),post('invalid','bad date')];
  const visible=latestFacebookPosts(posts);assert.deepEqual(visible.map(p=>p.id),['new','mid','third']);assert.equal(visible[0].text,'Edited original post.');
  assert.equal(latestFacebookPosts([{...posts[0],url:'javascript:alert(1)'}]).length,0);
});
test('presentation removes standalone file and WhatsApp metadata while retaining original facts',()=>{
  const source='School ministry in Chongwe\nC:\\Users\\person\\Pictures\\photo.jpg\nWhatsApp Image 2026-09-18 at 08.00.jpg\nIMG-20260918-WA0001.jpg\nhttps://wa.me/123\nWe met with students on 18 September.';
  assert.equal(cleanFacebookCaption(source),'School ministry in Chongwe\nWe met with students on 18 September.');
  assert.equal(facebookCardText(post('1','2026-09-18',source)).headline,'School ministry in Chongwe');
  assert.equal(facebookCardText(post('1','2026-09-18',source)).caption,'We met with students on 18 September.');
  assert.equal(cleanFacebookCaption('\u200eSent from \u200eWhatsApp\nwa.me/+123\n\nVerified school outreach.'),'Verified school outreach.');
  assert.equal(cleanFacebookCaption('public/images/photo.jpg\nfile:///var/mobile/newsletter.pdf'),'');
});
test('photo, video and text-only cards have factual fallbacks and reject invalid media',()=>{
  const photo={...post('photo','2026-10-20',''),imageUrl:'https://scontent.example.fbcdn.net/photo.jpg'};
  const video={...post('video','2026-10-19',''),isVideo:true};
  assert.equal(latestFacebookPosts([photo,video]).length,2);assert.equal(facebookCardText(photo).headline,'School Ministry photo');assert.equal(facebookCardText(video).headline,'School Ministry video');
  assert.equal(facebookImageUrl('https://facebook.com.attacker.invalid/image.jpg'),null);assert.equal(facebookImageUrl('/public/images/test.jpg'),null);assert.equal(facebookImageUrl('http://example.fbcdn.net/image.jpg'),null);
  assert.equal(facebookCardText(post('text','2026-10-20','Thank you to our partners.')).headline,'Thank you to our partners.');
});
