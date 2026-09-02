'use strict';
// ============================================================================
//  MOTORE DLR — motore direzionale del Da Liu Ren, nuovo impianto (Edu, 02/09/2026)
//  Sostituisce il precedente motore DLR basato sul trend, che non funzionava.
//  NON tocca il LY (liuyao.js) ne' il PB (plumblossom.js): sono sistemi separati.
//
//  DOMANDA: la carta e' direzionale. Host = prima valuta del cross, Guest = seconda.
//  Host vince -> LONG. Guest vince -> SHORT. Nessun attore riconosciuto -> TACE.
//
//  Host  = stelo del giorno, seduto nel suo palazzo (寄宮); la sua testa e' la 1a lezione.
//  Guest = ramo del giorno; la sua testa e' la 3a lezione.
//  LINGUA COMUNE (fissata con Edu il 02/09/2026):
//    caratteri  B (兄弟 Fratelli) · C (子孫 Figli) · W (妻財 Ricchezza)
//               O (官 Ufficiale)  · G (鬼 Fantasma) · P (父母 Genitori)
//    letture    R1 R2 R3 R4   (R1 sta sopra lo stelo del giorno, R3 sopra il ramo del giorno)
//    messaggi   M1 M2 M3
// ============================================================================

// ---- 寄宮: quale stelo abita ciascun ramo (tabella dettata da Edu, 02/09/2026) ----
// 甲 in 寅 · 乙 in 辰 · 丙 e 戊 in 巳 · 丁 e 己 in 未 · 庚 in 申 · 辛 in 戌 · 壬 in 亥 · 癸 in 丑
// I rami 子 卯 午 酉 NON ospitano alcuno stelo.
const STELI_DENTRO = {
  '寅': ['甲'], '辰': ['乙'], '巳': ['丙', '戊'], '未': ['丁', '己'],
  '申': ['庚'], '戌': ['辛'], '亥': ['壬'], '丑': ['癸']
};

// ---- 天干五合: combinazione fra steli ----
const COMBINA_STELI = { '甲':'己','己':'甲','乙':'庚','庚':'乙','丙':'辛','辛':'丙','丁':'壬','壬':'丁','戊':'癸','癸':'戊' };

// ---- elementi ----
const EL_STELO = { '甲':'Legno','乙':'Legno','丙':'Fuoco','丁':'Fuoco','戊':'Terra',
                   '己':'Terra','庚':'Metallo','辛':'Metallo','壬':'Acqua','癸':'Acqua' };
const EL_RAMO  = { '子':'Acqua','丑':'Terra','寅':'Legno','卯':'Legno','辰':'Terra','巳':'Fuoco',
                   '午':'Fuoco','未':'Terra','申':'Metallo','酉':'Metallo','戌':'Terra','亥':'Acqua' };
const GENERA   = { 'Legno':'Fuoco','Fuoco':'Terra','Terra':'Metallo','Metallo':'Acqua','Acqua':'Legno' };
const CONTROLLA= { 'Legno':'Terra','Terra':'Acqua','Acqua':'Fuoco','Fuoco':'Metallo','Metallo':'Legno' };

// ---- parentela di un ramo rispetto allo stelo del giorno (codici DLR: P/O/G/B/C/W) ----
// P = 父母 Genitori · O = 官 Ufficiale · G = 鬼 Fantasma · B = 兄弟 Fratelli
// C = 子孫 Figli · W = 妻財 Ricchezza
const RAMI_YANG = ['子','寅','辰','午','申','戌'];
function parentela(steloGiorno, ramo) {
  const d = EL_STELO[steloGiorno], e = EL_RAMO[ramo];
  if (d === e) return 'B';
  if (GENERA[d] === e) return 'C';
  if (GENERA[e] === d) return 'P';
  if (CONTROLLA[d] === e) return 'W';
  // il ramo controlla lo stelo: stessa polarita' = G (鬼), polarita' opposta = O (官)
  const steloYang = ['甲','丙','戊','庚','壬'].includes(steloGiorno);
  const ramoYang  = RAMI_YANG.includes(ramo);
  return (steloYang === ramoYang) ? 'G' : 'O';
}

