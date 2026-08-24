# RIPARTENZA · 23/08/2026 (sera)

## BASELINE (invariata, verificata a fine sessione)
S17 canonico: **2.788 carte · 58,07% · z 8,52 · +29.503 pip (pesato §74: +33.146)**
Comando: `RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1 node pb_stress.js` (soglia 25 a monte).
Bacino di crescita: **1.169 carte perse dal sistema · 72.694 pip** (dump: `DUMPS17=/tmp/s17dump.json`, campo `dir` = direzione, vittoria = dir coerente col segno di move).

## CABLATO OGGI (motore + liuyao.js, baseline invariata)
1. **§93 — atterraggio annullato su destinazione rotta** (da EURJPY 11/08/2020). Audit `ATTROTTAOFF=1`.
2. **§93-bis — la destinazione carica dal condotto resiste** (da GBPUSD 15/01/2021): casa dell'attore del capolinea → l'atterraggio vale. `setCasaAttore()` in liuyao.js (schema setSblocco); `casaAttoreFrom()` in pb_stress.js; campo `casaAttore` nelle rows; impostato nei 3 `lyDir`. Misura: carica 80,0%/10 · scarica fallisce 67,9%/28.
3. **Flusso: terminale senza radice scende di uno step** (da EURUSD 30/01/2025): attore anche lo stelo dello step precedente se radicato → una o due case (array). Aggiornato ovunque (pb_stress, liuyao, carta_check).
⚠ PWA: `app.js` NON chiama ancora `setCasaAttore` → l'app applica §93 senza eccezione finché non la si cabla lì.

## STRUMENTI NUOVI (obbligatori dal 23/08)
- **`carta_check.js CROSS YYYY-MM-DD [--registra "nota"]`** — checklist completa: PB verbatim, steli (case/radici/capolinea con doppio attore), struttura LY, TUTTE le vie ✓/✗, rafforzativi, meccaniche (atterraggio §93/§93-bis, capannello, arrivi, M8 Tai Sui sul movimento, M9 mese carico del terminale, M11 steli filone 2 con le Sei Bestie, letture base Shi/Ying comprese "Ying genera Shi" e "Shi controlla Ying vuoto"), perimetri candidati, esito filtro.
- **`carte_lette.json`** — registro anti-ritorno (⚠⚠ su carta o gemella già letta). 20 carte registrate.
- Regola di metodo (Edu): il filtro "già spiegata" si fa sulla LETTURA COMBINATA, e la spiegazione va cercata NEL LY (il PB che vince non basta). Per contestare una lettura dottrinale serve una carta completa che fallisca E senza spiegazione da altre regole.

## GIRO M1 — CHIUSO
Esito (Edu): M1 è **regola di supporto** per la lettura normale, non cella cablabile — il LY va interpretato con impiego combinato. Varianti misurate piatte (casa attore 47,6%/105; +mese non vuoto 48,8%/86). Il giro ha prodotto §93, §93-bis e le meccaniche M4-M11. Le 4 perse dal sistema del giro risolte tutte (≈136 pip letti).

## DOTTRINE NUOVE IN PARTE 1 (CANDIDATI_OSSERVAZIONE.md)
- **M4** assorbimento con proiezione (EURUSD 02/06/2020 vs USDCHF 18/05/2022)
- **M5** gli steli superano il vuoto dell'arrivo (mai vuoti, pura energia Yang; il mese aggiunge certezza) (AUDUSD 03/08/2022)
- **M6b** trio direzionale 三會 col giorno annulla il 退神 — REGOLA per dottrina, non cablata in via (GBPUSD 05/12/2022; 3 perse nel perimetro tutte spiegate da altre regole)
- **M7** la fortuna compiuta del W (incontro dei Caratteri W-C; canale-porta 丑↔寅/未↔申 = ipotesi Claude, 65%/20) (USDJPY 25/07/2023)
- **M8** il Tai Sui impedisce il movimento (stelo dell'anno in casa sulla mobile + ramo dell'anno clasha l'arrivo) — DA OSSERVARE SEMPRE, in checklist (EURGBP 22/05/2024)
- **M9** arrivo impigliato dal mese carico del terminale (stelo del capolinea in groppa al mese) (EURUSD 20/11/2024)
- **M10** la P sepolta nella propria tomba (tomba = linea futura del trigramma trasformato; trigono solo coi tre insieme) (USDCHF 30/01/2025)
- **M11** steli filone 2 — INDIPENDENTE dal flusso: stelo di anno/mese/ora dello stesso elemento della **BESTIA** (六獸) della linea → il pilastro opera (clash effettivo; combinazioni in osservazione). Criterio = BESTIA, non il ramo (correzione Edu) (NZDUSD 17/06/2025)
- Letture base aggiunte in checklist: Ying genera Shi (banale); Shi controlla Ying VUOTO senza mobili significative → lo Ying perde da sé (NZDUSD 16/06/2025)
- Prova del principio dell'uso combinato: "B→G sede vince" — 42/42 carte contrarie tutte spiegate da §52; controesempio pulito inesistente.

## PROSSIMA SESSIONE (priorità di Edu: SALIRE DI PERCENTUALE)
1. **Nuovo perimetro**: carte perse dal sistema (1.169) — processarle con carta_check, portare a Edu solo le non spiegate. Le letture nuove alimentano la GERARCHIA.
2. **Gerarchia delle regole (gruppi A/B)** — il passaggio che trasforma le dottrine in percentuale: ogni cella nuda è piatta perché le carte se le spartiscono più regole (dimostrato 3 volte oggi).
3. Affilatura "M1 richiede mese non vuoto": 4 occorrenze tra le perse (USDCAD 24/11/2020, GBPUSD 15/01/2021, AUDUSD 03/08/2022, USDJPY 25/07/2023).
4. Questione aperta da M10: atterraggio §93-bis verso destinazione VUOTA/eliminata ("il vuoto non si lega") — il motore lì diceva SHORT e sbagliava.
5. `SISTEMA_CATENE_v3.md`: correzione DLR −1.611 → −2.565 ancora da fare.
6. Cablare `setCasaAttore` in `app.js` (PWA) quando si aggiorna il software.
7. Modello di forza generale (Bazi completo) — passo strutturale, resta all'orizzonte.

## FLAG DI SESSIONE AGGIUNTI (audit/test in pb_stress.js)
`ATTROTTA=1` (test §93) · `ATTROTTA2=1` (test §93-bis, con ATTROTTAOFF=1) · `M1DUMP=1` (dump gruppo M1 + /tmp/m1_rows_full.json) · `DUMPS17=path` (verdetti S17 per carta).
