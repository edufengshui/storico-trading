// Registro del sistema unito QMDJ sui trade di Lio (Edu 24/11/2026: "Procedi col sistema unito (Lio + qimen)").
// Ogni notte, PRIMA che il trade parta, scrive in qmdj_live.json cosa dice il QMDJ unito (ZFTY; DsHs dove lo ZFTY tace)
// su ogni trade di Lio del giorno: d'accordo, contro o muto. Non cambia i trade: serve a contare in avanti, con le regole
// del giorno (campo "regole" = impronta di qmdj.js). Una riga gia' scritta non viene piu' toccata.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const BR = '子丑寅卯辰巳午未申酉戌亥';
function aggiorna(reg, data, DIR) {
  const file = path.join(DIR, 'qmdj_live.json');
  let arch = {}; try { arch = JSON.parse(fs.readFileSync(file, 'utf8')); } catch (e) {}
  if (arch[data]) return arch[data];                       // gia' scritto: non si riscrive dopo l'esito
  if (!global.XKDGJieQiGMT) global.XKDGJieQiGMT = require(path.join(DIR, 'jieqi-gmt.js'));
  if (!global.XKDGSolarTime) global.XKDGSolarTime = require(path.join(DIR, 'solar-time.js'));
  const Q = require(path.join(DIR, 'qmdj.js'));
  const regole = crypto.createHash('md5').update(fs.readFileSync(path.join(DIR, 'qmdj.js'))).digest('hex').slice(0, 8);
  const p = data.split('-').map(Number), righe = [];
  for (const t of (reg[data] || [])) {
    if (t.livello !== 'LI' || t.cantina || (t.signal !== 'LONG' && t.signal !== 'SHORT') || !t.seed) continue;
    const tr = /LONG/i.test(t.trend) ? 'LONG' : /SHORT/i.test(t.trend) ? 'SHORT' : null; if (!tr) continue;
    const ch = Q.oraria(Date.UTC(p[0], p[1] - 1, p[2]), BR[((t.seed - 1) % 12 + 12) % 12]); if (!ch) continue;
    const u = Q.unito(ch, tr) || {};
    righe.push({ cross: t.cross, lio: t.signal, forza: t.forza || '', trend: tr, seed: t.seed, qmdj: u.dir || null, da: u.da || null,
      verso: !u.dir ? 'muto' : (u.dir === t.signal ? 'accordo' : 'contro'), segueForte: !!u.segueForte });
  }
  arch[data] = { scritto: new Date().toISOString(), regole: regole, trades: righe };
  fs.writeFileSync(file, JSON.stringify(arch, null, 1));
  return arch[data];
}
// LOTTO (Edu 24/11/2026, "D'accordo con la tua proposta"): 0,02 solo sui trade FORTI di Lio col QMDJ unito d'accordo; 0,01 su tutto
// il resto. L'EA da' il lotto pieno solo quando il campo forza e' esattamente "forte": quindi un forte senza l'accordo del QMDJ
// esce come "forte-lotto-minimo". La forza vera di Lio resta in forza_lio. Se il verdetto manca (errore) si va al lotto minimo.
function segnaliTrades(lio, qm) {
  const per = {}; ((qm && qm.trades) || []).forEach(r => { per[r.cross] = r.verso; });
  return lio.map(t => { const fl = t.forza || 'forte', v = per[t.cross] || 'manca';
    return { cross: t.cross, dir: t.signal, forza: fl !== 'forte' ? fl : (v === 'accordo' ? 'forte' : 'forte-lotto-minimo'), forza_lio: fl, qmdj: v }; });
}
module.exports = { aggiorna, segnaliTrades };
if (require.main === module) {   // prova a mano: node qmdj_registro.js AAAA-MM-GG
  global.window = global; const lj = require('lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
  const reg = JSON.parse(fs.readFileSync(path.join(__dirname, 'registro_live.json'), 'utf8')), qm = aggiorna(reg, process.argv[2], __dirname);
  console.log(JSON.stringify(qm, null, 1));
  console.log(JSON.stringify(segnaliTrades((reg[process.argv[2]] || []).filter(t => t.livello === 'LI' && !t.cantina && (t.signal === 'LONG' || t.signal === 'SHORT')), qm)));
}
