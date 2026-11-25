// S79: le carte delle 1080 uscite piu' volte (SOLO il conto delle uscite, senza esiti: serve a scegliere cosa leggere alla cieca).
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const N={};for(const cr in H)for(const b of H[cr])if(b.t.slice(11,13)==='00'){const d=b.t.slice(0,10);if(d<'2020-02-20')continue;const wd=new Date(d+'T00:00:00Z').getUTCDay();if(wd===0||wd===6)continue;
  const p=d.split('-').map(Number),seed=parseInt(f3(b.o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;const k=c.jiu.dun+' '+c.jiu.ju+' '+c.pilastro;N[k]=(N[k]||0)+1;}
Object.entries(N).sort((a,b)=>b[1]-a[1]).slice(0,+process.argv[2]||15).forEach(e=>console.log(e[1],e[0]));
