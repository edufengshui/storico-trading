// Edu 24/11/2026: prossimo Commander nella somma del TY e View clashata che non agisce. Prima/dopo.
const s=require('fs').readFileSync(__dirname+'/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const all=rows.concat(live);
const U=r=>{const z=Q.lettura(r.ch,r.trend,'zfty');if(z&&z.dir)return z.dir;const d=Q.lettura(r.ch,r.trend,'dshs');return d&&d.dir;};
function mis(label,f){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0}));
  for(const r of all){const g=t[r.live?2:per(r)];const dir=f(r);if(!dir)continue;g.n++;const w=(dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(30)+' '+t.map(g=>g.n+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | '));}
const cfg=[['prima (24/11 mattina)',{QMDJ_TY_SOMMA_PROSSIMO:false,QMDJ_VIEW_SU_CLASH:false}],['solo prossimo Commander',{QMDJ_VIEW_SU_CLASH:false}],['solo View clashata',{QMDJ_TY_SOMMA_PROSSIMO:false}],['tutte e due',{}],['View spenta',{QMDJ_VIEW_SU:'off'}]];
for(const [lab,o] of cfg){for(const k of ['QMDJ_TY_SOMMA_PROSSIMO','QMDJ_VIEW_SU_CLASH','QMDJ_VIEW_SU'])delete global[k];Object.assign(global,o);
  console.log('== '+lab);mis('  ZFTY',r=>Q.lettura(r.ch,r.trend,'zfty').dir);mis('  DsHs',r=>Q.lettura(r.ch,r.trend,'dshs').dir);mis('  unito',U);}
for(const k of ['QMDJ_TY_SOMMA_PROSSIMO','QMDJ_VIEW_SU_CLASH','QMDJ_VIEW_SU'])delete global[k];
// dove View clashata scatta: il mercato sale?
const G=[[0,0],[0,0],[0,0]],S=[[0,0],[0,0],[0,0]];for(const r of all){const v=Q.viewSu(r.ch);if(!v)continue;const z=Q.lettura(r.ch,r.trend,'zfty');const cl=/clashata/.test(z.viewSu||'');const g=(cl?G:S)[r.live?2:per(r)];g[0]++;if(r.mv>0)g[1]++;}
console.log('View che spinge in su, il cross sale: clashata',G.map(g=>pct(g[1],g[0])+' ('+g[0]+')').join(' · '),'| non clashata',S.map(g=>pct(g[1],g[0])+' ('+g[0]+')').join(' · '));
let n=[0,0,0];for(const r of all){const z=Q.lettura(r.ch,r.trend,'zfty');if(/indebolito/.test(z.motivo||''))n[r.live?2:per(r)]++;}console.log('somma del TY scatta:',n.join(' · '));
`);