// ---- FORME FUORI SELEZIONE (Edu, 02/09/2026) --------------------------------
// Il motore non legge queste carte: la distinzione host/guest non e' leggibile.
//  · 八專 (Otto Specialita'): il palazzo dello stelo del giorno coincide col ramo del
//    giorno (甲寅, 丁未, 己未, 癸丑). Host e guest occupano lo stesso palazzo e le
//    quattro lezioni si riducono a due.
//  · 冬蛇掩目 (Winter Snake, il serpente d'inverno che si copre gli occhi): 昴星 in
//    giorno yin. Escluso su indicazione di Edu.
//  · 虎視轉蓬 (昴星 in giorno yang), stessa famiglia.
//  · 伏吟 (il ronzio nascosto) e 返吟 (il ronzio che torna): carte immobili o rovesciate.
function fuoriSelezione(carta) {
  const m = carta.metodo || '';
  if (carta.palazzoHost === carta.ramoGiorno) return '八專 (Otto Specialita\')';
  if (m.indexOf('昴星') >= 0) {
    const yin = ['乙','丁','己','辛','癸'].includes(carta.steloGiorno);
    return yin ? '冬蛇掩目 (Winter Snake)' : '虎視轉蓬 (stessa famiglia di 昴星)';
  }
  if (m.indexOf('伏吟') >= 0) return '伏吟 (il ronzio nascosto)';
  if (m.indexOf('返吟') >= 0) return '返吟 (il ronzio che torna)';
  return null;
}

// ============================================================================
//  VIE DEL MOTORE — in ordine di precedenza. La prima che parla decide.
// ============================================================================

// --- VIA 1 · IL LEGAME DELLO HOST ------------------------------------------
// Nasce dalla carta USDJPY 11/02/2026 seme 154, letta da Edu il 02/09/2026.
// Lo stelo che abita il ramo del giorno (lato guest) COMBINA 天干五合 con lo stelo
// che abita R1. Lo host resta agganciato a quel ramo.
// Il verso lo decide COSA sia quel ramo per lo stelo del giorno:
//   · se e' la sua Ricchezza (W), il legame gli conviene: lo host tiene -> LONG
//   · se e' qualunque altra cosa (P/O/G/B/C), lo host resta legato a cio' che non
//     gli serve e cede -> SHORT
// Misura 02/09/2026 (soglia 20 pip, 9 cross, 2020-2026):
//   W su R1        n 51   41,2% SHORT  =  58,8% LONG   z 1,26   vec 61,5 / rec 52,2
//   niente W su R1 n 187  59,4% SHORT                  z 2,56   vec 55,7 / rec 61,8
// Controprova (fondamentale: il segnale e' della COMBINAZIONE, non dell'assenza di W):
//   senza combinazione, W su R1        n 427   47,1% SHORT
//   senza combinazione, niente W su R1 n 1653  48,1% SHORT
// AVVERTENZA DOTTRINALE: sul ramo W il verso misurato e' OPPOSTO alla lettura che Edu
// ha dato della carta guida (lui legge la Ricchezza come bloccata, quindi host che
// perde). Il conflitto e' aperto e va sciolto da Edu, non dai numeri.
function via1_legameDelloHost(c) {
  const dentroDB = STELI_DENTRO[c.ramoGiorno];
  const dentroR1 = STELI_DENTRO[c.R1];
  if (!dentroDB || !dentroR1) return null;
  const legato = dentroDB.some(a => dentroR1.some(b => COMBINA_STELI[a] === b));
  if (!legato) return null;
  const par = parentela(c.steloGiorno, c.R1);
  if (par === 'W') return {
    dir: 'LONG', via: 'il legame dello host',
    perche: 'lo stelo ' + dentroDB.join('/') + ' che abita il ramo del giorno ' + c.ramoGiorno +
            ' combina con ' + dentroR1.join('/') + ' che abita ' + c.R1 +
            ', e ' + c.R1 + ' e\' la Ricchezza (W) dello stelo del giorno: il legame tiene lo host'
  };
  return {
    dir: 'SHORT', via: 'il legame dello host',
    perche: 'lo stelo ' + dentroDB.join('/') + ' che abita il ramo del giorno ' + c.ramoGiorno +
            ' combina con ' + dentroR1.join('/') + ' che abita ' + c.R1 +
            ', e ' + c.R1 + ' e\' ' + par + ' per lo stelo del giorno: lo host resta legato a cio\' che non gli serve'
  };
}

