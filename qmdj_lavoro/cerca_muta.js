global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){ if(b.t<'2026-08-01') continue; const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const out=[];
for(const k in M){ const c=M[k]; if(!c.trend||c.date<'2026-08-01'||Math.abs(c.move)<50) continue; const B=idx[k]; if(!B||!B[0]||!B[20]) continue;
 const pip=c.cross.includes('JPY')?0.01:0.0001, sg=c.trend==='LONG'?1:-1;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10);
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const ore=QO.ore(ch,null); let best=null,bv=0,mx=0;
 for(const x of ore){const hs=QO.oreGMT(x.ramo); if(!hs.length||hs.some(h=>!B[h])) continue; const m=(B[hs[hs.length-1]].c-B[hs[0]].o)/pip*sg; if(Math.abs(m)>Math.abs(bv)){bv=m;best=x.pilastro;} if(x.ecc) mx=Math.max(mx,Math.abs(m));}
 const n=ore.filter(x=>x.ecc).length;
 if(Math.abs(bv)>=35 && mx<8) out.push([c.cross,c.date,c.real===c.trend?'segue':'NON',Math.round(c.move),best,Math.round(bv),'ecc',n,'maxMDO',Math.round(mx),'Lio',c.liDir||'-'].join(' '));
}
console.log(out.sort().join('\n'));
