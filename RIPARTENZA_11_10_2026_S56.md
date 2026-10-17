# RIPARTENZA S56 — 11/10/2026 (fine S55, 09-11/10/2026)

## COSA SI FA IN QUESTA CHAT (Edu, 11/10/2026: "si continua col sistema-trend")
SOLO IL METODO DEL TREND (lettura_trend.js, stesso file in storico-trading e trading). Shi = trend, Ying = contro-trend.
Claude legge da solo le carte storte del 2020-25 e porta a Edu SOLO quelle che non riesce a chiudere con le sue regole
(Edu, 10/10: "Mica mi vorrai far leggere a mano tremila carte"; "Portami le carte che non riesci a chiudere positivamente da solo").

## Primo controllo d'avvio
1. Se fra i file caricati NON c'e' chiave.txt, chiederlo ("Caricami chiave.txt col pulsante +"); senza chiave si lavora
   e non si pusha. Il token MAI in memoria, registro, ripartenza o repo. Push DIRETTO col token di chiave.txt
   (Edu, 11/10/2026: "evitami le richieste di approvazione del repository"): MAI add_repo, ne' in lettura ne' in push —
   i repo sono pubblici, si clonano con git e basta, e l'integrazione GitHub chiederebbe l'approvazione a ogni sessione.
   Fetch+rebase prima, commit come claude-push, poi il push col token nell'header (il token nell'URL a volte il proxy
   lo scarta): `B=$(printf 'claude-push:%s' "$TOKEN" | base64 -w0); git -c http.extraHeader="Authorization: Basic $B"
   push https://github.com/edufengshui/<repo> HEAD:main` (il token solo nel comando, mai salvato in file o config).
2. Clonare storico-trading e trading con `git clone` diretto (NON add_repo); `unzip history_full_1h_f.zip`; symlink full1h.json -> history_full_1h_from20200129.json;
   `mkdir work_trading && ln -s ../trading work_trading/pwa` (percorso assoluto del clone di trading); `npm install lunar-javascript`.
3. cmp dei motori fra i due repo (liuyao.js, motore_lettura.js, motore_dlr.js, trend_ly.js, lettura_trend.js).
4. Dump per le misure (5 minuti, in background):
   `VUOTO=1 SOPRAF=1 DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1 TRESIST=1 SOGLIAPIP=20 TRESISTDUMP=/tmp/tresist.json timeout 590 node pb_stress.js`
5. Controlli del metodo: `node lettura_trend_rif.js` (deve dare 31/31: le carte lette da Edu col metodo, carte_trend.json),
   `node lettura_trend_test.js /tmp/tresist.json` (misura), `node lettura_trend_categorie.js` (il principio 1 per tipo).
6b. QUANDO CLAUDE LEGGE DA SOLO UNA CARTA (Edu, 16/10/2026: "fra i punti da considerare che possono far pendere l'ago
   della bilancia ... metti questi due animali"): il Serpente morto (死) sulla Shi, Ying o mobile pesa contro il trend;
   l'Uccello Rosso in crescita (相) sulla mobile pesa per il trend. Cablato anche nel lettore nell'ordine (lettore_ordine.js).
6a. PUNTI DA OSSERVARE PRIMA DI DECIDERE UN CROSS (Edu, 16/10/2026): nell'app (report e registro, voce "DA OSSERVARE",
   funzione osservaBestie in app.js) il Serpente morto (死) sulla Shi, sulla Ying o sulla mobile -> il trend non tiene
   (64% su 326); l'Uccello Rosso in crescita (相) sulla mobile -> sostiene il trend (candidato, 61% su 80). Non decidono.
6. PRIMA DELLE CARTE portare a Edu i trade (Edu, 15/10/2026: "Che mi dici sui trade? Non mi hai portato niente"): esiti della
   notte e trade del giorno da registro_live.json / trade_persi.md (la raccolta notturna gira di nuovo dal 14/10).
7. Carta grafica PRIMA del testo: `node carta_auto.js "TITOLO" AAAA-MM-GG seme annoStelo annoRamo meseRamo giornoStelo giornoRamo out.png`
   poi SendUserFile; data della carta nei menu; incompatibili segnate come mobili.

