# SISTEMA DELLE CATENE — v3

**Stato del file:** ricostruito il 25/08/2026. L'originale non era presente in nessuno dei due
repository (`trading`, `storico-trading`) né nella cronologia dei commit: era rimasto solo in
uno zip di consegna di una chat precedente e non è mai stato spinto. Questa versione **non è un
restauro** del testo originale: raccoglie ciò che è verificabile oggi dai registri e dal codice.
Se l'originale ricompare, va confrontato con questo file e non semplicemente sovrascritto.

---

## 1. Correzione del backtest Da Liu Ren (大六壬, "grande orazione dei sei")

**Backtest DLR = −2.565 pip.**

Il valore precedentemente riportato, **−1.611 pip, è ERRATO** ed è la ragione principale per cui
questo file era rimasto in arretrato. Quel numero era stato calcolato con il **bug del ramo del
mese** ancora presente.

Il bug (corretto il 07/08/2026): la libreria `lunar-javascript` restituisce due termini solari in
cinese semplificato (惊蛰, 芒种) mentre la tabella di lookup usava il tradizionale (驚蟄, 芒種).
Conseguenza: i rami 卯 e 午 non comparivano mai come ramo del mese — circa 120 giorni sbagliati
all'anno. Correzione applicata in `catena_v23.js` e `daliuren.js`.

Ricalcolato dopo la correzione, il backtest DLR passa da −1.611 a **−2.565 pip**.

**SUPERATO il 31/08/2026 (S32).** Quel backtest misurava il DLR sulla domanda del **trend**
(segue / non segue). Edu ha cambiato la domanda in **direzionale (LONG / SHORT)** e in quella
forma il DLR risponde. Il verdetto "sistema direzionale autonomo negativo e non utilizzabile"
è **ritirato**: non vale per la lettura direzionale, che è aperta e in costruzione.
Tutta la dottrina DLR sta ora in **`REGISTRO_DLR_31_08_2026.md`**. Il DLR continua inoltre a
fornire spiriti e strutture di calendario (Generale del Mese, Cavallo 驛馬, Medico 天醫,
sedi 寄宮 degli steli) usati dentro il Liu Yao e nel PB.

---

## 2. Che cos'è una catena

Una **catena** è una sequenza di passaggi del Qi: una linea (o un ramo di data) ne raggiunge
un'altra per combinazione (六合) o per generazione, quella ne raggiunge una terza, e così via,
finché il percorso si ferma o si richiude.

Regole accertate:

- **Le catene sono quasi sempre di UN solo passo.** Misura del 14/08/2026 sulla combinazione a
  distanza del Tai Sui: 156 catene su 157 sono di un passo. Il bersaglio non nasconde nulla,
  oppure il nascosto non rimanda a una linea presente. Per questo "capolinea" e "prima tappa"
  quasi sempre coincidono.
- **La propulsione viene dagli steli in casa sulla mobile.** È lo stelo del capolinea del flusso
  del Qi (radicato, in scala della polarità del giorno) a spingere la catena.
- **Una linea vuota (旬空) non può ricevere la direzione.** Se la catena atterra su una linea
  vuota e dormiente, il passaggio non produce verdetto.

### Il circuito chiuso (struttura rara)

Se il bersaglio nasconde una linea (伏神) che rimanda al punto di partenza, il circuito **si
richiude**: si legge la posizione dell'**origine**, non quella della prima tappa.

Carta guida: **EURUSD 05/03/2025** (seme 106, sup 5 巽, inf 2 兌, mutante L5, giorno 癸酉,
mese 寅, anno 巳, palazzo 艮, vuoti 戌亥).
Catena: 巳 (Tai Sui L5) → 子 (arrivo) → 丑 (B a L3) → 申 (伏神 C nascosto in L3) → 巳.
Il circuito si chiude sul Tai Sui di partenza → si legge L5, trigramma superiore → LONG.
Mercato +166. ✓

Struttura rarissima: **1 carta su 4.111**. Conservata come dottrina, non misurabile.

---

## 3. Misure — nessun segnale autonomo

Combinazione a distanza del Tai Sui (14/08/2026):

| condizione | n | tutto | recente | vecchio |
|---|---|---|---|---|
| arrivo del Tai Sui combina una linea — direzione del bersaglio | 157 | 51,59% | 47,78% | 55,74% |
| ... bersaglio NON vuoto | 129 | 51,16% | 47,30% | 55,10% |
| ... bersaglio vivo e agibile | 102 | 47,06% | 45,16% | 47,22% |
| capolinea della catena (invece della prima tappa) | 157 | 52,23% | 48,89% | 55,74% |

Filtrare per il vuoto non migliora; restringere ai bersagli agibili peggiora.

**Conclusione:** la catena è dottrina corretta ma **non isola un vantaggio direzionale
autonomo**: resta inchiodata al 51–52%, col periodo recente sempre sotto il riferimento.

Diverso il caso in cui il Tai Sui **muta nell'elemento** dell'Ufficiale e diventa esso stesso un
attore (§49): lì 57,89% con entrambi i periodi sopra. **Mutazione in elemento = attore
misurabile; combinazione a distanza = solo percorso.**

Le misure DLR sul "seguire" (Tre Messaggi 三傳, quattro letture 四課, ramo celeste sopra
anno/mese/ora) sono state **spostate in `REGISTRO_DLR_31_08_2026.md` §8** e riaperte in chiave
direzionale: erano misurate sulla domanda sbagliata.

---

## 4. Catena con assorbimento e proiezione (M4, in osservazione)

Registrata in `CANDIDATI_OSSERVAZIONE.md`, qui richiamata perché è una catena a due passi.

La mobile **B** si muove e diventa **G**: di regola la sede vince. Ma se un'altra linea in moto
(暗動, per clash del giorno) ha l'elemento **generato** dall'arrivo, quella linea **assorbe**
l'energia del G e la **proietta** in avanti sulla generazione successiva, su un **B** o un **P**:
il ricevente fa perdere la **propria** squadra. Il ricevente non prosegue oltre se il giorno lo
tiene fermo.

- **EURUSD 02/06/2020** (seme 111): L1 B→G (卯); L2 午 Fuoco in 暗動 assorbe (il Legno genera il
  Fuoco) e proietta sulla Terra → il B carico perde la squadra → LONG ✓ (+45).
- **USDCHF 18/05/2022** (seme 99): L2 è Terra come l'arrivo, nessun assorbimento → l'azione si
  compie, la sede vince → SHORT ✓ (−56).

Numeri: catena completa 7 carte, 4 giuste. Configurazione rara, **non cablabile**; accumulo.

---

## 5. Da fare

- Verificare questo file contro l'originale, se dovesse riemergere da uno zip di consegna vecchio.
- La gerarchia fra le regole (quale attore parla per primo quando più catene sono possibili)
  resta il lavoro aperto: senza di essa misurare le catene "in blocco" mescola perimetri diversi.
