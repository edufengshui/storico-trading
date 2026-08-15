# RIPARTENZA — sessione 14/08/2026 (in aereo)

## PRIMA COSA DA FARE NELLA PROSSIMA CHAT (ordine tassativo di Edu)
1. **IL TREND ANNUALE** — riprendere l'ipotesi "Tai Sui difende il trend, il mese lo sfida".
   - Definire il trend annuale in modo **CAUSALE** (senza look-ahead), come l'EMA-12 ma lento:
     **EMA a ~250 giorni** sui prezzi daily. Prezzo sopra EMA-250 = trend annuale su; sotto = giù.
   - Rifare SUBITO la misura §54c con la EMA-250 causale al posto della somma-col-senno-di-poi:
     verificare se regge il **55,39% (Tai Sui controlla il mese) vs 50,43% (mese controlla il
     Tai Sui)** — concordanza dei giorni col trend annuale, trovato con look-ahead.
   - Se tiene → struttura grossa e operabile (due EMA sullo stesso prezzo: 12 = Ti giornaliero,
     250 = Ti di fondo). Se crolla → era solo effetto del guardare il futuro.
2. **MEGA TEST SOLO SUL PB** — misurare se le regole nuove di oggi (importate nel PB) hanno
   aumentato il win rate rispetto al baseline canonico **53,51% / z 4,51 / +17.221 pip**.

## BASELINE CANONICO PB (INTATTO, non ancora toccato)
`RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b node pb_stress.js`
→ 4.111 trade · 53,51% · z 4,51 · +17.221 pip. Motore: `pb_stress.js`. Modulo LY: `liuyao.js`.
SKIPCLASH=gm scarta le carte con clash giorno↔mese PRIMA del dataset (tutte le misure LY già al netto).

## BOOTSTRAP AMBIENTE
Clonare storico-trading; `unzip history_full_1h_f.zip` → rinominare in `full1h.json`;
`npm install lunar-javascript`. Tutto in GMT/TST (lunar-javascript emette in Pechino,
jieqi-gmt.js converte −8h: unica conversione).

## REGOLE NUOVE DI OGGI (14/08) — nel REGISTRO_CORREZIONI_13_08_2026.md (1.696 righe, §48-54)
- **§48 GRANDE TEST PB+LY**: nel contrasto vince il LY (53,92 vs 46,08); concordanza 56,77%;
  LY spareggia i deboli 56,06% (z 3,70). Sistemi in-sample: S1 override z 6,00 +23.040;
  S3 spareggio z 6,07 +21.467. Vale la coerenza fra i due periodi, non lo z; holdout quando congelato.
- **§49 Tai Sui che muta in Ufficiale**: 57,89% su 57, entrambi i periodi, 16,71 pip/tr.
  Il più forte: arrivo Ufficiale NON timely (64,52%, 63/63). Guardare SEMPRE il ramo di ARRIVO
  della mutazione come secondo attore.
- **§50 Tai Sui che combina a distanza**: 3 letture dottrinali conservate (va dove atterra;
  linea vuota non riceve; CIRCUITO CHIUSO EURUSD 05/03/2025, 1 carta su 4111). NESSUN segnale
  misurabile (51-52%). Mutazione IN elemento = attore; combinazione A distanza = legame debole.
- **§51 LA TOMBA**: Ufficiale in tomba → non porta direzione, si legge l'opposto (57,14% su 42,
  Acqua+Fuoco; Legno/Metallo strutturalmente assenti). SCOPERTA: è l'Ufficiale VIBRANTE che si
  spegne (66,67%), contro la clausola classica. Fratelli in tomba → si spengono se DEBOLI
  (64,29%). Ricchezza → mantiene la direzione. La tomba distingue attori (spenti da vibranti)
  da passivi (spenti da deboli).
- **§52 "CHI NON VINCE PERDE"**: azione fallita (回頭剋, autocombinazione, arrivo clashato) →
  si legge l'opposto. 52,27% su 1.211 carte (~1/3 campione), entrambi i periodi, +2.943 pip.
  NON default (succede anche il contrario): la condizione di fallimento è il segnale. Genitori
  in 回頭剋 → opposto 59,57%. ⚠ La §14 in produzione fa 46,94% sui 回頭剋 deboli — CORREZIONE
  NON ANCORA APPLICATA (Edu: "te lo faccio fare dopo", serve rimisura baseline PB).
