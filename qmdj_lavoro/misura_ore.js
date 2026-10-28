global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const D=JSON.parse(fs.readFileSync('/home/claude/qm/dump_2020_26.json')).filter(c=>c.trend&&c.real);
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);const o=(idx[k]||(idx[k]={}));const h=+b.t.slice(11,13);if(b.h!=null&&b.l!=null||!o[h])o[h]=b;}
const f3=p=>{const d=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return d.slice(0,Math.abs(Number(p))<1?2:3);};
const G={}; const add=(k,p)=>{const g=G[k]||(G[k]={n:0,v:0,p:0});g.n++;if(p>0)g.v++;g.p+=p;};
for(const c of D){const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]); const sg=c.trend==='LONG'?1:-1;
 const per=c.date<'2024'?'20-23':c.date<'2026-09-29'?'24-26':'vivo';
 for(const x of QO.ore(ch)){const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) continue;
   const pp=(B[hs[hs.length-1]].c-B[hs[0]].o)/pip*sg-1.5;
   const ks=['tutte le ore']; if(x.ecc){ks.push('ora che eccita il Commander'); ks.push('  forma '+x.forma); if(x.forma!=='solo stelo') ks.push('  stelo + ramo (opposta/identica/ponte)');}
   for(const k of ks){add(k+' | tutto',pp);add(k+' | '+per,pp);}}}
for(const k of Object.keys(G).sort()){const g=G[k];console.log(k.padEnd(55),g.n,(100*g.v/g.n).toFixed(1)+'%',Math.round(g.p),'media',(g.p/g.n).toFixed(2));}
