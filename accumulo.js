// ACCUMULO DELLE CONDIZIONI (S58, 19/10/2026). Principio di Edu (07/09/2026): "nessuna delle condizioni e' determinante da
// sola, e' l'accumulo a determinare il risultato ... la forma da cercare e' uno scalino sulla soglia". Per ogni carta si
// contano, su tutte le ipotesi della tavola della data (mese, giorno, ora, anno; nessun peso stimato dai dati), le
// condizioni che danno la vittoria allo Shi meno quelle che la danno alla Ying. Se l'accumulo conta, piu' grande e' lo
// scarto, piu' spesso vince il lato indicato. Prima: node tavola_data.js mese|giorno|ora|anno.
const P = ['mese', 'giorno', 'ora', 'anno'].map(p => require('/tmp/pred_' + (process.env.TREND ? 'trend_' : '') + p + '.json'));
const rows = P[0].map((c, i) => { const all = P.flatMap(x => x[i].p); const s = all.filter(v => v === 'S').length - all.filter(v => v === 'Y').length; return { s, date: c.date, vinceShi: c.vinceShi, n: all.length }; });
console.log('condizioni per carta in media: ' + (rows.reduce((a, r) => a + r.n, 0) / rows.length).toFixed(1));
const bins = [[0, 0], [1, 1], [2, 2], [3, 3], [4, 5], [6, 99]];
for (const [lo, hi] of bins) { const g = rows.filter(r => Math.abs(r.s) >= lo && Math.abs(r.s) <= hi); if (!lo) { console.log('scarto 0: ' + g.length + ' carte (nessun lato)'); continue; }
  const ok = g.filter(r => (r.s > 0) === r.vinceShi).length, a = g.filter(r => r.date < '2023'), b = g.filter(r => r.date >= '2023');
  const pc = l => l.length ? (100 * l.filter(r => (r.s > 0) === r.vinceShi).length / l.length).toFixed(0) + '%' : '-';
  console.log(('scarto ' + lo + (hi > lo ? '-' + (hi > 50 ? '...' : hi) : '')).padEnd(14) + String(g.length).padStart(5) + ' carte · vince il lato con piu\' condizioni ' + (100 * ok / g.length).toFixed(1) + '%  (2020-22 ' + pc(a) + ', 2023-26 ' + pc(b) + ')'); }
