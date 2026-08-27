// Lettura Edu (sessione 24, da EURJPY 19/04/2022): mobile sospesa (legame SINGOLO)
// e "non c'e' altro che succede" -> duello Shi/Ying, la Ying vuota non agisce -> vince Shi.
// Estensione di §107 (che copre il doppio legame) al legame singolo con il gate del silenzio.
const LYM = require('./liuyao.js');
const rows = require('/tmp/rows2.json');
const COMBINA={'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const CLASH={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const YANG=['甲','丙','戊','己','庚','壬'], YIN=['乙','丁','戊','己','辛','癸'];
const ST10=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
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
const add=(k,ok,r)=>{ M[k]=M[k]||mk(); dett[k]=dett[k]||[];
  const d=M[k]; const pip=Math.abs(r.move)*(ok?1:-1);
  if(ok)d.w++; else d.l++; d.p+=pip;
  if(r.d>='2023-05-01'){ if(ok)d.re[0]++; else d.re[1]++; }
  if(r.d<='2022-12-31'){ if(ok)d.ve[0]++; else d.ve[1]++; }
  dett[k].push(r.c+' '+r.d+' '+(ok?'✓':'✗')+(ok?' +':' -')+Math.abs(r.move).toFixed(0)); };

for (const r of rows) {
  const R=LYM.readManual(r.sup,r.inf,r.linea,r.dayBranch,r.monthBranch,r.yearBranch,r.dayStem);
  if(R.error||R.mutante.casoMut!==-1) continue;
  const dep=R.mutante.ramoDep, arr=R.mutante.ramoArr, D=r.dayBranch, Mo=r.monthBranch;
  const S=R.linee[R.shi-1], Y=R.linee[R.ying-1]; if(!S||!Y) continue;
  if(!(Y.vuoto&&!S.vuoto)) continue;                       // solo la cella del duello
  const doppio=(COMBINA[D]===dep&&CLASH[D]===arr)||(CLASH[D]===dep&&COMBINA[D]===arr);
  const mob=R.linee[R.mutante.pos-1];
  const meseVuoto = R.vuoti && R.vuoti.indexOf(Mo)>=0;
  // "altro che succede": il mese (vivo) clasha una linea; oppure il giorno tocca (clash o
  // combinazione) una linea ferma diversa dalla mobile
  const meseClasha = !meseVuoto && R.linee.some(l=>CLASH[Mo]===l.ramo);
  const giornoAltro = R.linee.some(l=>l.pos!==mob.pos && (CLASH[D]===l.ramo || COMBINA[D]===l.ramo));
  // liberazione (lettura Edu 27/08, EURUSD 05/03/2020): uno stelo della data con la casa
  // sulla linea della mobile la carica e la libera dalla sospensione -> non e' piu' ferma
  const lad=(ST10.indexOf(r.dayStem)%2===0)?YANG:YIN; const i0=lad.indexOf(r.dayStem);
  const casaDi = s => { const j=lad.indexOf(s); return (j<0||i0<0)?null:((j-i0+6)%6)+1; };
  const liberata = steliData(r).some(s=>casaDi(s)===mob.pos);
  const silenzio = !meseClasha && !giornoAltro;
  const ok = ((S.pos<=3?'SHORT':'LONG')===(r.move>0?'LONG':'SHORT'));

  add('0. caso -1 · Ying vuota · TUTTO (sede Shi)', ok, r);
  if (doppio) add('1. doppio legame (già §107)', ok, r);
  else {
    add('2. legame SINGOLO · tutto', ok, r);
    if (silenzio) add('3. legame singolo · SILENZIO (mese non clasha, giorno non tocca altre linee)', ok, r);
    else add('4. legame singolo · qualcos\'altro succede', ok, r);
    if (silenzio && !liberata) add('3b. SILENZIO e mobile NON liberata (nessuno stelo di data in casa sulla mobile)', ok, r);
    if (silenzio && liberata) add('3c. silenzio MA mobile liberata da uno stelo in casa (il duello non dovrebbe aprirsi)', ok, r);
    if (!meseClasha) add('5. legame singolo · solo gate del mese (mese non clasha linee)', ok, r);
  }
}
const pc=d=>{const n=d.w+d.l; return n?(100*d.w/n).toFixed(1)+'%':'—';};
const zz=d=>{const n=d.w+d.l; return n?((d.w-n/2)/(0.5*Math.sqrt(n))).toFixed(2):'—';};
const pp=a=>{const n=a[0]+a[1]; return n?(100*a[0]/n).toFixed(0)+'%('+n+')':'—';};
console.log('cella'.padEnd(72)+'n'.padStart(4)+'win%'.padStart(8)+'z'.padStart(7)+'rec'.padStart(10)+'vec'.padStart(10)+'pip'.padStart(8));
for(const [k,d] of Object.entries(M).sort()){
  console.log(k.padEnd(72)+String(d.w+d.l).padStart(4)+pc(d).padStart(8)+zz(d).padStart(7)+pp(d.re).padStart(10)+pp(d.ve).padStart(10)+d.p.toFixed(0).padStart(8));
}
console.log('\n--- dettaglio cella 3b (silenzio, non liberata) ---');
(dett['3b. SILENZIO e mobile NON liberata (nessuno stelo di data in casa sulla mobile)']||[]).forEach(x=>console.log(x));
console.log('\n--- dettaglio cella 3c (liberata) ---');
(dett['3c. silenzio MA mobile liberata da uno stelo in casa (il duello non dovrebbe aprirsi)']||[]).forEach(x=>console.log(x));
console.log('\n--- dettaglio cella 4 (qualcos\'altro succede) ---');
(dett['4. legame singolo · qualcos\'altro succede']||[]).forEach(x=>console.log(x));
