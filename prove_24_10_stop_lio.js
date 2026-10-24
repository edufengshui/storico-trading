// Stop su Leggo io coi massimi e minimi veri (24/10/2026). Prima: ORARIO=full1h.json DUMPC=/tmp/claude-0/s/lio_all.json node misura_vivo.js 2020-02-19 2026-10-22
const C=require('/tmp/claude-0/s/lio_all.json');const {percorso,esito}=require('/home/claude/storico-trading/uscite.js');
const per=d=>d<'2024'?'2020-23':d<'2026-09-29'?'2024-26':'dal vivo 29/09-22/10';
const sets={};for(const x of C){if(!x.liDir)continue;const t={cross:x.cross,date:x.date,dir:x.liDir};(sets['Lio '+per(x.date)]=sets['Lio '+per(x.date)]||[]).push(t);
 if(x.DLR&&x.DLR===x.liDir)(sets['Lio, DLR concorde '+per(x.date)]=sets['Lio, DLR concorde '+per(x.date)]||[]).push(t);
 else (sets['Lio, DLR non concorde '+per(x.date)]=sets['Lio, DLR non concorde '+per(x.date)]||[]).push(t);}
const R=[['tenere fino alle 21',{}],['stop 30',{stop:30}],['stop 40',{stop:40}],['stop 50',{stop:50}],['stop 60',{stop:60}],['stop 80',{stop:80}]];
for(const sn of Object.keys(sets).sort()){const L=sets[sn].map(t=>({t,p:percorso(t.cross,t.date)})).filter(x=>x.p);
 const hlOk=L.filter(x=>x.p.p.every(b=>b.hi!==Math.max(b.c,b.c)||true)).length;
 console.log('\n'+sn+' ('+L.length+')');
 for(const [nm,r] of R){let tot=0,w=0,dd=0,run=0,worst=0;for(const x of L){const v=esito(x.p,x.t.dir,x.t.cross,r,true);tot+=v;w+=v>0;run+=v;if(run>dd)dd=run;worst=Math.min(worst,run-dd);}
  console.log('  '+nm.padEnd(22)+(100*w/L.length).toFixed(0).padStart(3)+'%'+((tot>0?'+':'')+Math.round(tot)).padStart(8)+' pip   calo '+Math.round(worst));}}
