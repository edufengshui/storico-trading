const {execFileSync}=require('child_process');
const V=[['attuale',''],['Dun + spostato (senza clash)','global.QMDJ_DUN=true;global.QMDJ_CMD_SPOSTA=true;global.QMDJ_CMD_CLASH=false;'],
 ['Dun + spostato + clash limita','global.QMDJ_DUN=true;global.QMDJ_CMD_SPOSTA=true;'],['spostato + clash limita (senza Dun)','global.QMDJ_CMD_SPOSTA=true;'],
 ['Dun + spostato + clash + forza +8','global.QMDJ_DUN=true;global.QMDJ_CMD_SPOSTA=true;global.QMDJ_CMD_FORZA=8;']];
const card=(pre,d,b,t)=>execFileSync('node',['-e',pre+`global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'); const p='${d}'.split('-').map(Number); const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),'${b}'); process.stdout.write(Q.giornoOra(c).segue?'segue':'non segue');`],{env:process.env}).toString();
for(const [n,pre] of V){
  const o=execFileSync('node',['-e',pre+"require('/home/claude/qm/conferma.js')"],{env:process.env}).toString().split('\n')[0];
  console.log(n.padEnd(36),o.replace('tutte','').trim(),'| EURUSD 05/10:',card(pre,'2026-10-05','卯'),'| USDJPY 31/07/24:',card(pre,'2024-07-31','未')); }
