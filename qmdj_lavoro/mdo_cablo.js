global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.trend);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, OPP={1:9,9:1,3:7,7:3,2:8,8:2,4:6,6:4};
const rows=[], norm={};
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const a=Q.lettura(ch,c.trend,'dshs'), z=Q.lettura(ch,c.trend,'zfty'); const sa=a?a.segue:null, sz=z?z.segue:null;
 const ver = sa===null?sz: sz===null?sa: sa===sz?sa:null;
 const ore=QO.ore(ch, ver); let pc=null; for(let k=1;k<=9;k++) if(k!==5&&ch.palaces[k].deity==='Commander') pc=k;
 const op=pc&&ch.palaces[OPP[pc]]; const opDec = op && ((op.doorName||op.door)==='Birth' || op.zhiShi);
 const mv={}, amp={};
 for(const x of ore){ const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) continue; const d=(B[hs[hs.length-1]].c-B[hs[0]].o)/pip, f=(B[20].c-B[hs[0]].o)/pip;
   mv[x.ramo]=[d,f]; amp[x.ramo]=Math.abs(d); const k=c.cross+'|'+x.ramo; const n=norm[k]||(norm[k]={s:0,n:0}); n.s+=Math.abs(d); n.n++; }
 rows.push({c,ore,mv,amp,ver,pc,opDec,real:c.real});
}
const G={}; const add=(k,r,top,hit,hitf,pp)=>{const g=G[k]||(G[k]={n:0,r:0,top:0,h:0,hf:0,p:0});g.n++;g.r+=r;if(top)g.top++;if(hit)g.h++;if(hitf)g.hf++;g.p+=pp;};
for(const R of rows){ const rel={}; for(const b in R.amp){const n=norm[R.c.cross+'|'+b]; rel[b]=R.amp[b]/(n.s/n.n);} const best=Object.keys(rel).sort((a,b)=>rel[b]-rel[a])[0];
 const sg=R.c.trend==='LONG'?1:-1, per=R.c.date<'2024'?'20-23':R.c.date<'2026-09-29'?'24-26':'vivo';
 for(const x of R.ore){ if(rel[x.ramo]==null) continue; const [d,f]=R.mv[x.ramo];
   const go=(k,verso)=>{ const s=verso==='trend'?sg:verso==='contro il trend'?-sg:0; if(!s) return; const pp=f*s-1.5; add(k+' | '+per,rel[x.ramo],best===x.ramo,d*s>0,f*s>0,pp); add(k+' | tutto',rel[x.ramo],best===x.ramo,d*s>0,f*s>0,pp); };
   if(x.ecc&&x.carta==='normale'&&!x.spento&&!(x.propria&&x.zfVuoto&&x.zfUntimely)){ go('A normale, verso fisso trend','trend'); if(R.ver!==null) go('A normale, verso dalla carta', x.verso); }
   if(x.ecc&&x.forte) go('B ora propria, ZF vuoto + mese opp (forte)', x.verso);
   if(x.ecc&&x.propria&&x.zfVuoto&&x.zfUntimely&&!x.forte) go('C ora propria, ZF vuoto + untimely (no mese opp)', x.verso);
   if(x.ecc&&x.carta!=='normale') go('D fan/fu yin', x.verso);
   if(R.pc&&PB[R.pc].includes(x.ramo)&&R.opDec&&R.ver!==null) go('E ramo dello ZF colpito da Birth/ZS opposto', R.ver?'trend':'contro il trend');
   if(R.pc&&PB[R.pc].includes(x.ramo)&&R.ver!==null) go('F ramo dello ZF (tutti)', R.ver?'trend':'contro il trend');
   if(R.ver!==null) go('Z tutte le ore, verso dalla carta', R.ver?'trend':'contro il trend');
 } }
for(const k of Object.keys(G).sort()){const g=G[k]; console.log(k.padEnd(54),String(g.n).padStart(6),'amp',(g.r/g.n).toFixed(2)+'x','top',(100*g.top/g.n).toFixed(1)+'%','nell\'ora',(100*g.h/g.n).toFixed(1)+'%','fino 21',(100*g.hf/g.n).toFixed(1)+'%',String(Math.round(g.p)).padStart(7));}
