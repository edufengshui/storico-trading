// lettura_trend_categorie.js — il principio 1 del metodo del trend (chi esce dal gioco) diviso per tipo, sul 2020-25.
// Uso: node lettura_trend_categorie.js ["nome categoria"]  (stampa anche le carte sbagliate della categoria). Serve /tmp/tresist.json.
const D=__dirname;global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js'),LT=require(D+'/lettura_trend.js');
const ST=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
const st={};const ex={};const add=(k,ok,r)=>{const o=st[k]=st[k]||[0,0];o[0]++;o[1]+=ok?1:0;if(!ok){(ex[k]=ex[k]||[]).push(r);}};
for(const r of require(process.env.TRESIST||'/tmp/tresist.json').filter(r=>Math.abs(r.move)>=20&&r.ema&&r.date<'2026')){const yp=lj.Solar.fromYmdHms(...r.date.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact();const R=LYM.read(r.seed,r.ramo,r.mese,yp[1],r.stelo);if(!R||R.error)continue;
const ms=ST[((ST.indexOf(yp[0])%5)*2+2+((BR.indexOf(r.mese)+10)%12))%10],hs=ST[(ST.indexOf(WUSHU[r.stelo])+BR.indexOf(R.oraBranch))%10];
const v=LT.leggi(R,{dayBranch:r.ramo,monthBranch:r.mese,yearBranch:yp[1],oraBranch:R.oraBranch,dayStem:r.stelo,yearStem:yp[0],monthStem:ms,hourStem:hs,emaDir:r.ema});if(!v.dir||v.principio!==1)continue;
const last=v.racconto[v.racconto.length-2];let k=last.includes('il confronto con')?'bestie dal lato':last.includes('bestia')?'bestie':last.includes('prende il posto')?'sostituto':last.includes('vuot')?'scartata nel vuoto':last.includes('eliminat')?'eliminata dal clash del giorno':last.includes('flusso')?'flusso dello stelo':'altro';
const ok=v.dir===(r.move>0?'LONG':'SHORT');
let sub=k;if(k==='scartata nel vuoto'){const kS=last.startsWith('lo Shi')?'Shi':'Ying';const mob=R.mutante.pos===R[kS==='Shi'?'shi':'ying'];sub+=' · '+kS+(mob?' mobile':' incompatibile');}
if(k==='eliminata dal clash del giorno'){const kS=last.startsWith('lo Shi')?'shi':'ying';sub+=' · '+(kS==='shi'?'Shi':'Ying')+' '+R.linee[R[kS]-1].par+(R.mutante.pos===R[kS]?' mobile':' ferma');}
add(sub,ok,[r.cross,r.date,r.seed,r.stelo+r.ramo,r.mese,r.ema,r.move,last].join(' '));}
for(const k of Object.keys(st).sort())console.log(k.padEnd(48),Math.round(100*st[k][1]/st[k][0])+'%',st[k][0]);
const k=process.argv[2];if(k)console.log((ex[k]||[]).slice(0,12).join('\n'));
