# ESITI 27/11/2026 — qimen quando Lio è fermo, Gann, Fibonacci, seconda entrata sul ritracciamento

Chat del 27/11/2026 (aperta con "Trading - leggi ripartenza S78"). La seconda entrata è CABLATA e caricata (vedi punto 5 e
RIPARTENZA_27_11_2026_S79.md); il resto è solo misura. Script: gann_fibo/*.py, qmdj_lavoro/qimen_lio_fermo.js,
qmdj_lavoro/trend_consumato.js, misura_vivo_fermi.js. Periodi: 2020-23 · 2024-26 (storico fino al 16/10/2026).

## 1. 27/11: nessun trade, controllato
Lio fermo su tutti e nove: sette cross per "clash giorno/mese: la carta non scioglie" (giorno Yi Si nel mese Hai), USDJPY ed EURGBP
per EMA non consolidata. Rifatto il calcolo col feed ricostruito: stesso risultato. Già successo l'8, 9, 21/10 e il 2/11.

## 2. Edu: "Quando Lio è fermo dovrebbe agire il qimen per il quale il clash non è importante"
Misura (qimen = bilancia, da solo, sulle carte ferme di Lio; pip prima dello spread):
- clash giorno/mese: qimen giusto 52,8% (231, +724 pip) · 54,7% (234, +537); il mercato segue il trend 52,5% · 53,1%;
  scarto 1: 49,0% · 59,0%; scarto 2: 62,1% · 53,1%; scarto 3+: 49,3% · 47,2%.
- pareggio non sciolto: 51,0% (394) · 51,7% (302).
Il clash non disturba il qimen (va come gli altri giorni), ma resta intorno al 50%: NON mandato all'EA. Proposto: scrivere il
verdetto del qimen nel registro in avanti anche quando Lio è fermo. In attesa di Edu.
Verdetti del qimen del 27/11 (Edu li ha tradati A MANO verso le 07 GMT): EURUSD SHORT (segue, 5 a 2), GBPUSD LONG (2 a 1),
USDCHF LONG (2 a 1); AUDUSD, USDCAD, NZDUSD, EURJPY fermi. ESITO DA GUARDARE (chiusura 21:00 GMT).

## 3. Gann (un amico trader di Edu lo usa)
Circa 40 regole sul verso della giornata (00:00 -> 21:00): metà del campo, ottavi, angoli 2x1/1x1/1x2, cicli di tempo, quadrato
del 9, swing, ritracciamenti, combinazioni col trend EMA: tutte fra 47% e 52%. Ancorato all'inizio del nostro trend (idea di Edu):
uguale. Unica cosa che tiene: TREND CONSUMATO (oltre 360° sul quadrato del 9 dal giorno del giro dell'EMA, o trend di 22+ giorni):
il mercato segue 48,1% (636) · 43,8% (347). Su Lio contro il trend 70,4% · 68,8% (altri giorni 66,2% · 64,5%); qimen "non segue"
a trend consumato 54,8% (259) · 60,1% (148). Nella bilancia come 1 punto: 52,0% -> 52,1% · 52,1% -> 52,6%. Edu: "Non sono convinto".

## 4. Fibonacci (entrata sul livello durante il giorno, nel verso del trend; gamba dall'inizio del trend)
Livelli di Fibonacci 47,9% · 46,9%, circa -1 pip netto; livelli qualunque 47,8% · 47,5%: UGUALI. Stop e obiettivo, età del trend,
giorni di Fibonacci: niente. ATTENZIONE AL METODO: coi soli prezzi orari l'entrata "sul livello" conta solo i tocchi finiti oltre e
dà un falso -9 pip; si entra al prezzo orario in cui il livello risulta raggiunto.

## 5. SECONDA ENTRATA sul ritracciamento nei trade di Lio (l'unica cosa buona di oggi)
Se durante il giorno il prezzo va CONTRO Lio di X volte il campo medio giornaliero (20 giorni), seconda entrata al prezzo orario,
uscita 21:00, 1,5 pip di spread:
- X 0,2: 68,3% (1.399), +18,6 pip a trade · 61,3% (1.267), +11,9. X 0,3: 66,4% · 60,6%. X 0,5: 61,9% · 55,3%. X 1,0: 54,7% · 54,2%.
- Prima entrata di Lio: 66,4%, +19,7 · 63,0%, +15,3. Cioè dopo il ritracciamento la previsione di Lio vale quanto all'apertura.
- Per forza (X 0,2): forte 80,7%, +32,8 · 66,4%, +18,2; media 65,7% · 59,7%; debole 55,2% · 56,1% (+4: non vale).
- Per ora (X 0,2): raggiunto entro le 07 GMT 68,4%, +22,3 · 62,5%, +16,5; dopo le 16 GMT +6 · +2.
- Col trend o contro il trend: uguale. EURGBP, GBPUSD, NZDUSD deboli nel 2024-26.
- Totale pip: sola 00:00 48.743 · 35.256; 00:00 + seconda a 0,2: 74.774 · 50.293. UNO STOP COSTA SEMPRE: stop a 0,5 del campo
  37.624 · 29.320.
- DAL VIVO (23/10-26/11, 68 trade di Lio, +410 pip): seconda entrata a 0,2: 46 trade, 33 vinti, +346 pip; entro le 07 GMT 22 trade,
  19 vinti, +278. Forti: prima entrata 19 su 33, +29 pip; seconda entrata 19 su 25, +185.
LIMITI: è esposizione doppia nei giorni in cui Lio sbaglia; lo storico di Lio è più alto del vivo (voci per forma); pochi casi dal vivo.

REGOLA ESATTA CABLATA (Edu: "Procedi"): solo Lio forte e medio, controllo a ogni ora piena dalle 02 alle 07 GMT, X 0,2, lotto 0,01.
Misura della regola esatta (gann_fibo/lio_seconda_ea.py): seconda entrata 73,1% (572), +28,2 pip · 63,8% (538), +19,5;
prima entrata degli stessi forti e medi 71,7%, +25,3 · 64,9%, +17,7; totale pip 47.570 -> 63.727 · 31.273 -> 41.772.
Con X 0,15: 74,2% · 62,9%; 0,25: 73,9% · 63,1%; 0,30: 72,8% · 63,8% (la soglia conta poco).
Dal vivo (forti e medi, 53 trade, 30 vinti, +327 pip): seconda entrata 14 trade, 13 vinti, +216 pip.
Il campo medio oggi: EURUSD 57 pip, USDCHF 51, USDCAD 59, USDJPY 67, EURGBP 19 (0,2 = 11, 10, 12, 13, 4 pip).

## 6. Fibonacci dall'apertura delle 00:00 e sulle svolte dello zig-zag (chiesti da Edu dopo la seconda entrata)
- Dall'apertura delle 00:00 (gann_fibo/fibo_apertura.py; seconda entrata, forti e medi, ore 02-07, distanza in frazione del campo
  medio): 0,236 73,8% · 63,9% (+31 · +20 pip); 0,20 73,1% · 63,8%; 0,30 72,8% · 63,8%; 0,382 73,2% · 60,5%; 0,45 68,8% · 62,3%;
  0,618 63,5% · 64,6% (+40 · +32, 63 e 65 casi); 0,70 62,5% · 60,5%. Curva regolare, nessun salto sui numeri di Fibonacci. Col campo
  del giorno prima al posto della media: uguale. Più vicino il livello, più casi con la stessa percentuale (0,10: 913 · 823 trade,
  73,8% · 64,3%): LA SECONDA ENTRATA RENDE QUANTO LA PRIMA (28 contro 25 pip · 20 contro 18), è soprattutto più esposizione su Lio.
- Svolte dello zig-zag (gann_fibo/fibo_zigzag.py; Edu: "Di solito il Fibonacci parte da un importante reverse del trend"): svolta =
  ritorno di 0,5 / 1 / 1,5 / 3 campi medi; gamba fra le ultime due svolte; entrata nel verso della gamba al livello, prezzo orario.
  Uscita alle 21:00: Fibonacci 49,0% · 48,6% (svolta 0,5), 49,1% · 48,4% (1), 51,2% · 49,2% (1,5), 51,9% · 48,8% (3);
  rapporti qualunque 48,8% · 48,0%, 49,5% · 47,3%, 50,0% · 48,3%, 50,8% · 52,7%. UGUALI, intorno al 50%.
  Con obiettivo (ritorno alla svolta) e stop, svolta di 3 campi: Fibonacci +5,0 · +2,9 pip a trade (594 · 441), qualunque +4,5 · +1,0:
  un piccolo effetto di ripresa dopo le svolte grandi, non legato ai numeri di Fibonacci.
  Con Lio nello stesso verso della gamba (svolta 1,5): 68,5% (203) · 65,1% (169); Lio nel verso opposto 43,3% · 46,4%: è Lio, non il livello.
CONCLUSIONE: Fibonacci non aggiunge niente, comunque lo si agganci. Strada chiusa salvo regole precise di un trader.

## 7. Fibonacci agganciato ai JieQi (Edu: "Se lo agganciano ai JieQi?") — gann_fibo/fibo_jieqi.py
Ancora = prezzo orario all'istante del JieQi (GMT). Due serie: i 24 termini e i soli 12 Jie.
- Gamba dal JieQi al prezzo più lontano raggiunto, entrata sul ritracciamento nel verso della gamba, uscita 21:00:
  24 termini Fibonacci 47,9% · 47,1% (-2,3 pip), qualunque 47,8% · 47,7%; 12 Jie Fibonacci 48,6% · 47,5%, qualunque 48,4% · 47,4%. UGUALI.
  Con Lio nello stesso verso 61,0% · 60,9%; nel verso opposto 39,4% · 40,9%: decide Lio.
- Livelli dal prezzo del JieQi misurati col campo del termine precedente (A ± r × campo), attraversamento: prosegue 47-51% sia coi
  rapporti di Fibonacci sia coi qualunque.
- Giorno del JieQi: il mercato segue il trend EMA 46,9% · 46,7% nel giorno del Jie (414 · 306), 46,1% · 51,2% nel giorno del Qi;
  Lio nel giorno del Jie 70,1% (154) · 68,3% (101), negli altri giorni 66,5% · 64,3%. Giorni di Fibonacci dal Jie (5, 8, 13, 21): 50,8% · 51,1%.
CONCLUSIONE: nemmeno agganciato ai JieQi. Unico spunto, debole: nel giorno del Jie il mercato segue il trend un po' meno (47%).

## 8. Un numero ricorrente in ore dentro il trend? (Edu: "a distanze di 17 o 27 ore c'è un ritracciamento?") — gann_fibo/ritmo_ore.py
Barre orarie, movimento nel verso del trend EMA12 diviso per il campo medio. NESSUN RITMO che tenga nei due periodi.
- Ora del giorno (GMT): nessuna ora va contro (o col) trend in tutti e due i periodi.
- Ore dall'inizio del trend (1-312): 2 ore "significative" nei due periodi (la 7ª col trend, la 199ª contro) su 312 guardate: caso.
  Ora 17: -2,0 · -2,3 millesimi di campo (t -0,5); ora 27: -5,2 · -1,2 (t -1,4 · -0,3): niente.
- Autocorrelazione a 1-120 ore: nessuna distanza sopra la soglia nei due periodi (17 ore: -2,3 · +1,4; 27 ore: +1,7 · -2,9 millesimi).
- Distanza fra l'inizio di un ritracciamento (ritorno di 0,3 campi) e il successivo: mediana 25 ore in tutti e due i periodi
  (2.696 · 2.104 ritracciamenti), ma distribuzione larga, senza picchi: 17 ore 2,4% · 1,9%, 27 ore 2,1% · 1,2%, come le vicine.

## 9. Le ore cinesi dentro il trend (Edu: "Sì, pensavo alle ore cinesi") — gann_fibo/ritmo_ore_cinesi.py
Pilastro dell'ora in GMT (Zi = 23-01). Movimento dell'ora nel verso del trend EMA12, millesimi di campo medio; ampiezza rispetto
alla media di quell'ora dell'orologio. Relazioni SINGOLE, una per volta (limite: Edu vuole le indicazioni lette insieme).
- Ramo dell'ora: solo Zi (23-01 GMT) va col trend nei due periodi (+4,3 · +3,4 millesimi, t +3,8 · +2,5): circa un quarto di pip, inutile.
- Ramo dell'ora col ramo del giorno (clash, liu he, san he, penalità, danno, stesso): niente (clash +1,9 · +0,2).
- Ramo dell'ora nel vuoto del giorno: -0,3 · -4,0 (solo il secondo periodo). Col ramo del mese: clash -0,9 · -3,4; niente che tenga.
- Stelo dell'ora con lo stelo del giorno: niente che tenga nei due periodi (ora genera il giorno -1,6 · -4,5; giorno genera l'ora -2,3 · +3,4).
- Ramo dell'ora col ramo del seme del cross: niente (tutto fra -1 e +1).
- Ampiezza: nessuna relazione muove il prezzo più del normale (tutte fra 0,95 e 1,06).
Le ore dello schema del Commander (qimen) erano già state misurate il 28/10/2026 (S63): in media come le ore normali; tiene solo
"fu yin + ramo opposto" (36-38% col trend). Strada ancora aperta: le carte con lo schema completo, lette una per una con Edu.

## 10. L'ora del qimen per scegliere QUANDO fare la seconda entrata (Edu 27/11: "Ore qimen") — qmdj_lavoro/ore_seconda.js
Trade di Lio forti e medi (1.877 · 1.779). Seconda entrata all'apertura della prima ora dello schema del Commander (qmdj_ore.js), nel verso di
Lio, uscita 21:00, 1,5 pip di spread. Confronto: l'attesa della stessa ora dell'orologio su tutti i trade (entrare piu' tardi rende meno:
ore 02 +23,5 · +16,1; ore 07 +20,7 · +12,9; ore 12 +12,6 · +8,3).
- Schema completo (stelo dell'ora col Commander, ramo opposto/identico/che genera, carta normale, mese non opposto), ore 02-07:
  70,2% (904), +20,9 pip · 63,1% (884), +15,5; attesa di quelle ore +22,1 · +14,6. UGUALE a un'ora qualunque.
- Con lo stelo del giorno positivo: +20,4 · +16,5 (attesa +22,2 · +14,6). Ramo opposto: +20,9 · +15,3. Ramo identico: +20,8 · +17,6.
  Ora propria del Commander: +20,9 · +11,9. Schema largo 02-16: +22,0 · +14,0. Niente si stacca nei due periodi.
- Ritracciamento raggiunto (regola cablata) e poi un'ora dello schema: entrare SUBITO +24,4 · +21,9; ASPETTARE l'ora +23,1 · +19,3. Aspettare costa.
- Ritracciamento raggiunto dentro un'ora dello schema completo: 67,8% (146), +26,4 · 57,1% (154), +15,0; fuori: 75,2%, +28,5 · 66,8%, +20,5.
- Movimento dentro l'ora (due barre) nel verso di Lio, millesimi di campo: schema completo +28 · +27; ore normali +38 · +29. L'ora non spinge verso Lio.
- Diviso per il verdetto del qimen (bilancia): qimen con Lio, ora dello schema +23,9 · +15,8 (attesa +24,4 · +15,2); contro Lio +16,8 · +12,8
  (attesa +19,0 · +12,3); fermo +19,0 · +17,4 (attesa +20,5 · +15,4). Uguale.
- Cio' che conta resta il PREZZO: all'ora dello schema col prezzo contro Lio di 0,2 o piu' +28,5 · +16,9; gia' a favore di Lio +16,3 · +10,4.
CONCLUSIONE: lo schema dell'ora del Commander, cosi' com'e' nel codice, non dice quando fare la seconda entrata. Resta la regola del
ritracciamento. LIMITE: lo schema nel codice e' largo (un'ora dello schema c'e' quasi ogni giorno); le regole OAP lette da Edu sulle carte
(S66, OAP_S69.md: stelo e ramo dell'ora nel palazzo che decide) non sono nel codice e non sono misurate qui.

## 11. Le ore OAP (l'ora che accende il palazzo che decide) per la seconda entrata (Edu 27/11: "Ok") — ore_seconda.js, voci 8 e 9
Palazzo che decide = palDecide di lettura() (ZFTY, se tace DsHs): la bilancia NON indica un palazzo. Stessi trade forti e medi, seconda entrata
all'apertura della prima ora OAP (03-15 GMT) nel verso di Lio, uscita 21:00. Tre forme dalle regole lette da Edu (S66):
- V1 stelo e ramo dell'ora nel palazzo che decide (ramo anche nascosto nel 六仪): 65,2% (859), +15,5 · 60,8% (842), +11,9;
  attesa della stessa ora dell'orologio +16,8 · +11,1. UGUALE.
- V2 ramo nel palazzo, stelo dentro o in un palazzo che lo genera: +15,6 · +12,1 (attesa +17,1 · +11,2). V3 stelo nel palazzo e ramo che
  clasha il palazzo: +16,9 · +11,3 (attesa +17,7 · +12,0). UGUALI.
- Carta d'accordo con Lio: V1 +17,8 · +14,0, V2 +18,2 · +14,9 (attesa +17 · +11); carta contro Lio +12,9 · +9,6 e +12,8 · +9,4. La differenza
  e' quella gia' nota fra qimen con Lio e qimen contro (vale gia' dalle 00:00), non viene dall'ora.
- Ritracciamento gia' raggiunto e poi un'ora OAP: entrare SUBITO +28,4 · +21,2 (V1); ASPETTARE l'ora +17,9 · +13,5. Aspettare costa 8-10 pip.
- Ampiezza dell'ora OAP (qualunque verso): 187 · 191 millesimi di campo; tutte le ore 191 · 182. Non si muove di piu'.
CONCLUSIONE: nemmeno le ore OAP, cosi' come si possono scrivere oggi, scelgono il momento della seconda entrata. Conferma le misure di S65-S68
(entrare all'ora invece che a mezzanotte: pari o peggio). Resta la regola del ritracciamento sul prezzo.

## 12. Carte per le ORE, una alla volta (Edu 27/11: "fammi vedere una alla volta delle carte qimen di giorni con significativi movimenti del cross a ore specifiche")
CARTA ORE 1 — USDCAD 10/11/2026 (seme 141, Geng Shen, yin 9; trend LONG, salito 70: SEGUE; Lio LONG debole giusto; bilancia 2 a 2 ferma; ZFTY cascata
"non segue" sbagliata). ZF in Dui (Gui sopra Geng), TY in Gen (Geng sopra Ji), DS Wu in Qian con View, HS Geng in Gen. Vuoti del giorno Wu Wei, dell'ora Zi Chou.
Ore: fermo fino alle 13 GMT; Ji Wei 13-15 32 pip con il trend; Geng Shen 15-17 34 con; Xin You 17-19 12 contro.
Lettura di Claude (catena Li -> Gen -> Dui accesa dalle due ore): NON e' quella di Edu.
LETTURA DI EDU: "Qui e' abbastanza chiaro: TY genera ZF e l'ora Ji Wei e Geng Shen autoclashano il TY."
  (Gen ha i rami Chou e Yin: Ji sta in Gen nella terra e Wei clasha Chou; Geng sta in Gen nel cielo e Shen clasha Yin.)
CABLATO in trading/qmdj_ore.js (solo indicazione, non decide): campi autoTY, autoTYgenera, autoTYMotivo nelle ore di ore(): stelo dell'ora nel
palazzo del TY (cielo o terra) e ramo dell'ora che clasha un ramo di quel palazzo. Sulla carta scatta proprio su Ji Wei e Geng Shen.
MISURA (qmdj_lavoro/ty_autoclash.js, tutte le carte con trend, ore 01-19 GMT, 2020-23 · 2024-26; movimento dell'ora nel verso del trend in
millesimi di campo medio): TY genera ZF, tutte le ore 49,7%, +0,4 · 50,6%, +7,0. Con autoclash del TY: 51,8% (141 ore), -3,7 · 50,7% (136), +17,0;
ampiezza 0,94 · 1,01; ora piu' forte del giorno 13,5% · 11,8% (caso 11%). Stelo dell'ora nella terra del TY: 54,8% (84), +14 · 51,7% (87), +30;
nel cielo 47,4% (57) · 49,0% (49). Autoclash dello ZF col TY che genera lo ZF: 58,7% (150), +16 · 55,6% (169), +23.
Giorni col TY che genera lo ZF e DUE ore di autoclash del TY (come questa carta): 11 · 11 giorni soltanto.
Da sola l'indicazione non separa e i casi sono pochi: va raccolta con le altre, carta per carta. Pagina "Carte OAP": carta in cima.

CARTA ORE 2 — EURJPY 24/09/2026 (seme 180, Ji Hai, yin 1; trend LONG, salito 54: SEGUE; Lio LONG media giusto; bilancia LONG 5 a 1 giusta).
ZF in Li (Xin sopra Ji), TY in Zhen (Ji sopra Bing), DS Xin in Li con lo ZF (e nella terra di Dui), HS Ji in Zhen col TY. Vuoti Chen Si. Mese You in Dui,
di fronte al TY. Ore: Wu Zi 00-01 27 contro; Xin Mao 05-07 66 pip con il trend (tutta la giornata); Jia Wu 11-13 (ora propria del Commander) 6 contro;
Yi Wei 13-15 25 con. Lettura di Claude, DA VALIDARE: TY genera ZF; Xin Mao clasha il TY al rovescio (ramo Mao nel palazzo del TY, stelo Xin nel palazzo
opposto Dui e con lo ZF). DOMANDA A EDU, IN ATTESA: e' anche questo un autoclash del TY o conta che Xin e' il DS e sta con lo ZF?
Portata in pagina "Carte OAP" in cima. Strumento nuovo: qmdj_lavoro/carta_dump.js CROSS data (dati della carta per i giorni prima del registro).
Prossime candidate (un'ora sola, mai lette, da /tmp/cand.js rifacibile): USDJPY 11/09 (Wu Wu 46 con), EURUSD 01/10 (Geng Shen 46 con), EURJPY 14/10
(Jia Wu 47 con), USDCAD 14/10 (Jia Wu 52 con), EURJPY 02/10 (Xin Wei 78 contro), EURUSD 15/10 (Xin Chou 46 contro), AUDUSD 16/09 (Xin You 40 con, giorno fermo).
RISPOSTA DI EDU sulla carta ore 2: "Anche EURJPY 24/09/2026 ha un autoclash nell'ora Xin Mao." -> l'autoclash del TY vale nei DUE MODI:
a) stelo dell'ora nel palazzo del TY e ramo dell'ora che clasha il palazzo (USDCAD 10/11: Ji Wei, Geng Shen);
b) ramo dell'ora nel palazzo del TY e stelo dell'ora nel palazzo di fronte (EURJPY 24/09: Mao in Zhen, Xin nella terra di Dui).
CABLATO in trading/qmdj_ore.js: autoTY nei due modi, campo autoTYlato 'stelo' | 'ramo'. Solo indicazione.
MISURA dei due modi insieme (ty_autoclash.js, voci 8 e 9): TY genera ZF, ore di autoclash: con il trend 49,2% (307), -16,5 · 50,0% (314), +17,2;
ampiezza 1,01 · 0,92; ora piu' forte del giorno 12,7% · 10,5% (caso 11%). Solo al rovescio: 47,0% (166) · 49,4% (178). Su tutte le carte 46,2% · 51,0%.
Nei giorni che hanno seguito l'ora va con il trend 64% · 62%, in quelli che non hanno seguito 34% · 36%: l'ora va dove va la giornata, come ogni ora.
Scritta cosi' larga NON separa e non muove di piu': manca cio' che la restringe (un'ora di autoclash del TY c'e' in circa un giorno su tre).
PROSSIMO PASSO PROPOSTO: una carta col TY che genera lo ZF e l'autoclash del TY dove nell'ora NON succede niente, per trovare cosa lo spegne.

RIMPROVERO DI EDU (27/11): "Uffa continui a dire che non fa nulla e intanto i primi due casi che mi hai fatto vedere invece fa." -> NON ripetere
che la regola "non separa" (gia' detto in S64). NON proporre carte dove non succede niente: Edu vuole le carte coi movimenti grandi.
La misura giusta parte DAI MOVIMENTI: quante delle ore grandi sono spiegate dalle regole raccolte (qmdj_lavoro/ora_grande.js).
Oggi: giorni con un'ora che domina (>= 40 pip e >= 2,2 volte la terza), TY genera ZF: l'ora grande e' un autoclash del TY in 8 giorni su 72
(2020-23) e 6 su 44 (2024-26); il caso darebbe 9% e 11%. Le altre ore grandi aspettano le loro regole: si raccolgono carta per carta e si riconta.

CARTA ORE 3 — EURUSD 01/10/2026 (seme 113, Bing Chen, yin 4; trend SHORT, sceso 85: SEGUE; Lio SHORT forte giusto; bilancia SHORT 3 a 1 giusta).
ZF in Qian (Gui sopra Bing, Birth, ZS), TY in Kun (Bing sopra Geng e Yi, Open): TY genera ZF. DS Wu in Gen, HS Bing in Kun col TY (e terra di Qian).
Vuoti del giorno Yin Mao, dell'ora Zi Chou. Ore: Bing Chen 07-09 27 con; Ji Wei 13-15 20 con; Geng Shen 15-17 46 con; Xin You 17-19 17 contro.
Lettura di Claude, DA VALIDARE: Geng Shen = stelo (terra di Kun) e ramo (Shen di Kun) tutti e due nel palazzo del TY (configurazione identica, non
clash); Bing Chen = autoclash dello ZF (Bing nella terra di Qian, Chen clasha Xu); Ji Wei non spiegata. DOMANDA A EDU IN ATTESA. In pagina in cima.
LETTURA DI EDU della carta ore 3 (EURUSD 01/10/2026): "Bing Chen e' di nuovo un autoclash mentre Geng Shen e' invece completo in TY che genera ZF."
CABLATO in trading/qmdj_ore.js (indicazioni, non decidono): autoZF (autoclash sul palazzo dello ZF, due modi, campo autoZFlato), completoTY
(stelo dell'ora, cielo o terra, e ramo dell'ora nel palazzo del TY; completoTYgenera se il TY genera lo ZF), completoZF (la "identica" del 28/10,
qui anche con lo stelo nella terra: estensione di Claude). Sulle tre carte di oggi segnano le ore grandi: USDCAD 10/11 Ji Wei e Geng Shen (autoclash
TY), EURJPY 24/09 Xin Mao (autoclash TY al rovescio), EURUSD 01/10 Bing Chen (autoclash ZF) e Geng Shen (completa nel TY).
CONTO DALLE ORE GRANDI (ora_grande.js; ora >= 40 pip e >= 2,2 volte la terza; TY genera ZF): l'ora grande e' una delle tre forme dettate in 15
giorni su 72 (20,8%, il caso 17,0%) · 12 su 44 (27,3%, il caso 20,7%). Su tutte le carte 14,8% (caso 14,4%) · 14,3% (15,9%).
Conferma senza portarla a Edu: USDJPY 11/09/2026 (TY genera ZF, trend SHORT, 92 con): l'ora grande Wu Wu 11-13, 46 pip con il trend, e' un autoclash
dello ZF al rovescio (Wu ramo di Li dove sta lo ZF, stelo Wu nel cielo di Kan di fronte).
Ore grandi del 2026 mai lette e NON segnate dalle forme di oggi (da agosto): EURJPY 22/09 (Wu Chen 65 contro), USDJPY 22/09 (Wu Chen 50 contro),
USDCAD 07/10 (Geng Wu 42 con), USDJPY 14/10 (Ding You 59 contro), EURJPY 02/10 (Xin Wei 78 contro), EURUSD 15/10 (Xin Chou 46 contro),
EURJPY 14/10 e USDCAD 14/10 (Jia Wu, ora del Commander).

CARTA ORE 4 — USDCAD 07/10/2026 (seme 142, Gui You, yin 1; trend LONG, salito 44: SEGUE; Lio LONG forte giusto; bilancia LONG 1 a 0 giusta).
ZF in Kun (Wu sopra Yi e Gui, Death), TY in Zhen (Yi e Gui sopra Bing, Injury): il TY CONTROLLA lo ZF. Giorno Jia Yin (Jia sotto Gui = stelo dell'ora),
Gui in Zhen e nella terra di Kun. Vuoti del giorno Zi Chou, dell'ora Xu Hai. Ore: fermo fino alle 11; Geng Wu 11-13 42 pip con il trend; Xin Wei
13-15 21 contro. L'ora grande NON e' autoclash ne' completa. Lettura di Claude, DA VALIDARE: Geng (cielo di Dui, palazzo del mese, di fronte al TY)
controlla il TY; Wu (Li, View) genera lo ZF. DOMANDA A EDU IN ATTESA: "Geng Wu come la leggi?". In pagina in cima.
