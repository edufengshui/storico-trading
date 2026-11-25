// Edu 25/11/2026: lo stelo del Commander nel palazzo dello ZF e' Jia, non si combina (QMDJ_COMB_JIA). Misura prima/dopo.
// Base: i trade di Lio (LI) del dump; conta se il verdetto del QMDJ (unito, ZFTY) ha il verso del mercato.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend);
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';const G={};
const add=(k,x,dir)=>{if(!dir)return;const w=dir===x.real,p=w?Math.abs(x.move):-Math.abs(x.move);const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=w;g[2]+=p;};
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
  global.QMDJ_COMB_JIA=false;const a=Q.unito(c,x.trend),az=Q.lettura(c,x.trend,'zfty');delete global.QMDJ_COMB_JIA;const b=Q.unito(c,x.trend),bz=Q.lettura(c,x.trend,'zfty');
  add('unito prima',x,a&&a.dir);add('unito dopo',x,b&&b.dir);add('zfty prima',x,az&&az.dir);add('zfty dopo',x,bz&&bz.dir);
  if((a&&a.dir)!==(b&&b.dir)){add('carte cambiate: prima',x,a&&a.dir);add('carte cambiate: dopo',x,b&&b.dir);} }
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(26),a[0],pct(a[1],a[0]),a[2],'|',b[0],pct(b[1],b[0]),b[2]);}
