import {readFile,writeFile} from 'node:fs/promises';
// One-time readable formatting, without adding a formatting dependency.
const path='src/styles/global.css';
const css=await readFile(path,'utf8');
let out='',line='',depth=0,quote='',parentheses=0;
function flush(){if(line.trim())out+='  '.repeat(depth)+line.trim()+'\n';line='';}
for(let i=0;i<css.length;i++){
 const ch=css[i];
 if(quote){line+=ch;if(ch===quote&&css[i-1]!=='\\')quote='';continue;}
 if(ch==='"'||ch==="'"){quote=ch;line+=ch;continue;}
 if(ch==='(')parentheses++;if(ch===')')parentheses--;
 if(ch==='{'&&!parentheses){line+=' {';flush();depth++;}
 else if(ch==='}'&&!parentheses){flush();depth--;line='}';flush();if(!depth)out+='\n';}
 else if(ch===';'&&!parentheses){line+=ch;flush();}
 else if(ch==='\n'||ch==='\r'){line+=' ';}
 else line+=ch;
}
flush();await writeFile(path,out);
