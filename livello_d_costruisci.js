const db=require('/tmp/claude-0/-home-claude/54e2cdc2-ca35-5cec-bbe0-d7658fc9e061/scratchpad/db_carte.json');const fs=require('fs');
const STG={'旺':'in piena stagione','相':'in crescita','休':'a riposo','囚':'prigioniero','死':'morto'};
const parla=k=>k.replace(/ (旺|相|休|囚|死)$/,(m,s)=>' '+STG[s]+' ('+s+')');
const dottrinale=k=>!/^(mese|giorno) /.test(k);
function regola(rip){const fe={};rip.forEach(x=>x.f.forEach(k=>{if(dottrinale(k))fe[k]=1;}));let best=null;
 for(const k of Object.keys(fe)){const con=rip.filter(x=>x.f.includes(k)),senza=rip.filter(x=>!x.f.includes(k));if(con.length<2||senza.length<2)continue;
  const sc=con.reduce((a,x)=>a+x.segue,0),ss=senza.reduce((a,x)=>a+x.segue,0);
  const vc=sc*2>=con.length?1:0,vs=ss*2>=senza.length?1:0;if(vc===vs)continue; // la regola deve dire cose opposte nei due casi
  const ok=(vc?sc:con.length-sc)+(vs?ss:senza.length-ss);
  if(!best||ok>best.ok||(ok===best.ok&&Math.min(con.length,senza.length)>Math.min(best.nc,best.ns)))best={k,ok,nc:con.length,ns:senza.length,vc,sc,ss};}
 return best;}
const fo={};db.forEach(x=>(fo[x.forma]=fo[x.forma]||[]).push(x));
const righe=[];let tot=0,totok=0;
Object.entries(fo).sort((a,b)=>b[1].length-a[1].length).forEach(([forma,rip])=>{
 const seg=rip.reduce((a,x)=>a+x.segue,0);
 if(rip.length<5){righe.push({forma,volte:rip.length,segue:seg,regola:'troppo poche ripetizioni',ok:''});return;}
 const g=regola(rip);if(!g){righe.push({forma,volte:rip.length,segue:seg,regola:'nessuna caratteristica separa i casi',ok:''});return;}
 tot+=rip.length;totok+=g.ok;
 const testo='Se '+parla(g.k)+' → '+(g.vc?'SEGUE':'NON SEGUE')+' il trend ('+(g.vc?g.sc:g.nc-g.sc)+'/'+g.nc+'); altrimenti '+(g.vc?'NON SEGUE':'SEGUE')+' ('+(g.vc?g.ns-g.ss:g.ss)+'/'+g.ns+')';
 righe.push({forma,volte:rip.length,segue:seg,regola:testo,ok:g.ok+'/'+rip.length,chiave:g.k,se:g.vc,
  carte:rip.map(x=>x.cross+' '+x.date+' s'+x.seed+' '+(x.segue?'segue':'non segue')+(x.f.includes(g.k)?' [col tratto]':'')).join('; ')});});
fs.writeFileSync('/home/claude/edufengshui/storico-trading/livello_d.json',JSON.stringify(righe,null,1));
console.log('forme',righe.length,'con regola',righe.filter(r=>r.chiave).length,'casi spiegati',totok+'/'+tot,(100*totok/tot).toFixed(1)+'%');
// caratteristiche che ricorrono più spesso come regola
const cnt={};righe.filter(r=>r.chiave).forEach(r=>{const k=r.chiave+' → '+(r.se?'segue':'non segue');cnt[k]=(cnt[k]||0)+1;});
console.log(Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,15).map(([k,v])=>v+'  '+parla(k)).join('\n'));
righe.slice(0,5).forEach(r=>console.log('\n'+r.forma+' ('+r.volte+' volte): '+r.regola));
