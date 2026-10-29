global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const EL={1:'w',2:'e',3:'m',4:'m',6:'M',7:'M',8:'e',9:'f'};
const GEN={w:'m',m:'f',f:'e',e:'M',M:'w'}, CTL={w:'f',f:'M',M:'m',m:'e',e:'w'};
const BEL={'寅':'m','卯':'m','巳':'f','午':'f','申':'M','酉':'M','亥':'w','子':'w','辰':'e','戌':'e','丑':'e','未':'e'};
const PB={'子':1,'丑':8,'寅':8,'卯':3,'辰':4,'巳':4,'午':9,'未':2,'申':2,'酉':7,'戌':6,'亥':6};
const vuoti=ora=>{const s=ST.indexOf(ora[0]),b=BR.indexOf(ora[1]);const lead=(b-s+12)%12;return [BR[(lead+10)%12],BR[(lead+11)%12]].map(x=>PB[x]);};
const all=JSON.parse(fs.readFileSync('storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'A':'B'}))
 .concat(JSON.parse(fs.readFileSync('vivo.json')).map(r=>Object.assign(r,{per:'V'})));
const G={}; const add=(k,r,ok,p)=>{const g=(G[k]=G[k]||{});const z=(g[r.per]=g[r.per]||{n:0,w:0,p:0});z.n++;if(ok)z.w++;z.p+=p;};
const LOG=[];
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]);
 const me=BEL[c.mese[1]]; const vu=vuoti(c.pilastro);
 const pT=(r.trend==='LONG'?r.move:-r.move);
 for(const sis of ['dshs','zfty']){const L=Q.lettura(c,r.trend,sis);const g=L.giornoOra||{};const T=g.palGiorno,C=g.palOra; if(!T||!C||!EL[T]||!EL[C]||!L.dir)continue;
  let ctrlr=null,ctrld=null; if(CTL[EL[T]]===EL[C]){ctrlr='trend';ctrld=C;} else if(CTL[EL[C]]===EL[T]){ctrlr='controparte';ctrld=T;} if(!ctrlr) continue;
  const out=GEN[EL[ctrld]]; const timely=(out===me||GEN[me]===out); const pals=Object.keys(EL).map(Number).filter(k=>EL[k]===out);
  const pieno=pals.some(k=>!vu.includes(k));
  const pM=(L.dir==='LONG'?r.move:-r.move)-1.5, okM=pM+1.5>0;
  // con l'Output timely la lettura va contro chi controlla: trend controlla -> non segue; controparte controlla -> segue
  const dirOut = ctrlr==='trend' ? (r.trend==='LONG'?'SHORT':'LONG') : r.trend;
  const pO=(dirOut==='LONG'?r.move:-r.move)-1.5;
  const k=sis+' | '+(ctrlr==='trend'?'il trend controlla':'la controparte controlla');
  add(k+' | tutte, metodo',r,okM,pM);
  const t=(timely&&pieno?'Output timely':'Output no')+(L.segue?' / metodo segue':' / metodo NON segue')+' / base '+(g.base===true?'segue':g.base===false?'non segue':'nulla');
  add(k+' | '+t+', metodo',r,okM,pM); add(k+' | '+t+', direzione Output',r,pO>-1.5,pO);
  if(sis==='zfty'&&r.cross==='USDJPY'&&r.date==='2026-09-24') LOG.push([sis,ctrlr,out,timely,pieno,L.dir]);
 }}
const f=z=>z?(z.n+' '+(100*z.w/z.n).toFixed(1)+'% '+(z.p>=0?'+':'')+z.p.toFixed(0)):'-';
for(const k of Object.keys(G).sort()) console.log(k.padEnd(70),'|',f(G[k].A).padEnd(17),'|',f(G[k].B).padEnd(17),'|',f(G[k].V));
console.log(LOG);
