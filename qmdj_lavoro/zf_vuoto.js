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
const PEL={1:'a',2:'t',3:'l',4:'l',6:'m',7:'m',8:'t',9:'f'}, BEL={子:'a',亥:'a',寅:'l',卯:'l',巳:'f',午:'f',申:'m',酉:'m',辰:'t',戌:'t',丑:'t',未:'t'}, CTL={l:'t',t:'a',a:'f',f:'m',m:'l'};
const XUN={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const vis=gz=>gz[0]!=='甲'?gz[0]:XUN[BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]];
const vuotiDi=gz=>{const i=(()=>{for(let k=0;k<60;k++) if(ST[k%10]===gz[0]&&BR[k%12]===gz[1]) return k;})(); const s=Math.floor(i/10)*10; return [BR[(s+10)%12],BR[(s+11)%12]];};
const G={}; const add=(k,p)=>{const g=G[k]||(G[k]={n:0,v:0,p:0});g.n++;if(p>0)g.v++;g.p+=p;};
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001, sg=c.trend==='LONG'?1:-1;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 let pc=null; for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].deity==='Commander') pc=k; if(!pc) continue;
 const zs=ch.palaces[pc].tiH, vu=vuotiDi(ch.pilastro), br=PB[pc].split('');
 const vuoto=br.some(b=>vu.includes(b)), vuotoTutto=br.every(b=>vu.includes(b));
 const mb=ch.mese[1], opp=PB[OPP[pc]].includes(mb), me=BEL[mb], pe=PEL[pc];
 const untimely = CTL[me]===pe || CTL[pe]===me;   // 死 o 囚
 const per=c.date<'2024'?'20-23':c.date<'2026-09-29'?'24-26':'vivo';
 for(const x of QO.ore(ch)){ if(x.pilastro[0]!=='甲'||vis(x.pilastro)!==zs) continue; const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) continue;
   const ora=(B[hs[hs.length-1]].c-B[hs[0]].o)/pip*sg-1.5, fino=(B[20].c-B[hs[0]].o)/pip*sg-1.5;
   const ks=['tutte le ore Jia dello ZF'];
   if(vuoto&&opp) ks.push('ZF vuoto + mese opposto'); if(vuoto&&untimely) ks.push('ZF vuoto + untimely (死/囚)');
   if(vuotoTutto&&untimely) ks.push('ZF vuoto pieno + untimely'); if(vuoto&&!untimely) ks.push('ZF vuoto ma in stagione'); if(!vuoto&&untimely) ks.push('ZF untimely non vuoto');
   if(!vuoto&&!untimely) ks.push('ZF pieno e in stagione');
   if(vuoto) ks.push('ZF vuoto, ora '+x.pilastro+zs); if(vuoto&&opp) ks.push('ZF vuoto+opp, ora '+x.pilastro+zs);
   for(const k of ks) for(const pp of [per,'tutto']){ add(k+' | ora | '+pp,ora); add(k+' | fino 21 | '+pp,fino); } }
}
for(const k of Object.keys(G).sort()){const g=G[k]; console.log(k.padEnd(52),String(g.n).padStart(5),(100*g.v/g.n).toFixed(1).padStart(5)+'% con il trend',String(Math.round(g.p)).padStart(7),'media',(g.p/g.n).toFixed(1));}
