# RIPARTENZA S72 — regole QMDJ "Stock Trading" da provare (chat del 19-20/11/2026)

Leggere prima: questo file, poi REGOLE_QMDJ_STOCK_TRADING_20_11_2026.md, poi RIPARTENZA_19_11_2026_S71.md
(avvio, git, kit carte, patto sul QMDJ) e STATO_EA_MT4_17_11_2026.md.

## ALL'INIZIO
Come in S71: clonare storico-trading e trading con git diretto (mai add_repo), ln -sfn /home/claude/trading /root/trading,
push col token di chiave.txt (Edu lo carica; chiederglielo se manca). Kit carte: storico-trading/qmdj_lavoro -> /home/claude/qm.
NUOVO nel kit: qmdj_lavoro/carta_live.js (dati della carta per i trade dal vivo, da registro_live.json):
node carta_live.js CROSS AAAA-MM-GG.

## PRIMA COSA DA FARE
Edu (20/11): provare una per una le regole estratte dalle sue diapositive "QMDJ Stock Market and Trading"
(file REGOLE_QMDJ_STOCK_TRADING_20_11_2026.md, SOLO nei documenti del progetto DLR trading: non va nel repo, che e' pubblico).
Prima fargli le 5 domande aperte in fondo a quel file (una alla volta), poi provare R1 (ZF genera/controlla View).
Per le misure: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi> (4-5 minuti);
il dump ora porta anche ST e stP (sistema-trend). La carta QMDJ per ogni cross-giorno si calcola come in carta_info.js.

## CARTE QMDJ DOVE LIO SBAGLIA (patto del 18/11)
Contatore: 1 USDCAD 11/11 · 2 NZDUSD 28/10 · 3 USDCAD 27/10 · 4 USDCHF 19/11. Prossima = carta 5 (misura alla quinta).
Finora il QMDJ aveva ragione su tutte e quattro (sulla prima solo il DsHs).
IN ATTESA DELLA LETTURA DI EDU:
- carta 3, USDCAD 27/10: "il fan yin e' il motivo giusto, o parla altro?"
- carta 4, USDCHF 19/11: "lo ZS in Xun e' vuoto: puo' ancora colpire l'ora dal palazzo opposto?"
Da presentare: EURGBP 19/11 (SHORT media, -33), USDCHF 18/11 (SHORT forte, -20), USDCAD 03/11, AUDUSD 29/10,
AUDUSD 28/10, EURJPY 06/11. Pagina "Carte OAP" (slug 5ef71a7f-9123-48e2-8d52-fcc0c3cb1b44), carta nuova in cima.

## FATTO IL 19-20/11
- RAYMOND, amico trader di Edu (nome e indirizzo nella memoria del progetto, non qui: il repo e' pubblico): gli sono state mandate dalla Gmail di Edu
  la lettera NDA (PDF, da compilare e firmare; legge italiana, foro di Perugia) e la sintesi del sistema in inglese (PDF).
  Documenti: "Non-Disclosure Agreement: Lio trading software" e "Lio trading system: overview and live results"
  (Claude Docs). La lettera firmata non e' ancora tornata.
- BACKTEST DI LIO ricalcolato il 19/11 (software attuale, 2020-02-20 / 2026-10-16): 4.801 trade, 3.147 vinti (65,5%),
  +91.073 pip, forte 75,0% / media 61,3% / debole 54,5%, calo massimo 416 pip, 80 mesi positivi su 81.
  Avvertenza gia' detta a Edu e scritta nella sintesi: regole e pesi sono nati sullo stesso storico.
- APP, versione inglese: i18n.js (bandierine in alto a destra; lingua in localStorage LANG; senza scelta italiano
  col browser in italiano, altrimenti inglese). Traduce a schermo con un glossario, non tocca motore ne' registro.
- APP, regole nascoste: senza localStorage REGOLE=1 si vedono solo cross, direzione, forza, posizione.
  Edu le sblocca aprendo una volta l'app con ?regole=<parola> (la parola la conosce lui; nel codice c'e' solo l'impronta).
  ?regole=0 le spegne. E' una tenda, non una serratura: i due repo sono ancora PUBBLICI.
  PUNTO APERTO: Edu non ha ancora detto se rendere privati i repo.
- APP, per Edu: regole in elenco numerato una per riga e pulsante "Regole: nascondi / mostra" (REGOLE_VISTA).
- APP, tolta dallo schermo l'etichetta della FIDUCIA (20/11): sui 4.801 trade di Lio fiducia alta 65,6%, media 65,3%,
  bassa 65,9% — il sistema-trend non separa i trade di Lio. Resta calcolata e fra le voci.
- Niente di tutto questo e' stato visto sulla pagina vera da Claude (solo codice, browser simulato, misure):
  Edu ha confermato con uno screenshot la versione inglese; elenco numerato, pulsante e sblocco restano da confermare.

## EA
18/11: USDCHF SHORT 0,02 -3,98 EUR · EURGBP LONG 0,02 +5,13 EUR.
19/11: USDCHF SHORT 0,02 -2,77 · USDCAD LONG 0,01 +0,87 · EURGBP SHORT 0,01 -4,06.
Bilancio demo 495,09 EUR (-4,91, comprese le due prove del 17/11). Storico MT4 e archivio combaciano.
20/11: USDCHF SHORT media, USDCAD LONG forte. Lio dal vivo al 19/11: 55 trade, 32 vinti, +343 pip.
Nell'app MT4 lo storico parte dal giorno corrente: per vedere i giorni passati, icona del calendario -> Ultimo mese.
