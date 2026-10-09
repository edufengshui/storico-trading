# RIPARTENZA S54 — 07/10/2026 (fine S53, 05/10–07/10/2026)

## Primo controllo d'avvio
0. DAL 09/10/2026 IL LIVELLO A E' IN CANTINA (Edu): si mostra e si registra, non si trada; dal vivo si opera B/C/D.
   Il 70% del livello A vale solo dentro i sei anni (fuori campione ago-ott 2026: 46%). Lo storico dei prezzi
   ora arriva al 09/10/2026 e si aggiorna da GitHub toccando aggiorna_storico.txt (workflow aggiorna_storico.yml).
1. Se fra i file caricati NON c'e' `chiave.txt`, chiederlo a Edu ("Caricami chiave.txt col pulsante +")
   prima di qualunque push; senza chiave si lavora, non si pusha. Il token non va MAI scritto in
   memoria, nel registro, in questa ripartenza o nei repo (sono pubblici).
2. Clonare storico-trading e trading, `unzip history_full_1h_f.zip`, symlink `full1h.json`, cartella
   `work_trading/pwa` coi symlink ai motori, `npm install lunar-javascript`.
3. VERIFICARE CHE I DUE REPO SIANO ALLINEATI (cmp di liuyao.js, motore_lettura.js, motore_dlr.js):
   in S53 il liuyao.js caricato il 05/10 era stato costruito su una base vecchia e aveva PERSO quattro
   vie approvate (R79/R80/R81/R80_DANNOGIORNO) e R82_SEDECLASH non era mai stato scritto. Mai piu'.
4. Dire per prima cosa se una regola di Edu vive nel motore di lettura o nell'archivio ma non nella
   catena che decide (repo trading).
5. Leggere `trade_persi.md` (raccolta notturna, gira da sola su GitHub alle 00:45 GMT): si parte dai
   trade persi nuovi.

