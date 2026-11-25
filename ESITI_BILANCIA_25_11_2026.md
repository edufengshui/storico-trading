# ESITI DELLA BILANCIA — prime prove (25/11/2026)

Chiesta da Edu il 24-25/11: "spesso non c'e' un'indicazione definitiva ma tante piccole che vanno messe insieme e ognuna fa pesare
la bilancia da un lato"; "inizia con una simulazione in cui ogni peso vale 1 e poi vediamo"; poi "inizia a spostare il valore di
qualche peso per vedere quale e' la configurazione migliore".

## Come e' fatta
Base: i 4.801 trade di Lio (livello LI) dello storico, 2020-02-20 / 2026-10-16; periodi 2020-23 · 2024-26.
Ogni pezzo del "motivo" scritto dal QMDJ (ZFTY; DsHs dove lo ZFTY non da' indicazioni) vale un punto per "segue", "non segue" o
"il cross sale". Lio 1 punto (forte +1). Storico negativo (cross + forza + col/contro il trend, sotto il 50% sui soli trade
precedenti, almeno 20) = 1 punto contro Lio. Bilancia = punti per il verso di Lio - punti contro.
LIMITE: le indicazioni sono quelle che la cascata scrive oggi; alcune le scrive solo se arriva fin li'.
Script: qmdj_lavoro/bilancia_sim.js, bilancia_feat.js, bilancia_pesi.py, bilancia_config.py
(prima: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi>).

## Tutti i pesi a 1
Bilancia per Lio 70,5% · 65,8% (1.883 e 1.688 trade); pari 61,4% · 63,9%; contro Lio 51,9% · 57,2% (189 e 215; +1.081 e +2.512 pip).
Ordina in tutti e due i periodi ma non porta Lio sotto il 50%. Separa meglio sui medi (67,5% · 61,0% contro 57,3% · 52,2%).
QMDJ da solo a bilancia (verso del cross): 53,8% · 51,8%.
Storico negativo contato sul passato: 51,5% (103) · 61,5% (156): non regge nel secondo periodo.

## Indicazione per indicazione (Lio vince: indicazione per lui | contro di lui)
Reggono nei due periodi: View spinge in su 76,6% | 65,7% · 69,9% | 53,3% (ATTENZIONE: e' la misura del 20/11, trovata su questo
stesso storico); il controllo tiene 75,8% | 50,0% · 64,7% | 56,0% (pochi casi); fan yin 66,7% | 65,8% · 66,2% | 57,1%;
ZF vuoto del giorno (pochi casi); base "controlla" 71,0% | 67,0% · 65,9% | 64,7%.
Al contrario della dottrina nei due periodi: flusso del qi su View 63,8% | 70,0% · 60,9% | 69,7% (Lio va meglio col flusso contro).
Le altre famiglie non spostano il risultato in modo stabile (Geng e View che clasha un lato solo nel primo periodo).

## Pesi diversi
- Pesi stimati su un periodo e provati sull'altro: NON battono i pesi a 1 nel trovare i trade cattivi (10% peggiore: 60,3% e 61,2%
  contro 57,6% e 53,2% dei pesi a 1). Migliorano solo in cima (30% migliore 72,3% · 79,6%), per il peso di "Lio forte".
- Alzare a 2 una singola indicazione (View, controllo tiene), togliere il flusso, storico 0 o 2: non cambia.
- Lio forte 2 e media 1: contro Lio 44,2% (104 trade, +50 pip) · 58,2% (122): non stabile.
- SOLO LE 5 CHE REGGONO, le altre a 0: bilancia contro Lio 48,4% (64 trade, -348 pip) · 49,2% (65 trade, +194 pip). E' l'unica
  configurazione sotto il 50% nei due periodi. Ma le 5 sono state scelte guardando gli stessi due periodi: non e' una prova.
  La prova e' il registro in avanti.

## Anche il 25/11
- Controllo del patto alla decima carta (USDCHF 23/11): nessun gruppo con Lio sotto il 50% (QMDJ contro 63,4% · 62,7%; muto 69,1% ·
  63,8%; paralleli e tutto muto 68,2% · 63,9%). Sui forti: QMDJ d'accordo 84,4% · 74,8%, contro 72,9% · 69,9%.
