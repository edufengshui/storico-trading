// S79 (Edu 25/11/2026, USDCHF 12/10/2023: "Ren del mese non fa da ponte?"). ZF e TY in controllo; lo stelo del mese sta nel cielo
// (primo o secondo stelo) del palazzo dell'elemento di mezzo, non vuoto. Senza altri ponti nel motivo dello ZFTY. Vince il controllato?
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'},PBR={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};
const HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'},PS=[1,2,3,4,6,7,8,9];
const vuoti=gz=>{let i=0;while(ST[i%10]+BR[i%12]!==gz)i++;const s=Math.floor(i/10)*10;return BR[(s+10)%12]+BR[(s+11)%12];};
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  let zf=null,ty=null;for(const k of PS)if(c.palaces[k].zhiFu)zf=k;for(const k of PS)if(c.palaces[k].star===HOME[zf])ty=k;if(!zf||!ty)continue;
  const zc=CTL[PEL[zf]]===PEL[ty],tc=CTL[PEL[ty]]===PEL[zf];if(!zc&&!tc)continue;const ctl=zc?zf:ty,sub=zc?ty:zf,vu=vuoti(c.pilastro)+vuoti(c.giorno),ms=c.mese[0];
  let dove=null;for(const k of PS){if(k===zf||k===ty||GEN[PEL[ctl]]!==PEL[k]||GEN[PEL[k]]!==PEL[sub])continue;if([...PBR[k]].every(q=>vu.includes(q)))continue;const d=c.palaces[k];if(d.tiH===ms)dove='primo stelo';else if(d.ti2H===ms)dove=dove||'secondo stelo';}
  const z=Q.lettura(c,x.trend,'zfty')||{},altri=/ponte/.test(z.motivo||''),sg=x.real===x.trend,nome=(zc?'ZF controlla TY':'TY controlla ZF');
  // col ponte vince il controllato: se ZF controlla -> non segue; se TY controlla -> segue
  if(dove){add(nome+' | stelo del mese ponte ('+dove+')'+(altri?', con altri ponti':', SOLO lui')+': vince il controllato',x,zc?!sg:sg);add(nome+' | stelo del mese ponte, tutti: vince il controllato',x,zc?!sg:sg);}
  else if(!altri)add(nome+' | nessun ponte: vince il controllato',x,zc?!sg:sg);}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(88),String(a[0]).padStart(4),pct(a[1],a[0]).padStart(6),'|',String(b[0]).padStart(4),pct(b[1],b[0]).padStart(6));}
