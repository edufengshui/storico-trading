# RIPARTENZA S76 — carta 9, somma dei fattori, View clashata (chat del 24/11/2026)

Leggere prima: questo file, poi RIPARTENZA_23_11_2026_S75.md (avvio, carte 7-9, sistema unito, registro in avanti, lotto),
poi RIPARTENZA_20_11_2026_S74.md e, per formato delle carte, RIPARTENZA_19_11_2026_S71.md.

## ALL'INIZIO
Come in S75: clonare storico-trading e trading con git diretto (mai add_repo), ln -sfn /home/claude/trading /root/trading,
ln -sfn storico-trading/qmdj_lavoro /home/claude/qm, NODE_PATH=/home/claude/storico-trading/node_modules,
push col token di chiave.txt (Edu lo carica; chiederglielo se manca), header Authorization Basic claude-push:TOKEN.
Carta: node qmdj_lavoro/carta_live.js CROSS AAAA-MM-GG (dati, verdetti, ore); disegno: node render.js AAAA-MM-GG stelo ramo ju yin|yang
(scrive /home/claude/qm/carta.html; nella pagina il div va con class="qm"). Pagina "Carte dove Lio sbaglia"
(slug 5ef71a7f-9123-48e2-8d52-fcc0c3cb1b44): read_file con paths ["index.html"], copiare, carta nuova in cima dopo <main><h1>...</h1>,
publish_files con base_version; per piccole aggiunte edit_version.
REGOLA DI EDU: la frase per aprire una chat nuova comincia sempre con "Trading" (es. "Trading - leggi ripartenza S77").

## DECISO / CONFERMATO IL 24/11
- "Responso incerto" dello ZFTY = "tace": il sistema unito resta ZFTY, e DsHs solo dove lo ZFTY tace.

## CARTA 9 — AUDUSD 23/11/2026 (letta da Edu il 24/11)
Seme 66, ora Gui Si, yin 8; trend SHORT, sceso 11 pip (EA -25,1); Lio LONG media sbagliato.
Prima: ZFTY fermo ("Output del controllato non timely"), unito -> DsHs "segue", ribaltato dalla regola di View: "non segue", sbagliato.
Edu: "Il TY ha un clash interno. Il DS Xin molto timely clasha il debole View che farebbe da ponte. Lo stelo del mese Ji clasha il TY"
(conta la posizione: Ji in Gen, di fronte a Kun). "A volte a decidere chi vince non e' un solo fattore, ma una combinazione di piu'
fattori". Poi: "C'e' anche da considerare il prossimo Commander. Lo si fa quando siamo nell'ora Gui. Nell'ora successiva lo ZF
successivo in Kan genera questo attuale e clasha View [...] un praticante umano capirebbe presto che sono troppi indicatori contro".
CABLATO (repo trading 05c6b2d e 467b9dd; copie in storico-trading 50e85f6 e ece943c):
- tyDebole(): nello ZFTY, ZF che controlla il TY e Output del TY non timely: fattori = clash interno nel palazzo del TY; DS timely nel
  palazzo opposto al ponte View debole (elemento generato dallo ZF che genera il TY); stelo del mese nel palazzo opposto al TY;
  nell'ora Gui il prossimo Commander (palazzo dello stelo della decade seguente) che genera lo ZF. Con QMDJ_TY_SOMMA_MIN (3) fattori
  vince lo ZF: segue. Interruttori QMDJ_TY_SOMMA ('zfty'|'off'), QMDJ_TY_SOMMA_PONTE ('view'|'tutti'), QMDJ_TY_SOMMA_PROSSIMO.
  Nello storico scatta su 0 e 1 carte: vale per i casi nuovi.
- viewClashata(): la regola di View (misura del 20/11) NON agisce se il palazzo opposto a View ospita il DS timely nel mese o, nell'ora
  Gui, il prossimo Commander. QMDJ_VIEW_SU_CLASH (default true).
- Funzione prossimoCmd(c) in qmdj.js.
Ora la carta e' giusta: SHORT, segue, dallo ZFTY.
Misura (2020-23 · 2024-26 · vivo), sistema unito: prima 52,3% +16.100 · 51,7% +13.403 · 63,2%; dopo 52,3% +16.414 · 51,8% +14.267 ·
69,1% (68 carte). Lo guadagno quasi tutto la View clashata (ZFTY vivo 63,6% -> 69,7%). Dove View spinge in su ma e' clashata il cross
sale 50,8% (122) · 59,8% (122): nel secondo periodo sale lo stesso, quindi non e' una conferma piena. Il vivo e' fatto in parte di
carte gia' lette e corrette: la prova vera e' il registro in avanti.
Regola di View accesa/spenta (prima delle due regole): unito accesa ramo 52,3% · 51,7% · 63,2%; stelo 51,3% · 51,4% · 70,6%;
spenta 51,2% · 50,3% · 66,2%. Edu non ha ancora deciso fra ramo e stelo (resta 'ramo').
Script: qmdj_lavoro/prove_22_11/somma.js, view_off.js, view_clash.js.

## PATTO (18/11) — STATO
Contatore 9: 1 USDCAD 11/11 · 2 NZDUSD 28/10 · 3 USDCAD 27/10 · 4 USDCHF 19/11 · 5 EURGBP 19/11 · 6 USDCHF 18/11 · 7 USDCAD 03/11 ·
8 USDCAD 23/11 · 9 AUDUSD 23/11.
PROSSIMA = CARTA 10, USDCHF 23/11 (Lio SHORT, EA -10,4 pip): alla decima si fa il controllo del patto (c'e' un gruppo di giorni con
Lio sotto il 50% nello storico? se no si cambia strada). Poi AUDUSD 29/10, AUDUSD 28/10, EURJPY 06/11 (ricontrollare che non siano lette).
In attesa della lettura di Edu: carte 3, 4, 6, 7 (vedi S75).

## DA CONTROLLARE
- Mattina del 25/11: la raccolta notturna sul runner ha scritto segnali.json (campi forza, forza_lio, qmdj) e qmdj_live.json?
  Nota: qmdj_live.json del 24/11 e' stato scritto alle 10:17 GMT con le regole di allora (impronta de048ca8); dal 25/11 usa la copia
  nuova di qmdj.js.
- EA: perche' non e' entrato il 24/11 (foto del diario del VPS, righe "LioEA:" 03:00-03:45 ora del server).
- Decisioni aperte: Tai Sui ramo/stelo nelle regole ZF aiuti e View; "segue forte"; Wu = quale valuta; repo pubblici o privati.
