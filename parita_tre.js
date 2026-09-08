'use strict';
global.window = global;
const lj = require('lunar-javascript'); global.Solar = lj.Solar; global.Lunar = lj.Lunar;
const D='/home/claude/storico-trading/work_trading/pwa/';
global.XKDGSolarTime=require(D+'solar-time.js'); global.XKDGJieQi=require(D+'jieqi-gmt.js'); global.XKDGDaLiuRen=require(D+'daliuren.js'); global.XKDGTrend=require(D+'trend.js');
global.XKDGPlumBlossom=require(D+'plumblossom.js'); global.XKDGLiuYao=require(D+'liuyao.js'); global.XKDGMotoreDLR=require(D+'motore_dlr.js');
// stub del DOM
const store={}; global.localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>{store[k]=v},removeItem:k=>{delete store[k]}};
global.addEventListener=()=>{}; global.document={getElementById:()=>null,querySelector:()=>null,querySelectorAll:()=>[],addEventListener:()=>{}};
global.fetch=async()=>{throw new Error('no fetch')};
const fs=require('fs'); let src=fs.readFileSync('/home/claude/storico-trading/app.js','utf8');
const vm=require('vm'); vm.runInThisContext(src+'\n;global.__A=analizzaCrossPerReport;global.__L=livelloTreSistemi;global.__I=istanteUtcDelGiorno;');
const cards=JSON.parse(fs.readFileSync('/tmp/tresist.json','utf8'));
const N=Number(process.argv[2]||300); const step=Math.max(1,Math.floor(cards.length/N));
let tot=0, d={pb:0,ly:0,at:0,dlr:0,liv:0,dir:0}; const ex=[];
// S41 — lo Spirito unico, come nell'app: Serpente (螣蛇 Teng She) su R3 -> il mercato segue
// il trend, su R4 -> non segue; Sei Unioni (六合 Liu He) su R2 o R3 -> non segue.
function spiritoBT(c){ if(!c.ema) return null;
  const segue = c.ema==='up' ? 'LONG' : 'SHORT', nonSegue = c.ema==='up' ? 'SHORT' : 'LONG';
  const s3=c.spR3==='螣蛇', s4=c.spR4==='螣蛇';
  let ser=null; if(s3&&!s4) ser=segue; else if(s4&&!s3) ser=nonSegue;
  const uni=(c.spR2==='六合'||c.spR3==='六合') ? nonSegue : null;
  if(ser&&!uni) return ser; if(uni&&!ser) return uni; return null; }
// S41 — lo stelo del giorno debole, come nell'app: Legno, Terra o Acqua fuori stagione
// dicono che il mercato NON segue il trend.
const SELp={'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const WXp={'子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire','午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water'};
const GENp={Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
function steloBT(c){ if(!c.ema) return null;
  const sEl=SELp[c.steloGiorno], mEl=WXp[c.ramoMese]; if(!sEl||!mEl) return null;
  if(sEl!=='Wood'&&sEl!=='Earth'&&sEl!=='Water') return null;
  if(sEl===mEl||GENp[mEl]===sEl) return null;
  return c.ema==='up' ? 'SHORT' : 'LONG'; }
function livBT(c){
  // S41 — la scala a voci, come nell'app.
  const sp=spiritoBT(c), st=steloBT(c);
  const tutte=[c.pb,c.ly,c.at,c.dlr,sp,st].filter(Boolean);
  if(!tutte.length) return {liv:null,dir:null};
  const nL=tutte.filter(v=>v==='LONG').length, nS=tutte.length-nL;
  if(nL===nS) return {liv:null,dir:null};
  const dir=nL>nS?'LONG':'SHORT', contr=Math.min(nL,nS);
  if(contr===0 && tutte.length<4) return {liv:null,dir:null};   // S41: unanimita' debole, fermo
  return {liv: contr===0 ? 'U'+tutte.length : contr===1 ? 'M1' : 'M2', dir:dir}; }
for(let i=0;i<cards.length;i+=step){ const c=cards[i];
  const row={cross:c.cross,status:'ok',seed:c.seed,branch:c.ora,direction:c.ema,emaRun:c.emaRun,emaConsolidated:true,seedFragile:false,seedEdgePips:99};
  const dArr=c.date.split('-').map(Number); const utc=__I(dArr);
  let e; try{ e=__A(row,utc,c.date);}catch(err){ ex.push(c.cross+' '+c.date+' ERR '+err.message); continue; }
  tot++;
  const l=__L(e), b=livBT(c);
  if((e.pbDir||null)!==c.pb) d.pb++;
  if((e.lyDir||null)!==c.ly) d.ly++;
  if((e.attuale||null)!==c.at) d.at++;
  if((e.dlrDir||null)!==c.dlr) d.dlr++;
  if(l.liv!==b.liv){ d.liv++; if(ex.length<12) ex.push(c.cross+' '+c.date+' s'+c.seed+'  BT pb '+c.pb+' ly '+c.ly+' at '+c.at+' dlr '+c.dlr+' -> '+b.liv+'   PWA pb '+e.pbDir+' ly '+e.lyDir+' at '+e.attuale+' dlr '+e.dlrDir+' -> '+l.liv+(e.signal==='NO TRADE'?' ['+e.motivo+']':'')); }
  else if(l.dir!==b.dir) d.dir++;
}
console.log('carte confrontate '+tot+'  diff pb '+d.pb+'  ly '+d.ly+'  attuale '+d.at+'  dlr '+d.dlr+'  livello '+d.liv+'  direzione '+d.dir);
ex.forEach(x=>console.log('  '+x));
