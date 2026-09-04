# REGISTRO LIU YAO — 11/08/2026

Stato: **linea di ricerca APERTA**. Continueremo ad affinare il Liu Yao e poi tenteremo
l'abbinamento PB + LY per tirare fuori il meglio dei due sistemi.

## Infrastruttura costruita (in pb_stress.js, riutilizzabile)

- **Palazzi di Jing Fang**: mappa completa dei 64 esagrammi → palazzo, generazione,
  posizioni Shi (世) e Ying (應). Sequenza canonica: puro s6, 1ª–5ª gen s1–s5, 游魂 s4,
  歸魂 s3. Verificata su Jin 晉 = 游魂 di Qian, Shi 4ª linea (screenshot software Edu).
- **Na Jia**: rami sulle sei linee, tabelle interno/esterno per gli 8 trigrammi.
  Verificate: Kun interno 未巳卯, Li esterno 酉未巳, Kan interno 寅辰午.
- **Parenti**: Brother = ramo dello Shi dello stesso elemento del palazzo.
- Attivazione: `LIUTAG=1` (calcola senza toccare i verdetti), `LIUREP=1` (referto),
  `LFROM`/`LTO` (spacco periodi), `LIUYAO=v1..v4` (verdetto autonomo, scartato).

## Dottrina della linea mobile (Edu, 11/08/2026) — implementata

Elemento efficace della mutante rispetto a Shi:
1. L'arrivo GENERA la partenza (回頭生) → agisce la **partenza rafforzata**
2. La partenza GENERA l'arrivo → agisce **l'arrivo**
3. L'arrivo CONTROLLA la partenza (回頭剋) → linea spezzata, **effetto nullo**
4. La partenza CONTROLLA l'arrivo → agisce **l'arrivo** (come il 2)
5. Stesso elemento → come il 1 (partenza rafforzata) [da confermare con Edu]

Vuoti: la linea che si muove **non è mai vuota** (動不為空); se **l'arrivo è vuoto**
il movimento è **nullo**.

