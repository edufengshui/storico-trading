global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const EL={1:'w',2:'e',3:'m',4:'m',6:'M',7:'M',8:'e',9:'f'}; // m legno, M metallo
const GEN={w:'m',m:'f',f:'e',e:'M',M:'w'}, CTL={w:'f',f:'M',M:'m',m:'e',e:'w'};
const rel=(a,b)=>{if(!EL[a]||!EL[b])return 'centro';const x=EL[a],y=EL[b]; if(a===b)return 'stesso';if(x===y)return 'pari';if(GEN[x]===y)return 'genera';if(CTL[x]===y)return 'controlla';if(GEN[y]===x)return 'generato';return 'controllato';};
// palazzi dei rami
const PB={'子':1,'丑':8,'寅':8,'卯':3,'辰':4,'巳':4,'午':9,'未':2,'申':2,'酉':7,'戌':6,'亥':6};
const vuoti=ora=>{const s=ST.indexOf(ora[0]),b=BR.indexOf(ora[1]);const lead=(b-s+12)%12;return [BR[(lead+10)%12],BR[(lead+11)%12]].map(x=>PB[x]);};
const all=JSON.parse(fs.readFileSync('storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'A':'B'}))
 .concat(JSON.parse(fs.readFileSync('vivo.json')).map(r=>Object.assign(r,{per:'V'})));
const G={}; const add=(k,r,ok,pnl)=>{const g=(G[k]=G[k]||{});const z=(g[r.per]=g[r.per]||{n:0,w:0,p:0});z.n++;if(ok)z.w++;z.p+=pnl;};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 const segue=(r.trend==='LONG'?r.move:-r.move)>0, pT=(r.trend==='LONG'?r.move:-r.move)-1.5;
 const OPP={1:9,9:1,3:7,7:3,2:8,8:2,4:6,6:4};let pz=0;for(let k=1;k<=9;k++) if(k!==5&&c.palaces[k].deity==='Commander') pz=k; if(!pz) continue; const po=OPP[pz];
 if(!po)continue; const vu=vuoti(c.pilastro).includes(po);
 add('tutte',r,segue,pT);
 add('opposto vuoto: '+(vu?'si':'no'),r,segue,pT);
 const zv=vuoti(c.pilastro).includes(pz); const r1=rel(po,pz);
 add('opposto -> ZF: '+r1,r,segue,pT); add('opposto -> ZF: '+r1+(zv?' (ZF vuoto)':' (ZF pieno)'),r,segue,pT);
 add('ZF vuoto: '+(zv?'si':'no'),r,segue,pT);
 const L=Q.lettura(c,r.trend,'zfty'); if(L.dir){const okM=(L.dir==='LONG'?r.move:-r.move)>0,pM=(L.dir==='LONG'?r.move:-r.move)-1.5;
  add('ZFTY tutte',r,okM,pM); add('ZFTY, opposto -> ZF: '+r1,r,okM,pM);}
 const D=Q.lettura(c,r.trend,'dshs'); if(D.dir){const okM=(D.dir==='LONG'?r.move:-r.move)>0,pM=(D.dir==='LONG'?r.move:-r.move)-1.5;
  add('DSHS tutte',r,okM,pM); add('DSHS, opposto -> ZF: '+r1,r,okM,pM);}
}
const f=z=>z?(z.n+' '+(100*z.w/z.n).toFixed(1)+'% '+(z.p>=0?'+':'')+z.p.toFixed(0)):'-';
for(const k of Object.keys(G).sort()) console.log(k.padEnd(42),'|',f(G[k].A).padEnd(18),'|',f(G[k].B).padEnd(18),'|',f(G[k].V));
