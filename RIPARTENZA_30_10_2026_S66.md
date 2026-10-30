# RIPARTENZA S66 — OAP: l'ora che accende il palazzo che decide la carta (dalla chat S65, 29-30/10/2026)

Leggere prima: questo file, poi RIPARTENZA_29_10_2026_S65.md, S64, S62 (regole di lavoro, formato delle carte, motore, kit).

## ALL'INIZIO (invariato)
1. Trade della notte: git pull; unzip -o history_full_1h_f.zip history_full_1h_from20200129.json; node misura_vivo.js; git checkout del .json.
   Esiti del giorno: DUMPC=<file> node misura_vivo.js <ieri> <oggi>. Clonare con add_repo (edufengshui/storico-trading e edufengshui/trading).
   Per il push serve add_repo con access "push" su tutti e due i repo.
2. Promemoria privacy (repo privato, app su Cloudflare Pages + Access).
3. Poi l'OAP dalla prossima carta (sotto).

## DECISIONE DI EDU (30/10/2026) — DA OGGI SI LAVORA SULL'OAP
- OAP = "ora che accende il palazzo che decide la carta". E' il MDO come metodo autonomo: dice in quale ora ENTRARE nel trade.
- NON e' l'ora del Commander (Edu: "non ho mai detto che bisogna entrare nell'ora del Commander"). Non chiamarla piu' MDO.
- Lavoro: mostrare a Edu tutte le carte che servono per trovare le regole OAP che valgono nella maggioranza dei casi.
  Formato carte invariato (S62): seguito o no, trend EMA, esito pip, DS/HS e ZF/TY col trigramma, vuoti, bazi in colonna Ora-Giorno-Mese-Anno,
  carta col renderer XKDG (render.js, togliere onclick/✕/cursor, font >= 11px, titolo "CROSS gg/mm/aaaa · pilastro · yin/yang N"),
  ogni grande movimento col pilastro dell'ora (es. 丁丑 01-03 GMT). Prima la MIA lettura ragionata (palazzo che decide e perche'), poi chiedere.

## REGOLE OAP GIA' NOTE (dalle letture di Edu)
1. Stelo E ramo dell'ora nello stesso palazzo, quello che decide (5 carte): EURJPY 15/10 丁未 in Kun (ZS, genera lo ZF); EURJPY 29/09 丙申 in Kun
   (丙 su Kun sopra 庚 che nasconde 申; Kun genera Dui = ZF); USDJPY 22/10 丙寅 in Gen (ZS, View, 丙 dell'anno); USDJPY 24/09 戊子 su Kan
   (Kan attacca Li = ZF, contro il trend); USDJPY 10/09 甲辰 in Zhen (ZF vuoto e untimely: movimento contro il trend).
2. Il ramo vale anche nascosto nel 六仪 (申 sotto 庚, 辰 sotto 壬, ecc.).
3. Il ramo dell'ora che porta nascosto lo stelo decisivo: NZDUSD 28/10 丁丑 (丑 in Gen contiene 辛, il 辛 di 青龍逃走 sotto lo stelo del giorno).
4. Clash dal palazzo che decide: AUDUSD 10/09 丙午 (clasha Li = ZF da Kan, Birth + ZS); USDJPY 22/10 丁卯 (fan yin, asse rovesciato Zhen-Dui,
   丁 cielo di Dui = terra di Zhen, 卯 clasha 酉).
5. Ora che clasha se stessa fra due palazzi che controllano il palazzo d'attacco: USDJPY 24/09 辛卯 (Gen e Kun controllano Kan).
6. Ore col ramo nel palazzo dell'Output timely del controllato (qmdj_ore.js, campo output).
7. Da verificare: punizione 丑戌未 con giorno/mese 戌 (EURJPY 15/10 辛丑 e 丁未; NZDUSD 28/10 丁丑); pilastro dell'anno 丙午 (AUDUSD 10/09).

## CABLATO IN S65 (repo trading, pubblicato)
- 青龍逃走 (Edu, NZDUSD 28/10): stelo del giorno 乙 sopra 辛 -> non segue, DsHs e ZFTY (QMDJ_QINGLONG 'tutti', MODO 'contro').
  DsHs 2020-23 53,0% +6.187 | 2024-26 54,2% +7.369 | vivo 60,3% +123. ZFTY 52,6% +5.555 | 53,5% +6.559 | 60,8% +786. Simmetrico: peggiora.
- lettura() restituisce palDecide e passoDecide: il palazzo del passaggio della cascata che ha dato il verdetto (base: chi vince il
  controllo / chi genera). Sulle 7 carte lette ZFTY trova il palazzo di Edu in 4 (NZDUSD 28/10, USDJPY 22/10, AUDUSD 10/09, USDJPY 24/09),
  DsHs in 1. Sbaglia dove sbaglia anche la lettura (EURJPY 15/10 e 29/09: decide Kun).

## MISURE DI S65 (non cablate)
- MDO come veto di Lio: no (toglie ~34.000 pip; con MDO contro Lio vince ancora 61-65%). Come conferma: +2-3 punti, ma e' il QMDJ concorde.
- Ingresso nell'ora (prima ora con stelo e ramo nel palazzo) contro mezzanotte, uscita 21: sempre pari o peggio. Con ruoli fissi (vincitore,
  ZS, ZF, chi tocca lo ZF...) e con palDecide. Con la direzione di Lio costa 6-8 pip a trade (Lio e' buono gia' da mezzanotte).
  Ampiezza dell'ora che accende: 1,1x le altre in media, ma piu' grande solo nel 44-49% dei giorni.
- Conclusione: il codice largo prende troppe ore (ogni ora accende 2-4 palazzi). Servono le regole OAP dalle carte, e il palazzo che decide
  giusto (correggere le letture sbagliate migliora insieme direzione e ora). Misura OAP proposta: l'ora OAP e' l'ora piu' forte del giorno
  (o fra le prime due) nella maggioranza delle carte? (come mdo_carte.js: carte lette 7 su 12, il caso darebbe 1 su 11).

## TRADE DEL 28/10 (vivo)
Lio 4 trade 2 vinti -50 (AUDUSD -23 e NZDUSD -51 persi). QMDJ prende USDCAD (+57) dove Lio tace. Ultimi 30 giorni Lio 62% +1.414.

## KIT (storico-trading/qmdj_lavoro -> /home/claude/qm)
Nuovi: qinglong.js + ql_opts.txt (misura 青龍逃走), mdo_veto.js, mdo_solo.js, mdo_decide.js (ruoli fissi), mdo_dec2.js (palDecide; LIO=1),
mdo_check.js (palazzi accesi dalle ore di Edu nelle carte lette + palDecide). Prima rigenerare dump_2020_26.json, dump_vivo.json e
lio_qmdj.json (lio_qmdj2.js scrive lio_qmdj2.json: copiarlo in lio_qmdj.json).

## PROSSIME CARTE OAP
EURJPY 15/10 (mostrata: Edu non ha ancora risposto; mia lettura: segue, la combinazione 丁壬 lega lo ZF a chi lo genera; decide Kun, ore 丁未
e 辛丑), EURJPY 29/09 (Kun), GBPUSD 13/10, poi le carte vive di Lio con movimento grande in un'ora sola (cerca_muta.js).
