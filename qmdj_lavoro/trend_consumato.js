// 27/11/2026 (Edu: "Si"): il trend "consumato" (Gann ancorato al giro dell'EMA: oltre 360 gradi sul quadrato del 9, oppure trend
// vecchio) come peso contro "segue": migliora Lio e il qimen? Prima: misura_vivo.js con DUMPC=/tmp/dump.json e /tmp/gann/feat.py.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), DIR=path.join(__dirname,'..');
global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses, F=require('/tmp/gann/feat.json');
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.trend&&x.real);
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
const G={};const add=(k,x,ok,pip)=>{const g=(G[k]=G[k]||[[0,0,0],[0,0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;g[2]+=pip;};
let diversi=0,tot=0;
for(const x of D){const f=F[x.cross+x.date];if(!f)continue;tot++;if(f.tr!==x.trend){diversi++;continue;}
  const mv=Math.abs(Number(x.move)),seg=x.real===x.trend;
  const cons=f.degB>360?'3 oltre 360 gradi':f.degB>270?'2 fra 270 e 360':'1 fino a 270';
  const eta=f.run>=22?'3 eta 22+':f.run>=15?'2 eta 15-21':'1 eta fino a 14';
  const C2=(f.degB>360||f.run>=22)?'CONSUMATO (oltre 360 o eta 22+)':'non consumato';
  add('A tutte le carte | '+cons+' | il mercato segue',x,seg,seg?mv:-mv);
  add('A tutte le carte | '+eta+' | il mercato segue',x,seg,seg?mv:-mv);
  add('A tutte le carte | '+C2+' | il mercato segue',x,seg,seg?mv:-mv);
  if(x.liv==='LI'&&x.liDir){const w=x.liDir===x.real,pp=w?mv:-mv,verso=x.liDir===x.trend?'Lio col trend':'Lio contro il trend';
    add('B '+verso+' | '+cons,x,w,pp); add('C '+verso+' | '+C2,x,w,pp); add('D '+verso+' '+x.liForza+' | '+C2,x,w,pp);
    add('E Lio tutti | '+C2,x,w,pp);}
  const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;const b=Q.bilancia(c,x.trend)||{};
  if(b.dir){const w=b.dir===x.real;add('F qimen '+(b.dir===x.trend?'dice segue':'dice non segue')+' | '+C2,x,w,w?mv:-mv);
    // la bilancia con un punto in piu' contro "segue" quando il trend e' consumato
    }
  const pes=C2[0]==='C'?1:0; const L=(x.trend==='LONG'?b.long:b.short)||0, S=(x.trend==='LONG'?b.short:b.long)||0;   // L = voti per segue
  if(b.long!=null){const s2=S+pes; const dir2=L>s2?x.trend:L<s2?(x.trend==='LONG'?'SHORT':'LONG'):null;
    if(b.dir)add('G bilancia com\'e: giusta',x,b.dir===x.real,0); if(dir2)add('G bilancia + 1 punto contro se consumato: giusta',x,dir2===x.real,0);
    const s3=S+2*pes; const dir3=L>s3?x.trend:L<s3?(x.trend==='LONG'?'SHORT':'LONG'):null; if(dir3)add('G bilancia + 2 punti contro se consumato: giusta',x,dir3===x.real,0);}
}
console.log('carte',tot,'trend diverso dal mio calcolo',diversi);
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(62),String(a[0]).padStart(5),pct(a[1],a[0]).padStart(6),String(Math.round(a[2])).padStart(7),'|',String(b[0]).padStart(5),pct(b[1],b[0]).padStart(6),String(Math.round(b[2])).padStart(7));}
