# RIPARTENZA S75 — carta 7 e prove interno/esterno (chat del 22-23/11/2026)

Leggere prima: questo file, poi RIPARTENZA_20_11_2026_S74.md (patto, carte 5 e 6, note tecniche) e, per avvio e formato delle carte,
RIPARTENZA_20_11_2026_S72.md e RIPARTENZA_19_11_2026_S71.md.

## ALL'INIZIO
Come in S74: clonare storico-trading e trading con git diretto (mai add_repo), ln -sfn /home/claude/trading /root/trading,
ln -sfn storico-trading/qmdj_lavoro /home/claude/qm, NODE_PATH=/home/claude/storico-trading/node_modules,
push col token di chiave.txt (Edu lo carica; chiederglielo se manca), header Authorization Basic claude-push:TOKEN.
Pagina "Carte dove Lio sbaglia" (slug 5ef71a7f-9123-48e2-8d52-fcc0c3cb1b44): read_file con paths ["index.html"], copiare il file,
aggiungere la carta in cima dopo <main><h1>...</h1>, publish_files con base_version.

## CARTA 7 — USDCAD 03/11/2026 (presentata il 22/11, IN ATTESA DELLA LETTURA DI EDU)
Seme 139, ora Jia Wu, yin 5; trend SHORT, salito 27 pip; Lio SHORT forte sbagliato; DsHs e ZFTY tacciono ("stesso palazzo: fermo").
Carta Fu Yin: DS (Xin), HS (Jia sotto Xin), ZF, ZS e TY tutti in Kun con la porta Death. View in Li. Vuoti del giorno Shen You,
dell'ora Chen Si. Il mercato gira nell'ora Jia Wu (11-13 GMT, 16 pip contro), poi Yi Wei e Bing Shen (12 e 12 contro).
Domanda fatta a Edu: "con tutto il comando in Kun e la carta Fu Yin, e' giusto che il QMDJ taccia, o qualcosa dice non segue?"

