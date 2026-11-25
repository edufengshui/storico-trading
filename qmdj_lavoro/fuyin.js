// S79: fu yin di stelle e steli (cielo = terra in ogni palazzo). Il mercato segue il trend? Diviso per come stanno le porte.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const DH={Rest:1,Birth:8,Injury:3,Delusion:4,View:9,Death:2,Shocking:7,Open:6},OP={1:9,9:1,2:8,8:2,3:7,7:3,4:6,6:4},G={},GG={};
const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;(GG[k]=GG[k]||{})[x.date]=1;};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  let fu=true,dh=0,df=0;for(const k of [1,2,3,4,6,7,8,9]){const d=c.palaces[k];if(d.tiH!==d.diH)fu=false;const h=DH[d.doorName||d.door];if(h===k)dh++;if(h===OP[k])df++;}
  const sg=x.real===x.trend;add('0 tutte le carte',x,sg);if(!fu)continue;add('1 fu yin di stelle e steli',x,sg);
  add('2 fu yin, porte '+(dh>=7?'a casa (fu yin totale)':df>=7?'di fronte (fan yin delle porte)':'altrove'),x,sg);
  add('3 fu yin, ora '+(c.pilastro[0]==='甲'?'Jia':'non Jia (HS = stelo del Commander)'),x,sg);
  if(x.liv==='LI'&&x.liDir)add('4 fu yin: Lio vince',x,x.liDir===x.real);}
const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(50),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]),'| giorni',Object.keys(GG[k]).length);}
