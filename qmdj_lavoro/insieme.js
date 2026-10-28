global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={}, add=(k,p,v)=>((G[k]=G[k]||{})[p]=G[k][p]||[]).push(v); let incoer=0;
for(const r of all){const p=r.date.split('-').map(Number),ms=Date.UTC(p[0],p[1]-1,p[2]),br=BR[((r.seed-1)%12+12)%12];
  const a=Q.lettura(Q.oraria(ms,br),r.trend,'dshs'), b=Q.lettura(Q.oraria(ms,br),r.trend,'zfty');
  // verifica di isolamento: rileggere DsHs dopo ZFTY deve dare lo stesso risultato
  const a2=Q.lettura(Q.oraria(ms,br),r.trend,'dshs'); if((a&&a.dir)!==(a2&&a2.dir)) incoer++;
  const da=a&&a.dir, db=b&&b.dir, pnl=d=>(d==='LONG'?r.move:-r.move)-1.5;
  if(da&&db&&da===db){add('d'+'accordo',r.per,pnl(da));}
  else if(da&&db){add('disaccordo: DsHs',r.per,pnl(da));add('disaccordo: ZFTY',r.per,pnl(db));}
  else if(da){add('solo DsHs',r.per,pnl(da));} else if(db){add('solo ZFTY',r.per,pnl(db));}
  if(da) add('DsHs tutte',r.per,pnl(da)); if(db) add('ZFTY tutte',r.per,pnl(db));}
const st=x=>{if(!x||!x.length)return '-'.padEnd(22);const w=x.filter(v=>v>0).length,s=x.reduce((a,b)=>a+b,0);return (x.length+' · '+(100*w/x.length).toFixed(1)+'% · '+(s>=0?'+':'')+s.toFixed(0)).padEnd(22);};
for(const k of ['DsHs tutte','ZFTY tutte','daccordo','disaccordo: DsHs','disaccordo: ZFTY','solo DsHs','solo ZFTY']) console.log(k.padEnd(18),['2020-23','2024-26','vivo'].map(p=>st(G[k]&&G[k][p])).join(' '));
console.log('incoerenze isolamento:',incoer);
