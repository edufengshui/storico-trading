global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.trend);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, OPP={1:9,9:1,3:7,7:3,2:8,8:2,4:6,6:4};
const XUN={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const vis=gz=>gz[0]!=='甲'?gz[0]:XUN[BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]];
const vuotiDi=gz=>{let i=0;for(let k=0;k<60;k++) if(ST[k%10]===gz[0]&&BR[k%12]===gz[1]) i=k; const s=Math.floor(i/10)*10; return [BR[(s+10)%12],BR[(s+11)%12]];};
// media |movimento| per cross e ramo (2 barre), per normalizzare
const rows=[]; const norm={};
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 let pc=null; for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].deity==='Commander') pc=k; if(!pc) continue;
 const zs=ch.palaces[pc].tiH, vu=vuotiDi(ch.pilastro), vuoto=PB[pc].split('').some(b=>vu.includes(b)), opp=PB[OPP[pc]].includes(ch.mese[1]);
 const ore=QO.ore(ch); const amp={};
 for(const x of ore){ const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) continue; amp[x.ramo]=Math.abs(B[hs[hs.length-1]].c-B[hs[0]].o)/pip;
   const k=c.cross+'|'+x.ramo; const n=norm[k]||(norm[k]={s:0,n:0}); n.s+=amp[x.ramo]; n.n++; }
 rows.push({c,ore,amp,zs,vuoto,opp,carta:ore[0]&&ore[0].carta});
}

const PBk={'子':1,'丑':8,'寅':8,'卯':3,'辰':4,'巳':4,'午':9,'未':2,'申':2,'酉':7,'戌':6,'亥':6};
const G={}; const add=(k,r,top,dt)=>{const g=G[k]||(G[k]={n:0,r:0,top:0,big:0,t:0,tn:0});g.n++;g.r+=r;if(top)g.top++;if(r>=2)g.big++;if(dt!=null){g.tn++;if(dt>0)g.t++;}};
const pipOf=c=>c.cross.includes('JPY')?0.01:0.0001;
for(const R of rows){ const rel={}; for(const b in R.amp){const n=norm[R.c.cross+'|'+b]; rel[b]=R.amp[b]/(n.s/n.n);}
 const p=R.c.date.split('-').map(Number); const B=idx[R.c.cross+'|'+R.c.date];
 const lv=(reg[R.c.date]||[]).find(y=>y.cross===R.c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10);
 const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const PEL2={1:'w',2:'e',3:'m',4:'m',6:'M',7:'M',8:'e',9:'f'},GEN2={w:'m',m:'f',f:'e',e:'M',M:'w'},CTL2={w:'f',f:'M',M:'m',m:'e',e:'w'};
 const DH={Rest:1,Birth:8,Injury:3,Delusion:4,View:9,Death:2,Shocking:7,Open:6}, SH={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9};
 const YIR={'戊':'子','己':'戌','庚':'申','辛':'午','壬':'辰','癸':'寅'}; const PBs={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};
 const cont=(p,larga)=>{const d=ch.palaces[p];let L=PBs[p]; if(larga){L+=(PBs[SH[d.star]]||'')+(PBs[DH[d.doorName||d.door]]||'');} [d.tiH,d.diH].forEach(x=>{if(YIR[x])L+=YIR[x];}); return L;};
 let pz=0; for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].deity==='Commander') pz=k; if(!pz) continue;
 const L0=Q.lettura(ch,R.c.trend,'zfty'); const cs=L0.segue; const po=0, zv=false;
const best=Object.keys(rel).sort((a,b)=>rel[b]-rel[a])[0]; const sg=R.c.trend==='LONG'?1:-1;
 const vu=vuotiDi(ch.pilastro).map(b=>PBk[b]).includes(po);
 for(const x of R.ore){ if(rel[x.ramo]==null) continue; const r=rel[x.ramo], top=best===x.ramo;
   const hs=QO.oreGMT(x.ramo); const dt=(B[hs[hs.length-1]].c-B[hs[0]].o)*sg*(cs===false?-1:1);
   const per=R.c.date<'2024'?'20-23':R.c.date<'2026-09-29'?'24-26':'vivo';
   let pst=0; for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].tiH===vis(x.pilastro)) pst=k;
   const st=pst&&cont(pst,false).includes(x.ramo), stL=pst&&cont(pst,true).includes(x.ramo);
   const fav=pst&&(pst===pz||GEN2[PEL2[pst]]===PEL2[pz]||PEL2[pst]===PEL2[pz]), gen=pst&&GEN2[PEL2[pst]]===PEL2[pz];
   const ramoIn=false, ramoOpp=false, stIn=false, stTerra=false;
   const ks=['tutte le ore']; const isDS=x.pilastro[0]===ch.giorno[0]; if(isDS&&st&&fav) ks.push('NARROW: stelo del giorno, stelo e ramo nel palazzo favorevole allo ZF'+(cs===false?' (carta non segue)':' (carta segue)')); if(isDS&&st&&gen) ks.push('NARROW: stelo del giorno, stelo e ramo nel palazzo che genera lo ZF'); const vc=cs===false?' (carta non segue)':' (carta segue)';
   if(st){ks.push('stelo e ramo nello stesso palazzo');}
   if(st&&gen){ks.push('stelo e ramo nel palazzo che genera lo ZF'); ks.push('stelo e ramo nel palazzo che genera lo ZF'+vc);}
   if(st&&fav){ks.push('stelo e ramo in un palazzo favorevole allo ZF (genera, stesso o pari)'); ks.push('favorevole'+vc);}
   if(stL&&fav&&!st) ks.push('favorevole solo con stella/porta');
   if(st&&pst&&CTL2[PEL2[pst]]===PEL2[pz]) ks.push('stelo e ramo nel palazzo che controlla lo ZF');
   if(ramoIn) ks.push('ramo nel palazzo opposto allo ZF'); if(ramoOpp) ks.push('ramo nel palazzo dello ZF (clasha l opposto)');
   if(stIn) ks.push('stelo dell\'ora nel cielo dell opposto'); if(stTerra) ks.push('stelo dell\'ora nella terra dell opposto');
   if((stIn||stTerra)&&(ramoIn||ramoOpp)) ks.push('stelo e ramo toccano l opposto');
   if(ramoIn&&zv) ks.push('ramo nel palazzo opposto, ZF vuoto');
   if(ramoIn&&!zv) ks.push('ramo nel palazzo opposto, ZF pieno');
   for(const k of ks){add(k+' | tutto',r,top,dt); add(k+' | '+per,r,top,dt);} } }
for(const k of Object.keys(G).sort()){const g=G[k]; console.log(k.padEnd(52),String(g.n).padStart(6),'ampiezza',(g.r/g.n).toFixed(2)+'x','piu\' forte',(100*g.top/g.n).toFixed(1)+'%','>=2x',(100*g.big/g.n).toFixed(1)+'%','col verso della carta ZFTY',(100*g.t/g.tn).toFixed(1)+'%');}
