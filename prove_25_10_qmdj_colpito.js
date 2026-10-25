const {execFileSync}=require('child_process');
const V=[['nessuno',"global.QMDJ_COLPITO='off';"],['clash + ZS opposto',''],['clash + ZS o Commander opposto',"global.QMDJ_COLPITO='zscmd';"],['solo ZS opposto',"global.QMDJ_COLPITO='solozs';"],['solo clash interno',"global.QMDJ_COLPITO='soloclash';"]];
const card=(pre,d,b)=>execFileSync('node',['-e',pre+`global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'); const p='${d}'.split('-').map(Number); const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),'${b}'); process.stdout.write(Q.giornoOra(c).segue?'segue':'non segue');`],{env:process.env}).toString();
for(const [n,pre] of V){ const o=execFileSync('node',['-e',pre+"require('/home/claude/qm/conferma.js')"],{env:process.env}).toString().split('\n').slice(0,2).map(x=>x.replace(/^\S+\s+/,'')).join('\n'+' '.repeat(34)+'conf: ');
  console.log(n.padEnd(34),o,'| EURGBP 20/10:',card(pre,'2026-10-20','亥')); }
