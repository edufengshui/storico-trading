global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const da=process.argv[2]||'2026-11-16';const T={d:[0,0,0,0],z:[0,0,0,0]};
for(const d of Object.keys(reg).sort()){if(d<da)continue;for(const y of reg[d]){if((y.livello||y.liv)!=='LI'||!y.signal)continue;
  const p=d.split('-').map(Number),ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((y.seed-1)%12+12)%12]);
  const a=Q.lettura(ch,y.trend,'dshs'),z=Q.lettura(ch,y.trend,'zfty');
  const f=(x,k)=>{const v=x.dir?(x.dir===y.signal?'come Lio':'CONTRO Lio'):'tace';if(y.esito!=null&&y.esito!==0){const lose=y.esito<0;if(x.dir&&x.dir!==y.signal)T[k][lose?0:1]++;else if(x.dir)T[k][lose?2:3]++;}return (x.dir||'-')+' ('+v+')';};
  console.log(d,y.cross,'Lio',y.signal,y.forza,'trend',y.trend,'esito',y.esito??'aperto','| DsHs',f(a,'d'),'| ZFTY',f(z,'z')+(z.segueForte?' FORTE':''));
  if(process.argv[3])console.log('    DsHs:',a.motivo,'\n    ZFTY:',z.motivo);}}
console.log('DsHs: contro Lio su persi',T.d[0],'su vinti',T.d[1],'| come Lio su persi',T.d[2],'su vinti',T.d[3]);
console.log('ZFTY: contro Lio su persi',T.z[0],'su vinti',T.z[1],'| come Lio su persi',T.z[2],'su vinti',T.z[3]);
