# RIPARTENZA — 17/08/2026 (sera)

## PRIMA DI TUTTO: i PRINCIPI DI LETTURA DI EDU
Sono nel REGISTRO_CORREZIONI_13_08_2026.md, sezione "PRINCIPI DI LETTURA DI EDU" (11 punti). Leggerli PRIMA
delle carte. In breve: 1) G e W parlano primi (Yong Shen), P/B/C solo se tacciono, B = indicatore negativo;
2) priorità residua: se non ci sono alternative migliori si va all'unica disponibile; 3) si va dove si svolge
l'azione, la forza da sola non dà direzione; 4) capannello (raduno completo: il Qi si ferma) vs corridore
(arrivo che clasha/combina: si guarda dove va); 5) "dipende": lo Yong Shen cambia la lettura della stessa
azione; 6) il vuoto non agisce, anche se timely; 7) certe carte non hanno alternative: si legge l'unica cosa
che c'è; 8) chi non vince perde; 9) agisce l'arrivo, non la partenza; 10) per respingere una lettura
dottrinale serve ALMENO UNA CARTA completa (con seme) dove non funziona; 11) regole valide nei due periodi.

## Regole di lavoro con Edu (non negoziabili)
- Edu non programma: dire cosa deve fare/vedere, mai codice; un passo per messaggio; conferma prima del
  successivo. Parentele sempre P/G/B/C/W. Sempre "segue / non segue il trend". Niente cinese nelle domande
  di dottrina (rami sì). Ogni carta col SEME e con l'esito RICONTROLLATO sui prezzi (open 00:00 → close 21:00
  GMT) prima di presentarla. Formato carta obbligatorio (6 righe + blocco dati + commenti).
- I file da pushare si consegnano SOLO a fine sessione o quando Edu li chiede, in due blocchi separati.

## Ambiente
`git clone https://github.com/edufengshui/storico-trading` · unzip history_full_1h_f.zip → symlink
`full1h.json` · mkdir work_trading/pwa con symlink ai file della PWA · `npm i lunar-javascript` ·
baseline: `RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b
node pb_stress.js` → 4.111 · 53,51% · z 4,51 · +17.221 · grande test: aggiungere `PBLY=1`.
Parità software ↔ motore: script parity_check_ly.js (dump LYDUMP dal motore, poi liuyao.js browser su ogni
carta): deve dare 0/4.111 su LY e su S9.

## Stato del grande test (fine sessione)
**S9: 4.111 carte · 56,46% · z 8,28 · +30.270 pip · recente 55,67 / vecchio 57,44 · LY tace 553.**
S1 (LY vince ogni contrasto) z 7,97 · S3 z 7,85. Concordi PB=LY: 1.895 al 59%. Baseline PB z 4,51.
Tutto in-sample: ~250 test, rumore z ~3,3; 9 cross ≈ 2,5 osservazioni indipendenti. Holdout non aperto.

## Fatto oggi
1. **Termometro LY portato nel software** (repo `trading`): liuyao.js con 32 vie + 2 rafforzativi
   (stesso ordine del motore), verdetto S9 con "decided by" e LETTURA in inglese con i rami reali; codici
   P/G/B/C/W; due esagrammi; EMA; Bazi + ora dal seme; attori del giorno (vuoti, Generale, Ding, Cavallo,
   Virtù, Ghost/Tomb); elenco vie con interruttori, "on this card", dottrina al click; MODELLO DI FORZA
   (colonna Force + Hidden force, arrivo, raduni, dettaglio al click). app.js: PB di default, apre sul
   feed forex, DLR nascosto in modalità PB/forex, tutto in inglese. sw.js v54.
