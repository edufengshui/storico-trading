global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
global.XKDGSolarTime=require('/home/claude/trading/solar-time.js'); global.XKDGJieQiGMT=require('/home/claude/trading/jieqi-gmt.js');
const Q=require('/home/claude/trading/qmdj.js'), QO=require('/home/claude/trading/qmdj_ore.js'), fs=require('fs');
const BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
const H=JSON.parse(fs.readFileSync('/home/claude/storico-trading/full1h.json')).crosses; const OO=(j=>j.crosses||j)(JSON.parse(fs.readFileSync('/home/claude/storico-trading/orario_live.json')));
const reg=JSON.parse(fs.readFileSync('/home/claude/storico-trading/registro_live.json'));
const M={}; for(const f of ['dump_2020_26.json','dump_vivo.json']) for(const c of JSON.parse(fs.readFileSync('/home/claude/qm/'+f))) M[c.cross+'|'+c.date]=c;
const f3=p=>{const s=String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');return s.slice(0,Math.abs(Number(p))<1?2:3);};
const EL={1:'W',2:'E',3:'L',4:'L',6:'M',7:'M',8:'E',9:'F'}, GEN={L:'F',F:'E',E:'M',M:'W',W:'L'};
const PB={1:'子',2:'未申',3:'卯',4:'辰巳',6:'戌亥',7:'酉',8:'丑寅',9:'午'};
const CL={'甲':'庚','庚':'甲','乙':'辛','辛':'乙','丙':'壬','壬':'丙','丁':'癸','癸':'丁'};
const idx={}; for(const src of [H,OO]) for(const c in src) for(const b of src[c]){ const k=c+'|'+b.t.slice(0,10);(idx[k]||(idx[k]={}))[+b.t.slice(11,13)]=b;}
function analizza(k,verbose){ const c=M[k]; if(!c||!c.trend||!c.real) return null; const B=idx[k]; if(!B||!B[0]) return null;
 const pip=c.cross.includes('JPY')?0.01:0.0001, sg=c.trend==='LONG'?1:-1;
 const lv=(reg[c.date]||[]).find(y=>y.cross===c.cross); const seed=lv?lv.seed:parseInt(f3(B[0].o),10);
 const p=c.date.split('-').map(Number), ch=Q.oraria(Date.UTC(p[0],p[1]-1,p[2]),BR[((seed-1)%12+12)%12]); const P=ch.palaces;
 let tp=null,dp=null; for(const i in P){ if(P[i].zhiFu) tp=+i; if(P[i].diH===({Wu:'戊',Ji:'己',Geng:'庚',Xin:'辛',Ren:'壬',Gui:'癸'})[P[i].cmdStem]||(P[i].cmdStem&&P[i].diH&&P[i].di===P[i].cmdStem)) dp=+i; }
 if(!tp||!dp||dp===5||tp===5) return null;
 const gen=GEN[EL[dp]]===EL[tp];
 const sopra=[P[dp].tiH,P[dp].ti2H].filter(Boolean);
 const s0=(ST.indexOf(c.giorno?c.giorno[0]:ch.giorno[0])%5)*2;
 const mosse=[]; for(let i=0;i<12;i++){ const pil=ST[(s0+i)%10]+BR[i]; const hs=QO.oreGMT(BR[i]); if(!hs.length||hs.some(h=>!B[h])) continue;
   mosse.push({pil,h:hs[0],m:Math.round((B[hs[hs.length-1]].c-B[hs[0]].o)/pip*sg)}); }
 const rank=[...mosse].sort((a,b)=>Math.abs(b.m)-Math.abs(a.m));
 const r8=mosse.filter(x=>PB[dp].includes(x.pil[1]) && sopra.some(s=>CL[s]===x.pil[0]));
 return {c,pal:[dp,tp],gen,sopra,r8:r8.map(x=>({...x,rank:rank.indexOf(x)+1})),top:rank.slice(0,2),pilastro:ch.pilastro};
}
module.exports=analizza;
if(require.main===module){ for(const k of process.argv.slice(2)){ const a=analizza(k); if(!a){console.log(k,'-');continue;}
 console.log(k,'trend',a.c.trend,'esito',a.c.real===a.c.trend?'segue':'NON segue',a.c.move,'| ora carta',a.pilastro,'| ZF DiPan',a.pal[0],'TianPan',a.pal[1],'genera:',a.gen,'| sopra',a.sopra.join(''),'| regola8',JSON.stringify(a.r8),'| top',JSON.stringify(a.top)); } }
