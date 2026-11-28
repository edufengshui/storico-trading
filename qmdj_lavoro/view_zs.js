// S81 (28/11/2026, Edu su GBPUSD 27/11/2026: "quello che conta di piu' e' View in quanto Zhi Shi che clasha la HS"): misura.
// Prima: ORARIO=full1h.json DUMPC=/tmp/dumpc.json node misura_vivo.js 2020-02-20 <oggi>.  Uso: node qmdj_lavoro/view_zs.js [/tmp/dumpc.json]
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const G={};const add=(k,x,ok,pip)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok?1:0;g[2]+=pip;};
for(const x of require(process.argv[2]||'/tmp/dumpc.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  window.QMDJ_BIL_VIEW_ZS=false;const b0=Q.bilancia(c,x.trend);window.QMDJ_BIL_VIEW_ZS=true;const b1=Q.bilancia(c,x.trend);if(!b0||!b1)continue;
  const mv=Number(x.move)||0, seg=x.real===x.trend, esito=d=>d===x.real?mv:-mv;
  if(b0.dir)add('tutte: bilancia PRIMA',x,b0.dir===x.real,esito(b0.dir)); if(b1.dir)add('tutte: bilancia DOPO',x,b1.dir===x.real,esito(b1.dir));
  if(!b1.voci.some(v=>/conta di piu/.test(v.t)))continue;
  add('View ZS clasha HS: il mercato segue il trend',x,seg,seg?mv:-mv);
  if(b0.dir)add('  li\': bilancia PRIMA',x,b0.dir===x.real,esito(b0.dir)); else add('  li\': bilancia prima FERMA',x,seg,0);
  if(b1.dir)add('  li\': bilancia DOPO',x,b1.dir===x.real,esito(b1.dir));
  if(b0.dir!==b1.dir)add('  carte che cambiano verdetto (dopo)',x,b1.dir?b1.dir===x.real:false,b1.dir?esito(b1.dir):0);
  if(x.liDir&&x.liv==='LI')add('  li\': Lio',x,x.liDir===x.real,esito(x.liDir));
}
const f=g=>g[0]?(100*g[1]/g[0]).toFixed(1).replace('.',',')+'% ('+g[0]+') '+(g[2]>0?'+':'')+g[2]:'-';
for(const k in G)console.log(k.padEnd(48),f(G[k][0]),' · ',f(G[k][1]));
