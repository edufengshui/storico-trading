// S79 (Edu 25/11/2026): lo YS nutrito come PONTE fra chi controlla e chi e' controllato (ZF e TY). Col ponte vince il controllato.
// Ponte = palazzo dell'elemento di mezzo (non di ZF ne' di TY) che e' YS (stelo del mese, del giorno, dell'anno, View, Birth,
// Wu sopra Bing o Bing sopra Wu). Diviso per nutrito / non nutrito, e per tipo di YS.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
if(process.env.VIA)global.QMDJ_YS_VIA=process.env.VIA;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'};
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const f=Q.flussoQi(c);if(!f||f.zf===f.ty)continue;const zc=CTL[PEL[f.zf]]===PEL[f.ty],tc=CTL[PEL[f.ty]]===PEL[f.zf];if(!zc&&!tc)continue;
  const ctl=zc?f.zf:f.ty,sub=zc?f.ty:f.zf,sg=x.real===x.trend,vinceSub=zc?!sg:sg,nome=zc?'ZF controlla TY':'TY controlla ZF';
  const P=Q.azioniYS(c).filter(a=>GEN[PEL[ctl]]===PEL[a.q]&&GEN[PEL[a.q]]===PEL[sub]);
  if(!P.length){add('0 nessuno YS sul ponte: vince il controllato',x,vinceSub);add('0 '+nome+' · nessuno YS sul ponte: vince il controllato',x,vinceSub);continue;}
  const nut=P.some(a=>a.nutrito);
  add((nut?'1 ponte YS NUTRITO':'2 ponte YS non nutrito')+': vince il controllato',x,vinceSub);add((nut?'1 ':'2 ')+nome+' · ponte YS '+(nut?'NUTRITO':'non nutrito')+': vince il controllato',x,vinceSub);
  if(nut){const tipi=new Set();P.filter(a=>a.nutrito).forEach(a=>a.chi.forEach(t=>tipi.add(t)));tipi.forEach(t=>add('3 ponte nutrito con '+t+': vince il controllato',x,vinceSub));add('4 ponte nutrito, quanti tipi di YS: '+(tipi.size>=2?'2 o piu':'1'),x,vinceSub);}}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(66),String(a[0]).padStart(4),pct(a[1],a[0]).padStart(6),'|',String(b[0]).padStart(4),pct(b[1],b[0]).padStart(6));}
