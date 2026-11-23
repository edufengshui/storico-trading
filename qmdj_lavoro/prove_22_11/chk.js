const s=require('fs').readFileSync('wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const t=[0,1,2].map(()=>({n:0,ok:0,f:0,fok:0,w:0}));
for(const r of rows.concat(live)){const z=Q.lettura(r.ch,r.trend,'zfty');const g=t[r.live?2:per(r)];if(z.wuInterno)g.w++;if(z.dir){g.n++;if((z.dir==='LONG')===(r.mv>0))g.ok++;}
 if(z.segueForte){g.f++;if((r.trend==='LONG')===(r.mv>0))g.fok++;}}
t.forEach(g=>console.log('ZFTY',g.n,pct(g.ok,g.n),'| segue forte',g.f,pct(g.fok,g.f),'| wuInterno',g.w));
const r=live.filter(x=>Q.lettura(x.ch,x.trend,'zfty').segueForte).map(x=>x.cross+' '+x.d+' '+x.trend+' '+x.mv);console.log(r.join(' ; '));
`);
