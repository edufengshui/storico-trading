const s=require('fs').readFileSync('wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
function sis(label,sy){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0}));
  for(const r of rows.concat(live)){const z=Q.lettura(r.ch,r.trend,sy);if(!z||!z.dir)continue;const g=t[r.live?2:per(r)];g.n++;const w=(z.dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(22),t.map(g=>g.n+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | '));}
function grp(label,f,up){const t=[0,1,2].map(()=>[0,0,new Set()]);for(const r of rows.concat(live)){if(!f(r))continue;const g=t[r.live?2:per(r)];g[0]++;g[2].add(r.d);if(up?r.mv>0:(r.trend==='LONG')===(r.mv>0))g[1]++;}
  console.log(label.padEnd(40),t.map(g=>pct(g[1],g[0])+' ('+g[0]+' carte, '+g[2].size+' gg)').join(' | '));}
for(const m of ['ramo','stelo']){global.QMDJ_TAISUI_DOVE=m;console.log('--',m);sis('DsHs','dshs');sis('ZFTY','zfty');
  grp('View nel palazzo del Tai Sui: SALE',r=>Q.viewSu(r.ch)==='View nel palazzo del Tai Sui',true);
  grp('ZF aiuti scatta: SEGUE',r=>/ZF generato dal Tai Sui/.test(Q.lettura(r.ch,r.trend,'zfty').motivo||''));}
global.QMDJ_VIEW_SU='off';global.QMDJ_ZF_AIUTI='off';console.log('-- senza le due regole');sis('DsHs','dshs');sis('ZFTY','zfty');
delete global.QMDJ_VIEW_SU;delete global.QMDJ_ZF_AIUTI;
// attore Tai Sui (stelo) interno/esterno -> sale
const INT2=c=>c.dun==='yang'?[1,8,3,4]:[9,2,7,6];global.QMDJ_TAISUI_DOVE='stelo';
const tsp=c=>{const y=c.anno[0];for(let p=1;p<=9;p++)if(p!==5&&(c.palaces[p].tiH===y||c.palaces[p].ti2H===y))return p;return null;};
grp('Tai Sui (stelo) interno: SALE',r=>{const p=tsp(r.ch);return p&&INT2(r.ch).includes(p);},true);
grp('Tai Sui (stelo) esterno: SALE',r=>{const p=tsp(r.ch);return p&&!INT2(r.ch).includes(p);},true);
grp('Tai Sui (stelo) interno: SEGUE',r=>{const p=tsp(r.ch);return p&&INT2(r.ch).includes(p);});
grp('Tai Sui (stelo) esterno: SEGUE',r=>{const p=tsp(r.ch);return p&&!INT2(r.ch).includes(p);});
`);
