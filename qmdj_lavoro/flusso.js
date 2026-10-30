global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'};
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'}, SE={'甲':'L','乙':'L','丙':'F','丁':'F','戊':'E','己':'E','庚':'M','辛':'M','壬':'W','癸':'W'};
const STEL={Grass:'W',Rice:'E',Aggressor:'L',Assistant:'L',Heart:'M',Pillar:'M',Official:'E',Hero:'F',Fowl:'E'};
const DEL={Rest:'W',Death:'E',Injury:'L',Delusion:'L',Open:'M',Shocking:'M',Birth:'E',View:'F'};
const GEN={L:'F',F:'E',E:'M',M:'W',W:'L'};
function fine(P,i){ const d=P[i]; const it=[SE[d.diH],DEL[d.doorName],SE[d.tiH],STEL[d.star]].filter(Boolean);
  let best=[]; const go=(path,used)=>{ if(path.length>best.length) best=path.slice(); const last=it[path[path.length-1]]; it.forEach((e,j)=>{ if(!used.has(j)&&GEN[last]===e){used.add(j);path.push(j);go(path,used);path.pop();used.delete(j);} }); };
  it.forEach((e,j)=>go([j],new Set([j])));
  if(best.length<3) return null; const sink=it[best[best.length-1]], pe=PEL[i];
  return GEN[pe]===sink?'drena':GEN[sink]===pe?'nutre':sink===pe?'stesso':GEN[GEN[sink]]===pe?'controllato':'controlla'; }
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'})).concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={}; const add=(k,r,dir)=>{const g=((G[k]=G[k]||{})[r.per]=G[k][r.per]||{n:0,w:0,pnl:0}); const seg=Math.sign(r.move)===(r.trend==='LONG'?1:-1); g.n++; const win=dir==='segue'?seg:!seg; if(win) g.w++; g.pnl+=(win?1:-1)*Math.abs(r.move)-1.5;};
for(const r of all){ const p=r.date.split('-').map(Number); const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]); const P=c.palaces;
 let zf=null; for(const i in P) if(P[i].zhiFu) zf=+i; if(!zf||zf===5) continue; let ty=null; for(const i in P) if(+i!==5&&P[i].star===HOME[zf]) ty=+i; if(!ty||ty===zf) continue;
 const fz=fine(P,zf), ft=fine(P,ty);
 const BE={子:'W',丑:'E',寅:'L',卯:'L',辰:'E',巳:'F',午:'F',未:'E',申:'M',酉:'M',戌:'E',亥:'W'}, me=BE[c.mese[1]];
 const tm=pe=>pe===me?4:GEN[me]===pe?3:GEN[pe]===me?2:GEN[GEN[pe]]===me?1:0; const unt=i=>tm(PEL[i])<=1, tim=i=>tm(PEL[i])>=3;
 const zd=fz==='drena'||fz==='controllato', td=ft==='drena'||ft==='controllato';
 if(fz==='drena'&&unt(zf)) add('M ZF drenato + untimely (non segue)',r,'contro');
 if(fz==='drena'&&unt(zf)&&!unt(ty)) add('M ZF drenato + untimely, TY non untimely',r,'contro');
 if(fz==='drena'&&unt(zf)&&tim(ty)) add('M ZF drenato + untimely, TY timely',r,'contro');
 if(zd&&unt(zf)) add('M ZF drenato/controllato + untimely',r,'contro');
 if(zd&&unt(zf)&&tim(ty)) add('M ZF drenato/controllato + untimely, TY timely',r,'contro');
 if(ft==='drena'&&unt(ty)) add('N TY drenato + untimely (segue)',r,'segue');
 if(td&&unt(ty)&&tim(zf)) add('N TY drenato/controllato + untimely, ZF timely',r,'segue');
 if(fz) add('ZF: flusso '+fz+' (non segue)',r,'contro');
 if(ft) add('TY: flusso '+ft+' (segue)',r,'segue');
 if(fz==='drena'&&ft!=='drena') add('ZF drenato, TY no (non segue)',r,'contro');
 if(ft==='drena'&&fz!=='drena') add('TY drenato, ZF no (segue)',r,'segue');
 const L=Q.lettura(c,r.trend,'zfty'); if(L&&L.dir){ const s=L.segue?'segue':'contro'; add('ZFTY attuale',r,s); if(fz==='drena'&&ft!=='drena') add('ZFTY, con ZF drenato -> non segue',r,'contro'); else add('ZFTY, con ZF drenato -> non segue',r,s); }
}
const pr=g=>g?g.n+' · '+(100*g.w/g.n).toFixed(1)+'% · '+(g.pnl>=0?'+':'')+g.pnl.toFixed(0):'-';
for(const k of Object.keys(G).sort()) console.log(k.padEnd(36),['2020-23','2024-26','vivo'].map(p=>p+': '+pr(G[k][p])).join('   '));
