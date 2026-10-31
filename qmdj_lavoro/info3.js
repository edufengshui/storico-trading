global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs'), BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const O=JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')); const OO=O.crosses||O;
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const PB={1:'子',8:'丑寅',3:'卯',4:'辰巳',9:'午',2:'未申',7:'酉',6:'戌亥'}, LIU={'子':'戊','戌':'己','申':'庚','午':'辛','辰':'壬','寅':'癸'};
const EL={1:4,2:2,3:0,4:0,6:3,7:3,8:2,9:1}; // 0 legno 1 fuoco 2 terra 3 metallo 4 acqua
const genera=(a,b)=>EL[a]!=null&&EL[b]!=null&&(EL[a]+1)%5===EL[b];
const steli=p=>[p.tiH,p.ti2H,p.diH,p.di2H].filter(Boolean);
const visib=gz=>{ if(gz[0]!=='甲') return gz[0]; return LIU[BR[((BR.indexOf(gz[1])-ST.indexOf(gz[0]))%12+12)%12]]; };
const ramoIn=(c,q,br)=>PB[q].includes(br)||(LIU[br]&&steli(c.palaces[q]).includes(LIU[br]));
const palStelo=(c,gz)=>{const s=visib(gz),o=[];for(const q of [1,2,3,4,6,7,8,9]) if(steli(c.palaces[q]).includes(s)) o.push(q);return o;};
const N={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li',5:'Centro'};
const PY={甲:'Jia',乙:'Yi',丙:'Bing',丁:'Ding',戊:'Wu',己:'Ji',庚:'Geng',辛:'Xin',壬:'Ren',癸:'Gui'},BY={子:'Zi',丑:'Chou',寅:'Yin',卯:'Mao',辰:'Chen',巳:'Si',午:'Wu',未:'Wei',申:'Shen',酉:'You',戌:'Xu',亥:'Hai'};
for(const kk of process.argv.slice(2)){ const [cr,dt]=kk.split('|'); const c=M[cr+'|'+dt]; const B=idx[cr+'|'+dt]; const pip=cr.includes('JPY')?0.01:0.0001;
 const lv=(reg[dt]||[]).find(y=>y.cross===cr); const seed=lv?lv.seed:parseInt(f3(B[0].o),10); const p=dt.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]);
 const z=Q.lettura(ch,c.trend,'zfty'),d=Q.lettura(ch,c.trend,'dshs');
 const wh=s=>[1,2,3,4,6,7,8,9].filter(q=>[ch.palaces[q].tiH,ch.palaces[q].ti2H].includes(s)).map(q=>N[q]).join('/');
 const zf=[1,2,3,4,6,7,8,9].find(q=>ch.palaces[q].zhiFu), zs=[1,2,3,4,6,7,8,9].find(q=>ch.palaces[q].zhiShi);
 const xi=(BR.indexOf(ch.pilastro[1])-ST.indexOf(ch.pilastro[0])+12)%12; const vu=BR[(xi+10)%12]+BR[(xi+11)%12];
 console.log(`\n${cr} ${dt} trend ${c.trend} real ${c.real} ${c.move} Lio ${c.liDir||'-'} | ${ch.pilastro} ${ch.giorno} ${ch.mese} ${ch.anno} | ${ch.dun} ${ch.ju} | ${PY[ch.pilastro[0]]} ${BY[ch.pilastro[1]]}`);
 console.log(`DS ${ch.giorno[0]} ${wh(ch.giorno[0])} | HS ${visib(ch.pilastro)} ${wh(visib(ch.pilastro))} | ZF ${N[zf]} ZS ${N[zs]} | vuoti ${vu} | ZFTY ${z&&z.dir} pal ${z&&N[z.palDecide]} (${z&&z.passoDecide}) | DsHs ${d&&d.dir} ${d&&N[d.palDecide]}`);
 for(const q of [1,2,3,4,6,7,8,9,5]){const x=ch.palaces[q];console.log(' ',N[q].padEnd(5),x.tiH+(x.ti2H||''),'/',x.diH+(x.di2H||''),x.star,x.door||'',x.deity||'',x.zhiFu?'ZF':'',x.zhiShi?'ZS':'');}
 const sg=c.trend==='LONG'?1:-1; const o=[]; for(let i=0;i<12;i++){const br=BR[i],gz=QO.hourGZ(ch.giorno[0],br),gm=QO.oreGMT(br); if(!gm.length||gm.some(h=>!B[h])) continue; const mv=Math.round((B[gm[gm.length-1]].c-B[gm[0]].o)/pip*sg); o.push(`${gz} ${String(gm[0]).padStart(2,'0')} ${Math.abs(mv)}${mv>=0?'c':'x'} [${wh(visib(gz))}]`);} console.log(o.join(' · '));
}
