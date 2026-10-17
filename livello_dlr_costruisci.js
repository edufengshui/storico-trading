// SISTEMA DLR PER FORMA — il catalogo (S58, 17/10/2026). Edu: "Per ultimo il DLR, si puo' fare lo stesso anche li'?"
// Forma = le quattro lezioni coi caratteri (livello_dlr.js). Bersaglio: il giorno va in ALTO? (Host vince -> LONG).
// Serve /tmp/voci_carte.json (livello_ly_costruisci.js e livello_pb_costruisci.js prima). Scrive livello_dlr.json, aggiunge DLRF.
// Uso: node livello_dlr_costruisci.js [/tmp/tresist.json]
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const SP = require(D + '/livello_dlr.js'), fs = require('fs');
const STG = { '旺':'in piena stagione','相':'in crescita','休':'a riposo','囚':'prigioniero','死':'morto' };
const parla = k => k.replace(/ (旺|相|休|囚|死)$/, (m, s) => ' ' + STG[s] + ' (' + s + ')');
const T = {}; JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).forEach(r => { T[r.cross + r.date] = r; });
const V = JSON.parse(fs.readFileSync('/tmp/voci_carte.json', 'utf8'));
const db = [];
V.forEach(v => { const r = T[v.cross + v.date]; if (!r) return;
  const yb = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact().charAt(1);
  if (!r.R1 || !r.R3 || !r.steloGiorno) return;
  const c = { steloGiorno: r.steloGiorno, R1: r.R1, R2: r.R2, R3: r.R3, R4: r.R4, ramoMese: r.ramoMese || r.mese, vuoti: r.vuoti, treMessaggi: { chu: r.M1 },
    spiritoR1: r.spR1, spiritoR2: r.spR2, spiritoR3: r.spR3, spiritoR4: r.spR4, generaleOra: r.genOra, metodo: r.metodo, oraRamo: r.ora, ramoAnno: yb };
  v._pbForma = SP.forma(c); v._f = Object.keys(SP.caratteristiche(c));
  db.push({ v, forma: v._pbForma, segue: v.real === 'LONG' ? 1 : 0, f: v._f }); });
function regola(rip) { const fe = {}; rip.forEach(x => x.f.forEach(k => fe[k] = 1)); let best = null;
  for (const k of Object.keys(fe)) { const con = rip.filter(x => x.f.includes(k)), senza = rip.filter(x => !x.f.includes(k)); if (con.length < 2 || senza.length < 2) continue;
    const sc = con.reduce((a, x) => a + x.segue, 0), ss = senza.reduce((a, x) => a + x.segue, 0);
    const vc = sc * 2 >= con.length ? 1 : 0, vs = ss * 2 >= senza.length ? 1 : 0; if (vc === vs) continue;
    const ok = (vc ? sc : con.length - sc) + (vs ? ss : senza.length - ss);
    if (!best || ok > best.ok || (ok === best.ok && Math.min(con.length, senza.length) > Math.min(best.nc, best.ns))) best = { k, ok, nc: con.length, ns: senza.length, vc, sc, ss }; }
  return best; }
const fo = {}; db.forEach(x => (fo[x.forma] = fo[x.forma] || []).push(x));
const righe = []; let tot = 0, totok = 0;
Object.entries(fo).sort((a, b) => b[1].length - a[1].length).forEach(([forma, rip]) => {
  const seg = rip.reduce((a, x) => a + x.segue, 0);
  if (rip.length < 5) { righe.push({ forma, volte: rip.length, segue: seg, regola: 'troppo poche ripetizioni', ok: '' }); return; }
  const g = regola(rip); if (!g) { righe.push({ forma, volte: rip.length, segue: seg, regola: 'nessuna caratteristica separa i casi', ok: '' }); return; }
  tot += rip.length; totok += g.ok;
  const testo = 'Se ' + parla(g.k) + ' → ' + (g.vc ? 'ALTO' : 'BASSO') + ' (' + (g.vc ? g.sc : g.nc - g.sc) + '/' + g.nc + '); altrimenti ' + (g.vc ? 'BASSO' : 'ALTO') + ' (' + (g.vc ? g.ns - g.ss : g.ss) + '/' + g.ns + ')';
  righe.push({ forma, volte: rip.length, segue: seg, regola: testo, ok: g.ok + '/' + rip.length, chiave: g.k, se: g.vc,
    carte: rip.map(x => x.v.cross + ' ' + x.v.date + ' s' + x.v.seed + ' ' + (x.segue ? 'alto' : 'basso') + (x.f.includes(g.k) ? ' [col tratto]' : '')).join('; ') }); });
fs.writeFileSync(D + '/livello_dlr.json', JSON.stringify(righe, null, 1));
const cat = {}; righe.forEach(x => { if (x.chiave) cat[x.forma] = x; });
V.forEach(v => { v.DLRF = null; const g = cat[v._pbForma]; if (g && v._f) { const s = v._f.includes(g.chiave) ? g.se === 1 : g.se !== 1; v.DLRF = s ? 'LONG' : 'SHORT'; } delete v._f; delete v._pbForma; });
fs.writeFileSync('/tmp/voci_carte.json', JSON.stringify(V));
const cnt = k => { const c = V.filter(x => x[k]); const w = c.filter(x => x[k] === x.real).length; return k + ' ' + c.length + ' · ' + (100 * w / c.length).toFixed(1) + '%'; };
console.log('carte ' + db.length + ' · forme DLR ' + righe.length + ' · con regola ' + righe.filter(r => r.chiave).length + ' · casi spiegati ' + totok + '/' + tot + ' = ' + (100 * totok / tot).toFixed(1) + '%');
console.log(['DLR', 'DLRF', 'D', 'LYF', 'PBF'].map(cnt).join('  |  '));
