// S79 (25/11/2026): penalita' nel palazzo del TY (carta 10). Nei giorni in cui la voce scatta: il mercato segue il trend? Lio vince?
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;const b=Q.bilancia(c,x.trend);if(!b||!b.voci.some(v=>v.k==='penalita TY'))continue;
  add('penalita nel palazzo del TY: il mercato segue',x,x.real===x.trend); global.QMDJ_BIL_PENA=false;const b0=Q.bilancia(c,x.trend);delete global.QMDJ_BIL_PENA;
  if(b.dir)add('  bilancia con la penalita: giusta',x,b.dir===x.real); if(b0.dir)add('  bilancia senza: giusta',x,b0.dir===x.real);
  if(x.liv==='LI'&&x.liDir)add('  Lio vince',x,x.liDir===x.real);}
const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';for(const k in G){const [a,b]=G[k];console.log(k.padEnd(48),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]));}
