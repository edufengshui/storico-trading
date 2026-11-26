// S78 (26/11/2026 sera, Edu: "non riesci a collezionare?"): le indicazioni contro lo ZF nel suo palazzo INSIEME (sopra Geng, sopra Xin,
// porta in tomba, stelo del Commander che clasha il palazzo). Quante sono presenti -> il mercato segue? E la bilancia nelle varianti.
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), fs=require('fs'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), BR='子丑寅卯辰巳午未申酉戌亥';
const H=JSON.parse(fs.readFileSync(DIR+'/full1h.json')).crosses;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const O={};for(const c in H)for(const b of H[c])if(b.t.slice(11,13)==='00')O[c+b.t.slice(0,10)]=b.o;
const G={};const add=(k,x,ok)=>{const g=(G[k]=G[k]||[[0,0],[0,0]])[x.date<'2024-01-01'?0:1];g[0]++;g[1]+=ok;};
const V={'A prima (senza tavole)':{QMDJ_BIL_ZFPAL:false,QMDJ_BIL_ZF_ENERGIA:1},'C dettato: voti contro il trend':{},'F prova: secondo la relazione':{QMDJ_BIL_ZFDEB:'relazione'},'G prova: relazione, energia da 1':{QMDJ_BIL_ZFDEB:'relazione',QMDJ_BIL_ZF_ENERGIA:1}};
const K=['ZF sopra Geng','ZF sopra Xin','porta ZF in tomba','ZF clasha il palazzo'];
for(const x of require('/tmp/dump.json').filter(x=>x.trend&&x.real)){const o=O[x.cross+x.date];if(o==null)continue;const seed=parseInt(f3(o),10),p=x.date.split('-').map(Number);
  const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);if(!c)continue;
  for(const n in V){for(const k in V[n])global[k]=V[n][k];const b=Q.bilancia(c,x.trend);for(const k in V[n])delete global[k];if(!b)continue;
    if(b.dir)add(n+': bilancia giusta',x,b.dir===x.real);
    if(x.liv==='LI'&&x.liDir&&b.dir)add(n+(b.dir===x.liDir?': Lio col qimen':': Lio contro qimen'),x,x.liDir===x.real);
    if(n[0]==='C'){const q=K.filter(k=>b.voci.some(v=>v.k===k)),m=q.length,seg=x.real===x.trend;add('0 indicazioni contro lo ZF: '+(m>=3?'3 o 4':m)+' -> il mercato segue',x,seg);
      for(const k of q)add('1 '+k+': segue',x,seg);
      const ctl=b.voci.some(v=>/^ZFTY: il giorno controlla l'ora/.test(v.t)),gen=b.voci.some(v=>/^ZFTY: il giorno genera l'ora/.test(v.t));
      if(ctl)add('2 ZF controlla TY, indicazioni contro '+(m>=2?'2 o piu':m)+': segue',x,seg);if(gen)add('3 ZF genera TY, indicazioni contro '+(m>=2?'2 o piu':m)+': segue',x,seg);
      if(m>=2&&x.liv==='LI'&&x.liDir){add('4 con 2 o piu: Lio vince',x,x.liDir===x.real);add('4 con 2 o piu: Lio '+(x.liDir===x.trend?'col trend':'contro il trend')+' vince',x,x.liDir===x.real);}}}}
const pct=(a,b)=>b?(100*a/b).toFixed(1)+'%':'-';for(const k of Object.keys(G).sort()){const [a,b]=G[k];console.log(k.padEnd(56),a[0],pct(a[1],a[0]),'|',b[0],pct(b[1],b[0]));}
