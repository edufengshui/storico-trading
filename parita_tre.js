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
function livBT(c){ const pb=c.pb,ly=c.ly,at=c.at,dlr=c.dlr;
  if(ly&&dlr&&pb===ly&&ly===dlr) return {liv:'A',dir:pb};
  if(dlr&&at===dlr) return {liv:'B',dir:at};
  if(ly&&pb===ly&&!dlr) return {liv:'C',dir:pb};
  return {liv:null,dir:null}; }
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
