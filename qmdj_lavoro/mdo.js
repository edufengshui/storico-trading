global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'); const BR='子丑寅卯辰巳午未申酉戌亥';
const [cr,d,tr]=process.argv.slice(2);
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json')); const lv=(reg[d]||[]).find(x=>x.cross===cr);
const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const H=(O.crosses||O)[cr].filter(b=>b.t.startsWith(d));
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const seed=lv?lv.seed:parseInt(f3(H[0].o),10); const p=d.split('-').map(Number); const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
console.log('seme',seed,'ora',ch.ora||'', 'giorno',ch.giorno);
for(const s of ['dshs','zfty']) console.log(s, JSON.stringify(Q.lettura(ch,tr,s)).slice(0,300));
const pip=cr.includes('JPY')?0.01:0.0001, sg=tr==='LONG'?1:-1;
for(const x of QO.ore(ch)) if(x.ecc) console.log(JSON.stringify(x),'GMT',QO.oreGMT(x.ramo).join(','));
const o0=H[0].o; for(const b of H) console.log(b.t.slice(11,13), Math.round((b.c-o0)/pip*sg), 'barra',Math.round((b.c-b.o)/pip*sg));
for(let k=1;k<=9;k++){const q=ch.palaces[k]; console.log(k,q.deity,q.star,q.door,q.tiH+'/'+q.diH, q.ti2H||'');}
console.log(JSON.stringify(Object.keys(ch)));
