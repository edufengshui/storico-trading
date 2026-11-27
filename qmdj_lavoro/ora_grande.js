// 27/11/2026: misura PARTENDO DAI MOVIMENTI (non dalla regola). Nei giorni con un'ora che domina la giornata, quell'ora e' un'ora di
// autoclash (TY o ZF, due modi) piu' spesso di quanto darebbe il caso? Caso = quota delle ore 01-19 GMT che sono di autoclash.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', STs='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const D=JSON.parse(fs.readFileSync('/tmp/dump.json')).filter(x=>x.trend&&x.real);
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'}, OPP={1:9,9:1,2:8,8:2,3:7,7:3,4:6,6:4};
const EL={1:4,2:2,3:0,4:0,6:3,7:3,8:2,9:1}, gen=(a,b)=>(EL[a]+1)%5===EL[b], ctl=(a,b)=>(EL[a]+2)%5===EL[b], HOME={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9};
const vis=gz=>gz[0]!=='甲'?gz[0]:LIU[BR[((BR.indexOf(gz[1])-STs.indexOf(gz[0]))%12+12)%12]], cl=(a,b)=>Math.abs(BR.indexOf(a)-BR.indexOf(b))===6;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const idx={}; for(const c in H) for(const b of H[c]) ((idx[c+'|'+b.t.slice(0,10)])||(idx[c+'|'+b.t.slice(0,10)]={}))[+b.t.slice(11,13)]=b;
const R={}; const add=(k,per,tot,hit,base,con)=>{ const g=(R[k]||(R[k]=[[0,0,0,0,0],[0,0,0,0,0]]))[per]; g[0]+=tot; g[1]+=hit; g[2]+=base; if(hit){g[3]++; g[4]+=con;} };
const SOGLIE=[[40,2.2,'ora >= 40 pip e >= 2,2 volte la terza'],[30,2,'ora >= 30 pip e >= 2 volte la terza'],[0,0,'l\'ora piu\' forte di ogni giorno']];
for(const x of D){ const B=idx[x.cross+'|'+x.date]; if(!B||!B[0]||!B[21]) continue; const pip=x.cross.includes('JPY')?0.01:0.0001, seed=parseInt(f3(B[0].o),10); if(!seed) continue; const p=x.date.split('-').map(Number);
  let c; try{ c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]); }catch(e){ continue; } if(!c) continue;
  let pc=null,pty=null; for(let q=1;q<=9;q++) if(q!==5&&c.palaces[q].deity==='Commander') pc=q; if(!pc) continue; for(let q=1;q<=9;q++) if(q!==5&&HOME[c.palaces[q].star]===pc) pty=q; if(!pty) continue;
  const rel=pty===pc?'fu yin':gen(pty,pc)?'TY genera ZF':gen(pc,pty)?'ZF genera TY':ctl(pc,pty)?'ZF controlla TY':ctl(pty,pc)?'TY controlla ZF':'paralleli';
  const s=x.trend==='LONG'?1:-1, per=x.date<'2024'?0:1, ore=[];
  const inP=(q,st)=>{const P=c.palaces[q];return [P.tiH,P.ti2H,P.diH,P.di2H].includes(st);};
  const auto=(q,gz)=>{ const st=vis(gz), b=gz[1]; if(inP(q,st)&&PB[q].split('').some(y=>cl(y,b))) return true; if(PB[q].includes(b)&&inP(OPP[q],st)) return true; return false; };
  for(let i=1;i<=9;i++){ const h=2*i-1; if(!B[h]||!B[h+1]){ ore.length=0; break; } const gz=QO.hourGZ(c.giorno[0],BR[i]); ore.push({gz,m:(B[h+1].c-B[h].o)/pip*s,ty:auto(pty,gz),zf:pty!==pc&&auto(pc,gz)}); }
  if(ore.length<9) continue; const srt=ore.slice().sort((a,b)=>Math.abs(b.m)-Math.abs(a.m)), top=srt[0];
  for(const [pp,rr,nome] of SOGLIE){ if(Math.abs(top.m)<pp||Math.abs(top.m)<rr*Math.abs(srt[2].m)) continue;
    for(const [lab,fn] of [['autoclash del TY',o=>o.ty],['autoclash dello ZF',o=>o.zf],['autoclash del TY o dello ZF',o=>o.ty||o.zf]]){
      const base=ore.filter(fn).length/9, con=top.m>0?1:0;
      add(nome+' | '+lab+' | tutte le carte',per,1,fn(top)?1:0,base,con); add(nome+' | '+lab+' | '+rel,per,1,fn(top)?1:0,base,con); } } }
const f=g=>g[0]?String(g[0]).padStart(5)+' giorni: l\'ora grande e\' di autoclash '+(100*g[1]/g[0]).toFixed(1).padStart(5)+'% (caso '+(100*g[2]/g[0]).toFixed(1)+'%)'+(g[3]?', e va col trend '+(100*g[4]/g[3]).toFixed(0)+'%':''):'0';
for(const k of Object.keys(R).sort()) console.log(k.padEnd(84),f(R[k][0]),'|',f(R[k][1]));
