// LIVELLO D: per ogni carta (esagramma + linea mobile) una regola dalle sue ripetizioni, provata su quella lasciata fuori
const D='/home/claude/edufengshui/storico-trading';global.window=global;const lj=require(D+'/node_modules/lunar-javascript');global.Solar=lj.Solar;global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js'),IV=require(D+'/inventario_carta.js');
const ST=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'],BR=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
const fs=require('fs');const db=[];
for(const r of JSON.parse(fs.readFileSync(process.argv[2]||'/tmp/tresist.json','utf8')).filter(r=>r.ema&&Math.abs(r.move)>=20)){const yp=lj.Solar.fromYmdHms(...r.date.split('-').map(Number),8,0,0).getLunar().getYearInGanZhiExact();const R=LYM.read(r.seed,r.ramo,r.mese,yp[1],r.stelo);if(!R||R.error||!R.mutante||!R.mutante.pos)continue;
const ms=ST[((ST.indexOf(yp[0])%5)*2+2+((BR.indexOf(r.mese)+10)%12))%10],hs=ST[(ST.indexOf(WUSHU[r.stelo])+BR.indexOf(R.oraBranch))%10];
const inv=IV.inventario(R,{dayBranch:r.ramo,monthBranch:r.mese,yearBranch:yp[1],oraBranch:R.oraBranch,dayStem:r.stelo,yearStem:yp[0],monthStem:ms,hourStem:hs,emaDir:r.ema});
const f={};const S=inv.linee[inv.shi-1],Y=inv.linee[inv.ying-1];
// le caratteristiche della data sulla carta (le stesse per ogni carta, dette in parole di Edu)
for(const [k,X] of [['Shi',S],['Ying',Y]]){f[k+' '+X.stagione]=1;f[k+(X.timely?' di stagione':' fuori stagione')]=1;if(X.vuoto)f[k+' vuoto']=1;if(X.giornoSostiene)f[k+' sostenuto dal giorno']=1;
 X.giorno.forEach(a=>f[k+': il giorno '+a]=1);X.ora.forEach(a=>f[k+': l\'ora '+a]=1);X.mese.forEach(a=>f[k+': il mese '+a]=1);if(X.ramo===inv.anno)f[k+' Tai Sui']=1;}
inv.linee.forEach(x=>{f['L'+x.pos+' '+x.stagione]=1;if(x.vuoto)f['L'+x.pos+' vuota']=1;x.giorno.forEach(a=>f['L'+x.pos+': il giorno '+a]=1);});
const m=inv.movimenti.find(z=>z.tipo==='mobile');if(m){f['arrivo della mobile '+(m.arrTimely?'di stagione':'fuori stagione')]=1;if(m.arrVuoto)f['arrivo della mobile vuoto']=1;m.blocchi.forEach(b=>f['mobile: '+b]=1);}
const sz=inv.linee.find(x=>x.bestia==='螣蛇');if(sz&&(sz.sede||sz.muove)&&sz.stagione==='死')f['Serpente morto su sede o mobile']=1;
f['mese '+r.mese]=1;f['giorno '+r.ramo]=1;
db.push({cross:r.cross,date:r.date,seed:r.seed,forma:R.sup+'/'+R.inf+' L'+R.mutante.pos,trend:r.ema,move:r.move,segue:(r.ema==='up')===(r.move>0)?1:0,f:Object.keys(f),dlr:r.dlr,ly:r.ly});}
fs.writeFileSync('/tmp/db_carte.json',JSON.stringify(db));
// regola di una carta: fra le caratteristiche, quella che divide meglio le sue ripetizioni (almeno 3 casi col tratto e 3 senza)
function regola(rip){if(rip.length<5)return null;const fe={};rip.forEach(x=>x.f.forEach(k=>fe[k]=1));let best=null;
 for(const k of Object.keys(fe)){const con=rip.filter(x=>x.f.includes(k)),senza=rip.filter(x=>!x.f.includes(k));if(con.length<3||senza.length<3)continue;
  const pc=con.reduce((a,x)=>a+x.segue,0)/con.length,ps=senza.reduce((a,x)=>a+x.segue,0)/senza.length;
  // accuratezza se si dice: col tratto -> il verso maggioritario fra i "con", senza -> il maggioritario fra i "senza"
  const acc=(con.reduce((a,x)=>a+(x.segue===(pc>=.5?1:0)),0)+senza.reduce((a,x)=>a+(x.segue===(ps>=.5?1:0)),0))/rip.length;
  if(!best||acc>best.acc)best={k,acc,con:pc>=.5?1:0,senza:ps>=.5?1:0,pc,ps};}
 return best;}
const forme={};db.forEach(x=>(forme[x.forma]=forme[x.forma]||[]).push(x));
// 1) quanto bene la regola spiega le carte da cui nasce (dentro il campione)
let dn=0,dok=0;Object.values(forme).forEach(rip=>{const g=regola(rip);if(!g)return;rip.forEach(x=>{dn++;if(x.segue===(x.f.includes(g.k)?g.con:g.senza))dok++;});});
// 2) la prova vera: ogni carta lasciata fuori, la regola ricavata dalle ALTRE ripetizioni della stessa carta
let n=0,ok=0,pip=0;const perAnno={};
db.forEach(x=>{const altre=forme[x.forma].filter(y=>y!==x);const g=regola(altre);if(!g)return;const pred=x.f.includes(g.k)?g.con:g.senza;n++;const giusto=pred===x.segue;if(giusto)ok++;pip+=giusto?Math.abs(x.move):-Math.abs(x.move);const a=x.date.slice(0,4);perAnno[a]=perAnno[a]||[0,0];perAnno[a][0]++;perAnno[a][1]+=giusto?1:0;});
// 3) prova nel tempo: regole ricavate solo dal 2020-2023, provate sul 2024-2026
let tn=0,tok=0;Object.values(forme).forEach(rip=>{const prima=rip.filter(x=>x.date<'2024'),dopo=rip.filter(x=>x.date>='2024');const g=regola(prima);if(!g)return;dopo.forEach(x=>{tn++;if(x.segue===(x.f.includes(g.k)?g.con:g.senza))tok++;});});
console.log('database: '+db.length+' carte, '+Object.keys(forme).length+' forme');
console.log('1) dentro il campione (la regola spiega le carte da cui nasce): '+(100*dok/dn).toFixed(1)+'% su '+dn);
console.log('2) carta lasciata fuori, regola dalle altre ripetizioni: '+(100*ok/n).toFixed(1)+'% su '+n+', '+Math.round(pip)+' pip');
console.log('   per anno: '+Object.keys(perAnno).sort().map(a=>a+' '+(100*perAnno[a][1]/perAnno[a][0]).toFixed(0)+'%').join(' · '));
console.log('3) regole dal 2020-23 provate sul 2024-26: '+(100*tok/tn).toFixed(1)+'% su '+tn);
