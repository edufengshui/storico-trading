// S79 (Edu 25/11/2026: "ogni carta ha un'impronta di base che dovrebbe reggere"). Prova senza nessuna regola di lettura:
// la stessa carta (ju, dun, ora) si comporta allo stesso modo nei due periodi? Per ogni carta: quota "segue il trend" e quota "sale"
// nel 2020-23 e nel 2024-26; poi si guarda se chi sta sopra la meta' nel primo periodo ci resta nel secondo.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const C={};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const k=c.jiu.dun+c.jiu.ju+c.pilastro,i=x.date<'2024-01-01'?0:1,g=C[k]=C[k]||[[0,0,0],[0,0,0]];g[i][0]++;g[i][1]+=x.real===x.trend;g[i][2]+=x.real==='LONG';}
for(const [nome,j] of [['segue il trend',1],['sale (LONG)',2]])for(const min of [3,5]){
  const L=Object.values(C).filter(g=>g[0][0]>=min&&g[1][0]>=min);let xs=L.map(g=>g[0][j]/g[0][0]),ys=L.map(g=>g[1][j]/g[1][0]);
  const m=a=>a.reduce((s,v)=>s+v,0)/a.length,mx=m(xs),my=m(ys);let sxy=0,sxx=0,syy=0;xs.forEach((v,i)=>{sxy+=(v-mx)*(ys[i]-my);sxx+=(v-mx)**2;syy+=(ys[i]-my)**2;});
  let su=[0,0],gi=[0,0];L.forEach(g=>{const a=g[0][j]/g[0][0];if(a>0.5){su[0]+=g[1][0];su[1]+=g[1][j];}else if(a<0.5){gi[0]+=g[1][0];gi[1]+=g[1][j];}});
  console.log(nome.padEnd(15),'| carte con almeno',min,'uscite per periodo:',L.length,'| correlazione fra i due periodi:',(sxy/Math.sqrt(sxx*syy)).toFixed(3),
   '| carte sopra la meta nel 2020-23 -> nel 2024-26:',(100*su[1]/su[0]).toFixed(1)+'% ('+su[0]+')','| carte sotto ->',(100*gi[1]/gi[0]).toFixed(1)+'% ('+gi[0]+')');}
