'use strict';
// AGGIORNAMENTO DELLO STORICO DEI PREZZI (S54, 09/10/2026, Edu: "Ok fai il test").
// Gira su GitHub (workflow aggiorna_storico.yml), dove il Worker e' raggiungibile: apre history_full_1h_f.zip,
// per ogni cross chiede al Worker (/page) le barre orarie dall'ultima presente fino a oggi, le accoda e
// riscrive lo zip. Cosi' il backtest copre anche i mesi dal vivo (agosto-ottobre 2026 e oltre).
// Prova in locale: node aggiorna_storico.js (serve la rete verso il Worker).
const fs = require('fs'), path = require('path'), { execSync } = require('child_process');
const DIR = __dirname, WORKER = 'https://trading-forex-seed.decumano16.workers.dev/';
const ZIP = path.join(DIR, 'history_full_1h_f.zip'), JSONF = path.join(DIR, 'history_full_1h_from20200129.json');
const sleep = ms => new Promise(r => setTimeout(r, ms));
async function main() {
  execSync('unzip -o -q ' + JSON.stringify(ZIP) + ' -d ' + JSON.stringify(DIR));
  const H = JSON.parse(fs.readFileSync(JSONF, 'utf8'));
  let aggiunte = 0;
  for (const cross of Object.keys(H.crosses)) {
    const bars = H.crosses[cross];
    if (!Array.isArray(bars) || !bars.length) continue;
    let last = bars[bars.length - 1].t, tot = 0;
    for (let giro = 0; giro < 6; giro++) {              // a pagine di 5000 barre finche' ce ne sono di nuove
      const url = WORKER + 'page?symbol=' + cross + '&interval=1h&size=5000&start=' + encodeURIComponent(last);
      let pg;
      try { pg = await (await fetch(url)).json(); } catch (e) { console.log(cross + ': ' + e.message); break; }
      if (pg.error) { console.log(cross + ': ' + pg.error); if (pg.code === 429) await sleep(65000); else break; continue; }
      const nuove = (pg.bars || []).filter(b => b.t > last && Number.isFinite(b.o) && Number.isFinite(b.c))
                                   .map(b => ({ t: b.t, o: b.o, c: b.c }));
      if (!nuove.length) break;
      bars.push(...nuove); tot += nuove.length; last = nuove[nuove.length - 1].t;
      if (nuove.length < 4000) break;
      await sleep(9000);
    }
    console.log(cross + ': +' + tot + ' barre, ultima ' + last);
    aggiunte += tot;
    await sleep(9000);                                   // il Worker/Twelve Data vuole respiro fra le chiamate
  }
  if (!aggiunte) { console.log('niente di nuovo'); return; }
  H.generatedAt = new Date().toISOString();
  H.source = (H.source || '') + ' + aggiornamenti via Worker /page (aggiorna_storico.js)';
  fs.writeFileSync(JSONF, JSON.stringify(H));
  fs.unlinkSync(ZIP);
  execSync('cd ' + JSON.stringify(DIR) + ' && zip -q -9 history_full_1h_f.zip history_full_1h_from20200129.json');
  fs.unlinkSync(JSONF);
  console.log('zip riscritto, +' + aggiunte + ' barre in tutto');
}
main().catch(e => { console.error(e); process.exit(1); });
