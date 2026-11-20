# RIPARTENZA S74 — carte QMDJ dove Lio sbaglia: carte 5 e 6 (chat del 20/11/2026, pomeriggio)

Leggere prima: questo file, poi RIPARTENZA_20_11_2026_S73.md (note tecniche, misure) e RIPARTENZA_20_11_2026_S72.md
(avvio, git, kit carte, EA) e RIPARTENZA_19_11_2026_S71.md (patto sul QMDJ, formato delle carte, pagina).

## ALL'INIZIO
Come in S73: clonare storico-trading e trading con git diretto (mai add_repo), ln -sfn /home/claude/trading /root/trading,
ln -sfn storico-trading/qmdj_lavoro /home/claude/qm, NODE_PATH=/home/claude/storico-trading/node_modules,
push col token di chiave.txt (Edu lo carica; chiederglielo se manca).
Pagina "Carte dove Lio sbaglia" (slug 5ef71a7f-9123-48e2-8d52-fcc0c3cb1b44): read_file con paths ["index.html"], copiare il file,
aggiungere la carta in cima dopo <main><h1>...</h1>, publish_files con base_version.

## FATTO IN S73-bis (20/11)
- CARTA 5, EURGBP 19/11/2026 (seme 83, Geng Xu, yin 6; trend SHORT, salito 33 pip, Lio SHORT media sbagliato).
  Edu: "ZF vuoto, come fa a seguire?" (ZF in Xun, vuoto coi vuoti del GIORNO Chen Si; coi vuoti dell'ora Yin Mao non lo era).
  Edu: "Accendi per il giorno solo ZF". CABLATO in qmdj.js (commit 436b739): QMDJ_ZF_VUOTO_GIORNO, default 'tutti'
  ('zfty' | 'dshs' | 'off'). Lo ZF che controlla il TY (stella di casa del palazzo dello ZF) in un palazzo tutto vuoto coi vuoti
  del giorno, non riempito dal ramo del mese -> non segue. Tutto il resto resta sui vuoti dell'ora.
  Misura (tutti i lun-ven 2020-02-20 / 2026-10-16): in quei giorni il mercato segue il trend 45,6% (158 carte, 117 giorni) e
  45,3% (128 carte, 92 giorni); con lo ZF non vuoto 49,1% e 46,3%. Coi vuoti dell'ora non tiene (47,5% e 41,8%).
  Sistemi prima -> dopo: DsHs 52,0% · 52,3% -> 52,0% · 52,4%; ZFTY 51,9% · 51,9% invariato (carte ribaltate: 57 e 52 nel DsHs,
  giuste 34 e 32; 72 e 56 nello ZFTY, giuste 40 e 31).
  Lio in quei giorni NON scende sotto il 50% (col trend 65% su 26 trade e 59% su 22): per il patto il gruppo non basta.
- CARTA 6, USDCHF 18/11/2026 (seme 84, Ji Hai, yin 6; trend LONG, salito 20 pip, Lio SHORT forte sbagliato; sbagliavano anche
  DsHs e ZFTY, "non segue"). Edu ha confermato che lo ZS fa da ponte (regola del 24/10) e ha letto:
  "Dui ha una combinazione fra Geng e Yi che tiene legato il ponte" (Geng sopra Yi nel palazzo dello ZS).
  CABLATO in qmdj.js (commit 755960d): QMDJ_PONTE_COMB, default 'zs' ('tutti' = ogni ponte | 'off'): il palazzo dello Zhi Shi
  bloccato da combinazione cielo-terra (funzione bloccato, con l'eccezione dello stelo del centro) non fa da ponte.
  Misura: cambia pochissimo (ZFTY 3 e 2 carte ribaltate, tutte sbagliate; circa 17 carte diventano mute; pip -91 e -220;
  vivo 1 carta ribaltata, giusta). Acceso perche' dottrina. 'tutti' (mia estensione) misura uguale o peggio: resta spento.
  Sulla carta lo ZFTY ora dice "segue" (giusto). Il DsHs resta "non segue" per View in Kan (con l'HS) che clasha il DS in Li:
  PUNTO APERTO da portare a Edu.
- Stessa carta, lettura di Edu per lo ZFTY: "Il commander e' generato dal Tai Sui e dal DS. Segue perche' le forze che lo aiutano
  sono superiori" (ZF in Kun, Terra; Tai Sui Wu e DS Bing in Li, Fuoco). CABLATO in qmdj.js: QMDJ_ZF_AIUTI, default 'zfty' ('off'):
  nello ZFTY il palazzo dello ZF generato dal palazzo del Tai Sui (ramo dell'anno) e dal palazzo del DS -> segue (prima della regola
  dello ZF vuoto, che vince). La forma "tutti e due generano" e' la mia traduzione della sua frase.
  Misura: in quei giorni il mercato segue 55,6% (266 carte) nel 2020-23 e 45,0% (169) nel 2024-26: NON tiene nei due periodi.
  ZFTY prima -> dopo: 51,8% +11.744 -> 52,3% +14.128 | 51,9% +14.379 -> 51,9% +13.683 | vivo 65,6% -> 64,5% (3 carte cambiate, 1 giusta).
  Acceso perche' dottrina; da seguire dal vivo.
- Controesempio chiesto da Edu: GBPUSD 16/07/2026 (seme 135, Wu Yin, yin 5; trend LONG, sceso 64 pip; ZF in Kun, Tai Sui/DS/ZS in Li,
  TY e HS in Qian). Edu: "ZF genera il TY quindi e' giusto" (che non segua). CABLATO: QMDJ_ZF_AIUTI non scatta se lo ZF genera il TY
  (QMDJ_ZF_AIUTI_GENERA=true lo riaccende). ZFTY dopo: 52,2% +13.950 | 51,9% +13.971 | vivo 64,5% (carte cambiate 115, giuste 74;
  67, giuste 34; vivo 3, giusta 1). Nel 2024-26 la regola resta al 50%: non so ancora cosa separa le carte buone.
  Altre prove fatte, nessuna regge nei due periodi: solo "ZF controlla TY" (62% e 36%), solo con aiuti non vuoti (55% e 45%).
- Sul DsHs della stessa carta Edu ha scritto "DsHs avrebbe dovuto dire la cosa giusta: non segue"; gli ho fatto notare che il mercato
  ha seguito. Non ha ancora detto se la lettura del DsHs resta cosi' (trade perso) o se qualcosa ferma View.
- qmdj.js non e' caricato dall'app: Lio e l'EA non cambiano. Niente da aggiornare in sw.js.

## PATTO (18/11) — STATO
Contatore: 1 USDCAD 11/11 · 2 NZDUSD 28/10 · 3 USDCAD 27/10 · 4 USDCHF 19/11 · 5 EURGBP 19/11 · 6 USDCHF 18/11.
Misura alla quinta: fatta solo sul gruppo "ZF vuoto del giorno che controlla il TY" (Lio non va sotto il 50%).
Controllo alla decima. Da presentare: USDCAD 03/11, AUDUSD 29/10, AUDUSD 28/10, EURJPY 06/11 (ricontrollare che non siano gia' lette).
In attesa della lettura di Edu: carta 3 (USDCAD 27/10: "il fan yin e' il motivo giusto, o parla altro?") e
carta 4 (USDCHF 19/11: "lo ZS in Xun e' vuoto: puo' ancora colpire l'ora dal palazzo opposto?").

## NOTE TECNICHE NUOVE
- Il disegno della carta (render.js) mostra i vuoti del GIORNO; il software legge quelli dell'ORA (tranne la regola nuova sullo ZF).
  Dire sempre a Edu quali vuoti si stanno usando.
- Nel software il TY dello ZFTY e' la stella di casa del palazzo dello ZF (HOME), non la divinita' Tai Yin.
- Misura rapida senza dump (6 secondi): tutti i lun-ven da full1h.json, trend con XKDGTrend.emaTrend sulle chiusure della barra 21
  dei giorni precedenti, esito = chiusura barra 21 - apertura barra 00, seme dalle prime cifre dell'apertura. Script non salvati.

## PUNTI APERTI
- USDCHF 18/11, DsHs: View in Kan con l'HS clasha il DS in Li e ribalta in "non segue"; il mercato ha seguito.
- Quelli di S73 (Wu = quale valuta; repo pubblici o privati; carte 3 e 4).
