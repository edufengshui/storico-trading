global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, XUN={'甲子':'戊','甲戌':'己','甲申':'庚','甲午':'辛','甲辰':'壬','甲寅':'癸'};
const ST='甲乙丙丁戊己庚辛壬癸', clash=(a,b)=>Math.abs(BR.indexOf(a)-BR.indexOf(b))===6;
const xunOf=gz=>{const s=ST.indexOf(gz[0]),b=BR.indexOf(gz[1]);return '甲'+BR[((b-s)%12+12)%12];};
const D=JSON.parse(fs.readFileSync('/home/claude/qm/dump_2020_26.json')).filter(c=>c.trend&&c.real);
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);const o=(idx[k]||(idx[k]={}));const h=+b.t.slice(11,13);if(b.h!=null&&b.l!=null||!o[h])o[h]=b;}
const f3=p=>{const d=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return d.slice(0,Math.abs(Number(p))<1?2:3);};
const G={}; const add=(k,ratio,withT,wT)=>{const g=G[k]||(G[k]={n:0,r:0,w:0,big:0,t:0});g.n++;g.r+=ratio;if(withT)g.w++;if(wT)g.t++;if(ratio>=2)g.big++;};
for(const c of D){const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), t=Date.UTC(p[0],p[1]-1,p[2]), hz=BR[((seed-1)%12+12)%12];
 const ch=Q.oraria(t,hz); const L=Q.lettura(Q.oraria(t,hz),c.trend,'zfty'); if(!L||!L.giornoOra) continue; let zf=null; for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].deity==='Commander') zf=k; const ty=L.giornoOra.palOra; if(!zf||!ty||!L.dir) continue; const ver=L.dir==='LONG'?1:-1;
 const pal=s=>{for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].tiH===s) return k; return null;};
 const hrs=[]; for(let bi=0;bi<12;bi++){const hs=bi===0?[0]:[2*bi-1,2*bi]; if(hs.some(h=>h>20||!B[h]||B[h].h==null)) continue;
   const mv=(B[hs[hs.length-1]].c-B[hs[0]].o)/pip/hs.length; const gz=lj.Solar.fromYmdHms(p[0],p[1],p[2],hs[0],30,0).getLunar().getTimeInGanZhi();
   hrs.push({br:BR[bi],gz,mv});}
 if(hrs.length<8) continue; const avg=hrs.reduce((a,x)=>a+Math.abs(x.mv),0)/hrs.length; if(!avg) continue; const sgn=c.trend==='LONG'?1:-1;
 const LH={子:'丑',丑:'子',寅:'亥',亥:'寅',卯:'戌',戌:'卯',辰:'酉',酉:'辰',巳:'申',申:'巳',午:'未',未:'午'};
 for(const x of hrs){ let st=x.gz[0]; if(st==='甲') st=XUN[xunOf(x.gz)]; if(pal(st)!==zf) continue; const ratio=Math.abs(x.mv)/avg, withV=x.mv*ver>0;
   const DH={Rest:1,Birth:8,Injury:3,Delusion:4,View:9,Death:2,Shocking:7,Open:6}, SH={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9}; const dz=ch.palaces[zf]; const brs=[...new Set([...PB[zf],...(PB[DH[dz.doorName||dz.door]]||''),...(PB[SH[dz.star]]||'')])]; let k; if(brs.some(b=>clash(b,x.br))) k='1 opposta (clash)'; else if(brs.includes(x.br)) k='2 identica (stesso palazzo)'; else if(brs.some(b=>LH[b]===x.br)) k='3 combinazione (六合)'; else k='4 altro';
   const per=c.date<'2024'?' 20-23':' 24-26'; const wT=x.mv*sgn>0; add(k,ratio,withV,wT); add(k+per,ratio,withV,wT);}}
for(const k of Object.keys(G).sort()){const g=G[k];console.log(k.padEnd(52),g.n,'forza',(g.r/g.n).toFixed(2),'colpo>=2x',(100*g.big/g.n).toFixed(1)+'%','verso carta',(100*g.w/g.n).toFixed(1)+'%','con il trend',(100*g.t/g.n).toFixed(1)+'%');}
