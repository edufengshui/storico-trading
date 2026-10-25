const {execFileSync}=require('child_process'); const out=[];
for(const sp of [false,true]) for(const fz of [0,2,4,6,8]){
  const pre=`global.QMDJ_CMD_SPOSTA=${sp};global.QMDJ_CMD_FORZA=${fz};`;
  const o=execFileSync('node',['-e',pre+"require('/home/claude/qm/conferma.js')"],{env:process.env}).toString().split('\n')[0];
  const card=execFileSync('node',['-e',pre+`global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'); const c=Q.oraria(Date.UTC(2026,9,5),'卯'); process.stdout.write(Q.giornoOra(c).segue?'segue':'non segue');`],{env:process.env}).toString();
  console.log(((sp?'spostato':'fermo   ')+' · forza +'+fz).padEnd(22),o.replace('tutte','').trim(),'| EURUSD 05/10:',card); }
