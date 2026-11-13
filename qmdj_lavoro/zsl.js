global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('storico.json')).concat(JSON.parse(fs.readFileSync('vivo.json')));const out=[];
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 global.QMDJ_ZS_GENERA_ZF='off'; const L0=Q.lettura(c,r.trend,'zfty'); global.QMDJ_ZS_GENERA_ZF='zfty'; const L1=Q.lettura(c,r.trend,'zfty');
 if(!L1||!L1.dir||(L0&&L0.dir===L1.dir)) continue; const s=L1.dir==='LONG'?1:-1;
 out.push([r.move*s,r.date,r.cross,r.trend,r.move,r.seed,(L0&&L0.motivo)||'']);}
out.sort((a,b)=>a[0]-b[0]); for(const o of out.slice(0,12)) console.log(o.join(' | '));
