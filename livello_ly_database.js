// SISTEMA LY PER FORMA (S58, 17/10/2026 — Edu: "fare esattamente quello che e' stato fatto con il sistema-trend ma
// farlo con il LY. Visto che ci sono circa 11 carte identiche vedere cosa succede se si applica la logica LY a queste 11").
// Stesso percorso del sistema D (livello_d_database.js): per ogni forma (esagramma + linea mobile) la caratteristica
// della data che separa meglio le ripetizioni. Domanda diversa: non "segue il trend?" ma "il verdetto LY e' giusto?".
// Uso: node livello_ly_database.js [/tmp/tresist.json] [soglia pip, default 20]   -> /tmp/db_carte_ly.json + misure
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), IV = require(D + '/inventario_carta.js'), fs = require('fs');
const ST = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], BR = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WUSHU = { '甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬' };
const DUMP = process.argv[2] || '/tmp/tresist.json', SOGLIA = Number(process.argv[3] || 20);
const db = [];
for (const r of JSON.parse(fs.readFileSync(DUMP, 'utf8')).filter(r => r.ema && Math.abs(r.move) >= SOGLIA)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
  const ms = ST[((ST.indexOf(yp[0]) % 5) * 2 + 2 + ((BR.indexOf(r.mese) + 10) % 12)) % 10], hs = ST[(ST.indexOf(WUSHU[r.stelo]) + BR.indexOf(R.oraBranch)) % 10];
  const inv = IV.inventario(R, { dayBranch: r.ramo, monthBranch: r.mese, yearBranch: yp[1], oraBranch: R.oraBranch, dayStem: r.stelo, yearStem: yp[0], monthStem: ms, hourStem: hs, emaDir: r.ema });
  const f = {}; const S = inv.linee[inv.shi - 1], Y = inv.linee[inv.ying - 1];
  for (const [k, X] of [['Shi', S], ['Ying', Y]]) { f[k + ' ' + X.stagione] = 1; f[k + (X.timely ? ' di stagione' : ' fuori stagione')] = 1; if (X.vuoto) f[k + ' vuoto'] = 1; if (X.giornoSostiene) f[k + ' sostenuto dal giorno'] = 1;
    X.giorno.forEach(a => f[k + ': il giorno ' + a] = 1); X.ora.forEach(a => f[k + ': l\'ora ' + a] = 1); X.mese.forEach(a => f[k + ': il mese ' + a] = 1); if (X.ramo === inv.anno) f[k + ' Tai Sui'] = 1; }
  inv.linee.forEach(x => { f['L' + x.pos + ' ' + x.stagione] = 1; if (x.vuoto) f['L' + x.pos + ' vuota'] = 1; x.giorno.forEach(a => f['L' + x.pos + ': il giorno ' + a] = 1); });
  const m = inv.movimenti.find(z => z.tipo === 'mobile'); if (m) { f['arrivo della mobile ' + (m.arrTimely ? 'di stagione' : 'fuori stagione')] = 1; if (m.arrVuoto) f['arrivo della mobile vuoto'] = 1; m.blocchi.forEach(b => f['mobile: ' + b] = 1); }
  const sz = inv.linee.find(x => x.bestia === '螣蛇'); if (sz && (sz.sede || sz.muove) && sz.stagione === '死') f['Serpente morto su sede o mobile'] = 1;
  const real = r.move > 0 ? 'LONG' : 'SHORT', trend = r.ema === 'up' ? 'LONG' : 'SHORT';
  db.push({ cross: r.cross, date: r.date, seed: r.seed, forma: R.sup + '/' + R.inf + ' L' + R.mutante.pos, trend, real, move: r.move,
    segue: trend === real ? 1 : 0, ly: r.ly || null, lyOk: r.ly ? (r.ly === real ? 1 : 0) : null, dlr: r.dlr || null, pb: r.pb || null, at: r.at || null, lett: r.lett || null, f: Object.keys(f) });
}
fs.writeFileSync('/tmp/db_carte_ly.json', JSON.stringify(db));

