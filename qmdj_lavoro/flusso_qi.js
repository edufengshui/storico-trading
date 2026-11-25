// S79 (Edu 25/11/2026): il flusso del qi come lettura generale. Chi viene nutrito dal qi del mese (ZF, TY, tutti e due, nessuno)
// e il mercato segue il trend? Attori di passaggio: ZF, Zhi Shi, TY (ATTORI=dshs: anche DS e HS).
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
if(process.env.ATTORI)global.QMDJ_FLUSSO_ATTORI=process.env.ATTORI;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const G={};const add=(k,x,sg)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=sg;g[2]+=sg?Math.abs(x.move):-Math.abs(x.move);};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const f=Q.flussoQi(c);if(!f||f.zf===f.ty)continue;const sg=x.real===x.trend;
  let k=f.arrivaZF&&f.arrivaTY?(f.viaTY.includes(f.zf)?'3 il qi passa dallo ZF e finisce sul TY':f.viaZF.includes(f.ty)?'4 il qi passa dal TY e finisce sullo ZF':'5 arriva a tutti e due per strade diverse'):f.arrivaZF?'1 nutre SOLO lo ZF':f.arrivaTY?'2 nutre SOLO il TY':'6 non arriva a nessuno dei due';
  add(k,x,sg);if(k[0]==='1'||k[0]==='2'){add(k+(f.pm===(k[0]==='1'?f.zf:f.ty)?' · e\' il palazzo del mese':' · per generazione'),x,sg);}}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(52),String(a[0]).padStart(4),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(6),'|',String(b[0]).padStart(4),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(6));}
