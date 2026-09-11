/*
 * MOTORE DI LETTURA — v5, ricostruito e sviluppato in S45 (09-11/09/2026)
 * ============================================================================
 * Legge una carta come la legge Edu: si trova il protagonista (la mobile), se ne
 * segue la traccia fino in fondo, le altre cose salienti sono conferme o smentite,
 * non voti. L'energia dice quanto, non da che parte. Tutto documentato passo per
 * passo nel REGISTRO_CORREZIONI_13_08_2026.md, sezioni S45.
 *
 * ORDINE DELLE TRACCE (ogni gradino e' dietro interruttore, =off lo spegne):
 *   T0   guerra fra titani                MLGUERRA   due pilastri sulla stessa linea in
 *                                                    clash, o in penalita' se sono solo due
 *   T0b  la bestia clasha la mobile       MLTAISUI   la blocca: resta se' stessa e parla
 *   T0e  la seconda mobile impiglia/blocca DUEMUTPART=on (spento: costa)
 *   T0g  il trigono in movimento          MLTRIGMOB  partenze+arrivi delle linee che girano
 *                                                    formano un trigono che circonda una sede
 *   T0c  il B che avanza ruba la W        MLLADRO    solo 進神; se anche l'altra sede e'
 *                                                    presa dalle bestie, confronto
 *   T1a  il malus retrocede/avanza        MLPROG     P/B; MLIMPIGLIO se il giorno combina la
 *        il vantaggio retrocede           MLPROGBEN  partenza; G/W SOLO ritirata
 *   T1   la sostituzione                  MLSOST     possesso della bestia + passo chiuso
 *   T1b  confronto fra le due sedi prese  MLPOSSESSO relazione, poi forza, poi bestie
 *   T2   la sede si occupa di se' (回頭剋) MLINDIETRO forza; il nascosto prende la sede (MLFUSHEN)
 *   T2b  nutrita dal proprio arrivo (回頭生) MLNUTRITA  tomba: MLTOMBA
 *   T2d  la sede va a combinare           MLSEDECOMB solo a passo vivo
 *   T2c  la mobile ritrova la sua copia   MLCOPIA
 *   T3   il raduno che serve la linea     MLSERVE    di stagione la trasforma (MLRADTRASF);
 *                                                    non decide se l'elemento e' anche su una
 *                                                    sede dall'altra parte (MLRADSEDE)
 *   T4   il giorno (o il secondo arrivo) tiene/distrugge l'arrivo   MLGIORNO
 *   T4b  la sede presa dalle bestie       MLSEDEPRESA
 *   T4c  la svegliata dal giorno          MLSVEGLIA
 *   T4d  la ferma incompatibile agisce    MLINCFERMA
 *   T5   le tre porte                     MLPORTE    non a ritirata senza forza (MLRITIRATA)
 *   T5b/T5c porte/carattere della seconda DUEMUT2=on / SECONDACAR=dopo (spenti: costano)
 *   T6   il trigono che nutre             MLNUTRE
 *   T7   il duello, solo alla fine        MLDUELLO   solo se una sede e' fuori e l'altra no
 *
 * BESTIE (Edu): clasha la mobile -> la blocca · clasha la ferma -> la sveglia · controlla o
 * drena -> se ne impadronisce · la linea la controlla -> vince solo se di stagione · la
 * nutre -> la aiuta · linea vuota o due bestie -> possesso sempre · una bestia non e' mai
 * vuota · due bestie: catena dell'energia, puo' finire sul ramo della linea · coincide col
 * nascosto -> lo tira fuori.
 * LINEA INCOMPATIBILE (cinque coppie: 卯兌 午坎 申艮 col ponte, 丑坤 辰乾 senza): ferma ->
 * diventa mobile; mobile -> non si ferma. FUTURO=insieme: l'esagramma futuro con tutte le
 * linee che girano. DUEMUT: il secondo arrivo tiene/distrugge l'arrivo della prima.
 *
 * MOSTRA=CROSS|YYYY-MM-DD[;CROSS|DATA...]  stampa le letture in un solo avvio.
 * Le linee si chiamano per lettera: P B W G C.
 * ============================================================================
 */
'use strict';

