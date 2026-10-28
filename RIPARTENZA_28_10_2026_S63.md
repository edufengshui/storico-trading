# RIPARTENZA S63 — QMDJ, LE ORE DEL COMMANDER (dalla chat S62, 28/10/2026)

Leggere prima: questo file, poi RIPARTENZA_28_10_2026_S62.md (regole di lavoro, formato, motore QMDJ, kit). Memoria di progetto:
areas/qmdj-ore-commander.md (tutte le letture di Edu di oggi, parola per parola).

## ALL'INIZIO (invariato)
1. Trade della notte: unzip -o history_full_1h_f.zip history_full_1h_from20200129.json; node misura_vivo.js; git checkout del .json.
2. Promemoria privacy (repo privato, app su Cloudflare Pages + Access).
3. Poi il QMDJ da dove ci siamo fermati (sotto).

## COME PARLARE A EDU (28/10, si e' arrabbiato piu' volte)
- UNA carta per volta. Mai passare alla carta dopo finche' lui non ha chiuso quella in corso.
- Niente tabelle o liste di numeri se non le chiede. Risposte brevi, essenziali.
- Testa della carta come nella sua foto, in frase: "CROSS gg/mm/aaaa: ha seguito il trend / non ha seguito il trend. Il trend EMA era X e
  il cross ha fatto ±N pip. Lio diceva X e ha avuto ragione/sbagliato. I sistemi QMDJ dicevano ...".
- Il movimento si scrive SEMPRE come "con il trend" / "all'opposto del trend", mai solo col segno. Prima / durante / dopo l'ora del colpo.
- Il pilastro dell'ora del colpo (es. 辛丑), non l'ora GMT da sola.
- Messaggi tecnici (git, hook) mai in inglese e mai in mezzo alla carta.

## COSA E' NATO OGGI: qmdj_ore.js (repo trading, pubblicato)
Dottrina di Edu: quando l'ora colpisce il Commander il trend accelera. Il metodo, per la carta del giorno (carta oraria del seme):
- l'ora il cui stelo (甲 -> il suo 六仪) sta nel palazzo del Commander;
- il ramo dell'ora: OPPOSTO (clash) a un ramo del palazzo, IDENTICO, o nel PALAZZO CHE GENERA lo ZF; i rami contenuti in un palazzo sono
  i suoi + quello della stella e della porta (palazzo d'origine) + i 六仪 degli steli (es. 壬 contiene 辰, 辛 contiene 午);
- lo stelo del giorno deve fare un'azione positiva verso lo ZF: sta con lui, lo genera, o genera il palazzo-ponte (Zhen -> Li -> Kun);
- carta normale -> il trend accelera; FAN YIN e FU YIN -> va contro il trend (fu yin: tutto fermo, il clash dell'ora rompe la stabilita');
- mese nel palazzo opposto al Commander (Commander molto untimely) -> l'ora non accende niente.
Carte lette da Edu: EURUSD 05/10 (辛丑 opposta), EURUSD 07/10 (戊辰 identica), GBPUSD 14/10 e USDCHF 14/10 (甲午, 午 nella stella Hero),
EURJPY 07/10 (戊辰, ramo via il ponte 壬 su Li), EURJPY 05/10 (fan yin, 甲辰 contro), EURJPY 06/10 (fu yin, 甲寅 contro),
USDJPY 01/10 (fu yin ma con il trend: Edu "forse perche' lo stelo del giorno genera lo ZF" — sullo storico non regge), USDCAD 13/10 (mese 戌
nel palazzo opposto: niente). GBPUSD 14/10 resta l'eccezione: carta normale, l'ora ha accelerato il NON seguire (come il flusso del Qi).

## MISURE (sullo storico, ore 00-21 GMT, al netto di 1,5 pip; ore normali 43,9% con il trend)
- I criteri presi larghi valgono in 96 giorni su 100; con lo stelo del giorno positivo 56 su 100: il giorno non si sceglie cosi'.
- Ore dello schema: come le ore normali (43,8%). Fu yin + ramo opposto: 36-38% con il trend (contro il trend, tutti e due i periodi) —
  la forma piu' netta trovata. Fan yin: 41%. Carta normale con mese opposto al Commander: 40,3% (409 ore); senza: 45,1% (3.304 ore), dal vivo
  56,4% su 78 ore.
- Tradare solo nell'ora (1-2 ore) non conviene: lo spread si mangia il movimento.
- Giorni da notizia (barra oraria >= 4x mediana e >= 25 pip): Lio 71% contro 65% normale, ma quando perde perde il doppio (-48 contro -28).
  Nessuno stop o uscita migliora (stop 100: +78.212 contro +83.248; calo massimo peggiore). Difesa = size sul giorno peggiore (-329 pip,
  calo massimo -522); stop di emergenza a 200 costa poco.

## DOVE CI SIAMO FERMATI
Si guardano con Edu, una per volta, le carte dove lo schema c'e' (carta normale, stelo del giorno positivo) e nell'ora NON SUCCEDE NIENTE,
per trovare cosa spegne lo schema. Vista: USDCAD 13/10 (mese opposto). Prossime: USDJPY 10/09 壬寅, AUDUSD 10/09 壬寅/甲辰, EURJPY 15/10 甲辰,
GBPUSD 13/10 甲申 (lista_ferme.js nel kit). Script nel kit qmdj_lavoro: misura_ore.js, misura_giorni.js, ore_cmd4.js; in scratchpad anche
misura_schema.js, misura_yin_ds2.js, misura_mese_opp.js, lista_schema2.js (rifarli dal kit se servono).
Dopo: usare le ore per l'ingresso del trade di Lio (entrare all'inizio dell'ora del Commander invece che a mezzanotte) — proposto, non fatto.
