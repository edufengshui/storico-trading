/*
 * MOTORE A PRINCIPI — v2 (sessione 28, 29/08/2026)
 * ============================================================================
 * Idea di Edu: "Basta fare dei collegamenti logici." Nessuna ricetta per carta:
 * una catena di ragionamento che collega i principi atomici gia' certificati.
 *
 * LEZIONE DELLA v1: i principi da soli perdono (51,1%) perche' manca la SCELTA
 * DELL'ATTORE. La v2 la insegna, nell'ordine confermato da Edu (29/08/2026):
 *
 * A. CHI NON PUO' AGIRE (eliminazione, prima di tutto)
 *    1. la linea vuota (旬空) dorme e non agisce, anche se timely; il clash del
 *       giorno la sveglia soltanto (冲空), non la muove;
 *    2. la linea impigliata e' ferma: combinata dal giorno, tomba+penalita',
 *       partenza o arrivo trattenuti;
 *    3. la untimely non agisce sulla timely — SALVO CHE SIA GENERATA: se e'
 *       generata agisce ancora efficacemente [variante di Edu, 29/08/2026].
 *
 * B. CHI AGISCE (in quest'ordine)
 *    1. la mobile, se il suo passo si conclude — e agisce il suo ARRIVO;
 *    2. se la mobile non conclude: chi e' CARICATO DALLA DATA (giorno, mese,
 *       anno che atterra su una linea) oppure si muove al buio (暗動);
 *    3. il 伏神 rinforzato dal giorno, quando la linea che lo copre e' untimely
 *       e in rapporto di controllo;
 *    4. se nessuno resta in campo: duello Shi/Ying col principio del vuoto.
 *
 * C. SOLO DOPO, IL CARATTERE DELL'ATTORE
 *    G e W parlano per primi e vincono la sede; P e B secondo la dottrina del
 *    malus (avanza -> la sua squadra perde, retrocede -> vince; fermo e seduto ->
 *    la sua squadra perde); C tace e si passa all'attore successivo.
 * ============================================================================
 */
'use strict';

