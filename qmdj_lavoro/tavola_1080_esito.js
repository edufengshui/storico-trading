// S79: esito di UNA carta delle 1080 sullo storico. Uso: node qmdj_lavoro/tavola_1080_esito.js yin 4 壬子   (dopo misura_vivo.js con DUMPC=/tmp/dump.json)
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses, [dun,ju,gz]=process.argv.slice(2);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const T=JSON.parse(fs.readFileSync(DIR+'/QMDJ_1080_A_PRIORI.json')).carte[dun+ju+gz];console.log('passo 1:',T.previsione,T.pro+'-'+T.contro,'| per segue:',T.per_segue.join('; ')||'niente','| per non segue:',T.per_non_segue.join('; ')||'niente');
let n=[0,0],s=[0,0],pipS=0,pipN=0,giorni={};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
  if(!c||c.jiu.dun!==dun||c.jiu.ju!==+ju||c.pilastro!==gz)continue;const i=x.date<'2024-01-01'?0:1,sg=x.real===x.trend;n[i]++;s[i]+=sg;if(sg)pipS+=Math.abs(x.move);else pipN+=Math.abs(x.move);giorni[x.date]=1;
  if(process.argv[5])console.log(x.date,x.cross,'trend',x.trend,sg?'segue':'non segue',Math.abs(x.move),c.giorno,c.mese,c.anno);}
console.log('uscite',n[0]+n[1],'in',Object.keys(giorni).length,'giorni | segue',s[0]+s[1],'| non segue',n[0]+n[1]-s[0]-s[1],'| 2020-23:',s[0]+'/'+n[0],'| 2024-26:',s[1]+'/'+n[1],'| pip medi quando segue',(pipS/Math.max(1,s[0]+s[1])).toFixed(0),'quando non segue',(pipN/Math.max(1,n[0]+n[1]-s[0]-s[1])).toFixed(0));
