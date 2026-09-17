#!/usr/bin/env node
/* S49 (16/09/2026): elenco delle carte dal 2024 con una linea incompatibile che la scala A/B/C/D
 * nell'app ha tradato e perso E che il motore di lettura sbaglia anche lui.
 * Prima:
 *   BASE="VUOTO=1 SOPRAF=1 DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1"
 *   env $BASE TRESIST=1 SOGLIAPIP=20 TRESISTDUMP=/tmp/tresist.json node pb_stress.js > /dev/null
 *   env $BASE MOTORE=lettura PRINCIPI=1 DUMPGRAD='*' SEGNAINC=1 node pb_stress.js 2>/dev/null | grep "#GRAD" > /tmp/grad.txt
 * Poi: node incomp_perse.js [--peso]   (--peso ordina per pip persi invece che per data)
 * Prima riga: totale scala (deve coincidere con Z-TOT48). Prima di presentare una carta:
 * controllare nei registri che non sia gia' stata letta (node carta_libera.js CROSS DATA). */
const fs = require('fs');
const a = JSON.parse(fs.readFileSync('/tmp/tresist.json'));
const inc = {};
fs.readFileSync('/tmp/grad.txt', 'utf8').split('\n').forEach(l => {
  const m = l.match(/#GRAD (\w+) (\S+) seme(\d+)(?: INC\[([^\]]+)\])?/);
  if (m) inc[m[1] + '|' + m[2]] = m[4] || null;
});
let n = 0, w = 0, pip = 0; const out = [];
for (const o of a) {
  let dir = null, lv = null;
  if (o.pb && o.pb === o.ly && o.ly === o.dlr) { dir = o.dlr; lv = 'A'; }
  else if (o.at && o.at === o.dlr) { dir = o.dlr; lv = 'B'; }
  else if (!o.dlr && o.ly && o.pb === o.ly) { dir = o.pb; lv = 'C'; }
  else if (o.dlr && o.dlr === o.lett) { dir = o.dlr; lv = 'D'; }
  if (!dir) continue;
  n++; const real = o.move > 0 ? 'LONG' : 'SHORT'; if (dir === real) w++; pip += dir === 'LONG' ? o.move : -o.move;
  const k = o.cross + '|' + o.date;
  if (o.date >= '2024-01-01' && dir !== real && o.lett && o.lett !== real && inc[k])
    out.push({ d: o.date, t: [o.date, o.cross, 'seme ' + o.seed, 'livello ' + lv, dir, Math.round(o.move), inc[k], o.lettGrad].join(' '), p: Math.abs(o.move) });
}
console.log('scala', n, (100 * w / n).toFixed(2) + '%', Math.round(pip) + ' pip');
if (process.argv.includes('--peso')) out.sort((x, y) => y.p - x.p); else out.sort((x, y) => y.d.localeCompare(x.d));
console.log(out.length + ' carte'); out.forEach(x => console.log(x.t));
