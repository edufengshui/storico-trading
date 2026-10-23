const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js');const {percorso}=require(process.argv[3]);const T=require(process.argv[2]);
const HL=process.env.HL!=='0';   // 23/10 sera: movimento = escursione dell'ora (massimo-minimo), estremi veri (HL=0 = chiusure)
const BR='子丑寅卯辰巳午未申酉戌亥';const CL={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const ore=b=>{const i=BR.indexOf(b);const h0=(i*2-1+24)%24;return [h0,(h0+1)%24].filter(h=>h<=21);};   // ore GMT del ramo (Londra)
const ramoOra=h=>BR[Math.floor(((h+1)%24)/2)];const pipf=c=>/JPY$/.test(c)?100:10000;
const YP={};const yp=d=>YP[d]||(YP[d]=lj.Solar.fromYmdHms(...d.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact());
// media del movimento assoluto per cross e ora (normalizzazione)
const recs=[];const sum={},cnt={};
for(const r of T){const p=percorso(r.cross,r.date);if(!p)continue;const mv={};let prev=p.o;for(const b of p.p){mv[b.h]=(HL?b.hi-b.lo:Math.abs(b.c-prev))*pipf(r.cross);prev=b.c;const k=r.cross+b.h;sum[k]=(sum[k]||0)+mv[b.h];cnt[k]=(cnt[k]||0)+1;}
 let mx=p.p[0],mn=p.p[0];for(const b of p.p){if(HL?b.hi>mx.hi:b.c>mx.c)mx=b;if(HL?b.lo<mn.lo:b.c<mn.c)mn=b;}recs.push({r,mv,ex:[mx.h,mn.h]});}
const norm=(c,h,v)=>v/(sum[c+h]/cnt[c+h]);
const X={};const ad=(k,v,e)=>{const o=X[k]=X[k]||{n:0,v:0,e:0,ee:0};o.n++;o.v+=v;o.e+=e[0];o.ee+=e[1];};
const pexBase={};for(const x of recs)for(const h of x.ex){pexBase[ramoOra(h)]=(pexBase[ramoOra(h)]||0)+1/(2*recs.length);}
for(const x of recs){const r=x.r;const R=LYM.read(r.seed,r.ramo,r.mese,yp(r.date)[1],r.stelo);if(!R||R.error)continue;
 const pil={giorno:r.ramo,mese:r.mese,anno:yp(r.date)[1],ora:R.oraBranch};
 const rami=[...new Set(R.linee.map(L=>L.ramo))];
 for(const b of rami){const hs=ore(b);if(!hs.length)continue;
  const v=hs.reduce((s,h)=>s+(x.mv[h]!=null?norm(r.cross,h,x.mv[h]):0),0)/hs.length;
  const inEx=x.ex.some(h=>hs.includes(h))?1:0;const exp=pexBase[b]*2;
  const L=R.linee.find(l=>l.ramo===b);const chi=Object.keys(pil).filter(k=>CL[pil[k]]===b);
  const tipo=chi.length?('clashato da '+chi.join('+')):'non clashato';
  ad(tipo,v,[inEx,exp]);if(chi.includes('giorno')){ad('clashato dal giorno · linea '+(L.isMobile?'mobile':'ferma'),v,[inEx,exp]);ad('clashato dal giorno · '+L.par,v,[inEx,exp]);ad('clashato dal giorno · '+(L.vuoto?'vuota':'piena'),v,[inEx,exp]);}}
 // controllo: il ramo clashato dal giorno quando NON e' nell'esagramma
 const bd=CL[r.ramo];if(!rami.includes(bd)){const hs=ore(bd);if(hs.length){const v=hs.reduce((s,h)=>s+(x.mv[h]!=null?norm(r.cross,h,x.mv[h]):0),0)/hs.length;ad('ramo clashato dal giorno ma NON nell\'esagramma',v,[x.ex.some(h=>hs.includes(h))?1:0,pexBase[bd]*2]);}}}
console.log('caso'.padEnd(52),'ore'.padStart(6),' movimento (1 = normale)','  estremo in quell\'ora: osservato / atteso');
for(const k of Object.keys(X).sort())console.log(k.padEnd(52),String(X[k].n).padStart(6),'   '+(X[k].v/X[k].n).toFixed(3),'                 '+(100*X[k].e/X[k].n).toFixed(1)+'% / '+(100*X[k].ee/X[k].n).toFixed(1)+'%');