function creaMotore(LYM) {
  var WX = { '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire',
             '午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water' };
  var GEN = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' };
  var KE  = { Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood' };
  var COMBINA = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯',
                  '辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
  var SEASON = {'寅':'Wood','卯':'Wood','辰':'Wood','巳':'Fire','午':'Fire','未':'Fire',
                '申':'Metal','酉':'Metal','戌':'Metal','亥':'Water','子':'Water','丑':'Water'};
  var CLASH = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅',
                '卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
  var TRIGONI = [['申','子','辰'],['亥','卯','未'],['寅','午','戌'],['巳','酉','丑']];
  var TRIO = [['亥','子','丑'],['寅','卯','辰'],['巳','午','未'],['申','酉','戌']];
  var STEM_EL = {'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth',
                 '庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
  var XING = {'寅':'巳','巳':'申','申':'寅','丑':'戌','戌':'未','未':'丑','子':'卯','卯':'子',
              '辰':'辰','午':'午','酉':'酉','亥':'亥'};

  var sede    = function(pos){ return pos > 3 ? 'LONG' : 'SHORT'; };
  var opposto = function(d){ return d === 'LONG' ? 'SHORT' : 'LONG'; };
  var malus   = function(p){ return p === 'B' || p === 'P'; };
  var rango   = function(p){ return (p === 'G' || p === 'W') ? 0 : (p === 'C' ? 2 : 1); };

  // ---- A. inventario ed eliminazioni ----------------------------------------
  function inventario(R) {
    var mEl = R.monthBranch ? WX[R.monthBranch] : null;
    var sEl = R.monthBranch ? SEASON[R.monthBranch] : null;
    var D = R.dayBranch, dEl = D ? WX[D] : null;
    var yEl = R.yearBranch ? WX[R.yearBranch] : null;
    var arrConcl = (!R.mutante.movimentoNullo) ? R.mutante.arrEl : null;

    function timely(el){
      if (!el) return false;
      return (el === mEl) || (el === sEl) || (!!mEl && GEN[mEl] === el) || (!!sEl && GEN[sEl] === el);
    }
    function generata(el, pos){
      if (!el) return false;
      if (dEl && GEN[dEl] === el) return true;
      if (mEl && GEN[mEl] === el) return true;
      if (yEl && GEN[yEl] === el) return true;
      if (arrConcl && pos !== R.mutante.pos && GEN[arrConcl] === el) return true;
      return false;
    }

    return R.linee.map(function(l){
      var vuoto = l.vuoto || R.vuoti.indexOf(l.ramo) >= 0;
      var tim = timely(l.el), gen = generata(l.el, l.pos);
      var impigliata = !!(D && COMBINA[D] === l.ramo && !l.isMobile);
      return { l:l, pos:l.pos, par:l.par, el:l.el, ramo:l.ramo,
               vuoto:vuoto, timely:tim, generata:gen, impigliata:impigliata,
               inCampo: (!vuoto) && (tim || gen) && !impigliata };
    });
  }

  // ---- C. il carattere dell'attore ------------------------------------------
  function carattere(par, pos, opts) {
    opts = opts || {};
    if (par === 'G' || par === 'W')
      return { dir: sede(pos), nota: 'il carattere è ' + par + ' (G e W parlano per primi): vince la sede' };
    if (malus(par)) {
      if (opts.progressione === 'avanzante')
        return { dir: opposto(sede(pos)), nota: 'il ' + par + ' avanza (進神): la sua squadra perde' };
      if (opts.progressione === 'retrocedente')
        return { dir: sede(pos), nota: 'il ' + par + ' retrocede (退神): la sua squadra vince' };
      return { dir: opposto(sede(pos)), nota: 'il ' + par + ' agisce fermo: la sua squadra perde' };
    }
    if (par === 'C' && opts.R && ENV_G.MPCPARLA !== 'no') {
      // IL C NON TACE (Edu, 29/08/2026, da USDCHF 29/02/2024 s87):
      //  1. il C può GENERARE la W → la W è nutrita e vince la sua sede;
      //  2. il C può DRENARE il B → il malus si scarica e la sua squadra vince;
      //  3. in ASSENZA di W il C fa vincere la propria squadra, A MENO CHE
      //  4. il C controlli la G → allora la propria squadra perde.
      var R0 = opts.R, cEl = opts.cEl || (R0.linee[pos-1] && R0.linee[pos-1].el);
      if (!cEl) return null;
      var vive = R0.linee.filter(function(l){
        return l.pos !== pos && !(opts.esclusi && opts.esclusi.indexOf(l.pos) >= 0); });
      var W0 = vive.filter(function(l){ return l.par === 'W'; });
      var gen = W0.filter(function(l){ return GEN[cEl] === l.el; });
      if (gen.length === 1)
        return { dir: sede(gen[0].pos), nota: 'il C genera la W di L' + gen[0].pos + ': la W è nutrita e vince la sua sede' };
      var dren = vive.filter(function(l){ return l.par === 'B' && GEN[l.el] === cEl; });
      if (dren.length && dren.every(function(l){ return sede(l.pos) === sede(dren[0].pos); }))
        return { dir: sede(dren[0].pos), nota: 'il C drena il B di L' + dren.map(function(l){return l.pos;}).join('/L') + ': il malus si scarica e la sua squadra vince' };
      if (!W0.length) {
        var ctrlG = vive.some(function(l){ return l.par === 'G' && KE[cEl] === l.el; });
        if (ctrlG) return { dir: opposto(sede(pos)), nota: 'senza W in carta, il C controlla la G: la sua squadra perde' };
        return { dir: sede(pos), nota: 'senza W in carta il C fa vincere la propria squadra' };
      }
    }
    return null; // C senza appigli: tace
  }

  // ---- appoggi: vita dell'arrivo, capannello, linee ferme --------------------
  function stagione(R) {
    var mEl = R.monthBranch ? WX[R.monthBranch] : null;
    var sEl = R.monthBranch ? SEASON[R.monthBranch] : null;
    return { mEl: mEl, sEl: sEl };
  }
  function arrForte(R, inv, el) {
    var st = stagione(R);
    if (sequestrato(R, R.monthBranch, 'forza')) return !!(el && (el === WX[R.monthBranch] ? false : false));
    return !!(el && ((el === st.mEl) || (el === st.sEl) ||
                     (st.mEl && GEN[st.mEl] === el) || (st.sEl && GEN[st.sEl] === el)));
  }
  function vivo(R, inv, el) {
    if (arrForte(R, inv, el)) return true;
    var dEl = (R.dayBranch && !sequestrato(R, R.dayBranch, 'forza')) ? WX[R.dayBranch] : null;
    var yEl = (R.yearBranch && !sequestrato(R, R.yearBranch, 'forza')) ? WX[R.yearBranch] : null;
    var st = stagione(R);
    var mSeq = sequestrato(R, R.monthBranch, 'forza');
    if (dEl && GEN[dEl] === el) return true;
    if (!mSeq && st.mEl && GEN[st.mEl] === el) return true;
    if (yEl && GEN[yEl] === el) return true;
    return false;
  }
  // raccolta completa: l'arrivo con altri due membri fra linee non vuote e rami di data
  function capannello(R, inv, arr) {
    // un ramo di data penalizzato da un ALTRO ramo di data non completa il trigono
    // (Edu, 29/08/2026, EURJPY 21/10/2021: l'anno 丑 penalizza il mese 戌)
    var pool = {};
    for (var i = 0; i < inv.length; i++) if (!inv[i].vuoto) pool[inv[i].ramo] = true;
    if (R.dayBranch && !penaDentroData(R, 'giorno')) pool[R.dayBranch] = true;
    if (R.monthBranch && !penaDentroData(R, 'mese')) pool[R.monthBranch] = true;
    if (R.yearBranch && !penaDentroData(R, 'anno')) pool[R.yearBranch] = true;
    for (var t = 0; t < TRIGONI.length; t++) {
      var T = TRIGONI[t];
      if (T.indexOf(arr) < 0) continue;
      var altri = T.filter(function(x){ return x !== arr; });
      if (pool[altri[0]] && pool[altri[1]]) return T.join('');
    }
    return null;
  }
  function fermeChe(R, inv, test) {
    var out = [];
    for (var i = 0; i < R.linee.length; i++) {
      var l = R.linee[i];
      if (l.isMobile || inv[i].vuoto) continue;
      if (test(l)) out.push(l);
    }
    return out;
  }

  // ---- la FORZA di un ramo nella data (modello di preponderanza) -------------
  // Edu (29/08/2026, guida GBPUSD 22/04/2025 s133): non basta che l'arrivo abbia
  // energia; il controllo indietro riesce solo se l'arrivo pesa quanto la partenza.
  // Si contano: stagione, rami e steli della data dello stesso elemento o che lo
  // generano, e le raccolte complete (三合) o le riunioni di stagione (三會).
  function forza(R, ramo, el) {
    if (!el) return 0;
    var st = stagione(R), f = 0;
    var mSeq = sequestrato(R, R.monthBranch, 'forza');
    if (!mSeq) {
      if (el === st.mEl || el === st.sEl) f += 2;
      else if ((st.mEl && GEN[st.mEl] === el) || (st.sEl && GEN[st.sEl] === el)) f += 2;
    }
    var rami = [R.yearBranch, R.dayBranch, R.oraBranch].filter(Boolean) // il mese è già contato dalla stagione
               .filter(function(b){ return !sequestrato(R, b, 'forza'); });
    for (var i = 0; i < rami.length; i++) {
      var e = WX[rami[i]];
      if (e === el) f += 1;
      else if (GEN[e] === el) f += 1;
    }
    var steli = [R.dayStem, R._monthStem, R._yearStem, R._hourStem].filter(Boolean);
    for (var j = 0; j < steli.length; j++) {
      var se = STEM_EL[steli[j]];
      if (se === el) f += 1;
      else if (GEN[se] === el) f += 1;
    }
    // raccolte complete: membri dai rami di data e dalle linee della carta
    var pool = {};
    for (var k = 0; k < R.linee.length; k++) pool[R.linee[k].ramo] = true;
    for (var m = 0; m < rami.length; m++) pool[rami[m]] = true;
    // la raccolta rinforza solo se il suo elemento è quello del ramo:
    // 巳酉丑 è Metallo, non Fuoco — chi ci entra si converte, non si rinforza.
    var gruppi = [
      { T:['申','子','辰'], el:'Water' }, { T:['亥','卯','未'], el:'Wood' },
      { T:['寅','午','戌'], el:'Fire' },  { T:['巳','酉','丑'], el:'Metal' },
      { T:['亥','子','丑'], el:'Water' }, { T:['寅','卯','辰'], el:'Wood' },
      { T:['巳','午','未'], el:'Fire' },  { T:['申','酉','戌'], el:'Metal' }];
    for (var g = 0; g < gruppi.length; g++) {
      var T = gruppi[g].T;
      if (T.indexOf(ramo) < 0 || gruppi[g].el !== el) continue;
      var altri = T.filter(function (x) { return x !== ramo; });
      if (pool[altri[0]] && pool[altri[1]]) { f += 2; break; }
    }
    return f;
  }

  // SEQUESTRO (test di Edu, 29/08/2026): un ramo di data che si COMBINA (六合)
  // con una linea VUOTA dell'esagramma cessa di essere operativo: non fa nient'altro.
  function sequestrato(R, ramoData, canale) {
    if (!ramoData) return false;
    var env = (typeof process !== 'undefined' && process.env) ? process.env : {};
    var acceso = (canale === 'forza') ? (env.MPSEQ2 === '1') : (env.MPSEQ === '1');
    if (!acceso) return false;
    for (var i = 0; i < R.linee.length; i++) {
      var l = R.linee[i];
      if (R.vuoti.indexOf(l.ramo) < 0) continue;
      if (COMBINA[ramoData] === l.ramo) return true;
    }
    return false;
  }

  // chi manda la penalità dai rami di data (anno, mese, giorno, ora)
  function pena(R, ramo) {
    var rami = [['giorno', R.dayBranch], ['mese', R.monthBranch], ['anno', R.yearBranch], ['ora', R.oraBranch]];
    var solo = (typeof process !== 'undefined' && process.env && process.env.MPPENADATA === '1') ? 4 : 1;
    for (var i = 0; i < solo; i++) {
      if (rami[i][1] && XING[rami[i][1]] === ramo && !sequestrato(R, rami[i][1]))
        return { chi: rami[i][0], ramo: rami[i][1] };
    }
    return null;
  }

  // ---- LE BESTIE (六獸) — dottrina di Edu, 29/08/2026 -------------------------
  // La bestia non e' un attore: e' la PORTA attraverso cui l'energia della data entra
  // in una linea. Conta chi la nutre, e da chi la nutre discendono tre gradi.
  //
  //  1° grado — un PILASTRO DELLA DATA cade sulla linea della bestia: la bestia dello
  //     stelo del pilastro siede su quella linea e vi arriva il ramo del pilastro.
  //     POTERI PIENI: fa muovere la linea superando combinazioni, blocchi, penalita' e
  //     vuoti; la BLOCCA con una combinazione; la ELIMINA con un clash.
  //  2° grado — lo STELO TERMINALE del flusso del Qi, SE RADICATO nei rami: la bestia
  //     di quello stelo ha gli STESSI poteri del primo grado.
  //  3° grado — il flusso del Qi generico e il suo ELEMENTO terminale: la bestia
  //     corrispondente e' ENERGIZZATA ma NON ha quei poteri — pesa soltanto, fra pari.
  //
  // I primi due gradi agiscono PRIMA che si decida se la mobile si muove; il terzo dopo.
  var BEL = { '青龍':'Wood', '朱雀':'Fire', '勾陳':'Earth', '螣蛇':'Earth',
              '白虎':'Metal', '玄武':'Water' };
  var STEM_BESTIA = { '甲':'青龍','乙':'青龍','丙':'朱雀','丁':'朱雀','戊':'勾陳',
                      '己':'螣蛇','庚':'白虎','辛':'白虎','壬':'玄武','癸':'玄武' };

  // PENALITA' DENTRO LA DATA (Edu, 29/08/2026, EURJPY 21/10/2021 s133): un ramo della
  // data penalizzato (刑) da un ALTRO ramo della data non svolge il suo ruolo — non
  // completa trigoni e, portato dalla bestia su una linea, la DEPOTENZIA invece di
  // rafforzarla.
  // VINCOLO (Edu, 29/08/2026, da EURJPY 30/04/2020 s115): la penalità dentro la data
  // funziona SOLO se i rami sono VICINI — anno↔mese, mese↔giorno, giorno↔ora.
  // 子 nell'anno e 卯 nel giorno non si toccano: nessun veleno.
  function penaDentroData(R, nomePilastro) {
    var ord = [ ['anno', R.yearBranch], ['mese', R.monthBranch],
                ['giorno', R.dayBranch], ['ora', R.oraBranch] ];
    var idx = -1;
    for (var i = 0; i < ord.length; i++) if (ord[i][0] === nomePilastro) { idx = i; break; }
    if (idx < 0 || !ord[idx][1]) return null;
    var me = ord[idx][1];
    var vicini = [];
    if (idx > 0 && ord[idx-1][1]) vicini.push(ord[idx-1][1]);
    if (idx < ord.length-1 && ord[idx+1][1]) vicini.push(ord[idx+1][1]);
    for (var v = 0; v < vicini.length; v++)
      if (vicini[v] !== me && XING[vicini[v]] === me) return vicini[v];
    return null;
  }

  function bestie(R, ctx) {
    var out = { perLinea: {}, terzo: null };
    if (!ctx || ENV_G.MPBESTIE === 'no') return out;
    var canali = [];
    var ramiData = [];
    var pil = ctx.pilastri || [];
    for (var p0 = 0; p0 < pil.length; p0++) if (pil[p0] && pil[p0].ramo) ramiData.push(pil[p0].ramo);
    // 1° grado: i quattro pilastri della data — arriva il ramo del pilastro stesso
    for (var i = 0; i < pil.length; i++) {
      var P = pil[i];
      if (!P || !P.stelo || !P.ramo) continue;
      var bs = STEM_BESTIA[P.stelo]; if (!bs) continue;
      var penDa = penaDentroData(R, P.nome);
      canali.push({ grado: 1, bestia: bs, rami: [P.ramo], avvelenato: penDa,
                    eti: 'il pilastro ' + P.nome + ' ' + P.stelo + P.ramo +
                         (penDa ? ' (penalizzato in data da ' + penDa + ')' : '') });
    }
    // 2° grado: lo stelo terminale del flusso, se RADICATO — arrivano le sue radici
    if (ctx.capolineaStelo && ctx.capolineaRadicato) {
      var bs2 = STEM_BESTIA[ctx.capolineaStelo];
      var elC = STEM_EL[ctx.capolineaStelo];
      var radici = ramiData.filter(function(b){ return WX[b] === elC; });
      if (bs2 && radici.length)
        canali.push({ grado: 2, bestia: bs2, rami: radici,
                      eti: 'lo stelo terminale del flusso ' + ctx.capolineaStelo + ' (radicato)' });
    }
    // assegna i canali alle linee che portano quella bestia. Il ramo del pilastro deve
    // ARRIVARE davvero sulla linea, e il modo in cui vi arriva decide il potere:
    //   stesso ramo  -> CARICA (la linea supera combinazioni, blocchi, penalità, vuoti)
    //   六合         -> BLOCCA (la combinazione la trattiene)
    //   冲           -> ELIMINA (il clash la scaccia)
    for (var k = 0; k < canali.length; k++) {
      var c = canali[k];
      for (var z = 0; z < R.linee.length; z++) {
        var L = R.linee[z];
        if (!L.bestia || L.bestia.cn !== c.bestia) continue;
        // Dove cade un pilastro della data, la linea è RAFFORZATA (Edu, 29/08/2026):
        // il rafforzamento è il caso base. La combinazione blocca, il clash elimina.
        // MPBESTIELARGHE=no ripristina la forma stretta (serve la relazione esatta).
        var eff = (ENV_G.MPBESTIELARGHE === 'si') ? 'carica' : null;
        for (var m = 0; m < c.rami.length; m++) {
          var rb = c.rami[m];
          if (rb === L.ramo) { eff = 'carica'; break; }
          if (COMBINA[rb] === L.ramo) { eff = 'blocca'; break; }
          if (CLASH[rb] === L.ramo) { eff = 'elimina'; break; }
          // il 刑 e' una porta d'arrivo SOLO per il pilastro avvelenato: la penalita'
          // interna alla data viaggia sulla penalita' (EURJPY 21/10/2021); un pilastro
          // sano che 刑-toccasse la linea non depotenzia (USDJPY 09/10/2024: li' decide
          // il nutrimento degli steli, non la penalita').
          if (c.avvelenato && (XING[rb] === L.ramo || XING[L.ramo] === rb)) { eff = 'depotenzia'; break; }
        }
        if (!eff) continue;
        // pilastro penalizzato DENTRO la data: qualunque cosa porti e' avvelenata
        if (c.avvelenato) eff = 'depotenzia';
        var pr = out.perLinea[L.pos];
        // il grado piu' forte comanda; a parita' comandano blocco/eliminazione
        if (!pr || c.grado < pr.grado || (c.grado === pr.grado && pr.eff === 'carica' && eff !== 'carica'))
          out.perLinea[L.pos] = { grado: c.grado, bestia: c.bestia, eff: eff, eti: c.eti };
      }
    }
    // 3° grado: il flusso del Qi generico e il suo elemento terminale ENERGIZZANO la
    // bestia della linea. Nessun potere: pesa soltanto. Il peso e' il nutrimento che la
    // bestia riceve dagli STELI della data (比和 stesso elemento, o stelo che la genera),
    // come Edu legge lo stallo di EURJPY 31/10/2023; chi la controlla la spegne.
    var steliD = [];
    for (var s0 = 0; s0 < pil.length; s0++) if (pil[s0] && pil[s0].stelo) steliD.push(pil[s0].stelo);
    out.peso = {};
    for (var y = 0; y < R.linee.length; y++) {
      var L3 = R.linee[y];
      if (!L3.bestia) continue;
      var bEl = BEL[L3.bestia.cn]; if (!bEl) continue;
      var n = 0;
      for (var t = 0; t < steliD.length; t++) {
        var sEl2 = STEM_EL[steliD[t]]; if (!sEl2) continue;
        if (sEl2 === bEl || GEN[sEl2] === bEl) n++;
        else if (KE[sEl2] === bEl) n--;
      }
      if (ctx.capolineaEl === bEl) n++;      // il flusso vi termina: energizzata
      out.peso[L3.pos] = n;
    }
    return out;
  }

  // ---- B. la catena ---------------------------------------------------------
  var ENV_G = (typeof process !== 'undefined' && process.env) ? process.env : {};
  function leggi(R, ctx) {
    if (ctx) {                                   // steli derivati dai rami del motore:
      R._yearStem  = ctx.yearStem  || null;      // anno dall'anno civile + ramo d'anno
      R._monthStem = ctx.monthStem || null;      // mese con i Cinque Tigri (五虎遁)
      R._hourStem  = ctx.hourStem  || null;      // ora con i Cinque Topi (五鼠遁)
    }
    var inv = inventario(R);
    var BST = bestie(R, ctx);
    var bstDi = function(pos){ var b = BST.perLinea[pos]; return (b && b.grado <= 2) ? b : null; };
    var bstDepo = function(pos){ var b = BST.perLinea[pos]; return !!(b && b.grado <= 2 && b.eff === 'depotenzia'); };
    // PROTEZIONE DEL PILASTRO (Edu, 29/08/2026, USDJPY 24/06/2020 s106): il pilastro
    // che siede sulla linea via bestia "elimina ogni problema" — la linea ferma supera
    // la penalita' della data. Proteggono carica e combinazione; clash e veleno no.
    var bstProtegge = function(pos){ if (ENV_G.MPPROTEZ === 'no') return false;
      var b = BST.perLinea[pos];
      if (!b || b.grado > 2) return false;
      if (b.eff === 'carica') return true;
      if (b.eff !== 'blocca') return false;
      // protezione per COMBINAZIONE: cade se un ramo della data clasha la linea
      // (registro: 1 clash rompe la combinazione — USDJPY 09/12/2024, giorno 未 su 丑)
      var ln = R.linee[pos - 1];
      var rd = [R.dayBranch, R.monthBranch, R.yearBranch, R.oraBranch];
      for (var q = 0; q < rd.length; q++)
        if (rd[q] && CLASH[rd[q]] === ln.ramo) return false;
      return true; };
    var tr0 = [];

    // ---- A0 (TEST di Edu, 29/08/2026): Shi o Ying VUOTI — prima cosa da vedere.
    // La parte vuota perde immediatamente.
    if (ENV_G.MPSHIVUOTO !== 'no') {
      var _sv = inv[R.shi - 1].vuoto, _yv = inv[R.ying - 1].vuoto;
      if (_sv !== _yv) {
        var _perde = _sv ? R.linee[R.shi - 1] : R.linee[R.ying - 1];
        var _vince = _sv ? R.linee[R.ying - 1] : R.linee[R.shi - 1];
        // ECCEZIONI mostrate da Edu sulle tre controcarte (29/08/2026): la regola
        // cede quando nella carta agisce un meccanismo con precedenza:
        //  a) una penalità (刑) tocca gli attori (duello, partenza, arrivo);
        //  b) il giorno COMBINA la linea vuota (la lega e la tiene: non è abbandonata);
        //  c) tomba+penalità sulla mobile (caso -4): decide quella lettura.
        var _dep2 = R.mutante.ramoDep, _arr2 = R.mutante.ramoArr;
        // LE BESTIE, 1° e 2° grado: la bestia carica fa SUPERARE il vuoto alla linea
        // (Edu 29/08/2026: "le fa superare combinazioni, blocchi, penalità, vuoti").
        var _bv = bstDi(_perde.pos);
        if (_bv && _bv.eff === 'carica') {
          tr0.push('la ' + (_sv ? 'Shi' : 'Ying') + ' è vuota ma ' + _bv.eti + ' arriva sulla sua bestia ' +
                   _bv.bestia + ': la linea supera il vuoto');
        } else {
        var _penP = pena(R, _perde.ramo) && !bstProtegge(_perde.pos);
        var _penV = pena(R, _vince.ramo) && !bstProtegge(_vince.pos);
        var _ecc = !!(_penP || _penV || pena(R, _dep2) || pena(R, _arr2) ||
                      XING[_arr2] === _dep2 || (R.dayBranch && COMBINA[R.dayBranch] === _perde.ramo) ||
                      R.mutante.casoMut === -4);
        if (!_ecc)
          return { dir: sede(_vince.pos), gradino: 'A0-vuoto-shi-ying',
                   perche: 'la ' + (_sv ? 'Shi' : 'Ying') + ' è vuota: la parte vuota perde subito — vince la sede della ' + (_sv ? 'Ying' : 'Shi') };
        tr0.push('Shi/Ying vuota ma un meccanismo con precedenza tocca la carta: la regola del vuoto cede');
        }
      }
    }

    var mobPos = R.mutante.pos;
    var mob = R.linee[mobPos - 1];
    var iMob = inv[mobPos - 1];
    var D = R.dayBranch, dEl = D ? WX[D] : null;
    var tr = tr0;

    // LE BESTIE, 1° e 2° grado, SULLA MOBILE — agiscono PRIMA che si decida se si muove.
    // Carica: la linea supera combinazioni, blocchi, penalità e vuoti e agisce comunque.
    // Blocca (六合 del ramo del pilastro): non parte. Elimina (冲): esce di scena.
    var bMob = bstDi(mobPos), bSblocca = false, mobileDistrutta = false, mobileEliminata = false;
    if (bMob && bMob.eff === 'depotenzia') { tr.push(bMob.eti + ' arriva sulla bestia ' + bMob.bestia + ' della mobile: la linea è depotenziata'); bMob = null; }
    if (bMob) {
      if (bMob.eff === 'blocca') {
        tr.push(bMob.eti + ' arriva sulla bestia ' + bMob.bestia + ' della mobile e la combina: la linea non parte');
        bMob = null; bSblocca = false;
      } else if (bMob.eff === 'elimina') {
        tr.push(bMob.eti + ' arriva sulla bestia ' + bMob.bestia + ' della mobile e la clasha: la linea è eliminata del tutto');
        bMob = null; bSblocca = false; mobileEliminata = true;
      } else {
        bSblocca = true;
      }
    }
    var bloccataDallaBestia = !!(BST.perLinea[mobPos] && BST.perLinea[mobPos].grado <= 2 &&
                                 BST.perLinea[mobPos].eff !== 'carica');

    if (ENV_G.MPPROG !== 'no' && ENV_G.MPPROGPOS === 'presto' && !bloccataDallaBestia &&
        (R.mutante.progressione === 'avanzante' || R.mutante.progressione === 'retrocedente') &&
        (mob.par === 'G' || mob.par === 'W' || mob.par === 'B' || mob.par === 'P')) {
      var _av0 = (R.mutante.progressione === 'avanzante');
      var _bu0 = (mob.par === 'G' || mob.par === 'W');
      var _vi0 = _bu0 ? _av0 : !_av0;
      return { dir: _vi0 ? sede(mobPos) : opposto(sede(mobPos)),
               gradino: 'A1-progressione-' + (_bu0 ? 'GW' : 'BP') + '-' + (_av0 ? 'avanza' : 'retrocede'),
               perche: tr.concat(['la mobile ' + mob.par + ' L' + mobPos + ' ' +
                        (_av0 ? 'avanza (進神)' : 'retrocede (退神)') + ': ' +
                        (_vi0 ? 'fa vincere la propria squadra — la sua sede'
                              : 'fa perdere la propria squadra — la sua sede cade')]).join(' → ') };
    }

    if (!bloccataDallaBestia && (!R.mutante.movimentoNullo || bSblocca)) {
      // UNA LINEA VUOTA CHE SI MUOVE NON È VUOTA (Edu, 29/08/2026). Il vuoto (旬空)
      // vale per le linee FERME: il movimento stesso tira la linea fuori dal vuoto.
      // Prima il motore la faceva dormire e passava oltre, buttando via la mobile.
      if (!iMob.timely && !iMob.generata && !bSblocca && !iMob.vuoto)
        tr.push('la mobile è untimely e non generata: non agisce efficacemente');
      else {
        if (bSblocca && R.mutante.movimentoNullo)
          tr.push(bMob.eti + ' arriva sulla bestia ' + bMob.bestia + ' della mobile: la linea supera il blocco e il passo si compie');
        var parArr = (mob.mut && mob.mut.parArr) || R.mutante.parArr || mob.par;
        var arr = R.mutante.ramoArr, arrEl = R.mutante.arrEl;
        var arrVivo = vivo(R, inv, arrEl);
        var prog = { progressione: R.mutante.progressione };

        var ENV = (typeof process !== 'undefined' && process.env) ? process.env : {};
        // PRECEDENZA DEL CONTROLLO INDIETRO (Edu, 29/08/2026): se l'arrivo controlla
        // la partenza, l'arrivo non va da nessuna parte se non a controllare indietro.
        // La linea corre solo se la PARTENZA GENERA L'ARRIVO: allora è lanciata in avanti.
        var depEl = R.mutante.depEl;
        var controlloIndietro = (KE[arrEl] === depEl);
        var lanciata = (GEN[depEl] === arrEl);

        if (GEN[arrEl] === depEl && ENV.MPGENIETRO !== 'no') {
          // 回頭生 GENERAZIONE INDIETRO (Edu, 29/08/2026, guida GBPUSD 05/05/2022 s126):
          // "la linea si muove per generare indietro". Non è un movimento senza
          // destinazione: la destinazione è la partenza stessa. Chi genera CEDE il Qi,
          // quindi l'elemento dell'arrivo si SCARICA. Se un carattere di malus (B, che
          // fa sempre perdere la propria squadra, oppure P) è di quell'elemento, perde
          // energia: il malus si spegne e la SUA sede vince.
          // CON FORZA (Edu, 29/08/2026, EURJPY 21/10/2021 s133): se l'arrivo ha un
          // TRIGONO COMPLETO (三合) coi rami della data (o linee ferme non vuote), ha
          // tutta la forza per generare indietro: la generazione SI COMPIE, la partenza
          // viene nutrita e la sede della mobile VINCE.
          var ramiTrig = [];
          if (ENV.MPGENFORTE === 'si') {
            var rdt = [['giorno',R.dayBranch],['mese',R.monthBranch],['anno',R.yearBranch],['ora',R.oraBranch]];
            for (var rt = 0; rt < rdt.length; rt++)
              if (rdt[rt][1] && !penaDentroData(R, rdt[rt][0])) ramiTrig.push(rdt[rt][1]);
            if (ENV.MPGENFORTE === 'linee')
              for (var lt = 0; lt < R.linee.length; lt++)
                if (!R.linee[lt].isMobile && !inv[lt].vuoto) ramiTrig.push(R.linee[lt].ramo);
          }
          var trigArr = null;
          for (var tt = 0; tt < TRIGONI.length; tt++) {
            var T = TRIGONI[tt];
            if (T.indexOf(arr) < 0) continue;
            var altri = T.filter(function(b){ return b !== arr; });
            if (altri.every(function(b){ return ramiTrig.indexOf(b) >= 0; })) { trigArr = T.join(''); break; }
          }
          if (trigArr)
            return { dir: sede(mobPos), gradino: 'B1-genera-indietro-forte',
                     perche: "la mobile si muove per generare indietro e l'arrivo " + arr +
                             ' ha il trigono completo ' + trigArr + ' con la data: ha tutta la forza,' +
                             ' la generazione si compie, la partenza è nutrita e la sede della mobile vince' };
          var scarichi = [];
          for (var gz = 0; gz < R.linee.length; gz++) {
            var lg = R.linee[gz];
            if (lg.pos === mobPos || !malus(lg.par)) continue;
            if (WX[lg.ramo] !== arrEl) continue;
            scarichi.push(lg);
          }
          if (scarichi.length === 1)
            return { dir: sede(scarichi[0].pos), gradino: 'B1-genera-indietro',
                     perche: "la mobile si muove per generare indietro (" + arr + ' genera ' +
                             R.mutante.ramoDep + '): chi genera cede il Qi e il ' + arrEl +
                             ' si scarica — il ' + scarichi[0].par + ' di L' + scarichi[0].pos +
                             ' perde energia, il malus si spegne e la sua sede vince' };
          tr.push('la mobile genera indietro ma nessun carattere di malus è di quell\'elemento');
        }
        if (controlloIndietro) {
          // 回頭剋 (Edu, 29/08/2026, guida EURUSD 05/03/2025 s106): il controllo indietro
          // vale solo se l'arrivo HA L'ENERGIA per farlo (timely o generato dalla data).
          // Con energia: l'arrivo controlla davvero e parla il suo carattere.
          // Senza energia: l'azione fallisce, chi non vince perde, la sede della mobile cade.
          var fArr = forza(R, arr, arrEl), fDep = forza(R, R.mutante.ramoDep, depEl);
          if (fArr >= fDep) {
            var cf2 = carattere(parArr, mobPos, prog);
            if (cf2) return { dir: cf2.dir, gradino:'B1-ctrl-indietro-forte',
                              perche: "l'arrivo " + arr + ' (forza ' + fArr + ') pesa quanto la partenza ' +
                                      R.mutante.ramoDep + ' (forza ' + fDep + '): controlla davvero indietro — ' + cf2.nota };
            // C DISTRUGGE G (Edu, 29/08/2026, guida USDCAD 21/12/2023 s133): nel
            // controllo indietro riuscito con arrivo C su partenza G, il C distrugge
            // la G a due condizioni alternative: (1) il C è timely, oppure (2) la G è
            // untimely. Distrutta la G, la mobile ESCE e si prosegue come per
            // l'eliminazione della bestia (duello pesato se Shi/Ying pari).
            if (parArr === 'C' && mob.par === 'G' && ENV.MPCDISTRUGGE !== 'no') {
              var stC = stagione(R);
              var cTimely = (arrEl === stC.mEl) || (arrEl === stC.sEl) ||
                            (stC.mEl && GEN[stC.mEl] === arrEl) || (stC.sEl && GEN[stC.sEl] === arrEl);
              // la timeliness della G si giudica per STAGIONE (rapporto col ramo del
              // mese), come da registro: il soccorso del giorno non la rende timely
              var gTimely = iMob.timely;
              if (cTimely || !gTimely) {
                tr.push('il C ' + arr + ' controlla indietro con energia e ' +
                        (cTimely ? 'è timely' : 'la G è untimely') + ': il C distrugge la G — la mobile esce');
                mobileDistrutta = true;
              } else tr.push('controllo indietro del C senza le condizioni per distruggere la G: tace');
            } else tr.push('controllo indietro con energia ma il carattere è C: tace');
            if (ENV.MPMARCA==='ctrlC') return { dir:null, gradino:'X-ctrl-C', perche:'' };
          } else if (mob.par !== 'B') {
            return { dir: opposto(sede(mobPos)), gradino:'B1-ctrl-indietro-debole',
                     perche: "l'arrivo " + arr + ' (forza ' + fArr + ') non pesa abbastanza contro la partenza ' +
                             R.mutante.ramoDep + ' (forza ' + fDep + '): l\'azione fallisce, ' +
                             'chi non vince perde — la sede della mobile cade' };
          } else {
            tr.push('controllo indietro senza energia con mobile B: la lettura non regge');
          }
        } else if (XING[arr] === R.mutante.ramoDep && ENV.MPPENA !== 'no' &&
                   (ENV.MPPENAFORZA === 'no' || forza(R, arr, arrEl) >= forza(R, R.mutante.ramoDep, depEl))) {
          // L'ARRIVO PENALIZZA LA PROPRIA PARTENZA (Edu, 29/08/2026, guida EURUSD
          // 25/05/2021 s122: 寅 penalizza 巳). La penalità penalizza chi la riceve:
          // la partenza è colpita e non fa vincere la sua squadra.
          return { dir: opposto(sede(mobPos)), gradino:'B1-arrivo-penalizza-partenza',
                   perche: "l'arrivo " + arr + ' penalizza (刑) la propria partenza ' + R.mutante.ramoDep +
                           ': la penalizzata non fa vincere la sua squadra — la sua sede cade' };
        } else if (pena(R, R.mutante.ramoDep) && ENV.MPPENA !== 'no') {
          var pD = pena(R, R.mutante.ramoDep);
          // PENALITA' SULLA PARTENZA (Edu, 29/08/2026, guida EURUSD 22/07/2025 s116:
          // giorno 辰 e partenza 辰, autopenalita' 自刑). La linea penalizzata non fa
          // vincere la propria squadra: la sua sede cade.
          return { dir: opposto(sede(mobPos)), gradino:'B1-partenza-penalizzata',
                   perche: 'la partenza ' + R.mutante.ramoDep + ' riceve la penalità (刑) dal ' + pD.chi + ' ' + pD.ramo +
                           ': la linea penalizzata non fa vincere la sua squadra — la sua sede cade' };
        } else if (pena(R, arr) && ENV.MPPENA !== 'no') {
          var pA = pena(R, arr);
          // PENALITA' SULL'ARRIVO (Edu, 29/08/2026, guida EURUSD 14/07/2021 s117):
          // l'arrivo riceve il 刑 dal giorno: la linea di PARTENZA resta attiva ma ferma,
          // e parla lei col proprio carattere.
          var cp = carattere(mob.par, mobPos, {});
          if (cp) return { dir: cp.dir, gradino:'B1-arrivo-penalizzato',
                           perche: "l'arrivo " + arr + ' riceve la penalità (刑) dal ' + pA.chi + ' ' + pA.ramo +
                                   ': la partenza resta attiva ma ferma — ' + cp.nota };
          tr.push('arrivo penalizzato ma il carattere della partenza è C: tace');
        } else if (!arrVivo && ENV.MPMORTO === 'si') {
          tr.push("l'arrivo " + arr + " è morto in stagione e non nutrito: la corsa non arriva");
        } else {
          // CAPANNELLO: raccolta completa (三合) — il Qi si ferma dov'è
          var trig = (ENV.MPDEST === 'no') ? null : capannello(R, inv, arr);
          if (trig) {
            var cq = carattere(parArr, mobPos, prog);
            if (cq) return { dir: cq.dir, gradino:'B1-capannello',
                             perche: 'capannello: ' + trig + ' completo, il Qi si ferma — ' + cq.nota };
            tr.push('capannello ' + trig + ' ma il carattere è C: tace');
            if (ENV.MPMARCA==='capC') return { dir:null, gradino:'X-capannello-C', perche:'capannello '+trig+' con arrivo C' };
          } else {
            // CORRIDORE: si guarda dove va
            var legata = (ENV.MPDEST === 'no') ? [] : fermeChe(R, inv, function(l){ return COMBINA[arr] === l.ramo; });
            if (legata.length === 1) {
              var dest = legata[0];
              var stD = stagione(R);
              var destTimely = (WX[dest.ramo] === stD.mEl) || (WX[dest.ramo] === stD.sEl) ||
                               (stD.mEl && GEN[stD.mEl] === WX[dest.ramo]) || (stD.sEl && GEN[stD.sEl] === WX[dest.ramo]);
              // destinazione rotta dal giorno: la combinazione non si forma, non si atterra
              if (D && CLASH[D] === dest.ramo && !destTimely) {
                tr.push('la destinazione L' + dest.pos + ' è rotta dal giorno: la combinazione non si forma');
              } else if (GEN[depEl] === WX[dest.ramo]) {
                // il mosso GENERA la destinazione: si scarica caricandola e non si impone,
                // e allora si deve vedere chi ci guadagna: la squadra della caricata perde.
                return { dir: opposto(sede(dest.pos)), gradino:'B1-corridore-carica',
                         perche: "corridore: l'arrivo " + arr + ' combina L' + dest.pos + ' ma la partenza ' +
                                 R.mutante.ramoDep + ' la GENERA: si scarica caricandola — la squadra della caricata perde' };
              } else {
                return { dir: sede(dest.pos), gradino:'B1-corridore-combina',
                         perche: "corridore: l'arrivo " + arr + ' combina L' + dest.pos + ' e la tiene — la sede raggiunta vince' };
              }
            }
            var colpita = (ENV.MPDEST === 'no') ? [] : fermeChe(R, inv, function(l){ return CLASH[arr] === l.ramo; });
            if (colpita.length === 1) {
              var b = inv[colpita[0].pos - 1];
              if (!(b.timely && !arrForte(R, inv, arrEl))) {
                return { dir: opposto(sede(colpita[0].pos)), gradino:'B1-corridore-clash',
                         perche: "corridore: l'arrivo " + arr + ' clasha L' + colpita[0].pos + ' e la scaccia — la sede colpita perde' };
              }
              tr.push("l'arrivo untimely non agisce sulla linea timely che clasha");
              if (ENV.MPMARCA==='unt') return { dir:null, gradino:'X-unt-clash', perche:'' };
            }
            var c = carattere(parArr, mobPos, prog);
            if (c) return { dir: c.dir, gradino:'B1-carattere',
                            perche: "la mobile conclude senza destinazione, agisce l'arrivo — " + c.nota };
            tr.push("la mobile conclude ma il suo arrivo è C: tace");
          }
        }
      }
    } else if (bloccataDallaBestia) {
      /* la bestia ha gia' detto perche' la mobile e' fuori: nessuna altra traccia */
    } else {
      var dep = R.mutante.ramoDep, arr = R.mutante.ramoArr;
      if (R.mutante.casoMut === -1 && D) {
        if (COMBINA[D] === dep && malus(mob.par))
          return { dir: opposto(sede(mobPos)),
                   gradino:'B0-partenza', perche: 'partenza trattenuta dal giorno: il ' + mob.par + ' resta seduto e fa perdere la sua squadra' };
        if (COMBINA[D] === arr && mob.par === 'B')
          return { dir: sede(mobPos),
                   gradino:'B0-arrivo', perche: "arrivo trattenuto dal giorno: l'azione del B non si compie, la sua sede vince" };
      }
      tr.push('il passo non si conclude (' + (R.mutante.motivoNullo || 'movimento nullo') + '): la mobile esce');
    }

    // Il salto al duello vale quando la bestia ha tolto la mobile E Shi e Ying sono
    // PARI (stesso elemento): allora l'atterraggio della data non scioglie nulla e
    // decide il peso delle bestie (Edu, 29/08/2026, USDJPY 09/10/2024).
    var _S0 = R.linee[R.shi - 1], _Y0 = R.linee[R.ying - 1];
    // eliminata/distrutta: la linea NON ESISTE piu' -> sempre al duello.
    // bloccata (combinata): resta seduta -> al duello solo se Shi e Ying sono pari.
    var saltaAlDuello = mobileEliminata || mobileDistrutta ||
                        (bloccataDallaBestia && (WX[_S0.ramo] === WX[_Y0.ramo]));
    var caricati = [];
    // Quando la BESTIA (1° o 2° grado) ha tolto di mezzo la mobile — bloccandola o
    // eliminandola col clash — non si cerca chi e' caricato dalla data: si va DIRITTI
    // al duello Shi/Ying, pesato dalle bestie (Edu, 29/08/2026, USDJPY 09/10/2024:
    // "l'intero pilastro arriva su L1 e, clashandola, elimina completamente la linea.
    //  Per vedere chi vince devi andare altrove").
    if (!saltaAlDuello)
    for (var k = 0; k < inv.length; k++) {
      var i = inv[k];
      if (i.pos === mobPos || !i.inCampo) continue;
      var fonte = null;
      if (D && i.ramo === D && !sequestrato(R, D)) fonte = 'il giorno atterra sulla linea (日建)';
      else if (R.monthBranch && i.ramo === R.monthBranch && !sequestrato(R, R.monthBranch)) fonte = 'il mese atterra sulla linea (月建)';
      else if (R.taiSuiPos === i.pos && !sequestrato(R, R.yearBranch)) fonte = "l'anno atterra sulla linea (太歲)";
      else if (R.anDong && R.anDong[i.pos] && !sequestrato(R, D)) fonte = 'si muove al buio (暗動)';
      if (fonte) caricati.push({ i: i, fonte: fonte });
    }
    if (caricati.length) {
      caricati.sort(function(a,b){ return rango(a.i.par) - rango(b.i.par); });
      for (var q = 0; q < caricati.length; q++) {
        var cc = carattere(caricati[q].i.par, caricati[q].i.pos,
                           { R: R, esclusi: bloccataDallaBestia || mobileDistrutta ? [mobPos] : [] });
        if (cc) return { dir: cc.dir, gradino:'B2-data', perche: tr.concat([caricati[q].fonte + ' — ' + cc.nota]).join(' → ') };
      }
      tr.push('i caricati dalla data sono tutti C: tacciono');
    }

    if (!saltaAlDuello)
    for (var z = 0; z < R.linee.length; z++) {
      var l = R.linee[z];
      if (!l.fushen) continue;
      var ii = inv[l.pos - 1];
      if (ii.timely || ii.generata) continue;
      var f = l.fushen;
      var rinf = !!(D && (f.b === D || (dEl && (dEl === f.el || GEN[dEl] === f.el))));
      if (!rinf) continue;
      if (KE[f.el] !== l.el) continue;
      var cf = carattere(f.par, l.pos, { R: R, cEl: f.el });
      if (cf) return { dir: cf.dir, gradino:'B3-fushen',
        perche: tr.concat(['il 伏神 ' + f.b + ' rinforzato dal giorno controlla la linea untimely che lo copre — ' + cf.nota]).join(' → ') };
    }

    // ---- LA PROGRESSIONE DELLA MOBILE (Edu, 30/08/2026) -------------------------
    // DOTTRINA. Quando la mobile si trasforma nello stesso elemento c'è progressione:
    // 進神 avanza o 退神 retrocede. Chi avanza rafforza quello che è, chi retrocede lo
    // indebolisce. Le due squadre buone (G e W) e le due cattive (B e P) reagiscono
    // in verso opposto:
    //   G o W che AVANZA  → fa vincere la propria squadra  → la sua sede
    //   G o W che RETROCEDE → la fa perdere                → la sede cade
    //   B o P che AVANZA  → fa perdere la propria squadra  → la sede cade
    //   B o P che RETROCEDE → la fa vincere                → la sua sede
    // Il C tace. MPPROG=no per spegnerla.
    if (ENV_G.MPPROG !== 'no' && ENV_G.MPPROGPOS !== 'presto' && !saltaAlDuello &&
        (R.mutante.progressione === 'avanzante' || R.mutante.progressione === 'retrocedente')) {
      var _av = (R.mutante.progressione === 'avanzante');
      var _buona = (mob.par === 'G' || mob.par === 'W');
      var _cattiva = (mob.par === 'B' || mob.par === 'P');
      if (_buona || _cattiva) {
        var _vince = _buona ? _av : !_av;
        return { dir: _vince ? sede(mobPos) : opposto(sede(mobPos)),
                 gradino: 'B1-progressione-' + (_buona ? 'GW' : 'BP') + '-' + (_av ? 'avanza' : 'retrocede'),
                 perche: tr.concat(['la mobile ' + mob.par + ' L' + mobPos + ' ' +
                          (_av ? 'avanza (進神)' : 'retrocede (退神)') + ': ' +
                          (_vince ? 'fa vincere la propria squadra — la sua sede'
                                  : 'fa perdere la propria squadra — la sua sede cade')]).join(' → ') };
      }
    }

    // ---- B3-ante. CHI NON VINCE PERDE, prima della penalità (prova, 30/08/2026) --
    // Il termometro legge queste stesse carte al 62%: l'azione fallita della mobile
    // (controllo indietro 回頭剋 o autocombinazione) e la lettura base della mobile
    // G o W parlano PRIMA del gradino della linea penalizzata.
    if (ENV_G.MPCHINONVINCE === 'si' && !saltaAlDuello) {
      var _hui = (R.mutante.casoMut === 3);
      var _aut = (mob.stato === 'autocombinata');
      if ((_hui || _aut) && mob.par !== 'B')
        return { dir: opposto(sede(mobPos)), gradino: 'B3a-azione-fallita',
                 perche: tr.concat(['l\'azione della mobile L' + mobPos + ' ' + mob.par + ' fallisce (' +
                          (_hui ? 'controllo indietro 回頭剋' : 'autocombinazione') +
                          '): non porta la sua direzione — chi non vince perde, la sua sede cade']).join(' → ') };
      if (mob.par === 'G' || mob.par === 'W') {
        if (!R.mutante.movimentoNullo && ENV_G.MPCNV_RAMO === 'b') { /* ramo (a) muto */ }
        else if (!R.mutante.movimentoNullo)
          return { dir: sede(mobPos), gradino: 'B3a-mobile-GW-vera',
                   perche: tr.concat(['la mobile ' + mob.par + ' L' + mobPos +
                            ' si muove davvero ed è coinvolta nell\'azione: fa vincere la propria squadra — la sua sede']).join(' → ') };
        if (R.mutante.movimentoNullo && !(_hui || _aut))
          return { dir: opposto(sede(mobPos)), gradino: 'B3a-mobile-GW-nulla',
                   perche: tr.concat(['la mobile ' + mob.par + ' L' + mobPos +
                            ' tenta di agire ma il movimento è nullo: azione tentata e fallita — la sua sede cade']).join(' → ') };
      }
    }

    // ---- B3-bis. la penalità del giorno su una linea ferma ---------------------
    // La penalità fa quello che dice la parola: penalizza chi la riceve (Edu, 29/08/2026).
    if (D && ENV_G.MPPENALINEA !== 'no' && !saltaAlDuello) {
      var pen = [];
      for (var w = 0; w < R.linee.length; w++) {
        var lw = R.linee[w];
        if (lw.isMobile || inv[w].vuoto) continue;
        if (bstProtegge(lw.pos)) continue;   // il pilastro seduto sulla linea elimina il problema
        var pl = pena(R, lw.ramo); if (pl) pen.push(lw);
      }
      if (pen.length === 1)
        return { dir: opposto(sede(pen[0].pos)), gradino:'B3b-linea-penalizzata',
                 perche: tr.concat(['la data penalizza (刑) L' + pen[0].pos + ' ' + pen[0].par +
                                    ': la penalizzata non fa vincere la sua squadra — la sua sede cade']).join(' → ') };
    }

    var S = R.linee[R.shi - 1], Y = R.linee[R.ying - 1];
    // CHI NON C'E' PIU' PERDE (Edu, 29/08/2026, USDCHF 29/02/2024 s87): se la mobile
    // eliminata (clash della bestia o C che distrugge la G) e' la Shi o la Ying,
    // quella parte ha perso la propria linea: vince l'altra.
    if ((mobileEliminata || mobileDistrutta) && (mobPos === R.shi || mobPos === R.ying)) {
      var _altra = mobPos === R.shi ? Y : S;
      return { dir: sede(_altra.pos), gradino: 'B4-eliminata-perde',
               perche: tr.concat(['la ' + (mobPos === R.shi ? 'Shi' : 'Ying') +
                        ' eliminata non può vincere la sua sede: vince la ' +
                        (mobPos === R.shi ? 'Ying' : 'Shi')]).join(' → ') };
    }
    var sv = inv[R.shi - 1].vuoto, yv = inv[R.ying - 1].vuoto;
    if (sv !== yv)
      return { dir: sede(sv ? Y.pos : S.pos), gradino: 'B4-duello',
               perche: tr.concat(['duello Shi/Ying: la ' + (sv ? 'Shi' : 'Ying') + ' è vuota e dorme, vince l\'altra']).join(' → ') };

    // LE BESTIE, 3° grado (Edu, 29/08/2026): l'elemento terminale del flusso del Qi
    // ENERGIZZA la bestia della linea. Nessun potere: pesa soltanto, e qui che gli
    // attori sono pari il peso decide. Se energizza entrambe o nessuna, tace.
    // LA BESTIA AVVELENATA DECIDE IL PARI (Edu, 29/08/2026, EURJPY 21/10/2021): se il
    // pilastro che cade sulla linea via bestia e' penalizzato dentro la data, la linea
    // e' depotenziata: nel confronto Shi vs Ying pari, quella parte PERDE.
    if (WX[S.ramo] === WX[Y.ramo]) {
      var dS = bstDepo(S.pos), dY = bstDepo(Y.pos);
      if (dS !== dY) {
        var perde5 = dS ? S : Y, vince5 = dS ? Y : S;
        return { dir: sede(vince5.pos), gradino: 'B4-bestia-avvelenata',
                 perche: tr.concat(['Shi e Ying pari: ' + BST.perLinea[perde5.pos].eti +
                          ' cade sulla bestia della ' + (dS ? 'Shi' : 'Ying') +
                          ' e la depotenzia — quella parte perde']).join(' → ') };
      }
    }
    if (BST.peso && ENV_G.MPBESTIE3 !== 'no') {
      var pS = BST.peso[S.pos], pY = BST.peso[Y.pos];
      // pesa soltanto: decide se una bestia e' nutrita e l'altra no (o e' spenta)
      if (pS != null && pY != null && pS !== pY && (pS > 0 || pY > 0)) {
        var vinc3 = pS > pY ? S : Y;
        return { dir: sede(vinc3.pos), gradino: 'B4-bestia-nutrita',
                 perche: tr.concat(['duello Shi/Ying pari: la bestia della ' + (pS > pY ? 'Shi' : 'Ying') +
                          ' è nutrita dagli steli della data (' + Math.max(pS, pY) + ' contro ' + Math.min(pS, pY) +
                          '), l\'altra no — quella sede vince']).join(' → ') };
      }
    }
    return { dir: null, perche: tr.concat(['duello Shi/Ying muto: TACE']).join(' → ') };
  }

  return { leggi: leggi, inventario: inventario };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { creaMotore: creaMotore };
