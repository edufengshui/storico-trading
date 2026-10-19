// VOCI DA MODULI (S58, 19/10/2026): calcola tutte le voci di ogni carta del dump coi MODULI attuali (livello_d.js,
// livello_ly.js, livello_pb.js, livello_dlr.js, colpo_mese.js, lettura_trend.js), non coi cataloghi in memoria.
// Serve per la prova pulita: rigenera_cataloghi.sh DUMP FINO_A (cataloghi solo dalle carte prima di FINO_A), poi
// node voci_da_moduli.js DUMP OUT -> le voci di TUTTE le carte, e si misura solo dopo FINO_A.
const D = __dirname; global.window = global; const lj = require(D + '/node_modules/lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const fs = require('fs'), LYM = require(D + '/liuyao.js'), IV = require(D + '/inventario_carta.js'), LT = require(D + '/lettura_trend.js'), SD = require(D + '/livello_d.js'),
  SL = require(D + '/livello_ly.js'), SP = require(D + '/livello_pb.js'), SDL = require(D + '/livello_dlr.js'), CM = require(D + '/colpo_mese.js'), PBM = require(D + '/plumblossom.js');
const ST = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'], BR = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WU = { '甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬' };
const out = [];
for (const r of JSON.parse(fs.readFileSync(process.argv[2] || '/tmp/tresist.json', 'utf8')).filter(r => r.ema && Math.abs(r.move) >= 20)) {
  const yp = lj.Solar.fromYmdHms(...r.date.split('-').map(Number), 8, 0, 0).getLunar().getYearInGanZhiExact();
  const R = LYM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo); if (!R || R.error || !R.mutante) continue;
  const ms = ST[((ST.indexOf(yp[0]) % 5) * 2 + 2 + ((BR.indexOf(r.mese) + 10) % 12)) % 10], hs = ST[(ST.indexOf(WU[r.stelo]) + BR.indexOf(R.oraBranch)) % 10];
  const ctx = () => ({ dayBranch: r.ramo, monthBranch: r.mese, yearBranch: yp[1], oraBranch: R.oraBranch, dayStem: r.stelo, yearStem: yp[0], monthStem: ms, hourStem: hs, emaDir: r.ema });
  const inv = IV.inventario(R, ctx()), mt = LT.leggi(R, ctx());
  const carta = { steloGiorno: r.steloGiorno, R1: r.R1, R2: r.R2, R3: r.R3, R4: r.R4, ramoMese: r.ramoMese || r.mese, vuoti: r.vuoti, treMessaggi: { chu: r.M1 },
    spiritoR1: r.spR1, spiritoR2: r.spR2, spiritoR3: r.spR3, spiritoR4: r.spR4, generaleOra: r.genOra, metodo: r.metodo, oraRamo: r.ora, ramoAnno: yp[1] };
  out.push({ cross: r.cross, date: r.date, real: r.move > 0 ? 'LONG' : 'SHORT', move: r.move, trend: r.ema === 'up' ? 'LONG' : 'SHORT',
    PB: r.pb || null, LY: r.ly || null, AT: r.at || null, DLR: r.dlr || null, LETT: r.lett || null, MT: (mt && mt.dir) || null,
    D: SD.leggi(R, ctx(), IV).dir || null, LYF: SL.leggi(R, ctx(), IV, SD).dir || null,
    PBF: SP.leggi(PBM.read(r.seed, r.ramo, r.mese, yp[1], r.stelo, r.emaRun), r.ema).dir || null,
    DLRF: r.R1 ? (SDL.leggi(carta).dir || null) : null, CM: CM.leggi(inv, r.mese).dir || null });
}
fs.writeFileSync(process.argv[3] || '/tmp/voci_moduli.json', JSON.stringify(out));
console.log('voci calcolate su ' + out.length + ' carte');
