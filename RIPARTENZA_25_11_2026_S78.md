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
- Pagina "Carte dove Lio sbaglia": carte 10 e 11 in cima (versione 1795597825-9c05).

## PUNTI APERTI
- La bilancia va RICOSTRUITA dentro qmdj.js: tutte le indicazioni valutate sempre (non solo quelle che la cascata raggiunge),
  stato del palazzo (debole, vuoto, clash interno, clash contro lo stelo del mese), elenco pro/contro mostrato sulla carta,
  e scritta ogni notte nel registro in avanti PRIMA dell'entrata. Proposto a Edu, non ancora fatto.
- Fan yin totale nella bilancia: decide da solo o pesa di piu'? (Edu ha detto solo "e' un fan yin totale"; la misura non lo conferma.)
- Carta 10: domanda senza risposta. Carte 3, 4, 6, 7 ancora in attesa (vedi S75). Da presentare: AUDUSD 28/10, EURJPY 06/11.
- Regola di View: Tai Sui ramo/stelo, tenerla o spegnerla (S75/S76). "Segue forte". Wu = quale valuta. Repo pubblici o privati.
- EA: i 6 passi di S77 (TG_TOKEN, Worker nuovo, /telegram-collega, secondo cron, LioEA 1.10, prova). AutoTrading sul PC: spento?
- 25/11 mattina: la raccolta notturna HA girato (segnali.json con forza, forza_lio, qmdj; qmdj_live.json con impronta bb9a43ae).
  Da guardare: l'EA e' entrato all'01:00 GMT del 25/11? (oggi 3 trade: USDCHF SHORT media, AUDUSD LONG debole, USDCAD SHORT debole)
