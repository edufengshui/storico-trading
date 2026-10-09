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
// S52 (29/09/2026, Edu: "Voglio ottenere una statistica su quanti successi e fallimenti abbiamo"):
// il registro dell'app tiene solo due mesi; storico_live.json tiene TUTTI i trade dal primo giorno
// della raccolta (29/09/2026), per la statistica.
const STORICO_FILE = path.join(DIR, 'storico_live.json');

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
// Node 20 (quello di GitHub) non ha navigator: l'app lo usa per il service worker e gli appunti
if (typeof navigator === 'undefined') global.navigator = {};
global.document = { getElementById: id => (id === 'report' ? box : null), querySelector: () => null,
  querySelectorAll: () => [], addEventListener: () => {} };

async function main() {
  let feed;
  if (process.argv[2]) feed = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  else {
    const res = await fetch(WORKER_URL, { cache: 'no-store' });
    feed = await res.json();
    // 30/09/2026: la notte del 30/09 il Worker non ha fatto il suo giro delle 00:00 GMT e il feed era
    // ancora quello del giorno prima (Edu l'ha sbloccato aprendo /run). Se nei giorni lun-ven il feed
    // non e' di oggi, la raccolta chiama /run da sola e rilegge.
    const oggi = new Date().toISOString().slice(0, 10), gs = new Date().getUTCDay();
    if (feed && feed.date !== oggi && gs >= 1 && gs <= 5) {
      console.log('feed del ' + feed.date + ', non di oggi (' + oggi + '): chiamo /run');
      try { await fetch(WORKER_URL + 'run', { cache: 'no-store' }); } catch (e) { console.log('/run fallito: ' + e.message); }
      await new Promise(r => setTimeout(r, 20000));
      const res2 = await fetch(WORKER_URL, { cache: 'no-store' });
      feed = await res2.json();
      console.log('feed riletto: ' + feed.date);
    }
  }
  if (!feed || !feed.rows || !feed.date) throw new Error('feed vuoto o senza data: ' + JSON.stringify(feed).slice(0, 300));
  // 03/10/2026: sabato e domenica il mercato e' chiuso. Un feed con data di fine settimana non da'
  // trade veri: si tolgono dal registro e dallo storico i giorni di fine settimana e ci si ferma.
  const fineSett = d => { const g = new Date(d + 'T12:00:00Z').getUTCDay(); return g === 0 || g === 6; };
  const pulisci = f => { try { const o = JSON.parse(fs.readFileSync(f, 'utf8')); let tolti = 0;
    Object.keys(o).forEach(d => { if (fineSett(d)) { delete o[d]; tolti++; } });
    if (tolti) fs.writeFileSync(f, JSON.stringify(o, null, 1)); return tolti; } catch (e) { return 0; } };
  const t1 = pulisci(REG_FILE), t2 = pulisci(STORICO_FILE);
  if (t1 || t2) { try { store['report-registro-v1'] = fs.readFileSync(REG_FILE, 'utf8'); } catch (e) {}
    try { require('child_process').execSync('git add storico_live.json', { cwd: DIR, stdio: 'ignore' }); } catch (e) {} }
  const weekend = fineSett(feed.date);
  if (weekend) console.log('feed del ' + feed.date + ': fine settimana, mercato chiuso — nessun trade');
  const realFetch = global.fetch;
  global.fetch = async () => { throw new Error('nessuna rete dentro l\'app'); };
  const src = fs.readFileSync(path.join(DIR, 'app.js'), 'utf8');
  vm.runInThisContext(src + '\n;global.__app={ set:function(f){ forexData=f; }, report: renderReportTreSistemi, esiti: aggiornaEsitiDalFeed, leggi: leggiRegistro };');
  global.fetch = realFetch;
  __app.set(feed);
  const prima = __app.leggi();
  if (!weekend) __app.report();        // rifà il report e lo salva nel registro (come nell'app)
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

  // storico permanente: ogni trade una volta sola (giorno + cross), l'esito si aggiorna
  let storico = {};
  try { storico = JSON.parse(fs.readFileSync(STORICO_FILE, 'utf8')); } catch (e) {}
  Object.keys(reg).forEach(d => (reg[d] || []).forEach(t => {
    storico[d] = storico[d] || [];
    const i = storico[d].findIndex(x => x.cross === t.cross);
    if (i < 0) storico[d].push(t); else storico[d][i] = t;
  }));
  fs.writeFileSync(STORICO_FILE, JSON.stringify(storico, null, 1));
  // il file raccolta.yml salva solo registro_live.json e trade_persi.md: lo storico lo mette in lista qui
  try { require('child_process').execSync('git add storico_live.json', { cwd: DIR, stdio: 'ignore' }); } catch (e) {}

  // la statistica: trade chiusi (con esito), vinti, persi, pip; per livello e per mese
  function conta(lista) {
    const c = lista.filter(t => typeof t.esito === 'number');
    const v = c.filter(t => t.esito > 0).length, p = c.filter(t => t.esito < 0).length;
    const pip = c.reduce((a, t) => a + t.esito, 0);
    return { n: c.length, v, p, z: c.length - v - p, pip,
      perc: (v + p) ? Math.round(1000 * v / (v + p)) / 10 : null };
  }
  function riga(nome, c) {
    return '| ' + nome + ' | ' + c.n + ' | ' + c.v + ' | ' + c.p + ' | ' + (c.perc == null ? '—' : String(c.perc).replace('.', ',') + '%') +
      ' | ' + (c.pip > 0 ? '+' : '') + c.pip + ' |';
  }
  // Livello A in cantina (Edu, 09/10/2026): i trade segnati cantina si registrano con l'esito ma non si tradano,
  // quindi stanno fuori dal totale e dai mesi; hanno una riga loro per continuare a misurarli.
  const tuttiReg = [].concat(...Object.keys(storico).map(d => storico[d].map(t => Object.assign({ data: d }, t))));
  const cantina = tuttiReg.filter(t => t.cantina), tutti = tuttiReg.filter(t => !t.cantina);
  const giorni = Object.keys(storico).sort();
  let stat = '## Statistica dal ' + (giorni[0] || '—') + '\n\n' +
    '| | trade chiusi | vinti | persi | successo | pip |\n|---|---|---|---|---|---|\n' + riga('**Totale**', conta(tutti)) + '\n';
  ['A', 'B', 'C', 'D'].forEach(L => { const c = conta(tutti.filter(t => t.livello === L)); if (c.n) stat += riga('Livello ' + L + (L === 'A' ? ' (tradato fino all\'08/10)' : ''), c) + '\n'; });
  { const c = conta(cantina); if (c.n) stat += riga('Livello A in cantina (non tradato, dal 09/10)', c) + '\n'; }
  [...new Set(tutti.map(t => t.data.slice(0, 7)))].sort().forEach(m => { const c = conta(tutti.filter(t => t.data.slice(0, 7) === m)); if (c.n) stat += riga('Mese ' + m, c) + '\n'; });
  const aperti = tuttiReg.filter(t => typeof t.esito !== 'number').length;
  stat += '\nTrade ancora senza esito: ' + aperti + '. Un trade a 0 pip non conta ne\' come vinto ne\' come perso.\n\n';

  // trade_persi.md: stesso testo del pulsante "Copia i trade perdenti", dal piu' recente
  const out = [];
  Object.keys(reg).sort().reverse().forEach(d => (reg[d] || []).forEach(t => {
    if (typeof t.esito === 'number' && t.esito < 0) {
      out.push(t.cross + ', ' + d + (t.cantina ? ' (livello A in cantina, non tradato)' : '') +
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
  fs.writeFileSync(OUT_FILE, testa + stat + (out.length ? 'Trade perdenti del report:\n\n' + out.join('\n\n') + '\n' : 'Nessun trade perdente da capire.\n'));
  if (!process.argv[2] && !weekend) {
    try { await confronto(feed); } catch (e) { console.log('CONFRONTO FALLITO: ' + e.message); }
  }
  console.log('feed ' + feed.date + ' · proposti ' + oggi.length + ' · esiti compilati ' + auto.scritti + ' · persi in elenco ' + out.length);
}
// ---- CONFRONTO COL BACKTEST (S52, 02/10/2026) ----------------------------------------------
// Il livello A dal vivo ha vinto 4 trade su 15 contro il 71% del backtest. Il Worker calcola il
// trend EMA sulle chiusure GIORNALIERE di Twelve Data; il backtest lo calcola sulle chiusure delle
// 21:00 UTC dei giorni lun-ven (pb_stress.js). Ogni notte si scaricano dal Worker le barre orarie
// (/page), si rifanno seme, trend, filtro del trend consolidato ed esito di ieri ESATTAMENTE come
// nel backtest, si confrontano col feed e si rifa' il report con i dati del backtest.
// Scrive confronto_live.md (il confronto) e orario_live.json (le barre orarie dal 01/07/2026, per
// allungare lo storico del backtest).
async function confronto(feed) {
  const T = global.XKDGTrend;
  const f3 = p => { const d = String(p).replace(/[^0-9]/g, '').replace(/^0+/, ''); return d.slice(0, Math.abs(Number(p)) < 1 ? 2 : 3); };
  const pf = c => (/JPY$/.test(c) ? 100 : 10000);
  const ORARIO = path.join(DIR, 'orario_live.json');
  let orario = {}; try { orario = JSON.parse(fs.readFileSync(ORARIO, 'utf8')); } catch (e) {}
  const righe = [], alt = [];
  for (const r of feed.rows) {
    if (r.status !== 'ok') continue;
    let pg = null;
    try {
      const res = await fetch(WORKER_URL + 'page?symbol=' + r.cross + '&interval=1h&size=3500', { cache: 'no-store' });
      pg = await res.json();
    } catch (e) { righe.push('| ' + r.cross + ' | errore: ' + e.message + ' |'); continue; }
    await new Promise(z => setTimeout(z, 8000));
    if (!pg || !pg.bars) { righe.push('| ' + r.cross + ' | nessuna barra: ' + JSON.stringify(pg).slice(0, 80) + ' |'); continue; }
    const m = {}; (orario[r.cross] || []).forEach(b => { m[b.t] = b; });
    pg.bars.forEach(b => { if (b.t >= '2026-07-01') m[b.t] = { t: b.t, o: b.o, c: b.c }; });
    orario[r.cross] = Object.keys(m).sort().map(k => m[k]);
    const by = {};
    pg.bars.forEach(x => { const d = x.t.slice(0, 10), hh = x.t.slice(11, 13); by[d] = by[d] || {}; if (hh === '00') by[d].o = x.o; if (hh === '21') by[d].c = x.c; });
    const giorni = Object.keys(by).sort().filter(d => by[d].o != null && by[d].c != null && d < feed.date);
    const e = T.emaTrend(giorni.map(d => by[d].c));
    const oggiO = by[feed.date] && by[feed.date].o;
    const seme = oggiO != null ? parseInt(f3(oggiO), 10) : null;
    const ieri = giorni[giorni.length - 1];
    const mossa = ieri ? Math.round((by[ieri].c - by[ieri].o) * pf(r.cross) * 10) / 10 : null;
    const diff = [];
    if (seme !== r.seed) diff.push('seme');
    if (e.direction !== r.direction) diff.push('TREND');
    if (e.consolidated !== r.emaConsolidated) diff.push('consolidato');
    if (e.runLen !== r.emaRun) diff.push('durata');
    righe.push('| ' + r.cross + ' | ' + r.seed + ' / ' + seme + ' | ' + r.direction + ' / ' + e.direction +
      ' | ' + r.emaConsolidated + ' / ' + e.consolidated + ' | ' + r.emaRun + ' / ' + e.runLen +
      ' | ' + r.prevMovePip + ' / ' + mossa + ' | ' + (diff.join(', ') || 'uguale') + ' |');
    alt.push(Object.assign({}, r, { seed: seme != null ? seme : r.seed, direction: e.direction, emaConsolidated: e.consolidated, emaRun: e.runLen }));
  }
  fs.writeFileSync(ORARIO, JSON.stringify(orario));
  // il report rifatto coi dati del backtest, senza toccare il registro vero
  const salvato = store['report-registro-v1'];
  __app.set(Object.assign({}, feed, { rows: alt }));
  __app.report();
  const nuovi = (__app.leggi()[feed.date] || []);
  if (salvato == null) delete store['report-registro-v1']; else store['report-registro-v1'] = salvato;
  __app.set(feed);
  const veri = (JSON.parse(salvato || '{}')[feed.date] || []);
  const fmt = l => l.map(t => t.cross + ' ' + t.signal + ' ' + (t.livello || '')).join(', ') || 'nessuno';
  const txt = '# Confronto fra il feed del Worker e il calcolo del backtest — ' + feed.date + '\n\n' +
    'Ogni casella: Worker / backtest (barre orarie, chiusure delle 21:00 UTC lun-ven).\n\n' +
    '| cross | seme | trend | consolidato | durata | esito di ieri (pip) | differenze |\n|---|---|---|---|---|---|---|\n' +
    righe.join('\n') + '\n\n' +
    'Trade del report col feed del Worker: ' + fmt(veri) + '\n\n' +
    'Trade del report coi dati calcolati come nel backtest: ' + fmt(nuovi) + '\n';
  const CF = path.join(DIR, 'confronto_live.md');
  let vecchio = ''; try { vecchio = fs.readFileSync(CF, 'utf8'); } catch (e) {}
  fs.writeFileSync(CF, txt + (vecchio ? '\n---\n\n' + vecchio : ''));
  try { require('child_process').execSync('git add confronto_live.md orario_live.json', { cwd: DIR, stdio: 'ignore' }); } catch (e) {}
  console.log('confronto scritto');
}
main().catch(e => { console.error('RACCOLTA FALLITA: ' + e.message); process.exit(1); });
