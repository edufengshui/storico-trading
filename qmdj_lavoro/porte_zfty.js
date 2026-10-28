// node porte_zfty.js SIS -> esito della lettura secondo la porta nel palazzo ZF/TY (o DS/HS)
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', SIS=process.argv[2]||'zfty';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={}; const add=(k,per,v)=>((G[k]=G[k]||{})[per]=G[k][per]||[]).push(v);
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);const L=Q.lettura(c,r.trend,SIS);
  if(!L||!L.dir)continue; const pnl=(L.dir==='LONG'?r.move:-r.move)-1.5, g=L.giornoOra;
  const dz=(c.palaces[g.palGiorno].doorName||c.palaces[g.palGiorno].door), dt=(c.palaces[g.palOra].doorName||c.palaces[g.palOra].door);
  add('tutte',r.per,pnl);
  add('ZF '+dz,r.per,pnl); add('TY '+dt,r.per,pnl);
  const zd=dz==='Death', td=dt==='Death'; add(zd&&td?'Death: entrambi':zd?'Death: solo ZF':td?'Death: solo TY':'Death: nessuno',r.per,pnl);}
const st=x=>{if(!x||!x.length)return '-'.padEnd(20);const w=x.filter(v=>v>0).length,s=x.reduce((a,b)=>a+b,0);return (x.length+' · '+(100*w/x.length).toFixed(1)+'% · '+(s>=0?'+':'')+s.toFixed(0)).padEnd(20);};
for(const k of Object.keys(G).sort()) console.log(k.padEnd(18),['2020-23','2024-26','vivo'].map(p=>st(G[k][p])).join(' '));
