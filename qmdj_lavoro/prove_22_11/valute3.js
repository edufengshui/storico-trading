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

const PBR={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'};
const palBr=b=>{for(const p in PBR)if(PBR[p].includes(b))return +p;};
const B={'ZF':A.ZF,'Wu':A['Wu cielo'],'Birth':A.Birth,'DS':A.DS,'Tai Sui':c=>palBr(c.anno[1]),'Open':A.Open};
const BRs='子丑寅卯辰巳午未申酉戌亥',ST='甲乙丙丁戊己庚辛壬癸';
const vuoti=gz=>{const i=(()=>{for(let k=0;k<60;k++)if(ST[k%10]===gz[0]&&BRs[k%12]===gz[1])return k;})();const s=Math.floor(i/10)*10;return BRs[(s+10)%12]+BRs[(s+11)%12];};
const pieno=(c,p,gz)=>{const v=vuoti(gz);return ![...PBR[p]].some(b=>v.includes(b));};

const XUN='戊己庚辛壬癸';const st60=gz=>{for(let k=0;k<60;k++)if(ST[k%10]===gz[0]&&BRs[k%12]===gz[1])return k;};
const stemOfGz=gz=>gz[0]==='甲'?XUN[Math.floor(st60(gz)/10)]:gz[0];
const palSt=(c,y)=>{for(let p=1;p<=9;p++)if(p!==5&&(c.palaces[p].tiH===y||c.palaces[p].ti2H===y))return p;return null;};
B['Tai Sui']=c=>palSt(c,stemOfGz(c.anno));
const seg=r=>(r.trend==='LONG')===(r.mv>0);
console.log('== attore interno -> SEGUE | interno · esterno   (base 50,0% 49,6%)');
for(const k in B){const G={interno:[[0,0],[0,0]],esterno:[[0,0],[0,0]]};
  for(const r of rows){const p=B[k](r.ch);if(!p)continue;const g=G[lato(r.ch,p)][per(r)];g[0]++;if(seg(r))g[1]++;}
  const f=x=>pct(x[0][1],x[0][0])+' '+pct(x[1][1],x[1][0])+' ('+x[0][0]+','+x[1][0]+')';console.log(k.padEnd(8),f(G.interno),'|',f(G.esterno));}
console.log('== per trend');
for(const tr of ['LONG','SHORT'])for(const k in B){const G={interno:[[0,0],[0,0]],esterno:[[0,0],[0,0]]};
  for(const r of rows){if(r.trend!==tr)continue;const p=B[k](r.ch);if(!p)continue;const g=G[lato(r.ch,p)][per(r)];g[0]++;if(seg(r))g[1]++;}
  const f=x=>pct(x[0][1],x[0][0])+' '+pct(x[1][1],x[1][0]);console.log(tr,k.padEnd(8),f(G.interno),'|',f(G.esterno));}
console.log('== quanti dei sei interni -> SEGUE');
{const G={};for(const r of rows){let n=0,ok=true;for(const k in B){const p=B[k](r.ch);if(!p){ok=false;break;}if(lato(r.ch,p)==='interno')n++;}if(!ok)continue;const g=(G[n]=G[n]||[[0,0],[0,0]])[per(r)];g[0]++;if(seg(r))g[1]++;}
 for(const n in G)console.log(n,pct(G[n][0][1],G[n][0][0]),pct(G[n][1][1],G[n][1][0]),'('+G[n][0][0]+','+G[n][1][0]+')');}
console.log('== coppie: primo interno e secondo esterno (ie) ecc -> SEGUE');
const ks=Object.keys(B);for(let a=0;a<ks.length;a++)for(let b=a+1;b<ks.length;b++){const G={};for(const r of rows){const p=B[ks[a]](r.ch),q=B[ks[b]](r.ch);if(!p||!q)continue;const k=lato(r.ch,p)[0]+lato(r.ch,q)[0];const g=(G[k]=G[k]||[[0,0],[0,0]])[per(r)];g[0]++;if(seg(r))g[1]++;}
 console.log((ks[a]+'/'+ks[b]).padEnd(16),['ii','ie','ei','ee'].map(k=>k+' '+pct(G[k][0][1],G[k][0][0])+' '+pct(G[k][1][1],G[k][1][0])).join(' | '));}
