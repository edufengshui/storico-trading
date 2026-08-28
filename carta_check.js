#!/usr/bin/env node
/* =============================================================================
 * carta_check.js — CHECKLIST COMPLETA DELLA CARTA (Edu + Claude, 23/08/2026)
 *
 * Uso:   node carta_check.js CROSS YYYY-MM-DD [--registra "nota"]
 * Es.:   node carta_check.js GBPUSD 2021-01-15
 *        node carta_check.js GBPUSD 2021-01-15 --registra "carta madre §93-bis"
 *
 * Cosa fa, in ordine:
 *   0. REGISTRO CARTE LETTE: avvisa se la carta (per cross+data O per seme+trigrammi+
 *      giorno) è già stata letta; con --registra la aggiunge a carte_lette.json
 *   1. DATI PB verbatim dal motore (CARTA=): seme, trigrammi, verdetto, EMA, esito
 *   2. RIGA DEGLI STELI: case, radici, capolinea + attore (flusso definitivo 22/08)
 *   3. STRUTTURA LY: palazzo, Shi/Ying, 6 linee con stati, fushen, mutante
 *   4. TUTTE LE VIE CABLATE (~35) + rafforzativi: quali scattano e se azzeccano
 *   5. MECCANICHE DI LETTURA (non cablate come vie): atterraggio §93/§93-bis,
 *      capannello, arrivo che combina/clasha linee, trigoni 三合 completi,
 *      avanzamento/retrocessione, rami di data vuoti, 月破/日破 sulle linee
 *   6. PERIMETRI DEI CANDIDATI in CANDIDATI_OSSERVAZIONE.md: per ciascuno dice
 *      se la carta ci cade dentro (e con che verso)
 *
 * Regola d'oro: TUTTO dal motore, niente a mano. Se una voce non è calcolabile
 * la checklist lo DICE, non la salta in silenzio.
 * ========================================================================== */
'use strict';
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const LYM = require(path.join(HERE, 'liuyao.js'));
const { Solar } = require('lunar-javascript');

const cross = process.argv[2], date = process.argv[3];
if (!cross || !date) { console.log('Uso: node carta_check.js CROSS YYYY-MM-DD [--registra "nota"]'); process.exit(1); }
const REG_IDX = process.argv.indexOf('--registra');
const REGISTRA = REG_IDX >= 0;
const NOTA = REGISTRA ? (process.argv[REG_IDX+1] || '') : '';

