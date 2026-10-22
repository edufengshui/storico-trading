// LEGGO IO per metodi: ogni metodo (LY, PB, DLR) pesa da solo i suoi argomenti, conclude, poi si mettono insieme le tre conclusioni
const A=require('./voci_2022_r.json'),B=require('./voci_2024_r.json'),L=require('./vivo_voci.json');
const FAM={LY:['LY','LETT','MT','CM','D','LYF'],PB:['PB','PBF'],DLR:['DLR','DLRF']};
const ROUTE={LY:'lySez',LETT:'lettGrad',DLR:'dlrVia'};
const CAT=['D','LYF','PBF','DLRF'];
const lo=p=>Math.log(p/(1-p));
const sh=(ok,n,p0,k)=>(ok+p0*k)/(n+k);
// affidabilita': voci di dottrina sul 2020-23, voci per forma sul 2022-23 (cataloghi 2020-21)
const trDott=A.filter(x=>x.date<'2024'),trCat=A.filter(x=>x.date>='2022'&&x.date<'2024');
const P={},PR={};
for(const f in FAM)for(const v of FAM[f]){const set=CAT.includes(v)?trCat:trDott;let n=0,ok=0;const r={};set.forEach(x=>{if(!x[v])return;n++;const g=x[v]===x.real;ok+=g;if(ROUTE[v]){const k=x[ROUTE[v]]||'—';r[k]=r[k]||[0,0];r[k][0]++;r[k][1]+=g;}});
 P[v]=sh(ok,n,.5,50);if(ROUTE[v]){PR[v]={};for(const k in r)PR[v][k]=sh(r[k][1],r[k][0],P[v],30);}}
const pv=(v,x)=>ROUTE[v]&&PR[v][x[ROUTE[v]]||'—']!==undefined?PR[v][x[ROUTE[v]]||'—']:P[v];
const famScore=(f,x)=>FAM[f].reduce((s,v)=>{if(!x[v])return s;const p=pv(v,x);return s+(p>.5?lo(p):0)*(x[v]==='LONG'?1:-1);},0);
// calibrazione di ogni metodo sul 2022-23: accuratezza per fascia di margine
const fasce=[0,.15,.3,.5,.8,99];const fascia=m=>fasce.findIndex((t,i)=>m>=t&&m<fasce[i+1]);
const CAL={};for(const f in FAM){const c=fasce.map(()=>[0,0]);trCat.forEach(x=>{const s=famScore(f,x);if(!s)return;const b=fascia(Math.abs(s));c[b][0]++;c[b][1]+=(s>0)===(x.real==='LONG');});CAL[f]=c.map(([n,ok])=>sh(ok,n,.5,20));}
const famP=(f,x)=>{const s=famScore(f,x);if(!s)return null;return {dir:s>0?'LONG':'SHORT',p:CAL[f][fascia(Math.abs(s))]};};
const finale=x=>{let z=0;for(const f in FAM){const r=famP(f,x);if(!r||r.p<=.5)continue;z+=lo(r.p)*(r.dir==='LONG'?1:-1);}return z;};
const mis=(set,s)=>{let n=0,ok=0,pip=0;set.forEach(x=>{const z=finale(x);if(Math.abs(z)<=s||!z)return;n++;const g=(z>0)===(x.real==='LONG');ok+=g;pip+=g?Math.abs(x.move):-Math.abs(x.move);});return {n,ok,pip,acc:n?ok/n:0};};
const f1=m=>(100*m.acc).toFixed(1)+'% su '+m.n+' ('+Math.round(m.pip)+' pip)';
console.log('AFFIDABILITA (stimata prima del 2024):');for(const v in P)console.log('  '+v.padEnd(5)+(100*P[v]).toFixed(1)+'%'+(PR[v]?' · vie: '+Object.keys(PR[v]).length:''));
console.log('CALIBRAZIONE dei metodi (2022-23, per fascia di margine):');for(const f in CAL)console.log('  '+f+': '+CAL[f].map(p=>(100*p).toFixed(0)+'%').join(' · '));
// metodo per metodo da solo
for(const f in FAM){const m=set=>{let n=0,ok=0;set.forEach(x=>{const r=famP(f,x);if(!r)return;n++;ok+=r.dir===x.real;});return (100*ok/n).toFixed(1)+'%/'+n;};console.log('metodo '+f+' da solo: 2022-23 '+m(trCat)+' · 2024-26 '+m(B.filter(x=>x.date>='2024'))+' · dal vivo '+m(L));}
// soglia scelta sul 2022-23 (piu' pip)
let best=null;for(const s of [0,.1,.2,.3,.4,.5,.6,.8]){const m=mis(trCat,s);if(!best||m.pip>best.m.pip)best={s,m};}
console.log('\nLEGGO IO (soglia scelta sul 2022-23: '+best.s+')');
const te=B.filter(x=>x.date>='2024');
for(const s of [0,.2,.4,.6,.8])console.log('  soglia '+s+': 2022-23 '+f1(mis(trCat,s))+' · 2024-26 '+f1(mis(te,s))+' · dal vivo '+f1(mis(L,s))+' · 19-20/10 '+f1(mis(L.filter(x=>x.date>='2026-10-17'),s)));
require('fs').writeFileSync('leggoio3_param.json',JSON.stringify({FAM,ROUTE,P,PR,CAL,fasce,soglia:best.s}));
