// trend_ly.js — IL SISTEMA-TREND (Edu, 18-19/09/2026, S51)
//
// Domanda di Edu: "il Trend nello LY". Provate e piatte, una alla volta: Shi/Ying, il Gancio, il B,
// il C. La via che ha separato le carte e' la LINEA MOBILE IN QUANTO TALE ("la partenza indica come
// il trend parte e si sviluppa nella giornata, il suo arrivo come procede e come termina"), e dentro
// la mobile e' il TOCCO DELLA DATA — sei condizioni, un punto ciascuna — a dire se il mercato segue
// il trend EMA o no. Le bestie (i pilastri della data che cadono sulla mobile) non hanno un verso
// loro: rafforzano quello che la mobile dice, un punto per pilastro nel verso del tocco.
//
// Il modulo e' autonomo: prende la carta letta (readManual di liuyao.js) e il contesto della data,
// e risponde SEGUE / NON SEGUE / tace, con i punti e il racconto. Nessuna altra regola del Liu Yao
// entra qui: e' la voce del trend, da rafforzare e poi integrare nella lettura generale.
//
// Uso:
//   const T = require('./trend_ly.js');
//   const v = T.leggiTrend(R, { dayBranch, monthBranch, yearBranch, oraBranch, dayStem, yearStem, monthStem, hourStem, emaDir });
//   v = { punti, tocco, pilastri, verdetto: 'segue'|'non segue'|null, dir: 'LONG'|'SHORT'|null, racconto: [...] }
//
// Misura alla nascita (19/09/2026, mazzo 2.788 carte, base: il mercato segue il trend nel 48,17%):
//   tocco a sei punti: -2 34,2% (73) · -1 42,4% (554) · 0 48,5% (1.680) · +1 55,2% (413) · +2 59,6% (57)
//   con i pilastri: tocco + e 0/1/2 pilastri 53,7 / 57,5 / 64,6% · tocco - e 0/1/2 pilastri 46,0 / 37,4 / 33,3%
//   accanto al Liu Yao: concordi 64,0% (573), in contrasto il LY scende al 49,7% (525).

(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.TrendLY = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var WX = { '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water' };
  var GEN = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' };
  var KE  = { Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood' };
  var CLASH   = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
  var COMBINA = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
  var BESTIA_STELO = { '甲':'青龍','乙':'青龍','丙':'朱雀','丁':'朱雀','戊':'勾陳','己':'螣蛇','庚':'白虎','辛':'白虎','壬':'玄武','癸':'玄武' };

  // Le sei condizioni del tocco. Ognuna: nome, punto, e la prova (funzione che dice se c'e').
  var REGOLE = [
    { id:'T1', punto:+1, nome:'il giorno combina la partenza',
      prova:function (m, c) { return !!c.dayBranch && COMBINA[c.dayBranch] === m.dep; } },
    { id:'T2', punto:+1, nome:'il giorno clasha l\'arrivo (la mobile è liberata, la partenza agisce)',
      prova:function (m, c) { return !!c.dayBranch && CLASH[c.dayBranch] === m.arr; } },
    { id:'T3', punto:+1, nome:'l\'ora combina l\'arrivo',
      prova:function (m, c) { return !!c.oraBranch && COMBINA[c.oraBranch] === m.arr; } },
    { id:'T4', punto:-1, nome:'il giorno clasha la partenza',
      prova:function (m, c) { return !!c.dayBranch && CLASH[c.dayBranch] === m.dep; } },
    { id:'T5', punto:-1, nome:'l\'arrivo è il ramo del mese',
      prova:function (m, c) { return !!c.monthBranch && m.arr === c.monthBranch; } },
    // T6 perimetrata da Edu il 19/09/2026: il controllo vale solo se il ramo del giorno non tocca
    // l'arrivo con un clash o una combinazione (li' comanda il legame di ramo: clasha 48,4%,
    // combina 61,7%; senza tocco 40,7% su 332 carte).
    { id:'T6', punto:-1, nome:'l\'elemento del giorno controlla l\'arrivo (e il ramo non lo tocca)',
      prova:function (m, c) { return !!c.dayBranch && KE[WX[c.dayBranch]] === WX[m.arr] &&
                              CLASH[c.dayBranch] !== m.arr && COMBINA[c.dayBranch] !== m.arr; } }
  ];

  // I pilastri della data che cadono sulla mobile: quelli il cui stelo ha la stessa bestia che
  // siede sulla mobile (le sei bestie dallo stelo del giorno).
  function pilastriCaduti(mob, c) {
    if (!mob.bestia || !mob.bestia.cn) return [];
    var pil = [ ['anno', c.yearStem, c.yearBranch], ['mese', c.monthStem, c.monthBranch],
                ['giorno', c.dayStem, c.dayBranch], ['ora', c.hourStem, c.oraBranch] ];
    return pil.filter(function (p) { return p[1] && p[2] && BESTIA_STELO[p[1]] === mob.bestia.cn; })
              .map(function (p) { return { nome:p[0], stelo:p[1], ramo:p[2] }; });
  }

  function leggiTrend(R, c) {
    c = c || {};
    var out = { punti:0, tocco:0, pilastri:[], verdetto:null, dir:null, racconto:[], regole:[] };
    if (!R || R.error || !R.mutante || !R.mutante.pos) { out.racconto.push('nessuna linea mobile: il trend tace'); return out; }
    var mob = R.linee[R.mutante.pos - 1];
    var m = { dep: R.mutante.ramoDep || mob.ramo, arr: R.mutante.ramoArr || (mob.mut && mob.mut.ramoArr) };
    if (!m.arr) { out.racconto.push('la mobile non ha arrivo: il trend tace'); return out; }
    out.racconto.push('la mobile è L' + mob.pos + ' ' + (mob.par || '') + ' ' + m.dep + ' → ' + m.arr);

    REGOLE.forEach(function (r) {
      if (r.prova(m, c)) { out.tocco += r.punto; out.regole.push(r.id); out.racconto.push((r.punto > 0 ? '+1 ' : '−1 ') + r.nome); }
    });
    out.pilastri = pilastriCaduti(mob, c);
    if (out.tocco !== 0 && out.pilastri.length) {
      var segno = out.tocco > 0 ? 1 : -1;
      out.punti = out.tocco + segno * out.pilastri.length;
      out.racconto.push('sulla mobile cade ' + (out.pilastri.length === 1 ? 'il pilastro' : 'i pilastri') + ' ' +
        out.pilastri.map(function (p) { return p.nome + ' ' + p.stelo + p.ramo; }).join(', ') +
        ': la bestia rafforza la linea, ' + (segno > 0 ? '+' : '−') + out.pilastri.length);
    } else out.punti = out.tocco;

    if (out.punti > 0) out.verdetto = 'segue';
    else if (out.punti < 0) out.verdetto = 'non segue';
    if (out.verdetto && c.emaDir) {
      var ema = c.emaDir === 'up' ? 'LONG' : 'SHORT';
      out.dir = out.verdetto === 'segue' ? ema : (ema === 'LONG' ? 'SHORT' : 'LONG');
    }
    out.racconto.push(out.verdetto ? ('punti ' + (out.punti > 0 ? '+' : '') + out.punti + ': il mercato ' + out.verdetto + ' il trend' + (out.dir ? ' → ' + out.dir : ''))
                                   : 'punti 0: il trend tace');
    return out;
  }

  return { leggiTrend: leggiTrend, REGOLE: REGOLE, pilastriCaduti: pilastriCaduti };
}));
