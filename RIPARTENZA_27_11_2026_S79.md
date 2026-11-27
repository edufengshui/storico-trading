# RIPARTENZA S79 — seconda entrata sul ritracciamento, qimen quando Lio è fermo, Gann e Fibonacci (chat del 27/11/2026)

Leggere prima: questo file, poi ESITI_GANN_FIBONACCI_SECONDA_ENTRATA_27_11_2026.md (tutti i numeri di oggi), poi
RIPARTENZA_25_11_2026_S78.md (bilancia, carte 10-18, dottrina del 25-26/11: TUTTO ancora valido e aperto) e
RIPARTENZA_24_11_2026_S77.md (EA e avvisi Telegram: i 6 passi sono ANCORA DA FARE).
Avvio come in S76. REGOLA DI EDU: la frase per aprire una chat nuova comincia con "Trading". Chiedere chiave.txt se manca.

## FATTO OGGI
- 27/11: NESSUN TRADE. Controllato rifacendo il calcolo: sette cross fermi per "clash giorno/mese: la carta non scioglie"
  (giorno Yi Si nel mese Hai), USDJPY ed EURGBP per EMA non consolidata. Nessun errore.
- Edu: "Quando Lio è fermo dovrebbe agire il qimen per il quale il clash non è importante". Misurato: sulle carte ferme per il
  clash il qimen da solo è giusto 52,8% (231) · 54,7% (234). Non mandato all'EA (principio di Edu: intorno al 50% non si trada).
  PROPOSTO, SENZA RISPOSTA: scrivere il verdetto del qimen nel registro in avanti anche quando Lio è fermo.
  Edu ha TRADATO A MANO verso le 07 GMT i tre verdetti del qimen del 27/11: EURUSD SHORT (segue), GBPUSD LONG, USDCHF LONG.
  Alle 08:45 GMT: EURUSD circa +15 pip, USDCHF circa +24. ESITO DA GUARDARE (chiusura 21:00 GMT; il suo conto parte dalle 07).
- GANN (lo usa un amico trader di Edu) e FIBONACCI: provati a fondo, NIENTE di usabile. Fibonacci = livelli qualunque.
  Gann: unica indicazione il "trend consumato" (oltre 360° dal giro dell'EMA o trend di 22+ giorni); Edu: "Non sono convinto".
  NON RIPROVARE senza regole precise dell'amico (entrata, stop, obiettivo, orario).
- SECONDA ENTRATA SUL RITRACCIAMENTO (Edu: "Procedi"). CABLATA E CARICATA:
  regola: sui trade di Lio forti e medi, se a un'ora piena fra le 02 e le 07 GMT il prezzo è andato CONTRO Lio di 0,2 del campo
  medio giornaliero (20 giorni; circa 10-13 pip sui maggiori, 4 su EURGBP) rispetto all'apertura delle 00:00, seconda entrata a
  0,01, uscita alle 21:00. Misura della regola esatta: 73,1% (572 trade), +28,2 pip · 63,8% (538), +19,5; dal vivo 23/10-26/11:
  14 trade, 13 vinti, +216 pip. Uno stop costa sempre (non metterlo).
  * raccolta_notturna.js: campoMedio() e campo "seconda" {livello, pip, dalle_gmt, entro_gmt, lotti} in ogni trade forte o medio di
    segnali.json; gli esiti dell'EA con due righe per cross vanno in "ea" (prima) e "ea2" (seconda) nello storico.
  * worker_index.js: /segnali manda il livello come QUARTO campo (CROSS;VERSO;forza;LIVELLO). L'EA vecchio lo ignora.
  * ea/LioEA.mq4 versione 1.20: input SecondaEntrata (true), LottoSeconda (0,01), OraFineSecondaGMT (7), MinutiControlloSeconda (3);
    commento dell'ordine "Lio2 LONG/SHORT"; variabili globali del terminale ..._g2_/l2_/v2_/f2_SIMBOLO. NON COMPILATO (non si può
    qui): se MetaEditor dà errori, Edu manda la foto.
  * app.js, i18n.js (trading e copia): nella riga del trade "2ª entrata 0,01 se scende/sale a <livello> (ore piene 02-07 GMT)".
  FINCHÉ EDU NON FA I PASSI QUI SOTTO LA SECONDA ENTRATA NON PARTE (sul VPS gira ancora l'EA 1.00 e il Worker vecchio).

## PASSI DI EDU (uno per messaggio)
1-4. I passi 1-4 di S77 (TG_TOKEN, Worker nuovo da raw.githubusercontent.com/edufengshui/storico-trading/main/worker_index.js,
     /telegram-collega, secondo cron). Il Worker da incollare è quello di OGGI (ha anche il quarto campo).
5.   MetaEditor: LioEA.mq4 versione 1.20 al posto della vecchia, compilare (0 errori), grafico EURUSD,M30 con la Chiave, sincronizzare
     col VPS, "LioEA avviato" nel diario Consiglieri, AutoTrading spento sul PC.
6.   Prova: /stato-ea "visto":true; il primo giorno con un trade forte o medio guardare nel diario "LioEA: seconda entrata ...".

## PUNTI APERTI
- Tutti quelli di S78 (carta 15 sbagliata, carta 17 ferma, tavola dei clash solo sullo ZF, carte 3, 4, 6, 7, regola di View...).
- Qimen nel registro anche quando Lio è fermo: in attesa di Edu.
- Seconda entrata: contarla in avanti (campo "ea2" e livello in segnali.json). EURGBP ha un campo piccolo (4 pip) e nel 2024-26
  rendeva poco (+2 pip): da sorvegliare. Il controllo delle 01:00 non c'è (coincide con la prima entrata).
- Trend consumato: non cablato, Edu non convinto.
- Script di oggi: gann_fibo/*.py, qmdj_lavoro/qimen_lio_fermo.js, qmdj_lavoro/trend_consumato.js, misura_vivo_fermi.js
  (come misura_vivo.js ma con DUMPF=file tiene anche le carte ferme per clash o pareggio).
