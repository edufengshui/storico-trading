const opts=[['nessuna',{QMDJ_CMD_SPOSTA:false}],['Commander spostato (ore 癸)',{}],['spostato + Commander aiuta',{QMDJ_CMD_AIUTO:true}],['solo Commander aiuta',{QMDJ_CMD_SPOSTA:false,QMDJ_CMD_AIUTO:true}]];
const {execFileSync}=require('child_process');
for(const [n,o] of opts){ const pre=Object.entries(o).map(([k,v])=>`global.${k}=${v};`).join('');
  const out=execFileSync('node',['-e',pre+"require('/home/claude/qm/conferma.js')"],{env:process.env}).toString().split('\n')[0];
  console.log(n.padEnd(30),out.replace('tutte','').trim()); }
