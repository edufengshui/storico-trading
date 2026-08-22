# RIPARTENZA · 22/08/2026 SERA
Questo file istruisce qualunque sistema (Claude o altro) a riprendere il lavoro senza perdite.

## ⚠ CAMBIO DI SISTEMA — SOGLIA DI ENERGIA (Edu, 22/08/2026)
**Le carte sotto i 25 pip sono ELIMINATE dal sistema.** Poca energia = nessuna direzione seria.
Il taglio è A MONTE in `pb_stress.js`: vale per il baseline e per OGNI misura, presente e futura.
Nessuna cella può reintrodurle. Audit: `SOGLIAPIP=0` riproduce i campioni storici.
**Conseguenza documentale: tutti i numeri dei registri precedenti sono su un campione diverso
(4.111 carte) e NON sono confrontabili coi numeri da oggi in poi senza `SOGLIAPIP=0`.**

## Baseline confermato (NUOVO — soglia 25)
**S17 · 2.788 carte · 58,07% · z 8,52 · +29.503 pip** (S17p pesato §74: **+33.146**)
Recente 57,28 / vecchio 58,60.
Vecchio baseline (solo audit, `SOGLIAPIP=0`): 4.111 · 57,55% · z 9,69 · +32.512.
Il win% SALE col taglio (le carte piccole erano meno direzionali); lo z scende solo per il
campione ridotto; efficienza per carta da 7,9 a 10,6 pip/operazione.

Comando canonico (tutti i flag insieme, altrimenti il baseline cambia):
`RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1 node pb_stress.js`

Setup sessione: clonare `storico-trading`, scompattare `history_full_1h_f.zip`, symlink
`full1h.json`, `npm install lunar-javascript`. Prima di fidarsi di qualunque numero:
rilanciare il comando canonico e verificare il baseline QUI SOPRA (con soglia 25).

---

## REGOLA CONFERMATA IN VIA DEFINITIVA (Edu, 22/08/2026)
**B e P fanno perdere la squadra della propria sede** (verso RELATIVO al seggio, non assoluto).
Vale anche per il Carattere di ARRIVO della mobile (USDCAD 24/10/2022: G arriva in P → il
basso perde → LONG ✓). Confermata da oltre una settimana di letture; si rivede SOLO davanti a
una carta che la smentisce nel suo perimetro. La riga di RIPARTENZA_21_08 che la dava "piatta
in 3 misure" è FUORVIANTE (perimetri sporchi): non usarla per riaprire la questione.

## IL FLUSSO DEL QI DELLA DATA — forma definitiva (Edu, 22/08/2026, fissata in più passi)
1. **Partecipano tutti e OTTO i caratteri della data** (4 steli + 4 rami), ogni polarità,
   nessuna soglia di quantità: anche un solo stelo o un solo ramo partecipa.
2. Il flusso avanza di generazione in generazione attraverso gli elementi presenti.
3. **Il punto terminale è SEMPRE uno stelo della polarità del giorno** (scala §87): rami e
   steli di polarità sbagliata partecipano ma non possono essere capolinea né portare avanti
   il flusso. Il flusso avanza nell'elemento successivo SOLO se questo possiede almeno uno
   stelo utilizzabile; dove manca, finisce lì, e l'ultimo stelo utilizzabile è il CAPOLINEA.
4. Corollario: con 4 steli e 5 elementi l'anello chiuso NON esiste (la domanda era mal posta).
5. **RADICE** (da EURUSD 12/03/2020): uno stelo agisce sulle linee solo se ha RADICE — almeno
   un ramo della data del suo stesso elemento. Steli senza radice non ricevono e non portano.
6. Se il capolinea è vuoto (casa su linea vuota) → si passa al precedente, che però deve
   essere TIMELY (riceve meno alimentazione). Carta guida: USDCHF 24/11/2021 (己 su L3).
Carte d'origine della sequenza: USDCHF 11/05/2022 (丙 capolinea su L2), USDCHF 24/11/2021,
GBPUSD 29/08/2023 (癸 capolinea, il Legno senza steli ferma il flusso), EURUSD 12/03/2020.

