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

## IL SISTEMA IN USO DAL 17/10/2026: LA PIRAMIDE (dal 17/10 ore 12:55 la PIRAMIDE DLR, vedi sezioni S58)
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

## S58 (17/10/2026) — IL SISTEMA LY PER FORMA (fatto)
Edu: "fare esattamente quello che e' stato fatto con il sistema-trend ma farlo con il LY ... vedere cosa succede se si
applica la logica LY a queste 11 [carte identiche]". Script: livello_ly_database.js (stesse caratteristiche della data
del sistema D, bersaglio "il LY ha ragione?"), livello_ly_forma.js. Dump TRESIST SOGLIAPIP=0 fino al 18/09, 3.354 carte >=20 pip.
- LY su tutte: 56,2% su 3.330, +29.306 pip; sul 2024-26 55,0% su 1.513.
- Catalogo per forma "LY giusto/sbagliato": dentro il campione 75,1%; carta fuori 51,8% (ogni anno 50-56%);
  regole 2020-23 sul 2024-26 49,6%. Controllo con "LY giusto" tirato a moneta: dentro 74,8%, fuori 53,9%.
  Lo stesso calcolo per il sistema D (segue il trend): dentro 74,5%, fuori 50,8%, nel tempo 51,7%.
- LY usato solo sulle forme dove ha avuto ragione: forme scelte sul 2020-23 (>=55/60/65%) danno sul 2024-26
  55,5/55,3/54,7% contro 55,0% di tutte. Andare contro il LY dove sbaglia: sempre sotto il 50%.
- Edu (17/10): "non mi interessa il risultato fuori dal campione, abbiamo gia' superato questa obiezione con il
  sistema-trend" -> costruito il catalogo come il sistema D.
- PRIMA VERSIONE SBAGLIATA (bersaglio "il LY ha ragione?"), corretta da Edu: "Il LY non lavora sul trend ma solo su chi
  vince fra trigramma superiore o trigramma inferiore, fra S o Y, e quindi dice se il trade del giorno va in alto o in basso".
- VOCE LYF (sistema LY per forma) = per ogni forma la caratteristica della data che separa i giorni ALTO dai BASSO, senza
  trend. livello_ly_costruisci.js (livello_ly.json, 248 forme con regola, voci in /tmp/voci_carte.json) ->
  livello_ly_genera.js -> livello_ly.js (app, sw v67, raccolta notturna). Dentro il campione 76,1% su 2.917.
- Contraddizione trovata: tradotta in "chi vince", la stessa caratteristica da' versi opposti su forme diverse
  (Shi fuori stagione: vince lo Shi in 12 forme, la Ying in 8; Shi di stagione 5 contro 4). Su tutte le carte la stagione
  di Shi o Ying da sola non sposta chi vince (46,8-53,2% contro 50,2%; Shi e Ying sempre in trigrammi diversi, 326/326).
- PIRAMIDE LY (piramide_costruisci.js, golosa, >=100 carte), SCALA=PIRAMIDE_LY (default resta PIRAMIDE S57):
  1 DLR=D=LYF 1.002 · 92,7% · cantina 532 · 55,1% · 2 PB=D=LYF 421 · 89,8% · 3 LETT=D=LYF 150 · 87,3% · 4 DLR=LETT=D 212 · 69,3% ·
  5 LY=MT=LYF 148 · 62,2% · 6 PB=DLR=LYF 120 · 61,7% · 7 LY=LYF 254 · 60,2% · 8 MT=D 133 · 60,2% · 9 DLR=LYF 110 · 60,0% ·
  10 AT=DLR 101 · 57,4%. Totale 2.651 · 79,5% · +90.276 (in uso sullo stesso dump 2.334 · 78,4% · +78.105).
- Dal vivo 29/09-16/10: LYF da sola 64 · 61% · +389 (LY 83 · 55% · +324). Piramide LY 64 · 58% · +513 (gradini 1-4:
  39 · 69% · +642; 5-7 14 · 50%; 8-10 11 · 27%); piramide in uso 57 · 61% · +834 (gradini 1-4: 25 · 52% · +308).
