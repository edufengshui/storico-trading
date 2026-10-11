// lettura_trend_rif.js — controllo delle carte lette da Edu col METODO DEL TREND (carte_trend.json, S55 09-11/10/2026).
// Uso: node lettura_trend_rif.js   -> stampa ok/NO per ogni carta (atteso: LONG, SHORT o tace) e il totale.
const D=__dirname;global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js'),LT=require(D+'/lettura_trend.js');
const ST=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
let ok=0;const C=require(D+'/carte_trend.json');
for(const k of C){const R=LYM.read(k.seed,k.dayBranch,k.monthBranch,k.yearBranch,k.dayStem);
 const ms=ST[((ST.indexOf(k.yearStem)%5)*2+2+((BR.indexOf(k.monthBranch)+10)%12))%10],hs=ST[(ST.indexOf(WUSHU[k.dayStem])+BR.indexOf(R.oraBranch))%10];
 const v=LT.leggi(R,{dayBranch:k.dayBranch,monthBranch:k.monthBranch,yearBranch:k.yearBranch,oraBranch:R.oraBranch,dayStem:k.dayStem,yearStem:k.yearStem,monthStem:ms,hourStem:hs,emaDir:k.ema});
 const r=v.dir||'tace';const g=r===k.atteso;ok+=g?1:0;console.log((g?'ok ':'NO ')+k.cross+' '+k.date+' s'+k.seed+' atteso '+k.atteso+(g?'':' dice '+r));}
console.log('carte del trend lette da Edu: '+ok+'/'+C.length);
