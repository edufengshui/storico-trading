# RIPARTENZA S69 — OAP e regola dello ZS (chat del 12-13/11/2026)

Leggere prima: questo file, poi OAP_S69.md (regola OAP 10, misure, regola dello ZS), poi RIPARTENZA_31_10_2026_S68.md e le regole OAP 1-9
in RIPARTENZA_30_10_2026_S66.md e S67.

## ALL'INIZIO
1. Clonare con git diretto (mai add_repo): https://github.com/edufengshui/storico-trading e .../trading in /home/claude.
   ln -sfn /home/claude/trading /root/trading (serve a misura_vivo.js). Push col token di chiave.txt (Edu lo carica; se manca chiederlo).
2. Trade della notte: registro_live.json, trade_persi.md. Esiti: unzip -o history_full_1h_f.zip history_full_1h_from20200129.json;
   DUMPC=<file> node misura_vivo.js <dal> <al>; git checkout del .json. QMDJ e ore forti: qmdj_lavoro/notte.js <dump>.
3. Kit: copiare qmdj_lavoro in /home/claude/qm, npm i lunar-javascript li'. Rigenerare dump_vivo.json (misura_vivo 2026-06-01 -> oggi),
   dump_2020_26.json (ORARIO=full1h.json, 2020-01-29 -> 2026-07-30, ~4 min), lio_qmdj2.json (lio_qmdj2.js, ~5 min).
   info3.js stampa una riga vuota in testa. Carta disegnata: node render.js <data> <stelo> <ramo> <ju> <yin|yang> -> carta.html.
4. Promemoria privacy (S68): repo storico-trading privato, app su Cloudflare Pages + Access.

## FORMATO (correzione di Edu 13/11)
Le carte vanno nella pagina "Carte OAP" (artifact Cj9fZazDDXeX4mb45V5TXq). In cima a ogni carta una frase in grande, chiara:
"Il mercato HA SEGUITO / NON ha seguito il trend. Il trend EMA era LONG (al rialzo), il prezzo e' SALITO/SCESO di N pip."
Edu non capiva se una carta avesse seguito o no.

## FATTO IN S69
- Registro del 02/11 vuoto: nessun guasto. Giorno 庚辰 (clash col mese 戌): 5 carte ferme, 4 cross con EMA non consolidata.
- Regola OAP 10 confermata da Edu ("E' giusta"): l'ora uguale al pilastro dell'anno, con lo stelo accanto a Birth, muove nel verso della carta
  (USDCAD 04/11 丙午, AUDUSD 10/09 丙午). Lettura in Gen di USDCAD 04/11 confermata.
- Coppie OAP: ipotesi del ramo legato e dello stelo combinato non reggono sulle 16 coppie (21 e 22 su 36). Carta EURJPY 29/07/2026 in attesa di Edu.
- Misure su Lio, OAP, orari e colpi da notizia: in OAP_S69.md. Nessuna cambia Lio: l'EA resta entrata 01:00, uscita 21:00 GMT.
- Regola dello ZS che genera lo ZF: accesa nello ZFTY (commit e2529e5), dettagli e misure in OAP_S69.md.

## PUNTI APERTI
1. Regola dello ZS: 62 e 52 carte cambiate restano storte (34-37%). Portare a Edu la prossima (node qmdj_lavoro/zsl.js, prima del 2026-02-10
   EURJPY che e' "stesso palazzo: fermo"). Da decidere anche se va accesa in DsHs (dottrina: "va accesa sempre").
2. EURJPY 29/07/2026 (coppia 壬戌 muove / 庚申 fermo): Edu non ha risposto.
3. Ipotesi EURUSD 05/06: nei giorni in cui decide la catena DS-HS, l'ora dell'HS e l'ora propria del DS danno il verso del pomeriggio. Da verificare.
4. Lio dal vivo al 12/11: 44 trade, 27 vinti, 14 persi, 3 a zero, +384.
5. MT5: conto demo ThinkMarkets da aprire; EA entrata 01:00, uscita 21:00 GMT, lotto pieno sulle forti e mezzo su medie e deboli;
   segnali di Lio da pubblicare in un file subito dopo le 00:00 GMT. VPS gratis con 15 lotti al mese, altrimenti circa 30 $ al mese.
6. Domande vecchie (S68): come intende Edu il TY quando non coincide con l'HS; variante "DsHs fermo + DS con lo ZF sopra l'HS".
