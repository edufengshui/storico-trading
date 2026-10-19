// PARTENZA E ARRIVO RISPETTO AL TREND (S58, 19/10/2026). Edu: "se inizia con Zi e finisce con Wei significa che finisce
// all'opposto nel modo in cui e' iniziata la giornata" · "rispetto al trend sembra la spiegazione piu' ovvia".
// L'arrivo che va CONTRO la partenza -> la giornata finisce all'opposto del trend; l'arrivo che la SOSTIENE -> segue il trend.
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), fs = require('fs');
const WX = { '子':'W','丑':'E','寅':'L','卯':'L','辰':'E','巳':'F','午':'F','未':'E','申':'M','酉':'M','戌':'E','亥':'W' };
const GEN = { L:'F', F:'E', E:'M', M:'W', W:'L' }, KE = { L:'E', E:'W', W:'F', F:'M', M:'L' };
const CL = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
const HE = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
const HAI = { '子':'未','未':'子','丑':'午','午':'丑','寅':'巳','巳':'寅','卯':'辰','辰':'卯','申':'亥','亥':'申','酉':'戌','戌':'酉' };
const XING = { '寅':'巳','巳':'申','申':'寅','丑':'戌','戌':'未','未':'丑','子':'卯','卯':'子' };
const V = {}, add = (k, segue, r) => { if (segue == null) return; const tr = r.ema === 'up' ? 'LONG' : 'SHORT', dir = segue ? tr : (tr === 'LONG' ? 'SHORT' : 'LONG'), ok = dir === (r.move > 0 ? 'LONG' : 'SHORT');
  for (const p of ['tutto', r.date < '2024' ? '2020-23' : '2024-26', r.date >= '2026-09-08' ? 'dal 08/09/26' : null]) { if (!p) continue; const o = (V[k] = V[k] || {})[p] = (V[k] || {})[p] || [0, 0, 0]; o[0]++; o[1] += ok; o[2] += ok ? Math.abs(r.move) : -Math.abs(r.move); } };
for (const r of JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
  const d = R.mutante.ramoDep, a = R.mutante.ramoArr, dE = WX[d], aE = WX[a];
  const contro = KE[aE] === dE || CL[a] === d || HAI[a] === d, sostiene = GEN[aE] === dE || aE === dE || HE[a] === d;
  add('A l\'arrivo controlla la partenza -> opposto al trend; la genera -> segue', KE[aE] === dE ? false : GEN[aE] === dE ? true : null, r);
  add('B contro (controlla, clash, 害) -> opposto; sostiene (genera, stesso elemento, 合) -> segue', contro && !sostiene ? false : sostiene && !contro ? true : null, r);
  add('C come B, piu\' la punizione (刑) fra i "contro"', (contro || XING[a] === d) && !sostiene ? false : sostiene && !(contro || XING[a] === d) ? true : null, r);
  add('D solo il 害 (come Zi -> Wei) -> opposto al trend', HAI[a] === d ? false : null, r);
  add('E solo l\'arrivo che controlla -> opposto al trend', KE[aE] === dE ? false : null, r);
  // Edu (19/10/2026, EURUSD 22/01/2026): "questa e' combinata e l'arrivo e' clashato, ovvio che non puo' cambiare trend".
  // Il movimento si compie solo se la partenza non e' combinata/clashata e l'arrivo non e' clashato/combinato: dal giorno (G)
  // oppure dal giorno o dal mese (GM, come sulla carta di Edu: mese Chou combina Zi e clasha Wei).
  const lib = (p, fonti) => fonti.every(b => HE[b] !== p && CL[b] === undefined || (HE[b] !== p && CL[b] !== p));
  const libero = fonti => lib(d, fonti) && lib(a, fonti);
  for (const [nome, fonti] of [['dal giorno', [r.ramo]], ['dal giorno o dal mese', [r.ramo, r.mese]]]) {
    const ok = libero(fonti);
    add('F movimento libero ' + nome + ': arrivo controlla/clash/害 -> opposto; genera/stesso/合 -> segue', !ok ? null : contro && !sostiene ? false : sostiene && !contro ? true : null, r);
    add('G movimento libero ' + nome + ': arrivo che controlla la partenza -> opposto al trend', ok && KE[aE] === dE ? false : null, r);
    add('H movimento BLOCCATO ' + nome + ': arrivo che controlla -> SEGUE il trend', !ok && KE[aE] === dE ? true : null, r);
  }
  add('0 seguire sempre il trend', true, r);
}
for (const k of Object.keys(V).sort()) console.log(k.padEnd(84) + ['tutto', '2020-23', '2024-26', 'dal 08/09/26'].map(p => { const o = V[k][p]; return o ? p + ' ' + (100 * o[1] / o[0]).toFixed(1) + '% (' + o[0] + ', ' + (o[2] > 0 ? '+' : '') + o[2] + ')' : ''; }).join(' · '));
