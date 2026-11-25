// Bilancia: esporta per ogni trade di Lio le indicazioni per famiglia, col segno rispetto al verso di Lio (+ pro Lio, - contro).
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const {punti}=require('./bilancia_sim.js');
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend&&x.date<='2026-10-16').sort((a,b)=>a.date<b.date?-1:1);
const FAM=[['base controlla',/^(il giorno|l'ora) controlla/],['base genera',/^(il giorno|l'ora) genera/],['il controllo tiene',/il controllo tiene/],
['Commander opposto al vincitore',/ribaltato/],['Geng (sopra 庚, 庚\/丙)',/庚/],['View clasha un lato',/View clasha/],['View spinge in su',/il cross tende a salire/],
['bloccato da combinazione',/bloccat/],['Tai Sui timely opposto',/Tai Sui timely opposto/],['flusso del qi su View',/^flusso/],['ponte (passamano)',/passamano/],
['fan yin',/fan yin: non segue/],['Wu interno, ZF esterno',/Wu interno/],['ZF generato da Tai Sui e DS',/ZF generato dal Tai Sui/],['colpito (clash + ZS opposto)',/colpit/],
['mese (opposto, o ramo con ZF/TY)',/mese opposto|ramo del mese/],['ZS (in salute, o genera/controlla)',/ZS/],['ZF vuoto del giorno',/ZF vuoto/],['trigono vivo',/trigono/],
['paralleli Gen e Kun',/paralleli in/],['Birth e Death',/Birth piu/],['drago fugge',/青龍/],['TY indebolito (somma)',/indebolito/]];
const out=[],ST={};
for(const x of D){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
  let pu=punti(Q.lettura(ch,x.trend,'zfty').motivo),da='zfty';if(!(pu.s+pu.n+pu.l)){pu=punti(Q.lettura(ch,x.trend,'dshs').motivo);da='dshs';}
  const f=new Array(FAM.length+1).fill(0);const sgT=x.liDir===x.trend?1:-1,sgL=x.liDir==='LONG'?1:-1;
  for(const [t,m] of pu.el){const v=t==='sale'?sgL:(t==='segue'?sgT:-sgT);let k=FAM.findIndex(a=>a[1].test(m));if(k<0)k=FAM.length;f[k]+=v;}
  const win=x.liDir===x.real?1:0;const sk=x.cross+x.liForza+(x.liDir===x.trend?'c':'k');const h=ST[sk]||[0,0];
  out.push({d:x.date,c:x.cross,win,pip:win?Math.abs(x.move):-Math.abs(x.move),forza:x.liForza,col:x.liDir===x.trend?1:0,stor:(h[0]>=20&&h[1]/h[0]<0.5)?1:0,f,da});
  h[0]++;h[1]+=win;ST[sk]=h;}
fs.writeFileSync('/tmp/feat.json',JSON.stringify({fam:FAM.map(a=>a[0]).concat(['altro']),rows:out}));console.log(out.length);
