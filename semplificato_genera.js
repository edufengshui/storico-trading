// Genera semplificato.js (qui e in ../trading): il METODO SEMPLIFICATO spinto al massimo (S58, Edu 20/10/2026), con le regole
// trovate da semplificato_ottimo.js su tutto il backtest (/tmp/semplificato_regole.json), fisse da oggi.
// Prima: node semplificato_ottimo.js /tmp/tresist.json 40 0.56
const fs = require('fs'), path = require('path');
const regole = JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/semplificato_regole.json', 'utf8')).map(g => [g.k, g.v, g.n, Math.round(g.acc * 1000) / 10]);
const src = `// semplificato.js — IL METODO SEMPLIFICATO (S58, Edu 20/10/2026): solo la linea mobile e cosa le fanno giorno e mese, letta
// rispetto al trend. ${regole.length} regole trovate su tutto il backtest (3.309 carte 2020 - 16/10/2026, 66,4%; costruito sul
// 2020-23 il metodo fa 49,9% sul 2024-26). Ultimo gradino della piramide DLR (Edu: "deve entrare nella piramide"), solo sulle carte
// dove nessun altro gradino decide. Regole FISSE dal 20/10/2026: si misurano dal vivo. Rigenerare con semplificato_genera.js.
// Uso: Semplificato.leggi(R, dayBranch, monthBranch, emaDir) -> { dir, segue, regola }
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Semplificato = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var REGOLE = ${JSON.stringify(regole)};
  var WX = { '子':'Acqua','丑':'Terra','寅':'Legno','卯':'Legno','辰':'Terra','巳':'Fuoco','午':'Fuoco','未':'Terra','申':'Metallo','酉':'Metallo','戌':'Terra','亥':'Acqua' };
  var GEN = { Legno:'Fuoco', Fuoco:'Terra', Terra:'Metallo', Metallo:'Acqua', Acqua:'Legno' }, KE = { Legno:'Terra', Terra:'Acqua', Acqua:'Fuoco', Fuoco:'Metallo', Metallo:'Legno' };
  var CL = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
  var HE = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
  var HAI = { '子':'未','未':'子','丑':'午','午':'丑','寅':'巳','巳':'寅','卯':'辰','辰':'卯','申':'亥','亥':'申','酉':'戌','戌':'酉' };
  var XING = { '寅':'巳','巳':'申','申':'寅','丑':'戌','戌':'未','未':'丑','子':'卯','卯':'子' };
  var AV = { '寅':'卯','卯':'辰','巳':'午','午':'未','申':'酉','酉':'戌','亥':'子','子':'丑' }, RE = {}; Object.keys(AV).forEach(function (k) { RE[AV[k]] = k; });
  function stg(b, m) { var e = WX[b], s = WX[m]; return e === s ? 'in piena stagione' : GEN[s] === e ? 'in crescita' : GEN[e] === s ? 'a riposo' : KE[s] === e ? 'morta' : 'prigioniera'; }
  function rel(x, b) { var r = []; if (x === b) r.push('stesso ramo'); if (HE[x] === b) r.push('combina'); if (CL[x] === b) r.push('clasha'); if (HAI[x] === b) r.push('danneggia (害)'); if (XING[x] === b) r.push('punisce');
    var a = WX[x], e = WX[b]; if (a === e) r.push('stesso elemento'); else if (GEN[a] === e) r.push('genera'); else if (KE[a] === e) r.push('controlla'); else if (GEN[e] === a) r.push('drena'); else if (KE[e] === a) r.push('e\\' controllato da'); return r; }
  function caratteristiche(R, giorno, mese) {
    var m = R.mutante, L = R.linee[m.pos - 1], d = m.ramoDep, a = m.ramoArr, f = {}, v = R.vuoti || [];
    rel(a, d).forEach(function (x) { f['l\\'arrivo ' + x + ' la partenza'] = 1; });
    if (AV[d] === a) f['la mobile avanza'] = 1; if (RE[d] === a) f['la mobile retrocede'] = 1;
    f['partenza ' + stg(d, mese)] = 1; f['arrivo ' + stg(a, mese)] = 1;
    if (v.indexOf(d) >= 0) f['partenza vuota'] = 1; if (v.indexOf(a) >= 0) f['arrivo vuoto'] = 1;
    f['mobile su L' + m.pos] = 1; f['mobile nel trigramma ' + (m.pos >= 4 ? 'alto' : 'basso')] = 1; f['mobile ' + (L.yang ? 'yang -> yin' : 'yin -> yang')] = 1;
    f['mobile ' + L.par] = 1; if (L.isShi) f['mobile = Shi'] = 1; if (L.isYing) f['mobile = Ying'] = 1; if (!L.isShi && !L.isYing) f['mobile non sede'] = 1;
    rel(giorno, d).forEach(function (x) { f['il giorno ' + x + ' la partenza'] = 1; }); rel(giorno, a).forEach(function (x) { f['il giorno ' + x + ' l\\'arrivo'] = 1; });
    rel(mese, d).forEach(function (x) { f['il mese ' + x + ' la partenza'] = 1; }); rel(mese, a).forEach(function (x) { f['il mese ' + x + ' l\\'arrivo'] = 1; });
    var tocca = function (x, b) { return HE[x] === b || CL[x] === b; };
    if ([giorno, mese].some(function (x) { return tocca(x, d) || tocca(x, a); })) f['REGOLA 1 di Edu: movimento bloccato (giorno o mese)'] = 1; else f['movimento libero'] = 1;
    return f;
  }
  function leggi(R, giorno, mese, emaDir) {
    var out = { dir: null, segue: null, regola: null };
    if (!R || R.error || !R.mutante || !R.mutante.pos || !giorno || !mese || !emaDir) return out;
    var f = caratteristiche(R, giorno, mese), up = emaDir === 'up' || emaDir === 'LONG';
    for (var i = 0; i < REGOLE.length; i++) { var g = REGOLE[i]; if (g[0].every(function (k) { return f[k]; })) {
      out.segue = g[1] === 1; out.dir = (out.segue ? up : !up) ? 'LONG' : 'SHORT';
      out.regola = 'regola ' + (i + 1) + ': se ' + g[0].join(' e ') + ' -> ' + (g[1] ? 'segue il trend' : 'opposto al trend') + ' (' + g[2] + ' carte, ' + g[3] + '%)'; return out; } }
    out.regola = 'nessuna regola'; return out;
  }
  return { leggi: leggi, caratteristiche: caratteristiche, regole: REGOLE };
}));
`;
fs.writeFileSync(path.join(__dirname, 'semplificato.js'), src);
if (fs.existsSync(path.join(__dirname, '../trading'))) fs.writeFileSync(path.join(__dirname, '../trading/semplificato.js'), src);
console.log('semplificato.js: ' + regole.length + ' regole');
