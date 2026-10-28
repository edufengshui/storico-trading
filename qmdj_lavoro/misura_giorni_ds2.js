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
 const L=QO.ore(ch).filter(x=>x.ecc&&QO.oreGMT(x.ramo).length);
 const forme=new Set(L.map(x=>x.forma)); const pieno=[...forme].some(f=>f!=='solo stelo');
 const pt=(c.real===c.trend?1:-1)*Math.abs(c.move)-1.5; const pl=c.liDir?((c.liDir===c.real?1:-1)*Math.abs(c.move)-1.5):null;
 const XUN={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'},STs='甲乙丙丁戊己庚辛壬癸';
 let ds=ch.giorno[0]; if(ds==='甲') ds=XUN[BR[((BR.indexOf(ch.giorno[1])-STs.indexOf(ch.giorno[0]))%12+12)%12]];
 let pd=null,pc=null; for(let k=1;k<=9;k++){ if(k!==5&&(ch.palaces[k].tiH===ds||ch.palaces[k].ti2H===ds)) pd=k; if(k!==5&&ch.palaces[k].deity==='Commander') pc=k; }
 const PEL={1:'a',2:'t',3:'l',4:'l',6:'m',7:'m',8:'t',9:'f'}, GEN={l:'f',f:'t',t:'m',m:'a',a:'l'};
 const rel=!pd||!pc?'?':pd===pc?'DS col Commander':GEN[PEL[pd]]===PEL[pc]?'DS genera il Commander':GEN[GEN[PEL[pd]]]===PEL[pc]?'DS genera il ponte':'DS altrove';
 const ks=['tutti i giorni', rel+(pieno?' + ora del Commander':' senza ora')];
 for(const k of ks){add('trend | '+k+' | tutto',pt);add('trend | '+k+' | '+per,pt); if(pl!==null){add('Lio   | '+k+' | tutto',pl);add('Lio   | '+k+' | '+per,pl);}}}
for(const k of Object.keys(G).sort()){const g=G[k];console.log(k.padEnd(55),g.n,(100*g.v/g.n).toFixed(1)+'%',Math.round(g.p),'media',(g.p/g.n).toFixed(2));}
