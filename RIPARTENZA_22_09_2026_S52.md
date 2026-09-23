# RIPARTENZA S52 — dal 22/09/2026

## Cosa fare per prima cosa
1. Clonare `storico-trading`, scompattare `history_full_1h_f.zip` in `full1h.json`, `npm install lunar-javascript`,
   creare `work_trading/pwa/` coi symlink (solar-time, jieqi-gmt, daliuren, trend, liuyao, motore_dlr, plumblossom,
   app, motore_lettura, caso_speciale, incompatibile, nayin_map). Comandi con `timeout 280` (il limite e' 300 s).
2. CONTROLLO NUOVO, prima delle basi (regola del 21/09): c'e' una regola di Edu che vive nel motore di lettura o
   nell'archivio ma NON nella catena che decide (liuyao.js)? Dirla per prima. Oggi: l'EFFETTO SCALA (tutte le
   facce) e la lettura delle incompatibili che vanno nel vuoto / Tai Sui combinato non partono vivono solo nel
   motore di lettura; la catena vecchia ha solo l'arrivo dal futuro comune.
3. Verificare le basi (numeri attesi sotto). Fermarsi se una non torna.

## Basi di avvio (22/09/2026, con INCFUTURO e VUOTOCLASH accesi per default)
- Liu Yao vecchio S17: 2.788 carte · 57,32% · z 7,73 · +29.286 pip
  `VUOTO=1 SOPRAF=1 DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1 node pb_stress.js | grep "^S17\."`
- Carte guida: 110 carte · 73 giuste · 37 storte (`... SOGLIAPIP=0 CARTEGUIDA=1`)
- Motore di lettura: 2.777 carte · 54,27% · +21.888 pip; carte di riferimento 66/66
  (`CARTERIF=1 MOTORE=lettura PRINCIPI=1` + base). Da aggiungere a carte_riferimento.json quando lo storico
  arrivera' a settembre 2026: NZDUSD 15/09/2026 s57, USDCAD 21/09/2026 s139, EURUSD 21/09/2026 s114.
- DLR: 3.253 carte · 60,81% · z 12,33 · +41.467 (`MOTOREDLR=1 SOGLIAPIP=20`)
- Scala A+B+C+D: 2.298 carte · 65,06% · +42.740 (`TRESIST=1 SOGLIAPIP=20` + base, riga Z-TOT48)
- Sistema-trend: parla su 1.397 carte · 57,19% · z 5,38 · +12.176 (`SISTEMATREND=1` + base)
- Parita': 455 carte, 0 differenze (`TRESISTDUMP=/tmp/tresist.json` + base, poi `node parita_tre.js 400`)

## Cosa e' cambiato in S51 (18-22/09), nel software che decide (repo trading)
- liuyao.js: INCOMPATIBILI ACCESE (futuro comune); LE QUATTRO REGOLE DEL VUOTO E DEI CLASH (primo clash solo
  del giorno; il secondo da mese/anno/altra linea; l'arrivo vuoto clashato e' operativo, con due clash bloccato;
  la vuota ferma esce con un clash, si muove con due); l'arrivo penalizzato dal giorno resta morto.
- motore_lettura.js: rilettura "da sola" quando la carta arriva gia' girata; la mobile bloccata alla partenza
  (o la sede penalizzata all'arrivo, G/W) parla col proprio carattere; bestie SOLO dopo le mobili (titani
  differiti); scala: chi arriva su una sede porta il proprio carattere, i due effetti che si annullano ->
  Shi vs Ying con l'elemento ricevuto; clash totale del trigramma contro il proprio futuro comune; la bestia
  del giorno tira fuori dalla combinazione; il clash della mobile libera il nascosto.
- app.js/sw.js/trend_ly.js: sistema-trend come voce informativa + "fiducia alta/media/bassa" sui trade.
- Tutte le letture di Edu di questi giorni sono a registro dal 18/09 in poi (REGISTRO_CORREZIONI).

## Regole di lavoro ribadite da Edu in S51 (non negoziabili)
- Zip: file alla radice, MAI in sottocartelle. Blocco 1 solo se il software e' cambiato davvero.
- Ogni regola che Edu detta entra nella STESSA sessione nel software che decide; se rovescia carte guida gliele
  si porta subito, una per una. Niente regole "cablate ma spente in attesa".
- Regola 10: una lettura di Edu si respinge solo con una carta completa con seme dove fallisce e nessun'altra
  regola spiega; mai con una percentuale. "Non inventarti le cose": una linea ferma non clasha nessuna linea.
- Formato carta obbligatorio con i trigrammi; dichiarare sempre le linee incompatibili (verificare col
  motore, non con la catena vecchia).

## Punti aperti
- Le carte guida di agosto rilette con le incompatibili sono chiuse (6/6). La catena vecchia resta senza
  l'effetto scala e senza "l'incompatibile nel vuoto si invalida": decidere con Edu se portarli o se far
  decidere il motore di lettura (le tre forme misurate il 21/09 costano pip: veto -13.595, al posto del LY
  -7.351, veto T0 -8.323).
- AUDUSD 22/11/2022 vs 29/11/2023 (ritirata del G del giorno): la domanda sull'anno (ritirarsi SUL Tai Sui
  rifornisce, ritirarsi DAL Tai Sui abbandona il trend?) e' senza risposta.
- Sistema-trend: 8 regole + amplificatori; da rafforzare prima di farlo contare nella scala.
- Report giornaliero: le perdite del 15-21/09 sono tutte lette (EURGBP 16/09 a -4 non significativa).
