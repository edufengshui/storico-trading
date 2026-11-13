global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const PEL={1:'A',2:'E',3:'W',4:'W',6:'M',7:'M',8:'E',9:'F'},BEL={子:'A',亥:'A',寅:'W',卯:'W',巳:'F',午:'F',申:'M',酉:'M',辰:'E',戌:'E',丑:'E',未:'E'},CTL={W:'E',E:'A',A:'F',F:'M',M:'W'};
const all=JSON.parse(fs.readFileSync('storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'})).concat(JSON.parse(fs.readFileSync('vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={};const add=(k,p,ok,pp)=>{const g=((G[k]=G[k]||{})[p]=G[k][p]||[0,0,0]);g[0]++;if(ok)g[1]++;g[2]+=pp;};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 global.QMDJ_ZS_GENERA_ZF='off'; const L0=Q.lettura(c,r.trend,'zfty'); global.QMDJ_ZS_GENERA_ZF='zfty'; const L1=Q.lettura(c,r.trend,'zfty');
 if(!L1||!L1.dir||(L0&&L0.dir===L1.dir)) continue; let zc;for(let q=1;q<=9;q++) if(q!==5&&c.palaces[q].deity==='Commander') zc=q;
 const ze=PEL[zc], morto=CTL[BEL[c.mese[1]]]===ze, colpitoG=CTL[BEL[c.giorno[1]]]===ze;
 const s=L1.dir==='LONG'?1:-1, ok=r.move*s>0, pp=r.move*s-1.5;
 add('tutte',r.per,ok,pp); add('ZF controllato dal mese '+morto,r.per,ok,pp); add('ZF controllato dal ramo del giorno '+colpitoG,r.per,ok,pp);
 add('ZF puo ricevere (ne mese ne giorno lo controllano) '+(!morto&&!colpitoG),r.per,ok,pp);
}
for(const k of Object.keys(G).sort()) console.log(k.padEnd(56),['2020-23','2024-26','vivo'].map(p=>{const g=G[k][p];return g?g[0]+' '+(100*g[1]/g[0]).toFixed(0)+'% '+Math.round(g[2]):'-'}).join(' | '));
