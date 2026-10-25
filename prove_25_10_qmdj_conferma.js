global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);const L=Q.lettura(c,r.trend);
  if(!L||!L.dir)continue; const pnl=(L.dir==='LONG'?r.move:-r.move)-1.5;
  for(const k of ['tutte',L.conferma===true?'confermate':L.conferma===false?'contraddette':'senza Wu/Birth']) ((G[k]=G[k]||{})[r.per]=G[k][r.per]||[]).push(pnl);}
const st=x=>{if(!x||!x.length)return '-';const w=x.filter(v=>v>0).length;return x.length+' · '+(100*w/x.length).toFixed(1)+'% · '+(x.reduce((a,b)=>a+b,0)>=0?'+':'')+x.reduce((a,b)=>a+b,0).toFixed(0);};
for(const k of ['tutte','confermate','contraddette','senza Wu/Birth']) console.log(k.padEnd(16),['2020-23','2024-26','vivo'].map(p=>p+': '+st(G[k][p])).join('   '));
const nc=[...['tutte']].length; 
