# RIPARTENZA S73 — regole QMDJ "Stock Trading": batteria finita (chat del 20/11/2026)

Leggere prima: questo file, poi nei documenti del progetto DLR trading (NON nel repo, che e' pubblico):
SPUNTI_BUONI_QMDJ_VIEW_20_11_2026.md, ESITI_CARTA_DEL_GIORNO_QMDJ_20_11_2026.md, ESITI_PROVE_QMDJ_STOCK_TRADING.md,
REGOLE_QMDJ_STOCK_TRADING_20_11_2026.md. Poi RIPARTENZA_20_11_2026_S72.md (avvio, git, kit carte, EA, patto sul QMDJ, carte in attesa).

## ALL'INIZIO
Come in S72: clonare storico-trading e trading con git diretto (mai add_repo), ln -sfn /home/claude/trading /root/trading,
push col token di chiave.txt (Edu lo carica; chiederglielo se manca). Kit carte: storico-trading/qmdj_lavoro -> /home/claude/qm.
lunar-javascript sta in storico-trading/node_modules.

## FATTO IN S72 (20/11)
- Provate tutte le regole delle diapositive (R1-R9), una per una e a coppie, in due scenari voluti da Edu
  (A: il cross sale o scende; B: segue o non segue il trend), prima sulla carta oraria del seme, poi sulla carta del giorno
  (Edu: "Ok fai sul giorno").
- Esito: nessuna regola singola tiene nei due periodi (2020-23 e 2024-26) su nessuna delle due carte. A coppie i sopravvissuti
  sono circa il doppio di quelli attesi per caso. Nessun gruppo porta Lio sotto il 50% (patto del 18/11).
- Gli spunti salvati e l'elenco di cio' che non separa stanno nei documenti del progetto. Niente e' cablato nel software.
- Nessun push al software in S72. Script di prova non salvati nel repo (il metodo per rifarli e' negli ESITI).

## NOTE TECNICHE UTILI
- Il dump di misura_vivo.js (ORARIO=full1h.json DUMPC=/tmp/dump.json, 4-5 minuti) ha solo i giorni letti dall'app (5.384): serve
  per Lio. Per la direzione usare tutti i lun-ven da full1h.json (13.583 cross-giorni): esito = apertura 00:00 -> chiusura della
  barra delle 21:00; trend = XKDGTrend.emaTrend (trading/trend.js) sulle chiusure delle 21:00 lun-ven precedenti (uguale al dump).
- full1h.json NON ha massimi e minimi (solo apertura e chiusura orarie) e si ferma al 16/10/2026.
- La carta del giorno (Q.giornaliera) e' una sola per tutti i cross: il peso statistico va contato per giorni, non per righe.
- Vivo: registro_live.json; i trade di Lio sono quelli con livello "LI".

## PUNTI APERTI
- Decidere con Edu la prossima mossa sul QMDJ come aiutante di Lio: NON altre prove a tappeto; tornare alle carte dove Lio sbaglia
  (contatore a 4, prossima = carta 5, misura alla quinta) oppure una carta letta da Edu con View, Wu e Birth.
- Domande mai chiuse sulle diapositive: Wu = quale valuta del cross; "sale/scende" letto sul cross cosi' com'e'.
- Restano in attesa della lettura di Edu le carte 3 (USDCAD 27/10) e 4 (USDCHF 19/11): vedi S72.
- Edu non ha ancora detto se rendere privati i due repo.
