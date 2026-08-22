# RIPARTENZA · 21/08/2026 SERA
Questo file istruisce qualunque sistema (Claude o altro) a riprendere il lavoro senza perdite.

## Baseline confermato (NUOVO — cambiato oggi)
**S17 · 4.111 carte · 57,55% · z 9,69 · +32.512 pip** (S17p pesato §74: **+36.306**)
Recente 56,78 / vecchio 58,40. LY tace: **636 carte** (era 652).
Il miglioramento viene dalla **regola fissata oggi** (giorno legato dal mese, v. sotto), ora
dentro `liuyao.js` per default. Audit: `GIORNOLEGATO=off` riproduce il vecchio baseline
(57,48 / 9,59 / +32.039 / 652).

Comando canonico (tutti i flag insieme, altrimenti il baseline cambia):
`RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1 node pb_stress.js`

Setup sessione: clonare `storico-trading`, scompattare `history_full_1h_f.zip`, symlink
`full1h.json`, cartella `work_trading/pwa/` coi moduli (solar-time, jieqi-gmt, daliuren,
trend, liuyao, plumblossom, nayin_map). Dipendenza npm: `lunar-javascript`.
Prima di fidarsi di qualunque numero: rilanciare il comando canonico e verificare il baseline.

---

## REGOLA DOTTRINALE FISSATA OGGI (nel motore, default ON)

### Il giorno legato dal mese non interviene (Edu, 21/08/2026)
Se il ramo del GIORNO è legato in 六合 dal ramo del MESE, la sua capacità di combinare e
clashare è già impegnata: **il giorno non combina e non clasha nessuna linea, e non sospende
la mobile**. Carte d'origine: EURUSD 22/04/2025 (seme 115) e USDJPY 28/07/2022 (seme 136).
Implementata in `liuyao.js` in TRE punti: stati delle linee (legata/rotta), 暗動, sospensione
della mutazione (caso −1). Vale anche per F3 nel motore di ricerca (`pb_stress.js`, 5 punti).
Ogni forma parziale misurata rende meno della forma piena.

### §11 RITIRATA da Edu (21/08/2026)
Sulla carta USDCAD 18/03/2020 l'interpretazione "Ying fuori dai giochi perché clashato" era
affrettata: P 寅 resta in gioco (Legno vibrante nel mese 卯). Lettura corretta: L4 muove,
genera e si combina con C 未. Decade anche la questione aperta annotata sotto §11.

