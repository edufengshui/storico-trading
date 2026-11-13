global.window=global;const lj=require("lunar-javascript");global.Solar=lj.Solar;global.Lunar=lj.Lunar;
global.XKDGSolarTime=require("/home/claude/trading/solar-time.js");global.XKDGJieQiGMT=require("/home/claude/trading/jieqi-gmt.js");
const Q=require("/home/claude/trading/qmdj.js"),fs=require("fs"),BR="子丑寅卯辰巳午未申酉戌亥";
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const idx={};for(const c in H)for(const b of H[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]=idx[k]||{})[+b.t.slice(11,13)]=b;}
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const D=JSON.parse(fs.readFileSync('dump_2020_26.json')).concat(JSON.parse(fs.readFileSync('dump_vivo.json')).filter(x=>x.date>'2026-07-30'));
const G={};const add=(k,p,ok,pp)=>{const g=((G[k]=G[k]||{})[p]=G[k][p]||[0,0,0]);g[0]++;if(ok)g[1]++;g[2]+=pp;};
for(const c of D){const B=idx[c.cross+'|'+c.date];if(!B||!B[0]||!B[21]||!c.trend)continue;const seed=parseInt(f3(B[0].o),10);
 const p=c.date.split('-').map(Number),ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);const r=Q.lettura(ch,c.trend,'zfty');if(!r||!r.dir)continue;
 const per=c.date<'2024'?'2020-23':c.date<'2026-08'?'2024-26':'vivo';const pip=c.cross.includes('JPY')?100:10000,m=(B[21].o-B[0].o)*pip;
 const mot=r.motivo||'';
 if(/ponte[^·]*vince il giorno/.test(mot)&&/View clasha il trend: non segue/.test(mot)){
   const segueReal=(m>0?'LONG':'SHORT')===c.trend; add('ponte vince il giorno, poi View ribalta: non segue',per,!segueReal,(c.trend==='LONG'?-1:1)*m);
   if(c.date>='2025-06') console.log(c.date,c.cross,segueReal?'SEGUE':'non segue',Math.round(m));}
 if(/ponte[^·]*vince il giorno/.test(mot)&&!/View clasha/.test(mot)){const segueReal=(m>0?'LONG':'SHORT')===c.trend;add('ponte vince il giorno, senza View',per,segueReal===r.segue,0);}
}
for(const k in G)console.log(k.padEnd(52),['2020-23','2024-26','vivo'].map(p=>{const g=G[k][p];return g?g[0]+' giusto '+(100*g[1]/g[0]).toFixed(0)+'% '+Math.round(g[2]):'-'}).join(' | '));
