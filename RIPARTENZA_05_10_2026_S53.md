# RIPARTENZA S53 — 05/10/2026 (fine S52, 23/09–05/10/2026)

## Primo controllo d'avvio
Clonare storico-trading, `unzip history_full_1h_f.zip`, symlink `full1h.json`, cartella `work_trading/pwa`
con i symlink ai motori, `npm install lunar-javascript`. Poi `trade_persi.md`, `confronto_live.md` e
`storico_live.json` nell'archivio: la raccolta notturna gira da sola su GitHub (raccolt.yml, 00:45 GMT,
spesso in ritardo di ore); a ogni sessione si parte da li' (Edu, 01/10: analisi autonoma dei persi).
Storico orario allungato: `orario_live.json` (barre dal 01/07/2026) si fonde con full1h per misurare
anche agosto-settembre (fuori campione): vedi /tmp/full1h_ext.json in sessione (ricostruire).

## Basi di fine S52 (software consegnato il 05/10/2026)
- LY vecchio S17: 2.788 carte, 57,39%, z 7,80, +31.009 (inizio S52: 57,32% +29.286)
- Carte guida: 75/110 (inizio 73). Carte di riferimento (CARTERIF=1): 64/66 — vedi punto aperto 1
- Lettura S47 (MOTORE=lettura PRINCIPI=1): 2.778 carte, 54,90%, +23.594 (inizio 54,27% +21.888)
- Scala A+B+C+D (TRESIST=1 SOGLIAPIP=20): 2.216 carte, 65,70%, +43.383 (inizio 65,06% +42.740)
- Fuori campione ago-set 2026 (storico allungato): ~61 carte, ~59%, A ancora debole (9/21), B 17/24
- Parita' archivio/app (parita_tre.js 400): 0 diff; parita_browser.js (file caricati come index.html): ok
- Motore DLR: 60,81% (invariato)

## Regole entrate in S52 (tutte in liuyao.js E motore_lettura.js salvo nota)
R77_SCALA effetto scala (dal motore) · difesoDalGiorno (linea combinata col giorno: servono due clash;
mobile che non passa resta col carattere dell'arrivo, validato) · trasformato con TUTTE le linee che
girano (ALTROTRIG) + R78_ANDONG (ferma G/W clashata dal giorno avanza/retrocede) · R79_AUTOPENA (arrivo
= giorno 自刑: la partenza parla col suo carattere; solo mobile da sola; 48% su 69 carte, da leggere)
· R80_RITIRO e R81_CTRLIND (dal motore) · R80_DANNOGIORNO (G/W mobile non timely clashata alla partenza
dal giorno e' eliminata; la timely resta — NZDUSD 16/06/2025) · R82_SEDECLASH (sede G/W non timely
clashata dal giorno eliminata; due sedi -> decide la mobile G/W, perimetro di Claude) · R83_COMBTOT
(combinazione totale 六合 del trigramma col trasformato, almeno una linea mobile -> bloccato) ·
MLAUTOCOMB (solo Lettura: l'autocombinazione esaurisce l'azione) · MLSEDECLASH/MLDANNOGIORNO/MLCOMBTOT.
Interruttori: VIASCALA, DIFESAGIORNO, ALTROTRIG, VIAANDONG, VIAAUTOPENA, VIARITIRO, VIACTRLIND,
VIADANNOGIORNO, VIASEDECLASH, VIACOMBTOT (=off); MLDIFESA, MLDANNOGIORNO, MLSEDECLASH, MLCOMBTOT,
MLAUTOCOMB (=off).

## Infrastruttura nuova (S52)
- Errore trovato e corretto: nel browser due righe leggevano process.env (motore_dlr P2, motore_lettura
  LOG2) e i motori tacevano; l'app dal vivo decideva diversamente dal backtest dal 05/09 all'01/10.
- Worker corretto (worker_index.js in archivio, deployato da Edu il 03/10): seme dall'apertura oraria
  delle 00:00 (prima: apertura giornaliera, due semi sbagliati), niente feed sabato/domenica.
- Raccolta notturna: trade_persi.md (statistica + persi), storico_live.json (tutti i trade dal
  15/09), confronto_live.md (feed del Worker contro calcolo del backtest, ogni notte), orario_live.json.
- Statistica dal vivo al 02/10: 45 chiusi, 51,1%, +5 pip; livello A 5/16, B 11/17.
- Edu: ChelseaAI non piazza ordini in autonomia; MetaTrader 5 piu' avanti. Per ora: raccolta + letture.

## Punti aperti, in ordine
1. Le due carte di riferimento rovesciate dalla combinazione totale: USDJPY 06/09/2022 s140 e USDCAD
   18/03/2020 s142 (trigramma alto in 六合 totale, lette LONG da Edu). Portargliele per il confine.
2. R79_AUTOPENA al 48%: leggere le carte dove sbaglia, trovare la traccia che la batte.
3. R82_SEDECLASH: perimetro "due sedi eliminate -> decide la mobile G/W" da validare.
4. Carte A perse fuori campione ancora da leggere: EURUSD 03/08 s115, USDJPY 02/09 s160 (-149),
   EURJPY 06/09 s181 (domenica? verificare), piu' quelle nuove di trade_persi.md.
5. Perche' il livello A fuori campione e' al 40%: tutti i sistemi calano (PB 54%->42%, LY 56%->48%,
   DLR 61%->56%); senza PB non migliora; B regge (73%). Decisione di Edu sul demo rinviata: aspettare
   un altro mese di carte nuove; ogni regola nuova va misurata anche su ago-set (fuori campione).
6. Regole di lavoro: Edu non vuole un push a ogni carta (accumulare); rispondere prima e misurare dopo;
   mai respingere una sua lettura con una percentuale; nomi degli zip sempre diversi.

## Push automatico (dal 05/10/2026)
I push su trading e storico-trading li fa Claude, con un token GitHub fine-grained `claude-push`
(Contents read/write su trading, storico-trading e xkdg). Il token sta SOLO nel file `chiave.txt`
che Edu carica a mano nella chat: non va mai scritto in memoria, nel registro, in questa ripartenza
ne' in nessun file dei repo (sono pubblici). A INIZIO SESSIONE, se fra i file caricati non c'e'
`chiave.txt`, CHIEDERLO A EDU prima di qualunque push ("Caricami chiave.txt col pulsante +"); senza
chiave si lavora lo stesso, ma non si pusha. Uso: clonare con
`https://x:<token>@github.com/edufengshui/<repo>.git`, commit come claude-push, push, e riferire cosa
e' stato caricato. Niente piu' BLOCCO 1 e 2 da far caricare a Edu; resta solo il BLOCCO 3 (la ripartenza).

## Formato obbligatorio e consegna
Tre blocchi cumulativi a fine sessione (1 software, 2 archivio con registro, 3 ripartenza).
Carte: cross, data, seme in testa; trend; sistema; esito; segue; conclusione; trigrammi; data con
vuoti; linee con parentela e ramo in italiano; incompatibili dichiarate; lettura con traccia,
smentite, conclusione, UN punto da confermare.
