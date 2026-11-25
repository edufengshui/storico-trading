// S79 (Edu 25/11/2026): le 1080 carte qimen (18 ju x 60 ore), previsione A PRIORI della bilancia sulla sola carta, e verifica.
//   node qmdj_lavoro/tavola_1080.js scrivi   -> scrive QMDJ_1080_A_PRIORI.json (da congelare: non si riscrive dopo)
//   node qmdj_lavoro/tavola_1080.js verifica -> conta sullo storico (/tmp/dump.json da misura_vivo.js) e sui giorni dal vivo (registro_live.json)
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), ST='甲乙丙丁戊己庚辛壬癸', BR='子丑寅卯辰巳午未申酉戌亥', FILE=DIR+'/QMDJ_1080_A_PRIORI.json';
const firma=c=>[1,2,3,4,6,7,8,9].map(k=>{const d=c.palaces[k];return [d.tiH,d.ti2H||'',d.diH,d.di2H||'',d.star,d.doorName||d.door,d.deity,d.zhiFu?1:0,d.zhiShi?1:0].join('')}).join('|');
if(process.argv[2]==='scrivi'){ if(fs.existsSync(FILE)){console.log('esiste gia: congelata, non si riscrive');process.exit(1);}
  const T={};for(const dun of ['yang','yin'])for(let ju=1;ju<=9;ju++)for(let i=0;i<60;i++){const gz=ST[i%10]+BR[i%12],c=Q.cartaDi(ju,dun,gz),b=Q.bilanciaCarta(c);
    T[dun+ju+gz]={previsione:b.segue===null?'fermo':b.segue?'segue':'non segue',pro:b.pro,contro:b.contro,per_segue:b.voci.filter(v=>v.segue).map(v=>v.t+(v.peso!==1?' (peso '+v.peso+')':'')),per_non_segue:b.voci.filter(v=>!v.segue).map(v=>v.t+(v.peso!==1?' (peso '+v.peso+')':'')),firma:firma(c)};}
  fs.writeFileSync(FILE,JSON.stringify({congelata:new Date().toISOString(),nota:'Previsione a priori della bilancia sulla sola carta (ju, dun, ora). Non si riscrive: le letture nuove vanno in un file nuovo.',carte:T},null,1));
  const n={};Object.values(T).forEach(x=>n[x.previsione]=(n[x.previsione]||0)+1);console.log(Object.keys(T).length,JSON.stringify(n));process.exit(0);}
const T=JSON.parse(fs.readFileSync(FILE)).carte, H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const R=[];let ultimo='';
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;R.push({date:x.date,cross:x.cross,seed:parseInt(f3(o),10),trend:x.trend,real:x.real,move:Math.abs(x.move)});if(x.date>ultimo)ultimo=x.date;}
const reg=JSON.parse(fs.readFileSync(DIR+'/registro_live.json'));
for(const d of Object.keys(reg).sort())if(d>ultimo)for(const t of reg[d]){if(t.esito==null||!t.seed||!/LONG|SHORT/.test(t.trend||'')||!/LONG|SHORT/.test(t.signal||''))continue;const tr=/LONG/.test(t.trend)?'LONG':'SHORT',mv=t.esito*(t.signal==='LONG'?1:-1);if(!mv)continue;
  R.push({date:d,cross:t.cross,seed:t.seed,trend:tr,real:mv>0?'LONG':'SHORT',move:Math.abs(mv),vivo:true});}
const G={},viste={},perCarta={};let diversa=0;
const add=(k,ok)=>{const g=G[k]=G[k]||[0,0];g[0]++;g[1]+=ok;};
for(const x of R){const p=x.date.split('-').map(Number),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((x.seed-1)%12+12)%12]);if(!c)continue;
  const key=c.jiu.dun+c.jiu.ju+c.pilastro,t=T[key];if(!t){add('carta non trovata',0);continue;} if(t.firma!==firma(c))diversa++;
  viste[key]=1;const seg=x.real===x.trend,per=x.vivo?'3 dal vivo (dopo '+ultimo+')':x.date<'2024-01-01'?'1 2020-23':'2 2024-26';
  add(per+' | tutte: il mercato segue',seg);
  if(t.previsione!=='fermo'){const ok=(t.previsione==='segue')===seg;add(per+' | previsione avverata',ok);add(per+' |   "'+t.previsione+'" avverata',ok);
    const sc=Math.abs(t.pro-t.contro);add(per+' |   scarto '+(sc>=3?'3 o piu':sc)+' avverata',ok);
    const pc=perCarta[key]=perCarta[key]||[0,0];pc[0]++;pc[1]+=ok;} else add(per+' | fermo: il mercato segue',seg);}
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
for(const k of Object.keys(G).sort())console.log(k.padEnd(52),String(G[k][0]).padStart(5),pct(G[k][1],G[k][0]).padStart(7));
console.log('carte uscite almeno una volta:',Object.keys(viste).length,'su 1080; giornate:',R.length,'; carte con firma diversa dalla tavola:',diversa);
const pcs=Object.values(perCarta).filter(v=>v[0]>=8);console.log('carte con almeno 8 uscite:',pcs.length,'; avverate in piu della meta:',pcs.filter(v=>v[1]*2>v[0]).length,'; in meno della meta:',pcs.filter(v=>v[1]*2<v[0]).length);
