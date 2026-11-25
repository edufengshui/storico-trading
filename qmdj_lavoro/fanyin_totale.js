// Fan yin totale (Edu 25/11/2026, AUDUSD 29/10: "E' un fan yin totale"): stelle E porte nel palazzo di fronte al loro.
// Base: tutti i lun-ven dallo storico orario (carta del seme), come zf_wu.js. Misura: il mercato segue il trend?
const s=require('fs').readFileSync(__dirname+'/prove_22_11/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const OP={1:9,9:1,2:8,8:2,3:7,7:3,4:6,6:4};const DH={Rest:1,Birth:8,Injury:3,Delusion:4,View:9,Death:2,Shocking:7,Open:6};const SH={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9};
function tipo(c){let st=0,dr=0,sm=0;for(let k=1;k<=9;k++){if(k===5)continue;const d=c.palaces[k];if(SH[d.star]===OP[k])st++;if(DH[d.doorName||d.door]===OP[k])dr++;if(d.tiH===c.palaces[OP[k]].diH)sm++;}
  return {stelle:st>=7,porte:dr>=7,steli:sm>=6};}
const G={};const add=(k,pe,ok,mv)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[pe];g[0]++;g[1]+=ok;g[2]+=mv;};
for(const r of rows){const t=tipo(r.ch);const segue=(r.trend==='LONG')===(r.mv>0)?1:0;const pe=per(r);const pip=segue?Math.abs(r.mv):-Math.abs(r.mv);
  const z=Q.lettura(r.ch,r.trend,'dshs');
  add('tutte le carte',pe,segue,pip);
  if(t.stelle&&t.porte)add('fan yin TOTALE (stelle e porte)',pe,segue,pip);
  else if(t.stelle)add('fan yin solo delle stelle',pe,segue,pip);
  else if(t.porte)add('fan yin solo delle porte',pe,segue,pip);
  const fy=/fan yin: non segue/.test(z.motivo||'');if(fy)add('fan yin del software (steli cielo/terra)',pe,segue,pip);
  if(fy&&t.stelle&&t.porte)add('totale + steli',pe,segue,pip);
  if(fy&&!(t.stelle&&t.porte))add('steli senza il totale',pe,segue,pip);
  if(t.stelle&&t.porte&&!fy)add('totale senza gli steli (il software non lo vede)',pe,segue,pip);}
for(const k of Object.keys(G))console.log(k.padEnd(50),G[k].map(g=>g[0]+' carte, segue '+pct(g[1],g[0])+', '+g[2]+' pip').join(' | '));
`);
