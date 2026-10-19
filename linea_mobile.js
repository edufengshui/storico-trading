// SOLO LA LINEA MOBILE (S58, 19/10/2026). Edu: "semplifichiamo al massimo e guardiamo solo la linea mobile. La partenza ci dice
// come il cross e' partito, l'arrivo come finisce". Letture fissate PRIMA di misurare, nessun parametro preso dai dati.
// Uso: node linea_mobile.js [dump]
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), fs = require('fs');
const WX = { '子':'W','丑':'E','寅':'L','卯':'L','辰':'E','巳':'F','午':'F','未':'E','申':'M','酉':'M','戌':'E','亥':'W' };
const GEN = { L:'F', F:'E', E:'M', M:'W', W:'L' }, KE = { L:'E', E:'W', W:'F', F:'M', M:'L' };
const FZ = (el, m) => { const s = WX[m]; return el === s ? 2 : GEN[s] === el ? 1 : GEN[el] === s ? 0 : KE[s] === el ? -2 : -1; };   // 旺2 相1 休0 囚-1 死-2
const AV = { '寅':'卯','卯':'辰','巳':'午','午':'未','申':'酉','酉':'戌','亥':'子','子':'丑' }, RE = {}; Object.keys(AV).forEach(k => RE[AV[k]] = k);
const V = {};
const add = (k, dir, r) => { if (!dir) return; const real = r.move > 0 ? 'LONG' : 'SHORT', ok = dir === real; for (const p of ['tutto', r.date < '2024' ? '2020-23' : '2024-26', r.date >= '2026-09-08' ? 'dal 08/09/26' : null]) { if (!p) continue; const o = V[k] = V[k] || {}; o[p] = o[p] || [0, 0, 0]; o[p][0]++; o[p][1] += ok; o[p][2] += ok ? Math.abs(r.move) : -Math.abs(r.move); } };
for (const r of JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
  const L = R.linee[R.mutante.pos - 1], dep = R.mutante.ramoDep, arr = R.mutante.ramoArr, dE = WX[dep], aE = WX[arr];
  const trend = r.ema === 'up' ? 'LONG' : 'SHORT', contro = trend === 'LONG' ? 'SHORT' : 'LONG';
  const fd = FZ(dE, r.mese), fa = FZ(aE, r.mese);
  // 1. la linea cambia: yin -> yang (sale) LONG, yang -> yin (scende) SHORT
  add('1 yin->yang = LONG, yang->yin = SHORT', L.yang ? 'SHORT' : 'LONG', r);
  // 2. l'arrivo e' piu' forte della partenza nel mese -> finisce meglio di come parte -> LONG
  add('2 arrivo piu\' forte della partenza nel mese -> LONG (piu\' debole -> SHORT)', fa > fd ? 'LONG' : fa < fd ? 'SHORT' : null, r);
  // 3. l'arrivo nutre la partenza (genera o stesso elemento) -> LONG; la colpisce (controlla) -> SHORT
  add('3 l\'arrivo genera la partenza -> LONG, la controlla -> SHORT', GEN[aE] === dE ? 'LONG' : KE[aE] === dE ? 'SHORT' : null, r);
  // 4. la partenza si consuma (genera l'arrivo) o colpisce l'arrivo
  add('4 la partenza genera l\'arrivo -> SHORT, lo controlla -> LONG', GEN[dE] === aE ? 'SHORT' : KE[dE] === aE ? 'LONG' : null, r);
  // 5. avanza (进神) -> LONG, retrocede (退神) -> SHORT
  add('5 avanza -> LONG, retrocede -> SHORT', AV[dep] === arr ? 'LONG' : RE[dep] === arr ? 'SHORT' : null, r);
  // le stesse letture col trend: positivo -> segue il trend, negativo -> non segue
  add('2T arrivo piu\' forte -> segue il trend, piu\' debole -> no', fa > fd ? trend : fa < fd ? contro : null, r);
  add('3T arrivo genera la partenza -> segue, la controlla -> no', GEN[aE] === dE ? trend : KE[aE] === dE ? contro : null, r);
  add('5T avanza -> segue, retrocede -> no', AV[dep] === arr ? trend : RE[dep] === arr ? contro : null, r);
  add('1T yin->yang -> segue, yang->yin -> no', L.yang ? contro : trend, r);
  // la linea mobile fa vincere o perdere il SUO trigramma (il LY: chi vince fra alto e basso)
  const alto = R.mutante.pos >= 4, vince = d => d ? (alto ? 'LONG' : 'SHORT') : (alto ? 'SHORT' : 'LONG');
  add('6 arrivo genera la partenza -> il suo trigramma vince; la controlla -> perde', GEN[aE] === dE ? vince(true) : KE[aE] === dE ? vince(false) : null, r);
  add('7 arrivo piu\' forte della partenza -> il suo trigramma vince; piu\' debole -> perde', fa > fd ? vince(true) : fa < fd ? vince(false) : null, r);
  add('8 avanza -> il suo trigramma vince; retrocede -> perde', AV[dep] === arr ? vince(true) : RE[dep] === arr ? vince(false) : null, r);
  add('9 il trigramma della linea mobile vince sempre', vince(true), r);
  add('0 seguire sempre il trend (riferimento)', trend, r);
}
for (const k of Object.keys(V).sort()) console.log(k.padEnd(62) + ['tutto', '2020-23', '2024-26', 'dal 08/09/26'].map(p => { const o = V[k][p]; return o ? p + ' ' + (100 * o[1] / o[0]).toFixed(1) + '% (' + o[0] + ', ' + (o[2] > 0 ? '+' : '') + o[2] + ')' : ''; }).join(' · '));
