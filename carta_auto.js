// Uso: node carta_auto.js "TITOLO" seme annoStelo annoRamo meseRamo giornoStelo giornoRamo out.png
// Costruisce la carta col motore (liuyao.js) e la disegna col programma di Edu: la mobile e le
// INCOMPATIBILI (Edu 08/10/2026: "se c'è una linea incompatibile devi farla muovere") come linee che si muovono.
const D=__dirname;
global.window=global; const lj=require(D+'/node_modules/lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const LYM=require(D+'/liuyao.js'); const {execFileSync}=require('child_process');
const [tit,seed,yS,yB,mB,dS,dB,out]=process.argv.slice(2);
const R=LYM.read(+seed,dB,mB,yB,dS);
const COD={'子':'z','丑':'c','寅':'y','卯':'m','辰':'cn','巳':'si','午':'w','未':'we','申':'s','酉':'yo','戌':'xu','亥':'h'};
const ST={'甲':'Jia','乙':'Yi','丙':'Bing','丁':'Ding','戊':'Wu','己':'Ji','庚':'Geng','辛':'Xin','壬':'Ren','癸':'Gui'};
const STL=Object.keys(ST), BRL=Object.keys(COD);
const mS=STL[((STL.indexOf(yS)%5)*2+2+((BRL.indexOf(mB)+10)%12))%10];
const muove=[R.mutante.pos].concat(R.incompatibili||[]);
const t=R.linee.map(L=>muove.includes(L.pos)?(L.yang?'O':'X'):(L.yang?'-':'- -'));
console.log('incompatibili:',(R.incompatibili||[]).join(',')||'nessuna');
execFileSync('node',[__dirname+'/carta_grafica.js',out,tit,COD[yB],ST[yS],COD[mB],ST[mS],COD[dB],ST[dS],seed,...t],{stdio:'inherit'});
