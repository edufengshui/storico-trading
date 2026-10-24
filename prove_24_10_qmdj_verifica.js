global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const rows=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')));
const out=rows.map(r=>{const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);const v=Q.giornoOra(c);return [r.cross,r.date,v.segue];});
fs.writeFileSync('/home/claude/qm/js_verdetti.json',JSON.stringify(out));
