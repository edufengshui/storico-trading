# RIPARTENZA S77 — EA fermo il 24/11, segno di vita e avvisi su Telegram (chat del 24/11/2026 pomeriggio)

Leggere prima: questo file, poi RIPARTENZA_24_11_2026_S76.md (QMDJ: carta 9, somma dei fattori, View clashata, proposta del
BILANCIO da confermare, patto alla carta 10), poi RIPARTENZA_23_11_2026_S75.md (avvio).
Avvio come in S76. REGOLA DI EDU: la frase per aprire una chat nuova comincia con "Trading".
In questa chat NON si e' lavorato sul QMDJ: tutto quello che e' scritto in S76 resta valido e aperto.

## PERCHE' L'EA NON E' ENTRATO IL 24/11 (diari del VPS visti in foto)
Il diario del VPS segna l'ora di Vienna, non del server.
- 23/11 22:47:36: il VPS MetaQuotes si e' RIAVVIATO DA SOLO (il PC di Edu era spento). Login riuscito, "1 chart, 1 EA".
- Dopo quel riavvio mancano le righe "History: first bar EURUSD,M30 ..." e "EURUSD,M30: N bars from ...": il grafico non ha
  ricevuto le barre. Diario Consiglieri: "Expert LioEA loaded successfully" ma nessun "LioEA avviato" ne' "initialized":
  OnInit mai partito, EA fermo tutta la notte, nessuna entrata all'01:00 GMT del 24/11.
- 24/11 16:46: Edu ha acceso AutoTrading sul PC e rifatto la sincronizzazione (tasto destro sul VPS > Esperti, Indicatori).
  "EURUSD,M30: 4180 bars" alle 16:46:46.969 e "LioEA avviato..." + "initialized" alle 16:46:46.971. L'EA sul VPS e' ripartito.
Lettura di Claude: l'EA parte solo quando il grafico riceve le barre; perche' la notte non siano arrivate non si sa.
La prima ipotesi di Claude (copia fatta con AutoTrading spento) era SBAGLIATA.
DA CONFERMARE CON EDU: dopo la sincronizzazione ha rispento AutoTrading sul PC? (deve restare spento: un solo EA sul conto).
Come si guarda: Navigatore > tasto destro su "VPS London LD6" > Diario; tendina Terminale / Consiglieri; date; "Richiesta".

## IL CONTROLLO (segno di vita) — A META'
Scritto e caricato in storico-trading (commit a335034 e 9ff0681):
- ea/LioEA.mq4 versione 1.10: input MinutiSegnoDiVita (30); ogni 30 minuti, anche sabato e domenica, GET Worker /vivo?k=CHIAVE&aperti=N.
  NON ANCORA COMPILATO da Edu, NON ancora sul VPS (li' gira ancora la 1.00, che non manda il segno di vita).
- worker_index.js: /vivo (scrive ea_vivo nel KV SEEDS), /stato-ea (pubblico), /prova-avviso?k=, /telegram-collega?k=,
  controlloEA() a ogni scatto del cron (oltre 75 minuti di silenzio = fermo; avviso, ripetuto ogni 6 ore; avviso "ripartito");
  il feed gira solo allo scatto delle 00:10 GMT. Avvisi su Telegram (secret TG_TOKEN; la chat si registra con /telegram-collega
  e resta nel KV come tg_chat). Logica provata solo in simulazione.
Stato su Cloudflare al 24/11 17:20:
- FATTO: incollata la PRIMA versione del Worker (con ntfy); /stato-ea risponde {"visto":false,"fermo":false}; secret NTFY_TOPIC messo.
- ntfy NON funziona dal Worker: /prova-avviso ha risposto 429 (indirizzi di Cloudflare condivisi). Per questo si passa a Telegram.
  L'app ntfy sul telefono di Edu e il secret NTFY_TOPIC non servono piu' (si possono togliere).
- FATTO da Edu: bot Telegram creato con BotFather e scritto "ciao" al bot. Il token ce l'ha lui (non va scritto in chat ne' nei repo).
RESTA DA FARE (un passo per messaggio: Edu il 24/11 si e' stancato dei passi multipli, "oggi mi stai facendo impazzire"):
1. Cloudflare > trading-forex-seed > Settings > Variables and Secrets > Add: TG_TOKEN = token del bot, Segreto.
2. Cloudflare > Edit code: incollare il worker_index.js nuovo (raw.githubusercontent.com/edufengshui/storico-trading/main/worker_index.js), Deploy.
3. Aprire https://trading-forex-seed.decumano16.workers.dev/telegram-collega?k=CHIAVE : deve dire "OK collegato a ..." e il bot
   scrive su Telegram. (Se dice "nessun messaggio trovato": riscrivere "ciao" al bot e riaprire.)
4. Cloudflare > Settings > Triggers > Cron: AGGIUNGERE un secondo cron "*/30 * * * *" (lasciare quello delle 00:10).
5. MetaEditor sul PC: sostituire LioEA.mq4 con la 1.10, compilare (0 errori), rimetterlo sul grafico EURUSD,M30 con la Chiave,
   AutoTrading acceso, sincronizzare col VPS, controllare "LioEA avviato" nel diario Consiglieri, rispegnere AutoTrading sul PC.
6. Prova: /stato-ea deve dire "visto":true entro un minuto dalla partenza dell'EA sul VPS.
Finche' i passi 1-6 non sono fatti NON c'e' nessun allarme: se il VPS si riavvia di nuovo, l'EA puo' restare fermo in silenzio.

## DA CONTROLLARE
- Mattina del 25/11: l'EA e' entrato all'01:00 GMT? (diario Consiglieri del VPS, righe "LioEA: aperto ...", oppure app MT4).
- Mattina del 25/11: la raccolta notturna ha scritto segnali.json (forza, forza_lio, qmdj) e qmdj_live.json? (vedi S76)
- QMDJ: conferma del BILANCIO; carta 10 (USDCHF 23/11) e controllo del patto; decisioni aperte di S76.
