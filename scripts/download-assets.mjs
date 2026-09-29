import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('public/images', {recursive:true});
await mkdir('public/fonts', {recursive:true});
const origin = 'https://gersoncevallos.com/wp-content/uploads/';
const files = [
 ['logo.png',origin+'2025/01/gerson-apolo-pMesa-de-trabajo-2-e1736314257310.png'],
 ['retrato-original.jpg',origin+'2026/08/abogadocontratatcionpublica-1-scaled.jpg'],
 ['area-administrativo.jpg',origin+'2025/06/abogado-trabajando-en-un-documento-con-balanzas-de-justicia-300x210.jpg'],
 ['area-contratacion.jpg',origin+'2025/06/apreton-de-manos-de-negocios-asiaticos-300x200.jpg'],
 ['area-familia.jpg',origin+'2025/06/abogado-escala-justicia-300x200.jpg'],
 ['area-constitucional-original.jpg',origin+'2026/09/male-lawyer-working-with-law-book-legal-binding-unilateral-contract-multilateral-nonreciprocal-contract-default-obligation-power-attorney-defense-prescription-court-decree-scaled.jpg'],
 ...[
 ['inicio','1486406146926-c627a92ad1ab'],['contacto','1565347878188-d5a035536f0c'],['administrativo','1462396240927-52058a6a84ec'],['contratacion','1551975228-6457f423c925'],['familia','1765202709666-ac9c49a4bcc5'],['constitucional','1760940340180-2820345c2a40'],
 ].map(([name,id])=>[`hero-${name}.webp`,`https://images.unsplash.com/photo-${id}?fm=webp&fit=crop&w=1920&h=1200&q=80`])
];
async function download(url, path) {
 const res = await fetch(url); if(!res.ok) throw new Error(`${res.status}: ${url}`);
 await writeFile(path,Buffer.from(await res.arrayBuffer())); console.log(path);
}
await Promise.all(files.map(([name,url])=>download(url,`public/images/${name}`)));
for(const [family,name] of [['Golos+Text:wght@400..900','golos-latin'],['Poppins:wght@400','poppins-400'],['Poppins:wght@500','poppins-500']]) {
 const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}&display=swap`,{headers:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'}});
 if(!response.ok) throw new Error('Font CSS failed');
 const css=await response.text(); const matches=[...css.matchAll(/url\((https:[^)]+)\)/g)];
 await download(matches.at(-1)[1],`public/fonts/${name}.woff2`);
}
