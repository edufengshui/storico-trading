const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const PBM=require(D+'/plumblossom.js'),TR=require('/root/trading/trend.js');
const T=require(process.argv[2]).filter(r=>r.ema&&Math.abs(r.move)>=20);
const H=JSON.parse(require('fs').readFileSync(D+'/full1h.json')).crosses;const fest=d=>[0,6].includes(new Date(d+'T12:00:00Z').getUTCDay());
const CL={};for(const c in H){const g={};for(const b of H[c]){const d=b.t.slice(0,10),h=b.t.slice(11,13);const o=g[d]=g[d]||{};if(h==='00')o.h0=1;if(h==='21')o.c=b.c;}
 const days=Object.keys(g).sort().filter(d=>!fest(d)&&g[d].h0&&g[d].c!=null);CL[c]={days,c:days.map(d=>g[d].c)};}
const lo=(a,x)=>{let l=0,h=a.length;while(l<h){const m=(l+h)>>1;if(a[m]<x)l=m+1;else h=m;}return l;};
const PER=[3,5,8,10,12,15,20,26,30,40,50];const X={};let chk=0,chkOk=0;
const YP={};const yb=d=>YP[d]||(YP[d]=lj.Solar.fromYmdHms(...d.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact()[1]);
for(const r of T){const C=CL[r.cross];if(!C)continue;const i=lo(C.days,r.date);const closes=C.c.slice(Math.max(0,i-400),i);
 const real=r.move>0?'LONG':'SHORT',m=Math.abs(r.move),per=r.date<'2024'?'20-23':'24-26';
 for(const N of PER){const s=TR.emaSeries(closes,N);const dirs=TR.emaDirs(s);if(!dirs.length)continue;const last=dirs[dirs.length-1];if(last!=='u'&&last!=='d')continue;
  let run=0,ref=null;for(let q=dirs.length-1;q>=0;q--){const x=dirs[q];if(x==='f')continue;if(ref===null){ref=x;run=1;}else if(x===ref)run++;else break;}
  const trend=last==='u'?'LONG':'SHORT';if(N===12){chk++;chkOk+=(r.ema==='up')===(last==='u');}
  const pb=PBM.read(r.seed,r.ramo,r.mese,yb(r.date),r.stelo,run);if(!pb||pb.error||pb.segue===null)continue;
  const dir=pb.segue?trend:(trend==='LONG'?'SHORT':'LONG');
  for(const k of ['PB '+N,'PB '+N+' '+per,'trend '+N,'trend '+N+' '+per]){const d=k.startsWith('PB')?dir:trend;const o=X[k]=X[k]||{n:0,g:0,p:0};o.n++;const ok=d===real;o.g+=ok;o.p+=ok?m:-m;}}}
console.log('controllo EMA 12 uguale al dump:',chkOk+'/'+chk);
console.log('EMA  | PB tutte            | PB 2020-23 | PB 2024-26 | trend da solo');
const f=k=>X[k]?(100*X[k].g/X[k].n).toFixed(1)+'%':'-';
for(const N of PER)console.log(String(N).padStart(4),' |',f('PB '+N),'su',X['PB '+N].n,(X['PB '+N].p>0?'+':'')+X['PB '+N].p,'|',f('PB '+N+' 20-23'),'|',f('PB '+N+' 24-26'),'|',f('trend '+N));
