global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥';
const D=JSON.parse(fs.readFileSync('dump_vivo.json'));
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const OO=(j=>j.crosses||j)(JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')));
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const o0={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]) if(b.t>='2026-09-29'&&b.t.slice(11,13)==='00') o0[c+'|'+b.t.slice(0,10)]=b.o;
const rows=[];
for(const r of D){ if(!r.real||!r.trend) continue;
 const lv=(reg[r.date]||[]).find(y=>y.cross===r.cross); const seed=lv?lv.seed:(o0[r.cross+'|'+r.date]?parseInt(f3(o0[r.cross+'|'+r.date]),10):null); if(!seed) continue;
 const p=r.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const a=Q.lettura(ch,r.trend,'dshs'), z=Q.lettura(ch,r.trend,'zfty');
 rows.push({d:r.date,c:r.cross,t:r.trend,real:r.real,m:r.move,li:r.liDir,f:r.liForza,ds:a&&a.dir,zf:z&&z.dir,LY:r.LYF,PB:r.PBF,DLR:r.DLRF});}
fs.writeFileSync('vivo_qm.json',JSON.stringify(rows));
const pip=(dir,r)=>dir?(dir===r.real?r.m:-r.m):null;
const S=(f,name)=>{let n=0,w=0,p=0;for(const r of rows){const x=f(r);if(x==null)continue;n++;if(x>0)w++;p+=x;}console.log(name.padEnd(46),n,w,(n?Math.round(100*w/n):0)+'%',p);};
S(r=>pip(r.li,r),'Lio');
S(r=>pip(r.ds,r),'DsHs'); S(r=>pip(r.zf,r),'ZFTY');
S(r=>r.li&&r.li===r.t?pip(r.li,r):null,'Lio con il trend'); S(r=>r.li&&r.li!==r.t?pip(r.li,r):null,'Lio contro il trend');
for(const F of ['forte','media','debole']) S(r=>r.li&&r.f===F?pip(r.li,r):null,'Lio '+F);
S(r=>r.li&&r.ds&&r.ds===r.li?pip(r.li,r):null,'Lio con DsHs concorde');
S(r=>r.li&&r.ds&&r.ds!==r.li?pip(r.li,r):null,'Lio con DsHs discorde');
S(r=>r.li&&r.zf&&r.zf===r.li?pip(r.li,r):null,'Lio con ZFTY concorde');
S(r=>r.li&&r.zf&&r.zf!==r.li?pip(r.li,r):null,'Lio con ZFTY discorde');
S(r=>r.li&&r.ds&&r.zf&&r.ds===r.zf&&r.ds!==r.li?pip(r.li,r):null,'Lio contro DsHs+ZFTY concordi');
S(r=>r.li&&r.ds&&r.zf&&r.ds===r.zf&&r.ds!==r.li?pip(r.ds,r):null,'  ... se avesse seguito il QMDJ');
S(r=>r.li&&r.ds&&r.zf&&r.ds===r.zf?pip(r.ds,r):null,'DsHs+ZFTY concordi (sui giorni di Lio)');
S(r=>!r.li&&r.ds&&r.zf&&r.ds===r.zf?pip(r.ds,r):null,'DsHs+ZFTY concordi dove Lio tace');
// per settimana
const wk={}; for(const r of rows){const x=pip(r.li,r); if(x==null) continue; const k=r.d.slice(5); const w=k<'10-06'?'29/09-05/10':k<'10-13'?'06-12/10':k<'10-20'?'13-19/10':k<'10-27'?'20-26/10':'27-30/10'; (wk[w]||(wk[w]=[0,0,0]));wk[w][0]++;if(x>0)wk[w][1]++;wk[w][2]+=x;}
console.log(JSON.stringify(wk));
