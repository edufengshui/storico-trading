// Simula regole d'uscita sui trade (direzione gia' decisa) con le barre orarie.
// 23/10/2026 sera: le barre hanno massimo e minimo veri (h/l, aggiorna_storico HL). Con hl=true stop e obiettivi si
// controllano sul massimo e sul minimo della barra, prima il lato sfavorevole (conservativo: se nella stessa ora si
// toccano stop e obiettivo, conta lo stop), eseguiti esattamente al livello (niente slittamento, spread escluso).
// Con hl=false il vecchio controllo sulle chiusure orarie.
const D='/root/storico-trading';const fs=require('fs');
const H=JSON.parse(fs.readFileSync(D+'/full1h.json')).crosses;const O=JSON.parse(fs.readFileSync(D+'/orario_live.json'));
const BARS={};for(const c in H){const g={};const add=b=>{const d=b.t.slice(0,10);(g[d]=g[d]||{})[+b.t.slice(11,13)]=b;};H[c].forEach(add);(O[c]||[]).forEach(b=>{const d=b.t.slice(0,10);if(!g[d]||!g[d][+b.t.slice(11,13)])add(b);});BARS[c]=g;}
const pipf=c=>/JPY$/.test(c)?100:10000;
function percorso(c,d){const g=BARS[c]&&BARS[c][d];if(!g||!g[0]||!g[21])return null;const o=g[0].o,p=[];for(let h=0;h<=21;h++)if(g[h])p.push({h,c:g[h].c,hi:g[h].h!=null?g[h].h:Math.max(g[h].o,g[h].c),lo:g[h].l!=null?g[h].l:Math.min(g[h].o,g[h].c)});return {o,p};}
function esito(path,dir,c,reg,hl){const s=dir==='LONG'?1:-1,f=pipf(c);let be=false;
 for(const b of path.p){const pip=s*(b.c-path.o)*f;
  if(hl){const peg=(s>0?b.lo-path.o:path.o-b.hi)*f,mig=(s>0?b.hi-path.o:path.o-b.lo)*f;
   if(reg.ora!=null&&b.h>=reg.ora)return pip;
   if(reg.stop&&peg<=-reg.stop)return -reg.stop;
   if(be&&peg<=0)return 0;
   if(reg.tp&&mig>=reg.tp)return reg.tp;
   if(reg.be&&mig>=reg.be)be=true;
   continue;}
  if(reg.ora!=null&&b.h>=reg.ora)return pip;
  if(reg.stop&&pip<=-reg.stop)return pip;
  if(reg.tp&&pip>=reg.tp)return pip;
  if(reg.be&&pip>=reg.be)be=true;
  if(be&&pip<=0)return pip;}
 return s*(path.p[path.p.length-1].c-path.o)*f;}
const REG=[['tenere fino alle 21 (oggi)',{}],['uscita alle 12',{ora:12}],['uscita alle 16',{ora:16}],
 ...[20,30,50,80].map(x=>['stop '+x,{stop:x}]),...[20,30,50,80,120].map(x=>['obiettivo '+x,{tp:x}]),
 ['stop 30 / obiettivo 60',{stop:30,tp:60}],['stop 50 / obiettivo 100',{stop:50,tp:100}],['stop 40 / obiettivo 40',{stop:40,tp:40}],['stop 80 / obiettivo 50',{stop:80,tp:50}],
 ['pareggio dopo +20',{be:20}],['pareggio dopo +30',{be:30}],['pareggio dopo +30, stop 60',{be:30,stop:60}]];
module.exports={percorso,esito,REG};
if(require.main===module){const trades=JSON.parse(fs.readFileSync(process.argv[2]));const sets={};for(const t of trades){(sets[t.set]=sets[t.set]||[]).push(t);}
 for(const sn in sets){const L=sets[sn].map(t=>({t,p:percorso(t.cross,t.date)})).filter(x=>x.p);console.log('\n'+sn+' — '+L.length+' trade');
  for(const hl of [false,true]){console.log('  -- '+(hl?'MASSIMI E MINIMI VERI':'chiusure orarie (vecchio)'));
  for(const [nm,r] of REG){let tot=0,w=0,dd=0,run=0,worst=0;for(const x of L){const v=esito(x.p,x.t.dir,x.t.cross,r,hl);tot+=v;w+=v>0;run+=v;if(run>dd)dd=run;worst=Math.min(worst,run-dd);}
   console.log('  '+nm.padEnd(30)+(100*w/L.length).toFixed(1).padStart(5)+'% vinti  '+((tot>0?'+':'')+Math.round(tot)).padStart(7)+' pip  media '+(tot/L.length).toFixed(1).padStart(5)+'  peggior calo '+Math.round(worst));}}}}
