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
- ORA DI PECHINO ESCLUSA CATEGORICAMENTE (Edu, 23/10/2026: "ricordalo"): giornata e ore sempre sull'ora di Londra (00:00 GMT);
  non proporla ne' misurarla, neanche per confronto.

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

## S58 — CORREZIONE IMPORTANTE (17/10 ore 13:30) E PROVA PULITA
- Il dump del S57/S58 arrivava al 07/10 per 8 cross (solo EURGBP al 18/09): i cataloghi per forma CONTENEVANO 7 dei 12
  giorni dal vivo (29/09-07/10). Le misure "dal vivo" della giornata (piramide DLR 66%, +938/+1.145) erano in parte
  dentro il campione. Detto a Edu.
- Storico allungato al 17/10 04:00 con orario_live.json (history_full_1h_f.zip), dump nuovo 4.330 carte fino al 16/10.
  rigenera_cataloghi.sh [DUMP] [FINO_A] rigenera D, LY, PB, DLR per forma; MINLATO=n = minimo di casi per lato.
- PROVA PULITA (cataloghi con le sole carte prima del 29/09, misurati sul 29/09-16/10): piramide in uso 80 · 56% · +349
  (punta 11 · 45%); con cantina 69 · 54% · +120; PB 75 · 52% · +102; S58 54 · 48%; S57 49 · 49%; trend semplice 83 · 55% · +426.
  Per forma da soli: LYF 52% +6, PBF 52% +10, DLRF 52% +223, D 51% +195. Con MINLATO=3/4/5 la piramide fa 58% +319 /
  58% +502 / 59% +542 (la punta quasi sparisce: 7/3/1 trade).
- Cataloghi in produzione rigenerati su TUTTE le carte fino al 16/10 (MINLATO=2, scelta di Edu "dentro il campione"):
  misurati sugli stessi giorni (che ora contengono) 79 · 75% · +1.501. Differenza fra le due misure = l'effetto del campione.
- Size per gradino: NON proposta, dal vivo pulito l'ordine dei gradini non tiene (punta 45%).
- DA DECIDERE CON EDU: tenere la piramide com'e', MINLATO=4/5, o tornare a un sistema piu' semplice.

## S58 (19/10/2026) — LA TAVOLA DELLA DATA (Edu: rendere prevedibile l'impatto di ora, giorno, mese, anno)
- Verifiche prima: dentro una forma ora e ramo del giorno sono quasi fissi (seme e linea mobile): ~2 ore e ~2 rami per
  forma; combinazioni reali ~138.000 (1,7 milioni con gli anni), non 3,3 milioni. Coppie della stessa forma: stesso vincitore
  S/Y 50% qualunque sia la somiglianza della data (stesso mese e giorno 188 coppie 47,9%). Regola per forma su 11 carte:
  esiti veri 77,6%, esiti a moneta 77,1% (103 forme da 9-13 carte). Tutto detto a Edu.
- tavola_data.js [mese|giorno|ora|anno]: ipotesi della dottrina scritte prima, misurate su tutte le carte, "vince S o Y".
  MESE (3.375 carte): stagione mese 70%/ora 30%, dodici stadi, trigrammi forti (tabella di Edu), sede sul ramo del mese,
  vuoto riempito dal mese, colpo dell'arrivo di stagione: tutte 48-53%. Tiene solo: il mese COLPISCE la sede (la sua bestia
  la controlla, o 六合 + controllo) -> la sede perde: M9 307 carte 58,6% z 3,0, 59% in tutti e due i periodi (LY sulle
  stesse 52,6%; in disaccordo col LY 136 carte, M9 56,6%; ago-ott 2026 10/15). La bestia del mese che AIUTA: 50,7%.
  M9 nata dopo aver visto M5 e M6b: da confermare su carte nuove. Prossimo: giorno, poi ora, poi anno.
  M10 (Edu: 'il mese clasha Y o S, e che succede?'): niente, 601 carte 49,8% (ferma 48%, mobile 53%, anche dal giorno 52%);
  il mese che clasha l'arrivo della mobile 54,6% su 293 (z 1,6). Conferma 'anno e mese non clashano, solo il giorno'.
- GIORNO (Edu "Passa al giorno", 19/10; tavola_data.js giorno, 18 ipotesi): tutte 44-52% (clash che sveglia o elimina,
  vuoto, sostegno, controllo, 六合, punizione, ramo del giorno, bestie del giorno, partenza bloccata, arrivo punito).
  Unica sopra: lo STELO del giorno genera la sede -> vince, 1.163 carte 53,5% z 2,4 (53%/54% nei due periodi), debole.
  Il "colpo" del giorno (stesso meccanismo di M9) fa 47,4% su 418: il colpo del mese potrebbe essere caso, va seguito.
