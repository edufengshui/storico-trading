# RIPARTENZA S68 — OAP, terza giornata (dalla chat S67, 30/10/2026)

Leggere prima: questo file, poi RIPARTENZA_30_10_2026_S67.md (regole OAP 8-9, misure), S66 (regole OAP 1-7), S65, S64, S62 (regole di lavoro, formato, motore, kit).

## PROMEMORIA PRIVACY (Edu, da dire all'inizio — chiesto il 24/10)
Rendere privati i metodi del trading.
- storico-trading -> privato: su GitHub, Settings -> General -> Danger Zone -> Change visibility -> Private.
  Non tocca l'app e la raccolta notturna continua a girare.
- App trading: spostarla su Cloudflare Pages con Cloudflare Access, cosi' si apre solo con un codice mandato alla email di Edu.
  Dopo si puo' rendere privato anche il repo trading.

## ALL'INIZIO (invariato)
1. Trade della notte: git pull; unzip -o history_full_1h_f.zip history_full_1h_from20200129.json; node misura_vivo.js; git checkout del .json.
   Esiti del giorno: DUMPC=<file> node misura_vivo.js <ieri> <oggi>; poi qmdj_lavoro/notte.js <dump> (QMDJ DsHs/ZFTY e ore forti).
   Clonare con add_repo (edufengshui/storico-trading e edufengshui/trading). Push: add_repo con access "push", commit e push diretto.
   Kit: copiare qmdj_lavoro in /home/claude/qm, poi `npm i lunar-javascript` in /home/claude/qm (NODE_PATH=/home/claude/qm/node_modules).
   Rigenerare dump_vivo.json, dump_2020_26.json (~4 min, ORARIO=full1h.json) e lio_qmdj.json (node lio_qmdj2.js, ~5 min).
2. Promemoria privacy (sopra).
3. Poi l'OAP dalle coppie (sotto).