## DOTTRINA (Edu 22/11): "Per Tai Sui nel qimen si intende lo stelo dell'anno"
Gia' detto il 25/10. Nel software due regole usavano invece il RAMO dell'anno:
- QMDJ_ZF_AIUTI ("ZF generato dal Tai Sui e dal DS: segue", Edu 20/11);
- viewSu, condizione 2 ("View nel palazzo del Tai Sui": misura del 20/11).
Aggiunto in qmdj.js l'interruttore QMDJ_TAISUI_DOVE ('ramo' = com'era, default | 'stelo'). DEFAULT ANCORA 'ramo': Edu non ha deciso.
Misura con lo stelo (2020-23 · 2024-26 · vivo): ZF aiuti, il mercato segue 52,7% (93 carte) · 45,3% (139) · 1 su 4 (col ramo 56,9% · 39,8%);
View nel palazzo del Tai Sui, il cross sale 51,1% · 51,9% (col ramo 53,1% · 54,7%: l'effetto vale solo col ramo);
DsHs 51,7% · 51,7% · vivo 65,5% (ramo 52,0% · 52,3% · 62,1%); ZFTY 51,3% · 51,4% · vivo 73,0% su 63 (ramo 52,2% · 51,8% · 64,5%).
PROPOSTO A EDU, SENZA RISPOSTA: (1) mettere lo stelo nella regola dello ZF aiutato (dottrina); (2) la regola di View o si rinomina
"View nel palazzo del ramo dell'anno" o si spegne; (3) spegnere anche il "segue forte" (vedi sotto), che e' solo misura.

## CABLATO IL 22/11 (repo trading, qmdj.js) — nessun verdetto cambia
- QMDJ_WU_INTERNO, default 'zfty' ('off'): nello ZFTY, Wu nel cielo in un palazzo interno (Kan Gen Zhen Xun nel dun yang; Li Kun Dui Qian
  nel dun yin) e ZF in un palazzo esterno; se lo ZFTY dice gia' "segue" la lettura porta segueForte (e wuInterno). Edu: "Cablalo".
  Misura: il mercato segue 55,1% (690 carte) · 54,9% (621) · vivo 6 su 6. E' misura, non dottrina (gruppo scelto dopo averne guardati ~20).
  Su Lio NON separa: nei giorni segue forte Lio contro il trend 61,8% (102) · 64,3% (112), col trend 65,3% (121) · 63,7% (102).
  Solo sui trade forti: col trend 89,4% (47) · 78,6% (42), contro 69,8% (43) · 68,3% (63). Per il patto: no.
- QMDJ_ZFTY_CONTRO='wu' (prova, spento): ZF contro Wu nel cielo al posto del Tian Yi. ZFTY 51,6% +10.368 · 51,4% +8.974 (peggio).
- qmdj.js non e' caricato dall'app: Lio e l'EA non cambiano.

## PROVE DEL 22/11 CHIESTE DA EDU — nessuna separa (tutto entro 1-3 punti)
Base: tutti i lun-ven 2020-02-20 / 2026-10-16 (7.333 e 5.988 carte), carta rotante del seme, vuoti dell'ora.
Segue di base 50,0% · 49,6%; sale 51,1% · 51,3%.
1. ZF CONTRO WU (rapporto fra i due palazzi: controlla, genera, stesso elemento, stesso palazzo), Wu nel cielo e nella terra:
   segue fra 46,7% e 52,4%. Spunti deboli: Wu della terra controllato dallo ZF 48,5% · 46,8%; stesso elemento 47,6% · 47,4%.
2. WU INTERNO O ESTERNO: cielo interno 51,2% · 50,1%, esterno 48,7% · 49,1%; terra niente. Con lo ZF: Wu interno/ZF esterno 52,9% · 51,9%.
3. Edu: "Interno/esterno potrebbe essere riferito alle due valute del cross" poi "EUR e' interno, USD esterno; attori ZF, Wu, Birth,
   DS, Tai Sui, Open". Attore interno -> il cross sale: tutti fra 50,7% e 52,0%. Anche solo palazzi non vuoti, e contando quanti
   dei sei sono interni: niente. Solo EURGBP: ZF interno +7/+6 punti, Wu interno +5/+5 (circa 400 carte per gruppo).
4. Edu: "interno = EUR solo quando EUR sale; se scende, il contrario" (interno = valuta del trend, quindi attore interno = segue).
   ZF 49,5% · 48,8% (esterno 50,4% · 50,4%); Wu 51,2% · 50,1% (48,7% · 49,1%); Tai Sui (stelo) 49,4% · 48,8% (50,5% · 50,5%);
   Birth, DS, Open niente. A coppie il massimo e' ancora ZF esterno/Wu interno.
5. QUALE LATO E' PIU' FORTE NEL MESE (somma tempo mese+stagione dei 4 palazzi, vuoto = 0): interni piu' forti 49,5% · 49,1%,
   esterni piu' forti 51,4% · 50,9% (contrario all'idea, 2 punti, senza scala). Forza dei sei attori per lato: niente.
   ZF interno e forte 47,3% · 48,0%; ZF esterno e forte 50,3% · 52,3%.
Edu, 22/11: "Sembra che nulla di questo abbia un valore superiore al caso". D'accordo. Poi: "Abbiamo altri test da fare".
Unica cosa che si ripete: lo ZF nel lato del trend (interno) segue 1-3 punti MENO; Wu interno 1-2 punti di piu'.
Script delle prove: storico-trading/qmdj_lavoro/prove_22_11/ (zf_wu.js = base e misura rapida; wu_int.js, wu_zfty.js, lio.js,
valute*.js, forza.js, ts.js). lio.js vuole il dump: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi> (3 minuti).