function creaMotore(LYM) {
  var ENV = (typeof process !== 'undefined' && process.env) ? process.env : {};

  var WX = { '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire',
             '午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water' };
  var GEN = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' };
  var KE  = { Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood' };
  var TOMBA = { Wood:'未', Fire:'戌', Metal:'丑', Water:'辰', Earth:'辰' };
  var COMBINA = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯',
                  '辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
  var CLASH = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅',
                '卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
  var XING = { '寅':'巳','巳':'申','申':'寅','丑':'戌','戌':'未','未':'丑','子':'卯','卯':'子' };
  var SEASON = { '寅':'Wood','卯':'Wood','辰':'Wood','巳':'Fire','午':'Fire','未':'Fire',
                 '申':'Metal','酉':'Metal','戌':'Metal','亥':'Water','子':'Water','丑':'Water' };
  var TRIGONI = [['申','子','辰'],['亥','卯','未'],['寅','午','戌'],['巳','酉','丑']];
  var RADUNI  = [['亥','子','丑'],['寅','卯','辰'],['巳','午','未'],['申','酉','戌']];
  var STEM_BESTIA = { '甲':'青龍','乙':'青龍','丙':'朱雀','丁':'朱雀','戊':'勾陳',
                      '己':'螣蛇','庚':'白虎','辛':'白虎','壬':'玄武','癸':'玄武' };
  var EL_IT = { Wood:'Legno', Fire:'Fuoco', Earth:'Terra', Metal:'Metallo', Water:'Acqua' };
  var PAR_IT = { G:'G', W:'W', P:'P', B:'B', C:'C' };
  var PESO_STAGIONE = { '旺': 2, '相': 1, '休': 0, '囚': -1, '死': -2 };

  var off = function (k) { return ENV[k] === 'off'; };
  var sede = function (pos) { return pos <= 3 ? 'SHORT' : 'LONG'; };
  var opposto = function (d) { return d === 'LONG' ? 'SHORT' : 'LONG'; };

  function parDi(el, palEl) {
    if (!el || !palEl) return null;
    if (el === palEl) return 'B';
    if (GEN[palEl] === el) return 'C';
    if (GEN[el] === palEl) return 'P';
    if (KE[palEl] === el) return 'W';
    if (KE[el] === palEl) return 'G';
    return null;
  }

  function dirDelCarattere(par, pos) {
    if (par === 'G' || par === 'W') return sede(pos);
    if (par === 'P' || par === 'B') return opposto(sede(pos));
    return null;
  }

  function contesto(R, ctx) {
    var mEl = R.monthBranch ? WX[R.monthBranch] : null;
    var sEl = R.monthBranch ? SEASON[R.monthBranch] : null;

    // La stagione si misura come in liuyao.js (stadioMese): il MIGLIORE fra il conto
    // sul ramo del mese e quello sull'elemento della stagione, e la Terra e' prospera
    // nei quattro mesi di Terra. La versione precedente guardava solo la stagione ed
    // era sbagliata: nel mese 未 faceva risultare il Metallo morto invece che in crescita.
    var PESO = { '旺': 2, '相': 1, '休': 0, '囚': -1, '死': -2 };
    function contro(el, rif) {
      if (!el || !rif) return null;
      if (el === rif) return '旺';
      if (GEN[rif] === el) return '相';
      if (GEN[el] === rif) return '休';
      if (KE[rif] === el) return '死';
      if (KE[el] === rif) return '囚';
      return '休';
    }
    function stagione(el) {
      if (!el) return null;
      if (el === 'Earth' && ['辰','戌','丑','未'].indexOf(R.monthBranch) >= 0) return '旺';
      var a = contro(el, mEl), b = contro(el, sEl);
      return (PESO[a] || 0) >= (PESO[b] || 0) ? a : b;
    }
    function timely(el) { var st = stagione(el); return st === '旺' || st === '相'; }

    var pil = [];
    if (ctx && ctx.pilastri) {
      var ordine = ['giorno', 'mese', 'anno', 'ora'];
      for (var o = 0; o < ordine.length; o++)
        for (var p = 0; p < ctx.pilastri.length; p++) {
          var P = ctx.pilastri[p];
          if (P && P.nome === ordine[o] && P.stelo && P.ramo) pil.push(P);
        }
    }

    var suLinea = {};
    for (var i = 0; i < pil.length; i++) {
      var b = STEM_BESTIA[pil[i].stelo];
      if (!b) continue;
      for (var z = 0; z < R.linee.length; z++) {
        var L = R.linee[z];
        if (L.bestia && L.bestia.cn === b) {
          if (!suLinea[L.pos]) suLinea[L.pos] = [];
          suLinea[L.pos].push({ nome: pil[i].nome, stelo: pil[i].stelo, ramo: pil[i].ramo, _L: L });
        }
      }
    }

    for (var pz in suLinea) {
      var gruppo = suLinea[pz];
      for (var y = 0; y < gruppo.length; y++) {
        var Q = gruppo[y], Lq = Q._L, pe = WX[Q.ramo], le = Lq.el;
        // Edu, 09/09/2026: una bestia che arriva non e' mai vuota — il vuoto non la tocca.
        if (CLASH[Q.ramo] === Lq.ramo) { Q.azione = Lq.isMobile ? 'blocca' : 'sveglia'; Q.possiede = false; }
        else if (gruppo.length > 1) { Q.azione = 'possiede in due'; Q.possiede = true; }
        else if (Lq.vuoto) { Q.azione = 'possiede la vuota'; Q.possiede = true; }
        else if (KE[pe] === le) { Q.azione = 'controlla'; Q.possiede = true; }
        else if (GEN[le] === pe) { Q.azione = 'drena'; Q.possiede = true; }
        else if (KE[le] === pe) {
          Q.possiede = !timely(le);
          Q.azione = Q.possiede ? 'la linea la controlla ma è fuori stagione'
                                : 'la linea la controlla ed è di stagione';
        }
        else if (GEN[pe] === le) { Q.azione = 'aiuta'; Q.possiede = false; }
        else { Q.azione = 'carica'; Q.possiede = false; }
      }
    }

    // LINEA INCOMPATIBILE (dottrina rivista da Edu, 09/09/2026). Tre coppie in cui il
    // ramo proprio del trigramma controlla il ramo che ci abita: 卯 in 兌, 午 in 坎,
    // 申 in 艮. Il ponte della data (Acqua per 卯 e 申, Legno per 午) la salva se
    // l'elemento in mezzo sta in almeno DUE dei quattro rami della data.
    // La linea incompatibile NON PUO' STARE DOVE STA:
    //   ferma  -> diventa mobile
    //   mobile -> non puo' essere fermata, ne' da un clash ne' da una combinazione
    // Le coppie sono CINQUE (§109, 27/08/2026): tre col controllo, che hanno un ponte
    // (卯 in 兌 · 午 in 坎 · 申 in 艮), e due col CLASH del ramo proprio del trigramma,
    // senza ponte (丑 in 坤: 未丑冲 · 辰 in 乾: 戌辰冲). Claude ne aveva cablate tre;
    // Edu le ha ricordate su AUDUSD 22/12/2025, dove L4 丑 in 坤 e' la seconda.
    var INCOMP = { '卯': { trig: 2, ponte: 'Water' }, '午': { trig: 6, ponte: 'Wood' },
                   '申': { trig: 7, ponte: 'Water' },
                   '丑': { trig: 8, ponte: null }, '辰': { trig: 1, ponte: null } };
    var ramiData0 = pil.map(function (P) { return P.ramo; });
    function incompDi(L) {
      var k = INCOMP[L.ramo];
      if (!k || k.trig !== (L.pos <= 3 ? R.inf : R.sup)) return null;
      if (!k.ponte) return { ponti: 0, el: null };   // coppia col clash: niente ponte
      var ponti = ramiData0.filter(function (r) { return WX[r] === k.ponte; }).length;
      return ponti >= 2 ? null : { ponti: ponti, el: k.ponte };
    }

    // SECONDA MUTAZIONE (test di Edu, 11/09/2026): la ferma incompatibile che diventa
    // mobile ha una partenza e un ARRIVO. Lo si calcola chiedendo a liuyao la mutazione
    // di quella linea come se fosse lei la mobile (l'arrivo dipende solo dal trigramma
    // e dalla posizione): USDJPY 28/04/2025, L3 申 in 艮 -> 卯, come nella carta di Edu.
    // L'ESAGRAMMA FUTURO SI CALCOLA CON TUTTE LE LINEE CHE GIRANO INSIEME (carta di Edu
    // su AUDUSD 22/12/2025: L6 e L4 girano tutte e due, 坤 diventa 離, e L4 va in 酉 —
    // non in 午 come verrebbe girandola da sola). Numerazione dei trigrammi come in
    // liuyao: n-1 in binario, bit 4 = linea bassa, bit 1 = linea alta, 1 = yin.
    // FUTURO=insieme  -> anche l'arrivo della prima mobile viene dal futuro comune
    // FUTURO=seconde  -> solo le seconde (la prima tiene l'arrivo di liuyao)
    // (default)       -> ogni seconda mutata da sola, come prima
    var seconde = [];
    var mobileArrComune = null;
    if (!off('DUEMUT') && LYM && LYM.readManual) {
      var ferme = R.linee.filter(function (L) { return !L.isMobile && incompDi(L); });
      var modoF = ENV.FUTURO || 'insieme';
      var giraSup = 0, giraInf = 0;
      var tutteMobili = ferme.concat(modoF === 'sola' ? [] : [R.linee[R.mutante.pos - 1]]);
      if (modoF !== 'sola') tutteMobili.forEach(function (L) {
        if (L.pos <= 3) giraInf ^= (1 << (3 - L.pos)); else giraSup ^= (1 << (6 - L.pos));
      });
      var supF = ((R.sup - 1) ^ giraSup) + 1, infF = ((R.inf - 1) ^ giraInf) + 1;
      var RF = null;
      try { RF = LYM.readManual(supF, infF, 1, R.monthBranch, R.dayBranch, R.yearBranch, R.dayStem, R.oraBranch); } catch (e) {}
      for (var q2 = 0; q2 < ferme.length; q2++) {
        var L2q = ferme[q2];
        try {
          var arr2, R2;
          if (modoF !== 'sola' && RF && RF.linee) arr2 = RF.linee[L2q.pos - 1].ramo;
          else {
            R2 = LYM.readManual(R.sup, R.inf, L2q.pos, R.monthBranch, R.dayBranch, R.yearBranch, R.dayStem, R.oraBranch);
            arr2 = R2 && R2.mutante ? R2.mutante.ramoArr : null;
          }
          if (arr2) seconde.push({ L: L2q, dep: L2q.ramo, arr: arr2, arrEl: WX[arr2] });
        } catch (e) {}
      }
      if (modoF === 'insieme' && RF && RF.linee && ferme.length)
        mobileArrComune = RF.linee[R.mutante.pos - 1].ramo;
    }

    // Il secondo arrivo sulle ALTRE linee (test di Edu, 11/09/2026), con le stesse regole
    // del giorno e delle bestie: combina una ferma -> la impiglia; clasha una ferma -> la
    // sveglia. Dietro DUEMUT2.
    if (ENV.DUEMUT2 === 'on' && seconde.length === 1) {
      var A2 = (ENV.ANDONG === 'si') ? seconde[0].dep : seconde[0].arr;
      for (var q3 = 0; q3 < R.linee.length; q3++) {
        var L3q = R.linee[q3];
        if (L3q.isMobile || L3q.pos === seconde[0].L.pos) continue;
        if (COMBINA[A2] === L3q.ramo) L3q._legata2 = true;
        if (CLASH[A2] === L3q.ramo) L3q._sveglia2 = true;
      }
    }

    var ramiData = ramiData0;

    return { sEl: sEl, timely: timely, stagione: stagione, pil: pil, suLinea: suLinea,
             ramiData: ramiData, D: R.dayBranch, incompDi: incompDi, seconde: seconde, mobileArrComune: mobileArrComune,
             vuoto: function (ramo) { return (R.vuoti || []).indexOf(ramo) >= 0; } };
  }

  function elDopoLeBestie(L, C) {
    var lista = C.suLinea[L.pos] || [];
    // Edu, 09/09/2026: un pilastro che arriva sulla linea con lo STESSO RAMO del
    // nascosto (伏神) ci coincide e lo tira fuori — la linea diventa il nascosto
    // (EURJPY 10/02/2026: 丙午 arriva sullo Shi e coincide con la P 午 nascosta).
    if (L.fushen) {
      for (var f = 0; f < lista.length; f++)
        if (lista[f].ramo === L.fushen.b) return L.fushen.el;
    }
    if (!lista.length) return L.el;
    // Con UNA bestia sola che prende possesso, la linea diventa quella bestia. Con piu'
    // di una c'e' scambio di qi fra loro e conta il capolinea della catena, che puo'
    // anche tornare sul ramo della linea (USDCAD 18/03/2020: 申 genera 子 che genera
    // 寅, quindi la Ying resta Legno).
    if (lista.length === 1) return lista[0].possiede ? WX[lista[0].ramo] : L.el;
    var tutte = lista.map(function (Q) { return WX[Q.ramo]; });
    var cur = L.el, usati = {}, mosso = true;
    while (mosso) {
      mosso = false;
      for (var i = 0; i < tutte.length; i++) {
        if (usati[i]) continue;
        if (GEN[cur] === tutte[i]) { cur = tutte[i]; usati[i] = true; mosso = true; break; }
      }
    }
    return cur;
  }

  function forza(el, L, R, C) {
    var f = PESO_STAGIONE[C.stagione(el)] || 0;
    if (L && C.vuoto(L.ramo) && !L.isMobile) f -= 2;
    if (L && (L.stato === 'legata' || L.stato === 'rotta' ||
              L.stato === 'eliminata' || L.stato === 'dormiente')) f -= 1;
    if (C.D && GEN[WX[C.D]] === el) f += 1;
    if (C.D && KE[WX[C.D]] === el) f -= 1;
    if (L && C.suLinea[L.pos]) f += C.suLinea[L.pos].length;
    if (L && C.ramiData.some(function (r) { return GEN[WX[r]] === el; })) f += 1;
    return f;
  }

  function guerre(R, C, racconto) {
    var annullate = {};
    if (off('MLGUERRA')) return annullate;
    for (var pos in C.suLinea) {
      var lista = C.suLinea[pos];
      if (!lista || lista.length < 2) continue;
      for (var a = 0; a < lista.length; a++)
        for (var b = a + 1; b < lista.length; b++) {
          var ra = lista[a].ramo, rb = lista[b].ramo;
          if (ra === rb) continue;
          var pen = lista.length === 2 && ((XING[ra] === rb) || (XING[rb] === ra));
          var cla = CLASH[ra] === rb;
          if (pen || cla) {
            annullate[pos] = true;
            racconto.push('su L' + pos + ' cadono due bestie, ' + lista[a].nome + ' ' +
              lista[a].stelo + ra + ' e ' + lista[b].nome + ' ' + lista[b].stelo + rb +
              ', coi rami ' + (pen ? 'in penalità' : 'in clash') +
              ': è uno scontro fra titani, la linea è annullata e non agisce più');
          }
        }
    }
    return annullate;
  }

  // Un carattere presente su tutte e due le parti della carta non fa pendere niente:
  // se lo stesso elemento della mobile siede anche sullo Shi o sulla Ying dall'altra
  // parte, quella linea non puo' far vincere la propria sede (EURJPY 10/02/2026).
  function gemellaDiSede(mob, pos, R, C, annullate) {
    // Se la mobile e' lei stessa lo Shi o la Ying parla per la propria sede e basta:
    // il soggetto non viene messo in pareggio da nessuno (USDJPY 30/09/2025).
    if (mob.isShi || mob.isYing) return null;
    return R.linee.filter(function (L) {
      return L.pos !== pos && !annullate[L.pos] && L.el === mob.el &&
             (L.isShi || L.isYing) && sede(L.pos) !== sede(pos) && faQualcosa(L, R, C);
    })[0] || null;
  }

  function faQualcosa(L, R, C) {
    // Una linea incompatibile ferma non puo' stare dove sta: diventa mobile, quindi
    // agisce sempre — nemmeno il giorno che la combina la tiene ferma.
    if (!off('MLINCFERMA') && !L.isMobile && C.incompDi && C.incompDi(L)) return true;
    // Il giorno che COMBINA una linea la impiglia: quella linea non fa niente, e non
    // puo' nemmeno essere membro di un raduno. Prima la contavo fra quelle che fanno
    // qualcosa, che e' l'opposto (USDCHF 15/07/2026: il trigono 亥卯未 prendeva il suo
    // 亥 da L4, che il giorno 寅 teneva legata).
    if (C.D && COMBINA[C.D] === L.ramo) return false;
    if (L.stato === 'legata' || L._legata2) return false;
    if (L._sveglia2) return true;
    if (L.isMobile || L.isShi || L.isYing) return true;
    if (C.D && CLASH[C.D] === L.ramo) return true;
    if (C.suLinea[L.pos] && C.suLinea[L.pos].length) return true;
    return false;
  }

  // Edu, 09/09/2026: "S e Y sono uguali ma chi ha le bestie dal suo lato vince sempre".
  // Quando il confronto non si decide — stesso elemento, o nessuno dei due comanda e
  // le forze pareggiano — vince la sede su cui sono cadute piu' bestie.
  function chiHaLeBestie(R, C, racconto) {
    var nS = (C.suLinea[R.shi] || []).length, nY = (C.suLinea[R.ying] || []).length;
    if (nS === nY) return null;
    racconto.push('le due sedi si equivalgono, ma le bestie stanno dalla parte ' +
      (nS > nY ? 'dello Shi (' + nS + ' contro ' + nY + ')' : 'della Ying (' + nY + ' contro ' + nS + ')') +
      ': chi ha le bestie dal suo lato vince sempre');
    return sede(nS > nY ? R.shi : R.ying);
  }

  function confrontoDiretto(R, C, elShi, elYing, racconto, perForza) {
    var lShi = R.linee[R.shi - 1], lYing = R.linee[R.ying - 1];
    if (perForza) {
      var fA = forza(elShi, lShi, R, C), fB = forza(elYing, lYing, R, C);
      if (fA === fB) return chiHaLeBestie(R, C, racconto);
      racconto.push('confronto fra le due sedi: vince la più forte, ' +
        (fA > fB ? 'la Shi' : 'la Ying') + ' (' + Math.max(fA, fB) + ' contro ' + Math.min(fA, fB) + ')');
      return sede(fA > fB ? R.shi : R.ying);
    }
    var vince = null, perche = '';
    if (elShi === elYing) {
      var pari = chiHaLeBestie(R, C, racconto);
      if (pari) return pari;
    }
    if (GEN[elYing] === elShi) { vince = R.shi; perche = 'il ' + EL_IT[elYing] + ' della Ying genera il ' + EL_IT[elShi] + ' della Shi: la Shi è nutrita e vince'; }
    else if (GEN[elShi] === elYing) { vince = R.ying; perche = 'il ' + EL_IT[elShi] + ' della Shi genera il ' + EL_IT[elYing] + ' della Ying: la Ying è nutrita e vince'; }
    else if (KE[elShi] === elYing) { vince = R.shi; perche = 'il ' + EL_IT[elShi] + ' della Shi controlla il ' + EL_IT[elYing] + ' della Ying: vince la Shi'; }
    else if (KE[elYing] === elShi) { vince = R.ying; perche = 'il ' + EL_IT[elYing] + ' della Ying controlla il ' + EL_IT[elShi] + ' della Shi: vince la Ying'; }
    else {
      var f1 = forza(elShi, lShi, R, C), f2 = forza(elYing, lYing, R, C);
      if (f1 === f2) return chiHaLeBestie(R, C, racconto);
      vince = f1 > f2 ? R.shi : R.ying;
      perche = 'nessuno dei due elementi comanda sull\'altro: vince la più forte, ' + (f1 > f2 ? 'la Shi' : 'la Ying');
    }
    racconto.push('confronto diretto fra le due sedi — ' + perche);
    return sede(vince);
  }

  function energia(R, C) {
    var e = 0, mob = R.linee[R.mutante.pos - 1];
    if (C.timely(R.mutante.arrEl)) e += 2;
    if (C.timely(mob.el)) e += 1;
    if (C.vuoto(R.monthBranch)) e -= 2;
    if (C.suLinea[R.mutante.pos] && C.suLinea[R.mutante.pos].length) e += 1;
    return e >= 3 ? 'molta' : e >= 1 ? 'normale' : 'poca';
  }

  function leggi(R, ctx) {
    if (!R || R.error || !R.mutante) return { dir: null, perche: 'carta non leggibile', gradino: 'tace', racconto: '' };
    var C = contesto(R, ctx);
    var racconto = [];
    var mob = R.linee[R.mutante.pos - 1];
    var pos = R.mutante.pos;
    var dep = R.mutante.ramoDep, arr = R.mutante.ramoArr;
    var depEl = R.mutante.depEl, arrEl = R.mutante.arrEl;
    if (C.mobileArrComune && C.mobileArrComune !== arr) {
      racconto.push('con più linee che girano insieme l\'esagramma futuro cambia: la mobile non va più in ' +
        arr + ' ma in ' + C.mobileArrComune);
      arr = C.mobileArrComune; arrEl = WX[arr];
    }
    var palEl = R.palEl;
    // L'autocombinazione non e' un passo nullo (Edu, 09/09/2026): liuyao la segna come
    // movimento nullo, ma per Edu la linea si muove eccome. Da qui in giu' si usa questo.
    var passoNullo = R.mutante.movimentoNullo &&
        String(R.mutante.motivoNullo || '').indexOf('self-combination') < 0;

    // DUE LINEE IN MOVIMENTO: la ferma incompatibile "diventa mobile", quindi in quelle
    // carte ci sono due linee che si muovono, non una. Tre modi di leggerla, tutti
    // dietro DUEMOB per poterli misurare separati:
    //   prima    = decide la incompatibile, prima di tutto il resto
    //   concordi = si conclude solo se le due dicono la stessa cosa, altrimenti tace
    //   conferma = decide la mobile; la incompatibile parla solo se la mobile non conclude
    var incFerma = (R.linee.filter(function (L) {
      return L.pos !== pos && !L.isMobile && C.incompDi(L) && dirDelCarattere(L.par, L.pos);
    }))[0] || null;
    var dirIncFerma = incFerma ? dirDelCarattere(incFerma.par, incFerma.pos) : null;
    var MODO = ENV.DUEMOB || 'conferma';

    // Test di Edu (11/09/2026): la seconda mobile, compiuto il passo, resta con il
    // carattere dell'ARRIVO e fa vincere o perdere la propria sede (L3 申 -> 卯: da B a W,
    // e la W fa vincere il basso). SECONDACAR=prima -> decide prima della prima mobile;
    // SECONDACAR=dopo -> solo se la prima non conclude.
    var S2c = (!off('DUEMUT') && C.seconde.length === 1) ? C.seconde[0] : null;
    var parArr2 = S2c ? parDi(S2c.arrEl, palEl) : null;
    var dirSeconda = S2c && parArr2 ? dirDelCarattere(parArr2, S2c.L.pos) : null;
    if (dirSeconda && ENV.SECONDACAR === 'prima') {
      racconto.push('L' + S2c.L.pos + ' è incompatibile e muta: ' + S2c.dep + ' → ' + S2c.arr +
        ', che nel palazzo è ' + PAR_IT[parArr2] + '. Resta così e decide la propria sede');
      return { dir: dirSeconda, perche: 'la seconda mobile diventa ' + PAR_IT[parArr2] + ' e decide la sua sede',
               gradino: 'T0f la seconda diventa ' + PAR_IT[parArr2], inccard: inccard,
               racconto: racconto.join('\n'), passi: racconto, energia: 0 };
    }

    var fine = function (dir, perche, gradino) {
      if (dirIncFerma && MODO === 'concordi' && dir && dir !== dirIncFerma) {
        racconto.push('ma L' + incFerma.pos + ', incompatibile e quindi anch\'essa in movimento, ' +
          'dice il contrario: le due linee mobili non concordano');
        dir = null; gradino = 'tace (due mobili discordi)';
      }
      return { dir: dir, perche: perche, inccard: inccard, gradino: gradino || 'lettura',
               dettaglio: dep + '→' + arr + ' ' + mob.par + ' L' + pos +
                          (mob.isShi ? ' Shi' : mob.isYing ? ' Ying' : '') +
                          (C.timely(depEl) ? ' timely' : ' untimely'),
               racconto: racconto.map(function (x, i) { return (i + 1) + '. ' + x; }).join('\n'),
               passi: racconto, energia: energia(R, C) };
    };

    racconto.push('il protagonista è la linea mobile L' + pos + ', ' + PAR_IT[mob.par] + ' ' +
      dep + ' ' + EL_IT[depEl] + (mob.isShi ? ' (è lo Shi)' : mob.isYing ? ' (è la Ying)' : '') +
      (arr ? ', che va in ' + arr + ' ' + EL_IT[arrEl] : ''));

    if (dirIncFerma && MODO === 'prima') {
      racconto.push('L' + incFerma.pos + ' è incompatibile: non può stare dove sta, quindi si ' +
        'muove anche lei. È un ' + PAR_IT[incFerma.par] + ' e decide prima della mobile');
      return { dir: dirIncFerma, perche: 'decide la ferma incompatibile di L' + incFerma.pos,
               gradino: 'T0d la seconda mobile', inccard: inccard,
               racconto: racconto.join('\n'), passi: racconto, energia: 0 };
    }
    var incomp = off('MLINCOMP') ? null : C.incompDi(mob);
    // Le seconde mobili possono essere piu' d'una (AUDUSD 22/12/2025 ne ha due): ognuna
    // puo' tenere o distruggere l'arrivo della prima; si prende quella che lo fa.
    // ANDONG=si: la seconda si muove come una ferma clashata (暗動), agisce col PROPRIO
    // ramo e non cambia yin/yang. Altrimenti muta davvero e agisce con l'arrivo.
    var tutteSeconde = off('DUEMUT') ? [] : C.seconde;
    var ramoDi = function (X) { return (ENV.ANDONG === 'si') ? X.dep : X.arr; };
    var S2 = tutteSeconde.filter(function (X) {
      var r2 = ramoDi(X);
      return COMBINA[r2] === dep || CLASH[r2] === dep || (arr && (COMBINA[r2] === arr || CLASH[r2] === arr));
    })[0] || tutteSeconde[0] || null;
    var ramo2 = S2 ? ramoDi(S2) : null;
    if (tutteSeconde.length) racconto.push('linee incompatibili che si muovono anche loro: ' +
      tutteSeconde.map(function (X) { return 'L' + X.L.pos + ' ' + X.dep + '→' + X.arr; }).join(', '));
    var secCombDep = !!(ramo2 && COMBINA[ramo2] === dep);
    var secClashDep = !!(ramo2 && CLASH[ramo2] === dep);
    var secCombArr = !!(ramo2 && arr && COMBINA[ramo2] === arr);
    var secClashArr = !!(ramo2 && arr && CLASH[ramo2] === arr);
    if (S2 && (secCombDep || secClashDep || secCombArr || secClashArr)) {
      racconto.push('L' + S2.L.pos + ' è incompatibile e si muove anche lei, ' + S2.dep + ' → ' + S2.arr +
        ': il suo arrivo ' + (secCombDep ? 'combina la partenza della mobile' : secClashDep ? 'clasha la partenza della mobile' :
        secCombArr ? 'combina l\'arrivo della mobile' : 'clasha l\'arrivo della mobile'));
      if (!incomp && (secCombArr || secClashArr)) passoNullo = true;
    }
    var annullate = guerre(R, C, racconto);
    if (S2 && ENV.DUEMUTPART === 'on' && !incomp && (secCombDep || secClashDep) && !annullate[pos]) {
      racconto.push('la mobile resta ' + (secCombDep ? 'impigliata' : 'bloccata') + ' dov\'è e parla col proprio carattere, ' + PAR_IT[mob.par]);
      var dS2b = dirDelCarattere(mob.par, pos);
      if (dS2b) return fine(dS2b, 'la seconda mobile ' + (secCombDep ? 'impiglia' : 'blocca') + ' la prima, che resta ' + PAR_IT[mob.par],
                            'T0e la seconda ' + (secCombDep ? 'impiglia' : 'blocca'));
    }
    var mobileAnnullata = !!annullate[pos];

    // Edu, 09/09/2026: l'autocombinazione c'e' solo se l'arrivo torna indietro a
    // combinare. 午 che diventa 未 non e' questo: e' una trasformazione e basta, la
    // linea si muove (USDCAD 18/03/2020). Resta ferma solo l'altro caso -4, l'arrivo
    // in tomba nel mese e punito dal giorno (EURJPY 11/07/2024).
    var davveroFerma = R.mutante.casoMut === -4 &&
        String(R.mutante.motivoNullo || '').indexOf('self-combination') < 0;
    if (!off('MLFERMA') && davveroFerma && !mobileAnnullata) {
      racconto.push('l\'arrivo ' + arr + ' è nella tomba del mese ed è punito dal giorno: ' +
        'la linea non si muove affatto, resta ferma e non fa nulla');
      mobileAnnullata = true;
    }

    if (!mobileAnnullata && !off('MLTAISUI')) {
      var capo = (C.suLinea[pos] || [])[0];
      if (capo && CLASH[capo.ramo] === dep) {
        racconto.push('la bestia del ' + capo.nome + ' ' + capo.stelo + capo.ramo +
          ' arriva su L' + pos + ' e clasha il ramo ' + dep +
          ': una bestia che clasha una linea mobile la blocca, non può muoversi — resta ' +
          PAR_IT[mob.par] + ' dov\'era');
        var dT = dirDelCarattere(mob.par, pos);
        if (dT) return fine(dT, 'la bestia del ' + capo.nome + ' clasha la mobile e la blocca',
                            'T0b la bestia blocca la mobile');
        mobileAnnullata = true;
      }
    }

    if (!mobileAnnullata && !off('MLLADRO') && arrEl && !passoNullo &&
        R.mutante.progressione === 'avanzante' && parDi(arrEl, palEl) === 'B') {
      var preda = R.linee.filter(function (L) {
        if (L.pos === pos || annullate[L.pos] || L.par !== 'W') return false;
        if (!L.isMobile && C.vuoto(L.ramo)) return false;
        return COMBINA[arr] === L.ramo || KE[arrEl] === L.el;
      })[0];
      if (preda) {
        racconto.push('l\'arrivo ' + arr + ' ' + EL_IT[arrEl] + ' è un B nel palazzo, e il B è il ' +
          'ladro della W: va a ' + (COMBINA[arr] === preda.ramo ? 'combinare' : 'controllare') +
          ' la W ' + preda.ramo + ' di L' + preda.pos +
          (preda.isShi ? ' (lo Shi)' : preda.isYing ? ' (la Ying)' : '') + ' e gliela porta via');
        var altraSede = preda.isShi ? R.ying : preda.isYing ? R.shi : null;
        var possiedeAltra = altraSede && (C.suLinea[altraSede] || []).some(function (Q) { return Q.possiede; });
        if (possiedeAltra) {
          racconto.push('ricevendo il B avanzante, L' + preda.pos + ' "diventa" ' + EL_IT[arrEl] +
            '; sull\'altra sede L' + altraSede + ' le bestie arrivano in ' +
            (C.suLinea[altraSede] || []).length + ' e se ne impadroniscono');
          var elAltra = elDopoLeBestie(R.linee[altraSede - 1], C);
          var dR = confrontoDiretto(R, C,
            preda.isShi ? arrEl : elAltra, preda.isYing ? arrEl : elAltra, racconto, true);
          if (dR) return fine(dR, 'la W derubata prende l\'elemento del B e si confronta con l\'altra sede',
                              'T0c il B ruba la W');
        }
        return fine(opposto(sede(preda.pos)),
          'il B ruba la W di L' + preda.pos + ': quella sede perde', 'T0c il B ruba la W');
      }
    }

    // La ritirata e l'avanzata valgono anche per un G o una W, per simmetria con la
    // regola di Edu sul malus: un danno che si ritira porta via il danno e la sua
    // squadra vince; allora un vantaggio che si ritira porta via il vantaggio e la sua
    // squadra perde (EURGBP 18/03/2020: il G 卯 di stagione retrocede in 寅).
    // --- T0g: il trigono formato dalle linee in movimento ----------------------
    // Edu, 11/09/2026 (AUDUSD 22/12/2025): "L4 ed L6 si muovono e insieme formano un
    // trigono di Metallo che circonda la W di Y. Long." Le linee che girano — la mobile
    // e le incompatibili — mettono in gioco partenze E arrivi. Se fra quei rami c'e' un
    // trigono intero, e le linee che lo portano stanno una sotto e una sopra una sede,
    // il trigono la CIRCONDA: se il suo elemento genera quello della sede, la nutre e la
    // sede vince. Qui 酉 (partenza di L6 e arrivo di L4), 巳 (arrivo di L6), 丑 (partenza
    // di L4) fanno 巳酉丑; L4 e L6 stanno attorno alla Ying L5, W 亥 Acqua, e il Metallo
    // genera l'Acqua: l'alto vince.
    if (!off('MLTRIGMOB') && !mobileAnnullata) {
      var inMoto = [{ pos: pos, rami: [dep, arr] }].concat((C.seconde || []).map(function (X) {
        return { pos: X.L.pos, rami: [X.dep, X.arr] };
      }));
      var ramiMoto = {};
      inMoto.forEach(function (M) { M.rami.forEach(function (r) { if (r) (ramiMoto[r] = ramiMoto[r] || []).push(M.pos); }); });
      for (var tg = 0; tg < TRIGONI.length && inMoto.length > 1; tg++) {
        var tri = TRIGONI[tg];
        if (!tri.every(function (r) { return ramiMoto[r]; })) continue;
        var portatori = {};
        tri.forEach(function (r) { ramiMoto[r].forEach(function (p2) { portatori[p2] = true; }); });
        var posP = Object.keys(portatori).map(Number);
        var elT = WX[tri[1]];
        var circondate = [R.shi, R.ying].filter(function (sp) {
          if (annullate[sp] || portatori[sp]) return false;
          var sotto = posP.some(function (p2) { return p2 < sp; }), sopra = posP.some(function (p2) { return p2 > sp; });
          return sotto && sopra;
        });
        for (var ci = 0; ci < circondate.length; ci++) {
          var LS = R.linee[circondate[ci] - 1];
          if ((LS.par === 'W' || LS.par === 'G') && GEN[elT] === LS.el) {
            racconto.push('le linee in movimento (L' + posP.sort().join(', L') + ') formano insieme il trigono ' +
              tri.join('') + ' di ' + EL_IT[elT] + ', che circonda L' + LS.pos + (LS.isShi ? ' (lo Shi)' : ' (la Ying)') +
              ', ' + PAR_IT[LS.par] + ' ' + LS.ramo + ' ' + EL_IT[LS.el] + ': il ' + EL_IT[elT] + ' genera ' +
              EL_IT[LS.el] + ', la ' + PAR_IT[LS.par] + ' è nutrita e la sua sede vince');
            return fine(sede(LS.pos), 'il trigono delle linee in movimento circonda e nutre ' + PAR_IT[LS.par] + ' di L' + LS.pos,
                        'T0g il trigono in movimento');
          }
        }
      }
    }

    var beneficio = (mob.par === 'G' || mob.par === 'W');
    // LINEA INCOMPATIBILE (registro, 30/08/2026). Tre coppie in cui il ramo proprio del
    // trigramma CONTROLLA il ramo che ci abita: 卯 in 兌, 午 in 坎, 申 in 艮. Quella linea
    // parte ma non arriva — e senza arrivo non c'e' ne' 進神 ne' 退神: la progressione si
    // azzera. Salvo il PONTE DELLA DATA: se l'elemento in mezzo (Acqua per 卯 in 兌 e per
    // 申 in 艮, Legno per 午 in 坎) e' presente in almeno DUE dei quattro rami della data,
    // il controllo diventa generazione e la linea si muove davvero.
    var quali = R.linee.filter(function (L) { return C.incompDi(L); })
                       .map(function (L) { return 'L' + L.pos + (L.isMobile ? 'M' : 'F'); });
    var inccard = quali.length ? quali.join(',') : null;
    if (process.env.LOG2 && C.seconde.length) {
      var S2 = C.seconde[0], cosa = [];
      if (COMBINA[S2.arr] === dep) cosa.push('combina-partenza');
      if (CLASH[S2.arr] === dep) cosa.push('clasha-partenza');
      if (arr && COMBINA[S2.arr] === arr) cosa.push('combina-arrivo');
      if (arr && CLASH[S2.arr] === arr) cosa.push('clasha-arrivo');
      R.linee.forEach(function (L) {
        if (L.pos === pos || L.pos === S2.L.pos) return;
        if (COMBINA[S2.arr] === L.ramo) cosa.push('combina-L' + L.pos + (L.isShi ? 'S' : L.isYing ? 'Y' : ''));
        if (CLASH[S2.arr] === L.ramo) cosa.push('clasha-L' + L.pos + (L.isShi ? 'S' : L.isYing ? 'Y' : ''));
      });
      console.error('#SEC n' + C.seconde.length + ' L' + S2.L.pos + (S2.L.isShi ? 'S' : S2.L.isYing ? 'Y' : '') +
        ' ' + S2.dep + '>' + S2.arr + ' caso' + S2.caso + ' ' + (cosa.length ? cosa.join(',') : 'niente'));
    }
    // Il secondo arrivo agisce sulla prima mobile come agisce il giorno: se ne combina
    // la partenza la impiglia, se ne combina l'arrivo lo tiene, se lo clasha lo
    // distrugge, se clasha la partenza la blocca (regola delle bestie). Dietro DUEMUT.
    if (incomp) {
      racconto.push('L' + pos + ' è una linea incompatibile — il ramo proprio del suo trigramma ' +
        (incomp.el ? 'controlla' : 'clasha') + ' il ' + dep + ' che ci abita' +
        (incomp.el ? ', e il ponte non regge (' + incomp.ponti + ' ramo di ' + EL_IT[incomp.el] + ' nella data, ne servono due)' : '') +
        '. Non può stare dove sta: essendo già ' +
        'mobile, nessuno la ferma, né un clash né una combinazione');
      passoNullo = false;
    }
    if (!mobileAnnullata && !off('MLPROG') && R.mutante.progressione &&
        (mob.par === 'P' || mob.par === 'B' ||
         (!off('MLPROGBEN') && beneficio && R.mutante.progressione === 'retrocedente'))) {
      if (!off('MLIMPIGLIO') && !incomp && C.D && COMBINA[C.D] === dep) {
        racconto.push('il ramo del giorno ' + C.D + ' combina la partenza ' + dep +
          ': la linea resta impigliata e non parte, quindi non si ritira nulla — il ' +
          PAR_IT[mob.par] + ' resta dov\'è e fa perdere la propria squadra');
        return fine(opposto(sede(pos)),
          'il giorno impiglia la partenza: il ' + PAR_IT[mob.par] + ' non si ritira',
          'T1a il malus impigliato');
      }
      var indietro = R.mutante.progressione === 'retrocedente';
      // Solo la RITIRATA, non l'avanzata: la ritirata e' quella che la carta autorizza
      // (EURGBP 18/03/2020) e misura 56,3% su 71 carte. La simmetria sull'avanzata,
      // provata e misurata, fa 28,6% su 28 carte: un G o una W che avanza non fa
      // vincere la propria sede, e finche' non c'e' una carta che spieghi perche',
      // resta fuori.
      if (beneficio) {
        racconto.push('la mobile è ' + PAR_IT[mob.par] + ', che è un vantaggio per la propria ' +
          'squadra, e ' + (indietro ? 'RETROCEDE (退神): si ritira e porta via il vantaggio, la sua sede perde'
                                    : 'AVANZA (進神): il vantaggio cresce, la sua sede vince'));
        return fine(indietro ? opposto(sede(pos)) : sede(pos),
          'il ' + PAR_IT[mob.par] + ' mobile ' + (indietro ? 'retrocede: la sua sede perde' : 'avanza: la sua sede vince'),
          'T1a il vantaggio ' + (indietro ? 'retrocede' : 'avanza'));
      }
      racconto.push('la mobile è ' + PAR_IT[mob.par] + ', che è un danno per la propria squadra, e ' +
        (indietro ? 'RETROCEDE (退神): si ritira e porta via il danno, la sua sede vince'
                  : 'AVANZA (進神): il danno cresce, la sua sede perde'));
      return fine(indietro ? sede(pos) : opposto(sede(pos)),
        'il ' + PAR_IT[mob.par] + ' mobile ' + (indietro ? 'retrocede: la sua sede vince' : 'avanza: la sua sede perde'),
        'T1a il malus ' + (indietro ? 'retrocede' : 'avanza'));
    }

    var sostituto = null;
    if (!mobileAnnullata && !off('MLSOST') && C.suLinea[pos]) {
      var cand = C.suLinea[pos];
      for (var i2 = 0; i2 < cand.length && !sostituto; i2++) {
        var P2 = cand[i2];
        if (!P2.possiede) continue;
        if (!passoNullo && R.mutante.casoMut !== 3) continue;
        sostituto = { P: P2, el: WX[P2.ramo], motivo: P2.azione };
      }
    }

    if (sostituto) {
      var parS = parDi(sostituto.el, palEl);
      racconto.push('la bestia del ' + sostituto.P.nome + ' ' + sostituto.P.stelo + sostituto.P.ramo +
        ' cade sulla mobile e ' + sostituto.motivo + ': si impadronisce della linea e ne prende la sede, ' +
        sostituto.P.ramo + ' ' + EL_IT[sostituto.el] + ' che nel palazzo è ' + PAR_IT[parS]);

      if (!off('MLPOSSESSO') && (pos === R.shi || pos === R.ying)) {
        var altra = pos === R.shi ? R.ying : R.shi;
        var pilAltra = (C.suLinea[altra] || []).filter(function (Q) { return Q.possiede; });
        if (pilAltra.length) {
          var elQui = sostituto.el, elLa = elDopoLeBestie(R.linee[altra - 1], C);
          racconto.push('anche l\'altra sede è posseduta, dal ' + pilAltra[0].nome + ' ' +
            pilAltra[0].stelo + pilAltra[0].ramo);
          var d0 = confrontoDiretto(R, C,
            pos === R.shi ? elQui : elLa, pos === R.ying ? elQui : elLa, racconto);
          if (d0) return fine(d0, 'confronto diretto fra le due sedi possedute', 'T1b confronto diretto');
        }
      }

      var dS = dirDelCarattere(parS, pos);
      if (dS) return fine(dS, 'la bestia del ' + sostituto.P.nome + ' prende la sede e parla da ' + PAR_IT[parS],
                          'T1 sostituzione');
      racconto.push('la bestia che ha preso la sede è un C: tace, si cerca un\'altra traccia');
      mobileAnnullata = true;
    }

    if (!mobileAnnullata && !off('MLINDIETRO') && (pos === R.shi || pos === R.ying) &&
        arrEl && depEl && KE[arrEl] === depEl && C.timely(arrEl) && !passoNullo) {
      var parA = parDi(arrEl, palEl);
      racconto.push('prima di occuparsi d\'altro la mobile si occupa di sé stessa: l\'arrivo ' +
        arr + ' ' + EL_IT[arrEl] + ', forte di stagione, controlla indietro la partenza e la elimina');
      var elQuesta = arrEl, parQuesta = parA;
      var fu = mob.fushen;
      if (!off('MLFUSHEN') && fu && (COMBINA[arr] === fu.b || GEN[arrEl] === fu.el)) {
        elQuesta = fu.el; parQuesta = fu.par;
        racconto.push('sotto quella linea c\'era un ' + PAR_IT[fu.par] + ' nascosto, ' + fu.b + ' ' +
          EL_IT[fu.el] + ': l\'arrivo lo ' + (COMBINA[arr] === fu.b ? 'combina' : 'genera') +
          ' e lo tira fuori, e il nascosto prende il posto rimasto vuoto');
      }
      var altra2 = pos === R.shi ? R.ying : R.shi;
      var lAltra2 = R.linee[altra2 - 1];
      var d1 = confrontoDiretto(R, C,
        pos === R.shi ? elQuesta : lAltra2.el, pos === R.ying ? elQuesta : lAltra2.el, racconto, true);
      if (d1) return fine(d1, 'la mobile Shi/Ying è eliminata dal proprio arrivo e si confrontano le sedi',
                          'T2 si occupa di sé');
      var d1b = dirDelCarattere(parQuesta, pos);
      if (d1b) return fine(d1b, 'la sede resta ' + PAR_IT[parQuesta], 'T2 si occupa di sé');
    }

    if (!mobileAnnullata && !off('MLNUTRITA') && R.mutante.casoMut === 1 && !passoNullo) {
      racconto.push('l\'arrivo ' + arr + ' ' + EL_IT[arrEl] + ' torna indietro e nutre la partenza ' +
        dep + ' ' + EL_IT[depEl] + ': la mobile si occupa di sé stessa e non può fare altro — resta ' +
        PAR_IT[mob.par] + ', rinforzata');
      var parArr = parDi(arrEl, palEl);
      if (!off('MLTOMBA') && (parArr === 'P' || parArr === 'B') && TOMBA[arrEl] === dep) {
        racconto.push('ma tornando indietro il ' + PAR_IT[parArr] + ' ' + arr + ' entra nella propria ' +
          'tomba (' + dep + ' è la tomba di ' + EL_IT[arrEl] + '): sepolto non fa più perdere la ' +
          'propria squadra, quindi la sua sede vince');
        return fine(sede(pos), 'il ' + PAR_IT[parArr] + ' che torna entra nella tomba', 'T2b sepolto nella tomba');
      }
      var dN = dirDelCarattere(mob.par, pos);
      if (dN) return fine(dN, 'l\'arrivo nutre la partenza: la mobile resta sé stessa e parla da ' + PAR_IT[mob.par],
                          'T2b nutrita dall\'arrivo');
      racconto.push('ma il carattere è C: tace');
    }

    // Edu, 09/09/2026: l'arrivo non resta da solo, cerca qualcosa da fare. Se quello
    // che trova e' una linea ferma con lo STESSO RAMO della partenza, la mobile
    // raggiunge una copia di se' stessa e resta quello che era — non diventa l'arrivo.
    // E se la mobile e' una sede, da li' parte il confronto con l'altra
    // (USDCAD 18/03/2020: 午 va in 未, 未 combina il 午 di L3, lo Shi resta Fuoco).
    // Edu, 09/09/2026 (USDJPY 10/02/2026): "Shi si muove per combinarsi con L6 巳".
    // Se la mobile e' una SEDE e il passo e' vivo, va a combinare la linea ferma che
    // trova e si lega al suo elemento; da li' parte il confronto con l'altra sede.
    // Non vale a passo nullo: se il giorno tiene l'arrivo la mobile arriva e si ferma,
    // e non salta da nessuna parte (USDJPY 30/09/2025, dove il giorno 寅 combina 亥).
    if (!mobileAnnullata && !off('MLSEDECOMB') && arr && !passoNullo &&
        (mob.isShi || mob.isYing)) {
      var legame = R.linee.filter(function (L) {
        // per essere combinata basta che la linea ci sia: non serve che "faccia
        // qualcosa" — quel test serve per i membri di un raduno, non per un bersaglio
        return L.pos !== pos && !annullate[L.pos] && COMBINA[arr] === L.ramo &&
               L.ramo !== dep && !C.vuoto(L.ramo) &&
               L.stato !== 'eliminata' && L.stato !== 'rotta';
      })[0];
      if (legame) {
        var altraL = mob.isShi ? R.ying : R.shi;
        var elAltraL = elDopoLeBestie(R.linee[altraL - 1], C);
        racconto.push('la mobile è una sede e il passo è vivo: va a combinarsi con L' +
          legame.pos + ' ' + legame.ramo + ' ' + EL_IT[legame.el] + ' e si lega a quell\'elemento');
        var dL = confrontoDiretto(R, C, mob.isShi ? legame.el : elAltraL,
                                        mob.isYing ? legame.el : elAltraL, racconto);
        if (dL) return fine(dL, 'la sede mobile si lega alla linea che combina, poi confronto fra le sedi',
                            'T2d la sede si combina');
      }
    }

    if (!mobileAnnullata && !off('MLCOPIA') && arr && !passoNullo) {
      var copia = R.linee.filter(function (L) {
        return L.pos !== pos && !annullate[L.pos] && L.ramo === dep &&
               COMBINA[arr] === L.ramo && faQualcosa(L, R, C);
      })[0];
      if (copia) {
        racconto.push('l\'arrivo ' + arr + ' non resta da solo: cerca qualcosa da fare e trova L' +
          copia.pos + ', che porta lo stesso ramo ' + dep + ' della partenza. La mobile raggiunge ' +
          'una copia di sé stessa e resta ' + EL_IT[depEl] + ', ' + PAR_IT[mob.par]);
        if (mob.isShi || mob.isYing) {
          var altraC = mob.isShi ? R.ying : R.shi;
          var elAltraC = elDopoLeBestie(R.linee[altraC - 1], C);
          var dC = confrontoDiretto(R, C, mob.isShi ? depEl : elAltraC,
                                          mob.isYing ? depEl : elAltraC, racconto);
          if (dC) return fine(dC, 'la mobile ritrova la propria copia: da lì parte il confronto fra le sedi',
                              'T2c la copia di sé');
        }
        var dC2 = dirDelCarattere(mob.par, pos);
        if (dC2) return fine(dC2, 'la mobile ritrova la propria copia e resta ' + PAR_IT[mob.par],
                             'T2c la copia di sé');
      }
    }

    if (!mobileAnnullata && !off('MLSERVE')) {
      var gruppi = RADUNI.concat(TRIGONI);
      for (var g = 0; g < gruppi.length; g++) {
        var set = gruppi[g];
        if (set.indexOf(dep) < 0) continue;
        var completo = true, dove = [];
        for (var s2 = 0; s2 < set.length; s2++) {
          var ram = set[s2], trovato = null;
          if (ram === dep) trovato = 'la mobile L' + pos;
          // un ramo portato solo dalla data non fa numero se e' in vuoto
          else if (C.ramiData.indexOf(ram) >= 0 && !C.vuoto(ram)) trovato = 'la data';
          else {
            for (var q = 0; q < R.linee.length && !trovato; q++) {
              var LL = R.linee[q];
              if (LL.ramo === ram && !annullate[LL.pos] && faQualcosa(LL, R, C)) trovato = 'L' + LL.pos;
            }
          }
          if (!trovato) { completo = false; break; }
          dove.push(ram + ' da ' + trovato);
        }
        if (!completo) continue;
        racconto.push('il raduno ' + set.join('') + ' è completo (' + dove.join(', ') +
          '): ha la mobile fra i membri, quindi serve la linea e ne prende il carattere, ' + PAR_IT[mob.par]);
        // Il raduno serve la linea, ma se il suo elemento e' seduto sia sopra sia sotto
        // non c'e' una sede da far vincere: il raduno non decide, e si va avanti
        // (EURJPY 10/02/2026: il Legno 寅卯辰 sta su L6 e sullo Shi L2).
        if (!off('MLRADSEDE') && gemellaDiSede(mob, pos, R, C, annullate)) {
          racconto.push('ma lo stesso elemento siede anche su L' +
            gemellaDiSede(mob, pos, R, C, annullate).pos + ', dall\'altra parte della carta e ' +
            'proprio su una sede: non c\'è una sede da far vincere');
          continue;
        }
        // Un raduno DI STAGIONE non si limita a servire la linea: se la tira dentro e
        // la fa diventare del proprio elemento, e il carattere si rilegge nel palazzo.
        // Se invece l'elemento del raduno e' fuori stagione non ha la forza di
        // trasformarla e la serve soltanto, lasciandole il proprio carattere
        // (USDJPY 30/09/2025: raduno di Legno nel mese 酉, la W resta W).
        var elGr = WX[set[1]], parEff = mob.par;
        if (!off('MLRADTRASF') && C.timely(elGr) && elGr !== mob.el) {
          parEff = parDi(elGr, palEl);
          racconto.push('il raduno è di stagione: non serve soltanto la linea, se la tira dentro — ' +
            'L' + pos + ' diventa ' + EL_IT[elGr] + ', cioè ' + PAR_IT[parEff] + ' nel palazzo');
        }
        var d2 = dirDelCarattere(parEff, pos);
        if (d2) return fine(d2, 'il raduno ' + (parEff === mob.par ? 'serve la mobile e ne prende il carattere' : 'di stagione trasforma la mobile in ' + PAR_IT[parEff]), 'T3 il raduno serve');
        racconto.push('ma il carattere è C: tace');
      }
    }

    if (!mobileAnnullata && !off('MLGIORNO') && arr && !incomp && (C.D || S2)) {
      if ((C.D && COMBINA[C.D] === arr) || secCombArr) {
        var parB = parDi(arrEl, palEl);
        racconto.push('il ramo del giorno ' + C.D + ' combina l\'arrivo ' + arr +
          ': la mobile arriva e si ferma, non può saltare altrove — parla il carattere dell\'arrivo, ' + PAR_IT[parB]);
        var d3 = dirDelCarattere(parB, pos);
        if (d3) return fine(d3, 'il giorno tiene l\'arrivo: parla il carattere dell\'arrivo', 'T4 il giorno tiene');
      } else if ((C.D && CLASH[C.D] === arr) || secClashArr) {
        racconto.push('il ramo del giorno ' + C.D + ' clasha l\'arrivo ' + arr +
          ': la trasformazione non prende, la linea parte e non arriva — resta sé stessa');
        var gem = !off('MLRADSEDE') && gemellaDiSede(mob, pos, R, C, annullate);
        if (gem) racconto.push('ma lo stesso elemento siede anche su L' + gem.pos +
          ', dall\'altra parte e su una sede: la partenza non fa vincere la propria sede');
        var d4 = gem ? null : dirDelCarattere(mob.par, pos);
        if (d4) return fine(d4, 'l\'arrivo è distrutto dal giorno: parla la partenza', 'T4 il giorno distrugge');
      }
    }

    // Le sedi prese dalle bestie parlano anche quando la mobile e' viva ma non riesce
    // a far pendere niente (il suo stesso elemento siede dall'altra parte).
    var mobileNonDecide = !!gemellaDiSede(mob, pos, R, C, annullate);
    if ((mobileAnnullata || mobileNonDecide) && !off('MLSEDEPRESA')) {
      var prese = [R.shi, R.ying].filter(function (sp) {
        return !annullate[sp] && (C.suLinea[sp] || []).some(function (Q) { return Q.possiede; });
      });
      var due = prese.length === 2;
      var presa = [R.shi, R.ying].filter(function (sp) {
        return !annullate[sp] && (C.suLinea[sp] || []).some(function (Q) { return Q.possiede; });
      })[0];
      if (presa) {
        var lPresa = R.linee[presa - 1];
        var elPresa = elDopoLeBestie(lPresa, C);
        racconto.push('la mobile è ferma; su L' + presa + (presa === R.shi ? ' (lo Shi)' : ' (la Ying)') +
          ' le bestie si impadroniscono della linea: da ' + lPresa.ramo + ' ' + EL_IT[lPresa.el] +
          ' con ' + (C.suLinea[presa] || []).map(function (Q) { return Q.ramo; }).join(' e ') +
          ' l\'energia finisce su ' + EL_IT[elPresa]);
        var altraP = presa === R.shi ? R.ying : R.shi;
        var elAltraP = elDopoLeBestie(R.linee[altraP - 1], C);
        var dP = confrontoDiretto(R, C,
          presa === R.shi ? elPresa : elAltraP, presa === R.ying ? elPresa : elAltraP, racconto);
        if (dP) return fine(dP, 'il possesso avviene su una sede: parte subito il confronto con l\'altra',
                            'T4b la sede presa ' + (mobileAnnullata ? '(mobile ferma)' : '(mobile non decide)') + (due ? ' due sedi' : ' una sede') + ' · bestie ' + (C.suLinea[presa] || []).length);
      }
    }

    // --- T4c: con la mobile ferma parla la linea svegliata dal giorno ---------
    // Il clash del giorno su una linea ferma la fa muovere (暗動). Se la mobile e'
    // fuori dai giochi, quella e' l'unica linea che sta agendo nella carta, e il suo
    // carattere decide la propria sede (USDCAD 18/03/2020).
    // La ferma incompatibile e' diventata mobile: se il protagonista e' fuori dai
    // giochi, e' lei quella che sta agendo nella carta.
    if ((mobileAnnullata || mobileNonDecide) && !off('MLINCFERMA')) {
      var mosse = R.linee.filter(function (L) {
        return L.pos !== pos && !annullate[L.pos] && !L.isMobile && C.incompDi(L);
      });
      if (mosse.length === 1) {
        var MI = mosse[0];
        racconto.push('L' + MI.pos + ' è una linea incompatibile ferma: non può stare dove sta, ' +
          'quindi si muove. Con la mobile fuori dai giochi è lei ad agire, ed è un ' + PAR_IT[MI.par]);
        var dMI = dirDelCarattere(MI.par, MI.pos);
        if (dMI) return fine(dMI, 'agisce la ferma incompatibile di L' + MI.pos + ', ' + PAR_IT[MI.par],
                             'T4d la ferma incompatibile');
      }
    }

    if ((mobileAnnullata || mobileNonDecide) && !off('MLSVEGLIA')) {
      var sveglie = R.linee.filter(function (L) {
        return L.pos !== pos && !annullate[L.pos] && !C.vuoto(L.ramo) &&
               ((L.stato === 'mossa' && C.D && CLASH[C.D] === L.ramo) || L._sveglia2);
      });
      if (sveglie.length === 1) {
        var SW = sveglie[0];
        racconto.push('la mobile è fuori dai giochi; il giorno ' + C.D + ' clasha L' + SW.pos +
          ' e la sveglia: è l\'unica linea che agisce, ed è un ' + PAR_IT[SW.par]);
        var dSW = dirDelCarattere(SW.par, SW.pos);
        if (dSW) return fine(dSW, 'con la mobile ferma parla la linea svegliata dal giorno, ' + PAR_IT[SW.par],
                             'T4c la svegliata dal giorno');
      }
    }

    var ritirataSenzaForza = !off('MLRITIRATA') &&
        R.mutante.progressione === 'retrocedente' && !C.timely(depEl);
    if (ritirataSenzaForza) {
      racconto.push('la mobile si ritira e non è di stagione: perdendo energia non ha la forza di ' +
        'combinarsi con niente');
    }
    if (!mobileAnnullata && !off('MLPORTE') && arrEl && !passoNullo && !ritirataSenzaForza) {
      var ferme = R.linee.filter(function (L) {
        if (L.pos === pos || annullate[L.pos]) return false;
        if (!off('MLROTTA') && L.stato === 'rotta') return false;
        return true;
      });
      var porte = [
        { nome: 'combinare', trova: function (L) { return COMBINA[arr] === L.ramo; } },
        { nome: 'clashare',  trova: function (L) { return CLASH[arr] === L.ramo; } },
        { nome: 'generare',  trova: function (L) { return GEN[arrEl] === L.el; } }
      ];
      for (var k = 0; k < porte.length; k++) {
        var bers = ferme.filter(porte[k].trova);
        if (!bers.length) continue;
        if (bers.length > 1) {
          var stessaSede = bers.every(function (L) { return sede(L.pos) === sede(bers[0].pos); });
          if (!stessaSede) continue;
        }
        var T = bers[0];
        racconto.push('niente la blocca, quindi la mobile cerca qualcosa da fare: ' + porte[k].nome +
          ' — l\'unica linea disponibile è L' + T.pos + ' ' + PAR_IT[T.par] + ' ' + T.ramo +
          '. Parla chi riceve l\'azione');
        var d5 = dirDelCarattere(T.par, T.pos);
        if (d5) return fine(d5, 'la mobile ' + porte[k].nome + ': parla chi riceve, L' + T.pos + ' ' + PAR_IT[T.par],
                            'T5 le tre porte');
      }
    }

    if (!off('MLNUTRE')) {
      var gr2 = TRIGONI.concat(RADUNI);
      for (var t = 0; t < gr2.length; t++) {
        var st = gr2[t], el = WX[st[1]];
        var membri = [], ok = true;
        for (var u = 0; u < st.length; u++) {
          var rr = st[u], viva = null;
          for (var w = 0; w < R.linee.length && !viva; w++) {
            var LW = R.linee[w];
            if (LW.ramo === rr && !annullate[LW.pos] && faQualcosa(LW, R, C)) viva = LW;
          }
          if (viva) membri.push(viva);
          else if (C.ramiData.indexOf(rr) < 0) { ok = false; break; }
        }
        if (!ok || !membri.length) continue;
        if (!C.timely(el)) continue;
        var sotto = membri.filter(function (L) { return L.pos <= 3; }).length;
        if (sotto !== membri.length - sotto) continue;
        var figli = R.linee.filter(function (L) {
          if (annullate[L.pos] || GEN[el] !== L.el) return false;
          if (L.par !== 'G' && L.par !== 'W') return false;
          if (!L.isMobile && C.vuoto(L.ramo)) return false;
          if (!off('MLROTTA') && (L.stato === 'rotta' || L.stato === 'eliminata')) return false;
          return true;
        });
        if (figli.length > 1) {
          var sedi2 = figli.filter(function (L) { return L.isShi || L.isYing; });
          if (sedi2.length === 1) figli = sedi2;
        }
        if (figli.length !== 1) continue;
        var F = figli[0];
        racconto.push('il trigono ' + st.join('') + ' di ' + EL_IT[el] + ', forte di stagione, non decide ' +
          'per sede: nutre ' + PAR_IT[F.par] + ' ' + F.ramo + ' di L' + F.pos + ', che nutrito vince la sua sede');
        return fine(sede(F.pos), 'il trigono nutre ' + PAR_IT[F.par] + ' di L' + F.pos, 'T6 il trigono nutre');
      }
    }

    if (dirSeconda && ENV.SECONDACAR === 'dopo') {
      racconto.push('la prima mobile non conclude; L' + S2c.L.pos + ' è incompatibile e muta ' + S2c.dep +
        ' → ' + S2c.arr + ', che nel palazzo è ' + PAR_IT[parArr2] + ': resta così e decide la propria sede');
      return fine(dirSeconda, 'la seconda mobile diventa ' + PAR_IT[parArr2] + ' e decide la sua sede',
                  'T5c la seconda diventa ' + PAR_IT[parArr2]);
    }

    // La seconda mobile passa dalle tre porte, ma solo se la prima non ha concluso
    // (i test "prima" e "concordi" hanno mostrato che non puo' scavalcarla).
    if (ENV.DUEMUT2 === 'on' && C.seconde.length === 1) {
      var S2b = C.seconde[0], arr2 = (ENV.ANDONG === 'si') ? S2b.dep : S2b.arr, arrEl2 = WX[arr2];
      var ferme2 = R.linee.filter(function (L) {
        return L.pos !== pos && L.pos !== S2b.L.pos && !annullate[L.pos] &&
               !(!L.isMobile && C.vuoto(L.ramo)) && L.stato !== 'rotta' && L.stato !== 'eliminata';
      });
      var porte2 = [
        { nome: 'combinare', trova: function (L) { return COMBINA[arr2] === L.ramo; } },
        { nome: 'clashare',  trova: function (L) { return CLASH[arr2] === L.ramo; } },
        { nome: 'generare',  trova: function (L) { return GEN[arrEl2] === L.el; } }
      ];
      for (var k2 = 0; k2 < porte2.length; k2++) {
        var bers2 = ferme2.filter(porte2[k2].trova);
        if (!bers2.length) continue;
        if (bers2.length > 1 && !bers2.every(function (L) { return sede(L.pos) === sede(bers2[0].pos); })) continue;
        var T2 = bers2[0];
        racconto.push('la prima mobile non conclude; la seconda, L' + S2b.L.pos + ' ' + S2b.dep + ' → ' + arr2 +
          ', va a ' + porte2[k2].nome + ' L' + T2.pos + ' ' + PAR_IT[T2.par] + ' ' + T2.ramo + ': parla chi riceve');
        var d5b = dirDelCarattere(T2.par, T2.pos);
        if (d5b) return fine(d5b, 'la seconda mobile ' + porte2[k2].nome + ': parla chi riceve, L' + T2.pos + ' ' + PAR_IT[T2.par],
                             'T5b le porte della seconda');
      }
    }

    // --- T7: il duello, solo alla fine ---------------------------------------
    // Regola sopra le regole: se nessuna traccia ha concluso, restano il soggetto e
    // l'oggetto, e vince il piu' forte dei due.
    // Il duello non e' un pari o dispari: decide solo quando una delle due sedi e'
    // fuori dai giochi e l'altra no — vuota ed eliminata, legata, rotta. Se sono tutte
    // e due in piedi e nessuna traccia ha concluso, la carta tace.
    if (!off('MLDUELLO') && !annullate[R.shi] && !annullate[R.ying]) {
      var lS7 = R.linee[R.shi - 1], lY7 = R.linee[R.ying - 1];
      var fuori = function (L) {
        return L.stato === 'eliminata' || L.stato === 'rotta' || L.stato === 'legata' || L._legata2 ||
               L.stato === 'dormiente' || (C.vuoto(L.ramo) && !L.isMobile);
      };
      if (fuori(lS7) === fuori(lY7)) {
        racconto.push('nessuna traccia conclude e le due sedi sono nella stessa condizione: ' +
          'non c\'è un duello da decidere');
        return fine(null, 'nessuna traccia conclude', 'tace');
      }
      var d7 = confrontoDiretto(R, C, C.capolinea ? C.capolinea(lS7) : lS7.el,
                                      C.capolinea ? C.capolinea(lY7) : lY7.el, racconto, true);
      if (d7) return fine(d7, 'nessun altro conclude: resta il duello fra Shi e Ying', 'T7 il duello');
    }

    racconto.push('nessuna traccia porta da qualche parte: la carta tace');
    return fine(null, 'nessuna traccia conclude', 'tace');
  }

  return { leggi: leggi, contesto: contesto };
}

if (typeof module !== 'undefined' && module.exports) module.exports = { creaMotore: creaMotore };
