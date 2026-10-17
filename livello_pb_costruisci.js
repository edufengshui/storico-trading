// SISTEMA PB PER FORMA — il catalogo (S58, 17/10/2026). Edu: "Adesso vogliamo vedere cosa succede con il PB? E' un
// sistema molto semplice pero' forse applicando la stessa logica il suo rate of success migliora?".
// Come il sistema D, ma con la carta Plum Blossom (esagramma + linea mutante del PB) e le caratteristiche della data
// dette in termini PB (livello_pb.js, caratteristiche). Il PB legge il Trend contro il Yong: bersaglio "segue il trend?".
// Serve /tmp/voci_carte.json (livello_ly_costruisci.js) e il dump TRESIST. Scrive livello_pb.json e aggiunge PBF alle voci.
// Uso: node livello_pb_costruisci.js [/tmp/tresist.json]
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const PBM = require(D + '/plumblossom.js'), SP = require(D + '/livello_pb.js'), fs = require('fs');
const STG = { '旺':'in piena stagione','相':'in crescita','休':'a riposo','囚':'prigioniero','死':'morto' };
const parla = k => k.replace(/ (旺|相|休|囚|死)$/, (m, s) => ' ' + STG[s] + ' (' + s + ')');
const T = {}; JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).forEach(r => { T[r.cross + r.date] = r; });
const V = JSON.parse(fs.readFileSync('/tmp/voci_carte.json', 'utf8'));
const db = [];
V.forEach(v => { const r = T[v.cross + v.date]; if (!r) return;
  const yb = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact().charAt(1);
  const P = PBM.read(r.seed, r.ramo, r.mese, yb, r.stelo, r.emaRun); if (!P || P.error) return;
  v._pbForma = SP.forma(P); v._f = Object.keys(SP.caratteristiche(P));
  db.push({ v, forma: v._pbForma, segue: v.trend === v.real ? 1 : 0, f: v._f }); });
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
  const testo = 'Se ' + parla(g.k) + ' → ' + (g.vc ? 'SEGUE' : 'NON SEGUE') + ' il trend (' + (g.vc ? g.sc : g.nc - g.sc) + '/' + g.nc + '); altrimenti ' + (g.vc ? 'NON SEGUE' : 'SEGUE') + ' (' + (g.vc ? g.ns - g.ss : g.ss) + '/' + g.ns + ')';
  righe.push({ forma, volte: rip.length, segue: seg, regola: testo, ok: g.ok + '/' + rip.length, chiave: g.k, se: g.vc,
    carte: rip.map(x => x.v.cross + ' ' + x.v.date + ' s' + x.v.seed + ' ' + (x.segue ? 'segue' : 'non segue') + (x.f.includes(g.k) ? ' [col tratto]' : '')).join('; ') }); });
fs.writeFileSync(D + '/livello_pb.json', JSON.stringify(righe, null, 1));
const cat = {}; righe.forEach(x => { if (x.chiave) cat[x.forma] = x; });
V.forEach(v => { v.PBF = null; const g = cat[v._pbForma]; if (g && v._f) { const s = v._f.includes(g.chiave) ? g.se === 1 : g.se !== 1; v.PBF = s ? v.trend : (v.trend === 'LONG' ? 'SHORT' : 'LONG'); } delete v._f; delete v._pbForma; });
fs.writeFileSync('/tmp/voci_carte.json', JSON.stringify(V));
const cnt = k => { const c = V.filter(x => x[k]); const w = c.filter(x => x[k] === x.real).length; return k + ' ' + c.length + ' · ' + (100 * w / c.length).toFixed(1) + '%'; };
console.log('carte ' + db.length + ' · forme PB ' + righe.length + ' · con regola ' + righe.filter(r => r.chiave).length + ' · casi spiegati ' + totok + '/' + tot + ' = ' + (100 * totok / tot).toFixed(1) + '%');
console.log(['PB', 'PBF', 'D', 'LYF', 'DLR'].map(cnt).join('  |  '));