// --- relazione fra il RAMO DEL GIORNO e il ramo posato SU R1 ---------
// Cinque casi, come li ha ordinati Edu (02/09/2026):
//   'genera'    il ramo del giorno genera R1
//   'controlla' il ramo del giorno controlla R1
//   'subisce'   il ramo del giorno e' controllato da R1
//   'drena'     il ramo del giorno drena R1 (quello lo genera)
//   'pari'      stesso elemento (比和)
function casoDBversoR1(c) {
  const eDB = EL_RAMO[c.ramoGiorno], eSH = EL_RAMO[c.R1];
  if (eDB === eSH) return 'pari';
  if (GENERA[eDB] === eSH) return 'genera';
  if (CONTROLLA[eDB] === eSH) return 'controlla';
  if (CONTROLLA[eSH] === eDB) return 'subisce';
  return 'drena';
}
// Il vuoto non agisce: se il ramo del giorno o quello su R1 sono nei 旬空
// del giorno, queste vie tacciono.
function vuotoInGioco(c) {
  const V = c.vuoti || [];
  return V.indexOf(c.ramoGiorno) >= 0 || V.indexOf(c.R1) >= 0;
}

// --- VIA 2 · IL PARI FRA IL RAMO DEL GIORNO E IL RAMO SU R1 ---------
// Quando il ramo del giorno e R1 sono dello STESSO elemento
// (比和), nessuno dei due prevale sull'altro e a decidere resta che cosa quel ramo
// SIA per lo stelo del giorno. L'ordine che ne esce e' leggibile: le parentele che
// aggrediscono lo stelo del giorno lo fanno cedere, quelle che lo sostengono o che
// lui stesso produce lo tengono in piedi.
//   O (官 Ufficiale)   SHORT   n 52   67,3%  z 2,50   vec 65,5 / rec 71,4
//   G (鬼 Fantasma)    SHORT   n 63   60,3%  z 1,64   vec 59,3 / rec 61,3
//   W (妻財 Ricchezza) SHORT   n 121  56,2%  z 1,36   vec 52,2 / rec 56,3
//   C (子孫 Figli)     LONG    n 106  59,4%  z 1,94   vec 56,7 / rec 59,5
//   P (父母 Genitori)  LONG    n 125  58,4%  z 1,88   vec 50,9 / rec 69,8
//   B (兄弟 Fratelli)  n 80, 51,3%: nessun segnale, la via TACE
// Tutte e cinque hanno i due periodi dalla stessa parte. Misure 02/09/2026, soglia 20.
const DIREZIONE_PARI_R1 = { O: 'SHORT', G: 'SHORT', W: 'SHORT', C: 'LONG', P: 'LONG' };
function via2_pariSuR1(c) {
  if (vuotoInGioco(c)) return null;
  if (casoDBversoR1(c) !== 'pari') return null;
  const par = parentela(c.steloGiorno, c.R1);
  const dir = DIREZIONE_PARI_R1[par];
  if (!dir) return null;                       // B: la via tace
  return { dir: dir, via: 'il pari su R1',
    perche: 'il ramo del giorno ' + c.ramoGiorno + ' e R1 ' + c.R1 +
            ' sono dello stesso elemento (' + EL_RAMO[c.ramoGiorno] + '), nessuno prevale; ' +
            'su R1 c\'e\' ' + par + ', che ' +
            (dir === 'SHORT' ? 'aggredisce o svuota lo stelo del giorno' : 'sostiene lo stelo del giorno') };
}

// --- VIA 3 · LE CASELLE ISOLATE --------------------------------------------
// Caselle misurate il 02/09/2026 fuori dal blocco del pari, tenute solo se hanno
// almeno 60 carte e i due periodi dalla stessa parte. In ordine di forza.
//   il ramo del giorno GENERA i Figli (C) su R1     SHORT  n 78  61,5%  z 2,04  vec 64,9 / rec 63,2
//   il ramo del giorno DRENA la Ricchezza (W) su R1 LONG   n 61  62,3%  z 1,92  vec 70,4 / rec 53,3
//   il ramo del giorno E' CONTROLLATO dai Fratelli (B)      SHORT  n 69  56,5%  z 1,08  vec 54,8 / rec 57,6
//   il ramo del giorno CONTROLLA i Genitori (P)             SHORT  n 92  55,4%  z 1,04  vec 55,3 / rec 56,8
//   il ramo del giorno CONTROLLA la Ricchezza (W)           SHORT  n 73  54,8%  z 0,82  vec 53,8 / rec 51,2
//   il ramo del giorno DRENA i Fratelli (B)                 LONG   n 88  54,5%  z 0,85  vec 55,2 / rec 52,9
//   il ramo del giorno GENERA la Ricchezza (W)              LONG   n 71  54,9%  z 0,83  vec 51,4 / rec 54,5
const CASELLE_ISOLATE = {
  'genera|C':    'SHORT', 'drena|W':     'LONG',
  'subisce|B':   'SHORT', 'controlla|P': 'SHORT',
  'controlla|W': 'SHORT', 'drena|B':     'LONG',
  'genera|W':    'LONG'
};
function via3_caselleIsolate(c) {
  if (vuotoInGioco(c)) return null;
  const caso = casoDBversoR1(c);
  if (caso === 'pari') return null;            // il pari lo tratta la via 2
  const par = parentela(c.steloGiorno, c.R1);
  const dir = CASELLE_ISOLATE[caso + '|' + par];
  if (!dir) return null;
  const VERBO = { genera:'genera', controlla:'controlla', subisce:'e\' controllato da', drena:'drena' };
  return { dir: dir, via: 'casella isolata',
    perche: 'il ramo del giorno ' + c.ramoGiorno + ' ' + VERBO[caso] + ' ' + c.R1 +
            ' posato su R1, che per lo stelo del giorno e\' ' + par };
}

