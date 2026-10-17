// PIRAMIDE: misura della piramide in uso e costruzione di una piramide nuova (S58, 17/10/2026).
// Edu, 17/10/2026: "metti l'85% in cima alla piramide da usare solo ed esclusivamente su quel numero limitato di carte;
// al secondo livello il sistema che performa meglio per il restante gruppo, e cosi' via".
// Costruzione: fra tutte le combinazioni di 2-3 voci concordi, quella con la % piu' alta sulle carte rimaste (almeno MIN
// carte); si tolgono quelle carte e si ripete. La cantina PB = LY = DLR si toglie dopo il primo gradino (Edu 09/10).
// Uso: node piramide_costruisci.js [voci separate da virgola, default PB,LY,AT,DLR,LETT,MT,D,LYF] [MIN, default 100]
const db = require('/tmp/voci_carte.json');
const VOCI = (process.argv[2] || 'PB,LY,AT,DLR,LETT,MT,D,LYF').split(','), MIN = Number(process.argv[3] || 100);
const conc = (x, c) => { const d = x[c[0]]; return d && c.every(k => x[k] === d) ? d : null; };
const cantina = x => x.LY && x.DLR && x.PB === x.LY && x.LY === x.DLR;
const stat = (l, f) => { let n = 0, w = 0, p = 0; l.forEach(x => { const d = f(x); if (!d) return; n++; const ok = d === x.real; w += ok; p += ok ? Math.abs(x.move) : -Math.abs(x.move); }); return { n, w, p, a: n ? w / n : 0 }; };
const riga = (nome, s) => console.log(nome.padEnd(34) + String(s.n).padStart(5) + ' · ' + (100 * s.a).toFixed(1) + '% · ' + (s.p > 0 ? '+' : '') + s.p + ' pip');
function esegui(PIR, titolo) {
  console.log('\n' + titolo); let resto = db.slice(), T = { n: 0, w: 0, p: 0 }, g = 0;
  for (const c of PIR) {
    if (c === 'cantina') { const k = resto.filter(cantina); riga('  (cantina PB=LY=DLR)', stat(k, x => x.PB)); resto = resto.filter(x => !cantina(x)); continue; }
    g++; const s = stat(resto, x => conc(x, c)); riga('  ' + g + '  ' + c.join(' = '), s); T.n += s.n; T.w += s.w; T.p += s.p; resto = resto.filter(x => !conc(x, c));
  }
  riga('  totale', { n: T.n, a: T.w / T.n, p: T.p }); console.log('  ferme ' + resto.length);
}
esegui([['D', 'DLR', 'MT'], 'cantina', ['AT', 'DLR', 'D'], ['DLR', 'LETT', 'D'], ['PB', 'DLR', 'D'], ['LETT', 'MT', 'D'], ['PB', 'MT', 'D'], ['PB', 'AT', 'D'], ['DLR', 'D'], ['LY', 'LETT', 'D'], ['PB', 'D']],
  'PIRAMIDE IN USO (S57), misurata su questo dump');
// costruzione golosa
const combi = []; for (let i = 0; i < VOCI.length; i++) for (let j = i + 1; j < VOCI.length; j++) { combi.push([VOCI[i], VOCI[j]]); for (let k = j + 1; k < VOCI.length; k++) combi.push([VOCI[i], VOCI[j], VOCI[k]]); }
let resto = db.slice(); const PIR = [];
for (let g = 0; g < 10; g++) {
  let best = null; for (const c of combi) { const s = stat(resto, x => conc(x, c)); if (s.n >= MIN && (!best || s.a > best.s.a)) best = { c, s }; }
  if (!best) break; PIR.push(best.c); resto = resto.filter(x => !conc(x, best.c));
  if (g === 0) { PIR.push('cantina'); resto = resto.filter(x => !cantina(x)); }
}
esegui(PIR, 'PIRAMIDE COSTRUITA con le voci ' + VOCI.join(', ') + ' (almeno ' + MIN + ' carte per gradino)');
console.log('\nPIR = ' + JSON.stringify(PIR));
