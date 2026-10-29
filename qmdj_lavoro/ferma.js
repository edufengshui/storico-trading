global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs');
const [cr,d,ramo]=process.argv.slice(2); const BR='子丑寅卯辰巳午未申酉戌亥';
const p=d.split('-').map(Number); const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),ramo);
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses[cr].filter(b=>b.t.startsWith(d));
const D=JSON.parse(fs.readFileSync('/home/claude/qm/dump_2020_26.json')).find(c=>c.cross===cr&&c.date===d);
console.log('real',D.real,'trend',D.trend,'move',D.move,'Lio',D.liDir,D.liForza);
const pip=cr.includes('JPY')?0.01:0.0001, sg=D.trend==='LONG'?1:-1;
for(const x of QO.ore(ch)){ const hs=QO.oreGMT(x.ramo); console.log(JSON.stringify(x), 'GMT',hs.join(','));}
const o0=H[0].o; for(const b of H){ console.log(b.t.slice(11,13), ((b.c-o0)/pip*sg).toFixed(0), 'barra',((b.c-b.o)/pip*sg).toFixed(0), 'amp',((b.h-b.l)/pip).toFixed(0)); }
