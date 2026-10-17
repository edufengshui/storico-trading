# RIPARTENZA S58 — dalla chat S57 (16-17/10/2026)

Leggere anche RIPARTENZA_11_10_2026_S56.md (regole cablate del metodo del trend, PUNTI APERTI A-O, formato carta).

## REGOLE DI LAVORO (invariate)
- Niente add_repo: clonare con git; push diretto col token nell'header (token MAI in file, memoria, registro, repo).
  `TOKEN=$(tr -d '\n\r ' < /root/.claude/uploads/54e2cdc2-ca35-5cec-bbe0-d7658fc9e061/4995de23-chiave.txt)` — se il
  file non c'e' nella nuova chat, chiederlo a Edu. Commit come claude-push (con Co-Authored-By / Claude-Session).
  Il controllo "Unverified" dei commit si ignora: non si riscrive la storia di main.
- "Non devi essere sempre d'accordo con me": se Edu va contro una regola gia' codificata o contro una misura, dirlo.
  Ma Regola #10: una percentuale non respinge mai una lettura di Edu, la misura si riporta nuda.
  Edu (17/10): "non serve che mi sottolinei l'ovvio" — il rischio di sovradattamento si dice UNA volta, con un numero.
- "Prosegui, non devi chiedermelo ogni volta". "Parti dall'assunto che il sistema esiste e sei tu che non lo catturi".
- All'inizio di ogni sessione: PRIMA i trade (esiti della notte, la tabella di misura_vivo.js), POI le carte.
- Carte: immagine prima (carta_auto.js -> invio file), poi il formato del S56. Nomi in italiano.

## IL SISTEMA IN USO DAL 17/10/2026: LA PIRAMIDE
Edu: "metti l'85% in cima alla piramide da usare solo ed esclusivamente su quel numero limitato di carte; al secondo
livello il sistema che performa meglio per il restante gruppo, e cosi' via" · "E quindi questo deve essere il sistema
da adesso in poi!". In app.js (livelloTreSistemi, scalaScelta 'PIRAMIDE' di default) e nella raccolta notturna.
Ordine (la prima che concorda decide):
 1  sistema D = DLR = metodo del trend      (backtest 656 carte 85,5%)
    cantina: PB = LY = DLR -> NON si trada (decisione Edu 09/10)
 2  attuale = DLR = D 83,6% · 3 DLR = Lettura S47 = D 82,5% · 4 PB = DLR = D 78,4% · 5 Lettura = metodo = D 76,9%
 6  PB = metodo = D 75,7% · 7 PB = attuale = D 75,1% · 8 DLR = D 73,9% · 9 LY = Lettura = D 68,6% · 10 PB = D 67,1%
Backtest 3.309 carte >=20 pip: 2.300 trade 78,9% +78.145 pip (D col catalogo intero, cioe' dentro il campione).
Su tutte le 4.302 carte (piatte comprese, dump SOGLIAPIP=0 fino al 18/09): 2.957 trade 72,7% +78.342 pip.
D contato senza la carta nella propria regola: punta 66,4% su 572.
Interruttori localStorage: SCALA=S57A (scala a gradini del mattino: A attuale=DLR=MT, B PB=DLR=Lettura,
C attuale=DLR=D, D LY=attuale=DLR), SCALA=S48 (scala vecchia A/B/C).

DAL VIVO 29/09-16/10 (`node misura_vivo.js`, 12 giorni, 83 cross-giorno, esito 00:00->21:00 GMT) — CORRETTA S58:
misura_vivo.js ricostruiva il trend dalla chiusura dell'ultima barra lun-ven (uguale al Worker solo 132/144 in
confronto_live.md) e chiudeva all'apertura delle 21. Ora chiusure delle 21:00 + XKDGTrend.emaTrend: 143/144.
| piramide 57 trade 61% +834 | punta 13 54% +153 | 2-4 12 50% +155 | 5-7 19 79% +516 | 8-10 13 54% +10 |
| trend semplice 83 55% +426 | D da solo 70 61% +1030 | DLR da solo 70 43% -207 | cantina 15 47% -101 |
Settimana 12-16/10 con la piramide: 18 trade, 10 vinti, +95 pip (punta 7 trade 2 vinti -28).
(La tabella del S57 — piramide 58 · 64% · +800 — era calcolata coi trend sbagliati.)
8 e 9 ottobre: non mancano dati, sono giorni di clash giorno/mese (motivo "la carta non scioglie"): nessuna carta.