/* ---------- tavole ---------- */
const B = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WX = {'子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'};
const GEN = {Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
const CTRL = {Wood:'Earth',Earth:'Water',Water:'Fire',Fire:'Metal',Metal:'Wood'};
const CLASH = {'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const COMBINA = {'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const TRIGONI = [['申','子','辰'],['亥','卯','未'],['寅','午','戌'],['巳','酉','丑']];
const AVANZA = {'寅':'卯','巳':'午','申':'酉','亥':'子','丑':'辰','辰':'未','未':'戌'};
const RETRO  = {'卯':'寅','午':'巳','酉':'申','子':'亥','戌':'未','未':'辰','辰':'丑'};
const ST = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const YANG = ['甲','丙','戊','己','庚','壬'], YIN = ['乙','丁','戊','己','辛','癸'];
const SE = {'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const WUSHU = {'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
const EL_IT = {Wood:'Legno',Fire:'Fuoco',Earth:'Terra',Metal:'Metallo',Water:'Acqua'};
const SEASON = {'寅':'Wood','卯':'Wood','辰':'Wood','巳':'Fire','午':'Fire','未':'Fire','申':'Metal','酉':'Metal','戌':'Metal','亥':'Water','子':'Water','丑':'Water'};
function stagione(el, mEl){ if(!mEl) return '—';
  return el===mEl?'旺':GEN[mEl]===el?'相':GEN[el]===mEl?'休':CTRL[mEl]===el?'死':CTRL[el]===mEl?'囚':'休'; }
const timely = (el, mEl) => { const s = stagione(el, mEl); return s==='旺'||s==='相'; };

/* ---------- 1. DATI PB VERBATIM DAL MOTORE ---------- */
let pbOut;
try {
  pbOut = execSync(`CARTA="${cross} ${date}" node pb_stress.js`, { cwd: HERE, encoding: 'utf8', stdio: ['pipe','pipe','pipe'] });
} catch (e) { console.log('ERRORE: il motore non ha prodotto la carta.', e.message.split('\n')[0]); process.exit(1); }
const pick = re => { const m = pbOut.match(re); return m ? m[1] : null; };
const seme = parseInt(pick(/seme (\d+)/), 10);
const annoB = pick(/anno (.)/), meseB = pick(/mese (.) \(/), giornoP = pick(/giorno (..)/);
const dayS = giornoP[0], dayB = giornoP[1];
const sup = parseInt(pick(/superiore (\d)/),10), inf = parseInt(pick(/inferiore (\d)/),10);
const linea = parseInt(pick(/linea mutante (\d)/),10);
const oraB = pick(/ora dal seme: (.)/);
const verdettoPB = pick(/verdetto finale: (\S+)/);
const emaDir = pick(/EMA (\w+)/);
const segnale = pick(/segnale (\w+)/);
const movimento = parseFloat(pick(/movimento (-?[\d.]+) pip/));
const pnl = parseFloat(pick(/pnl: (-?[\d.]+) pip/));
const realDir = movimento > 0 ? 'LONG' : 'SHORT';

/* ---------- 0. REGISTRO CARTE GIÀ LETTE ---------- */
const REGFILE = path.join(HERE, 'carte_lette.json');
let lette = [];
try { lette = JSON.parse(fs.readFileSync(REGFILE, 'utf8')); } catch(e) {}
const stessa = c => (c.cross===cross && c.date===date);
const gemella = c => (c.seme===seme && c.sup===sup && c.inf===inf && c.linea===linea && c.dayB===dayB && c.monthB===meseB && !stessa(c));
const giaLetta = lette.find(stessa);
const gemelle = lette.filter(gemella);

/* ---------- 2. RIGA DEGLI STELI ---------- */
// Steli di anno e mese DERIVATI dai rami del motore (00:00 GMT), non dal pilastro di
// mezzogiorno: nei giorni a cavallo di un termine solare il pilastro di mezzogiorno puo'
// appartenere al mese (o all'anno) sbagliato rispetto all'ingresso del trade.
// Anno: dato l'anno civile e il ramo d'anno del motore, lo stelo e' determinato.
// Mese: regola 五虎遁 (cinque tigri) dallo stelo d'anno + ramo di mese del motore.
const p = date.split('-').map(Number);
const annoS = (()=>{ const BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
  const STm=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  for (const Y of [p[0], p[0]-1]) {
    const idx=((Y-4)%12+12)%12;
    if (BR[idx]===annoB) return STm[((Y-4)%10+10)%10];
  }
  // ripiego (ramo d'anno assente): pilastro delle 00:00
  return Solar.fromYmdHms(p[0],p[1],p[2],0,0,0).getLunar().getEightChar().getYear().charAt(0);
})();
const meseS = (()=>{ if(!annoS||!meseB) return null;
  const PRIMO={'甲':'丙','己':'丙','乙':'戊','庚':'戊','丙':'庚','辛':'庚','丁':'壬','壬':'壬','戊':'甲','癸':'甲'};
  const BRm=['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
  const STm=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
  const i=BRm.indexOf(meseB), s0=PRIMO[annoS];
  if(i<0||!s0) return null;
  return STm[(STm.indexOf(s0)+i)%10];
})();
const lad = (ST.indexOf(dayS)%2===0) ? YANG : YIN;
const i0 = lad.indexOf(dayS);
const casa = s => { const j = lad.indexOf(s); return j<0?null:((j-i0+6)%6)+1; };
const oraS = (()=>{ const s0=WUSHU[dayS]; if(!s0||!oraB) return null;
  const i=B.indexOf(oraB); return i<0?null:ST[(ST.indexOf(s0)+i)%10]; })();
const steliT = [['anno',annoS],['mese',meseS],['giorno',dayS],['ora',oraS]].filter(x=>x[1]);
const ramiT = [annoB, meseB, dayB, oraB].filter(Boolean);
const conRadice = s => ramiT.some(b => WX[b]===SE[s]);
// flusso definitivo (22/08): tutti gli 8 caratteri; avanza finché il generato ha stelo di polarità del giorno
const pres = {};
for (const [,s] of steliT) (pres[SE[s]] = pres[SE[s]]||[]).push(s);
for (const b of ramiT) (pres[WX[b]] = pres[WX[b]]||[]).push(b);
const steloUtile = e => steliT.map(x=>x[1]).filter(s => SE[s]===e && lad.indexOf(s)>=0);
let capolinea=null, attore=null, attorePrec=null;
for (const part of Object.keys(pres)) {
  let e=part, guard=0, ultimo=null, ultimoS=null, penultimoS=null;
  while (guard++ < 6) { const g=GEN[e]; const su=steloUtile(g);
    if (!pres[g] || !su.length) break; penultimoS=ultimoS; e=g; ultimo=g; ultimoS=su[0]; }
  if (ultimo) { capolinea=ultimo; attore=ultimoS; attorePrec=penultimoS; }
}
// TERMINALE SENZA RADICE (Edu, 23/08/2026): se l'attore non e' radicato si prende
// ANCHE lo step precedente (stelo radicato). Le case cariche possono essere due.
let caseAttore = [];
if (attore) {
  caseAttore.push(casa(attore));
  if (!conRadice(attore)) {
    let prevS = attorePrec;
    if (!prevS) {
      const elPrev = Object.keys(GEN).find(e=>GEN[e]===SE[attore]);
      const su = elPrev ? steloUtile(elPrev) : [];
      prevS = su[0] || null;
    }
    if (prevS && conRadice(prevS)) {
      const cp = casa(prevS);
      if (cp && caseAttore.indexOf(cp)<0) { caseAttore.push(cp); attorePrec = prevS; }
      else attorePrec = null;
    } else attorePrec = null;
  } else attorePrec = null;
}
const casaAtt = caseAttore.length ? caseAttore : null;

/* ---------- 3. STRUTTURA LY (con eccezione §93-bis attiva) ---------- */
LYM.setCasaAttore(casaAtt);
const R = LYM.readManual(sup, inf, linea, dayB, meseB, annoB, dayS);
if (R.error) { console.log('ERRORE readManual: '+R.error); process.exit(1); }
const ctx = { oraBranch: oraB, emaDir: emaDir==='up'?'up':'down', date: date,
              yearStem: annoS, monthStem: meseS, hourStem: oraS, oraBranch: oraB, capolineaEl: capolinea };
const mEl = WX[meseB];

/* ---------- 4. VIE + RAFFORZATIVI ---------- */
const vie = [];
for (const v of LYM.LY_VIE) {
  const st = { opts: {} }; let d = null;
  try { d = v.test(R, ctx, st); } catch(e) { continue; }
  if (d) vie.push({ sezione: v.sezione, nome: v.nome, dir: d,
    ok: d===realDir, why: (st.why||'').replace(/<[^>]+>/g,'') });
}
const raff = [];
const RAFF_NOMI = ['ORA (partenza mobile = ora dal seme)','W BENEDETTA (virtù/stelo)','TAI SUI lega il giorno (§78)','SERPENTE untimely su Shi/Ying/mobile (§81)'];
for (let i=0;i<LYM.LY_RAFFORZATIVI.length;i++){
  try { if (LYM.LY_RAFFORZATIVI[i].test(R, ctx)) raff.push(RAFF_NOMI[i]||('#'+i)); } catch(e){}
}
const t = LYM.termometro(R, ctx, {}, {}) || {};

/* ---------- 5. MECCANICHE DI LETTURA ---------- */
const mecc = [];
const mob = R.linee[R.mutante.pos-1];
const M = R.mutante;
// rami di data vuoti (il ramo di data vuoto non colpisce — precedente PB)
const ramiVuoti = [['anno',annoB],['mese',meseB],['ora',oraB]].filter(([,b])=>b && R.vuoti.indexOf(b)>=0);
if (ramiVuoti.length) mecc.push('RAMI DI DATA VUOTI: '+ramiVuoti.map(([n,b])=>n+' '+b).join(', ')+' → non colpiscono (precedente PB; verificare che clash/combinazioni da questi rami non siano usate)');
// mutazione
mecc.push('MUTAZIONE: L'+M.pos+' '+M.ramoDep+'('+EL_IT[M.depEl]+') → '+M.ramoArr+'('+EL_IT[M.arrEl]+') · caso '+M.casoMut+(M.movimentoNullo?' · MOVIMENTO NULLO: '+M.motivoNullo:''));
// STATO DELL'ARRIVO NEL MESE (filtro obbligatorio, Edu 25/08/2026: "fai passare ogni carta
// attraverso tutti i filtri, inclusi timely e untimely" — guida gemella USDCHF 13/11 vs 28/07:
// arrivo vibrante controlla indietro e vince; arrivo in TOMBA non controlla e perde).
{
  const TOMBA={'Wood':'未','Fire':'戌','Metal':'丑','Water':'辰'};
  const mEl=WX[meseB], aEl=M.arrEl;
  let stato;
  if (TOMBA[aEl]===meseB) stato='IN TOMBA ('+aEl+'庫 in '+meseB+') — il controllo indietro NON funziona';
  else if (aEl===mEl) stato='旺 regnante nel mese';
  else if (GEN[mEl]===aEl) stato='相 VIBRANTE (il mese lo genera) — controlla indietro con forza';
  else if (GEN[aEl]===mEl) stato='休 riposa (genera il mese)';
  else if (CTRL[aEl]===mEl) stato='囚 prigione (controlla il mese)';
  else stato='死 morto (il mese lo controlla)';
  mecc.push('  └ STATO DELL\'ARRIVO '+M.ramoArr+' NEL MESE '+meseB+': '+stato);
}
// ARRIVO NEL VUOTO (caso 0) — "chi non vince perde" (Edu, 24/08/2026): la mobile NON
// muta e RESTA il carattere di partenza. G/W reggono e VINCONO la propria sede; B/P
// fanno PERDERE la propria sede (verso opposto). C: verso non definito. Il verso è la
// sede della mobile (bassa→SHORT, alta→LONG), invertito per B/P. PRECEDENZA: se c'è un
// 三合 completo o una combinazione del bersaglio, comanda quello (vedi sotto); se la
// mobile è Shi o Ying si legge ANCHE Shi↔Ying (se la Ying controlla lo Shi, lo Shi perde
// comunque). Nessuna mappatura secca tiene sul totale: va incrociata con le altre meccaniche.
if (M.movimentoNullo && (/arrival void/.test(M.motivoNullo||'') || R.vuoti.indexOf(M.ramoArr)>=0)) {
  const arrMascherato = !/arrival void/.test(M.motivoNullo||'') && R.vuoti.indexOf(M.ramoArr)>=0;
  const car = mob.par;
  const seatDir = p => p<=3 ? 'SHORT' : 'LONG';
  const tiene = (car==='G'||car==='W'), cade = (car==='B'||car==='P');
  if (mob.isShi || mob.isYing) {
    // la mobile è Shi o Ying: si legge il confronto Shi↔Ying (override del carattere)
    const shiL = R.linee[R.shi-1], yingL = R.linee[R.ying-1];
    const altro = mob.isShi ? yingL : shiL;
    let vinc, perche;
    if (CTRL[altro.el]===mob.el) { vinc=altro; perche='l\'altro controlla la mobile → la mobile perde'; }
    else if (CTRL[mob.el]===altro.el) { vinc=mob; perche='la mobile controlla l\'altro → la mobile vince'; }
    else if (tiene) { vinc=mob; perche=car+' regge → vince la mobile'; }
    else if (cade) { vinc=altro; perche=car+' fa perdere la mobile → vince l\'altro'; }
    else { vinc=null; perche='C → verso non definito'; }
    const dir = vinc ? seatDir(vinc.pos) : null;
    mecc.push('ARRIVO NEL VUOTO (chi non vince perde) · mobile = '+(mob.isShi?'Shi':'Ying')+' '+car+': '+perche+(dir?(' → sede del vincitore L'+vinc.pos+' = '+dir+(dir===realDir?' ✓':' ✗')):''));
  } else {
    // mobile terza linea: vale solo il carattere che resta
    let dir=null, spieg;
    if (tiene) { dir=seatDir(mob.pos); spieg=car+' regge → vince la propria sede'; }
    else if (cade) { dir=(seatDir(mob.pos)==='SHORT'?'LONG':'SHORT'); spieg=car+' fa perdere la propria sede → verso opposto'; }
    else spieg='C → verso non definito (tenuto fuori)';
    mecc.push('ARRIVO NEL VUOTO (chi non vince perde): mobile L'+mob.pos+' (terza linea) resta '+car+' — '+spieg+(dir?(' → '+dir+(dir===realDir?' ✓':' ✗')):''));
  }
  mecc.push('  └ PRECEDENZA: se sopra c\'è un 三合 completo o una combinazione del bersaglio, comanda quello, non il carattere della mobile');
  if (arrMascherato) mecc.push('  └ NB: l\'arrivo '+M.ramoArr+' è VUOTO ma l\'etichetta del motore è "'+M.motivoNullo+'" (il giorno sospende ANCHE): l\'arrivo-nel-vuoto vale comunque');
}
// ARRIVO IMPIGLIATO DAL GIORNO — regola CONFERMATA (Edu 22/08/2026; richiamata su
// USDCHF 21/01/2021, sessione 25): "B e P fanno perdere la squadra della propria sede —
// vale anche per il carattere di ARRIVO della mobile". Quando la mobile e' sospesa perche'
// il giorno COMBINA l'ARRIVO (arrivo impigliato), la mobile si muove nell'arrivo e vi resta
// LEGATA: la linea E' il carattere d'arrivo, fermo li'. B/P d'arrivo fanno perdere la sede
// della mobile (verso opposto); G/W la fanno vincere (sede); C tace.
if (M.movimentoNullo && M.casoMut===-1 && COMBINA[dayB]===M.ramoArr && R.vuoti.indexOf(M.ramoArr)<0) {
  const aEl2 = WX[M.ramoArr], pEl2 = R.palEl;
  const parA = aEl2===pEl2?'B': GEN[aEl2]===pEl2?'P': GEN[pEl2]===aEl2?'C': CTRL[aEl2]===pEl2?'G':'W';
  const seat2 = p => p<=3 ? 'SHORT' : 'LONG';
  let dir=null, spieg;
  if (parA==='G'||parA==='W') { dir=seat2(mob.pos); spieg=parA+' d\'arrivo legato → vince la sede della mobile'; }
  else if (parA==='B'||parA==='P') { dir=(seat2(mob.pos)==='SHORT'?'LONG':'SHORT'); spieg=parA+' d\'arrivo legato lì → fa perdere la sede della mobile'; }
  else spieg='C d\'arrivo → tace';
  mecc.push('ARRIVO IMPIGLIATO (regola confermata: il carattere d\'arrivo vale): L'+mob.pos+' si muove in '+M.ramoArr+' ('+parA+') che resta legato dal giorno — '+spieg+(dir?(' → '+dir+(dir===realDir?' ✓':' ✗')):''));
}
if (M.progressione) mecc.push('PROGRESSIONE: '+M.progressione+' ('+(M.progressione==='avanzante'?'進神':'退神')+')');
// TAI SUI SUL MOVIMENTO (Edu, 23/08/2026, da EURGBP 22/05/2024 — DA OSSERVARE SEMPRE):
// lo stelo dell'anno in casa sulla MOBILE + il ramo dell'anno che clasha l'ARRIVO
// -> il Tai Sui IMPEDISCE il movimento/avanzamento.
{
  const casaAnno = casa(annoS);
  if (casaAnno) mecc.push('TAI SUI '+annoS+annoB+': stelo '+annoS+' in casa su L'+casaAnno+(casaAnno===M.pos?' (LA MOBILE)':''));
  if (casaAnno===M.pos && annoB && CLASH[annoB]===M.ramoArr)
    mecc.push('⚠ TAI SUI IMPEDISCE IL MOVIMENTO: stelo dell\'anno in casa sulla mobile e ramo dell\'anno ('+annoB+') clasha l\'arrivo ('+M.ramoArr+') → '+(M.progressione?'l\'avanzamento':'il movimento')+' NON si compie');
}
// atterraggio §93/§93-bis
if (M.atterraggio) {
  const carico = (casaAtt && casaAtt.indexOf(M.atterraggio.pos)>=0) ? ' · DESTINAZIONE CARICA dal condotto (§93-bis)' : '';
  const caricata = M.atterraggio.caricata ? ' · il mosso GENERA la destinazione → la squadra della caricata perde (§94)' : '';
  mecc.push('ATTERRAGGIO: su L'+M.atterraggio.pos+' ('+M.atterraggio.ramo+') → '+M.atterraggio.dir+carico+caricata+(M.atterraggio.dir===realDir?' ✓':' ✗'));
} else if (!M.movimentoNullo) {
  const coinc = COMBINA[M.ramoArr];
  const destL = R.linee.find(l=>l.ramo===coinc);
  if (destL && CLASH[dayB]===coinc && !timely(WX[coinc], mEl) && R.vuoti.indexOf(coinc)<0)
    mecc.push('ATTERRAGGIO ANNULLATO (§93): destinazione L'+destL.pos+' ('+coinc+') rotta dal giorno, non carica');
  else if (!destL) mecc.push('NESSUN ATTERRAGGIO: l\'arrivo '+M.ramoArr+' combinerebbe '+coinc+', assente dall\'esagramma → capannello sull\'arrivo');
  else mecc.push('NESSUN ATTERRAGGIO (altra ragione: verificare vuoto/stato di L'+destL.pos+')');
}
// arrivo che combina/clasha linee (fuori dall'atterraggio: bersagli di §92, §89 ecc.)
if (!M.movimentoNullo) {
  for (const l of R.linee) { if (l.pos===M.pos) continue;
    if (COMBINA[M.ramoArr]===l.ramo) mecc.push('ARRIVO COMBINA L'+l.pos+' ('+l.ramo+' '+l.par+') — perimetro §92 se la combinata è C; §41-famiglia altrimenti');
    if (CLASH[M.ramoArr]===l.ramo) mecc.push('ARRIVO CLASHA L'+l.pos+' ('+l.ramo+' '+l.par+') — la linea legata dal mese clashata è LIBERATA (sub-§89); perimetro G1 se casa di stelo radicato');
  }
  // M9 (Edu, 23/08/2026, da EURUSD 20/11/2024): l'arrivo IMPIGLIATO DAL MESE —
  // il mese combina la linea futura e ha la forza di legare se SORMONTATO da uno
  // stelo dell'elemento del capolinea (terminale del flusso) -> movimento non si compie
  if (COMBINA[meseB]===M.ramoArr) {
    const carico = capolinea && SE[meseS]===capolinea;
    mecc.push((carico?'⚠ ':'')+'MESE COMBINA L\'ARRIVO ('+meseB+'+'+M.ramoArr+')'+
      (carico ? ' e il mese è SORMONTATO da stelo del terminale ('+meseS+' '+EL_IT[SE[meseS]]+' = capolinea) → M9: il movimento NON si compie, la mobile resta se stessa'
              : ' — ma lo stelo del mese ('+meseS+') non è del terminale: forza da valutare'));
  }
}
// linee colpite dal giorno/mese
for (const l of R.linee) {
  if (CLASH[dayB]===l.ramo && l.pos!==M.pos) mecc.push('GIORNO clasha L'+l.pos+' ('+l.ramo+' '+l.par+') · stato='+l.stato);
  if (CLASH[meseB]===l.ramo) mecc.push('MESE clasha L'+l.pos+' ('+l.ramo+' '+l.par+') · stato='+l.stato+(R.vuoti.indexOf(meseB)>=0?' · MA MESE VUOTO':''));
  if (COMBINA[dayB]===l.ramo && l.pos!==M.pos) mecc.push('GIORNO combina L'+l.pos+' ('+l.ramo+' '+l.par+') — arrivo impigliato se è l\'arrivo della mobile');
}
// STELI FILONE 2 (Edu, 23/08/2026, da NZDUSD 17/06/2025 — INDIPENDENTE dal flusso del Qi):
// lo stelo sormontante di anno/mese/ora dello STESSO ELEMENTO della BESTIA (六獸) della
// linea bersaglio rende il pilastro CAPACE DI OPERARE su quella linea: il clash e'
// EFFETTIVO (combinazioni e altro: da osservare). Se blocca la partenza della mobile ->
// "chi non porta a termine la vittoria, perde".
const BESTIE=['青龍','朱雀','勾陳','螣蛇','白虎','玄武'];
const BESTIA_EL={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
const bStart={'甲':0,'乙':0,'丙':1,'丁':1,'戊':2,'己':3,'庚':4,'辛':4,'壬':5,'癸':5}[dayS];
const bestiaDi = pos => BESTIE[(bStart + pos - 1) % 6];
for (const [pn, ps, pb] of [['anno',annoS,annoB],['mese',meseS,meseB],['ora',oraS,oraB]]) {
  if (!ps || !pb) continue;
  for (const l of R.linee) {
    const bst = bestiaDi(l.pos);
    if (SE[ps]!==BESTIA_EL[bst]) continue;
    if (CLASH[pb]===l.ramo)
      mecc.push('⚠ CLASH EFFETTIVO (steli filone 2): '+pn+' '+ps+pb+' — stelo '+ps+' ('+EL_IT[SE[ps]]+') stesso elemento della bestia '+bst+' su L'+l.pos+' ('+l.ramo+') → il clash opera'+(l.pos===M.pos?'; blocca la PARTENZA della mobile → "chi non porta a termine la vittoria, perde"':''));
    if (COMBINA[pb]===l.ramo)
      mecc.push('STELI FILONE 2 (in osservazione): '+pn+' '+ps+pb+' combina L'+l.pos+' ('+l.ramo+', bestia '+bst+') con stelo dello stesso elemento — la combinazione potrebbe operare');
  }
}
// trigoni 三合 completi (visibili + fushen; vuoti esclusi se fermi)
const ramiVis = R.linee.filter(l=>!(R.vuoti.indexOf(l.ramo)>=0 && !l.isMobile)).map(l=>l.ramo);
const ramiFus = R.linee.filter(l=>l.fushen).map(l=>l.fushen.b);
const tuttiR = ramiVis.concat(ramiFus);
// il terzo membro puo' venire dai rami di data (regola Edu 19/08): rami di data
// ammessi solo se NON vuoti del giorno
const ramiData = ramiT.filter(b => R.vuoti.indexOf(b) < 0);
const tuttiR2 = tuttiR.concat(ramiData);
for (const T3 of TRIGONI) {
  if (T3.every(b=>tuttiR.indexOf(b)>=0)) {
    mecc.push('三合 COMPLETO '+T3.join('')+' ('+EL_IT[WX[T3[1]]]+')'+(T3.some(b=>ramiFus.indexOf(b)>=0)?' · terzo membro in 伏神':''));
  } else if (T3.every(b=>tuttiR2.indexOf(b)>=0) && T3.filter(b=>tuttiR.indexOf(b)>=0).length>=2) {
    const daData = T3.filter(b=>tuttiR.indexOf(b)<0);
    const dove = daData.map(b=>{
      const n=[]; if(b===annoB)n.push('anno'); if(b===meseB)n.push('mese'); if(b===dayB)n.push('giorno'); if(b===oraB)n.push('ora');
      return b+' ('+n.join('/')+')';
    }).join(', ');
    mecc.push('三合 COMPLETO '+T3.join('')+' ('+EL_IT[WX[T3[1]]]+') · terzo membro dai RAMI DI DATA: '+dove);
  }
}
// fushen notevoli
for (const l of R.linee) { if (!l.fushen) continue;
  if (l.fushen.b===dayB) mecc.push('伏神 sotto L'+l.pos+' = ramo del giorno ('+l.fushen.b+'): se timely SOPPRIME la linea sopra');
  if (annoB && R.linee[l.pos-1].isTaiSui) mecc.push('TAI SUI su L'+l.pos+' con 伏神 '+l.fushen.par+' '+l.fushen.b+': se la linea lo genera, il nascosto agisce anche se vuoto');
}
// G-direzionale / W (chi parla per primo)
const shiL = R.linee[R.shi-1];
if (shiL.par==='G' || shiL.par==='W') {
  const posDir = R.shi>=4 ? 'SALE' : 'SCENDE';
  const gd = shiL.forte ? posDir : (posDir==='SALE'?'SCENDE':'SALE');
  mecc.push('SHI = '+shiL.par+' ('+shiL.ramo+') · posizione dice '+posDir+', '+(shiL.forte?'forte → resta':'debole → ribalta')+' → '+gd+(((gd==='SALE')===(realDir==='LONG'))?' ✓':' ✗'));
}
// LETTURA BASE SHI/YING (Edu — "Ying genera Shi" e famiglia; aggiunta 23/08 dopo EURUSD 13/04/2021)
{
  const yingL = R.linee[R.ying-1];
  const shiVivo = !['rotta','dormiente','eliminata','legata'].includes(shiL.stato);
  const yingVivo = !['rotta','dormiente','eliminata','legata'].includes(yingL.stato);
  const mobileSignificativa = !M.movimentoNullo;
  if (shiVivo && yingVivo) {
    const dirShi = R.shi>=4 ? 'LONG' : 'SHORT';
    const dirYing = R.ying>=4 ? 'LONG' : 'SHORT';
    if (GEN[yingL.el]===shiL.el)
      mecc.push('YING GENERA SHI ('+yingL.ramo+' '+EL_IT[yingL.el]+' → '+shiL.ramo+' '+EL_IT[shiL.el]+') → vince la sede dello Shi → '+dirShi+(dirShi===realDir?' ✓ (lettura base, carta banale)':' ✗'));
    else if (GEN[shiL.el]===yingL.el)
      mecc.push('SHI GENERA YING ('+shiL.ramo+' → '+yingL.ramo+'): lo Shi si scarica — verso da leggere');
    else if (CTRL[yingL.el]===shiL.el)
      mecc.push('YING CONTROLLA SHI ('+yingL.ramo+' → '+shiL.ramo+'): verso da leggere (P clashata cede, G/C tengono)');
    else if (CTRL[shiL.el]===yingL.el)
      mecc.push('SHI CONTROLLA YING ('+shiL.ramo+' → '+yingL.ramo+') → domina lo Shi → '+dirShi+(dirShi===realDir?' ✓':' ✗'));
    else if (shiL.el===yingL.el)
      mecc.push('SHI E YING STESSO ELEMENTO ('+EL_IT[shiL.el]+'): stallo — cercare chi lo rompe (Tai Sui, 伏神, movimento)');
  }
  // YING VUOTO E CONTROLLATO (Edu, 23/08/2026, da NZDUSD 16/06/2025): Shi controlla Ying
  // e lo Ying e' VUOTO -> in mancanza di mobili significative, lo Ying perde da se'.
  if (shiVivo && yingL.stato==='dormiente' && CTRL[shiL.el]===yingL.el && !mobileSignificativa) {
    const dirShi = R.shi>=4 ? 'LONG' : 'SHORT';
    mecc.push('SHI CONTROLLA YING VUOTO ('+shiL.ramo+' → '+yingL.ramo+' dormiente, nessuna mobile significativa) → lo Ying perde da sé → '+dirShi+(dirShi===realDir?' ✓ (lettura base)':' ✗'));
  }
}

/* ---------- 6. PERIMETRI DEI CANDIDATI ---------- */
const cand = [];
// M1/G1 (CLASHSTELI): linee casa di stelo radicato colpite
for (const l of R.linee) {
  const inCasa = steliT.map(x=>x[1]).filter(s=>lad.indexOf(s)>=0 && casa(s)===l.pos);
  if (!inCasa.length) continue;
  const radic = inCasa.filter(conRadice);
  const fonti = [];
  if (CLASH[dayB]===l.ramo) fonti.push('giorno');
  if (CLASH[meseB]===l.ramo) fonti.push('mese');
  if (M.casoMut>0 && CLASH[M.ramoArr]===l.ramo) fonti.push('arrivo mobile');
  if (!fonti.length) continue;
  const tag = radic.length ? 'stelo RADICATO '+radic.join('') : 'stelo '+inCasa.join('')+' SENZA radice (fuori perimetro)';
  const per = (l.par==='P'||l.par==='B') ? (fonti[0]==='mese'?'M1':'G1')+' (P/B → sede perde)' : 'cella esplorativa (C/W/G)';
  cand.push('CLASHSTELI: L'+l.pos+' ('+l.ramo+' '+l.par+') colpita da '+fonti.join('+')+' · '+tag+' → '+per+(radic.length&&R.vuoti.indexOf(meseB)>=0&&fonti[0]==='mese'?' · ATTENZIONE MESE VUOTO':''));
}
// GVUOTO2: G mobile con arrivo in vuoto → LONG
if (mob.par==='G' && R.vuoti.indexOf(M.ramoArr)>=0)
  cand.push('GVUOTO2 (M2, "il G che non atterra va in alto"): G mobile, arrivo '+M.ramoArr+' vuoto → LONG'+(realDir==='LONG'?' ✓':' ✗'));
// SALTOVUOTO (M1 parte 1): linea vuota ferma clashata dal giorno → salto
for (const l of R.linee) {
  if (l.isMobile) continue;
  if (R.vuoti.indexOf(l.ramo)>=0 && CLASH[dayB]===l.ramo) {
    const salto = COMBINA[l.ramo];
    const bers = R.linee.find(x=>x.ramo===salto);
    cand.push('SALTOVUOTO (M1 dottrinale): L'+l.pos+' ('+l.ramo+') vuota svegliata dal giorno'+(bers?(' → salta a combinarsi con L'+bers.pos+' ('+bers.ramo+' '+bers.par+')'+((bers.isShi||bers.isYing)&&GEN[l.el]===bers.el?' e la NUTRE → vince la sede della nutrita':'')):' (nessun bersaglio di salto)'));
  }
}
// MOBCLASH: mobile clashata da giorno+mese
if (CLASH[dayB]===M.ramoDep && CLASH[meseB]===M.ramoDep)
  cand.push('MOBCLASH: mobile clashata da giorno E mese → opposto ("chi non vince perde")');
// TAISUIMOB: Tai Sui clasha la partenza della mobile
if (annoB && CLASH[annoB]===M.ramoDep)
  cand.push('TAISUIMOB (con riserva): Tai Sui '+annoB+' clasha la partenza della mobile');
// HUITOU (M3): 回頭生 con tomba
if (M.casoMut===1 && GEN[M.arrEl]===M.depEl)
  cand.push('回頭生: verificare tomba aperta / arrivo in tomba di mese (M3, lettura non via)');
// §88 anno muto carico che clasha
if (annoB && R.linee.some(l=>CLASH[annoB]===l.ramo) && !R.linee.some(l=>l.ramo===annoB))
  cand.push('§88-famiglia: anno '+annoB+' muto che clasha una linea (verificare se carico)');
// [3-bis] BESTIE E RADICI — in primo piano su richiesta di Edu (25/08/2026): se sostenute
// dal flusso (radici nei rami del calendario) possono cambiare la lettura radicalmente.
{
  const BEL={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
  const ramiCal=[dayB,meseB,annoB,oraB].filter(Boolean);
  const righe=R.linee.map(l=>{
    const el=l.bestia?BEL[l.bestia.cn]:null;
    const rad=el?ramiCal.filter(b=>WX[b]===el).length:0;
    return 'L'+l.pos+' '+(l.bestia?l.bestia.cn:'—')+'('+rad+(rad>=2?'★':'')+')';
  });
  console.log('');
  console.log('[3-bis] BESTIE (radici nei rami giorno/mese/anno/ora; ★ = sostenuta dal flusso)');
  console.log('  '+righe.join('  '));
}

// [3-ter] STADI 十二長生 NEL MESE — IL FILTRO PIU' IMPORTANTE (Edu, 25/08/2026):
//   stadi 1-6 timely (migliori 1,4,5) · stadi 7-12 untimely (peggiori 8,9,10).
//   Leggi di sopravvivenza: untimely clashata NON SOPRAVVIVE · timely clashata E' PIU' FORTE ·
//   untimely generata (dal giorno o da una linea) puo' ancora operare · timely drenata puo' ancora operare.
//   Terra: scuola 火土同宮 (ciclo del Fuoco) — da confermare con Edu.
const BR12=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const NASCITA={'Wood':'亥','Fire':'寅','Metal':'巳','Water':'申'};   // Terra: regola propria (Edu 25/08), non segue il ciclo
const NOMI12=['長生 Nascita','沐浴 Bagno','冠帶 Vestizione','臨官 Ufficio','帝旺 Apice','衰 Declino','病 Malattia','死 Morte','墓 Tomba','絕 Recisione','胎 Embrione','養 Nutrimento'];
function stadio(el, ramo){ if(el==='Earth') return null; const i=BR12.indexOf(ramo), n=BR12.indexOf(NASCITA[el]); if(i<0||n<0) return null; return ((i-n+12)%12)+1; }
// TERRA (regola di Edu, 25/08/2026): timely nei 4 mesi di Terra (丑辰未戌), vibrante in estate (巳午), untimely altrove.
function terraTimely(ramoMese){ if('丑辰未戌'.indexOf(ramoMese)>=0) return 'terra'; if('巳午'.indexOf(ramoMese)>=0) return 'estate'; return null; }
function isTimely(el, ramoMese){ if(el==='Earth') return terraTimely(ramoMese)!==null; const s=stadio(el,ramoMese); return !!s && s<=6; }
function stadioTxt(el, ramoMese){
  if(el==='Earth'){ const t=terraTimely(ramoMese);
    if(t==='terra') return 'TIMELY (mese di Terra '+ramoMese+')';
    if(t==='estate') return 'TIMELY — 相 vibrante (l\'estate la genera)';
    return 'untimely (Terra fuori dai suoi mesi)'; }
  const s=stadio(el,ramoMese); if(!s) return '?';
  const t=s<=6, top=(s===1||s===4||s===5), worst=(s===8||s===9||s===10);
  return 'stadio '+s+' '+NOMI12[s-1]+' — '+(t?'TIMELY'+(top?' (top)':''):'untimely'+(worst?' (peggiore)':'')); }
{
  console.log('');
  console.log('[3-ter] STADI 十二長生 nel mese '+meseB+' (1-6 timely, 7-12 untimely; leggi di sopravvivenza)');
  for (const l of R.linee) {
    const el=WX[l.ramo];
    // lo stadio dell'ELEMENTO della linea si calcola rispetto al RAMO DEL MESE
    let riga='  L'+l.pos+' '+l.ramo+' ('+(EL_IT[el]||el)+'): '+stadioTxt(el, meseB);
    const timely=isTimely(el, meseB);
    const clashata = CLASH[dayB]===l.ramo || CLASH[meseB]===l.ramo;
    if (clashata) riga += timely ? '  · CLASHATA → PIU\' FORTE' : '  · CLASHATA → NON SOPRAVVIVE';
    console.log(riga);
  }
  console.log('  ARRIVO '+M.ramoArr+' ('+(EL_IT[M.arrEl]||M.arrEl)+'): '+stadioTxt(M.arrEl, meseB));
}

// ============================================================
// CANDIDATI ATTIVI — misurati a OGNI carta, alimentano l'esito.
// Per aggiungerne uno: appendere una funzione a candAttivi che
// ritorna null (non tocca la carta) oppure {dir, desc}. Il verso
// reale decide ✓/✗ e quindi se la carta risulta "spiegata".
// ============================================================
const XING = {'子':['卯'],'卯':['子'],'寅':['巳'],'巳':['申'],'申':['寅'],
              '丑':['戌'],'戌':['未'],'未':['丑'],'辰':['辰'],'午':['午'],'酉':['酉'],'亥':['亥']};
const puni = (x,y)=> (XING[x]||[]).indexOf(y)>=0;
const candAttivi = [
  // 刑 amplificato che abbatte il ramo del giorno sulla/sotto la linea del 青龍
  // (osservazione 25/08/2026 — carta madre USDCAD 07/03/2023). n 20 · 75% · z 2,24.
  function(){
    const drago = R.linee.find(l=>l.bestia && l.bestia.cn==='青龍');
    if(!drago) return null;
    const pil=[dayB,meseB,annoB,oraB].filter(Boolean);
    const cnt={}; pil.forEach(b=>{cnt[b]=(cnt[b]||0)+1;});
    const ampl=Object.keys(cnt).filter(b=>cnt[b]>=2);            // 刑 amplificato
    const dayOnDrago = drago.ramo===dayB || (drago.fushen && drago.fushen.b===dayB);
    if(!dayOnDrago) return null;                                 // dev'essere day-embodied sul 青龍
    const colpi = ampl.filter(x=>puni(x,dayB));
    if(!colpi.length) return null;                              // nessun ramo amplificato punisce il giorno
    const dir = drago.pos<=3 ? 'LONG' : 'SHORT';               // trigramma del drago perde → vince l'altro
    return {dir, desc:'刑 amplificato day-embodied sul 青龍 (L'+drago.pos+') → ramo del giorno '+
      dayB+' punito da '+colpi.join('')+' → il suo trigramma perde → '+dir};
  },
];
for(const f of candAttivi){
  let out=null; try{ out=f(); }catch(e){ out=null; }
  if(out) cand.push(out.desc + (out.dir===realDir?' ✓':' ✗'));
}
// DUELLO-24 — CABLATE §107/§108 il 27/08/2026: qui resta la DIAGNOSTICA del perimetro
// mobile CHIUSA AI DUE CAPI (il giorno combina la partenza E clasha l'arrivo, o lo speculare)
// -> non può né partire né arrivare, esce dalla decisione -> duello Shi/Ying.
// CASO SPECIALE: se la mobile è anche IN VUOTO non parte nemmeno (l'arrivo non esiste senza
// partenza): linea inerte. Il flusso CON LA COMBINAZIONE DEGLI STELI (gli steli legati non
// possono essere capolinea), se termina sull'elemento della BESTIA della linea inerte, vi si
// ferma e il PILASTRO DEL GIORNO ne diventa padrone. Duello per GENERAZIONE (il padrone
// sostituisce la linea inerte se è Shi o Ying): chi genera cede il Qi, chi riceve vince.
// Altrimenti duello normale: la Ying VUOTA non agisce -> vince lo Shi (13/13, +874 pip).
// Lo speculare (Shi vuoto -> Ying) NON vale (44,4%); senza vuoti il duello non parla.
(() => {
  if (M.casoMut !== -1) return;
  const doppio = (COMBINA[dayB]===M.ramoDep && CLASH[dayB]===M.ramoArr)
              || (CLASH[dayB]===M.ramoDep && COMBINA[dayB]===M.ramoArr);
  if (!doppio) return;
  const S=R.linee[R.shi-1], Y=R.linee[R.ying-1]; if(!S||!Y) return;
  // — caso speciale (mobile inerte) —
  if (mob.vuoto) {
    const HE={'甲':'己','己':'甲','乙':'庚','庚':'乙','丙':'辛','辛':'丙','丁':'壬','壬':'丁','戊':'癸','癸':'戊'};
    const stemsA = steliT.map(x=>x[1]);
    const legati=new Set();
    for(let i=0;i<stemsA.length;i++) for(let j=i+1;j<stemsA.length;j++)
      if(HE[stemsA[i]]===stemsA[j]){ legati.add(i); legati.add(j); }
    const liberi=stemsA.filter((s,i)=>!legati.has(i));
    const util2=e=>liberi.filter(s=>SE[s]===e && lad.indexOf(s)>=0);
    let cap2=null, lung2=-1;
    for(const part of Object.keys(pres)){
      let e=part,g2=0,ult=null,passi=0;
      while(g2++<6){ const g=GEN[e]; const su=util2(g); if(!pres[g]||!su.length)break; e=g; ult=g; passi++; }
      if(ult&&passi>lung2){ lung2=passi; cap2=ult; }
    }
    const BEL2={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
    const bstEl=mob.bestia?BEL2[mob.bestia.cn]:null;
    if (cap2 && bstEl && cap2===bstEl) {
      const padroneEl=SE[dayS];
      const elShi = (M.pos===R.shi) ? padroneEl : S.el;
      const elYing = (M.pos===R.ying) ? padroneEl : Y.el;
      let vinc=null;
      if (GEN[elShi]===elYing) vinc=Y; else if (GEN[elYing]===elShi) vinc=S;
      const testa='DUELLO-24 (§108 CABLATA) CASO SPECIALE: mobile VUOTA chiusa ai due capi (inerte) · flusso con combinazione degli steli termina sulla bestia '+(mob.bestia?mob.bestia.cn:'—')+' ('+EL_IT[bstEl]+') della mobile · pilastro del giorno '+dayS+dayB+' padrone della linea';
      if (vinc) cand.push(testa+' · chi riceve la generazione vince: '+(vinc===S?'Shi L'+S.pos:'Ying L'+Y.pos)+' → '+(vinc.pos<=3?'SHORT':'LONG')+((vinc.pos<=3?'SHORT':'LONG')===realDir?' ✓':' ✗'));
      else cand.push(testa+' · nessuna generazione fra i contendenti — il principio non parla (caso degenere)');
      return;                                       // il caso speciale assorbe il duello normale
    }
  }
  // — duello normale: il vuoto non agisce —
  if (Y.vuoto && !S.vuoto)
    cand.push('DUELLO-24 (§107 CABLATA): mobile chiusa ai due capi · esce dalla decisione · Ying L'+Y.pos+' ('+Y.ramo+') VUOTA non agisce → vince lo Shi L'+S.pos+' → '+(S.pos<=3?'SHORT':'LONG')+((S.pos<=3?'SHORT':'LONG')===realDir?' ✓':' ✗'));
  else if (S.vuoto && !Y.vuoto)
    cand.push('DUELLO-24: mobile chiusa ai due capi, Shi VUOTO (diagnostica) — lo speculare NON è in osservazione (44,4%): non usare come verdetto');
  else
    cand.push('DUELLO-24: mobile chiusa ai due capi, nessun vuoto fra Shi e Ying (diagnostica) — il duello non parla (celle di controllo piatte)');
})();
// INCOMP-24 — CABLATA §109 il 27/08/2026 (diagnostica di perimetro; la via vera e' in LY_VIE)
// trigramma che la ospita — SOLO le cinque coppie di Edu: 丑∈坤 卯∈兌 辰∈乾 午∈坎 申∈艮 —
// non vuota, che SI PRENDE BESTIA E STELI (bestia radicata nella data + stelo radicato in
// casa sulla linea), unica, a movimento nullo (caso -1). Direzioni EMPIRICHE (51 carte,
// 62,7%, z 1,82: rec 58% / vec 72%): G/P/W -> la sua squadra VINCE; B -> PERDE; C tace.
// La "B perde" attende certificazione dottrinale di Edu. Rapporto elementale linea/trigramma
// e timeliness: mappa in CANDIDATI, campione troppo piccolo per decidere.
(() => {
  if (M.casoMut !== -1) return;
  const EDU24={'丑':8,'卯':2,'辰':1,'午':6,'申':7};
  const BEL24={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
  const q=R.linee.filter(l=>{
    const trig=l.pos<=3?inf:sup;
    if(EDU24[l.ramo]!==trig||l.vuoto) return false;
    const bEl=l.bestia?BEL24[l.bestia.cn]:null;
    if(!bEl||!ramiT.some(b=>WX[b]===bEl)) return false;
    return steliT.some(x=>{const s=x[1];return casa(s)===l.pos&&conRadice(s);});
  });
  if(q.length!==1) return;
  const l=q[0];
  if(l.par==='C'){ cand.push('INCOMP-24 (§109): linea incompatibile carica L'+l.pos+' '+l.ramo+' e\' una C — il candidato tace'); return; }
  const vinceSquadra=(l.par!=='B');
  const dir=vinceSquadra?(l.pos<=3?'SHORT':'LONG'):(l.pos<=3?'LONG':'SHORT');
  cand.push('INCOMP-24 (§109 CABLATA): L'+l.pos+' '+l.ramo+' ('+l.par+') incompatibile col trigramma, si prende bestia e steli → '
    +(vinceSquadra?'la sua squadra VINCE':'B: la sua squadra PERDE')+' → '+dir+(dir===realDir?' ✓':' ✗'));
})();
// ELASTICOF §85
cand.push('§85 elastico×forza: da valutare A MANO se c\'è una liberata (serve il modello di forza — non automatizzato qui)');

/* ---------- STAMPA ---------- */
const li = s => console.log('  ' + s);
console.log('='.repeat(78));
console.log('CARTA CHECK · '+cross+' '+date.split('-').reverse().join('/'));
console.log('='.repeat(78));
if (giaLetta) console.log('⚠⚠ CARTA GIÀ LETTA il '+giaLetta.quando+(giaLetta.nota?' — '+giaLetta.nota:''));
for (const g of gemelle) console.log('⚠ GEMELLA già letta: '+g.cross+' '+g.date+' (stesso seme+trigrammi+giorno)'+(g.nota?' — '+g.nota:''));
console.log('');
console.log('[1] PB (verbatim dal motore)');
li('Trend EMA: '+(emaDir==='up'?'LONG':'SHORT'));
{
  const lyD = t.dir || null;
  const acc = lyD===null ? ' (il LY tace)' : (lyD===segnale ? ', e anche il LY' : ', ma non il LY (LY dice '+lyD+')');
  li('Il sistema (PB) dice: '+segnale+' ('+(verdettoPB==='PROSEGUE'?'segue':'non segue')+' il trend)'+acc);
}
li('Esito: mercato '+realDir+' reale; '+(movimento>0?'+':'')+movimento.toFixed(0)+' pip → il PB '+(pnl>0?'VINCE':'PERDE')+' ('+(pnl>0?'+':'')+pnl.toFixed(0)+')');
li('Seme '+seme+' · sup '+sup+' · inf '+inf+' · mutante L'+linea);
li('Bazi: anno '+annoS+annoB+' · mese '+meseS+meseB+' · giorno '+dayS+dayB+' · ora '+(oraS||'—')+(oraB||''));
console.log('');
console.log('[2] STELI (case + radici + capolinea)');
for (const [n,s] of steliT) {
  const c = casa(s);
  li(n+' '+s+' ('+EL_IT[SE[s]]+') · '+(c?('casa L'+c):'fuori scala (polarità opposta)')+' · '+(conRadice(s)?'RADICATO':'senza radice'));
}
li('Capolinea: '+(capolinea?EL_IT[capolinea]+' · attore '+attore+(conRadice(attore)?'':' (SENZA radice)')+' · casa L'+caseAttore[0]+(attorePrec?' — terminale scarico → ANCHE lo step precedente: '+attorePrec+' · casa L'+caseAttore[1]:''):'nessuno (nessuno stelo utilizzabile)'));
console.log('');
console.log('[3] LY · palazzo '+R.palName+' ('+EL_IT[R.palEl]+') · Shi L'+R.shi+' · Ying L'+R.ying+' · vuoti '+R.vuoti.join(''));
for (const l of R.linee)
  li('L'+l.pos+' '+l.ramo+' '+l.par+' '+(l.isShi?'SHI ':'')+(l.isYing?'YING ':'')+(l.isMobile?'MOBILE ':'')+(l.isTaiSui?'TAISUI ':'')+'· '+l.stato+' · '+(l.forte?'forte':'debole')+(l.fushen?' · 伏神 '+l.fushen.par+' '+l.fushen.b:''));
console.log('');
console.log('[4] VIE CABLATE ('+LYM.LY_VIE.length+' valutate)');
if (!vie.length) li('nessuna via scatta — LY tace');
for (const v of vie) li('§'+v.sezione+' '+v.nome+' → '+v.dir+(v.ok?' ✓ SPIEGA LA CARTA':' ✗'));
li('termometro (prima in priorità): '+(t.dir?('§'+t.sezione+' → '+t.dir):'silenzio'));
if (raff.length) li('rafforzativi attivi: '+raff.join(' · '));
console.log('');
console.log('[5] MECCANICHE DI LETTURA');
for (const m of mecc) li(m);
console.log('');
console.log('[6] PERIMETRI DEI CANDIDATI (CANDIDATI_OSSERVAZIONE.md)');
if (!cand.length) li('nessun candidato tocca questa carta');
for (const c of cand) li(c);
console.log('');
const spiegataDaVia = vie.some(v=>v.ok);
// una meccanica o un candidato "spiega" la carta se la sua lettura AZZECCA il verso reale
// (riga che termina con ✓). Il filtro dichiara DA LEGGERE solo se NULLA la spiega —
// né via cablata, né meccanica in [5], né candidato in [6] (regola Edu 24/08/2026).
const meccOk = mecc.filter(m=>m.includes('✓'));
const candOk = cand.filter(c=>c.includes('✓'));
const etichetta = s => s.replace(/\s*→.*$/,'').replace(/\s*\(.*$/,'').trim();
if (spiegataDaVia) {
  console.log('[ESITO FILTRO] SPIEGATA da via cablata ('+vie.filter(v=>v.ok).map(v=>'§'+v.sezione).join(', ')+') — verificare priorità nel termometro');
} else if (meccOk.length || candOk.length) {
  const chi = meccOk.concat(candOk).map(etichetta).filter((v,i,a)=>a.indexOf(v)===i).join(' · ');
  console.log('[ESITO FILTRO] NESSUNA via cablata, MA la spiega una meccanica/candidato in osservazione: '+chi+' — NON portarla a Edu come \"non spiegata\"; se semmai è da promuovere a via, misurarla nel perimetro');
} else {
  console.log('[ESITO FILTRO] NULLA la spiega — né via cablata, né meccanica in [5], né candidato in [6]. Questa è DA LEGGERE con Edu.');
}

/* ---------- REGISTRAZIONE ---------- */
if (REGISTRA) {
  if (giaLetta) { console.log('\n(non registrata di nuovo: già presente)'); }
  else {
    lette.push({ cross, date, seme, sup, inf, linea, dayB, monthB: meseB,
      quando: new Date().toISOString().slice(0,10), esito: realDir+' '+(movimento>0?'+':'')+movimento.toFixed(0), nota: NOTA });
    fs.writeFileSync(REGFILE, JSON.stringify(lette, null, 1));
    console.log('\nREGISTRATA in carte_lette.json'+(NOTA?' — "'+NOTA+'"':''));
  }
}
