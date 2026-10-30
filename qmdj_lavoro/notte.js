global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const D=JSON.parse(fs.readFileSync(process.argv[2]));
const OO=(j=>j.crosses||j)(JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')));
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
for(const r of D){ const B={}; for(const src of [H,OO]) for(const b of (src[r.cross]||[])) if(b.t.slice(0,10)===r.date) B[+b.t.slice(11,13)]=b;
 const pip=r.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[r.date]||[]).find(y=>y.cross===r.cross); const seed=lv?lv.seed:(B[0]?parseInt(f3(B[0].o),10):null);
 const p=r.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const a=Q.lettura(ch,r.trend,'dshs'), z=Q.lettura(ch,r.trend,'zfty');
 const mv=QO.ore(ch,null).map(x=>{const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) return null; return [x.pilastro,hs[0],Math.round((B[hs[hs.length-1]].c-B[hs[0]].o)/pip)];}).filter(Boolean).sort((a,b)=>Math.abs(b[2])-Math.abs(a[2])).slice(0,3);
 console.log(r.cross,r.trend,'real',r.real,r.move,'Lio',r.liDir||'fermo',r.liForza||'','| DsHs',a&&a.dir,a&&a.palDecide,'| ZFTY',z&&z.dir,z&&z.palDecide,'| seed',seed,'| ore',JSON.stringify(mv));
}
