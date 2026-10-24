// MISURA DAL VIVO DELLA PIRAMIDE (S57, 17/10/2026 — Edu: "questo deve essere il sistema da adesso in poi").
// Ricostruisce i feed di ogni giorno di mercato dalle barre orarie della raccolta notturna (orario_live.json, stesso
// calcolo del Worker: seme = apertura della barra delle 00:00, EMA(12) sulle chiusure giornaliere), fa leggere ogni
// cross all'app (index.html + app.js, come nel browser), e confronta piramide, voci e trend con l'esito 00:00 -> 21:00 GMT.
// Uso: node misura_vivo.js [dal] [al]      (default: dal 2026-09-29 a oggi)   -> stampa la tabella
const fs = require('fs'), path = require('path'), vm = require('vm');
const DIR = __dirname, APP = fs.existsSync(path.join(DIR, '../trading/app.js')) ? path.join(DIR, '../trading') : DIR;
const DAL = process.argv[2] || '2026-09-29', AL = process.argv[3] || new Date().toISOString().slice(0, 10);
const W = fs.readFileSync(path.join(DIR, 'worker_index.js'), 'utf8');
const BRANCHES = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'], BRANCH_PINYIN = BRANCHES;
eval(W.slice(W.indexOf('var EMA_PERIOD'), W.indexOf('async function fetchDailyAll')));
// ORARIO=full1h.json (24/10/2026): stessa misura su tutto lo storico 2020-26 (barre con massimi e minimi), per le uscite di Lio.
const _O = JSON.parse(fs.readFileSync(path.join(DIR, process.env.ORARIO || 'orario_live.json'), 'utf8')), O = _O.crosses || _O;
const pip = c => /JPY$/.test(c) ? 100 : 10000, festivo = d => [0, 6].includes(new Date(d + 'T12:00:00Z').getUTCDay());
const perGiorno = {}; for (const c in O) { perGiorno[c] = {}; O[c].forEach(b => { const d = b.t.slice(0, 10); (perGiorno[c][d] = perGiorno[c][d] || []).push(b); }); }
// l'app come nel browser
const store = {}; if (process.env.SCALA) store.SCALA = process.env.SCALA; if (process.env.SENZA_SEMP) store.SENZA_SEMP = '1';  // SCALA=PIRAMIDE_LY per la piramide S58 const el = () => ({ style: {}, innerHTML: '', textContent: '', value: '', dataset: {}, querySelectorAll: () => [], querySelector: () => null, addEventListener() {}, scrollIntoView() {} });
const sb = { console, Math, Date, JSON, Object, Array, String, Number, Boolean, RegExp, Error, parseInt, parseFloat, isNaN, isFinite, Promise, setTimeout,
  localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: k => { delete store[k]; } },
  navigator: {}, addEventListener() {}, fetch: async () => { throw new Error('offline'); },
  document: { getElementById: () => el(), querySelector: () => null, querySelectorAll: () => [], addEventListener() {} } };
sb.window = sb; sb.self = sb; sb.globalThis = sb; vm.createContext(sb);
const html = fs.readFileSync(path.join(APP, 'index.html'), 'utf8');
for (const f of [...html.matchAll(/<script src="\.\/([^"]+)"/g)].map(m => m[1])) {
  const p = fs.existsSync(path.join(APP, f)) ? path.join(APP, f) : path.join(DIR, 'node_modules/lunar-javascript/lunar.js');
  vm.runInContext(fs.readFileSync(p, 'utf8') + (f === 'app.js' ? '\n;window.__ana=function(r,d){return analizzaCrossPerReport(r,istanteUtcDelGiorno(d.split("-").map(Number)),d);};window.__liv=livelloTreSistemi;' : ''), sb, { filename: f });
}
const C = [];
for (let t = Date.parse(DAL + 'T00:00:00Z'); t <= Date.parse(AL + 'T00:00:00Z'); t += 864e5) {
  const D = new Date(t).toISOString().slice(0, 10); if (festivo(D)) continue;
  for (const c in perGiorno) {
    const oggi = perGiorno[c][D] || [], b0 = oggi.find(b => b.t.slice(11, 13) === '00'), b21 = oggi.find(b => b.t.slice(11, 13) === '21');
    if (!b0 || !b21) continue;
    // S58 (17/10/2026): trend ed esito come il confronto della raccolta notturna e il Worker — chiusure delle 21:00
    // (barra delle 21:00 chiusa) di ogni giorno con barre 00 e 21, XKDGTrend.emaTrend. Prima: chiusura dell'ultima
    // barra lun-ven (trend uguale al Worker 132/144 in confronto_live.md, ora 143/144) ed esito all'apertura delle 21.
    const g21 = d => { const g = perGiorno[c][d]; return g.some(b => b.t.slice(11, 13) === '00') ? g.find(b => b.t.slice(11, 13) === '21') : null; };
    const closes = Object.keys(perGiorno[c]).sort().filter(d => d < D && !festivo(d)).map(g21).filter(Boolean).map(b => b.c);   // S58 (19/10/2026): solo lun-ven, come lo storico 2020-25
    const row = rowFor(c, b0.o); row.status = 'ok'; const et = sb.XKDGTrend.emaTrend(closes);
    row.direction = et.direction; row.emaChanges = et.changes; row.emaConsolidated = et.consolidated; row.emaRun = et.runLen;
    const e = sb.__ana(row, D); if (!e.pbDir && !e.letta) continue;   // 24/10/2026: anche le carte col PB muto (pareggio/clash)
    const m = Math.round((b21.c - b0.o) * pip(c)), L = sb.__liv(e);
    C.push({ date: D, cross: c, real: m > 0 ? 'LONG' : 'SHORT', move: Math.abs(m), trend: row.direction === 'up' ? 'LONG' : 'SHORT', liv: L.liv, dirLiv: L.dir,
      PB: e.pbDir, LY: e.lyDir || null, AT: e.attuale || null, DLR: e.dlrDir || null, LETT: e.lettDir || null, MT: e.mtDir || null, D: e.dDir || null, liDir: e.liDir || null, pbMuto: e.pbMuto || null, liForza: e.liForza || null, liR: e.liRacconto || null, LYF: e.lyfDir || null, PBF: e.pbfDir || null, DLRF: e.dlrfDir || null, CM: e.cmDir || null, SEMP: e.sempDir || null, lySez: e.lySez || null, lettGrad: (e.lettGradino || '').split(' ')[0] || null, dlrVia: e.dlrVia || null });
  }
}
if (process.env.DUMPC) require('fs').writeFileSync(process.env.DUMPC, JSON.stringify(C));
const hit = (c, x) => { const d = x[c[0]]; return d && c.every(v => x[v] === d) ? d : null; };
const riga = (nome, f) => { let n = 0, w = 0, p = 0; C.forEach(x => { const d = f(x); if (!d) return; n++; const ok = d === x.real; w += ok; p += ok ? x.move : -x.move; });
  console.log(nome.padEnd(46) + String(n).padStart(4) + ' trade ' + String(w).padStart(3) + ' vinti ' + (n ? (100 * w / n).toFixed(0) : '-').padStart(3) + '% ' + ((p > 0 ? '+' : '') + p).padStart(6) + ' pip'); };
