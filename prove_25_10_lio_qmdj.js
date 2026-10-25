global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const D=JSON.parse(fs.readFileSync('/home/claude/qm/dump_2020_26.json'));
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const O={}; for(const c in H) for(const x of H[c]) if(x.t.slice(11,13)==='00') O[c+'|'+x.t.slice(0,10)]=x.o;
const f3=p=>{const d=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return d.slice(0,Math.abs(Number(p))<1?2:3);};
const out=[];
for(const r of D){ if(!r.trend||!r.real) continue;
  let seed=null; const lv=(reg[r.date]||[]).find(y=>y.cross===r.cross); if(lv) seed=lv.seed; else if(O[r.cross+'|'+r.date]!=null) seed=parseInt(f3(O[r.cross+'|'+r.date]),10);
  if(!seed) continue;
  const p=r.date.split('-').map(Number); const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]); const L=Q.lettura(c,r.trend);
  out.push({cross:r.cross,date:r.date,trend:r.trend,move:(r.real==='LONG'?1:-1)*Math.abs(r.move),lio:r.liDir,forza:r.liForza,q:L&&L.dir,conf:L&&L.conferma});}
fs.writeFileSync('/home/claude/qm/lio_qmdj.json',JSON.stringify(out)); console.log(out.length);