## IL METODO A QUATTRO PRINCIPI (Edu, 10/10/2026: "Ok procedi") — leggiPrincipi, default
Ordine: 1 chi esce dal gioco -> 2 cosa fa il movimento a S e Y, 3 la forza nel mese decide se il colpo riesce ->
4 la forza ferma conta solo se nessun movimento decide. La lettura vecchia a 38 regole resta (c.versione='regole').
1. FUORI GIOCO: S e Y tutte e due troppo fuori stagione -> tace; trigramma in confusione totale -> tace; la mobile legata
   alla partenza DAL GIORNO non si muove (il mese che combina non la ferma, Edu 13/10/2026; vale anche nel LY normale:
   liuyao.js era gia' solo-giorno, in motore_lettura la bestia del mese che combina la partenza non impiglia piu' — MLIMPIGLIOMESE=on torna a prima); la sede che si muove nel vuoto (non se il giorno clasha l'arrivo) e'
   scartata; la G/W fuori stagione clashata dal giorno (ferma o mobile, non incompatibile) e' eliminata; la sede combinata
   e controllata dal giorno e' bloccata, salvo il flusso dello stelo del giorno forte nella data (vince lei).
   Sede fuori gioco ->
   a) se nel suo campo si muove un'altra linea, prende il posto (USDJPY 02/10/2024): prima lo scontro col clash (vince il
      piu' forte nel mese), poi cosa fa all'altra sede (colpisce -> vince il suo campo; nutre -> vince l'altra);
   b) se tutte e due le sedi sono vuote/fuori: le bestie dei pilastri, vince la sede presa (GBPUSD 20/12/2023);
   c) se nient'altro si muove: le bestie dal lato della sede fuori gioco, anche sulla sede stessa, pilastri in ordine
      anno-mese-giorno-ora, rami NON vuoti; se il pilastro genera la nativa resta la nativa, altrimenti la linea diventa il
      ramo del pilastro; confronto con l'altra sede: chi viene generato vince, chi controlla vince; bestie in disaccordo
      sulla stessa linea non aiutano; non vincono contro una sede molto di stagione (stesso elemento del mese)
      (USDCAD 26/11/2021, EURJPY 07/09/2026, EURUSD 30/11/2021);
   d) altrimenti vince l'altra sede.
2-3. IL MOVIMENTO (mobile, incompatibili, sedi stesse): nutrire avvantaggia, colpire (controllare, drenare, punire,
   tomba, clash) svantaggia. Sede che si muove: generata indietro +1 (qualunque carattere, +1 se il giorno genera
   l'arrivo), controllata indietro -1 (non se il mese fa da ponte e la sede e' forte), ritirata B/P +1 G/W -1; solo la
   sede MOBILE genera l'altra; la sede che si muove punisce (anche autopunizione) o clasha l'altra. Mobile non sede:
   generata indietro e gia' forte rafforza il suo campo; se la sua partenza genera una sede la nutre; ritirata non
   agisce; l'arrivo che genera la mobile tiene il beneficio (ma la punizione vale); vuota in mezzo ferma; sede di
   stagione si difende salvo arrivo forte (mai il ramo del mese); tomba; trigono arrivo+sede+mese/giorno; scontro col
   clash su una linea dell'altro trigramma; arrivo incompatibile va fuori (combina, stesso ramo, clash, genera).
   Sede nutrita da un'ALTRA linea che controlla l'altra sede la colpisce; sede troppo forte (stagione+giorno) non si
   lascia colpire dall'altra sede salvo punizione o sede nutrita da altri.
   COMBINAZIONE TOTALE (portata dal LY il 13/10/2026, EURUSD 31/01/2024 s108): nessun movimento agisce e un trigramma
   col suo trasformato e' 六合 su tre coppie con una linea che si muove -> la sua sede non vince, vince l'altra; col
   trigramma alto bloccato e la sede del basso vuota decide la linea piu' forte (se non sta nel trigramma bloccato).
   Misura: il metodo parla su 10 carte in piu', 14 giuste in piu' (1.346 -> 1.360 su 2.563). c.combTot=false spegne.
4. FORZA FERMA (solo se i movimenti pareggiano): Ying genera Shi; mese G combinato con lo Shi; raduno stagionale
   sede+giorno+mobile del suo trigramma; linea piu' forte nel campo della sede vuota; pilastri sulla sede; giorno+linea
   accanto che drenano; sede combinata e controllata dal mese; squilibrio di forza nel mese e nel giorno (scarto 3).

