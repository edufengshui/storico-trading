// IL METODO SEMPLIFICATO SPINTO AL MASSIMO SUL BACKTEST (S58, Edu 20/10/2026: "trova tu tutte le regole che portano il
// risultato al massimo successo possibile su tutto il backtest e poi mi fai un report").
// Materiale: SOLO la linea mobile (partenza, arrivo, il loro rapporto, posizione, carattere, sede, stagione nel mese, vuoti)
// e cosa le fanno il giorno e il mese; domanda: la giornata segue il trend o finisce all'opposto?
// Metodo: lista di regole costruita gradino per gradino (come la piramide): fra tutte le caratteristiche e le coppie di
// caratteristiche, quella che sulle carte rimaste da' la % piu' alta (almeno MIN carte) con il suo verdetto; si tolgono quelle
// carte e si ripete finche' una regola supera la SOGLIA. La regola 1 di Edu (movimento bloccato -> segue) e' fra i candidati.
// Uso: node semplificato_ottimo.js [dump] [MIN=40] [SOGLIA=0.56] [TRAIN_FINO=]  (TRAIN_FINO: costruisce sulle carte prima e
// misura su quelle dopo)
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), fs = require('fs');
const DUMP = process.argv[2] || '/tmp/tresist.json', MIN = +(process.argv[3] || 40), SOGLIA = +(process.argv[4] || 0.56), TRAIN = process.argv[5] || null;
const WX = { '子':'Acqua','丑':'Terra','寅':'Legno','卯':'Legno','辰':'Terra','巳':'Fuoco','午':'Fuoco','未':'Terra','申':'Metallo','酉':'Metallo','戌':'Terra','亥':'Acqua' };
const GEN = { Legno:'Fuoco', Fuoco:'Terra', Terra:'Metallo', Metallo:'Acqua', Acqua:'Legno' }, KE = { Legno:'Terra', Terra:'Acqua', Acqua:'Fuoco', Fuoco:'Metallo', Metallo:'Legno' };
const CL = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
const HE = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
const HAI = { '子':'未','未':'子','丑':'午','午':'丑','寅':'巳','巳':'寅','卯':'辰','辰':'卯','申':'亥','亥':'申','酉':'戌','戌':'酉' };
const XING = { '寅':'巳','巳':'申','申':'寅','丑':'戌','戌':'未','未':'丑','子':'卯','卯':'子' };
const AV = { '寅':'卯','卯':'辰','巳':'午','午':'未','申':'酉','酉':'戌','亥':'子','子':'丑' }, RE = {}; Object.keys(AV).forEach(k => RE[AV[k]] = k);
const IT = { '子':'Zi','丑':'Chou','寅':'Yin','卯':'Mao','辰':'Chen','巳':'Si','午':'Wu','未':'Wei','申':'Shen','酉':'You','戌':'Xu','亥':'Hai' };
const stg = (b, m) => { const e = WX[b], s = WX[m]; return e === s ? 'in piena stagione' : GEN[s] === e ? 'in crescita' : GEN[e] === s ? 'a riposo' : KE[s] === e ? 'morta' : 'prigioniera'; };
const rel = (x, b) => { const r = []; if (x === b) r.push('stesso ramo'); if (HE[x] === b) r.push('combina'); if (CL[x] === b) r.push('clasha'); if (HAI[x] === b) r.push('danneggia (害)'); if (XING[x] === b) r.push('punisce');
  const a = WX[x], e = WX[b]; if (a === e) r.push('stesso elemento'); else if (GEN[a] === e) r.push('genera'); else if (KE[a] === e) r.push('controlla'); else if (GEN[e] === a) r.push('drena'); else if (KE[e] === a) r.push('e\' controllato da'); return r; };
