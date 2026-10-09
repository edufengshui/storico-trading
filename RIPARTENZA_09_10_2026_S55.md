# RIPARTENZA S55 — 09/10/2026 (fine S54, 07/10–09/10/2026)

## COSA SI FA IN QUESTA CHAT (ordine di Edu, 09/10/2026)
"Nella nuova chat voglio fare solo questo nuovo metodo magari iniziando dalle carte dei trade andati male."
SOLO IL METODO DEL TREND (lettura_trend.js): S = trend, Y = contro-trend. Niente altre regole, niente
scala, niente "decide il LY": quelle restano nei punti aperti in fondo e si riprendono dopo.
Si parte dalle carte dei trade PERSI della settimana 05-07/10 (lista sotto), una alla volta, lette col
metodo del trend; per ognuna Edu dice come la legge lui e la regola entra in lettura_trend.js (archivio E
repo trading, stesso file) nella stessa sessione, poi si rimisura con lettura_trend_test.js.

## Primo controllo d'avvio
1. Se fra i file caricati NON c'e' `chiave.txt`, chiederlo a Edu ("Caricami chiave.txt col pulsante +")
   prima di qualunque push; senza chiave si lavora, non si pusha. Il token non va MAI scritto in memoria,
   nel registro, in questa ripartenza o nei repo (sono pubblici).
2. Clonare storico-trading e trading, `unzip history_full_1h_f.zip`, symlink `full1h.json`, cartella
   `work_trading/pwa` coi symlink ai motori, `npm install lunar-javascript`. Lo storico dei prezzi arriva al
   09/10/2026 e si estende da GitHub toccando `aggiorna_storico.txt` (workflow aggiorna_storico.yml).
3. VERIFICARE CHE I DUE REPO SIANO ALLINEATI: cmp di liuyao.js, motore_lettura.js, motore_dlr.js, trend_ly.js,
   lettura_trend.js. Mai piu' un file costruito su una base vecchia (S53).
4. Leggere `trade_persi.md` (raccolta notturna, 00:45 GMT): i trade persi nuovi di oggi si aggiungono alla lista.
5. REGOLA FISSA DELLA CARTA GRAFICA (Edu, 08/10/2026): ogni carta presentata va con l'immagine del programma di
   Edu, INVIATA PER PRIMA (SendUserFile prima di scrivere il testo, altrimenti Edu non la vede), con la DATA
   DELLA CARTA nei menu del programma (non quella di oggi), le incompatibili segnate come mobili:
   `node carta_auto.js "TITOLO" AAAA-MM-GG seme annoStelo annoRamo meseRamo giornoStelo giornoRamo out.png`
   (in archivio, usa carta_grafica.js + YijingWWG.html + Playwright/Chromium). Il ramo dell'anno si prende da
   lunar-javascript (getYearInGanZhiExact), NON da r.pal.

## IL METODO DEL TREND — le 12 regole fissate da Edu il 09/10/2026 (lettura_trend.js, testa del file)
 1. Shi = trend, Ying = contro-trend; si guarda chi delle due e' logicamente avvantaggiata.
 2. Cio' che fa l'arrivo della mobile a S o Y le influenza: nutrire S o colpire Y -> segue; colpire S o nutrire Y
    -> non segue (colpire = controllare o drenare). Vale "in contemporanea" con tutto il resto, non prima ne' dopo.
 3. Solo la combinazione trasporta la partenza sopra un'altra linea (non entra nel metodo).
 4. L'arrivo che genera la mobile stessa tiene il beneficio per se' (EURJPY 19/12/2024, rimprovero).
 5. La mobile che retrocede non condiziona le sedi (USDJPY 28/03/2022).
 6. Una linea vuota fra la mobile e la sede ferma l'influenza (EURUSD 26/11/2021, GBPUSD 15/12/2022).
 7. La sede di stagione nel mese non si lascia drenare ne' controllare (GBPUSD 15/12/2022, Y nel mese Zi).
 8. I pilastri che convergono su una sede la rendono forte (2+ pilastri non vuoti: +1).
 9. Il trigono chiuso dall'arrivo con una sede e col mese o il giorno avvantaggia quella sede (EURJPY 16/01/2026).
