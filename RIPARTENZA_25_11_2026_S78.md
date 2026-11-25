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
