// come carta_live.js ma prende trend ed esito dal dump di misura_vivo (/tmp/dump.json): serve per i giorni prima del registro in avanti.
// Uso: node qmdj_lavoro/carta_dump.js CROSS AAAA-MM-GG
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const [cross,date]=process.argv.slice(2); const x=JSON.parse(fs.readFileSync('/tmp/dump.json')).find(y=>y.cross===cross&&y.date===date);
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses, OO=(j=>j.crosses||j)(JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')));
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const B={}; for(const src of [H,OO]) for(const b of (src[cross]||[])) if(b.t.slice(0,10)===date) B[+b.t.slice(11,13)]=b;
const pip=cross.includes('JPY')?0.01:0.0001, seed=parseInt(f3(B[0].o),10), p=date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
console.log(JSON.stringify({trend:x.trend,real:x.real,move:x.move,lio:x.liDir,forza:x.liForza,liv:x.liv,seed,apertura:B[0].o}));
const sg=x.trend==='LONG'?1:-1;
console.log(QO.ore(ch,null).map(o=>{const hs=QO.oreGMT(o.ramo); if(!hs.length||hs.some(h=>!B[h])) return null; const mv=Math.round((B[hs[hs.length-1]].c-B[hs[0]].o)/pip); return o.pilastro+' '+String(hs[0]).padStart(2,'0')+'-'+String(hs[hs.length-1]+1).padStart(2,'0')+' '+Math.abs(mv)+' '+(mv*sg>0?'con':'contro')+(o.autoTY?' [autoTY]':'')+(o.ecc?' [Cmd '+o.forma+']':'');}).filter(Boolean).join(' | '));
console.log(JSON.stringify({dun:ch.dun,ju:ch.ju,pil:ch.pilastro,g:ch.giorno,m:ch.mese,a:ch.anno}));
for(const k in ch.palaces){const P=ch.palaces[k]; console.log(k,'cielo',P.tiH,P.ti2H||'','terra',P.diH,P.di2H||'',P.star,P.star2||'',P.doorName||'',P.deity,P.zhiShi?'ZS':'');}
for(const sis of ['zfty','dshs']){const z=Q.lettura(ch,x.trend,sis); console.log(sis,z.dir,z.segue,z.motivo,'| palDecide',z.palDecide,z.passoDecide);}
const b=Q.bilancia(ch,x.trend); console.log('bilancia',b.dir,b.long,b.short); for(const v of b.voci) console.log('  ',v.dir,v.peso,v.t);
try{console.log('flusso',JSON.stringify(Q.flussoQi(ch)));}catch(e){}
