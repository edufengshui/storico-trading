# RIPARTENZA S64 — MDO (metodo dell'ora) e correzioni ZFTY (dalla chat S63, 28-29/10/2026)

Leggere prima: questo file, poi RIPARTENZA_28_10_2026_S63.md e RIPARTENZA_28_10_2026_S62.md (regole di lavoro, formato, motore, kit).

## ALL'INIZIO (invariato)
1. Trade della notte: git pull; unzip -o history_full_1h_f.zip history_full_1h_from20200129.json; node misura_vivo.js; git checkout del .json.
   Gli esiti del giorno: DUMPC=<file> node misura_vivo.js <ieri> <oggi> (campi trend, real, move, liDir, liForza).
2. Promemoria privacy (repo privato, app su Cloudflare Pages + Access).
3. Poi il QMDJ dalla prossima carta (sotto).

## COME PARLARE A EDU (29/10: piu' volte non ci siamo capiti)
- MDO = METODO DELL'ORA: NON dice se la carta segue (per quello ci sono DsHs e ZFTY). Dice QUALE ORA del giorno crea il movimento.
  La direzione del movimento la da' la carta. Non misurare il MDO come "segue/non segue", e non usarlo come ingresso del trade
  (misurato 29/10: entrare all'ora del Commander invece che a mezzanotte toglie 4-6.000 pip a Lio, anche con i filtri).
- L'ora del Commander = l'ora dello stelo del Commander, es. 甲辰壬 ("Jia Chen Ren"): MAI chiamarla "ora Jia" (non e' una qualsiasi ora 甲).
- Ogni grande movimento si scrive col pilastro dell'ora (es. 乙巳 09-11 GMT), non solo GMT.
- Non ripetere che "le regole fanno poco": le carte lette sono spiegate (l'ora MDO e' l'ora piu' forte del giorno in 7 carte lette su 12,
  il caso darebbe 1 su 11). Se lo storico intero non lo mostra, il problema e' il codice troppo largo, non la dottrina. Basta scuse.
- Edu approva la lettura ragionata: "lo stelo del giorno e' vuoto, quindi il trend non ha radice" -> continuare cosi'.

## DOTTRINA MDO DI OGGI
- USDJPY 10/09/2026 (甲辰壬): ZF vuoto e untimely (mese 酉 opposto a Zhen) -> quando arriva la sua ora inizia il movimento CONTRO il trend.
  Edu: "l'ora del Commander crea il movimento; poiche' lo ZF e' vuoto e la carta non segue, quando arriva la sua ora si attiva il NON SEGUIRE".
  Spiega anche GBPUSD 14/10 (prima vista come eccezione): l'ora accelera la direzione della carta.
- AUDUSD 10/09/2026: il movimento in 丙午 — prova di Edu: "丙午 clasha Li (ZF) da Kan e il suo stesso ramo" (Kan = Birth+ZS che decide).
- USDJPY 22/10/2026 (fan yin): la discesa parte nelle ore che toccano il palazzo che decide (Gen con View, ZS e 丙 dell'anno): 乙丑, 丙寅;
  il colpo grosso in 丁卯 sull'asse rovesciato Zhen-Dui (丁 cielo di Dui = terra di Zhen, 卯 clasha 酉). Edu: "bravo, memorizza".
  Principio emergente: l'ora che muove e' quella che accende chi decide la carta.

## CABLATO OGGI (repo trading, pubblicato)
- qmdj_ore.js: ore(carta, segue) — verso = direzione della carta (DsHs+ZFTY: d'accordo o uno solo); campo propria (il 甲 sotto lo stelo
  del Commander), zfVuoto, zfUntimely, forte (ora propria + ZF vuoto + mese opposto: 59 giorni, ampiezza 1,31x, ora piu' forte del giorno
  17% contro 9%, da li' alle 21 61% contro il trend). Verso dalla carta: 52% e +9.450 pip contro 49% e -14.000 col trend fisso.
- qmdj.js ZFTY: QMDJ_TY_BIRTH 'zfty' + QMDJ_TY_BIRTH_PORTA 'zsanno2': la controparte genera lo ZS (con Birth, o con View e lo stelo
  dell'anno) che controlla lo ZF untimely -> non segue (simmetrico: segue). AUDUSD 10/09 e USDJPY 22/10. ZFTY ora:
  2020-23 1.569 · 52,4% · +5.363 | 2024-26 1.199 · 53,0% · +6.112 | vivo 60 · 61,7% · +794.
- NON cablata: "ramo dello ZF colpito da Birth/ZS opposto" (forma AUDUSD presa larga: 1.308 ore, ampiezza normale).

## KIT (storico-trading/qmdj_lavoro, copiare in /home/claude/qm)
Nuovi: mdo.js (ore MDO + barre di un cross/giorno), ferma.js, mdo_ingresso.js (MDO come ingresso di Lio), zf_vuoto.js, mdo_ampiezza.js
(ampiezza delle ore normalizzata per cross e ramo), mdo_cablo.js (misura delle regole cablate), mdo_carte.js (le carte lette: ora piu' forte
contro ore MDO), cerca_muta.js (carte con movimento che il MDO non vede). Prima: rigenerare dump_2020_26.json (ORARIO=full1h.json DUMPC=...
node misura_vivo.js 2020-02-20 <oggi>), dump_vivo.json (DUMPC=... node misura_vivo.js 2026-09-29 <oggi>), lio_qmdj.json (node lio_qmdj2.js
e copiarlo). Render: node render.js data stelo ramo ju dun -> carta.html, togliere onclick/✕, titolo "CROSS gg/mm/aaaa · pilastro · yin/yang N".

## PROSSIME CARTE (con movimento che il MDO non vede, da cerca_muta.js)
USDJPY 24/09 (辛卯 +56), EURJPY 29/09 (丙申 +54), poi EURJPY 15/10, GBPUSD 13/10 (lista_ferme.js). AUDUSD 10/09: 丙午 = pilastro
dell'anno, forse conta: da rivedere su altre carte.
