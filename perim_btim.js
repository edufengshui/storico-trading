// Enumerazione perimetro "B timely sospesa: carica o sola"
// caso -1 + mutazione = generazione all'indietro (bloccata) + mobile B timely
const LYM = require('./liuyao.js');
const { Solar } = require('lunar-javascript');
const rows = require('/tmp/rows.json');

const GEN = {Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood'};
const WX  = {'寅':'Wood','卯':'Wood','巳':'Fire','午':'Fire','辰':'Earth','丑':'Earth','戌':'Earth','未':'Earth','申':'Metal','酉':'Metal','亥':'Water','子':'Water'};
const COMBINA = {'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const YANG=['甲','丙','戊','己','庚','壬'], YIN=['乙','丁','戊','己','辛','癸'];
const ST=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const SE={'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
const HB=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

// steli derivati dai rami del motore (correzione 27/08/2026): niente pilastro di mezzogiorno
const cacheP={};
const BR12=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const BRm12=['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
const PRIMO={'甲':'丙','己':'丙','乙':'戊','庚':'戊','丙':'庚','辛':'庚','丁':'壬','壬':'壬','戊':'甲','癸':'甲'};
function pil8(ds, yb, mb){ const k=ds+'|'+yb+'|'+mb; if(cacheP[k]) return cacheP[k];
  const y=+ds.split('-')[0]; let annoS=null;
  for (const Y of [y,y-1]) if (BR12[((Y-4)%12+12)%12]===yb) { annoS=ST[((Y-4)%10+10)%10]; break; }
  let meseS=null;
  if (annoS && mb) { const i=BRm12.indexOf(mb); if(i>=0) meseS=ST[(ST.indexOf(PRIMO[annoS])+i)%10]; }
  const o={annoS, meseS}; cacheP[k]=o; return o; }

const out=[];
for (const r of rows) {
  const ds=r.dayStem; if(!ds) continue;
  const R = LYM.readManual(r.sup, r.inf, r.linea, r.dayBranch, r.monthBranch, r.yearBranch, r.dayStem);
  if (R.error) continue;
  if (R.mutante.casoMut !== -1) continue;                    // sospesa dal giorno
  const mob = R.linee[R.mutante.pos-1]; if(!mob) continue;
  if (mob.par !== 'B') continue;                             // mobile B
  if (!mob.forte) continue;                                  // timely
  const arr = R.mutante.ramoArr, dep = R.mutante.ramoDep;
  if (GEN[WX[arr]] !== WX[dep]) continue;                    // la mutazione sarebbe 回頭生 (bloccata)

  // flusso (forma definitiva, con radice, polarita' del giorno)
  const lad=(ST.indexOf(ds)%2===0)?YANG:YIN; const i0=lad.indexOf(ds);
  const casa = s => { const j=lad.indexOf(s); return j<0?null:((j-i0+6)%6)+1; };
  const P=pil8(r.d, r.yearBranch, r.monthBranch);
  const so=(()=>{const s0=WUSHU[ds]; if(!s0||!r.oraBranch)return null;
    const i=HB.indexOf(r.oraBranch); return i<0?null:ST[(ST.indexOf(s0)+i)%10];})();
  const steli=[P.annoS,P.meseS,ds,so].filter(Boolean);
  const rami=[r.yearBranch,r.monthBranch,r.dayBranch,r.oraBranch].filter(Boolean);
  const pres={};
  for(const s of steli){const e=SE[s]; (pres[e]=pres[e]||[]).push(s);}
  for(const b of rami){const e=WX[b]; if(e)(pres[e]=pres[e]||[]).push(b);}
  const conRadice = q => rami.some(b=>WX[b]===SE[q]);
  const steloUtile = e => steli.filter(s=>SE[s]===e && lad.indexOf(s)>=0);
  let attore=null, lung=-1, capolinea=null;
  for (const part of Object.keys(pres)) {
    let e=part, guard=0, ultimo=null, passi=0, ultimoEl=null;
    while (guard++ < 6) { const g=GEN[e]; const su=steloUtile(g);
      if (!pres[g] || !su.length) break; e=g; ultimo=su[0]; ultimoEl=g; passi++; }
    if (ultimo && passi>lung) { lung=passi; attore=ultimo; capolinea=ultimoEl; }
  }
  const carica = attore!=null && casa(attore)===mob.pos;

  // verdetto della lettura
  let verdetto=null, dest=null;
  if (carica) {
    const cible = COMBINA[arr];
    const L = R.linee.find(l=>l.pos!==mob.pos && l.ramo===cible);
    if (L) { dest='L'+L.pos+' '+L.ramo; verdetto = L.pos<=3?'SHORT':'LONG'; }
    else   { dest='(assente: '+cible+')'; verdetto = null; }
  } else {
    verdetto = mob.pos<=3?'LONG':'SHORT';                    // sola: la sua squadra perde
  }
  const realDir = r.move>0?'LONG':'SHORT';
  const ok = verdetto? (verdetto===realDir) : null;
  out.push({cross:r.c, date:r.d, pip:Math.abs(r.move).toFixed(0), realDir,
    mob:'L'+mob.pos+' '+mob.ramo+' B', arr, ramo:carica?'CARICA→atterra su '+dest:'SOLA',
    verdetto, ok});
}
out.sort((a,b)=> a.date<b.date?-1:1);
console.log('perimetro: '+out.length+' carte');
for (const o of out) console.log(
  [o.cross, o.date, 'pip '+o.pip, 'mercato '+o.realDir, o.mob, 'arr '+o.arr, o.ramo,
   'lettura '+(o.verdetto||'—'), o.ok===null?'?':(o.ok?'✓':'✗')].join(' · '));
