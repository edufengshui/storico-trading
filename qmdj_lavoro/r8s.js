const A=require(process.argv[2]); const fs=require('fs'); const D=[...JSON.parse(fs.readFileSync('/home/claude/qm/dump_2020_26.json')),...JSON.parse(fs.readFileSync('/home/claude/qm/dump_vivo.json'))];
const seen=new Set(); const S={gen:{n:0,contro:0,top1:0,top2:0,mov:0,altre:0,nAltre:0,noseg:0},nogen:{n:0,contro:0,top1:0,top2:0,mov:0,altre:0,nAltre:0,noseg:0}};
for(const r of D){ const k=r.cross+'|'+r.date; if(seen.has(k)) continue; seen.add(k); let a; try{a=A(k);}catch(e){continue;} if(!a||!a.r8.length) continue;
 const s=S[a.gen?'gen':'nogen']; const x=a.r8[0]; s.n++; if(x.m<0) s.contro++; if(x.rank===1) s.top1++; if(x.rank<=2) s.top2++; s.mov+=Math.abs(x.m);
 if(a.c.real!==a.c.trend) s.noseg++;
 for(const t of a.top) {} }
for(const g in S){ const s=S[g]; console.log(g,'carte',s.n,'| ora r8 contro trend',(100*s.contro/s.n).toFixed(0)+'%','| ora piu forte',(100*s.top1/s.n).toFixed(0)+'%','| fra prime due',(100*s.top2/s.n).toFixed(0)+'%','| giorno non segue',(100*s.noseg/s.n).toFixed(0)+'%','| mossa media',(s.mov/s.n).toFixed(1)); }