- PIRAMIDE S58 IN USO DAL 17/10/2026 (Edu: "Si", default 'PIRAMIDE' in app.js e nella raccolta notturna; SCALA=S57 la
  vecchia, SCALA=PIRAMIDE_LY la LY intera): 1 DLR=D=LYF · cantina · 2 PB=D=LYF · 3 LETT=D=LYF · 4-13 la S57 sulle rimaste.
  Backtest 2.440 · 79,2% · +84.455 (1-3: 1.573 carte 91-93%; 4-6 63-66%; 7-13 46-55%: candidati da tagliare).
  Dal vivo 29/09-16/10: 61 · 61% · +849 (punta 19 · 63% · +296; 2-4 25 · 64%; 5-7 5 · 40%; 8+ 12 · 58%); S57 57 · 61% · +834.
  IBRIDA=1 node piramide_costruisci.js la misura sul backtest.

## S58 — IL SISTEMA PB PER FORMA (Edu 17/10: "vogliamo vedere cosa succede con il PB? ... applicando la stessa logica")
- livello_pb.js (caratteristiche in termini PB: stagione di Trend/Yong/Yong trasformato nel mese, chi e' piu' forte, cosa
  fanno giorno/mese/anno/stelo del giorno a Trend e Yong, trasformato e reciproci contro il Trend, palazzo del Trend
  (autopunizione, spazzato, attacco/difesa, combinato), ora vuota, vie PB) + livello_pb_costruisci.js (catalogo
  livello_pb.json, aggiunge PBF a /tmp/voci_carte.json; prima gira livello_ly_costruisci.js) + livello_pb_genera.js.
  Forma = carta PB (sup/inf + linea mutante del PB). Bersaglio "segue il trend" (il PB legge Trend contro Yong).
  264 forme con regola, dentro il campione 78,0% su 3.070 (PB normale 53,5%). App: voce "Sistema PB per forma", sw v68.
- PIRAMIDE PB (SCALA=PIRAMIDE_PB): 1 D=LYF=PBF 1.471 · 94,1% · cantina 466 · 68,0% · 2 DLR=LYF=PBF 138 · 86,2% ·
  3 DLR=D=LYF 117 · 79,5% · 4 DLR=D=PBF 315 · 73,0% · 5 PB=LY=LYF 119 · 72,3% · 6 LY=D=PBF 226 · 65,9% · 7 MT=LYF 122 · 60,7% ·
  8 PB=PBF 145 · 57,9% · 9 DLR=LETT 101 · 56,4% · 10 LY=AT 126 · 50,8%. Totale 2.880 · 81,3% · +105.088.
- Dal vivo 29/09-16/10: PB da solo 83 · 53% · +18; PBF da sola 71 · 63% · +907. Piramide PB 74 · 65% · +896 (punta 34 · 74% ·
  +635; 2-4 12 · 33%; 5-7 15 · 73%; 8+ 13 · 62%); piramide S58 in uso 61 · 61% · +849. Settimana 12-16/10: 26 · 58% · +50.
- PIRAMIDE PB IN USO DAL 17/10/2026 (Edu: "Si"): default 'PIRAMIDE' in app.js -> PIRAMIDE_PB (anche la raccolta notturna).
  SCALA=S58 rimette la piramide con i 3 gradini LY + S57, SCALA=S57 quella del mattino, SCALA=PIRAMIDE_LY la LY intera.