const carte = [];
for (const r of JSON.parse(fs.readFileSync(DUMP, 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
  const m = R.mutante, L = R.linee[m.pos - 1], d = m.ramoDep, a = m.ramoArr, f = new Set();
  rel(a, d).forEach(x => f.add('l\'arrivo ' + x + ' la partenza'));
  if (AV[d] === a) f.add('la mobile avanza'); if (RE[d] === a) f.add('la mobile retrocede');
  f.add('partenza ' + stg(d, r.mese)); f.add('arrivo ' + stg(a, r.mese));
  if ((R.vuoti || []).includes(d)) f.add('partenza vuota'); if ((R.vuoti || []).includes(a)) f.add('arrivo vuoto');
  f.add('mobile su L' + m.pos); f.add('mobile nel trigramma ' + (m.pos >= 4 ? 'alto' : 'basso')); f.add('mobile ' + (L.yang ? 'yang -> yin' : 'yin -> yang'));
  f.add('mobile ' + L.par); if (L.isShi) f.add('mobile = Shi'); if (L.isYing) f.add('mobile = Ying'); if (!L.isShi && !L.isYing) f.add('mobile non sede');
  rel(r.ramo, d).forEach(x => f.add('il giorno ' + x + ' la partenza')); rel(r.ramo, a).forEach(x => f.add('il giorno ' + x + ' l\'arrivo'));
  rel(r.mese, d).forEach(x => f.add('il mese ' + x + ' la partenza')); rel(r.mese, a).forEach(x => f.add('il mese ' + x + ' l\'arrivo'));
  const tocca = (x, b) => HE[x] === b || CL[x] === b;
  if ([r.ramo, r.mese].some(x => tocca(x, d) || tocca(x, a))) f.add('REGOLA 1 di Edu: movimento bloccato (giorno o mese)');
  else f.add('movimento libero');
  carte.push({ date: r.date, cross: r.cross, seed: r.seed, move: r.move, segue: (r.ema === 'up') === (r.move > 0) ? 1 : 0, f: [...f], forma: R.sup + '/' + R.inf + ' L' + m.pos, mob: IT[d] + '->' + IT[a] });
}
if (process.env.CARTE_OUT) fs.writeFileSync(process.env.CARTE_OUT, JSON.stringify(carte));
const train = TRAIN ? carte.filter(c => c.date < TRAIN) : carte, test = TRAIN ? carte.filter(c => c.date >= TRAIN) : null;
const feats = [...new Set(train.flatMap(c => c.f))];
const cond = []; feats.forEach(x => cond.push([x])); for (let i = 0; i < feats.length; i++) for (let j = i + 1; j < feats.length; j++) cond.push([feats[i], feats[j]]);
const has = (c, k) => k.every(x => c.f.includes(x));
let resto = train.slice(); const regole = [];
while (true) {
  let best = null;
  for (const k of cond) { let n = 0, s = 0; for (const c of resto) if (has(c, k)) { n++; s += c.segue; } if (n < MIN) continue;
    const v = s * 2 >= n ? 1 : 0, ok = v ? s : n - s, acc = ok / n; if (!best || acc > best.acc || (acc === best.acc && n > best.n)) best = { k, v, acc, n }; }
  if (!best || best.acc < SOGLIA) break;
  regole.push(best); resto = resto.filter(c => !has(c, best.k));
}
const applica = c => { for (const g of regole) if (has(c, g.k)) return g.v; return null; };
const misura = (lista, nome) => { let n = 0, ok = 0, p = 0; const per = {}; lista.forEach(c => { const v = applica(c); if (v == null) return; n++; const g = v === c.segue; ok += g; p += g ? Math.abs(c.move) : -Math.abs(c.move); const y = c.date.slice(0, 4); per[y] = per[y] || [0, 0]; per[y][0]++; per[y][1] += g; });
  console.log(nome + ': ' + n + ' carte su ' + lista.length + ' · ' + (100 * ok / n).toFixed(1) + '% · ' + (p > 0 ? '+' : '') + p + ' pip · per anno ' + Object.keys(per).sort().map(y => y + ' ' + (100 * per[y][1] / per[y][0]).toFixed(0) + '%').join(' ')); return { n, acc: ok / n, p }; };
console.log('METODO SEMPLIFICATO SPINTO AL MASSIMO · ' + carte.length + ' carte · ' + feats.length + ' caratteristiche · ' + cond.length + ' condizioni provate · almeno ' + MIN + ' carte per regola · soglia ' + (100 * SOGLIA) + '%' + (TRAIN ? ' · costruito sulle carte prima del ' + TRAIN : ''));
regole.forEach((g, i) => console.log(String(i + 1).padStart(2) + '. se ' + g.k.join(' E ') + ' -> ' + (g.v ? 'SEGUE il trend' : 'OPPOSTO al trend') + '  (' + g.n + ' carte, ' + (100 * g.acc).toFixed(1) + '%)'));
const T = misura(train, TRAIN ? 'sulle carte da cui e\' costruito' : 'su tutto il backtest');
if (test) misura(test, 'sulle carte DOPO il ' + TRAIN + ' (mai viste)');
fs.writeFileSync(process.env.REGOLE_OUT || '/tmp/semplificato_regole.json', JSON.stringify(regole));
// verdetto per carta (LONG/SHORT) per il confronto con le altre voci
if (process.env.PRED_OUT) { const out = {}; carte.forEach(c => { const v = applica(c); if (v == null) return; const T = JSON.parse('0'); out[c.cross + '|' + c.date] = v; }); fs.writeFileSync(process.env.PRED_OUT, JSON.stringify(out)); }