// regola come nel sistema D (almeno 3 casi col tratto e 3 senza), bersaglio t = 1/0
function regola(rip, t) { if (rip.length < 5) return null; const fe = {}; rip.forEach(x => x.f.forEach(k => fe[k] = 1)); let best = null;
  for (const k of Object.keys(fe)) { const con = rip.filter(x => x.f.includes(k)), senza = rip.filter(x => !x.f.includes(k)); if (con.length < 3 || senza.length < 3) continue;
    const pc = con.reduce((a, x) => a + t(x), 0) / con.length, ps = senza.reduce((a, x) => a + t(x), 0) / senza.length;
    const acc = (con.reduce((a, x) => a + (t(x) === (pc >= .5 ? 1 : 0)), 0) + senza.reduce((a, x) => a + (t(x) === (ps >= .5 ? 1 : 0)), 0)) / rip.length;
    if (!best || acc > best.acc) best = { k, acc, con: pc >= .5 ? 1 : 0, senza: ps >= .5 ? 1 : 0 }; }
  return best; }
const pr = (x, g) => (x.f.includes(g.k) ? g.con : g.senza);
function misura(nome, base, t, dirDa) {
  const forme = {}; base.forEach(x => (forme[x.forma] = forme[x.forma] || []).push(x));
  let dn = 0, dok = 0; Object.values(forme).forEach(rip => { const g = regola(rip, t); if (!g) return; rip.forEach(x => { dn++; dok += t(x) === pr(x, g); }); });
  let n = 0, ok = 0, pip = 0; const perAnno = {};
  base.forEach(x => { const g = regola(forme[x.forma].filter(y => y !== x), t); if (!g) return; const giusto = pr(x, g) === t(x); n++; ok += giusto; pip += giusto ? Math.abs(x.move) : -Math.abs(x.move);
    const a = x.date.slice(0, 4); perAnno[a] = perAnno[a] || [0, 0]; perAnno[a][0]++; perAnno[a][1] += giusto; });
  let tn = 0, tok = 0; Object.values(forme).forEach(rip => { const g = regola(rip.filter(x => x.date < '2024'), t); if (!g) return; rip.filter(x => x.date >= '2024').forEach(x => { tn++; tok += t(x) === pr(x, g); }); });
  console.log('\n' + nome + ' — ' + base.length + ' carte, ' + Object.keys(forme).length + ' forme');
  console.log('  1) dentro il campione: ' + (100 * dok / dn).toFixed(1) + '% su ' + dn);
  console.log('  2) carta lasciata fuori: ' + (100 * ok / n).toFixed(1) + '% su ' + n + ', ' + Math.round(pip) + ' pip   (' + Object.keys(perAnno).sort().map(a => a + ' ' + (100 * perAnno[a][1] / perAnno[a][0]).toFixed(0) + '%').join(' · ') + ')');
  console.log('  3) regole 2020-23 provate sul 2024-26: ' + (100 * tok / tn).toFixed(1) + '% su ' + tn);
}
const conLY = db.filter(x => x.ly);
const lyBase = conLY.reduce((a, x) => a + x.lyOk, 0);
console.log('database: ' + db.length + ' carte (>= ' + SOGLIA + ' pip), il LY parla su ' + conLY.length + ' e ha ragione su ' + lyBase + ' = ' + (100 * lyBase / conLY.length).toFixed(1) + '%');
// il verdetto LY dentro le carte identiche: quante forme danno sempre lo stesso verso rispetto al trend?
const fo = {}; conLY.forEach(x => (fo[x.forma] = fo[x.forma] || []).push(x));
let cost = 0, tot = 0; Object.values(fo).filter(r => r.length >= 5).forEach(r => { tot++; const s = r.filter(x => x.ly === x.trend).length; if (s === 0 || s === r.length) cost++; });
console.log('forme ripetute >=5 volte col LY che parla: ' + tot + '; LY sempre col trend o sempre contro: ' + cost);
misura('A. LY giusto / sbagliato (nuovo)', conLY, x => x.lyOk);
misura('B. segue / non segue il trend (sistema D, per confronto)', db, x => x.segue);
// controllo: esiti tirati a moneta (stessa carta, stesso LY) — quanto "spiega" il metodo col solo rumore?
let seme = 12345; const rnd = () => (seme = (seme * 1103515245 + 12345) % 2147483648) / 2147483648;
const finto = conLY.map(x => Object.assign({}, x, { lyOk: rnd() < lyBase / conLY.length ? 1 : 0 }));
misura('C. controllo: LY giusto tirato a moneta', finto, x => x.lyOk);
