global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json')); const LQ=JSON.parse(fs.readFileSync('/home/claude/qm/lio_qmdj.json'));
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'}, NOME={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li'};
const steli=p=>[p.tiH,p.diH,p.di2H].filter(Boolean);
const visib=gz=>{ if(gz[0]!=='甲') return gz[0]; return LIU[BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]]; };
const CARTE=[['NZDUSD','2026-10-28','丁丑'],['EURJPY','2026-10-15','辛丑 丁未'],['EURJPY','2026-09-29','丙申'],['USDJPY','2026-10-22','乙丑 丙寅 丁卯'],['AUDUSD','2026-09-10','丙午'],['USDJPY','2026-09-24','戊子 辛卯'],['USDJPY','2026-09-10','甲辰']];
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
for(const [cr,d,edu] of CARTE){ let s=((reg[d]||[]).find(x=>x.cross===cr)||{}).seed; if(!s){ const b=(H[cr]||[]).find(x=>x.t===d+' 00:00:00')||((OO[cr]||[]).find(x=>x.t===d+' 00:00:00')); s=parseInt(f3(b.o),10);} const p=d.split('-').map(Number); const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((s-1)%12+12)%12]);
 let zs=null; for(let q=1;q<=9;q++) if(q!==5&&ch.palaces[q].zhiShi) zs=q;
 const t=(LQ.find(x=>x.cross===cr&&x.date===d)||{}).trend||'LONG'; const g=Q.lettura(ch,t,'zfty').giornoOra, g2=Q.lettura(ch,t,'dshs').giornoOra;
 console.log(cr,d,'Edu:',edu,'| ZS',NOME[zs],'| ZFTY ZF',NOME[g.palGiorno],'TY',NOME[g.palOra],'| DsHs DS',NOME[g2.palGiorno],'HS',NOME[g2.palOra]);
 for(const hb of edu.split(' ')){ const gz=hb; const v=visib(gz); const pr=[];
  for(const q of [1,2,3,4,6,7,8,9]){ const r=PB[q].includes(gz[1])?'ramo':(LIU[gz[1]]&&steli(ch.palaces[q]).includes(LIU[gz[1]]))?'ramo(六仪)':''; const st=steli(ch.palaces[q]).includes(v)?'stelo':''; if(r||st) pr.push(NOME[q]+':'+[st,r].filter(Boolean).join('+')); }
  console.log('   ',gz,'accende',pr.join('  ')); } }
