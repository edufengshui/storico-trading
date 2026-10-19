// SESSIONI PER CROSS (S58, 19/10/2026). Edu: "Quali cross rispondono all'ora di Londra e quali rispondono meglio a quella
// di New York e quella di Sidney?". Dump con ORAINGRESSO: 00 (Sidney/Tokyo, quello di sempre), 08 (Londra), 13 (New York);
// uscita sempre alle 21:00 GMT. Per ogni cross: % di ogni sistema per sessione; la sessione migliore si sceglie sul
// 2020-23 e si controlla sul 2024-26 (se la scelta non regge sugli anni dopo, era caso).
const fs = require('fs');
const S = process.env.LOCALI ? { 'Londra': '/tmp/tresist_londra.json', 'New York': '/tmp/tresist_newyork.json', 'Sidney': '/tmp/tresist_sidney.json', 'Tokyo': '/tmp/tresist_tokyo.json' } : { 'Sidney 00': '/tmp/tresist.json', 'Londra 08': '/tmp/tresist_08.json', 'New York 13': '/tmp/tresist_13.json' };
const BASE = process.env.LOCALI ? 'Londra' : 'Sidney 00';
const D = {}; for (const k in S) D[k] = JSON.parse(fs.readFileSync(S[k], 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema);
const real = r => r.move > 0 ? 'LONG' : 'SHORT';
const acc = (l, v) => { const c = l.filter(r => r[v]); return c.length ? { a: c.filter(r => r[v] === real(r)).length / c.length, n: c.length } : { a: 0, n: 0 }; };
const CR = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD', 'EURJPY', 'EURGBP'];
for (const v of (process.argv[2] || 'dlr,at,ly,pb').split(',')) {
  console.log('\n' + v.toUpperCase() + ' — % giuste per sessione (tutto 2020-26) · migliore scelta sul 2020-23 -> come va sul 2024-26');
  let tot = { scelta: [0, 0], s00: [0, 0] };
  for (const c of CR) {
    const cell = k => acc(D[k].filter(r => r.cross === c), v), early = k => acc(D[k].filter(r => r.cross === c && r.date < '2024'), v), late = k => acc(D[k].filter(r => r.cross === c && r.date >= '2024'), v);
    const best = Object.keys(S).sort((a, b) => early(b).a - early(a).a)[0], L = late(best), L0 = late(BASE);
    tot.scelta[0] += L.n; tot.scelta[1] += L.a * L.n; tot.s00[0] += L0.n; tot.s00[1] += L0.a * L0.n;
    console.log('  ' + c + '  ' + Object.keys(S).map(k => { const x = cell(k); return k + ' ' + (100 * x.a).toFixed(0) + '% (' + x.n + ')'; }).join('  ') +
      '   | scelta 2020-23: ' + best.padEnd(11) + ' -> 2024-26 ' + (100 * L.a).toFixed(0) + '% (' + BASE + ': ' + (100 * L0.a).toFixed(0) + '%)');
  }
  console.log('  TOTALE 2024-26: sessione scelta per cross ' + (100 * tot.scelta[1] / tot.scelta[0]).toFixed(1) + '% su ' + tot.scelta[0] + ' · sempre ' + BASE + ' ' + (100 * tot.s00[1] / tot.s00[0]).toFixed(1) + '% su ' + tot.s00[0]);
}