- ORA e ANNO (Edu "Vai con ora e anno", 19/10): ora 15 ipotesi 45-51% (stagione nell'ora, ora che riempie il vuoto 45% su 56,
  bestie, clash, 六合, stelo dell'ora); anno 14 ipotesi 48-53% (Tai Sui sulla sede 53,2% su 596, sede vuota sul ramo
  dell'anno 58% su 91, z 1,6). Su ~65 ipotesi di tutti i pilastri: 2 sopra z 2 (colpo del mese 3,0; stelo del giorno 2,4),
  quante ne darebbe il caso.
- ACCUMULO (accumulo.js, principio di Edu 07/09 "e' l'accumulo a determinare il risultato, uno scalino sulla soglia"):
  condizioni per S meno condizioni per Y su tutte le ipotesi, senza pesi. Scarto 1: 50%, 2: 57%, 3: 49%, 4-5: 51%, 6+: 50,7%
  su 1.361. Nessuno scalino. Detto a Edu.
- TAVOLA NEL QUADRO DEL TREND (Edu: "Hai usato il sistema trend per queste carte?"; TREND=1 node tavola_data.js ...):
  stessa carta stesso giorno su cross diversi: stesso esito rispetto al trend 67% su 52 coppie (col LY 42%). Coppie della
  stessa forma per elementi della data in comune: 48,5 / 49,6 / 50,4 / 51,1 / 53,7 (374) / 57,9% (19) -> leggera salita
  (con carte diverse, 3 in comune: 53,3%). Su 71 ipotesi 3 a |z| 2,0: G1 il giorno clasha la sede ferma piena di stagione,
  vince 58,2% su 146; l'anno combina e controlla la sede, perde 56,5% su 230; (contro) M2b 46,6%. In CANDIDATI_OSSERVAZIONE.md.
  Colpo del mese nel quadro del trend 50,8%. Accumulo: scarto 1: 47%, 2: 46%, 3: 54%, 4-5: 52%, 6+: 49% (1.361). Nessuno scalino.
- CURVA DI APPRENDIMENTO (obiezione di Edu: cataloghi costruiti su backtest piu' limitati; curva_apprendimento.sh): stesse
  510 carte del 2026, cataloghi su 3/4/5/6 anni: piramide 57,2 / 54,9 / 56,8 / 57,5%; D 56,6/47,8/51,0/51,6; LYF 52,6/46,4/
  48,7/54,9; PBF 51,5/54,5/58,8/54,8; DLRF 46,0/46,6/51,0/55,6. Con la carta fuori e TUTTE le altre (3.300): LY per forma 51,8%.
- ORA DI INGRESSO (Edu: "le tre cifre a 03:00 GMT?"): pb_stress.js accetta ORAINGRESSO=hh (seme ed entrata alla barra hh:00,
  uscita 21:00); confronto_ingresso.js. Alle 03: 3.303 carte, PB 52,8 · LY 55,4 · AT 55,9 · DLR 58,8% (alle 00: 53,5 · 56,2 ·
  57,1 · 60,7). Ma il seme cambia solo in 216 cross-giorno su 2.705 (tre cifre significative, quasi sempre di 1): li'
  00 -> 03: PB 54->52, LY 53->50, AT 56->50, DLR 58->53% (216 carte, +-7 punti).
- SESSIONI PER CROSS (Edu: "quali cross rispondono a Londra, New York, Sidney?"; sessioni_cross.js; dump ORAINGRESSO 00/08/13,
  uscita 21:00): Sidney 00 e' la migliore o pari per quasi tutti i cross e tutti i sistemi (DLR 00: 57-65% per cross, 08: 51-59%,
  13: 49-57%). Sessione scelta per cross sul 2020-23 e provata sul 2024-26: DLR 59,5% contro 61,0% sempre alle 00; AT 56,5/56,6;
  LY 55,0/55,1; PB 52,2/52,5. Nessun guadagno: resta l'ingresso alle 00:00.
- MEZZANOTTE SOLARE LOCALE (Edu: "sempre alle 00:00 locali ... Londra, New York, Sidney/Tokyo, ora solare vera, per i cross
  piu' localmente affetti"): pb_stress.js LUOGO=londra|newyork|sidney|tokyo (pilastri in TST della citta', seme alla barra piu'
  vicina alla mezzanotte solare locale, uscita 22 ore dopo, trend con le chiusure prima dell'ingresso). Londra = sistema attuale
  (100% stesse carte). Mercato locale assegnato prima (AUD,NZD->Sidney; JPY->Tokyo; CAD->New York; il resto Londra):
  DLR 57,9% contro 60,7% sempre Londra (2024-26 57,1 / 61,0); AT 54,7/57,1; LY 54,2/56,2; PB 53,1/53,5. Scelta per cross sul
  2020-23 provata sul 2024-26: nessun guadagno. Resta la mezzanotte di Londra (00:00 GMT). LOCALI=1 node sessioni_cross.js.
- EURUSD 19/10/2026 s112 (Edu: "sta andando parecchio short, se il trend e' short S sta vincendo", "Si" a cablare), due regole:
  1) lettura_trend.js: L'ORA SALVA DAL FUORI GIOCO (mese 70% / ora 30%): sede troppo fuori stagione nel mese ma sul ramo/elemento
     dell'ora o generata dall'ora non e' fuori gioco (c.oraSalva=false spegne). Riferimenti 53/53. Il metodo parla su 184 carte in
     piu': 56,5% (2020-23 54%, 2024-ago26 59%); totale 53,8% -> 54,0%. Sulla carta: la Ying genera lo Shi -> segue -> SHORT.
  2) liuyao.js §94: se l'arrivo della B e' VUOTO la combinazione del giorno non la sospende (dal vuoto si esce solo col clash;
     la linea nel vuoto e' invalidata, 16/09). VIA94VUOTO=off spegne. Carte guida 84/114 invariate; nel backtest cambia 1 carta
     (NZDUSD 15/12/2021, ora giusta); LY 56,19 -> 56,22%. Sulla carta il LY passa da LONG (§94) a SHORT (§132 Shi/Ying).
- TREND E WEEKEND (Edu 19/10, grafico H1: "sicuro che e' short?"): il grafico di Edu e' H1 (EMA 12 ore). Il nostro trend e' l'EMA(12)
  sulle chiusure giornaliere delle 21:00. Dal 2026 i dati (storico e feed del Worker) hanno barre di SABATO (prezzo fermo) e
  DOMENICA (riapertura): contano come giorni nell'EMA. Lo storico 2020-25, su cui sono nate le regole, non le ha. Oggi 19/10 senza
  sabato e domenica cambia il trend di EURUSD (down->up), AUDUSD (up->down), EURJPY (down->up). Backtest FERIALI=1 (pb_stress.js):
  2020-25 identico; 2026 trend cambiato su 12/368, AT 55,9->57,4, LY 54,1->56,5, DLR 58,6->56,2; il 2026 aveva anche ~66 carte di
  sabato/domenica tradate. PROPOSTA a Edu: trend solo lun-ven ovunque (Worker da ripubblicare da Edu, raccolta, misura_vivo, backtest).
  Sulla carta EURUSD 19/10: col trend LONG il mercato che scende = non segue (nel metodo del trend vince la Ying).
  CORRETTO (Edu "Sistema subito questo EMA sbagliato!"): trend solo lun-ven in worker_index.js (isWeekendDate: chiusure
  giornaliere ed esito di ieri), raccolta_notturna.js (confronto), misura_vivo.js, pb_stress.js (default; FERIALI=0 rimette).
  WORKER PUBBLICATO DA EDU il 19/10/2026 alle 17:09. /run senza token (la raccolta lo chiama gia' cosi').
  Dal vivo 29/09-16/10 col trend corretto (cataloghi completi, dentro il campione): piramide 83 · 76% · +1.635; trend 87 · 56%.
- SEME A 5 CIFRE (Edu 19/10: carta divinatoria Bo L6 su EURUSD; "calcolare tutte e 5 le cifre sottraendo lo 0,3 e fare un backtest"):
  pb_stress.js SEME5=1 SEME5OFF=pip. Bo L6 esce con 1,12248 (Twelve Data 1,12251, broker di Edu 1,12265 medio). Backtest 2020-26:
  3 cifre PB 53,5 · LY 56,6 · AT 57,3 · DLR 60,4%; 5 cifre 50,8 · 50,9 · 50,7 · 51,3%; -0,3 pip 50,3 · 51,2 · 51,1 · 51,2%;
  +0,3 pip 52,0 · 50,3 · 50,7 · 50,6%. Con 5 cifre ogni carta e' nuova per le regole (nate sulle carte a 3 cifre): tutto ~51%.
- SOLO LA LINEA MOBILE (Edu 19/10: "la partenza ci dice come il cross e' partito, l'arrivo come finisce"; linea_mobile.js):
  13 letture fissate prima (yin->yang, arrivo piu' forte nel mese, arrivo genera/controlla la partenza, avanza/retrocede; in
  assoluto, col trend, o facendo vincere/perdere il trigramma della mobile): tutte 48,6-52,3% su 3.309 carte. La migliore:
  avanza -> il suo trigramma vince, retrocede -> perde, 52,3% su 623 (53% / 52% nei due periodi).
- PARTENZA/ARRIVO RISPETTO AL TREND (Edu: "Zi -> Wei finisce all'opposto ... rispetto al trend la spiegazione piu' ovvia";
  partenza_arrivo_trend.js; esempio EURJPY 25/09/2026 s180, L1 B Zi->Wei, trend LONG, esito -145): arrivo che controlla/clasha/害
  la partenza -> opposto al trend, che la genera/stesso/合 -> segue: 50,3-50,6% su 2.000+ carte. Solo il 害: 52,3% su 621; solo
  l'arrivo che controlla: 51,3% su 616. Andare sempre contro il trend da' gia' 51,4% (il trend segue il 48,6%). Nessun effetto.
  Gemella che sbaglia: EURUSD 22/01/2026 s116 (stessa forma, +83, segue). Edu: "questa e' combinata e l'arrivo e' clashato,
  ovvio che non puo' cambiare trend" (il MESE Chou combina Zi e clasha Wei) - segnalato il conflitto con "anno e mese non
  clashano" (09/09) e "il mese che combina non ferma la mobile" (13/10). Misura col movimento libero (dal giorno, o giorno+mese):
  arrivo che controlla -> opposto 50,8-51,0% su 310-413; bloccato -> segue 47,8-48,4%. Nessun effetto.
- METODO SEMPLIFICATO (Edu 20/10: "metodo semplificato in cui non conosciamo le regole complete" · "prendi la mia ultima
  correzione come prima regola"): metodo_semplificato.js. R1 = movimento bloccato (partenza o arrivo combinati/clashati dal
  giorno o dal mese) -> non cambia il trend, segue: 49,6% su 1.646 (base: il trend segue il 48,6%); solo dal giorno 50,0% su 1.005;
  dal 08/09/26 63,2% su 38 (trend 58%). In prova: movimento libero, arrivo contro -> opposto 51,5% su 557; arrivo che sostiene ->
  segue 47,0% su 491. Totale 49,6% su 2.694. Le regole successive le detta Edu, una alla volta.
- SEMPLIFICATO SPINTO AL MASSIMO (Edu 20/10: "trova tu tutte le regole che portano al massimo successo su tutto il backtest";
  semplificato_ottimo.js, risultato in semplificato_ottimo_risultato.txt): 84 caratteristiche della mobile + giorno/mese,
  3.570 condizioni, lista gradino per gradino (>=40 carte, >=56%). 62 regole, 3.239 carte su 3.309, 66,4%, +62.561 pip, ogni
  anno 63-70%. Costruito sul 2020-23 e provato sul 2024-26: 49,9% su 1.452. Costruito fino al 07/09/26 e provato dopo: 48,8% su 86.
- LINEA SENZA SOSTEGNO (Edu 20/10, EURJPY 17/06/2026 s186: "Non ha sostegno perche' l'unica linea Zi acqua su L5 e' vuota. Il
  mese e' Wu e il giorno e' Xu"; linea_senza_sostegno.js). Sostegno = linea non vuota che genera la mobile, o mese/giorno che la
  generano o stesso elemento. Mobile senza sostegno -> il trend non tiene: 54,4% su 401 (2020-23 52%, 2024-26 57%; base 51,4%).
  Ritirata + senza sostegno: 44,7% su 38. Ritirata sostenuta: 49% su 249. Candidata REGOLA 2 del semplificato (da confermare).
- COLPO DEL MESE CABLATO (Edu 19/10: "devi cablarlo, non aspettare"): colpo_mese.js (app, sw v70, raccolta notturna, voce
  "Colpo del mese"). Nella piramide DLR: il LY corretto dal colpo dove c'e', e il colpo da solo come ultimo gradino
  (SCALA=DLR_SENZA_CM lo toglie). PROVA PULITA (voci_da_moduli.js: cataloghi da 2020-23 con rigenera_cataloghi.sh, carte
  2024-26, 1.545): piramide 1.370 · 55,4% · +11.164 -> 1.389 · 55,7% · +11.909. Colpo da solo 145 · 57,9%.
  Dal vivo 29/09-16/10 (cataloghi completi): 79 · 75% · +1.501 -> 79 · 76% · +1.601.
- ATTENZIONE, stessa prova pulita 2024-26: DLR da solo 1.448 · 61,0% · +18.554 (2024 62%, 2025 63%, 2026 59%); DLR=attuale
  726 · 67,6% · +16.528; attuale 56,6%; LY 55,1%; voci per forma LYF 45,8%, PBF 52,1%, DLRF 50,9%, D 51,9%. La piramide
  fuori campione e' sotto il DLR da solo. Ma dal vivo 29/09-16/10 il DLR ha fatto 43% su 70 (dump e app diversi? GBPUSD 06/10).
  Detto a Edu.
- VERIFICA DLR (Edu "Si", 19/10): DLR dell'app = DLR del backtest su tutti i 66 cross-giorno dal vivo presenti nel dump
  (0 differenze; 24/54 in tutti e due). Nessun errore. Ma il motore DLR e' stato costruito dal 02/09 al 06/10/2026 sulle
  carte 2020-2026: il 61% sul 2024-26 e' dentro il campione anche lui. Carte MAI viste da nessuna regola (dal 08/09/2026,
  >= 20 pip, 95 carte): trend 60% (57/95), attuale 59%, LY 56%, DLR 52% (44/85), PB 46%. Mesi DLR: set 59%, ott 42% su 33.
  Detto a Edu: sui giorni nuovi nessun sistema batte chiaramente il trend; 95 carte = +-10 punti.
- Raccolta notturna: il report del giorno si fa una volta (il weekend riscriveva il venerdi'); ripristinato il 16/10.

## PUNTI APERTI (oltre a quelli del S56)
- Soglia minima di casi per le regole di D.
- Verdetti opposti della stessa caratteristica su carte diverse (domanda a Edu).
- GBPUSD 06/10/2026: DLR tace nel dump, parla nell'app (feed ricostruito senza ramo del seme? da verificare).
- CHIUSO (S58): 8 e 9 ottobre sono giorni di clash giorno/mese, l'app non legge (non un buco della raccolta).
- Normale: il sabato il feed del Worker resta al venerdi', gli esiti del venerdi' (prevMovePip) arrivano col feed del
  lunedi'. Fino ad allora si calcolano da orario_live.json (lo fa misura_vivo.js).
- Domande del S56 ancora aperte: linea vuota in mezzo che ferma l'attacco (GBPUSD 13/12/2021); l'ora riempie il vuoto
  solo se di stagione?; Serpente morto sulla mobile (2 riferimenti contro +14); doppia combinazione col mese.

## S58 · 20/10/2026 — Regola 2 del semplificato e semplificato nella piramide
- metodo_semplificato.js: REGOLA 2 di Edu (mobile senza sostegno -> il trend non tiene), dopo la regola 1. Sulle carte non
  bloccate: 182 carte, 53,8% (2020-23 53,6%, 2024-26 54,1%). Totale metodo con regole 1+2: 49,6% su 2.778.
- semplificato.js (generato da semplificato_genera.js con le 62 regole di semplificato_ottimo.js, fisse dal 20/10): voce SEMP
  nell'app, ultimo gradino della piramide DLR dopo CM. localStorage SENZA_SEMP=1 lo toglie (misura_vivo: env SENZA_SEMP=1).
  Caricato in index.html, sw.js (cache v72), raccolta_notturna.js; riga "metodo semplificato da solo" in misura_vivo.
- Dal vivo 29/09-20/10: piramide con SEMP 94 trade · 73% · +2.044; senza 90 · 77% · +2.098 (il gradino SEMP: 4 trade, 0 vinti, -54).
- REGOLA 3 del semplificato (Edu, 20/10, GBPUSD 20/03/2023): arrivo vuoto -> esiste solo la partenza, il trend rimane (segue).
  Ordine R1 -> R3 -> R2 -> P. Arrivo vuoto: 546 carte, segue 47,1% (stabile nei due periodi). carta_auto.js SOLOMOBILE=1
  (Edu: "lascia solo la linea originaria") per le carte del semplificato.

## S59 · 22/10/2026 — LEGGO IO, IL METODO CHE USA TUTTI GLI ALTRI (sistema in uso)
- Edu: la Lettura S47 si chiama "Leggo io" (22/10); poi "Leggo io dovrebbe scannerizzare tutti i metodi, uno per uno e
  giungere ad una conclusione sensata. Rendilo il metodo che usa tutti gli altri". Il vecchio motore (motore_lettura.js)
  ora si chiama "lettura della carta" ed e' una delle voci.
- leggo_io.js (app, raccolta notturna, sw v74): ogni voce (DLR, PBF, attuale, LY, colpo del mese, metodo del trend, PB,
  LYF, D, lettura della carta, DLRF) pesa ln(p/(1-p)) con p = affidabilita' sul 2022-23 su carte mai viste (cataloghi
  per forma costruiti solo sul 2020-21). Racconto: per LONG / per SHORT / tacciono / conclusione con margine e forza.
  Scelta della variante sul solo 2022-23 (pesi semplici, soglia 0). Si trada solo la conclusione FORTE (margine >= 0,6);
  media e debole si mostrano in "DA OSSERVARE" e si registrano. SCALA=PIRAMIDE (localStorage / env) rimette la piramide,
  LEGGOIO_TUTTE=1 trada anche media e debole.
- Misure (leggo_io_misura.js, cataloghi tagliati in una copia dell'archivio): 2022-23 forte 66,5% su 499, media 56,3%,
  debole 55,7%; 2024-26 (mai viste) forte 65,1% su 733 +15.086, media 53,9% su 393, debole 51,9% su 370, tutte 58,9% su
  1.496; dal vivo 29/09-22/10 con cataloghi fino al 28/09: forte 58,8% su 51, tutte 52,0% su 100. Con i cataloghi in
  produzione (dentro il campione fino al 16/10): forte 52 · 67% · +682. Giorni nuovi 19-20/10: forte 6 · 50% · -26.
- Voci da sole sul 2024-26 (mai viste): DLR 61,2% · attuale 56,6 · colpo del mese 57,1 (140) · LY 55,1 · lettura della
  carta 54,5 · metodo 54,3 · PB 52,9 · D 51,9 · PBF 51,5 · DLRF 51,0 · LYF 46,5 · trend 49,1. Dal vivo il DLR e' a 44%.
- BUG CORRETTO: livello_d_costruisci.js scriveva livello_d.json con percorso assoluto nell'archivio e livello_d_genera.js
  scriveva in ../trading relativo alla cartella corrente: lanciati da una copia, il catalogo D non veniva tagliato (D 76%
  "fuori campione"). Ora tutto relativo a __dirname. Le prove pulite S58 (lanciate nell'archivio) non ne sono toccate.
- PROSSIMO: Edu legge a mano i 7 trade persi del 19-20/10 (formato completo gia' dato, 21/10); le sue letture diventano
  regole della "lettura della carta", che e' la voce dottrinale dentro Leggo io.
- S59 bis (22/10, Edu: "Leggo Io deve leggere ciascun metodo da solo, sottoporlo a pro e contro dentro quell'unico metodo,
  trarre una conclusione e poi passare al successivo" · "metti in pausa i sistemi che combinano vari metodi e rifai lo scan"):
  leggo_io.js RIFATTO PER METODI (generato da leggo_io_misura.js + parametri): Metodo LY (LY con la sua via, lettura della carta
  col suo gradino, metodo del trend, colpo del mese, D, LY per forma), Metodo PB (PB, PB per forma), Metodo DLR (DLR con la sua
  via, DLR per forma). Dentro ogni metodo argomento = ln(p/(1-p)) con p della via/gradino (stima prima del 2024, ristretta
  verso la media), conclusione del metodo con l'affidabilita' della sua fascia di margine (2022-23); poi le tre conclusioni.
  Soglia 0,1 scelta sul 2022-23; si trada ogni conclusione sopra soglia. IN PAUSA: sistema attuale (non entra), piramide,
  cantina, scale A/B/C/D (restano con SCALA=...).
  Misure con cataloghi tagliati: metodi da soli 2024-26 LY 55,3 · PB 53,1 · DLR 60,7%; dal vivo LY 61 · PB 52 · DLR 47,5%.
  Leggo io: 2022-23 ~64%; 2024-26 59-61% (soglia 0,4: 62,5% su 869); dal vivo 29/09-22/10 50% su 86 (cataloghi fino al 28/09);
  coi cataloghi in produzione 62% su 90 (dentro il campione fino al 16/10); 19-20/10 (giorni nuovi) 7 su 12, +87 pip.
  I 7 persi della piramide: Leggo io ne prende 2 (EURJPY 19, EURUSD 20), saldo -6 pip invece di -164.
- PESO DEL DLR (Edu 22/10: "Dobbiamo trovare una via di mezzo, abbassa di un quarto fino a che non vediamo che riprende"):
  in leggo_io.js PESO = { LY: 1, PB: 1, DLR: 0,75 } (localStorage PESO_DLR lo cambia). Prova (leggo_io_peso_dlr.js): 2024-26
  peso 1 60,2% · 0,75 59,7% · 0,5 58,5% · 0,25 56,5% · 0 55,0%; dal vivo 50 / 50 / 50 / 52,9 / 52,6%. DA RIPORTARE A 1 quando
  misura_vivo.js "DLR da solo, ultimi 20 giorni di mercato" torna sopra il 55% (oggi 44% su 88). Controllarlo ogni lunedi'.

## S59 ter · 22/10/2026 — Le carte che Leggo io sbaglia (19-20/10), una alla volta
- Leggo io sul 19-20/10: 12 trade, 7 vinti; sbaglia EURUSD 19, NZDUSD 19, USDJPY 20, EURJPY 20, EURGBP 20. Formato (Edu):
  in testa trend EMA ed esito, poi carta, poi il ragionamento metodo per metodo e la conclusione.
- 1/5 EURUSD 19/10 s112 (trend LONG, Lio LONG media, -11): metodo LY SHORT 61% (giusto), PB LONG 58%, DLR LONG 67% x 0,75
  -> LONG 0,44. Senza il DLR sarebbe stato SHORT. Lettura di Edu del metodo LY, uguale al motore (§132): L5 Xu -> Hai,
  arrivo vuoto e fuori stagione, inutile; L4 Shen clashata dal giorno Yin va in Chou, sua tomba: zero per il trigramma
  alto; Y Zi genera S Mao -> SHORT.
- CABLATA (Edu: "e' dottrina"): 暗動 NELLA PROPRIA TOMBA -> nessuna azione. liuyao.js (la linea esce da R.anDong, va in
  R.anDongTomba, L.andongTomba), motore_lettura.js (la sveglia T4c non parla), lettura_trend.js (la sede sveglia non fa
  la sfida). Tombe: Legno 未, Fuoco 戌, Metallo 丑, Acqua 辰. LA TERRA NO: con Terra -> 辰 si rompeva USDJPY 24/07/2023
  s141 (Edu: "S clashato dal giorno avanza da Chou a Chen e vince"). ANDONGTOMBA=off / c.andongTomba=false spengono.
  Misura: 24 carte del backtest hanno la linea nascosta nella tomba, nessuna cambia verdetto (LY 56,71%, lettura della
  carta 53,58%, attuale 57,40%, metodo del trend 54% identici); carte guida 84/114, trend 53/53.
- Domanda ancora aperta (1/5): con una via dottrinale netta, il metodo LY deve poter prevalere su PB e DLR concordi?
- TERRA SENZA TOMBA (Edu 22/10: "per la Terra la tomba non esiste"): tolta anche da motore_lettura.js (TOMBA delle righe
  94 e 116; la Terra -> 辰 era un'estensione nostra, la guida di T0f2 e' Fuoco -> 戌). Lettura della carta 53,58% -> 53,61%
  (+84 pip): 15 carte cambiano (14 erano T0f2 su Terra in 辰), 8 ora giuste e 7 ora storte. LY, attuale, carte guida 84/114,
  trend 53/53 invariati. Lasciati: inventario_carta.js (struttura descrittiva da cui nascono le caratteristiche dei
  cataloghi per forma) e tombSha in pb_stress.js (prova del backtest).
- LY E METODO DEL TREND IN CONTRADDIZIONE (EURUSD 19/10): stesso vincitore (lo Shi), ma il LY lo traduce con la sede (basso ->
  SHORT) e il trend col trend (Shi = trend -> LONG). Su 2.705 carte dove parlano tutti e due: stesso vincitore e direzione
  opposta 703 (LY 52,6%), concordi 1.343 (61%). Come EURUSD (Shi vince, in basso, trend LONG) 215 carte, LY 52,1%.
  Regole solo del trend che pesano sulle opposte: oraSalva 48 (nata da EURUSD 19/10 col trend sbagliato del weekend; li' LY 42%),
  vuotoTimely 30 (LY 73%), vuotaPerde 24 (LY 71%), sostVuota 43 (LY 65%). Domande a Edu ancora aperte su oraSalva e sul vuoto.
- METODO DEL TREND SENZA CARATTERI (Edu 22/10: "In ogni caso, togli i caratteri"): spenti nutrire P/B rovescia, ritirata della
  sede B/P G/W, eliminazione G/W clashata, G/W non sede che retrocede, mese G che combina lo Shi. 53,7% -> 53,1% (2.652; 2024-26
  51,8%), opposte al LY 703 -> 648. Carte di Edu 53 -> 49 (EURGBP 07/10 s84, USDCAD 24/08 s137, EURJPY 26/08 s185, AUDUSD 24/09 s70):
  lettura_trend_rif.js ora da' 49/53 per scelta di Edu. c.senzaCaratteri=false rimette i caratteri.
- IL PILASTRO CHE COMBINA UNA SEDE LA BLOCCA (Edu: "il mese o il giorno o l'ora o l'anno che combina S o Y possono bloccarlo"),
  scritta in lettura_trend.js e SPENTA (c.meseBlocca 'S'|'entrambe'|'quieta', c.pilastriBlocca). Misura senza caratteri, carte
  cambiate: mese S 45 · 51,1% / S+Y 70 · 52,9%; giorno 38 · 44,7% / 68 · 48,5%; ora 46 · 56,5% / 126 · 48,4%; anno 55 · 52,7% /
  93 · 49,5%; tutti i pilastri 158 · 51,9% / 274 · 51,8%. Metodo intero 52,9-53,3%; opposte al LY 647-663. Su EURUSD 19/10 col
  mese -> SHORT. Carte di Edu 49/53 (tutti i pilastri S+Y 48/53).
- TOMBA SOLO FUORI STAGIONE (Edu 22/10: "la tomba e' tale solo quando l'elemento e' untimely"): il 暗動 nella propria tomba
  non agisce solo se la linea e' fuori stagione nel mese (liuyao.js, lettura_trend.js). LY, lettura della carta, attuale
  invariati; carte guida 84/114.
- FORZA PORTATA DALLA COMBINAZIONE (Edu 22/10, EURUSD 19/10: "Il giorno clasha L4 che si muove su Chou che si combina con Y,
  quindi Y riceve Shen che controlla S"), metodo del trend, principio 2 (c.forzaCombinata): la ferma non sede clashata dal
  giorno va al ramo del trasformato; se combina una sede, la sede riceve l'elemento della partenza e colpisce l'altra se lo
  controlla. EURUSD 19/10 -> non segue, SHORT. Backtest: 4 carte cambiano (1 giusta), metodo 53,1% invariato; carte di Edu 49/53.
- Provate e senza effetto (22/10): pilastro d'inizio e picco dei 12 giorni del trend (50-52%); giorno precedente col pilastro
  bestia+ramo di Shi e Ying (49-51%).
- LY §140 (R87_MEZZO, Edu 22/10, EURJPY 30/07/2026 s187: "L3 in mezzo clashato dal giorno si attiva assorbendo la forte You e
  trasferendo la sua energia a S" · "L3 e' sostenuta dal nascosto"): la ferma non sede clashata dal giorno, di stagione o
  sostenuta dal nascosto, in mezzo fra la mobile e una sede, generata dall'arrivo e che genera la sede -> la sede vince (la
  vuota solo se l'arrivo la clasha). Prima di §125. Backtest: decide 2 carte, 2 giuste (+354), LY 56,71 -> 56,74%; guida 84/114.
  Anche qui Edu col LY fa vincere lo Shi e il trend la Ying, stesso verso (come EURUSD 19/10).

## S60 · 23/10/2026
- METODO DEL TREND E SEMPLIFICATO A DORMIRE (Edu: "Mettili a dormire allora"): MT esce dal metodo LY di Leggo io (leggo_io.js,
  localStorage CON_MT=1 lo rimette); il semplificato non era in Leggo io. Dal vivo 29/09-22/10: Lio con MT 95 · 63% · +1.417,
  senza 97 · 63% · +1.486; col semplificato al posto di MT 102 · 61% · +1.207 (semplificato da solo dal vivo 49%).
- PB e trend: il PB dice "segui il trend" solo nel 29% dei casi (2020-26); PB 54,3% (2020-23), 52,6% (2024-26), dal vivo 51%.
- PB, prove del 23/10 (nessuna cambiata, Edu: "tieni il sistema originario"): base Ti/Yong senza correzioni 52,0/48,6%; Yong =
  trend e' lo specchio (45,7/47,4%); EMA 3-50: PB 52,3-53,5%, il 12 gia' nella zona migliore (8-26); seme + numeri dei pilastri
  (ciclo di 60) 52,0%, + numeri dei rami 50,3%; combinazione semplificato (arrivo che controlla indietro) + PB per posizione
  51,5% su 260 (EURJPY 02/09/2026 giusta, NZDUSD 22/01/2026 stesso schema sbagliata).
- HU GUA NEL PB (Edu 23/10: "buon segnale ed e' anche dottrina"): il PB dove decide lo Hu Gua fa 59% (2020-23, 154) e 63%
  (2024-26, 101); senza 53,8/51,7%. Via del PB in Leggo io (ROUTE.PB = pbHu, app passa e.pbHu) provata e SPENTA: Lio 2024-26
  75,9 -> 75,0% (cataloghi dentro il campione), dal vivo invariato. localStorage PB_HU=1 la accende.
- Prove sul seme del PB (23/10), tutte sotto l'attuale 53,5%: + pilastri (ciclo 60 / rami / lunari / solari, togliendo a turno
  anno-mese-giorno) 48-52%; seme del giorno d'inizio del trend 50,9-51,7%; somma dei due semi 49,8-49,9%.
- SLIDE DI JOSEPH YU SULLO HU GUA (23/10): tre tempi (presente / Hu Gua / Bian Gua), Hu letto sempre contro il Ti, stagione dei
  trigrammi, vuoto = "non ora". Lette a regole fisse: 49-51% (PB attuale 53,5%). Stagione dello Yong nel mese: morto 57,3%, a
  riposo 56,6%, in crescita 53,1%, prigioniero 51,7%, in apice 49,3% (668). Ti/Yong vuoti: nessun effetto.
- PB MUTO CON LO YONG IN APICE (Edu "Si"): plumblossom.js out.yongApice (Yong originale dello stesso elemento del mese); in Leggo io
  la voce PB tace (app.js, localStorage PB_APICE=1 la riaccende). PB da solo 54,3 -> 55,9% (2020-23), 52,6 -> 53,3% (2024-26).
  Lio: backtest 2024-26 75,9 -> 75,1% (cataloghi dentro il campione), dal vivo 97 · 63% · +1.486 -> 99 · 63% · +1.460.
- USCITE (23/10, uscite.js, barre orarie solo apertura/chiusura: stop e obiettivi controllati sulle chiusure orarie, spread
  escluso; dump SOGLIAPIP=0, tutti i giorni). Tenere fino alle 21 da' piu' pip quasi sempre. Gli obiettivi tagliano i vincenti
  (obiettivo 20-50: pip -15/-80%). Lo STOP 50 tiene i pip e taglia il peggior calo: LY 2024-26 +13.757 -> +12.161, calo -953 -> -808;
  DLR +17.294 -> +17.369, calo -1.022 -> -656; Lio (backtest) +39.335 -> +36.773, calo -710 -> -488; Lio dal vivo +1.455 -> +933 (99 trade).
  Stop 30: calo dimezzato, pip -6/-15%. Uscita anticipata (12/16): sempre peggio.
