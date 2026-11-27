// 27/11/2026 (Edu: "Ore qimen"): l'ora del qimen per scegliere QUANDO fare la seconda entrata sui trade di Lio forti e medi.
// Seconda entrata all'apertura della prima ora dello schema (02-16 GMT) nel verso di Lio, uscita 21:00, 1,5 pip di spread.
// Confronto: la stessa ora dell'orologio nei giorni/ore senza schema (attesa per ora GMT), e la regola del ritracciamento (0,2 del campo, 02-07).
// Uso: node qmdj_lavoro/ore_seconda.js   (serve /tmp/dump.json da misura_vivo.js su tutto lo storico)
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', STs='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const D=JSON.parse(fs.readFileSync('/tmp/dump.json')).filter(x=>x.liv==='LI'&&x.liDir&&x.liForza!=='debole');
const SP=1.5, idx={}, campo={};
for(const c in H){ const by={}; for(const b of H[c]){ (by[b.t.slice(0,10)]||(by[b.t.slice(0,10)]={}))[+b.t.slice(11,13)]=b; }
  const ks=Object.keys(by).sort().filter(d=>{const w=new Date(d+'T00:00:00Z').getUTCDay();return w>=1&&w<=5;}); const G=[];
  for(const d of ks){ const B=by[d]; if(!B[0]||!B[21]) continue; const v=[B[0].o]; for(let h=0;h<=21;h++) if(B[h]) v.push(B[h].c); G.push([d,Math.max(...v)-Math.min(...v)]); idx[c+'|'+d]=B; }
  for(let i=20;i<G.length;i++){ let s=0; for(let j=i-20;j<i;j++) s+=G[j][1]; campo[c+'|'+G[i][0]]=s/20; } }
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const XUN={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'}, PEL={1:'a',2:'t',3:'l',4:'l',6:'m',7:'m',8:'t',9:'f'}, GEN={l:'f',f:'t',t:'m',m:'a',a:'l'};
const R={}; const add=(k,d,p)=>{ if(p==null||isNaN(p)) return; const g=(R[k]||(R[k]=[[0,0,0],[0,0,0]]))[d<'2024'?0:1]; g[0]++; if(p>0)g[1]++; g[2]+=p; };
const BASE={}; // attesa per ora GMT: seconda entrata all'apertura dell'ora h nelle ore SENZA schema
const rows=[];
for(const x of D){ const k=x.cross+'|'+x.date, B=idx[k], atr=campo[k]; if(!B||!atr) continue; const pip=x.cross.includes('JPY')?0.01:0.0001;
  const seed=parseInt(f3(B[0].o),10); if(!seed) continue; const p=x.date.split('-').map(Number);
  let ch; try{ ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]); }catch(e){ continue; }
  const s=x.liDir==='LONG'?1:-1, O=B[0].o, C=B[21].c, p1=s*(C-O)/pip-SP;
  let ds=ch.giorno[0]; if(ds==='甲') ds=XUN[BR[((BR.indexOf(ch.giorno[1])-STs.indexOf(ch.giorno[0]))%12+12)%12]];
  let pd=null,pc=null; for(let q=1;q<=9;q++){ if(q!==5&&(ch.palaces[q].tiH===ds||ch.palaces[q].ti2H===ds)) pd=q; if(q!==5&&ch.palaces[q].deity==='Commander') pc=q; }
  const dsOk=!!(pd&&pc&&(pd===pc||GEN[PEL[pd]]===PEL[pc]||GEN[GEN[PEL[pd]]]===PEL[pc]));
  const ore=QO.ore(ch,null); const sch={};   // ora GMT d'inizio -> info
  for(const o of ore){ if(!o||!o.ecc) continue; const hs=QO.oreGMT(o.ramo); if(!hs.length) continue; sch[hs[0]]=o; }
  const ent=h=>B[h]?s*(C-B[h].o)/pip-SP:null;
  const contro=h=>B[h]?-s*(B[h].o-O)/atr:null;   // quanto il prezzo e' andato contro Lio all'apertura dell'ora (in campi)
  // ritracciamento cablato: ore piene 02-07, contro Lio >= 0,2 del campo
  let hr=null; for(let h=2;h<=7;h++){ if(B[h]&&contro(h)>=0.2){ hr=h; break; } }
  const bl=Q.bilancia(ch,x.trend)||{}; const qv=!bl.dir?'qimen fermo':bl.dir===x.liDir?'qimen con Lio':'qimen contro Lio';
  rows.push({x,B,atr,pip,s,O,C,p1,ch,dsOk,sch,ent,contro,hr,qv});
}
// attesa per ora dell'orologio (tutte le ore, tutti i trade forti e medi)
for(const r of rows) for(let h=1;h<=16;h++){ const e=r.ent(h); if(e==null) continue; const g=(BASE[h]||(BASE[h]=[[0,0,0],[0,0,0]]))[r.x.date<'2024'?0:1]; g[0]++; if(e>0)g[1]++; g[2]+=e; }
const att=(h,d)=>{const g=BASE[h][d<'2024'?0:1]; return g[2]/g[0];};
const prima=(r,ok,da,a)=>{ for(let h=da;h<=a;h++){ const o=r.sch[h]; if(o&&ok(o,r)&&r.B[h]) return h; } return null; };
const DEF={
 'A schema largo (stelo dell\'ora col Commander)': (o,r)=>!o.spento,
 'B schema completo (ramo opposto/identico/genera, carta normale, non spento)': (o,r)=>!o.spento&&o.carta==='normale'&&o.forma!=='solo stelo',
 'C schema completo + stelo del giorno positivo': (o,r)=>!o.spento&&o.carta==='normale'&&o.forma!=='solo stelo'&&r.dsOk,
 'D ramo opposto (clash)': (o,r)=>!o.spento&&o.carta==='normale'&&o.forma==='opposta',
 'E ramo identico': (o,r)=>!o.spento&&o.carta==='normale'&&o.forma==='identica',
 'F ora propria del Commander (甲 sotto il suo stelo)': (o,r)=>o.propria,
};
for(const r of rows){ const d=r.x.date; add('0 prima entrata 00:00 (forti e medi)',d,r.p1);
  if(r.hr!=null){ add('1 RITRACCIAMENTO cablato: seconda entrata',d,r.ent(r.hr)); add('1 RITRACCIAMENTO cablato: attesa di quell\'ora',d,att(r.hr,d)); }
  for(const n in DEF){ const ok=DEF[n];
    for(const [da,a,lab] of [[2,7,'02-07'],[2,16,'02-16']]){ const h=prima(r,ok,da,a); if(h==null) continue; const e=r.ent(h), cg=r.contro(h);
      add('2 '+n+' | '+lab+' | seconda entrata all\'ora',d,e); add('2 '+n+' | '+lab+' | attesa di quell\'ora dell\'orologio',d,att(h,d));
      if(lab==='02-16'){ if(cg>=0.2){ add('3 '+n+' | ora dello schema E prezzo contro Lio >= 0,2',d,e); add('3 '+n+' | ora dello schema E prezzo contro Lio >= 0,2 | attesa',d,att(h,d)); }
        else if(cg>0) add('3 '+n+' | ora dello schema, prezzo contro Lio meno di 0,2',d,e); else add('3 '+n+' | ora dello schema, prezzo gia\' a favore di Lio',d,e); } }
    // ritracciamento raggiunto (02-07): c'e' un'ora dello schema dopo? entrare li' invece che subito
    if(r.hr!=null){ let h2=null; for(let h=r.hr;h<=16;h++){ const o=r.sch[h]; if(o&&ok(o,r)&&r.B[h]){ h2=h; break; } }
      if(h2!=null){ add('4 '+n+' | ritracciamento raggiunto, poi ora dello schema: entro SUBITO',d,r.ent(r.hr)); add('4 '+n+' | ritracciamento raggiunto, poi ora dello schema: ASPETTO l\'ora',d,r.ent(h2)); }
      // il ritracciamento e' stato raggiunto proprio in un'ora dello schema (quella appena finita o quella che comincia)?
      const os=r.sch[r.hr]||r.sch[r.hr-1]||r.sch[r.hr-2]; const dentro=!!(os&&ok(os,r));
      add('5 '+n+' | ritracciamento '+(dentro?'DENTRO o all\'inizio di':'fuori da')+' un\'ora dello schema',d,r.ent(r.hr)); }
  }
  // movimento DENTRO l'ora dello schema nel verso di Lio (due barre), in millesimi di campo, contro le altre ore
  for(let h=1;h<=19;h+=2){ const b1=r.B[h], b2=r.B[h+1]; if(!b1||!b2) continue; const m=r.s*(b2.c-b1.o)/r.atr*1000, o=r.sch[h];
    const t=o&&!o.spento&&o.carta==='normale'&&o.forma!=='solo stelo'?'schema completo':o&&!o.spento?'solo stelo o carta fan/fu yin':'ora normale';
    add('6 movimento dell\'ora nel verso di Lio (millesimi di campo) | '+t,d,m); }
}
// 7: l'ora dello schema completo divisa per il verdetto del qimen (la direzione la da' la carta), contro l'attesa della stessa ora nello stesso gruppo
const BQ={}; for(const r of rows) for(let h=1;h<=16;h++){ const e=r.ent(h); if(e==null) continue; const g=(BQ[r.qv+h]||(BQ[r.qv+h]=[[0,0],[0,0]]))[r.x.date<'2024'?0:1]; g[0]++; g[1]+=e; }
for(const r of rows){ const d=r.x.date, h=prima(r,DEF['B schema completo (ramo opposto/identico/genera, carta normale, non spento)'],2,16);
  add('7 prima entrata 00:00 | '+r.qv,d,r.p1); if(h==null) continue; const g=BQ[r.qv+h][d<'2024'?0:1];
  add('7 schema completo, seconda entrata all\'ora | '+r.qv,d,r.ent(h)); add('7 schema completo, attesa di quell\'ora nello stesso gruppo | '+r.qv,d,g[1]/g[0]);
  const b1=r.B[h], b2=r.B[h+1]; if(b1&&b2) add('7 movimento dentro l\'ora dello schema nel verso di Lio (millesimi di campo) | '+r.qv,d,r.s*(b2.c-b1.o)/r.atr*1000); }
const f=g=>g[0]?(String(g[0]).padStart(5)+' '+(100*g[1]/g[0]).toFixed(1).padStart(5)+'% '+(g[2]/g[0]>=0?'+':'')+(g[2]/g[0]).toFixed(1).padStart(5)):'    0';
console.log(''.padEnd(96),'2020-23: casi vinti media | 2024-26');
for(const k of Object.keys(R).sort()) console.log(k.padEnd(96),f(R[k][0]),'|',f(R[k][1]));
console.log('\nattesa per ora GMT (seconda entrata all\'apertura dell\'ora, tutti i forti e medi):');
for(let h=1;h<=16;h++) console.log(String(h).padStart(2),f(BASE[h][0]),'|',f(BASE[h][1]));
