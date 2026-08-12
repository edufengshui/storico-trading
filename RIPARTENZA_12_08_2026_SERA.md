# RIPARTENZA 12/08/2026 (sera) — registro sessione PB/LY

## Stato produzione (INVARIATO — regressione verificata a fine sessione)
- PB produzione: 4.111 trade · 53,51% · z 3,86 · +17.221 pip — identico al pip.
- Nessun file PWA modificato oggi (plumblossom.js, app.js, sw.js, trend.js invariati).
- Comando canonico:
  `RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b node pb_stress.js`

## REGOLA OPERATIVA CRITICA (lezione del disallineamento di stamattina)
- OGNI test Liu Yao va lanciato con `SKIPCLASH=gm LIUTAG=1` davanti.
  Senza SKIPCLASH il motore gira su 4.507 carte invece di 4.111 e i numeri
  divergono dal registro (Brother 99/53,5% invece di 94; Officer base 1021
  invece di 924). Tutti i numeri del registro sono sul set di produzione.

## Setup continuità sessioni (nuovo, attivo da oggi)
- Repo GitHub `edufengshui/storico-trading`: motore, PWA, registri, storico
  prezzi zippato. Nessun caricamento richiesto a Edu nelle nuove chat.
- Bootstrap nuova chat:
  1. scaricare tutti i file da raw.githubusercontent.com/edufengshui/storico-trading/main/
  2. `unzip history_full_1h_f.zip` e copiare il json come `full1h.json`
  3. `mkdir -p work_trading/pwa` e copiarvi solar-time.js, jieqi-gmt.js, daliuren.js, trend.js
  4. `npm install lunar-javascript`
  5. verifica: comando canonico deve dare 4111 / z 3,86 / +17.221

## Verifiche di fondamenta (chiuse oggi — motore blindato)
- Na Jia: motore = software di Edu (YijingWWG), 8/8 trigrammi identici
- Palazzi Jing Fang: 0 differenze su 64 esagrammi
- Combinazioni (六合), clash (六冲), 伏神: identici al software
- Pilastro del giorno: motore CORRETTO (caso 31/07/2024 = 丙申, verificato con
  lunar-javascript + algoritmo del software di Edu + calcolo giuliano; lo
  screenshot con 甲申 era un inserimento manuale errato, ritirato da Edu)
- Dettagli in RIFERIMENTO_SOFTWARE_LY.md; sorgente in YijingWWG.html

## Dottrina APPROVATA e codificata oggi (in pb_stress.js — solo lato LY, non tocca i verdetti PB)
1. **Mutante legata dal proprio 伏神** (casoMut −2): se la partenza della mobile
   combina (六合) col nascosto sotto la mobile stessa → movimento NULLO.
   Eccezione: il giorno clasha quel nascosto → la combinazione si scioglie e la
   linea si muove. (81 carte; non sposta le celle attuali.)
2. **Nascosto che CONTROLLA la partenza** → efficienza ridotta della linea:
   nota dottrinale, NON codificata (è una gradazione, da definire).
3. **Movimento nullo ⇒ niente viaggio/atterraggio**: le leggi di sospensione
   (giorno che combina/clasha partenza o arrivo, arrivo vuoto, legame dal
   nascosto, blocco Qian⇄Xun) valgono per qualunque regola nuova.
4. **Trigramma totalmente legato Qian⇄Xun** (casoMut −3): quando la mobile
   trasforma Xun in Qian o viceversa (L1 in basso, L4 in alto), TUTTE e tre le
   coppie ramo-controparte combinano (子丑/寅亥/辰酉 in basso; 午未/申巳/戌卯
   in alto): l'intero trigramma è bloccato, anche le linee ferme. Un clash del
   giorno su partenza/arrivo rompe il legame. È l'UNICO caso di auto-combinazione
   possibile nella Na Jia: 299 carte (~7%).
   ⚠ Applicazione DIREZIONALE irrisolta (vedi Pendenze, punto 1).
5. **Tai Sui**: linea con ramo = ramo dell'anno. Viaggio del passeggero:
   partenza → arrivo trasformato → se l'arrivo combina con un ramo presente,
   atterra su quella linea; altrimenti si ferma alla prima fermata.
   (La regola direzionale generale dell'atterraggio è stata testata e bocciata,
   ma la meccanica del viaggio resta dottrina valida per le letture.)
6. **Format obbligatorio presentazione carte** (in memoria): soggetti sempre
   espliciti — il SISTEMA segue/non segue il trend (verdetto); il MERCATO ha
   seguito/non ha seguito il trend (esito). Mai "inverte".

## Test chiusi oggi con numeri (NON riaprire senza dati nuovi)
- **Wealth-direzionale** (posizione Shi, salute shiForte): conferma PB 50,7%
  vs riferimento 50,9% — BOCCIATO.
- **Atterraggio generalizzato** (qualunque mobile): predice il mercato 50,3%
  su 2.203; depurato dalle sospensioni 50,9% su 863 — BOCCIATO come regola
  generale.
