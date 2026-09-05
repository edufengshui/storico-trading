#!/usr/bin/env node
/* =============================================================================
 * carta_libera.js — FILTRO OBBLIGATORIO PRIMA DI PRESENTARE UNA CARTA A EDU
 * (05/09/2026, dopo l'errore di S38: ripresentata la carta d'origine della via T)
 *
 * Uso:
 *   node carta_libera.js CROSS YYYY-MM-DD
 *   node carta_libera.js --lista file.txt        (righe "CROSS,YYYY-MM-DD[,pip]")
 *   node carta_libera.js --registra CROSS YYYY-MM-DD --sistema DLR --tipo origine \
 *        --nota "..."  [--seme N --pilastro 戊辰 --esito "SHORT -69" --via "..."]
 *
 * Cosa controlla, in ordine (il primo BLOCCO ferma tutto):
 *   1. BLOCCO — la carta è già nel registro Liu Yao (carte_lette.json)
 *   2. BLOCCO — la carta è già nel registro DLR (carte_lette_dlr.json)
 *   3. BLOCCO — è una CARTA D'ORIGINE di una via o di una regola (tipo=origine):
 *               chiedere di rileggerla significa chiedere di rifondare la regola
 *   4. BLOCCO — data non negoziabile: sabato, domenica, 1 gennaio, 24/25/26 e
 *               31 dicembre (mercato chiuso o liquidità finta)
 *   5. AVVISO  — |pip| sotto i 25: carta troppo leggera per farci dottrina
 *
 * Regola d'oro: nessuna carta va presentata a Edu se questo script non dice LIBERA.
 * ========================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const HERE = __dirname;

const LY  = leggi('carte_lette.json');
const DLR = leggi('carte_lette_dlr.json');

function leggi(f) {
  const p = path.join(HERE, f);
  if (!fs.existsSync(p)) return [];
  try { const j = JSON.parse(fs.readFileSync(p, 'utf8')); return Array.isArray(j) ? j : []; }
  catch (e) { console.error('ATTENZIONE: ' + f + ' illeggibile (' + e.message + ')'); return []; }
}

const FESTIVI = ['-01-01', '-12-24', '-12-25', '-12-26', '-12-31'];

function esamina(cross, date, pip) {
  const blocchi = [], avvisi = [];

  const inLY = LY.filter(c => c.cross === cross && c.date === date);
  for (const c of inLY)
    blocchi.push('GIÀ LETTA nel Liu Yao il ' + (c.quando || '?') + ' — seme ' + (c.seme != null ? c.seme : '?') +
                 ' · ' + (c.nota || '').slice(0, 110));

  const inDLR = DLR.filter(c => c.cross === cross && c.date === date);
  for (const c of inDLR) {
    if (c.tipo === 'origine')
      blocchi.push("CARTA D'ORIGINE (" + c.sistema + ') — ' + (c.nota || ''));
    else
      blocchi.push('GIÀ LETTA nel ' + c.sistema + ' [' + (c.tipo || 'lettura') + '] — ' + (c.nota || '').slice(0, 110));
  }

  const g = new Date(date + 'T00:00:00Z').getUTCDay();
  if (g === 0 || g === 6) blocchi.push('DATA NON VALIDA: ' + (g === 6 ? 'sabato' : 'domenica') + ', mercato chiuso');
  if (FESTIVI.some(f => date.endsWith(f))) blocchi.push('DATA NON VALIDA: giorno festivo, liquidità finta');

  if (pip != null && Math.abs(pip) < 25)
    avvisi.push('carta leggera (' + pip + ' pip): sotto i 25 non ci si fa dottrina');

  return { libera: blocchi.length === 0, blocchi, avvisi };
}

function registra(argv) {
  const cross = argv[1], date = argv[2];
  if (!cross || !date) { console.error('Uso: --registra CROSS YYYY-MM-DD --sistema DLR --tipo ... --nota "..."'); process.exit(1); }
  const opt = k => { const i = argv.indexOf('--' + k); return i >= 0 ? argv[i + 1] : undefined; };
  const TIPI = ['origine', 'guida', 'controesempio', 'verifica', 'ipotesi', 'lettura', 'muta'];
  const tipo = opt('tipo') || 'lettura';
  if (!TIPI.includes(tipo)) { console.error('tipo non valido. Ammessi: ' + TIPI.join(', ')); process.exit(1); }
  const sistema = (opt('sistema') || 'DLR').toUpperCase();
  if (sistema !== 'DLR') { console.error('Le letture del Liu Yao vanno in carte_lette.json con carta_check.js --registra'); process.exit(1); }

  const rec = { cross, date, seme: opt('seme') != null ? Number(opt('seme')) : null, sistema, tipo,
    pilastro: opt('pilastro') || null, mese: opt('mese') || null, ora: opt('ora') || null,
    piatto: opt('piatto') || null, vuoti: opt('vuoti') || null, metodo: opt('metodo') || null,
    tre: opt('tre') || null, esito: opt('esito') || null, viaDLR: opt('via') || null,
    quando: new Date().toISOString().slice(0, 10), nota: opt('nota') || '' };

  const dup = DLR.findIndex(c => c.cross === cross && c.date === date);
  if (dup >= 0) { DLR[dup] = Object.assign({}, DLR[dup], rec); console.log('record AGGIORNATO'); }
  else { DLR.push(rec); console.log('record AGGIUNTO'); }
  DLR.sort((a, b) => a.date < b.date ? -1 : 1);
  fs.writeFileSync(path.join(HERE, 'carte_lette_dlr.json'), JSON.stringify(DLR, null, 1));
  console.log('carte_lette_dlr.json ora ha ' + DLR.length + ' record.');
}

// ---------------------------------------------------------------------------
const argv = process.argv.slice(2);
if (argv[0] === '--registra') { registra(argv); process.exit(0); }

let carte = [];
if (argv[0] === '--lista') {
  carte = fs.readFileSync(argv[1], 'utf8').trim().split('\n').filter(Boolean).map(l => {
    const p = l.split(/[,\s]+/); return { cross: p[0], date: p[1], pip: p[2] != null ? Number(p[2]) : null };
  });
} else if (argv[0]) {
  carte = [{ cross: argv[0], date: argv[1], pip: argv[2] != null ? Number(argv[2]) : null }];
} else {
  console.log('Uso: node carta_libera.js CROSS YYYY-MM-DD [pip]   |   --lista file.txt   |   --registra ...');
  process.exit(0);
}

console.log('\nregistri: Liu Yao ' + LY.length + ' record · DLR ' + DLR.length + ' record\n');
let libere = 0;
for (const c of carte) {
  const r = esamina(c.cross, c.date, c.pip);
  const testa = (c.pip != null ? String(c.pip).padStart(6) + '  ' : '') + c.cross + ' ' + c.date;
  if (r.libera && !r.avvisi.length) { console.log('LIBERA    ' + testa); libere++; }
  else if (r.libera) { console.log('LIBERA?   ' + testa); r.avvisi.forEach(a => console.log('            avviso · ' + a)); libere++; }
  else { console.log('BLOCCATA  ' + testa); r.blocchi.forEach(b => console.log('            ' + b)); }
}
console.log('\n' + libere + ' libere su ' + carte.length + '.');
