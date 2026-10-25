// node diff_opt.js 'global.X=..;' -> carte 2024-26 cambiate dall'opzione, peggiori prime
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥'; const opt=process.argv[2]||'';
const S=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).filter(r=>r.date>='2024');
const out=[]; let tot=0;
for(const r of S){const p=r.date.split('-').map(Number), ms=Date.UTC(p[0],p[1]-1,p[2]), br=BR[((r.seed-1)%12+12)%12];
  const A=Q.lettura(Q.oraria(ms,br),r.trend); eval(opt); const B=Q.lettura(Q.oraria(ms,br),r.trend); eval(opt.replace(/=([^;]+);/g,'=undefined;'));
  if((A&&A.dir)!==(B&&B.dir)){const pa=A&&A.dir?(A.dir==='LONG'?r.move:-r.move)-1.5:0, pb=B&&B.dir?(B.dir==='LONG'?r.move:-r.move)-1.5:0; tot+=pb-pa; out.push([Math.round(pb-pa),r.cross,r.date,r.trend,Math.round(r.move),A&&A.dir,B&&B.dir]);}}
out.sort((a,b)=>a[0]-b[0]); console.log('cambiate',out.length,'diff',Math.round(tot),'migliorate',out.filter(x=>x[0]>0).length,'peggiorate',out.filter(x=>x[0]<0).length);
out.slice(0,6).forEach(x=>console.log(x.join(' | ')));
