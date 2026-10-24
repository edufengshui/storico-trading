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
