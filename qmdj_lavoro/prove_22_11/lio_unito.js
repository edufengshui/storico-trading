global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend&&x.date<='2026-10-16');
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';const G={};
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);const u=Q.unito(ch,x.trend);
  const win=x.liDir===x.real,pip=win?Math.abs(x.move):-Math.abs(x.move);const k=!u.dir?'3 muto':u.dir===x.liDir?'1 d accordo':'2 contro';
  for(const kk of [k,k+' | '+x.liForza,k+' | '+(x.liDir===x.trend?'Lio col trend':'Lio contro trend')]){const g=(G[kk]=G[kk]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=win;g[2]+=pip;}}
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(34),a[0],pct(a[1],a[0]),a[2],'|',b[0],pct(b[1],b[0]),b[2]);}
