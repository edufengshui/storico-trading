// S79 (Edu 25/11/2026: "Fammi vedere una carta dove il controllo non funziona e non ci sono altre spiegazioni").
// Giornate con ZF che controlla TY, nessun ponte, ZF forte e TY debole nel mese, nessuna voce contraria nella bilancia, cascata "segue",
// e il mercato NON ha seguito. Ordinate per pip contro.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥', H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const PEL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'},GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},CTL={L:'E',E:'W',W:'F',F:'M',M:'L'};
const BEL={'子':'W','亥':'W','寅':'L','卯':'L','巳':'F','午':'F','申':'M','酉':'M','辰':'E','戌':'E','丑':'E','未':'E'};
const HOME={1:'Grass',2:'Rice',3:'Aggressor',4:'Assistant',6:'Heart',7:'Pillar',8:'Official',9:'Hero'},PS=[1,2,3,4,6,7,8,9],N={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li'};
const forte=(k,mb)=>{const p=PEL[k],m=BEL[mb];return p===m||GEN[m]===p;};const R=[];let tot=0,seg=0;
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const p=x.date.split('-').map(Number),seed=parseInt(f3(o),10),c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  let zf=null,ty=null;for(const k of PS)if(c.palaces[k].zhiFu)zf=k;for(const k of PS)if(c.palaces[k].star===HOME[zf])ty=k;if(!zf||!ty||CTL[PEL[zf]]!==PEL[ty])continue;
  if(process.env.STAGIONE!=='no'&&(!forte(zf,c.mese[1])||forte(ty,c.mese[1])))continue;
  if(PS.some(k=>k!==zf&&k!==ty&&GEN[PEL[zf]]===PEL[k]&&GEN[PEL[k]]===PEL[ty]&&(c.palaces[k].zhiShi||c.palaces[k].tiH==='戊'||(c.palaces[k].doorName||c.palaces[k].door)==='View')))continue;
  const u=Q.lettura(c,x.trend,'zfty')||{},b=Q.bilancia(c,x.trend);if(/ponte|fermo/.test(u.motivo||'')||b.voci.some(v=>/ponte/.test(v.t)))continue;if(new Date(x.date+'T00:00:00Z').getUTCDay()===1)continue;   // lo ZFTY stesso deve dire segue; niente lunedi' (salto d'apertura)
  const contro=b.voci.filter(v=>v.dir&&v.dir!==x.trend&&v.peso);if(contro.length||u.dir!==x.trend)continue;
  tot++;if(x.real===x.trend){seg++;continue;}
  R.push({d:x.date,cr:x.cross,seed,tr:x.trend,mv:Math.abs(x.move),zf:N[zf],ty:N[ty],pro:b.voci.filter(v=>v.dir===x.trend).length,mot:u.motivo,pil:c.pilastro+' '+c.giorno+' '+c.mese+' '+c.anno,ju:c.jiu.dun+c.jiu.ju});}
console.log('giornate pulite (controllo, niente ponte, ZF forte, TY debole, niente contro):',tot,'| hanno seguito',seg,'| non hanno seguito',R.length);
R.sort((a,b)=>b.mv-a.mv).slice(0,+process.argv[2]||12).forEach(r=>console.log(r.d,r.cr,'seme',r.seed,r.ju,r.pil,'trend',r.tr,'contro',r.mv,'pip | ZF',r.zf,'TY',r.ty,'| pro',r.pro,'|',(r.mot||'').slice(0,230)));
