const A=require('./voci_2022.json'),B=require('./voci_2024.json');
const V=['TREND','PB','LY','AT','DLR','LETT','MT','CM','D','LYF','PBF','DLRF'];
const sg=d=>d==='LONG'?1:d==='SHORT'?-1:0;
const vec=x=>V.map(k=>sg(k==='TREND'?x.trend:x[k]));
// addestramento: 2022-23, voci per forma dai cataloghi 2020-21 (quindi mai viste)
const tr=A.filter(x=>x.date>='2022'&&x.date<'2024');
const acc={};V.forEach((k,i)=>{let n=0,ok=0;tr.forEach(x=>{const s=vec(x)[i];if(!s)return;n++;ok+=(s>0)===(x.real==='LONG');});acc[k]={n,p:ok/n};});
// regressione logistica
const w=V.map(()=>0);for(let it=0;it<400;it++){const g=V.map(()=>0);tr.forEach(x=>{const v=vec(x),y=x.real==='LONG'?1:0;const z=v.reduce((a,s,i)=>a+s*w[i],0),p=1/(1+Math.exp(-z));v.forEach((s,i)=>g[i]+=(y-p)*s);});w.forEach((_,i)=>w[i]+=0.5*g[i]/tr.length-0.001*w[i]);}
console.log('PESI (stimati sul 2022-23):');V.forEach((k,i)=>console.log('  '+k.padEnd(6)+' affidabile da solo '+(100*acc[k].p).toFixed(1)+'% su '+acc[k].n+' · peso '+w[i].toFixed(3)));
const nl=V.map(k=>{const p=acc[k].p;return p>0.5?Math.log(p/(1-p)):0;});
const prova=(nome,set,W2,soglia)=>{let n=0,ok=0,pip=0;set.forEach(x=>{const z=vec(x).reduce((a,s,i)=>a+s*W2[i],0);if(Math.abs(z)<=soglia)return;n++;const g=(z>0)===(x.real==='LONG');ok+=g;pip+=g?Math.abs(x.move):-Math.abs(x.move);});return nome+' '+(100*ok/n).toFixed(1)+'% su '+n+' ('+Math.round(pip)+' pip)';};
const te=B.filter(x=>x.date>='2024');  // voci per forma dai cataloghi 2020-23: mai viste
console.log('\nPROVA sul 2024-26 ('+te.length+' carte mai viste):');
for(const s of [0,0.1,0.2,0.3])console.log('  soglia '+s+': '+prova('regressione',te,w,s)+' · '+prova('pesi semplici',te,nl,s*3));
const base=k=>{let n=0,ok=0;te.forEach(x=>{const d=k==='TREND'?x.trend:x[k];if(!d)return;n++;ok+=d===x.real;});return k+' '+(100*ok/n).toFixed(1)+'%/'+n;};console.log('  voci da sole: '+V.map(base).join(' · '));
require('fs').writeFileSync('pesi_leggoio.json',JSON.stringify({V,w,acc}));
// scelta della variante SOLO sul 2022-23 (dove sono nati i pesi), poi prova su 2024-26 e dal vivo
const misura=(set,W2,s)=>{let n=0,ok=0,pip=0;set.forEach(x=>{const z=vec(x).reduce((a,v,i)=>a+v*W2[i],0);if(Math.abs(z)<=s)return;n++;const g=(z>0)===(x.real==='LONG');ok+=g;pip+=g?Math.abs(x.move):-Math.abs(x.move);});return {n,ok,pip,acc:n?ok/n:0};};
const varianti=[];for(const [nome,W2,k] of [['regressione',w,1],['pesi semplici',nl,3]])for(const s of [0,0.05,0.1,0.15,0.2,0.3,0.4])varianti.push({nome,W2,s:s*k,tr:misura(tr,W2,s*k)});
varianti.sort((a,b)=>b.tr.pip-a.tr.pip);const sc=varianti[0];
console.log('\nVARIANTE SCELTA sul 2022-23 (più pip): '+sc.nome+' soglia '+sc.s+' → 2022-23 '+(100*sc.tr.acc).toFixed(1)+'% su '+sc.tr.n+' ('+Math.round(sc.tr.pip)+' pip)');
const t=misura(te,sc.W2,sc.s);console.log('  2024-26: '+(100*t.acc).toFixed(1)+'% su '+t.n+' ('+Math.round(t.pip)+' pip)');
const L=require('./vivo_voci.json');const lv=misura(L,sc.W2,sc.s),l2=misura(L.filter(x=>x.date>='2026-10-17'),sc.W2,sc.s);
console.log('  dal vivo 29/09-22/10 (cataloghi fino al 28/09): '+(100*lv.acc).toFixed(1)+'% su '+lv.n+' ('+Math.round(lv.pip)+' pip)');
console.log('  dal vivo 19-20/10: '+(100*l2.acc).toFixed(1)+'% su '+l2.n+' ('+Math.round(l2.pip)+' pip)');
const bl=k=>{let n=0,ok=0,p=0;L.forEach(x=>{const d=k==='TREND'?x.trend:x[k];if(!d)return;n++;const g=d===x.real;ok+=g;p+=g?Math.abs(x.move):-Math.abs(x.move);});return k+' '+(100*ok/n).toFixed(0)+'%/'+n+' '+p;};
console.log('  voci da sole dal vivo: '+V.map(bl).join(' · '));
const pir=L.filter(x=>x.liv&&/^[0-9]+$/.test(x.liv));console.log('  piramide in uso dal vivo (cataloghi fino al 28/09): '+(100*pir.filter(x=>x.dirLiv===x.real).length/pir.length).toFixed(1)+'% su '+pir.length);
require('fs').writeFileSync('scelta_leggoio.json',JSON.stringify({V,W:sc.W2,s:sc.s,nome:sc.nome,acc}));
