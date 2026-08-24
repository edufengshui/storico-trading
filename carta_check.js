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
const p = date.split('-').map(Number);
const ec = Solar.fromYmdHms(p[0],p[1],p[2],12,0,0).getLunar().getEightChar();
const annoS = ec.getYear().charAt(0), meseS = ec.getMonth().charAt(0);
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
const ctx = { oraBranch: oraB, emaDir: emaDir==='up'?'up':'down', date: date };
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
const meccOk = mecc.filter(m=>/✓\s*$/.test(m));
const candOk = cand.filter(c=>/✓\s*$/.test(c));
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
