const s=require('fs').readFileSync('/home/claude/storico-trading/qmdj_lavoro/prove_22_11/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const all=rows.concat(live);
function mis(label,f){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0,tot:0}));
  for(const r of all){const g=t[r.live?2:per(r)];g.tot++;const dir=f(r);if(!dir)continue;g.n++;const w=(dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(34),t.map(g=>g.n+'/'+g.tot+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | '));}
for(const on of [false,true]){global.QMDJ_VIEW_SU_CLASH_INT=on;mis('unito, clash interno '+on,r=>Q.unito(r.ch,r.trend).dir);}
// le carte che cambiano: il cross sale?
const t=[0,1,2].map(()=>[0,0]);
for(const r of all){global.QMDJ_VIEW_SU_CLASH_INT=false;const a=Q.unito(r.ch,r.trend).dir;global.QMDJ_VIEW_SU_CLASH_INT=true;const b=Q.unito(r.ch,r.trend).dir;if(a!==b){const g=t[r.live?2:per(r)];g[0]++;if(r.mv>0)g[1]++;}}
console.log('carte cambiate / il cross e salito',JSON.stringify(t));
`);
