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

const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));const live=[];
for(const d of Object.keys(reg).sort()){if(d<'2026-10-17')continue;for(const y of reg[d]){if(!y.trend||y.esito==null||!y.seed||!y.signal)continue;
  const tr=/LONG|up/i.test(y.trend)?'LONG':/SHORT|down/i.test(y.trend)?'SHORT':null;if(!tr)continue;const mv=y.esito*(y.signal==='LONG'?1:-1);if(!mv)continue;
  const p=d.split('-').map(Number);const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((y.seed-1)%12+12)%12]);if(ch)live.push({cross:y.cross,d,trend:tr,mv,ch,live:1});}}
const cond=r=>{const p=wuPal(r.ch,'ti'),z=zfPal(r.ch);return p&&z&&lato(r.ch,p)==='interno'&&lato(r.ch,z)==='esterno';};
const opp=t=>t==='LONG'?'SHORT':'LONG';
function run(label,mode){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0,ch:0,chok:0}));
  for(const r of rows.concat(live)){const z=Q.lettura(r.ch,r.trend,'zfty');let dir=z&&z.dir||null;const old=dir;
    if(cond(r)){ if(mode==='sempre')dir=r.trend; else if(mode==='muto'&&!dir)dir=r.trend; else if(mode==='ribalta'&&dir===opp(r.trend))dir=r.trend; else if(mode==='tace'&&dir===opp(r.trend))dir=null; }
    const g=t[r.live?2:per(r)]; if(dir!==old){g.ch++; if(dir&&(dir==='LONG')===(r.mv>0))g.chok++;}
    if(!dir)continue;g.n++;const w=(dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(26),t.map(g=>g.n+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip+' (camb '+g.ch+', giuste '+g.chok+')').join(' | '));}

const PY={'乙':'Yi','丙':'Bing','丁':'Ding','戊':'Wu','己':'Ji','庚':'Geng','辛':'Xin','壬':'Ren','癸':'Gui'};
const sotto=c=>{for(let p=1;p<=9;p++){if(p===5)continue;const d=c.palaces[p];if(d.tiH==='戊'||d.ti2H==='戊')return d.diH;}return null;};
const all=rows.concat(live);
function tab(tit,fk){console.log('\n== '+tit);const G={};
  for(const r of all){const k=fk(r);if(k==null)continue;const g=(G[k]=G[k]||[0,1,2].map(()=>[0,0,0,new Set()]))[r.live?2:per(r)];g[0]++;g[3].add(r.d);if((r.trend==='LONG')===(r.mv>0))g[1]++;if(r.mv>0)g[2]++;}
  for(const k of Object.keys(G).sort()){const g=G[k];console.log(String(k).padEnd(34),'segue',pct(g[0][1],g[0][0]),pct(g[1][1],g[1][0]),'vivo',g[2][1]+'/'+g[2][0],'| sale',pct(g[0][2],g[0][0]),pct(g[1][2],g[1][0]),'| carte',g[0][0],g[1][0],'gg',g[0][3].size,g[1][3].size);}}

const BEL={'子':'W','亥':'W','寅':'L','卯':'L','巳':'F','午':'F','申':'M','酉':'M','辰':'E','戌':'E','丑':'E','未':'E'};
const SEAS={'寅':'L','卯':'L','辰':'L','巳':'F','午':'F','未':'F','申':'M','酉':'M','戌':'M','亥':'W','子':'W','丑':'W'};
const tempo=(pe,me)=>pe===me?4:GEN[me]===pe?3:GEN[pe]===me?2:CTL[pe]===me?1:0;
const NOME={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li'};
const wp=c=>wuPal(c,'ti');
const fz=c=>{const p=wp(c),m=c.mese[1];return tempo(PEL[p],BEL[m])+tempo(PEL[p],SEAS[m]);};
const cls=c=>{const f=fz(c);return f>=5?'1 timely':f>=3?'2 medio':'3 fuori stagione';};
const grp=x=>'乙庚辛'.includes(x)?'A controlla/drena':'B altri';
const rel=x=>x==='乙'?'1 controlla Wu (Yi)':'庚辛'.includes(x)?'2 drena Wu (Geng, Xin)':'壬癸'.includes(x)?'3 controllato da Wu':'丙丁'.includes(x)?'4 genera Wu':x==='戊'?'5 Wu su Wu':'6 Ji';
tab('palazzo di Wu timely? (da solo)',r=>wp(r.ch)&&cls(r.ch));
tab('regola x timely',r=>{const x=sotto(r.ch);return x&&grp(x)+' | '+cls(r.ch);});
tab('rapporto x timely',r=>{const x=sotto(r.ch);return x&&rel(x).padEnd(24)+' | '+cls(r.ch);});
tab('palazzo di Wu (da solo)',r=>{const p=wp(r.ch);return p&&NOME[p];});
tab('regola x palazzo',r=>{const x=sotto(r.ch),p=wp(r.ch);return x&&p&&NOME[p].padEnd(5)+grp(x);});
tab('regola x elemento del palazzo verso Wu',r=>{const x=sotto(r.ch),p=wp(r.ch);if(!x||!p)return null;const e=PEL[p];const k=e==='F'?'1 Fuoco (genera Wu)':e==='E'?'2 Terra (pari)':e==='M'?'3 Metallo (drena Wu)':e==='W'?'4 Acqua (Wu controlla)':'5 Legno (controlla Wu)';return k.padEnd(24)+grp(x);});
