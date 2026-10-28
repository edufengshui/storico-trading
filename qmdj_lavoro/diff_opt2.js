// node diff_opt2.js SIS 'global.X=..;' PERIODO -> carte cambiate dall'opzione (migliorate/peggiorate)
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥'; const [sis,opt,perq]=process.argv.slice(2);
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={}; const peg=[];
for(const r of all){const p=r.date.split('-').map(Number), ms=Date.UTC(p[0],p[1]-1,p[2]), br=BR[((r.seed-1)%12+12)%12];
  const A=Q.lettura(Q.oraria(ms,br),r.trend,sis); eval(opt); const B=Q.lettura(Q.oraria(ms,br),r.trend,sis); eval(opt.replace(/=([^;]+);/g,'=undefined;'));
  if((A&&A.dir)!==(B&&B.dir)){const pa=A&&A.dir?(A.dir==='LONG'?r.move:-r.move)-1.5:0, pb=B&&B.dir?(B.dir==='LONG'?r.move:-r.move)-1.5:0;
    const g=G[r.per]=G[r.per]||{mig:0,peg:0,pip:0}; if(pb>pa)g.mig++; else g.peg++; g.pip+=pb-pa;
    if(pb<pa && (!perq||r.per===perq)) peg.push([Math.round(pb-pa),r.cross,r.date,r.trend,Math.round(r.move),A.dir,B.dir]);}}
for(const p of ['2020-23','2024-26','vivo']) console.log(p, G[p]?`migliorate ${G[p].mig} · peggiorate ${G[p].peg} · ${Math.round(G[p].pip)} pip`:'-');
peg.sort((a,b)=>a[0]-b[0]); peg.slice(0,5).forEach(x=>console.log(x.join(' | ')));