## Regola di lavoro nuova (Edu, 07/10/2026) — I TEMPI
Edu ha aspettato fino a dieci minuti per una risposta e ha dovuto cliccare "continua" piu' volte:
"Non e' pratico lavorare con te in questo modo". Causa: le misure complete (LY, guida, riferimento,
scala) durano 5-8 minuti l'una e venivano lanciate prima di rispondere. DA ORA: (a) prima si risponde
con la carta verificata da sola (termometro() sulla carta, racconto del motore), poi si misura;
(b) una sola misura mirata per passo (la scala TRESIST da' pb/ly/at/dlr/lett/livello di tutte le
carte in un colpo: basta quella piu' CARTERIF=1 quando si tocca il motore); le quattro complete solo
prima del push; (c) mai lanciare una misura e aspettarla nello stesso turno: lanciarla in background
(setsid) e leggere l'esito al turno dopo; (d) chat nuova quando diventa pesante.

## Basi di fine S53 (software caricato il 06/10/2026, repo allineati)
- LY vecchio S17: 2.788 carte, 57,64%, +33.180 (inizio S53: 57,39% +31.009)
- Carte guida: 82/114 (inizio 75/110; aggiunte EURJPY 26/11/2025, USDJPY 31/10/2022, EURJPY
  13/12/2024, GBPUSD 18/05/2022). Carte di riferimento (CARTERIF=1): 71/71 (inizio 64/66)
- Lettura S47 (MOTORE=lettura PRINCIPI=1): 2.779 carte, 54,55%, +23.572 (inizio 54,90% +23.594)
- Scala A+B+C+D (TRESIST=1 SOGLIAPIP=20 TRESISTDUMP=/tmp/tresist.json): 2.215 carte, 64,97%,
  +42.775 (inizio 2.216, 65,70%, +43.383: la scala e' CALATA di 0,7 punti, per dottrina di Edu)
- Motore DLR: 60,58% +41.734 (inizio 60,81%: spenta la casella isolata controlla|W su ordine di Edu)
- Parita' archivio/app (parita_tre.js 400): 0 diff; prova come nel browser: ok
- Comando LY canonico: `VUOTO=1 SOPRAF=1 DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1`

## Regole entrate in S53 (catena E motore salvo nota) — dettagli nel registro, sezioni 05-06/10/2026
- Combinazione totale (R83/MLCOMBTOT): se il trigramma ALTO e' legato e il basso sta messo peggio
  (sede vuota, o G/W clashata dal giorno e untimely) decide la linea piu' forte (USDJPY 06/09/2022);
  il blocco agisce solo DOPO il movimento delle linee (MLCOMBDIFFERITO; le bestie, la sede presa dalle
  bestie, S vs Y, piu' forte NON sono movimento); l'incompatibile P/B porta il suo malus sulla ferma
  che il suo arrivo combina, nel proprio trigramma, non su bersaglio clashato dal giorno (MLPORTAMALUS,
  USDCAD 18/03/2020).
- R79_AUTOPENA: la P fuori stagione col arrivo punito dal giorno e' INUTILE -> Shi contro Ying, la sede
  combinata dal giorno non partecipa (EURJPY 26/11/2025; la P di stagione resta a parlare, perimetro di
  Claude). La P/B che RETROCEDE non fa perdere la propria squadra anche col arrivo punito (USDJPY
  31/10/2022).
- ARRIVO COMBINATO DAL GIORNO ("cabla cosi' per tutto"): la linea arriva, si ferma, parla col carattere
  dell'arrivo, NON salta altrove (niente combinare/raggiungere/portare); la ritirata resta (USDJPY
  01/12/2022). ARRTENUTO / MLARRTENUTO.
- Guerra fra le due bestie (titani) SPENTA (MLGUERRA=on la riaccende): le bestie servono solo a
  facilitare una soluzione quando i mezzi soliti non danno un risultato chiaro.
- 回頭生: l'arrivo che genera indietro nutre SOLO la mobile, §50f tace (EURJPY 13/12/2024). Sedi
  uguali entrambe generate -> nessun vantaggio: decide il pilastro del giorno portato dalla bestia
  dell'elemento del suo stelo, se il ramo controlla l'altra sede (EURJPY 21/10/2021).
- R84_SEDEINGWVUOTA: la sede che si muove in G/W con l'altra sede vuota vince (GBPUSD 18/05/2022);
  confini di Claude: arrivo non vuoto, nessuna ferma che combina l'arrivo.
- DLR: casella isolata "il giorno controlla la W su R1" spenta (motore_dlr.js).
Provate e SCARTATE: "la mobile non si muove se l'arrivo e' combinato" (dal giorno o dalla data),
"niente ritirata con l'arrivo legato al giorno", la catena che prende sempre il motore sui legati.

## Punti aperti, in ordine
1. "Se PB e LY non sono d'accordo decide il LY" (Edu): misurato e NON cablato. Con le ultime regole:
   oggi 2.215 trade 64,97%; LY al posto del PB in A e C -> ~2.340 trade ~64,0%; solo nel C -> ~64,2%.
   Edu sta guardando le carte dove il LY va contro il PB e sbaglia, una alla volta (fatte: EURJPY
   13/12/2024 e GBPUSD 18/05/2022, entrambe corrette con sue letture). Prossime: EURJPY 30/04/2020 s115
   (+139, LY SHORT via R68_129), EURJPY 24/07/2023 s157 (-119), EURJPY 10/08/2023 s157 (+113).
   Lista: tresist.json, pb!=ly, dlr muto, ly sbagliato. Rimisurare "decide il LY" dopo ogni correzione.
2. R79_AUTOPENA: dopo le due letture di Edu ~56% su ~82 carte; carte dove sbaglia ancora (script
   r79.js in archivio: node r79.js con /tmp/rows.json da DUMP=/tmp/rows.json e /tmp/tresist.json).
3. Perimetri di Claude da validare: P di stagione resta a parlare (R79); G/W nella clashata untimely
   del basso (R83); due sedi eliminate -> decide la mobile G/W (R82); solo pilastro del giorno e solo
   controllo nel caso delle sedi pari (EURJPY 21/10/2021); confini di R84.
4. Carte A perse fuori campione da leggere: EURUSD 03/08 s115, USDJPY 02/09 s160 (-149), piu' le nuove
   di trade_persi.md (dal vivo al 02/10: 45 chiusi, 51,1%; livello A 5/16).
5. Livello A fuori campione al 40%: decisione di Edu sul demo rinviata di un mese.

## Push automatico
I push su trading e storico-trading li fa Claude (token `claude-push`, Contents read/write su trading,
storico-trading e xkdg), commit come claude-push, con `https://x:<token>@github.com/edufengshui/<repo>.git`;
sempre fetch+rebase prima del push (le altre chat e la raccolta notturna pushano). Niente BLOCCO 1 e 2;
resta solo il BLOCCO 3 (questa ripartenza, zip con nome sempre diverso, chiave.txt NON dentro).
Edu non vuole un push a ogni carta: accumulare, pushare a fine passo o quando lo chiede.

## Formato obbligatorio
REGOLA FISSA (Edu, 08/10/2026): OGNI carta presentata va SEMPRE con la carta grafica fatta col programma di Edu
(YijingWWG): `node carta_auto.js "TITOLO" seme annoStelo annoRamo meseRamo giornoStelo giornoRamo out.png`
(usa carta_grafica.js + YijingWWG.html; le incompatibili si muovono insieme alla mutante), poi inviarla.
Carte: cross, data, seme in testa; trend; sistema (con PB/LY/attuale/DLR/Lettura quando si discute
la scala); esito; segue; conclusione; trigrammi; data con vuoti; linee con parentela e ramo in italiano
(mai caratteri cinesi senza traduzione); incompatibili dichiarate; lettura con traccia, smentite,
conclusione, UN punto da confermare. Linee solo con le lettere P, B, W, G, C. Mai respingere una
lettura di Edu con una percentuale (Regola #10). Portare le sue regole nel motore senza chiedere.
