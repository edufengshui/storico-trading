// Genera livello_ly.js (qui e in ../trading): il catalogo del SISTEMA LY PER FORMA (S58, 17/10/2026) + la lettura.
// Prima: node livello_ly_costruisci.js (scrive livello_ly.json). Le caratteristiche della data sono quelle del sistema D
// (SistemaD.caratteristiche, livello_d.js).
const fs = require('fs'), path = require('path');
const L = require('./livello_ly.json'); const cat = {}; L.forEach(x => { if (x.chiave) cat[x.forma] = [x.chiave, x.se, x.ok, x.regola]; });
const src = `// livello_ly.js — IL SISTEMA LY PER FORMA (S58, 17/10/2026): una regola per ogni carta (esagramma + linea mobile).
// Edu: "fare esattamente quello che e' stato fatto con il sistema-trend ma farlo con il LY ... vedere cosa succede se si
// applica la logica LY a queste 11 [carte identiche]". Per ognuna delle ${Object.keys(cat).length} forme ripetute almeno 5 volte nel backtest
// (dump fino al 18/09/2026, carte >= 20 pip) la caratteristica della data che separa meglio le volte in cui il verdetto
// LY era giusto da quelle in cui era sbagliato. Voce LYF: LY giusto -> il verso del LY; LY sbagliato -> l'opposto.
// Dentro il campione 77,3% (2.174/2.813). Rigenerare con livello_ly_costruisci.js + livello_ly_genera.js.
// Uso: SistemaLY.leggi(R, ctx, Inventario, SistemaD, lyDir) -> { dir, giusto, forma, regola, tratto }
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SistemaLY = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var CAT = ${JSON.stringify(cat)};
  function leggi(R, ctx, Inventario, SistemaD, lyDir) {
    var out = { dir: null, giusto: null, forma: null, regola: null, tratto: null };
    if (!R || R.error || !R.mutante || !R.mutante.pos || !ctx || !Inventario || !SistemaD) return out;
    out.forma = R.sup + '/' + R.inf + ' L' + R.mutante.pos;
    var g = CAT[out.forma]; if (!g || (lyDir !== 'LONG' && lyDir !== 'SHORT')) return out;
    var f = SistemaD.caratteristiche(Inventario.inventario(R, ctx));
    out.tratto = !!f[g[0]]; out.giusto = out.tratto ? g[1] === 1 : g[1] !== 1;
    out.dir = out.giusto ? lyDir : (lyDir === 'LONG' ? 'SHORT' : 'LONG');
    out.regola = g[3] + ' · casi giusti ' + g[2] + ' · oggi ' + (out.tratto ? 'il tratto c\\'e\\'' : 'il tratto non c\\'e\\'') + ': il LY ha ' + (out.giusto ? 'ragione' : 'torto');
    return out;
  }
  return { leggi: leggi, catalogo: CAT };
}));
`;
fs.writeFileSync(path.join(__dirname, 'livello_ly.js'), src);
if (fs.existsSync(path.join(__dirname, '../trading'))) fs.writeFileSync(path.join(__dirname, '../trading/livello_ly.js'), src);
console.log('livello_ly.js: ' + Object.keys(cat).length + ' forme con regola');
