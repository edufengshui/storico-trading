# RIPARTENZA S62 — QI MEN DUN JIA (dalla chat S61, 23-24/10/2026)

Leggere prima: questo file, poi RIPARTENZA_23_10_2026_S60.md (stato, regole di lavoro, tutte le sezioni del 23-24/10), poi le guide
in Dropbox "/Edu Teaching/DLR Trading Guides" (index, leggo-io, qi-men-dun-jia) se serve il quadro del sistema.

## ALL'INIZIO (sempre, in quest'ordine, risposte SINTETICHE)
1. Trade della notte: unzip -o history_full_1h_f.zip history_full_1h_from20200129.json, poi node misura_vivo.js (poi git checkout del .json,
   non committarlo). Riportare: esiti del giorno (formato: trend EMA ed esito in testa), Leggo io dal vivo, "DLR da solo, ultimi 20 giorni"
   (peso DLR 0,75 finche' non torna sopra 55%), "Lio col DLR concorde, tenere / STOP 50" (stop deciso: si aspetta ~150 trade), "Leggo io a misura".
2. PROMEMORIA privacy (Edu: "ricordamelo"): storico-trading privato su GitHub; app trading su Cloudflare Pages + Access. Ricordarlo finche' non e' fatto.
3. Poi il QMDJ.

## REGOLE DI LAVORO (invariate)
- Niente add_repo: git clone con il token di chiave.txt (chiederlo a Edu se manca); push col token nell'header, MAI nei file.
  Commit come claude-push con Co-Authored-By / Claude-Session. Il token non ha scope workflow.
- I cloni vanno in /home/claude; creare i link /root/trading e /root/storico-trading verso i cloni (servono a work_trading/pwa e ai vecchi script).
- ORA DI PECHINO ESCLUSA CATEGORICAMENTE: tutto sulla mezzanotte di Londra.
- Regola #10: una percentuale non respinge una lettura di Edu; il rischio di sovradattamento si dice una volta.
- Guide (inglese, private, Dropbox + Drive): aggiornarle senza chiedere quando cambia qualcosa di importante (vedi S60, sezione GUIDE).
  Quando entra il QMDJ: aggiornare qi-men-dun-jia.html, leggo-io.html, index.html.

## STATO AL 24/10 (dettagli nella S60)
- Sistema in uso: Leggo io (LY 1, PB 1, DLR 0,75). Dal vivo 29/09-23/10: 102 · 64% · +1.479; a misura +1.108.
- Nuovo 24/10: misura della posizione (piena sulle forti, meta' su medie e deboli); PB che non scioglie -> il fermo resta (lettura col PB
  muto scritta e spenta, PB_MUTO_LEGGE=1: su quelle carte tutti i metodi al 50%); massimi/minimi veri nello storico e nella raccolta notturna;
  stop su Lio misurato e rinviato; il DLR dal vivo e' un tratto cattivo, non un problema di dati.

## QI MEN DUN JIA — DA DOVE SI RIPARTE
Scelte di Edu (23/10): carta ORARIA e GIORNALIERA; rotante 转盘, chai bu 拆补; ora = ramo del SEME del cross (stelo col 五鼠遁);
Ju calcolato sulla mezzanotte di Londra; le carte le fa il motore di XKDG (non uno nuovo).
Codice (repo trading, NON ancora nell'app/index.html):
- qmdj-water-scanner.js: copia invariata da eduXKDG (getRotatingHourChart). Caricarlo con window = global (vedi qmdj.js engine()).
- qmdj.js (XKDGQimen): oraria(utcMs, seedBranch), giornaliera(utcMs), testo(chart), juOraria, juGiornaliera. Il Ju passa sempre con
  forceJuDun. Oraria: termine in corso (jieqi-gmt, <= 00:00 GMT) + Yuan dal 符头 del giorno. Giornaliera: dayChartJu di XKDG
  (qmdj-daymonth.js, sessione 32) con i termini contati sulla mezzanotte di Londra.
- Verificato 23/10/2026: oraria yin 9 中元, identica palazzo per palazzo fra motore XKDG e costruzione indipendente; giornaliera 庚午 yin 1.
- Differenza dalla giornaliera di XKDG (lon 0): quando il giorno di Londra del termine e' un giorno 甲 tutto il periodo slitta di un Ju
  (3 volte nel 2020-26, ~45 giorni: 立春 2025, 春分 2026, 立秋 2026). DOMANDA APERTA a Edu: tenere la regola di Londra o il giorno del termine di XKDG.
- Uso in node: global.window=global; Solar/Lunar da lunar-javascript (NODE_PATH=storico-trading/node_modules); global.XKDGSolarTime e
  XKDGJieQiGMT dai file del repo trading; poi require('./qmdj.js'). Il seme: rowFor(cross, apertura 00:00) da worker_index.js.
- Celle del motore: palaces[p] = { deity, star, doorName/door, tiH (stelo del cielo), diH (stelo della terra), zhiShi }; nomi inglesi
  (porte Open Rest Birth View Injury Delusion Shocking Death; spiriti Commander Snake Yin Harmonies Tiger Warrior Earth Heaven).

PROSSIMI PASSI
1. Chiedere a Edu cosa rappresenta il cross e chi vince (simbolo utile) e come diventa LONG/SHORT o segue/non segue il trend.
   Candidati proposti il 23/10 (Edu non ha scelto): stelo del giorno contro stelo dell'ora; palazzo dello Zhi Fu contro quello dello Zhi Shi;
   porta del palazzo dell'ora. Edu e' l'autorita': nessuna interpretazione inventata, solo le sue regole.
2. Verifica su carte che Edu legge a mano (2-3 date note).
3. Misura: dump carte 2020-26 (misura_vivo.js ORARIO=full1h.json DUMPC=... da' cross, data, seme, esito, trend), carta QMDJ per ognuna,
   regola scelta sul 2020-23, verifica sul 2024-26 e dal vivo, spread incluso (1-2 pip per cross). Soglia minima per entrare: utile su
   tutti e due i periodi.
4. Solo dopo: "Metodo QMDJ" dentro leggo_io.js (FAM.QMDJ, affidabilita' stimata prima del 2024, CAL per fascia, PESO), app.js
   (voce qmdjDir in analizzaCrossPerReport e in livelloTreSistemi), index.html (script qmdj-water-scanner.js e qmdj.js), misura_vivo.js
   (riga "QMDJ da solo"), raccolta_notturna (stessa app.js: copiare app.js anche in storico-trading). Poi aggiornare le guide.

## QMDJ — PRIMA MISURA DEI TRE CANDIDATI (24/10/2026, Edu: "prova questi")
Script: prove_24_10_qmdj_costruisci.js (carte 2020-26 + vivo con carta oraria e giornaliera; output in /home/claude/qm, non committato)
e prove_24_10_qmdj_misura.py. Regola scelta sul 2020-23 (segue/non segue per categoria, fermo dove |z|<1), spread 1,5 pip.
- A stelo giorno vs stelo ora (relazione degli elementi dei palazzi): 2020-23 +5.970, 2024-26 -3.639 -> NON regge.
- B Zhi Fu vs Zhi Shi: oraria nessuna categoria; giornaliera 2020-23 +2.562, 2024-26 -1.183 -> NON regge.
- C porta del palazzo dell'ora (oraria): Birth e Open -> NON SEGUE il trend. 2020-23 537 · 53,6% · +3.429;
  2024-26 444 · 53,4% · +1.812 (unico che regge); dal vivo 25 · 28% · -328 (campione piccolo).
  Base "contro il trend sempre" ~ +1 pip/trade nei due periodi; C ~ +6 e +4 pip/trade.
- C giornaliera (porta del palazzo del giorno): 2020-23 +8.919, 2024-26 -988 -> NON regge.
Attesa: lettura di Edu su C (perche' Birth/Open contro il trend?) e sue regole prima di metterlo in Leggo io.

## QMDJ — REGOLA DI EDU: GIORNO CONTRO ORA (24/10/2026)
Edu: "il trend e' lo stelo del giorno, cio' che accade durante la giornata lo stelo dell'ora; si confrontano i palazzi e si vede
chi vince; considerare i vuoti e la timeliness dei palazzi". Vince il giorno -> SEGUE; vince l'ora -> NON SEGUE; pari -> fermo.
Script prove_24_10_qmdj_giorno_ora.py. TARATURE MIE, da far decidere a Edu: forza del palazzo 旺4 相3 休2 囚1 死0 sul ramo del mese;
palazzo vuoto = forza 0; chi controlla vince se forza >= dell'altro, altrimenti 反侮; chi e' generato vince; stesso palazzo fermo.
Migliore: carta ORARIA, relazione, senza vuoti: 2020-23 1.588 · 53,0% · +2.953; 2024-26 1.226 · 51,5% · +384; vivo 54 · 63% · -109.
Coi vuoti dell'ora: 52,7% e 51,3% ma 2024-26 -1.303. Giornaliera: non regge. Debole: serve la dottrina di Edu sulle tarature.

## QMDJ — GIORNO CONTRO ORA, REGOLE DI EDU COMPLETE (24/10/2026, 15:11)
Edu: forza = timeliness sul mese E sulla stagione; vuoti DEL GIORNO (provare anche dell'ora); palazzo vuoto a meta' -> vuoto solo se lo
stelo del di pan ha la polarita' del ramo vuoto; palazzo vuoto intero = forza 0; controllo e 反侮 giusti; vince il generato giusto;
stesso palazzo/elemento: "fai una statistica". Script prove_24_10_qmdj_giorno_ora_2.py.
- Oraria, mese+stagione, vuoti del giorno: 2020-23 50,9% -1.538 · 2024-26 48,7% -4.217 · vivo 61% -127 -> non regge.
- Variante migliore: oraria, solo mese, vuoti dell'ora: 52,5% +2.923 · 51,5% -111 · vivo 59% -249.
- Stesso palazzo (se segue): 2020-23 54,8% +1.883, 2024-26 44,1% -2.627 -> si rovescia, resta fermo. Stesso elemento idem.
- "Giorno controlla ora" (senza 反侮) segue: 47,1% e 40,6% -> in tutti e due i periodi il trend PERDE quando il giorno controlla l'ora.

## QMDJ — PONTE DEL COMMANDER (Edu, 24/10/2026 15:17)
"Se il Commander fa da ponte fra il palazzo che controlla e quello controllato l'esito si ribalta." Implementato: palazzo del deity
Commander (non 5, diverso dai due palazzi); controllante = elemento che controlla (反侮 incluso); ponte = controllante genera il Commander
e il Commander genera il controllato. Script prove_24_10_qmdj_commander.py.
- Regola di Edu (oraria, mese+stagione, vuoti del giorno): 2020-23 -2.109 · 2024-26 -763 · vivo 61% +9 (prima -1.538/-4.217/-127).
- Oraria, mese+stagione, vuoti dell'ora: +915 · +1.476 · vivo -235. Oraria, solo mese, vuoti dell'ora: +3.155 · +865 · vivo 59% -113.
- Carte col ponte: 2020-23 100 carte -437; 2024-26 69 carte +1.624 (66-79% sui casi "giorno controlla ora").

## QMDJ — REGOLA FISSATA (Edu, 24/10/2026 15:24): "togli la carta del giorno e i vuoti del giorno"
Solo carta ORARIA, vuoti del 旬 dell'ORA, forza mese + stagione, 反侮, vince il generato, ponte del Commander (contato anche se vuoto:
Edu non ha ancora deciso), stesso palazzo/elemento fermo. Scritta in trading/qmdj.js: XKDGQimen.giornoOra(cartaOraria) ->
{segue, motivo, palGiorno, palOra, forzaGiorno, forzaOra}. Verificata con prove_24_10_qmdj_verifica.js: 0 differenze su 3.776 carte.
Misura: 2020-23 1.588 · 51,4% · +915 · 2024-26 1.226 · 51,7% · +1.476 · vivo 54 · 56% · -235. Spread 1,5 pip.
PROSSIMO: mettere "Metodo QMDJ" in leggo_io.js/app.js/index.html/misura_vivo.js (passo 4) se Edu approva; poi guide.
CORREZIONE (Edu 15:37): "Fowl segue sempre Rice" -> lo stelo del centro sta nel palazzo di Rice (天芮); prima usavo Grass (天蓬), errore.
Rimisurata: 2020-23 1.583 · 51,0% · +575 · 2024-26 1.225 · 50,4% · -449 · vivo 55 · 56% · -230 -> col centro giusto NON regge piu'.
EURJPY 22/10: 壬 a W (palazzo 7, Metallo, forza 7) controlla 己 a E (palazzo 3, forza 1) -> vince l'ora, LONG: perde comunque -179.
PONTE DELLO ZHI SHI (Edu 15:40, da EURJPY 22/10: Metallo -> Zhi Shi a N Acqua -> Legno): come il Commander, ribalta il controllo.
In qmdj.js (un ribaltamento solo anche se fanno ponte tutti e due). Misura (prove_24_10_qmdj_zhishi.py):
Commander + Zhi Shi: 2020-23 50,2% -2.154 · 2024-26 50,2% -1.213 · vivo 55 · 62% · +352. Carte col solo ponte Zhi Shi: 2020-23 99 · 43% · -1.513,
2024-26 74 · 49% · -493, vivo 7 · 71% · +280. Ponte Commander da solo positivo nei due periodi (+412, +360).
PONTI SOLO SE NON VUOTI (Edu 15:42: "lo ZS fa sempre da ponte, se non e' vuoto, proprio come il commander"). In qmdj.js.
Misura (prove_24_10_qmdj_ponti.py): 2020-23 50,0% -2.440 · 2024-26 49,8% -1.941 · vivo 55 · 60% · +102.
Ponte solo Zhi Shi: 2020-23 92 · 42% · -1.443; 2024-26 70 · 47% · -616; vivo 7 · 71% · +238. Ponte Commander: +112 e +212.
CLASH INTERNI (Edu 15:44: "i palazzi con clash interni hanno problemi e potrebbero non vincere o non fare da ponte"). Letto come stelo del
cielo contro stelo della terra (甲庚 乙辛 丙壬 丁癸). NON messo in qmdj.js. prove_24_10_qmdj_clash.py: peggiora ovunque
(niente ponte: 2024-26 -2.487, vivo -372). Contraddizione: EURJPY 22/10 lo Zhi Shi a N e' 辛/乙 (clash) eppure ha fatto ponte.
Chiesto a Edu cosa intende per clash interno.
CLASH INTERNI precisati (Edu 18:15): fra i due steli (甲庚 乙辛 丙壬 丁癸) O fra i due rami dei 六仪 (戊=子 己=戌 庚=申 辛=午 壬=辰 癸=寅:
戊/辛, 庚/癸, 壬/己). prove_24_10_qmdj_clash2.py: nessuna variante migliora. Clash dei soli rami, vincitore in clash fermo:
2020-23 -3.054 · 2024-26 -1.765 · vivo 61% +112. Con gli steli il ponte di EURJPY 22/10 (Zhi Shi 辛/乙) cade e il vivo va a -372.
La regola giorno/ora resta ~50% sullo storico in tutte le varianti. Proposto a Edu: verifica a mano su carte storiche sbagliate.
DECISIONE (Edu 18:18): il clash interno NON si usa. qmdj.js resta senza clash.

## QMDJ — VERIFICA A MANO, CARTA 1: USDJPY 01/05/2024 (Edu 18:26)
FORMATO CARTE (Edu 18:23): in testa se ha seguito o no; poi DS in <trigramma> (Dui...), HS in <trigramma>; subito vuoti e data bazi.
Edu: "DS e' vuoto quindi non puo' essere generato; il Commander e' pure contro (opposto a Dui). Non segue sembra logico."
In qmdj.js: (1) generazione verso un palazzo vuoto non avviene -> vince chi genera; (2) Commander nel palazzo opposto al vincitore
(1-9, 2-8, 3-7, 4-6) -> ribalta. Misura (prove_24_10_qmdj_vuoto_commander.py):
- Regola ora: 2020-23 1.583 · 51,3% · +3.166 · 2024-26 1.225 · 50,9% · +462 · vivo 55 · 62% · +106.
- Generato vuoto da solo: carte toccate 112 · 57% · +1.549 e 100 · 57% · +829 (regge). Commander opposto: 160 · +765 e 118 · -25 (neutro).
Prossime carte pronte: EURJPY 19/12/2024 (反侮), EURJPY 12/02/2025 (ponte Zhi Shi) — da rifare con la regola nuova.

## CARTA 2: USDJPY 06/11/2024 (Edu 18:31): "Qian e' vuoto ma il mese e' Xu, il palazzo e' molto forte, il vuoto non e' significativo"
In qmdj.js: un palazzo che contiene il ramo del mese non e' mai vuoto. La carta ora da' SEGUE (giusto).
Misura: 2020-23 51,4% +2.561 · 2024-26 50,4% +948 · vivo 62% +106 (prima +3.166 / +462 / +106). Variante non adottata
(anche il ramo del giorno riempie): +1.887 / +1.078 / +218.
Edu 18:32: anche il ramo del GIORNO riempie il vuoto -> adottato in qmdj.js (mese o giorno): +1.887 · +1.078 · vivo 64% +218.

## CARTA 4: EURJPY 19/12/2024 (Edu 25/10 10:34): "lo stelo Wu e la porta Birth sono indicatori economici, possono fare da ponte come
Zhi Fu e Zhi Shi. Qui Wu fa da ponte" (戊 nel cielo in Kan). prove_25_10_qmdj_ponte_wu.py (vuoto riempito da mese/giorno):
- attuale (Commander+ZS): +1.887 · +1.078 · vivo 64% +218
- + Wu cielo: +1.687 · +1.269 · vivo 60% +68 | + Birth: +1.451 · +115 · +200 | + Wu cielo + Birth: +1.316 · +904 · +50
NON ancora in qmdj.js: in attesa della decisione di Edu.

## SEZIONE DELLA CARTA (Edu 25/10 11:17): "Dun" = sezione interna/esterna. Kan Gen Zhen Xun (1 8 3 4) contro Li Kun Dui Qian (9 2 7 6)
(interni i primi in yang dun, i secondi in yin dun). Con DS e HS nella stessa sezione chi controlla vince sempre; il controllo
rovesciato (controllato piu' forte) vale solo fra sezioni diverse. Ponte = ribalta l'esito finale (come prima).
prove_25_10_qmdj_sezione.py: con Wu (cielo) come ponte TUTTE e 5 le carte viste a mano sono giuste.
Commander+ZS: -865 · -138 · vivo -6 | + Wu: +1.249 · +181 · vivo 58% +108 | + Wu + Birth: +2.503 · -912 · +126.
(Attuale in qmdj.js, senza sezione e senza Wu: +1.887 · +1.078 · vivo 64% +218.) NON ancora in qmdj.js: attesa decisione di Edu.
DECISIONE (Edu 11:21): regola del Dun MEMORIZZATA ma TOLTA (fa scendere la %). qmdj.js resta senza sezione e senza Wu.
Prova "ponte (Commander/ZS/Wu) = sempre NON SEGUE": +5.147 · +1.881 · vivo 56% -338 (contraddice EURJPY 22/10, ponte ZS -> segue).
REGOLA DEL PONTE (Edu 11:28): "senza ponte vince il giorno -> segue; col ponte non segue: giusto. Senza ponte vince l'ora -> non segue;
col ponte segue: non ha senso." -> in qmdj.js il ponte (Commander, Zhi Shi, Wu nel cielo, non vuoti) da' sempre NON SEGUE. Verificato 0 diff.
REGOLA ATTUALE: 2020-23 1.583 · 51,9% · +5.147 · 2024-26 1.225 · 50,3% · +1.881 · vivo 55 · 56% · -338. (EURJPY 22/10 ora sbagliata.)
AIUTO AL PALAZZO CHE CONTROLLA (Edu 11:32, USDCAD 06/10: "Xun untimely fa fatica a controllare un Gen molto timely, senza aiuti fallisce;
aiuto = ZF o ZS su Kan; il ponte di Wu su Li da' la botta finale"). prove_25_10_qmdj_aiuto.py, NON in qmdj.js:
aiuto ZF: +5.286 · +1.121 · -320 | aiuto ZS: +5.638 · +1.832 · -338 | ZF+ZS: +5.389 · +880 · -320 (attuale +5.147 · +1.881 · -338).
CORREZIONE (Edu 11:40): "ponte = non segue" era un mio ERRORE di lettura. Il ponte e' un PASSAMANO: riceve il qi da chi controlla e lo
passa al controllato secondo i 5 elementi -> vince il controllato (es. EURJPY 22/10: Dui controlla Zhen, Kan fa da ponte -> segue).
In qmdj.js (Commander, Zhi Shi, Wu nel cielo; non vuoti). Verificato 0 diff.
REGOLA ATTUALE: 2020-23 51,8% +3.290 · 2024-26 50,3% -153 · vivo 58% +108. Senza Wu: +2.481 · +318 · 60% +126.
Carte a mano: 4 su 5 giuste; sbaglia EURJPY 19/12/2024 (Qian controlla Zhen, Wu in Kan ponte -> segue, reale non segue).
COMBINAZIONE (Edu 11:53, EURJPY 19/12/2024 Zhen 丁/壬): "il DS e' bloccato da una combinazione dentro il suo stesso palazzo".
In qmdj.js: stelo cielo/terra in 五合 -> palazzo bloccato, non vince (DS -> non segue; HS -> segue (mia estensione simmetrica); tutti e due -> fermo).
prove_25_10_qmdj_combinazione.py, 0 diff. REGOLA ATTUALE: 2020-23 1.599 · 52,3% · +4.577 · 2024-26 1.233 · 51,1% · +1.904 · vivo 57 · 54% · +92.
Le 5 carte viste a mano: tutte giuste. Varianti: solo DS +3.727/+2.789/-25; bloccato=fermo +2.634/+667/+204.
WU CONTRO BIRTH (Edu 11:57: "Wu controlla Birth o il contrario -> il cross va SHORT, indipendente dal trend"). prove_25_10_qmdj_wu_birth.py,
tutte le carte, % SHORT: controllo (tutti e due) 49,6% / 49,3% / vivo 64% -> sullo storico NO. Spaccato: Birth controlla Wu 52,5% / 56,0% /
vivo 80% (pip +407 / -45 / +290); Wu controlla Birth 47,2% / 44,0% / 50% (va piuttosto LONG). Non messo in qmdj.js.
WU/BIRTH A CONFERMA (Edu 12:00) in qmdj.js: wuBirth(c) -> Birth controlla Wu = SHORT, Wu controlla Birth = LONG; lettura(c, trend) ->
{dir, segue, motivo, wuBirth, conferma}. prove_25_10_qmdj_conferma.js:
confermate 302 · 56,3% · +2.926 | 250 · 58,8% · +1.702 | vivo 17 · 65% · +187
contraddette 335 · 49,6% · +4 | 216 · 46,3% · -538 | vivo 13 · 46% · -9 ; senza Wu/Birth 52,0% +1.647 | 49,9% +740 | 52% -87

## LIO + QMDJ (Edu 12:02: "se mettiamo il QMDJ insieme a Lio che succede?")
Dump Lio 2020-26: ORARIO=full1h.json DUMPC=... node misura_vivo.js 2020-02-20 2026-10-23 (~4 min). prove_25_10_lio_qmdj.js/.py.
Lio da solo 66,2% / 63,1% / vivo 60,8% (storico in-sample per Lio). QMDJ su tutte le carte di Lio 50,2% / 49,4% / 53% (senza i filtri della misura QMDJ).
Lio con QMDJ CONFERMATO concorde 68,5% / 70,8% / 57% (14); confermato contrario 59,9% / 58,7% / 50% (8): ~10 punti di scarto.
Filtro "fermo se QMDJ confermato contrario": win% +0,5 ma pip leggermente giu'. Proposta: QMDJ confermato come misura della posizione.
