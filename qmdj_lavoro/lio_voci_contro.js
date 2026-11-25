// Edu 25/11/2026 (EURJPY 06/11): "o il qimen interviene per aggiustare la decisione finale oppure bisogna capire perche' Lio ha
// sbagliato". Lio forte/media/debole: quante voci fuori da Lio gli sono contro (Semplificato, stelo, qimen unito)?
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend);
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';const G={};
const add=(k,x)=>{const w=x.liDir===x.real,p=w?Math.abs(x.move):-Math.abs(x.move);const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=w;g[2]+=p;};
const op=d=>d==='LONG'?'SHORT':'LONG';
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);const u=Q.unito(c,x.trend)||{};
  const se=x.SEMP===op(x.liDir),st=x.ST===op(x.liDir),qm=u.dir===op(x.liDir),dd=x.D===op(x.liDir);
  const n=(se?1:0)+(st?1:0)+(qm?1:0);const f=x.liForza;
  add(f+' | tutti',x);add(f+' | voci contro (Semp, stelo, qimen): '+n,x);
  if(se)add(f+' | Semplificato contro',x); if(st)add(f+' | stelo contro',x); if(qm)add(f+' | qimen contro',x); if(dd)add(f+' | sistema D contro',x);
  if(se&&qm)add(f+' | Semplificato E qimen contro',x);
  const fy=/fan yin/.test(u.motivo||'');if(fy&&qm)add(f+' | qimen contro per fan yin',x);}
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(48),String(a[0]).padStart(4),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(6),'|',String(b[0]).padStart(4),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(6));}
