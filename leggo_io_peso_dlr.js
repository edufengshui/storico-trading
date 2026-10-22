const LI=require('/home/claude/edufengshui/trading/leggo_io.js');
const A=require('./voci_2022_r.json').filter(x=>x.date>='2022'&&x.date<'2024'),B=require('./voci_2024_r.json').filter(x=>x.date>='2024'),L=require('./vivo_voci.json');
const lo=p=>Math.log(p/(1-p));
const mis=(set,f,s)=>{let n=0,ok=0,pip=0;const Y={};set.forEach(x=>{const r=LI.leggi(x);let z=0;r.metodi.forEach(m=>{if(!m.dir||m.p<=.5)return;const w=lo(m.p)*(m.metodo==='DLR'?f:1);z+=m.dir==='LONG'?w:-w;});if(Math.abs(z)<=s)return;n++;const g=(z>0)===(x.real==='LONG');ok+=g;pip+=g?Math.abs(x.move):-Math.abs(x.move);const y=x.date.slice(0,4);Y[y]=Y[y]||[0,0];Y[y][0]++;Y[y][1]+=g;});return {t:(100*ok/n).toFixed(1)+'% su '+n+' ('+Math.round(pip)+')',Y};};
console.log('peso DLR | 2022-23 | 2024-26 (per anno) | dal vivo 29/09-22/10');
for(const f of [1,0.75,0.5,0.25,0]){const b=mis(B,f,0.1);console.log(String(f).padEnd(5)+' | '+mis(A,f,0.1).t+' | '+b.t+' ['+Object.keys(b.Y).map(y=>y+' '+(100*b.Y[y][1]/b.Y[y][0]).toFixed(0)+'%').join(' ')+'] | '+mis(L,f,0.1).t);}
