// S78 (26/11/2026): il fu yin totale e' stasi? Ampiezza della giornata (|pip| 00-21 GMT) nei giorni di fu yin contro gli altri, per cross.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const HOME={1:'Xiu',8:'Sheng',3:'Shang',4:'Du',9:'JingS',2:'Si',7:'JingF',6:'Kai'};
const G={};const med=a=>{a=a.slice().sort((x,y)=>x-y);return a.length?a[a.length>>1]:0};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real&&x.move!=null)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;let fy=true,porte=true;for(const k of [1,2,3,4,6,7,8,9]){if(c.palaces[k].tiH!==c.palaces[k].diH)fy=false;if(c.palaces[k].doorCode!==HOME[k])porte=false;}
  const per=x.date<'2024-01-01'?0:1,tipo=fy&&porte?'fu yin totale':fy?'fu yin stelle e steli':'altre';
  ((G[x.cross]=G[x.cross]||{})[tipo+per]=G[x.cross][tipo+per]||[]).push(Math.abs(x.move));
  ((G.TUTTI=G.TUTTI||{})[tipo+per]=G.TUTTI[tipo+per]||[]).push(Math.abs(x.move)/(x.cross.includes('JPY')?1.6:1));}
for(const c of Object.keys(G)){const g=G[c];console.log(c.padEnd(7),['fu yin totale','fu yin stelle e steli','altre'].map(t=>t+': '+[0,1].map(p=>(g[t+p]||[]).length+' carte mediana '+med(g[t+p]||[])).join(' · ')).join(' | '));}
