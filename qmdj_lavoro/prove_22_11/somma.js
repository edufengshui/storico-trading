// Edu 24/11/2026 (AUDUSD 23/11): somma dei fattori che indeboliscono il TY. Misura: QMDJ_TY_SOMMA_MIN 3, 2, 1 e ponte view/tutti.
const s=require('fs').readFileSync(__dirname+'/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const all=rows.concat(live);
const U=r=>{const z=Q.lettura(r.ch,r.trend,'zfty');if(z&&z.dir)return z.dir;const d=Q.lettura(r.ch,r.trend,'dshs');return d&&d.dir;};
function mis(label,f){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0}));
  for(const r of all){const g=t[r.live?2:per(r)];const dir=f(r);if(!dir)continue;g.n++;const w=(dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  return label.padEnd(30)+' '+t.map(g=>g.n+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | ');}
function scatta(label){const t=[0,1,2].map(()=>({n:0,seg:0,ch:0,chok:0}));
  for(const r of all){const z=Q.lettura(r.ch,r.trend,'zfty');if(!/il TY e' indebolito/.test(z.motivo||''))continue;const g=t[r.live?2:per(r)];g.n++;if((r.trend==='LONG')===(r.mv>0))g.seg++;if(z.dir&&((z.dir==='LONG')===(r.mv>0)))g.ok=(g.ok||0)+1;if(z.dir)g.d=(g.d||0)+1;}
  return '  scatta: '+t.map((g,i)=>['2020-23','2024-26','vivo'][i]+' '+g.n+' carte, il mercato segue '+pct(g.seg,g.n)+', verdetto finale giusto '+pct(g.ok||0,g.d||0)).join(' · ');}
global.QMDJ_TY_SOMMA='off';console.log(mis('ZFTY prima',r=>Q.lettura(r.ch,r.trend,'zfty').dir));console.log(mis('unito prima',U));delete global.QMDJ_TY_SOMMA;
for(const pt of ['view','tutti'])for(const m of [3,2,1]){global.QMDJ_TY_SOMMA_PONTE=pt;global.QMDJ_TY_SOMMA_MIN=m;
  console.log('\\n== ponte '+pt+', almeno '+m+' fattori');console.log(mis('ZFTY',r=>Q.lettura(r.ch,r.trend,'zfty').dir));console.log(mis('unito',U));console.log(scatta());}
// i singoli fattori, dove l'Output non e' timely (fermo)
delete global.QMDJ_TY_SOMMA_MIN;global.QMDJ_TY_SOMMA_PONTE='view';global.QMDJ_TY_SOMMA='off';
const G={};for(const r of rows){const z=Q.lettura(r.ch,r.trend,'zfty');if(!/Output del controllato non e' timely: il controllo non si chiude/.test(z.motivo||''))continue;
  global.QMDJ_TY_SOMMA_MIN=1;delete global.QMDJ_TY_SOMMA;const z2=Q.lettura(r.ch,r.trend,'zfty');global.QMDJ_TY_SOMMA='off';
  const m=/il TY e' indebolito \\(([^)]*)\\)/.exec(z2.motivo||'');const f=m?m[1].split(' + '):[];const ks=['tutti i fermi',...f.map(x=>'  '+x),'  n. fattori '+f.length];
  for(const k of ks){const g=(G[k]=G[k]||[[0,0],[0,0]])[per(r)];g[0]++;if((r.trend==='LONG')===(r.mv>0))g[1]++;}}
console.log('\\n== nei fermi per Output non timely: il mercato segue');for(const k of Object.keys(G).sort())console.log(k.padEnd(40),pct(G[k][0][1],G[k][0][0]),'('+G[k][0][0]+')',pct(G[k][1][1],G[k][1][0]),'('+G[k][1][0]+')');
delete global.QMDJ_TY_SOMMA;delete global.QMDJ_TY_SOMMA_MIN;delete global.QMDJ_TY_SOMMA_PONTE;
const a=live.filter(r=>r.cross==='AUDUSD'&&r.d==='2026-11-23')[0];if(a){const z=Q.lettura(a.ch,a.trend,'zfty');console.log('\\nAUDUSD 23/11:',z.dir,z.segue,z.motivo);}
`);
