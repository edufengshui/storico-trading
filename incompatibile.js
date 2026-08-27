// REGOLA NUOVA da misurare (Edu, 27/08/2026, da USDCAD 16/01/2024):
// linea INCOMPATIBILE = il suo ramo clasha un ramo proprio del trigramma che la ospita
// (坎:子 離:午 震:卯 兌:酉 乾:戌亥 坤:未申 艮:丑寅 巽:辰巳).
// Se NIENTE si muove nell'esagramma (caso -1) e la linea incompatibile e' CARICA
// (stelo di data radicato con casa li'; bestia dell'elemento del capolinea) ->
// fa vincere la propria squadra (sede della linea).
const LYM = require('./liuyao.js');
const rows = require('/tmp/rows2.json');
const CLASH={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const GEN={Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
const WX={'寅':'Wood','卯':'Wood','巳':'Fire','午':'Fire','辰':'Earth','丑':'Earth','戌':'Earth','未':'Earth','申':'Metal','酉':'Metal','亥':'Water','子':'Water'};
const TRIG_RAMI={1:['戌','亥'],2:['酉'],3:['午'],4:['卯'],5:['辰','巳'],6:['子'],7:['丑','寅'],8:['未','申']};
const BEL={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
const YANG=['甲','丙','戊','己','庚','壬'], YIN=['乙','丁','戊','己','辛','癸'];
const ST10=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const SE={'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const BR12=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const BRm12=['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
const PRIMO={'甲':'丙','己':'丙','乙':'戊','庚':'戊','丙':'庚','辛':'庚','丁':'壬','壬':'壬','戊':'甲','癸':'甲'};
const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};

function steliData(r){
  const y=+r.d.split('-')[0]; let aS=null;
  for(const Y of [y,y-1]) if(BR12[((Y-4)%12+12)%12]===r.yearBranch){aS=ST10[((Y-4)%10+10)%10];break;}
  let mS=null; if(aS&&r.monthBranch){const i=BRm12.indexOf(r.monthBranch); if(i>=0)mS=ST10[(ST10.indexOf(PRIMO[aS])+i)%10];}
  let oS=null; if(r.dayStem&&r.oraBranch){const s0=WUSHU[r.dayStem],hi=BR12.indexOf(r.oraBranch); if(s0&&hi>=0)oS=ST10[(ST10.indexOf(s0)+hi)%10];}
  return [aS,mS,r.dayStem,oS].filter(Boolean);
}
const mk=()=>({w:0,l:0,p:0,re:[0,0],ve:[0,0]});
const M={}; const dett={};
const add=(k,ok,r,extra)=>{ M[k]=M[k]||mk(); dett[k]=dett[k]||[];
  const d=M[k]; if(ok)d.w++; else d.l++; d.p+=Math.abs(r.move)*(ok?1:-1);
  if(r.d>='2023-05-01'){ if(ok)d.re[0]++; else d.re[1]++; }
  if(r.d<='2022-12-31'){ if(ok)d.ve[0]++; else d.ve[1]++; }
  dett[k].push(r.c+' '+r.d+' '+(ok?'✓':'✗')+(ok?' +':' -')+Math.abs(r.move).toFixed(0)+(extra?(' · '+extra):'')); };

for (const r of rows) {
  const R=LYM.readManual(r.sup,r.inf,r.linea,r.dayBranch,r.monthBranch,r.yearBranch,r.dayStem);
  if(R.error||R.mutante.casoMut!==-1) continue;                    // niente si muove
  const steli=steliData(r), rami=[r.yearBranch,r.monthBranch,r.dayBranch,r.oraBranch].filter(Boolean);
  const lad=(ST10.indexOf(r.dayStem)%2===0)?YANG:YIN; const i0=lad.indexOf(r.dayStem); if(i0<0) continue;
  const casaDi=s=>{const j=lad.indexOf(s); return j<0?null:((j-i0+6)%6)+1;};
  const conRadice=s=>rami.some(b=>WX[b]===SE[s]);
  // capolinea (forma definitiva, steli derivati)
  const pres={};
  for(const s of steli){(pres[SE[s]]=pres[SE[s]]||[]).push(s);}
  for(const b of rami){if(WX[b])(pres[WX[b]]=pres[WX[b]]||[]).push(b);}
  const util=e=>steli.filter(s=>SE[s]===e&&lad.indexOf(s)>=0);
  let cap=null,lung=-1;
  for(const pe of Object.keys(pres)){let e=pe,g=0,ult=null,passi=0;
    while(g++<6){const gg=GEN[e]; if(!pres[gg]||!util(gg).length)break; e=gg; ult=gg; passi++;}
    if(ult&&passi>lung){lung=passi;cap=ult;}}
  const sale=r.move>0;
  // linee incompatibili
  const inc=[];
  for(const l of R.linee){
    const trig=l.pos<=3?r.inf:r.sup; const propri=TRIG_RAMI[trig]||[];
    if(!propri.some(b=>CLASH[b]===l.ramo)) continue;
    const steloCasa=steli.some(s=>casaDi(s)===l.pos&&conRadice(s));
    const bestiaCap=cap&&l.bestia&&BEL[l.bestia.cn]===cap;
    inc.push({l, steloCasa, bestiaCap});
  }
  if(!inc.length) continue;
  add('0. esiste almeno una linea incompatibile (caso -1)', true, r);
  const vinceSeat=l=>((l.pos<=3?'SHORT':'LONG')===(sale?'LONG':'SHORT'));
  // A: stelo radicato in casa
  const A=inc.filter(x=>x.steloCasa);
  if(A.length===1) add('A. UNICA incompatibile con stelo di data RADICATO in casa -> vince la sua squadra', vinceSeat(A[0].l), r, 'L'+A[0].l.pos+' '+A[0].l.ramo);
  // B: bestia dell'elemento del capolinea
  const Bq=inc.filter(x=>x.bestiaCap);
  if(Bq.length===1) add('B. UNICA incompatibile con bestia del capolinea -> vince la sua squadra', vinceSeat(Bq[0].l), r, 'L'+Bq[0].l.pos+' '+Bq[0].l.ramo);
  // C: tutte e due le cariche insieme
  const Cq=inc.filter(x=>x.steloCasa&&x.bestiaCap);
  if(Cq.length===1) add('C. UNICA incompatibile con stelo in casa E bestia del capolinea -> vince la sua squadra', vinceSeat(Cq[0].l), r, 'L'+Cq[0].l.pos+' '+Cq[0].l.ramo);
  // D: controllo — incompatibile qualunque senza carica (prima trovata)
  if(inc.length===1) add('D. controllo: incompatibile unica, carica o no -> vince la sua squadra', vinceSeat(inc[0].l), r);
}
const pc=d=>{const n=d.w+d.l; return n?(100*d.w/n).toFixed(1)+'%':'—';};
const zz=d=>{const n=d.w+d.l; return n?((d.w-n/2)/(0.5*Math.sqrt(n))).toFixed(2):'—';};
const pp=a=>{const n=a[0]+a[1]; return n?(100*a[0]/n).toFixed(0)+'%('+n+')':'—';};
console.log('cella'.padEnd(78)+'n'.padStart(5)+'win%'.padStart(8)+'z'.padStart(7)+'rec'.padStart(10)+'vec'.padStart(10)+'pip'.padStart(8));
for(const [k,d] of Object.entries(M).sort()){
  console.log(k.padEnd(78)+String(d.w+d.l).padStart(5)+pc(d).padStart(8)+zz(d).padStart(7)+pp(d.re).padStart(10)+pp(d.ve).padStart(10)+d.p.toFixed(0).padStart(8));
}
for(const key of ['C. UNICA incompatibile con stelo in casa E bestia del capolinea -> vince la sua squadra','A. UNICA incompatibile con stelo di data RADICATO in casa -> vince la sua squadra']){
  console.log('\n--- dettaglio '+key.slice(0,1)+' ---');
  (dett[key]||[]).forEach(x=>console.log(x));
}
