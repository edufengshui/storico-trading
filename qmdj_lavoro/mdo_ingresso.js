global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const unz=process.env.H||'/home/claude/storico-trading/full1h.json';
const H=JSON.parse(fs.readFileSync(unz)).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);const o=(idx[k]||(idx[k]={}));o[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.liDir&&c.trend);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const G={}; const add=(k,p)=>{const g=G[k]||(G[k]={n:0,v:0,p:0,eq:0,pk:0,dd:0});g.n++;if(p>0)g.v++;g.p+=p;g.eq+=p;g.pk=Math.max(g.pk,g.eq);g.dd=Math.min(g.dd,g.eq-g.pk);};
const SP=1.5; D.sort((a,b)=>a.date<b.date?-1:1);
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const sg=c.liDir==='LONG'?1:-1, conT=c.liDir===c.trend; const per=c.date<'2024'?'20-23':c.date<'2026-09-29'?'24-26':'vivo';
 const base=(B[20].c-B[0].o)/pip*sg-SP;
 const XUN={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'},STs='甲乙丙丁戊己庚辛壬癸';
 let ds=ch.giorno[0]; if(ds==='甲') ds=XUN[BR[((BR.indexOf(ch.giorno[1])-STs.indexOf(ch.giorno[0]))%12+12)%12]];
 let pd=null,pc=null; for(let k=1;k<=9;k++){ if(k!==5&&(ch.palaces[k].tiH===ds||ch.palaces[k].ti2H===ds)) pd=k; if(k!==5&&ch.palaces[k].deity==='Commander') pc=k; }
 const PEL={1:'a',2:'t',3:'l',4:'l',6:'m',7:'m',8:'t',9:'f'}, GEN={l:'f',f:'t',t:'m',m:'a',a:'l'};
 const dsOk=pd&&pc&&(pd===pc||GEN[PEL[pd]]===PEL[pc]||GEN[GEN[PEL[pd]]]===PEL[pc]);
 let ent=null, vs=null; for(const x of QO.ore(ch)){ if(!x.ecc||x.spento||(process.env.DS&&!dsOk)||(process.env.NORM&&x.carta!=='normale')) continue; const hs=QO.oreGMT(x.ramo); if(!hs.length||hs[0]>20||!B[hs[0]]) continue; ent=hs[0]; vs=x.verso; break; }
 const ker=(k,v)=>{add(k+' | '+per,v); add(k+' | tutto',v);};
 ker('A mezzanotte (oggi)',base);
 const alt=ent!=null?(B[20].c-B[ent].o)/pip*sg-SP:base;
 ker('B ora del Commander se c\'e\'',alt);
 const okB = ent!=null && ((vs==='trend'&&conT)||(vs==='contro il trend'&&!conT));
 ker('C ora Cmd solo se l\'ora va nel verso di Lio', okB?alt:base);
 if(ent!=null){ ker('  giorni con ora Cmd: mezzanotte',base); ker('  giorni con ora Cmd: ora Cmd',alt);
   ker('  ...verso concorde con Lio: mezzanotte', okB?base:NaN); }
 if(okB){ ker('  concordi: mezzanotte',base); ker('  concordi: ora Cmd',alt); }
 if(ent!=null&&!okB){ ker('  discordi: mezzanotte',base); ker('  discordi: ora Cmd',alt); }
 if(c.liForza){ ker('D forte mezzanotte/'+c.liForza, base); ker('D forte oraCmd/'+c.liForza, okB?alt:base); }
}
for(const k of Object.keys(G).sort()){const g=G[k]; if(isNaN(g.p)) continue; console.log(k.padEnd(60),String(g.n).padStart(5),(100*g.v/g.n).toFixed(1).padStart(5)+'%',String(Math.round(g.p)).padStart(7),'calo',Math.round(g.dd));}
