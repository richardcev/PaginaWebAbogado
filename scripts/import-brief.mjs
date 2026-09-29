import {readFile,writeFile} from 'node:fs/promises';
const brief=await readFile(process.argv[2],'utf8');
const clean=s=>s.replaceAll('**','').trim();
const specs=[
 {title:'Derecho administrativo',slug:'derecho-administrativo',icon:'building',asset:'administrativo',heading:'Una defensa técnica frente al poder público',description:'Asesoría en derecho administrativo en Ecuador: impugnación de actos, procedimientos sancionadores y defensa en procesos coactivos.'},
 {title:'Contratación pública',slug:'contratacion-publica',icon:'contract',asset:'contratacion',heading:'Respaldo jurídico en cada etapa de la contratación',description:'Asesoría en contratación pública en Ecuador: RUP, pliegos, ofertas, reclamos, ejecución contractual y defensa ante controversias.'},
 {title:'Familia, niñez y adolescencia',slug:'familia-ninez-adolescencia',icon:'family',asset:'familia',heading:'Protección jurídica para lo que más importa',description:'Asesoría en derecho de familia, niñez y adolescencia: divorcios, tenencia, visitas, alimentos y levantamiento de medidas cautelares.'},
 {title:'Derecho constitucional',slug:'derecho-constitucional',icon:'shield',asset:'constitucional',heading:'Una defensa comprometida con sus derechos',description:'Asesoría y patrocinio en derecho constitucional en Ecuador. Acciones de protección, garantías jurisdiccionales y derechos fundamentales.'},
];
for(const area of specs){
 const section=brief.split(`\r\n# ${area.title}\r\n`)[1].split('\r\n---')[0];
 const intro=section.split('## Introducción')[1].split('## Principales servicios brindados')[0];
 const services=section.split('## Principales servicios brindados')[1].split('## Cierre')[0];
 const closing=section.split('## Cierre')[1].split('Incluye un CTA')[0];
 area.intro=intro.trim().split(/\r?\n\s*\r?\n/).map(clean);
 area.services=services.trim().split(/\r?\n/).filter(s=>s.startsWith('- ')).map(s=>{const match=s.match(/^- \*\*(.*?):\*\*\s*(.*)/);return {title:match[1],text:match[2]}});
 area.closing=closing.trim().split(/\r?\n\s*\r?\n/).map(clean);
}
await writeFile('src/data/content.ts',`// Contenido profesional proporcionado por el titular.\nexport const areas = ${JSON.stringify(specs,null,2)};\n`);
console.log('Imported four practice areas from the supplied brief.');