Sospensione dal giorno: se il ramo del giorno COMBINA (六合) o CLASHA (六冲) con
partenza o arrivo → la linea **non produce risultato ora** (lo produrrà quando il
legame si scioglie — fuori dall'orizzonte giornaliero).

Combinazione/clash dell'arrivo con Shi/Ying:
- arrivo COMBINA Shi o Ying → quello riceve la partenza e **"diventa" quella linea**
  (assume l'elemento della partenza)
- arrivo CLASHA Shi o Ying → quello è **invalidato**

Forza delle linee: stagione del mese (旺相休囚死) **+ il ramo del giorno resta forte
e influenza anch'esso** — linea forte se 旺/相 nel mese O sostenuta dal giorno
(stesso elemento o generata dal ramo del giorno).

## Risultato principale — CANDIDATO VIVO

**"Brother sostenuto = veto sui LONG"**: Shi di tipo Brother, valido (non clashato
dall'arrivo), con Ying valido e FORTE che lo genera, con trend EMA in salita → il
LONG fallisce.

| periodo | cella larga | + mutante favorevole |
|---|---|---|
| totale | 135 carte, Long vince 41,5% (z −1,98) | 31 carte, 35,5% |
| recente (05/2023→) | 85 carte, **38,8%** (z −2,06) | 18 carte, 44,4% |
| vecchio (→04/2023) | 50 carte, 46,0% | 13 carte, **23,1%** (z −1,94) |

Quattro celle su quattro sotto il 50% nei due periodi: direzione stabile.
Dose-risposta presente (più sostegno → peggio per il Long). Dottrina dichiarata da
Edu PRIMA di ogni misura ("il Brother è sfavorevole ai guadagni Long").
Il segnale è emerso SOLO con la dottrina completa (in particolare la forza dell'Ying
mese+giorno); le versioni semplificate davano rumore.

Uso futuro naturale: **veto/filtro sui segnali LONG del PB** (le perdite del PB si
concentrano su "segue" long) — da testare nell'abbinamento PB+LY.

## Scartati con i numeri (non riaprire senza dati nuovi)

- **Liu Yao autonomo a relazioni secche** (v1 Ying→Shi, v2 mutante→Shi, v3 misto,
  v4 concordanza): 48–50%, nessun segnale. La mappa dottrinale corretta (Ying genera
  Shi = conferma) misura 48,11%.
- **Lato "conferma dello SHORT"** (B + trend giù + sostegno): segni opposti nei due
  periodi (41,5% recente vs 56,2% vecchio) → rumore. Il 64% della cella raffinata era
  trascinato dal solo periodo vecchio (78,6% su 14 carte vs 50% su 14).
- **Atterraggio della mutante nel vuoto come regola PB** (3 forme): peggiora sempre
  il sistema PB (fino a −0,63 di z). Nota: nel Liu Yao la regola "arrivo vuoto =
  movimento nullo" resta parte della dottrina implementata.

## Numeri di riferimento del sistema PB (invariato, v38 in produzione)

z 3,79 · +16.407 pip · 4.111 trade · win 53,47% · recente 2,97 · vecchio 2,38
(con RISCATTO=b: z 3,86 · +17.221 — riscatto = regola da 4 casi, giudicherà il forward)
Comando canonico: `RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1
NAYINDEB=1 SKIPCLASH=gm RISCATTO=b node pb_stress.js`

## Prossimi passi concordati

1. **Affinare il Liu Yao**: pezzi dottrinali ancora mancanti — forza completa linea
   per linea (oltre l'Ying), tombe delle linee, spiriti nascosti (伏神), Sei Bestie,
   caso stesso-elemento della mutante (化進/化退?) da chiarire con Edu.
2. **Consolidare il veto anti-Long**: più carte via forward test; provare la
   definizione sul set PB (quante carte "segue+long" del PB cadono nel veto e con
   che esito).
3. **Abbinamento PB + LY**: quando il LY è affinato, testare l'integrazione per
   tirare fuori il meglio dei due (es. LY come veto direzionale sui segnali PB).

## Primo test di abbinamento PB + LY (11/08/2026, sera)

**Veto anti-Long sul PB: BOCCIATO.** Vetare i segnali LONG del PB nei giorni
Brother-sostenuto fa danno in tutte le gradazioni (up: −1.084 pip, z 3,86→3,70;
all: −1.915; mut: 7 carte, nulla). I 37 LONG vetati erano vincitori netti.

**Spiegazione — la scoperta vera:** nei giorni "Brother sostenuto + trend su"
(126 carte) i due sistemi vedono la stessa fragilita' del rialzo con dottrine diverse:
- il mercato scende il 57,9% di quei giorni (la cella anti-Long del LY era vera);
- il PB, da solo, in quei giorni sceglie NON SEGUE (SHORT) 89 volte su 126 e vince
  il **65,2%** (+1.424 pip);
- e nei 37 giorni in cui insiste sul LONG, vince comunque il **59,5%** (+1.084 pip).

Complessivo della cella: 126 carte, ~63,5% di vittorie, ~20 pip/carta — contro il
53,5% medio del sistema. Il PB dentro la cella distingue i giorni buoni dai cattivi
meglio del veto stesso.

**Verifica dei periodi (11/08/2026, sera) — la cella REGGE:**
- recente (05/2023→): 79 carte, PB vince 64,6% (+1.407 pip); SHORT 68,5%, LONG 56,0%
- vecchio (→04/2023): 47 carte, PB vince 61,7% (+1.101 pip); SHORT 60,0%, LONG 66,7%
Nessuna cella sotto il 56%. Prima volta nella ricerca che un segnale esterno al PB
supera l'esame dei due periodi al primo colpo. ~2,3 sigma sopra la media di sistema
su 126 carte: suggestivo e coerente, non ancora conclusivo (~50 test bruciati il
10-11/08). Il claim onesto: il LY aggiunge informazione che il PB non ha — certifica
il 3% di giorni in cui i verdetti PB valgono ~63% invece di 53%. Il LY non corregge
il PB, lo certifica.

**Lezioni per l'abbinamento:**
1. Il veto secco e' la forma sbagliata: il LY non deve sovrascrivere il PB dove il
   PB e' gia' forte.
2. La cella Brother-sostenuto e' un **amplificatore di confidenza**: i segnali PB
   emessi in quei giorni sono di prima scelta (~63,5% vs 53,5%). Direzioni future:
   sizing differenziato, o etichetta di qualita' sul segnale in PWA.
3. Da esplorare nelle prossime sessioni: altre celle LY come marcatori di confidenza
   (es. Wealth/Officer al Soggetto, Shi forte vs debole), sempre col PB al comando.

Attivazione nel motore: `LIUTAG=1 LYVETO=up|all|mut` (veto, bocciato),
`LYSPACCATO=1` (referto della cella con lo spacco dei verdetti PB).

## Nota di metodo

Siamo a ~40+ varianti testate nella sessione del 10–11/08. Il tetto del rumore per
|z| supera 3. Nessun risultato Liu Yao raggiunge da solo la significatività: il
candidato anti-Long vive sulla coerenza di direzione fra periodi e sulla dottrina
pre-dichiarata, non sulla forza statistica. Il forward test è il giudice.

---

# AGGIORNAMENTO — sessione Officer al Soggetto (11/08/2026, tarda serata)

## CANDIDATO REGISTRATO: "Officer attaccato dalla mutante"

**Cella:** Shi = Officer (官鬼: lo Shi controlla l'elemento del palazzo), Shi VALIDO
(non clashato dall'arrivo della mutante), e mutante SFAVOREVOLE: l'elemento efficace
della mutante (dottrina dei 4 casi) CONTROLLA lo Shi. Nessuna condizione sull'Ying,
nessuna condizione sul trend.

**Numeri (92 carte con verdetto, su 4.111):**
- PB complessivo nella cella: **60,9%** (+882 pip) — recente 60,0% (50) / vecchio 61,9% (42)
- **PB "NON SEGUE" nella cella: 65,0%** (60 carte, +709 pip) — recente 61,3% / vecchio 69,0%
- Segnali SHORT: 64,6% (48 carte), coerente nei due periodi
- Lato "SEGUE": il più debole (53,1%; vecchio sotto il 50%)
- Il mercato nella cella NON ha direzione propria (42 salite / 50 discese):
  la cella certifica il verdetto PB, non indirizza il prezzo — come il Brother.

**Lettura dottrinale:** il Soggetto-Officer (di natura conflittuale) sotto attacco
della linea mobile = giornata di pressione; in quei giorni il "non segue" del PB è
di prima scelta. Coerente col carattere del sistema (il profitto vive sul non segue).

**Peso statistico:** cella intera ~1,4 sigma sopra la media di sistema; il nucleo
NON SEGUE ~1,8 sigma su 60 carte. Stessa taglia del Brother (2,3 su 126): suggestivo
e coerente fra i periodi, NON conclusivo. Giudice: il forward test.

**Filo condiviso:** la mutante sfavorevole all'Officer amplifica il PB in TUTTI i
tagli provati — base larga (886→92: 60,9%), base intermedia Ying-genera (161→16: 75%,
entrambi i periodi sopra il 70%). Direzione stabile ovunque.

## Scartati con i numeri in questa sessione (Officer al Soggetto)

- **Cella "Officer sostenuto + trend su"** (speculare del Brother, 47 carte):
  ipotesi "G = rialzo" bocciata — mercato salito solo 48,9%, PB 53,2% (= media),
  e i due periodi si contraddicono (segue 70% recente vs 36% vecchio).
- **Ipotesi "G = il trend, qualunque sia"** (74 carte, entrambe le direzioni):
  segue l'EMA 41,9%; recente 54,8% vs vecchio 32,6% — segni opposti, rumore.
- **Ipotesi "G = ribasso (Officer drena la Wealth)"**: il mercato scende solo il
  43,2% (sale più del normale); periodi incoerenti (32,3% vs 51,2%).
- **Cella sostenuto + mutante favorevole**: 5 carte in 6 anni, non misurabile.
- Base A larga (Ying genera, 161): PB 46,6%, direzione piatta; mutante favorevole
  11 carte, nulla.

## Imbuto Officer (per riferimento)

Shi=Officer 924 → Shi valido 886 → Ying valido 824 → Ying genera lo Shi 161 →
Ying anche forte ("sostenuto") 74. La mutante sfavorevole taglia 886 → 92.

## Nuovi attrezzi nel motore (pb_stress.js aggiornato)

- `LYCELLA=bro|off|wea|chi|par` — referto della cella "Shi sostenuto" per qualunque
  parente, trend su e giù, spacco automatico dei periodi
- `LYIPOTESI=1` — ipotesi direzionali sull'Officer sostenuto (+ raffinamento mutante)
- `LYCONTA=1` — imbuto Officer
- `LYLARGO=1` — basi larghe con spacco per mutante favorevole/sfavorevole/neutra
- `LYDIR=1` — dentro la cella registrata: direzione del mercato e spacco dei
  verdetti PB (segue/non segue, long/short, trend su/giù), tre periodi

## In coda (deciso da Edu)

- Celle sorelle restanti: Wealth (妻財), Children (子孫), Parents (父母) —
  con l'integrazione della mutante fin dall'inizio, come per Brother e Officer.
- Verifica speculare: la mutante sfavorevole amplifica anche gli altri parenti,
  o è un tratto specifico dell'Officer?

---

# AGGIORNAMENTO 2 — VUOTO sulle linee Shi/Ying (12/08/2026)

## Buco trovato (grazie a un esempio di Edu, esagramma Da Chu 26 = carta EURJPY 16/06/2026)

Il motore NON controllava se le linee Shi/Ying fossero VUOTE (旬空): contava un Ying
vuoto come sostegno valido. La carta EURJPY 16/06 (Ying = W 子 Zi, VUOTO nel giorno
辛酉) era entrata a torto nella cella "Ying che genera e sostiene lo Shi": un ramo
vuoto non genera.

## Regole del vuoto sulle linee (Edu, 12/08/2026) — implementate

- vuota IN MOVIMENTO → non vuota (動不為空)
- arrivo della mutante = ramo vuoto → movimento nullo
- vuota + clash + TIMELY (旺/相) → si risveglia, ATTIVA
- vuota + clash + UNTIMELY (休/囚/死) → ELIMINATA
- vuota SENZA clash → DORMIENTE (non genera, non sostiene, non è Soggetto pieno)
- il clash lo fa il ramo del GIORNO, oppure l'ARRIVO di una linea mobile (non la partenza)

Nel motore: liu.shiStato / liu.yingStato (piena/attiva/dormiente/eliminata),
liu.shiEff / liu.yingEff (booleani), liu.shiMoving / liu.yingMoving.

## Effetto sulle celle (le carte con linea vuota dormiente/eliminata escono)

**Brother sostenuto + trend su** (il risultato vivo):
- PRIMA: 126 carte, PB 63,5% (rec 64,6% / vec 61,7%)
- DOPO:   97 carte, PB 60,8% (rec 61,9% / vec 58,8%)  · NON SEGUE 67 carte 62,7%
- 29 carte spurie rimosse; la cella REGGE ancora sui due periodi.

**Officer + mutante sfavorevole** (candidato del 11/08):
- PRIMA: 92 carte, PB 60,9% (rec 60,0% / vec 61,9%)
- DOPO:  73 carte, PB 60,3% (rec 60,0% / vec 60,6%)
- nucleo NON SEGUE DOPO: 46 carte, 65,2% (rec 60,9% / vec 69,6%) — periodi più coerenti

Lezione: entrambe le celle sopravvivono alla rimozione delle carte a linea vuota →
fiducia rafforzata, non indebolita. Il buco era nel motore, non nella dottrina.

## Ancora da fare sul 伏神 (spirito nascosto) — NON ancora implementato

L'esempio di Edu mostra la dottrina completa: la 2ª linea (Shi = G 寅 Officer) nasconde
P 午 (Parent Fuoco); G 寅 genera il nascosto P 午 (Wood→Fire); e la 6ª linea (di nuovo
G 寅) si muove e controlla indietro lo Shi → "il Soggetto si autodistrugge".
Il 伏神 si trova andando all'esagramma PURO del palazzo e leggendo in quale linea sta
la funzione mancante (nell'esempio: 2ª linea). Il motore ancora NON calcola i 伏神:
è il prossimo pezzo dottrinale da aggiungere per distinguere i giorni di
"autodistruzione del Soggetto".

---

# AGGIORNAMENTO 3 — sessione G-direzionale, dottrina completa delle linee (12/08/2026)

## Nuove regole dottrinali implementate nel motore (tutte da Edu)

**Clash del giorno sulle linee (completa il quadro del vuoto):**
- linea PIENA + clash del giorno + timely (旺/相) → si MUOVE (movimento oscuro), resta viva ("mossa")
- linea PIENA + clash del giorno + untimely → ROTTA (日破), non può vincere/sostenere
- (vuote: attiva/eliminata/dormiente come da Aggiornamento 2)
- Stati possibili di Shi/Ying: piena · attiva · mossa · dormiente · eliminata · rotta

**Movimento oscuro + sostituzione del G vuoto** (da USDJPY 01/05/2024, Ding→Gu):
linea piena clashata dal giorno e timely si muove; arrivo = ramo alla stessa posizione
nell'esagramma trasformato; se l'arrivo è un nuovo G e il G originario è vuoto, lo
sostituisce; se l'arrivo COMBINA (六合) con una linea statica si ancora alla posizione
di quella linea; direzione dalla posizione dell'ancora. Implementato e verificato:
riproduce la carta campione (✓ −346). MA: 2 casi in 6 anni (1 giusto, 1 sbagliato) —
solo forward test, nessuna statistica possibile.

**伏神**: implementato (Aggiornamento 2), verificato su Da Chu 26 (P 午 sotto lo Shi ✓).

## LA REGOLA G-DIREZIONALE (fissata da Edu)

Quando lo Shi è Officer: trigramma inferiore = annuncio ribassista, superiore = rialzista.
Modulazione: se il G "non se la passa bene" la direzione annunciata FALLISCE (si ribalta).
Uso: SEMPRE come conferma del PB, mai come sistema autonomo.

**Risultati con dottrina completa (dopo tutte le correzioni):**
- G CONFERMA il PB: 459 carte, PB vince 55,8% (rec 55,6 / vec 55,9) +2.916 pip
- G SMENTISCE il PB: 465 carte, PB 49,9% — la lite = sfiducia, NON inversione
- Nelle liti nessun vincitore in nessun sottogruppo coerente sui due periodi (50/50)

## Risultati rigirati con le regole complete

- Cella Brother sostenuto+su: 94 carte, 60,6% (61,7 / 58,8) — regge
- Officer + mutante sfavorevole: 71 carte, 60,6% (60,5 / 60,6 gemelli);
  nucleo NON SEGUE: 45 carte, **66,7%** (63,6 / 69,6) — RAFFORZATA dalla pulizia
- I tre marcatori di fiducia vivi: Brother 60,6 · Officer-attaccato 66,7 (nucleo) ·
  conferma G 55,8 — tutti coerenti sui due periodi

## Strade chiuse in questa sessione (con i numeri)

- **SOCCORSO del Ti** (flusso qi + Na Yin che gira 剋我 base a "segue"): forma piena
  10 carte/6 anni con pip NEGATIVI (−38); allargata a 我生 −37; solo-flusso 184 carte
  49,5% −642 pip periodi opposti. Quinta conferma: "non segue→segue" fa danno.
- **"LY chiaro comanda"** (G soppresso ≥3 fattori: Shi debole, Ying che controlla,
  giorno che controlla, movimento legato): seguire il LY −439 pip vs PB +563 sugli
  stessi 52 giorni; più il caso è "puro" peggio va. Confermato anche DOPO le regole
  complete. La lite/soppressione segnala i giorni deboli, non dà la direzione.
- G-posizione grezza senza salute: 49,8%, nulla.
- Ipotesi Officer sostenuto (rialzo/trend/ribasso): bocciate (Aggiornamento 1).

## Carte campione della sessione (per controlli futuri)

- EURJPY 16/06/2026 (Da Chu 26): Ying 子 vuoto dormiente → fuori dalla cella; mercato
  +50 seguendo; PB finale sbagliato per rafforzamento cieco su Ti debolissimo
  (2×午 contro Qian, 辰 legato da 酉)
- USDCAD 17/06/2026 (同人 13): G 亥 soppresso, movimento sospeso dal giorno; mercato
  +107; Na Yin 壬寅 Metal, catena 午午午→戌→NaYin verificata
- USDJPY 01/05/2024 (Ding 50→Gu 18): Shi G 亥 vuoto dormiente, Ying 未 MOSSA dal
  giorno (丑↔未, 未 旺), arrivo 子 nuovo G ancorato a 丑 in basso → ribasso ✓ −346

## Aperture per le prossime sessioni

- Rafforzamento cieco su Ti debole in 生我 (caso EURJPY 16/06): misurare se sospendere
  il flip quando il Ti è debole nel Bazi pieno — aggancia il modello di forza generale
- Celle sorelle restanti: Wealth, Children, Parents (mutante integrata da subito)
- Mutante sfavorevole sugli altri parenti (tratto specifico dell'Officer o generale?)
- Etichetta di confidenza in PWA quando i marcatori maturano il forward test

## §111-bis · IL TAI SUI CON LE BESTIE SCENDE SU L1 E PENALIZZA — cablata S36 (03/09/2026), dottrina di Edu
Carta guida **USDJPY 28/03/2022 s122** (41 Sun, sup 7 inf 2, L2 mobile; giorno 庚辰, mese 卯, anno 寅, ora 丑, vuoti 申酉).
La mobile L2 G 卯 muta in 寅 = Tai Sui, libero in carta. Il ramo G/W della §111 darebbe la sede della mobile → SHORT (sbagliata, +163 LONG).
Lettura di Edu: il Tai Sui arriva **con le bestie su L1** — casa dello stelo del giorno, dove cade l'intera data — e la **penalizza** (寅刑巳).
La P 巳 su L1 è **timely** nel mese 卯 (il Legno genera il Fuoco): la penalità morde e comanda sul ramo G/W.
La penalizzata non fa vincere la sua squadra; L1 è in basso → **LONG**. Conferma: la Ying 寅 (Legno) controlla lo Shi 丑 (Terra) — conferma, non l'attore.
**Gemella negativa GBPUSD 05/12/2022 s122** (stessa carta, stessa mutazione, giorno 壬辰, mese 亥, vuoti 午未): la P 巳 su L1 è
**non timely** (l'Acqua del mese uccide il Fuoco), la penalità non morde, resta la §111 normale → SHORT, giusta (−102).
Misura (pen111.js, dentro il ramo G/W della §111 con penalità presente): **penalizzata su L1 e timely 3 carte 3/3, periodi 100/100**
(USDJPY 28/03/2022 +163 · GBPUSD 15/03/2022 +28 · USDCAD 02/01/2024 +78) · penalizzata su L1 non timely 9 carte 44% ·
penalizzata su altra linea 10 carte 30% · la §111 così com'era in questo sottoinsieme 22 carte 40,9% (vec 25).
Cablata DENTRO §111, prima del ramo G/W. **S17 invariato: 2788 · 58.54% · z 9.01 · +35454** (le tre carte erano già lette giuste
dalla catena PB+LY; cambia il verdetto del LY da solo su di esse). `VIA111BIS=off` per disattivarla.
**Perché il motore non l'aveva trovata:** nella §111 il ramo G/W usciva subito con `return` e il controllo della penalità
veniva raggiunto SOLO quando l'arrivo era muto (P/B/C). Con l'arrivo G o W la penalità non era mai guardata.

## S36 (03/09/2026) — TRE VIE DI CODA E UNA CORREZIONE DI GUARDIA
- **§132 · duello finale Shi/Ying** (Edu: "ultima verifica prima di dire che una carta è muta"). ULTIMA della catena. Solo forza:
  controllo (vale anche se il controllore è vuoto) → vuoto asimmetrico → generazione (chi è nutrito vince) → timely vs untimely. Pari: tace.
  Sul residuo muto (132 carte): 50,0%, vec 57 / rec 44; controllo 47-51%, generazione-Shi 60%, vuoto 31% (la vuota vince 9/13, contro dottrina).
  Cablata su dottrina; le carte perdenti vanno lette (regola 10). Prima perdente letta: EURJPY 29/04/2024 s169 → §133.
- **§133 · il trigono completo serve al suo elemento** (Edu, guida EURJPY 29/04/2024 s169: 亥卯未 Legno = B in Xun, membri in alto → SHORT −188 ✓).
  Membri come la guardia §114. Carattere vs palazzo: G/W vince la sede, B/P perde, C tace. Sede = maggioranza dei membri visibili. PRIMA della §114.
  Perimetro 109 carte 49,5%: B 17/25 (68%), P 16/27 (59%), G 11/26 (42%), W 10/31 (32%). Prima perdente letta: EURJPY 22/09/2022 s141 → §52-bis.
- **§52-bis · la B mobile controllata indietro (回頭剋) vince la propria sede** (Edu, guida EURJPY 22/09/2022 s141: L3 B 酉→午, sede bassa → SHORT −176 ✓).
  ERRORE TROVATO: la guardia G52B (25/08, audit) zittiva la §52 con mobile B ("§52 sbaglia con B") SENZA mettere la lettura giusta: il malus
  ucciso libera la squadra, che vince la sede. Cablata dentro §52. Perimetro dove parla: 35 carte 57,1% (LONG 21 · SHORT 14).
- **Stato S17 a fine giro:** 2788 · 58,29% · z 8,75 · **+36.014** (inizio S36: 58,54% · +35.454). LY parla su 2691 carte (tace 97, era 232).
- Flag: `VIA132=off` · `VIA133=off` · `VIA52BIS=off` · misure: `DUELLO132=1|perse` · `VIA133MIS=1|perse` · `VIA52BISMIS=1` · guardia §114: `GUARDIA114=off`.

## S36 · RIORDINO DETTATO DA EDU — "prima l'azione della mobile"
- **La via del ritiro (R5) tace col movimento nullo** (AUDUSD 05/12/2023 s66: la G L2 卯 clashata dal giorno non parte, quindi non
  può indietreggiare). Ora quella carta la legge §49 (la mobile Tai Sui muta nell'elemento G del palazzo → sede) → SHORT ✓. `RETRONULLO=off` ripristina.
- **§114 spostata PRIMA di R6** (raduno stagionale) e di tutto ciò che segue: l'arrivo nel vuoto è l'AZIONE della mobile e parla prima
  (USDCAD 16/03/2020 s137: L3 P 辰→丑 vuoto, la P resta e fa perdere la sua squadra → LONG ✓; prima la leggeva il raduno 寅卯辰 → SHORT).
- **Guardia del trigono nella §114 ristretta:** il trigono comanda sulla mobile SOLO se la mobile ne fa parte (EURJPY 29/04/2024: 卯 dentro
  亥卯未 → trigono; USDCAD 16/03/2020: 辰 fuori da 寅午戌 → la P "sta da sola", §114). `GUARDIA114=tutti` ripristina la guardia larga.
- Le quattro carte guida di oggi leggono tutte giuste: USDCAD 16/03/2020 §114 LONG · EURJPY 29/04/2024 §133 SHORT · AUDUSD 05/12/2023 §49 SHORT · EURJPY 22/09/2022 §52-bis SHORT.
- **Stato S17 dopo il riordino:** 2788 · 57,68% · z 8,11 · +34.077 (inizio S36: 58,54% · +35.454). LY tace su 86 carte. PWA↔motore: 140 diverse (5,0%).
  Regola 10: le perdenti create dal riordino si leggono una per una, non si torna indietro sui numeri.

## S36 · §114 RIMESSA IN ORDINE — "Y vs S si guarda alla fine"
Edu (03/09/2026, EURJPY 07/08/2024 s158: la P L1 si muove nel vuoto e fa perdere la propria squadra → LONG +215 ✓):
dentro la §114 il codice guardava PRIMA il vuoto di Shi/Ying (mobile terza linea) e PRIMA il controllo Shi↔Ying (mobile = Shi/Ying),
e SOLO DOPO il carattere della mobile. Ordine corretto: la mobile e' l'azione, il suo CARATTERE decide (G/W regge → vince la sua sede;
B/P fa perdere la propria squadra); C tace e la carta va avanti fino al duello finale (§132), che e' l'ultima cosa che si guarda.
Il controllo/vuoto fra Shi e Ying che stava dentro la §114 (NZDUSD 10/07/2024, EURUSD 04/05/2022) vive ora solo nella §132.
Verifica: EURJPY 07/08/2024 LONG ✓ · USDJPY 29/03/2023 LONG ✓ · NZDUSD 10/07/2024 SHORT ✓ · USDJPY 07/08/2024 SHORT ✗ (G su Shi, +198) ·
EURUSD 04/05/2022 SHORT ✗ (B terza linea, +100). Stato S17: 2788 · 57,28% · +32.164 (motore unico).

## S36-bis (04/09/2026) · DUE BESTIE SU SHI O YING — §136 in TESTA, priorità sul resto (Edu)
Enunciato di Edu: "Se due bestie arrivano su S o Y la loro azione ha priorità sul resto" (prima anche della mobile; limitata a Shi e Ying).
Letta sulle carte: i RAMI dei pilastri caduti su una sede agiscono sull'ALTRA sede. Nutrono → l'altra vince (USDJPY 02/07/2026: 午巳 su Ying
戌 nutrono lo Shi 丑 → SHORT ✓). Colpiscono (刑/冲/剋/drenaggio) → l'altra perde (NZDUSD 10/08/2023, GBPUSD 08/01/2025).
Esclusioni di Edu: Shi/Ying vuoti · nascosto sotto Shi/Ying · rami dei pilastri che clashano fra loro. Misto/neutro: tace.
Forma sbagliata provata prima (mia): "vince la sede dove cadono" → 983 carte 47,5%; pulita 264 · 48,9%. Non è la regola.
**Misura della regola letta bene (duebestie_sy.js, 218 carte pulite):** NUTRE → l'altra vince: **su Ying 17 carte 88,2% z 3,15 (vec 100 / rec 82)**,
su Shi 18 carte 61,1%; COLPISCE → l'altra perde: **183 carte 45,4%** (non regge). Cablata intera su dottrina; `VIA136COLPI=off` spegne il ramo "colpisce".
S17 con tutta la §136: 57,14% · +31.214 · con solo il ramo "nutre": 57,71% · +33.190. Carte guida 73 in entrambi i casi.
Errore mio di metodo: avevo aggiunto io l'esclusione "mobile che agisce" che Edu non ha mai dato, e per questo non trovavo la carta (regola 10).
Anche §135 (pilastro doppio, 13 carte 7 giuste) resta, DOPO la §114, coi 6 perdenti da leggere.

## §137 · IL POSSESSO DI SHI O YING — cablata 04/09/2026 come PRIMA via, precedenza su tutto (Edu)
Testo di Edu: "1. Se due bestie arrivano su una linea qualsiasi prendono possesso. 2. Se la bestia del mese arriva su una linea qualsiasi prende
possesso. 3. Se un'altra bestia arriva su una linea lavora con la linea. 4. Se quanto sopra capita con S e Y questo ha la precedenza su ogni
altra cosa inclusa linea mobile." Precisazione (USDJPY 06/05/2026): il mese si impone solo se ha la stessa polarità della maggioranza degli
altri steli. Dopo il possesso Shi e Ying si confrontano coi nuovi elementi: chi viene generato vince (EURJPY 13/06/2023 ✓).
Esclusioni di Edu: Shi/Ying vuoti · nascosto sotto Shi/Ying · rami arrivati che clashano fra loro · penalità su Shi/Ying.
Misure (possesso.js): possesso con polarità 138 carte 58,7% (vec 58,5 / rec 58,8); "la Ying genera lo Shi" 55 · 65,5%; "lo Shi genera la Ying"
83 · 54,2%. Bestia singola che lavora: 196 · 46,9% (non entra). Controllo: peggiora (non entra). Clash che fa muovere (clash_muove.js):
su Shi/Ying 59 · 42,4%, su altra linea 64 · 48,4% (non cablato; tiene solo "la mossa controlla l'altra" 21 · 57%).
**Tolte le §135 e §136** che contenevano aggiunte mie ("colpisce", "pilastro doppio che si impadronisce").
**Stato:** carte guida 76 giuste (ieri mattina 65) · S17 2788 · 58,18% · z 8,64 · +33.767 (motore unico).

## S36-bis · CHIUSURA 04/09/2026 — stato finale
- **Motore unico**: `pb_stress.js` chiama il termometro di `liuyao.js` (LYUNICO); la riscrittura interna di lyDir resta solo per audit (`LYUNICO=off`).
  Contesto passato identico a quello della PWA (steli anno/mese/ora, capolinea, corpo, ramo dell'anno). **Parità PWA↔motore: 0 differenze su 465 carte** (era 136/2.788).
- **Regressione carte guida** ora nel motore: `<flag baseline> SOGLIAPIP=0 CARTEGUIDA=1 node pb_stress.js` (anche `CARTEGUIDA=tutte`). Da lanciare dopo OGNI modifica al LY.
  Stato: **110 carte · 76 giuste · 0 mute · 34 storte** (ieri mattina 65 giuste, 8 mute, 37 storte).
- **S17 finale: 2788 · 58,18% · z 8,64 · +33.767** · LY parla su 2.772 carte.
- **Scala A/B/C**: A 419 · 67,8% · B 396 · 64,9% · C (DLR tace) 661 · 62,3% → 1.476 carte. Il caso "DLR contrasta" resta fuori (368 · 52,5%).
- **Motore DLR: 1.859 carte · 59,76% · z 8,42 · +21.427** (vie 12, 13, 14 cablate oggi; via 15 provata e CANCELLATA: 66% sulla casella intera
  ma 27% sulle 11 carte che leggeva davvero in coda — d'ora in poi si valuta una via SEMPRE nella sua posizione reale in catena, mai sulla casella).
