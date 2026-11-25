// BILANCIA, prima simulazione (25/11/2026, chiesta da Edu: "ogni peso vale 1 e poi vediamo").
// Ogni indicazione scritta dal QMDJ (ogni pezzo del "motivo") vale 1 punto, per "segue", per "non segue" o per "il cross sale".
// Si aggiungono: Lio (1 punto; forte +1) e lo storico di quel tipo di trade (cross + forza + col/contro il trend) contato solo
// sui trade PRECEDENTI alla data (almeno 20): sotto il 50% = 1 punto contro Lio.
// Uso: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi>; node qmdj_lavoro/bilancia_sim.js
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend&&x.date<='2026-10-16').sort((a,b)=>a.date<b.date?-1:1);
function punti(motivo){let s=0,n=0,l=0,base=0;const el=[];
  for(const m of (motivo||'').split(' · ')){let v=0;
    if(/il cross tende a salire/.test(m)){l++;el.push(['sale',m]);continue;}
    if(/fermo|superato|eccita|si legge con DS e HS/.test(m))v=0;
    else if(/^il giorno controlla l'ora|^l'ora genera il giorno|^il giorno genera l'ora|^l'ora controlla il giorno/.test(m)){
      v=/^il giorno controlla|^l'ora genera/.test(m)?1:-1; if(/反侮|non generat/.test(m))v=-v; base=v;}
    else if(/il controllo tiene/.test(m))v=base;
    else if(/ribaltato/.test(m))v=-base;
    else if(/non segue/.test(m))v=-1; else if(/segue/.test(m))v=1;
    else if(/vince il giorno/.test(m))v=1; else if(/vince l'ora/.test(m))v=-1;
    if(v>0){s++;el.push(['segue',m]);}else if(v<0){n++;el.push(['non segue',m]);}}
  return {s,n,l,el};}
function qm(ch,trend){let p=punti(Q.lettura(ch,trend,'zfty').motivo);if(!(p.s+p.n+p.l))p=punti(Q.lettura(ch,trend,'dshs').motivo);
  const opp=trend==='LONG'?'SHORT':'LONG';const P={LONG:0,SHORT:0};P[trend]+=p.s;P[opp]+=p.n;P.LONG+=p.l;return {P,el:p.el};}
module.exports={punti,qm};
if(require.main!==module)return;
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
const ST={};const G={};const add=(k,pe,win,pip)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[pe];g[0]++;g[1]+=win;g[2]+=pip;};
const QA=[[0,0,0,0],[0,0,0,0]];
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);const pe=x.date<'2024-01-01'?0:1;
  const win=x.liDir===x.real,pip=win?Math.abs(x.move):-Math.abs(x.move);const opp=x.liDir==='LONG'?'SHORT':'LONG';
  const q=qm(ch,x.trend);
  // QMDJ da solo: verso della bilancia
  const qd=q.P.LONG>q.P.SHORT?'LONG':q.P.SHORT>q.P.LONG?'SHORT':null;if(qd){QA[pe][0]++;const w=qd===x.real;QA[pe][1]+=w;QA[pe][2]+=w?Math.abs(x.move):-Math.abs(x.move);}else QA[pe][3]++;
  const kq=q.P[x.liDir]-q.P[opp];
  const sk=x.cross+x.liForza+(x.liDir===x.trend?'c':'k');const h=ST[sk]||[0,0];const stor=(h[0]>=20&&h[1]/h[0]<0.5)?-1:0;
  const lio=1+(x.liForza==='forte'?1:0);
  const b=lio+kq+stor;
  const cl=v=>v<=-2?'-2 o meno':v>=4?'+4 o piu':(v>0?'+':'')+v;
  add('A bilancia totale '+cl(b).padStart(9),pe,win,pip);
  add('B solo QMDJ (pro Lio - contro) '+cl(kq).padStart(9),pe,win,pip);
  add('C storico '+(stor?'negativo':'non negativo'),pe,win,pip);
  add('D '+(b>0?'bilancia per Lio':b===0?'bilancia pari':'bilancia contro Lio'),pe,win,pip);
  add('E '+x.liForza+' | '+(b>0?'per Lio':b===0?'pari':'contro Lio'),pe,win,pip);
  h[0]++;h[1]+=win;ST[sk]=h;}
console.log('QMDJ da solo come bilancia:',QA.map(a=>a[0]+' carte '+pct(a[1],a[0])+' '+a[2]+' pip, pari '+a[3]).join(' | '));
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(44),String(a[0]).padStart(5),pct(a[1],a[0]),String(a[2]).padStart(6),'|',String(b[0]).padStart(5),pct(b[1],b[0]),String(b[2]).padStart(6));}
