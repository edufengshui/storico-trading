// SISTEMA LY PER FORMA, seconda prova (S58): il LY si usa solo sulle forme dove ha avuto ragione sulle altre ripetizioni. Serve /tmp/db_carte_ly.json (livello_ly_database.js).
// LY per forma: si usa il LY su una carta solo se sulle ALTRE ripetizioni della stessa forma il LY ha avuto ragione >= soglia
const db=require('/tmp/db_carte_ly.json').filter(x=>x.ly);const fo={};db.forEach(x=>(fo[x.forma]=fo[x.forma]||[]).push(x));
const out=(nome,sel)=>{let n=0,w=0,p=0;sel.forEach(([x,d])=>{n++;const ok=d===x.real;w+=ok;p+=ok?Math.abs(x.move):-Math.abs(x.move);});console.log(nome.padEnd(52)+String(n).padStart(5)+'  '+(100*w/n).toFixed(1)+'%  '+(p>0?'+':'')+p+' pip');};
out('LY su tutte',db.map(x=>[x,x.ly]));
for(const minN of [5,8]) for(const s of [.5,.55,.6,.65,.7]){
 const sel=[],inv=[];db.forEach(x=>{const al=fo[x.forma].filter(y=>y!==x);if(al.length<minN)return;const a=al.reduce((q,y)=>q+y.lyOk,0)/al.length;
  if(a>=s)sel.push([x,x.ly]);if(a<=1-s)inv.push([x,x.ly==='LONG'?'SHORT':'LONG']);});
 out(`fuori: altre>=${minN}, LY giusto >=${s*100}% -> LY`,sel); out(`fuori: altre>=${minN}, LY giusto <=${100-s*100}% -> contro LY`,inv);}
// nel tempo: forma scelta sul 2020-23, provata sul 2024-26
for(const s of [.55,.6,.65]){const sel=[];for(const r of Object.values(fo)){const pr=r.filter(x=>x.date<'2024');if(pr.length<5)continue;const a=pr.reduce((q,y)=>q+y.lyOk,0)/pr.length;if(a>=s)r.filter(x=>x.date>='2024').forEach(x=>sel.push([x,x.ly]));}
 out(`tempo: forme 2020-23 LY>=${s*100}% -> LY sul 2024-26`,sel);}
out('LY sul 2024-26 (tutte)',db.filter(x=>x.date>='2024').map(x=>[x,x.ly]));
