// Edu 25/11/2026 (AUDUSD 29/10): fan yin totale + "i vuoti del giorno" (ZF e ZS in Kun, toccato dai vuoti del giorno Shen You).
const s=require('fs').readFileSync(__dirname+'/prove_22_11/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const OP={1:9,9:1,2:8,8:2,3:7,7:3,4:6,6:4};const DH={Rest:1,Birth:8,Injury:3,Delusion:4,View:9,Death:2,Shocking:7,Open:6};const SH={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};const ST='甲乙丙丁戊己庚辛壬癸',BRR='子丑寅卯辰巳午未申酉戌亥';
const vuoti=gz=>{const d=((BRR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12;return BRR[(d+10)%12]+BRR[(d+11)%12];};
function tot(c){let st=0,dr=0;for(let k=1;k<=9;k++){if(k===5)continue;const d=c.palaces[k];if(SH[d.star]===OP[k])st++;if(DH[d.doorName||d.door]===OP[k])dr++;}return st>=7&&dr>=7;}
const G={};const add=(k,pe,ok,mv)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[pe];g[0]++;g[1]+=ok;g[2]+=mv;};
for(const r of rows){const c=r.ch;let zf=0,zs=0;for(let k=1;k<=9;k++){if(k===5)continue;if(c.palaces[k].zhiFu)zf=k;if(c.palaces[k].zhiShi)zs=k;}
  const vg=vuoti(c.giorno),vo=vuoti(c.pilastro);const toc=(p,v)=>p&&PB[p].split('').some(b=>v.indexOf(b)>=0);const tut=(p,v)=>p&&PB[p].split('').every(b=>v.indexOf(b)>=0);
  const segue=(r.trend==='LONG')===(r.mv>0)?1:0,pe=per(r),pip=segue?Math.abs(r.mv):-Math.abs(r.mv);const T=tot(c);
  const ov=vg.indexOf(c.pilastro[1])>=0; add('TUTTE: ramo dell ora '+(ov?'VUOTO del giorno':'non vuoto'),pe,segue,pip); if(T)add('fan yin totale: ramo dell ora '+(ov?'VUOTO del giorno':'non vuoto'),pe,segue,pip); if(T&&ov&&toc(zf,vg))add('fan yin totale + ora vuota + ZF toccato',pe,segue,pip);
  if(T){add('fan yin totale',pe,segue,pip);
    add('  ZF '+(toc(zf,vg)?'TOCCATO dai vuoti del giorno':'non toccato dai vuoti del giorno'),pe,segue,pip);
    if(tut(zf,vg))add('  ZF tutto vuoto (giorno)',pe,segue,pip);
    add('  ZF '+(toc(zf,vo)?'toccato dai vuoti dell ORA':'non toccato dai vuoti dell ora'),pe,segue,pip);
    if(toc(zf,vg)&&zf===zs)add('  ZF e ZS insieme, toccati dai vuoti del giorno',pe,segue,pip);}
  else{add('senza fan yin totale: ZF '+(toc(zf,vg)?'TOCCATO dai vuoti del giorno':'non toccato'),pe,segue,pip);}}
for(const k of Object.keys(G).sort())console.log(k.padEnd(58),G[k].map(g=>g[0]+' carte, segue '+pct(g[1],g[0])+', '+g[2]+' pip').join(' | '));
`);
