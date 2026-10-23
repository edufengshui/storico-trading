# RIPARTENZA S61 — dalla chat S59-S60 (22-23/10/2026)

Leggere anche RIPARTENZA_17_10_2026_S57.md (sezioni S58, S59, S59 ter, S60 in fondo) e RIPARTENZA_11_10_2026_S56.md.

## REGOLE DI LAVORO (invariate + nuove)
- Niente add_repo: clonare con git; push col token nell'header (token MAI in file, memoria, registro, repo). Se chiave.txt non
  c'e' nella nuova chat, chiederla a Edu. Commit come claude-push (Co-Authored-By / Claude-Session).
- Il token NON ha lo scope `workflow`: non si possono creare o cambiare file in .github/workflows. Per far girare qualcosa su
  GitHub si usa aggiorna_storico.yml (parte a ogni push di aggiorna_storico.txt e committa solo history_full_1h_f.zip) o
  raccolt.yml (notturna). L'API di GitHub (gh run list) non e' accessibile senza add_repo: si controlla il risultato con git fetch.
- Il Worker (trading-forex-seed.decumano16.workers.dev) e Twelve Data NON sono raggiungibili dal container (proxy 403).
- ORA DI PECHINO ESCLUSA CATEGORICAMENTE: giornata e ore sempre sull'ora di Londra (00:00 GMT); non proporla ne' misurarla.
- Edu vuole risposte SINTETICHE. Carte: in testa trend EMA ed esito (pip), poi immagine e il resto. Nel PB una sola linea mobile
  (carta_auto.js con SOLOMOBILE=1).
- All'inizio: PRIMA i trade (esiti della notte, node misura_vivo.js con la riga "DLR da solo, ultimi 20 giorni"), POI il resto.
- Regola #10: una percentuale non respinge una lettura di Edu, la misura si riporta. Il rischio di sovradattamento si dice una volta.
- Non avere fretta di passare alla carta successiva: chiudere quella in corso con Edu (sua osservazione del 22/10).

## SISTEMA IN USO: LEGGO IO (Lio) per metodi
- leggo_io.js: Metodo LY (LY con la sua via, lettura della carta col gradino, colpo del mese, D, LY per forma), Metodo PB (PB, PB per
  forma), Metodo DLR (DLR con la via, DLR per forma, peso 0,75 finche' "DLR da solo, ultimi 20 giorni" non torna sopra il 55%).
- 23/10: METODO DEL TREND A DORMIRE (fuori dal metodo LY; CON_MT=1 lo rimette); il semplificato non era in Lio.
- 23/10: PB MUTO IN LIO quando lo Yong originale e' in apice nel mese (stesso elemento del mese) (plumblossom.js yongApice; PB_APICE=1).
- Via Hu Gua del PB in Lio scritta e SPENTA (PB_HU=1).
- Dal vivo 29/09-22/10 (cataloghi dentro il campione fino al 16/10): Lio 99 · 63% · +1.460. Giorni mai visti 19-22/10: 19 · 63% · +396
  (trend 47%, DLR 42%). 22/10: piramide 3/6 -256, Lio di oggi 5/6 +374. 23/10: Lio (versione del 22) ha proposto AUDUSD LONG forte,
  USDCAD SHORT debole, EURJPY LONG debole, EURGBP LONG media: ESITI DA GUARDARE.
- DA VERIFICARE: EURJPY 22/10 trend del Worker up, del calcolo del backtest down (confronto_live.md "TREND"); il 23/10 coincidono.

## REGOLE CABLATE IN S59-S60 (tutte pushate, dettagli nella RIPARTENZA S57)
- LY: 暗動 nella propria tomba -> nessuna azione, SOLO se la linea e' fuori stagione; LA TERRA NON HA TOMBA (anche nella lettura della carta).
- LY §140 (R87_MEZZO): linea in mezzo clashata dal giorno e sostenuta dal nascosto passa l'arrivo alla sede (EURJPY 30/07/2026).
- Metodo del trend (ora a dormire): senza caratteri; ferma clashata che porta la forza alla sede combinata dal suo arrivo; blocco del
  pilastro che combina una sede scritto e spento.

## PROVE FATTE E CHIUSE (non rifarle)
- PB: base Ti/Yong 52/48,6%; Yong = trend e' lo specchio; EMA 3-50 (12 gia' ottimo); seme + pilastri (60, rami, lunari, solari, a turno)
  48-52%; seme del giorno d'inizio del trend e somma dei semi 50-51%; tre tempi di Joseph Yu (presente/Hu/Bian) 49-51%; con Hu Gua il
  seme originale resta l'unico che funziona (60,8% dove decide lo Hu Gua). Stagione dello Yong: morto 57%, apice 49%.
- LY contro trend: 648 carte stesso vincitore e direzione opposta (LY 53%); nessuna regola la scioglie in massa.
- Pilastro d'inizio e picco dei 12 giorni, giorno precedente col pilastro bestia+ramo: ~50%.
- Uscite (uscite.js): tenere fino alle 21 da' piu' pip; obiettivi fanno male; STOP 50 tiene i pip e taglia il peggior calo
  (DLR -1.022 -> -656). Misurato sulle chiusure orarie: DA RIFARE coi massimi e minimi veri.
- Ora della linea W vibrante = picco del giorno: no (4,3% contro 5,5%). Estremi del giorno contro i rami della carta: linee W ->
  massimo 1,10 (debole, tutti e due i periodi); il resto ~1. Rami dell'esagramma clashati da giorno/mese/anno/ora: movimento +5% ma
  uguale anche senza esagramma (effetto dell'ora). Script in prove_23_10_*.js (usano uscite.js e un dump SOGLIAPIP=0).

## IN CORSO: MASSIMI E MINIMI ORARI VERI
- aggiorna_storico.js ora, se aggiorna_storico.txt contiene "HL", chiede al Worker /page?full=1 le barre complete fino al 29/01/2020 e
  aggiunge h e l alle barre di history_full_1h_f.zip. Lanciato il 23/10 alle 17:38 (push di aggiorna_storico.txt). Controllare con
  git fetch che ci sia il commit "Storico prezzi aggiornato al ..." e che le barre abbiano h/l (unzip, campo h).
  Se mancano: guardare il log su GitHub (Edu) o ripartire togliendo e rimettendo HL in aggiorna_storico.txt.
- Poi rifare: (1) estremi del giorno contro i rami della carta (prove_23_10_estremi.js, prove_23_10_clash_ora.js, prove_23_10_ora_w.js)
  usando h/l invece delle chiusure; (2) uscite.js con stop/obiettivi controllati su h/l (prima il lato sfavorevole: conservativo).

## PROSSIMO PASSO (Edu, 23/10/2026)
"Introdurre il Qi Men Dun Jia nei metodi di previsione". Da chiarire con Edu all'inizio: quale carta (oraria della mezzanotte di
Londra? giornaliera?), quale sistema (rotante 转盘 / volante 飞盘, chai bu / zhi run), cosa rappresenta il cross e chi vince
(simbolo utile: porta, stella, spirito, stelo del giorno contro stelo dell'ora? palazzi?), come si traduce in LONG/SHORT o in
"segue/non segue il trend". Poi: motore QMDJ in un modulo (qmdj.js), verifica su carte che Edu legge a mano, misura sul backtest
(2020-23 e 2024-26 separati) e dal vivo, e solo dopo un Metodo QMDJ dentro Leggo io.
