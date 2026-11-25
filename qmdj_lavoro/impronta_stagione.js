// S79 (Edu 25/11/2026, "Fai cosi'"): l'impronta di base della carta (ZF contro TY) divisa per la stagione del mese.
// Forte = il palazzo e' 旺 o 相 nel mese (stesso elemento del ramo del mese, o generato da lui); debole = gli altri tre casi.
// Ponte come in impronta_base.js (Zhi Shi, Wu nel cielo o View nel palazzo dell'elemento di mezzo, non nel vuoto dell'ora).
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'},PBR={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};
const BEL={'子':'W','亥':'W','寅':'L','卯':'L','巳':'F','午':'F','申':'M','酉':'M','辰':'E','戌':'E','丑':'E','未':'E'};
const HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'},PS=[1,2,3,4,6,7,8,9];
const forte=(k,mb)=>{const p=PEL[k],m=BEL[mb];return p===m||GEN[m]===p;};
const G={};const add=(k,x,sg)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=sg;g[2]+=sg?Math.abs(x.move):-Math.abs(x.move);};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  let zf=null,ty=null;for(const k of PS)if(c.palaces[k].zhiFu)zf=k;for(const k of PS)if(c.palaces[k].star===HOME[zf])ty=k;if(!zf||!ty||zf===ty)continue;
  const a=PEL[zf],b=PEL[ty],rel=a===b?'5 paralleli':CTL[a]===b?'1 ZF controlla TY':CTL[b]===a?'2 TY controlla ZF':GEN[a]===b?'3 ZF genera TY':'4 TY genera ZF';
  let ponte='';if(rel[0]==='1'||rel[0]==='2'){const ctl=rel[0]==='1'?a:b,sub=rel[0]==='1'?b:a;let i=0;while(ST[i%10]+BR[i%12]!==c.pilastro)i++;const s=Math.floor(i/10)*10,vu=BR[(s+10)%12]+BR[(s+11)%12];let n=0;
    for(const k of PS){if(k===zf||k===ty||GEN[ctl]!==PEL[k]||GEN[PEL[k]]!==sub)continue;if([...PBR[k]].every(q=>vu.includes(q)))continue;const d=c.palaces[k];if(d.zhiShi||d.tiH==='戊'||(d.doorName||d.door)==='View')n++;}
    ponte=n?' con ponte':' senza ponte';}
  const mb=c.mese[1],fz=forte(zf,mb),ft=forte(ty,mb),sg=x.real===x.trend;
  add(rel+ponte+' | ZF '+(fz?'forte':'debole')+', TY '+(ft?'forte':'debole'),x,sg);add(rel+ponte+' | tutte',x,sg);}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(58),String(a[0]).padStart(4),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(6),'|',String(b[0]).padStart(4),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(6));}
