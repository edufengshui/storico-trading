// 27/11/2026 (Edu: "Quando Lio e' fermo dovrebbe agire il qimen per il quale il clash non e' importante").
// Misura: nei giorni in cui Lio e' fermo (e in particolare per il clash giorno/mese) il qimen (bilancia) da solo quanto prende?
// Prima: ORARIO=full1h.json DUMPC=/tmp/dump.json node misura_vivo.js 2020-02-20 <oggi>
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), DIR=path.join(__dirname,'..');
global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const F=require(process.env.FERMI||'/tmp/fermi.json');
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
const G={};const add=(k,x,ok,pip)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;g[2]+=pip;};
for(const x of F){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  const b=Q.bilancia(c,x.trend)||{};const mv=Number(x.move);const t=/clash/.test(x.fermo)?'A clash giorno/mese':'B pareggio non sciolto';
  add(t+' | il mercato segue il trend',x,x.real===x.trend,0);
  if(!b.dir){add(t+' | qimen fermo',x,0,0);continue;}
  const w=b.dir===x.real,pp=w?mv:-mv,sc=Math.abs(b.long-b.short);
  add(t+' | qimen parla',x,w,pp); add(t+' | qimen scarto '+(sc>=3?'3+':sc>=2?'2':'1'),x,w,pp);
  add(t+' | qimen '+(b.dir===x.trend?'col trend':'contro il trend'),x,w,pp);
  if(/clash/.test(x.fermo))add('C clash | '+x.cross,x,w,pp);
  add('D tutti i fermi di Lio | qimen parla',x,w,pp); if(sc>=2)add('D tutti i fermi di Lio | qimen scarto 2+',x,w,pp);
}
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(48),String(a[0]).padStart(5),pct(a[1],a[0]).padStart(6),String(Math.round(a[2])).padStart(7),'|',String(b[0]).padStart(5),pct(b[1],b[0]).padStart(6),String(Math.round(b[2])).padStart(7));}
