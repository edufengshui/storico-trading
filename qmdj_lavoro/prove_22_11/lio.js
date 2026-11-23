global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const D=require('/tmp/dump.json').filter(x=>x.liv==='LI'&&x.liDir&&x.trend&&x.date<='2026-10-16');
const pct=(a,b)=>b?(100*a/b).toFixed(1).replace('.',',')+'%':'-';
const G={};let tot=[0,0,0],skip=0;
for(const x of D){const o=O[x.cross+x.date];if(o==null){skip++;continue;}const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);const z=Q.lettura(ch,x.trend,'zfty');
  const win=x.liDir===x.real, pip=win?Math.abs(x.move):-Math.abs(x.move);tot[0]++;tot[1]+=win;tot[2]+=pip;
  const col=x.liDir===x.trend?'Lio col trend':'Lio contro il trend';
  const zf=z.segueForte?'segue forte':z.wuInterno?(z.segue===false?'Wu int/ZF est, ZFTY non segue':'Wu int/ZF est, ZFTY muto'):(z.segue===true?'altri: ZFTY segue':z.segue===false?'altri: ZFTY non segue':'altri: muto');
  for(const k of [zf+' | '+col, zf+' | '+col+' | '+x.liForza]){const pe=x.date<'2024-01-01'?0:1;const g=(G[k]=G[k]||[[0,0,0],[0,0,0]]);g[pe][0]++;g[pe][1]+=win;g[pe][2]+=pip;}}
console.log('Lio',tot[0],pct(tot[1],tot[0]),tot[2],'saltati',skip);
for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(62),a[0],pct(a[1],a[0]),a[2],'|',b[0],pct(b[1],b[0]),b[2],'| tot',a[0]+b[0],pct(a[1]+b[1],a[0]+b[0]));}