## FORMATO (correzioni di Edu)
- Le carte si mostrano in una PAGINA PUBBLICATA (artifact) con la carta disegnata dal renderer di XKDG e il mio commento accanto,
  non come elenco in chat (Edu, S67: "cosi' non va bene, serve una carta pubblicata e il tuo commento").
  Generatore: qmdj_lavoro/oap_pagina.js + oap_pagina.css (frammenti da render.js; le schede sono scritte a mano nell'array C).
- Accanto a ogni movimento "con" o "contro" il trend, mai i segni +/-. Non dimenticare i ponti verso lo ZF (Wu, View, Birth, mese, DS).

## TRADE DEL 29/10 (vivo)
Lio 3 trade 2 vinti -4 (a misura +8): EURJPY LONG forte +20, USDCAD LONG +5, AUDUSD LONG -29 (DsHs SHORT giusto). EURGBP fermo.
Ultimi 30 giorni Lio 62% +1.410. Settimana 26-29/10: 11 trade, 5 vinti, -77. Settimane brutte: 06-12/10 (9/21) e questa.
AUDUSD e' il cross debole del mese (7 vinti su 17, +23).

## PERCHE' LIO HA PERSO (domanda di Edu, S67)
Nelle perdite forti decide il Liu Yao (affidabilita' 61-80%) e trascina la conclusione: USDCAD 27/10 (LY 合全 64%, -35),
NZDUSD 28/10 (LY 日沖, PB tace, -51), AUDUSD 27/10. Nessun tipo di verdetto LY e' cattivo nel vivo: varianza.

## QMDJ COME CORREZIONE DI LIO (misure S67, niente cablato)
- "DsHs e ZFTY concordi contro Lio -> prendi il QMDJ": 26-30/10 -69 -> +59; 20-30/10 +343 -> +551; mese +1.410 -> +1.434 (20 cambi, 50%).
  Testa o croce sul mese; ZFTY e' in parte ottimista nel vivo (regole nate su queste carte).
- Mezza posizione quando DsHs e' contro Lio (qmdj_lavoro/vivo_qm.js + misura su lio_qmdj.json):
  vivo concorde 67% / contro 55%, ma storico 2020-23 68% / 65%, 2024-26 65% / 63%.
  Costerebbe -9.000 (2020-23) e -5.400 (2024-26). NON conviene. Lio resta com'e'.

## OAP MISURATO LARGO (qmdj_lavoro/oap_mis.js)
Regola: ramo dell'ora nel palazzo che decide (ZFTY, se no DsHs) + stelo in quel palazzo o in uno che lo genera; entrata a inizio ora,
uscita a fine ora, direzione della carta, 1,5 pip di costo.
- Settimana 26-29/10 sugli 11 giorni di Lio: Lio -85, OAP +63 (NZDUSD 28/10 丁丑 +65, USDCAD 27/10 庚午 辛未 +20, EURJPY 29/10 癸巳 +27).
- Storico: 2020-23 1.884 trade 43% -5.074 | 2024-26 1.680 44% -1.403 | vivo 93 54% +461. Con la direzione di Lio circa pari.
- Prova delle relazioni del ramo (qmdj_lavoro/rel.js): clash col ramo dell'ora 50%/40%, col giorno 47%/45%, 合 45%/44%,
  punizione col mese 41%/44%, stelo nel cielo del palazzo 45%/42%. Nessuna separa da sola. Le condizioni vanno lette nelle carte.

## COPPIE OAP (pagina pubblicata "Coppie OAP": https://claude.ai/artifact/A1eVcVrxcyuBeDii6u4ndB)
Carte con palazzo che decide giusto e, nello stesso palazzo, un'ora che muove e una ferma (qmdj_lavoro/oap_coppie2.js ne trova 15 dal 06/2025).
1. NZDUSD 28/10/2026 (癸未 乙亥 戊戌 丙午, yin 2), trend LONG, reale SHORT 51, decide Gen.
   丁丑 01-03 64 contro (丑 clasha il 未 dell'ora, punisce il 戌 del mese) | 戊寅 03-05 4 (寅亥 合 col giorno).
2. NZDUSD 26/11/2025 (辛未 己亥 丁亥 乙巳, yin 8), trend SHORT, reale LONG 75, decide Gen (fan yin).
   乙丑 01-03 59 contro (丑 clasha 未) | 丙寅 03-05 5 (寅亥 合). Stessa coppia della 1.
3. GBPUSD 14/10/2026 (己亥 辛酉 戊戌 丙午, yin 3), trend LONG, reale SHORT 68, decide Kun.
   甲午 11-13 60 contro (甲 nasconde 辛 = DS in Kun) | 乙未 13-15 49 contro (乙 nel cielo di Li che genera Kun) |
   丙申 15-17 5 (丙 nella terra di Kun e nel cielo di Dui con l'HS: accende ma non alimenta).
4. USDJPY 13/11/2025 (丁酉 丙戌 丁亥 乙巳, yin 9), trend LONG, reale SHORT 15, decide Kun (ZFTY, ponte Birth).
   壬辰 07-09 37 contro (辰 vuoto ma clasha il 戌 del giorno) | 丙申 15-17 1 (ora del DS dentro il palazzo della controparte).
Mia ipotesi: muove l'ora il cui ramo clasha un pilastro (3 su 4) o il cui stelo porta qi al palazzo che decide; resta ferma l'ora
col ramo in 合 o con lo stelo dal lato della controparte. Edu NON ha ancora risposto: chiedergli cosa vede lui.

## DOMANDE APERTE PER EDU
1. Coppie OAP: cosa separa l'ora che muove da quella ferma.
2. NZDUSD 28/10: 丁丑 si legge come ramo nel palazzo che decide + stelo nel palazzo che lo genera? Conta 丑戌 sul mese?
3. (da S66) Come intende il TY quando non coincide con l'HS.
4. (da S66) Accendere la variante "DsHs fermo + DS con lo ZF sopra l'HS -> contro" (+1.400 storico, vivo 3 su 3)? Aveva detto "aspetta".

## KIT NUOVO (qmdj_lavoro)
vivo_qm.js (Lio contro DsHs/ZFTY nel vivo), oap_mis.js (OAP largo), oap_coppie2.js (coppie ora che muove/ferma),
info3.js "CROSS|data" (dettaglio carta: palazzi, vuoti, ore con pip e palazzo dello stelo), rel.js (relazioni del ramo),
carta_info.js CROSS data, oap_pagina.js + oap_pagina.css (pagina delle carte). Gli script con helper copiati da oap_mis.js
(oap_coppie2, info3, rel) sono autonomi.
