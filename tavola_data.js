// TAVOLA DELLA DATA (S58, 19/10/2026). Edu: "il prossimo passo deve consistere nel rendere prevedibile l'impatto di
// questi quattro fattori (ora, giorno, mese e anno) all'interno del sistema" · "Va bene, vai" (si parte dal mese).
// Metodo: ogni ipotesi viene dalla dottrina ed e' scritta PRIMA di misurare, con il verso che la dottrina prevede.
// Si misura su TUTTE le carte insieme (non forma per forma), con la domanda del LY: vince lo Shi o la Ying?
// (Shi in alto e lo Shi vince -> alto). Ogni ipotesi: n, % in cui la dottrina ha ragione, z, i due periodi.
// Uso: node tavola_data.js [pilastro: mese|giorno|ora|anno, default mese] [dump, default /tmp/tresist.json]
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const LYM = require(D + '/liuyao.js'), IV = require(D + '/inventario_carta.js'), fs = require('fs');
const PIL = process.argv[2] || 'mese', DUMP = process.argv[3] || '/tmp/tresist.json';
const ST = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], BR = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WUSHU = { '甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬' };
const WX = { '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water' };
const GEN = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' }, KE = { Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood' };
const COMB = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
const STG = { '旺': 2, '相': 1, '休': 0, '囚': -1, '死': -2 };
const stg = (el, m) => { const s = WX[m]; if (el === s) return '旺'; if (GEN[s] === el) return '相'; if (GEN[el] === s) return '休'; if (KE[s] === el) return '死'; if (KE[el] === s) return '囚'; return '休'; };
// dodici stadi della vita (Edu): partenze 長生 Legno 亥, Fuoco 寅, Terra 寅, Metallo 巳, Acqua 申
const CS = { Wood: '亥', Fire: '寅', Earth: '寅', Metal: '巳', Water: '申' };
const stadio = (el, b) => (BR.indexOf(b) - BR.indexOf(CS[el]) + 12) % 12;      // 0 長生 ... 4 帝旺 ... 8 墓 9 絕
const forteStadio = i => [0, 2, 3, 4].includes(i), deboleStadio = i => [6, 7, 8, 9].includes(i);
// forza stagionale dei trigrammi (Edu, 08/09/2026); numeri dei trigrammi 1 Qian 2 Dui 3 Li 4 Zhen 5 Xun 6 Kan 7 Gen 8 Kun
const TRIFORTE = { '寅':[4,5],'卯':[4,5],'辰':[4,5],'巳':[3,7,8],'午':[3,7,8],'未':[3,7,8],'申':[1,2],'酉':[1,2],'戌':[1,2],'亥':[6],'子':[6],'丑':[6] };

const carte = [];
for (const r of JSON.parse(fs.readFileSync(DUMP, 'utf8')).filter(r => Math.abs(r.move) >= 20)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error) continue;
  const ms = ST[((ST.indexOf(yp[0]) % 5) * 2 + 2 + ((BR.indexOf(r.mese) + 10) % 12)) % 10], hs = ST[(ST.indexOf(WUSHU[r.stelo]) + BR.indexOf(R.oraBranch)) % 10];
  const inv = IV.inventario(R, { dayBranch: r.ramo, monthBranch: r.mese, yearBranch: yp[1], oraBranch: R.oraBranch, dayStem: r.stelo, yearStem: yp[0], monthStem: ms, hourStem: hs, emaDir: r.ema });
  const shiAlto = R.shi >= 4;
  carte.push({ R, inv, date: r.date, mese: r.mese, giorno: r.ramo, ora: R.oraBranch, anno: yp[1], vinceShi: (r.move > 0) === shiAlto, move: Math.abs(r.move),
    triS: shiAlto ? R.sup : R.inf, triY: shiAlto ? R.inf : R.sup });
}
// ogni ipotesi: f(carta) -> 'S' (la dottrina dice: vince lo Shi), 'Y', oppure null (non si applica)
const tav = [];
function ipotesi(nome, f) {
  let n = 0, ok = 0; const per = [[0, 0], [0, 0]];
  carte.forEach(c => { const p = f(c); if (!p) return; const giusto = (p === 'S') === c.vinceShi; n++; ok += giusto; const k = c.date < '2023' ? 0 : 1; per[k][0]++; per[k][1] += giusto; });
  const a = n ? ok / n : 0, z = n ? (a - .5) / Math.sqrt(.25 / n) : 0;
  tav.push({ nome, n, a, z, p1: per[0][0] ? per[0][1] / per[0][0] : null, n1: per[0][0], p2: per[1][0] ? per[1][1] / per[1][0] : null, n2: per[1][0] });
}
const S = c => c.inv.linee[c.inv.shi - 1], Y = c => c.inv.linee[c.inv.ying - 1];
const lato = (cond, c) => cond(S(c)) && !cond(Y(c)) ? 'S' : cond(Y(c)) && !cond(S(c)) ? 'Y' : null;
const piu = (vS, vY) => vS > vY ? 'S' : vY > vS ? 'Y' : null;
const B = c => c[PIL];                    // il ramo del pilastro in esame