## GERARCHIA DEL CLASH SULLA LINEA CARICA (Edu, 22/08/2026)
**Il clash su una linea che è casa di uno stelo RADICATO non dà un verdetto da fermo: LA
METTE IN MOTO.** Da lì si legge come un movimento qualsiasi: se avanza vince (EURUSD
12/03/2020: L1 avanza e si combina con L3 → vittoria piena), altrimenti parla il Carattere
(EURUSD 28/07/2020: L6 P messo in moto → perde la sede → SHORT ✓).
Vale (per dottrina di Edu) per ogni fonte di clash, incluso il MESE, che normalmente non
clasha una linea ma la muove se questa è carica di steli. NB: nel motore liuyao.js il mese
tuttora NON clasha le linee — la meccanica esiste solo nel foglio di ricerca.

## Regole fissate oggi in liuyao.js / pb_stress.js (con audit)
- **Ritorno-che-controlla** (§89, filtro): arrivo che controlla la propria partenza → il
  movimento forzato non giunge a destinazione. Audit `RITCTRL=off`. Le 5 carte escluse
  facevano 2-3; argomento forte: seme 93 identico con verdetti opposti.
- **Clash del portatore** (§89, filtro 2): ramo del pilastro dello stelo carico clasha la
  partenza della mobile → il blocco tiene, vince la SEDE. Audit `PORTCLASH=off`. Valutato
  PRIMA del ritorno-che-controlla (emette verdetto). ⚠ su 4 carte: 2-2, non confermato dai numeri.
- **Sblocco del giorno** in liuyao.js: hook `setSblocco()` + `GIORNOSBLOCCO=off`. La mobile
  sospesa con capolinea in casa, TIMELY, si muove come linea normale. Baseline NON toccato
  (verificato: identico con hook spento e acceso di default).
- **Mobile TIMELY obbligatoria** perché gli steli forzino il blocco (da EURUSD 12/03/2020,
  presentata per errore senza questo requisito).
- **RADICE** richiesta all'attore (flag audit `RADICE=off`).

## Misure della giornata (TUTTE a soglia 25, salvo nota)
| condizione | flag | n | win% | z | periodi | nota |
|---|---|---|---|---|---|---|
| **G1: arrivo di una mossa clasha linea con stelo radicato, P/B in moto → sede PERDE** | `CLASHSTELI=1` | **47** | **65,96%** | **2,19** | **69,2/61,9 ✓** | LA MIGLIORE della giornata; ~110 carte per z4 |
| G2: come sopra, C/W/G (esplorativa) | `CLASHSTELI=1` | 52 | 51,92% | 0,28 | — | il moto indebolisce la sede in generale? osservazione |
| G3: colpita "che può avanzare" → vince | `CLASHSTELI=1` | 65 | 44,62% | −0,87 | — | criterio di avanzamento di Claude SBAGLIATO: da ridefinire con Edu |
| M1: MESE clasha linea carica, P/B → sede perde | `CLASHSTELI=1` | 147 | 52,38% | 0,58 | 56,3/46,9 ⚠ | Edu ritiene la regola giusta; GIRO CARTE IN CORSO (v. sotto) |
| §91 forma "vince da ferma" (tutte le fonti) | `CLASHSTELI=1` | — | — | — | — | SUPERATA dalla gerarchia "messa in moto" |
| §89 sblocco: perimetro (capolinea radicato in casa, mobile timely) | `SBLOCCOMIS=1` | 34 | — | — | — | LY dentro il perimetro: 44% col blocco, 53% sbloccato; 1 sola carta divergente a soglia 25 |
| §89 FORZABLOCCO forma vecchia (condotto 1 passo) | `FORZABLOCCO=1` | 35 | 54,29% | 0,51 | — | ridimensionata dalla forma definitiva del flusso |

**⚠ §89 — bilancio onesto**: nelle forme strette del mattino misurava 66-82% su 11-18 carte;
nella forma dottrinale definitiva (otto caratteri, capolinea, radice) il segnale sul verdetto
"vince la raggiunta" NON c'è (54% su 35). La lettura carta-per-carta resta valida (ogni carta
letta con Edu si spiega); il valore misurabile si è spostato sulla cella G1 della gerarchia.

