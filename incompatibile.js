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
  // FATTORE FINALE: parla solo se nient'altro succede (silenzio come nel duello)
  const D=r.dayBranch, Mo=r.monthBranch;
  const COMB2={'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
  const mob=R.linee[R.mutante.pos-1];
  const meseVuoto=R.vuoti&&R.vuoti.indexOf(Mo)>=0;
  const meseClasha=!meseVuoto&&R.linee.some(l=>CLASH[Mo]===l.ramo);
  const giornoAltro=R.linee.some(l=>l.pos!==mob.pos&&(CLASH[D]===l.ramo||COMB2[D]===l.ramo));
  const silenzio=!meseClasha&&!giornoAltro;
  // linee incompatibili + cariche (bestia/stelo COL PROPRIO RAMO NELLA DATA)
  const inc=[];
  for(const l of R.linee){
    const trig=l.pos<=3?r.inf:r.sup; const propri=TRIG_RAMI[trig]||[];
    if(!propri.some(b=>CLASH[b]===l.ramo)) continue;
    const bEl=l.bestia?BEL[l.bestia.cn]:null;
    const radiciBestia=bEl?rami.filter(b=>WX[b]===bEl).length:0;
    const steloCasaRad=steli.filter(s=>casaDi(s)===l.pos&&conRadice(s));
    const steloStessoEl=steloCasaRad.some(s=>SE[s]===bEl);
    inc.push({l, radiciBestia, steloCasa:steloCasaRad.length>0, steloStessoEl});
  }
  if(!inc.length) continue;
  const vinceSeat=l=>((l.pos<=3?'SHORT':'LONG')===(sale?'LONG':'SHORT'));
  // dimenticanze: la legge fissa (una linea VUOTA non agisce) e la carica per COINCIDENZA
  // del ramo di data sulla linea (nella guida L4 丑 coincide con MESE e ORA, raddoppiati)
  for(const x of inc){
    x.vuota=!!x.l.vuoto;
    x.coinc=rami.filter(b=>b===x.l.ramo).length;   // quante volte il ramo della linea sta nella data
  }
  const cella=(nome,f)=>{const q=inc.filter(f);
    if(q.length===1){ add(nome, vinceSeat(q[0].l), r, 'L'+q[0].l.pos+' '+q[0].l.ramo);
      if(silenzio) add(nome+' · E SILENZIO (fattore finale)', vinceSeat(q[0].l), r, 'L'+q[0].l.pos+' '+q[0].l.ramo); }};
  cella('E. bestia radicata + stelo in casa stesso el. (misura precedente)', x=>x.radiciBestia>=1&&x.steloStessoEl);
  cella('G. NON vuota + coincidenza di ramo di data sulla linea', x=>!x.vuota&&x.coinc>=1);
  cella('H. NON vuota + coincidenza + bestia radicata', x=>!x.vuota&&x.coinc>=1&&x.radiciBestia>=1);
  cella('I. NON vuota + coincidenza + stelo radicato in casa', x=>!x.vuota&&x.coinc>=1&&x.steloCasa);
  cella('J. NON vuota + coincidenza RADDOPPIATA (>=2 rami di data)', x=>!x.vuota&&x.coinc>=2);
  cella('K. la struttura piena della guida: non vuota, coinc>=2, bestia radicata, stelo in casa', x=>!x.vuota&&x.coinc>=2&&x.radiciBestia>=1&&x.steloCasa);
}
const pc=d=>{const n=d.w+d.l; return n?(100*d.w/n).toFixed(1)+'%':'—';};
const zz=d=>{const n=d.w+d.l; return n?((d.w-n/2)/(0.5*Math.sqrt(n))).toFixed(2):'—';};
const pp=a=>{const n=a[0]+a[1]; return n?(100*a[0]/n).toFixed(0)+'%('+n+')':'—';};
console.log('cella'.padEnd(78)+'n'.padStart(5)+'win%'.padStart(8)+'z'.padStart(7)+'rec'.padStart(10)+'vec'.padStart(10)+'pip'.padStart(8));
for(const [k,d] of Object.entries(M).sort()){
  console.log(k.padEnd(78)+String(d.w+d.l).padStart(5)+pc(d).padStart(8)+zz(d).padStart(7)+pp(d.re).padStart(10)+pp(d.ve).padStart(10)+d.p.toFixed(0).padStart(8));
}
for(const key of ['J. NON vuota + coincidenza RADDOPPIATA (>=2 rami di data) · E SILENZIO (fattore finale)','G. NON vuota + coincidenza di ramo di data sulla linea · E SILENZIO (fattore finale)','H. NON vuota + coincidenza + bestia radicata · E SILENZIO (fattore finale)']){
  console.log('\n--- dettaglio '+key.slice(0,1)+' ---');
  (dett[key]||[]).forEach(x=>console.log(x));
}
