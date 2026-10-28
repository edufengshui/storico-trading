// node ragiona.js SIS [k] -> lettura ragionata: pesi degli argomenti sul 2020-23, verifica 2024-26 e vivo
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', SIS=process.argv[2]||'zfty', K=+(process.argv[3]||30);
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const C=[]; for(const r of all){const p=r.date.split('-').map(Number);const L=Q.lettura(Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]),r.trend,SIS);
  if(!L) continue; const segueReale=(r.trend==='LONG')===(r.move>0); C.push({r,L,sr:segueReale});}
// pesi sul 2020-23
const FAM=process.env.FAM!=='0';
const fam=k=>!FAM?k:k.replace(/^base: /,'base: ').replace(/\(ora vuota: non generata\)|\(giorno vuoto: non generato\)/,'(vuoto)')
  .replace(/il giorno|l'ora|giorno|ora|trend|controparte|lo ZF|il TY|ZF|TY|Commander|commander/g,'X').replace(/\s+/g,' ').trim();
for(const x of C) for(const a of x.L.argomenti) a.k=fam(a.k);
const S={}; for(const x of C) if(x.r.per==='2020-23') for(const a of x.L.argomenti){const s=S[a.k]=S[a.k]||{n:0,w:0}; s.n++; if(a.v===x.sr) s.w++;}
const P={}; for(const k in S) P[k]=(S[k].w+0.5*K)/(S[k].n+K);
const lo=p=>Math.log(p/(1-p));
const z=(x,modo)=>{let t=0; for(const a of x.L.argomenti){const p=P[a.k]; if(p===undefined) continue; let w=lo(p); if(modo==='pos'&&w<0) w=0; t+=a.v?w:-w;} return t;};
const pnl=(x,seg)=>{const d=seg?x.r.trend:(x.r.trend==='LONG'?'SHORT':'LONG'); return (d==='LONG'?x.r.move:-x.r.move)-1.5;};
const st=a=>{if(!a.length)return '-'.padEnd(22);const w=a.filter(v=>v>0).length,s=a.reduce((p,q)=>p+q,0);return (a.length+' · '+(100*w/a.length).toFixed(1)+'% · '+(s>=0?'+':'')+s.toFixed(0)).padEnd(22);};
const riga=(nome,f)=>{const G={'2020-23':[],'2024-26':[],'vivo':[]}; for(const x of C){const s=f(x); if(s===null||s===undefined) continue; G[x.r.per].push(pnl(x,s));} console.log(nome.padEnd(26),Object.values(G).map(st).join(' '));};
riga('cascata (oggi)',x=>x.L.segue);
for(const modo of ['pos','tutto']){
  // soglia scelta sul 2020-23
  let best=null; for(let th=0;th<=1.2001;th+=0.05){let s=0; for(const x of C) if(x.r.per==='2020-23'){const v=z(x,modo); if(Math.abs(v)>th) s+=pnl(x,v>0);} if(!best||s>best.s) best={th,s};}
  riga(`ragionata ${modo} soglia 0`,x=>{const v=z(x,modo); return v===0?null:v>0;});
  riga(`ragionata ${modo} soglia ${best.th.toFixed(2)}`,x=>{const v=z(x,modo); return Math.abs(v)>best.th?v>0:null;});
}
if(process.env.PESI){ const arr=Object.keys(S).map(k=>[k,S[k].n,(100*S[k].w/S[k].n).toFixed(1),P[k].toFixed(3)]).sort((a,b)=>b[1]-a[1]); arr.slice(0,+process.env.PESI).forEach(a=>console.log(a.join(' | '))); }
