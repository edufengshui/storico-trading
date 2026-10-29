global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const EL={甲:'W',乙:'W',丙:'F',丁:'F',戊:'E',己:'E',庚:'M',辛:'M',壬:'A',癸:'A'}, CTRL={W:'E',E:'A',A:'F',F:'M',M:'W'};
const G={};
const add=(k,r,seg)=>{(G[k]=G[k]||{})[r.per]=G[k][r.per]||[];G[k][r.per].push(seg);};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 const L=Q.lettura(c,r.trend,'dshs'); const pg=L.giornoOra&&L.giornoOra.palGiorno; if(!pg) continue; const x=c.palaces[pg];
 const ds=x.tiH, di=x.diH; const seg=(r.move>0)===(r.trend==='LONG');
 add('tutte',r,seg);
 if(ds==='乙'&&di==='辛') add('乙 sopra 辛 (青龍逃走)',r,seg);
 if(EL[di]&&CTRL[EL[di]]===EL[ds]) add('DS sopra stelo che lo controlla',r,seg);
 if(ds==='乙'&&di==='辛'&&L.segue===true) add('乙/辛 e DsHs dice segue',r,seg);
}
const st=x=>{if(!x||!x.length)return '-';const w=x.filter(v=>v).length;return x.length+' segue '+(100*w/x.length).toFixed(1)+'%';};
for(const k in G) console.log(k.padEnd(34),['2020-23','2024-26','vivo'].map(p=>p+': '+st(G[k][p])).join(' | '));
