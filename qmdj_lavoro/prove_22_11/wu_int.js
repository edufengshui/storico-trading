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
tab('Wu cielo',r=>{const p=wuPal(r.ch,'ti');return p&&lato(r.ch,p);});
tab('Wu terra',r=>{const c=r.ch;for(let p=1;p<=9;p++)if(c.palaces[p]&&c.palaces[p].diH==='戊')return p===5?'centro':lato(c,p);});
tab('cielo x terra',r=>{const c=r.ch,p=wuPal(c,'ti');let q=null;for(let k=1;k<=9;k++)if(c.palaces[k]&&c.palaces[k].diH==='戊')q=k;return p&&q&&('cielo '+lato(c,p)+' / terra '+(q===5?'centro':lato(c,q)));});
tab('Wu cielo x trend',r=>{const p=wuPal(r.ch,'ti');return p&&lato(r.ch,p)+' trend '+r.trend;});
tab('Wu cielo x dun',r=>{const p=wuPal(r.ch,'ti');return p&&r.ch.dun+' '+lato(r.ch,p);});
tab('Wu cielo e ZF',r=>{const p=wuPal(r.ch,'ti'),z=zfPal(r.ch);return p&&z&&('Wu '+lato(r.ch,p)+' / ZF '+lato(r.ch,z));});
