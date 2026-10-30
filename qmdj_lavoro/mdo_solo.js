// MDO metodo autonomo: entrare all'ora del Commander nella direzione della carta (DsHs+ZFTY), uscire alle 21 GMT.
// Confronto: stessa direzione entrando a mezzanotte (per vedere se l'ora aggiunge qualcosa).
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.trend);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const G={}; const add=(k,per,p)=>{const g=(G[k]=G[k]||{})[per]=(G[k]||{})[per]||{n:0,v:0,p:0};g.n++;if(p>0)g.v++;g.p+=p;};
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const a=Q.lettura(ch,c.trend,'dshs'), b=Q.lettura(ch,c.trend,'zfty');
 const sa=a?a.segue:null, sb=b?b.segue:null; const seg=(sa===null)?sb:(sb===null)?sa:(sa===sb?sa:null);
 const per=c.date<'2024'?'2020-23':c.date<'2026-09-29'?'2024-26':'vivo', opp=c.trend==='LONG'?'SHORT':'LONG';
 const hrs=QO.ore(ch,seg).filter(o=>o&&o.ecc&&o.verso&&!o.verso.startsWith('niente'));
 for(const o of hrs){ const dir=o.verso==='trend'?c.trend:opp, sg=dir==='LONG'?1:-1;
  const gmt=QO.oreGMT(o.ramo); if(!gmt.length) continue; const h0=gmt[0]; if(!B[h0]) continue;
  const ora=(B[20].c-B[h0].o)/pip*sg-1.5, notte=(B[20].c-B[0].o)/pip*sg-1.5;
  const tag=(seg===null?'carta ferma':'carta decisa');
  add('ora del Commander ('+tag+')',per,ora); add('  stessa dir. da mezzanotte ('+tag+')',per,notte);
  if(o.propria){ add('ora propria',per,ora); add('  stessa dir. da mezzanotte (propria)',per,notte); }
  if(o.output){ add('ora Output',per,ora); add('  stessa dir. da mezzanotte (Output)',per,notte); }
  if(o.forte){ add('ora forte',per,ora); add('  stessa dir. da mezzanotte (forte)',per,notte); }
 }
}
const st=g=>g?(g.n+' · '+(100*g.v/g.n).toFixed(1)+'% · '+(g.p>=0?'+':'')+g.p.toFixed(0)+' ('+(g.p/g.n).toFixed(1)+'/tr)'):'-';
for(const k of Object.keys(G).sort((x,y)=>x.replace(/^ +stessa dir. da mezzanotte \((.*)\)/,'$1~').localeCompare(y.replace(/^ +stessa dir. da mezzanotte \((.*)\)/,'$1~')))) console.log(k.padEnd(44),['2020-23','2024-26','vivo'].map(p=>p+' '+st(G[k][p])).join(' | '));
