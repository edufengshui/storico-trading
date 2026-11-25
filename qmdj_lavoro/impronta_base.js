// S79 (Edu 25/11/2026): "Ogni carta ha un'impronta di base che dovrebbe reggere nonostante le variazioni del tempo. Se ZF controlla
// il TY e non c'e' un ponte, statisticamente dovrebbe seguire piu' spesso del contrario". Misura sulla SOLA carta (niente giorno/mese).
// Ponte = palazzo (non di ZF ne' di TY) dell'elemento di mezzo (generato da chi controlla, genera il controllato), non nel vuoto
// dell'ora, che porta lo Zhi Shi, lo stelo Wu nel cielo o la porta View (i ponti dettati che stanno dentro la carta).
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'},PBR={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};
const HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'},PS=[1,2,3,4,6,7,8,9];
function leggi(c){let zf=null,ty=null;for(const k of PS)if(c.palaces[k].zhiFu)zf=k;for(const k of PS)if(c.palaces[k].star===HOME[zf])ty=k;if(!zf||!ty)return null;
  const a=PEL[zf],b=PEL[ty];let rel=zf===ty?'0 stesso palazzo':a===b?'5 stesso elemento (paralleli)':CTL[a]===b?'1 ZF controlla TY':CTL[b]===a?'2 TY controlla ZF':GEN[a]===b?'3 ZF genera TY':'4 TY genera ZF';
  let ponte=null;if(rel[0]==='1'||rel[0]==='2'){const ctl=rel[0]==='1'?a:b,sub=rel[0]==='1'?b:a;let i=0;while(ST[i%10]+BR[i%12]!==c.pilastro)i++;const s=Math.floor(i/10)*10,vu=BR[(s+10)%12]+BR[(s+11)%12];
    const chi=[];for(const k of PS){if(k===zf||k===ty||GEN[ctl]!==PEL[k]||GEN[PEL[k]]!==sub)continue;if([...PBR[k]].every(x=>vu.includes(x)))continue;const d=c.palaces[k];
      if(d.zhiShi)chi.push('Zhi Shi');if(d.tiH==='戊')chi.push('Wu');if((d.doorName||d.door)==='View')chi.push('View');}
    ponte=chi.length?'con ponte':'SENZA ponte';}
  return {rel,ponte};}
const G={},GD={};const add=(k,x,sg)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=sg;g[2]+=sg?Math.abs(x.move):-Math.abs(x.move);(GD[k]=GD[k]||{})[x.date]=1;};
const carte={};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const r=leggi(c);if(!r)continue;const sg=x.real===x.trend;add('tutte',x,sg);add(r.rel,x,sg);if(r.ponte){add(r.rel+' · '+r.ponte,x,sg);(carte[r.rel+' · '+r.ponte]=carte[r.rel+' · '+r.ponte]||{})[c.jiu.dun+c.jiu.ju+c.pilastro]=1;}}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
console.log('gruppo'.padEnd(34),'2020-23: carte, segue, pip | 2024-26 | giorni | carte diverse');
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(34),String(a[0]).padStart(5),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(6),'|',String(b[0]).padStart(5),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(6),'|',Object.keys(GD[k]).length,'|',carte[k]?Object.keys(carte[k]).length:'');}