// --- VIA 4 · LA COPPIA R1 / R2 ----------------------------------------------
// R2 e' lo spirito Yin (陰神) di R1: sta sopra di lui e lo condiziona. La relazione
// elementare fra i due non produce direzione (misurata: tutti e cinque i casi fra
// 47,4% e 51,3%); a produrla e' la COPPIA DEI CARATTERI.
// Quattro coppie non esistono mai, per come la piastra celeste dispone R2 sopra R1:
// B/G, G/G, G/O, O/O.
// Cablate solo le caselle con almeno 40 carte e i due periodi dalla stessa parte.
// Misure 02/09/2026, soglia 20 pip, vuoti esclusi (ne' R1 ne' R2 nei 旬空).
//   R1=G R2=P  SHORT  n 69   59,4%  z 1,57  vec 57,7 / rec 58,3
//   R1=G R2=C  SHORT  n 43   58,1%  z 1,07  vec 50,0 / rec 60,0
//   R1=C R2=C  SHORT  n 89   56,2%  z 1,17  vec 59,5 / rec 54,3
//   R1=W R2=W  LONG   n 49   63,3%  z 1,86  vec 65,2 / rec 60,0
//   R1=P R2=P  LONG   n 40   60,0%  z 1,26  vec 62,5 / rec 63,3
//   R1=C R2=W  LONG   n 141  56,0%  z 1,43  vec 48,3 / rec 58,9
//   R1=W R2=B  LONG   n 56   57,1%  z 1,07  vec 60,0 / rec 57,6
//   R1=W R2=C  LONG   n 57   56,1%  z 0,93  vec 47,4 / rec 62,9
// Scartate perche' i due periodi vanno in direzioni opposte: O/G, G/B, O/C, P/O,
// P/W, B/O, B/B. Scartata W/G (66,7% SHORT ma sole 27 carte).
// Due fili dottrinali emersi: (a) quando R2 RIPETE il carattere di R1 il segnale e'
// forte e stabile (W/W e P/P verso LONG, C/C verso SHORT; solo B/B e' rotto);
// (b) un G su R2 aggrava sempre, qualunque sia R1.
const COPPIA_R1_R2 = {
  'G|P': 'SHORT', 'G|C': 'SHORT', 'C|C': 'SHORT',
  'W|W': 'LONG',  'P|P': 'LONG',  'C|W': 'LONG',
  'W|B': 'LONG',  'W|C': 'LONG'
};
// VUOTO SU R2 (Edu, 02/09/2026): R2 e' lo spirito che CONDIZIONA, non il protagonista.
// Un condizionatore vuoto semplicemente non condiziona, quindi la coppia si legge lo
// stesso: il vuoto su R2 SI SALTA, come se non ci fosse.
// Misura del test A/B (soglia 20): sulle carte oggi mute per vuoto,
//   R2 vuoto · verdetto letto com'e'      n 53   56,6%  z 0,96  vec 56,0 / rec 59,3
//   R2 vuoto · verdetto rovesciato        n 53   43,4%
//   R1 vuoto · verdetto letto com'e'      n 205  51,2%  (saltare NON aiuta: R1 e' il
//                                          protagonista, resta muto e va ancora letto)
// Il verdetto rovesciato peggiora su tutte le 258 carte e in entrambi i periodi:
// l'ipotesi "il vuoto rompe quello che avrebbe fatto" e' esclusa.
// CAUTELA: il ramo su R2 e' scelto dopo aver visto i dati e vale z 0,96, cioe' dentro
// il rumore. Cablato per decisione di Edu, da riverificare quando il campione cresce.
function via4_coppiaR1R2(c) {
  const V = c.vuoti || [];
  if (!c.R2) return null;
  if (V.indexOf(c.R1) >= 0) return null;   // R1 vuoto: la via tace, il protagonista non c'e'
  const p1 = parentela(c.steloGiorno, c.R1), p2 = parentela(c.steloGiorno, c.R2);
  const dir = COPPIA_R1_R2[p1 + '|' + p2];
  if (!dir) return null;
  return { dir: dir, via: 'la coppia R1/R2',
    perche: 'su R1 c\'e\' ' + p1 + ' e su R2, che lo condiziona, c\'e\' ' + p2 };
}

