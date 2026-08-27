// Lettura Edu (sessione 24, da EURGBP 19/11/2025):
// mobile che non puo' NE' partire NE' arrivare (giorno combina la partenza E clasha l'arrivo)
// -> inutile per decidere -> duello Shi/Ying -> vince Shi (qui: Ying in vuoto).
const LYM = require('./liuyao.js');
const rows = require('/tmp/rows.json');
const COMBINA = {'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const CLASH = {'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const CTRL = {Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood'};

const mk=()=>({t:{w:0,l:0,p:0},re:{w:0,l:0},ve:{w:0,l:0}});
const M={}; const dett={};
const add=(k,ok,r)=>{ if(ok===null) return; M[k]=M[k]||mk(); dett[k]=dett[k]||[];
  const per=r.d>='2023-05-01'?'re':r.d<='2022-12-31'?'ve':null;
  const pip=Math.abs(r.move)*(ok?1:-1);
  const o=M[k].t; if(ok)o.w++; else o.l++; o.p+=pip;
  if(per){const q=M[k][per]; if(ok)q.w++; else q.l++;}
  dett[k].push(r.c+' '+r.d+' '+(ok?'✓':'✗')+' '+pip.toFixed(0)); };

for (const r of rows) {
  const R = LYM.readManual(r.sup, r.inf, r.linea, r.dayBranch, r.monthBranch, r.yearBranch, r.dayStem);
  if (R.error) continue;
  if (R.mutante.casoMut !== -1) continue;
  const dep=R.mutante.ramoDep, arr=R.mutante.ramoArr, D=r.dayBranch;
  const doppio1 = COMBINA[D]===dep && CLASH[D]===arr;   // combina la partenza E clasha l'arrivo
  const doppio2 = CLASH[D]===dep && COMBINA[D]===arr;   // speculare
  if (!doppio1 && !doppio2) continue;
  const S=R.linee[R.shi-1], Y=R.linee[R.ying-1]; if(!S||!Y) continue;
  const mob=R.linee[R.mutante.pos-1];
  const sale=r.move>0;
  const vinceSeat = L => (L.pos<=3?'SHORT':'LONG')===(sale?'LONG':'SHORT');
  const tag = doppio1?'combina dep + clasha arr':'clasha dep + combina arr';

  add('0. perimetro (entrambe le forme) · esiste', true, r);
  let vincitore=null, come=null;
  if (Y.vuoto && !S.vuoto) { vincitore=S; come='Ying VUOTA -> vince Shi'; }
  else if (S.vuoto && !Y.vuoto) { vincitore=Y; come='Shi VUOTO -> vince Ying'; }
  else if (CTRL[S.el]===Y.el) { vincitore=S; come='nessun vuoto · Shi CONTROLLA Ying -> Shi'; }
  else if (CTRL[Y.el]===S.el) { vincitore=Y; come='nessun vuoto · Ying CONTROLLA Shi -> Ying'; }
  else { come='nessun vuoto · nessun controllo'; }

  if (vincitore) {
    add('1. TUTTO: duello Shi/Ying (vuoto non agisce, poi controllo) -> sede del vincitore', vinceSeat(vincitore), r);
    add('2. cella: '+come, vinceSeat(vincitore), r);
    add('3. forma: '+tag+' · duello', vinceSeat(vincitore), r);
    if (mob && (mob.pos===R.shi||mob.pos===R.ying))
      add('4. mobile = Shi o Ying · duello', vinceSeat(vincitore), r);
    else add('5. mobile terza linea · duello', vinceSeat(vincitore), r);
  } else {
    add('6. senza criterio (ne vuoto ne controllo): sede Shi (controllo grezzo)', vinceSeat(S), r);
  }
  // rovescio di riferimento
  if (Y.vuoto && !S.vuoto) add('R. riferimento cella Ying vuota: vince YING (rovescio)', vinceSeat(Y), r);
}
const pc=o=>(o.w+o.l)?(100*o.w/(o.w+o.l)).toFixed(1)+'%':'—';
const zz=o=>{const n=o.w+o.l; return n?((o.w-n/2)/(0.5*Math.sqrt(n))).toFixed(2):'—';};
console.log('=== MOBILE CHIUSA AI DUE CAPI (giorno combina la partenza E clasha l\'arrivo) -> DUELLO SHI/YING ===');
console.log('cella'.padEnd(66)+'n'.padStart(5)+'win%'.padStart(8)+'z'.padStart(7)+'rec'.padStart(8)+'vec'.padStart(8)+'pip'.padStart(8));
for(const [k,d] of Object.entries(M).sort()){ const n=d.t.w+d.t.l;
  console.log(k.padEnd(66)+String(n).padStart(5)+pc(d.t).padStart(8)+zz(d.t).padStart(7)
    +(pc(d.re)).padStart(8)+(pc(d.ve)).padStart(8)+d.t.p.toFixed(0).padStart(8)); }
console.log('\n--- dettaglio cella 1 ---');
(dett['1. TUTTO: duello Shi/Ying (vuoto non agisce, poi controllo) -> sede del vincitore']||[]).forEach(x=>console.log(x));
console.log('\n--- dettaglio cella 6 (senza criterio) ---');
(dett['6. senza criterio (ne vuoto ne controllo): sede Shi (controllo grezzo)']||[]).forEach(x=>console.log(x));
