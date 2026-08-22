# Registro delle correzioni dottrinali — 13/08/2026

Regole enunciate da Edu in questa sessione. **Vanno conservate anche se non ancora
confermate dai numeri**: una regola non confermata oggi può servire domani, e riesaminare
le carte una per una è lento e costoso.

Stato: `FISSATA` (confermata dai numeri) · `IN PROVA` (misurata, esito incerto) ·
`ARCHIVIATA` (enunciata, non ancora misurata) · `BOCCIATA` (misurata e respinta).

---

## 1. Clash — validità per pilastro  ·  `FISSATA` (implementata in liuyao.js)

- Clash dal **GIORNO**: sempre effettivo.
- Clash dall'**ANNO**: effettivo solo se il **ramo dell'anno** è in 旺/相
  (chi clasha deve avere forza; non la linea clashata).
- Clash dal **MESE**: **non effettivo da solo**, ma **potenzia** gli altri due quando è presente.

## 2. Combinazione (六合) — bloccante con protezione  ·  `FISSATA` (implementata in liuyao.js)

- La combinazione **dal GIORNO** blocca sempre il ramo (fuori dai giochi).
- Ma protegge anche il ramo da un clash diretto: per colpirlo servono **DUE clash**,
  il primo rompe la combinazione, il secondo attacca.
  - 0 clash → **legata** (bloccata)
  - 1 clash → combinazione rotta, ramo **liberato** (non ancora colpito)
  - ≥2 clash → combinazione rotta **e** ramo colpito (rotta/mossa secondo la stagione)
- Solo dal giorno (non da mese o anno).

## 3. Ripiego del LY quando Shi e Ying sono fuori  ·  `BOCCIATA` come sostituto del PB

Se né Shi 世 né Ying 應 sopravvivono, la lettura passa a:
**G 官鬼 → W 妻財 → linea mobile**, preferendo fra i candidati quelli **timely** (旺/相);
linee molto untimely e non sostenute dalla data hanno poca efficacia.
Direzione: **posizione della linea che regge** (trigramma inferiore L1-3 = SHORT,
superiore L4-6 = LONG). La variante "posizione della linea che essa genera" è **bocciata**
(45,07%).

Misura (301 carte in ripiego, 202 con responso):

| | n | Liu Yao | Plum Blossom |
|---|---|---|---|
| Tutto | 202 | 56,44% · +1.782 pip | 57,92% · +1.321 pip |
| Recente 2023-05→ | 113 | 53,98% · +810 pip | 58,41% · +296 pip |
| Vecchio 2020→2022 | 84 | 59,52% · +574 pip | 55,95% · +567 pip |

Esito: **non sostituisce il PB** (perde nel recente). Sui **pip** però batte il PB su
entrambi i periodi — firma diversa, prende i movimenti più grossi. Da non buttare.
Nota: il ripiego scatta su carte dove il PB va **già bene** (57,92% contro 53,51% di baseline).

**Sequenza verificata la migliore su 66 varianti testate** (G→W→mobile, 56,2%).
G in testa è solido; i criteri "di rilevanza" senza ordine fisso vanno peggio
(più forte in stagione 50,2%; solo timely più basso 52,6%).

## 4. Autopenalità 自刑 dal giorno  ·  `IN PROVA` — misurata, campione troppo piccolo

Carta sorgente: **USDJPY 05/12/2022** (seme 134, sup 8 坤, inf 6 坎, mutante L1).

Quando ci sono **due linee dello stesso parente** candidate a reggere la lettura, quella
che riceve **autopenalità dal giorno** (stesso ramo del giorno: 辰辰, 午午, 酉酉, 亥亥)
è penalizzata ed esce; la generazione va all'altra.

Nella carta: mobile L1 寅 → 巳 Fuoco (caso 2 泄, agisce l'arrivo). Il Fuoco genera Terra e
quindi **entrambi** gli Ufficiali (辰 a L2, 丑 a L4): da sola la generazione non discrimina.
Il giorno è 壬**辰** e il G basso è **辰** → 辰辰自刑 → esce. Resta il G alto 丑 (L4,
trigramma superiore) → LONG. Il mercato sale. ✓

Senza questo criterio la regola sceglieva il G più basso per posizione, cioè a caso.

**Misura (13/08/2026):** esclude solo **6 linee** su 202 carte di ripiego — troppo raro per
essere validato. Win rate complessivo invariato (56,44%), pip +311. Recente 53,10% contro
53,98%; vecchio 60,71% contro 59,52%. Con 6 casi sono scarti di rumore.
Il criterio resta dottrinalmente corretto e va **tenuto**: sulla carta sorgente sceglie
giusto, e potrà contare quando entrerà in una regola con più occorrenze.

## 5. PB — il giorno immobilizza il Yong trasformato  ·  `BOCCIATA` — misurata 13/08/2026

Carta sorgente: **USDJPY 05/12/2022**.

坎 Kan muta in 兌 Dui, il cui palazzo Houtian è **酉**; il giorno **辰** lo combina
(辰酉合) e lo **immobilizza**. Il Yong trasformato legato ⇒ il Trend non può esercitare
la relazione (qui 我剋) ⇒ **non segue**.

Concorre con il **Rafforzamento**, che sulla stessa carta dà lo stesso verdetto per via
diversa (兌 Metallo genera 坎 Acqua ⇒ Yong rinforzato).

**Misura (13/08/2026):** tocca **543 carte** (115 già toccate dal Rafforzamento, 428
indipendenti). Dove **cambierebbe** il verdetto (160 carte, oggi "segue" → "non segue")
vince **44,4%** e rende **−1.160 pip** contro i +1.160 di oggi. Perde su entrambi i periodi
(recente 44,8%, vecchio 43,3%). Imponendo "non segue" su tutte e 543: 53,78% contro 57,09%
del baseline.

**Esito: bocciata.** Il Rafforzamento resta la lettura migliore per questa configurazione.
Il meccanismo è sensato e sulla carta sorgente dà la risposta giusta, ma non generalizza.

## 6. PB — la combinazione blocca il palazzo del Trend  ·  `ARCHIVIATA` — da misurare

Carta sorgente: **EURJPY 04/11/2025** (seme 177, sup 6 坎, inf 1 乾, mutante L3).

Il giorno 丑 combina il palazzo del Trend 子 (子丑合) ⇒ il Trend è legato ⇒ **non segue**.

⚠ **Capovolge una regola esistente**: oggi il motore legge la combinazione sul palazzo del
Trend come *protezione* (→ segue), e solo quando la base dice "non segue" (`protetto`,
flag `CP=verdetto`). Edu dice che è un **bloccante** (→ non segue). Non è un'aggiunta:
è un cambio di polarità. Da misurare prima di applicare.

---

## Correzioni ai fatti, registrate per non ripeterle

- **EURJPY 04/11/2025** — il Metallo *c'è* nel Bazi: 庚 in 戌 è a 衰 (stadio 6, appena oltre
  il picco), 戌 e 丑 custodiscono 辛, e l'ora dal seme è 申. Contare solo l'elemento dei rami
  (巳 Fuoco, 戌 Terra, 丑 Terra) è una lettura grossolana.
- **EURJPY 15/03/2023** — è lo **Shi** a essere combinato dal giorno (巳申合) e l'**Ying** a
  essere clashato da mese e anno (卯酉冲), non il contrario.
- **USDJPY 05/12/2022** — non c'è combinazione dal giorno sul palazzo del Trend: il giorno 辰
  combina 酉, assente dalla carta. L'unica combinazione è 寅+亥 (Tai Sui col **mese**). Il
  palazzo del Trend 未 non è combinato ma **vuoto**.
- Il Liu Yao **v1** (sola relazione Ying→Shi, senza stati di forza) non è "il Liu Yao":
  su 1.800 contrasti col PB ha ragione il PB nel 54,50% (−7.238 pip seguendo il LY).
  Le letture complete di Edu sulle stesse carte sono corrette; è la v1 a fallire.
- Le carte esaminate a mano nelle sessioni di studio sono in prevalenza **casi negativi del
  PB**: in quella popolazione il LY appare superiore per costruzione. Il confronto va sempre
  fatto sull'insieme completo.


---

## 7. PB — il vuoto è sempre vuoto (fuori dal pareggio)  ·  `BOCCIATA` — misurata 13/08/2026

Carta sorgente: **USDCAD 18/03/2020** (seme 142, sup 1 乾, inf 6 坎, mutante L4).
Enunciato: il palazzo del Trend vuoto rende il Trend inagibile in **qualsiasi** relazione,
non solo nel pareggio 比和. Eccezione: se il ramo del Trend è **clashato**, il vuoto è
risvegliato e non vale.

| | baseline | =giorno | =pieno |
|---|---|---|---|
| Tutto | 53,51% · z 3,86 · 17.221 | 53,32% · z 3,49 · 17.600 | 53,34% · z 3,53 · 17.834 |
| Recente | **53,28%** · 10.717 | 52,79% · 9.346 | 52,83% · 9.580 |
| Vecchio | 54,39% · 6.896 | 54,45% · 8.384 | 54,45% · 8.384 |

**Esito: bocciata.** Il guadagno in pip viene **interamente dal periodo vecchio**; il recente
peggiora su entrambe le metriche. La z scende da 3,86 a 3,53.

**Perché il vuoto resta confinato al pareggio** (spiegazione dottrinale, non ancora testata
per relazione): nel 比和 la relazione non decide nulla e serve uno spareggio di sostanza;
nelle altre quattro la forza sta già nella relazione, che agisce fra **elementi**, e il vuoto
di un ramo di palazzo non interrompe un rapporto elementale. Il palazzo Houtian è una
corrispondenza posizionale, il 旬空 una proprietà calendariale: piani diversi.
**Aperto:** il vuoto potrebbe agire in *alcune* relazioni (es. 我剋, che richiede sostanza per
esercitare controllo) e non in altre (生我, dove il Trend riceve). Da scomporre per relazione.

## 8. PB — il Tai Sui non si batte  ·  `BOCCIATA` — misurata 13/08/2026

Carta sorgente: **USDCAD 18/03/2020**. Il Tai Sui non è mai vuoto; se il ramo dell'anno
coincide col palazzo del Trend, il Trend è il trigramma del Tai Sui e non può essere battuto.
Qui: anno 庚**子**, palazzo del Trend 坎 = **子**, e 子 è fra i vuoti del giorno.
Spiegherebbe con una sola regola sia il vuoto inerte sia il mancato drenaggio da 巽.

| variante | tutto | z |
|---|---|---|
| baseline | 53,51% · 17.221 | 3,86 |
| annulla il vuoto | 53,49% · 17.187 | 3,83 |
| annulla il drenaggio | 53,54% · 17.317 | **3,89** |
| annulla tutto | 53,42% · 16.043 | 3,76 |
| impone segue | 53,00% · 13.404 | 3,38 |

**Esito: bocciata.** La sola variante positiva (drenaggio) guadagna +0,03 punti e +96 pip —
indistinguibile da zero — e perde comunque nel recente (53,23 contro 53,28). La forma forte
("impone segue") è la peggiore di tutte.

**Da conservare, osservazione collaterale:** le **280 carte** in cui il palazzo del Trend
coincide col ramo dell'anno si comportano in modo **opposto nei due periodi** —
recente **60,54%** (+2.452 pip), vecchio **50,40%** (+11 pip). Sette punti sopra il baseline
nel recente, neutre nel vecchio. Non stabile, quindi non regolarizzabile, ma la spaccatura è
troppo netta per essere solo rumore e non era mai emersa.

## 9. LY — autocombinazione 自合 della mobile  ·  `FISSATA` (implementata in liuyao.js)

Carta sorgente: **USDCAD 18/03/2020** (訟 Song 6 → 渙 Huan 59), verificata sullo screenshot
del software di riferimento.

Se la **partenza** della linea mobile combina (六合) il proprio **arrivo**, la linea si lega a
se stessa: è **bloccata**, non è più "in movimento" e non regge la lettura.
Qui: mobile L4 兄弟 午 → 未, e 午未合 → lo Shi (che è la mobile) esce dai giochi.
Nuovo stato di linea: `autocombinata`, che conta come morta. Nuovo caso di mutazione: **-4**.

## 10. LY — il G nascosto (伏神) è fuori dai giochi  ·  `FISSATA` (già coerente)

Nella gerarchia di ripiego, un parente presente **solo come 伏神** non conta come candidato.
Qui 官鬼 亥 è nascosto dietro L3 e viene saltato; la lettura passa a W.
Il modulo lo faceva già correttamente (i nascosti non sono linee visibili).

## 11. LY — la linea che coincide col ramo del giorno  ·  `ARCHIVIATA`

Una linea il cui ramo è **uguale al ramo del giorno** (日辰臨爻) è al massimo della forza.
Qui: W 妻財 **申** a L5, e il giorno è 庚**申**. È l'unica linea che sopravvive, sta nel
trigramma **superiore** → LONG. Il mercato sale, EMA su: **segue**. ✓
Da usare come criterio di preferenza fra candidati (più forte del semplice "timely").

## ⚠ QUESTIONE APERTA — l'Ying clashato dal giorno ma timely

Su questa carta Edu dà l'**Ying fuori dai giochi** perché clashato dal giorno:
Ying L1 父母 **寅**, giorno **申**, 寅申冲.

Ma per la **regola 1** già fissata, una linea piena clashata dal giorno e **timely** è in
**暗動 (movimento oscuro): resta viva**. E 寅 Legno nel mese 卯 è 旺, quindi timely.
Il modulo infatti la dà `mossa` = viva, e per questo **non attiva il ripiego** su questa carta.

Ipotesi da sottoporre a Edu: la differenza potrebbe stare nel fatto che 申 non solo clasha
寅 ma lo **controlla** (Metallo controlla Legno) — un 剋冲, distruttivo, diverso da un clash
fra pari come 子午. Se confermato, la regola diventerebbe: *clash + controllo dal clashante =
la linea cade anche se timely*.
**Non implementato:** serve la conferma dottrinale prima di toccare la regola 1.


---

# 12. IL RUOLO DI P 父母 — P È UN CONDOTTO, NON UN ATTORE  ·  `SCOPERTA` (13/08/2026)

**È il risultato più importante della sessione, e l'unico che regge su entrambi i periodi.**

## L'enunciato di Edu

P 父母 **drena G** (il portatore direzionale) e **controlla C** (che a sua volta genera W).
Elementalmente verificato sul palazzo 離 (Fuoco): G=Acqua, P=Legno, B=Fuoco, C=Terra, W=Metallo.
Acqua genera Legno ⇒ **P drena G**. Legno controlla Terra ⇒ **P controlla C**.
Terra genera Metallo ⇒ **C genera W**.
Ipotesi: *P non è mai indicatore di guadagno, casomai di perdita — DA SOLO*.

## Cosa dicono i numeri

**Per posizione** (tasso di successo del PB, baseline 53,51%):

| | Shi | Ying | mobile |
|---|---|---|---|
| P 父母 | 53,77% (n=584) | **55,17% (n=1287)** | **52,41% (n=893)** ← peggiore dell'asse |

Alla **mobile** l'ipotesi di Edu è confermata: P è il peggiore dei cinque parenti.
All'**Ying** invece P è la cella più grande e più redditizia della tabella (+8.210 pip).
La contraddizione è solo apparente e si scioglie scomponendo per rapporto con lo Shi.

## Il cuore della scoperta — P all'Ying, per rapporto con lo Shi

| rapporto | n | tutto | recente | vecchio | pip/trade |
|---|---|---|---|---|---|
| **Shi=B — P GENERA lo Shi (drenato)** | 356 | **59,55%** | 61,58% | 54,55% | **12,01** |
| Shi=P — stesso parente | 199 | 55,28% | 49,00% | 62,64% | 5,21 |
| Shi=C — P controlla lo Shi (domina) | 275 | 53,82% | 53,29% | 58,04% | 7,16 |
| Shi=W — W controlla P (controllato) | 426 | 53,05% | 53,21% | 56,38% | 2,56 |
| **Shi=G — G genera P (nutrito)** | 31 | **45,16%** | 33,33% | 56,25% | **−5,29** |

**È il DRENAGGIO che conta, non il controllo.**
- P **drenato** dallo Shi: 59,55%, sopra il baseline su **entrambi** i periodi, 12 pip a trade.
- P **controllato** dallo Shi: 53,05% — esattamente il baseline. Il controllo non produce nulla.
- P **nutrito** da G: 45,16% e −5,29 pip/trade — l'unica cella negativa dell'intera analisi
  (campione piccolo, n=31, e nel recente crolla al 33%: il segno è chiaro, la regola no).

## Formulazione

