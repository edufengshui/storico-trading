const s=require('fs').readFileSync(__dirname+'/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const all=rows.concat(live);
function sis(label,sy){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0}));
  for(const r of all){const z=Q.lettura(r.ch,r.trend,sy);if(!z||!z.dir)continue;const g=t[r.live?2:per(r)];g.n++;const w=(z.dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(26),t.map(g=>g.n+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | '));}
global.QMDJ_PAR_TIMELY='off';sis('ZFTY prima','zfty');
// sulle carte dove la regola scatta: prima e dopo
const prima=new Map();for(const r of all){prima.set(r,Q.lettura(r.ch,r.trend,'zfty'));}
delete global.QMDJ_PAR_TIMELY;sis('ZFTY con paralleli timely','zfty');
const t=[0,1,2].map(()=>({n:0,seg:0,ok:0,pok:0,pn:0,zf:[0,0],ty:[0,0],ch:0,chok:0}));
for(const r of all){const z=Q.lettura(r.ch,r.trend,'zfty');if(!/paralleli in Gen e Kun/.test(z.motivo||''))continue;const g=t[r.live?2:per(r)];const sg=(r.trend==='LONG')===(r.mv>0);
  g.n++;if(sg)g.seg++;if((z.dir==='LONG')===(r.mv>0))g.ok++;const p=prima.get(r);if(p.dir){g.pn++;if((p.dir==='LONG')===(r.mv>0))g.pok++;}
  if(p.dir!==z.dir){g.ch++;if((z.dir==='LONG')===(r.mv>0))g.chok++;}
  const k=/ZF: segue/.test(z.motivo)?'zf':'ty';g[k][0]++;if(sg)g[k][1]++;}
t.forEach((g,i)=>console.log(['2020-23','2024-26','vivo'][i],'carte',g.n,'| regola nuova giusta',pct(g.ok,g.n),'| prima (DsHs) giusta',pct(g.pok,g.pn),'su',g.pn,'| cambiate',g.ch,'giuste',g.chok,'| vince ZF: segue',pct(g.zf[1],g.zf[0]),'('+g.zf[0]+') | vince TY: segue',pct(g.ty[1],g.ty[0]),'('+g.ty[0]+')'));
// per coppia
const NOME={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li'};const G={};
for(const r of all){if(r.live)continue;const z=Q.lettura(r.ch,r.trend,'zfty');if(!z.parTimely)continue;const k=[NOME[z.giornoOra.palGiorno],NOME[z.giornoOra.palOra]].sort().join('/');const g=(G[k]=G[k]||[[0,0],[0,0]])[per(r)];g[0]++;if((z.dir==='LONG')===(r.mv>0))g[1]++;}
for(const k in G)console.log(k,pct(G[k][0][1],G[k][0][0]),pct(G[k][1][1],G[k][1][0]),'('+G[k][0][0]+','+G[k][1][0]+')');
const u=live.filter(r=>r.cross==='USDCAD'&&r.d==='2026-11-23')[0];if(u){const z=Q.lettura(u.ch,u.trend,'zfty');console.log('USDCAD 23/11:',z.dir,z.segue,z.motivo);}
`);
{const s2=require('fs').readFileSync(__dirname+'/wu_zfty.js','utf8');const i2=s2.indexOf("run('ZFTY oggi'");eval(s2.slice(0,i2).replace("console.log('carte'","void('carte'")+`
const NOME={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li'};
for(const r of live){const z=Q.lettura(r.ch,r.trend,'zfty');if(!z.parTimely)continue;global.QMDJ_PAR_TIMELY='off';const p=Q.lettura(r.ch,r.trend,'zfty');delete global.QMDJ_PAR_TIMELY;
 console.log(r.d,r.cross,'trend',r.trend,'mosso',r.mv,'| mese',r.ch.mese,'| ZF',NOME[z.giornoOra.palGiorno],'TY',NOME[z.giornoOra.palOra],'| nuova:',z.segue?'segue':'non segue',((z.dir==='LONG')===(r.mv>0))?'GIUSTO':'sbagliato','| prima:',p.dir?(p.segue?'segue':'non segue'):'muto');}
`);}
