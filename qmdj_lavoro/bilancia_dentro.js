// Misura della bilancia dentro qmdj.js (Edu 25/11/2026). Base: i trade di Lio (livello LI) dello storico, due periodi.
// Prima: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi>
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend);
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';const G={},V={};
const add=(G,k,x)=>{const w=x.liDir===x.real,p=w?Math.abs(x.move):-Math.abs(x.move);const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=w;g[2]+=p;};
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);const b=Q.bilancia(c,x.trend);if(!b)continue;
  const pl=x.liForza==='forte'?2:1,L=b.long+(x.liDir==='LONG'?pl:0),S=b.short+(x.liDir==='SHORT'?pl:0),tot=L>S?'LONG':S>L?'SHORT':null;
  add(G,'0 tutti i trade di Lio',x);
  add(G,'1 solo QMDJ: '+(!b.dir?'pari o muta':b.dir===x.liDir?'per Lio':'contro Lio'),x);
  const d=(b.dir===x.liDir?1:-1)*Math.abs(b.long-b.short);
  add(G,'2 scarto QMDJ '+(d>=2?'+2 o piu per Lio':d===1?'+1 per Lio':d===0?' 0':d===-1?'-1 contro Lio':'-2 o piu contro Lio'),x);
  add(G,'3 con Lio dentro: '+(!tot?'pari':tot===x.liDir?'per Lio':'contro Lio'),x);
  add(G,'4 '+x.liForza+' | QMDJ '+(!b.dir?'pari':b.dir===x.liDir?'per':'contro'),x);
  for(const v of b.voci){ if(v.k.startsWith('arg:'))continue; const k=v.k+(v.dir?(v.dir===x.liDir?' | per Lio':' | contro Lio'):''); add(V,k,x);} }
const out=G=>{for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(52),String(a[0]).padStart(5),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(7),'|',String(b[0]).padStart(5),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(7));}};
out(G);console.log('--- voci dello stato dei palazzi (Lio vince)');out(V);
