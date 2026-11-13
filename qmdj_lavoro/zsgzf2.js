global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}));
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, PEL={1:'A',2:'E',3:'W',4:'W',6:'M',7:'M',8:'E',9:'F'};
const BEL={子:'A',亥:'A',寅:'W',卯:'W',巳:'F',午:'F',申:'M',酉:'M',辰:'E',戌:'E',丑:'E',未:'E'}, GEN={W:'F',F:'E',E:'M',M:'A',A:'W'},CTL={W:'E',E:'A',A:'F',F:'M',M:'W'};
const tim=(pe,me)=>pe===me||GEN[me]===pe?'timely':(CTL[me]===pe||CTL[pe]===me)?'untimely':'medio';
const G={}; const add=(k,per,ok,pp)=>{const g=((G[k]=G[k]||{})[per]=G[k][per]||[0,0,0]);g[0]++;if(ok)g[1]++;g[2]+=pp;};
const ST='甲乙丙丁戊己庚辛壬癸';
const vuoti=gz=>{let i=0;for(let k=0;k<60;k++) if(ST[k%10]===gz[0]&&BR[k%12]===gz[1]) i=k; const s=Math.floor(i/10)*10; return [BR[(s+10)%12],BR[(s+11)%12]];};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 global.QMDJ_ZS_GENERA_ZF='off'; const L0=Q.lettura(c,r.trend,'zfty'); global.QMDJ_ZS_GENERA_ZF='zfty'; const L1=Q.lettura(c,r.trend,'zfty');
 if(!L1||!L1.dir||(L0&&L0.dir===L1.dir)) continue;
 let zq,zc; for(let q=1;q<=9;q++) if(q!==5){ if(c.palaces[q].zhiShi) zq=q; if(c.palaces[q].deity==='Commander') zc=q; }
 const v=vuoti(c.pilastro), zqv=PB[zq].split('').some(b=>v.includes(b)), zcv=PB[zc].split('').some(b=>v.includes(b));
 const me=BEL[c.mese[1]]; const s=L1.dir==='LONG'?1:-1, ok=r.move*s>0, pp=r.move*s-1.5;
 add('tutte le cambiate',r.per,ok,pp);
 add('ZS vuoto '+zqv,r.per,ok,pp); add('ZF vuoto '+zcv,r.per,ok,pp);
 add('ZS '+tim(PEL[zq],me),r.per,ok,pp); add('ZF '+tim(PEL[zc],me),r.per,ok,pp);
 add('prima era '+(L0&&L0.segue===false?'non segue':'fermo/nessuno'),r.per,ok,pp);
 add('ponte nel motivo '+/ponte/.test(L0&&L0.motivo||''),r.per,ok,pp);
 add('View ribaltava '+/View clasha il trend/.test(L0&&L0.motivo||''),r.per,ok,pp);
}
for(const k of Object.keys(G).sort()) console.log(k.padEnd(28),['2020-23','2024-26'].map(p=>{const g=G[k][p];return g?g[0]+' '+(100*g[1]/g[0]).toFixed(0)+'% '+Math.round(g[2]):'-'}).join(' | '));