- **§53 I FRATELLI OSTACOLANO IL TREND**: i parenti LY come "segue/non segue" (non long/short).
  Solo i Fratelli danno segnale, verso NON-segue. **兄弟 timely nel Ti a L4 → non segue = 57,14%
  (z 2,33, periodi 57,53/55,96)** FISSATA. Ricchezza nel Ti → piatta (no controparte simmetrica).
- **§53c-d QUADRO Ti vs Yong**: nel Ti ostacolano i due AVVERSI — Ufficiale (52,18%) e Fratelli
  (51,59%), forti a L4 (55-57%). Ricchezza/Figli/Genitori neutri. Nello Yong tutto piatto.
  L'effetto vive nel Ti (che È il trend). Ostacolo = presenza statica (non serve movimento);
  B/G mobili nello Yong NON ostacolano. **Ufficiale nel Ti + linea VUOTA nel Ti → 55,65%
  (z 2,13)**: una falla nel corpo del trend. Il Fratello vuoto ostacola comunque.
- **§54 FAVORE INSTABILE / ANTI-SEGNALE STABILE**: la mutazione che GENERA il Ti (favore) è
  instabile per anno (2020 32% → 2024 72%) e per mese (nascita 寅申 peggiori). MA l'ANTI-segnale
  è stabile: **mese CONTROLLA il Tai Sui + mutaz. genererebbe il Ti → NON segue = 65,12%
  (periodi 61,90/68,18)** FISSATA. Dottrina: Tai Sui sopraffatto dal mese non porta il favore.

## IPOTESI GROSSA APERTA (da cui ripartire) — TREND ANNUALE
Edu: il Tai Sui difende il trend di fondo (annuale), il mese lo sfida.
- Test globale su relazione anno-mese (chi vince Ti/Yong) su 4.111 carte: NON conferma (49-50%
  ovunque). Il rapporto Tai Sui-mese conta SOLO in combinazione con la mutazione, non da solo.
- MA con **trend annuale** (somma movimenti anno, CON look-ahead): i giorni concordano col
  trend annuale al 55,39% quando il Tai Sui controlla il mese, 50,43% quando il mese controlla
  il Tai Sui (periodi allineati). Esiste un trend annuale (53,73% concordanza su tutto).
- ⚠ La misura ha LOOK-AHEAD (somma dell'anno intero). Va rifatta CAUSALE con EMA-250. → punto 1.

## ALTRI PUNTI APERTI [PENDING]
- Correzione §14 in produzione (la mobile in 回頭剋 non vince → opposto) + rimisura baseline PB.
- Aggiornare stagione() in liuyao.js con la doppia timeliness (§37, dal 13/08) — mai fatto.
- Integrare le regole nuove (§49, §51, §52, §53, §54) nel termometro e rimisurare il grande
  test PB+LY (§48).
- Modello di forza per linea (netStr generalizzato su tutto il Bazi) — il passo grosso dal 13/08.
- Aggiornare SISTEMA_CATENE_v3.md con baseline DLR corretto −2.565 pip (mostra ancora −1.611).
- Freeze del sistema LY e validazione sul holdout (mai toccato).
- Il "favore al Ti" filtrato resta instabile (gap 60/51): non usato come regola.

## SOGLIE STATISTICHE
z > 4 su research prima di aprire holdout; z > 3 su una singola interrogazione holdout basta.
z nominale da correggere per correlazione inter-cross (~2,5 crossi indipendenti su 9) e test
multipli (~250+). Il 2020 (cluster COVID, stesso Bazi in giorni contigui) gonfia spesso il
periodo vecchio. Metodo: coerenza dei due periodi + spiegazione dottrinale PRIMA del dato +
simmetria con regole note — non lo z isolato.

## PRINCIPIO METODOLOGICO EMERSO OGGI
Due meccaniche distinte dei parenti: **agire** (serve movimento: Tai Sui che mette in moto,
capolinea, 回頭剋, tomba) e **ostacolare** (basta presenza forte nel Ti). Le regole che tengono
sono RARE e SPECIFICHE (capolinea drenato, Tai Sui→Ufficiale, tomba dell'Ufficiale, Fratello/
Ufficiale nel Ti a L4, anti-segnale mese-Tai Sui). Le strutture FREQUENTI (combinazione Tai Sui,
generazione del Ti, parente come direzione assoluta) NON separano — serve la DINAMICA, non la
classificazione statica. Nessun singolo fattore governa 4.111 carte.
