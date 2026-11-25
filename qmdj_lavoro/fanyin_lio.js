// Lio nei giorni di fan yin totale (Edu 25/11/2026: "Se fan yin sta intorno al 50% non lo tradare!")
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥',ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend);
const OP={1:9,9:1,2:8,8:2,3:7,7:3,4:6,6:4},DH={Rest:1,Birth:8,Injury:3,Delusion:4,View:9,Death:2,Shocking:7,Open:6},SH={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9};
const vuoti=gz=>{const d=((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12;return BR[(d+10)%12]+BR[(d+11)%12];};
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';const G={};
const add=(k,x)=>{const w=x.liDir===x.real,p=w?Math.abs(x.move):-Math.abs(x.move);const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=w;g[2]+=p;};
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);let st=0,dr=0;
  for(let k=1;k<=9;k++){if(k===5)continue;const d=c.palaces[k];if(SH[d.star]===OP[k])st++;if(DH[d.doorName||d.door]===OP[k])dr++;}
  const T=st>=7&&dr>=7,fy=/fan yin: non segue/.test(Q.lettura(c,x.trend,'dshs').motivo||''),ov=vuoti(c.giorno).indexOf(c.pilastro[1])>=0;
  const ct=x.liDir===x.trend?'col trend':'contro trend';
  let zf=0;for(let k=1;k<=9;k++)if(k!==5&&c.palaces[k].zhiFu)zf=k;const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};const vg=vuoti(c.giorno);
  const toc=zf&&PB[zf].split('').some(b=>vg.indexOf(b)>=0),tut=zf&&PB[zf].split('').every(b=>vg.indexOf(b)>=0);
  if(toc){add('5 ZF toccato dai vuoti del giorno',x);add('5 ZF toccato dai vuoti del giorno | '+ct,x);add('5 ZF toccato dai vuoti del giorno | '+ct+' | '+x.liForza,x);}
  if(tut){add('6 ZF tutto vuoto (giorno)',x);add('6 ZF tutto vuoto (giorno) | '+ct,x);}
  if(!toc)add('7 ZF non toccato | '+ct,x);
  if(T&&toc){add('8 fan yin totale + ZF toccato',x);add('8 fan yin totale + ZF toccato | '+ct,x);}
  if((T||fy)&&toc){add('9 fan yin (totale o software) + ZF toccato',x);add('9 fan yin (totale o software) + ZF toccato | '+ct,x);}
  add('0 tutti i trade',x);
  if(T){add('1 fan yin TOTALE',x);add('1 fan yin TOTALE | '+ct,x);add('1 fan yin TOTALE | '+x.liForza,x);if(ov)add('1 fan yin TOTALE + ora vuota del giorno',x);}
  else add('2 senza fan yin totale',x);
  if(fy){add('3 fan yin del software',x);add('3 fan yin del software | '+ct,x);}
  if(T||fy)add('4 fan yin totale o del software',x);}
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(44),a[0],pct(a[1],a[0]),a[2],'|',b[0],pct(b[1],b[0]),b[2]);}
