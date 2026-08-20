# RIPARTENZA — 20/08/2026

## Stato del sistema
**NUOVO BASELINE: S17 · 4.111 carte · 57,48% · z 9,59 · +32.039 pip · S17p (pesato §74) +35.842.**
(Partenza di giornata: S11 56,90% · z 8,84 · +31.000.)

Comando canonico invariato:
`RAFFORZA=1 VUOTO=1 SOPRAF=1 VUOTOSTAG=wang DRENA=1 FLUSSOTI=1 NAYINDEB=1 SKIPCLASH=gm RISCATTO=b PBLY=1 node pb_stress.js`

Nel tabellone compaiono S16, S17, S17p, S18, S19 (prove del Serpente). **La riga da guardare è S17.**
LY tace: da 666 a **652 carte** (per effetto del §68-bis).

## Cablato oggi (2 regole)
- **§81 — Serpente 螣蛇 (nuovo rafforzativo).** Serpente su Shi/Ying/mobile e untimely (囚 o 死) + il PB dice
  "non segue" → il PB è forte, il LY non lo scavalca. Perimetro 527 carte: PB 59,20% contro LY 54,84%.
  Contributo +766 pip. **A una faccia sola**: il ramo simmetrico (timely sostiene chi segue) peggiora.
  Interruttore `SERP81=stretto` per il perimetro solo-死, **spento** (costa 868 pip — vedi registro).
- **§68-bis — il clash che è anche controllo.** Se l'arrivo della mobile **controlla (剋)** l'elemento della
  linea colpita, non è urto ma distruzione: prevale la mobile. Sulle 85 carte: da 45,88% a 56,47%.
  Il §68 intero da 54,80% a 57,34%. Interruttore `VIA68BIS=off`.

## Software — la PWA ora applica il sistema completo
Prima di oggi `fsadvisor.org/trading/` mostrava **solo il Plum Blossom** (53,51%): `combinaS9` non veniva
mai chiamata. Ora il segnale è quello del sistema intero, **0 disallineamenti su 4.111** contro il motore.
- `app.js`: chiama `combinaS9` e passa `corpoEl`; nuova riga "六爻 Liu Yao corrective" nel pannello.
- `liuyao.js`: aggiunti i rafforzativi **TSLEGA** (§78) e **SERPENTE** (§81), più il **§68-bis** dentro R32_68.
- Rafforzativi ora attivi: ORA, WVIRTU, TSLEGA, SERPENTE.
- Tolta la parola "inverte" dall'output del motore.

## Piste chiuse oggi (documentate, non ripetere)
- **Le Sei Bestie, esplorazione sistematica.** Vincolo strutturale: la posizione delle bestie dipende **solo
  dallo stelo del giorno**, e due bestie a 3 posizioni sono sempre in specchio → non sei indicatori ma tre
  assi, e la posizione è un filtro di calendario travestito. Bestia su Shi/Ying/mobile: niente. Bestia con
  le parentele: 45–46% "segue" contro una base EMA di 48,77%, nulla a z > 4.
- **Serpente come indicatore di trend**: 48,77%, identico all'EMA nuda.
- **Serpente che tocca il trigramma opposto**: clash 50,00% esatto, combinazione 50,92%. Nulla.
- **Drago che si combina col Serpente**: 41 carte, la casella migliore è spaccata fra i periodi su 11 carte.
- **Linea legata dal giorno liberata dal clash della mobile**: 113 carte, 53,98%, **+8 pip** netti.
- **得位 come rafforzativo del PB**: respinto. Nel contrasto il PB con esagramma ordinato fa 45,62%, peggio
  che con l'esagramma disordinato (46,03%).
- **Timeliness dentro il clash dell'arrivo**: non entra. Funziona in tutti e quattro i quadranti; il
  quadrante "arrivo timely + colpita untimely" è il più debole e l'unico spaccato fra i periodi.

## NOTA DI METODO — la più importante della giornata
**Misurare sempre dentro il contrasto, mai sul totale.** Due volte oggi la stessa trappola:
il Serpente in 死 fa 62,47% (z 4,76) sul totale ma 54,55% nel contrasto; il PB con esagramma ordinato fa
55,72% sul totale ma 45,62% nel contrasto. Il guadagno apparente veniva da carte dove il LY era **già
d'accordo** col PB. Sul totale si misura l'accordo, non l'informazione.

## Operatività
~**3,2 trade/giorno** su 9 cross, **lotto uniforme** + il x2 del §74. Non escludere gruppi.

## Sul tavolo per la prossima sessione
1. **Il Serpente come via autonoma.** Serpente untimely su Shi/Ying/mobile → "non segue": 734 carte,
   56,95%, z 3,76 (recente 56,0 / vecchio 57,1) — meglio del PB intero, ma sotto la soglia z > 4.
   Solo 死: 365 carte, 62,47%, **z 4,76**, sopra soglia. Da valutare se cablarlo come via, non come
   rafforzativo. Attenzione: le due cose vivono in perimetri diversi (vedi nota di metodo).
2. **Le altre bestie con la stessa chiave del §81** (bestia su Shi/Ying/mobile × timeliness) — oggi ho
   esplorato le bestie per sede, forza e parentela separatamente, ma **non** ho incrociato "bestia su
   linea che conta × 死/囚" per le altre cinque. È il taglio che ha fatto emergere il Serpente.
3. **青龍 Drago in alto** (51,79%, z 2,29, +9.843) resta non cablato; come rafforzativo S13 dà +601 pip
   ma z leggermente peggiore.
4. Gruppo **"mese lega il giorno"** (351 carte, PB 47,3%, −651 pip): negativo, manca una lettura alternativa.
5. **R6 con mobile P**: 89 carte, 67,4%, z 3,29 — candidato secondo rafforzativo.
6. Riverificare il candidato §79 (ramo del trigramma su linea vuota).
7. Gruppo "spiegate ma sbagliate" (§52, 三會, 退神) — agenda vecchia, mai ripresa.

## Meccaniche dottrinali registrate oggi
- **§68-bis**: il clash dell'arrivo che è **anche controllo** distrugge invece di spostare; la colpita non
  regge e prevale la mobile. Nel perimetro, "sede della mobile" e "opposto della colpita" coincidono sempre.
- **Il Serpente non è un indicatore di direzione** ma di **fragilità dell'azione**: quando è debole su una
  linea che conta, il movimento non regge e il trend non tiene. Non rafforza il Ti — lo nega.
- **La forza di una regola da sola non dice quanto vale dentro il sistema.** Conta se parla dove gli
  altri sbagliano.

## Carte lette con Edu oggi
- **EURJPY 11/12/2023** (sup 3, inf 4, linea 5, seme 156) — carta d'origine del §68-bis. La Shi L5 未 W è
  la mobile e arriva su 申, che clasha **e controlla** la Ying L2 寅 Legno. Il §68 diceva SHORT; la lettura
  corretta è LONG (+125), come il mercato.
- **USDJPY 13/09/2022** (sup 1, inf 6, linea 1, seme 142) — controesempio del §81, −210 pip. Il Serpente
  L1 寅 P è la mobile ed è 死 nel mese 酉, quindi il §81 lascia decidere il PB (SHORT); ma il LY diceva
  LONG e aveva ragione. Lettura di Edu: la **partenza** 寅 clasha L5 申, che era **legata dal giorno**
  (巳申合), la libera, e L5 sta in alto → LONG. Nota: 寅巳申 formano il 三刑 completo, e l'arrivo 巳 clasha
  il nascosto 亥 vuoto sotto L3 (冲空). La meccanica spiega la carta ma **non è una via** (misurata: 113
  carte, +8 pip).