10. La sede che e' lei stessa la mobile e si fa generare indietro e' avvantaggiata (AUDUSD 07/10/2026); controllata
    indietro, colpita. Una sede vuota non beneficia di nulla.
11. Il carattere conta: nutrire una P o una B rovescia il segno (USDJPY 30/07/2026 s163).
12. Se S e Y sono TUTTE E DUE troppo fuori stagione il metodo TACE (USDCAD 21/11/2022: "S e' troppo untimely...
    dobbiamo usare il metodo normale"; "se 'troppo fuori stagione' taglia troppe carte non va bene: diciamo se
    tutte e due lo sono"). Perimetro di Claude su "troppo": elemento controllato dal mese o che controlla il mese.
Punteggio Shi/Ying, verdetto segue/non segue, dir dal trend EMA; sede combinata e controllata dal mese: -1.

MISURA DI PARTENZA (lettura_trend_test.js su /tmp/tresist.json, 3.309 carte, soglia 20 pip): parla su 1.123,
48% (2020-25 47%, 2026 gen-lug 56%, ago-ott 45%). Col DLR: concordi 60% su 535, discordi -> DLR 64% su 531.
Col LY: concorde 55%, discorde 59%. Il metodo da solo NON regge: la prossima chat serve a capire perche',
carta per carta, con Edu. Non si cerca la fetta che misura bene (rimprovero di Edu): la regola deve valere
su tutte le carte.
Nell'app e' voce informativa "Metodo del trend" (rapporto e voci del registro), NON conta nella scala.

Rimproveri da tenere a mente: "sembra che analizzi le cose solo meccanicamente senza metterci dentro un
pensiero strutturato attento ai dettagli" (l'arrivo che genera la mobile stessa non e' un nutrimento di S);
Regola #10: mai respingere una lettura con una percentuale, si smentisce solo con una carta; "voglio continuare a
VEDERE il trend": niente teoria, carte.

## Carte da cui partire (trade persi 05-07/10/2026, trade_persi.md) e cosa dice oggi il metodo
Formato: cross data seme · trend EMA · sistema · esito · metodo del trend oggi.
- EURUSD 07/10 s112 L5 · SHORT · sistema LONG (liv. B nuovo) · -56 · metodo: segue -> SHORT (giusto: "l'arrivo Hai
  nutre lo Shi"). Edu la voleva "la prossima volta": PRIMA CARTA.
- EURJPY 07/10 s178 L5 · SHORT · LONG (cantina) · -114 · metodo tace ("la Ying e' di stagione: non si lascia drenare").
- NZDUSD 07/10 s56 L6 · SHORT · LONG (cantina) · -22 · metodo: non segue -> LONG (sbagliato: Shi vuoto, due pilastri
  sulla Ying).
- AUDUSD 07/10 s69 L4 · SHORT · LONG (B) · -19 · gia' letta da Edu: "S si muove per generare indietro, Y non puo'
  beneficiare di L2 che si muove perche' e' vuoto" (regola 10). Da rivedere col metodo cablato.
- EURGBP 07/10 s84 L3 · SHORT · LONG (C) · -8.
- USDJPY 06/10 s157 L4 · LONG · SHORT (B) · -17.  AUDUSD 06/10 s69 L3 · SHORT · SHORT (B) · -14.
- EURUSD 05/10 s112 L3 · SHORT · LONG (cantina) · -32 · metodo tace ("lo Shi si muove ma e' vuoto").
- USDJPY 05/10 s157 L3 · LONG · SHORT (A) · -19.  AUDUSD 05/10 s69 L2 · SHORT · SHORT (cantina) · -18.
- GBPUSD 05/10 s132 (-22, metodo non segue sbagliato), GBPUSD 06/10 e 07/10 s132 (metodo segue, sbagliato tutte e
  due): carte non tradate ma utili come smentite del metodo.
Per ogni carta: immagine prima, poi la lettura col metodo del trend (Shi, Ying, cosa fa l'arrivo, pilastri, vuoti,
stagione), UN punto da confermare. Edu detta, Claude cabla in lettura_trend.js, rimisura, va alla carta dopo.

## Basi di fine S54 (software pushato il 09/10/2026, repo allineati)
- LY: 56,95% (base canonica `VUOTO=1 SOPRAF=1 DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1`)
- Carte guida 83/114 · carte di riferimento (CARTERIF=1) 71/71 · parita' archivio/app 0 diff
- Scala NUOVA (Z-TOT54, TRESIST=1 SOGLIAPIP=20): ~62%; cantina (Z-CANT, il vecchio A): 46% fuori campione.
  Scala: cantina = PB, LY, DLR concordi (si mostra e si registra, NON si trada; CANTINA_A=0 in localStorage la
  riapre); A = sistema attuale + DLR; B = PB+LY col DLR muto; C = DLR + Lettura S47. Dal vivo 15/09-09/10 con la
  scala nuova: +319 pip (con la vecchia -109).
- Motore DLR 60,58%. Sistema-trend (trend_ly.js) con T9 "le sedi": voce informativa; T9 parla su 35 carte, 57%.
- Storico prezzi al 09/10/2026 (aggiorna_storico.yml).

## Regole entrate in S54 (dettagli nel registro, sezioni 07-09/10/2026)
- Arrivo incompatibile: agisce FUORI dalla partenza (combinazione prima di tutto, poi stesso ramo; bestia blocca;
  senza sbocco resta; mobile che diventa vuota scartata) — MLINCFUORI/T0k0, R85_INCFUORI in catena.
- Bestie coi rami vuoti non agiscono (MLBESTIAVUOTA, VIABESTIAVUOTA).
- Arrivo combinato dal giorno resta se stesso (MLARRCOMBRESTA); nascosto portato solo se timely o generato
  (MLPORTANASCOSTO); scala col carattere dell'arrivo (MLSCALACARATTERE).
- Cantina / scala rinominata (app.js livelloTreSistemi, raccolta_notturna.js traduce i livelli pre-09/10).
- Provate e lasciate: il DANNO che blocca la mobile (51%); T9 come voto; trigono in T9 (46%); "sede generata
  indietro favorita" come forma secca (46%).

## Punti aperti (DOPO il metodo del trend)
1. "Se PB e LY non sono d'accordo decide il LY": misurato ~64%, non cablato; carte EURJPY 30/04/2020 s115,
   EURJPY 24/07/2023 s157, EURJPY 10/08/2023 s157.
2. R79_AUTOPENA ~56% su ~82 carte (r79.js).
3. Perimetri di Claude da validare: P di stagione in R79; G/W nella clashata del basso (R83); confini R84; confini
   T9 (adiacenza, forza); "troppo fuori stagione" = controllato dal mese o controlla il mese (regola 12).
4. Cantina: rivedere fra un mese se il vecchio A risale fuori campione.

## Push automatico
I push su trading e storico-trading li fa Claude (token `claude-push` in chiave.txt caricato da Edu): add_repo
sui due repo, poi push su `https://github.com/edufengshui/<repo>` (l'URL col token dentro viene rifiutato dal
proxy). Commit come claude-push; MAI riscrivere o forzare i commit dei repo di Edu. Sempre fetch+rebase prima
del push (la raccolta notturna pusha). Niente BLOCCO 1 e 2; resta solo il BLOCCO 3 (questa ripartenza, zip con
nome sempre diverso, chiave.txt NON dentro). Non un push a ogni carta: a fine passo o quando Edu lo chiede.

## Formato obbligatorio della carta
Immagine PRIMA. Poi: cross, data, seme; trend; sistema (PB/LY/attuale/DLR/Lettura quando si parla di scala);
esito; segue; conclusione; trigrammi; data con vuoti; linee con parentela e ramo in italiano (mai caratteri
cinesi senza traduzione); incompatibili dichiarate; lettura con traccia, smentite, conclusione, UN punto da
confermare. Linee solo con le lettere P, B, W, G, C. Mai respingere una lettura di Edu con una percentuale
(Regola #10). Portare le sue regole nel codice senza chiedere. Tempi: prima la carta, poi UNA misura mirata
(lettura_trend_test.js dura pochi secondi; le misure complete solo prima del push, in background).
