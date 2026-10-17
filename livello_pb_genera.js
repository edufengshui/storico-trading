// Riscrive la riga CAT di livello_pb.js (qui e in ../trading) col catalogo di livello_pb.json (S58, 17/10/2026).
const fs = require('fs'), path = require('path');
const L = require('./livello_pb.json'); const cat = {}; L.forEach(x => { if (x.chiave) cat[x.forma] = [x.chiave, x.se, x.ok, x.regola]; });
let src = fs.readFileSync(path.join(__dirname, 'livello_pb.js'), 'utf8').replace(/  var CAT = .*; \/\/ CATALOGO\n/, '  var CAT = ' + JSON.stringify(cat) + '; // CATALOGO\n');
fs.writeFileSync(path.join(__dirname, 'livello_pb.js'), src);
if (fs.existsSync(path.join(__dirname, '../trading'))) fs.writeFileSync(path.join(__dirname, '../trading/livello_pb.js'), src);
console.log('livello_pb.js: ' + Object.keys(cat).length + ' forme con regola');
