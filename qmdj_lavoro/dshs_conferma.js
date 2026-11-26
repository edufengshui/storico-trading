global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const DIR='/home/claude/storico-trading'; global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
const V={'1 ieri (Death annulla sempre)':{QMDJ_BIL_DSHS_TIENE:false},'2 oggi (DsHs uguale: genera tiene)':{},'3 oggi + conferma come voce':{QMDJ_BIL_DSHS_CONF:true}};
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  for(const n in V){for(const k in V[n])global[k]=V[n][k];const b=Q.bilancia(c,x.trend);for(const k in V[n])delete global[k];
    if(b&&b.dir)add(n+': bilancia giusta',x,b.dir===x.real);
    if(x.liv==='LI'&&x.liDir&&b&&b.dir)add(n+(b.dir===x.liDir?': Lio col qimen':': Lio contro qimen'),x,x.liDir===x.real);
    if(n[0]==='3'&&b&&b.voci.some(v=>v.k==='DsHs conferma')){const v=b.voci.find(v=>v.k==='DsHs conferma');add('DsHs conferma: la relazione di base ha ragione',x,v.dir===x.real);
      const gen=b.voci.some(v=>/^ZFTY: il giorno genera l'ora/.test(v.t));if(gen)add('  ZF genera TY confermato dal DsHs: segue',x,x.real===x.trend);if(gen&&b.voci.some(v=>v.k==='Death TY'))add('  idem con Death sul TY: segue',x,x.real===x.trend);}}}
const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(52),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]));}
