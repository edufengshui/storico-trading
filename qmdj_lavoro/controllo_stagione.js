// S78 (26/11/2026, carta 18 USDCAD 25/11/2026): ZF controlla TY ma il TY e' in stagione e nutrito dal mese, lo ZF debole. Indicazioni INSIEME.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'},HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'};
const ELB={'亥':'W','子':'W','寅':'L','卯':'L','巳':'F','午':'F','申':'M','酉':'M','辰':'E','戌':'E','丑':'E','未':'E'},PBR={1:'子',2:'未申',3:'卯',4:'辰巳',6:'戌亥',7:'酉',8:'丑寅',9:'午'};
const vuoti=gz=>{const S='甲乙丙丁戊己庚辛壬癸';let i=0;for(;i<60;i++)if(S[i%10]===gz[0]&&BR[i%12]===gz[1])break;const s=Math.floor(i/10)*10;return [BR[(s+10)%12],BR[(s+11)%12]];};
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  let zf=null,ty=null;for(let k=1;k<=9;k++)if(k!==5&&c.palaces[k].zhiFu)zf=k;if(zf)for(let k=1;k<=9;k++)if(k!==5&&c.palaces[k].star===HOME[zf])ty=k;
  if(!zf||!ty||zf===ty||CTL[PEL[zf]]!==PEL[ty])continue;const me=ELB[c.mese[1]],seg=x.real===x.trend;
  const tyForte=PEL[ty]===me||GEN[me]===PEL[ty], zfDebole=!(PEL[zf]===me||GEN[me]===PEL[zf]);
  const f=Q.flussoQi(c)||{},nutr=!!f.arrivaTY&&!f.arrivaZF; const vu=vuoti(c.pilastro),tyVuoto=PBR[ty].split('').every(b=>vu.includes(b));
  add('0 ZF controlla TY (tutte)',x,seg);
  const n=tyForte+zfDebole+nutr+tyVuoto;add('1 indicazioni presenti: '+(n>=3?'3 o 4':n),x,seg);
  if(tyForte)add('2 TY in stagione nel mese',x,seg);if(tyForte&&zfDebole)add('2 TY in stagione e ZF debole',x,seg);if(nutr)add('2 il qi del mese arriva al TY e non allo ZF',x,seg);if(tyVuoto)add('2 TY tutto nel vuoto dell ora',x,seg);
  if(tyForte&&zfDebole&&nutr)add('3 TY in stagione + ZF debole + qi del mese al TY',x,seg);
  if(n>=3&&x.liv==='LI'&&x.liDir)add('4 con 3 o 4 indicazioni: Lio vince',x,x.liDir===x.real);}
const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(50),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]));}
