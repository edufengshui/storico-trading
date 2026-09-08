#!/usr/bin/env node
// cerca.js — S41, 07/09/2026.
// Nato dopo una sessione in cui il modello a 12 stadi e' stato ricostruito da zero benche'
// fosse gia' a registro dal 25/08/2026. Il problema non era cercare: era indovinare la parola.
// Qui la parola la indovina il dizionario dei sinonimi.
//
// Uso:   node cerca.js <termine> [altro termine ...]
//        node cerca.js --sinonimi          elenca le famiglie di parole conosciute
//
// Cerca dentro tutti i .md dell'archivio e stampa, per ogni riscontro, il file, la sezione
// che lo contiene (l'intestazione ## o # piu' vicina sopra) e la riga.

const fs = require('fs');
const path = require('path');

// Famiglie di parole: cercando una qualsiasi voce si cercano tutte le altre della famiglia.
const SINONIMI = [
  ['12 stadi', 'dodici stadi', '十二長生', 'FORZA12', 'stadio', 'stadi', 'timely', 'untimely',
   '長生', '沐浴', '冠帶', '臨官', '帝旺', '衰', '病', '死', '墓', '絕', '胎', '養',
   'nascita', 'bagno', 'vestizione', 'ufficio', 'apice', 'declino', 'malattia', 'morte',
   'tomba', 'recisione', 'embrione', 'nutrimento', 'stagione', 'forzaModello'],
  ['drenaggio', 'DRENA', 'drena', 'drenato', 'svuota', 'DRENASOG', 'scarico'],
  ['rafforzamento', 'RAFFORZA', 'rafforzato', 'Yong rafforzato'],
  ['Hu Gua', 'HUGUA', '互卦', 'nucleare', 'esagramma nucleare', 'concorrente'],
  ['Spirito', 'Spiriti', 'Serpente', '螣蛇', 'Sei Unioni', '六合', 'bestie', 'bestia',
   'Nobile', '貴人', 'Drago Azzurro', '青龍', 'Guerriero Oscuro', '玄武', 'Grande Yin', '太陰'],
  ['scala', 'livello', 'livelli', 'TRESIST', 'tre sistemi', 'A/B/C', 'unanimita', 'voci'],
  ['stelo', 'steli', 'stelo del giorno', 'Bazi', 'pilastri', 'quattro pilastri'],
  ['vuoto', 'vuoti', '旬空', 'vuota', 'VUOTO', 'VUOTOSTAG', '旺不为空'],
  ['trigrammi', 'trigramma', 'FASCICOLO TRIGRAMMI', 'duello dei trigrammi', 'PB modificato'],
  ['messaggi', 'tre messaggi', 'chu', 'zhong', 'mo', 'trasmissione'],
  ['forme escluse', 'fuori selezione', '返吟', '伏吟', '八專', '冬蛇掩目', '虎視轉蓬', 'ronzio'],
  ['parita', 'parita_tre', 'PWA', 'scarto PWA', 'allineamento'],
  ['carte guida', 'carta_check', 'termometro', 'guida', 'CARTEGUIDA'],
  ['gemelle', 'piatto condiviso', 'stesso piatto', 'non-contraddizione'],
  ['sopraffazione', 'SOPRAF', 'sopraffatto'],
  ['riscatto', 'RISCATTO', 'trasformato morto'],
  ['clash', 'SKIPCLASH', '冲', 'combinazione', '六合 data', 'sequestro'],
  ['Tai Sui', '太歲', 'TAISUINB', 'anno'],
  ['motore', 'motore_dlr', 'MOTOREDLR', 'via', 'vie', 'catena'],
];

function famiglia(termine) {
  const t = termine.toLowerCase();
  const out = new Set([termine]);
  for (const fam of SINONIMI) {
    if (fam.some(v => v.toLowerCase() === t || v.toLowerCase().includes(t) || t.includes(v.toLowerCase()))) {
      fam.forEach(v => out.add(v));
    }
  }
  return [...out];
}

function fileMd() {
  return fs.readdirSync(__dirname).filter(f => f.endsWith('.md')).sort();
}

function cerca(termini) {
  const parole = [...new Set(termini.flatMap(famiglia))];
  console.log('cerco: ' + parole.slice(0, 14).join(' · ') + (parole.length > 14 ? ' … (' + parole.length + ' parole)' : ''));
  let totale = 0;
  for (const f of fileMd()) {
    const righe = fs.readFileSync(path.join(__dirname, f), 'utf8').split('\n');
    let sezione = '(inizio del file)';
    const trovate = [];
    righe.forEach((riga, i) => {
      if (/^#{1,3} /.test(riga)) sezione = riga.replace(/^#+ /, '').trim();
      const basso = riga.toLowerCase();
      if (parole.some(p => basso.includes(p.toLowerCase()))) {
        trovate.push({ n: i + 1, sezione, testo: riga.trim() });
      }
    });
    if (!trovate.length) continue;
    console.log('\n===== ' + f + '  (' + trovate.length + ' riscontri) =====');
    let ultima = null;
    for (const t of trovate) {
      if (t.sezione !== ultima) { console.log('  --- ' + t.sezione); ultima = t.sezione; }
      console.log('     riga ' + String(t.n).padStart(5) + '  ' + t.testo.slice(0, 150));
      totale++;
    }
  }
  if (!totale) console.log('\nnessun riscontro. Prova con una parola piu generica, o guarda --sinonimi.');
  else console.log('\ntotale: ' + totale + ' righe in ' + fileMd().length + ' file esaminati.');
}

const argv = process.argv.slice(2);
if (!argv.length) {
  console.log('uso: node cerca.js <termine> [altro termine ...]');
  console.log('     node cerca.js --sinonimi');
  process.exit(0);
}
if (argv[0] === '--sinonimi') {
  console.log('famiglie di parole conosciute:\n');
  SINONIMI.forEach(f => console.log('  ' + f.slice(0, 8).join(' · ') + (f.length > 8 ? ' …' : '')));
  process.exit(0);
}
cerca(argv);
