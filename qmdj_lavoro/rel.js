global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const EL={1:4,2:2,3:0,4:0,6:3,7:3,8:2,9:1}; // 0 legno 1 fuoco 2 terra 3 metallo 4 acqua
const genera=(a,b)=>EL[a]!=null&&EL[b]!=null&&(EL[a]+1)%5===EL[b];
const steli=p=>[p.tiH,p.ti2H,p.diH,p.di2H].filter(Boolean);
const visib=gz=>{ if(gz[0]!=='甲') return gz[0]; return LIU[BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]]; };
const ramoIn=(c,q,br)=>PB[q].includes(br)||(LIU[br]&&steli(c.palaces[q]).includes(LIU[br]));
const palStelo=(c,gz)=>{const s=visib(gz),o=[];for(const q of [1,2,3,4,6,7,8,9]) if(steli(c.palaces[q]).includes(s)) o.push(q);return o;};
const CH=(a,b)=>(BR.indexOf(a)-BR.indexOf(b)+12)%12===6, HE=(a,b)=>(BR.indexOf(a)+BR.indexOf(b))%12===1;
const PU={'丑':'戌','戌':'未','未':'丑','寅':'巳','巳':'申','申':'寅','子':'卯','卯':'子'};
const A={}; const ad=(k,per,v,ab)=>{const g=((A[k]=A[k]||{})[per]=A[k][per]||{n:0,v:0,p:0,a:0});g.n++;if(v>0)g.v++;g.p+=v;g.a+=ab;};
for(const k in M){ const c=M[k]; if(!c.trend||!c.real) continue; const B=idx[k]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const z=Q.lettura(ch,c.trend,'zfty'), d=Q.lettura(ch,c.trend,'dshs'); const L=(z&&z.dir&&z.palDecide)?z:(d&&d.dir&&d.palDecide)?d:null; if(!L) continue;
 const q=L.palDecide, sg=L.dir==='LONG'?1:-1, per=c.date<'2024'?'2020-23':c.date<'2026-09-29'?'2024-26':'vivo', hb=ch.pilastro[1], db=ch.giorno[1], mb=ch.mese[1];
 for(let i=1;i<12;i++){ const br=BR[i], gz=QO.hourGZ(ch.giorno[0],br), gm=QO.oreGMT(br); if(!gm.length||gm.some(h=>!B[h])) continue;
  if(!ramoIn(ch,q,br)) continue; const ps=palStelo(ch,gz); if(!(ps.includes(q)||ps.some(x=>genera(x,q)))) continue;
  const mv=(B[gm[gm.length-1]].c-B[gm[0]].o)/pip*sg-1.5;
  const rel=CH(br,hb)?'clasha ramo ora':CH(br,db)?'clasha ramo giorno':(HE(br,hb)||HE(br,db))?'combina ora/giorno':(PU[br]===mb||PU[mb]===br)?'punisce/è punito dal mese':'altro';
  ad(rel,per,mv,Math.abs(mv)); ad('tutte',per,mv,Math.abs(mv));
  const tp=[ch.palaces[q].tiH,ch.palaces[q].ti2H].includes(visib(gz))?'stelo nel cielo del palazzo':'stelo altrove'; ad(tp,per,mv,Math.abs(mv));}}
const st=g=>g?`${g.n} ${(100*g.v/g.n).toFixed(0)}% ${(g.p/g.n).toFixed(1)}/tr amp ${(g.a/g.n).toFixed(1)}`:'-';
for(const k in A) console.log(k.padEnd(28),['2020-23','2024-26','vivo'].map(p=>st(A[k][p])).join(' | '));
