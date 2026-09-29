// Sharp is already supplied by Astro; no extra dependency is installed.
import sharp from 'sharp';
import {stat,writeFile,readFile} from 'node:fs/promises';
for(const [input,output,width] of [['retrato-original.jpg','retrato.webp',1000],['area-constitucional-original.jpg','area-constitucional.webp',700]]){
 await sharp(`public/images/${input}`).rotate().resize({width,withoutEnlargement:true}).webp({quality:83}).toFile(`public/images/${output}`);
 console.log(`${output}: ${Math.round((await stat(`public/images/${output}`)).size/1024)} KB`);
}
for(const name of ['inicio','contacto','administrativo','contratacion','familia','constitucional']){
 const path=`public/images/hero-${name}.webp`;
 const source=await readFile(path);
 await sharp(source).resize(720,1000,{fit:'cover',position:'centre'}).webp({quality:75}).toFile(`public/images/hero-${name}-mobile.webp`);
 const optimized=await sharp(source).resize({width:1680}).webp({quality:74}).toBuffer();
 await writeFile(path,optimized);
 console.log(`hero-${name}: ${Math.round(optimized.length/1024)} KB`);
}
