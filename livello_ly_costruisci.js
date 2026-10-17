// SISTEMA LY PER FORMA — il catalogo (S58, 17/10/2026). Edu: "fare esattamente quello che e' stato fatto con il
// sistema-trend ma farlo con il LY ... vedere cosa succede se si applica la logica LY a queste 11 [carte identiche]";
// "non mi interessa il risultato fuori dal campione, abbiamo gia' superato questa obiezione con il sistema-trend".
// Come livello_d_costruisci.js: per ogni forma (esagramma + linea mobile) ripetuta almeno 5 volte, la caratteristica
// della data che separa meglio le volte in cui il verdetto LY era giusto da quelle in cui era sbagliato
// (almeno 2 casi col tratto e 2 senza, verdetti opposti). Voce LYF: LY giusto -> il verso del LY, sbagliato -> l'opposto.
// Scrive livello_ly.json (catalogo) e /tmp/voci_carte.json (tutte le voci di ogni carta del backtest, per la piramide).
// Uso: node livello_ly_costruisci.js [/tmp/tresist.json]
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), IV = require(D + '/inventario_carta.js'), LT = require(D + '/lettura_trend.js'), SD = require(D + '/livello_d.js'), fs = require('fs');
const ST = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], BR = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WUSHU = { '甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬' };
const STG = { '旺':'in piena stagione','相':'in crescita','休':'a riposo','囚':'prigioniero','死':'morto' };
const parla = k => k.replace(/ (旺|相|休|囚|死)$/, (m, s) => ' ' + STG[s] + ' (' + s + ')');
const db = [];
for (const r of JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).filter(r => r.ema && Math.abs(r.move) >= 20)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
  const ms = ST[((ST.indexOf(yp[0]) % 5) * 2 + 2 + ((BR.indexOf(r.mese) + 10) % 12)) % 10], hs = ST[(ST.indexOf(WUSHU[r.stelo]) + BR.indexOf(R.oraBranch)) % 10];
  const ctx = { dayBranch: r.ramo, monthBranch: r.mese, yearBranch: yp[1], oraBranch: R.oraBranch, dayStem: r.stelo, yearStem: yp[0], monthStem: ms, hourStem: hs, emaDir: r.ema };
  const f = SD.caratteristiche(IV.inventario(R, ctx));
  const real = r.move > 0 ? 'LONG' : 'SHORT', trend = r.ema === 'up' ? 'LONG' : 'SHORT';
  const mt = LT.leggi(R, Object.assign({}, ctx)), sd = SD.leggi(R, Object.assign({}, ctx), IV);
  db.push({ cross: r.cross, date: r.date, seed: r.seed, forma: R.sup + '/' + R.inf + ' L' + R.mutante.pos, trend, real, move: r.move,
    PB: r.pb || null, LY: r.ly || null, AT: r.at || null, DLR: r.dlr || null, LETT: r.lett || null, MT: (mt && mt.dir) || null, D: sd.dir || null,
    lyOk: r.ly ? (r.ly === real ? 1 : 0) : null, f: Object.keys(f) });
}
function regola(rip) { const fe = {}; rip.forEach(x => x.f.forEach(k => { if (!/^(mese|giorno) /.test(k)) fe[k] = 1; })); let best = null;
  for (const k of Object.keys(fe)) { const con = rip.filter(x => x.f.includes(k)), senza = rip.filter(x => !x.f.includes(k)); if (con.length < 2 || senza.length < 2) continue;
    const sc = con.reduce((a, x) => a + x.lyOk, 0), ss = senza.reduce((a, x) => a + x.lyOk, 0);
    const vc = sc * 2 >= con.length ? 1 : 0, vs = ss * 2 >= senza.length ? 1 : 0; if (vc === vs) continue;
    const ok = (vc ? sc : con.length - sc) + (vs ? ss : senza.length - ss);
    if (!best || ok > best.ok || (ok === best.ok && Math.min(con.length, senza.length) > Math.min(best.nc, best.ns))) best = { k, ok, nc: con.length, ns: senza.length, vc, sc, ss }; }
  return best; }
const fo = {}; db.filter(x => x.LY).forEach(x => (fo[x.forma] = fo[x.forma] || []).push(x));
const righe = []; let tot = 0, totok = 0;
Object.entries(fo).sort((a, b) => b[1].length - a[1].length).forEach(([forma, rip]) => {
  const giusti = rip.reduce((a, x) => a + x.lyOk, 0);
  if (rip.length < 5) { righe.push({ forma, volte: rip.length, lyGiusto: giusti, regola: 'troppo poche ripetizioni', ok: '' }); return; }
  const g = regola(rip); if (!g) { righe.push({ forma, volte: rip.length, lyGiusto: giusti, regola: 'nessuna caratteristica separa i casi', ok: '' }); return; }
  tot += rip.length; totok += g.ok;
  const testo = 'Se ' + parla(g.k) + ' → il LY ha ' + (g.vc ? 'RAGIONE' : 'TORTO') + ' (' + (g.vc ? g.sc : g.nc - g.sc) + '/' + g.nc + '); altrimenti ha ' + (g.vc ? 'TORTO' : 'RAGIONE') + ' (' + (g.vc ? g.ns - g.ss : g.ss) + '/' + g.ns + ')';
  righe.push({ forma, volte: rip.length, lyGiusto: giusti, regola: testo, ok: g.ok + '/' + rip.length, chiave: g.k, se: g.vc,
    carte: rip.map(x => x.cross + ' ' + x.date + ' s' + x.seed + ' LY ' + x.LY + ' ' + (x.lyOk ? 'giusto' : 'sbagliato') + (x.f.includes(g.k) ? ' [col tratto]' : '')).join('; ') });
});
fs.writeFileSync(D + '/livello_ly.json', JSON.stringify(righe, null, 1));
// voce LYF su ogni carta del backtest (catalogo intero, come il sistema D nel software)
const cat = {}; righe.forEach(x => { if (x.chiave) cat[x.forma] = x; });
db.forEach(x => { const g = cat[x.forma]; x.LYF = null; if (!g || !x.LY) return; const giusto = x.f.includes(g.chiave) ? g.se === 1 : g.se !== 1; x.LYF = giusto ? x.LY : (x.LY === 'LONG' ? 'SHORT' : 'LONG'); delete x.f; });
db.forEach(x => delete x.f);
fs.writeFileSync('/tmp/voci_carte.json', JSON.stringify(db));
const cnt = (k) => { const c = db.filter(x => x[k]); const w = c.filter(x => x[k] === x.real).length; return k + ' ' + c.length + ' · ' + (100 * w / c.length).toFixed(1) + '%'; };
console.log('carte ' + db.length + ' · forme ' + righe.length + ' · con regola ' + righe.filter(r => r.chiave).length + ' · casi spiegati ' + totok + '/' + tot + ' = ' + (100 * totok / tot).toFixed(1) + '%');
console.log(['PB', 'LY', 'AT', 'DLR', 'LETT', 'MT', 'D', 'LYF'].map(cnt).join('  |  '));
