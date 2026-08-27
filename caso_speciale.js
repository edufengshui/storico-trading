// Caso speciale (Edu, sessione 24, da NZDUSD 22/06/2023):
// mobile VUOTA e chiusa ai due capi -> non parte nemmeno (l'arrivo non esiste senza partenza).
// Flusso steli con COMBINAZIONE DEGLI STELI (甲己 乙庚 丙辛 丁壬 戊癸): gli steli combinati
// non possono essere capolinea/portatori (restano come presenza d'elemento).
// Se il capolinea coincide con l'elemento della BESTIA sulla linea della mobile, il flusso
// termina li'; la linea non muovendosi, il PILASTRO DEL GIORNO ne diventa padrone.
// Duello Shi/Ying per generazione verso il padrone: Shi che genera il padrone cede il Qi.
const LYM = require('./liuyao.js');
const { Solar } = require('lunar-javascript');
const rows = require('/tmp/rows.json');
const COMBINA={'子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯','辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午'};
const CLASH={'子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅','卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳'};
const GEN={Wood:'Fire',Fire:'Earth',Earth:'Metal',Metal:'Water',Water:'Wood'};
const WX={'寅':'Wood','卯':'Wood','巳':'Fire','午':'Fire','辰':'Earth','丑':'Earth','戌':'Earth','未':'Earth','申':'Metal','酉':'Metal','亥':'Water','子':'Water'};
const YANG=['甲','丙','戊','己','庚','壬'], YIN=['乙','丁','戊','己','辛','癸'];
const STm=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const SE={'甲':'Wood','乙':'Wood','丙':'Fire','丁':'Fire','戊':'Earth','己':'Earth','庚':'Metal','辛':'Metal','壬':'Water','癸':'Water'};
const WUSHU={'甲':'甲','己':'甲','乙':'丙','庚':'丙','丙':'戊','辛':'戊','丁':'庚','壬':'庚','戊':'壬','癸':'壬'};
const HB=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const HE={'甲':'己','己':'甲','乙':'庚','庚':'乙','丙':'辛','辛':'丙','丁':'壬','壬':'丁','戊':'癸','癸':'戊'};
const BEL={'青龍':'Wood','朱雀':'Fire','勾陳':'Earth','螣蛇':'Earth','白虎':'Metal','玄武':'Water'};
const cacheP={};
// steli derivati dai rami del motore (00:00 GMT): niente pilastro di mezzogiorno
const STm10=['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BR12=['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const BRm12=['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
const PRIMO={'甲':'丙','己':'丙','乙':'戊','庚':'戊','丙':'庚','辛':'庚','丁':'壬','壬':'壬','戊':'甲','癸':'甲'};
function pil8(ds, yearBranch, monthBranch){
  const y=+ds.split('-')[0];
  let annoS=null;
  for (const Y of [y, y-1]) if (BR12[((Y-4)%12+12)%12]===yearBranch) { annoS=STm10[((Y-4)%10+10)%10]; break; }
  let meseS=null;
  if (annoS && monthBranch) { const i=BRm12.indexOf(monthBranch);
    if (i>=0) meseS=STm10[(STm10.indexOf(PRIMO[annoS])+i)%10]; }
  return {annoS, meseS}; }

let nDoppio=0, nInerte=0, nSpecial=0;
for (const r of rows) {
  const R = LYM.readManual(r.sup, r.inf, r.linea, r.dayBranch, r.monthBranch, r.yearBranch, r.dayStem);
  if (R.error || R.mutante.casoMut !== -1) continue;
  const dep=R.mutante.ramoDep, arr=R.mutante.ramoArr, D=r.dayBranch;
  const doppio=(COMBINA[D]===dep&&CLASH[D]===arr)||(CLASH[D]===dep&&COMBINA[D]===arr);
  if (!doppio) continue;
  nDoppio++;
  const mob=R.linee[R.mutante.pos-1];
  if (!mob.vuoto) continue;                       // mobile in vuoto: bloccata resta vuota, non parte
  nInerte++;
  // flusso con combinazione degli steli
  const ds=r.dayStem;
  const lad=(STm.indexOf(ds)%2===0)?YANG:YIN; const i0=lad.indexOf(ds); if(i0<0) continue;
  const P=pil8(r.d, r.yearBranch, r.monthBranch);
  const so=(()=>{const s0=WUSHU[ds]; if(!s0||!r.oraBranch)return null;
    const i=HB.indexOf(r.oraBranch); return i<0?null:STm[(STm.indexOf(s0)+i)%10];})();
  const steli=[P.annoS,P.meseS,ds,so].filter(Boolean);
  const rami=[r.yearBranch,r.monthBranch,r.dayBranch,r.oraBranch].filter(Boolean);
  // coppie di steli combinati presenti nella data (fra i quattro steli)
  const legati=new Set();
  for(let i=0;i<steli.length;i++) for(let j=i+1;j<steli.length;j++)
    if(HE[steli[i]]===steli[j]){ legati.add(i); legati.add(j); }
  const steliLiberi=steli.filter((s,i)=>!legati.has(i));
  const pres={};
  for(const s of steli){const e=SE[s]; (pres[e]=pres[e]||[]).push(s);}   // presenza: tutti
  for(const b of rami){const e=WX[b]; if(e)(pres[e]=pres[e]||[]).push(b);}
  const steloUtile=e=>steliLiberi.filter(s=>SE[s]===e && lad.indexOf(s)>=0);
  let capolinea=null, lung=-1, attore=null;
  for (const part of Object.keys(pres)) {
    let e=part, guard=0, ultimo=null, ultimoS=null, passi=0;
    while (guard++<6){ const g=GEN[e]; const su=steloUtile(g);
      if(!pres[g]||!su.length) break; e=g; ultimo=g; ultimoS=su[0]; passi++; }
    if (ultimo && passi>lung){ lung=passi; capolinea=ultimo; attore=ultimoS; }
  }
  const bestia=mob.bestia?mob.bestia.cn:null;
  const bEl=bestia?BEL[bestia]:null;
  const termSuMobile = capolinea && bEl && capolinea===bEl;
  const sale=r.move>0;
  const S=R.linee[R.shi-1], Y=R.linee[R.ying-1];
  const tag=r.c+' '+r.d+' · mobile L'+mob.pos+' '+mob.ramo+' VUOTA · capolinea '+(capolinea||'—')
    +(attore?(' ('+attore+')'):'')+' · bestia mobile '+(bestia||'—')+' ('+(bEl||'—')+')';
  if (!termSuMobile) { console.log('NO-SPECIALE  '+tag); continue; }
  nSpecial++;
  // padrone = pilastro del giorno; duello per generazione
  const dsEl=SE[ds], dbEl=WX[r.dayBranch];
  const shiGeneraPadrone = GEN[S.el]===dsEl;      // Shi -> stelo del padrone
  const padroneScorre = GEN[dsEl]===dbEl;          // stelo -> ramo del padrone
  const yingVince = shiGeneraPadrone;              // chi genera cede il Qi
  const vincitore = yingVince?Y:S;
  const ok=(vincitore.pos<=3?'SHORT':'LONG')===(sale?'LONG':'SHORT');
  console.log('SPECIALE     '+tag);
  console.log('             padrone '+ds+r.dayBranch+' ('+dsEl+'->'+dbEl+(padroneScorre?' scorre':'')+') · Shi '+S.ramo+' ('+S.el+') '
    +(shiGeneraPadrone?'GENERA il padrone -> vince YING':'non genera -> vince SHI')
    +' · verdetto '+(vincitore.pos<=3?'SHORT':'LONG')+' · mercato '+(sale?'LONG':'SHORT')+' '+(ok?'✓':'✗')+' '+(ok?'+':'-')+Math.abs(r.move).toFixed(0));
}
console.log('\nuniverso doppio legame: '+nDoppio+' · di cui mobile in vuoto (inerte): '+nInerte+' · caso speciale (flusso termina sulla bestia della mobile): '+nSpecial);
