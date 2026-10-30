// MDO (Edu 30/10/2026): ingresso nell'ora che accende il PALAZZO CHE DECIDE la lettura (lettura.palDecide), direzione della carta, uscita 21 GMT.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.trend&&(!process.env.LIO||c.liDir));
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const steli=p=>[p.tiH,p.diH,p.di2H].filter(Boolean);
const visib=gz=>{ if(gz[0]!=='甲') return gz[0]; return LIU[BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]]; };
const ramoIn=(c,q,br)=>PB[q].includes(br)||(LIU[br]&&steli(c.palaces[q]).includes(LIU[br]));
const steloIn=(c,q,gz)=>steli(c.palaces[q]).includes(visib(gz));
const G={}; const add=(k,per,p)=>{const g=(G[k]=G[k]||{})[per]=(G[k]||{})[per]||{n:0,v:0,p:0};g.n++;if(p>0)g.v++;g.p+=p;};
const SIS=process.env.SIS||'dshs';
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const L=Q.lettura(ch,c.trend,SIS); if(!L||!L.dir) continue; const q=L.palDecide;
 const per=c.date<'2024'?'2020-23':c.date<'2026-09-29'?'2024-26':'vivo', sg=(process.env.LIO?c.liDir:L.dir)==='LONG'?1:-1;
 // ampiezza: |barra| dell'ora che accende contro la media delle altre ore del giorno (01-20)
 if(q){ let lit=[],oth=[]; for(let i=1;i<12;i++){const br=BR[i],gz=QO.hourGZ(ch.giorno[0],br),gm=QO.oreGMT(br); for(const h of gm){ if(!B[h]) continue; const a=Math.abs(B[h].c-B[h].o)/pip; (ramoIn(ch,q,br)&&steloIn(ch,q,gz)?lit:oth).push(a);} }
  if(lit.length&&oth.length){ const r=(lit.reduce((x,y)=>x+y,0)/lit.length)/(oth.reduce((x,y)=>x+y,0)/oth.length); const g=(G['ampiezza ora che accende / altre']=G['ampiezza ora che accende / altre']||{}); const z=g[per]=g[per]||{n:0,v:0,p:0}; z.n++; z.p+=r; if(r>1)z.v++; } }
 const notte=(B[20].c-B[0].o)/pip*sg-1.5; add('carta, da mezzanotte',per,notte);
 if(!q){ add('nessun palazzo che decide',per,notte); continue; }
 const tipo=/^ponte/.test(L.passoDecide||'')?'ponte':!L.passoDecide?'?':(L.passoDecide===L.giornoOra.baseMotivo?'base':'regola');
 for(const modo of ['stelo e ramo','ramo','stelo']){ let first=null,amp=null;
  for(let i=1;i<12;i++){ const br=BR[i], gz=QO.hourGZ(ch.giorno[0],br), gm=QO.oreGMT(br); if(!gm.length||!B[gm[0]]) continue;
   const r=ramoIn(ch,q,br), s=steloIn(ch,q,gz); if(modo==='ramo'?r:modo==='stelo'?s:(r&&s)){first=gm[0];break;} }
  const k=modo; if(first===null){ add(k+' · nessuna ora (resta fuori)',per,notte); continue; }
  add(k+' · entra nell\'ora',per,(B[20].c-B[first].o)/pip*sg-1.5); add(k+' · stessa carta da mezzanotte',per,notte);
  if(modo==='stelo e ramo'){ add('  '+tipo+' · entra nell\'ora',per,(B[20].c-B[first].o)/pip*sg-1.5); add('  '+tipo+' · da mezzanotte',per,notte); }
 }
}
const st=g=>g?(g.n+' '+(100*g.v/g.n).toFixed(0)+'% '+(g.p>=0?'+':'')+(g.p/g.n).toFixed(1)+'/tr'):'-';
console.log('SIS='+SIS); for(const k in G) console.log(k.padEnd(44),['2020-23','2024-26','vivo'].map(p=>st(G[k][p])).join(' | '));