### §9 autocombinazione — TESTATA la revisione, RESPINTA dai numeri
Ipotesi di Edu (il blocco vale solo se l'arrivo genera la partenza): misurata in tutte le
forme, ogni indebolimento costa (−1.405 / −2.332 / −2.493 pip su S17). **Resta la forma
piena**: 自合 blocca sempre. Switch di audit: `AUTOCOMB9=off|indietro|soloavanti`.
La carta d'origine la vince già il sistema (+266): manca il controesempio con seme.

---

## FILONE NUOVO: IL TRASPORTO (misurato, in watchlist, NON cablato)

**Meccanica** (Edu, 16/08 + 21/08): la mobile ha partenza A e arrivo B; se B combina (六合)
una linea ferma dell'esagramma, A viene TRASPORTATA su quella linea (destinazione) e lì
interagisce per Cinque Elementi.

**Verso dettato da Edu (21/08) — ATTENZIONE alla terminologia**: "fa vincere il trigramma
opposto" significa **vince il trigramma DOVE ATTERRA** (opposto a quello di partenza).
G e W trasportati → vince il trigramma della destinazione. B e P → il contrario.
C → nessun verso stabilito (52,4% / 47,6%, non si pronuncia).

**Filtro di validità del trasporto** (funzione `trasportoValido` in pb_stress.js — OBBLIGATORIA
per ogni misura e ogni carta presentata):
1. movimento non nullo (include: arrivo in vuoto, sospensioni, autocombinazione, legata dal 伏)
2. arrivo non in vuoto (il vuoto non riceve il movimento)
3. M4/F2: il 伏神 della mobile sul ramo del giorno sopprime la mobile (il giorno rinforza il
   proprio ramo, 日辰臨爻, a prescindere dalla stagione) → non parte
4. F4: partenza clashata da giorno E mese → non parte
5. atterraggio unico (una sola linea ferma col ramo partner)
6. la destinazione deve poter RICEVERE: rotta / eliminata / autocombinata non ricevono
   (Edu, da USDCAD 25/03/2020: L5 clashata da giorno e mese non riceve)

**Ribaltamento** (Edu, da USDCAD 11/06/2020): il verdetto designa un vincitore, ma il
vincitore DEVE POTER vincere. Se il trigramma designato non ha nessuna linea viva e timely,
il verdetto si ribalta ("upper win because lower cannot": Shi vuota + G legato dal giorno +
C debole → il basso non può → vince l'alto). Definizione di "non può vincere" = proposta di
Claude, validata solo su quella carta.

**Misure (21/08, filtro completo, flag `TRASPOK` / `TRASPRIB` / `TRASPKO2`)**:
| condizione | n | win% | z | periodi |
|---|---|---|---|---|
| regola base (G/W dest, B/P contrario) | 719 | 51,60% | 0,86 | 53,77/49,83 |
| + ribaltamento | 719 | 52,02% | 1,08 | 51,17/53,47 (periodi si scambiano ⚠) |
| cella: A=B GENERA C → vince la partenza | 66 | 65,15% | 2,46 | 80,77/56,41 |
| cella: A=G CONTROLLA C → vince destinazione | 39 | 58,97% | 1,12 | 38,89/72,22 (spaccata ⚠) |

**Lavoro in corso**: Edu sta leggendo una per una le carte del 49% dove la regola sbaglia.
Già lette e spiegate oggi (NON ripresentarle):
- USDCAD 25/03/2020 → destinazione rotta non riceve (→ filtro punto 6)
- USDCAD 11/06/2020 → ribaltamento ("chi non vince perde" sul trigramma)
- USDJPY 29/04/2024 (seme 158 Li/Kan — CHART GIÀ LETTO 5 VOLTE) → M4: mobile soppressa dal
  伏 sul giorno (→ filtro punto 3)
Prossimo passo: continuare il giro del 49% con `TRASPKO2=1` (346 carte prima dei filtri
nuovi), verificando OGNI carta col filtro e con la lista "già lette" PRIMA di presentarla.

---

## Altro lavoro del 21/08

- **Candidato M6 (C libero da seggio, azione fallita → LONG)**: affilatura tentata e chiusa.
  Restringere non aiuta (nessun taglio batte il gruppo), allargare distrugge (51,7% senza
  "fallita"). Col F3 corretto: **115 carte, 63,48%, z 2,89**. Strada: solo accumulo.
- **§41 (飛神空伏神出) RIMISURATA e ridimensionata**: il campione ora copre L1-L5 (non più solo
  L3): forma generale 49,7-49,8% → **bocciata**. Sopravvive SOLO il G: nascosto G sotto
  copertura vuota FERMA (non mobile, 動不為空) → 68 carte, 36,76% (=63,2% al rovescio),
  coerente sui periodi. In watchlist.
- **"B e P fanno perdere il proprio clan"**: misurata in 3 letture su carte singole-B/P:
  tutte piatte (49,6-51,8%). Non risulta nel registro come regola direzionale; ciò che è
  fissato è §53 (B ostacola il TREND, segue/non-segue — cosa diversa). La versione vera è
  dentro il TRASPORTO (B/P → vince la partenza), v. sopra.
- **Inventario registro**: scoperte MAI cablate: §12 (P condotto), §13 (C versa in W),
  §20 (capolinea del flusso), §52 (chi non vince perde — parzialmente in R13), §41 (ora
  bocciata). Archiviate mai misurate: §6, §21. §33 invece È cablata (R2).
- **Motore, fix tecnici**: output CARTAFULL non stampa più il partner 六合 dell'arrivo se non
  esiste un bersaglio fra le linee visibili (stampava una riga-trappola che invitava a
  letture inventate); ordinamento variabili in liuyao.js corretto perché la regola del
  giorno legato valga anche sul calcolo del 暗動.

---

## REGOLE OPERATIVE (VINCOLANTI PER QUALUNQUE SISTEMA — aggiornate 21/08 sera)

1. **Trascrizione, mai ricostruzione.** Ogni carta presentata a Edu va generata con
   `CARTAFULL='CROSS|YYYY-MM-DD'` (o `CARTA="cross data"`) e le righe dell'esito TRASCRITTE
   dall'output. Se una riga non compare nell'output, dirlo, non dedurla.
2. **Filtro prima della carta.** Prima di presentare qualunque carta (specie come
   controesempio), passarla per TUTTE le meccaniche fissate e registrate — incluse quelle
   "in attesa" in CANDIDATI_OSSERVAZIONE.md. Una carta invalidata da una meccanica nota NON
   è un controesempio. Il 21/08 questo errore è stato fatto QUATTRO volte (carta col giorno
   che non poteva bloccare, con l'arrivo in vuoto, con la destinazione rotta, con la mobile
   soppressa dal 伏 sul giorno).
3. **Carte già lette.** Prima di presentare, controllare la lista in
   CANDIDATI_OSSERVAZIONE.md per cross+data E ANCHE per seme+trigrammi: lo stesso chart su
   cross/date diverse è la stessa carta per Edu (il seme 158 Li/Kan è stato ripresentato 5
   volte: MAI più).
4. **Collegamenti logici = proposte.** Claude può proporre collegamenti, ma dichiarati come
   propri e MAI applicati come regola né scritti dentro la lettura di una carta come fossero
   dottrina, senza l'ok esplicito di Edu. Vietato aggiungere interpretazioni non stampate dal
   motore alla presentazione di una carta.
5. **Verso delle regole.** Prima di misurare una regola di Edu, ripetergli il verso in
   una frase e farselo confermare se c'è QUALUNQUE ambiguità ("trigramma opposto" = quello
   dove atterra, non l'opposto della destinazione: l'ambiguità è costata una misura intera).
6. **Controesempi.** Quando Edu chiede una carta che gli dà torto: la carta deve fallire
   DENTRO il perimetro valido della regola, misurata nel SUO verso. Se non esiste, dirlo:
   "non ho controesempi validi" è una risposta.
7. **Autoverifica del segno.** Prima di pubblicare una misura nuova, testare la convenzione
   di segno su un caso noto (la carta d'origine di Edu deve tornare). Convenzione: il
   trigramma inferiore vince = SHORT; il superiore = LONG.
8. **Le condizioni "funziona ma non cablabile"** vanno in CANDIDATI_OSSERVAZIONE.md con
   flag, n, win%, z, periodi, "n per z4" — mai solo a voce. A inizio sessione, se
   full1h.json è cambiato, rimisurare tutti i flag in blocco.
9. **Regole fissate → nel codice subito**, con switch di audit per riprodurre il vecchio
   comportamento. La memoria fra sessioni non è affidabile; il codice sì.
10. Comunicazione: una cosa per volta, risposta prima e dettagli poi, formato carta
    standard (Cross+data / Trend EMA / il sistema dice / Esito / il mercato ha·non ha
    seguito / Conclusione / poi trigrammi, mutante, seme, poi dati), sempre "segue/non
    segue il trend" (mai "inverte"), caratteri P/G/B/C/W (si dice "Carattere", non
    "parentela"), caratteri cinesi sempre con traduzione, date DD/MM/YYYY.

---

## Da fare (in ordine)
1. Continuare il giro del 49% del trasporto, una carta per volta (regole 2-3-6 sopra).
2. Decidere il perimetro del ribaltamento (definizione "non può vincere" da validare con Edu).
3. Serpente solo 死 come via autonoma: 365 carte, 62,47%, z 4,76 — sopra soglia, manca la decisione.
4. Candidato M6: accumulo (115 carte, 63,48%, z 2,89).
5. Cella G di §41 (68 carte, 36,76% → rovescio): watchlist, affilatura possibile.
6. Riprendere l'inventario delle scoperte mai cablate (§12, §13, §20, §6, §21).
7. SISTEMA_CATENE_v3.md: correggere DLR backtest da −1.611 a −2.565 pip (ancora da fare).
