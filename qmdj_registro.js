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
    // S78 (Edu 25/11/2026): la BILANCIA scritta prima dell'entrata. Indicazioni del QMDJ (pesi a 1) + Lio (1 punto, 2 se forte).
    // Non decide niente: serve a contare in avanti.
    let bil = null;
    try { const b = Q.bilancia ? Q.bilancia(ch, tr) : null;
      if (b) { const pl = (t.forza || 'forte') === 'forte' ? 2 : 1, L = b.long + (t.signal === 'LONG' ? pl : 0), S = b.short + (t.signal === 'SHORT' ? pl : 0);
        bil = { qmdj: b.dir, long_qmdj: b.long, short_qmdj: b.short, long: L, short: S, dir: L > S ? 'LONG' : S > L ? 'SHORT' : null,
          voci: b.voci.map(v => (v.dir ? v.dir + ' ' + v.peso : '-') + ' | ' + v.t).concat([t.signal + ' ' + pl + ' | Lio ' + (t.forza || 'forte')]) };
        bil.verso = !bil.dir ? 'pari' : (bil.dir === t.signal ? 'per Lio' : 'contro Lio'); } } catch (e) {}
    // S79 (25/11/2026): il verdetto (qmdj) lo da' la bilancia; "cascata" = cosa avrebbe detto la vecchia cascata, per contare in avanti.
    righe.push({ cross: t.cross, lio: t.signal, forza: t.forza || '', trend: tr, seed: t.seed, qmdj: u.dir || null, da: u.da || null, cascata: u.cascata === undefined ? null : u.cascata, motivo: u.motivo || null, flusso: flussoTesto(Q, ch),
      verso: !u.dir ? 'muto' : (u.dir === t.signal ? 'accordo' : 'contro'), segueForte: !!u.segueForte, bilancia: bil });
  }
  arch[data] = { scritto: new Date().toISOString(), regole: regole, trades: righe };
  fs.writeFileSync(file, JSON.stringify(arch, null, 1));
  return arch[data];
}
// LOTTO (Edu 24/11/2026, "D'accordo con la tua proposta"): 0,02 solo sui trade FORTI di Lio col QMDJ unito d'accordo; 0,01 su tutto
// il resto. L'EA da' il lotto pieno solo quando il campo forza e' esattamente "forte": quindi un forte senza l'accordo del QMDJ
// esce come "forte-lotto-minimo". La forza vera di Lio resta in forza_lio. Se il verdetto manca (errore) si va al lotto minimo.
// S78 (25/11/2026, Edu: "dove Lio sta intorno al 50% non si trada!"; "non voglio che il disastro di una perdita continua su
// AUDUSD si ripeta"): caselle di Lio che NON vanno all'EA. AUDUSD debole contro il trend: Lio 46,7% (30) · 40,9% (22),
// unica casella sotto il 50% nei due periodi (ESITI_BILANCIA_25_11_2026.md). Il trade resta nel registro: si continua a misurarlo.
// EURGBP debole (col trend e contro): 50,6% · 50,7% (Edu 25/11/2026: "Ovvio").
const NON_TRADARE = [{ cross: 'AUDUSD', forza: 'debole', trend: 'contro' }, { cross: 'EURGBP', forza: 'debole' }];
// S78 (25/11/2026, Edu su EURJPY 06/11: "o il qimen interviene per aggiustare la decisione finale oppure bisogna capire perche' Lio
// ha sbagliato"): due tipi di trade dove Lio sta sotto il 50% nei due periodi (qmdj_lavoro/lio_voci_contro.js):
//   - Lio debole col sistema D contro: 36,7% (245) · 42,0% (193), in perdita di pip in tutti e due;
//   - Lio media col Semplificato E il qimen contro: 47,9% (146) · 45,4% (163), in perdita di pip in tutti e due.
// Le voci si leggono dal testo del registro ("Sistema D SHORT", "Semplificato SHORT"); il qimen da qmdj_live (verso 'contro').
// S79 (Edu 25/11/2026, flusso del qi): il percorso del qi del mese scritto in parole, PRIMA dell'entrata. Solo informazione: non decide.
function flussoTesto(Q, ch) { try { const f = Q.flussoQi && Q.flussoQi(ch); if (!f) return null;
  const N = { 1:'Kan', 2:'Kun', 3:'Zhen', 4:'Xun', 6:'Qian', 7:'Dui', 8:'Gen', 9:'Li' }, giro = v => v.map(k => N[k] + (k === f.zf ? ' (ZF)' : k === f.ty ? ' (TY)' : ch.palaces[k].zhiShi ? ' (ZS)' : k === f.pm ? ' (ramo del mese)' : '')).join(' genera ');
  if (f.zf === f.ty) return 'ZF e TY nello stesso palazzo';
  if (f.arrivaZF && f.arrivaTY) return f.viaTY.includes(f.zf) ? 'il qi passa dallo ZF e finisce sul TY: ' + giro(f.viaTY) : f.viaZF.includes(f.ty) ? 'il qi passa dal TY e finisce sullo ZF: ' + giro(f.viaZF) : 'il qi arriva a tutti e due: ' + giro(f.viaZF) + ' | ' + giro(f.viaTY);
  if (f.arrivaZF) return 'il qi del mese nutre lo ZF: ' + giro(f.viaZF);
  if (f.arrivaTY) return 'il qi del mese nutre il TY: ' + giro(f.viaTY);
  return 'il qi del mese (' + N[f.pm] + ') non arriva ne\' allo ZF ne\' al TY';
} catch (e) { return null; } }
function voce(t, nome) { const m = new RegExp('(?:^|[ ·‖]) ?' + nome + ' (LONG|SHORT)').exec(t.voci || t.decisore || ''); return m ? m[1] : null; }
function motivoNo(t, versoQm) {
  const fl = t.forza || 'forte', ct = (t.trend === 'LONG' || t.trend === 'SHORT') ? (t.trend === t.signal ? 'con' : 'contro') : null;
  if (NON_TRADARE.some(n => n.cross === t.cross && (!n.forza || n.forza === fl) && (!n.trend || n.trend === ct))) return 'casella del cross dove Lio sta intorno al 50%';
  const op = t.signal === 'LONG' ? 'SHORT' : 'LONG';
  if (fl === 'debole' && voce(t, 'Sistema D') === op) return 'Lio debole col sistema D contro';
  if (fl === 'media' && voce(t, 'Semplificato') === op && versoQm === 'contro') return 'Lio media col Semplificato e il qimen contro';
  return null;
}
function segnaliTrades(lio, qm) {
  const per = {}; ((qm && qm.trades) || []).forEach(r => { per[r.cross] = r.verso; });
  return lio.filter(t => !motivoNo(t, per[t.cross])).map(t => { const fl = t.forza || 'forte', v = per[t.cross] || 'manca';
    return { cross: t.cross, dir: t.signal, forza: fl !== 'forte' ? fl : (v === 'accordo' ? 'forte' : 'forte-lotto-minimo'), forza_lio: fl, qmdj: v }; });
}
function segnaliSaltati(lio, qm) { const per = {}; ((qm && qm.trades) || []).forEach(r => { per[r.cross] = r.verso; });
  return lio.map(t => ({ t, m: motivoNo(t, per[t.cross]) })).filter(x => x.m).map(x => ({ cross: x.t.cross, dir: x.t.signal, forza_lio: x.t.forza || 'forte', motivo: x.m })); }
module.exports = { aggiorna, segnaliTrades, segnaliSaltati };
if (require.main === module) {   // prova a mano: node qmdj_registro.js AAAA-MM-GG
  global.window = global; const lj = require('lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
  const reg = JSON.parse(fs.readFileSync(path.join(__dirname, 'registro_live.json'), 'utf8')), qm = aggiorna(reg, process.argv[2], __dirname);
  console.log(JSON.stringify(qm, null, 1));
  console.log(JSON.stringify(segnaliTrades((reg[process.argv[2]] || []).filter(t => t.livello === 'LI' && !t.cantina && (t.signal === 'LONG' || t.signal === 'SHORT')), qm)));
}