- **PB alto/basso con Yong trasformato** (sup=sale, inf=scende, vince chi
  controlla): "vince Yong" 48,0% (773 carte), "vince Ti" 51,5% (808) — BOCCIATO.
- **Brother-direzionale autonomo** (B allo Shi: sup=SHORT, inf=LONG): 51,4%
  (910 carte) — BOCCIATO come bussola. Come CONFERMA del PB: quando concorda,
  PB vince 54,4% coerente sui due periodi (54,7/54,0 su 447) — candidato
  DEBOLE, tenere d'occhio.
- **Clash-eccita Wealth in stagione**: 32 carte totali (5 col Tai Sui) — NON
  misurabile come cella; può vivere solo dentro un modello di forza.

## Celle Wealth (12/08, con SKIPCLASH=gm)
- Wealth sostenuto + trend su: 29 carte, PB 20,7% (rec 18,2 / vec 28,6) —
  marcatore di SFIDUCIA, fragile (campione piccolo).
- Wealth + mutante sfavorevole: 53 carte, PB 58,5% (60,0 / 57,1) — conferma
  che la mutante-sfavorevole è un tratto generale (come per l'Officer).
- Wealth sostenuto + trend giù: 31 carte, 48,4% — piatta.

## Gerarchia G-first (lettura A POSTERIORI — da codificare alla cieca)
Sulla cella clash-eccita (23 carte: 9 PB-vincenti + 14 PB-perdenti):
1. Il G parla per primo se VIVO (non vuoto, non nascosto) e TOCCATO
   dall'azione (nutrito dalla mobile, clash/sostegno del giorno, Tai Sui
   addosso, Soggetto con sostegno pieno). Solo nutrimento di stagione =
   tiepido → cede il passo.
2. G muto → parla la Wealth MOBILE: la sua posizione dà la direzione
   (alto=LONG, basso=SHORT).
3. La Wealth statica eccitata dal clash parla per ultima.
Esito a posteriori: 18/23 (~78%). Pip della cella: PB da solo −273; con LY
ultima parola +811. CAVEAT: letture calibrate conoscendo l'esito; le carte
gemelle con esiti opposti dimostrano un tetto di rumore irriducibile.
Ruolo del LY (riaffermato da Edu): correttivo — certifica il PB, o corregge
un PB dubbio con l'ultima parola in caso di discrepanza.

## PENDENZE (per la sessione in viaggio, 13/08)
1. **Coppia gemella Xun-57**: EURUSD 20/04/2023 (mercato LONG, il blocco la
   spiega) vs USDJPY 12/04/2021 (mercato SHORT) — identiche fino al mese 辰
   che combina lo stesso G 酉; differiscono solo per giorno e vuoti
   (20/04: vuoto sullo Shi 卯; 12/04: vuoto sulla W 未 a L4). Cosa discrimina?
   Nella cella ci sono 6 carte col lucchetto: 20/04 LONG, le altre 5 SHORT
   (06/08/24, 09/01/24, 14/10/24, 12/04/21, EURGBP 18/01/24).
2. **Domanda dottrinale aperta**: la sospensione dal giorno annulla anche la
   COMBINAZIONE dell'arrivo sullo Shi/Ying (la trasformazione dell'elemento
   shiElE)? Oggi il motore la applica comunque: sulla carta 31/07/2024 lo Shi
   risulta G (Fire) invece di B (酉 Metal, come nel software di Edu). Impatta
   la classificazione dei parenti in TUTTE le celle.
3. Codificare la gerarchia G-first ALLA CIECA e testarla fuori dalle 23 carte.
4. Children e Parent: celle sostenuto/mutante + eventuali regole direzionali
   (mai trattate). Per Brother resta solo il candidato-conferma 54,4%.
5. **Modello di forza per linea** (Bazi completo + tocchi di mobile/giorno/
   Tai Sui): il grande passo che assorbe tutte le micro-celle sotto soglia.
6. (Preesistenti) Rafforzamento dentro il motore completo (> z 2,45?);
   SISTEMA_CATENE_v3.md: aggiornare DLR da −1.611 a −2.565.

## Flag di ricerca aggiunti oggi a pb_stress.js
LYIMBUTO, LYCELLA (aggiornato a shiEff/yingEff), LYATT, LYWEADIR, LYWEAMALE,
LYWEANORAD, LYATTERRA, LYATTTEST, LYATTFAIL, LYATTFAILWO, LYBRODIR, LYBROFAIL,
LYCLASHW, LYCLASHWROMPE, LYGLENS, LYGLENS2, LYBLOCCO, LYLEGATE, LYPROBE, PBALTO.
Campi nuovi nell'oggetto liu: fushen (anticipato), atterraggio, trigBloccato,
casoMut −2 (legata dal nascosto) e −3 (trigramma legato Qian⇄Xun).
