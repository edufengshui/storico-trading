// Regola di View (misura del 20/11) accesa o spenta, col sistema unito e con la somma del TY (24/11).
const s=require('fs').readFileSync(__dirname+'/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const all=rows.concat(live);
const U=r=>{const z=Q.lettura(r.ch,r.trend,'zfty');if(z&&z.dir)return z.dir;const d=Q.lettura(r.ch,r.trend,'dshs');return d&&d.dir;};
function mis(label,f){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0}));
  for(const r of all){const g=t[r.live?2:per(r)];const dir=f(r);if(!dir)continue;g.n++;const w=(dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(36)+' '+t.map(g=>g.n+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | '));}
for(const [lab,v,ts] of [['View accesa (ramo)','tutti','ramo'],['View accesa (stelo)','tutti','stelo'],['View spenta','off','ramo']]){
  global.QMDJ_VIEW_SU=v;global.QMDJ_TAISUI_DOVE=ts;console.log('== '+lab);
  mis('  ZFTY',r=>Q.lettura(r.ch,r.trend,'zfty').dir);mis('  DsHs',r=>Q.lettura(r.ch,r.trend,'dshs').dir);mis('  unito',U);
  const a=live.filter(r=>r.cross==='AUDUSD'&&r.d==='2026-11-23')[0];console.log('  AUDUSD 23/11 unito:',U(a),'(giusto SHORT)');}
`);