**P non è un attore, è un condotto.** Conta solo ciò che passa *attraverso* di lui verso lo Shi.
Quando P **cede** (genera lo Shi) il sistema rende al massimo; quando P **trattiene** — perché
nutrito da G o controllato da W — il vantaggio sparisce; quando riceve e basta, perde.
Questo riconcilia le due facce: alla **mobile** P prende l'iniziativa e drena G, e nuoce
(52,41%, peggiore dell'asse); all'**Ying** P sta fermo e nutre il Soggetto, e giova.

## Il caso "P non fa niente" — controintuitivo

Scomposizione di P all'Ying quando lo Shi è B (cioè P genera lo Shi):

| caso | n | tutto | recente | vecchio | pip/trade |
|---|---|---|---|---|---|
| P→B allo Shi, **B incartato** | 109 | **65,14%** | 64,15% | 62,22% | 10,67 |
| P→B allo Shi, B agibile | 247 | 57,09% | 60,67% | 50,00% | 12,60 |
| P all'Ying, Shi non è B | 931 | 53,49% | 51,75% | 58,23% | 4,23 |

Il caso in cui P "non fa niente" perché il B allo Shi è **incartato** (es. autocombinazione) è
il **migliore**: 65,14%, stabile su entrambi i periodi, ~11,6 punti sopra il baseline, z ≈ 2,4
su 109 carte. Il caso col B agibile è **instabile** (vecchio 50,00%).

⚠ **Attenzione a cosa misura:** è il tasso di successo del **PB** su quelle carte, non un
segnale del LY. Non dice "P incartato predice la direzione" — dice **"su queste carte il PB ci
prende quasi sempre"**, quindi sono carte in cui il LY **non deve correggere nulla**.
Carta esemplare: **USDCAD 18/03/2020**, che sta in questa cella, e il PB ha ragione (+266 pip).

## Perché conta

È **l'unico risultato della sessione che non si è sbriciolato al controllo dei due periodi**.
Tutte le altre regole misurate oggi (vuoto sempre vuoto, Tai Sui, immobilizzazione del Yong
trasformato, ripiego LY) reggevano su un periodo solo.

**Da fare:** estendere la stessa scomposizione per rapporto con lo Shi agli altri parenti
(W 妻財, C 子孫, B 兄弟, G 官鬼) — la chiave "drenato / controllato / nutrito / domina" non era
mai stata usata come asse di analisi e su P ha separato nettamente.


## 12-bis. P allo SHI — completamento (13/08/2026)

**P allo Shi non ha mai la configurazione buona.** Con lo Shi = P, l'Ying risulta solo
W, P o G: **il caso "drenato" (Ying=B) non compare mai**. P al Soggetto non può cedere.

| P allo Shi, rapporto con l'Ying | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| Ying=W — P controllato | 205 | 55,61% | 52,42% | 59,74% | 6,38 |
| Ying=P — stesso parente | 199 | 55,28% | 49,00% | 62,64% | 5,21 |
| **Ying=G — P nutrito** | 180 | **50,00%** | 49,48% | 50,67% | **0,86** |

Le prime due sono **instabili** (crollano nel recente). La terza è **stabile e cattiva su
entrambi i periodi**.

**Conferma incrociata:** *P nutrito da G* è negativo in **entrambe** le posizioni —
45,16% all'Ying (n=31) e 50,00% allo Shi (n=180), con il campione grande stabile sui due
periodi. Quando P riceve da G invece di cedere, il vantaggio sparisce.

**Stato della linea (P allo Shi):**

| | n | tutto | recente | vecchio |
|---|---|---|---|---|
| fermo | 486 | 54,94% | 51,88% | 58,91% |
| incartato | 226 | 54,87% | 49,14% | 59,79% |
| agibile | 358 | 53,07% | 51,22% | 56,85% |
| **è la linea mobile** | 98 | **47,96%** | 43,64% | 53,66% |

**P che si muove è il caso peggiore** (47,96%, oltre 5 punti sotto il baseline); P fermo 54,94%.
Stesso segnale già visto sull'asse della mobile (52,41%, ultimo dei cinque), qui più netto
perché il Soggetto che prende l'iniziativa pesa di più.

### REGOLA FISSATA — P 父母

> **P vale solo come donatore fermo.**
> - P **cede** allo Shi (Shi=B, P genera il Soggetto) → 59,55%, la configurazione migliore
> - P **fermo** → sopra il baseline
> - P **si muove** → 47,96%, il peggio
> - P **nutrito da G** → nessun vantaggio, in entrambe le posizioni
> - Allo **Shi** P non può mai cedere (il caso drenato non esiste): posizione strutturalmente debole


---

# 13. IL RUOLO DI C 子孫 — VERSARE IN W È UNA PERDITA  ·  `SCOPERTA` (13/08/2026)

## L'enunciato di Edu
*C dovrebbe essere positivo quando genera W, negativo quando controlla G.*
(C genera W e controlla G sempre, per costruzione elementale: nel palazzo 離, C=Terra,
W=Metallo, G=Acqua; Terra genera Metallo, Terra controlla Acqua.)

## Esito: **l'ipotesi è invertita dai numeri**

**C allo SHI — rapporto con l'Ying:**

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **C controlla G (SOPPRIME)** | 164 | **60,98%** | 54,95% | 73,08% | 13,16 |
| altro = P | 275 | 53,82% | 53,29% | 58,04% | 7,16 |
| **C genera W (VERSA)** | 122 | **46,72%** | 50,00% | 43,33% | **−3,26** |

All'**Ying** lo stesso ordine, più compresso: sopprime 53,11% · versa 50,45%.
Alla **mobile** l'ordine si confonde e le celle sono instabili fra i due periodi.

## La cella peggiore dell'intera sessione

**C allo SHI — bersagli vivi sulla carta:**

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| W assente · G assente | 82 | 63,41% | 60,98% | 71,05% | 10,68 |
| W vivo · G vivo | 77 | 58,44% | 54,76% | 62,86% | 13,63 |
| W assente · G vivo | 313 | 54,63% | 53,44% | 58,62% | 8,06 |
| **W vivo · G assente** | 89 | **41,57%** | 45,28% | 34,29% | **−8,07** |

Quando C ha un **W vivo in cui versare e nessun G da sopprimere**, il sistema scende al
**41,57%** — dodici punti sotto il baseline, **stabile su entrambi i periodi**, −718 pip.
È il segnale negativo più forte e più stabile emerso finora.
**Candidata a filtro di astensione (NO TRADE): 89 carte, −718 pip da evitare.**

## Stato della linea (C allo Shi)

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **C agibile** | 321 | **57,01%** | 58,86% | 57,35% | 9,80 |
| C è la mobile | 86 | 56,98% | 53,06% | 61,11% | 6,51 |
| C incartato | 154 | 47,40% | 43,56% | 55,77% | 0,16 |

**C agibile allo Shi: 57,01% su 321 carte, stabile su entrambi i periodi.**
A differenza di P, per C l'agibilità conta: incartato scende a 47,40%.

## Formulazione

> **C conserva forza sopprimendo, la perde versando.**
> C che si scarica nella Ricchezza si svuota; C che tiene sotto controllo l'Ufficiale
> mantiene sostanza. È l'inverso dell'intuizione di partenza.

⚠ **Cosa misurano questi numeri:** il tasso di successo del **PB** su quelle carte, non un
segnale direzionale del LY. La cella al 41,57% dice *"qui il PB sbaglia sistematicamente"*,
non *"C predice il ribasso"*.


---

# 14. CORREZIONE 回頭剋 (caso 3)  ·  `FISSATA` (implementata in liuyao.js, 13/08/2026)

Carta sorgente: **GBPUSD 03/10/2022** (seme 111, sup 5 巽, inf 7 艮, mutante L2).
**Errore mio, trovato da Edu:** nel caso 3 (回頭剋, l'arrivo controlla la partenza) il codice
trattava il movimento come inerte (effEl=null). Sbagliato: **muore la partenza, non il
trasformato** — l'arrivo è vivo e agisce sulle altre linee. Ora effEl = elemento dell'arrivo.
Sulla carta: mobile L2 午→亥; 亥 Acqua genera 卯 Legno = G a L6 → LONG. Il mercato sale. ✓
(La variante vecchia resta disponibile con RITORNO=nullo per confronto.)
Nota di misura: la correzione tocca 212 carte in caso 3, che in aggregato restano al 50,47%
(recente 44,55% / vecchio 55,32%): il singolo caso torna, l'aggregato non si muove.

# 15. IL LIU YAO COME SISTEMA DIREZIONALE AUTONOMO  ·  misurato 13/08/2026

Otto letture euristiche + la dottrina completa (eliminazione per stati, vincitore fra
Shi/Ying per controllo/generazione, ripiego G→W→mobile con 日辰臨爻 e timely, varianti con
clash+controllo e autopenalità): **tutte fra 49,3% e 50,9%** contro un riferimento di 50,40%
(4.111 carte). Anche dopo la correzione del 回頭剋 l'aggregato non si muove.
Le celle "buone" trovate in sessione (P drenato 59,55%, C sopprime 60,98%) sono tassi di
successo del **PB**, non del LY: individuano dove il PB lavora bene/male, non una direzione.

# 16. LA CONDIZIONE DI EDU — G allo Ying generato dalla mobile  ·  `IN OSSERVAZIONE FORWARD`

Enunciato (13/08/2026): *"Children al Soggetto non dice niente; Officer in alto su Shi/Ying
dice molto; e se una linea si muove per generarlo deve risvegliare l'attenzione."*
Codifica: mobile con arrivo attivo che genera un **unico G vivo**; direzione dalla **posizione
del G** (inferiore SHORT, superiore LONG).

| condizione | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| mobile genera un G vivo | 127 | 49,61% | 52,94% | 49,09% | 4,45 |
| **... e il G è allo Ying** | **8** | **100%** | 100% | 100% | **86,94** |
| ... e lo Shi è C (muto) | 46 | 54,35% | 50,00% | 62,50% | 9,35 |
| ... e lo Shi NON timely | 84 | 54,76% | 61,70% | 51,52% | 4,72 |

**8/8 nel campione storico** (GBPUSD 03/10/2022 inclusa). ⚠ Otto carte non bastano a
distinguere regola vera da cella fortunata (8/8 per caso ≈ 1/256, ma con ~250 configurazioni
testate una cella così emerge quasi certamente da qualche parte; la condizione appena più
larga sta a 49,61%). **Decisione: fissata come condizione scritta PRIMA dell'esito, da
verificare in avanti su ogni nuova occorrenza.** Se in forward continua a vincere, è la
dimostrazione pulita della lettura LY; se si sgonfia, era rumore.
Collaterale da tenere d'occhio: la condizione 5 (Shi non timely, n=84, 54,76%) — quando il
Soggetto tace, l'azione parla.


---

# 17. MOVIMENTO OSCURO 暗動 — LA LINEA SI SPOSTA SENZA MUTARE  ·  `FISSATA` (liuyao.js)

Carta sorgente: **EURJPY 11/12/2023** (噬嗑 21 → 无妄 25), verificata sullo screenshot del
software di riferimento.

**Due regole date da Edu, entrambe implementate:**

1. **L'esagramma trasformato è UNICO** — nasce dalla sola mutante ufficiale. Una linea piena
   clashata (暗動) **non genera un proprio trasformato**: si *sposta dal primo al secondo
   esagramma senza mutare*, e il suo arrivo è il ramo alla **sua stessa posizione**
   nell'esagramma trasformato.
   *(Mio errore precedente: facevo mutare ogni linea per flip isolato — su questa carta dava
   戌 invece di 午, e la lettura di Edu risultava incomprensibile.)*
2. **Il bloccaggio da combinazione NON avviene se la linea atterra su una linea che si muove**:
   la combinazione non lega, **salda al movimento**.

Sulla carta: L4 酉 clashata dal giorno 卯 → si sposta a **午** (L4 di 无妄, trigramma 乾);
午未合 sulla partenza 未 della mutante L5; L5 saldata si muove ed emerge **申 = G** nel
palazzo 巽; L5 è nel trigramma superiore → **LONG**. Il mercato sale. ✓

# 18. LA SCALA MOBILE — misurata  ·  `BOCCIATA` sul suo dominio

Regola: linea in 暗動 il cui arrivo combina la partenza della mutante ⇒ la mutante è saldata
e **vince**; direzione dalla sua posizione.

| condizione | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| almeno una linea in 暗動 | 1268 | 48,82% | 48,95% | 49,60% | −1,15 |
| **scala mobile attiva** | 146 | **46,58%** | 50,62% | 44,83% | −11,61 |
| ... arrivo VUOTO (non porta a niente) | 26 | 53,85% | 64,71% | 37,50% | −13,33 |
| ... arrivo PIENO (porta a qualcosa) | 120 | 45,00% | 46,88% | 46,00% | −11,24 |

**Scomposta per destinazione** (dove porta la scala mobile):

| porta a | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| G 官鬼 | 46 | 50,00% | 52,17% | 50,00% | −3,40 |
| B 兄弟 | 14 | 50,00% | 60,00% | 33,33% | +6,87 |
| P 父母 | 39 | 46,15% | 52,94% | 45,00% | −19,75 |
| W 妻財 | 19 | 26,32% | 15,38% | 50,00% | −27,22 |
| C 子孫 | 2 | 50,00% | — | — | −0,45 |

**Nessuna destinazione produce segnale.** G, la destinazione dottrinalmente più significativa,
sta esattamente a 50,00% con entrambi i periodi a 50.
Nota: la carta sorgente della distinzione vuoto/pieno (EURJPY 29/04/2024) cade nella riga
"arrivo vuoto", che è la migliore delle due — cioè fra le carte che il criterio *non* copre.

# 19. IL G NASCOSTO RAGGIUNTO DAL BAZI  ·  `BOCCIATA`

Carta sorgente: **EURJPY 29/04/2024**. Doppio 辰 (mese + anno/Tai Sui) che combina il
伏神 官鬼 酉 dietro L3 (辰酉合), trigramma inferiore → SHORT. Il mercato scende. ✓

| condizione | n | tutto | recente | vecchio |
|---|---|---|---|---|
| G nascosto combinato dal Bazi | 176 | 51,14% | 58,24% | 45,33% |
| **... da un ramo DOPPIO** (la condizione esatta) | **16** | **43,75%** | 50,00% | 33,33% |
| ... doppio che include il Tai Sui | 14 | 50,00% | 50,00% | 50,00% |
| ... combinato dal Tai Sui | 109 | 53,21% | 57,81% | 45,45% |

Le forme larghe hanno i due periodi in contraddizione netta (58,24% vs 45,33%): profilo di
cella adattata al periodo recente.

---

# BILANCIO DELLA GIORNATA — il metodo delle carte problematiche

**Sei letture di Edu su sei carte problematiche.** Ogni volta:
- la lettura è risultata **dottrinalmente corretta sulla sua carta** (verificata al passo);
- ha prodotto **una regola vera**, che è rimasta nel modulo (回頭剋, 暗動 con arrivo,
  esagramma trasformato unico, autocombinazione, bloccaggio che non avviene su linea in moto);
- misurata **sul proprio dominio**, ha dato fra 43% e 50%.

| lettura | carta | dominio | esito sul dominio |
|---|---|---|---|
| ripiego G→W→mobile | EURJPY 15/03/2023 | 202 | 56,44% (perde nel recente) |
| generazione della mobile | GBPUSD 03/10/2022 | 944 | 48,94% |
| G allo Ying generato | GBPUSD 03/10/2022 | **8** | **100%** ← in osservazione forward |
| scala mobile | EURJPY 11/12/2023 | 146 | 46,58% |
| G nascosto dal Bazi doppio | EURJPY 29/04/2024 | 16 | 43,75% |
| scala mobile per destinazione | — | 19-46 | 26-50% |

**Posizione di Edu:** il LY ha variabilità enormemente superiore al PB, quindi ogni regola
copre per forza pochi casi; "poche carte" non è motivo per scartare. **Critica accolta**: un
sistema di cento regole da 40 carte è legittimo quanto uno di tre regole da mille.

**Posizione di Claude:** il problema non è la numerosità ma che le regole perdono **sul
proprio dominio** — dove si applicano, non fuori. E il modello "molte regole locali valide"
fa una previsione controllabile: accumulandole, il totale deve salire. Dopo sei aggiunte il
LY autonomo resta a **50,5%** contro un riferimento di 50,40%.

**Protocollo concordato:** ogni regola nuova si fissa con il **dominio dichiarato**, e il
totale cumulativo si aggiorna a ogni aggiunta, così il processo ha un termometro.

**Proposta ancora aperta (Claude):** dieci carte con la configurazione attiva, esiti coperti,
Edu applica le sue regole e scrive LONG/SHORT prima di vedere gli esiti. È l'unica verifica
che con campioni piccoli conserva validità, e produrrebbe letture da studiare per capire cosa
manca ancora al motore.


---

# 20. IL CAPOLINEA DEL FLUSSO — CHI ACCUMULA AGISCE  ·  `SCOPERTA` (13/08/2026)

**Il primo risultato della sessione in cui una lettura Liu Yao AUTONOMA esce nettamente dal
50%.** Nessun PB, nessuna EMA: direzione pura dalla posizione della linea (inferiore L1-3 =
SHORT, superiore L4-6 = LONG), confrontata con la direzione reale del mercato.

## Definizione
**Capolinea** = linea viva che **riceve** da un elemento presente e vivo (nelle linee o nel
Bazi) e **non cede** ad alcun elemento presente e vivo. Accumula il flusso del qi e non lo
disperde. Si conta solo quando il capolinea è **unico** sulla carta.
(È lo stesso principio del flusso del qi discreto già attivo nel PB, applicato alle linee.)

## Risultati — riferimento 50,40%

| capolinea unico è... | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **G 官鬼** | **325** | **57,23%** | **59,71%** | **55,88%** | **8,35** |
| W 妻財 | 253 | 54,55% | 53,90% | 53,93% | 4,90 |
| P 父母 | 198 | 54,04% | 58,54% | 47,76% | 1,12 |
| C 子孫 | 425 | 50,82% | 52,65% | 48,40% | −0,54 |
| B 兄弟 | 498 | 48,80% | 50,52% | 46,02% | −4,72 |
| *tutti insieme* | 1699 | 52,38% | 54,03% | 50,29% | 0,94 |

**Capolinea G: 57,23% su 325 carte, sopra il baseline su ENTRAMBI i periodi** (59,71% e
55,88%), 8,35 pip/trade. Campione ampio, cella stabile.
W conferma a 54,55% con i due periodi allineati (53,90% / 53,93%).
C e B in fondo — coerente con la dottrina di Edu: *"Children e Brother non svolgono ruolo,
stanno fermi"*.

## Perché conta
Il capolinea è il criterio che mancava per stabilire **chi agisce** su una carta: non chi è
più prospero in stagione, ma **chi accumula il flusso e non lo cede**. L'ordine dei parenti
che ne risulta (G · W · P · C · B) riproduce esattamente la gerarchia dottrinale enunciata
da Edu durante tutta la sessione.

## Carta sorgente — USDJPY 10/02/2026
Anno 午, mese 寅, giorno 乙卯. Il Legno 寅 cede al Tai Sui 午; il Fuoco 午 genera la Terra 辰
(W a L3); 辰 non cede perché l'unico Metallo (酉, il G) è stato distrutto. **辰 è il capolinea**,
trigramma inferiore → SHORT. Il mercato scende di 175 pip. ✓

## Da stringere (prossimi test)
Capolinea G incrociato con: posizione · stato della linea · coincidenza col Tai Sui ·
coincidenza col ramo del giorno (日辰臨爻) · presenza a Shi/Ying.

---

# 21. 争合 — COMBINAZIONE CONTESA  ·  `ARCHIVIATA` (vale sulla carta, non generalizza)

Principio (classico, non ad hoc): **un ramo non può ricevere due combinazioni insieme**.
Se la partenza della mutante è già combinata da un ramo del Bazi, l'arrivo della linea in
暗動 non ha atterraggio: la scala mobile non si forma, e la linea in 暗動 distrugge la
propria partenza.

**Discrimina perfettamente le due carte gemelle** (stesso esagramma 噬嗑→无妄, stesso seme 156,
stessa mutante L5, stesso ramo del giorno 卯):

| | EURJPY 11/12/2023 | USDJPY 10/02/2026 |
|---|---|---|
| Tai Sui | 卯 (combina 戌) | **午 (combina 未 = L5)** |
| L5 未 | libera → scala mobile si forma | **contesa → non si forma** |
| esito | mercato sale, LY giusto | mercato scende, LY sbagliato |

**Ma non generalizza:** scala mobile libera 46,56% · scala mobile contesa 46,67% (n=15).
Toglie 15 carte su 146 e lascia il quadro identico.
Da conservare: il principio è corretto e potrà servire dentro regole con più occorrenze.


---

# 22. 進神 / 退神 — LINEA AVANZANTE E RETROCEDENTE  ·  `FISSATA` (implementata in liuyao.js)

Dottrina classica, **mancava del tutto** al modulo: il caso 5 (比和, stesso elemento) era
trattato come semplice rinforzo, senza distinguere avanzamento e arretramento.
Carta sorgente: **EURGBP 18/03/2020** (seme 90, sup 3 離, inf 2 兌, mutante L2, giorno 庚申,
mese 卯, anno 子).

## Definizione
Quando la mobile si muove in un ramo dello **stesso elemento**:
- **進神 avanzante** — successione oraria: 寅→卯 · 巳→午 · 申→酉 · 亥→子 · Terra 丑→辰→未→戌
- **退神 retrocedente** — successione antioraria: 卯→寅 · 午→巳 · 酉→申 · 子→亥 · Terra 戌→未→辰→丑

**Chi avanza vince** → direzione dalla sua posizione.
**Chi retrocede perde** → vince il trigramma **opposto**.

## Risultati — riferimento 50,40%

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| 進神 avanzante — vince lui | 278 | 52,52% | 51,30% | 53,85% | 0,18 |
| 退神 retrocedente — vince l'opposto | 399 | 53,13% | 50,44% | 57,23% | 3,71 |

Entrambe sopra il riferimento su **entrambi i periodi** — prima regola sulla mutante a
riuscirci. Celle interne notevoli:
- **退神 con mobile forte in stagione**: 193 · 54,92% (52,63 / 57,53) · +1.381 pip · 7,16 pip/tr
  — la condizione descritta da Edu: *la linea che si muove è molto forte, quindi si muove lo
  stesso e retrocede*
- **退神 con mobile = G**: 110 · 55,45% (51,43 / 62,86) · 6,66 pip/tr

# 23. IL CLASH SULL'ARRIVO AMPLIFICA LA PROGRESSIONE  ·  `FISSATA`

**La scoperta più netta sulla mutante.** Il clash del giorno **sul ramo d'arrivo** porta
entrambe le progressioni da ~52% a **65-67%**:

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **退神 · ARRIVO clashato dal giorno** | 26 | **65,38%** | 61,54% | 69,23% | **19,17** |
| 退神 · arrivo NON clashato | 373 | 52,28% | 49,77% | 56,16% | 2,63 |
| **進神 · ARRIVO clashato dal giorno** | 21 | **66,67%** | 66,67% | 66,67% | **22,81** |
| 進神 · arrivo NON clashato | 257 | 51,36% | 50,00% | 52,78% | −1,67 |

Due periodi allineati in **tutte e quattro** le celle. Resa per trade da 2,63 a 19,17 e da
−1,67 a 22,81.

**È specifico dell'ARRIVO, non del clash in generale:** con la *partenza* clashata il 退神 fa
54,84% ma con periodi divergenti (38,89 / 75,00) e il 進神 addirittura 45,83%.

**Lettura:** il ramo d'arrivo colpito dal giorno non annulla il movimento, lo **rende visibile**
— il clash attiva l'arrivo invece di spegnerlo.

⚠ **Clausola di Edu NON confermata:** la condizione *"il clash bloccherebbe il movimento, ma
chi clasha è debole e la linea forte quindi si muove lo stesso"* non regge. Il caso
"clashante debole + mobile forte" esiste in 7 carte e dà 50%; il caso opposto dà 65-67%.
**Non serve che il clashante sia debole** — il clash sull'arrivo è il segnale in sé, quale che
sia la forza di chi colpisce. (EURGBP 18/03/2020 cade infatti nella cella al 65%.)

⚠ Campione complessivo delle celle clashate: 47 carte. La coerenza fra le due progressioni
indipendenti e fra i due periodi in tutte e quattro le celle è però un segno forte.


---

# 24. 退神 IMPEDITO DAL TAI SUI  ·  `FISSATA` (Edu, 13/08/2026)

Carta sorgente: **EURJPY 13/06/2023** (seme 150, sup 2 兌, inf 6 坎, mutante L5,
giorno 壬寅, mese 午, anno 卯).

**Regola:** la mobile vuole retrocedere (退神) ma il **Tai Sui clasha la PARTENZA**: non
potendo retrocedere, **prosegue** — la direzione resta quella della sua posizione, non
l'opposta. Qui: mobile L5 酉→申 (退神), Tai Sui 卯 clasha 酉 (卯酉冲) → il retrocedere è
impedito → L5 è nel trigramma superiore → LONG. Il mercato sale di 120 pip. ✓

| | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **退神 bloccato dal Tai Sui → prosegue (sua posizione)** | 30 | **56,67%** | 60,71% | — |
| *(se invece si applicasse l'opposto)* | 30 | 43,33% | 39,29% | — |
| 退神 libero → vince l'opposto | 369 | **53,93%** | 52,02% | 57,23% |

L'eccezione porta quelle 30 carte **dal 43,33% al 56,67%** (+13 punti) e **ripulisce anche la
cella principale**, che sale da 53,13% a 53,93%. Non aggiunge solo un caso: migliora la regola
madre.

⚠ Le 30 carte cadono **tutte nel periodo recente** (il clash Tai Sui↔partenza dipende dal ramo
dell'anno, e certi anni non ricorrono nel campione): il controllo sui due periodi non è
possibile. Da riverificare quando il campione crescerà.

# 25. G AUTOPENALIZZATO DAL MESE — "CHI NON VINCE PERDE"  ·  `FISSATA` (Edu, 13/08/2026)

Stessa carta. Il mese è **午** e il G è **午**: 午午自刑. Di norma il mese non interviene — sono
il Tai Sui e il giorno a farlo — **ma quando il flusso del qi lo carica al punto da non potersi
tirare indietro, è il mese stesso a penalizzare G**. Qui l'anno 卯 e il giorno 寅 sono entrambi
Legno e generano il Fuoco 午: **doppio carico**.
G penalizzato ⇒ non vince ⇒ **perde**: la direzione è l'**opposta** alla posizione di G.
(Qui G 午 è a L3, inferiore ⇒ direzione LONG. Il mercato sale. ✓)

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| G autopenalizzato dal mese — direzione di G | 97 | 45,36% | 43,24% | 50,00% | −4,38 |
| G autopenalizzato dal mese — direzione **OPPOSTA** | 97 | 54,64% | 56,76% | 50,00% | 4,38 |
| ... e il flusso carica il mese (1 ramo) — opposta | 55 | 49,09% | 51,16% | 41,67% | 1,36 |
| **... DOPPIO carico sul mese — opposta** | **14** | **78,57%** | 76,92% | 100,00% | **23,96** |

Il principio generale (direzione opposta a G autopenalizzato) tiene a 54,64%.
Il **doppio carico** è la condizione forte: 78,57%, entrambi i periodi alti.
⚠ Il carico **singolo** peggiora rispetto al caso generale (49,09%): conta il doppio, non il
semplice — coerente con "il mese non può tirarsi indietro" solo quando è caricato due volte.
⚠ Campione del doppio carico: **14 carte**. Fissata su indicazione di Edu; da confermare in
avanti.

## Contesto verificato della carta sorgente
Non era un'inversione: EMA **rialzista alla sesta barra**, dentro una corsa che arriverà a 16
(giorni vicini: +34, **+120**, +52, +173, +150, +135). Sia LY sia PB leggevano SHORT contro un
rialzo maturo e consolidato.


---

# 26. L'ARRIVO VUOTO NON ANNULLA LA PROGRESSIONE  ·  `BOCCIATA`

Carta sorgente: **EURJPY 06/03/2025**. Ipotesi: la progressione che approda a un ramo vuoto
non produce nulla (il mese clasha invano l'arrivo vuoto ⇒ direzione invertita).

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| arrivo PIENO — regola normale | 572 | 53,32% | 52,01% | 55,60% | 0,72 |
| **arrivo VUOTO non risvegliato — regola normale** | 98 | **53,06%** | 52,73% | 56,41% | **8,22** |
| arrivo vuoto non risvegliato — **invertita** | 98 | 46,94% | 47,27% | 43,59% | −8,22 |
| arrivo vuoto **risvegliato** (giorno/anno forte) | 7 | 71,43% | 100% | 60,00% | 24,30 |

Con l'arrivo vuoto la regola normale continua a funzionare (53,06%, come col pieno) e rende
**dieci volte di più per trade**. Invertire porta al 46,94%, sotto il caso su entrambi i periodi.
Il caso "mese che clasha invano" esiste in **6 carte**: 66,67% totale ma 100% recente / 0%
vecchio — indistinguibile dal caso.
**Carta di controllo: USDCAD 03/09/2020** — stessa configurazione (G mobile, arrivo vuoto,
mese che clasha invano, mobile debolissima) ma esito opposto: la regola normale vince.

# 27. LA MOBILE DISTRUTTA — NON SI LEGGE  ·  `FISSATA` (Edu, 13/08/2026)

Carta sorgente: **USDCAD 03/09/2020** (seme 130, sup 8 坤, inf 2 兌, mutante L2,
giorno 己酉, mese 申, anno 子).

**Conflitto risolto dentro il modulo:** 動不為空 teneva viva la mutante anche quando è
**vuota + clashata dal giorno + untimely**, mentre la regola 3 dice che in quel caso è
**eliminata**. Vince la regola 3: la mobile distrutta **non si legge**.

Sulla carta: mobile L2 官鬼 **卯**, vuota (旬空 寅卯), clashata dal giorno **酉** (卯酉冲) e
**死** nel mese 申 ⇒ distrutta. Legge invece **妻財 亥 a L5**, 相 e in alto ⇒ LONG. Il mercato
sale. ✓ (L6 子孫 酉 è escluso due volte: è C — non agisce — ed è in **自刑** col giorno 己酉.)

| | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **progressione applicata comunque** (errore) | 10 | **30,00%** | 0,00% | 33,33% |

Ignorare la distruzione e leggere la progressione **sbaglia sistematicamente**.
Carte con mobile distrutta: **36**.

# 28. CHI LEGGE AL POSTO DELLA MOBILE: LA FORZA, NON LA GERARCHIA  ·  `FISSATA`

Applicando le regole già registrate (C e B non agiscono · 自刑 dal giorno esclude ·
gerarchia G→W→P):

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **vincitore TIMELY** | 17 | **58,82%** | 57,14% | 62,50% | **+15,72** |
| gerarchia G→W→P completa | 36 | 41,67% | 41,18% | 43,75% | −12,85 |
| vincitore = W (anche non timely) | 18 | 33,33% | 25,00% | 50,00% | −17,75 |

> **Non è l'ordine dei parenti a decidere, è la forza in stagione.**
> La gerarchia applicata a linee deboli fa danno (41,67%); il criterio "chi è timely" da solo
> tiene (58,82%, sopra su entrambi i periodi).

Coerente con il principio ripetuto da Edu — *si legge ciò che è timely, ciò che è rilevante* —
e **contro** l'implementazione precedente, che metteva il parente prima della forza.
Concorda con il **capolinea G** (§20, 57,23% su 325 carte), il risultato più ampio della sessione.

---

## ⚠ PROMEMORIA OPERATIVO PER CLAUDE

Le regole registrate vanno **applicate in ogni test**, non solo ricordate. In §27-28 la
selezione dei candidati inizialmente ignorava due regole già fissate (自刑 dal giorno e
"C e B non agiscono") ed è stato Edu a doverlo segnalare. **Prima di ogni misura: rileggere
l'elenco delle regole attive e verificare che siano tutte applicate.**


# 29. 暗動 AUTOPENALIZZATA — "CHI NON VINCE PERDE"  ·  `FISSATA` (verso confermato)

Carta sorgente: **USDJPY 13/12/2023** (seme 145, sup 2 兌, inf 1 乾, mutante L3,
giorno 乙巳, mese 子, anno 卯).
Una linea clashata dal giorno vuole muoversi; se sta nel trigramma che **non muta**, il suo
arrivo è **lo stesso ramo** — non va da nessuna parte — e se il ramo è di autopenalità
(辰 午 酉 亥) si penalizza. Applicando §25 (*chi non vince perde*): **il suo trigramma perde**.
Qui: L4 妻財 **亥**, 旺 nel mese 子, clashata dal giorno 巳 (巳亥冲); la mutante è L3 quindi il
trigramma superiore non muta e l'arrivo è ancora 亥 → 亥亥自刑 → il **superiore perde** → SHORT.
Il mercato scende di 240 pip. ✓

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **暗動 autopenalizzata → il suo trigramma PERDE** | 307 | **52,77%** | 50,85% | 57,89% | 4,26 |
| *(se invece vincesse)* | 307 | 47,23% | 49,15% | 42,11% | −4,26 |
| ... linea FORTE (vibrante) | 97 | 52,58% | 47,17% | 61,54% | 4,33 |
| ... linea debole | 210 | 52,86% | 52,42% | 56,00% | 4,22 |

Verso confermato su **307 carte**, sopra il riferimento su entrambi i periodi.
⚠ **Clausola sulla vibranza NON confermata:** forte 52,58% · debole 52,86% — identiche (e la
forte è peggiore nel recente). Conta solo che la linea sia **bloccata**, non che sia vibrante.
⚠ Regola vera ma **debole**: +2,4 punti sul riferimento, non paragonabile al capolinea G.

# 30. LETTURA CON TUTTE LE REGOLE INSIEME  ·  risultato cumulativo (13/08/2026)

Ordine di precedenza applicato: **mobile distrutta → progressione 進神/退神 (con eccezione
Tai Sui) → capolinea G**.

| via | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **capolinea G** | 264 | **57,95%** | 61,74% | 55,88% | 9,08 |
| mobile distrutta → timely | 12 | 58,33% | 42,86% | 80,00% | 19,13 |
| 退神 | 395 | 54,18% | 53,33% | 57,05% | 2,90 |
| 進神 | 278 | 52,52% | 51,30% | 53,85% | 0,18 |
| **LETTURA COMPLETA** | **949** | **54,79%** | **54,49%** | **56,04%** | **4,03** |

**Il LY autonomo passa da 50,5% a 54,79% su 949 carte**, sopra il riferimento su entrambi i
periodi, +3.823 pip. La previsione del modello di Edu (*molte regole locali che, accumulate,
alzano il totale*) **si è verificata**: era a 50% stamattina con sei regole, è a 54,79% con
dodici. Il termometro concordato funziona e va aggiornato a ogni aggiunta.


---

# 31. 三會 — COMBINAZIONI DIREZIONALI  ·  `FISSATA` con la condizione del mese

**Sistema classico che mancava del tutto al modulo** (c'erano solo 六合 e mezze triadi).
寅卯辰 東方木局 · 巳午未 南方火局 · 申酉戌 西方金局 · 亥子丑 北方水局.
Quando i tre rami sono presenti fra linee e Bazi, l'elemento diventa "vibrante" e le sue
linee vincono **senza bisogno di essere generate**.

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **三會 col MESE dentro** | 406 | **53,94%** | 51,83% | 55,63% | 5,80 |
| 三會 senza il mese | 298 | 47,99% | 46,15% | 50,93% | 0,23 |
| tutte insieme | 704 | 51,42% | 49,25% | 53,73% | 3,44 |

**La 三會 vale solo se il mese ne fa parte** (sei punti di differenza): è un raduno
*stagionale* — 方合 — non un semplice incontro di rami. Le 三會 sono frequenti: 1.825 carte
ne contengono almeno una.
Collaterale: elemento formato = **B 兄弟** dà 56,49% (il migliore) — strano perché B "non
agisce", ma nel vecchio scende a 50,88%: non consolidabile.

# 32. L'ORA NEI RADUNI  ·  `BOCCIATA`

L'ora dal seme **è stata aggiunta al modulo** (`liuyao.js`, campo `oraBranch`, funzione
`oraDalSeme`) — prima non esisteva affatto nel LY, pur essendo usata dal PB.
Come **membro delle 三會**, però, peggiora:

| | senza ora | con ora |
|---|---|---|
| 三會 col mese | **53,94%** (n=406) | 50,82% (n=429) |
| mese **e** ora dentro | — | 49,69% (n=159) |
| ora senza il mese | — | 53,37% (n=163) |

# 33. IL CAPOLINEA G DRENATO DAL PROPRIO 伏神  ·  `SCOPERTA` — la cella più forte

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **capolinea G drenato dal proprio 伏神** | 126 | **60,32%** | **64,71%** | 57,47% | **11,90** |
| capolinea G non drenato | 199 | 55,28% | 58,10% | 54,22% | 6,09 |
| *(direzione opposta)* | 126 | 39,68% | 35,29% | 42,53% | −11,90 |

**60,32% su 126 carte, sopra su entrambi i periodi.** Il nascosto dietro G è **sempre P** per
costruzione elementale (G controlla il palazzo; ciò che G genera è P).
**Nessuna contraddizione con §12** (P sfavorevole): le due popolazioni sono **disgiunte** —
il capolinea è per definizione una linea che non cede a nessun elemento vivo, quindi quando
il capolinea è G il P **non è mai presente in carta** (verificato: 326/326).
⚠ Perché il P *nascosto dietro il G* dia 5 punti in più rispetto a un P nascosto altrove
resta **senza spiegazione dottrinale**. Domanda aperta.

# 34. 刑 PENALITÀ  ·  `FISSATA` — secondo sistema classico aggiunto oggi

三刑 寅巳申 (無恩之刑) · 丑戌未 (恃勢之刑) · 相刑 子卯 (無禮之刑) · 自刑 辰午酉亥.
Ipotesi di Edu: linea in 刑 col proprio 伏神 — se **entrambi forti** la penalità morde e il
suo trigramma **perde**.

| linea in 刑 col proprio 伏神 | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **entrambi DEBOLI** — sua direzione | 160 | **55,63%** | 54,64% | 58,33% | 6,39 |
| tutte | 354 | 54,24% | 53,13% | 55,38% | 6,21 |
| **entrambi FORTI** — sua direzione | 53 | **49,06%** | 50,00% | 47,22% | 7,45 |

**Confermata**: forti ⇒ penalità attiva ⇒ il trigramma perde (49,06%); deboli ⇒ penalità
inerte ⇒ il trigramma vince (55,63%). Sei punti e mezzo di differenza, verso coerente sui
due periodi.
⚠ È specifico del rapporto **linea ↔ proprio 伏神**: il 刑 con un ramo del **Bazi** non
funziona (49,06% su 1.333 carte).

# 35. VERIFICA MIRATA — 伏神 父母 巳 dietro G 官鬼 寅

Richiesta da Edu. **326 carte** con la configurazione esatta.

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| totale — direzione del suo trigramma | 326 | 53,99% | 52,45% | 55,43% | 5,78 |
| **UNTIMELY** — direzione del suo trigramma | 217 | **55,30%** | 54,17% | 57,45% | 5,23 |
| TIMELY — direzione del suo trigramma | 109 | 51,38% | **43,48%** | 53,09% | 6,88 |

**È l'untimely a vincere**, non il timely — controintuitivo rispetto a §28.
La spiegazione è arrivata da Edu: **寅 e 巳 formano una penalità** (parte di 寅巳申). Quando
sono forti la penalità è attiva e lo short perde; quando sono deboli non morde.
⚠ Limite strutturale: nel campione la linea è **sempre a L2**, quindi la direzione è sempre
SHORT — la cella non distingue "il trigramma inferiore vince" da "in queste condizioni il
mercato scende". Le carte sono inoltre addensate in periodi contigui (stesso Bazi), quindi la
correlazione fra osservazioni è alta.

# 36. FLUSSO A CASCATA  ·  `BOCCIATA` — e stato della §29

Edu **ritira** l'autopenalità della linea non mobile clashata (§29) e la sostituisce: una
linea non mobile clashata, col ramo futuro identico, **cede energia a chi può prenderla**,
specialmente se adiacente, formando una cascata; la direzione viene dalla linea terminale.

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| cascata → direzione della terminale | 1624 | 47,84% | 48,57% | 46,98% | −2,00 |
| *(direzione opposta)* | 1624 | 52,16% | 51,43% | 53,02% | 2,00 |
| cascata di 2 passi | 318 | 44,34% | 50,33% | 39,24% | −3,26 |
| cascata di 3 passi | 21 | 33,33% | 36,84% | 0,00% | −10,45 |

Peggiora quanto più la cascata è lunga. **Bocciata.**
⚠ **§29 resta in sospeso**: nella forma "il trigramma della linea bloccata perde" misurava
**52,77% su 307 carte**, positiva su entrambi i periodi, ma Edu la ritiene dottrinalmente
sbagliata e l'ha ritirata. La sostituta misura 47,84%. **Decisione non presa.**

## Carta completa — USDJPY 16/01/2024 (lettura confermata da Edu)
seme 145, sup 2 兌, inf 1 乾, mutante L1, giorno 己卯, mese 丑, anno 卯, ora dal seme 子,
palazzo 坤, vuoti 申酉. Mercato **+139 pip** (LONG); PB diceva SHORT e perde.
1. **L4 妻財 亥 è timely di suo** (inverno) e, in mancanza di opposizione più energetica,
   prevale → trigramma superiore → LONG
2. la **penalità 寅巳 su L2** è forte e fa perdere lo SHORT
3. la **combinazione 子丑 su L1** rende la linea inutilizzabile e peggiora lo SHORT


---

# 37. TIMELY vs FORTE — LA DISTINZIONE FONDAMENTALE  ·  `FISSATA` (Edu, 13/08/2026)

> **TIMELY** (dal mese) = effetto **ampio e generalizzato**: coinvolge tutti gli attori
> dell'esagramma, nel bene e nel male.
> **FORTE** (da giorno e anno) = effetto **concentrato ma poco diffuso**: agisce su una linea
> per via diretta, non sulle altre.
> Giorno e anno sono *forti* ma **non** *timely*.

Questa distinzione scioglie la contraddizione emersa in §34/§FORZAB, dove "entrambi forti"
cambiava di segno a seconda della definizione usata: mescolava due meccanismi diversi.

## 37a. TIMELINESS DOPPIA — i mesi di Terra

Il timeliness è dato dal mese in **due modi**: il suo **elemento** e la sua **stagione**.
Coincidono in otto mesi su dodici; divergono nei quattro mesi di Terra:

| mese | elemento | stagione | timely insieme |
|---|---|---|---|
| 辰 | Terra | primavera (Legno) | Terra + Legno |
| 未 | Terra | estate (Fuoco) | Terra + Fuoco |
| 戌 | Terra | autunno (Metallo) | Terra + Metallo |
| 丑 | Terra | inverno (Acqua) | Terra + Acqua |

*(Esempio di Edu: 丑 è Terra e rende timely la Terra, ma è anche inverno e rende timely
l'Acqua — Acqua con Terra crea la fanghiglia.)*

**Misura — stesso tasso, copertura molto maggiore:**

| | n | tutto | recente | vecchio | pip |
|---|---|---|---|---|---|
| Ricchezza timely unica — **semplice** | 652 | 55,83% | 52,20% | 60,53% | +3.890 |
| Ricchezza timely unica — **doppia** | 823 | 55,77% | 51,56% | 62,24% | **+4.828** |
| mesi di Terra — semplice | 169 | 54,44% | 53,64% | 53,19% | +466 |
| mesi di Terra — **doppia** | 340 | **55,00%** | 51,47% | 61,90% | **+1.405** |

+171 carte allo stesso livello; nei mesi di Terra la copertura **raddoppia** (169→340) e i pip
**triplicano**. È il comportamento atteso da una definizione più corretta: più linee attive
riconosciute, stessa affidabilità.
⚠ Il modulo usa ancora `stagione()` con il solo elemento del mese: **da aggiornare in
liuyao.js e nel motore**.

# 38. 刑 — SCOMPOSIZIONE PER TIPO DI FORZA  ·  `FISSATA`

(S = forte in stagione · B = forte solo per sostegno del Bazi · − = nessuna delle due;
prima lettera = linea, seconda = suo 伏神)

**Quando è il NASCOSTO ad avere la forza stagionale, la penalità morde → il trigramma perde:**

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **−S** → direzione OPPOSTA | 23 | **65,22%** | 71,43% | 55,56% | 26,88 |
| **SB** → direzione OPPOSTA | 32 | 62,50% | 58,33% | 66,67% | 24,51 |
| **−−** → direzione OPPOSTA | 26 | 61,54% | 64,29% | 58,33% | 15,67 |

**Quando è la LINEA a essere sostenuta dal Bazi, il suo trigramma vince:**

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **B−** → sua direzione | 18 | **77,78%** | 100% | 69,23% | 31,42 |
| **BS** → sua direzione | 54 | 59,26% | 65,00% | 55,88% | 9,27 |
| **BB** → sua direzione | 72 | 58,33% | 57,14% | 62,96% | 6,37 |

Il criterio non è "entrambi forti" ma **chi ha la forza e di che tipo**.
⚠ La cella **BB** (58,33%) sbaglia la carta sorgente USDCAD 20/09/2022, dove la lettura di Edu
dà LONG: lì il Tai Sui 寅 sostiene il G e il nascosto 巳 è a sua volta sostenuto, ma la
direzione la determina **L5 妻財 亥 timely** (mese 酉 lo genera, giorno 子 è suo pari).
Due meccanismi distinti che agiscono insieme: il Tai Sui con forza **concentrata** tiene viva
la penalità; L5 con effetto **ampio** determina la direzione.

# 39. TERMOMETRO — dopo la rimozione del 進神

Il 進神 rendeva −0,61 pip/trade ed è stato **rimosso** dalla catena.

| via | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| capolinea G **drenato** | 126 | **60,32%** | 64,71% | 57,47% | 11,90 |
| mobile distrutta | 12 | 58,33% | 42,86% | 80,00% | 19,13 |
| capolinea G | 198 | 55,56% | 58,10% | 54,88% | 6,31 |
| 退神 | 350 | 54,57% | 54,07% | 57,36% | 2,18 |
| 三會 col mese | 468 | 54,49% | 52,28% | 56,72% | 6,19 |
| 刑 col 伏神 (deboli) | 102 | 51,96% | 49,25% | 58,82% | 3,90 |
| **TOTALE** | **1256** | **55,10%** | **54,00%** | **57,06%** | **5,60** |

**Progressione della giornata:** 50,4% (8 euristiche, 4.111 carte) → 50,5% (6 regole) →
54,79% (12 regole, 949 carte) → 54,47% (con 三會 e 刑, 1.454) → **55,10% (1.256, +7.039 pip)**.
Togliendo il 進神, le sue carte sono passate alla 三會 che è salita da 53,72% a 54,49%.
⚠ Prossimo candidato al taglio: **刑 col 伏神 (deboli)**, 51,96%.


---

# 40. IL GRUPPO PEGGIORE — "4 LINEE NON AGIBILI"

Ricerca sui gruppi strutturali: il peggiore per il PB è **quattro linee su sei non agibili**
(legate, rotte, dormienti, eliminate, autocombinate): **47,78% su 90 carte**, pip ≈ 0.
Altri gruppi deboli: Shi in stato "mossa" 48,00% · mese 巳 49,54% · mese 寅 49,59% ·
palazzo 巽 51,01% · mutante a L5 51,97% · Shi=G 52,05% · mutante=P 52,41%.

# 41. 飛神空伏神出 — IL NASCOSTO DIETRO UNA COPERTURA VUOTA  ·  `SCOPERTA`

Carta sorgente: **USDJPY 15/01/2025** (seme 158, sup 3 離, inf 6 坎, mutante L6,
giorno 甲申, mese 丑, anno 辰, ora 丑, palazzo 離, vuoti 午未). Mercato **−159 pip** (SHORT).
Principio classico: quando la linea che copre è **vuota**, è *trasparente* e il 伏神 emerge.

**È la COMBINAZIONE dei due fattori a contare, non il nascondimento né il vuoto da soli:**

| G | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **nascosto sotto copertura VUOTA** | 75 | **36,00%** | 32,65% | 40,91% | −11,25 |
| nascosto sotto copertura PIENA | 417 | 51,56% | 51,67% | 53,16% | 3,94 |
| visibile, linea vuota | 303 | 50,17% | 49,11% | 53,91% | −1,97 |
| visibile, linea piena | 1757 | 51,00% | 48,88% | 54,77% | 2,09 |

Tre celle su quattro stanno al 50-51%; **solo il G sotto copertura vuota crolla a 36,00%**,
su entrambi i periodi. Specifico di G: dietro copertura vuota P dà 54,55%, C 51,56%,
W 47,47%, B 49,21%.
Il **sostegno del giorno non lo salva**: 32,14% su 28 carte (vs 38,30% senza sostegno) —
coerente con §37 (il giorno è *forte* ma non *timely*: agisce in modo concentrato, e un G
sotto copertura vuota non è in condizione di usarlo).
⚠ Limite strutturale: nel campione la copertura è **sempre a L3**, quindi la direzione è
sempre SHORT.

# 42. IL SALTO DELLA LINEA CLASHATA  ·  `FISSATA`

Carta sorgente: **USDJPY 15/01/2025** — L1 父母 **寅** clashato dal giorno **申** (寅申冲)
*salta* a combinarsi (寅亥合) con il **伏神 官鬼 亥** esposto dietro L3 vuoto. Entrambi nel
trigramma inferiore → SHORT. ✓
Una linea clashata dal giorno non resta ferma: **salta a combinarsi** con un'altra linea o con
un nascosto esposto. **Conta dove ARRIVA, non da dove parte.**

| bersaglio del salto (linea visibile) | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **妻財 W** | 138 | **57,25%** | 56,25% | 60,71% | **9,73** |
| 兄弟 B | 144 | 54,86% | 53,09% | 56,14% | 0,52 |
| 官鬼 G | 123 | 51,22% | 49,12% | 55,74% | 1,91 |
| 父母 P | 103 | 47,57% | 45,45% | 51,11% | −5,58 |
| 子孫 C | 72 | 44,44% | 40,00% | 51,85% | −12,07 |
| *direzione del bersaglio (tutti)* | 580 | 52,07% | 50,00% | 55,69% | 0,36 |
| *direzione della sorgente* | 580 | 47,93% | 50,00% | 44,31% | −0,36 |
| **nessun bersaglio** — sorgente | 797 | 49,44% | 48,42% | 49,54% | −4,35 |

Il salto su **W paga (57,25%)**; su C e P no — gli stessi parenti che "non svolgono ruolo".
Il clash **senza destinazione non produce nulla** (49,44%), coerente con la misura sul P
quieto clashato (§43).

# 43. IL SALTO MIGLIORA IL G, MA SOLO SE HA FORZA  ·  `FISSATA`

| G (unico visibile) | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **bersaglio · forte dal Bazi** | 19 | **63,16%** | 50,00% | 69,23% | 3,37 |
| **bersaglio · timely** | 25 | **60,00%** | 50,00% | 69,23% | 14,25 |
| bersaglio · debole | 8 | 50,00% | 50,00% | 50,00% | 8,39 |
| non bersaglio · forte dal Bazi | 630 | 52,70% | 52,46% | 53,26% | 1,44 |
| non bersaglio · timely | 995 | 50,85% | 48,42% | 55,43% | 1,74 |
| non bersaglio · debole | 383 | 46,74% | 44,73% | 52,21% | −0,13 |

**Il salto aggiunge ~10 punti a parità di forza** (timely 50,85→60,00; forte 52,70→63,16) e
**non aggiunge nulla a un G debole** (50,00%): porta energia solo a chi può riceverla.
⚠ 19 e 25 carte; in entrambe le celle il **recente sta a 50,00% esatto** e tutto il vantaggio
viene dal vecchio.

## 43a. E se il G è ESPOSTO (copertura vuota)?  ·  `IN OSSERVAZIONE` — 5 carte

| | copre | nascosto | forza | esito |
|---|---|---|---|---|
| USDJPY 19/02/2021 | L3 辰空 | 官鬼 酉 | forte (Bazi) | giusto +21 |
| USDJPY 06/04/2021 | L3 午空 | 官鬼 亥 | forte (Bazi) | giusto +40 |
| NZDUSD 04/04/2024 | L3 辰空 | 官鬼 酉 | forte (Bazi) | sbagliato −12 |
| **USDJPY 15/01/2025** | L3 午空 | 官鬼 亥 | **timely** | **giusto +159** |
| USDJPY 11/03/2026 | L3 午空 | 官鬼 亥 | forte (Bazi) | sbagliato −72 |

Tre giuste, due sbagliate. La cella "timely" contiene **una sola carta**. Ma il contrasto con
le celle vicine è forte: G esposto **senza** salto sta al **31-36%** in tutte e tre le fasce di
forza, coerente sui due periodi; **con** il salto sale al 50-60%.
**Verso compatibile con l'ipotesi di Edu, campione insufficiente per confermarla.**
Configurazione rarissima: ~1 carta ogni 800. Da seguire in avanti.

## Conclusione di Edu sulla carta sorgente
> *La carta è comunque risolta: **G è salvo e lo short è confermato**.*
Su USDJPY 15/01/2025 il G 亥, esposto dalla copertura vuota 午 e raggiunto dal salto di
L1 寅 (寅亥合), è timely per stagione nel mese 丑 (inverno = Acqua) e regge la lettura:
trigramma inferiore → SHORT. Il mercato scende di 159 pip. ✓


---

# 44. IL TAI SUI BLOCCA LA PARTENZA: LA LINEA NON PARTE  ·  `FISSATA`

**Correzione logica di Edu (assoluta):** se la combinazione blocca la **partenza**, la linea
non parte affatto — quindi **non può esserci alcuna mutazione**, e non può rafforzarsi con un
回頭生. Le due cose non possono coesistere.
*(Claude aveva proposto una lettura incoerente: "bloccata ma rafforzata". Ritirata.)*

**Misura — la mobile G o W bloccata sulla partenza dal Tai Sui:**

| | n | tutto | recente | vecchio |
|---|---|---|---|---|
| G — vince | 41 | 48,78% | 44,12% | 71,43% |
| G — perde | 41 | 51,22% | 55,88% | 28,57% |
| W — vince | 70 | 48,57% | 40,00% | 52,27% |
| W — perde | 70 | 51,43% | 60,00% | 47,73% |

**Nessun segnale in nessuna direzione**: tutte fra 48,5% e 51,4%, con i due periodi che si
contraddicono violentemente. Coerente con la dottrina: **una linea che non parte non fa
niente** — né vince né perde; il suo trigramma resta muto e la direzione si decide altrove.

⚠ **Il 66,67% della cella "回頭生 + blocco della partenza" (§43-bis, n=42) resta senza
meccanismo.** Il 回頭生 lì è solo un'etichetta sulla relazione elementale ramo↔trasformato,
non un processo avvenuto. Usabile come filtro calcolabile, **ma è correlazione senza causa
identificata**.

**Dato collaterale ampio e stabile: G mobile LIBERA = 46,57%** su 758 carte (47,47% / 44,92%),
−4,97 pip/trade. **Un Ufficiale che si muove liberamente fa perdere il suo trigramma** —
l'opposto del G *capolinea*, fermo, che accumula (57-60%).
> **G vale da fermo, non in movimento** — come P, ma per ragione opposta:
> **P vale quando cede, G quando trattiene.**

# 45. IL TAI SUI BLOCCA L'ARRIVO — SCOPERTA  ·  `FISSATA`

Qui la partenza è **libera**: la linea parte davvero, e il Tai Sui combina il ramo d'**arrivo**.
Meccanismo coerente (a differenza di §44): il movimento avviene, ma la destinazione è chiusa.

Caso generale piatto (51,22% su 369 carte), **ma la scomposizione per parente separa
nettamente e ricalca la dottrina della giornata:**

| la mobile è... | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **C 子孫** | 40 | **65,00%** | 66,67% | 60,00% | 20,09 |
| B 兄弟 | 114 | 56,14% | 59,76% | 48,28% | 3,72 |
| W 妻財 | 83 | 55,42% | 46,67% | 62,86% | −6,65 |
| **P 父母** | 78 | **39,74%** | 42,55% | 37,50% | −14,25 |
| **G 官鬼** | 54 | **40,74%** | 43,75% | 31,58% | −9,81 |

**Con l'arrivo bloccato, C e B vincono il loro trigramma; G e P lo perdono** — su entrambi i
periodi (tranne W, instabile). È il **rovescio esatto** della gerarchia usata tutto il giorno.
Lettura: **G e P devono ARRIVARE da qualche parte per contare**; se la destinazione è chiusa
restano a metà strada. C e B non andavano da nessuna parte comunque, e il blocco non toglie
loro nulla.

## 45a. LA CELLA PIÙ FORTE DELLA GIORNATA

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **回頭生 con ARRIVO bloccato dal Tai Sui** | 44 | **72,73%** | 70,73% | **100%** | 11,14 |

**Meccanismo coerente:** la partenza è libera ⇒ la linea parte; l'arrivo la genera all'indietro
(回頭生) e la rafforza; il Tai Sui blocca l'arrivo, che non può andare oltre ⇒ **l'energia resta
nella linea di partenza**, che domina il suo trigramma.
Confronto interno: caso 1 (回頭生) 72,73% · caso 2 (泄) 48,72% · caso 0 47,06% · caso −1 49,37%
· caso −4 51,85%. **È specifico del 回頭生.**
⚠ 44 carte. Da seguire in avanti, ma il meccanismo è chiaro e i due periodi sono allineati.


---

# 46. IL TAI SUI URTATO DALL'ARRIVO — CHI LO SCONTRA PERDE  ·  `FISSATA`

La partenza è **libera** (la linea parte davvero) e l'**arrivo CLASHA** il ramo dell'anno.

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **il suo trigramma PERDE** | 301 | **55,15%** | 55,48% | 57,60% | **7,13** |
| *(se invece vincesse)* | 301 | 44,85% | 44,52% | 42,40% | −7,13 |

**301 carte**, sopra il riferimento su entrambi i periodi, +2.147 pip.
Una linea che parte e va a sbattere contro l'anno **non conquista il suo trigramma: lo perde**.

**Per parente** (colonna = "vince"):

| la mobile è... | n | vince | pip/tr |
|---|---|---|---|
| **B 兄弟** | 73 | **36,99%** | −18,31 |
| C 子孫 | 18 | 38,89% | −12,41 |
| **G 官鬼** | 92 | **41,30%** (41,38 / 41,38) | −7,19 |
| W 妻財 | 56 | 46,43% | −2,46 |
| **P 父母** | 62 | **59,68%** | +3,42 |

Quattro parenti su cinque perdono. **G perde con 41,30% identico sui due periodi.**
L'unico che regge è **P** — coerente con tutta la giornata: non essendo un attore e non
pretendendo di arrivare da nessuna parte, non ha nulla da perdere nell'urto.

## Le due facce del Tai Sui
> **Il Tai Sui che FERMA conserva; il Tai Sui che viene URTATO distrugge.**
> - arrivo **bloccato** dal Tai Sui + 回頭生 → **72,73%** (l'energia resta dentro la linea)
> - arrivo che **clasha** il Tai Sui → **44,85%** (l'energia si disperde nell'urto)

# 47. IL TAI SUI SU DUE FRONTI — CHI È IMPEGNATO DUE VOLTE NON TIENE  ·  `FISSATA`

Carta sorgente: **EURJPY 13/12/2024** (seme 159, sup 3 離, inf 7 艮, mutante L4, giorno 辛亥,
mese 子, anno 辰). Mobile L4 妻財 **酉 → 戌**: il Tai Sui 辰 **combina la partenza** (辰酉合)
**e riceve l'urto dell'arrivo** (辰戌冲). Configurazione esclusa da entrambe le misure
precedenti (§45 e §46), perché in quelle la partenza doveva essere libera o bloccata, non
entrambe le cose insieme.

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **partenza combinata + arrivo che urta → il trigramma VINCE** | 109 | **55,96%** | 54,24% | 57,14% | 4,82 |
| *(il trigramma perde)* | 109 | 44,04% | 45,76% | 42,86% | −4,82 |

**Il verso si ROVESCIA rispetto al clash semplice** (§46: perde, 44,85%). Undici punti di
differenza in direzione opposta.
**Lettura:** quando il Tai Sui è impegnato su **due fronti** — trattiene la partenza e para
l'urto dell'arrivo — **non riesce a fare nessuna delle due cose**, e la linea la spunta.
È lo stesso principio del **争合** (§21): chi è preso da due impegni contemporanei non ne
onora nessuno.
Su EURJPY 13/12/2024 dà **LONG** (L4 superiore, vince) — direzione corretta, +155 pip.

⚠ **Limite serio da tenere presente:** le 109 carte sono quasi tutte **丑→午 con anno 子**,
concentrate nel 2020. La configurazione dipende dal ramo dell'anno, quindi le osservazioni
sono **fortemente correlate** — statisticamente valgono molto meno di 109 indipendenti.

## Quadro riassuntivo del Tai Sui (13/08/2026)

| configurazione | esito | n | % |
|---|---|---|---|
| blocca la **partenza** | la linea non parte, nessun segnale | 340 | 51,47% |
| blocca l'**arrivo** (partenza libera) | dipende dal parente: C/B vincono, G/P perdono | 369 | 51,22% |
| blocca l'arrivo **+ 回頭生** | il trigramma vince nettamente | 44 | **72,73%** |
| **urtato** dall'arrivo (partenza libera) | il trigramma perde | 301 | **55,15%** (perde) |
| trattiene la partenza **e** subisce l'urto | non tiene: il trigramma vince | 109 | **55,96%** |


---

# 48. GRANDE TEST PB + LY  ·  `FISSATA` — il primo abbinamento completo (14/08/2026)

Impianto (idea di Edu): il PB decide come sempre; il termometro LY completo (55,10%) fa da
correttivo — **convalida** i positivi, **risolve** i casi dubbi, e nel **contrasto** decide.
La politica del contrasto è stata misurata, non scelta a priori.

Su 4.111 carte: concordi 620 · contrasti 612 · LY tace 2.879 · PB deboli 933.

## Il contrasto: vince il LY

| contrasto (612 carte) | tutto | recente | vecchio |
|---|---|---|---|
| vince PB | 46,08% | 47,95% | 44,36% |
| **vince LY** | **53,92%** | 52,05% | 55,64% |

Quando PB e LY si oppongono, il PB ha ragione meno di metà delle volte, su entrambi i periodi.
Il no-trade equivale al "vince PB" come conteggio ma lascia i pip sul tavolo: **override LY
batte no-trade**.

## La convalida e lo spareggio

- **Concordanza** (620 carte): 53,51% → **56,77%** (58,65% nel vecchio). La concordanza è un
  marchio di affidabilità del trade.
- **PB deboli** (933 carte, verdetto = base): lasciare decidere il LY dà **56,06%** (z 3,70) —
  il LY è più bravo del PB proprio dove il PB è incerto. I PB già forti restano a 53,85%.

## I tre sistemi combinati completi

| sistema | n | tutto | z | recente | vecchio | pip |
|---|---|---|---|---|---|---|
| PB da solo (baseline) | 4.111 | 53,51% | 4,51 | 53,28% | 54,39% | +17.221 |
| **S1 — override LY nel contrasto** | 4.111 | 54,68% | **6,00** | 53,85% | 56,19% | **+23.040** |
| S2 — salto i contrasti | 3.499 | 54,82% | 5,70 | 54,15% | 56,29% | +20.131 |
| **S3 — LY spareggia i deboli** | 4.111 | 54,73% | **6,07** | 53,63% | 56,43% | +21.467 |

Tutti e tre battono il PB da solo su entrambi i periodi. Migliore per z: **S3** (6,07);
migliore per pip: **S1** (+23.040, quasi 6.000 sopra il baseline).

## ⚠ AVVERTENZA METODOLOGICA (essenziale)

**Questo è un risultato IN-SAMPLE.** Le regole LY sono nate su questo stesso periodo leggendo
carte a posteriori: lo z 6 qui è il tetto ottimistico, NON lo z atteso in avanti. Il segnale
affidabile è la **coerenza fra i due periodi**: il contrasto perde col PB e vince col LY su
entrambi; tutte e tre le combinazioni migliorano su entrambi. Quella coerenza è ciò che può
sopravvivere fuori campione; il valore assoluto di z no.

Conclusioni strutturali: PB e LY catturano cose **diverse** (concordano solo su 620 carte su
4.111; il LY tace sul 70%); dove il LY parla, migliora il PB in modo consistente nel tempo.
Prossimo passo naturale: verifica sul **holdout** (mai toccato) quando Edu decide che il
sistema è congelato, e osservazione forward di S1/S3.


---

# 49. IL TAI SUI CHE METTE IN MOTO UN UFFICIALE  ·  `FISSATA` (14/08/2026)

Carta sorgente: **EURJPY 11/07/2024** (seme 175, sup 5 巽, inf 7 艮, mutante L1, giorno 丙子,
mese 未, anno 辰, palazzo 艮 Terra). Mercato **−233 pip** (SHORT); il LY, leggendo l'Ufficiale
*fermo* a L6, diceva LONG e perdeva.

**La lettura di Edu:** ci sono DUE Ufficiali (官鬼). Uno **fermo** a L6 (卯, oggetto 應, non
timely — statico). Uno **messo in moto dal Tai Sui**: la mobile L1 è il Tai Sui 辰 e muta in
卯 (回頭剋), cioè in Legno = Ufficiale. Fra i due comanda **il più dinamico**: quello attivato
dal Tai Sui. Principi già fissati che si combinano: (a) *ciò che fa il Tai Sui è importante*;
(b) *una linea mobile che si muove è azione*. → linea a L1, trigramma inferiore → **SHORT**. ✓

**Misura — la lettura di Edu batte quella statica, e i due periodi sono allineati:**

| | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **Tai Sui mobile che muta in Ufficiale — sua direzione** | 57 | **57,89%** | 61,76% | 52,63% | 16,71 |
| (confronto) leggo l'Ufficiale FERMO invece | 34 | 52,94% | 42,11% | 66,67% | −4,20 |

L'Ufficiale fermo dà 52,94% ma con i periodi che si contraddicono (42,11 / 66,67): non
utilizzabile. L'Ufficiale attivato dal Tai Sui dà **57,89% con entrambi i periodi sopra il
riferimento**, +953 pip, 16,71 pip/trade (fra le rese per trade più alte trovate).

**Conferma del principio timely/forte (§37):**

| | n | tutto | recente | vecchio |
|---|---|---|---|---|
| arrivo Ufficiale **non timely** | 31 | **64,52%** | 63,16% | 63,64% |
| arrivo Ufficiale timely | 26 | 50,00% | 60,00% | 37,50% |

Il caso più forte è l'Ufficiale **non timely** (64,52%, periodi quasi identici 63/63): quando
l'Ufficiale non ha già forza ampia di stagione, è il **movimento concentrato impresso dal Tai
Sui** a fare la differenza. Se fosse già timely, l'azione dell'anno aggiunge poco.

Implementazione: la mobile è il Tai Sui (isTaiSui) e il suo ramo di arrivo ha l'elemento
Ufficiale del palazzo (l'elemento che controlla l'elemento del palazzo). Direzione dalla
posizione della mobile.
⚠ 57 carte. Verso solido su entrambi i periodi; da confermare in avanti.

## Nota di metodo (Edu, 14/08/2026)
Il codice cercava l'Ufficiale come **linea statica** e sbagliava; Edu legge la **dinamica** —
chi mette in moto chi. Le carte non sono "difficili": la lettura meccanica per classificazione
fallisce dove quella per movimento riesce. Ricordarsi di guardare SEMPRE il ramo di arrivo
della mutazione come possibile secondo attore (qui un secondo Ufficiale), non solo le linee
presenti.


---

# 50. IL TAI SUI CHE COMBINA A DISTANZA — LETTURE DOTTRINALI E MISURE (14/08/2026)

Filone esplorato a lungo. **Le letture di Edu sulle singole carte sono corrette e vanno
conservate**; ciò che NON emerge è un segnale direzionale autonomo misurabile.

## 50a. Le letture (dottrina — da conservare e riusare)

**(1) Il Tai Sui si muove verso dove ATTERRA la mutazione.** Non conta se la partenza è
sospesa: conta il ramo di ARRIVO e con chi si combina (六合).
- *USDJPY 15/11/2024*: Tai Sui-Ricchezza L3, 辰→亥; 亥 combina 寅 = oggetto (應) a L2 →
  trigramma inferiore → SHORT. Mercato −213. ✓
- *USDJPY 30/10/2025*: Tai Sui-Ufficiale L2, 巳→辰; 辰 combina 酉 = soggetto (世) a L4 →
  trigramma superiore → LONG. Mercato +133. ✓ (la partenza 巳 era combinata dal giorno 申 e
  il motore la dava "sospesa": **conta comunque l'arrivo**).

**(2) Una linea VUOTA non può ricevere la direzione.** *USDJPY 12/02/2025*: il Tai Sui atterra
combinando 卯 = Ricchezza L3 **vuota e dormiente** → non può shortare. Principio già fissato
(旬空), qui riconfermato.

**(3) IL CIRCUITO CHIUSO** — *EURUSD 05/03/2025* (seme 106, sup 5 巽, inf 2 兌, mutante L5,
giorno 癸酉, mese 寅, anno 巳, palazzo 艮, vuoti 戌亥). Catena:
**巳 (Tai Sui L5) → 子 (arrivo) → 丑 (Fratelli L3) → 申 (伏神 Figli nascosto in L3) → 巳**.
Il circuito **si richiude sul Tai Sui di partenza**: si legge la posizione dell'ORIGINE (L5),
non quella della prima tappa (L3). L5 = trigramma superiore → **LONG**. Mercato +166. ✓
> La catena non si ferma al bersaglio: se il bersaglio nasconde una linea che rimanda al punto
> di partenza, si legge dove il circuito **si chiude**.
⚠ **Struttura rarissima: 1 carta su 4.111.** Conservata per il futuro, non misurabile ora.

## 50b. Le misure (nessun segnale autonomo)

| condizione | n | tutto | recente | vecchio |
|---|---|---|---|---|
| arrivo del Tai Sui combina una linea — dir. bersaglio | 157 | 51,59% | 47,78% | 55,74% |
| ... bersaglio NON vuoto | 129 | 51,16% | 47,30% | 55,10% |
| ... bersaglio vivo e agibile | 102 | 47,06% | 45,16% | 47,22% |
| ... bersaglio = soggetto (世) | 27 | 55,56% | **22,22%** | 70,59% |
| ... bersaglio = oggetto (應) | 29 | 41,38% | 47,83% | 16,67% |
| capolinea della catena (invece della prima tappa) | 157 | 52,23% | 48,89% | 55,74% |

**Le catene sono quasi sempre di UN passo** (156 su 157): il bersaglio non ha nascosto, o il
nascosto non rimanda a una linea presente. Quindi "capolinea" e "prima tappa" coincidono.
Filtrare per il vuoto **non migliora** (51,59 → 51,16); restringere ai bersagli agibili
**peggiora** (47,06%).

**Conclusione onesta:** la combinazione *a distanza* del Tai Sui è dottrina corretta ma non
isola un edge; resta inchiodata al 51-52% con il recente sempre sotto il riferimento.
Diverso dalla §49, dove il Tai Sui **muta NELL'ELEMENTO** Ufficiale e diventa esso stesso un
attore: lì 57,89% con entrambi i periodi sopra. **Mutazione in elemento = attore misurabile;
combinazione a distanza = legame debole.**

## 50c. Nota tecnica — confine dei termini solari (惊蛰)
Su EURUSD 05/03/2025 è emerso il dubbio se la carta andasse scartata per clash giorno↔mese.
**No**: il 惊蛰 2025 entra alle **08:07 GMT** del 5 marzo, cioè **487 minuti DOPO** l'apertura
della carta (00:00 GMT). Alle 00:00 GMT il mese è ancora **寅**, non 卯. Giorno 酉 vs mese 寅 =
nessun clash. (Se il mese fosse stato 卯 → 卯酉冲 → carta scartata.)
Pilastri verificati: anno 乙巳 · mese 戊寅 · giorno 癸酉.
⚠ **Tutto va sempre espresso in GMT.** La libreria lunar-javascript emette gli istanti dei
termini in orologio di Pechino e `jieqi-gmt.js` converte (−8h) prima del confronto: quella è
l'unica conversione, tutto il resto del sistema è GMT/TST.
Il filtro SKIPCLASH=gm scarta le carte con clash giorno↔mese **prima** che entrino nel dataset:
tutte le misure del Liu Yao sono già al netto di quelle.


---

# 51. LA TOMBA (墓) — L'ATTORE SEPOLTO SI SPEGNE  ·  `FISSATA` (14/08/2026)

Carta sorgente: **USDJPY 30/07/2024** (seme 153, sup 3 離, inf 1 乾, mutante L6, giorno 乙未,
mese 未, anno 辰, palazzo 乾 Metallo). L'Ufficiale (官鬼) mobile 巳 Fuoco a L6 muta in **戌 =
tomba del Fuoco (火墓)**; non c'è un 卯 su cui atterrare, quindi non prosegue: **entra nella
tomba e si spegne** → non porta la direzione in alto → non va Long. (In più 戌 clasha il Tai
Sui 辰 a L3, asse delle tombe 辰戌.)

**Le quattro tombe (墓库):** 辰 = tomba Acqua · 戌 = tomba Fuoco · 丑 = tomba Metallo ·
未 = tomba Legno. Una linea mobile che muta nel ramo-tomba del **proprio** elemento vi entra.

## 51a. L'Ufficiale in tomba — `FISSATA`

| Ufficiale (官鬼) in tomba — leggo l'OPPOSTO | n | tutto | recente | vecchio | pip/tr |
|---|---|---|---|---|---|
| **totale** | 42 | **57,14%** | 62,96% | 54,55% | 3,90 |
| per elemento: Acqua → 辰 | 10 | 70,00% | 71,43% | 66,67% | 19,41 |
| per elemento: Fuoco → 戌 | 32 | 53,13% | 60,00% | 50,00% | −0,95 |
| e la tomba clasha il Tai Sui | 21 | 57,14% | 57,14% | — | 9,95 |

Legno→未 e Metallo→丑 **strutturalmente assenti** nel campione (0 carte): l'Ufficiale è
l'elemento che controlla il palazzo, e quelle combinazioni non si presentano mai. Regola
coerente col principio ma non verificabile per quei due elementi.

## 51b. SCOPERTA CONTROINTUITIVA — è l'Ufficiale VIBRANTE che si spegne

La clausola classica dice: un elemento **vibrante** in stagione NON entra in tomba. I dati
dicono l'**opposto** per l'Ufficiale:

| Ufficiale in tomba | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **VIBRANTE — leggo l'opposto (si spegne)** | 21 | **66,67%** | 66,67% | 100,00% |
| vibrante — leggo il suo trigramma | 21 | 33,33% | 33,33% | 0,00% |
| non vibrante — leggo l'opposto | 21 | 47,62% | 58,33% | 37,50% |

**Lettura (coerente con timely/forte §37):** seppellire un Ufficiale **vibrante** è un evento
FORTE — tanta energia spenta di colpo, effetto netto. Un Ufficiale già debole in tomba non fa
notizia: era già spento. La tomba morde di più quando c'è qualcosa di grosso da seppellire.
⚠ 21 carte; contraddice un principio classico, quindi cautela. Ma verso coerente sui due
periodi (vibrante: 66,67 / 100,00).

## 51c. Gli altri parenti — attori vs passivi

| parente in tomba (opposta) | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **Fratelli NON vibrante** | 28 | **64,29%** | 61,54% | 64,29% |
| Fratelli vibrante | 35 | 42,86% | 31,58% | 56,25% |
| Ricchezza (totale, suo trigramma) | 15 | 53,33% | 55,56% | 40,00% |
| Genitori / Figli | 30 / 9 | — | (contraddittori) | — |

**La tomba distingue due famiglie:**
- **Ufficiale** (azione pura) → si spegne quando è **VIBRANTE** (66,67%)
- **Fratelli** (passivo) → si spegne quando è **DEBOLE** (64,29%, entrambi i periodi)
- **Ricchezza** (bene passivo) → tende a **mantenere** la direzione, non si spegne (53,33%,
  suo trigramma) — coerente ma 15 carte
- Genitori, Figli → campioni insufficienti, non concludibili

È lo stesso asse di tutta la giornata: l'Ufficiale che agisce viene fermato dalla tomba
proprio quando ha più forza; i parenti passivi (Fratelli, Ricchezza) si spengono solo se erano
già deboli, altrimenti resistono. La tomba è anche **magazzino** (墓库): toglie l'azione a chi
agisce, conserva chi è passivo.


---

# 52. "CHI NON VINCE PERDE" — L'ESAGRAMMA MOSTRA IL PERDENTE  ·  `SCOPERTA / PRINCIPIO` (14/08/2026)

Carta sorgente: **EURJPY 11/03/2025** (seme 159, sup 3 離, inf 7 艮, mutante L2, giorno 己卯,
mese 卯, anno 巳, palazzo 離 Fuoco). La mobile L2 兄弟 午 Fuoco (timely nel mese di Legno) muta
in 亥 Acqua = Ufficiale (官鬼): l'arrivo dovrebbe controllare all'indietro (回頭剋) il 午, ma il
Fuoco è troppo forte e **il controllo fallisce**. L'Ufficiale-Acqua si esaurisce. La direzione
SHORT (posizione della mobile in basso) **non può vincere** → LONG. Mercato +177. ✓

## Il principio (con la cautela di Edu)

> **L'esagramma spesso mostra chi NON riesce a imporsi, non chi vince.** Una linea mobile la
> cui azione è contrastata / fallisce non porta la propria direzione: si legge l'OPPOSTO.

⚠ **NON è una lettura di default.** Edu avverte: succede anche il contrario — l'esagramma fa
leggere chi *vince*. Il punto non è che "l'opposto" sia la regola base, ma **riconoscere quale
dei due modi è in atto**. La CONDIZIONE DI FALLIMENTO dell'azione è il segnale che dice di usare
la lettura "al negativo".

## Misura — "azione fallita → leggo l'opposto"

| categoria di azione fallita | n | tutto | z | recente | vecchio | pip |
|---|---|---|---|---|---|---|
| 回頭剋 (arrivo controlla partenza) | 503 | 51,89% | 0,85 | 51,96% | 52,24% | +292 |
| autocombinazione (自合) | 339 | 53,39% | 1,25 | 50,00% | 57,25% | +1.601 |
| arrivo clashato dal giorno | 415 | 52,29% | 0,93 | 51,53% | 54,76% | +1.689 |
| **QUALSIASI azione fallita → opposto** | **1.211** | **52,27%** | 1,58 | 51,05% | 54,60% | **+2.943** |
| *(le stesse lette diretta)* | 1.211 | 47,73% | −1,58 | 48,95% | 45,40% | −2.943 |

Copre **quasi un terzo del campione**, sopra il riferimento su entrambi i periodi. Non forte in
valore assoluto (z ~1,5) ma stabile e ampio: è il **principio unificante SOTTO** regole già
fissate — §14 (回頭剋), §5 (autocombinazione) ne sono casi particolari, non regole separate.

## Il 回頭剋 per parente della mobile (raffinamento)

| mobile in 回頭剋 → opposto | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **Genitori (父母)** | 94 | **59,57%** | 60,78% | 55,00% |
| Ufficiale | 151 | 52,32% | 50,00% | 54,39% |
| Fratelli | 121 | 52,07% | 47,54% | 58,49% |
| Figli | 38 | 47,37% | 42,86% | 60,00% |
| Ricchezza | 99 | 45,45% | 55,00% | 33,33% |

I **Genitori** in 回頭剋 danno 59,57% (condotto colpito che cede, coerente §12). La **Ricchezza**
no (45,45%, periodi opposti): bene passivo, non si fa spegnere.

⚠ **ATTENZIONE alla §14 in produzione:** attualmente il modulo fa "agire l'arrivo dalla
posizione della mobile", che sui 回頭剋 con partenza debole misura **46,94%** (sotto il rif. su
entrambi i periodi). La lettura corretta di Edu ("la mobile non vince, si legge l'opposto") dà
51-53%. **Correzione della §14 NON ancora applicata** — richiede via libera esplicito e
rimisura del baseline PB. Decisione rimandata.


---

# 53. I FRATELLI OSTACOLANO IL TREND  ·  `FISSATA` (14/08/2026)

Recupero dell'impostazione originale: i Fratelli (兄弟) NON danno una direzione assoluta
long/short (misurato: 50%, nessun segnale), ma dicono **se il mercato segue o NON segue il
trend EMA** — come il PB. E il verso è ROVESCIATO rispetto all'intuizione: i Fratelli
**sottraggono/ostacolano**, quindi un Fratello forte fa **NON seguire** il trend.

Carta sorgente del filone: **EURJPY 11/02/2025** (Fratelli 寅 vuoti sullo Ying → niente spinta
short; mercato LONG contro trend EMA SHORT).

## Misura — "Fratello timely → il mercato NON segue il trend"

| lettura (opera CONTRO il trend EMA) | n | win% | z | recente | vecchio | pip |
|---|---|---|---|---|---|---|
| Fratello timely sullo Shi | 344 | 53,49% | 1,29 | 53,67% | 53,42% | +1.754 |
| Fratello mobile vivo | 891 | 51,96% | 1,17 | 51,81% | 53,28% | +3.514 |
| Fratelli forti (nessuno vuoto) | 1.409 | 51,88% | 1,41 | 51,00% | 52,90% | +3.879 |
| **UNICO Fratello timely — qualunque ruolo** | 903 | 52,82% | 1,70 | 52,54% | 54,40% | +4.145 |
| unico e NON sullo Shi | 806 | 53,10% | 1,76 | 52,47% | 54,44% | +4.106 |

**Non è un fatto di RUOLO ma di POSIZIONE.** Lo Shi da solo (unico Fratello) = 97 carte, neutro
(50,52%). Il segnale vive nella posizione:

| posizione del Fratello timely | n | win% | z | recente | vecchio | pip |
|---|---|---|---|---|---|---|
| **L4** | 508 | **55,31%** | **2,40** | 54,58% | 57,14% | +3.415 |
| L1 | 79 | 58,23% | 1,46 | 63,41% | 52,94% | +716 |
| L2 | 240 | 51,25% | 0,39 | 52,99% | 48,04% | +389 |
| L3 | 759 | 50,72% | 0,40 | 49,88% | 50,94% | +1.653 |
| L5 | 514 | 51,17% | 0,53 | 46,32% | 56,42% | −91 |
| **L6** | 345 | 48,41% | −0,59 | 48,82% | 48,00% | −102 |

**La cella forte: Fratello timely a L4 → il mercato NON segue il trend, 55,31% su 508 carte,
z 2,40, entrambi i periodi sopra** (54,58 / 57,14). L4 = prima linea del trigramma superiore.
All'estremo opposto L6 va sotto (48,41%): il Fratello all'apice non ostacola.

**Asimmetria (unidirezionale):** il complementare NON vale — "nessun Fratello forte → segue"
dà 49,32% (sotto rif.), e il sistema a interruttore (forti→non segue, else→segue) è piatto
(50,06%). I Fratelli sono un **filtro verso il non-segue**, non un interruttore bidirezionale.
Come le mutazioni PB, la regola vale in un verso solo.

⚠ Testate 10 caselle (6 posizioni × 4 ruoli): un z 2,40 su 10 prove è in parte atteso per
caso. La credibilità viene dall'**allineamento dei due periodi** (54,58/57,14), non dallo z.
Da confermare in avanti / su holdout.

## 53a. Confronto diretto col baseline (Yong vs Trend vs niente)
Tasso di fondo: il mercato NON segue il trend nel **51,23%** dei giorni.

| | n | NON segue % | recente | vecchio |
|---|---|---|---|---|
| Fratello timely nello YONG | 1.253 | 51,88% | 51,51% | 52,91% |
| Fratello timely solo nel TREND | 421 | 52,49% | 50,21% | 53,85% |
| baseline — nessun Fratello timely | 2.437 | 50,68% | 49,67% | 51,70% |

**L'effetto è modesto (~+1,2 punti sul fondo) e lo Yong NON è decisivo:** confrontati entrambi
col baseline reale, Yong e Trend stanno appena sopra, senza vantaggio netto dello Yong (la
differenza Yong>Trend vista nel confronto interno si assottiglia). L'unica cella davvero netta
resta **posizionale (L4, 55,31%)**, non il gua del PB. **Conclusione di Edu: trasportare il
Fratello dentro il PB NON dà una chiave di lettura decisiva.**

## 53b. B NEL Ti OSTACOLA IL TREND — `FISSATA` (confronto pulito su tutti i parenti)

Fra i 5 parenti timely trasportati nel PB come "segue/non segue", **solo i Fratelli danno
segnale**, e solo verso il NON-segue:

| parente timely → NON segue | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **Fratelli** | 903 | 52,82% | 52,54% | 54,40% |
| Genitori | 772 | 51,04% | 47,93% | 55,65% (recente sotto) |
| Figli | 905 | 50,83% | 47,76% | 55,38% (recente sotto) |
| Ufficiale | 925 | 49,19% | 47,62% | 51,24% |
| Ricchezza | 823 | 48,85% | 49,69% | 47,55% |

E il Fratello ostacola meglio quando sta nel **Ti (gua del Trend, che nel PB È l'EMA)**,
massimo a L4:

| | n | tutto | z | recente | vecchio |
|---|---|---|---|---|---|
| B nel Ti → non segue | 1.192 | 51,59% | 1,10 | 49,85% | 52,37% |
| **B nel Ti E a L4 → non segue** | 266 | **57,14%** | 2,33 | 57,53% | 55,96% |

**REGOLA FISSATA: 兄弟 (Fratello) timely nel Ti del PB → il mercato NON segue il trend;
fortissimo a L4** (57,14%, z 2,33, due periodi allineati). Dottrina: il Fratello sottrae/
compete, e piantato dentro il corpo del trend lo blocca.

**Controparte simmetrica NON esiste:** 妻財 (Ricchezza) nel Ti → SEGUE misura 50,22% (a L4
50,35%, periodi sotto 50%): piatta. Il 57,43% visto prima dipendeva dal filtro "W unica timely"
(restrittivo), non dalla posizione. La Ricchezza è bene passivo: non spinge il trend. Solo i
Fratelli hanno l'effetto.

## 53c. QUADRO COMPLETO — L'ASSE DEGLI AVVERSI (Ti vs Yong) — `FISSATA`

I 5 parenti timely nel **Ti** (>50% = ostacola il trend / <50% = asseconda):

| parente nel Ti | n | tutto | recente | vecchio | |
|---|---|---|---|---|---|
| **Ufficiale (官鬼)** | 964 | 52,18% | 51,95% | 52,25% | ostacola ✓ |
| **Fratelli (兄弟)** | 1.192 | 51,59% | 49,85% | 52,37% | ostacola ✓ |
| Figli (子孫) | 587 | 50,26% | 48,40% | 52,90% | neutro |
| Ricchezza (妻財) | 920 | 49,78% | 51,54% | 48,28% | neutro |
| Genitori (父母) | 998 | 48,40% | 44,81% | 53,33% | instabile |

A L4: **Fratelli 57,14% (z 2,33)**, **Ufficiale 55,41% (z 1,36)**, gli altri piatti.

Nello **Yong** tutto molto più piatto: Fratelli 51,88%, Figli 52,28%, Ricchezza 51,07%,
Ufficiale 50,14%, Genitori 50,00%. "Parente = la mutante" non aggiunge nulla (48-51%).

**CONCLUSIONE — l'effetto vive nel Ti, non nello Yong.** Il Ti *è* il trend (corpo/EMA): un
avverso piantato **dentro il corpo del trend** lo blocca. I due avversi sono **官鬼 (controlla/
reprime)** e **兄弟 (sottrae/compete)**. Ricchezza, Figli, Genitori: nessun effetto stabile.
**C'è un asse "avversi ostacolano" ma NON un asse speculare "favorevoli assecondano"** —
asimmetrico (da indagare: il favore forse è una relazione generativa verso il Ti, non un
parente → prossimo passo).

## 53d. Raffinamenti — presenza, non azione; il vuoto — `FISSATA`

**Ostacolo = presenza statica, non movimento.**
- Nel Ti il parente è per costruzione FERMO (la mutante sta nello Yong): B/G ostacolano da
  fermi. Il 暗動 non cambia (Fratelli quieto 51,58 / in 暗動 51,81).
- **B e G MOBILI nello Yong NON ostacolano il Ti** (50-51,6%), né in partenza né in arrivo.
  Due meccaniche distinte: **ostacolare** = presenza forte nel Ti; **agire** = muoversi nello
  Yong (capolinea, Tai Sui, tomba, 回頭剋).

**Il vuoto (旬空):**
- **B/G vuoti nel Ti**: NON perdono la capacità di ostacolare (Fratello vuoto 52,78%). Il vuoto
  non li spegne come ostacoli.
- **Ufficiale nel Ti + una linea VUOTA nel Ti → 55,65% (z 2,13, 57,22/53,33)**, contro 50,00%
  se il Ti è pieno. Una **falla nel corpo del trend**: l'Ufficiale forte sfrutta la crepa e
  l'ostacolo morde. Regola: *官鬼 timely nel Ti + Ti con linea vuota → NON segue*. Per il
  Fratello questo non cambia (il vuoto conta solo per l'Ufficiale).


---

# 54. IL FAVORE AL Ti È INSTABILE; L'ANTI-SEGNALE MESE-vs-TAI SUI È STABILE  ·  `FISSATA` (14/08/2026)

Cercando la metà "favorevole" mancante (perché nel PB gli avversi ostacolano ma nessuno
asseconda), abbiamo testato: **una mutazione il cui ARRIVO genera l'elemento del Ti → dovrebbe
far SEGUIRE il trend.**

## 54a. Il favore è instabile (per anno e per mese)
| | n | tutto | recente | vecchio |
|---|---|---|---|---|
| arrivo genera il Ti, timely → SEGUE | 466 | 54,08% | 58,58% | 46,41% |

Scomposto per anno oscilla senza ripetersi: 2020 32% · 2021 48% · 2022 49% · 2023 60% ·
2024 72% · 2025 44% · 2026 61%. Non è "il 2020 che sporca": è un segnale ballerino. Per mese:
peggiori i mesi di **nascita** 寅(feb) 30% e 申(ago) 33% (elemento appena sorto); ma anche i
mesi forti hanno recente≫vecchio. **Firma del rumore**, non di una legge — contro l'ostacolo
(controllo del Ti) che è piatto e uguale su entrambi i periodi (51,66/51,37).

## 54b. L'ANTI-SEGNALE stabile — `FISSATA`
La sotto-condizione che regge, isolata dentro il filone instabile:

| | n | tutto | z | recente | vecchio |
|---|---|---|---|---|---|
| **mese CONTROLLA il Tai Sui + mutaz. genererebbe il Ti → NON segue** | 43 | **65,12%** | 1,98 | 61,90% | 68,18% |

Entrambi i periodi alti e allineati (il vecchio più forte). Dottrina: **quando il mese controlla
il Tai Sui, l'anno è sopraffatto dal mese**; in quella condizione anche una mutazione che
nutrirebbe il Ti non riesce a farlo seguire — il mercato va contro (asse "chi non vince perde",
§52: il Tai Sui sopraffatto non porta il favore, si legge l'opposto).

Il favore filtrato (mese NON controlla il TS, fuori dai mesi di nascita) sale a 57,36% (z 2,69)
ma resta con gap 60,73/51,18: **meno instabile, non robusto → non usato come regola**.
Si registra solo l'ANTI-segnale.

## 54c. Ipotesi da testare (Edu): Tai Sui = difensore del Ti, mese = sfidante (Yong)
Se il Tai Sui difende il trend e il mese lo sfida: nei mesi in cui **il mese controlla l'anno**
dovrebbe vincere di più lo **Yong** (non segue); quando **l'anno controlla il mese**, dovrebbe
vincere di più il **Ti** (segue). → test in corso.

---

# 50d. LA COMBINAZIONE DEL TAI SUI: GENERATIVA vs DISTRUTTIVA  ·  `FISSATA` (15/08/2026)

Carta sorgente: **GBPUSD 15/12/2022** (seme 124, sup 7 艮, inf 4 震, mutante L2, giorno 壬寅,
mese 子, anno 寅, palazzo 巽 Legno, vuoti 辰巳). La mobile L2 è il Tai Sui-Fratelli 寅 (anche
ramo del giorno, timely) che AVANZA in 卯; l'arrivo 卯 combina 戌 = Ricchezza sul soggetto (世)
a L4. Lettura di Edu: la combinazione 卯戌 porta un controllo dentro (Legno controlla Terra) —
il Fratello forte non raggiunge la Ricchezza, **la distrugge**. La direzione non è quella del
bersaglio ma l'opposta → SHORT. Mercato −240. ✓

**Il principio**: le sei coppie 六合 si dividono in due famiglie:
- **generative**: 寅亥 (Acqua→Legno) · 辰酉 (Terra→Metallo) · 午未 (Fuoco→Terra) — il legame
  porta → direzione del bersaglio
- **con controllo dentro**: 卯戌 (Legno⊣Terra) · 巳申 (Fuoco⊣Metallo) · 子丑 (Terra⊣Acqua) —
  la combinazione può essere una distruzione

**Misura (sui casi: mobile = Tai Sui, arrivo combina una linea unica, bersaglio non vuoto)**:

| combinazione distruttiva → OPPOSTA | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **distruttore timely + attaccato ANCHE timely** | 6 | **83,33%** | 100,00% | 80,00% |
| distruttore timely + attaccato non timely | 11 | 45,45% | 75,00% | 28,57% |
| distruttore debole + attaccato timely | 14 | 50,00% | 50,00% | 50,00% |
| **entrambi deboli** (l'opposta perde sempre → diretta vince) | 5 | **0,00%** | 0,00% | 0,00% |
| (generativa → direzione del bersaglio) | 73 | 53,42% | 53,06% | 54,55% |

**REGOLA FISSATA (formulazione accettata da Edu il 15/08/2026, corretta sui dati)**:
1. Combinazione **distruttiva** con **distruttore E attaccato entrambi timely** → la distruzione
   si compie, si legge l'**OPPOSTO** del bersaglio (83,33%, periodi 100/80 allineati).
2. Combinazione distruttiva con **entrambi deboli** → la distruzione non ha forza, la
   combinazione **porta normalmente** → direzione del bersaglio (5/5).
3. Le celle miste (uno timely, l'altro no) NON danno segnale stabile (45-50%, periodi in
   contraddizione) → nessuna lettura.
4. La formulazione iniziale di Edu ("distruttore timely + attaccato non timely") misurava
   45,45% con periodi opposti: sostituita dalla n.1 col suo consenso, visti i dati.

**Dottrina**: coerente con la §51b (è l'Ufficiale VIBRANTE che la tomba spegne) — gli eventi
forti si compiono su bersagli forti; lo scontro fra due deboli non lascia traccia e il legame
prevale. ⚠ 6 e 5 carte: campioni piccolissimi, accettati da Edu ("ampia variabilità del LY");
periodi allineati in entrambe le celle. Da monitorare in avanti.

---

# 50e. LA COMBINAZIONE DELL'ARRIVO GENERALIZZATA A OGNI MOBILE  ·  `FISSATA` (15/08/2026)

Carta sorgente: **EURJPY 19/04/2022** (seme 137, sup 1 乾, inf 1 乾, mutante L5, giorno 壬寅,
mese 辰, anno 寅, palazzo 乾 Metallo, vuoti 辰巳). La mobile L5 Fratelli 申→未 è sospesa dal
giorno (寅冲申), ma **conta comunque l'arrivo** (§50a): 未 combina 午 = Ufficiale a L4, timely,
sostenuto dal giorno e dal Tai Sui (寅 Legno genera il Fuoco). Combinazione 午未 generativa →
direzione del bersaglio → L4 → LONG. Mercato +205. ✓ Lettura di Edu.

**Misura — lo schema §50d esteso a QUALSIASI mobile (bersaglio unico, non vuoto):**

| condizione | n | tutto | z | recente | vecchio |
|---|---|---|---|---|---|
| **generativa su bersaglio TIMELY → dir. bersaglio** | 551 | **54,26%** | 2,00 | 52,52% | 56,85% |
| generativa su Ufficiale → dir. bersaglio | 273 | 54,58% | 1,51 | 51,94% | 56,59% |
| **distruttiva, entrambi deboli → dir. bersaglio** | 57 | **64,91%** | 2,25 | 71,43% | 61,54% |
| distruttiva, entrambi timely → OPPOSTA | 53 | 47,17% | — | 45,45% | 50,00% |
| generativa senza filtro timely | 1.068 | 51,22% | — | 49,66% | 52,37% |

**REGOLE FISSATE (per qualunque linea mobile):**
1. Arrivo combina una linea (unica, non vuota) in modo **generativo** e il bersaglio è
   **timely** → direzione del bersaglio (54,26%, entrambi i periodi sopra). Senza il filtro
   timely la regola è piatta: serve un bersaglio vivo di stagione.
2. Combinazione **distruttiva fra due deboli** → nessuno ha la forza di rompere, il legame
   porta → direzione del bersaglio (64,91%, periodi 71/61).
3. **La distruzione compiuta NON generalizza**: per le mobili comuni "distruttiva entrambi
   timely → opposta" misura 47,17% (contro l'83,33% del Tai Sui, §50d). **Solo il Tai Sui ha
   la forza concentrata per compiere una distruzione** — coerente con la dottrina del Tai Sui
   come "capacità di intervento" (grandi istituzioni). La cella distruttiva-forte resta
   esclusiva della via 14 (Tai Sui).

**Dottrina in una riga**: l'arrivo che combina porta la direzione del bersaglio se il bersaglio
è vivo di stagione (o se sono entrambi deboli); la distruzione dentro la combinazione è
privilegio esclusivo del Tai Sui.

---

# 50f. L'ARRIVO DELLA MOBILE GENERA LA RICCHEZZA  ·  `FISSATA` (15/08/2026)

Carta sorgente: **USDJPY 22/09/2022** (seme 144, sup 2 兌, inf 8 坤, mutante L1, giorno 戊寅,
mese 酉, anno 寅, palazzo 兌 Metallo, vuoti 申酉 — il giorno del primo intervento BoJ sullo
yen dal 1998). Mobile L1 Genitori 未→子: l'arrivo 子 Acqua **genera** la Ricchezza 卯 Legno a
L3. La W non è timely (mese 酉 la contrasta) ma è **FORTE**: Tai Sui 寅 Legno e giorno 寅
Legno le danno spalla (stesso elemento, doppia forza concentrata — §47 timely vs forte).
L3 → trigramma inferiore → SHORT. Mercato −188. ✓ Lettura di Edu; la correzione decisiva
("non serve timely, basta il sostegno di giorno/anno") è sua.

**Misura (arrivo genera W; direzione per posizione se le W sbilanciano su un trigramma):**

| condizione | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **W TIMELY o FORTE → dir. linea** | 280 | **54,29%** | 52,69% | 55,00% |
| timely E forte insieme | 111 | 57,66% | 53,73% | 61,11% |
| solo forte | 119 | 52,10% | 52,94% | 51,06% |
| solo timely | 50 | 52,00% | 50,00% | 52,94% |
| **né timely né forte** | 60 | **43,33%** | 55,88% | 30,43% |

FORTE = giorno o anno con lo stesso elemento della W, o che la generano.

**REGOLA FISSATA**: l'arrivo della mobile genera la Ricchezza e la W è **timely o forte** →
direzione della W (per posizione). Le due forze si sommano (insieme 57,66%). Una W **senza
alcun sostegno non riceve** (43,33%) → nessuna lettura. Controllo di specificità: generare gli
altri parenti non dà segnale (Ufficiale 51,63%, Genitori 50,94%, Fratelli 50,17%, Figli
47,99% — coerente con §46: i Figli conservano, non spingono). Integrata come **via 16**.

---

# 50g. LA COMBINAZIONE DOPPIA LEGA IN BASSO  ·  `FISSATA` (15/08/2026)

Carta sorgente: **USDJPY 01/08/2022** (seme 133, sup 8 坤, inf 5 巽, mutante L6, giorno 丙戌,
mese 未, anno 寅, palazzo 震 Legno, vuoti 午未). L'Ufficiale mobile L6 酉 arriva su 寅 (il ramo
del Tai Sui); 寅 combina 亥 — ma di 亥 ce ne sono DUE (Genitori a L5 e a L2). Lettura di Edu:
vince L2 per risonanza (ha il Fratelli 寅 nascosto, gemello dell'arrivo) → SHORT. Mercato −168. ✓

**Misura sui 193 casi di gemelli DIVISI (un bersaglio per trigramma, non vuoti):**

| spareggio | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **il gemello BASSO** | 193 | **55,96%** | 54,08% | 57,65% |
| il gemello alto | 193 | 44,04% | 45,92% | 42,35% |
| risonanza (nascosto = ramo d'arrivo) | 31 | 58,06% | 46,15% | 68,75% |
| il gemello soggetto (世) | 37 | 54,05% | 61,54% | 36,36% |

**REGOLA FISSATA**: quando l'arrivo della mobile combina un ramo presente su DUE linee divise
fra i trigrammi, **il legame si compie in basso** → direzione del gemello del trigramma
inferiore (55,96%, periodi 54/58 allineati). Nella carta sorgente coincide con la scelta di
Edu (L2). La **risonanza del nascosto** resta annotata come lettura dottrinale NON confermata
come criterio generale (periodi opposti: 46,15/68,75 su 31 carte) — nel caso singolo può
spiegare il perché, ma lo spareggio operativo è la posizione. Integrata come **via 17**.

---

# 50h. IL NASCOSTO VUOTO CLASHATO DALL'ARRIVO: LA SCALA DEI SOSTEGNI  ·  `FISSATA` (15/08/2026)

Carta sorgente: **USDJPY 09/03/2020** (seme 103, sup 4 震, inf 7 艮, mutante L5, giorno 辛亥,
mese 卯, anno 子, palazzo 兌 Metallo, vuoti 寅卯 — il lunedì nero Covid+petrolio). Il Fratello
mobile L5 avanza 申→酉; l'arrivo 酉 clasha 卯 = la Ricchezza NASCOSTA (伏神) dietro l'Ufficiale
a L2, vuota ma con TRE sostegni: ramo stesso del mese (旺), generata dal giorno 亥 e dal
Tai Sui 子 (entrambi Acqua). Lettura di Edu: un vuoto così sostenuto esce facilmente — emerge
e genera con forza il volante G → L2 → SHORT. Mercato −166. ✓

**Prima misura (ingenua, "vuoto e timely" con 旺 e 相 mischiati): 44,44% — RESPINTA.**
Correzione di Edu: "non puoi trattare W così come un vuoto qualsiasi" — 旺不为空, e vanno
contati i sostegni concentrati (giorno/anno), non solo il mese.

**Misura graduata (nascosto vuoto clashato dall'arrivo, ospite unico). Sostegni: 旺 dal mese
(elemento o ramo stesso) / giorno stesso elemento o che genera / Tai Sui idem:**

| sostegni | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **≥2 (molto sostenuto)** | 13 | **76,92%** | 75,00% | 80,00% |
| 1 | 27 | 40,74% | 42,86% | 36,36% |
| **0 (abbandonato)** | 17 | **23,53%** | 42,86% | 11,11% |

Scala perfettamente monotona: 23% → 41% → 77%.

**REGOLE FISSATE (via 18):**
1. Nascosto vuoto con **≥2 sostegni** clashato dall'arrivo → esce dal vuoto e agisce →
   **direzione della linea ospite** (76,92%, periodi 75/80).
2. Nascosto vuoto con **0 sostegni** → il clash lo sfonda, l'azione si rovescia →
   **direzione OPPOSTA all'ospite** (76,47%).
3. 1 sostegno: zona grigia, nessuna lettura.
⚠ Campioni piccoli (13 e 17) accettati per scala monotona + periodi allineati agli estremi.
Dottrina: gemella della 旺不为空 di produzione PB, estesa dal solo mese alla forza concentrata
di giorno e Tai Sui (§47 timely vs forte).

---

# 50i. IL GUA INFERIORE INTERAMENTE VUOTO: IL PAVIMENTO CEDE  ·  `FISSATA` (15/08/2026)

Nata dalla domanda di Edu su GBPUSD 28/09/2022 ("il vuoto 午 copre l'intero trigramma
inferiore 離: non rende impossibile lo SHORT?"). La misura ha ROVESCIATO l'ipotesi:

| condizione | n | tutto | recente | vecchio |
|---|---|---|---|---|
| inferiore interamente vuoto → LONG (ipotesi originale) | 567 | 45,33% | 45,54% | 44,09% |
| **inferiore interamente vuoto → SHORT (rovesciata)** | 567 | **54,67%** | 54,46% | 55,91% |
| superiore interamente vuoto → SHORT | 458 | 48,91% | — | — |

**REGOLA FISSATA (via 19)**: quando i rami HOUTIAN del trigramma INFERIORE dell'esagramma
sono tutti nei vuoti del giorno → **è più facile uno SHORT** (54,67%, periodi 54,5/55,9).
Il vuoto sotto non blocca la discesa: **toglie il pavimento**, e il mercato ci cade dentro.
Il trigramma superiore vuoto non dice nulla (48,91%).

Note strutturali:
- I vuoti vengono in coppie fisse (旬空): 乾 (戌亥) e 巽 (辰巳) possono essere interamente
  vuoti; 艮 (丑寅) e 坤 (未申) cavalcano due coppie → non sono MAI interamente vuoti — la
  vecchia regola "Gen e Kun non sono mai vuoti" è scritta nella struttura.
- 旺不为空 coerente: trigramma vuoto ma 旺 di mese → effetto attenuato (52,86% vs 54,93%).
  Cablata SENZA eccezione (cella aggregata).
- La carta GBPUSD 28/09/2022 (LONG da intervento BoE) è una delle eccezioni del 45%.

---

# 50j. DUE FRATELLI DIVISI: OGNUNO CURA LA SUA SEZIONE  ·  `FISSATA` (15/08/2026)

Principio di Edu (da EURUSD 20/04/2022): quando ci sono DUE Fratelli, uno per trigramma,
ognuno rivolge la propria azione al settore di competenza — diversamente dal B singolo
(§53, ostacolo di trend segue/non-segue). Il verso, allineato sui dati e sulle carte:
**il mercato va nella sezione del B mobile che esce RAFFORZATO dalla mutazione** (回頭生 o
avanzante). Il B lavora nel suo settore e il movimento del giorno accade lì.

- EURUSD 20/04/2022: B alto 卯 mobile, sul giorno, timely, 回頭生 → sezione alta → LONG.
  Mercato +56. ✓
- GBPUSD 28/09/2022 (contrasto istruttivo): i due B sono FERMI e clashati dal mese — la
  regola tace; il LONG di quel giorno venne da altro (intervento BoE).

**Misura (carte con esattamente un B per trigramma, 2.248):**

| cella (% giorni in cui il mercato SALE) | n | tutto | recente | vecchio |
|---|---|---|---|---|
| **B ALTO mobile RAFFORZATO** | 100 | **54,00%** | 53,06% | 56,25% |
| **B BASSO mobile RAFFORZATO** | 72 | **44,44%** (=55,56% short) | 39,39% | 47,22% |
| B mobile indebolito (alto) | 58 | 46,55% | 58,06% | 31,82% |
| B fermi (tutte le combinazioni acceso/spento) | 1.473 | ~51% | — | — |

**REGOLA FISSATA (via 20)**: due B divisi fra i trigrammi + il B mobile esce rafforzato
dalla mutazione → **direzione della SUA sezione** (172 carte, 54,65%, quattro sotto-celle
allineate). B indebolito o B fermi: nessuna lettura (periodi in contraddizione / piatti).
Conferma il primato della DINAMICA: conta chi si muove e con che forza, non la presenza.

---

# 50k. IL CLASH DEL GIORNO ROMPE LA COMBINAZIONE DEL TAI SUI  ·  `FISSATA` (15/08/2026)

Nata dalla domanda di Edu su GBPUSD 28/09/2022: "il giorno 申 clasha l'anno 寅 — il clash non
rompe la combinazione 寅亥 col P di L3? E allora cosa accade a G 酉 e P 亥?" (合被冲破).
Il giorno faceva doppio lavoro: clashava il Tai Sui E legava la mobile (申合巳).

**Misura (linea FERMA unica combinata a distanza dal ramo dell'anno):**

| cella | n | tutto | recente | vecchio |
|---|---|---|---|---|
| combinazione intatta → dir. linea | 1.349 | 49,30% | 50,00% | 47,95% |
| **rotta dal giorno → OPPOSTA alla linea** | 109 | **56,88%** | 53,85% | 60,38% |
| solo P: rotta → opposta | 29 | **62,07%** | 63,64% | 64,71% |

**REGOLA FISSATA (via 21)**: una linea ferma unica combinata a distanza dal Tai Sui, nel
giorno che CLASHA l'anno → la combinazione si rompe e la sede si ribalta → **direzione
OPPOSTA alla linea**. Finché la combinazione è intatta: nessun segnale (conferma §50b:
la combinazione a distanza da sola è legame debole — il suo effetto emerge solo quando
si SPEZZA). Sul P il segnale è massimo (62%): il condotto tenuto dall'anno, sferzato dal
clash, perde il verso.

Chiude anche il cerchio del P-condotto (§ pendente): delle due "eccezioni" della cella
G-forte (66,67% dir. sede), GBPUSD 28/09/2022 è spiegata dalla rottura (via 21 la
intercetta con precedenza); EURUSD 20/04/2022 resta l'eccezione semplice.

**REGOLA FISSATA (via 22, subordinata alla 21)**: P vivo che drena un G nascosto FORTE →
direzione della sede (42 carte, 66,67%, periodi allineati). Valutata DOPO la via 21: se la
combinazione col TS è rotta dal giorno, comanda la rottura.

---

# 55. IL GENITORI (P) MOBILE CHE CLASHA IL TAI SUI FERMO ROMPE IL SUO TREND  ·  `FISSATA` (16/08/2026)

Nata dalla carta peggiore del gruppo "LY tace" (USDJPY 23/10/2024, PB perde 155 pip): un P
mobile su L6 (未→戌) il cui arrivo clasha il Tai Sui fermo su L1 (辰), e il mercato sale.
Lettura di Edu: **il P è per natura il distruttore dei trend. Il Tai Sui FERMO rappresenta
il trend consolidato della sua sezione (sotto = ribasso, sopra = rialzo). Il P mobile, col
suo ramo di ARRIVO, lo clasha e quel trend si rompe.** Non c'entrano gli elementi né il
drenaggio: è natura del P + posizione del Tai Sui.

Ipotesi respinte lungo la strada (agli atti): P avanzante sopra → LONG (47 carte, 48,94%);
P che arriva nel trigramma inferiore blocca il ribasso in generale (140 carte, 53,57%,
periodi discordi); clash sul Tai Sui col ramo di PARTENZA (misura dottrinalmente sbagliata:
quando una linea si muove è SEMPRE il ramo di arrivo che agisce).

**Misura (P mobile, arrivo clasha un TS fermo unico; % = trend del TS ROTTO):**

| cella | n | tutto | z | recente | vecchio |
|---|---|---|---|---|---|
| tutte | 32 | 65,63% | 1,77 | 64,29% | 66,67% |
| TS sopra (rialzo rotto → scende) | 11 | 81,82% | 2,11 | 75,00% | 85,71% |
| TS sotto (ribasso rotto → sale) | 21 | 57,14% | 0,65 | 60,00% | 54,55% |
| **TS NON combinato dal giorno** | 27 | **70,37%** | 2,12 | 69,23% | 71,43% |
| TS combinato dal giorno (difeso) | 5 | 40,00% | — | — | — |
| controllo: altre parentele che clashano il TS | — | ~40-60% | — | — | — |

La tempestività del P NON separa (timely 66,67% vs non timely 65,00%). Ciò che separa è la
**difesa del Tai Sui**: se il GIORNO combina il TS, il TS è legato e il clash non passa
(le tre smentite nette — GBPUSD 05/03/2021, USDJPY 15/02/2024, AUDUSD 15/07/2021 — hanno
tutte il TS combinato dal giorno). La combinazione da un'altra linea FERMA non difende:
solo il giorno fa da scudo. Le altre parentele (B, G, W, C) che clashano il TS non mostrano
questo comportamento — il P è davvero il distruttore, gli altri no.

**Criterio di precedenza (Edu, 16/08/2026):** *gli indicatori principali restano G e W; se
non ci sono, si "lavora" su B, P e C.* Le due EURJPY 26/08 e 07/09/2020 (TS sopra difeso dal
giorno, ma il rialzo si rompe lo stesso) NON sono eccezioni: lì il P mobile (亥→午) va a
GENERARE la Ricchezza 丑 su L1 che coincide col giorno — comanda la W, il P è suo servitore,
il clash sul TS è un fatto di tavola non l'azione. Nella USDJPY 23/10 l'arrivo combina solo
una W NASCOSTA (non attiva): né G né W agiscono, allora si legge il P.

**REGOLA FISSATA (via 23, subordinata alle vie di G e W)**: P mobile il cui ramo di ARRIVO
clasha un Tai Sui FERMO → **il trend rappresentato dal Tai Sui si rompe** (TS sotto → SALE;
TS sopra → SCENDE). Se il giorno combina il Tai Sui, il TS è difeso e la regola tace.
27 carte, 70,37%, periodi allineati. n piccolo: le carte arrivano a grappoli (USDJPY 2024,
EURJPY 2020, EURGBP 2022) — sono ~10-12 episodi reali. Pista forte, non ancora sopra soglia.

---

# 56. TRASPORTO DI A SU UN TAI SUI VUOTO  ·  `FISSATA` (16/08/2026)

Nata da EURJPY 21/06/2023 (seconda peggiore del gruppo "LY tace", PB perde 150 pip): L4
Figli 酉→戌; l'arrivo 戌 combina l'Ufficiale 卯 su L2, che è Tai Sui, VUOTO, non timely e
legato anche dal giorno 戌. Il mercato sale.

**Meccanica dottrinale (Edu):** la linea mobile ha due fasi, A (partenza) e B (arrivo).
È SEMPRE B che compie la combinazione con la linea ferma C. Ma quando B lega C, A NON
scompare: viene TRASPORTATA fino a C e lì interagisce con C. B è solo la fermata intermedia.
Qui A=酉 viene portata su C=卯 e lo clasha: il "ragno" trasportato dal legame.
Correzione di Claude registrata: la prima lettura ("la partenza clasha, l'arrivo combina",
come se A agisse da ferma) era sbagliata nella sequenza — il perimetro non cambia, cambia
il senso: prima il legame di B, poi l'azione di A sul bersaglio.

**Misure (agli atti):**
- C mobile che combina un G qualsiasi → G non regge: 55 carte, 43,64% — RESPINTA (l'Ufficiale
  abbracciato dal Figli in generale REGGE; vecchio 23,81%).
- Meccanica larga "A clasha C, B combina C" su tutte le C ferme: 238 carte, 46,22% — RESPINTA.
- Trasporto spaccato per azione di A su C ferma (1.672 carte): due celle vive fuori perimetro,
  annotate come piste: A GENERA un Figli legato → sez. Figli non regge (126, 61,90%, z 2,67,
  periodi allineati); A CONTROLLA un Genitori legato → non regge (20, 70%, allineati). Il
  bersaglio è sempre P o C, mai G/W. Da leggere in una sessione dedicata.
- Ristretta a C = Tai Sui (152 carte): TS pieno muto (45,38%). TS VUOTO 22 carte, 54,55% ma
  periodi discordi (72,73/30,00). Dentro il TS vuoto:

| A trasportata su TS vuoto | n | OK |
|---|---|---|
| A CLASHA il TS | 5 | 80% |
| A CONTROLLA il TS | 5 | 80% |
| **A ostile (clash o controllo)** | **10** | **80%** (recente e vecchio presenti) |
| A controllata dal TS / A drena il TS | 9 | 22% (il TS regge) |

**REGOLA FISSATA (via 24, subordinata alle vie di G e W)**: B combina un Tai Sui fermo VUOTO,
e A trasportata è OSTILE al Tai Sui (lo clasha o lo controlla) → **la sezione del Tai Sui
non regge** (TS sotto → SALE; TS sopra → SCENDE). Il ragno è A ostile; il TS vuoto è il
bersaglio già cavo. Se A arriva debole (controllata o drenante), il TS pur vuoto regge: tace.
Col TS pieno la meccanica è muta: fuori perimetro.
10 carte, 80%, a grappoli (GBPUSD dic 2024, USDCHF nov 2025) → ~5-6 episodi reali. Fissata
per coerenza dottrinale (Edu: "una linea che combina e clasha nello stesso movimento fa
proprio quello che mi aspetterei"), da riverificare quando il campione cresce.

---

# 57. IL RAMO DELL'ORA (dal seme) — IL SOSTENITORE DEL TREND  ·  `FISSATA come RAFFORZATIVO` (16/08/2026)

Domanda di Edu, nata dalla EURJPY 21/06/2023 (§56) dove la partenza A della mobile era proprio
l'ora: "che effetto fa una linea mobile che è lo stesso ramo dell'ora?" E poi: "un paio di giorni
fa eravamo sorpresi che, di fronte a diversi indicatori contro il trend, mancasse un vero
sostenitore del trend. È il ramo dell'ora? Solo come mobile o anche da ferma?"

**Misura — il ramo dell'ora nei suoi cinque ruoli (% = il mercato SEGUE il trend):**

| ruolo dell'ora | n | segue | z | recente | vecchio |
|---|---|---|---|---|---|
| **1. PARTENZA della mobile** | 394 | **56,09%** | 2,42 | 57,21% | 55,00% |
| 2. ARRIVO della mobile | 324 | 45,37% | −1,67 | 44,85% | 45,22% |
| 3. linea FERMA visibile | 1.640 | 48,41% | −1,28 | 50,45% | 45,67% |
| 4. solo NASCOSTA | 120 | 44,17% | — | — | — |
| 5. assente dall'esagramma | 1.633 | 48,38% | — | 48,58% | 48,97% |

**RISPOSTA:** sì, l'ora è il sostenitore del trend — ma **SOLO quando è la PARTENZA della linea
mobile**. Da ferma è muta (identica all'assenza). L'ora che ARRIVA (B = ora) o che viene clashata
dalla partenza va contro il trend (44-45%). Il momento della domanda dà forza a chi lo porta da
subito, non a chi ci arriva.

Dentro il caso "partenza = ora":
- mobile PIENA: 57,27% (330) · mobile VUOTA: 50,00% (64) → l'ora vuota non sostiene.
- caso −4 (mutazione che indebolisce forte): 78,13% (32, allineati 66,67/84,21); caso −1: 60,78%
  (102, allineati). L'ora che si muove e si spegne nel movimento sostiene il trend ancora di più.
- Figli sull'ora: 65,63% (32, allineati). Genitori 57,53% (146, ma discordi 63,74/45,10).

**L'ora livella P e B (i negativi sul trend):**

| mobile | non sull'ora → segue | sull'ora → segue |
|---|---|---|
| P/B (negativi) | 47,52% (1.692) | **55,96%** (218) |
| G/W/C | 48,40% (2.025) | 56,25% (176) |

Quando P o B si muovono sull'ora, vince l'ora: la parentela non conta più. MA: P/B sull'ora e
**rafforzati** dalla mutazione (caso 1/5 o avanzante) → 49,43% (87, vecchio 40%): il negativo torna
a mordere. P/B sull'ora e non rafforzati → 60,31% (131, allineati 60,00/58,33). Il P/B che si
spegne nel movimento non fa danni; quello che esce rafforzato resta un negativo (stesso principio
della via 20, letto al contrario).

**Nel PB: nessun effetto.** L'ora nel palazzo del Ti (640 carte, PB win 51,41%), dello Yong
(602, 54,65%), dello Yong trasformato (519, 54,72%), fuori (2.350, 53,53%): tutto nella banda
naturale del PB. Sul segue/non segue: 46,8-49,2% in tutti i casi. Nel PB i palazzi sono strutture
ferme; l'ora conta solo se si muove — coerente col LY.

**Come via del termometro: RESPINTA.** Via 25 "partenza = ora → segue" in coda: copre 100 carte in
più ma peggiora tutti i sistemi (S1 6,94→6,66; S3 7,00→6,75; −1.000 pip). Stessa asimmetria del PB:
una via "segue" scavalca i PB che avevano ragione a dire "non segue". Interruttore VIAORA=1, spento.

**Come RAFFORZATIVO non decisivo (Edu): FISSATO.** Dove il LY parla e dice SEGUE, con partenza =
ora: 65,83% (120, allineati 70,59/61,22) vs 55,31% senza. Dove il LY dice NON segue, con partenza
= ora: 44,83% (174, vecchio 37%) vs 56,14% senza. L'ora sostiene chi segue e smentisce chi non
segue. Nel sistema: **S4 = S1, ma nei contrasti PB/LY, se la partenza è l'ora e il PB segue il
trend, l'ora sostiene il PB.** S4: z 7,07 · 27.084 pip · 54,34/57,14 — il migliore su z e pip
(S1 6,94/26.527, S3 7,00/27.040). Sempre attivo nel grande test.

**Filtro sulle vie di P/B mobile (20, 23, 24):** cablato (FILTROORA=1: se la mobile P/B è
sull'ora e non rafforzata, la via tace) ma OGGI VUOTO — nessuna carta di quelle vie ha quella
configurazione (la via 20 richiede il B rafforzato). Resta pronto per vie future su P/B.

**Pista aperta (non ancora letta con Edu):** linea FERMA sull'ora CLASHATA DAL GIORNO → il mercato
NON segue il trend: 34,26% segue (108 carte, z −3,27, allineati 35,71/34,69). Il giorno che rompe
l'ora ferma è un "non segue" pulito — la direzione che paga. Candidata a via del termometro.

---

# 58. L'UFFICIALE FERMO SUL RAMO DEL GIORNO ROMPE IL TREND  ·  `FISSATA` (16/08/2026) — via 25

Nata dal giro dei ruoli di giorno/mese/anno (richiesto da Edu dopo la §57): a differenza dell'ora,
giorno, mese e anno NON sostengono il trend in nessun ruolo (partenza della mobile: giorno 49,69%,
mese 46,87%, anno 50,41% — contro l'ora 56,09%). Sono lo sfondo comune a tutte e nove le croci
della giornata; solo l'ora dal seme cambia da croce a croce ed è la domanda specifica.
Ma dal giro esce una cella forte con la firma "non segue":

**Ufficiale (G) FERMO sul ramo del GIORNO → il mercato NON segue il trend.**
234 carte · segue 40,60% · z −2,88 · recente 42,96% · vecchio 37,78%.

Vale in tutte le combinazioni (risposta alla domanda di Edu):
- G sotto: 40,27% (149, allineati 40,23/40,35) · G sopra: 41,18% (85, 47,92/33,33)
- trend LONG: 41,18% (119, allineati) · trend SHORT: 40,00% (115, allineati)
Non è una regola di posizione né di verso: è l'Ufficiale che coincide col giorno che di per sé
dice "non fidarti del trend oggi". Lettura: l'Ufficiale (il trend stesso) sostenuto dal giorno è
"troppo forte" — e nel sistema il troppo forte inverte (stessa logica del PB Rafforzamento).

Condizioni che rafforzano / spengono:
- G anche Tai Sui (giorno + anno): 32,26% (31) — ancora più "troppo forte"
- la mobile lo COMBINA: 48,39% (31) → tace · l'ORA lo combina: 51,52% (33) → tace (il legame lo placa)
- la mobile è una RICCHEZZA: 54,55% (33) → tace (W comanda, criterio Edu)
- il MESE lo combina: 43,48% (23, discordi) — non usato

**Interazione con Ti/Yong del PB (richiesta da Edu):** conta dove SIEDE l'Ufficiale, non dove cade
il giorno nei palazzi. G-giorno nel trigramma del **Ti**: 37,59% (133, z −2,86, allineati
42,11/32,08); nello **Yong**: 44,55% (101, allineati 44,07/45,95). Il Ti è il trigramma fermo,
"io": l'Ufficiale piantato nel soggetto è troppo; nello Yong (che muta) pesa meno.
Sul rendimento PB: PB "non segue" + G nel Ti → PB vince 66,25% (80, +1.177 pip); nello Yong 56,25%;
PB "segue" perde in entrambi (43%, 48%). Il PB coglie già in parte la configurazione ma sbaglia
in 74 carte su 234: la via corregge proprio quelle.

**REGOLA FISSATA (via 25):** G fermo sul ramo del giorno, non combinato dalla mobile né dall'ora,
mobile non W → **NON segue il trend** (restituisce l'opposto dell'EMA). Attiva su Ti e Yong
(GGIORNOVIA=ti+yong, default); variante solo-Ti disponibile.

| sistema | senza via 25 | con via 25 (Ti+Yong) |
|---|---|---|
| LY tace | 879 | 836 |
| S1 | z 6,94 · 26.527 | z 7,03 · 26.766 |
| S2 | z 7,20 · 21.874 | z 7,26 · 21.993 |
| S3 | z 7,00 · 27.040 | z 7,07 · 27.186 |
| **S4** | z 7,07 · 27.084 | **z 7,16 · 27.322** |

Tutti i sistemi migliorano, nessuno peggiora, periodi allineati. È la prima via "non segue"
generica (senza direzione propria) del termometro: dice al sistema di andare contro l'EMA.

Note dal giro giorno/mese/anno (piste minori, agli atti): anno fermo né Shi né Ying → 46% segue
(917, z −2,41); mese come arrivo della mobile → 44,48% (326, allineati 44,83/44,60).

---

# 59. IL GENERALE DEL MESE (月將) AMPLIFICA LA NATURA DELLA MOBILE  ·  `FISSATA` (16/08/2026) — via 26

Indagine di Edu sugli spiriti del DLR nel LY/PB. Il Generale del Mese = ramo del 中氣 corrente
a 00:00 GMT del giorno (helper `generaleDelMese()` in pb_stress.js, da jieqi-gmt.js + daliuren.js;
distribuzione uniforme sui 12 rami, 0 carte mancanti).

**Come ramo generico: MUTO.** Nel LY, i cinque ruoli (partenza 47,18% · arrivo 48,18% · ferma
48,78% · nascosta 49,54% · assente 49,06%): tutto rumore. 伏吟 (Generale = ora) 50,67%, 返吟
(Generale clasha l'ora) 47,40%: niente. Nel PB, palazzi Ti 48%, Yong 52%, trasf. 48%; PB win in
banda (伏吟 55,80% su 371, +1.251 pip — un filo sopra, dentro il rumore).

**Come PARTENZA della mobile: amplifica la parentela di chi muove** (Edu: "quando il Generale
muove un Ufficiale e il trend tiene al 59% non è significativo?" — verificato contro la stessa
parentela SENZA Generale):

| mobile | partenza = Generale | partenza NON Generale | delta |
|---|---|---|---|
| **Ufficiale** | **58,97%** segue (78, 64,29/55,88) | 47,40% (808) | **+11,5** |
| Fratelli | 54,76% (84, discordi 57,50/47,37) | 47,91% (933) | +7 |
| Ricchezza | 45,71% (70, discordi 41,03/53,85) | 50,91% (715) | −5 |
| **Genitori** | **37,50%** segue (72, 37,78/37,50) | 49,45% (821) | **−12** |
| Figli | 32,00% (50, discordi 38,46/22,73) | 49,58% (480) | −17 |

Non è l'ora mascherata: Ufficiale mobile con partenza = ora ma non Generale → 51,52%. Il Generale
è la forza del sole che si posa: sull'Ufficiale (il trend) il trend riceve forza e tiene; sui suoi
drenatori/nemici (Genitori, Figli) quelli si attivano e il trend cede. Le due celle solide (periodi
allineati) sono agli estremi: G tiene, P rompe. Figli va nel verso giusto ma vecchio n=22. Ricchezza
(controparte E generatrice di G): i dati non scelgono.

**Nel termometro:**
- **via 26 — P mobile con partenza = Generale → NON segue: FISSATA.** S1 7,03→7,10 · S2 7,26→7,31 ·
  S3 7,07→7,10 · **S4 7,16→7,28, 27.322→27.783 pip**. LY tace 836→821. Periodi allineati.
- G mobile con partenza = Generale come rafforzativo nei contrasti (S6 = S4 + "Generale su G
  sostiene il PB che segue"): PEGGIORA (27.045 vs 27.322 senza via 26; 27.506 vs 27.783 con).
  RITIRATO. Il 59% è vero da solo, ma nei contrasti il LY che ha parlato ha già ragione più spesso.
  Ancora l'asimmetria: paga solo il segnale "non segue". Il dato G-Generale resta a registro senza uso.

## §59-bis. CAVALLO POSTALE, DING SPIRIT, e l'ALLARGAMENTO della via 26 (16/08/2026)

**Cavallo Postale (驛馬, dal giorno per triade e dall'anno):** MUTO nei ruoli generali (partenza
48,8% · arrivo 47,1% · ferma 46,6% · nascosta 47,8% · assente 51,1%; dall'anno idem). Nel PB
niente. Unico sfondo: Cavallo del giorno fermo su una linea che la mobile ignora → 45,39% segue
(1.150, z −3,13, allineati) — effetto piccolo spalmato su un gruppo enorme, non una regola.

**Ding Spirit (丁神, il ramo col tronco 丁 nel 旬 del giorno; helper `dingSpirit()`):** MUTO nei
ruoli generali (partenza 48,3% · arrivo 52,3% · ferma 48,6% · nascosta 46,2% · assente 48,6%).
Nel PB niente. Nessun rapporto con l'ora.

**Ma su entrambi torna la stessa cella:** P mobile con partenza = Cavallo → 39,39% segue (66);
P mobile con partenza = Ding → 36,76% (68). Stesso segno del Generale sul P (37,50%).

**Verifica (richiesta di Edu, spiegata con calma): il P cede a QUALSIASI carica o solo agli
spiriti?** Su 893 carte con P mobile, per cosa coincide con la PARTENZA del P:

| partenza del P = | n | segue | z |
|---|---|---|---|
| Generale del Mese | 72 | 37,50% | −2,12 |
| Ding | 68 | 36,76% | −2,18 |
| Cavallo del giorno | 66 | 39,39% | −1,72 |
| **uno dei tre SPIRITI** | **188** | **40,43%** | **−2,63** (43,56 / 33,80) |
| ora dal seme | 146 | 57,53% | +1,82 |
| anno | 69 | 57,97% | +1,32 |
| giorno | 66 | 54,55% | +0,74 |
| mese | 80 | 48,75% | — |
| nessuno spirito | 705 | 50,64% | — |

Non è "qualsiasi carica": le due famiglie fanno l'OPPOSTO. Gli **spiriti** (Generale, Ding,
Cavallo — forze in movimento) che si posano sul P lo *svegliano*: il P, drenatore di G, rompe il
trend. I **pilastri** (ora, giorno, anno — la struttura del tempo) che si posano sul P lo
*calmano*: il trend tiene. Non c'entra il sostegno elementale del giorno (46,67%, nulla; lo
spirito agisce con e senza: 40,5% / 40,4%).

**Via 26 ALLARGATA: P mobile con partenza = uno spirito del giorno (月將 / 丁神 / 驛馬) → NON
segue.** GENVIA=generale (solo 月將) | spiriti (default) | off.

| sistema | via 26 spenta | solo Generale | **tre spiriti** |
|---|---|---|---|
| LY tace | 836 | 821 | **794** |
| S1 | 7,03 · 26.766 | 7,10 · 27.124 | 7,10 · **27.218** |
| S2 | 7,26 · 21.993 | 7,31 · 22.173 | 7,32 · **22.220** |
| S3 | 7,07 · 27.186 | 7,10 · 27.271 | 7,13 · **27.440** |
| **S4** | 7,16 · 27.322 | 7,28 · 27.783 | 7,28 · **27.877** |

Nessun sistema peggiora, periodi allineati. Cavallo e Ding restano senza funzione propria: agiscono
solo come "carica" sul P mobile.

---

# 60. LE VIRTU' — mute da sole, ma 天德 e 支德 BENEDICONO LA W  ·  `FISSATA come RAFFORZATIVO` (16/08/2026)

**Le quattro Virtù nel LY e nel PB (ruoli generali): TUTTE MUTE.** 天德 (Cielo, tabella per mese,
tronco→ramo via 旬 del giorno), 月德 (Mese, per triade), 日德 (Giorno, dal tronco: 甲己寅 乙庚申
丙辛巳 丁壬亥 戊癸巳), 支德 (Ramo, giorno+5). Partenza/arrivo/ferma/nascosta/assente: tutto
45-52%. Nel PB in banda. E — a differenza di Generale/Ding/Cavallo — NON caricano il P (天德 sul P
43,3% discorde; 月德 sul P 57,8% con periodi opposti 74/30). Le Virtù sono benevole e statiche,
non forze in moto: non svegliano il drenatore.

**Ma tre Virtù su quattro sostengono la W** (Edu: "di quanto aumentano l'efficacia di W?"):

| W mobile, partenza = | n | segue | z | recente | vecchio | delta vs W senza |
|---|---|---|---|---|---|---|
| tutte le W mobili | 785 | 50,45% | 0,25 | 51,85 | 50,84 | — |
| nessuna Virtù | 603 | 48,59% | −0,69 | 49,30 | 50,00 | base |
| **una Virtù qualsiasi** | 182 | **56,59%** | 1,78 | 60,58 | 53,42 | **+8** |
| due Virtù insieme | 43 | 60,47% | 1,37 | 64,00 | 58,82 | +12 |
| **天德** | 64 | **62,50%** | 2,00 | 68,57 | 57,14 | **+13** |
| **支德** | 68 | **61,76%** | 1,94 | 65,79 | 59,26 | **+12** |
| 日德 | 36 | 58,33% | 1,00 | 77,78 | 38,89 | discorde — no |
| 月德 | 72 | 44,44% | −0,94 | 45,45 | 46,15 | **−6, va al contrario** |
| spirito (Gen/Ding/Cav) | 171 | 53,80% | 0,99 | 57,73 | 50,75 | +5 (debole) |
| pilastro (ora/g/a/m) | 245 | 48,57% | −0,45 | — | — | nulla |

La W da sola NON è un sostenitore del trend (50,45%). Diventa tale se parte da 天德 o 支德: la W
benedetta nutre G (W genera G) e il trend tiene. 月德 anzi la disturba (usato solo come esclusione).
Nel PB su queste carte: PB "non segue" con W benedetta PERDE (43,18%, −108 pip su 88), PB "segue"
VINCE (56,38%, +377 su 94) — il rovescio delle W senza Virtù. È uno dei casi in cui il "non segue"
del PB sbaglia: rafforzativo, non via.

**Nel termometro (rafforzativo nei contrasti, come l'ora):**

| sistema | z | pip |
|---|---|---|
| S1 (LY vince nei contrasti) | 7,10 | 27.218 |
| S8 = S1 + solo Virtù su W | 7,10 | 27.546 |
| S4 = S1 + ora | 7,28 | 27.877 |
| **S7 = S4 + Virtù su W** | **7,31** | **28.257** |

I due rafforzativi si sommano (54,65 / 57,08 allineati). **S7 diventa il sistema di riferimento:**
nei contrasti PB/LY, se il PB segue il trend e (partenza della mobile = ORA) oppure (mobile = W con
partenza = 天德 o 支德), il PB vince; altrimenti vince il LY.

**Tabella riassuntiva del giro degli spiriti (16/08/2026):**

| spirito | funzione propria | sul P mobile | sulla W mobile | sul G mobile |
|---|---|---|---|---|
| Generale 月將 | no | non segue 37,5% → **via 26** | 45,7% discorde | segue 59% (no uso) |
| Ding 丁神 | no | non segue 36,8% → **via 26** | — | — |
| Cavallo 驛馬 | no | non segue 39,4% → **via 26** | — | — |
| 天德 · 支德 | no | no | **segue 62% → S7** | — |
| 日德 · 月德 | no | no | discorde / contro | — |

Le forze in moto svegliano il P (drenatore di G → rompe il trend); le Virtù benevole nutrono la W
(generatrice di G → sostiene il trend). Nessuno spirito agisce da solo nell'esagramma né nel PB.
Note pipeline: helper globali in pb_stress.js — generaleDelMese(), dingSpirit(), tronco2ramo(),
tiande(), yuede(), ride(), zhide().

---

# 61. SPIRITI DALLO STELO DEL GIORNO — Lu, Medico, Tomb Sha, Ghost Sha, Wealth-of-day  ·  `FISSATA` (16/08/2026)

**Correzione di metodo (Edu):** questi si misurano dallo STELO del giorno e dal suo ciclo di 12
stadi, non dal ramo o dal mese. La mia prima misura (Lu dal tronco — coincideva; Medico dal mese;
Tomb come tomba dell'elemento del ramo) era sbagliata per Medico e Tomb ed è stata rifatta.
Tabelle fissate (STELO_SPIRITI in pb_stress.js):
- **Lu 祿** = stadio 4 (臨官): 甲寅 乙卯 丙戊巳 丁己午 庚申 辛酉 壬亥 癸子
- **Medico 天醫** = sede DLR dello stelo (寄宮) + 2: 甲辰 乙午 丙未 丁酉 戊未 己酉 庚戌 辛子 壬丑 癸卯
- **Tomb Sha 墓煞** = stadio 9 (墓): 甲未 乙戌 丙戌 丁丑 戊戌 己丑 庚丑 辛辰 壬辰 癸未
- **Ghost Sha 鬼煞** = ramo il cui stelo principale controlla lo stelo del giorno, stessa polarità:
  甲申 乙酉 丙亥 丁子 戊寅 己卯 庚巳 辛午 壬辰戌 癸丑未
- **Wealth-of-day 日財** = ramo il cui stelo principale è controllato dallo stelo del giorno, stessa
  polarità: 甲辰戌 乙丑未 丙申 丁酉 戊亥 己子 庚寅 辛卯 壬巳 癸午

**Ruoli generali nel LY (partenza/arrivo/ferma/nascosta/assente): TUTTI MUTI (44-53%).** Nel PB in
banda; unico palazzo negativo: Ghost Sha nel palazzo dello Yong, PB win 48,38%, −850 pip (556).

**Sulla partenza della mobile per parentela:**

| spirito dallo stelo | sulla W | altro |
|---|---|---|
| **Ghost Sha** | **61,90%** segue (63, allineati 62,79/64,71) | P 56,4% (94); mobile piena 54,7% vs vuota 44,6% |
| **Tomb Sha** | **59,49%** (79, allineati 62,22/56,25) | Tomb come ARRIVO della mobile 55,10% (343, z 1,89, allineati) |
| Lu | 43,64% (55, allineati 44,83/44,00) — **contro** | piatto |
| Medico | 47,6% | C sul Medico 34,6% (52) ma discorde 44,8/19,0 |
| Wealth-of-day | 46,7% discorde | arrivo sul 日財 → 44,73% (427, z −2,18, allineati 43,3/43,6) |

**Sorpresa sul Lu:** Edu lo indicava come importante per la W, ma la W che parte dal Lu NON sostiene
il trend (43,6%, allineato). Il Lu è la "paga" dello stelo: forse la W sul Lu è una W che si incassa,
non una W che nutre G. Il Ghost Sha (controllore dello stelo) invece la benedice — da leggere.

**Lista completa di cosa benedice la W mobile (segue > 55%, periodi allineati):**
天德 62,5% · Ghost Sha 61,9% · 支德 61,8% · Tomb Sha 59,5%. Contro: Lu 43,6% · 月德 44,4%.
Nulli: pilastri, Generale/Ding/Cavallo, 日德 (discorde), Medico, 日財.

**Nel termometro (rafforzativo nei contrasti):**

| sistema | z | pip |
|---|---|---|
| S4 = S1 + ora | 7,28 | 27.877 |
| S7 = S4 + 天德/支德 su W | 7,31 | 28.257 |
| **S9 = S7 + Ghost/Tomb su W** | **7,38** | **28.433** |

Periodi allineati (54,78 / 57,02). **S9 diventa il sistema di riferimento:** nei contrasti PB/LY,
se il PB segue il trend e (partenza della mobile = ORA) oppure (mobile = W con partenza su 天德, 支德,
Ghost Sha o Tomb Sha), il PB vince; altrimenti vince il LY.

---

# 62. IL G CHE SI CONSEGNA AL C FORTE — e l'AMBIVALENZA DEL C  ·  `FISSATA` (16/08/2026) — via in TESTA

Nata dalla coppia gemella Kun/Li di marzo 2023 (stesso esagramma, stesso C 卯 Tai Sui = mese timely
su L1 Ying, stesso mese/anno 卯):
- **AUDUSD 07/03/2023**: G fermo e legato dal giorno, W nascosta dietro un B vuoto, P mobile debole
  (non timely, clashato dal mese, esce controllato), B vuoti. Edu: *"nello LY si deve lavorare con
  quello che c'è e non su quello che non c'è; quando TUTTO IL RESTO tace il Qi si concentra su C, e
  C è il produttore di W: SHORT è una scelta di buon senso"* (mercato −148, il PB aveva detto LONG).
- **USDJPY 21/03/2023**: qui il G si MUOVE (L2 丑→寅) e arriva nel Legno, l'elemento del C 卯
  fortissimo che lo controlla. Edu: *"L2 G si muove per essere eliminato da un C fortissimo. Non c'è
  altro da vedere. LONG"* (mercato +106).
Le due gemelle leggono in modo opposto per un solo motivo: **chi si muove**.

**Principio nuovo (Edu): C è AMBIVALENTE.** Quando c'è la W, la genera e la aiuta; quando c'è un G
vicino, lo attacca. Finora il C non aveva mai avuto una via propria (solo come generatore della W
nella §50f): questa è la sua prima regola come attaccante.

**Misure:**
- "Quando tutto tace" (G, W, P, B tutti muti) e resta un C forte fermo → sede del C: **110 carte,
  50,00%** — quando l'esagramma è davvero muto, è muto: il C da solo non decide (C su Ying 46%,
  su Shi 58%, C = TS 6/7 ma carico 2 = 43%). Le 110 sono il cuore del gruppo "LY tace": lasciare
  parlare il PB. La AUDUSD resta lettura di caso.
- G mobile che ARRIVA nell'elemento di un C forte fermo (timely, pieno, vivo) che lo controlla:
  49 carte, segue 42,86% (recente 53,3 / vecchio 29,4); C su Ying 24, 37,5% (63,6 / 18,2); carico 2
  6 carte, 5/6. **G sotto che si consegna → LONG: 60,98% (41, allineati 57,7 / 69,2)** — l'unica
  riga con i due periodi d'accordo. Controllo: G indebolito dall'arrivo SENZA C forte → 50,2%
  (non è il caso 3/4 in sé: serve il carnefice).
- Nota: statisticamente sotto soglia e con periodi non allineati sul "segue"; **fissata su
  indicazione esplicita di Edu come pilastro della dottrina.**

**REGOLA FISSATA (§62, IN TESTA al termometro — GELIMTOP, default attiva):** G mobile che arriva
nell'elemento di un C forte fermo (timely, pieno, vivo) che lo controlla → il G si consegna al
carnefice, il trend muore → **opposto della sede del G** (G sotto → LONG, G sopra → SHORT).
In coda al termometro era soffocata dalle vie di G precedenti (1 carta); IN TESTA governa le sue
carte e tutti i sistemi salgono: S1 7,07→7,13 · S3 7,13→7,22 · **S9 7,35→7,41 · 28.408 pip**,
periodi allineati. È il posto giusto per un pilastro sul G (indicatore primario).

**Piste minori registrate (dalla stessa carta):** TS fermo su Ying/Shi con UNA carica (timely o
= mese/giorno) → segue 57-63% (allineati); con DUE cariche → 44% (il "fortissimo" è troppo);
TS altrove → 46% (z −2,41). G-TS su Ying → sede 74% (35, allineati 81/64). Trasporto sulla W
nascosta (arrivo combina la linea che la nasconde, W nutrita da C timely): 21 carte, 100% recente /
36% vecchio — vive solo nel recente, in sospeso.

---

---

## PRINCIPI DI LETTURA DI EDU (raccolti il 17/08/2026 — da rileggere a ogni ripartenza)

Questi principi guidano OGNI lettura, prima delle singole vie. Se una via li contraddice, è la via
da rivedere. Ognuno è già cablato dove indicato, ma il principio vale più della sua cablatura.

1. **Precedenza dello Yong Shen.** G e W parlano per primi. P, B, C si leggono solo se G e W non
   parlano (vivi, pieni, timely o mobili). Il B è notoriamente un indicatore negativo. (§64, §66)
2. **Priorità residua.** Se G e W tacciono, B è vuoto e P debole, decide l'attore forte che resta:
   "quando non ci sono alternative migliori si va all'unica disponibile, anche se non piace". (§63, §64)
3. **Si va dove si svolge l'azione.** È l'azione che guida l'interpretazione, non la forza in sé: la
   forza da sola non dà direzione (misurato: Ying/Shi/mobile forti ≈ 50%), pesa DENTRO un'azione. (§63,
   §67, §68, §69)
4. **Capannello e corridore.** Un raduno completo (tre presenti) basta a richiamare l'attenzione: il Qi
   si ferma lì. Se invece qualcuno "corre" (l'arrivo va a clashare/combinare) si guarda dove va. (§67, §68)
5. **Lo Yong Shen cambia la lettura della stessa azione ("dipende").** Clash dell'arrivo: P clashata
   cede, G e C reggono, W che corre porta il Qi con sé. (§68)
6. **Il vuoto non agisce.** Una linea vuota, anche timely, non si oppone e non difende (lascia libero un
   raduno). Il vuoto prospero di mese resta vuoto quanto ad azione. (§67; nel PB la 旺不为空 vale solo
   per il palazzo del Trend)
7. **Certe carte non hanno alternative: si legge l'unica cosa che c'è.** Movimento nullo → si guarda
   chi tocca il giorno (Ying sul giorno; l'unica ferma clashata dal giorno). (§65, §69)
8. **Chi non vince perde.** L'azione fallita (回頭剋, autocombinazione, arrivo clashato) non porta la
   sua direzione. (§52)
9. **È l'arrivo che agisce**, mai la partenza (salvo il trasporto §56 e i rafforzativi ora/W).
10. **Metodo di verifica.** Per respingere una lettura dottrinale va presentata ALMENO UNA CARTA
    completa (con seme) dove non funziona; le percentuali da sole non bastano. Le confutazioni "a
    percentuale" fallivano perché non pesavano la forza → modello di forza (mese su tutte; giorno e
    anno solo sul focus; ora 20%; raduno completo +2; vuoto −2; nascosto; ferme adiacenti solo se la
    madre è timely).
11. **Le regole devono reggere nei due periodi** (recente / vecchio) e non si ribaltano i verdetti per
    inseguire i numeri.

---

## §63 — 回頭生 BLOCCATO: l'arrivo trova qualcuno da clashare (17/08/2026)

**Carta:** EURJPY 06/02/2025 · Li 離 (Fuoco) sopra Kan 坎 (Acqua) = 未濟 Wei Ji, palazzo Li · mutante L4
W 酉 (Metallo) → 戌 (Terra), caso 1 回頭生 · seme 158 · giorno 丙午 · mese 寅 · anno 巳 · ora dal seme 丑
· vuoti 寅卯 · Tai Sui 巳 su L6 (B, Ying, fermo, timely) · Shi L3 B 午 = giorno, nascosto G 亥.
Trend EMA SHORT · PB dice LONG (non segue) · esito SHORT −147 pip · il mercato ha seguito il trend.
Termometro (27 vie): LY tace → S9 = PB solo → perdita. Prima carta del giro "LY tace" (793).

**Lettura di Edu:** L4 si muove e dovrebbe generare indietro (戌 Terra → 酉 Metallo, 回頭生) decretando
il LONG (sede della W sopra) — ma non lo fa, perché l'arrivo 戌 trova L2 (C 辰) da clashare (辰↔戌).
La W 酉 è debolissima (Metallo in mese 寅), 辰 è fortissimo (Terra generata da giorno 午 e anno 巳):
per mancanza di priorità migliori (G assente, W debole) il C su L2 diventa il decisore → la sua sede,
sotto → SHORT.

**Meccanica cablata:** mobile NON timely + caso 1 (回頭生) + l'arrivo clasha UNA linea ferma FORTE
(timely o sostenuta da giorno/anno) → la generazione di ritorno non si compie, la linea clashata decide
→ la sua sede (sotto → SHORT, sopra → LONG).

**Misure (dopo le 26 vie precedenti; sede del bersaglio):**
| cella | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| A. arrivo clasha 1 linea ferma → sede del bersaglio (tutte) | 1310 | 47,7% | 48,4 | 47,1 | −1897 |
| D. mobile debole + bersaglio forte | 505 | 49,7% | 47,8 | 52,9 | +76 |
| D su LY tace | 89 | 53,9% | 54,4 | 54,8 | −181 |
| **I. D + caso 1 (回頭生 fallito) su LY tace** | **17** | **70,6%** | **69,2** | **75,0** | **+149** |
| I su LY parla (un'altra via ha già parlato) | 40 | 42,5% | 28,6 | 55,6 | +100 |
| G. D + bersaglio C su LY tace | 9 | 77,8% | 75,0 | 100 | +130 |
| H. D + mobile W + bersaglio C su LY tace | 8 | 75,0% | 71,4 | 100 | +113 |
| H su LY parla | 19 | 36,8% | 33,3 | 42,9 | −292 |
| controllo: mobile forte + bersaglio debole (LY tace) | 20 | 35,0% | 46,2 | 14,3 | −251 |
| controllo: entrambi deboli (LY tace) | 53 | 43,4% | 48,6 | 35,3 | −258 |

La parte che regge è la MECCANICA (回頭生 che non torna perché l'arrivo è occupato a clashare un
forte): 17 carte, 70,6%, allineate. La specificazione W→C è troppo piccola (8-9 carte). Fuori dal
gruppo LY-tace la lettura PERDE (36-42%): va tenuta in coda, dove parla solo se nessuna via ha risposto.
Sotto soglia (z 1,70): **fissata come pilastro dottrinale su indicazione di Edu.**

**REGOLA FISSATA (§63, via 27, IN CODA — VIA63=off per spegnere):** mobile debole, caso 1, arrivo
clasha una linea ferma forte → sede della linea clashata.
Grande test: LY tace 793 → 776 · S1 7,13→7,16 (26.938) · **S9 7,41→7,47 · 28.209 pip** (z sale,
−199 pip: quattro carte grandi contro) · periodi allineati (54,92 / 57,02).
Parità software ↔ pb_stress.js dopo la cablatura: 0 disallineamenti su 4.111 (LY e S9).

**Chiarimento sulle linee ferme (richiesto da Edu).** Nel resoconto della carta avevo notato che i due
B fermi (L3 = giorno 午, L6 = Tai Sui 巳) sono entrambi Fuoco timely, e avevo ipotizzato che questo
sostenesse il "segue" (SHORT). Misurato: **B fermo sul giorno + B fermo sul Tai Sui, entrambi timely
→ segue 32,0% (25 carte, 30,8 / 30,0)** — è l'OPPOSTO: la carta segue il trend NONOSTANTE i due
Fratelli, non grazie a loro. In generale "linea ferma = giorno + linea ferma = Tai Sui, stessa
parentela" → segue 40,9% (88); B fermo timely sopra E sotto → 48%. La mia ipotesi (a) è RESPINTA;
resta valida solo la lettura di Edu (§63). Ipotesi (b) "W rafforzata da un arrivo = Tomb Sha → W falsa"
non misurata: la carta si spiega già con la §63.

**§63-bis — la W assediata (17/08/2026, stessa carta).** Edu: sulla EURJPY c'è anche un raduno
direzionale del Fuoco 三會 巳午未 fra **L6 巳** (Tai Sui, B), **L5 未** (C) e il **giorno 午** (che è
anche L3 Shi); il Fuoco raccolto controlla il Metallo della W 酉 (L4, la mobile) → W inagibile, e di
nuovo si va su L2 a cercare l'azione (il clash dell'arrivo). "Si deve andare dove si svolge l'azione,
specie in queste carte così sbilanciate."

**Misure (raduno 三會 o 三合 fra linee FERME + giorno/mese/anno, dell'elemento che CONTROLLA la mobile):**
| cella | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| raduno controllante da solo → sede della mobile | 418 | 51,2% | 53,5 | 47,3 | — |
| raduno controllante da solo → segue? | 418 | 47,6% | 46,5 | 46,7 | — |
| **mobile timely ma assediata + caso 1 + arrivo clasha 1 ferma forte → sede bersaglio (LY tace)** | **10** | **70,0%** | **66,7** | **100** | **+356** |
| stessa cella, tutte le carte | 21 | 61,9% | 62,5 | 60,0 | +457 |
| §63 allargata (debole O assediata), tutte | 78 | 53,8% | 50,0 | 59,3 | +706 |
| controllo: raduno che SOSTIENE la mobile (stesso el. o la genera) | 737 | 51,8% | 51,4 | 51,3 | — |

Il raduno da solo non decide nulla: conta solo come SECONDA CAUSA di inagibilità della mobile dentro la
meccanica della §63 (l'azione va cercata dove l'arrivo agisce). Piccola ma allineata; **fissata su
indicazione di Edu.**

**REGOLA FISSATA (§63-bis, dentro la via 27):** la mobile è inagibile se NON timely **oppure** se
timely ma assediata da 三會/三合 controllante (linee ferme + giorno/mese/anno); poi come §63.
Grande test: LY tace 776 → 766 · S1 7,16→7,22 (27.234) · S3 7,28 · **S9 7,47→7,50 · 28.266 pip**
(recente 54,96 / vecchio 57,02). Parità software ↔ pb_stress.js: 0/4.111.
Nel software la via si chiama "Return-generation blocked: go where the action is" e la lettura scrive
"weak / besieged by the Fire gathering 巳午未 …" con i rami reali.

---

## §64 — PRIORITÀ RESIDUA: G e W tacciono, decide il più forte fra P e C (17/08/2026)

**Carta:** AUDUSD 07/03/2023 · Kun 坤 (Terra) sopra Li 離 (Fuoco) = 明夷 Ming Yi, palazzo Kan · mutante L6
P 酉 → 寅 (caso 4, arrivo 寅 combina 亥 che è VUOTO su L3/L5 → il movimento finisce nel vuoto) · seme 67
· giorno 甲子 · mese 卯 · anno 卯 · ora 午 · vuoti 戌亥 · Tai Sui 卯 su L1 (C, Ying, = mese, = Ding, 旺).
G L2/L4 legati dal giorno 子 (子合丑); B L3/L5 vuoti; W solo nascosta sotto L3 (午, clashata dal giorno);
P mobile debole (Metallo in primavera). Trend EMA SHORT · PB dice LONG · esito SHORT −148 · perdita.
Termometro (27 vie): LY tace. Seconda carta del giro.

**Lettura di Edu:** "Ying fortissimo con C vince → SHORT". E richiamo del criterio già enunciato: questo
modo di leggere si basa sull'ASSENZA delle priorità precedenti — G e W non parlano, B vuoto, P
debolissimo — per cui decide l'attore forte residuo. Il criterio di precedenza (16/08) era a registro
come principio ma NON era cablato come via: corretto oggi. Edu: "è il secondo caso quando tu mi avevi
detto che era rarissimo" (il 16/08 avevo misurato "quando tutto tace + C forte" a 50% su 110 e lasciato
al PB — quella cella era mal definita: non filtrava G/W per forza e non sceglieva il decisore per forza).

**Letture intermedie misurate e RESPINTE su questa carta:** (a) giorno clasha il nascosto W 午 sotto L3
→ sede dell'ospite: 330 carte 46,4%, su LY tace 60 carte 35,0% (ospite vuoto: 16 carte 18,8%) —
il clash del giorno sul nascosto DISPERDE, non estrae (conferma del 15/08); (b) nascosto clashato
"costretto a generare" il G 丑 di L2 → sede della generata: 120 carte 50,8%, su LY tace 15 carte 26,7%;
(c) Ying C = Tai Sui → sede: 39 carte 41,0% (solo recente); Ying = TS timely qualunque parentela:
108 carte 56,5%, su LY tace 28 carte 60,7% — regge come sottocaso della §64.

**Misure della PRIORITÀ RESIDUA (G/W "non parlano" = nessuno vivo, pieno e timely-o-mobile; decisore =
più forte fra P/B/C per punteggio timely+TS+mese+giorno+sostegno del giorno, unico):**
| cella | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| decisore unico, tutte le carte | 815 | 51,8% | 52,2 | 50,6 | +636 |
| **decisore FERMO, su LY tace** | **116** | **56,0%** | **56,7** | **53,8** | **+955** |
| decisore C, LY tace | 47 | 59,6% | 54,2 | 61,9 | +599 |
| decisore P, LY tace | 60 | 56,7% | 57,9 | 54,5 | +266 |
| **decisore B, LY tace** | 52 | **42,3%** | 45,8 | 38,5 | −111 |
| decisore = Tai Sui, LY tace | 27 | 51,9% | 52,6 | 50,0 | +317 |
| decisore su Ying / su Shi, LY tace | 26 / 20 | 53,8 / 60,0 | — | — | — |
| controllo: G/W parlano, decisore residuo | 1411 | 50,2% | 50,4 | 50,8 | −238 |

Fuori dal gruppo LY-tace la regola è muta (le vie di G/W hanno già parlato): sta in CODA. Il B residuo
va contro: escluso.

**REGOLA FISSATA (§64, via 28, IN CODA — VIA64=off per spegnere):** G e W non parlano → il più forte fra
P e C, se unico per punteggio, decide → la sua sede (sotto → SHORT, sopra → LONG); il B residuo non decide.
Grande test: LY tace 766 → **659** · S1 7,22→7,44 (27.942) · S3 7,28→7,41 · **S9 7,50→7,72 · 29.004 pip**
(recente 55,14 / vecchio 57,14, entrambi su). Parità software ↔ pb_stress.js: 0/4.111.
Nel software: "Residual priority: G and W silent → strongest P or C decides", con la lettura che elenca
le cariche del decisore (timely, Tai Sui, = month, = day, backed by the day).

---

## §65 — NIENTE SI MUOVE: lo Ying sul giorno decide (17/08/2026)

**Carta:** EURJPY 05/03/2025 · Li 離 (Fuoco) sopra Gen 艮 (Monte) = 旅 Lü, palazzo Li · mutante L2 B 午 →
亥 VUOTO (caso 0, movimento nullo) · seme 159 · giorno 癸酉 · mese 寅 · anno 巳 · ora 寅 · vuoti 戌亥 ·
Tai Sui 巳 su L6 (B) · Shi L1 C 辰 legato dal giorno (辰合酉) · Ying L4 W 酉 = GIORNO. Trend EMA LONG ·
PB dice SHORT · esito LONG +145 · perdita. Terza carta del giro (LY tace 659).

**Lettura di Edu:** "Semplicissima: Shi genera Ying, LONG. Certe carte non hanno alternative, quindi si
legge l'unica alternativa possibile: la mobile finisce nel nulla, non si muove niente, l'unica cosa che
salta all'occhio è Shi che genera Ying, che è il giorno stesso."

**Misure.** "Shi genera Ying → sede Ying" in generale NON regge: 445 carte 51,0%; su LY tace 55 carte
43,6%; con Ying W 24 carte 33,3%; Shi-Ying che si combinano (辰酉) 20 carte 30,0% (conferma: la lettura
statica Shi/Ying non ha mai misurato, v. LY autonomo v1-v4 bocciato l'11/08). Ristretta al MOVIMENTO
NULLO: Shi genera Ying → 195 carte 48,7%; ciò che decide è **Ying = giorno**:
| cella (→ sede dello Ying) | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| Ying fermo sul giorno, tutte | 295 | 50,2% | 52,7 | 47,8 | −237 |
| Ying sul giorno, LY tace | 35 | 54,3% | 56,3 | 52,9 | +64 |
| **Ying sul giorno + movimento NULLO, LY tace** | **12** | **91,7%** | **100** | **83,3** | **+372** |
| Ying sul giorno + movimento VIVO, LY tace | 23 | **34,8%** | 36,4 | 36,4 | −308 |
| Ying sul giorno + movimento nullo, LY parla | 135 | 47,4% | 49,4 | 44,2 | −518 |
| Shi sul giorno + movimento nullo → sede Shi | 26 | 34,6% | 41,7 | 30,8 | +17 |
Le 12: USDJPY 09/11/2020 (unica sbagliata, −213), AUDUSD 15/09/2025, USDCAD 31/03/2021, 07/04/2022,
31/01/2023, NZDUSD 06/04/2022, 31/07/2023, 08/11/2024, EURJPY 30/09/2020, 10/06/2021, 26/02/2025,
05/03/2025. Il controllo è pulito: il giorno sullo Ying parla SOLO nel silenzio della carta; con la
mobile viva è la mobile che comanda. Vale per lo Ying, non per lo Shi. Fuori da LY tace è muta → coda.
Assorbe la pista del 16/08 "TS su Ying con una carica → segue 57-63%" e quella di oggi "Ying con ≥3
cariche → 80% (10)": era il movimento nullo a farle funzionare, non il numero di cariche.

**REGOLA FISSATA (§65, via 29, IN CODA — VIA65=off per spegnere):** movimento nullo della mobile + Ying
fermo sul ramo del giorno → sede dello Ying (sotto → SHORT, sopra → LONG).
Grande test: LY tace 659 → **647** · S1 7,50 (28.062) · S3 7,47 · **S9 7,72→7,78 · 29.124 pip**
(recente 55,23 / vecchio 57,08). Parità software ↔ pb_stress.js: 0/4.111.
Nel software: "Nothing moves: Ying on the day branch decides".

---

## §66 — B AVANZANTE nel gua inferiore: il trend vince sopra (17/08/2026)

**Carta:** USDJPY 30/04/2024 · Li 離 (Fuoco) sopra Zhen 震 (Tuono) = 噬嗑 Shi He, palazzo Xun 巽 · mutante
L2 B 寅 → 卯 (caso 5, AVANZANTE 進神, partenza = Cavallo, arrivo = Ding, arrivo clasha G 酉 L4) · seme 156
· giorno 甲子 · mese 辰 · anno 辰 · ora 亥 · vuoti 戌亥 (nessuno in carta) · Tai Sui 辰 su L3 (W = mese)
· Shi L5 W 未 · Ying L2 (la mobile) · tutte le linee piene e timely (carta densa). Trend EMA LONG · PB
dice SHORT · esito LONG +140 · perdita. Quarta carta del giro (LY tace 647).

**Lettura di Edu:** "B avanza su L2 per clashare il G L4, che è combinato da mese e anno (辰酉合) e non si
fa spazzare via → LONG. Inoltre un B che avanza nel gua inferiore sarebbe già indicazione di un trend
vincente sull'altro lato. Il B è notoriamente un indicatore negativo."

**Misure.** (a) Bersaglio clashato DIFESO (combinato da giorno/mese/anno) → sede del bersaglio: 256 carte
48,0%; su LY tace 54 carte 44,4%; con bersaglio G 34 carte 41,2%; controllo (bersaglio NON difeso) 47,6%
— nei dati la difesa per combinazione non cambia l'esito del clash → RESPINTA. (b) B avanzante:
| cella | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| B avanzante → lato opposto (sotto→LONG, sopra→SHORT), tutte | 120 | 45,0% | 44,8 | 44,8 | −396 |
| idem, LY parla | 106 | 42,5% | 39,6 | 44,4 | −773 |
| **B avanzante SOTTO → LONG, LY tace** | **11** | **72,7%** | **75,0** | **66,7** | **+347** |
| mobile avanzante (ogni parentela) sotto → LONG, LY tace | 19 | 68,4% | 66,7 | 75,0 | +572 |
| mobile avanzante SOPRA → SHORT, LY tace | 32 | 37,5% | 36,8 | 38,5 | −89 |
L'avanzata del B paga solo dal basso e solo dove nessuna via ha parlato; fuori da lì dà l'opposto.
Edu sceglie la versione stretta al B (indicatore negativo). Sotto soglia; **fissata per dottrina.**

**REGOLA FISSATA (§66, via 30, IN CODA — VIA66=off per spegnere):** B mobile avanzante nel gua inferiore
→ LONG. Grande test: LY tace 647 → **636** · S1 7,50→7,66 (28.624) · S3 7,60 · **S9 7,78→7,94 · 29.686 pip**
(recente 55,40 / vecchio 57,14). Parità software ↔ pb_stress.js: 0/4.111.
Nel software: "B advancing in the lower trigram: the trend wins above".

---

## MODELLO DI FORZA (17/08/2026) e §67 — raduno del Legno sotto: forte sale, debole affonda

**Origine.** Su USDJPY 30/04/2024 (LONG +140) e sulla sua gemella USDCHF 16/09/2024 (SHORT −30, stesso
esagramma Zhen sotto, stessa mobile L2 B 寅→卯, stesso G 酉 clashato) le mie confutazioni "a percentuale"
non reggevano: Edu — "le carte che mi proponi per confutare ribaltano quasi sempre la tua aspettativa a
causa del timeliness/forza delle linee". Il motore conosceva solo timely/non timely e "sostenuto dal
giorno". Costruito il MODELLO DI FORZA (liuyao.js `forzaModello`, esposto nel software colonna "Force"
+ "Hidden force", riga arrivo/raduni, dettaglio al click), dottrina fissata da Edu:
- Mese: SEMPRE, su tutte le linee — prospero +2 · in crescita +1 · riposo 0 · imprigionato −1 · morto −2.
  Terra prospera nei quattro mesi di Terra, e lo è anche l'elemento stagionale (si prende il migliore).
- Giorno e anno: forti SOLO sul FOCUS (la linea che la regola sta esaminando). Giorno: stesso +1,5,
  genera +1, controlla −1, clasha −1 (il clash RIEMPIE una linea vuota solo se timely), combina: forza
  invariata ma legata. Anno: stesso +1, genera +0,5, controlla −0,5.
- Ora dal seme: 20% del timeliness — stesso ramo +0,4, stesso elemento +0,3, genera +0,2.
- Raduno (三會/三合, linee + arrivo + giorno/mese/anno): solo COMPLETO, niente mezzo raduno, NON vale
  con uno dei tre vuoti; +2 all'elemento del raduno.
- Vuoto −2 salvo prospero di mese (0). MA: una linea vuota, anche timely, NON AGISCE (non si oppone
  a un raduno, non difende).
- Mobile: alla partenza l'effetto dell'arrivo — 回頭生 +1 · 比和 +0,5 · 回頭剋 −2 · 進神 +1 · 退神 −1 ·
  movimento nullo → la partenza non agisce.
- Nascosto: forza del proprio elemento; ospite vuoto lo lascia uscire, ospite pieno lo copre (−1).
- Ferme adiacenti: si nutrono SOLO se la madre è timely (+1 al figlio); un figlio timely può esaurire
  la madre non timely (−1 alla madre).

**Correzione mia (svista):** in una lista precedente avevo letto "via —" come "nessuna via" e detto "6/6
sul gruppo LY tace"; "—" è invece l'etichetta delle vie 1-6 (senza § nel registro): quelle carte erano
spiegate dalle vie 2 e 6. Corretto qui.

**Misura col modello (raduno 三會 completo nel trigramma della mobile, forza della mobile come focus):**
| cella | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| **sotto, forte (≥3) → LONG, LY tace/coda** | **7** | **100%** | 100 | 100 | +363 |
| **sotto, debole (<3) → SHORT, LY tace/coda** | **4** | **100%** | 100 | — | +90 |
| sotto forte → LONG, LY parla | 30 | 36,7% | 57,1 | 20,0 | −40 |
| sopra (forte → SHORT / debole → LONG) | 13 | 46% | — | — | — |
Le 7 forti: USDJPY 30/04/24, USDCHF 02/01/24, EURJPY 24/02/25, EURGBP 25/11/21, 18/05/22, 14/05/25,
EURUSD 21/07/25 (tutte LONG). Le 4 deboli: USDCHF 10/09 e 16/09/24, EURGBP 10/09 e 16/09/24 (Legno
morto nel mese 酉, forza 1,7, G 酉 vuoto che non si oppone; tutte SHORT). Fuori dal gruppo di coda la
lettura non vale (37%): coda. Le tre carte perse dalla §66 erano proprio le "deboli".

**REGOLA FISSATA (§67, via 31, in coda PRIMA della §66 — VIA67=off per spegnere):** raduno 三會 completo
nel trigramma inferiore (mobile partenza/arrivo + ferme, nessun vuoto) → forza della mobile ≥ 3 → LONG;
< 3 → SHORT. Grande test: LY tace 636 → 635 · S1 7,66→7,72 (28.720) · S3 7,66 · **S9 7,94→8,00 ·
29.782 pip** (recente 55,49 / vecchio 57,14). Parità software ↔ pb_stress.js: 0/4.111.
Nel software: "Wood gathering in the lower trigram: strong rises, weak sinks", con la forza e il suo
dettaglio nella lettura.

**Da fare col modello di forza:** rimisurare le letture di forza già respinte "a percentuale" (G difeso
dalla combinazione, Ying forte, W assediata §63-bis, nascosto clashato) usando i punteggi; valutare se
il modello può sostituire "timely" nelle vie esistenti (una via alla volta, parità dopo ogni cambio).

---

## §68 — CLASH DELL'ARRIVO letto per YONG SHEN (17/08/2026)

**Origine.** Coppia USDJPY 24/06/2024 (seme 159: L6 B 巳→戌 clasha L1 辰 Shi+Tai Sui, mercato SHORT) e
USDJPY 02/06/2026 (seme 159, stessa azione, Tai Sui su L2, mercato LONG). Poi USDCHF 03/01/2023 (seme 92,
L5 W 未→申 clasha il Tai Sui B 寅 di L2 MA combina il C 巳 di L6 → LONG +113).
Edu: "capannello per strada → ti fermi (raduno: il Qi resta); uno che corre attraversando → guardi dove
va (si segue l'arrivo)". E: "dipende — esiste lo Yong Shen (Spirito del Focus): nel LY sono B, C, W, G, P,
ognuno fa cose diverse e l'interpretazione si adatta a quello che fanno".

**Misure (arrivo che clasha SOLO una linea ferma piena, nessuna combinazione; → sede della clashata):**
| cella | n | giuste | recente | vecchio | pip |
|---|---|---|---|---|---|
| tutte | 332 | 43,7% | 45,8 | 41,2 | −1739 |
| **clashata P, coda** | 35 | **25,7%** (→ 74% opposto) | 30,0 | 20,0 | −788 |
| clashata P, tutte | 105 | 36,2% | 36,7 | 38,5 | −1017 |
| **clashata G, coda** | 13 | **76,9%** | 87,5 | 60,0 | +411 |
| **clashata C, coda** | 25 | **64,0%** | 64,7 | 62,5 | +666 |
| clashata B / W | 141 / 111 | 45,4 / 45,0 | — | — | — |
| **mobile W che clasha, coda** | 33 | **60,6%** | 57,7 | 71,4 | +584 |
| mobile W clasha W | 30 | 63,3% | 68,2 | 57,1 | +256 |
| mobile B che clasha, coda | 33 | 45,5% (B clasha P: 1/16) | — | — | — |
| mobile G / C che clasha, coda | 15 / 12 | 26,7 / 33,3 | — | — | — |
Il corridore che va a COMBINARE arriva davvero (clasha E combina → sede combinata 60% vs 40%; solo
combina, altro lato 54,8%). Quello che va a CLASHARE: la P investita cade sempre, G e C reggono il colpo;
se chi corre è una W ci si volta e si va dove va lei.
Il caso "clashata = Tai Sui" da solo NON regge (35 carte 40%; coda 10 carte 60%): la 24/06/2024 si spiega
per il C clashato (L1 C 辰 → regge → SHORT), non per il Tai Sui.

**REGOLA FISSATA (§68, via 32, IN CODA — VIA68=off per spegnere), ordine come proposto e accettato:**
1) clashata P → sede opposta; 2) clashata G o C → sede clashata; 3) altrimenti mobile W → sede clashata.
Grande test: LY tace 635 → **578** · S1 7,72→7,94 (29.192) · S3 7,88 · **S9 8,00→8,25 · 30.378 pip**
(recente 55,62 / vecchio 57,44). Parità software ↔ pb_stress.js: 0/4.111.
Nel software: "Arrival clash read by the Yong Shen (who is hit, who hits)".

---

## §69 — UNICA AZIONE: il giorno clasha una ferma mentre nulla si muove (17/08/2026)

**Carte:** USDJPY 13/02/2024 (seme 149; Dui/Xun, L3 G 酉→午 sospeso dal giorno 未; il giorno clasha lo
Ying L1 W 丑 PIENO → "rotto" → LONG +137) e USDCHF 27/12/2023 (seme 85; stessa carta, Ying L1 W 丑
VUOTO clashato dal giorno → "esce dal vuoto e decide" → SHORT −105 per la lettura opposta).
Edu: "due tentativi non riusciti, chi non vince perde" (13/02); "l'unica differenza è L1: era vuoto ed è
clashato fuori dal vuoto → diventa il fattore che decide" (27/12). E, richiamato il principio: "se non
ci sono migliori alternative si va verso l'unica disponibile anche se non ti piace. È l'azione che
guida l'interpretazione. Se W è vuoto e viene clashato fuori dal vuoto — e altrove non succede niente —
è QUI che si DEVE guardare."

**Misure (movimento nullo, nessun raduno, il giorno clasha esattamente UNA ferma; vuota → sede, piena →
opposta):** tutte 134 carte 47,0% (53,1 / 40,3); **coda 31 carte 61,3% (72,2 / 46,2), +280**; ramo
"piena → opposta" coda 28 carte 60,7% (72 / 40); ramo "vuota → sede" 19 carte 36,8% (di cui 3 in coda).
Famiglia più larga (già misurata prima): "ferma vuota clashata dal giorno → sede" 348 carte 48,9%;
"nascosto vuoto/debole estratto dal clash del giorno" 15/08 44%, 17/08 46%: nei dati il clash del giorno
non riempie. Movimento nullo → lato opposto (chi non vince perde esteso): 1.966 carte 51,2%.
**Nessuna carta singola contraria decisiva** da opporre (celle a metà, non un controesempio netto):
per metodo, fissata come **pilastro dottrinale su insistenza di Edu**, con sostegno statistico DEBOLE e
periodi non allineati — da tenere d'occhio nell'holdout.

**REGOLA FISSATA (§69, via 33, IN CODA — VIA69=off per spegnere):** movimento nullo + nessun raduno + il
giorno clasha una sola ferma → vuota: sua sede; piena: sede opposta.
Grande test: LY tace 578 → **553** · S1 7,97 (29.114) · S3 7,85 · **S9 8,25→8,28 · 30.270 pip** (−108 pip,
recente 55,67 / vecchio 57,44). Parità software ↔ pb_stress.js: 0/4.111.

## §70 — NA YIN dell'esagramma iniziale come INDICATORE DI CONFIDENZA del LY (18/08/2026)

**Ipotesi Edu:** il Na Yin dell'esagramma iniziale (XKDG: esagramma → jiazi → Na Yin) entra come attore in più
nel gioco delle relazioni a cinque elementi, rafforzando o indebolendo Ti, Yong o le parentele LY (B/C/W/G/P).

**Misura (universo LY parla, 3.550 carte):**
- Na Yin INDEBOLISCE il B (lo controlla o lo drena): 1.453 carte · 57,67% · z 5,85 · +11.817 pip
- Na Yin RAFFORZA il B (uguale o lo genera): 1.246 carte · 56,02% · z 4,25 · +9.497 pip
- Na Yin neutro sul B: 851 carte · 54,76% · z 2,78 · +3.000 pip
- baseline LY solo: 56,39% · z 7,62 · +24.314 pip

**Verdetto:** il Na Yin che colpisce il B (bandiera negativa) segnala che il LY è più affidabile su quella carta;
non è un segnale di direzione. Provato come:
- rafforzativo del PB nel contrasto (S10): −3.298 pip rispetto a S9 → **danneggia**
- decisore nel gruppo LY tace (561 carte): tutte le varianti peggiori del PB da solo → **danneggia**
- override del LY (forza segue/non segue, salto contrasti): tutte peggiori della baseline → **danneggia**

**Registrato come:** indicatore di confidenza del LY, NON cablato come via né rafforzativo. Da tenere per
un'eventuale pesatura delle posizioni (LY più preciso quando Na Yin indebolisce B).

**Osservazione collaterale:** Na Yin vs Yong PB, "Yong controlla il Na Yin" → 699 carte · 57,51% · z 3,97,
concentrato nella via 我生 (253 carte, 60,47%, z 3,33). Sotto soglia, in osservazione.

**Piste chiuse (18/08/2026, provate senza esito):**
- Tre Messaggi 三傳 del DLR: nessuna cella oltre z 2 (ruolo nell'esagramma, Shi/Ying/mobile, palazzi PB)
- 1a–4a lettura DLR (四課): nessuna cella oltre z 2,8
- ramo celeste sopra anno/mese/ora (DLR): nessuna cella oltre z 2,3
- numerazione XKDG (Kun1 Xun2 Li3 Dui4 Zhen8 Gen6 Kan7 Qian9), somma Hetu 5/10/15, Sheng/Ke In-Out
  senza Terra: nessuna cella oltre z 3, nessun rinforzo combinato
- risonanza (scala mobile) su tutto il dataset: pulita 49,8%, bloccata 44,9% → nessun edge; regge solo
  su 34 carte LY tace bloccate (58,8%) — troppo poche per cablare
- Qi bloccato su B via combinazione 六合 → SHORT: 36 carte LY tace, 44,4% → non regge

## §71 — GUA SHEN (卦身) e confronto SHI↔YING: piste chiuse (18/08/2026)

**Gua Shen (卦身).** Definizione (Edu): sulla linea Shi, se yang L1..L6 → 子丑寅卯辰巳; se yin → 午未申酉戌亥.
Provate tre formulazioni, tutte con la lettura doctrinale di Edu integrata:
1. GS singolo, ruolo nell'esagramma (partenza/arrivo mobile, ferma, nascosto, assente): nessuna cella oltre z 2,5 come direzione
2. Due GS (Shi e Ying, uno per clan), parteggiamento a punteggio (stesso ramo +2, combina/genera +1, clash/controlla −1): 3.482 carte, 50,57%
3. Due GS come innescatori di AZIONI, con la regola del clash corretta ("il clash muove la linea sulla propria
   trasformazione: conta solo se il ramo futuro è diverso"), combinazioni doppie che si annullano, vuoto che non
   conta: 3.335 carte, 50,85%; nel LY tace 49,25%. Il codice riproduce fedelmente la lettura di Edu su EURJPY
   28/04/2022 (SHORT attivo ma non vince → LONG) ma generalizzata non predice.
   Contro-esempio: USDJPY 15/11/2024 (GS-Ying = ramo dello Shi = giorno, margine 4 → LONG; mercato sceso −213).
Osservazione: il sistema va meglio dove il GS è "muto"/assente (57–60%). Non cablato.

**Confronto diretto Shi↔Ying.** Rimisurato con motore attuale in 7 forme (elementale, mobile=Shi/Ying, arrivo che
colpisce Shi/Ying, coppie di parentele, sostegno della data, vuoto, giorno che tocca): tutte ≈50%, nessuna oltre z 2.
Ripetuto con Shi/Ying letti ATTRAVERSO la mobile (tomba 墓 = 辰Acqua/未Legno/戌Fuoco/丑Metallo, clash/controllo
dall'arrivo, vuoto), regola "la tomba spegne l'azione di chi la subisce": 2.647 carte, 48,21%, −4.842 pip.
Il codice riproduce la lettura di Edu su EURJPY 19/12/2024 (Ying in tomba non genera lo Shi → Shi non vince → LONG),
ma su 401 carte simili: 46,38%.
Dato chiave: LY contrario al modello Shi/Ying vince 58,13% vs 55,45% quando concorde.

**Perimetro (Edu):** chiuso SOLO il confronto diretto Shi↔Ying come fonte di direzione. Shi e Ying restano
attori in tutte le vie che già li usano (§65 Ying sul giorno, clan/sede, bersagli di clash e combinazione, ecc.).
La carta continua a essere interpretata come sempre.

**Errori di sessione (18/08/2026):** due errori di segno sul movimento del mercato (EURJPY 09/12/2024 e 28/04/2022)
e un contro-esempio presentato senza verificare il blocco da linea vuota (EURUSD 27/01/2022). Regola per il futuro:
prima di presentare una carta, verificare esplicitamente move (>0 = salito), segnale finale e pnl dal dump CARTA=.

## §72 — MODELLO "dove va il Qi" per Shi↔Ying: codificato ma sotto soglia (18/08/2026)

Riscrittura pulita del confronto Shi↔Ying secondo il principio di Edu "dove va il Qi":
- l'arrivo della mobile è il Qi; se l'arrivo è vuoto → azione nulla
- la mobile in vuoto NON è vuota (il movimento la riempie); l'arrivo vuoto non produce effetto
- il Qi si ferma alla PRIMA cattura: combinazione (con linea non vuota) > clash > tomba
- combinazione con Shi/Ying → quella linea si carica e prevale → vince il suo clan
- clash → la linea avanza alla linea futura (esagramma trasformato); conta solo se il ramo futuro è diverso
- tomba → la linea intombata non agisce (perde generazione/controllo verso l'altra)

Le tre carte di controllo tornano tutte con la lettura di Edu (EURUSD 12/05/2022 → SHORT; USDJPY 04/01/2024
e EURJPY 19/12/2024 → il Qi combina una linea non-Shi/Ying, quindi il modello tace, niente più SHORT sbagliato).

**Misura:** dove il Qi combina proprio Shi o Ying (mobile esclusa): 473 carte, 51,59%, +1.500 pip. Nel LY tace: 37
carte, 43,24%. LY concorde col modello 57,95% vs contrario 56,40% (differenza trascurabile). Sotto soglia, non
cablabile, ma la lettura è ora codificata correttamente (blocco QIMODEL in pb_stress.js per riferimento).

**Stato:** capitolo Shi↔Ying come DIREZIONE chiuso (§71-§72). Shi e Ying restano attivi in tutte le vie che già li
usano. Na Yin resta come indicatore di confidenza (§70). Nessuna nuova via cablata oggi: S9 invariato.

## §73 — MECCANICA CORRETTA del "dove va il Qi" Shi↔Ying: sette raffinamenti dottrinali, ancora sotto soglia (19/08/2026)

Ripresa del confronto Shi↔Ying (§72) partendo dai contro-esempi. Edu ha corretto la meccanica carta per carta;
ogni correzione legge bene la carta specifica e TUTTE le carte di controllo, ma l'aggregato non supera mai il 52-55%
(la versione "forza/elemento dominante" scende addirittura al 45,71%). Non cablabile. Qui si SALVANO le spiegazioni.

### La meccanica finale (dottrina), passo per passo
1. **Cattura.** L'arrivo della mobile (ramo di arrivo) combina in 六合 con una linea Shi o Ying non vuota: quella è la
   linea "catturata" (C); l'altra fra Shi/Ying è "l'altra" (O). Perimetro: mobile ≠ Shi/Ying, arrivo non vuoto.
2. **Trasformazione della catturata.** La catturata riceve il ramo di PARTENZA della mobile e assume il suo elemento
   — TRANNE quando forma un 三合 (vedi §3). Es. semplice: Ying 巳 + partenza mobile 未 → Ying diventa Terra.
3. **三合 PIENO (三合, raduno/trigono) — regola forte.** Se il ramo della catturata + il ramo di partenza della mobile
   + un TERZO membro formano un 三合 pieno, la catturata si RINFORZA nell'elemento del trigono (non conversione).
   - I MEZZI-TRIGONI (半合) NON contano: serve il trigono pieno a tre membri.
   - Il terzo membro può essere: una linea VISIBILE non vuota, una linea NASCOSTA (伏神/fushen), OPPURE un ramo del
     BAZI (anno/mese/giorno). Anche l'arrivo della mobile (linea futura) conta come membro presente.
   - Un membro VUOTO non chiude il trigono (il vuoto non agisce) — MA una linea in vuoto che si MUOVE non è vuota
     (il movimento la riempie), quindi un 伏/ramo che partecipa al movimento conta anche se sta nei vuoti del giorno.
   - Trigoni: Acqua 申子辰 · Legno 亥卯未 · Fuoco 寅午戌 · Metallo 巳酉丑.
4. **Chi prevale (controllo/generazione).** Fra la catturata (nel suo elemento, trasformato o rinforzato) e l'altra:
   - la catturata CONTROLLA l'altra → prevale la catturata (vince il controllore);
   - l'altra controlla la catturata → prevale l'altra;
   - generazione in un verso o nell'altro → prevale L'ALTRA (la catturata prevale SOLO se controlla);
   - 比和 (stesso elemento) → muto.
   Direzione = clan della linea che prevale (L1-3 = SHORT, L4-6 = LONG).
5. **Drenaggio col 伏神 (interp 1).** Se la mobile ha una linea NASCOSTA (伏神), il movimento la porta fino alla
   catturata, che assume l'elemento del 伏. Se a quel punto l'altra GENERA la catturata (es. Shi-Metallo genera
   Ying-Acqua), l'altra è DRENATA e la catturata prevale. Questo drenaggio scatta SOLO se c'è un 伏 da portare
   (senza 伏 → lettura normale del §4). Ed è subordinato alla forza (vedi §6).
6. **Elemento dominante / forza (interp 2, principio unificante).** La forza dominante del quadro (三合 + Bazi) UCCIDE
   una delle due linee: la linea CONTROLLATA dal dominante è spenta, la linea che GENERA il dominante è drenata;
   vince chi sopravvive. Il drenaggio del §5 "vince" solo se la linea drenata è davvero DEBOLE/untimely.
   Una linea allineata col dominante (stesso elemento, prospera) resiste e vince.

### Carte di controllo (tutte lette correttamente dalla dottrina; seme + trigrammi nel testo sessione)
- EURUSD 12/05/2022 (SHORT): catturata→Legno controlla Terra → vince catturata → SHORT. ✓
- USDJPY 04/01/2024 (LONG): catturata→Metallo controlla Legno → vince catturata → LONG. ✓
- GBPUSD 15/12/2022 (SHORT): Shi 戌 riceve partenza 寅 → Legno; niente 伏 sulla mobile → Ying-Acqua genera Shi-Legno,
  vince l'altra (Ying) → SHORT. ✓ (il drenaggio NON scatta senza 伏.)
- USDJPY 19/12/2024 (LONG): Acqua dominante — 三合水 申子辰 (anno 辰 + mese/伏 子 mobile + arrivo 申), col 子 nascosto
  che si muove (non vuoto). L'Acqua controlla la Ying-Fuoco → Ying spenta → vince la Shi → LONG. ✓
- USDJPY 05/02/2025 (SHORT): Fuoco dominante (anno/giorno 巳巳 + Ying 巳). Il 伏 子 (Acqua) è untimely, non riesce a
  drenare la Shi debole in modo decisivo; la Ying-Fuoco resiste ed è forte → vince la Ying → SHORT. ✓
  (Gemella figurale della 19/12/2024 — stesso esagramma 3/2 L5 seme 154, stesso palazzo Terra, stessa mobile 未 伏 子 —
   ma esito opposto deciso dall'elemento dominante: Acqua vs Fuoco.)
- USDJPY 28/04/2025 (SHORT): 三合火 寅午戌 pieno (寅 伏 sotto la Shi) → Shi rinforzata Fuoco, controlla Ying-Metallo →
  vince la Shi → SHORT. ✓
- USDJPY 09/03/2020 (SHORT): 三合水 申子辰 (子 dall'anno) sulla Ying → Ying-Acqua controlla Shi-Fuoco → vince Ying → SHORT. ✓
- USDJPY 02/08/2022 (LONG): 三合legno 亥卯未 col 未 dal MESE ma 未 è VUOTO → trigono non si forma → conversione
  semplice, Ying→Acqua, Shi-Terra la controlla → vince la Shi → LONG. ✓

### Misure (env pb_stress.js, tutte spente di default; S9 invariato)
- v7 (conversione + 三合 pieno con 伏/Bazi, membro vuoto escluso + controllo/generazione): 288 carte, 52,78%, z 0,94,
  +2.282 pip. LY tace 19 carte, 31,58% (negativo).
- interp 1 corretta (drenaggio solo con 伏神): 305 carte, 53,11%, z 1,09, +1.964 pip. Rompe solo USDJPY 19/12/2024
  (poi spiegata dall'elemento dominante).
- interp 2 (forza Shi/Ying come direttore): 48,38%, z −0,60 — scartata, sotto testa-o-croce, rompe 3 controlli.
- MODELLO ELEMENTO DOMINANTE (forza a punteggio su Shi/Ying con bonus 三合 e soppressione): 315 carte, 45,71%,
  z −1,52, −2.491 pip — la codificazione a punteggio NON cattura la lettura esperta.

### Verdetto
Ogni carta è spiegabile dottrinalmente e la meccanica è ora ben definita, ma NESSUNA codificazione meccanica supera
il ~55%, e la più completa va sotto il 50%. Nel gruppo LY-tace (dove servirebbe come voce autonoma) sono 18-22 carte,
mai con edge. Firma di un giudizio esperto non riducibile a regola a punteggio su questo dataset. Shi↔Ying "dove va
il Qi" resta NON cablabile come decisore (coerente con §71-§72). Le regole dottrinali (三合 pieno; terzo membro anche
伏神/Bazi; mezzi-trigoni no; membro vuoto non chiude; vuoto-che-si-muove non è vuoto; drenaggio solo con 伏; elemento
dominante uccide la linea controllata/drenata) si TENGONO come sapere dottrinale, non come segnale. Blocchi di prova
in pb_stress.js: QIFIX/QIV5/QIV6/QIV7/QICHOOSE2/QIFORCE (tutti sotto flag, default off).

## §74 — CLASH DEL GIORNO SULLA LINEA MOBILE: la mobile SI MUOVE COMUNQUE, e il LY è più affidabile (19/08/2026)

**Domanda (Edu):** una linea mobile clashata dal ramo del giorno riesce a muoversi o no? (test generale, non legato a Shi/Ying)

**Test (sonda LY):** il termometro legge sempre l'ARRIVO della mobile. Se la mobile clashata non si muovesse, l'arrivo
sarebbe rumore e il LY crollerebbe in quel gruppo. Invece:
- mobile CLASHATA dal giorno: LY **60,26%** (234 carte, z 3,14, +2.751 pip) · recente 54,2% / vecchio 68,0%
- mobile NON clashata: LY 56,12% (3.316 carte, z 7,05)
**Risposta: la mobile clashata dal giorno SI MUOVE — e si muove meglio.** Il clash non la ferma, la rende più decisa
(coerente col 冲起, il clash che "alza/attiva" la mobile). Il vantaggio è TRASVERSALE alle vie: 11 su 12 vie con ≥8
carte clashate fanno meglio nel gruppo clashata (R5 68% vs 54%, R12 67% vs 53%, R13 63% vs 53%, R11 82% vs 58%, R6 61% vs 54%).
Non è un artefatto di composizione delle vie.

**Timeliness (dal mese, elemento di partenza della mobile):**
- clash su mobile TIMELY (旺/相): 62,1% (103, z 2,46) · neutra (休): 66,7% (45) → il vantaggio sta qui
- clash su mobile UNTIMELY (囚/死): 54,7% (86, z 0,86) — recente 47% → NESSUN vantaggio, il clash su una linea debole
  non la rilancia, la disturba e basta
- nel gruppo NON clashato la timeliness NON conta (timely 55,0% / untimely 57,4%, piatto): l'effetto è l'INTERAZIONE
  clash × forza, non la forza da sola.
(Il saldo Bazi dà un segnale opposto e controintuitivo su 65 carte con 89% nel vecchio — non affidabile; vale il taglio di stagione.)

**Natura:** AMPLIFICATORE DI CONFIDENZA del LY (stessa famiglia di §70 Na Yin), non direzione nuova. Utile per pesare
posizioni, non per cambiare verdetti. Cautela: vantaggio più piccolo nel periodo recente — da riverificare nel tempo.
Non cablato. Blocchi MOBCLASHGEN / MOBCLASHVIE / MOBCLASHTIME in pb_stress.js (flag, default off).

**Ricaduta su Shi↔Ying:** conferma la carta USDJPY 20/03/2026 (LY tace, mercato LONG +116): la Shi/mobile L2 亥,
clashata dal giorno 巳, SI MUOVE comunque, arriva su 午 che combina la Ying L5 未 (vuota, 午未合) → la Ying sveglia
vince → LONG. Spiegata.

**§74 — CABLATO come PESATURA (19/08/2026, sera).** Nel blocco PBLY di pb_stress.js il sistema S9 ha ora una riga
parallela "S9p. S9 PESATO §74": lotto x2 quando la PARTENZA della mobile e' clashata dal ramo del GIORNO (290 carte);
i verdetti non cambiano. Risultato canonico: S9 4.111 · 56,46% · z 8,28 · +30.270 pip  →  S9p +34.200 pip (+3.930).
Attivo di default; si spegne con PESO74=off. La versione condizionata alla timeliness (x2 solo timely/neutra) rende
MENO (+604 su pnl PB), e penalizzare le untimely (x0,5) azzera il vantaggio: cablata la forma semplice.
Non ancora nel PWA (liuyao.js/app.js): da aggiungere come indicazione "lotto x2" nel verdetto quando serve.

## §75 — "CLASH DEL VUOTO" (冲空) come via LY: testato, sotto soglia (19/08/2026)

Meccanica (da USDJPY 14/06/2022): una linea VUOTA non mobile clashata dal ramo del GIORNO viene svegliata (il primo
clash solo la sveglia, non la muove); da svegliata può fare da intermediario (drena una linea, combina/nutre un'altra).
Test come via:
- perimetro stretto (la svegliata combina Shi o Ying e la nutre -> prevale la nutrita): 8 carte su 4.111 (5 col "nutre"),
  62% ma z 0,7 — TROPPO RARA per essere misurata. LY tace: 1-2 carte.
- perimetro largo (qualsiasi linea vuota svegliata dal giorno, 274 carte): sede della svegliata 48,54% — nessun segnale.
- per PARENTELA della svegliata: W (Ricchezza) -> sede 58,82% (51, z 1,26; recente 57,7 / vecchio 56,5, allineati);
  B (Fratelli) -> sede 40,00% (75, z -1,73) cioè l'OPPOSTO al 60%. Firma coerente con "W vince, B perde", ma z ~1,3-1,7:
  SOTTO SOGLIA. LY tace: W 11 carte (72,7%), B 4 carte.
Verdetto: NON via. Meccanica reale come evento (W svegliata bene, B svegliata male) ma troppo debole/rara per decidere.
Tenuta come sapere, in osservazione. Blocchi VIACHONGKONG / VIACHONGKONG2 (flag, default off).

## §76 — R13_52 "chi non vince perde": TOLTO il sotto-caso "arrivo clashato dal giorno" (19/08/2026) — CABLATO

Analisi delle tre vie grosse e deboli (R13_52 727 carte 53,1% · R6 464 54,1% · R5 357 54,6%, insieme 38% delle carte).
In R13_52 le perdite si concentravano nel sotto-caso "arrivo clashato dal giorno": 211 carte, 49,76%, -481 pip
(gli altri due sotto-casi reggono: 回頭剋 313 carte 51,4%, autocombinazione positiva). Sette letture alternative
provate su quelle 211 carte (sede, timeliness arrivo/partenza/giorno, parentela, bersaglio del clash, "segue sempre"):
TUTTE ~44-56%, nessuna regge — sono carte SENZA informazione direzionale, e il LY ci stava dando un verdetto rumore.
Premessa dottrinale corretta dal §74: il clash del GIORNO sulla mobile la ATTIVA (la mobile si muove, e meglio), quindi
un arrivo clashato dal giorno NON e' "azione fallita". Tolto il sotto-caso: R13_52 resta con 回頭剋 + autocombinazione.
Effetto su S9: 4.111 · 56,46% · z 8,28 · +30.270  →  56,58% · z 8,44 · +30.460 (+190 pip), MIGLIORA SU ENTRAMBI i
periodi (recente 55,67→55,76 · vecchio 57,44→57,56). Modifica "togli, non aggiungi". Cablata in pb_stress.js (lyDir,
regola 13) e in liuyao.js (via R13_52). NUOVO BASELINE S9: 4.111 · 56,58% · z 8,44 · +30.460 · S9p +34.390.

**Nota su pesatura per via (verifica cieca):** lotti per via fissati sul periodo VECCHIO e applicati al RECENTE a
esposizione pari: PEGGIORANO (11.920 -> 10.973 pip). I tassi per via non sono stabili fra periodi: pesare per via NON
regge fuori campione, NON cablare. Il §74 (x2 mobile clashata) in cieco sul recente: +1% (12.013) — marginale ma
credibile (nessun parametro aggiustato). ESCLUDERE i gruppi deboli perde pip (i gruppi deboli sono comunque positivi).
Linea operativa: ~3,2 trade/giorno su 9 cross, lotto uniforme + §74.

## §77 — R6 三會 (raduno dei tre col mese): TACE quando la mobile è G (19/08/2026) — CABLATO

R5 退神 analizzata: 8 letture alternative provate, la regola attuale ("opposto, salvo Tai Sui che clasha la partenza")
è la MIGLIORE (54,6%); sede-sempre 46,5%, timeliness 49%, clash giorno+anno 52,7%. R5 CONFERMATA, non toccata.
Il recente di R5 (-199 pip) viene da pochi colpi grossi su USDJPY/EURJPY, non da un difetto della regola.
(Nota a campione piccolo: R5 con mobile W 68%/19 carte, C 62%/16; B 53%/100, P 52%/120.)

R6 三會 analizzata: 7 letture alternative, nessuna batte la maggioranza attuale (54,1%); "raduno controlla il palazzo ->
opposto" 42% da scartare; senza COVID 54,3%, senza Legno 54,7% (non vale eccezione). Ma per PARENTELA della mobile:
  mobile P  89 carte 67,4% z 3,29 (recente 61 / vecchio 74) — fortissima e stabile
  mobile G  95 carte 45,3% — recente 36% — qui R6 perde davvero
  B/C/W 51-55%.
Cablato: R6 TACE quando la mobile e' G (coerente col principio 5, "il Yong Shen cambia la lettura della stessa azione").
Effetto su S9: 56,58% z 8,44 +30.460  →  56,80% z 8,72 +30.272. Win% e z SALGONO (z massimo mai toccato), MIGLIORA SU
ENTRAMBI i periodi (recente 55,76→56,02 · vecchio 57,56→57,68), ma -188 pip (le 95 carte G riprese da altre vie/PB
indovinano piu' spesso su movimenti piu' piccoli). Cablato per z e stabilita' (i 188 pip sono entro il rumore di 3-4 carte).
In pb_stress.js (lyDir regola 6) e liuyao.js (via R6).
NUOVO BASELINE S9: 4.111 · 56,80% · z 8,72 · +30.272 pip · S9p (§74) +33.866.

## §78 — IL GIORNO LEGATO (六合) DAL TAI SUI: inversione del ramo segue/non-segue del PB (19/08/2026) — CABLATO (S11)

**Domanda di Edu:** quando il Tai Sui lega il giorno, o quando e' il mese a legarlo, ci sono carte positive che
diventano negative o l'opposto? RISPOSTA: SI, e l'inversione e' sul Tai Sui.

Misura su tutte le 4.111 carte (giorno legato = 六合 fra ramo del giorno e ramo dell'anno / del mese):
| gruppo | n | PB "NON segue" | PB "SEGUE" |
| giorno LIBERO | 3.417 | 54,61% (+12.813) | 53,33% (+3.172) |
| legato dal MESE | 351 | 46,09% (-154) | 50,00% (-497) |
| legato dal TAI SUI | 316 | 46,78% (-110) | **66,27% z 2,96 (+1.503)** |
| legato da entrambi | 27 | 70,6% (17 carte) | 50% |

- **TAI SUI lega il giorno -> SI CAPOVOLGE il pilastro del sistema.** Normalmente il profitto vive nel "non segue"
  e il "segue" e' il ramo debole; li' il "segue" fa 66,27% (83 carte, z 2,96, recente 70,27% / vecchio 63,04% —
  COERENTE SUI DUE PERIODI) e il "non segue" scende a 46,78%. Lettura dottrinale: il Tai Sui che lega il giorno
  fissa la giornata sull'anno e in quel regime il trend TIENE.
- **MESE lega il giorno -> nessuna inversione, si SPEGNE tutto:** il PB va sotto il 50% in entrambi i rami
  (47,29% complessivo, -651 pip). Il mese che lega il giorno neutralizza il PB, non lo rovescia. (Non cablato:
  gruppo negativo ma senza lettura alternativa; da riprendere.)
- **Il LY NON risente di nessuno dei due** (57,75% col TS · 55,86% col mese · 56,97% libero): e' solo il PB a essere sensibile.

**Cablato come S11** (rafforzativo nella stessa forma di S4/S7/S9): se il giorno e' legato dal Tai Sui E il PB segue
il trend, il PB e' forte e il LY non lo scavalca nel contrasto.
Effetto: S9 56,80% z 8,72 +30.272  →  **S11 56,90% z 8,84 +31.000** (+728 pip). Vecchio 57,68→57,98; recente
56,02→55,98 (piatto). Migliora win%, z E pip insieme (le §76/§77 scambiavano pip per z). Con pesatura §74: +34.594.
Lato motore (pb_stress.js, blocco PBLY); la PWA non implementa le policy S1-S11 (mostra PB e termometro separati).

**NUOVO BASELINE: S11 · 4.111 carte · 56,90% · z 8,84 · +31.000 pip · S11p (con §74) +34.594.**

**Nota — meccaniche dottrinali testate e NON cablabili (19/08, sera):** "il clash del giorno e' neutralizzato se il
giorno e' combinato dal Tai Sui" (da AUDUSD 02/08/2022): solo 41 carte nel perimetro, sede 48,8% vs opposto 51,2%,
periodi discordi (recente 64 / vecchio 40) — NESSUNA differenza misurabile. Conferma inoltre che l'intero gruppo
"arrivo clashato dal giorno" (415 carte) e' rumore puro (sede 47,6% / opposto 52,4%): §76 era la mossa giusta.

## §79 — RAMO DEL TRIGRAMMA CHE SI MUOVE: pista quasi tutta chiusa, un candidato in osservazione (19/08/2026)

Idea di Edu: il trigramma che CONTIENE la mobile porta con se' il suo ramo (Houtian: 坎=子 · 艮=丑寅 · 震=卯 · 巽=辰巳 ·
離=午 · 坤=未申 · 兌=酉 · 乾=戌亥) e quel ramo agisce sul quadro.
Testate: clash/combinazione del ramo su una linea (48-51%), clash su Shi o Ying (51%), la catena esatta della carta
(冲空 su Shi/Ying che poi controlla l'altra: 46 carte, 50,00%, periodi opposti), elemento del trigramma che controlla
Shi/Ying (51%). Poi, su indicazione di Edu, azione elementale (controlla/drena/nutre) col FILTRO "mobile bloccata da
combinazione o clash": tutte le celle 48-51%, LY tace 50,0% su 174 carte. PISTA CHIUSA in queste forme.

**CANDIDATO IN OSSERVAZIONE (non cablato):** "il ramo del trigramma che si muove CLASHA una linea VUOTA -> quella linea
e' spenta (NON svegliata) e il suo lato PERDE -> clan OPPOSTO". E' il rovescio del 冲空 del giorno (il giorno risveglia,
il ramo del trigramma annulla).
- LY TACE: 44 carte, **72,73%**, z 3,02, +934 pip · recente 66,7% / vecchio 75,0% (coerente) · senza COVID 43 carte 72,1%
- taglio piu' pulito: la vuota clashata NON e' ne' Shi ne' Ying -> **25 carte, 84,0%, z 3,40** (recente 90 / vecchio 77)
- se la vuota E' Shi o Ying: sparisce (50% / 63,6%)
- LY PARLA: 297 carte, 50,84% — NESSUN segnale (funziona solo dove il LY non ha voce: via "di riserva")
Cautela: 44 carte (25 nel taglio migliore), z 3,02 sotto la soglia z>4. NON cablato, da riverificare con piu' dati.
Blocchi TRIGRAMO / TRIGRAMO2 / TRIGVUOTO in pb_stress.js (flag, default off).

## §80 — ESISTE UN INDICATORE DI TREND DENTRO IL LY? Risposta: NO (19/08/2026)

Domanda di Edu: il LY produce solo alto/basso (clan) — chi vince — e mai "segue / non segue". Il segue/non-segue lo
produce SOLO il PB. Si e' cercato un indicatore di trend interno al LY. Provate CINQUE costruzioni, decine di varianti:

1. **La MOBILE rappresenta il trend** (bloccata -> non segue). Tutte le forme di "blocco" da COMBINAZIONE/CLASH/回頭剋
   danno SOTTO il 50% (48,3-49,9%): quando la mobile e' impedita il trend TIENE, il contrario dell'intuizione.
   L'unico verso giusto e' la FORZA: mobile untimely -> non segue 51,7% z 2,17 (LY tace 54,8%).
   Per parentela della mobile: W 53,6% z 2,03 · C 55,3% z 2,43 (LY tace 59,2%) · B 49,0% · P periodi opposti · G 51,1%.
2. **Parentela dell'ARRIVO.** Arrivo W -> "non segue" 53,2% (LY tace 168 carte **57,74% z 2,01**, recente 58,1/vecchio 58,5).
   Arrivo G -> NIENTE (49,7/50,3, periodi opposti). Altri arrivi 50,8-51,5%.
   **Provato come S12 sopra S11: PEGGIORA (56,90->56,43%, z 8,84->8,25, 31.000->28.276 pip).** Il PB su quelle carte fa
   gia' meglio: un tasso alto in isolamento NON implica additivita'. Non cablato.
3. **La SHI rappresenta il trend.** Le singole condizioni sono quasi tutte negative (Shi clashata dal giorno 48,9% ·
   Shi e' la mobile 48,7% · combinata dal giorno 48,9% · drenata 49,7% · controllata 49,6%): quando la Shi e' colpita
   il trend TIENE. Miglior combinazione (controllata o drenata o vuota -> non segue): 51,5% z 1,98 (LY tace 55,6% z 2,87).
   Sotto il PB (53,5% / 53,75%).
4. **Shi qualificata dalla PARENTELA** (Edu: Shi B o P che vince = negativo per il trend, e l'opposto). Quattro varianti:
   49,1-50,0% (LY tace 49,0-51,7%). La parentela della Shi NON discrimina. Dettaglio: "seguire" e' sotto il 50% in quasi
   tutte le celle per ogni parentela; l'unica sopra (Shi P sana 53,7%) ha periodi opposti (59,5/47,6) = rumore.
5. **Rappresentante scelto dall'EMA** (rialzista -> quello in alto fra Shi/Ying, e viceversa).
   NOTA CONCETTUALE: nella forma letterale "il rappresentante vince -> segue" questa idea e' MATEMATICAMENTE IDENTICA
   alla lettura per clan che il LY gia' usa (alto vince = LONG = segue quando l'EMA e' up, ecc.). Il LY quindi UN rapporto
   col trend ce l'ha: e' esattamente la lettura per clan, vista dall'altro lato. La versione non banale (rappresentante
   forte -> segue) da' 49,4-50,7%. Anche "Shi allineata + non contrastata -> trend confermato" (7 definizioni di
   contrasto): 49,3-51,4%.

**CONCLUSIONE: il LY non contiene un secondo canale di lettura del trend, indipendente dal PB.** Legge chi vince fra
alto e basso; il "segue/non segue" resta compito del PB (53,5% da solo, z 4,51). La divisione del lavoro PB(trend) +
LY(chi vince) e' cio' che produce S11 56,90% z 8,84.

### Le SEI BESTIE (prima esplorazione, 19/08/2026)
- **青龍 Drago Azzurro** — unico segnale reale del filone: **"Drago in ALTO -> segue, in BASSO -> non segue": 4.111 carte,
  51,79%, z 2,29, +9.843 pip, recente 51,0 / vecchio 52,2 (coerenti).** Come DIREZIONE invece non funziona (sede del
  Drago -> clan 50,1%; LY tace 46,9%). Altre celle: Drago sulla mobile -> NON segue 52,6% · Drago sulla Shi -> non segue 52,8%.
  Provato come rafforzativo sopra S11 (S13: Drago in alto sostiene chi segue): 56,87% z 8,81 **+31.601 pip** e RECENTE
  MIGLIORE (55,98->56,24) ma z e vecchio leggermente peggio. Le varianti S14 (Drago in basso sostiene chi non segue) e
  S15 (entrambi i versi) PEGGIORANO nettamente (56,31 / 56,29%). NON cablato: guadagno dentro il rumore, pagato con z.
- **白虎 Tigre Bianca** — NIENTE, in 13 letture (49,1-50,8%). Come impulso ribassista ("Tigre -> SHORT sempre") 49,6%:
  nessuna spinta ribassista intrinseca. Come trend: Tigre in alto -> non segue 50,3%; Tigre sulla Shi -> non segue 49,1%.
  Miglior cella "sede della Tigre -> clan opposto" 50,8% (contro-immagine del Drago, meta' del suo segnale).
  Nel LY tace "Tigre forte -> SHORT" fa 44,5% (z -2,58): una Tigre forte NON implica ribasso, semmai il contrario.
  **Asimmetria Drago/Tigre: non sono una coppia simmetrica.**
- **DA FARE:** esplorazione sistematica di tutte e sei le bestie incrociate con Shi/Ying/mobile, parentela e forza,
  in sessione dedicata. E' l'unico filone di oggi che ha mostrato un segnale coerente sui due periodi.
Blocchi MOBTREND / MOBTREND2 / SHITREND / SHITREND2 / REPTREND / SHIALLIN / BESTIE / TIGRE in pb_stress.js (flag, default off).

---

## §81 — Il Serpente 螣蛇 morto o imprigionato sostiene chi NON segue (20/08/2026)

**Regola.** Se il Serpente siede sulla **Shi**, sulla **Ying** o sulla **linea mobile** ed è **untimely** nel mese
(囚 o 死), e il PB dice **"non segue il trend"**, il PB è forte e il LY non lo scavalca.

**Numeri.** Perimetro 527 carte. Lasciando decidere il PB: 59,20% (recente 57,0 / vecchio 61,8).
Lasciando decidere il LY: 54,84%. Contributo al sistema: da 56,94% a 57,48%, +766 pip.

**Dottrina.** Il Serpente non indica una direzione: indica che **l'azione è attorcigliata**. Quando è debole
su una linea che conta, il movimento non regge e il trend non tiene. È un indicatore di fragilità
dell'azione, non di direzione.

**A una faccia sola.** Il ramo simmetrico (Serpente timely sostiene chi segue) PEGGIORA il sistema
(56,58% contro 56,94%). Non cablato. Rispetta l'asimmetria nota: il profitto vive nel "non segue".

**Perimetro largo, non stretto — attenzione.** Da solo il 死 è molto più forte del 囚
(死: 365 carte 62,47% z 4,76 · 囚: 369 carte 51,49% z 0,57). Ma **dentro il contrasto** il rapporto si
inverte: 囚 fa vincere il PB nel 57,78% dei casi, 死 solo nel 54,55%. Motivo: sulle carte in 死 il LY è
già d'accordo col PB, quindi la regola non ha nulla da correggere. Restringere al solo 死 costa 868 pip.
Interruttore `SERP81=stretto` nel motore, spento.

**Indipendente dalla parentela.** P 61,4% · W 58,2% · C 57,1% · G 55,0% · B 53,3% — tutte positive,
nessuna che ribalta il segno.

---

## §68-bis — Il clash dell'arrivo che è anche controllo distrugge (20/08/2026)

**Origine.** Carta EURJPY 11/12/2023, letta da Edu.

**Regola.** Nel perimetro del §68 (l'arrivo della mobile clasha esattamente una ferma piena, nessuna
combinazione): se l'**arrivo controlla (剋) anche l'elemento** della linea colpita, non è un urto ma una
distruzione. La colpita non regge — chi non vince perde — e prevale la **mobile** (= sede opposta alla
colpita, che su tutte le carte del perimetro coincide).

**Numeri.** Sulle 85 carte interessate: il §68 di prima faceva 45,88% (−828 pip), la lettura nuova fa
56,47% (+871). Il §68 intero passa da 54,80% z 1,81 (+699) a 57,34% z 2,76 (+2.399), con entrambi i
periodi in miglioramento. Sul sistema: +96 pip. Vale per dottrina più che per pip.
Interruttore `VIA68BIS=off`.

**La timeliness non entra.** Verificato su richiesta di Edu: "vince la mobile" funziona in tutti e quattro
i quadranti (arrivo timely/untimely × colpita timely/untimely): 56,4 / 53,1 / 54,6 / 56,5. Il quadrante
che l'ipotesi dava per più forte (arrivo timely, colpita untimely) è il **più debole** e l'unico spaccato
fra i periodi (45,9 recente contro 63,8 vecchio). Conferma il principio: **l'azione, non la forza**.

---

## Piste chiuse il 20/08/2026

- **Le Sei Bestie, esplorazione sistematica.** Vincolo strutturale: le bestie si dispongono in sequenza
  fissa dallo **stelo del giorno**, quindi due bestie a 3 posizioni di distanza sono sempre in specchio.
  Non esistono sei indicatori ma tre assi, e la posizione di una bestia è un filtro di calendario
  travestito. Bestia su Shi/Ying/mobile: niente (43–55%). Bestia con B/C/W/G/P: segnali deboli
  (45–46% "segue"), tutti entro ~3 punti dalla base EMA di 48,77%. Nessuna casella a z > 4.
- **Serpente come indicatore di trend.** No: 48,77%, identico all'EMA nuda.
- **Serpente che tocca il trigramma opposto.** Clash 50,00% esatto su 198 carte, combinazione 50,92%.
  Nulla. Nota: il Serpente è l'unica bestia per cui la mobile che clasha l'opposto non prevale — ma
  l'effetto sulle altre è della mobile, non della bestia, e comunque debole (z 1,94).
- **Drago che si combina col Serpente.** 41 carte; la casella "segue il trend" fa 58,54% ma spaccata
  (73,3 vecchio / 52,0 recente) su undici carte. Il Drago mobile da solo fa 49,32% su 365 carte.
  Unica casella con segno: la partenza del Drago clasha il Serpente → vince il Serpente, 66,7% su 36
  carte. Troppo poche e trovata cercando: segnalata, non usata.
- **Linea legata dal giorno liberata dal clash della mobile.** 113 carte, 53,98%, **+8 pip** netti — vince
  piccolo e perde grosso. Segnale contraddittorio fra clash di partenza e clash di arrivo. Non è una via.
- **得位 (linea intera su posto dispari, spezzata su posto pari).** Come predittore: niente
  (Shi al posto 49,90%, Ying 49,22%, "vince il trigramma più ordinato" 49,04%). Come rafforzativo del PB:
  **respinto** — vedi sotto.

---

## Nota di metodo (20/08/2026) — misurare dentro il contrasto, mai sul totale

Due volte nella stessa sessione la stessa trappola:

1. Il Serpente in 死 fa 62,47% (z 4,76) sul totale ma solo 54,55% dentro il contrasto; il 囚 fa 51,49%
   sul totale e 57,78% dentro il contrasto.
2. Il PB con esagramma ordinato (4+ linee al posto) fa 55,72% sul totale contro 52,09% — ma dentro il
   contrasto fa 45,62%, cioè **peggio** che con l'esagramma disordinato (46,03%).

In entrambi i casi il guadagno apparente veniva da carte dove **il LY era già d'accordo col PB**, dove il
verdetto sarebbe stato lo stesso comunque. **Sul totale si misura l'accordo, non l'informazione.**
Una condizione candidata a rafforzativo va sempre misurata sulle sole carte in contrasto.

---

## Nota software (20/08/2026) — la PWA non applicava il LY

Scoperto durante la sessione: `fsadvisor.org/trading/` mostrava un segnale calcolato **solo dal Plum
Blossom** (53,51%). Il pannello Liu Yao disegnava l'esagramma ma `combinaS9` non veniva mai chiamata.
Corretto in `app.js`: il segnale ora è quello del sistema completo (57,48%), verificato **0 disallineamenti
su 4.111 carte** contro il motore. Aggiunta nel pannello la riga "六爻 Liu Yao corrective".
Al modulo `liuyao.js` mancavano anche i rafforzativi §78 (TSLEGA) e §81 (SERPENTE): cablati.
Condizione necessaria: `app.js` deve passare `corpoEl` (elemento del trigramma del Trend) nel contesto,
altrimenti il §54b non può valutare e 16 carte divergono.

Tolta la parola "inverte" dall'output del motore (8 occorrenze) — ora stampa "NON SEGUE".

---

# §82. IL GIORNO LEGATO DAL MESE NON INTERVIENE  ·  `FISSATA` (Edu, 21/08/2026) — NEL MOTORE

Carte sorgente: **EURUSD 22/04/2025** (seme 115, giorno 辛酉, mese 辰: 辰酉合) e
**USDJPY 28/07/2022** (seme 136, giorno 壬午, mese 未: 午未合).

Se il ramo del GIORNO è legato in 六合 dal ramo del MESE, la sua capacità di combinare e
clashare è già impegnata: **il giorno non combina e non clasha nessuna linea dell'esagramma,
e non sospende la mobile** (né su partenza né su arrivo).

Implementata di default in `liuyao.js` (stati linee, 暗動, sospensione caso −1) e in
`pb_stress.js` (F3, 5 punti). Audit: `GIORNOLEGATO=off`.

**Effetto sul baseline: S17 da 57,48/z9,59/+32.039 a 57,55/z9,69/+32.512 (pesato +36.306);
LY tace da 652 a 636.** Coerente su entrambi i periodi (56,78/58,40).

# §83. IL TRASPORTO — VERSO E FILTRO  ·  `IN PROVA` (Edu, 21/08/2026) — watchlist

Continuazione del blocco TRASPORTO del 16/08. Verso dettato da Edu: "fa vincere il trigramma
opposto" = **vince il trigramma DOVE ATTERRA**. G/W → vince la destinazione; B/P → il
contrario; C senza verso (52/48). Ribaltamento: **il vincitore deve poter vincere** (da
USDCAD 11/06/2020: Shi vuota + G legato + C debole → il basso non può → vince l'alto).
Filtro di validità obbligatorio (`trasportoValido`): movimento compiuto, arrivo non vuoto,
伏 della mobile non sul ramo del giorno (M4), partenza non clashata da giorno+mese (F4),
atterraggio unico, destinazione non rotta/eliminata/autocombinata (da USDCAD 25/03/2020).
Numeri in CANDIDATI_OSSERVAZIONE.md. NON cablata: base 51,60%, celle migliori sotto z 4.

# §11 — RITIRATA DA EDU (21/08/2026)

Sulla carta USDCAD 18/03/2020: "La mia interpretazione era affrettata e sbagliata. P 寅 non
può essere fuori dai giochi perché il Legno è vibrante nel mese 卯. La vera interpretazione:
L4 muove, genera e si combina con C 未." Decade anche la QUESTIONE APERTA annotata sotto §11
(clash+controllo dal giorno): non c'era contraddizione da risolvere.

# §9 — REVISIONE TESTATA E RESPINTA (21/08/2026)

Ipotesi di Edu (自合 blocca solo se l'arrivo genera la partenza): misurata in tutte le forme
(`AUTOCOMB9=off|indietro|soloavanti`), ogni indebolimento costa (−1.405/−2.332/−2.493 pip su
S17). Resta la FORMA PIENA. Nota: sulla carta sorgente il sistema vince già (+266); per
riaprire serve un controesempio con seme (principio 10).

# §41 — RIMISURATA E RIDIMENSIONATA (21/08/2026)

Col campione attuale la copertura vuota copre L1-L5 (limite L3 caduto): forma generale
49,7-49,8% → **BOCCIATA**. Sopravvive solo: **nascosto G sotto copertura vuota FERMA**
(esclusa la mobile, 動不為空): 68 carte, 36,76% (rovescio 63,2%), coerente 34,9/38,1.
In watchlist (`FEISHENCHK`).

# §84. LA DESTINAZIONE GIÀ LEGATA NON RICEVE (doppia combinazione)  ·  `FISSATA NEL FILTRO` (Edu, 21/08/2026)

Carta sorgente: **EURJPY 19/12/2024** (seme 160, Zhen/Kun, L6). Il giorno 巳 lega già L5 申
(巳申合); l'arrivo della mobile è lo stesso 巳: la seconda combinazione sulla stessa linea
NON avviene ("double combination"). **Il trasporto fallisce e la mobile si legge per il suo
caso di mutazione, in sede**: qui 回頭生, W rinforzata a L6 in alto → LONG (mercato +306).
Nel filtro `trasportoValido`: destinazione rotta / eliminata / autocombinata / **legata** non
riceve. Risolve nella pratica anche la configurazione di §21 (争合): il legame esistente
vince, il nuovo arrivato fallisce.

**Effetto sul filone trasporto**: perimetro 719→611; base 51,60→52,70% (55,1/51,0);
ribaltamento ora INUTILE sui numeri (49,49% dove scatta — le carte che lo giustificavano
erano in gran parte destinazioni legate, ora fuori; definizione "non può vincere" indifesa);
**cella A=B GENERA C → vince la partenza: 45 carte, 75,56%, z 3,43** (94,7/64,0) — la più
vicina alla soglia, mancano ~25 carte. A=G CONTROLLA C: 18 carte, 72,22% (54,5/100 ⚠ n basso).

# §85. L'ELASTICO ROTTO × FORZA  ·  `IN PROVA — OPERATIVA IN LETTURA` (Edu, 21/08/2026)

Carta sorgente: **USDCAD 13/09/2022** (seme 129, Kun/Qian, L3).

**Meccanica**: una linea ferma tenuta in combinazione (dall'anno o dal mese) e clashata dal
giorno viene liberata di colpo, carica ("elastico rotto"). Il verdetto NON è la sede della
liberata: è il **confronto di energia fra i due trigrammi** (somma degli score forzaModello
di tutte le linee, per trigramma) — **vince il trigramma più forte** ("l'energia in gioco
qui è superiore a quanto avviene sotto").

**Numeri (21/08, flag `ELASTICOF=1`, affilatura `ELAFF=1`)**:
- vecchia ipotesi (vince il trig. della liberata): 268 carte, 50,75% — MORTA
- vince il più forte: 268, 54,85%, z 1,59 (56,2/53,6)
- energie nette |diff|≥3: 149, 57,72%, z 1,88 (56,6/60,3)
- **|diff|≥3 + liberata NEL trigramma più forte: 41 carte, 63,41%, z 1,72 (58,3/70,6)**
- tagli interni (tutti coerenti, tutti piccoli): liberata piena 33/66,7% · liberata sotto
  19/73,7% · legame MESE 20/65,0% · |diff|≥5 21/66,7%

**Stato operativo**: definita al millimetro e misurabile con un flag; VA APPLICATA in ogni
lettura di carta (checklist) da subito. NON entra nel motore live: per il criterio fissato
(z≥4 coerente sui due periodi) mancano ~100 carte di accumulo. Rimisurare a ogni
aggiornamento di full1h.json.

**Chiusura collegata — LA FORZA NUDA NON È UN VERDETTO** (stessa sessione, `FORZANUDA=1`):
il confronto di forza da solo, su tutte le carte: 51,10%; dove LY tace 53,27%; ma DENTRO IL
CONTRASTO (LY tace, forza dissente da PB): **48,04% su 306 carte** — quando disobbedisce al
sistema, perde. Nessuna soglia di differenza la salva. Conclusione: la forza pesa le braccia
ma serve la dottrina a dire quale braccio tira; usarla solo dentro configurazioni dottrinali
(come §85). NON rimisurare come verdetto autonomo.

---

# §87. LA TECNICA DEGLI STELI  ·  `FISSATA COME STRUMENTO DI LETTURA` (Edu, 21-22/08/2026)

**Collocazione (scala fissa)**: L1 porta SEMPRE lo stelo del giorno; poi la scala prosegue
verso l'alto dentro la propria polarità e ricomincia da capo:
- giorno YANG: 甲 丙 戊 己 庚 壬 (partendo dallo stelo del giorno)
- giorno YIN:  乙 丁 戊 己 辛 癸 (partendo dallo stelo del giorno)
Gli steli dei quattro pilastri della data (anno, mese, giorno, ora) cadono ciascuno sulla
propria linea di casa. Uno stelo di polarità opposta al giorno non ha casa.
Ora: 五鼠遁 dallo stelo del giorno. Pilastri via lunar-javascript (mezzogiorno).

**Censimento (4.507 carte)**: accumulo massimo 1 stelo 62,3% · 2 steli 33,8% · 3 steli 3,7%
(168 carte) · 4 steli 0,1% (4 carte: EURUSD+EURGBP 06/11/2024, GBPUSD 18/01/2022,
NZDUSD 23/09/2025). L'accumulo forte è un fenomeno di L1 (il giorno vi abita).

**Il condotto**: gli steli interagiscono FRA LORO per Cinque Elementi: un gruppo di 2+
steli dello stesso elemento GENERA lo stelo di un altro pilastro -> quel pilastro è CARICO.
Struttura verificata; lo sbocco cade sulla mobile con frequenza da caso (16,3%).

**Il principio d'uso (Edu)**: il peso segnala IMPORTANZA della linea, non direzione.
"C'è un accumulo su Lx, quindi quella linea è importante" — il significato emerge dalla
lettura, non da una formula. La riga degli steli è ora parte del formato di presentazione
delle carte.

**Misure direzionali chiuse (NON rimisurare — flag conservati)**:
- peso=vela (trigramma pesante vince): 49,1-49,6% · nel contrasto col sistema 41,0% (PESOTRIG)
- peso su linea inerte: 48,1% rumore perfetto (PESOINERTE). Peso senza azione = niente.
- peso come amplificatore dell'arrivo B/P: nessun gradiente (PESOAMP)
- condotto -> sbocco: direzione piatta 50,5% (PESOFLUSSO)
- steli->bestia della destinazione: ordinamento giusto ma debole (TRASPBESTIA)
- pilastro carico che clasha -> verso trigramma/trend/carattere/mobile-piena: TUTTI caduti
  sotto controllo (v. §88)
- "torna a casa" (trigono pieno data+mobile -> il capo accoglie): 48,0% vs controllo 49,9%;
  giorno-famiglia irrilevante; sospese 44,8% (TORNACASA). Resta tecnica di lettura di Edu.

# §88. IL PILASTRO CARICO CHE CLASHA  ·  `STRUTTURA FISSATA, DIREZIONE APERTA` (21-22/08/2026)

Carta sorgente: **USDJPY 10/01/2024** (seme 144, Dui/Kun, L2; tre 癸 su L1, 乙 del mese
carico dal condotto, 丑 clasha L1 未).

**FISSATO (regge ai controlli)**:
1. Un pilastro muto (mese / anno non timely / ora) da solo NON agisce sulle linee: né
   clash, né combinazione, né stesso ramo (tutte 48-51% su 700-1600 carte).
2. Il test discriminante RAMI vs PALAZZI (coppie palazzo-opposte senza clash: 寅未, 丑申,
   戌巳, 亥辰): comanda il RAMO. L'opposizione di palazzo senza clash è rumore (50,1%).
3. La combinazione del pilastro e lo stesso-ramo non muovono e non fanno vincere (49,5-51,1%).
4. Se qualcosa accade, accade SOLO con: clash di rami + pilastro CARICO dal condotto.

**APERTO (sei versi provati, tutti caduti sotto controllo)**: bersaglio perde · colpita
vince · trend vince (54,6% -> 50,0% tolto l'artefatto giorno=mese) · per carattere ·
mese-P · colpita-come-mobile per relazione elementale. La direzione si deciderà dalle
letture di Edu sui mazzi puliti (94 mese / 102 anno-muto).

**TRE ARTEFATTI documentati (lezione di metodo)**: (a) §41: campione confinato a L3;
(b) ramo del pilastro = ramo del GIORNO (il clash funziona di suo) — ora escluso in ogni
misura; (c) anno TIMELY (clasha di suo per §1) — idem. Regola: una cella non è pulita
finché non le togli le carte dove una meccanica già nota agisce da sola.

**Scala residua non spiegata**: bersaglio della linea clashata dal mese, per steli sulla
linea: 0: 53,9% vince · 1: 50,4 · 2: 48,6 · 3: 26,7 (=73,3% perde, 15 carte, periodi
allineati). Monotona, piccola in cima, in watchlist (MESECLASH).

# §89. FORZARE IL BLOCCO  ·  `FISSATA — IN USO OPERATIVO DI LETTURA` (Edu, 22/08/2026)

Carta sorgente: **USDJPY 10/01/2024**. I tre 癸 generano il 乙 (condotto); il 乙 carico è
DI CASA sulla L2 — che è la MOBILE SOSPESA dal giorno. La linea riceve potenza, FORZA il
blocco: il movimento negato SI COMPIE, l'arrivo raggiunge il suo bersaglio di combinazione
(qui 辰->酉 su L5), e **la squadra della linea raggiunta VINCE** (qui: LONG, mercato +133).

**Regola**: mobile sospesa dal giorno (caso −1) + uno stelo della data CARICO dal condotto
la cui casa è la posizione della mobile -> il blocco cede, il movimento si compie, vince
la squadra della linea raggiunta dall'arrivo.
Nota: il raffinamento "lo stelo genera il ramo della mobile" pare NON necessario (anche i
carichi che non generano: 66,7% su 15) — basta la carica in casa.

**Misura (22/08, flag FORZABLOCCO)**:
| cella | n | win% | periodi |
|---|---|---|---|
| stelo CARICO di casa sulla sospesa | **22** | **68,18%** | **66,7 / 62,5 (allineati)** |
| stelo di casa ma scarico (controllo) | 139 | 50,36% | — |
| nessuno stelo di casa (controllo) | 405 | 51,85% | — |

Controlli a rumore, periodi allineati, specificità completa: unico verso direzionale della
pista steli sopravvissuto a tutti i controlli. Per z≥4 servono ~120 carte: accumulo +
letture di Edu sulle 22. **STATO: fissata come regola di lettura (Edu: "gli steli
sopravvivono e adesso useremo questi"); NON nel motore live fino a soglia.**
Rimisurare a ogni aggiornamento di full1h.json.


# §90. LA MESSA IN MOTO DAL CLASH SULLA LINEA CARICA · `FISSATA IN LETTURA` (Edu, 22/08/2026)
Gerarchia: il clash su una linea che è CASA di uno stelo RADICATO (radice = almeno un ramo
della data del suo stesso elemento) non dà verdetto da ferma: LA METTE IN MOTO. Da lì si
legge come movimento: se avanza vince (EURUSD 12/03/2020: L1 avanza e combina L3); altrimenti
parla il Carattere (EURUSD 28/07/2020: L6 P in moto → perde la sede → SHORT ✓).
Per Edu vale per ogni fonte di clash, incluso il MESE (che normalmente non clasha ma muove la
linea carica). Misure 22/08 a soglia 25: fonte ARRIVO, P/B → 47 carte, 65,96%, z 2,19,
periodi 69,2/61,9 (flag CLASHSTELI, cella G1). Fonte MESE: 52,4% su 147, piatta — giro carte
in corso. Criterio di "avanzamento" da definire con Edu (quello tabellare di Claude: 44,6%).

# §92. IL FLUSSO DEL QI DELLA DATA — FORMA DEFINITIVA · `FISSATA` (Edu, 22/08/2026)
Otto caratteri, tutti partecipano, nessuna soglia. Punto terminale SEMPRE uno stelo della
polarità del giorno; il flusso avanza solo verso elementi con stelo utilizzabile; RADICE
obbligatoria per agire sulle linee; capolinea vuoto → ripiego sul precedente timely.
Anello chiuso: NON esiste (4 steli, 5 elementi). Carte d'origine: USDCHF 11/05/2022,
USDCHF 24/11/2021, GBPUSD 29/08/2023, EURUSD 12/03/2020. Dettaglio completo in
RIPARTENZA_22_08_2026_SERA.md.

# SOGLIA DI ENERGIA · `REGOLA DI SISTEMA` (Edu, 22/08/2026)
Carte sotto i 25 pip ELIMINATE a monte (pb_stress.js). Nuovo baseline S17: 2.788 carte,
58,07%, z 8,52, +29.503 (S17p +33.146). Audit SOGLIAPIP=0. Tutti i numeri precedenti di
questo registro sono sul campione 4.111 e NON confrontabili senza audit.
