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
const G={}, add=(k,per,p)=>{const g=((G[k]=G[k]||{})[per]=G[k][per]||{n:0,v:0,p:0});g.n++;if(p>0)g.v++;g.p+=p;};
const det=[];
for(const k in M){ const c=M[k]; if(!c.trend||!c.liDir||!c.real) continue; const B=idx[k]; if(!B||!B[0]||!B[20]) continue;
 const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const z=Q.lettura(ch,c.trend,'zfty'), d=Q.lettura(ch,c.trend,'dshs'); const L=(z&&z.dir&&z.palDecide)?z:(d&&d.dir&&d.palDecide)?d:null;
 const per=c.date<'2024'?'2020-23':c.date<'2026-09-29'?'2024-26':'vivo';
 const lioSg=c.liDir==='LONG'?1:-1, lioDay=(B[20].c-B[0].o)/pip*lioSg-1.5; add('Lio tutta la giornata',per,lioDay);
 if(!L){ add('nessuna carta che decide',per,lioDay); continue; }
 const q=L.palDecide, cSg=L.dir==='LONG'?1:-1, tSg=c.trend==='LONG'?1:-1;
 const oapH=new Set(); for(let i=0;i<12;i++){ const br=BR[i], gz=QO.hourGZ(ch.giorno[0],br), gm=QO.oreGMT(br); if(!gm.length) continue;
   if(!ramoIn(ch,q,br)) continue; const ps=palStelo(ch,gz); if(!(ps.includes(q)||ps.some(x=>genera(x,q)))) continue; gm.forEach(h=>oapH.add(h)); }
 const mv=[]; for(let h=0;h<=20;h++) if(B[h]) mv.push([h,(B[h].c-B[h].o)/pip]); if(mv.length<18) continue;
 const ab=mv.map(x=>Math.abs(x[1])).sort((a,b)=>a-b), med=ab[Math.floor(ab.length/2)];
 for(const [h,m] of mv){ if(!(Math.abs(m)>=4*med&&Math.abs(m)>=25)) continue;
   const k=oapH.has(h)?'colpo DENTRO un ora OAP':'colpo FUORI dalle ore OAP';
   add(k+' · verso della carta',per,m*cSg); add(k+' · verso di Lio',per,m*lioSg); add(k+' · verso del trend',per,m*tSg);
   add('tutti i colpi · fascia '+(h<7?'00-06':h<12?'07-11':h<15?'12-14':'15-20')+' · dentro OAP? '+(oapH.has(h)?'si':'no')+' · verso carta',per,m*cSg);
 }
}
const st=g=>g?(g.n+' '+(100*g.v/g.n).toFixed(0)+'% '+Math.round(g.p)+' ('+(g.p/g.n).toFixed(1)+'/tr)'):'-';
for(const k in G) console.log(k.padEnd(62),['2020-23','2024-26','vivo'].map(p=>st(G[k][p])).join(' | '));

