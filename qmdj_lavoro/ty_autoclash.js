// 27/11/2026, lettura di Edu su USDCAD 10/11/2026: "TY genera ZF e l'ora Ji Wei e Geng Shen autoclashano il TY".
// Ora di autoclash di un palazzo: lo stelo dell'ora sta in quel palazzo (cielo o terra) e il ramo dell'ora clasha un ramo del palazzo.
// Misura su tutte le carte con trend (dump di misura_vivo), ore cinesi 01-19 GMT: movimento dell'ora nel verso del trend
// (millesimi di campo medio), ampiezza rispetto alla media di quell'ora dell'orologio, ora piu' forte del giorno.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', STs='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const D=JSON.parse(fs.readFileSync('/tmp/dump.json')).filter(x=>x.trend&&x.real);
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const EL={1:4,2:2,3:0,4:0,6:3,7:3,8:2,9:1}, gen=(a,b)=>(EL[a]+1)%5===EL[b], ctl=(a,b)=>(EL[a]+2)%5===EL[b];
const HOME={Grass:1,Rice:2,Aggressor:3,Assistant:4,Heart:6,Pillar:7,Official:8,Hero:9}, OPP={1:9,9:1,2:8,8:2,3:7,7:3,4:6,6:4};
const vis=gz=>gz[0]!=='甲'?gz[0]:LIU[BR[((BR.indexOf(gz[1])-STs.indexOf(gz[0]))%12+12)%12]];
const cl=(a,b)=>Math.abs(BR.indexOf(a)-BR.indexOf(b))===6;
const idx={}, campo={}, medOra={};
for(const c in H){ const by={}; for(const b of H[c]) (by[b.t.slice(0,10)]||(by[b.t.slice(0,10)]={}))[+b.t.slice(11,13)]=b;
  const G=[]; for(const d of Object.keys(by).sort()){ const w=new Date(d+'T00:00:00Z').getUTCDay(); if(w<1||w>5) continue; const B=by[d]; if(!B[0]||!B[21]) continue;
    const v=[B[0].o]; for(let h=0;h<=21;h++) if(B[h]) v.push(B[h].c); G.push([d,Math.max(...v)-Math.min(...v)]); idx[c+'|'+d]=B; }
  for(let i=20;i<G.length;i++){ let s=0; for(let j=i-20;j<i;j++) s+=G[j][1]; campo[c+'|'+G[i][0]]=s/20; } }
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const rows=[];
for(const x of D){ const k=x.cross+'|'+x.date, B=idx[k], atr=campo[k]; if(!B||!atr) continue; const seed=parseInt(f3(B[0].o),10); if(!seed) continue; const p=x.date.split('-').map(Number);
  let c; try{ c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]); }catch(e){ continue; } if(!c) continue;
  let pc=null,pty=null; for(let q=1;q<=9;q++) if(q!==5&&c.palaces[q].deity==='Commander') pc=q; if(!pc) continue; for(let q=1;q<=9;q++) if(q!==5&&HOME[c.palaces[q].star]===pc) pty=q; if(!pty) continue;
  const rel=pty===pc?'fu yin (TY con lo ZF)':gen(pty,pc)?'TY genera ZF':gen(pc,pty)?'ZF genera TY':ctl(pc,pty)?'ZF controlla TY':ctl(pty,pc)?'TY controlla ZF':'paralleli';
  const s=x.trend==='LONG'?1:-1, per=x.date<'2024'?0:1, ore=[];
  for(let i=1;i<=9;i++){ const h=2*i-1; if(!B[h]||!B[h+1]) { ore.length=0; break; } const gz=QO.hourGZ(c.giorno[0],BR[i]), st=vis(gz), m=s*(B[h+1].c-B[h].o)/atr*1000;
    const aut=q=>{ const P=c.palaces[q]; const cielo=[P.tiH,P.ti2H].includes(st), terra=[P.diH,P.di2H].includes(st); if(!cielo&&!terra) return null; if(!PB[q].split('').some(b=>cl(b,gz[1]))) return null; return cielo&&terra?'cielo e terra':cielo?'cielo':'terra'; };
    ore.push({i,gz,m,ty:aut(pty),zf:aut(pc)}); const g=(medOra[x.cross+per+i]||(medOra[x.cross+per+i]=[0,0])); g[0]+=Math.abs(m); g[1]++; }
  if(ore.length) rows.push({x,per,rel,ore,vuotoTY:false}); }
const R={}; const add=(k,per,o,forte,x)=>{ const g=(R[k]||(R[k]=[[0,0,0,0,0],[0,0,0,0,0]]))[per]; g[0]++; if(o.m>0)g[1]++; g[2]+=o.m; const mo=medOra[x.cross+per+o.i]; g[3]+=Math.abs(o.m)/(mo[0]/mo[1]); if(forte)g[4]++; };
for(const r of rows){ const mx=Math.max(...r.ore.map(o=>Math.abs(o.m))); let n=r.ore.filter(o=>o.ty).length;
  for(const o of r.ore){ const forte=Math.abs(o.m)===mx;
    add('0 tutte le ore',r.per,o,forte,r.x); add('1 '+r.rel+' | tutte le ore',r.per,o,forte,r.x);
    if(o.ty){ add('2 autoclash del TY | tutte le carte',r.per,o,forte,r.x); add('3 autoclash del TY | '+r.rel,r.per,o,forte,r.x); if(r.rel==='TY genera ZF') add('4 TY genera ZF, autoclash del TY | stelo dell\'ora in '+o.ty,r.per,o,forte,r.x); }
    if(o.zf){ add('5 autoclash dello ZF | tutte le carte',r.per,o,forte,r.x); add('6 autoclash dello ZF | '+r.rel,r.per,o,forte,r.x); } }
  if(r.rel==='TY genera ZF'){ const tot=r.ore.reduce((a,o)=>a+o.m,0), g=(R['7 TY genera ZF | giornata 01-19 GMT nel verso del trend | ore di autoclash del TY: '+(n>=2?'2 o piu\'':n)]||(R['7 TY genera ZF | giornata 01-19 GMT nel verso del trend | ore di autoclash del TY: '+(n>=2?'2 o piu\'':n)]=[[0,0,0,0,0],[0,0,0,0,0]]))[r.per]; g[0]++; if(tot>0)g[1]++; g[2]+=tot; g[3]+=1; } }
const f=g=>g[0]?String(g[0]).padStart(6)+' '+(100*g[1]/g[0]).toFixed(1).padStart(5)+'% '+(g[2]/g[0]>=0?'+':'')+(g[2]/g[0]).toFixed(1).padStart(6)+' amp '+(g[3]/g[0]).toFixed(2)+' forte '+(100*g[4]/g[0]).toFixed(1).padStart(4)+'%':'     0';
console.log(''.padEnd(88),'2020-23: ore, % col trend, media (millesimi di campo), ampiezza relativa, ora piu\' forte del giorno | 2024-26');
for(const k of Object.keys(R).sort()) console.log(k.padEnd(88),f(R[k][0]),'|',f(R[k][1]));
