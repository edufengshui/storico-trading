const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const PBM=require(D+'/plumblossom.js'),TR=require('/root/trading/trend.js');const T=require(process.argv[2]).filter(r=>r.ema&&Math.abs(r.move)>=20);
const ST='甲乙丙丁戊己庚辛壬癸',BR='子丑寅卯辰巳午未申酉戌亥';const m8=x=>((x-1)%8)+1,m6=x=>((x-1)%6)+1;
const n60=gz=>{const s=ST.indexOf(gz[0]),b=BR.indexOf(gz[1]);for(let k=0;k<60;k++)if(k%10===s&&k%12===b)return k+1;};
const H=JSON.parse(require('fs').readFileSync(D+'/full1h.json')).crosses;const fest=d=>[0,6].includes(new Date(d+'T12:00:00Z').getUTCDay());
const seedOf=p=>{const n=p<1?2:3;return Math.floor(p/Math.pow(10,Math.floor(Math.log10(p))-n+1));};
const CL={};for(const c in H){const g={};for(const b of H[c]){const d=b.t.slice(0,10),h=b.t.slice(11,13);const o=g[d]=g[d]||{};if(h==='00')o.o=b.o;if(h==='21')o.c=b.c;}
 const days=Object.keys(g).sort().filter(d=>!fest(d)&&g[d].o!=null&&g[d].c!=null);CL[c]={days,c:days.map(d=>g[d].c),o:days.map(d=>g[d].o)};}
const lo=(a,x)=>{let l=0,h=a.length;while(l<h){const m=(l+h)>>1;if(a[m]<x)l=m+1;else h=m;}return l;};
const X={};const ad=(k,ok)=>{const o=X[k]=X[k]||{n:0,g:0};o.n++;o.g+=ok;};
for(const r of T){const [y,mo,d]=r.date.split('-').map(Number);const L=lj.Solar.fromYmdHms(y,mo,d,8,0,0).getLunar();
 const yp=L.getYearInGanZhiExact(),yb=yp[1],ms=ST[((ST.indexOf(yp[0])%5)*2+2+((BR.indexOf(r.mese)+10)%12))%10];
 const nYb=BR.indexOf(yb)+1,nMb=BR.indexOf(r.mese)+1,nDb=BR.indexOf(r.ramo)+1,nH=BR.indexOf(BR[(((r.seed-1)%12)+12)%12])+1;
 const nY60=n60(yp),nM60=n60(ms+r.mese),nD60=n60(r.stelo+r.ramo);
 const jie=L.getPrevJie().getSolar();const nDm=Math.round((Date.UTC(y,mo-1,d)-Date.UTC(jie.getYear(),jie.getMonth()-1,jie.getDay()))/864e5)+1;
 const lY=BR.indexOf(L.getYearZhi())+1,lM=Math.abs(L.getMonth()),lD=L.getDay();
 const C=CL[r.cross],i=lo(C.days,r.date);const dirs=TR.emaDirs(TR.emaSeries(C.c.slice(0,i),12));let q=dirs.length-1,ref=null,start=null;for(;q>=0;q--){const x=dirs[q];if(x==='f')continue;if(ref===null){ref=x;start=q;}else if(x===ref)start=q;else break;}
 const iS=start+(i-dirs.length);const sSv=iS>=0?seedOf(C.o[iS]):null;
 const V={'01 seme (oggi)':r.seed,'02 seme+anno+mese+giorno (ciclo 60)':r.seed+nY60+nM60+nD60,'03 seme+rami anno/mese/giorno':r.seed+nYb+nMb+nDb,
  '04 seme+mese+giorno (60)':r.seed+nM60+nD60,'05 seme+giorno (60)':r.seed+nD60,'06 seme+ramo del giorno':r.seed+nDb,
  '07 seme+lunari (anno,mese,giorno)':r.seed+lY+lM+lD,'08 seme+solari (ramo anno,ramo mese,giorno nel mese)':r.seed+nYb+nMb+nDm,
  '09 seme+anno+giorno nel mese':r.seed+nYb+nDm,'10 seme+mese+giorno nel mese':r.seed+nMb+nDm,'11 seme+anno+mese':r.seed+nYb+nMb,
  '12 seme della svolta EMA':sSv,'13 seme+seme della svolta':sSv?r.seed+sSv:null,
  '14 antica pura lunare':['M',lY+lM+lD],'15 antica pura solare (giorno nel mese)':['M',nYb+nMb+nDm],'16 antica pura solare (ramo del giorno)':['M',nYb+nMb+nDb]};
 const trend=r.ema==='up'?'LONG':'SHORT',real=r.move>0?'LONG':'SHORT',seg=real===trend;
 for(const k in V){const v=V[k];if(v==null)continue;const pb=Array.isArray(v)?PBM.readManual(m8(v[1]),m8(v[1]+nH),m6(v[1]+nH)):PBM.read(v,r.ramo,r.mese,yb,r.stelo,r.emaRun);
  if(!pb||pb.error||pb.segue===null)continue;let ap=pb.yongApice;if(Array.isArray(v)){const EL={Metal:'M'};ap=null;}
  const ok=pb.segue===seg;ad(k+'|tutte',ok);if(pb.huGua)ad(k+'|hu',ok);
  const mE={'子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'}[r.mese];
  if(pb.yongOriginale.el!==mE)ad(k+'|noapice',ok);}}
const f=k=>X[k]?(100*X[k].g/X[k].n).toFixed(1)+'% ('+X[k].n+')':'-';
console.log('seme'.padEnd(54),'PB tutte'.padEnd(14),'dove decide Hu Gua'.padEnd(20),'Yong non in apice');
for(const k of [...new Set(Object.keys(X).map(k=>k.split('|')[0]))].sort())console.log(k.padEnd(54),f(k+'|tutte').padEnd(14),f(k+'|hu').padEnd(20),f(k+'|noapice'));