2. **Fissate in coda (registro §63-§69 + modello di forza):** §63/§63-bis 回頭生 bloccato (mobile debole
   O assediata → si va dove agisce l'arrivo); §64 PRIORITÀ RESIDUA (G/W tacciono → il più forte fra P e C,
   unico → sua sede; B residuo no) [effetto grande]; §65 movimento nullo + Ying sul giorno → sede Ying;
   §66 B avanzante sotto → LONG; §67 raduno 三會 nel trigramma inferiore: forza mobile ≥3 LONG / <3 SHORT;
   §68 clash dell'arrivo per Yong Shen (P clashata → opposta; G/C → sede; mobile W → sede clashata)
   [effetto grande]; §69 unica azione (mov. nullo + giorno clasha 1 ferma: vuota → sede, piena → opposta;
   pilastro dottrinale, sostegno debole 72/46).
3. **Modello di forza** (liuyao.js `forzaModello`): dottrina fissata da Edu (mese su tutte; giorno/anno
   solo sul focus; ora 20%; raduno completo senza vuoti +2; vuoto −2 salvo prospero, ma il vuoto NON agisce;
   mobile con effetto dell'arrivo; nascosto; ferme adiacenti solo se la madre è timely). Misurato: la forza
   da sola non dà direzione (≈50%), pesa dentro un'azione.
4. Misurato LY-primo vs PB-primo: equivalenti (S1 = LY comanda). Il valore è nella concordanza (59%).

## Sviste mie da non ripetere
- Nelle liste "via —" = vie 1-6 (senza § nel registro), NON "nessuna via".
- Esito della EURJPY 29/04/2024 scritto una volta col segno sbagliato: è SHORT −188 (169,37 → 167,49).
  RICONTROLLARE SEMPRE il segno sui prezzi prima di presentare una carta.

## Carte lette oggi e lasciate come "lettura di caso" (non cablate)
- USDJPY 14/06/2022 (seme 134): raduno di Fuoco con la mobile L1 che muore nel vuoto → "il Fuoco va a L4"
  (Edu). Misurato 51,8% su 519 → non regge come regola.
- EURJPY 29/04/2024 (seme 169): Edu legge LONG (L5 clashata porta il Fuoco alla W); esito SHORT −188.
- Letture respinte con carta di prova: G difeso dalla combinazione (USDCHF 16/09/2024 seme 84); "linea
  vuota clashata dal giorno esce e decide" in generale (48,9% su 348) — ma fissata la §69 nella sola forma
  "unica azione"; "Shi genera Ying" (43,6% in coda) — sostituita da §65; nascosto clashato dal giorno
  = estratto (35% in coda; la versione "debole → disperso" 61% non è stata cablata, in attesa).

## Da fare (in ordine)
1. Continuare il giro delle 553 "LY tace" (peggiore: EURJPY 21/08/2023 −128) OPPURE, come chiesto da Edu,
   passare alle carte "spiegate ma sbagliate": §52 "chi non vince perde" (719 carte, 335 contrasti al
   49,6%), 三會 col mese (464), 退神 (357), §50d/e (249), §53d (244) → cercare ECCEZIONI dottrinali dentro
   le vie grandi (una via alla volta, parità dopo ogni cambio).
2. Candidata non cablata: nascosto debole (forza <1) clashato dal giorno → disperso → sede opposta
   (54 carte di coda, 61%, allineata).
3. Valutare se il modello di forza può sostituire "timely" nelle vie esistenti (una alla volta).
4. Produzione §14 (differita da Edu). SISTEMA_CATENE_v3.md: DLR −2.565 pip (non −1.611).
5. Lungo termine: congelare e aprire l'holdout. Edu ambisce all'80%: spiegato che 56% in-sample è già
   forte e che sopra il 60-65% fuori campione non esiste; la prova vera è l'holdout.

## File
- Software `trading`: index.html, app.js, liuyao.js, plumblossom.js, sw.js (v54).
- Archivio `storico-trading`: REGISTRO_CORREZIONI_13_08_2026.md, pb_stress.js, liuyao.js, RIPARTENZA_17_08_2026.md.
