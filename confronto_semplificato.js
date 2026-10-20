// DOVE RIESCE IL METODO SEMPLIFICATO E DOVE NO, IN CONFRONTO CON GLI ALTRI METODI (S58, Edu 20/10/2026: "deve entrare nella
// piramide ma prima dimmi dove riesce e dove no in confronto con gli altri metodi").
// Uso: node confronto_semplificato.js VOCI.json SEMP.json [DAL]
const V = require(process.argv[2]), S = require(process.argv[3]), DAL = process.argv[4] || '0000';
const db = V.filter(x => x.date >= DAL).map(x => { const v = S[x.cross + '|' + x.date]; return Object.assign({}, x, { SEMP: v == null ? null : (v ? x.trend : (x.trend === 'LONG' ? 'SHORT' : 'LONG')) }); });
const st = (l, f) => { let n = 0, w = 0, p = 0; l.forEach(x => { const d = f(x); if (!d) return; n++; const ok = d === x.real; w += ok; p += ok ? Math.abs(x.move) : -Math.abs(x.move); }); return { n, w, p, t: n ? (100 * w / n).toFixed(1) + '% su ' + n + ' (' + (p > 0 ? '+' : '') + p + ')' : '-' }; };
const PIR = [['LYF','PBF','DLRF'],['D','LYF','DLRF'],['D','LYF','PBF'],['D','PBF','DLRF'],['DLR','LYF','DLRF'],['LYF','DLRF'],['DLR','PBF'],['LY','DLRF'],['LETT','MT'],['LY','AT','LETT'],['CM']];
const conc = (x, c) => { const d = x[c[0]]; return d && c.every(k => x[k] === d) ? d : null; };
const pir = x => { const y = Object.assign({}, x, { LY: x.CM || x.LY }); for (let i = 0; i < PIR.length; i++) { const d = conc(y, PIR[i]); if (d) return { g: i + 1, d }; } return null; };
db.forEach(x => { const p = pir(x); x.PIR = p ? p.d : null; x.G = p ? p.g : null; });
console.log('CARTE ' + db.length + (DAL !== '0000' ? ' dal ' + DAL : '') + '\n\n1. OGNI METODO DA SOLO');
for (const k of ['trend', 'PB', 'LY', 'AT', 'DLR', 'LETT', 'MT', 'D', 'LYF', 'PBF', 'DLRF', 'CM', 'PIR', 'SEMP']) console.log('   ' + k.padEnd(6) + st(db, x => x[k]).t);
console.log('\n2. DENTRO LA PIRAMIDE, GRADINO PER GRADINO: piramide · semplificato sulle stesse carte · quando non sono d\'accordo chi ha ragione');
const fasce = [['1', g => g === 1], ['2-4', g => g >= 2 && g <= 4], ['5-7', g => g >= 5 && g <= 7], ['8-11', g => g >= 8]];
for (const [n, f] of fasce) { const l = db.filter(x => x.G && f(x.G)); const dis = l.filter(x => x.SEMP && x.SEMP !== x.PIR);
  console.log('   gradini ' + n.padEnd(5) + ' piramide ' + st(l, x => x.PIR).t.padEnd(26) + ' semplificato ' + st(l, x => x.SEMP).t.padEnd(26) + ' in disaccordo ' + dis.length + ': ha ragione il semplificato ' + (dis.length ? (100 * dis.filter(x => x.SEMP === x.real).length / dis.length).toFixed(0) + '%' : '-')); }
const fermi = db.filter(x => !x.PIR);
console.log('   carte dove la piramide e\' ferma: ' + fermi.length + ' · il semplificato ' + st(fermi, x => x.SEMP).t);
console.log('\n3. QUANDO IL SEMPLIFICATO CONCORDA CON UN ALTRO METODO');
for (const k of ['PB', 'LY', 'AT', 'DLR', 'D', 'LYF', 'PBF', 'DLRF', 'PIR']) console.log('   semplificato = ' + k.padEnd(5) + st(db, x => x.SEMP && x.SEMP === x[k] ? x.SEMP : null).t.padEnd(28) + ' · in disaccordo, ha ragione il semplificato ' + (() => { const l = db.filter(x => x.SEMP && x[k] && x.SEMP !== x[k]); return l.length ? (100 * l.filter(x => x.SEMP === x.real).length / l.length).toFixed(0) + '% su ' + l.length : '-'; })());
console.log('\n4. PER CROSS: piramide · semplificato');
for (const c of [...new Set(db.map(x => x.cross))]) { const l = db.filter(x => x.cross === c); console.log('   ' + c + '  piramide ' + st(l, x => x.PIR).t.padEnd(26) + ' semplificato ' + st(l, x => x.SEMP).t); }
