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
    return null; // C tace
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
    var pool = {};
    for (var i = 0; i < inv.length; i++) if (!inv[i].vuoto) pool[inv[i].ramo] = true;
    if (R.dayBranch) pool[R.dayBranch] = true;
    if (R.monthBranch) pool[R.monthBranch] = true;
    if (R.yearBranch) pool[R.yearBranch] = true;
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

  // ---- B. la catena ---------------------------------------------------------
  var ENV_G = (typeof process !== 'undefined' && process.env) ? process.env : {};
  function leggi(R, ctx) {
    if (ctx) {                                   // steli derivati dai rami del motore:
      R._yearStem  = ctx.yearStem  || null;      // anno dall'anno civile + ramo d'anno
      R._monthStem = ctx.monthStem || null;      // mese con i Cinque Tigri (五虎遁)
      R._hourStem  = ctx.hourStem  || null;      // ora con i Cinque Topi (五鼠遁)
    }
    var inv = inventario(R);
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
        var _ecc = !!(pena(R, _perde.ramo) || pena(R, _vince.ramo) || pena(R, _dep2) || pena(R, _arr2) ||
                      XING[_arr2] === _dep2 || (R.dayBranch && COMBINA[R.dayBranch] === _perde.ramo) ||
                      R.mutante.casoMut === -4);
        if (!_ecc)
          return { dir: sede(_vince.pos), gradino: 'A0-vuoto-shi-ying',
                   perche: 'la ' + (_sv ? 'Shi' : 'Ying') + ' è vuota: la parte vuota perde subito — vince la sede della ' + (_sv ? 'Ying' : 'Shi') };
        tr0.push('Shi/Ying vuota ma un meccanismo con precedenza tocca la carta: la regola del vuoto cede');
      }
    }

    var mobPos = R.mutante.pos;
    var mob = R.linee[mobPos - 1];
    var iMob = inv[mobPos - 1];
    var D = R.dayBranch, dEl = D ? WX[D] : null;
    var tr = tr0;

    if (!R.mutante.movimentoNullo) {
      if (iMob.vuoto) tr.push('la mobile è vuota e dorme');
      else if (!iMob.timely && !iMob.generata) tr.push('la mobile è untimely e non generata: non agisce efficacemente');
      else {
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
            tr.push('controllo indietro con energia ma il carattere è C: tace');
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
            }
            var c = carattere(parArr, mobPos, prog);
            if (c) return { dir: c.dir, gradino:'B1-carattere',
                            perche: "la mobile conclude senza destinazione, agisce l'arrivo — " + c.nota };
            tr.push("la mobile conclude ma il suo arrivo è C: tace");
          }
        }
      }
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

    var caricati = [];
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
        var cc = carattere(caricati[q].i.par, caricati[q].i.pos, {});
        if (cc) return { dir: cc.dir, gradino:'B2-data', perche: tr.concat([caricati[q].fonte + ' — ' + cc.nota]).join(' → ') };
      }
      tr.push('i caricati dalla data sono tutti C: tacciono');
    }

    for (var z = 0; z < R.linee.length; z++) {
      var l = R.linee[z];
      if (!l.fushen) continue;
      var ii = inv[l.pos - 1];
      if (ii.timely || ii.generata) continue;
      var f = l.fushen;
      var rinf = !!(D && (f.b === D || (dEl && (dEl === f.el || GEN[dEl] === f.el))));
      if (!rinf) continue;
      if (KE[f.el] !== l.el) continue;
      var cf = carattere(f.par, l.pos, {});
      if (cf) return { dir: cf.dir, gradino:'B3-fushen',
        perche: tr.concat(['il 伏神 ' + f.b + ' rinforzato dal giorno controlla la linea untimely che lo copre — ' + cf.nota]).join(' → ') };
    }

    // ---- B3-bis. la penalità del giorno su una linea ferma ---------------------
    // La penalità fa quello che dice la parola: penalizza chi la riceve (Edu, 29/08/2026).
    if (D && ENV_G.MPPENALINEA !== 'no') {
      var pen = [];
      for (var w = 0; w < R.linee.length; w++) {
        var lw = R.linee[w];
        if (lw.isMobile || inv[w].vuoto) continue;
        var pl = pena(R, lw.ramo); if (pl) pen.push(lw);
      }
      if (pen.length === 1)
        return { dir: opposto(sede(pen[0].pos)), gradino:'B3b-linea-penalizzata',
                 perche: tr.concat(['la data penalizza (刑) L' + pen[0].pos + ' ' + pen[0].par +
                                    ': la penalizzata non fa vincere la sua squadra — la sua sede cade']).join(' → ') };
    }

    var S = R.linee[R.shi - 1], Y = R.linee[R.ying - 1];
    var sv = inv[R.shi - 1].vuoto, yv = inv[R.ying - 1].vuoto;
    if (sv !== yv)
      return { dir: sede(sv ? Y.pos : S.pos), gradino:'B4-duello',
               perche: tr.concat(['duello Shi/Ying: la ' + (sv ? 'Shi' : 'Ying') + ' è vuota e dorme, vince l\'altra']).join(' → ') };
    return { dir: null, perche: tr.concat(['duello Shi/Ying muto: TACE']).join(' → ') };
  }

  return { leggi: leggi, inventario: inventario };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { creaMotore: creaMotore };
