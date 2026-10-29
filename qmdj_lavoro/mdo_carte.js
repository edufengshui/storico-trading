global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const L=[['EURUSD','2026-10-05'],['EURUSD','2026-10-07'],['GBPUSD','2026-10-14'],['USDCHF','2026-10-14'],['EURJPY','2026-10-07'],['EURJPY','2026-10-05'],['EURJPY','2026-10-06'],['USDJPY','2026-10-01'],['USDCAD','2026-10-13'],['USDJPY','2026-09-10'],['AUDUSD','2026-09-10'],['NZDUSD','2026-10-28']];
for(const [cr,d] of L){ const B={}; for(const src of [OO,H]) for(const b of (src[cr]||[])) if(b.t.startsWith(d)) B[+b.t.slice(11,13)]=b;
 const c=M[cr+'|'+d]; const pip=cr.includes('JPY')?0.01:0.0001, sg=c.trend==='LONG'?1:-1;
 const lv=(reg[d]||[]).find(y=>y.cross===cr); const seed=lv?lv.seed:parseInt(f3(B[0].o),10);
 const p=d.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const a=Q.lettura(ch,c.trend,'dshs'), z=Q.lettura(ch,c.trend,'zfty'); const sa=a&&a.segue, sz=z&&z.segue; const ver=sa==null?sz:sz==null?sa:sa===sz?sa:null;
 const ore=QO.ore(ch,ver); let best=null,bv=0; const mv={};
 for(const x of ore){const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) continue; const m=(B[hs[hs.length-1]].c-B[hs[0]].o)/pip*sg; mv[x.ramo]=m; if(Math.abs(m)>Math.abs(bv)){bv=m;best=x.pilastro;}}
 const ecc=ore.filter(x=>x.ecc).map(x=>x.pilastro+'('+(x.verso||'').replace('contro il trend','contro').replace(/niente.*/,'niente')+(x.forte?',forte':'')+') '+Math.round(mv[x.ramo]||0));
 console.log(cr,d,'giorno',c.real===c.trend?'segue':'NON segue',Math.round(c.move),'| carta:',ver===null?'?':ver?'segue':'non segue','| ora piu\' forte',best,Math.round(bv),'| ore MDO:',ecc.join(' '));
}
