'use strict';
// PONTE NELLO HU GUA (Edu, 08/09/2026, dalla USDJPY 20/02/2020 seme 111)
// Il Yong controlla il Ti. Se un trigramma dell'esagramma nucleare e' l'elemento che sta
// in mezzo (il Yong lo genera, lui genera il Ti) e un ramo del Bazi lo sostiene, il
// controllo non colpisce: passa attraverso e nutre il Ti -> il mercato SEGUE il trend.
const fs = require('fs');
const rows = JSON.parse(fs.readFileSync('/tmp/dumppb.json', 'utf8'));

const T = {1:{n:'乾 Qian',l:'111',el:'Metal'},2:{n:'兌 Dui',l:'110',el:'Metal'},
           3:{n:'離 Li',l:'101',el:'Fire'},4:{n:'震 Zhen',l:'100',el:'Wood'},
           5:{n:'巽 Xun',l:'011',el:'Wood'},6:{n:'坎 Kan',l:'010',el:'Water'},
           7:{n:'艮 Gen',l:'001',el:'Earth'},8:{n:'坤 Kun',l:'000',el:'Earth'}};
const byLines = {}; for (const k in T) byLines[T[k].l] = Number(k);
const GEN={Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
const WX={'子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire',
          '午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'};
// stagione del trigramma dal mese (tabella data da Edu, 08/09/2026)
const STAG={'寅':['Wood'],'卯':['Wood'],'辰':['Wood'],
            '巳':['Fire','Earth'],'午':['Fire','Earth'],'未':['Fire','Earth'],
            '申':['Metal'],'酉':['Metal'],'戌':['Metal'],
            '亥':['Water'],'子':['Water'],'丑':['Water']};

function hugua(r) {
  const li = T[r.inf].l, ls = T[r.sup].l;      // indice 0 = linea in basso
  const L = [null, li[0], li[1], li[2], ls[0], ls[1], ls[2]];
  return { inf: byLines[L[2]+L[3]+L[4]], sup: byLines[L[3]+L[4]+L[5]] };
}

function analizza(r) {
  if (r.via !== '剋我') return null;
  const tiSopra = (r.linea <= 3);
  const tiN = tiSopra ? r.sup : r.inf, yoN = tiSopra ? r.inf : r.sup;
  const tiEl = T[tiN].el, yoEl = T[yoN].el;
  const ponteEl = GEN[yoEl];                     // l'elemento in mezzo
  if (GEN[ponteEl] !== tiEl) return null;        // sicurezza
  const hg = hugua(r);
  const hgTi = tiSopra ? hg.sup : hg.inf, hgYo = tiSopra ? hg.inf : hg.sup;
  let lato = null;
  if (T[hgYo].el === ponteEl) lato = 'Yong';
  else if (T[hgTi].el === ponteEl) lato = 'Ti';
  if (!lato) return null;
  const rami = [r.yearBranch, r.monthBranch, r.dayBranch, r.oraBranch].filter(Boolean);
  const uguale = rami.filter(b => WX[b] === ponteEl);
  const genera = rami.filter(b => GEN[WX[b]] === ponteEl);
  const stagione = (STAG[r.monthBranch] || []).indexOf(ponteEl) >= 0;
  return { lato, ponteEl, sost: uguale.length > 0, sostLargo: uguale.length + genera.length > 0,
           nRami: uguale.length, stagione, r };
}

function stat(nome, sel) {
  if (!sel.length) { console.log(nome.padEnd(46) + '   —'); return; }
  const val = a => {
    if (!a.length) return '     —';
    let ok = 0, pip = 0;
    for (const x of a) {
      const reale = x.r.move > 0 ? 'LONG' : 'SHORT';
      const dir = x.r.emaDir === 'up' ? 'LONG' : 'SHORT';   // ponte -> SEGUE il trend
      if (dir === reale) { ok++; pip += Math.abs(x.r.move); } else pip -= Math.abs(x.r.move);
    }
    return a.length + ' ' + (100 * ok / a.length).toFixed(2) + '%';
  };
  let ok = 0, pip = 0;
  for (const x of sel) {
    const reale = x.r.move > 0 ? 'LONG' : 'SHORT';
    const dir = x.r.emaDir === 'up' ? 'LONG' : 'SHORT';
    if (dir === reale) { ok++; pip += Math.abs(x.r.move); } else pip -= Math.abs(x.r.move);
  }
  const p = 100 * ok / sel.length, z = (ok - sel.length / 2) / (Math.sqrt(sel.length) / 2);
  const vec = sel.filter(x => x.r.d < '2023-05-01'), rec = sel.filter(x => x.r.d >= '2023-05-01');
  console.log(nome.padEnd(46) + String(sel.length).padStart(5) + '  ' + p.toFixed(2) + '%  z ' +
    z.toFixed(2).padStart(5) + '  ' + String(Math.round(pip)).padStart(7) + ' pip   vec ' +
    val(vec) + '  ·  rec ' + val(rec));
}

const tot = rows.filter(r => r.via === '剋我');
const A = rows.map(analizza).filter(Boolean);
console.log('carte 剋我 nel mazzo: ' + tot.length + '   ·   col ponte nello Hu Gua: ' + A.length);
console.log('(la percentuale e\' quella di "il mercato SEGUE il trend", cioe\' il verdetto nuovo)\n');
stat('ponte presente, senza condizioni', A);
stat('  ponte SOSTENUTO da un ramo del Bazi', A.filter(x => x.sost));
stat('  ponte NON sostenuto', A.filter(x => !x.sost));
console.log('');
stat('sostegno largo (stesso elemento o generato)', A.filter(x => x.sostLargo));
stat('sostenuto E in stagione nel mese', A.filter(x => x.sost && x.stagione));
console.log('');
stat('sostenuto · ponte dal lato del Yong', A.filter(x => x.sost && x.lato === 'Yong'));
stat('sostenuto · ponte dal lato del Ti', A.filter(x => x.sost && x.lato === 'Ti'));
console.log('');
for (let k = 1; k <= 4; k++) stat('sostenuto da ' + k + ' rami o piu', A.filter(x => x.nRami >= k));

// diagnostica: quanto spesso il ponte compare nello Hu Gua
const GEN2=GEN, T2=T;
let conta={};
for (const r of tot) {
  const tiSopra=(r.linea<=3); const tiN=tiSopra?r.sup:r.inf, yoN=tiSopra?r.inf:r.sup;
  const ponteEl=GEN2[T2[yoN].el]; const hg=hugua(r);
  const els=[T2[hg.inf].el,T2[hg.sup].el];
  const k=ponteEl+(els.indexOf(ponteEl)>=0?' presente':' assente');
  conta[k]=(conta[k]||0)+1;
}
console.log('\nquante volte il ponte compare nello Hu Gua, per elemento:');
Object.entries(conta).sort().forEach(([k,v])=>console.log('  '+k.padEnd(20),v));

console.log('\n=== LE NOVE CARTE COL PONTE SOSTENUTO ===');
A.filter(x=>x.sost).sort((a,b)=>Math.abs(b.r.move)-Math.abs(a.r.move)).forEach(x=>{
  const r=x.r, reale=r.move>0?'LONG':'SHORT', dir=r.emaDir==='up'?'LONG':'SHORT';
  console.log([r.c,r.d,'lato '+x.lato,'ponte '+x.ponteEl,'sup'+r.sup,'inf'+r.inf,'L'+r.linea,
   'ema '+r.emaDir,'run '+r.emaRun,'move '+Math.round(r.move),
   'ponte dice '+dir, dir===reale?'GIUSTO':'SBAGLIATO',
   'mese '+r.monthBranch+' giorno '+r.dayBranch+' ora '+r.oraBranch+' anno '+r.yearBranch,
   'stag '+x.stagione].join(' · '));
});

// --- il Ti vuoto (regola cablata in S42): serve per capire se una perdente e' spiegata
const HOUTIAN={1:['戌','亥'],2:['酉'],3:['午'],4:['卯'],5:['辰','巳'],6:['子'],7:['丑','寅'],8:['未','申']};
const BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const CLASH={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const CTRL={Wood:'Earth',Earth:'Water',Water:'Fire',Fire:'Metal',Metal:'Wood'};
function stagio(el,m){ if(el===m)return '旺'; if(GEN[m]===el)return '相'; return 'x'; }
function tiVuoto(r){
  const tiSopra=r.linea<=3, tiN=tiSopra?r.sup:r.inf;
  const pal=HOUTIAN[tiN]; let ramo;
  if(pal.length===1) ramo=pal[0];
  else { const gY=(BR.indexOf(r.dayBranch)%2)===0; ramo=pal.find(b=>((BR.indexOf(b)%2)===0)===gY); }
  if(ramo==null||(r.vuoti||[]).indexOf(ramo)<0) return {vuoto:false,ramo:ramo};
  const sA=stagio(WX[r.yearBranch],WX[r.monthBranch]);
  const risv=(CLASH[r.dayBranch]===ramo)||((sA==='旺'||sA==='相')&&CLASH[r.yearBranch]===ramo);
  return {vuoto:!risv,ramo:ramo};
}
console.log('\n=== LE PERDENTI COL PONTE, COL TI PIENO O VUOTO ===');
A.filter(x=>x.sost).forEach(x=>{const r=x.r,reale=r.move>0?'LONG':'SHORT',dir=r.emaDir==='up'?'LONG':'SHORT';
  const tv=tiVuoto(r);
  console.log([r.c,r.d,'sup'+r.sup,'inf'+r.inf,'L'+r.linea,'lato '+x.lato,'ponte '+x.ponteEl,
   'move '+Math.round(r.move), dir===reale?'GIUSTA':'PERDENTE',
   'Ti ramo '+tv.ramo+(tv.vuoto?' VUOTO':' pieno'),
   'mese '+r.monthBranch+' giorno '+r.dayBranch+' ora '+r.oraBranch+' anno '+r.yearBranch].join(' · '));});
