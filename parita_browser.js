'use strict';
// PARITA' COL BROWSER (S52, 01/10/2026). Il 01/10 l'app nel browser di Edu dava AUDUSD SHORT livello C
// mentre la raccolta notturna (node) dava LONG livello D: due righe dei motori leggevano process.env,
// che nel browser non esiste, e il motore cadeva in silenzio ("tace"). Questo controllo carica i file
// dell'app come fa il browser (index.html, senza process ne' require) e li confronta con node.
// Uso: node parita_browser.js feed.json   (un feed del Worker, o costruito dallo storico)
const fs = require('fs'), path = require('path'), vm = require('vm');
const DIR = __dirname, feed = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const store = {};
const el = () => ({ style: {}, innerHTML: '', textContent: '', value: '', dataset: {}, querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, scrollIntoView() {} });
const box = el();
const sb = { console, Math, Date, JSON, Object, Array, String, Number, Boolean, RegExp, Error, parseInt, parseFloat, isNaN, isFinite, Promise, setTimeout,
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  navigator: {}, addEventListener() {}, fetch: async () => { throw new Error('offline'); },
  document: { getElementById: id => (id === 'report' ? box : null), querySelector: () => null, querySelectorAll: () => [], addEventListener() {} } };
sb.window = sb; sb.self = sb; sb.globalThis = sb;
vm.createContext(sb);
const html = fs.readFileSync(path.join(DIR, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="\.\/([^"]+)"/g)].map(m => m[1]);
for (const f of scripts) {
  const p = fs.existsSync(path.join(DIR, f)) ? path.join(DIR, f) : path.join(DIR, 'node_modules/lunar-javascript/lunar.js');
  vm.runInContext(fs.readFileSync(p, 'utf8') + (f === 'app.js' ? '\n;window.__app={set:function(x){forexData=x;},report:renderReportTreSistemi,leggi:leggiRegistro};' : ''), sb, { filename: f });
}
sb.__app.set(feed); sb.__app.report();
const reg = sb.__app.leggi()[feed.date] || [];
console.log('BROWSER  ' + reg.map(t => t.cross + ' ' + t.signal + ' ' + t.livello).join(' · '));
reg.forEach(t => console.log('   ' + t.cross + ': ' + (t.voci || '').replace(/ · Spirito.*/, '')));
