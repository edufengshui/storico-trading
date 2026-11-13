global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={}; const add=(k,per,ok,pp)=>{const g=((G[k]=G[k]||{})[per]=G[k][per]||[0,0,0]);g[0]++;if(ok)g[1]++;g[2]+=pp;};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 const res={}; for(const [sis,mode] of [['zfty','off'],['zfty','zfty'],['dshs','off'],['dshs','tutti']]){ global.QMDJ_ZS_GENERA_ZF=mode; const L=Q.lettura(c,r.trend,sis); res[sis+mode]=L&&L.dir; }
 for(const k in res){ const d=res[k]; if(!d) continue; const s=d==='LONG'?1:-1; add(k,r.per,r.move*s>0,r.move*s-1.5); }
 if(res.zftyoff!==res.zftyzfty){ const d=res.zftyzfty; if(d){const s=d==='LONG'?1:-1; add('cambiate in zfty',r.per,r.move*s>0,r.move*s-1.5);} }
 if(res.dshsoff!==res.dshstutti){ const d=res.dshstutti; if(d){const s=d==='LONG'?1:-1; add('cambiate in dshs',r.per,r.move*s>0,r.move*s-1.5);} }
}
for(const k in G) console.log(k.padEnd(20),['2020-23','2024-26','vivo'].map(p=>{const g=G[k][p];return g?g[0]+' '+(100*g[1]/g[0]).toFixed(1)+'% '+Math.round(g[2]):'-'}).join(' | '));
