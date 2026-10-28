# RIPARTENZA S62 — QI MEN DUN JIA (dalla chat S61, 24-28/10/2026)

Leggere prima: questo file. Il diario completo della S61 (ogni regola, carta e misura) e' in RIPARTENZA_24_10_2026_S61.md: consultarlo
quando serve il perche' di una regola. Stato generale del sistema e guide: RIPARTENZA_23_10_2026_S60.md e Dropbox "/Edu Teaching/DLR Trading Guides".

## ALL'INIZIO (sempre, in quest'ordine, risposte SINTETICHE)
1. Trade della notte: unzip -o history_full_1h_f.zip history_full_1h_from20200129.json, poi node misura_vivo.js (poi git checkout del .json,
   non committarlo). Riportare: esiti del giorno (trend EMA ed esito in testa), Leggo io dal vivo, "DLR da solo, ultimi 20 giorni"
   (peso DLR 0,75 finche' non torna sopra 55%), "Lio col DLR concorde, tenere / STOP 50", "Leggo io a misura".
2. PROMEMORIA privacy (Edu: "ricordamelo"): storico-trading privato su GitHub; app trading su Cloudflare Pages + Access. Finche' non e' fatto.
3. Poi il QMDJ, da dove ci siamo fermati (sotto).

## REGOLE DI LAVORO
- Niente add_repo: git clone con il token di /mnt/user-data/uploads/chiave.txt (chiederlo se manca); push col token nell'header, MAI nei file.
  Commit come claude-push con Co-Authored-By / Claude-Session. Prima del push: git pull --rebase (c'e' la raccolta notturna).
- Cloni in /home/claude; link /root/trading e /root/storico-trading. Ora di Pechino esclusa: tutto sulla mezzanotte di Londra.
- Edu e' l'autorita' di dottrina. Regola #10: una percentuale non respinge una sua lettura (il rischio di sovradattamento si dice una volta).
- 28/10 Edu: "Accendi, dobbiamo migliorare da qualche parte, se stiamo sempre fermi ci vorranno mesi": meno prudenza; le sue regole che
  migliorano lo storico si accendono anche se il vivo cala di poco.
- 27/10 Edu: "se una regola peggiora tanto su un metodo e non su un altro, spegnila solo su quello" -> regole per metodo (PER_DEFAULT in qmdj.js).
- 28/10 Edu: "Lio ragiona, non scorre un elenco di regole: fai lo stesso nel qimen" -> in ogni carta proporre PRIMA la mia lettura
  ragionata (flusso del qi, sostegni, forza, perche'), poi chiedere. Non solo "cosa ci vedi?".
- Dire io a Edu quando conviene passare a una nuova chat (lui non lo vede): farlo dopo ~1 giorno di lavoro o quando il contesto e' gia' stato
  compattato una volta, scrivendo prima la nuova RIPARTENZA.
- Lingua italiana, niente cinese senza spiegazione (es. "controllo rovesciato" per 反侮).

## FORMATO DELLE CARTE (preferenze di Edu)
- Prima riga: ha seguito il trend o no, trend EMA ed esito in pip; Lio e i due metodi QMDJ cosa dicevano.
- Poi ZF/TY (e DS/HS) col nome del trigramma (Kan Kun Zhen Xun Qian Dui Gen Li), stelle/porte/steli, forza; subito i vuoti; bazi IN COLONNA:
  Ora, Giorno, Mese, Anno. La carta va SEMPRE disegnata col renderer di XKDG (qmdj_lavoro/render.js -> carta.html; togliere onclick e il ✕,
  mettere il titolo "CROSS gg/mm/aaaa · stelo-ramo dell'ora · yin/yang N"; poi show_widget). Edu si arrabbia se la carta manca.

## QMDJ — IL MOTORE (repo trading, qmdj.js; NON ancora nell'app)
Carta oraria rotante, chai bu; ora = ramo del seme del cross; Ju sulla mezzanotte di Londra. API: XKDGQimen.oraria(utcMs, ramo),
lettura(carta, trend, 'dshs'|'zfty') -> { dir, segue, motivo, wuBirth, conferma, giornoOra, argomenti }.
Due metodi: DsHs (palazzo dello stelo del giorno = trend contro quello dell'ora) e ZFTY (palazzo dello Zhi Fu = trend contro il Tien Yi,
la stella originaria del palazzo dello ZF, dove si trova ora). La lettura e' una cascata nell'ordine di Edu: relazione di base (controllo,
controllo rovesciato, generazione, ponti/passamano) poi le eccezioni che la correggono. Ogni regola ha un'opzione W.QMDJ_*;
le regole per metodo sono in PER_DEFAULT (un globale impostato a mano vince). Il motivo racconta i passaggi.
Regole accese per metodo (oltre a quelle comuni del 24-26/10: combinazione, colpito, Tai Sui, mese forte, View clash, fan yin, Commander
spostato nell'ora 癸, ponti Commander/ZS/Wu, View ponte in ZFTY, Birth ponte in ZFTY, sopra 庚 in ZFTY, flusso View in ZFTY, Birth/Wu tengono
il controllo in ZFTY):
- DsHs: peso degli stadi di vita (Luoshu) sulla forza; 旺相不空 (forza 8 non vuoto); trigono vivo vince.
- ZFTY: ponte con clash non passa; Commander tiene il controllo; clash interno = mai vuoto; Birth frena il ponte che controlla; trigono in
  tomba nel mese = vuoto (rami: 六仪 degli steli + porta + stella del palazzo d'origine; anche trigoni direzionali); ponte Wu vince il fan yin;
  Birth batte Death salvo mese contrario; il ramo del mese decide fan yin e fermi; 庚/丙 conflittuale (dopo la regola del 庚); eccezione al 庚
  con tre sostegni (ramo dell'anno nel palazzo, stelo di mese/anno che lo genera, TY con forza <= 1); 旺相不空; trigono vivo vince.
Numeri al 28/10 (2020-23 | 2024-26 | vivo; spread 1,5 pip):
- DsHs 1.672 · 52,8% · +5.740 | 1.276 · 54,1% · +7.285 | 58 · 60,3% · +123
- ZFTY 1.569 · 52,5% · +5.816 | 1.199 · 52,8% · +5.921 | 60 · 61,7% · +794
- I due insieme (d'accordo o uno solo; disaccordo = fermo) ~ 53,7% +6.400 | 54,6% +9.500 | 65% +540 (misura del 28/10 prima delle ultime due regole).
- Con Lio: QMDJ concorde con Lio alza Lio di 2-3 punti (68,3 / 66,1 / 66,7%); contro Lio sullo storico non va seguito; quando Lio tace aiuta poco.
Prove spente ma pronte (vedi diario S61): stadi 8-9-10, ZS_FLUSSO, STELI_INT, MESE_PONTE, vuoti del giorno (QMDJ_VUOTI), GIORNO_RIEMPIE, ecc.
Voto pesato alla Lio dentro un metodo: sovradattato (crolla sul 2024-26); la cascata di Edu tiene meglio. Fra i metodi invece funziona.

## KIT DI LAVORO (storico-trading/qmdj_lavoro -> copiarlo in /home/claude/qm, gli script usano quei percorsi)
- storico.json (3.705 carte 2020-26 con trend, seme, mossa) e vivo.json; costruisci.js li rigenera.
- conferma_sis.js (SIS=dshs|zfty: tutte / confermate / contraddette per periodo), run.sh + opts.txt (sweep regole x metodo),
  diff_opt2.js (carte peggiorate da un'opzione) e diff_mig.js (migliorate), insieme.js (i due metodi insieme), porte_zfty.js,
  lio_qmdj2.js (QMDJ sulle 5.401 carte di Lio; serve dump_2020_26.json: ORARIO=full1h.json DUMPC=... node misura_vivo.js 2020-02-20 <oggi>),
  dettaglio.js (CROSS AAAA-MM-GG, SIS=...: seme, pilastri, lettura, palazzi, riga RENDER), render.js + showqm.js (renderer XKDG),
  ragiona.js / ragiona2.js (prove di lettura ragionata). NODE_PATH=/home/claude/storico-trading/node_modules.

## DOVE CI SIAMO FERMATI
- Revisione carta per carta delle carte dove Lio sbaglia o tace (dal vivo e storico), presentate nel formato sopra con la mia lettura.
  Gia' viste (non ripresentare): vedi l'elenco nel diario S61 (EURJPY 22/10, USDJPY 13/10, USDCHF 13/10, EURUSD 19/10, AUDUSD 14/10 e 01/10,
  USDJPY 18/09, EURJPY 18/09, USDCAD 14/08, EURUSD 19/08, ecc.). Prossime candidate: USDJPY 19/10 (DsHs), GBPUSD 07/10, EURUSD 05/10,
  USDCAD 24/09, USDCHF 07/07, NZDUSD 04/08, GBPUSD 17/07, EURJPY 27/07.
- Domanda aperta: i vuoti del giorno valgono in certe carte (es. USDCAD 14/08 si spiegava coi vuoti del giorno)?
- Dopo: QMDJ nell'app come voce visibile (proposto, non confermato); aggiornare le guide (qi-men-dun-jia.html, leggo-io.html, index.html).