// Ordine di precedenza: il legame fra steli parla per primo perche' e' l'unica via
// nata da una carta letta da Edu; poi il pari, poi le caselle isolate, e per ultima
// la coppia R1/R2, che raccoglie quello che le altre non hanno letto.
const VIE = [ via1_legameDelloHost, via2_pariSuR1, via3_caselleIsolate, via4_coppiaR1R2 ];

// --- VIA 5 · R2 PRENDE IL POSTO DI R1 VUOTO ---------------------------------
// Dottrina dettata da Edu (02/09/2026): quando R1 e' vuoto non va ne' ignorato ne'
// letto al contrario: e' ASSENTE. Il posto sopra lo stelo del giorno non resta libero,
// lo occupa chi gli sta immediatamente sopra, cioe' R2, che si comporta come fosse R1.
// La carta viene riletta da capo con R2 al posto di R1 (e senza R2, che non c'e' piu').
// Se anche R2 e' vuoto, la via tace.
// Misure 02/09/2026 (soglia 20), sulle 343 carte mute con R1 vuoto:
//   R2 al posto di R1, tutte        n 158  58,2%  z 2,07  +1.848 pip  vec 61,9 / rec 58,6
//     di cui via del pari su R1     n 74   63,5%  z 2,32  +1.483 pip  vec 71,4 / rec 61,0
//     di cui caselle isolate        n 83   53,0%  z 0,55
// Le tre ipotesi sul vuoto di R1 si separano nettamente:
//   leggerlo come se fosse pieno    51,2%  (niente)
//   rovesciare il verdetto          48,8%  (peggio)
//   farlo sostituire da R2          58,2%  (l'unica che produce)
function via5_R2prendeIlPostoDiR1(c) {
  const V = c.vuoti || [];
  if (!c.R2) return null;
  if (V.indexOf(c.R1) < 0) return null;       // vale solo se R1 e' vuoto
  if (V.indexOf(c.R2) >= 0) return null;      // anche R2 vuoto: nessuno prende il posto
  const sost = Object.assign({}, c, { R1: c.R2, R2: null });
  for (const via of VIE) {
    const v = via(sost);
    if (v && v.dir) return { dir: v.dir, via: 'R2 al posto di R1 vuoto',
      perche: 'R1 (' + c.R1 + ') e\' vuoto e non c\'e\'; il posto sopra lo stelo del giorno ' +
              'lo prende R2 (' + c.R2 + '), e da li\' ' + v.perche };
  }
  return null;
}

// Catena completa. La via 5 sta in fondo: interviene solo quando le altre hanno taciuto
// perche' R1 era vuoto.
const CATENA = VIE.concat([ via5_R2prendeIlPostoDiR1 ]);

// ============================================================================
//  LETTURA
// ============================================================================
// carta = { steloGiorno, ramoGiorno, palazzoHost, R1, R3, metodo,
//           vuoti:[], generaleMese, oraRamo, lezioni:[...], treMessaggi:{...} }
// ritorna { dir:'LONG'|'SHORT'|null, via, perche }  ·  dir null = il motore TACE
function leggi(carta) {
  const fuori = fuoriSelezione(carta);
  if (fuori) return { dir: null, via: null, perche: 'carta fuori selezione: ' + fuori };
  for (const via of CATENA) {
    const v = via(carta);
    if (v && v.dir) return v;
  }
  return { dir: null, via: null, perche: 'nessun attore riconosciuto: il motore tace' };
}

module.exports = { leggi, fuoriSelezione, parentela, STELI_DENTRO, COMBINA_STELI,
                   EL_STELO, EL_RAMO, GENERA, CONTROLLA, VIE, CATENA };
