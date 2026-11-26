# RIPARTENZA S78 — la bilancia, Lio per cross, carte 10 e 11 (chat del 24-25/11/2026)

Leggere prima: questo file, poi ESITI_BILANCIA_25_11_2026.md (tutti i numeri di oggi), poi RIPARTENZA_24_11_2026_S77.md (EA e
avvisi Telegram: i 6 passi sono ANCORA DA FARE) e RIPARTENZA_24_11_2026_S76.md (avvio, QMDJ, patto).
Avvio come in S76. REGOLA DI EDU: la frase per aprire una chat nuova comincia con "Trading". Chiedere chiave.txt se manca.

## COSA VUOLE EDU (25/11) — NON DIMENTICARLO
- "Dobbiamo ragionare in modo complessivo prendendo diverse indicazioni perche' spesso non ce n'e' una definitiva ma tante piccole
  che vanno messe insieme e ognuna fa pesare la bilancia da un lato. Abbiamo parlato per nulla?" (rimprovero: avevo di nuovo
  cablato UN interruttore, "View con clash interno: spenta", invece di pesare le sue tre indicazioni insieme).
- Nella bilancia entra anche lo storico del tipo di trade (es. AUDUSD debole contro il trend).
- "Per sapere come distribuire i pesi serve fare dei test."
- "E' probabile che alcuni aggiustamenti sul singolo cross siano comunque necessari. Il caso di AUDUSD che Lio continua a perdere
  e' un campanello d'allarme che non si puo' ignorare."
- Le spiegazioni devono cominciare da una sintesi finale, in parole semplici ("temo che devi rispiegare tutto").

## FATTO
- CARTA 10, USDCHF 23/11/2026 (seme 84, Ji Hai, yin 8; trend LONG, salito 6 pip; Lio SHORT media sbagliato, EA -10,4; tutto il QMDJ
  tace: ZF in Dui e TY in Qian paralleli, DS in Dui, HS in Qian). Domanda a Edu SENZA RISPOSTA: "alla pari, e' giusto dire fermo,
  non si entra, o uno dei due prevale (ZF col DS; TY con HS, stelo del mese, ramo Hai)?"
- CONTROLLO DEL PATTO alla decima: nessun gruppo con Lio sotto il 50%. Edu non ha detto "si cambia strada": si e' passati alla bilancia.
- AUDUSD 25/11 (Lio LONG debole contro trend SHORT, seme 66 per il terzo giorno): il QMDJ diceva LONG solo per la regola di View
  ("View in Dui"). Edu: "View ha un clash interno! Dui e' pure debole e il clash e' contro lo stelo del mese nel dipan".
  CABLATO e caricato (trading e copia in storico-trading): QMDJ_VIEW_SU_CLASH_INT (default true), View con clash interno nel suo
  palazzo non spinge in su. Ora la carta dice SHORT, segue (contro Lio). ESITO DEL 25/11 DA GUARDARE.
  "Dui debole" e "clash contro lo stelo del mese" NON sono condizioni nel software: sono pesi da mettere nella bilancia.