## S58 — IL SISTEMA DLR PER FORMA (Edu 17/10: "Per ultimo il DLR, si puo' fare lo stesso anche li'?")
- livello_dlr.js: forma = le quattro lezioni coi caratteri (B C W O G P di R1-R4), 430 forme, ~11 ripetizioni; caratteristiche
  in termini DLR (stagione/vuoto di R1, R3, M1; cosa fanno mese e anno a R1, R3, M1; R1 contro R3; spiriti su R1-R4 in italiano;
  generale sopra l'ora; metodo; carattere di M1 e dell'ora). Bersaglio ALTO/BASSO (Host vince -> LONG), senza trend.
  livello_dlr_costruisci.js (dopo ly e pb; livello_dlr.json, DLRF nelle voci) + livello_dlr_genera.js. 248 forme con regola,
  dentro il campione 78,5% su 2.670 (DLR normale 60,8%). App: voce "Sistema DLR per forma", sw v69, raccolta notturna.
- PIRAMIDE DLR (SCALA=PIRAMIDE_DLR): 1 LYF=PBF=DLRF 1.073 · 97,2% · cantina 571 · 68,7% · 2 D=LYF=DLRF 132 · 90,9% ·
  3 D=LYF=PBF 439 · 88,8% · 4 D=PBF=DLRF 320 · 88,4% · 5 DLR=LYF=DLRF 115 · 70,4% · 6 LYF=DLRF 100 · 70,0% · 7 DLR=PBF 215 · 70,7% ·
  8 LY=DLRF 103 · 66,0% · 9 LETT=MT 113 · 60,2% · 10 LY=AT=LETT 107 · 47,7%. Totale 2.717 · 85,6% · +110.567.
- Dal vivo 29/09-16/10: DLR da solo 70 · 43% · -207; DLRF 60 · 62% · +694. Piramide DLR 68 · 66% · +938 (punta 18 · 78% · +423;
  2-4 28 · 64% · +410; 5-7 10 · 60% · -27; 8+ 12 · 58% · +132); piramide PB in uso 74 · 65% · +896. Settimana 12-16/10:
  DLR 23 · 57% · +116, PB 26 · 58% · +50.
- PIRAMIDE DLR IN USO DAL 17/10/2026 ore 12:55 (Edu: "Si"): default 'PIRAMIDE' -> PIRAMIDE_DLR (app e raccolta notturna).
  SCALA=PB la piramide PB, SCALA=S58, SCALA=S57, SCALA=PIRAMIDE_LY le precedenti. Ogni lunedi': misura_vivo.js con
  SCALA vuoto, PB, S58, S57 affiancate, prima delle carte.
- CANTINA ABOLITA nella piramide DLR (Edu 17/10 13:06: "Se migliora il sistema generale, si"): le carte PB=LY=DLR scendono
  nei gradini 2-10. Backtest 3.268 · 84,9% · +131.515 (con cantina 2.717 · 85,6% · +110.567); dal vivo 80 · 66% · +1.145
  (con cantina 68 · 66% · +938); settimana 12-16/10 31 · 58% · +163. SCALA=DLR_CANTINA rimette la cantina.
  Varianti provate: cantina tradata se >=2 voci concordano 3.074 · 85,5% / vivo 71 · +950; contro la cantina se >=2 voci
  contrarie 2.758 · 85,6% / vivo 70 · +1.073.

## PUNTI APERTI (oltre a quelli del S56)
- Soglia minima di casi per le regole di D.
- Verdetti opposti della stessa caratteristica su carte diverse (domanda a Edu).
- GBPUSD 06/10/2026: DLR tace nel dump, parla nell'app (feed ricostruito senza ramo del seme? da verificare).
- CHIUSO (S58): 8 e 9 ottobre sono giorni di clash giorno/mese, l'app non legge (non un buco della raccolta).
- Normale: il sabato il feed del Worker resta al venerdi', gli esiti del venerdi' (prevMovePip) arrivano col feed del
  lunedi'. Fino ad allora si calcolano da orario_live.json (lo fa misura_vivo.js).
- Domande del S56 ancora aperte: linea vuota in mezzo che ferma l'attacco (GBPUSD 13/12/2021); l'ora riempie il vuoto
  solo se di stagione?; Serpente morto sulla mobile (2 riferimenti contro +14); doppia combinazione col mese.
