// IL METODO SEMPLIFICATO (S58, Edu 19-20/10/2026): solo la linea mobile, letta rispetto al trend.
// "La partenza ci dice come il cross e' partito, l'arrivo come finisce" · "rispetto al trend sembra la spiegazione piu' ovvia"
// · "Stiamo parlando di un metodo semplificato in cui non conosciamo le regole complete" · "prendi la mia ultima correzione
// come prima regola". Le regole si aggiungono una alla volta, dettate da Edu, nell'ordine in cui le detta.
//   REGOLA 1 (Edu, 19/10/2026, EURUSD 22/01/2026 s116: "questa e' combinata e l'arrivo e' clashato, ovvio che non puo' cambiare
//   trend"): se la partenza della mobile e' combinata o clashata, oppure l'arrivo e' clashato o combinato (dal giorno o dal
//   mese), il movimento non si compie e la giornata NON cambia il trend -> segue il trend.
//   REGOLA 2 (Edu, 20/10/2026, EURJPY 17/06/2026 s186: "Non ha sostegno perche' l'unica linea Zi acqua su L5 e' vuota. Il mese
//   e' Wu e il giorno e' Xu" · "il potenziale ritiro della linea ci fa comunque capire che il trend non tiene"): se la mobile
//   non ha sostegno (nessuna linea non vuota che la genera, ne' mese ne' giorno che la generano o sono del suo elemento) ->
//   il trend non tiene, opposto al trend.
//   (in prova, non ancora regola) se il movimento si compie: l'arrivo che va contro la partenza (controlla, clash, 害) -> finisce
//   all'opposto del trend; l'arrivo che la sostiene (genera, stesso elemento, 合) -> segue.
// Uso: node metodo_semplificato.js [dump]
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), fs = require('fs');
const WX = { '子':'W','丑':'E','寅':'L','卯':'L','辰':'E','巳':'F','午':'F','未':'E','申':'M','酉':'M','戌':'E','亥':'W' };
const GEN = { L:'F', F:'E', E:'M', M:'W', W:'L' }, KE = { L:'E', E:'W', W:'F', F:'M', M:'L' };
const CL = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
const HE = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
const HAI = { '子':'未','未':'子','丑':'午','午':'丑','寅':'巳','巳':'寅','卯':'辰','辰':'卯','申':'亥','亥':'申','酉':'戌','戌':'酉' };
function leggi(d, a, giorno, mese, R) {
  const tocca = (b, x) => HE[x] === b || CL[x] === b;   // x combina o clasha b
  const fermo = [giorno, mese].some(x => tocca(d, x) || tocca(a, x));
  if (fermo) return { segue: true, regola: 'R1 movimento bloccato (partenza o arrivo combinati/clashati dal giorno o dal mese): non cambia il trend' };
  if (R && R.linee) { const e = WX[d], vuoti = R.vuoti || [], pos = R.mutante && R.mutante.pos;
    const daLinee = R.linee.some(L => L.pos !== pos && GEN[WX[L.ramo]] === e && !vuoti.includes(L.ramo));
    if (!daLinee && WX[mese] !== e && GEN[WX[mese]] !== e && WX[giorno] !== e && GEN[WX[giorno]] !== e)
      return { segue: false, regola: 'R2 mobile senza sostegno (nessuna linea, ne\' mese ne\' giorno la sostengono): il trend non tiene' }; }
  const dE = WX[d], aE = WX[a], contro = KE[aE] === dE || CL[a] === d || HAI[a] === d, sost = GEN[aE] === dE || aE === dE || HE[a] === d;
  if (contro && !sost) return { segue: false, regola: 'P movimento libero, l\'arrivo va contro la partenza: finisce all\'opposto del trend' };
  if (sost && !contro) return { segue: true, regola: 'P movimento libero, l\'arrivo sostiene la partenza: segue il trend' };
  return { segue: null, regola: 'tace' };
}
if (require.main === module) {
  const V = {}, add = (k, segue, r) => { if (segue == null) return; const tr = r.ema === 'up' ? 'LONG' : 'SHORT', dir = segue ? tr : (tr === 'LONG' ? 'SHORT' : 'LONG'), ok = dir === (r.move > 0 ? 'LONG' : 'SHORT');
    for (const p of ['tutto', r.date < '2024' ? '2020-23' : '2024-26', r.date >= '2026-09-08' ? 'dal 08/09/26' : null]) { if (!p) continue; V[k] = V[k] || {}; const o = V[k][p] = V[k][p] || [0, 0, 0]; o[0]++; o[1] += ok; o[2] += ok ? Math.abs(r.move) : -Math.abs(r.move); } };
  for (const r of JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).filter(r => Math.abs(r.move) >= 20 && r.ema)) {
    const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
    const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante || !R.mutante.pos) continue;
    const v = leggi(R.mutante.ramoDep, R.mutante.ramoArr, r.ramo, r.mese, R);
    add(v.regola, v.segue, r); add('TOTALE metodo semplificato', v.segue, r); add('seguire sempre il trend', true, r);
    const fermoG = [r.ramo].some(x => HE[x] === R.mutante.ramoDep || CL[x] === R.mutante.ramoDep || HE[x] === R.mutante.ramoArr || CL[x] === R.mutante.ramoArr);
    if (fermoG) add('R1 solo dal giorno', true, r);
  }
  for (const k of Object.keys(V).sort()) console.log(k.padEnd(104) + ['tutto', '2020-23', '2024-26', 'dal 08/09/26'].map(p => { const o = V[k][p]; return o ? p + ' ' + (100 * o[1] / o[0]).toFixed(1) + '% (' + o[0] + ', ' + (o[2] > 0 ? '+' : '') + o[2] + ')' : ''; }).join(' · '));
}
module.exports = { leggi };
