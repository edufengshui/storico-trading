// MDO metodo autonomo (Edu 30/10/2026): si entra nell'ora che ACCENDE il palazzo che decide la carta, nella direzione della carta.
// Accendere: ramo dell'ora nel palazzo (terra) o 六仪 del ramo fra gli steli del palazzo; stelo dell'ora (甲 -> 六仪) fra gli steli del palazzo.
// Palazzo che decide (varianti): vincitore, sconfitto, chi genera il vincitore, ZS. Uscita 21 GMT. Confronto: stessa direzione da mezzanotte.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.trend);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, PEL={1:'a',2:'t',3:'l',4:'l',6:'m',7:'m',8:'t',9:'f'}, GEN={l:'f',f:'t',t:'m',m:'a',a:'l'};
const LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const steli=p=>[p.tiH,p.diH,p.di2H].filter(Boolean);
const visib=gz=>{ if(gz[0]!=='甲') return gz[0]; const x=BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]; return LIU[x]; };
const ramoIn=(c,q,br)=>PB[q].includes(br)||(LIU[br]&&steli(c.palaces[q]).includes(LIU[br]));
const steloIn=(c,q,gz)=>steli(c.palaces[q]).includes(visib(gz));
const G={}; const add=(k,per,p)=>{const g=(G[k]=G[k]||{})[per]=(G[k]||{})[per]||{n:0,v:0,p:0};g.n++;if(p>0)g.v++;g.p+=p;};
const SIS=process.env.SIS||'dshs';
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const L=Q.lettura(ch,c.trend,SIS); if(!L||!L.dir) continue; const g=L.giornoOra; if(!g.palGiorno||!g.palOra) continue;
 const per=c.date<'2024'?'2020-23':c.date<'2026-09-29'?'2024-26':'vivo', sg=L.dir==='LONG'?1:-1;
 const notte=(B[20].c-B[0].o)/pip*sg-1.5;
 const vin=L.segue?g.palGiorno:g.palOra, per2=L.segue?g.palOra:g.palGiorno;
 const genV=[1,2,3,4,6,7,8,9].filter(q=>q!==vin&&GEN[PEL[q]]===PEL[vin]);
 let zs=null; for(let q=1;q<=9;q++) if(q!==5&&ch.palaces[q].zhiShi) zs=q;
 const CTL={l:'t',t:'a',a:'f',f:'m',m:'l'}; const zsAg=zs&&zs!==vin&&zs!==per2&&(GEN[PEL[zs]]===PEL[vin]||CTL[PEL[zs]]===PEL[per2])&&!(ch.palaces[zs]._v);
 let zf=null; for(let q=1;q<=9;q++) if(q!==5&&ch.palaces[q].deity==='Commander') zf=q;
 const tocZF=zf?[1,2,3,4,6,7,8,9].filter(q=>q===zf||GEN[PEL[q]]===PEL[zf]||CTL[PEL[q]]===PEL[zf]):[];
 const DEC={'tocca lo ZF (e\' ZF, lo genera o lo controlla)':tocZF,'ZF':zf?[zf]:[],'ZS che agisce (genera il vincitore o controlla lo sconfitto)':zsAg?[zs]:[],vincitore:[vin],sconfitto:[per2],'chi genera il vincitore':genV,ZS:zs?[zs]:[], 'attori (giorno+ora)':[g.palGiorno,g.palOra]};
 add('mezzanotte (tutte le carte)',per,notte);
 for(const nome in DEC){ const P=DEC[nome]; if(!P.length) continue;
  for(const modo of ['ramo','stelo','stelo e ramo']){
   let first=null;
   for(let i=1;i<12;i++){ const br=BR[i]; const gz=QO.hourGZ(ch.giorno[0],br); const gm=QO.oreGMT(br); if(!gm.length||!B[gm[0]]) continue;
    const r=P.some(q=>ramoIn(ch,q,br)), s=P.some(q=>steloIn(ch,q,gz));
    const r1=P.filter(q=>ramoIn(ch,q,br)), s1=P.filter(q=>steloIn(ch,q,gz)); const ok=modo==='ramo'?r:modo==='stelo'?s:r1.some(q=>s1.includes(q)); if(ok){first=gm[0];break;} }
   if(first===null) continue; const k=nome+' · '+modo;
   add(k,per,(B[20].c-B[first].o)/pip*sg-1.5); add(k+' | mezzanotte',per,notte); }
 }
}
const st=g=>g?(g.n+' '+(100*g.v/g.n).toFixed(0)+'% '+(g.p/g.n).toFixed(1)+'/tr'):'-';
console.log('SIS='+SIS+'  (prima ora che accende, uscita 21 GMT; a destra la stessa carta entrando a mezzanotte)');
for(const k of Object.keys(G)) if(!k.endsWith('| mezzanotte')) console.log(k.padEnd(42),['2020-23','2024-26','vivo'].map(p=>st(G[k][p])+(G[k+' | mezzanotte']?' (mn '+(G[k+' | mezzanotte'][p]?(G[k+' | mezzanotte'][p].p/G[k+' | mezzanotte'][p].n).toFixed(1):'-')+')':'')).join(' | '));
