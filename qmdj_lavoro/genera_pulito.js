// S79 (Edu 25/11/2026, USDCAD 05/11/2026: "ZF genera il TY"). Giornate PULITE: lo ZFTY dice "il giorno genera l'ora" (ZF genera TY)
// e non segue, nessun ponte, nessuna voce per "segue" nella bilancia. Il mercato non segue? E Lio, quando va col trend, cosa fa?
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'};
const G={};const add=(k,x,ok,pip)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;g[2]+=pip||0;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const f=Q.flussoQi(c);if(!f||f.zf===f.ty||GEN[PEL[f.zf]]!==PEL[f.ty])continue;const sg=x.real===x.trend,mv=Math.abs(x.move);
  add('1 ZF genera TY, tutte: NON segue',x,!sg);
  const z=Q.lettura(c,x.trend,'zfty')||{},b=Q.bilancia(c,x.trend);if(z.dir===x.trend||!z.dir||/ponte/.test(z.motivo||''))continue;
  add('2 lo ZFTY dice non segue, niente ponti: NON segue',x,!sg);
  if(b.voci.some(v=>v.dir===x.trend&&v.peso))continue;
  add('3 PULITE (nessuna voce per segue): NON segue',x,!sg);
  if(x.liv==='LI'&&x.liDir){const w=x.liDir===x.real;add('4 pulite, Lio '+(x.liDir===x.trend?'col trend (contro il qimen)':'contro il trend (col qimen)')+': Lio vince',x,w,w?mv:-mv);
    if(x.liDir===x.trend)add('5 pulite, Lio col trend, '+x.liForza+': Lio vince',x,w,w?mv:-mv);}}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(66),String(a[0]).padStart(4),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(6),'|',String(b[0]).padStart(4),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(6));}
