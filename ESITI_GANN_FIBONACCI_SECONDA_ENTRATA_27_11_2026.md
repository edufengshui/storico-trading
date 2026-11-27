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
