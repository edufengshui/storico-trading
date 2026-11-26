// S78 (26/11/2026, Edu: "Hai messo insieme le tre condizioni oppure fai sempre le statistiche su una singola?"): le tre indicazioni
// della carta 17 INSIEME (direzionale timely sullo ZF; TY drenato da View; autopenalita' Chen sul TY) e la bilancia per margine.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'};
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;const b=Q.bilancia(c,x.trend);if(!b)continue;
  let zf=null,ty=null,vw=null;for(let k=1;k<=9;k++){if(k===5)continue;if(c.palaces[k].zhiFu)zf=k;if((c.palaces[k].doorName||c.palaces[k].door)==='View')vw=k;}
  if(zf)for(let k=1;k<=9;k++)if(k!==5&&c.palaces[k].star===HOME[zf])ty=k;
  const dz=b.voci.some(v=>v.k==='direzionale ZF'),ap=b.voci.some(v=>v.k==='autopenalita TY'),dr=!!(ty&&vw&&ty!==vw&&zf!==ty&&GEN[PEL[ty]]===PEL[vw]);
  const n=dz+ap+dr, seg=x.real===x.trend;
  add('1 quante delle tre: '+n,x,seg);
  if(dz&&dr)add('2 direzionale ZF + TY drenato da View',x,seg);if(dz&&ap)add('2 direzionale ZF + autopenalita TY',x,seg);if(dr&&ap)add('2 TY drenato da View + autopenalita TY',x,seg);
  if(dr)add('3 solo: TY drenato da View',x,seg);
  if(b.dir){const m=Math.abs(b.long-b.short);add('4 bilancia giusta, margine '+(m>=3?'3 o piu':m),x,b.dir===x.real);
    if(x.liv==='LI'&&x.liDir){add('5 Lio, qimen '+(b.dir===x.liDir?'d accordo':'contro')+' con margine '+(m>=2?'2 o piu':'1'),x,x.liDir===x.real);}}
  else if(x.liv==='LI'&&x.liDir)add('5 Lio, qimen fermo',x,x.liDir===x.real);}
const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(50),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]));}
