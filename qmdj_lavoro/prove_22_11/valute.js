global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), T=require('/home/claude/trading/trend.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const ET=T.emaTrend||(global.XKDGTrend&&global.XKDGTrend.emaTrend);
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'};
const rows=[];
for(const cross in H){const pip=cross.includes('JPY')?0.01:0.0001;const D={};
  for(const b of H[cross]){const d=b.t.slice(0,10);(D[d]=D[d]||{})[+b.t.slice(11,13)]=b;}
  const days=Object.keys(D).sort().filter(d=>{const w=new Date(d+'T00:00:00Z').getUTCDay();return w>=1&&w<=5;});
  const closes=[];
  for(const d of days){const x=D[d];
    if(x[0]&&x[21]&&d>='2020-02-20'&&d<='2026-10-16'&&closes.length>=30){
      const tr=ET(closes).direction; if(tr==='up'||tr==='down'){
        const seed=parseInt(f3(x[0].o),10),p=d.split('-').map(Number);
        const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
        const mv=Math.round((x[21].c-x[0].o)/pip);
        if(ch&&mv!==0) rows.push({cross,d,trend:tr==='up'?'LONG':'SHORT',mv,ch});}}
    if(x[21]) closes.push(x[21].c);}}
const per=r=>r.d<'2024-01-01'?0:1;
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
console.log('carte',rows.filter(r=>per(r)==0).length,rows.filter(r=>per(r)==1).length);
function wuPal(c,plate){for(let p=1;p<=9;p++){if(p===5)continue;const d=c.palaces[p];
  if(plate==='ti'&&(d.tiH==='戊'||d.ti2H==='戊'))return p; if(plate==='di'&&(d.diH==='戊'))return p;}
  if(plate==='di'){for(let p=1;p<=9;p++)if(p!==5&&c.palaces[p].di2H==='戊')return p; return 2;} return null;}
function zfPal(c){for(let p=1;p<=9;p++)if(p!==5&&c.palaces[p].zhiFu)return p;return null;}
function relaz(a,b){if(a===b)return 'stesso palazzo';const x=PEL[a],y=PEL[b];if(x===y)return 'stesso elemento';
  if(CTL[x]===y)return 'ZF controlla Wu';if(CTL[y]===x)return 'Wu controlla ZF';if(GEN[x]===y)return 'ZF genera Wu';return 'Wu genera ZF';}

const INT=c=>c.dun==='yang'?[1,8,3,4]:[9,2,7,6];
const lato=(c,p)=>INT(c).includes(p)?'interno':'esterno';
function tab(tit,fk){console.log('\n== '+tit);const G={};
  for(const r of rows){const k=fk(r);if(!k)continue;const g=(G[k]=G[k]||[{n:0,s:0,u:0,g:new Set()},{n:0,s:0,u:0,g:new Set()}])[per(r)];
    g.n++;g.g.add(r.d);if((r.trend==='LONG')===(r.mv>0))g.s++;if(r.mv>0)g.u++;}
  for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(34),'| segue',pct(a.s,a.n),pct(b.s,b.n),'| sale',pct(a.u,a.n),pct(b.u,b.n),'| carte',a.n,b.n,'giorni',a.g.size,b.g.size);}}

const find=(c,f)=>{for(let p=1;p<=9;p++)if(p!==5&&f(c.palaces[p]))return p;return null;};
const stemOf=(gz,c)=>gz[0]; 
const A={
 'ZF':c=>zfPal(c),'ZS':c=>find(c,d=>d.zhiShi),'Wu cielo':c=>wuPal(c,'ti'),
 'View':c=>find(c,d=>(d.doorName||d.door)==='View'),'Birth':c=>find(c,d=>(d.doorName||d.door)==='Birth'),'Open':c=>find(c,d=>(d.doorName||d.door)==='Open'),
 'DS':c=>{const g=Q.lettura(c,'LONG','dshs');return g&&g.giornoOra&&g.giornoOra.palGiorno;},'HS':c=>{const g=Q.lettura(c,'LONG','dshs');return g&&g.giornoOra&&g.giornoOra.palOra;}};
function t2(tit,sel,up){console.log('\n== '+tit);for(const k in A){const G={interno:[[0,0],[0,0]],esterno:[[0,0],[0,0]]};
  for(const r of rows){if(!sel(r))continue;const p=A[k](r.ch);if(!p)continue;const g=G[lato(r.ch,p)][per(r)];g[0]++;if(up(r))g[1]++;}
  console.log(k.padEnd(9),'interno',pct(G.interno[0][1],G.interno[0][0]),pct(G.interno[1][1],G.interno[1][0]),'('+G.interno[0][0]+','+G.interno[1][0]+')','| esterno',pct(G.esterno[0][1],G.esterno[0][0]),pct(G.esterno[1][1],G.esterno[1][0]),'('+G.esterno[0][0]+','+G.esterno[1][0]+')');}}
t2('SALE il cross (prima valuta) - tutti',r=>true,r=>r.mv>0);
const usd=r=>r.cross.includes('USD');
t2('SALE il USD - 7 cross col dollaro',usd,r=>r.cross.startsWith('USD')?r.mv>0:r.mv<0);
// coppie: attore interno e avversario esterno
function pair(a,b){const G={};for(const r of rows){const p=A[a](r.ch),q=A[b](r.ch);if(!p||!q)continue;const k=lato(r.ch,p)[0]+lato(r.ch,q)[0];const g=(G[k]=G[k]||[[0,0],[0,0]])[per(r)];g[0]++;if(r.mv>0)g[1]++;}
  console.log((a+' / '+b).padEnd(18),Object.keys(G).sort().map(k=>k+' '+pct(G[k][0][1],G[k][0][0])+' '+pct(G[k][1][1],G[k][1][0])+' ('+G[k][0][0]+')').join(' | '));}
console.log('\n== coppie, SALE (i=interno e=esterno)');pair('DS','HS');pair('ZF','ZS');pair('ZF','Wu cielo');pair('Birth','View');pair('Wu cielo','Birth');pair('Wu cielo','View');
