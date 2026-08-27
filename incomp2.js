// Lista ESPLICITA di Edu (27/08/2026): incompatibili SOLO
// 丑 dentro 坤(8) · 卯 dentro 兌(2) · 辰 dentro 乾(1) · 午 dentro 坎(6) · 申 dentro 艮(7)
// (e forse la lista non è completa: misuro anche le speculari per dargli i numeri)
const LYM=require('./liuyao.js');
const rows=require('/tmp/rows2.json');
const WX={'寅':'Wood','卯':'Wood','巳':'Fire','午':'Fire','辰':'Earth','丑':'Earth','戌':'Earth','未':'Earth','申':'Metal','酉':'Metal','亥':'Water','子':'Water'};
const CLASH={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const COMB={'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const BEL={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
const EDU={'丑':8,'卯':2,'辰':1,'午':6,'申':7};                    // la lista di Edu
const SPEC={'未':7,'酉':4,'戌':5,'子':3,'寅':8,'巳':1,'亥':5};    // speculari possibili
const mk=()=>({w:0,l:0,p:0,re:[0,0],ve:[0,0]});
const M={},dett={};
const add=(k,ok,r,x)=>{M[k]=M[k]||mk();dett[k]=dett[k]||[];const d=M[k];
  if(ok)d.w++;else d.l++;d.p+=Math.abs(r.move)*(ok?1:-1);
  if(r.d>='2023-05-01'){if(ok)d.re[0]++;else d.re[1]++;}
  if(r.d<='2022-12-31'){if(ok)d.ve[0]++;else d.ve[1]++;}
  dett[k].push(r.c+' '+r.d+' '+(ok?'✓':'✗')+(ok?' +':' -')+Math.abs(r.move).toFixed(0)+(x?' · '+x:''));};
for(const r of rows){
  const R=LYM.readManual(r.sup,r.inf,r.linea,r.dayBranch,r.monthBranch,r.yearBranch,r.dayStem);
  if(R.error||R.mutante.casoMut!==-1) continue;
  const rami=[r.yearBranch,r.monthBranch,r.dayBranch,r.oraBranch].filter(Boolean);
  const D=r.dayBranch,Mo=r.monthBranch,mob=R.linee[R.mutante.pos-1];
  const meseVuoto=R.vuoti&&R.vuoti.indexOf(Mo)>=0;
  const silenzio=!( !meseVuoto&&R.linee.some(l=>CLASH[Mo]===l.ramo) )
              && !R.linee.some(l=>l.pos!==mob.pos&&(CLASH[D]===l.ramo||COMB[D]===l.ramo));
  const sale=r.move>0;
  const vince=l=>((l.pos<=3?'SHORT':'LONG')===(sale?'LONG':'SHORT'));
  const trova=mappa=>R.linee.filter(l=>{
    const trig=l.pos<=3?r.inf:r.sup;
    return mappa[l.ramo]===trig;
  }).map(l=>({l,vuota:!!l.vuoto,coinc:rami.filter(b=>b===l.ramo).length,
    radB:(l.bestia&&BEL[l.bestia.cn])?rami.filter(b=>WX[b]===BEL[l.bestia.cn]).length:0}));
  const cella=(nome,lista,f)=>{const q=lista.filter(f);
    if(q.length===1){add(nome,vince(q[0].l),r,'L'+q[0].l.pos+' '+q[0].l.ramo+' ('+q[0].l.ramo+'∈trig)');
      if(silenzio)add(nome+' · SILENZIO',vince(q[0].l),r,'L'+q[0].l.pos+' '+q[0].l.ramo);}};
  const E=trova(EDU),S=trova(SPEC);
  cella('EDU-1. lista di Edu · unica, qualunque stato',E,()=>true);
  cella('EDU-2. lista di Edu · NON vuota',E,x=>!x.vuota);
  cella('EDU-3. lista di Edu · non vuota + coincidenza di ramo di data',E,x=>!x.vuota&&x.coinc>=1);
  cella('EDU-4. lista di Edu · non vuota + coincidenza + bestia radicata',E,x=>!x.vuota&&x.coinc>=1&&x.radB>=1);
  cella('SPEC-1. speculari · unica, qualunque stato',S,()=>true);
  cella('SPEC-4. speculari · non vuota + coincidenza + bestia radicata',S,x=>!x.vuota&&x.coinc>=1&&x.radB>=1);
  // per coppia (solo lista Edu, cella 4)
  const q4=E.filter(x=>!x.vuota&&x.coinc>=1&&x.radB>=1);
  if(q4.length===1) add('   coppia '+q4[0].l.ramo,vince(q4[0].l),r);
}
const pc=d=>{const n=d.w+d.l;return n?(100*d.w/n).toFixed(1)+'%':'—';};
const zz=d=>{const n=d.w+d.l;return n?((d.w-n/2)/(0.5*Math.sqrt(n))).toFixed(2):'—';};
const pp=a=>{const n=a[0]+a[1];return n?(100*a[0]/n).toFixed(0)+'%('+n+')':'—';};
console.log('cella'.padEnd(66)+'n'.padStart(5)+'win%'.padStart(8)+'z'.padStart(7)+'rec'.padStart(10)+'vec'.padStart(10)+'pip'.padStart(8));
for(const[k,d]of Object.entries(M).sort())
  console.log(k.padEnd(66)+String(d.w+d.l).padStart(5)+pc(d).padStart(8)+zz(d).padStart(7)+pp(d.re).padStart(10)+pp(d.ve).padStart(10)+d.p.toFixed(0).padStart(8));
console.log('\n--- dettaglio EDU-4 ---');
(dett['EDU-4. lista di Edu · non vuota + coincidenza + bestia radicata']||[]).forEach(x=>console.log(x));
