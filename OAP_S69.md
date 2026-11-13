# OAP — sessione S69 (12/11/2026)

## Regola OAP 10 (confermata da Edu il 12/11/2026: "È giusta")
L'ora uguale al pilastro dell'anno, con lo stelo accanto alla porta Birth, muove nella direzione della carta.
- USDCAD 04/11/2026: 丙午 11-13, 26 pip con il trend. 丙 nel cielo di Qian con Birth (Birth viene da Gen = ZF e DS: ponte);
  午 = ramo del giorno e dell'anno, sta in Li che genera Gen.
- AUDUSD 10/09/2026: 丙午 11-13, 36 pip contro il trend (ora piu' forte). 丙 in Kan con Birth e ZS, palazzo che decide.
- Controprova USDCAD 05/11/2026: 丙辰 senza Birth, 4 pip.

## USDCAD 04/11/2026 — lettura in Gen confermata da Edu
Gen senza stelo del centro: 丁壬 resta, il giorno sta sopra l'ora. Il 戊 del centro nel cielo di Dui clasha 辛 e impedisce 丙辛 (dottrina 06/11):
Dui libero, metallo timely, controlla Zhen (HS e TY, legno vuoto e fuori stagione). Qi Gen -> Dui -> Zhen: segue.
辛丑 (34 con) tocca le due tappe: 辛 in Dui, 丑 in Gen.

## Coppie OAP (ora che muove / ora ferma nello stesso palazzo) — misure, niente cablato
16 coppie dal 06/2025 (qmdj_lavoro/oap_coppie2.js, con dump_2020_26.json rigenerato).
- Ipotesi ramo legato (六合 col giorno, 三合 o 三會 completi) -> ferma: 4 su 4 sulle coppie mostrate, 21 su 36 sulle 16. Non regge.
- Ipotesi stelo dell'ora combinato con uno stelo del palazzo del suo ramo -> ferma: 22 su 36. Non regge da sola.
- Carta mostrata: EURJPY 29/07/2026 (壬戌 36 con muove, 庚申 6 fermo: 庚 legato al 乙 della terra di Kun). In attesa di Edu.

## Misure del 13/11 (niente cablato salvo la regola dello ZS)
- OAP largo sui 14 trade persi da Lio (dal vivo): 6 vinti, 5 persi, 3 senza ora, +96 (Lio -360). Sui 27 vinti da Lio: 9 vinti, 8 persi, 10 senza ora, -36 (Lio +744).
- Nessun filtro QMDJ separa i giorni in cui Lio sbaglia: con DsHs e ZFTY contro Lio, Lio vince lo stesso il 64% (2020-23 e 2024-26).
- Direzione della giornata: alle 08 GMT il 51% dei giorni ha gia' la direzione definitiva, alle 13 il 72%, alle 15 l'83%.
- Chiudere o girare Lio alle 09 se va contro: sempre peggio. Intervento OAP dopo un'ora fissa (03-16 GMT, script oapH.js): sempre peggio sullo storico.
- Colpi da notizia (barra >= 4x mediana e >= 25 pip): carta QMDJ giusta 52-56%, Lio 60-64%. Inversioni 12-14 GMT che tengono fino alle 21:
  92 (2020-23), 44 (2024-26); Lio aveva il verso finale 79% e 64%, carta 47-52%; ora OAP o Commander quasi mai.

## Regola dello ZS che genera lo ZF (Edu 13/11/2026) — ACCESA nello ZFTY, commit e2529e5 su trading
"Lo ZF e lo ZS hanno sempre un rapporto preferenziale. Se lo ZS genera lo ZF abbiamo la situazione ideale" -> segue, anche se View ribalta.
Condizioni di Edu: ZS in buona salute (non vuoto), senza clash interni, in palazzo timely o che ospita il ramo del mese o del giorno;
steli del cielo dello ZS non in tomba ("丁 su Gen stava in tomba", EURJPY 23/06/2022); non vale se lo ZF genera il TY
("Non importa che lo ZS alimenta lo ZF se questo continua a generare il TY", EURJPY 04/03/2025).
Carte: EURUSD 05/06/2026 (segue, giusta), EURJPY 23/06/2022 (tomba), EURJPY 04/03/2025 (ZF genera TY): tutte e tre giuste.
Misura ZFTY: 2020-23 52,7% +4.825 -> 51,7% +3.811 | 2024-26 53,6% +6.283 -> 52,2% +4.625 | vivo 60,8% -> 59,6%.
Carte cambiate: 62 al 34% e 52 al 37%: manca ancora qualcosa. Prossima carta: node qmdj_lavoro/zsl.js (la piu' storta fra le cambiate).
Flag: QMDJ_ZS_GENERA_ZF ('zfty' default | 'tutti' | 'off'), QMDJ_ZS_SANO, QMDJ_ZS_TOMBA, QMDJ_ZS_ZFGENTY (false per spegnere).
