const s=require('fs').readFileSync(__dirname+'/wu_zfty.js','utf8');const i=s.indexOf("run('ZFTY oggi'");
eval(s.slice(0,i)+`
const all=rows.concat(live);
const U=r=>{const z=Q.lettura(r.ch,r.trend,'zfty');if(z&&z.dir)return {dir:z.dir,da:'zfty'};const d=Q.lettura(r.ch,r.trend,'dshs');return d&&d.dir?{dir:d.dir,da:'dshs'}:{dir:null};};
function mis(label,f){const t=[0,1,2].map(()=>({n:0,ok:0,pip:0,tot:0}));
  for(const r of all){const g=t[r.live?2:per(r)];g.tot++;const dir=f(r);if(!dir)continue;g.n++;const w=(dir==='LONG')===(r.mv>0);if(w)g.ok++;g.pip+=w?Math.abs(r.mv):-Math.abs(r.mv);}
  console.log(label.padEnd(34),t.map(g=>g.n+'/'+g.tot+' '+pct(g.ok,g.n)+' '+(g.pip>0?'+':'')+g.pip).join(' | '));}
mis('ZFTY solo',r=>Q.lettura(r.ch,r.trend,'zfty').dir);
mis('DsHs solo',r=>Q.lettura(r.ch,r.trend,'dshs').dir);
mis('ZFTY, e DsHs dove tace',r=>U(r).dir);
mis('  solo le carte date dal DsHs',r=>{const u=U(r);return u.da==='dshs'?u.dir:null;});
mis('  DsHs dove lo ZFTY parla',r=>{const z=Q.lettura(r.ch,r.trend,'zfty');return z.dir?Q.lettura(r.ch,r.trend,'dshs').dir:null;});
mis('  ZFTY non paralleli',r=>{const z=Q.lettura(r.ch,r.trend,'zfty');return z.dir&&!z.paralleli?z.dir:null;});
mis('  ZFTY paralleli (letti col DsHs)',r=>{const z=Q.lettura(r.ch,r.trend,'zfty');return z.dir&&z.paralleli&&!z.parTimely?z.dir:null;});
mis('  d accordo ZFTY e DsHs',r=>{const z=Q.lettura(r.ch,r.trend,'zfty').dir,d=Q.lettura(r.ch,r.trend,'dshs').dir;return z&&d&&z===d?z:null;});
mis('  in disaccordo: ha ragione ZFTY',r=>{const z=Q.lettura(r.ch,r.trend,'zfty').dir,d=Q.lettura(r.ch,r.trend,'dshs').dir;return z&&d&&z!==d?z:null;});
// Lio dal vivo
const TT={c:[0,0,0],a:[0,0,0],m:[0,0,0]};
for(const d of Object.keys(reg).sort()){if(d<'2026-10-17')continue;for(const y of reg[d]){if((y.livello||y.liv)!=='LI'||!y.signal||y.esito==null||y.esito===0)continue;
  const p=d.split('-').map(Number),ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((y.seed-1)%12+12)%12]);const u=U({ch,trend:y.trend});const k=!u.dir?'m':u.dir===y.signal?'a':'c';TT[k][0]++;if(y.esito>0)TT[k][1]++;TT[k][2]+=y.esito;}}
console.log('Lio dal vivo col sistema unito: contro',TT.c[1]+'/'+TT.c[0],TT.c[2],'| d accordo',TT.a[1]+'/'+TT.a[0],TT.a[2],'| muto',TT.m[1]+'/'+TT.m[0],TT.m[2]);
`);
