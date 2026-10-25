global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
for (const flag of [true,false]) { global.QMDJ_PROSSIMO=flag; const G={};
  for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]); if(c.pilastro[0]!=='癸')continue; const L=Q.lettura(c,r.trend);
    if(!L||!L.dir)continue; (G[r.per]=G[r.per]||[]).push((L.dir==='LONG'?r.move:-r.move)-1.5);}
  const st=x=>{if(!x)return '-';const w=x.filter(v=>v>0).length;const s=x.reduce((a,b)=>a+b,0);return x.length+' · '+(100*w/x.length).toFixed(1)+'% · '+(s>=0?'+':'')+s.toFixed(0);};
  console.log((flag?'prossimo Commander':'Commander attuale ').padEnd(20),['2020-23','2024-26','vivo'].map(p=>p+': '+st(G[p])).join('   ')); }
