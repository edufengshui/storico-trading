// cascata come conclusione + margine dagli argomenti (quanti a favore della conclusione meno quanti contro) + accordo fra metodi
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const C=[]; for(const r of all){const p=r.date.split('-').map(Number),ms=Date.UTC(p[0],p[1]-1,p[2]),b=BR[((r.seed-1)%12+12)%12];
  C.push({r,a:Q.lettura(Q.oraria(ms,b),r.trend,'dshs'),z:Q.lettura(Q.oraria(ms,b),r.trend,'zfty')});}
const marg=L=>{if(!L||L.segue===null)return null; let m=0; for(const a of L.argomenti) m+=a.v===L.segue?1:-1; return m;};
const pnl=(x,d)=>(d==='LONG'?x.r.move:-x.r.move)-1.5;
const st=a=>{if(!a.length)return '-'.padEnd(22);const w=a.filter(v=>v>0).length,s=a.reduce((p,q)=>p+q,0);return (a.length+' · '+(100*w/a.length).toFixed(1)+'% · '+(s>=0?'+':'')+s.toFixed(0)).padEnd(22);};
const riga=(nome,f)=>{const G={'2020-23':[],'2024-26':[],'vivo':[]}; for(const x of C){const d=f(x); if(!d) continue; G[x.r.per].push(pnl(x,d));} console.log(nome.padEnd(34),Object.values(G).map(st).join(' '));};
for(const s of ['a','z']){ const n=s==='a'?'DsHs':'ZFTY';
  riga(n+' cascata',x=>x[s]&&x[s].dir);
  for(const t of [0,1,2]) riga(n+' margine >= '+t,x=>{const m=marg(x[s]); return m!==null&&m>=t?x[s].dir:null;});
  riga(n+' margine <= 0 (dubbia)',x=>{const m=marg(x[s]); return m!==null&&m<=0?x[s].dir:null;});
}
const ins=x=>{const da=x.a&&x.a.dir, dz=x.z&&x.z.dir; if(da&&dz) return da===dz?da:null; return da||dz;};
riga('insieme (disaccordo = fermo)',ins);
riga('insieme + Wu/Birth non contrario',x=>{const d=ins(x); if(!d) return null; const wb=x.a&&x.a.wuBirth; return wb&&wb!==d?null:d;});
riga('insieme, margine somma >= 1',x=>{const d=ins(x); if(!d) return null; let m=0; for(const L of [x.a,x.z]) if(L&&L.dir===d) m+=marg(L); else if(L&&L.dir) m-=marg(L); return m>=1?d:null;});