## Carte lette oggi (aggiunte alla lista in CANDIDATI_OSSERVAZIONE.md)
| carta | seme | esito |
|---|---|---|
| USDCHF 13/12/2022 | 93 (Li/Xun L3) | §89 perde; ritorno-che-controlla → filtro |
| USDCHF 12/11/2025 | 80 | clash del portatore (丁亥: 亥 clasha 巳) → blocco tiene → filtro 2 |
| GBPUSD 17/09/2025 | 136 (Qian/Kun L5) | regola "vince chi è colpito dal clash se ha steli": 丑 clasha L1 casa di 己 → SHORT |
| USDCHF 13/11/2025 | 79 | giorno carico clasha il trigramma inferiore → lo fa vincere |
| USDCHF 24/11/2021 | 93 (gemella 13/12/2022!) | capolinea vuoto → ripiego su 己 timely; trigono direzionale Acqua → P nascosto forte → LONG |
| USDCHF 11/05/2022 | 99 | portatore 丙寅 muove la legata; sceglie il clash su L5 (P legato dal mese liberato) vs combinare la vuota → SHORT |
| USDCAD 24/10/2022 | 136 | L2 forte muove → arriva in P → P fa perdere la sede → LONG (Carattere d'ARRIVO) |
| EURUSD 15/11/2024 | 105 | (presentata; lettura: sblocco + combinazione, non clash: caso normale) |
| EURUSD 12/03/2020 | 112 | steli muti sulla mobile NON timely; L4 clashata dal giorno muta in B → SHORT; L1 avanza+combina |
| EURUSD 28/07/2020 | 117 | L6 P (casa di 庚 radicato) clashata dall'arrivo → messa in moto → perde la sede → SHORT |
| GBPUSD 29/08/2023 | 126 | carta d'origine del principio del punto terminale (capolinea 癸) |
| EURUSD 04/02/2022 | 114 | controesempio M1 sotto soglia (14 pip) → ELIMINATA dalla soglia 25 |

## Lavoro in corso / da fare (in ordine)
1. **Giro delle carte M1** (mese clasha linea carica, P/B, sopra soglia): Edu ritiene la regola
   giusta; i numeri sono piatti (52,4% su 147). Presentare le perse una alla volta, filtrate
   per meccaniche note e carte già lette. Flag: `CLASHSTELI=1 DUMPM=1` (in pb_stress.debug.js
   la versione col dump — ricrearla se manca).
2. **Definire con Edu il criterio di "avanzamento"** della linea messa in moto dal clash (il
   criterio tabellare di Claude fa 44,6%: sbagliato).
3. Cella G1 → watchlist, accumulo verso z4 (~110 carte).
4. Gruppi A/B delle regole (concordi/discordi) per la gerarchia: LAVORO FUTURO, non ora.
   27 regole nel termometro + confermate di lettura. Architettura discussa il 22/08.
5. M6, Serpente solo 死, cella G di §41: da RIMISURARE tutti a soglia 25 prima di usarli.
6. SISTEMA_CATENE_v3.md: correzione DLR −1.611 → −2.565 ancora da fare.
7. Trasporto: giro del 49% in sospeso (numeri da rifare a soglia 25).

## Regole operative (INVARIATE dal 21/08 — rilette e violate/corrette oggi più volte, contano)
Trascrizione mai ricostruzione · filtro PRIMA della carta (oggi violato 3 volte: mobile non
timely, anello chiuso inesistente, carta sotto soglia) · carte già lette (per cross+data E
seme+trigrammi) · collegamenti di Claude = proposte · verso ripetuto e confermato prima di
ogni misura · controesempi solo nel perimetro · autoverifica del segno · una cosa per volta ·
formato carta standard CON riga degli steli (case + radici + capolinea) · P/G/B/C/W ·
"segue/non segue" · cinese SEMPRE con traduzione e LIMITATO (Edu, 22/08: nomi italiani
delle meccaniche — "ritorno-che-controlla", non solo caratteri) · date DD/MM/YYYY.
