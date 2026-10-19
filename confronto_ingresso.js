// CONFRONTO DELL'ORA DI INGRESSO (S58, 19/10/2026). Edu: "se volessi vedere cosa succede se le tre cifre da prendere sono
// quelle a 03:00 GMT potresti farlo?". Dump fatti con ORAINGRESSO=hh (pb_stress.js): seme dalle tre cifre dell'apertura della
// barra hh:00, entrata hh:00, uscita alle 21:00. Uso: node confronto_ingresso.js /tmp/tresist.json /tmp/tresist_03.json ...
const fs = require('fs');
for (const f of process.argv.slice(2)) {
  const T = JSON.parse(fs.readFileSync(f, 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema);
  const real = r => r.move > 0 ? 'LONG' : 'SHORT', tr = r => r.ema === 'up' ? 'LONG' : 'SHORT';
  const riga = (n, l, k) => { const c = l.filter(r => k === 'trend' ? true : r[k]); const w = c.filter(r => (k === 'trend' ? tr(r) : r[k]) === real(r)).length; let p = 0; c.forEach(r => p += (k === 'trend' ? tr(r) : r[k]) === real(r) ? Math.abs(r.move) : -Math.abs(r.move)); return n + ' ' + (100 * w / c.length).toFixed(1) + '% (' + c.length + ', ' + (p > 0 ? '+' : '') + p + ')'; };
  console.log('\n' + f + ' — ' + T.length + ' carte >= 20 pip');
  for (const [nome, a, b] of [['tutto 2020-2026', '2000', '2100'], ['2020-2023', '2000', '2024'], ['2024-2026', '2024', '2100'], ['dal 08/09/2026', '2026-09-08', '2100']]) {
    const l = T.filter(r => r.date >= a && r.date < b);
    console.log('  ' + nome.padEnd(16) + ['trend', 'pb', 'ly', 'at', 'dlr', 'lett'].map(k => riga(k.toUpperCase(), l, k)).join(' · '));
  }
}