if (PIL === 'mese') {
  // M1 "Chi decide se una cosa e' in stagione: il MESE al 70% e l'ORA al 30%" -> la sede piu' in stagione vince
  ipotesi('M1 la sede piu\' in stagione (mese 70% + ora 30%) vince', c => { const f = L => .7 * STG[stg(L.el, c.mese)] + .3 * STG[stg(L.el, c.ora)]; return piu(f(S(c)), f(Y(c))); });
  ipotesi('M1b la sede piu\' in stagione (solo mese) vince', c => piu(STG[stg(S(c).el, c.mese)], STG[stg(Y(c).el, c.mese)]));
  ipotesi('M1c una sede di stagione (旺/相) e l\'altra no: vince quella di stagione', c => lato(L => ['旺','相'].includes(stg(L.el, c.mese)), c));
  // M2 "La forza di un elemento va letta coi DODICI STADI DELLA VITA" -> stadio forte contro stadio debole
  ipotesi('M2 dodici stadi: una sede in stadio forte, l\'altra in stadio debole', c => { const s = stadio(S(c).el, c.mese), y = stadio(Y(c).el, c.mese);
    return forteStadio(s) && deboleStadio(y) ? 'S' : forteStadio(y) && deboleStadio(s) ? 'Y' : null; });
  ipotesi('M2b dodici stadi: la sede in 帝旺/臨官 vince', c => lato(L => [3, 4].includes(stadio(L.el, c.mese)), c));
  ipotesi('M2c dodici stadi: la sede nella tomba (墓) o in 絕 perde', c => { const l = lato(L => [8, 9].includes(stadio(L.el, c.mese)), c); return l === 'S' ? 'Y' : l === 'Y' ? 'S' : null; });
  // M3 la sede sul ramo del mese e' la linea piu' forte
  ipotesi('M3 la sede sul ramo del mese vince', c => lato(L => L.ramo === c.mese, c));
  // M4 "un ramo formalmente vuoto che e' anche il ramo del mese ... e' riempito" + "la sede vuota perde"
  ipotesi('M4 la sede vuota perde (il ramo del mese la riempie)', c => { const v = L => L.vuoto && L.ramo !== c.mese; const l = lato(v, c); return l === 'S' ? 'Y' : l === 'Y' ? 'S' : null; });
  ipotesi('M4b sede vuota MA sul ramo del mese: non perde (vince)', c => lato(L => L.vuoto && L.ramo === c.mese, c));
  // M5 sede combinata e controllata dal mese: bloccata, perde (principio 4 del metodo)
  ipotesi('M5 sede combinata e controllata dal mese perde', c => { const l = lato(L => COMB[c.mese] === L.ramo && KE[WX[c.mese]] === L.el, c); return l === 'S' ? 'Y' : l === 'Y' ? 'S' : null; });
  ipotesi('M5b sede combinata dal mese (六合) vince', c => lato(L => COMB[c.mese] === L.ramo, c));
  // M6 la bestia del mese sulla sede: "le bestie sono li' per aiutare la propria linea" se compatibili (stesso, genera)
  ipotesi('M6 la bestia del mese aiuta la sede su cui cade (stesso elemento o la genera)', c => lato(L => (L.bestie || []).some(b => b.pilastro === 'mese' && ['stesso', 'genera'].includes(b.rel)), c));
  ipotesi('M6b la bestia del mese controlla la sede su cui cade: la sede perde', c => { const l = lato(L => (L.bestie || []).some(b => b.pilastro === 'mese' && b.rel === 'controlla'), c); return l === 'S' ? 'Y' : l === 'Y' ? 'S' : null; });
  // M9 (dopo aver visto M5 e M6b, quindi da provare su carte nuove): il mese COLPISCE la sede — la sua bestia la controlla,
  // oppure il ramo del mese la combina e la controlla — e la sede colpita perde
  const colpita = (L, c) => (L.bestie || []).some(b => b.pilastro === 'mese' && b.rel === 'controlla') || (COMB[c.mese] === L.ramo && KE[WX[c.mese]] === L.el);
  ipotesi('M9 il mese colpisce la sede (bestia che la controlla o 六合+controllo): perde', c => { const l = lato(L => colpita(L, c), c); return l === 'S' ? 'Y' : l === 'Y' ? 'S' : null; });
  ipotesi('M9b ... e la sede colpita e\' fuori stagione', c => { const l = lato(L => colpita(L, c) && !['旺','相'].includes(stg(L.el, c.mese)), c); return l === 'S' ? 'Y' : l === 'Y' ? 'S' : null; });
  // M7 forza stagionale dei TRIGRAMMI (tabella di Edu): il trigramma della sede forte nel mese, l'altro no
  ipotesi('M7 il trigramma forte nel mese (tabella di Edu) vince', c => { const t = TRIFORTE[c.mese]; const s = t.includes(c.triS), y = t.includes(c.triY); return s && !y ? 'S' : y && !s ? 'Y' : null; });
  // M8 "la forza nel mese decide se il colpo riesce": la mobile (non sede) che controlla una sede col suo arrivo
  ipotesi('M8 l\'arrivo DI STAGIONE della mobile controlla una sede: quella sede perde', c => { const m = c.inv.movimenti.find(z => z.tipo === 'mobile' && z.parte !== false);
    if (!m || !m.arrTimely || m.arrVuoto) return null; const v = (m.versoLinee || []).filter(x => x.sede && x.azioni.includes('la controlla')).map(x => x.sede);
    return v.length === 1 ? (v[0] === 'S' ? 'Y' : 'S') : null; });
  ipotesi('M8b l\'arrivo FUORI stagione della mobile controlla una sede: quella sede perde', c => { const m = c.inv.movimenti.find(z => z.tipo === 'mobile' && z.parte !== false);
    if (!m || m.arrTimely || m.arrVuoto) return null; const v = (m.versoLinee || []).filter(x => x.sede && x.azioni.includes('la controlla')).map(x => x.sede);
    return v.length === 1 ? (v[0] === 'S' ? 'Y' : 'S') : null; });
  ipotesi('M8c l\'arrivo DI STAGIONE della mobile genera una sede: quella sede vince', c => { const m = c.inv.movimenti.find(z => z.tipo === 'mobile' && z.parte !== false);
    if (!m || !m.arrTimely || m.arrVuoto) return null; const v = (m.versoLinee || []).filter(x => x.sede && x.azioni.includes('la genera')).map(x => x.sede);
    return v.length === 1 ? v[0] : null; });
}
const base = carte.filter(c => c.vinceShi).length / carte.length;
console.log('TAVOLA DELLA DATA — pilastro: ' + PIL.toUpperCase() + ' · ' + carte.length + ' carte >= 20 pip · lo Shi vince il ' + (100 * base).toFixed(1) + '%');
console.log('ipotesi della dottrina'.padEnd(78) + '    n  giusta     z   2020-22    2023-26');
tav.forEach(t => console.log(t.nome.padEnd(78) + String(t.n).padStart(5) + (100 * t.a).toFixed(1).padStart(7) + '%' + t.z.toFixed(1).padStart(6) +
  ((t.p1 != null ? (100 * t.p1).toFixed(0) + '%' : '-') + ' (' + t.n1 + ')').padStart(11) + ((t.p2 != null ? (100 * t.p2).toFixed(0) + '%' : '-') + ' (' + t.n2 + ')').padStart(11)));
fs.writeFileSync('/tmp/tavola_' + PIL + '.json', JSON.stringify(tav, null, 1));