## IL SISTEMA D (S57) — "il sistema D e' tuo perche' le regole le hai trovate tu" (Edu)
- livello_d.js (nell'app), catalogo livello_d.json, Excel Livello_D.xlsx (inviato a Edu). Rigenerare:
  livello_d_costruisci.js (serve db_carte.json, costruito dallo script livelloD.js del S57 dal dump TRESIST) ->
  livello_d_genera.js. 326 forme (esagramma + mobile), 258 con regola (forme con >=5 ripetizioni): la
  caratteristica della data (stagione, vuoto, giorno/ora/mese su Shi/Ying/linee, arrivo della mobile, Serpente
  morto) che separa meglio "segue / non segue il trend". Dentro il campione 76,7%; carta fuori 50,9-53%.
  Con esiti tirati a moneta lo stesso metodo dava 74%. Regola dell'Acqua (carta 1/3 L1) non regge sulle altre carte.
- Molte regole su gruppi di 2-4 casi (6 delle 9 carte della punta di questa settimana). PROPOSTA APERTA: soglia
  minima di casi per gruppo. Da valutare col registro.
- Sui 696 casi in cui D sbaglia il metodo del trend ha ragione al 51,7%.
- La stessa caratteristica da' verdetti opposti su carte diverse ("Shi fuori stagione": non segue su 13, segue su 6).
  DOMANDA A EDU ancora senza risposta: coerente con la dottrina?

## MISURE DEL S57 DA RICORDARE
- Carte piatte (<20 pip): 22% dei giorni. Nessuna forma ne' caratteristica le prevede (dispersione 0,95). Dipendono
  dal cross (EURGBP 41%, NZDUSD 26%, USDCHF 25%, EURJPY 13%) e dal giorno (lun 25%, ven 28%, mar-gio 19-21%).
  Sulle piatte ogni sistema 51-55%, saldo ~0. EURGBP resta (positivo in ogni gradino). Debole AUDUSD gradini 8-10.
- Carte possibili: 384 forme x 60 giorni x 12 mesi x 12 ore = 3,3 milioni (x12 anni 40 milioni); il backtest ne copre
  lo 0,13%, quasi tutte uniche. Effetti di ogni elemento della data (giorno/ora/mese/anno su Shi/Ying/mobile/arrivo,
  genera/drena/controlla/clash/combina/punisce) isolati e sommati: 96% sullo storico, 46-51% su carte nuove (2024-26 e
  dal vivo), per forma o per tutte. Profili di data su S/Y: 1.402 su 3.309 carte, dispersione 0,94.
- Serpente morto (§81) resta la struttura piu' forte trovata su tutte le forme (64% su 326, due periodi).
- Fra le 190 strutture e i rapporti di primo ordine S/Y nessun segnale oltre al Serpente e allo Shi mobile con
  l'arrivo clashato dal giorno (cablato, confermato da Edu 16/10).
- Riferimenti alternativi del trend provati e scartati: sede alta/bassa 50,8%, S = valuta base 49,0%.

## FILE NUOVI / CAMBIATI NEL S57
- trading: app.js (piramide, sistemaD(), voce "Sistema D" nelle voci), index.html (+inventario_carta.js, livello_d.js),
  sw.js (v66, CORE con lettura_trend/inventario/livello_d), livello_d.js.
- storico-trading: stessi app.js/index.html (l'app.js dell'archivio era indietro: di notte il metodo del trend non
  girava), raccolta_notturna.js (carica lettura_trend.js, inventario_carta.js, livello_d.js), livello_d.*,
  misura_vivo.js (feed ricostruiti da orario_live.json col calcolo del Worker + lettura dell'app), inventario_carta.js,
  lettore_ordine.js (sperimentale, 22/53 riferimenti), lettura_trend.js (regole S57: combTot, trigonoMobili+possesso,
  vicinaGenera, radunoVuota, oraRiempie, trigonoSede, shiArrivoClashato, incDoppioLegame, serpenteMorto).
- App: osservaBestie -> "DA OSSERVARE" (Serpente morto, Uccello Rosso in crescita).
- Le 6 carte nuove nei riferimenti del trend (carte_trend.json = 53).

## PROSSIMO PASSO (Edu, 17/10/2026)
"rifare tutto quello che hai appena fatto sullo storico come sistema-trend sul LY e vedere quello che succede".
Come l'ho capito (DA CONFERMARE all'inizio della chat): lo stesso percorso del sistema D, ma con la domanda del Liu Yao
"il verdetto LY di questa carta e' giusto?" invece di "segue il trend?": catalogo per forma (caratteristica della data
che separa LY giusto / LY sbagliato), misura dentro e fuori dalla carta, incrocio con le altre voci, nuova piramide
con la voce nuova, prova su misura_vivo.js. Se Edu intendeva altro (per esempio il metodo del trend dentro la
lettura LY normale), correggere qui.
Ordine: 1) trade della notte + misura_vivo.js  2) conferma del prossimo passo  3) lavoro.

## PUNTI APERTI (oltre a quelli del S56)
- Soglia minima di casi per le regole di D.
- Verdetti opposti della stessa caratteristica su carte diverse (domanda a Edu).
- GBPUSD 06/10/2026: DLR tace nel dump, parla nell'app (feed ricostruito senza ramo del seme? da verificare).
- CHIUSO (S58): 8 e 9 ottobre sono giorni di clash giorno/mese, l'app non legge (non un buco della raccolta).
- Normale: il sabato il feed del Worker resta al venerdi', gli esiti del venerdi' (prevMovePip) arrivano col feed del
  lunedi'. Fino ad allora si calcolano da orario_live.json (lo fa misura_vivo.js).
- Domande del S56 ancora aperte: linea vuota in mezzo che ferma l'attacco (GBPUSD 13/12/2021); l'ora riempie il vuoto
  solo se di stagione?; Serpente morto sulla mobile (2 riferimenti contro +14); doppia combinazione col mese.
