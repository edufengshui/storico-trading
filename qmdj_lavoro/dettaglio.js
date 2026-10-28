// node dettaglio.js CROSS AAAA-MM-GG  -> seme, pilastri, lettura, palazzi, e carta.html per il renderer
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'); const [cr,d]=process.argv.slice(2);
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json')); let seed=((reg[d]||[]).find(x=>x.cross===cr)||{}).seed;
if(!seed){ const L=JSON.parse(fs.readFileSync('/home/claude/qm/lio_qmdj.json')); }
if(!seed){ const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses[cr]; const b=H.find(x=>x.t===d+' 00:00:00');
  if(!b){ const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O; const bb=(OO[cr]||[]).find(x=>x.t===d+' 00:00:00'); if(bb) seed=bb.o; } else seed=b.o;
  const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);}; seed=parseInt(f3(seed),10); }
let LQ=JSON.parse(fs.readFileSync('/home/claude/qm/lio_qmdj.json')).find(x=>x.cross===cr&&x.date===d); if(!LQ){const s0=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).find(x=>x.cross===cr&&x.date===d); if(s0) LQ={trend:s0.trend,move:s0.move,lio:null,forza:null};}
const BR='子丑寅卯辰巳午未申酉戌亥', br=BR[((seed-1)%12+12)%12], p=d.split('-').map(Number), c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),br);
console.log('seme',seed,br,'| ora',c.pilastro,'giorno',c.giorno,'mese',c.mese,'anno',c.anno,'|',c.dun,c.ju,c.jiu.termine,c.jiu.yuan, c.prossimoComandante||'');
if(LQ) console.log('trend',LQ.trend,'mossa',Math.round(LQ.move),'Lio',LQ.lio,LQ.forza);
console.log(JSON.stringify(Q.lettura(c,LQ?LQ.trend:'LONG',process.env.SIS)));
for(let k=1;k<=9;k++){const x=c.palaces[k];console.log(k,x.deity,x.star,x.doorName,x.tiH+'/'+x.diH,x.zhiShi?'ZS':'');}
console.log('RENDER',d,c.pilastro[0],c.pilastro[1],c.ju,c.dun);
