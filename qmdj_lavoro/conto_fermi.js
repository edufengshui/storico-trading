// S80 (28/11/2026): conto in avanti del qimen dove Lio e' fermo (campo "fermi" di qmdj_live.json, scritto prima dell'entrata).
// Esito dai prezzi orari (orario_live.json): entrata all'apertura dell'ora ENTRA (default 01 GMT), uscita alla chiusura delle 21 GMT, prima dello spread.
// Uso: node qmdj_lavoro/conto_fermi.js [oraEntrataGMT]
const fs = require('fs'), path = require('path'), DIR = path.join(__dirname, '..');
const q = JSON.parse(fs.readFileSync(DIR + '/qmdj_live.json', 'utf8')), o = JSON.parse(fs.readFileSync(DIR + '/orario_live.json', 'utf8')), C = o.crosses || o;
const H = +(process.argv[2] || 1); let n = 0, v = 0, pip = 0, n2 = 0, v2 = 0, p2 = 0;
for (const d of Object.keys(q).sort()) for (const f of (q[d].fermi || [])) { if (!f.qmdj) continue;
  const B = {}; for (const b of (C[f.cross] || [])) if (b.t.slice(0, 10) === d) B[+b.t.slice(11, 13)] = b; if (!B[H] || !B[21]) continue;
  const e = Math.round((f.qmdj === 'LONG' ? 1 : -1) * (B[21].c - B[H].o) / (/JPY/.test(f.cross) ? 0.01 : 0.0001));
  n++; if (e > 0) v++; pip += e; if (f.scarto >= 2) { n2++; if (e > 0) v2++; p2 += e; }
  console.log(d, f.cross.padEnd(7), 'trend', f.trend.padEnd(5), 'qimen', f.qmdj.padEnd(5), f.long + '-' + f.short, f.segue ? 'segue    ' : 'non segue', String(e).padStart(5)); }
console.log('TOTALE (entrata ' + H + ' GMT): ' + n + ' trade, ' + v + ' vinti, ' + pip + ' pip | scarto 2 o piu\': ' + n2 + ' trade, ' + v2 + ' vinti, ' + p2 + ' pip');
