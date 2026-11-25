// S79 (Edu 25/11/2026): lo Yong Shen nutrito agisce su ZF o TY. Per ogni azione (YS genera/controlla ZF o TY) conta se il mercato
// va dalla parte attesa: YS genera ZF o controlla TY -> segue; YS genera TY o controlla ZF -> non segue. Nutrito contro non nutrito.
// VIA=zfzs: il qi passa solo da ZF e Zhi Shi.  TIPO=1: divide anche per tipo di YS.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
if(process.env.VIA)global.QMDJ_YS_VIA=process.env.VIA;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const sg=x.real===x.trend,A=Q.azioniYS(c);let pro=0,con=0;
  for(const a of A){const n=a.nutrito?'NUTRITO':'non nutrito';
    for(const [az,lato] of [[a.suZF,'ZF'],[a.suTY,'TY']]){if(!az)continue;const atteso=(lato==='ZF')===(az==='genera');   // atteso segue?
      add(n+' | YS '+az+' '+lato+' -> '+(atteso?'segue':'non segue')+': avverato',x,atteso===sg);add(n+' | tutte le azioni: avverato',x,atteso===sg);
      if(process.env.TIPO&&a.nutrito)for(const t of a.chi)add('  tipo '+t+' (nutrito): avverato',x,atteso===sg);
      if(a.nutrito){if(atteso)pro++;else con++;}}}
  if(pro!==con)add('SOMMA degli YS nutriti ('+(Math.abs(pro-con)>=2?'scarto 2+':'scarto 1')+'): avverata',x,(pro>con)===sg);
  if(pro!==con)add('SOMMA degli YS nutriti, tutte: avverata',x,(pro>con)===sg);}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(62),String(a[0]).padStart(5),pct(a[1],a[0]).padStart(6),'|',String(b[0]).padStart(5),pct(b[1],b[0]).padStart(6));}
