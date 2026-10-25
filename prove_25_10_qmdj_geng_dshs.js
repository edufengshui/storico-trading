global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const all=JSON.parse(fs.readFileSync('/home/claude/qm/storico.json')).map(r=>Object.assign(r,{per:r.date<'2024'?'2020-23':'2024-26'}))
  .concat(JSON.parse(fs.readFileSync('/home/claude/qm/vivo.json')).map(r=>Object.assign(r,{per:'vivo'})));
const G={};
for(const r of all){const p=r.date.split('-').map(Number);const c=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((r.seed-1)%12+12)%12]); const g=Q.giornoOra(c);
  const k=x=>x&&c.palaces[x].diH==='庚'&&c.palaces[x].tiH!=='庚'; const ka=k(g.palGiorno), kb=k(g.palOra);
  const lab=ka&&kb?'tutti e due sopra 庚':ka?'DS sopra 庚':kb?'HS sopra 庚':null; if(!lab) continue;
  ((G[lab]=G[lab]||{})[r.per]=G[lab][r.per]||[]).push((r.trend==='LONG'?r.move:-r.move)-1.5);}
const st=x=>{if(!x)return '-';const w=x.filter(v=>v>0).length;const s=x.reduce((a,b)=>a+b,0);return x.length+' · segue '+(100*w/x.length).toFixed(1)+'% · '+(s>=0?'+':'')+s.toFixed(0);};
for(const k of Object.keys(G)) console.log(k.padEnd(22),['2020-23','2024-26','vivo'].map(p=>p+': '+st(G[k][p])).join('   '));
