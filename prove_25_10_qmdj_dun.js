const {execFileSync}=require('child_process');
const V=[['attuale',''],['Dun','global.QMDJ_DUN=true;'],['Dun + Commander spostato (癸)','global.QMDJ_DUN=true;global.QMDJ_CMD_SPOSTA=true;'],
 ['Dun + spostato + forza +8 (癸)','global.QMDJ_DUN=true;global.QMDJ_CMD_SPOSTA=true;global.QMDJ_CMD_FORZA=8;'],['spostato + forza +8 (癸)','global.QMDJ_CMD_SPOSTA=true;global.QMDJ_CMD_FORZA=8;']];
for(const [n,pre] of V){
  const o=execFileSync('node',['-e',pre+"require('/home/claude/qm/conferma.js')"],{env:process.env}).toString().split('\n')[0];
  const card=execFileSync('node',['-e',pre+`global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'); const c=Q.oraria(Date.UTC(2026,9,5),'卯'); process.stdout.write(Q.giornoOra(c).segue?'segue':'non segue');`],{env:process.env}).toString();
  console.log(n.padEnd(32),o.replace('tutte','').trim(),'| EURUSD 05/10:',card); }
