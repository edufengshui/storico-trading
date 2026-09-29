'use strict';
// RACCOLTA NOTTURNA DEI TRADE (S52, 23/09/2026 — richiesta di Edu: "Si può automatizzare il
// processo di raccolta e analisi dei trade persi?").
// Gira da solo ogni notte su GitHub (file .github/workflows/raccolta.yml) e fa quello che l'app fa
// quando Edu apre il report: prende il feed delle 00:00 GMT dal Worker, rifà il report dei nove
// cross con la scala A/B/C/D, lo stesso codice dell'app (app.js e i motori, copie dell'archivio), salva i trade
// proposti nel registro, compila gli esiti del giorno prima dal feed (entrata 00:00, uscita 21:00
// GMT) e riscrive trade_persi.md nel formato del pulsante "Copia i trade perdenti".
// File scritti: registro_live.json (il registro, come nell'app) e trade_persi.md.
// Prova senza rete: node raccolta_notturna.js feed_di_prova.json
const fs = require('fs'), path = require('path'), vm = require('vm');
const DIR = __dirname;
const WORKER_URL = 'https://trading-forex-seed.decumano16.workers.dev/';
const REG_FILE = path.join(DIR, 'registro_live.json');
const OUT_FILE = path.join(DIR, 'trade_persi.md');

global.window = global;
const lj = require('lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const R = f => require(path.join(DIR, f));
global.XKDGSolarTime = R('solar-time.js'); global.XKDGJieQi = R('jieqi-gmt.js');
global.XKDGDaLiuRen = R('daliuren.js'); global.XKDGTrend = R('trend.js');
global.XKDGPlumBlossom = R('plumblossom.js'); global.XKDGLiuYao = R('liuyao.js');
global.XKDGMotoreDLR = R('motore_dlr.js'); global.creaMotore = R('motore_lettura.js').creaMotore;
global.TrendLY = R('trend_ly.js');

// il registro dell'app vive nel localStorage: qui vive in registro_live.json
const store = {};
try { store['report-registro-v1'] = fs.readFileSync(REG_FILE, 'utf8'); } catch (e) {}
global.localStorage = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } };
function finto() { return { style: {}, innerHTML: '', textContent: '', value: '', dataset: {},
  querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, scrollIntoView() {} }; }
const box = finto();
global.addEventListener = () => {};
global.document = { getElementById: id => (id === 'report' ? box : null), querySelector: () => null,
  querySelectorAll: () => [], addEventListener: () => {} };

async function main() {
  let feed;
  if (process.argv[2]) feed = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  else {
    const res = await fetch(WORKER_URL, { cache: 'no-store' });
    feed = await res.json();
  }
  if (!feed || !feed.rows || !feed.date) throw new Error('feed vuoto o senza data: ' + JSON.stringify(feed).slice(0, 300));
  const realFetch = global.fetch;
  global.fetch = async () => { throw new Error('nessuna rete dentro l\'app'); };
  const src = fs.readFileSync(path.join(DIR, 'app.js'), 'utf8');
  vm.runInThisContext(src + '\n;global.__app={ set:function(f){ forexData=f; }, report: renderReportTreSistemi, esiti: aggiornaEsitiDalFeed, leggi: leggiRegistro };');
  global.fetch = realFetch;
  __app.set(feed);
  const prima = __app.leggi();
  __app.report();                      // rifà il report e lo salva nel registro (come nell'app)
  __app.esiti();                       // esiti del giorno prima dal feed (il report li compila gia')
  const reg = __app.leggi();
  let scritti = 0;
  Object.keys(prima).forEach(d => (prima[d] || []).forEach(t => {
    if (typeof t.esito === 'number') return;
    const n = (reg[d] || []).find(x => x.cross === t.cross);
    if (n && typeof n.esito === 'number') scritti++;
  }));
  const auto = { scritti };
  fs.writeFileSync(REG_FILE, JSON.stringify(reg, null, 1));

  // trade_persi.md: stesso testo del pulsante "Copia i trade perdenti", dal piu' recente
  const out = [];
  Object.keys(reg).sort().reverse().forEach(d => (reg[d] || []).forEach(t => {
    if (typeof t.esito === 'number' && t.esito < 0) {
      out.push(t.cross + ', ' + d +
        '\nTrend EMA: ' + t.trend +
        '\nIl sistema dice: ' + t.signal + ' (' + (t.segue ? 'segue' : 'non segue') + ' il trend)' +
        '\nEsito: ' + t.esito + ' pip' +
        '\nSeme ' + t.seed + ' · superiore ' + t.sup + ' · inferiore ' + t.inf + ' · mutante L' + t.linea +
        '\nBazi: ' + (t.bazi || '') +
        (t.livello ? '\nLivello: ' + t.livello + (t.fiducia ? ' · fiducia ' + t.fiducia : '') + ' · ' + (t.voci || '') + (t.dlrVia ? ' · via DLR: ' + t.dlrVia : '') : '') +
        '\nDeciso da: ' + (t.decisore || ''));
    }
  }));
  const oggi = reg[feed.date] || [];
  const testa = '# Trade persi — raccolta automatica\n\n' +
    'Aggiornato: ' + new Date().toISOString().slice(0, 16).replace('T', ' ') + ' GMT · feed del ' + feed.date +
    ' · trade proposti oggi: ' + oggi.length +
    (oggi.length ? ' (' + oggi.map(t => t.cross + ' ' + t.signal).join(', ') + ')' : '') +
    ' · esiti compilati stanotte: ' + auto.scritti + '\n\n';
  fs.writeFileSync(OUT_FILE, testa + (out.length ? 'Trade perdenti del report:\n\n' + out.join('\n\n') + '\n' : 'Nessun trade perdente da capire.\n'));
  console.log('feed ' + feed.date + ' · proposti ' + oggi.length + ' · esiti compilati ' + auto.scritti + ' · persi in elenco ' + out.length);
}
main().catch(e => { console.error('RACCOLTA FALLITA: ' + e.message); process.exit(1); });
