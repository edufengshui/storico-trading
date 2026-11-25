// S79 (25/11/2026): la bilancia come verdetto del qimen. Confronto col sistema unito, sui trade di Lio (LI) e su tutte le carte.
// Prima: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi>.  Uso: VAR=... node qmdj_lavoro/bilancia_decide.js
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), DIR=path.join(__dirname,'..');
global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.trend&&x.real);
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
const C=[];for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(c)C.push([x,c]);}
const VAR=JSON.parse(process.env.VAR||'[["attuale",{}]]');
for(const [nome,opt] of VAR){ for(const k in opt)global[k]=opt[k];
  const G={};const add=(k,x,ok,pip)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;g[2]+=pip;};
  for(const [x,c] of C){const u=Q.unito(c,x.trend)||{},b=Q.bilancia(c,x.trend)||{};const mv=Math.abs(x.move);
    if(u.dir)add('A carte: unito giusto',x,u.dir===x.real,0); if(b.dir)add('B carte: bilancia giusta',x,b.dir===x.real,0);
    if(b.dir){const sc=Math.abs(b.long-b.short);add('B'+(sc>=3?'3 scarto 3+':sc>=2?'2 scarto 2-2,5':'1 scarto fino a 1,5'),x,b.dir===x.real,0);}
    if(x.liv==='LI'&&x.liDir){const w=x.liDir===x.real,pp=w?mv:-mv;
      add('C Lio | unito '+(!u.dir?'muto':u.dir===x.liDir?'accordo':'contro'),x,w,pp);
      add('D Lio | bilancia '+(!b.dir?'pari':b.dir===x.liDir?'accordo':'contro'),x,w,pp);
      add('E '+x.liForza+' | bilancia '+(!b.dir?'pari':b.dir===x.liDir?'accordo':'contro'),x,w,pp);}}
  console.log('== '+nome);for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(34),String(a[0]).padStart(5),pct(a[1],a[0]).padStart(6),String(a[2]).padStart(7),'|',String(b[0]).padStart(5),pct(b[1],b[0]).padStart(6),String(b[2]).padStart(7));}
  for(const k in opt)delete global[k]; }
