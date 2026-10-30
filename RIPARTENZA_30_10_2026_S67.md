# RIPARTENZA S67 — OAP, seconda giornata (dalla chat S66, 30/10/2026)

Leggere prima: questo file, poi RIPARTENZA_30_10_2026_S66.md (regole OAP 1-7, misure S65), S65, S64, S62 (regole di lavoro, formato, motore, kit).

## ALL'INIZIO (invariato)
1. Trade della notte: git pull; unzip -o history_full_1h_f.zip history_full_1h_from20200129.json; node misura_vivo.js; git checkout del .json.
   Esiti del giorno: DUMPC=<file> node misura_vivo.js <ieri> <oggi>; poi qmdj_lavoro/notte.js <dump> per QMDJ (DsHs/ZFTY) e ore forti.
   Clonare con add_repo (edufengshui/storico-trading e edufengshui/trading). Per il push: add_repo con access "push" su tutti e due,
   poi commit e push diretto (la "chiave" non serve piu'). Ogni regola accesa si pubblica subito.
2. Promemoria privacy (repo privato, app su Cloudflare Pages + Access).
3. Poi l'OAP dalla prossima carta (sotto).

## FORMATO (correzioni di Edu in S66)
- Accanto a ogni movimento scrivere "con" o "contro" il trend, MAI i segni +/- del prezzo (con trend SHORT un -54 sembrava contro).
- Non dimenticare i ponti verso lo ZF (Edu: "non puoi dimenticarti questo"): Wu, View, Birth, stelo del mese e ora lo stelo del giorno.

## TRADE DEL 29/10 (vivo, 4 cross nei dati)
Lio 3 trade 2 vinti -4 (a misura +8): EURJPY LONG forte +20, USDCAD LONG +5, AUDUSD LONG -29 (DsHs SHORT giusto). EURGBP fermo.
Ultimi 30 giorni Lio 62% +1.410.

## CABLATO IN S66 (repo trading, pubblicato, commit 8e00842)
- Ponte dello stelo del giorno (Edu, EURJPY 29/09: 丙 su Kun fra il TY in Li e lo ZF in Dui). "Il ponte del DS vale sempre, non solo per l'OAP".
  QMDJ_DS_PONTE 'tutti' nel preset ZFTY (in DsHs il DS e' un attore, non agisce). palDecide lo riconosce ('stelo del giorno').
  ZFTY 2020-23 52,6% +5.555 -> +5.483 | 2024-26 53,5% +6.559 -> 53,6% +6.682 | vivo 60,8% +786 invariato.

## CARTE LETTE IN S66
- EURJPY 15/10 (丁未 yin 3): NON segue (trend SHORT, LONG +40). La mia lettura S65 ("segue") era sbagliata, il codice giusto.
  Edu: View e 戊 su Kan drenano lo ZF (Qian), il TY (Kun) controlla Kan -> non segue; decide Kan (= palDecide ZFTY).
  OAP: 辛丑 01-03 41 contro (vedi regola 8); 戊申 15-17 15 contro (戊 cielo di Kan, 申 sotto il 庚 della terra di Kan).
- EURJPY 29/09 (丁酉 yin 4): segue (SHORT 51). DS 丙 in Kun genera Dui (ZF): ponte del DS. Ora 丁 su 壬 in Li (丁壬, TY legato).
  OAP 丙申 15-17 54 con (Edu: entrare a inizio ora, uscire a fine ora = 54 pip, piu' di tutta la giornata). 壬辰 07-09 32 con
  (壬 terra di Li, 辰 sotto quel 壬): Edu non ha confermato.
- GBPUSD 13/10 (丁亥 yin 3): NON segue (trend SHORT, LONG +43). DsHs fermo (Qian e Dui metallo), ZFTY "segue" sbaglia.
  Edu conferma: il DS 庚 (con lo ZF in Qian) poggia sul 丁 che lo controlla -> lo ZF perde. Nessuna ora OAP: movimenti 9-13 pip sparsi
  (丁丑, 庚辰, 乙酉, 壬午, tutti contro).

## REGOLE OAP NUOVE
8. (Edu, EURJPY 15/10) L'ora che clasha lo stelo sopra lo ZF del Di Pan (旬首 nascosto), quando quel palazzo genera lo ZF del Tian Pan
   ("lo ZF genera se stesso"): muove contro il trend. 辛丑: 丑 in Gen, 辛 clasha il 乙 sopra il 壬 di Gen; Gen genera Qian.
   Carte lette: vale solo in EURJPY 15/10 (ora piu' forte); GBPUSD 13/10 senza "genera" -> l'ora muove 1 pip (conferma la condizione).
   Storico largo (qmdj_lavoro/r8.js, r8s.js): 74 carte, ora piu' forte 7% (caso ~9%); solo giorni che non seguono 31 carte, 13%.
   Tenuta come regola da confermare: probabilmente vale con lo ZF gia' drenato/controllato.
9. Ponte del DS anche nell'OAP: l'ora dello stelo del giorno nel palazzo che genera lo ZF (丙申 EURJPY 29/09).

## MISURE DI S66 (non cablate)
- "Stelo del TY sotto lo ZF" (Edu): nella carta rotante il TY porta SEMPRE l'HS (2.941 carte) salvo fu yin (835): non distingue.
  Edu: "il TY non coincide necessariamente con lo HS" -> chiesto come lo intende, NON HA RISPOSTO (da riprendere).
- Variante: DsHs fermo (palazzi stesso elemento) + DS con lo ZF sopra l'HS -> non segue: 104 carte 52,9% +532 | 72 58,3% +795 | vivo 3 su 3.
  Proposta di cablarla in DsHs come "contro" (circa +1.400 storico): Edu ha detto "aspetta". Non cablata.
- Flusso interno del palazzo (Edu: in Qian 丁 -> Birth -> 庚 -> Grass, il qi finisce nell'acqua che drena Qian): qmdj_lavoro/flusso.js
  (catena di generazione piu' lunga fra stelo terra, porta, stelo cielo, stella, almeno 3). ZF drenato -> non segue 46-47% (al contrario);
  nel ZFTY peggiora 2024-26 e vivo. Con palazzo untimely: 39-44%. Unico segnale debole: qi che finisce nell'elemento che controlla il
  palazzo dello ZF -> non segue 53,1% e 52,6%. Niente cablato.

## KIT (storico-trading/qmdj_lavoro -> /home/claude/qm)
Nuovi: notte.js (QMDJ e ore forti sugli esiti del giorno), r8.js + r8s.js (regola 8), sotto.js (stelo del TY/HS sotto lo ZF), flusso.js.
Mappa stelle -> palazzo d'origine del motore: Grass 1, Rice 2, Aggressor 3, Assistant 4, Heart 6, Pillar 7, Official 8, Hero 9.
Prima rigenerare dump_2020_26.json (~4 min), dump_vivo.json, lio_qmdj.json (vedi S66).

## PROSSIME CARTE
1. Chiedere a Edu come intende il TY se non coincide con l'HS.
2. Chiedere se accendere la variante DsHs fermo -> contro (sopra).
3. Carte vive di Lio con movimento grande in un'ora sola (qmdj_lavoro/cerca_muta.js), con la mia lettura OAP prima della domanda.
