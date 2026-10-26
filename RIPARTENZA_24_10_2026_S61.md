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
MISURA DELLA POSIZIONE con QMDJ confermato (prove_25_10_lio_qmdj_posizione.py): attuale +41.850 / +27.589 / vivo +978;
proposta (accordo media piena, contrario meta') +41.376 / +27.260 / +990; solo accordo->media piena +42.432 / +28.028 / +989 ma resa per
posizione uguale (23,3 / 17,5 / 14,8 pip): piu' esposizione, non piu' vantaggio. Le forti con QMDJ contrario vincono comunque 77% / 72%.
-> il QMDJ come misura della posizione NON aggiunge. Non applicato.

## CARTE DOVE LIO SBAGLIA (Edu 12:23). Dal vivo 37 errori di Lio: QMDJ giusto 15, sbagliato 17, tace 5.
FORMATO BAZI (Edu 12:27): in colonna Ora / Giorno / Mese / Anno.
USDJPY 19/10/2026 (Edu 12:43): "un clash interno ad un palazzo lo fa uscire dal vuoto" (Li 癸/丁). prove_25_10_qmdj_clash_vuoto.py, NON in qmdj.js:
+3.768 · +2.387 · vivo +92 (attuale +4.577 · +1.904 · +92). Sulla carta: Li esce dal vuoto, Zhi Shi fa passamano Xun->Li->Kun, vince Kun -> segue (ancora sbagliata).
FAN YIN (Edu 12:46: "una carta fan yin non segue quasi mai"). Fan yin = stelo del cielo di ogni palazzo = stelo della terra dell'opposto.
Carte fan yin: il trend segue 48,2% (249) / 44,1% (179) / vivo 50% (8). In qmdj.js: fan yin -> non segue (sopra a tutto). 0 diff.
REGOLA ATTUALE: 2020-23 1.672 · 52,8% · +4.721 · 2024-26 1.276 · 52,4% · +1.726 · vivo 58 · 53% · +461. USDJPY 19/10 ora giusta.
TOMBA NEL MESE (Edu 12:59, EURUSD 12/10: "Li e' in tomba nel mese"). In qmdj.js: palazzo con l'elemento in tomba nel ramo del mese = vuoto
(Legno 未, Fuoco 戌, Metallo 丑, Acqua 辰, Terra 辰 — Terra da confermare con Edu; con Terra 戌: +5.336 · +1.873 · +495). 0 diff.
REGOLA ATTUALE: 2020-23 1.672 · 53,6% · +5.433 · 2024-26 1.276 · 52,6% · +2.650 · vivo 58 · 55% · +563. EURUSD 12/10 ora giusta.
Edu 13:13: la Terra NON ha tomba -> tolta. REGOLA ATTUALE: 2020-23 1.672 · 53,5% · +5.643 · 2024-26 1.276 · 52,7% · +2.657 · vivo 58 · 55% · +563. 0 diff.
PROSSIMO COMMANDER (Edu 15:30, EURUSD 05/10: "癸卯 e' l'ultima ora della decade 甲午辛: si vede il prossimo Commander, 甲辰壬, quindi
direttamente col giorno"). In qmdj.js come OPZIONE spenta (QMDJ_PROSSIMO=true): l'ora 癸 si costruisce col 旬 seguente (stesso stelo, +10).
Su EURUSD 05/10 DS 壬 va in Kun col Commander (壬 sopra 癸); HS 癸 in Kan; Kun controlla Kan ma Kan piu' forte -> non segue (ancora sbagliata).
Carte con ora 癸: attuale 51,7% +16 / 55,4% +1.113 / vivo 60% +14; prossimo Commander 50,3% -29 / 39,4% -1.700 / 80% +58. Tutto: 2024-26 da +2.657 a -156.
CORREZIONE Edu 15:42: niente carta nuova, stessa carta col Commander TRASFERITO sul palazzo dello stelo della decade seguente (癸卯 -> 壬, in Li).
qmdj.js: opzioni QMDJ_CMD_SPOSTA (sposta il Commander nelle ore 癸) e QMDJ_CMD_AIUTO (Commander nel palazzo che controlla: niente controllo
rovesciato), tutte e due SPENTE. prove_25_10_qmdj_commander_spostato.js:
nessuna +5.643 / +2.657 / +563 | spostato +6.042 / +1.918 / +607 | spostato+aiuto +5.620 / +1.491 / +619 | solo aiuto +6.013 / +2.357 / +511.
EURUSD 05/10 torna giusta solo con spostato + aiuto (Li col Commander controlla Qian). In attesa di Edu.
Edu 15:46: "il Commander spostato toglie il ponte da Kun; Li diventa molto piu' forte col Commander". Opzione QMDJ_CMD_FORZA (punti in piu'
al palazzo del Commander), spenta. prove_25_10_qmdj_commander_forza.js: ogni bonus (2-8) peggiora lo storico, con o senza spostamento;
EURUSD 05/10 torna giusta solo con spostato + forza >= 6: +5.276 / +968 / +653 (attuale +5.643 / +2.657 / +563). Non adottato.
Edu 15:48: la forza del Commander vale SOLO nell'ora 癸. Spostato + forza solo 癸: +0 +6.042/+1.918/+607; +6 +5.606/+1.720/+671;
+8 o piu' +5.730/+1.785/+671 (EURUSD 05/10 giusta da +6). Attuale +5.643/+2.657/+563 -> 2024-26 -872. Opzioni ancora spente.
Edu 15:51: "Li e Qian sono nello stesso Dun". Opzione QMDJ_DUN (spenta). prove_25_10_qmdj_dun.js, col motore di oggi:
Dun +6.169/+1.767/+545 | Dun + Commander spostato (lettura completa di Edu su EURUSD 05/10, carta giusta) +6.178/+1.581/+653 |
Dun + spostato + forza +8 +6.205/+1.666/+653 | attuale +5.643/+2.657/+563. Il Dun toglie ~900-1.000 pip al 2024-26.
Edu 15:58 (USDJPY 31/07/2024): "il nuovo Commander che arriva su Xun trova un clash che lo limita" (甲申 contro 癸=甲寅). In qmdj.js:
il Commander spostato non agisce se nel palazzo c'e' un clash (steli o rami dei 六仪) con lo stelo della nuova decade. prove_25_10_qmdj_dun_clash.js:
Dun + spostato + clash: +5.974 / +1.697 / +653 (EURUSD 05/10 e USDJPY 31/07/24 giuste); senza Dun: +5.838 / +2.470 / +607;
attuale +5.643 / +2.657 / +563. Opzioni ancora spente (QMDJ_DUN, QMDJ_CMD_SPOSTA; il clash e' attivo quando lo spostamento e' acceso).
DECISIONE (Edu 15:59): "togli il Dun". qmdj.js: Dun SPENTO; Commander spostato nelle ore 癸 + limitato dal clash ACCESO; forza del Commander spenta.
REGOLA ATTUALE: 2020-23 1.672 · 53,6% · +5.838 · 2024-26 1.276 · 52,4% · +2.470 · vivo 58 · 57% · +607.
PALAZZO COLPITO (Edu 16:06, EURGBP 20/10: "l'ora e' in clash e lo ZS dal palazzo opposto clasha"; Qian 辛/戊 = 午/子, ZS in Xun).
In qmdj.js (ACCESO, QMDJ_COLPITO='zs'): DS o HS con clash interno e Zhi Shi nel palazzo opposto -> non vince. prove_25_10_qmdj_colpito.js:
REGOLA ATTUALE: 2020-23 53,0% +4.540 · 2024-26 53,0% +3.500 · vivo 59% +663 (prima +5.838 / +2.470 / +607).
Confermate: 57,2% +3.105 · 60,3% +2.166 · vivo 71% +266. Varianti: +Commander opposto +4.664/+3.447/+663; solo ZS opposto -1.706/+2.690/+627.
Edu 16:13: solo clash interno (senza ZS opposto): +1.379 / +1.703 / vivo 52% +411 -> peggio. Resta clash + ZS opposto.
ORA INIBITA (Edu 16:20, USDCAD 12/10: "il Commander clasha l'ora e l'ora e' opposta al suo stesso ramo"). Opzione QMDJ_INIBITA (spenta):
Commander nel palazzo opposto all'HS + HS nel palazzo opposto al ramo dell'ora -> segue (sopra il fan yin); simmetrico per il giorno.
Tutte e due: +5.740 / +2.108 / vivo 62% +701 (attuale +4.540 / +3.500 / 59% +663); una sola: +1.030 / +3.448 / +405.
Utility: prove_25_10_qmdj_dettaglio.js CROSS DATA (seme, pilastri, lettura, palazzi).
COMMANDER CON 庚 (Edu 16:28, USDJPY 18/07/2024: "il Commander sopra o sotto Geng e' pessimo"). QMDJ_CMD_GENG: 'inibita' (default: il
Commander con 庚 non inibisce l'ora), 'ovunque' (ignorato in tutte le regole), 'off'. Con ora inibita accesa: +5.328 / +2.086 / +663
(USDCAD 12/10 e USDJPY 18/07/24 giuste); ovunque +4.531 / +1.960 / +659; solo ovunque senza inibita +3.743 / +3.374 / +659.
Ora inibita resta SPENTA (attuale +4.540 / +3.500 / +663). Utility: prove_25_10_qmdj_diff_opt.js "global.OPZ=..;" (carte 2024-26 cambiate).
DS/HS SOPRA 庚 (Edu 16:30: "Commander sopra o sotto 庚 molto negativo e' dottrina; verifica se si estende a DS e HS").
prove_25_10_qmdj_geng_dshs.js: carte con DS sopra 庚 -> il trend segue 50,8% / 50,5% / 50% (4); HS sopra 庚 -> 50,7% / 50,0% / 62% (8): nessun effetto netto.
Come regola (palazzo sopra 庚 non vince, opzione QMDJ_GENG_DSHS, spenta): +3.676 / +3.754 / vivo 60% +781 (attuale +4.540 / +3.500 / +663);
confermate 57,1% / 61,2% / 72%.
TAI SUI (Edu 16:46, NZDUSD 07/10: "lo stelo dell'anno e' il Tai Sui e puo' opporsi e clashare dal palazzo opposto se e' timely"; 丙 in Kan
contro HS in Li). Opzione QMDJ_TAISUI (spenta): 'mese' +4.073 / +5.720 / vivo +223; 'forza' (mese+stagione>=5) +4.203 / +5.755 / +223;
'ctl' +3.285 / +3.811 / +223. Attuale +4.540 / +3.500 / +663. Confermate col Tai Sui: vivo 75% (16).
DECISIONE (Edu 16:48): Tai Sui ACCESO ('forza'). REGOLA ATTUALE: 2020-23 52,3% +4.203 · 2024-26 54,2% +5.755 · vivo 59% +223.
AUDUSD 07/10 (Edu 16:56): "il ponte Kun ha un clash interno e l'ora e' clashata dal mese (stelo e ramo opposti: clash piu' forte)".
Opzioni spente: QMDJ_PONTE_CLASH (ponte con clash non passa) +4.520 / +5.057 / +119; QMDJ_MESE 'opposto' +1.151 / +5.926 / 62% +265;
'forte' (stelo e ramo del mese in palazzi opposti) +3.150 / +6.465 / +187; 'timely' +3.727 / +5.462 / +255. Attuale +4.203 / +5.755 / +223.
DECISIONE (Edu 16:59): mese opposto 'forte' ACCESO. REGOLA ATTUALE: 2020-23 51,9% +3.150 · 2024-26 54,1% +6.465 · vivo 59% +187.

## QMDJ DOVE LIO TACE O SBAGLIA (Edu 17:07: "il qimen deve dare risposte positive dove Lio tace o sbaglia")
Lio fermo: QMDJ 50,0% -339 / 51,8% +257 / vivo 60% (5). Lio sbaglia: QMDJ giusto 45,4% / 49,2% / vivo 59,4% (32).
GBPUSD 01/10 (Lio fermo, carta fu yin; Edu 17:12: "se il Tai Sui clasha il Commander lo eccita ancora di piu'"). Opzione QMDJ_TS_CMD (spenta):
true (il palazzo del Commander vince) +2.663 / +5.336 / +187; 'neutro' (il Tai Sui non danneggia) +2.895 / +5.377 / +187. Attuale +3.150 / +6.465 / +187.
Edu 17:14: solo col Commander SPOSTATO (ora 癸): QMDJ_TS_CMD='spostato' +3.035 / +6.232 / +187 (attuale +3.150 / +6.465 / +187). Spenta.
DECISIONE (Edu 17:17): QMDJ_TS_CMD='spostato' ACCESO. REGOLA ATTUALE: +3.035 / +6.232 / vivo +187.

## SISTEMA ZFTY (Edu 25/10 17:23). Il sistema finora = "DsHs". ZFTY: trend = palazzo dello Zhi Fu; controparte = Tian Yi = la stella originaria
del palazzo dove sta lo ZF (1 Grass 2 Rice 3 Aggressor 4 Assistant 6 Heart 7 Pillar 8 Official 9 Hero), nel palazzo dove si trova ora.
Stesse regole di DsHs. qmdj.js: lettura(carta, trend, 'zfty'). prove_25_10_qmdj_conferma_sis.js (SIS=zfty), prove_25_10_lio_dshs_zfty.js.
ZFTY: 49,7% -690 / 52,5% +2.286 / vivo 47% -23 (DsHs 51,7% +3.035 / 53,8% +6.232 / 59% +187). Confermate ZFTY 56,3% / 57,5% / 69%.
Su tutte le carte di Lio: ZFTY 49,7% / 51,0% / 50,6%; Lio fermo: ZFTY 51,7% / 51,7%; DsHs+ZFTY d'accordo 50,4% / 51,9% / 57%.
Lio con DsHs+ZFTY d'accordo con lui 67,2% / 65,9% / 62%; contrari 65,5% / 60,2% / 52%.
ZFTY + porta View (Edu 17:33/17:37, EURJPY 07/10: "questo metodo usa la porta View... qui fa da ponte"; TY Zhen -> View in Li -> ZF Kun).
qmdj.js: nello ZFTY la porta View fa da ponte (QMDJ_VIEW_PONTE 'zfty' default | 'tutti' | 'off') e il Commander non si sposta nell'ora 癸
(QMDJ_ZFTY_SPOSTA=true per riaccenderlo). ZFTY: originale -690 / +2.286 / 47% -23; senza spostamento -964 / +3.324 / 51% +294;
senza spostamento + View (ATTUALE) -943 / +2.741 / 51% +294 (EURJPY 07/10 giusta). DsHs con View ponte: +3.366 / +6.214 / +187 (non acceso).
Prova scartata: ZF contro porta View (sis 'zfview') -1.451 / -3.942 / +286.
VIEW CLASHA IL TY (Edu 17:50, EURUSD 07/10: View in Zhen opposto al TY in Dui). qmdj.js QMDJ_VIEW_CLASH ('zfty' default | 'tutti' | 'off'):
la porta View nel palazzo opposto a TY (o ZF) -> quel palazzo non vince. ZFTY ATTUALE: 49,5% -424 / 52,2% +3.746 / vivo 54% +344
(prima -943 / +2.741 / 51% +294). Nel DsHs ('tutti'): +3.694 / +6.467 / +199 (attuale DsHs +3.035 / +6.232 / +187) -> migliora tutto, da proporre.
DECISIONE (Edu 17:59): View che clasha ACCESO anche nel DsHs. DsHs ATTUALE: +3.694 / +6.467 / +199.
ZFTY coi vuoti del GIORNO (Edu 18:09): 48,9% -2.253 / 51,5% +1.876 / vivo 56% +440 (vuoti dell'ora: -424 / +3.746 / +344). Non acceso.
26/10 — EURJPY 29/09 (ZFTY; Edu: "vedo il TY bloccato da una combinazione"): View che clasha ribaltava sopra la combinazione. qmdj.js: con un
palazzo bloccato da combinazione View non ribalta (QMDJ_VIEW_DOPO_COMB, ACCESO). DsHs: 52,2% +3.935 / 53,3% +5.822 / vivo 60% +123
(prima +3.694 / +6.467 / +199; confermate 57,0% / 60,2% / 75%). ZFTY: 49,2% -966 / 52,3% +3.702 / 56% +388 (prima -424 / +3.746 / +344).
