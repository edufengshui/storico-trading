global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const ORIG={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'};
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'})).concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={};const add=(k,p,r)=>{((G[k]=G[k]||{})[p]=G[k][p]||{n:0,ns:0,pnl:0}); const g=G[k][p]; g.n++; const seg=Math.sign(r.move)===(r.trend==='LONG'?1:-1); if(!seg) g.ns++; g.pnl+=(seg?-1:1)*Math.abs(r.move)-1.5;};
for(const r of all){ const p=r.date.split('-').map(Number); const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]); const P=c.palaces;
 let zf=null; for(const i in P) if(P[i].zhiFu) zf=+i; if(!zf||zf===5) continue;
 const tyStar=ORIG[zf]; let ty=null; for(const i in P) if(+i!==5&&(P[i].star===tyStar||P[i].star2===tyStar)) ty=+i;
 add('tutte',r.per,r);
 if(ty&&ty!==zf&&[P[ty].tiH,P[ty].ti2H].filter(Boolean).some(s=>s===P[zf].diH||s===P[zf].di2H)) add('stelo del TY sotto lo ZF',r.per,r);
 let ds=null,hs=null; for(const i in P){ if(+i===5) continue; if([P[i].tiH,P[i].ti2H].includes(c.giorno[0])) ds=ds||+i; if([P[i].tiH,P[i].ti2H].includes(c.pilastro[0])) hs=hs||+i; }
 if(ds&&hs&&ds!==hs&&[P[ds].diH,P[ds].di2H].includes(c.pilastro[0])) add('HS sotto il DS',r.per,r);
 const sottoZF=[P[zf].diH,P[zf].di2H].includes(c.pilastro[0]);
 if(sottoZF) add('HS sotto lo ZF',r.per,r);
 if(sottoZF&&ds===zf) add('HS sotto lo ZF col DS',r.per,r);
 const EL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'}, SE={'甲':'L','乙':'L','丙':'F','丁':'F','戊':'E','己':'E','庚':'M','辛':'M','壬':'W','癸':'W'}, KO={L:'E',E:'W',W:'F',F:'M',M:'L'};
 if(sottoZF&&ds===zf&&hs&&EL[ds]===EL[hs]) add('  ...palazzi stesso elemento',r.per,r);
 if(sottoZF&&ds===zf&&KO[SE[c.pilastro[0]]]===SE[c.giorno[0]]) add('  ...HS che controlla il DS',r.per,r);
 if(sottoZF&&ds===zf&&hs&&EL[ds]===EL[hs]&&KO[SE[c.pilastro[0]]]===SE[c.giorno[0]]) add('  ...entrambe',r.per,r);
}
for(const k in G) console.log(k.padEnd(26),['2020-23','2024-26','vivo'].map(p=>{const g=G[k][p];return p+': '+(g?g.n+' · non segue '+(100*g.ns/g.n).toFixed(1)+'% · contro trend '+(g.pnl>=0?'+':'')+g.pnl.toFixed(0):'-');}).join('   '));
