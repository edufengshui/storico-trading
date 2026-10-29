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
const G={}; const add=(k,r,top)=>{const g=G[k]||(G[k]={n:0,r:0,top:0,big:0});g.n++;g.r+=r;if(top)g.top++;if(r>=2)g.big++;};
for(const R of rows){ const rel={}; for(const b in R.amp){const n=norm[R.c.cross+'|'+b]; rel[b]=R.amp[b]/(n.s/n.n);} 
 const best=Object.keys(rel).sort((a,b)=>rel[b]-rel[a])[0];
 for(const x of R.ore){ if(rel[x.ramo]==null) continue; const r=rel[x.ramo], top=best===x.ramo; const per=R.c.date<'2024'?'20-23':R.c.date<'2026-09-29'?'24-26':'vivo';
   const ks=['tutte le ore']; const jz=x.pilastro[0]==='甲'&&vis(x.pilastro)===R.zs;
   if(jz){ ks.push('ora Jia dello ZF'); if(R.vuoto) ks.push('ora Jia dello ZF, ZF vuoto'); if(R.vuoto&&R.opp) ks.push('ora Jia dello ZF, ZF vuoto + mese opposto'); if(!R.vuoto) ks.push('ora Jia dello ZF, ZF pieno'); }
   if(x.ecc) ks.push('ore dello schema (stelo col Commander)'); if(x.ecc&&x.spento) ks.push('ore dello schema, mese opposto');
   if(x.ecc&&R.vuoto) ks.push('ore dello schema, ZF vuoto'); if(x.ecc&&R.vuoto&&R.opp) ks.push('ore dello schema, ZF vuoto + mese opposto');
   if(x.ecc&&x.carta!=='normale') ks.push('ore dello schema, fan/fu yin');
   for(const k of ks){add(k+' | tutto',r,top); add(k+' | '+per,r,top);} } }
for(const k of Object.keys(G).sort()){const g=G[k]; console.log(k.padEnd(58),String(g.n).padStart(6),'ampiezza',(g.r/g.n).toFixed(2)+'x','ora piu\' forte del giorno',(100*g.top/g.n).toFixed(1)+'%','>=2x',(100*g.big/g.n).toFixed(1)+'%');}
