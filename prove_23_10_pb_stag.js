const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const PBM=require(D+'/plumblossom.js');const T=require(process.argv[2]).filter(r=>r.ema&&Math.abs(r.move)>=20);
const ST='甲乙丙丁戊己庚辛壬癸',BR='子丑寅卯辰巳午未申酉戌亥';
const EL={1:'M',2:'M',3:'F',4:'L',5:'L',6:'W',7:'E',8:'E'};const RAMI={1:'戌亥',2:'酉',3:'午',4:'卯',5:'辰巳',6:'子',7:'丑寅',8:'未申'};
const WX={'子':'W','丑':'E','寅':'L','卯':'L','辰':'E','巳':'F','午':'F','未':'E','申':'M','酉':'M','戌':'E','亥':'W'};
const GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},KE={L:'E',E:'W',W:'F',F:'M',M:'L'};
const stag=(e,mE)=>e===mE?2:GEN[mE]===e?1:GEN[e]===mE?0:KE[e]===mE?-1:-2;   // 旺 相 休 囚 死
const forte=(e,mE)=>stag(e,mE)>=1;
const rel=(x,ti)=>{if(GEN[x]===ti||x===ti)return 1;if(KE[ti]===x)return 1;if(KE[x]===ti)return -1;if(GEN[ti]===x)return -1;return 0;};
const YP={};const yb=d=>YP[d]||(YP[d]=lj.Solar.fromYmdHms(...d.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact()[1]);
const X={};const ad=(k,ok)=>{const o=X[k]=X[k]||{n:0,g:0};o.n++;o.g+=ok;};
for(const r of T){const pb=PBM.read(r.seed,r.ramo,r.mese,yb(r.date),r.stelo,r.emaRun);if(!pb||pb.error)continue;
 const s=ST.indexOf(r.stelo),b=BR.indexOf(r.ramo);const vu=[BR[(b-s+10+12)%12],BR[(b-s+11+12)%12]];
 const vuoto=n=>[...RAMI[n]].every(x=>vu.includes(x));   // trigramma vuoto se tutti i suoi rami sono vuoti
 const mE=WX[r.mese];const tiSopra=pb.linea<=3;
 const nTi=tiSopra?pb.original.sup:pb.original.inf,nYo=tiSopra?pb.original.inf:pb.original.sup,nYt=tiSopra?pb.transform.inf:pb.transform.sup;
 const ti=EL[nTi],yo=EL[nYo],yt=EL[nYt],h1=pb.mutual.sup,h2=pb.mutual.inf;
 // relazione pesata: l'azione di un trigramma vuoto non conta; il colpo conta solo se chi colpisce e' di stagione (相/旺) e il Ti non lo e'
 const act=(n,tiE)=>{if(vuoto(n))return 0;const x=EL[n],v=rel(x,tiE);if(v<0){if(KE[x]===tiE&&!forte(x,mE))return 0;if(KE[x]===tiE&&forte(tiE,mE)&&!forte(x,mE))return 0;}if(v>0&&GEN[x]===tiE&&!forte(x,mE)&&stag(x,mE)<0)return 0;return v;};
 const trend=r.ema==='up'?'LONG':'SHORT',real=r.move>0?'LONG':'SHORT',seg=real===trend,per=r.date<'2024'?'|20-23':'|24-26';
 const pbv=pb.segue===null?0:(pb.segue?1:-1);
 const tiV=vuoto(nTi),yoV=vuoto(nYo);
 const V={'A PB attuale':pbv,
  ['B PB attuale · Ti '+(tiV?'vuoto':'pieno')]:pbv,['C PB attuale · Yong '+(yoV?'vuoto':'pieno')]:pbv,
  ['D PB attuale · Ti '+['morto','prigioniero','a riposo','in crescita','in apice'][stag(ti,mE)+2]]:pbv,
  ['E PB attuale · Yong '+['morto','prigioniero','a riposo','in crescita','in apice'][stag(yo,mE)+2]]:pbv,
  'F tre tempi con stagione e vuoto':act(nYo,ti)+act(h1,ti)+act(h2,ti)+act(nYt,ti),
  'G Bian con stagione e vuoto':act(nYt,ti),
  'H PB attuale, tace se il Ti e\' vuoto':tiV?0:pbv,
  'I PB attuale, il Ti vuoto rovescia':tiV?-pbv:pbv};
 for(const k in V){if(!V[k])continue;const ok=(V[k]>0)===seg;ad(k+'|t',ok);ad(k+per,ok);}}
const f=k=>X[k]?(100*X[k].g/X[k].n).toFixed(1)+'%':'-';
for(const k of [...new Set(Object.keys(X).map(k=>k.split('|')[0]))].sort())console.log(k.padEnd(44),f(k+'|t'),'su',String(X[k+'|t'].n).padStart(4),'| 20-23',f(k+'|20-23'),'| 24-26',f(k+'|24-26'));
