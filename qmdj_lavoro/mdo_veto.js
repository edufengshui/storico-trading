// MDO come veto/conferma di Lio: il verso dell'ora del Commander (= direzione della carta) contro o con Lio
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const D=Object.values(M).filter(c=>c.liDir&&c.trend);
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const G={}; const add=(k,per,p)=>{const g=(G[k]=G[k]||{})[per]=(G[k]||{})[per]||{n:0,v:0,p:0};g.n++;if(p>0)g.v++;g.p+=p;};
for(const c of D){ const B=idx[c.cross+'|'+c.date]; if(!B||!B[0]||!B[20]) continue; const pip=c.cross.includes('JPY')?0.01:0.0001;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); if(!seed) continue;
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const a=Q.lettura(ch,c.trend,'dshs'), b=Q.lettura(ch,c.trend,'zfty');
 const sa=a?a.segue:null, sb=b?b.segue:null; const seg=(sa===null)?sb:(sb===null)?sa:(sa===sb?sa:null);
 const per=c.date<'2024'?'2020-23':c.date<'2026-09-29'?'2024-26':'vivo';
 const pnl=(B[20].c-B[0].o)/pip*(c.liDir==='LONG'?1:-1)-1.5;
 const opp=c.trend==='LONG'?'SHORT':'LONG';
 const hrs=QO.ore(ch,seg).filter(o=>o&&o.ecc&&o.verso&&!o.verso.startsWith('niente'));
 const dirs=hrs.map(o=>({d:o.verso==='trend'?c.trend:opp,o}));
 add('Lio tutti',per,pnl);
 const contro=dirs.some(x=>x.d!==c.liDir), con=dirs.some(x=>x.d===c.liDir);
 if(!dirs.length) add('nessuna ora MDO attiva',per,pnl);
 if(contro&&!con) add('MDO contro Lio',per,pnl);
 if(con&&!contro) add('MDO con Lio',per,pnl);
 if(seg!==null&&contro&&!con) add('MDO contro Lio, carta decisa',per,pnl);
 if(dirs.some(x=>x.o.propria&&x.d!==c.liDir)) add('ora propria contro Lio',per,pnl);
 if(dirs.some(x=>x.o.forte&&x.d!==c.liDir)) add('ora forte contro Lio',per,pnl);
 if(dirs.some(x=>x.o.output&&x.d!==c.liDir)) add('ora Output contro Lio',per,pnl);
 if(dirs.some(x=>x.o.propria&&x.d===c.liDir)) add('ora propria con Lio',per,pnl);
}
const st=g=>g?(g.n+' · '+(100*g.v/g.n).toFixed(1)+'% · '+(g.p>=0?'+':'')+g.p.toFixed(0)):'-';
for(const k in G) console.log(k.padEnd(30),['2020-23','2024-26','vivo'].map(p=>p+' '+st(G[k][p])).join(' | '));