## PATTO (18/11) — STATO
Contatore: 1 USDCAD 11/11 · 2 NZDUSD 28/10 · 3 USDCAD 27/10 · 4 USDCHF 19/11 · 5 EURGBP 19/11 · 6 USDCHF 18/11 · 7 USDCAD 03/11.
Nessun gruppo porta Lio sotto il 50%. Controllo alla decima. Da presentare: AUDUSD 29/10, AUDUSD 28/10, EURJPY 06/11
(ricontrollare che non siano gia' lette).
In attesa della lettura di Edu: carta 3 (USDCAD 27/10, fan yin), carta 4 (USDCHF 19/11, ZS vuoto in Xun), carta 6 (USDCHF 18/11,
DsHs: View in Kan con l'HS clasha il DS in Li, "non segue" ma il mercato ha seguito), carta 7 (Fu Yin).

## NOTE TECNICHE
- Il mio conteggio del primo periodo da' 7.333 carte contro le 7.225 del 20/11 (ZFTY uguale in percentuale, pip +15.509 contro +13.950).
- Lio sul dump: 4.801 trade, 66,2% contando vinto = direzione giusta (65,5% scritto il 19/11), pip uguali +91.073.
- Nel repo storico-trading ci sono gli esiti EA del 20/11 e le raccolte notturne fino al 23/11: non guardati in questa chat.

## PUNTI APERTI
- Le tre decisioni sul Tai Sui / View / segue forte (sopra).
- Wu = quale valuta del cross; repo pubblici o privati (da S73).

## AGGIUNTE DEL 23-24/11 (stessa chat)
- PROVA "Wu sopra lo stelo del di pan" (Edu 23/11: "se lo controlla o lo drena non segue"): non separa. Yi/Geng/Xin sotto Wu:
  segue 50,8% · 50,2% (altri 49,6% · 49,4%). Per palazzo e per stagione del palazzo: niente. Solo spunto: Wu sopra Ren/Gui in un
  palazzo fuori stagione 45,6% · 47,1% (467 e 382 carte). Script wu_sotto.js, wu_sotto2.js.
- EA: il 24/11 NON e' entrato (segnali.json era pronto alle 00:13 GMT, token valido). Causa da cercare nel diario del VPS
  (Consiglieri, righe "LioEA:" fra le 03:00 e le 03:45 ora del server). Edu deve mandare la foto. Saldo demo 494,44 EUR.
  EA dal 18/11: 10 trade, 4 vinti, -58,6 pip, -5,46 EUR. Il 23/11 tre persi su tre (EA -76 pip, registro -40: l'EA entra alle 01:00).
- LIO DAL VIVO al 23/11: 60 trade, 34 vinti (57%), +346 pip; picco +442 il 10/11. Dal 16/11: 10 trade su 14 contro il trend, 2 vinti.
- CARTA 8, USDCAD 23/11/2026 (seme 143, Wu Xu, yin 8; trend LONG, salito 23; Lio SHORT media sbagliato; DsHs e ZFTY "non segue").
  Edu: "Quando ZF e TY sono paralleli vince il palazzo piu' timely. In inverno Gen e' piu' timely di Kun" e
  "La regola della stagione vale solo su Gen e Kun perche' sono due terre in posizione opposta e quindi solo in estate/inverno".
  CABLATO (trading 51673f7): QMDJ_PAR_TIMELY, default 'zfty' ('off'). ZF e TY in Gen e Kun: d'inverno (亥子丑) vince Gen, d'estate
  (巳午未) vince Kun; vince lo ZF = segue. Altrimenti DsHs come prima. Misura: 157 e 136 carte, cambiate 53 e 48, giuste meta';
  ZFTY 52,2% · 51,7% · vivo 64,6%. (La mia prima traduzione, con tutte le coppie e le quattro stagioni, era sbagliata e peggiorava.)
- Edu 24/11: "Io farei intervenire DsHs solo quando il ZFTY da' un responso incerto" e "Procedi col sistema unito (Lio + qimen)".
  CABLATO (trading 0ae1357): Q.unito(c, trend) = ZFTY; se tace, DsHs (campo "da"). Misura: 52,3% · 51,7% · vivo 63,2% (68 carte su 74).
  "Incerto" = "tace": CONFERMATO da Edu il 24/11 ("Si, tace").
- REGOLA DI EDU (24/11): ogni volta che si chiede una ripartenza (frase da incollare per aprire la chat nuova), la PRIMA PAROLA
  e' "Trading" (es. "Trading - leggi ripartenza S76"), cosi' riconosce il titolo della chat fra i vari progetti.
- REGISTRO IN AVANTI (storico-trading fb1f01d): qmdj_registro.js + raccolta_notturna.js scrivono ogni notte qmdj_live.json:
  per ogni trade di Lio il verdetto del sistema unito (accordo | contro | muto), con l'impronta delle regole, PRIMA dell'entrata;
  una data gia' scritta non si riscrive. In storico-trading ora ci sono le copie di qmdj.js e qmdj-water-scanner.js: quando
  qmdj.js cambia nel repo trading va ricopiato qui. La riga del 24/11 e' stata scritta a mano alle 10:17 GMT (prima dell'esito).
  NON ancora visto girare sul runner di GitHub: controllare la raccolta della notte del 25/11.
- LIO E SISTEMA UNITO. Storico (4.801 trade): QMDJ d'accordo 70,7% · 66,9% (+27.900 e +20.941 pip); contro 63,7% · 62,6%
  (+17.605 e +13.646); muto 69,1% · 63,8%. Forti: d'accordo 84,5% · 74,8%, contro 72,9% · 70,0%. Saltare i trade "contro"
  nello storico PERDE pip. Vivo: contro 12 su 25, d'accordo 20 su 27 (ma molte di quelle carte sono state lette e corrette).
  DECISO DA EDU IL 24/11 ("D'accordo con la tua proposta"): lotto 0,02 solo sui trade FORTI col QMDJ unito d'accordo; 0,01 su tutto
  il resto (contro, muto, medie, deboli). Fatto senza toccare EA ne' Worker: raccolta_notturna.js scrive in segnali.json il campo
  forza = "forte" solo in quel caso, altrimenti "forte-lotto-minimo" (l'EA da' 0,02 solo se forza e' esattamente "forte");
  campi nuovi forza_lio (forza vera) e qmdj (accordo | contro | muto | manca). Se il verdetto manca: lotto minimo.
  Vale dalla raccolta della notte del 25/11. NON visto girare sul runner: controllare segnali.json e qmdj_live.json la mattina del 25/11
  e, al primo forte, il lotto nell'esito dell'EA.
- Discussione del 24/11: Edu tiene fermo che le regole non valicano la dottrina; io che una carta su cui si accende una regola
  non conta come prova. Accordo: contano i casi nuovi, letti prima dell'esito (da qui il registro in avanti).
- Pagina delle carte: tabella delle ore resa leggibile su telefono (blocchi; tolta la colonna "Muove").
- Contatore del patto: 8 (USDCAD 23/11). Da presentare: AUDUSD 23/11, USDCHF 23/11, poi AUDUSD 29/10, AUDUSD 28/10, EURJPY 06/11.
- CARTA 9, AUDUSD 23/11/2026 (presentata il 24/11, IN ATTESA DELLA LETTURA DI EDU). Seme 66, ora Gui Si, yin 8; trend SHORT,
  sceso 11 pip (EA -25,1); Lio LONG media sbagliato. ZFTY tace (ZF in Zhen controlla TY in Kun, ma "l'Output del controllato non e'
  timely: fermo"); unito -> DsHs: HS in Kun controlla DS in Kan, di base "segue", ribaltato dalla regola di View ("View nel palazzo
  del Tai Sui", col ramo; con lo stelo scatta "View vuota e fuori stagione"): "non segue", sbagliato. Senza la regola di View: giusto.
  DS Xin in Kan (dal centro), HS Gui in Kun col TY (porta Death), ZF in Zhen (Geng sopra Gui), ZS in Qian a casa, View in Li con Wu,
  Tai Sui Bing in Xun (vuoto del giorno). Vuoti: giorno Chen Si, ora Wu Wei. Ore: Jia Wu 21 con, Yi Wei 20 contro, Bing Shen 21 con.
  Domanda fatta: "lo ZF controlla il TY: basta per dire segue anche se l'Output di Kun non e' timely? E View in Li, vuota e fuori
  stagione, puo' dire qualcosa sul verso?". Contatore del patto: 9. Prossima: USDCHF 23/11 (decima: controllo del patto).
  LETTURA DI EDU (24/11): "Il TY ha un clash interno. Il DS Xin molto timely clasha il debole View che farebbe da ponte. Lo stelo
  del mese Ji clasha il TY. Non credo che date queste condizioni il TY abbia una probabilita' di vincere." E: "A volte a decidere
  chi vince non e' un solo fattore, ma una combinazione di piu' fattori in cui ognuno contribuisce per una piccola parte ma sommate
  fanno la differenza." Sulla carta: in Kun Gui sopra Ding; DS in Kan di fronte a View in Li (Xin clasha Yi sotto View); Ji in Gen
  di fronte a Kun. TY perde = segue. NON ANCORA CABLATO: chiesto a Edu come contare i fattori (vedi chat del 24/11).
- Sul DsHs di USDCAD 23/11 (Fan Yin: "non segue", sbagliato): non piu' urgente, col sistema unito il DsHs li' non parla.
