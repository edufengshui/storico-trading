# RIPARTENZA S80 — ore del qimen (autoclash, ora completa), qimen quando Lio tace (chat del 27-28/11/2026)

Leggere prima: questo file, poi ESITI_GANN_FIBONACCI_SECONDA_ENTRATA_27_11_2026.md (dal punto 10 in giu': tutti i numeri e le letture di questa chat),
poi RIPARTENZA_27_11_2026_S79.md (seconda entrata e i 6 PASSI DI EDU su Cloudflare e MetaEditor: ANCORA DA FARE) e RIPARTENZA_25_11_2026_S78.md.
Avvio come in S76 (clonare storico-trading e trading; Edu ha gia' dato l'ok ai repo, non chiederlo). REGOLA: la frase per la chat nuova comincia con
"Trading". Chiedere chiave.txt se manca.

## COSA VUOLE EDU (27/11) — NON DIMENTICARLO
- "Uffa continui a dire che non fa nulla e intanto i primi due casi che mi hai fatto vedere invece fa": NON dire che una sua regola delle ore "non separa".
  La misura parte DAI MOVIMENTI GRANDI: quante ore grandi spiegano le forme raccolte (qmdj_lavoro/ora_grande.js). NON portargli carte dove non succede niente.
- Vuole, UNA ALLA VOLTA, carte qimen di giorni con movimenti grandi in ore precise (pagina "Carte OAP", carta in cima, formato solito).
- Quando si cerca dove sta un ramo guardare ANCHE porte e stelle ("contengono i rami; si possono usare se rilevanti").

## ORE DEL QIMEN — FATTO
- La seconda entrata all'ora del Commander o alle ore OAP: misurata, vale quanto un'ora qualunque (ESITI punti 10 e 11). Resta il ritracciamento.
- FORME DETTATE DA EDU sulle carte (tutte col TY che genera lo ZF, tutte con il trend), CABLATE in trading/qmdj_ore.js come indicazioni (non decidono):
  1) AUTOCLASH DEL TY: stelo dell'ora nel palazzo del TY e ramo dell'ora che clasha quel palazzo (USDCAD 10/11/2026: Ji Wei, Geng Shen);
     o al rovescio, ramo nel palazzo del TY e stelo nel palazzo di fronte (EURJPY 24/09/2026: Xin Mao). Campi autoTY, autoTYlato.
  2) ORA COMPLETA NEL TY: stelo e ramo dell'ora tutti e due nel palazzo del TY (EURUSD 01/10/2026: Geng Shen). Campo completoTY.
  3) AUTOCLASH PORTATO: il ramo dell'ora e' contenuto nella porta o nella stella del palazzo di fronte allo stelo (EURUSD 01/10: Bing Chen, Bing in Kun
     col TY, Delusion e Assistant in Gen contengono Chen). Campi autoTYlato/autoZFlato = 'portato', autoTYvia. "Se rilevanti": criterio NON ancora dato.
  autoZF e completoZF (stesse forme sul palazzo dello ZF) sono estensioni di Claude (la "identica" sul Commander era dottrina del 28/10).
- Conto dalle ore grandi (TY genera ZF; ora >= 40 pip e >= 2,2 volte la terza): una delle tre forme in 15 giorni su 72 · 12 su 44 (caso 12 e 9).
- Conferma non portata a Edu: USDJPY 11/09/2026, Wu Wu 46 pip con il trend = autoclash dello ZF al rovescio.
- Strumenti: qmdj_lavoro/carta_dump.js CROSS data (dati della carta coi segni delle ore), ty_autoclash.js, ora_grande.js, ore_seconda.js.

## IN ATTESA DI EDU
- CARTA ORE 4, USDCAD 07/10/2026 (in cima alla pagina; trend LONG, 44 con; il TY CONTROLLA lo ZF): "Geng Wu 庚午 (11-13 GMT, 42 pip con il trend) come la
  leggi?" Lettura di Claude da validare: Geng in Dui (mese) controlla il TY in Zhen, Wu (Li, View) genera lo ZF in Kun.
- Quando una porta o una stella e' "rilevante" per l'autoclash (in Bing Chen: pilastro della carta, Bing e' l'HS col TY, Chen portato due volte).
- EURUSD 01/10: Ji Wei (13-15, 20 con) non spiegata.
- Prossime ore grandi mai lette e non segnate: EURJPY 22/09 (Wu Chen 65 contro), USDJPY 22/09 (Wu Chen 50 contro), USDJPY 14/10 (Ding You 59 contro),
  EURJPY 02/10 (Xin Wei 78 contro), EURUSD 15/10 (Xin Chou 46 contro), EURJPY 14/10 e USDCAD 14/10 (Jia Wu).

## QIMEN QUANDO LIO TACE (Edu 28/11: "Vale la pena usare il qimen quando Lio tace, fallo")
- I tre trade a mano del 27/11 (07 -> 21 GMT): EURUSD SHORT 43 vinto, USDCHF LONG 24 vinto, GBPUSD LONG 27 perso.
- CABLATO E CARICATO (28/11): qmdj_registro.js aggiorna(reg, data, DIR, feed) scrive in qmdj_live.json il campo "fermi" (cross senza trade di Lio, EMA
  consolidata, seme non sul bordo: trend, seme, verdetto della bilancia, voci, flusso), PRIMA dell'entrata; raccolta_notturna.js scrive in segnali.json
  "qimen_lio_fermo" [{cross, dir, trend, segue, scarto}]; app.js e i18n.js (trading e copia): sezione "LIO FERMO · il qimen dice (a mano, non va su
  MetaTrader)". Conto in avanti: node qmdj_lavoro/conto_fermi.js [ora d'entrata GMT].
- NON VA ALL'EA: l'EA legge solo "trades". DOMANDA A EDU IN ATTESA: mandarli anche all'EA a 0,01? Detto a Edu il conflitto col suo principio
  ("intorno al 50% non si trada": qimen coi fermi di Lio 52,8% · 54,7%).
- DA GUARDARE lunedi' 30/11: la raccolta della notte ha scritto "fermi" e "qimen_lio_fermo"? La sezione nuova si vede nell'app (non provata a schermo)?

## PUNTI APERTI
- Tutti quelli di S79 (i 6 passi di Edu per avvisi Telegram e seconda entrata; EA 1.20 non compilato) e di S78 (carte 15, 17, 3, 4, 6, 7, regola di View...).
