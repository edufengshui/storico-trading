// Riscrive la riga CAT di livello_dlr.js (qui e in ../trading) col catalogo di livello_dlr.json (S58, 17/10/2026, DLR).
const fs = require('fs'), path = require('path');
const L = require('./livello_dlr.json'); const cat = {}; L.forEach(x => { if (x.chiave) cat[x.forma] = [x.chiave, x.se, x.ok, x.regola]; });
let src = fs.readFileSync(path.join(__dirname, 'livello_dlr.js'), 'utf8').replace(/  var CAT = .*; \/\/ CATALOGO\n/, '  var CAT = ' + JSON.stringify(cat) + '; // CATALOGO\n');
fs.writeFileSync(path.join(__dirname, 'livello_dlr.js'), src);
if (fs.existsSync(path.join(__dirname, '../trading'))) fs.writeFileSync(path.join(__dirname, '../trading/livello_dlr.js'), src);
console.log('livello_dlr.js: ' + Object.keys(cat).length + ' forme con regola');