- AUDUSD debole contro il trend: 46,7% (30) · 40,9% (22). Unico cross sotto il 50% nei due periodi fra i deboli contro il trend.
- Edu, AUDUSD 25/11: "View ha un clash interno! Dui e' pure debole e il clash e' contro lo stelo del mese nel dipan". CABLATO come
  interruttore (trading: QMDJ_VIEW_SU_CLASH_INT, View con clash interno non spinge in su), poi Edu: va ragionato a bilancia, non con
  un interruttore. Misura dell'interruttore: unito 52,3% -> 52,2% · 51,8% -> 51,6%.

## LIO PER CROSS (25/11, chiesto da Edu: "alcuni aggiustamenti sul singolo cross siano comunque necessari")
Script: qmdj_lavoro/per_cross.py (tutti i trade LI del dump fino al 24/11/2026).
Lio per cross (2020-23 · 2024-26): EURJPY 70,5% · 75,4%; USDJPY 69,4% · 70,2%; GBPUSD 73,4% · 60,4%; EURUSD 69,6% · 62,0%;
AUDUSD 66,9% · 63,6%; EURGBP 65,7% · 59,1%; USDCHF 64,1% · 65,7%; NZDUSD 64,3% · 62,9%; USDCAD 62,3% · 63,0%.
PROVA IN AVANTI (la decisione usa solo i trade precedenti di quel cross o di quel cross+forza):
- SALTARE dove il passato e' negativo (sotto il 50%, sotto il 55%, in perdita di pip, ultimi 20/40/60 trade, anche con col/contro
  il trend): TUTTE le varianti perdono pip nei due periodi. I trade saltati continuano a vincere (dal 52% al 75%) e a guadagnare
  (da +343 a +3.401 pip per periodo). Un cross che e' andato male di recente NON continua ad andare male.
- RADDOPPIARE dove il passato e' buono (cross+forza sopra il 70%): +27.441 e +24.446 pip, ma e' quasi lo stesso che raddoppiare
  tutti i forti senza guardare il cross (+36.740 e +22.886): il cross aggiunge poco alla forza.
- Caselle piatte nei due periodi: EURGBP debole 50,6% (+441) · 50,7% (-133). Le altre deboli cambiano da un periodo all'altro
  (USDCAD debole 39,2% -> 58,6%; USDCHF debole 44,7% -> 61,7%; EURUSD media 69,2% -> 47,4%; GBPUSD media 71,3% -> 50,6%).
AUDUSD anno per anno: 2020 62,0% +1.512 · 2021 62,2% +1.408 · 2022 72,2% +1.257 · 2023 75,0% +1.398 · 2024 71,4% +1.077 ·
2025 59,7% +871 · 2026 58,3% +758 (da giugno 2026: 53,6% su 28 trade, +289). Dal vivo col livello LI: 8 trade, 4 vinti, -3 pip.
In calo dal 2025 ma mai in perdita in nessun anno.
Bilancia sugli 8 AUDUSD dal vivo: dei 4 persi ne avrebbe fermato 1 (23/11, solo coi pesi a 1) e avrebbe saltato il migliore (04/11, +38).

## CARTA 11 — AUDUSD 29/10/2026 e il fan yin totale (25/11)
Seme 70, ora Ding You, yin 2; trend LONG, sceso 29 pip; Lio LONG debole sbagliato; DsHs, ZFTY e unito "non segue" GIUSTI (fan yin).
La bilancia coi pesi a 1 sbagliava: 2 indicazioni per "segue" (l'ora genera il giorno, ora colpita) contro 1 (fan yin).
Edu: "E' un fan yin totale" (stelle e porte tutte nel palazzo di fronte; ZF e ZS in Kun, TY e HS in Gen).
Misura (qmdj_lavoro/fanyin_totale.js, tutti i lun-ven): fan yin totale (stelle e porte) il mercato segue 48,4% (157 carte) ·
50,9% (110); fan yin del software (steli cielo/terra) 51,5% (814) · 47,4% (698); solo stelle 52,2% · 46,8%; solo porte 49,8% · 52,4%.
Da solo il fan yin totale NON separa nello storico. Detto a Edu.
