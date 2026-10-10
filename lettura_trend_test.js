// lettura_trend_test.js — misura del METODO DEL TREND (lettura_trend.js) sulle carte del backtest.
// Uso: prima  TRESIST=1 SOGLIAPIP=20 TRESISTDUMP=/tmp/tresist.json node pb_stress.js  (base canonica, con DLR e LY),
// poi  node lettura_trend_test.js [/tmp/tresist.json]. Stampa: quante carte parlano, % del metodo da solo, per periodo,
// e letto insieme al DLR e al LY. Misura S54 (09/10/2026): parla 1.123/3.309, 48%; DLR+metodo concordi 60%.
const D=__dirname;global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js'); const LT=require(D+'/lettura_trend.js');
const YB={};const yearB=d=>{if(!YB[d]){const [y,m,g]=d.split('-').map(Number);YB[d]=lj.Solar.fromYmdHms(y,m,g,8,0,0).getLunar().getYearInGanZhiExact().charAt(1);}return YB[d];};
const ST=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
const yStem=d=>{const [y,m,g]=d.split('-').map(Number);return lj.Solar.fromYmdHms(y,m,g,8,0,0).getLunar().getYearInGanZhiExact().charAt(0);};
const mStem=(ys,mb)=>ST[((ST.indexOf(ys)%5)*2+2+((BR.indexOf(mb)+10)%12))%10];
const rows=JSON.parse(require('fs').readFileSync((process.argv[2]||'/tmp/tresist.json'),'utf8')).filter(r=>Math.abs(r.move)>=20&&r.ema);
const real=r=>r.move>0?'LONG':'SHORT';
const st={};const add=(k,ok)=>{const o=st[k]=st[k]||{n:0,g:0};o.n++;o.g+=ok?1:0;};
const per=r=>r.date<'2026'?'20-25':r.date<'2026-08'?'26 gen-lug':'26 ago-ott';
for(const r of rows){const R=LYM.read(r.seed,r.ramo,r.mese,yearB(r.date),r.stelo);if(!R||R.error)continue;
 const ys=yStem(r.date), ms=mStem(ys,r.mese), hs=ST[(ST.indexOf(WUSHU[r.stelo])+BR.indexOf(R.oraBranch))%10];
 const v=LT.leggi(R,{dayBranch:r.ramo,monthBranch:r.mese,yearBranch:yearB(r.date),oraBranch:R.oraBranch,dayStem:r.stelo,yearStem:ys,monthStem:ms,hourStem:hs,emaDir:r.ema,sediTutte:!!process.env.LTSEDI,yGeneraS:process.env.LTYGS!=='0',arrivoForte:process.env.LTFORTE!=='0',incompatibili:process.env.LTINC!=='0',mediazione:process.env.LTMED!=='0',forzaSedi:process.env.LTFORZA!=='0',sogliaForza:+process.env.LTSOGLIA||3});
 add('tutte le carte · '+(v.dir?'parla':'tace'),true);
 if(!v.dir) continue;
 const ok=v.dir===real(r); add('metodo del trend da solo',ok); add('metodo del trend · '+per(r),ok); add('metodo del trend · scarto '+Math.min(3,Math.abs(v.punti)),ok);
 if(r.dlr){ add('DLR dove il metodo parla',r.dlr===real(r)); if(r.dlr===v.dir) add('LIVELLO NUOVO: DLR e metodo del trend concordi',r.dlr===real(r)); else add('DLR e metodo del trend discordi → DLR',r.dlr===real(r)); }
 if(r.ly){ if(r.ly===v.dir) add('LY e metodo concordi → LY',r.ly===real(r)); else add('LY e metodo discordi → LY',r.ly===real(r)); }
}
for(const k of Object.keys(st).sort()){const s=st[k];console.log(k.padEnd(48),(s.g===s.n?'':Math.round(100*s.g/s.n)+'% ')+'('+s.g+'/'+s.n+')');}
