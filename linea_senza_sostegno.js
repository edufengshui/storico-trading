// LA LINEA MOBILE SENZA SOSTEGNO (S58, Edu 20/10/2026, EURJPY 17/06/2026 s186): "la linea e' molto debole ... il potenziale ritiro
// della linea ci fa comunque capire che il trend non tiene" · "Non ha sostegno perche' l'unica linea Zi acqua su L5 e' vuota. Il mese
// e' Wu e il giorno e' Xu". Sostegno = una linea non vuota dell'elemento che genera la mobile, oppure il mese o il giorno che la
// generano o sono del suo stesso elemento. Senza sostegno -> il trend non tiene (opposto al trend).
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), fs = require('fs');
const WX = { '子':'W','丑':'E','寅':'L','卯':'L','辰':'E','巳':'F','午':'F','未':'E','申':'M','酉':'M','戌':'E','亥':'W' };
const GEN = { L:'F', F:'E', E:'M', M:'W', W:'L' }, AV = { '寅':'卯','卯':'辰','巳':'午','午':'未','申':'酉','酉':'戌','亥':'子','子':'丑' }, RE = {}; Object.keys(AV).forEach(k => RE[AV[k]] = k);
const V = {}, add = (k, opposto, r) => { const ok = ((r.ema === 'up') === (r.move > 0)) !== opposto; for (const p of ['tutto', r.date < '2024' ? '2020-23' : '2024-26', r.date >= '2026-09-08' ? 'dal 08/09/26' : null]) { if (!p) continue; V[k] = V[k] || {}; const o = V[k][p] = V[k][p] || [0, 0, 0]; o[0]++; o[1] += ok; o[2] += ok ? Math.abs(r.move) : -Math.abs(r.move); } };
for (const r of JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
  const m = R.mutante, e = WX[m.ramoDep], vuoti = R.vuoti || [];
  const daLinee = R.linee.some(L => L.pos !== m.pos && GEN[WX[L.ramo]] === e && !vuoti.includes(L.ramo));
  const daMese = WX[r.mese] === e || GEN[WX[r.mese]] === e, daGiorno = WX[r.ramo] === e || GEN[WX[r.ramo]] === e;
  const senza = !daLinee && !daMese && !daGiorno, ret = RE[m.ramoDep] === m.ramoArr;
  if (senza && ret) add('A retrocede e senza sostegno -> il trend non tiene', true, r);
  if (senza) add('B mobile senza sostegno (qualunque movimento) -> il trend non tiene', true, r);
  if (!senza && ret) add('C retrocede ma sostenuta -> il trend non tiene', true, r);
  if (senza && !ret) add('D senza sostegno, non retrocede -> il trend non tiene', true, r);
  add('Z riferimento: sempre opposto al trend', true, r);
}
for (const k of Object.keys(V).sort()) console.log(k.padEnd(56) + ['tutto', '2020-23', '2024-26', 'dal 08/09/26'].map(p => { const o = V[k][p]; return o ? p + ' ' + (100 * o[1] / o[0]).toFixed(1) + '% (' + o[0] + ', ' + (o[2] > 0 ? '+' : '') + o[2] + ')' : ''; }).join(' · '));
