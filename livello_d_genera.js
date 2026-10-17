// Genera ../trading/livello_d.js: il catalogo delle regole per carta (sistema D) + il calcolo delle caratteristiche.
const LD=require('./livello_d.json');const cat={};LD.forEach(x=>{if(x.chiave)cat[x.forma]=[x.chiave,x.se,x.ok,x.regola];});
const src=`// livello_d.js — IL SISTEMA D (S57, 17/10/2026): una regola per ogni carta (esagramma + linea mobile).
// Per ognuna delle 258 carte che si ripetono almeno 5 volte nel backtest (3.309 carte 2020-2026) la regola e' la
// caratteristica della data (stagione, vuoto, giorno/ora/mese su Shi, Ying e linee, arrivo della mobile, Serpente
// morto) che separa meglio le volte in cui la carta ha seguito il trend EMA da quelle in cui non l'ha seguito.
// Edu, 17/10/2026: "il sistema D e' tuo perche' le regole le hai trovate tu". Rigenerare con livello_d_genera.js.
// Uso: SistemaD.leggi(R, ctx, Inventario) -> { dir, segue, forma, regola, tratto } ; ctx come inventario_carta.
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.SistemaD = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  var CAT = ${JSON.stringify(cat)};
  function caratteristiche(inv) {
    var f = {}, S = inv.linee[inv.shi - 1], Y = inv.linee[inv.ying - 1];
    [['Shi', S], ['Ying', Y]].forEach(function (p) { var k = p[0], X = p[1];
      f[k + ' ' + X.stagione] = 1; f[k + (X.timely ? ' di stagione' : ' fuori stagione')] = 1;
      if (X.vuoto) f[k + ' vuoto'] = 1; if (X.giornoSostiene) f[k + ' sostenuto dal giorno'] = 1;
      X.giorno.forEach(function (a) { f[k + ': il giorno ' + a] = 1; });
      X.ora.forEach(function (a) { f[k + ": l'ora " + a] = 1; });
      X.mese.forEach(function (a) { f[k + ': il mese ' + a] = 1; });
      if (X.ramo === inv.anno) f[k + ' Tai Sui'] = 1; });
    inv.linee.forEach(function (x) { f['L' + x.pos + ' ' + x.stagione] = 1; if (x.vuoto) f['L' + x.pos + ' vuota'] = 1;
      x.giorno.forEach(function (a) { f['L' + x.pos + ': il giorno ' + a] = 1; }); });
    var m = inv.movimenti.filter(function (z) { return z.tipo === 'mobile'; })[0];
    if (m) { f['arrivo della mobile ' + (m.arrTimely ? 'di stagione' : 'fuori stagione')] = 1; if (m.arrVuoto) f['arrivo della mobile vuoto'] = 1;
      m.blocchi.forEach(function (b) { f['mobile: ' + b] = 1; }); }
    var sz = inv.linee.filter(function (x) { return x.bestia === '螣蛇'; })[0];
    if (sz && (sz.sede || sz.muove) && sz.stagione === '死') f['Serpente morto su sede o mobile'] = 1;
    return f;
  }
  function leggi(R, ctx, Inventario) {
    var out = { dir: null, segue: null, forma: null, regola: null, tratto: null };
    if (!R || R.error || !R.mutante || !R.mutante.pos || !ctx || !ctx.emaDir) return out;
    out.forma = R.sup + '/' + R.inf + ' L' + R.mutante.pos;
    var g = CAT[out.forma]; if (!g) return out;
    var f = caratteristiche(Inventario.inventario(R, ctx));
    out.tratto = !!f[g[0]]; out.segue = out.tratto ? g[1] === 1 : g[1] !== 1;
    var up = ctx.emaDir === 'up' || ctx.emaDir === 'LONG';
    out.dir = (out.segue ? up : !up) ? 'LONG' : 'SHORT';
    out.regola = g[3] + ' · casi giusti ' + g[2] + ' · oggi ' + (out.tratto ? 'il tratto c\\'e\\'' : 'il tratto non c\\'e\\'') + ': ' + (out.segue ? 'segue il trend' : 'non segue il trend');
    return out;
  }
  return { leggi: leggi, caratteristiche: caratteristiche, catalogo: CAT };
}));
`;
require('fs').writeFileSync('livello_d.js',src);require('fs').writeFileSync('../trading/livello_d.js',src);console.log('ok',Object.keys(cat).length);