- BILANCIA, simulazioni (solo script in qmdj_lavoro/bilancia_*.js|py; NIENTE nel software che decide, niente nell'EA):
  pesi a 1: per Lio 70,5% · 65,8%; pari 61,4% · 63,9%; contro 51,9% · 57,2%. Pesi stimati: non battono i pesi a 1.
  Solo 5 indicazioni (View su, il controllo tiene, fan yin, ZF vuoto del giorno, base "controlla"): contro Lio 48,4% · 49,2%
  (64 e 65 trade) ma scelte sugli stessi dati. Il flusso del qi su View misura al contrario (da riguardare su una carta).
  Sugli 8 AUDUSD dal vivo la bilancia non avrebbe aiutato. Edu: "quindi e' sbagliata la bilancia". Risposta: e' incompleta
  (usa solo cio' che la cascata scrive, pesi uguali, non guarda lo stato del palazzo); servono le indicazioni che vede lui.
- LIO PER CROSS: saltare i cross o le caselle andate male sul passato perde pip in tutte le 11 varianti; AUDUSD in calo dal 2025
  (59,7%, 58,3%; da giugno 53,6%) ma mai in perdita. Proposta fatta: sorvegliare ogni cross nel registro in avanti.
- CARTA 11, AUDUSD 29/10/2026 (seme 70, Ding You, yin 2; trend LONG, sceso 29; Lio LONG debole sbagliato; QMDJ "non segue" GIUSTO
  per il fan yin; bilancia a 1 sbagliata). Edu: "E' un fan yin totale". Misura: il fan yin totale da solo non separa (48,4% · 50,9%).
- Stessa carta, Edu alla domanda "oltre al fan yin totale cosa rendeva chiaro che non avrebbe seguito?": "I vuoti del giorno"
  (Shen You: toccano Kun, dove stanno ZF e ZS, e Dui; anche il ramo dell'ora You e' vuoto del giorno). NON CABLATO: va nella bilancia.
  Misura (qmdj_lavoro/fanyin_vuoti.js): fan yin totale + ZF toccato dai vuoti del giorno: segue 50,0% (32) · 50,0% (26), non separa;
  fan yin totale + ramo dell'ora vuoto del giorno: segue 41,9% (31) · 45,5% (11), nel verso giusto ma pochi casi.
  DA CHIEDERE A EDU: i vuoti del giorno su COSA (ZF/ZS in Kun, o l'ora You)?
- Edu: "Se fan yin sta intorno al 50% non lo tradare!". ATTENZIONE, equivoco mio: il 50% era "il mercato segue il trend" (che e'
  50% su TUTTE le carte), non "Lio vince". Misura giusta (qmdj_lavoro/fanyin_lio.js): nei giorni di fan yin totale Lio vince
  70,9% (55 trade, +875 pip) · 59,0% (39, +455); col fan yin del software 67,0% (276, +5.733) · 63,5% (282, +4.229).
  Saltarli farebbe perdere pip. Il principio di Edu resta: dove LIO sta intorno al 50% non si trada.
- Edu: "Ho anche detto che lo ZF e' vuoto": la sua lettura della carta 11 e' fan yin totale + ZF vuoto coi vuoti del giorno
  (ZF in Kun, Shen vuoto) = non segue. Risposta alla domanda aperta: i vuoti del giorno sono sullo ZF.
  Misura su Lio (fanyin_lio.js): ZF toccato dai vuoti del giorno, Lio vince 70,2% (554) · 65,5% (516), col trend 71,8% · 65,7%:
  come sempre. Fan yin totale + ZF toccato: 9 trade (9 vinti) · 13 trade (7 vinti): troppo pochi per dire qualcosa.
  Unico gruppo debole visto: ZF toccato + Lio debole contro il trend 43,6% (55) · 50,0% (62).
- Pagina "Carte dove Lio sbaglia": carte 10 e 11 in cima (versione 1795597825-9c05).

## DOPO LA RIPARTENZA (25/11, chat nuova, mattina)
- Edu: "Non voglio che il disastro di una perdita continua su AUDUSD si ripeta. Il qimen aveva detto di andare Short ma tu lo hai
  ignorato". Fatti: l'EA non legge il qimen (solo cross, verso, forza di Lio); qmdj_live.json del 25/11 (00:12 GMT) diceva AUDUSD
  LONG "accordo" per la regola di View; lo SHORT e' venuto solo dopo la correzione di Edu (View con clash interno).
- Edu: "dove Lio sta intorno al 50% non si trada!". CABLATO in storico-trading (qmdj_registro.js: NON_TRADARE, nonTradare,
  segnaliSaltati; raccolta_notturna.js scrive "saltati" in segnali.json): AUDUSD debole contro il trend NON va piu' all'EA
  (Lio 46,7% su 30 · 40,9% su 22). Resta nel registro e si continua a misurare. Vale dalla notte del 26/11. Il trade del 25/11
  (AUDUSD LONG debole) era gia' aperto: segnali.json di oggi non toccato.
  Non ferma i "media" (il perso del 23/11 era media). EURGBP debole (50,6% · 50,7%), col trend e contro: tolto dall'EA allo stesso modo (Edu: "Ovvio").
  REGOLA: ogni casella dove Lio sta intorno al 50% nei due periodi si toglie dall'EA senza chiedere.
- Edu: "anche ieri abbiamo discusso di un clash interno come fattore negativo che pesa sulla decisione finale che si fa prendendo
  in considerazione molti aspetti, non solo uno". Il clash interno era gia' stato dettato sulla carta 9 (TY) il 24/11: vale come
  PESO NEGATIVO su chiunque stia in quel palazzo (TY, View, ZF...), dentro la bilancia; non un interruttore per un solo caso.

- BILANCIA DENTRO qmdj.js (Edu: "Si"), 25/11 mattina: funzione bilancia(c, trend) in qmdj.js (trading e copia in storico-trading).
  NON cambia nessun verdetto, non entra nell'EA. Elenca, pesi a 1: argomenti dello ZFTY (DsHs se tace o paralleli) compreso
  "il controllo tiene"; ZF sopra Geng (contro lo ZF) e clash interno nel palazzo del TY (contro il TY); se ZF controlla TY gli altri
  fattori del 24/11; ZF vuoto / toccato dai vuoti del giorno; fan yin totale; ZF aiutato da Tai Sui e DS; View su, che vale 0 se
  indebolita (clash interno, clash contro lo stelo del mese nel di pan, palazzo debole nel mese, DS timely, prossimo Commander).
  qmdj_registro.js la scrive ogni notte in qmdj_live.json (campo "bilancia": voci, somma con Lio 1 punto, 2 se forte) dal 26/11.
  LIMITE: gli argomenti interni sono ancora quelli che la cascata scrive. NON ANCORA MISURATA sullo storico.
  RISPOSTA DI EDU sul clash interno nel palazzo dello ZF: "Lo ZF sarebbe Jia quindi l'unico clash serio avviene se sta sopra
  Geng". CABLATO nella bilancia: sullo ZF pesa solo Geng nel di pan del suo palazzo; gli altri clash interni NON pesano sullo ZF.
  (Sul TY e su View il clash interno resta un peso, come dettato il 24 e il 25/11.) AUDUSD 25/11: bilancia QMDJ SHORT 2-0,
  con Lio LONG debole SHORT 2-1 (contro Lio).

- Dal vivo (contato il 25/11): EA 10 trade in 4 giorni (18, 19, 20, 23/11), 4 vinti, -58,6 pip, -5,46 EUR. Lio nel registro dal
  23/10: 62 trade chiusi, 36 vinti (58,1%), +418 pip; forti 16 su 28.
- Edu (25/11): "Vorrei che tu applicassi il ragionamento multiplo che gia' hai adottato con Lio, alle carte qimen. Fallo sulla
  prossima che Lio ha sbagliato". CARTA 12, AUDUSD 28/10/2026 (seme 70, Yi You, yin 2; trend LONG, salito 23; Lio SHORT media
  sbagliato; ZFTY "non segue" sbagliato per la sola regola "ZF bloccato da una combinazione" Geng su Yi in Zhen; DsHs tace).
  Lettura di Claude a bilancia (scritta conoscendo l'esito), DA VALIDARE: per "segue" TY in Kan genera ZF; DS e HS in Kan generano
  ZF; View in Gen col Tai Sui (Bing, stelo dell'anno) forte e non clashata; ora Yi You che tocca lo ZF. Contro: combinazione
  Geng-Yi; Zhen debole nel mese Xu; Kan debolissimo; You vuoto del giorno. Conclusione: segue.
  TROVATO: con QMDJ_TAISUI_DOVE='stelo' (dottrina di Edu del 22/11) la regola di View scatta e il verdetto e' LONG, giusto; il
  software sta ancora su 'ramo' perche' la decisione ramo/stelo era aperta.
  RISPOSTA DI EDU: "No, non lo blocca perche' quel Geng non e' veramente Geng, e' Jia". CABLATO in bloccato() (qmdj.js, trading e
  copia): lo stelo del Commander nel cielo del palazzo dello ZF e' Jia, non si combina con la terra; QMDJ_COMB_JIA=false per le
  prove. Ora la carta 12 dice LONG, segue, giusto. Misura (qmdj_lavoro/comb_jia.js, trade di Lio): carte cambiate 37 -> 28 e
  26 -> 22; su quelle il verdetto giusto passa da 32,4% a 60,7% nel 2020-23 e resta 50,0% nel 2024-26; unito 54,4% -> 54,8% ·
  52,4% -> 52,4%. Dottrina: resta accesa.
  TAI SUI: Edu (25/11): "Si', il Tai Sui e' lo stelo dell'anno nel qimen". CABLATO: QMDJ_TAISUI_DOVE default 'stelo' (View nel
  palazzo del Tai Sui, ZF aiutato, eccezione di Geng 'ts', decide()); 'ramo' solo per le prove. DECISIONE CHIUSA (era aperta da S75).
  Misura (qmdj_lavoro/taisui_stelo.js, taisui_view.js): COSTA un po'. Unito 54,8% -> 54,2% · 52,4% -> 51,6%; sulle carte cambiate
  (176 · 189) il verdetto giusto scende da 54% a 46%. View col ramo dell'anno: il cross sale 51,1% · 55,2%; con lo stelo 52,9% ·
  52,0% (tutte le carte 50,4% · 50,5%). ZF aiutato da Tai Sui (stelo) e DS: segue 59,0% · 42,5%. Detto a Edu; resta 'stelo' per dottrina.
  Carta 12 con le due correzioni: ZFTY LONG, bilancia QMDJ LONG 2-0. Dal 26/11 la notte usa queste regole.
  In pagina "Carte dove Lio sbaglia" in cima.

- Edu (25/11, alla proposta di cambiare chat): "Ancora una nuova chat? Abbiamo appena iniziato" -> non proporla presto; solo
  quando serve davvero.
- CARTA 13, EURJPY 06/11/2026 (seme 176, Xin Wei, yin 8; trend LONG, sceso 21; Lio LONG forte sbagliato; DsHs, ZFTY (paralleli
  Kun/Gen) e unito "non segue" GIUSTI per il fan yin; bilancia QMDJ SHORT 2-1 giusta, con Lio forte LONG 3-2 sbagliata).
  Lettura di Claude a bilancia, DA VALIDARE: stessa figura della carta 11 (fan yin di stelle e steli, ZF in Kun toccato dai vuoti
  del giorno Wu Wei, ramo dell'ora Wei vuoto del giorno e nel palazzo dello ZF). Ora che decide: Xin Wei (13-15 GMT) 31 pip contro.
  DOMANDA A EDU: il fan yin delle sole stelle e steli (non delle porte) pesa come il fan yin totale o meno?
  In pagina in cima (versione nuova). Da presentare dopo: le altre carte sbagliate da Lio dal registro (trade_persi.md).

- Edu su EURJPY 06/11: "Lio ha comunque sbagliato questa carta, quindi o il qimen interviene per aggiustare la decisione finale
  oppure bisogna capire perche' Lio ha sbagliato". TROVATO: "forte" in Lio vuol dire che i tre metodi sono d'accordo (qui 55%, 58%,
  60%), non che non c'e' niente contro; fuori da Lio erano contro: Semplificato (regola 13), stelo, sistema D, qimen.
  Misura (qmdj_lavoro/lio_voci_contro.js, 2020-23 · 2024-26): forte senza voci contro 85,2% · 77,4%; forte con Semplificato E qimen
  contro 64,1% · 61,8% (resta sopra: si trada, a lotto minimo perche' il qimen e' contro); media con Semplificato E qimen contro
  47,9% (146) · 45,4% (163), pip -461 · -617; debole col sistema D contro 36,7% (245) · 42,0% (193), pip -3.667 · -908;
  media senza voci contro 77,5% · 73,0%; media col sistema D contro 51,4% · 45,0% (non cablato).
  CABLATO in qmdj_registro.js (motivoNo; segnali.json scrive "saltati" col motivo), dal 26/11 NON vanno all'EA:
  Lio debole col sistema D contro; Lio media col Semplificato e il qimen contro. Restano nel registro.
  Dal vivo (23/10-24/11) i due filtri avrebbero tolto 11 trade: 5 vinti, 6 persi, -72 pip (fra cui AUDUSD 28/10, 29/10 e 23/11,
  USDCAD 11/11, EURGBP 19/11). ATTENZIONE: gruppi scelti guardando lo storico; la prova e' il registro in avanti.

- COSA SAREBBE CAMBIATO DAL VIVO con le modifiche del 25/11 (chiesto da Edu): registro 62 trade 58,1% +418 -> 46 trade 60,9% +445
  (16 tolti: 8 vinti, 8 persi, -27); EA 10 trade -58,6 pip -> 7 trade -13,1 pip. I FORTI non cambiano: 28 trade, 16 vinti (57%), +84.
- I 28 FORTI DAL VIVO (Edu: "Si", guardare i 12 persi). Trovato:
  1) I forti CALANO NEL TEMPO: 78,7% (2020-23, dove sono state stimate le affidabilita' di Lio) · 73,2% (2024-25) · 69,6% (2026 fino
     al 16/10) · 57% dal vivo. I piu' "sicuri" calano di piu': margine >= 1,3: 86,2% · 78,6% · 66,7%, dal vivo 2 vinti su 6;
     metodo Liu Yao "affidabile 80%": 78,8% · 72,4% · 64,4%, dal vivo 3 su 8 (via 合全: 2 su 2 persi).
  2) Dal vivo, col qimen di oggi: forte + qimen contro 13 trade, 4 vinti, -152 pip; forte + qimen d'accordo 13 trade, 12 vinti,
     +273. MA molte di quelle carte sono proprio quelle su cui le regole del qimen sono state corrette (patto): nello storico
     forte + qimen contro vince 74,8% · 70,4%. Non e' una prova; la prova e' qmdj_live.json in avanti (dal 24/11).
  3) Per cross dal vivo: USDCHF 3 su 3 persi (SHORT contro trend, 16-19/11); USDCAD 4 vinti su 9; EURGBP 8 su 9.
  RISTIMA DI LIO FATTA (Edu: "Procedi"): vedi ESITI_LIO_RISTIMA_25_11_2026.md. ESITO NEGATIVO, NIENTE CABLATO IN LIO.
  La prima prova (70% sul 2026) era gonfiata: le voci per forma hanno i cataloghi fatti su tutto lo storico (64-72% in ogni anno,
  dal vivo 51-61%). Ristimando solo la dottrina: +1 punto sul 2026, 3-5 trade dal vivo: non basta. Abbassare i pesi di PB e DLR non
  migliora. Fatto certo: il metodo Da Liu Ren e' calato (57,3% 2024-25 · 54,8% 2026 · 50,0% 19/09-16/10 · 45,9% vivo su 61).
  NON RIPROVARE la ristima con le voci per forma dentro: e' una strada chiusa finche' i cataloghi non sono separati per data.

## PUNTI APERTI
- La bilancia va RICOSTRUITA dentro qmdj.js: tutte le indicazioni valutate sempre (non solo quelle che la cascata raggiunge),
  stato del palazzo (debole, vuoto, clash interno, clash contro lo stelo del mese), elenco pro/contro mostrato sulla carta,
  e scritta ogni notte nel registro in avanti PRIMA dell'entrata. Proposto a Edu, non ancora fatto.
- Fan yin totale nella bilancia: decide da solo o pesa di piu'? (Edu ha detto solo "e' un fan yin totale"; la misura non lo conferma.)
- Carta 10: domanda senza risposta. Carte 3, 4, 6, 7 ancora in attesa (vedi S75). Da presentare: AUDUSD 28/10, EURJPY 06/11.
- Regola di View: tenerla o spegnerla (S75/S76); il Tai Sui e' deciso: stelo (25/11). "Segue forte". Wu = quale valuta. Repo pubblici o privati.
- EA: i 6 passi di S77 (TG_TOKEN, Worker nuovo, /telegram-collega, secondo cron, LioEA 1.10, prova). AutoTrading sul PC: spento?
- 25/11 mattina: la raccolta notturna HA girato (segnali.json con forza, forza_lio, qmdj; qmdj_live.json con impronta bb9a43ae).
  Da guardare: l'EA e' entrato all'01:00 GMT del 25/11? (oggi 3 trade: USDCHF SHORT media, AUDUSD LONG debole, USDCAD SHORT debole)

## 25/11 POMERIGGIO (chat nuova aperta con "Trading - leggi ripartenza S78")
- Edu, carta 13: il fan yin di sole stelle e steli "non e' uguale al fan yin totale". Carta 10: "non dovresti farmi questa domanda
  se sai che devi raccogliere i pro e i contro prima di scegliere". "Perche' la bilancia non e' ancora stata calata?"
- CABLATO e caricato (qmdj.js in trading e copia in storico-trading; qmdj_registro.js): LA BILANCIA DA' IL VERDETTO DEL QIMEN.
  unito() ora restituisce il verdetto della bilancia (da: 'bilancia'), con l'elenco PER SEGUE / PER NON SEGUE nel motivo; alla pari il
  qimen e' fermo. La vecchia cascata resta in unitoCascata() e nel campo "cascata" (anche in qmdj_live.json, per contare in avanti).
  QMDJ_BILANCIA_DECIDE=false torna alla cascata. Vale dalla notte del 26/11 (lotto 0,02 dei forti e filtro "media col Semplificato
  e il qimen contro" usano il verdetto della bilancia).
  La bilancia pesa SEMPRE gli argomenti di tutti e due i sistemi (ZFTY e DsHs), lo stesso argomento una volta sola.
  Fan yin: totale (anche le porte) peso 3; solo stelle e steli peso 1 (pesi di Claude, da provare); superato da un ponte: non pesa.
  Stato del palazzo esteso (ZF/TY deboli nel mese; clash interno, debole, vuoti del giorno su DS e HS): estensione di Claude,
  SPENTA (QMDJ_BIL_STATO=true l'accende) perche' non migliora.
- MISURA (qmdj_lavoro/bilancia_decide.js, 2020-23 · 2024-26). Carte giuste: cascata 53,9% · 52,3%; bilancia 52,7% · 52,0%
  (parla su 2.049 · 1.889 carte contro 2.464 · 2.298). Lio con la bilancia d'accordo 68,6% · 66,2%; contro 63,9% · 63,4%;
  pari 70,7% · 64,3%. Con la cascata: accordo 70,6% · 66,3%; contro 63,6% · 63,2%. La bilancia NON batte la cascata: costa circa
  un punto. Accesa perche' e' il metodo dettato da Edu. Detto a Edu.
- Carte con la bilancia: 10 (USDCHF 23/11) nessuna indicazione, fermo; 11 (AUDUSD 29/10) SHORT 4-3 giusto; 12 (AUDUSD 28/10) LONG
  2-0 giusto; 13 (EURJPY 06/11) SHORT 2-1 giusto. 25/11: USDCHF qimen LONG (cascata SHORT), AUDUSD SHORT, USDCAD LONG: tutti e tre
  contro Lio. ESITO DA GUARDARE (chiusura 21:00 GMT). La riga del 25/11 in qmdj_live.json non e' stata toccata.
- DA FARE: mostrare PER SEGUE / PER NON SEGUE nella pagina "Carte dove Lio sbaglia"; portare dentro la bilancia le indicazioni che
  la cascata non scrive (va smontata regola per regola); provare i pesi sul registro in avanti.
- CARTA 10 ripresentata (USDCHF 23/11/2026). Lettura di Claude a pro e contro: pesa di piu' il TY (HS, stelo del mese, ramo del
  mese in Qian) -> non segue: SBAGLIATA. EDU: "Il TY ha una penalita' nel suo palazzo". Claude aveva capito l'autopenalita' Hai-Hai:
  SBAGLIATO. EDU: "No, la penalita' e' Ji sopra Geng o l'opposto. E' tipica del qimen" (in Qian: Ji nel cielo sopra Geng nella terra).
  CABLATO nella bilancia (voce "penalita TY", QMDJ_BIL_PENA=false la spegne): Ji sopra Geng o Geng sopra Ji nel palazzo del TY ->
  TY indebolito, segue. Solo sul TY, come dettato (non chiesto: se pesa anche su ZF, DS, HS, View). Carta 10: LONG 1-0, segue, giusto.
  MISURA (qmdj_lavoro/pena_ty.js): coi giorni di penalita' nel palazzo del TY il mercato segue 52,5% (101 carte, 2020-23) ma
  37,0% (81 carte, 2024-26): nel secondo periodo va al contrario. Bilancia su quelle carte: 54,9% -> 58,6% · 41,3% -> 37,3%;
  su tutte 52,9% · 51,8%. Lio in quei giorni 68,1% · 55,1%. Accesa perche' dettata. Detto a Edu.
- LE 1080 CARTE (Edu 25/11: previsione a priori su tutte, poi verifica; "prima la 1 e poi la 2"). PASSO 1 FATTO: vedi
  ESITI_1080_CARTE_25_11_2026.md. Tavola congelata QMDJ_1080_A_PRIORI.json (bilancia sulla sola carta: bilanciaCarta in qmdj.js).
  Avverate 51,1% · 51,1% (2020-23 · 2024-26); dal vivo 34 su 54 (63%, pochi casi). PASSO 2 DA FARE: Claude legge le carte una per
  una coi pro e i contro, a blocchi, partendo da quelle uscite piu' volte dove il passo 1 sbaglia; lettura scritta prima dell'esito.
- 1080 CARTE, PASSO 2 avviato: LETTURE_1080_CLAUDE.md (carte scelte per numero di uscite, lettura caricata PRIMA dell'esito).
  Edu: "Mica vorrai che ti leggo tutte e 1080 carte spero" -> NON chiedergli la lettura delle carte: le legge Claude, a Edu solo
  il conto. Carte 1-21: 88 giuste su 175 uscite (50,3%); ogni carta ha solo 3-13 uscite con esito. La sola carta, letta da Claude,
  vale quanto la bilancia del software (51,1%). Da decidere con Edu se proseguire sulle altre o leggere la carta insieme a giorno e mese.
- IMPRONTA DI BASE (Edu 25/11: "Se ZF controlla il TY e non c'e' un ponte, statisticamente dovrebbe seguire piu' spesso del
  contrario"): misurato sulla sola carta e poi diviso per la stagione del mese (ESITI_1080_CARTE_25_11_2026.md, in fondo).
  NON CONFERMATO: senza ponte 48,1% · 49,4%; con ZF forte e TY debole 49,2% · 46,2%. Tengono nei due periodi solo: TY genera ZF con
  almeno uno dei due forte nel mese (segue 55,4% · 54,5%) e ZF/TY paralleli (segue solo 46,1% · 44,8%). Niente cablato. Detto a Edu.
- CORREZIONE (25/11 pomeriggio): Edu ha chiesto "una carta dove il controllo non funziona e non ci sono altre spiegazioni". Nei casi
  davvero puliti (ZFTY dice che ZF controlla TY e segue, niente ponte, niente fermo, niente contro, non lunedi') le giornate sono 13:
  10 hanno seguito. Le 3 no: USDCHF 12/10/2023 (70 pip contro, giorno di notizia USA), EURJPY 04/07/2025 (12), USDJPY 29/09/2026 (8).
  Quindi l'idea di Edu regge nei casi puliti; le misure "sulla sola carta" al 48-49% erano gruppi troppo grossolani.
  Script: qmdj_lavoro/controllo_non_funziona.js. Mostrata a Edu USDCHF 12/10/2023: in attesa della sua lettura.
- USDCHF 12/10/2023, Edu: "Ren del mese non fa da ponte?" (Ren, stelo del mese, e' il secondo stelo del cielo in Li, palazzo di
  fuoco fra ZF in Zhen e TY in Gen). TROVATO: la regola "lo stelo del mese nel cielo fa da ponte" (Edu 27/10/2026) era SPENTA dal
  24/10 per i pip e guardava solo il primo stelo. CABLATO: QMDJ_MESE_PONTE default 'zfty', vale anche il secondo stelo del cielo.
  Misura (qmdj_lavoro/ponte_mese.js): con questo ponte vince il controllato 63,3% (109) · 58,3% (115); ZF controlla TY: non segue
  58,6% (58) · 63,6% (66); senza ponti 50%. Bilancia su tutte le carte 53,0% · 52,0% (prima 52,9% · 51,8%).
  CONFLITTO DETTO A EDU: sulla carta del 12/10/2023 il ponte NON scatta lo stesso, perche' il mese e' Xu e Li (fuoco) e' in tomba
  nel mese = vuoto (regola di Edu del 24/10/2026, EURUSD 12/10: "Li e' in tomba nel mese"), e un ponte vuoto non passa il qi.
  RISPOSTA DI EDU (25/11, DOTTRINA - FLUSSO DEL QI): "Quando si legge una carta qimen si deve comprendere la dinamica interna alla
  carta e quindi il flusso del Qi. I palazzi comunicano fra di loro. Qui Qian, dove sta il ramo Xu del mese, genera Kan dove sta il
  ZS, che genera Zhen dove sta il ZF, che genera Li dove sta un'ottima combinazione (Bing sopra Wu) con lo stelo del mese. Quindi e'
  vero che Li sta in tomba ma riceve nutrimento quindi e' operativo. In piu', combinazioni di steli particolarmente favorevoli tipo
  Bing + Wu con porta favorevole sono naturalmente significative."
  CABLATO in qmdj.js (trading e copia), dentro vuoto(): un palazzo in tomba nel mese NON vale come vuoto se
  a) e' nutrito: il qi parte dal palazzo del ramo del mese e gli arriva per generazione passando solo da palazzi con lo Zhi Shi o
     lo ZF, al massimo tre passaggi (nutrito(); QMDJ_TOMBA_FLUSSO=false la spegne);
  b) ha Bing nel cielo sopra Wu nella terra con porta Open, Rest o Birth (comboFavorevole(); QMDJ_TOMBA_COMBO=false la spegne).
     Solo Bing-Wu: le altre combinazioni favorevoli NON sono cablate (Edu ha detto "tipo": da raccogliere carta per carta).
  In piu' nella bilancia: se DS sta nel palazzo dello ZF e HS in quello del TY, il DsHs ripete la stessa relazione dello ZFTY e
  si conta una volta sola. Carta USDCHF 12/10/2023: ora ponte dello stelo del mese, non segue, LONG, GIUSTO.
  Misura (bilancia_decide.js): bilancia giusta 52,7% · 52,2% (prima 53,0% · 52,0%): invariata. Carte 10-13 invariate.
  DA FARE: il flusso del qi fra palazzi come lettura generale (non solo per la tomba): chi nutre chi, dove finisce il qi.
- FLUSSO DEL QI COME LETTURA GENERALE (Edu 25/11: "Implementalo"). Prima versione, costruzione di Claude: flussoQi(c) in qmdj.js
  (il qi parte dal palazzo del ramo del mese e scorre per generazione solo attraverso palazzi con ZF, Zhi Shi o TY; dice chi viene
  raggiunto e per che strada). MISURA (qmdj_lavoro/flusso_qi.js, 2020-23 · 2024-26, "il mercato segue"): nutre solo lo ZF 48,1% (428)
  · 46,1% (375); nutre solo il TY 45,2% · 49,0%; passa dallo ZF e finisce sul TY 49,2% · 52,3%; passa dal TY e finisce sullo ZF
  48,8% · 56,1%; non arriva a nessuno 52,7% · 48,6%. NON SEPARA: "chi viene nutrito vince" non e' la regola. Anche con DS e HS
  come attori non cambia. NIENTE nella bilancia: il flusso non da' voti. Prova "anche un palazzo vuoto, se nutrito, e' operativo"
  (QMDJ_VUOTO_FLUSSO): 52,9% · 52,1%, invariato, SPENTA.
  FATTO: qmdj_registro.js scrive ogni notte il campo "flusso" (il percorso del qi in parole) in qmdj_live.json, prima dell'entrata:
  serve a portare a Edu le carte nuove gia' con il percorso scritto. Non decide niente.
  MANCA LA DOTTRINA: cosa ferma il qi (vuoto, clash, combinazione, controllo), dove si accumula, e cosa vuol dire per ZF e TY. Da Edu
  finora un solo caso (USDCHF 12/10/2023: il flusso rende operativo il palazzo del ponte). Da raccogliere sulle carte nuove.
- YONG SHEN (Edu 25/11, DOTTRINA): "Non e' che chi e' nutrito vince. Chi e' nutrito e' in grado di fare qualcosa allo ZF o al TY solo
  se e' uno Yong Shen (YS), ovvero se ha qualcosa a che fare con l'argomento che stiamo trattando. Per esempio, lo stelo del mese,
  del giorno, dell'anno, la porta View, la porta Birth, oppure Wu sopra Bing e il suo contrario sono YS."
  In qmdj.js: yongShen(c, q), nutritoYS(c, p), azioniYS(c) (strumenti, esportati).
  MISURE: a) YS nutrito che genera o controlla ZF o TY, contato come voto (qmdj_lavoro/yong_shen.js): 49,8% · 50,4%, non separa;
  nutrito o non nutrito uguale. Lettura di Claude ("genera aiuta, controlla danneggia") SBAGLIATA o troppo grossolana: NON cablata.
  b) YS come PONTE fra chi controlla e chi e' controllato (qmdj_lavoro/yong_shen_ponte.js): senza YS sul ponte vince il controllato
  48,3% (377) · 48,9% (360); con uno YS sul ponte 53,6% (412) · 51,4% (395) nutrito, 54,2% (131) · 53,8% (132) non nutrito.
  Per tipo: stelo del mese 62,6% · 57,9% (il piu' solido); Birth 55,0% · 52,6%; stelo del giorno 63,5% · 41,3%; View 49,7% · 52,2%;
  stelo dell'anno 53,6% · 46,1%. Il "nutrito" come lo calcola Claude NON separa: la definizione va rivista con Edu sulle carte.
  CABLATO (QMDJ_YS_PONTE default 'zfty'): fanno da ponte anche lo stelo dell'anno, Wu sopra Bing e Bing sopra Wu (Birth, View,
  stelo del mese e del giorno lo facevano gia'). Bilancia 52,7% · 52,2%, invariata. Carte 10-13 e USDCHF 12/10/2023 giuste.
- CARTA 14, USDCAD 05/11/2026 (seme 139, Wu Wu, yin 5; trend SHORT, salito 46; Lio SHORT forte sbagliato; ZFTY "non segue" GIUSTO
  perche' ZF in Kun genera TY in Dui; bilancia LONG 2-0 giusta). Portata a Edu col percorso del qi e gli Yong Shen scritti. Lettura di
  Claude (conoscendo l'esito), DA VALIDARE: per non segue ZF genera TY, nel palazzo del TY stelo del mese (= HS) e Wu sopra Bing, Dui
  forte nel mese, Birth in Zhen controlla lo ZF; per segue Dui tutto nel vuoto del giorno (Shen You), porta Death sul TY. Il giro
  parte nell'ora Wu Wu (11-13 GMT). Flusso: il ramo del mese Xu in Qian genera Kan senza attori: il qi del mese non arriva a ZF ne' TY.
  In pagina "Carte dove Lio sbaglia" in cima (artifact "Carte OAP", versione 1795622849-2aad). IN ATTESA della lettura di Edu,
  soprattutto sul percorso del qi. Prossime carte perse da Lio mai presentate: EURJPY 30/10, USDCAD 12/11, AUDUSD 27/10, EURGBP 27/10.
  RISPOSTA DI EDU sulla carta 14: "ZF genera il TY". Basta questo: e' l'impronta di base, non servono altre spiegazioni (la domanda
  di Claude su Dui vuoto era superflua). NON portargli carte che il qimen legge gia' giuste con una regola sola.
  Misura (qmdj_lavoro/genera_pulito.js): ZF genera TY, ZFTY dice non segue, niente ponti e nessuna voce per "segue": NON segue
  55,3% (114) · 53,4% (103); tutte le "ZF genera TY" 50,3% · 50,0%. In quelle giornate pulite Lio col qimen vince 73,2% · 65,9%,
  Lio contro il qimen (col trend) 59,6% · 61,7%: resta la regola di oggi (forte col qimen contro = lotto minimo), niente di nuovo cablato.
- RASSEGNA DELLE 23 CARTE PERSE DA LIO DAL VIVO (23/10-24/11) con le regole di stasera: qimen (bilancia) giusto 17, sbagliato 2
  (USDCAD 27/10, gia' vista; EURGBP 17/11/2026, MAI VISTA), fermo 4 (EURGBP 27/10 mai vista: zero voci; NZDUSD 28/10; USDCHF 19/11;
  USDCAD 23/11). Su tutti i 59 trade dal vivo: Lio col qimen d'accordo 17 vinti su 19 (+420 pip); col qimen contro 9 su 26 (-130);
  col qimen fermo 10 su 14 (+128). Qimen da solo giusto 34 su 45; vecchia cascata 43 su 54. ATTENZIONE: molte regole sono state
  corrette proprio su queste carte: NON e' una prova (nello storico Lio col qimen d'accordo 69,0% · 66,6%, contro 64,1% · 62,9%).
  La prova e' qmdj_live.json in avanti dal 26/11.
  PROSSIMA CARTA DA PORTARE A EDU: EURGBP 17/11/2026 (seme 83; trend SHORT, mercato SHORT 15; Lio LONG media sbagliato; bilancia
  "non segue" 3 a 1, SBAGLIATA). Poi EURGBP 27/10/2026 (zero voci, fermo; ha seguito di 10 pip).
  DA GUARDARE: esito dei tre trade del 25/11 (qimen contro Lio su tutti e tre: USDCHF LONG, AUDUSD SHORT, USDCAD LONG).

## 25/11 SERA (chat aperta con "Trading - leggi ripartenza S78 e portami la carta EURGBP 17/11/2026")
- CARTA 15, EURGBP 17/11/2026 (seme 83, Bing Xu, yin 6; trend SHORT, sceso 15; Lio LONG media sbagliato; ZF in Gen genera TY in Qian;
  bilancia "non segue" 3 a 1 SBAGLIATA). In pagina in cima (versione 1795630128-1a83). Lettura di Claude: Bing (HS, col TY) in tomba in
  Qian (Xu) e nel suo pilastro: NON validata da Edu, non cablata.
  RISPOSTA DI EDU: "Temo che la porta Death non porti benefici" (letta cosi': Death nel palazzo del TY non giova al TY).
  CABLATO e caricato (trading de366b1, copia in storico-trading): voce "Death TY" nella bilancia, peso 1,
  solo sul TY, QMDJ_BIL_DEATH=false la spegne. Carta 15: 3 a 2, ancora "non segue" (sbagliata). Carta 14 (USDCAD 05/11): 2 a 1, resta giusta.
  MISURA (qmdj_lavoro/death_ty.js e conto a parte, 2020-23 · 2024-26): Death sul TY, il mercato segue 52,4% (315) · 53,2% (282);
  ZF genera TY CON Death sul TY: segue 57,8% (90) · 59,8% (82); ZF genera TY SENZA Death: segue 47,7% (369) · 47,8% (368).
  Bilancia su tutte 52,7% -> 53,0% · 52,2% -> 52,2%. Lio col qimen d'accordo 69,3% · 66,2%, contro 63,4% · 62,1% (invariato).
  PROPOSTO A EDU, NON CABLATO: quando lo ZF genera il TY e il TY ha Death, Death annulla il voto "ZF genera TY" (o pesa di piu').
  Dubbio di Claude detto a Edu, senza risposta: il voto "Geng sopra Bing nel palazzo del trend" contro lo ZF vale, se quel Geng e' Jia?
- ORA DI ENTRATA (Edu, foto AUDUSD 25/11: entrata 21 pip sopra l'apertura). Misura sui 65 trade dal vivo (23/10-25/11), 62 chiusi:
  entrata 00:00 407 pip (38 vinti) · 01:00 441 (37) · 02:00 393 (34) · 03:00 340 (36). Resta 01:00 GMT.
- Edu alla proposta sull'annullamento: "Hai gia' corretto perche' chiedi ancora?" -> NON chiedere il permesso per completare una
  correzione che lui ha gia' dettato: si cabla, si misura e gli si porta il risultato.
  CABLATO e caricato (estensione di Claude, QMDJ_BIL_DEATH_GENERA=false la spegne): se lo ZF genera il TY e il TY ha la porta Death,
  il voto "ZF genera il TY" non pesa. Misura (2020-23 · 2024-26): bilancia su tutte 53,0% -> 53,2% · 52,2% -> 52,6%; Lio col qimen
  d'accordo 69,6% · 66,7%, contro 63,2% · 61,9%. Carta 15 (EURGBP 17/11): 2 a 2, qimen FERMO (non piu' sbagliata, non ancora giusta).
  CONFLITTO DETTO A EDU: la carta 14 (USDCAD 05/11, Death sul TY in Dui, NON ha seguito; Edu: "ZF genera il TY") passa da "non segue"
  giusto a FERMO 1 a 1. Da capire con Edu cosa distingue le due carte (nella 14 Dui era forte nel mese e aveva lo stelo del mese).

## 26/11 POMERIGGIO (stessa chat)
- Edu ha richiesto la carta 14 (USDCAD 05/11/2026) e ha voluto ANCHE l'immagine in chat: ogni carta va mandata come immagine PNG
  (node qmdj_lavoro/render.js ... poi google-chrome --headless --screenshot), non solo messa nella pagina.
- RISPOSTA DI EDU sul conflitto fra carta 14 e carta 15 (Death sul TY in tutte e due): "Qui anche DsHs dicono la stessa cosa"
  (carta 14: DS col ZF in Kun, HS col TY in Dui; il DsHs ripete "genera").
  CABLATO e caricato nella bilancia (qmdj.js, trading e copia): quando DS sta nel palazzo dello ZF e HS in quello del TY
  a) la porta Death sul TY NON toglie il peso a "ZF genera il TY" (QMDJ_BIL_DSHS_TIENE=false la spegne);
  b) estensione di Claude: la conferma del DsHs e' una voce in piu', peso 1, nel verso della relazione di base dello ZFTY
     (QMDJ_BIL_DSHS_CONF=false la spegne). Sostituisce nei fatti il "si conta una volta sola" del 25/11.
  Carta 14: non segue 3 a 1, giusta. Carta 15 (EURGBP 17/11): resta 2 a 2, fermo.
  MISURA (qmdj_lavoro/dshs_conferma.js, 2020-23 · 2024-26): bilancia giusta 53,2% · 52,6% (ieri) -> a) 53,4% · 52,5% -> a+b) 53,8% · 52,9%.
  Lio col qimen d'accordo 69,6% · 67,3%, contro 62,3% · 61,9%. Dove il DsHs conferma, la relazione di base ha ragione 54,6% (434) ·
  54,5% (431). MA nel caso preciso "ZF genera TY confermato dal DsHs" il mercato segue 53,6% (112) · 53,3% (107): li' la conferma NON
  rafforza il "non segue" (detto a Edu). Con anche Death sul TY: 17 e 15 carte, troppo poche.
- ESITO DEI TRE TRADE DEL 25/11 (qimen contro Lio su tutti e tre): USDCHF Lio SHORT vinto 49 (qimen LONG sbagliato); AUDUSD Lio LONG
  perso 4 (qimen SHORT giusto); USDCAD Lio SHORT vinto 57 (qimen LONG sbagliato). Qimen 1 su 3, Lio 2 su 3.
  DA PORTARE A EDU, una alla volta: le due carte del 25/11 dove il qimen ha sbagliato (USDCHF seme 83, USDCAD seme 142).
- CARTA 16, EURGBP 27/10/2026 (seme 83, Jia Xu, yin 2; trend SHORT, sceso 10; Lio LONG forte sbagliato; fu yin totale, ZF/ZS/TY/DS/HS
  tutti in Kan; qimen fermo, zero voci). Portata a Edu con immagine e in pagina in cima. Lettura di Claude: fermo e' giusto.
  Stessa famiglia della carta 7 (USDCAD 03/11, fu yin, tutto in Kun), ancora in attesa.
  Misure rifatte: fu yin totale, il mercato segue 50,3% (374) · 45,3% (311); Lio nei giorni di fu yin 68,4% · 64,9%.
  qmdj_lavoro/fuyin_ampiezza.js: nei giorni di fu yin il mercato NON si muove meno (EURGBP mediana 20 · 12 pip contro 18 · 14).
- REGOLA DI EDU (26/11): "se stiamo sotto i 10 pip non vale neanche la pena analizzare" -> NON portargli carte con un movimento
  piccolo (fino a 10 pip circa); non analizzarle. La EURGBP 27/10 (10 pip) non andava portata.
- CARTA 17, USDCHF 25/11/2026 (seme 83, Ren Xu, yin 8; trend SHORT, sceso 49; Lio SHORT media GIUSTO; cascata della notte SHORT
  giusta; BILANCIA "non segue" 3 a 1 SBAGLIATA: ZF in Xun genera TY in Li, DsHs dice la stessa cosa (voto aggiunto il 26/11), ZF tutto
  nel vuoto del giorno Chen Si; per segue solo il flusso ZF -> TY -> View che lo ZF controlla). Portata a Edu con immagine e in pagina.
  Lettura di Claude, DA VALIDARE, NON cablata: il vuoto dello ZF si riempie nelle ore Chen e Si (il mercato parte in Bing Chen 7-9 GMT,
  24 pip, poi Ding Si 17 e Wu Wu 19); Xun forte nel mese Hai, Li (TY) morto nel mese. IN ATTESA della lettura di Edu.
  Poi: USDCAD 25/11/2026 (seme 142; Lio SHORT vinto 57, qimen LONG sbagliato).
- FORMATO (Edu 26/11: "Prima facevi la carta con tutti i commenti insieme"): ogni carta va mandata in chat come UNA SOLA immagine con
  intestazione, dati, bazi, disegno e lettura insieme (non il solo disegno piu' il testo a parte). Si fa cosi': prima la carta in cima
  alla pagina "Carte dove Lio sbaglia", poi python3 qmdj_lavoro/carta_png.py <index.html della pagina> 1 uscita.png, poi SendUserFile.
- CORREZIONE SUL FORMATO (Edu 26/11, mostrando la pagina "Carte OAP": "Perche' non fai piu' questo?"): il formato che vuole e' LA PAGINA
  (carta in cima con dati, bazi, disegno e lettura). Ogni carta: pubblicarla in cima alla pagina e dirgli subito, in testa alla
  risposta, di aprire la pagina "Carte OAP" (link https://claude.ai/artifact/Cj9fZazDDXeX4mb45V5TXq). Niente immagini sparse del solo
  disegno; in chat solo due righe di sintesi e l'eventuale domanda. carta_png.py resta come riserva se la pagina non si apre.
- LETTURA DI EDU della carta 17 (USDCHF 25/11/2026), 26/11: "Gui sopra Ren con Injury e' una combinazione direzionale del Legno che e'
  molto timely nel mese Hai e nel giorno Mao. Il TY sta su Li che e' invece drenato da View". (Gui = Jia Yin, Ren = Jia Chen, Injury =
  Mao: Yin Mao Chen.) La traccia di Claude (il vuoto che si riempie nelle ore Chen e Si) NON e' stata confermata: non cablata.
  CABLATO e caricato nella bilancia (qmdj.js, trading e copia): voce "direzionale ZF" = i rami portati dal palazzo dello ZF (steli,
  porta, stella: rami3) formano una combinazione direzionale completa il cui elemento e' timely nel mese -> segue, peso 1
  (QMDJ_BIL_DIREZ=false la spegne). Solo sullo ZF. "TY drenato da View" e' gia' la voce "flusso: ZF genera TY genera View" (non doppia).
  Estensioni di Claude SPENTE: QMDJ_BIL_DIREZ_GIORNO (un punto in piu' se timely anche nel giorno), QMDJ_BIL_DIREZ_VUOTO (con la
  combinazione i vuoti del giorno sullo ZF non pesano).
  LA CARTA RESTA SBAGLIATA: non segue 3 (ZF genera TY; ZF tutto nel vuoto del giorno; il DsHs dice la stessa cosa) a 2 (flusso su
  View; direzionale). Detto a Edu.
  MISURA (qmdj_lavoro/direzionale_zf.js, 2020-23 · 2024-26): caso raro. Direzionale timely sullo ZF: il mercato segue 46,2% (52) ·
  50,9% (55); timely anche nel giorno 41,7% (24) · 50,0% (22); con ZF genera TY 28,6% (14) · 40,0% (10). NON conferma.
  Bilancia su tutte 53,8% -> 53,6% · 52,9% -> 52,6%. Accesa perche' dettata. Detto a Edu.
- APP (Edu 26/11, foto di MT4 con due soli trade: "Il software non e' stato aggiornato altrimenti mostrerebbe solo due trade da
  lanciare"). Il 25/11 i filtri dell'EA erano stati messi solo nella raccolta notturna (qmdj_registro.js), NON nell'app: errore di
  Claude (regola del 21/09: cio' che decide va anche nel software a schermo).
  CABLATO e caricato (app.js, i18n.js in trading; copie in storico-trading): i trade di Lio che non vanno all'EA escono da "DA TRADARE"
  e vanno in una sezione "NON SI TRADANO · saltati anche su MetaTrader"; il conto in testata dice solo quelli da lanciare. Fonte:
  segnali.json del giorno (lo stesso file dell'EA, letto da raw.githubusercontent); prima che esista, due regole calcolate dall'app
  (casella del cross; Lio debole col sistema D contro). Il motivo si vede solo con le REGOLE accese. I saltati restano nel registro.
  Provato sui giorni 19, 23, 25, 26/11: stessi salti dell'EA. NON provato a schermo dal telefono: lo guarda Edu.
  LIMITE: la terza regola (Lio media col Semplificato e il qimen contro) l'app la sa solo dal file della notte (non ha il qimen dentro).
- TITOLO DELL'APP (Edu 26/11: "devi mettere anche Lio e QMDJ nel titolo"): da "Scala A/B/C/D" a "Lio + QMDJ · Trading Calculator" (index.html, caricato).
- CARTA 17, seconda indicazione di Edu (26/11): "Ren con Assistant e/o Delusion fa autopenalita' perche' entrambi contengono il ramo
  Chen" (nel palazzo del TY in Li: Ren = Jia Chen; Assistant e Delusion di casa in Xun). CABLATO e caricato nella bilancia: voce
  "autopenalita TY", Ren nel palazzo del TY con la stella Assistant o la porta Delusion -> TY indebolito, segue, peso 1
  (QMDJ_BIL_AUTOPENA=false la spegne). Solo sul TY. Estensione di Claude SPENTA: QMDJ_BIL_AUTOPENA_WU (Xin con Hero o View, Wu-Wu).
  Carta 17: 3 a 3, qimen FERMO (non piu' sbagliata, non ancora giusta). Carte 14 e 15 invariate.
  MISURA (qmdj_lavoro/autopena_ty.js, 2020-23 · 2024-26): Ren con Assistant o Delusion sul TY, il mercato segue 45,5% (110) · 36,8% (95):
  VA AL CONTRARIO nei due periodi. Bilancia su tutte 53,6% -> 53,4% · 52,6% -> 52,4%. Accesa perche' dettata. Detto a Edu.
  DA CAPIRE con Edu: perche' sullo storico l'autopenalita' sul TY va col TY (forse pesa su chi sta nel palazzo solo in certe condizioni).
