const D='/root/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js');const {percorso}=require(process.argv[3]);const T=require(process.argv[2]);
const BR='子丑寅卯辰巳午未申酉戌亥';const WX={'子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'};
const GEN={Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
// ore (GMT) di un ramo: Zi 23-01 ... ; sfasamento per Pechino (+8)
const ore=(b,off)=>{const i=BR.indexOf(b);const h0=(i*2-1+24)%24;return [h0,(h0+1)%24].map(h=>(h-off+24)%24);};
const YP={};const yb=d=>YP[d]||(YP[d]=lj.Solar.fromYmdHms(...d.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact()[1]);
const st={};const ad=(k,hit)=>{const o=st[k]=st[k]||{n:0,h:0};o.n++;o.h+=hit;};
for(const off of [0,8]){const base={};let N=0;const tag=off?'Pechino':'Londra (GMT)';
 const recs=[];
 for(const r of T){const p=percorso(r.cross,r.date);if(!p)continue;const up=p.p[p.p.length-1].c>=p.o;
  let ex=p.p[0];for(const b of p.p)if(up?b.c>ex.c:b.c<ex.c)ex=b;   // ora del massimo (giornata al rialzo) o del minimo (al ribasso)
  const R=LYM.read(r.seed,r.ramo,r.mese,yb(r.date),r.stelo);if(!R||R.error)continue;const mE=WX[r.mese];
  const Wv=R.linee.filter(L=>L.par==='W'&&!L.vuoto&&(WX[L.ramo]===mE||GEN[mE]===WX[L.ramo])).map(L=>L.ramo);
  recs.push({ex:ex.h,Wv:[...new Set(Wv)],big:Math.abs((p.p[p.p.length-1].c-p.o))});N++;
  for(const b of BR){const hs=ore(b,off);base[b]=(base[b]||0)+(hs.includes(ex.h)?1:0);}}
 for(const x of recs){if(x.Wv.length!==1)continue;const b=x.Wv[0];const hit=ore(b,off).includes(x.ex);ad(tag+' · W vibrante unica',hit);ad(tag+' · attesa per caso (stesso ramo)',0);st[tag+' · attesa per caso (stesso ramo)'].h+=base[b]/N;}
}
for(const k of Object.keys(st).sort())console.log(k.padEnd(48),'su',st[k].n,'carte: picco nell\'ora della W',(100*st[k].h/st[k].n).toFixed(1)+'%');
