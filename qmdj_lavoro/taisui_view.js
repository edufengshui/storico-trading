// Edu 25/11/2026: Tai Sui = stelo dell'anno. View nel palazzo del ramo dell'anno / dello stelo dell'anno: il cross sale?
// e "ZF generato dal Tai Sui e dal DS": il mercato segue? Base: tutti i giorni dei trade di Lio (LI) del dump, per cross.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.trend&&x.real);
const PBR={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';const G={};
const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok?1:0;};
const seen={};
for(const x of D){const key=x.cross+x.date;if(seen[key])continue;seen[key]=1;const o=O[key];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);let vw=0,st=0,rm=0;
  for(let k=1;k<=9;k++){if(k===5)continue;const d=c.palaces[k];if((d.doorName||d.door)==='View')vw=k;if(d.tiH===c.anno[0])st=k;if(PBR[k].indexOf(c.anno[1])>=0)rm=k;}
  const su=x.real==='LONG',seg=x.real===x.trend;
  add('0 tutte: il cross sale',x,su);
  if(vw===rm)add('1 View nel palazzo del RAMO dell\'anno: sale',x,su);
  if(vw===st)add('2 View nel palazzo dello STELO dell\'anno: sale',x,su);
  if(vw===st&&vw!==rm)add('3 View con lo stelo ma non col ramo: sale',x,su);
  for(const m of ['ramo','stelo']){global.QMDJ_TAISUI_DOVE=m;const z=Q.lettura(c,x.trend,'zfty');if(z&&z.zfAiuti)add('4 ZF aiutato da Tai Sui ('+m+') e DS: segue',x,seg);}
  delete global.QMDJ_TAISUI_DOVE;}
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(52),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]));}
