// Test rifatto (Edu, 27/08/2026): stesse cinque coppie, carica "si prende bestia e steli",
// non vuota — INCROCIATE col TIMELINESS della LINEA (forte del motore) e del TRIGRAMMA
// (elemento del trigramma nel mese; Terra solo nei mesi di Terra).
// Nota: la condizione "申 in tomba su 艮, funzionale solo col Metallo vibrante" e' l'istanza
// della porta 'linea timely'.
const LYM=require('./liuyao.js');
const rows=require('/tmp/rows2.json');
const WX={'寅':'Wood','卯':'Wood','巳':'Fire','午':'Fire','辰':'Earth','丑':'Earth','戌':'Earth','未':'Earth','申':'Metal','酉':'Metal','亥':'Water','子':'Water'};
const SE={'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const BEL={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
const GEN={Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
const EDU={'丑':8,'卯':2,'辰':1,'午':6,'申':7};
const TRIG_EL={1:'Metal',2:'Metal',3:'Fire',4:'Wood',5:'Wood',6:'Water',7:'Earth',8:'Earth'};
const SEASON={'寅':'Wood','卯':'Wood','辰':'Wood','巳':'Fire','午':'Fire','未':'Fire','申':'Metal','酉':'Metal','戌':'Metal','亥':'Water','子':'Water','丑':'Water'};
const TERRA_MESI=['辰','戌','丑','未'];
const timelyEl=(el,Mo)=>{ if(el==='Earth') return TERRA_MESI.indexOf(Mo)>=0;
  const s=SEASON[Mo]; return el===s||GEN[s]===el; };
const YANG=['甲','丙','戊','己','庚','壬'],YIN=['乙','丁','戊','己','辛','癸'];
const ST10=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BR12=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const BRm12=['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
const PRIMO={'甲':'丙','己':'丙','乙':'戊','庚':'戊','丙':'庚','辛':'庚','丁':'壬','壬':'壬','戊':'甲','癸':'甲'};
const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
function steliData(r){const y=+r.d.split('-')[0];let aS=null;
  for(const Y of [y,y-1]) if(BR12[((Y-4)%12+12)%12]===r.yearBranch){aS=ST10[((Y-4)%10+10)%10];break;}
  let mS=null;if(aS&&r.monthBranch){const i=BRm12.indexOf(r.monthBranch);if(i>=0)mS=ST10[(ST10.indexOf(PRIMO[aS])+i)%10];}
  let oS=null;if(r.dayStem&&r.oraBranch){const s0=WUSHU[r.dayStem],hi=BR12.indexOf(r.oraBranch);if(s0&&hi>=0)oS=ST10[(ST10.indexOf(s0)+hi)%10];}
  return [aS,mS,r.dayStem,oS].filter(Boolean);}
const M={};
const add=(k,ok,r)=>{M[k]=M[k]||{w:0,l:0,re:[0,0],ve:[0,0]};const d=M[k];
  if(ok)d.w++;else d.l++;
  if(r.d>='2023-05-01'){if(ok)d.re[0]++;else d.re[1]++;}
  if(r.d<='2022-12-31'){if(ok)d.ve[0]++;else d.ve[1]++;}};
for(const r of rows){
  const R=LYM.readManual(r.sup,r.inf,r.linea,r.dayBranch,r.monthBranch,r.yearBranch,r.dayStem);
  if(R.error||R.mutante.casoMut!==-1) continue;
  const rami=[r.yearBranch,r.monthBranch,r.dayBranch,r.oraBranch].filter(Boolean);
  const steli=steliData(r);
  const lad=(ST10.indexOf(r.dayStem)%2===0)?YANG:YIN;const i0=lad.indexOf(r.dayStem);if(i0<0)continue;
  const casaDi=s=>{const j=lad.indexOf(s);return j<0?null:((j-i0+6)%6)+1;};
  const conRad=s=>rami.some(b=>WX[b]===SE[s]);
  const q=R.linee.filter(l=>{
    const trig=l.pos<=3?r.inf:r.sup;
    if(EDU[l.ramo]!==trig||l.vuoto) return false;
    const bEl=l.bestia?BEL[l.bestia.cn]:null;
    return bEl&&rami.some(b=>WX[b]===bEl)&&steli.some(s=>casaDi(s)===l.pos&&conRad(s));
  });
  if(q.length!==1) continue;
  const l=q[0];
  const trig=l.pos<=3?r.inf:r.sup;
  const tl=!!l.forte;                                   // timeliness della linea (motore)
  const tt=timelyEl(TRIG_EL[trig], r.monthBranch);      // timeliness del trigramma ospite
  const vince=((l.pos<=3?'SHORT':'LONG')===(r.move>0?'LONG':'SHORT'));
  const quad=(tl?'linea T':'linea u')+' · '+(tt?'trig T':'trig u');
  add('0. TUTTE (riferimento)', vince, r);
  add('1. '+quad, vince, r);
  add('2. '+quad+' · par '+l.par, vince, r);
  add('3. coppia '+l.ramo+' · '+(tl?'linea T':'linea u'), vince, r);
}
const pc=d=>{const n=d.w+d.l;return n?(100*d.w/n).toFixed(1)+'%':'—';};
const pp=a=>{const n=a[0]+a[1];return n?(100*a[0]/n).toFixed(0)+'%('+n+')':'—';};
console.log('cella (percentuale = la squadra della linea VINCE)'.padEnd(56)+'n'.padStart(5)+'vince%'.padStart(9)+'rec'.padStart(10)+'vec'.padStart(10));
for(const[k,d]of Object.entries(M).sort())
  console.log(k.padEnd(56)+String(d.w+d.l).padStart(5)+pc(d).padStart(9)+pp(d.re).padStart(10)+pp(d.ve).padStart(10));
