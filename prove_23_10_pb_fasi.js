const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const PBM=require(D+'/plumblossom.js');const T=require(process.argv[2]).filter(r=>r.ema&&Math.abs(r.move)>=20);
const EL={1:'M',2:'M',3:'F',4:'L',5:'L',6:'W',7:'E',8:'E'};const GEN={L:'F',F:'E',E:'M',M:'W',W:'L'},KE={L:'E',E:'W',W:'F',F:'M',M:'L'};
const rel=(x,ti)=>{if(GEN[x]===ti||x===ti)return 1;if(KE[ti]===x)return 1;if(KE[x]===ti)return -1;if(GEN[ti]===x)return -1;return 0;};
const YP={};const yb=d=>YP[d]||(YP[d]=lj.Solar.fromYmdHms(...d.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact()[1]);
const X={};const ad=(k,ok)=>{const o=X[k]=X[k]||{n:0,g:0};o.n++;o.g+=ok;};let chk=null;
for(const r of T){const pb=PBM.read(r.seed,r.ramo,r.mese,yb(r.date),r.stelo,r.emaRun);if(!pb||pb.error)continue;
 const tiSopra=pb.linea<=3;const ti=EL[tiSopra?pb.original.sup:pb.original.inf];const yo=EL[tiSopra?pb.original.inf:pb.original.sup];const yt=EL[tiSopra?pb.transform.inf:pb.transform.sup];
 const hu1=EL[pb.mutual.sup],hu2=EL[pb.mutual.inf];
 if(!chk&&r.cross==='EURUSD'&&r.date==='2026-10-16')chk=[pb.trendLabel,pb.yongOrigLabel,pb.yongTrasfLabel,JSON.stringify(pb.mutual)];
 const ben=rel(yo,ti),hu=rel(hu1,ti)+rel(hu2,ti),bian=rel(yt,ti);
 const trend=r.ema==='up'?'LONG':'SHORT',real=r.move>0?'LONG':'SHORT',seg=real===trend,per=r.date<'2024'?'|20-23':'|24-26';
 const V={'1 presente (Ti/Yong)':ben,'2 Hu Gua (i due trigrammi contro il Ti)':hu,'3 Bian Gua (Yong trasformato/Ti)':bian,'4 Hu + Bian':hu+bian,'5 presente + Hu + Bian':ben+hu+bian,'6 Bian, e se pari decide Hu':bian||hu,'7 PB attuale':pb.segue===null?0:(pb.segue?1:-1)};
 for(const k in V){if(!V[k])continue;const ok=(V[k]>0)===seg;ad(k+'|t',ok);ad(k+per,ok);}}
console.log('controllo',chk&&chk.join(' '));const f=k=>X[k]?(100*X[k].g/X[k].n).toFixed(1)+'%':'-';
for(const k of [...new Set(Object.keys(X).map(k=>k.split('|')[0]))].sort())console.log(k.padEnd(44),f(k+'|t'),'su',X[k+'|t'].n,'| 20-23',f(k+'|20-23'),'| 24-26',f(k+'|24-26'));