console.log('dal ' + DAL + ' al ' + AL + ': ' + [...new Set(C.map(x => x.date))].length + ' giorni di mercato, ' + C.length + ' cross-giorno');
riga('seguire sempre il trend', x => x.trend);
riga('D da solo', x => x.D); riga('LY da solo', x => x.LY); riga('lettura della carta da solo', x => x.LETT); riga('sistema LY per forma da solo', x => x.LYF); riga('PB da solo', x => x.PB); riga('sistema PB per forma da solo', x => x.PBF); riga('DLR da solo', x => x.DLR); riga('DLR da solo, ultimi 20 giorni di mercato (riprende sopra il 55%)', x => (C.__ultimi || (C.__ultimi = [...new Set(C.map(y => y.date))].sort().slice(-20))).includes(x.date) ? x.DLR : null); riga('sistema DLR per forma da solo', x => x.DLRF); riga('colpo del mese da solo', x => x.CM); riga('metodo semplificato da solo', x => x.SEMP);
riga('DLR = metodo del trend (senza D)', x => hit(['DLR', 'MT'], x));
riga('LEGGO IO (si trada)', x => x.liDir);
riga('  Leggo io, conclusione forte', x => x.liForza === 'forte' ? x.liDir : null);
riga('  Leggo io, media', x => x.liForza === 'media' ? x.liDir : null);
riga('  Leggo io, debole', x => x.liForza === 'debole' ? x.liDir : null);
// STOP 50 SUI TRADE DI LEGGO IO COL DLR CONCORDE (24/10/2026, Edu: "Aspettiamo ma tienimi aggiornato e quando abbiamo molti casi
// così, lo mettiamo"). Stop controllato su massimi e minimi veri (uscite.js; barre senza h/l -> apertura/chiusura, segnalate).
{ const U = require('./uscite.js'), st = (nome, f, reg) => { let n = 0, w = 0, p = 0, run = 0, top = 0, calo = 0, senza = 0;
    C.forEach(x => { const d = f(x); if (!d) return; const pa = U.percorso(x.cross, x.date); if (!pa) return; n++;
      senza += pa.p.some(b => b.hiVero === false) ? 1 : 0; const v = U.esito(pa, d, x.cross, reg, true); w += v > 0; p += v; run += v; top = Math.max(top, run); calo = Math.min(calo, run - top); });
    console.log(nome.padEnd(46) + String(n).padStart(4) + ' trade ' + String(w).padStart(3) + ' vinti ' + (n ? (100 * w / n).toFixed(0) : '-').padStart(3) + '% ' + ((p > 0 ? '+' : '') + Math.round(p)).padStart(6) + ' pip  calo ' + Math.round(calo) + (senza ? '  (' + senza + ' senza h/l)' : '')); };
  const conc = x => x.liDir && x.DLR === x.liDir ? x.liDir : null;
  st('Lio col DLR concorde, tenere fino alle 21', conc, {}); st('Lio col DLR concorde, STOP 50', conc, { stop: 50 }); }
riga('PIRAMIDE intera', x => x.liv && x.liv !== 'cantina' && /^[0-9]+$/.test(x.liv) ? x.dirLiv : null);
riga('  gradino 1 (punta)', x => x.liv === '1' ? x.dirLiv : null);
riga('  gradini 2-4', x => /^[234]$/.test(x.liv || '') ? x.dirLiv : null);
riga('  gradini 5-7', x => /^[567]$/.test(x.liv || '') ? x.dirLiv : null);
riga('  gradini 8 e oltre', x => /^([89]|1[0-9])$/.test(x.liv || '') ? x.dirLiv : null);
riga('cantina (non si trada)', x => x.liv === 'cantina' ? x.dirLiv : null);
