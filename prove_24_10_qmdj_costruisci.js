// Universo delle carte 2020-26 (stessi filtri di pb_stress: trend EMA consolidato, bordo del seme >=3, |mossa|>=25)
// + carta QMDJ oraria (ora = ramo del seme) e giornaliera per ognuna.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js');
const fs=require('fs'); const S='/home/claude/storico-trading/';
const T=require(S+'work_trading/pwa/trend.js');
const BR='子丑寅卯辰巳午未申酉戌亥';
const f3=p=>{const d=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return d.slice(0,Math.abs(Number(p))<1?2:3);};
function seedEdge(price){const p=Math.abs(Number(price));if(!(p>0))return null;const n=p<1?2:3;const step=Math.pow(10,Math.floor(Math.log10(p))-n+1);const fr=p/step-Math.floor(p/step);return Math.min(fr,1-fr)*100;}
const pf=c=>/JPY$/.test(c)?100:10000;
const cell=c=>c?Object.fromEntries(Object.entries(c.palaces).map(([p,d])=>[p,{t:d.tiH,e:d.diH,s:d.star,g:d.deity,d:d.doorName||d.door||'',zf:!!d.zhiFu,zs:!!d.zhiShi}])):null;
function carte(date,seed){const p=date.split('-').map(Number),ms=Date.UTC(p[0],p[1]-1,p[2],0,0,0);
  const o=Q.oraria(ms,BR[((seed-1)%12+12)%12]), g=Q.giornaliera(ms);
  return {giorno:o.giorno,ora:o.pilastro,mese:o.mese,ju:o.dun+o.ju,po:cell(o),jug:g?g.dun+g.ju:null,pg:cell(g)};}
const out=[];
if(process.argv[2]==='vivo'){
  const reg=JSON.parse(fs.readFileSync(S+'registro_live.json','utf8'));
  const dump=JSON.parse(fs.readFileSync(process.argv[3],'utf8'));
  for(const r of dump){const x=(reg[r.date]||[]).find(y=>y.cross===r.cross); if(!x||!r.trend||!r.real)continue;
    const mv=(r.real==='LONG'?1:-1)*Math.abs(r.move);
    out.push(Object.assign({cross:r.cross,date:r.date,seed:x.seed,trend:r.trend,move:mv,lio:r.liDir},carte(r.date,x.seed)));}
  fs.writeFileSync('/home/claude/qm/vivo.json',JSON.stringify(out)); console.log('vivo',out.length); process.exit(0);}
const hist=JSON.parse(fs.readFileSync(S+'full1h.json','utf8'));
for(const cross of Object.keys(hist.crosses)){const by={};
  hist.crosses[cross].forEach(x=>{const d=x.t.slice(0,10),hh=x.t.slice(11,13);by[d]=by[d]||{};if(hh==='00')by[d].o=x.o;if(hh==='21')by[d].c=x.c;});
  const days=Object.keys(by).sort().filter(d=>by[d].o!=null&&by[d].c!=null&&![0,6].includes(new Date(d+'T12:00:00Z').getUTCDay()));
  const f=pf(cross);
  for(let k=12;k<days.length;k++){const d=days[k];const closes=[];for(let j=0;j<k;j++)closes.push(by[days[j]].c);
    const ema=T.emaTrend(closes); if(!ema.direction||ema.direction==='flat'||!ema.consolidated)continue;
    const o=by[d].o,c=by[d].c,e=seedEdge(o); if(e!=null&&e<3)continue;
    const move=(c-o)*f; if(Math.abs(move)<25)continue;
    const seed=parseInt(f3(o),10);
    out.push(Object.assign({cross,date:d,seed,trend:ema.direction==='up'?'LONG':'SHORT',move},carte(d,seed)));}
  console.error(cross,out.length);}
fs.writeFileSync('/home/claude/qm/storico.json',JSON.stringify(out)); console.log('storico',out.length);
