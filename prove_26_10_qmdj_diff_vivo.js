global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥'; const [sis,opt]=process.argv.slice(2);
const V=JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json'));
for(const r of V){const p=r.date.split('-').map(Number), ms=Date.UTC(p[0],p[1]-1,p[2]), br=BR[((r.seed-1)%12+12)%12];
  const A=Q.lettura(Q.oraria(ms,br),r.trend,sis); eval(opt); const B=Q.lettura(Q.oraria(ms,br),r.trend,sis); eval(opt.replace(/=([^;]+);/g,'=undefined;'));
  if((A&&A.dir)!==(B&&B.dir)){const pa=A&&A.dir?(A.dir==='LONG'?r.move:-r.move)-1.5:0, pb=B&&B.dir?(B.dir==='LONG'?r.move:-r.move)-1.5:0;
    console.log([Math.round(pb-pa),r.cross,r.date,r.trend,Math.round(r.move),A.dir,B.dir,B.motivo.split(' · ').pop()].join(' | '));}}