## MISURE DI PARTENZA (fine S55, dump TRESIST soglia 20 pip, 3.309 carte)
- Carte lette da Edu col metodo: 31/31 (lettura_trend_rif.js).
- Il metodo parla su 2.333, 53%; 2020-25 (mai viste dalle regole) 52% su 1.978; ago-ott 2026 65% (carte da cui
  nascono le regole: non e' una prova); scarto 2: 60% su 366. Col DLR concorde 62% su 1.105.
- Per principio sul 2020-25: 2 (il movimento) ~55%; 1 (fuori gioco) ~48%; 4 (forza ferma) ~49%.
- Principio 1 per tipo (lettura_trend_categorie.js): bestie dal lato 42% su 43 (DA RIVEDERE), sostituto 55% su 29,
  bestie con sedi vuote 55% su 29, Shi mobile nel vuoto senza sostituto 43% su 14, Ying mobile 63% su 24,
  eliminata dal clash: Shi G ferma 37% su 19.

## PUNTI APERTI DA NON DIMENTICARE (Edu, 13/10/2026: "non dimenticarti altrimenti ci muoviamo in cerchio")
A. DA CABLARE ALLA PRIMA CARTA CHE LO RICHIEDE: la bestia fa muovere una linea "solo se è già una linea mobile oppure
   è clashata dal giorno o dall'ora". Cablati: la mobile bloccata presa dalla bestia (17/19) e la sede ferma clashata
   dal GIORNO che si sveglia (USDJPY 24/07/2023). MANCA: la sede/linea clashata dall'ORA su cui cade la bestia, che la
   bestia fa muovere — scriverla sulla prima carta che la mostra, non a occhio.
B. La vuota abbandonata (vince l'altra sede) al 44% su 159: e' il posto dove lo sguardo di Edu compra di piu'; portargli
   le storte di quel tipo, ma solo dopo averle lette contro TUTTO il corpus (LY compreso).
C. Il doppio clash sulla timely "la attiva": forma piena dell'attivazione non ancora dettata (oggi resta solo in gioco).
D. Il mucchio "la Ying genera lo Shi" nella massa discorde (DLR e LY in disaccordo), ~26 carte storte.
F. CHIUSA (Edu, 13/10/2026, USDCAD 04/07/2023 s132 + gemella NZDUSD 16/11/2020 s68): "L4 ed L6 formano un trigono di
   metallo che genera S. S esce dal vuoto grazie alla bestia del giorno e dell'ora che prendono possesso della linea" —
   "linea vuota può essere posseduta da una bestia se questo si rivela necessario". Cablate: il trigono delle linee che
   si muovono (partenze e arrivi, anche l'arrivo annullato della mobile sospesa) che genera una sede la fa vincere
   (c.trigonoMobili); la sede vuota abbandonata lo riceve se una bestia di pilastro (ramo non vuoto, stesso elemento o che
   la genera) ne prende possesso. Il possesso dello stesso elemento ovunque (c.possessoStesso='sempre') resta spento:
   non "necessario" e 5 giuste in meno. Misura: 1.360 -> 1.363 giuste, 2.564 -> 2.567 parla. Carte del trend 49/49.
G. CHIUSA (Edu, 13/10/2026, GBPUSD 08/09/2022 s115): "Poiché S è molto timely e la linea immediatamente superiore si muove
   per generarla non può essere considerata vuota e vince". Cablata (c.vicinaGenera): sede vuota e ferma di stagione nel
   mese E sostenuta dal giorno (stesso elemento o generata), con la linea accanto che si muove (mobile o incompatibile,
   non legata dal giorno, anche verso il vuoto) e la genera col suo elemento -> non e' vuota, vince. E' un'eccezione a
   "vuota e ferma non riceve anche se timely". Misura: 1.363 -> 1.365 giuste. Carte del trend 50/50.
   Prove di Claude spente: possesso col confronto (-3), bestia che fa arrivare nel vuoto (rompe 2 riferimenti).
H. CHIUSA (Edu, 13/10/2026, USDCHF 29/06/2020 s94): "L5, L6 e il mese formano il raduno di fuoco generato anche dal
   giorno. Y è troppo timely per essere vuoto". Cablata (c.radunoVuota): la sede vuota e ferma il cui ramo chiude un
   raduno 三會 con altre linee non vuote e i rami della data (almeno una linea e un pilastro), raduno di stagione nel mese
   e generato dal giorno (o del suo elemento) -> non e' vuota, vince. La condizione del giorno separa EURUSD 08/06/2023
   s107 (stesso raduno 巳午未, giorno You: la Ying vuota perde, lettura di Edu). Misura 1.365 -> 1.368. Trend 51/51.
   APERTO per Edu: "molto timely" basta da sola (mese+giorno, senza linea accanto ne' raduno)? 14 carte, 10 per la vuota.
I. CHIUSA (Edu, 13/10/2026, USDCHF 09/05/2022 s98): "Y è indebolito da L5 che avanza per diventare una forte You la quale
   sostiene la parte contraria formando un trigono di metallo con L1 e S. Poiché l'ora è Chou, S non è vuoto. Il trigono
   di metallo drena Y". Cablate: (1) l'ora riempie il vuoto della sede di stagione (c.oraRiempie, perimetro stretto: solo
   Shi/Ying e di stagione); (2) il trigono arrivo+sede chiuso anche da una LINEA non vuota, e sostiene la sede qualunque
   carattere (c.trigonoSede). Misura: 1.368 -> 1.360 (l'ora da sola: 14 carte cambiano, 4 meglio e 10 peggio; il trigono
   -2). Trend 52/52. CONFLITTO SEGNALATO A EDU: l'ora che riempie va contro "dal vuoto si esce solo col clash" (08/09) e
   "il ramo vuoto che e' ramo del mese E dell'anno e' riempito" (14/09). In attesa: vale solo per la sede di stagione?
L. S57 (16/10/2026, Edu: "parti dall'assunto che il sistema esiste e sei tu che non lo stai catturando"): costruiti
   inventario_carta.js (tutte le strutture della carta, verificato sulle 52 carte di Edu: contiene cio' che lui nomina) e
   lettore_ordine.js (le domande sempre nello stesso ordine: fuori gioco, movimento, bestie/vuota, S contro Y, piu' forte,
   flusso). Prima versione: 22/52 sulle carte di Edu, 49% sul mercato (il vecchio metodo 53%). MISURA DIRETTA
   sull'inventario, 3.309 carte, base 48,3% che segue il trend: S controlla Y 47,5%, Y controlla S 49,4%, Y genera S 47,1%,
   S genera Y 50,8%; stagione delle sedi e scarto di forza fra 44% e 53% senza andamento; solo lo Shi vuoto pesa (43-46%).
   Portato a Edu. Proposta ancora aperta: 20 carte alla cieca.
M. CABLATA (Edu, 16/10/2026, "Confermo"): lo Shi mobile (non incompatibile, non combinato alla partenza dal giorno) con
   l'arrivo clashato dal giorno resta attivo alla partenza e vince; eccezione dalla sua lettura di EURUSD 08/07/2021: se la
   bestia di un pilastro cade sulla Ying e il suo ramo fa da ponte S -> ramo -> Y, vince la Ying (c.shiArrivoClashato).
   Trovata dall'inventario (unica struttura su 190 fuori dal rumore: 31/42, 73,8%, tutti e due i periodi). Misura:
   1.360 -> 1.362 giuste (le altre carte del gruppo hanno la partenza combinata dal giorno: doppio legame, non partono).
   Provate e scartate su richiesta di Edu: sede del trend = sede alta/bassa (50,8%), S = prima valuta del cross (49,0%).
N. CABLATA (Edu, 16/10/2026, GBPUSD 13/12/2021 s132, una delle 10 carte lette da Claude sapendo l'esito): "Y non può
   muoversi e L2 che avanza lo attacca pure. S è timely e vince". Il doppio legame del giorno (colpisce la partenza e
   combina l'arrivo, o lo speculare) ferma anche l'incompatibile; la sede cosi' ferma, fuori stagione, contro una sede di
   stagione: vince quella di stagione (c.incDoppioLegame). Misura 1.362 -> 1.357 (riportata, non decide). Trend 53/53.
   DA CHIEDERE: L2 attacca la Ying attraverso L3 vuota; la regola "vuota in mezzo ferma" oggi lo impedisce.
O. CABLATO (16/10/2026, Edu: "Tempo fa avevamo parlato dell'importanza del serpente nel trend"): il §81 (20/08) nel
   metodo del trend — il Serpente 螣蛇 sulla Shi o sulla Ying, morto nel mese (死) -> il trend non tiene, vince la Ying
   (c.serpenteMorto). Misura: 1.357 -> 1.387 giuste (53,9%), col DLR 63,3%. Il §81 sul totale delle carte: 326, non
   segue il 64,1% (2020-23 67%, 2024-26 60%), la struttura piu' forte trovata nella sessione. Sulla MOBILE non sede e'
   spento: rovescerebbe USDJPY 21/10/2024 e USDCHF 09/05/2022 lette da Edu (+14 giuste in piu', c.serpenteMobile=true).
   DA DECIDERE CON EDU: il Serpente morto sulla mobile.
E. Metodo di lavoro (Edu, 13/10): prima di portare una carta leggerla con tutte le sue dottrine, LY compreso; se una
   dottrina la chiude, cablarla e riportare solo il risultato. Non portare carte lette giuste e perse sul mercato.
   Se una sua spiegazione va contro una regola codificata, dirglielo. Non chiedere "procedo?" a ogni carta.

## SISTEMA D E SCALA S57 (Edu, 17/10/2026)
- SISTEMA D (livello_d.js, catalogo livello_d.json, rigenerare con livello_d_costruisci.js + livello_d_genera.js): per
  ognuna delle 258 carte (esagramma + linea mobile) ripetute almeno 5 volte, la caratteristica della data che separa
  meglio "segue/non segue il trend". Edu: "il sistema D e' tuo perche' le regole le hai trovate tu". Sulle sue
  ripetizioni spiega il 76,7% (2.286/2.982); con la carta fuori dalla propria regola 53,2%. Excel: Livello_D.xlsx.
- Sui 696 casi in cui D sbaglia il metodo del trend ha ragione al 51,7% (non li recupera).
- SCALA S57 nell'app e nella raccolta notturna (Edu: "un sistema gerarchico che integri tutti i livelli per scala di
  efficienza"). Prima la cantina (PB=LY=DLR, non si trada), poi: A attuale=DLR=metodo del trend 268 · 68,3%;
  B PB=DLR=Lettura S47 252 · 64,7%; C attuale=DLR=D 194 · 67,5%; D LY=attuale=DLR 256 · 61,7% (26 gen-lug 40% su 25).
  Totale 970 carte 65,5% +20.085 pip (D contato senza la carta nella propria regola). SCALA=S48 nel localStorage
  rimette la scala vecchia. I record del registro prima del 17/10 usano le lettere della scala S48.
- La raccolta notturna ora carica lettura_trend.js, inventario_carta.js, livello_d.js (prima il metodo del trend
  non girava di notte: l'app.js dell'archivio era indietro).
- PUNTO APERTO: la stessa caratteristica da' verdetti opposti su carte diverse ("Shi fuori stagione": non segue su
  13 carte, segue su 6). Chiedere a Edu se e' coerente con la dottrina. Prossimo lavoro: la carta 8/1 L3 (28 volte)
  con i casi sbagliati da D affiancati ai giusti, da leggere con Edu.

## DA DOVE RIPARTIRE
1. Le bestie dal lato (42%): leggere da solo le carte storte (`node lettura_trend_categorie.js "bestie dal lato"`).
   Ipotesi di Claude da EURUSD 30/11/2021, da provare: senza movimenti utili vince la sede piu' di stagione e le bestie
   decidono solo quando le due sedi si equivalgono. Portare a Edu solo le carte che non si chiudono.
2. La G ferma eliminata dal clash del giorno (Shi G ferma 37% su 19).
3. Il principio 4 (forza ferma) al 49%.
4. Punti aperti di S54 (dopo il trend): "decide il LY"; R79_AUTOPENA; perimetri di Claude; cantina fra un mese.

## FORMATO DELLA CARTA
Immagine PRIMA. Poi: cross, data, seme; trend; sistema; esito; segue/non segue; conclusione; trigrammi; data con
vuoti; linee con P/B/W/G/C e ramo in italiano (mai caratteri cinesi senza traduzione); incompatibili; cosa dice il
metodo; la lettura; UN punto da confermare. Mai respingere una lettura di Edu con una percentuale (Regola #10): la
misura si riporta, non decide. Portare le regole nel codice subito e pushare.
