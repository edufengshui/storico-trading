const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js');const {percorso}=require(process.argv[3]);const T=require(process.argv[2]);
const HL=process.env.HL!=='0';   // 23/10 sera: massimi e minimi veri delle barre (HL=0 = vecchie chiusure)
const BR='子丑寅卯辰巳午未申酉戌亥';const CL={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const HE={'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const ramoOra=h=>BR[Math.floor(((h+1)%24)/2)];   // ora GMT -> ramo (Zi 23-01)
const YP={};const yb=d=>YP[d]||(YP[d]=lj.Solar.fromYmdHms(...d.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact()[1]);
const recs=[];const base={max:{},min:{}};
for(const r of T){const p=percorso(r.cross,r.date);if(!p)continue;const R=LYM.read(r.seed,r.ramo,r.mese,yb(r.date),r.stelo);if(!R||R.error)continue;
 let mx=p.p[0],mn=p.p[0];for(const b of p.p){if(HL?b.hi>mx.hi:b.c>mx.c)mx=b;if(HL?b.lo<mn.lo:b.c<mn.c)mn=b;}
 const e={max:ramoOra(mx.h),min:ramoOra(mn.h)};for(const k in e)base[k][e[k]]=(base[k][e[k]]||0)+1;
 const F={'Shi':[R.shiB],'Ying':[R.yingB],'partenza mobile':[R.mutante.ramoDep],'arrivo mobile':[R.mutante.ramoArr],'ramo del giorno':[r.ramo],'ramo del mese':[r.mese],
  'ora del seme':[R.oraBranch],'clash del giorno':[CL[r.ramo]],'六合 del giorno':[HE[r.ramo]],'vuoti':R.vuoti};
 for(const c of ['W','G','P','B','C'])F['linee '+c]=[...new Set(R.linee.filter(L=>L.par===c).map(L=>L.ramo))];
 recs.push({e,F,per:r.date<'2024'?'A':'B',up:p.p[p.p.length-1].c>=p.o});}
const N=recs.length;const pb={max:{},min:{}};for(const k in base)for(const b of BR)pb[k][b]=(base[k][b]||0)/N;
console.log('carte',N);console.log('ramo dell\'ora del MASSIMO:',BR.split('').map(b=>b+' '+(100*pb.max[b]).toFixed(0)+'%').join(' · '));
console.log('ramo dell\'ora del MINIMO: ',BR.split('').map(b=>b+' '+(100*pb.min[b]).toFixed(0)+'%').join(' · '));
const out=[];
for(const f of Object.keys(recs[0].F))for(const k of ['max','min'])for(const per of ['A','B','tutte']){let n=0,obs=0,exp=0;
 for(const x of recs){if(per!=='tutte'&&x.per!==per)continue;const bs=x.F[f].filter(Boolean);if(!bs.length)continue;n++;obs+=bs.includes(x.e[k])?1:0;exp+=bs.reduce((s,b)=>s+pb[k][b],0);}
 out.push({f,k,per,n,obs,exp,lift:obs/exp});}
const g={};for(const o of out){const kk=o.f+'|'+o.k;(g[kk]=g[kk]||{})[o.per]=o;}
console.log('\ncaratteristica'.padEnd(26),'estremo','carte','osservato','atteso','rapporto','2020-23','2024-26');
for(const kk in g){const t=g[kk].tutte,a=g[kk].A,b=g[kk].B;console.log(t.f.padEnd(25),(t.k==='max'?'massimo':'minimo ').padEnd(8),String(t.n).padStart(5),(100*t.obs/t.n).toFixed(1).padStart(6)+'%',(100*t.exp/t.n).toFixed(1).padStart(6)+'%',t.lift.toFixed(2).padStart(6),a.lift.toFixed(2).padStart(8),b.lift.toFixed(2).padStart(8));}
