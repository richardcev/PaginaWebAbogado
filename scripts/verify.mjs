import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
const routes=['','contacto','derecho-administrativo','contratacion-publica','familia-ninez-adolescencia','derecho-constitucional'];
const titles=new Set(),heroes=new Set();
let references=0;
for(const route of routes){
 const html=await readFile(`dist/${route ? route+'/' : ''}index.html`,'utf8');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,`${route}: one H1`);
 const title=html.match(/<title>(.*?)<\/title>/)[1]; assert(!titles.has(title),'Unique page titles'); titles.add(title);
 assert(/<meta name="description" content="[^"]+"/.test(html),'Meta description');
 assert(/<meta property="og:title"/.test(html),'Open Graph');
 assert(html.includes('lang="es-EC"'),'Spanish language');
 const hero=html.match(/src="(\/images\/hero-[^"]+)"/)[1]; assert(!heroes.has(hero),'Different heroes'); heroes.add(hero);
 for(const match of html.matchAll(/(?:src|href|srcset)="(\/[^"#]*)"/g)){
  const ref=match[1]; const filename=ref.endsWith('/')?`${ref}index.html`:ref;
  await stat(`dist${filename}`); references++;
 }
 if(route==='contacto'){
  assert(html.includes('type="button">Enviar mensaje'),'No real form submission');
  assert(!/<form[^>]*action=/.test(html),'No form endpoint');
  assert.equal((html.match(/<label\b/g)||[]).length,5,'Five labelled fields');
 }
 console.log(`OK /${route}${route?'/':''}`);
}
await stat('dist/404.html');await stat('dist/sitemap.xml');await stat('dist/robots.txt');
console.log(`Verified 6 routes, ${references} local references, unique heroes and SEO, visual-only form.`);
