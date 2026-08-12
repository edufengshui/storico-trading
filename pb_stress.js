/* pb_v3.js — Plum Blossom, scenario Yong ORIGINALE + regola del clash del palazzo.
 *
 * Scenario di base (fissato con Edu il 07/08/2026, misurato +6.223 pip, z 1,49):
 *   Trend = corpo (Yi), il trigramma SENZA la linea mutante — rappresenta l'EMA
 *   Yong  = il trigramma CON la linea mutante, letto nella forma ORIGINALE (non si muove)
 *   生我 prosegue · 我剋 prosegue · 我生 inverte · 剋我 inverte · 比和 NO TRADE
 *
 * REGOLA NUOVA — il clash del palazzo (dichiarata da Edu il 08/08/2026, da EURJPY 15/03/2023):
 *   Il Trend occupa un palazzo nel Houtian, a cui corrispondono uno o due rami:
 *     乾 戌亥 · 兌 酉 · 離 午 · 震 卯 · 巽 辰巳 · 坎 子 · 艮 丑寅 · 坤 未申
 *   Fra i rami del Bazi (anno, mese, giorno) si contano:
 *     - ATTACCANTI: i rami che clashano il palazzo del Trend
 *     - DIFENSORI:  i rami dello stesso elemento del Trend
 *   Ognuno pesa secondo il suo stato stagionale rispetto all'elemento del mese
 *   (cinque stadi 旺相休囚死). Il ramo dell'anno (Tai Sui) moltiplica il proprio peso.
 *   Se la somma degli attaccanti supera quella dei difensori, il Trend è spazzato via
 *   e il verdetto si INVERTE rispetto alla lettura di base.
 *   Se non ci sono attaccanti la regola non interviene.
 *
 * TARATURE NON DOTTRINALI, dichiarate:
 *   - scala dei cinque stadi in punti positivi: 旺 4 · 相 3 · 休 2 · 囚 1 · 死 0
 *   - moltiplicatore del Tai Sui: TAISUI (default 2)
 *   - "stesso elemento del palazzo" letto come elemento del TRIGRAMMA, non del ramo
 *     del palazzo (divergono solo per 乾 e 巽)
 *
 * Variabili: TAISUI=n · SCALA=piatta|stadi · CARTA="CROSS AAAA-MM-GG" · LISTA=1
 */
'use strict';
global.window = global;
const lj = require('lunar-javascript');
global.Solar = lj.Solar; global.Lunar = lj.Lunar;
require('./work_trading/pwa/solar-time.js');
require('./work_trading/pwa/jieqi-gmt.js');
const DLR = require('./work_trading/pwa/daliuren.js');
const T = require('./work_trading/pwa/trend.js');
const ST = require('./work_trading/pwa/solar-time.js');
// istante in cui a Greenwich entra il nuovo giorno in tempo solare vero:
// le 00:00 GMT corrette per l'equazione del tempo (oscilla di circa +/- 15 minuti)
function mezzanotteTST(y, mo, d){
  const approx = Date.UTC(y, mo-1, d, 0, 0, 0);
  let ms = approx;
  for (let i=0;i<3;i++) ms = approx - ST.equationOfTimeMinutes(new Date(ms))*60000;
  return ms;
}
const fs = require('fs');

const B = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const TRIGRAM = {
  1:{name:'乾 Qian', el:'Metal'}, 2:{name:'兌 Dui', el:'Metal'},
  3:{name:'離 Li',   el:'Fire'},  4:{name:'震 Zhen', el:'Wood'},
  5:{name:'巽 Xun',  el:'Wood'},  6:{name:'坎 Kan',  el:'Water'},
  7:{name:'艮 Gen',  el:'Earth'}, 8:{name:'坤 Kun',  el:'Earth'}
};
const HOUTIAN = { 1:['戌','亥'], 2:['酉'], 3:['午'], 4:['卯'], 5:['辰','巳'],
                  6:['子'], 7:['丑','寅'], 8:['未','申'] };
const COMBINA = { '子':'丑','丑':'子','寅':'亥','亥':'寅','卯':'戌','戌':'卯',
                  '辰':'酉','酉':'辰','巳':'申','申':'巳','午':'未','未':'午' };
const CLASH = { '子':'午','午':'子','丑':'未','未':'丑','寅':'申','申':'寅',
                '卯':'酉','酉':'卯','辰':'戌','戌':'辰','巳':'亥','亥':'巳' };
const GEN  = { Wood:'Fire', Fire:'Earth', Earth:'Metal', Metal:'Water', Water:'Wood' };
const CTRL = { Wood:'Earth', Earth:'Water', Water:'Fire', Fire:'Metal', Metal:'Wood' };
// NA YIN dell'esagramma iniziale (XKDG, Edu 10/08/2026): (sup,inf in Fuxi) -> elemento.
// Derivata dal software XKDG: esagramma di Re Wen -> jiazi -> Na Yin. Verificata su
// Wei Ji=甲申 Acqua, Ji Ji=甲寅 Acqua, Meng=庚申 Legno e gli otto esagrammi puri.
const NAYIN_ESAGRAMMA = {
  '1-1':'Metal', '1-2':'Wood', '1-3':'Metal', '1-4':'Fire', '1-5':'Metal', '1-6':'Earth', '1-7':'Water', '1-8':'Metal',
  '2-1':'Water', '2-2':'Earth', '2-3':'Wood', '2-4':'Water', '2-5':'Water', '2-6':'Wood', '2-7':'Fire', '2-8':'Water',
  '3-1':'Metal', '3-2':'Fire', '3-3':'Wood', '3-4':'Metal', '3-5':'Fire', '3-6':'Water', '3-7':'Earth', '3-8':'Fire',
  '4-1':'Wood', '4-2':'Metal', '4-3':'Earth', '4-4':'Wood', '4-5':'Earth', '4-6':'Fire', '4-7':'Wood', '4-8':'Earth',
  '5-1':'Earth', '5-2':'Wood', '5-3':'Fire', '5-4':'Earth', '5-5':'Wood', '5-6':'Earth', '5-7':'Metal', '5-8':'Wood',
  '6-1':'Fire', '6-2':'Earth', '6-3':'Water', '6-4':'Fire', '6-5':'Metal', '6-6':'Wood', '6-7':'Fire', '6-8':'Metal',
  '7-1':'Water', '7-2':'Fire', '7-3':'Wood', '7-4':'Water', '7-5':'Water', '7-6':'Wood', '7-7':'Earth', '7-8':'Water',
  '8-1':'Metal', '8-2':'Water', '8-3':'Earth', '8-4':'Metal', '8-5':'Fire', '8-6':'Metal', '8-7':'Wood', '8-8':'Metal'
};
const WX = { '子':'Water','丑':'Earth','寅':'Wood','卯':'Wood','辰':'Earth','巳':'Fire',
             '午':'Fire','未':'Earth','申':'Metal','酉':'Metal','戌':'Earth','亥':'Water' };

const S10 = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const AUTOPEN = ['辰','午','酉','亥'];   // i rami che si autopenalizzano raddoppiando
// i due rami vuoti (旬空) della decade a cui appartiene il pilastro dato
function vuotiDi(stem, branch){
  const si = S10.indexOf(stem), bi = B.indexOf(branch);
  if (si < 0 || bi < 0) return [];
  const start = ((bi - si) % 12 + 12) % 12;
  return [ B[(start + 10) % 12], B[(start + 11) % 12] ];
}
const TAISUI = process.env.TAISUI ? Number(process.env.TAISUI) : 2;
const PUNTI = { '旺':4, '相':3, '休':2, '囚':1, '死':0 };

function stagione(el, seasonEl){
  if (el === seasonEl) return '旺';
  if (GEN[seasonEl] === el) return '相';
  if (GEN[el] === seasonEl) return '休';
  if (CTRL[seasonEl] === el) return '死';
  if (CTRL[el] === seasonEl) return '囚';
  return '休';
}
function peso(branch, monthEl, isTaiSui){
  const p = process.env.SCALA === 'stadi' ? PUNTI[stagione(WX[branch], monthEl)] : 1;
  return isTaiSui ? p * TAISUI : p;
}

const mod8 = n => { const r = n % 8; return r === 0 ? 8 : r; };
const mod6 = n => { const r = n % 6; return r === 0 ? 6 : r; };
const f3 = p => { const d = String(p).replace(/[^0-9]/g,'').replace(/^0+/,'');
  return d.slice(0, Math.abs(Number(p)) < 1 ? 2 : 3); };
function seedEdge(price){ const p = Math.abs(Number(price)); if(!(p>0)) return null;
  const n = p<1?2:3; const step = Math.pow(10, Math.floor(Math.log10(p))-n+1);
  const fr = p/step - Math.floor(p/step); return Math.min(fr, 1-fr)*100; }
const pipFactor = c => /JPY$/.test(c) ? 100 : 10000;

function yearBranchAt(y,m,d){
  return lj.Solar.fromYmdHms(y,m,d,0,0,0).getLunar().getEightChar().getYear().charAt(1);
}
function yearStemAt(y,m,d){
  return lj.Solar.fromYmdHms(y,m,d,0,0,0).getLunar().getEightChar().getYear().charAt(0);
}
// stelo del mese con la regola dei Cinque Tigri (五虎遁), dal ramo del mese del motore
const STEMS10 = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const WUHU = { '甲':'丙','己':'丙','乙':'戊','庚':'戊','丙':'庚','辛':'庚','丁':'壬','壬':'壬','戊':'甲','癸':'甲' };
const MESI_DA_YIN = ['寅','卯','辰','巳','午','未','申','酉','戌','亥','子','丑'];
function monthStemFrom(yearStem, monthBranch){
  const start = STEMS10.indexOf(WUHU[yearStem]);
  const idx = MESI_DA_YIN.indexOf(monthBranch);
  return STEMS10[(start + idx) % 10];
}
// clash degli steli (i quattro: 甲庚 乙辛 丙壬 丁癸; 戊己 senza clash)
const STEMCLASH = { '甲':'庚','庚':'甲','乙':'辛','辛':'乙','丙':'壬','壬':'丙','丁':'癸','癸':'丁' };

/* lettura di base + regola del clash */
const seedToBranch = s => B[(((s-1)%12)+12)%12];
function leggi(seed, dayBranch, monthBranch, yearBranch, dayStem, emaRun){
  const oraBranch = seedToBranch(seed);
  const sup = mod8(Math.floor(seed/8)), inf = mod8(seed);
  const dayNum = B.indexOf(dayBranch) + 1;
  const linea = mod6(sup + inf + dayNum);
  const usoNum   = linea <= 3 ? inf : sup;
  const corpoNum = linea <= 3 ? sup : inf;
  const uso = TRIGRAM[usoNum], corpo = TRIGRAM[corpoNum];
  // trigramma futuro: la linea mutante del Yong si rovescia
  const posT = linea <= 3 ? linea : linea - 3;
  const usoTrasf = (((usoNum - 1) ^ (1 << (3 - posT))) + 1);
  const trasf = TRIGRAM[usoTrasf];
  // YONG=trasformato legge la relazione col trigramma futuro invece che con l'originale
  const YY = process.env.YONG === 'trasformato';
  const yongNum = YY ? usoTrasf : usoNum;
  const yong = YY ? trasf : uso;
  const A = corpo.el, Z = yong.el;         // Trend = corpo

  // SELETTORE DEL RAMO ATTIVO NEL PALAZZO DEL YONG (tre ipotesi, Edu 08/08/2026)
  //   SEL=ora        polarita' dell'ora ricavata dal seme  (come per il Trend)
  //   SEL=posizione  polarita' della POSIZIONE della linea mobile: 1,3,5 yang · 2,4,6 yin
  //   SEL=natura     yin/yang della linea mobile stessa: intera = yang, spezzata = yin
  //   SEL=trig       polarita' della posizione DENTRO IL TRIGRAMMA: base e cima yang, mezzo yin
  //   SEL=concorde   yang se natura e posizione nel trigramma concordano, yin se discordano
  const posInTrig = linea <= 3 ? linea : linea - 3;           // 1 = base del trigramma
  const lineaIntera = (((usoNum - 1) >> (3 - posInTrig)) & 1) === 0;  // Fuxi: 0 = intera
  const posTrigYang = posInTrig !== 2;
  const SEL = process.env.SEL || 'natura';
  const selYang = SEL === 'posizione' ? ((linea % 2) === 1)
                : SEL === 'natura'    ? lineaIntera
                : SEL === 'trig'      ? posTrigYang
                : SEL === 'concorde'  ? (lineaIntera === posTrigYang)
                : ((B.indexOf(oraBranch) % 2) === 0);
  const palNum = process.env.PALYONG === 'originale' ? usoNum : yongNum;
  let palazzoYong = HOUTIAN[palNum];
  if (palazzoYong.length === 2)
    palazzoYong = palazzoYong.filter(b => ((B.indexOf(b) % 2) === 0) === selYang);

  let via, base;
  if (A === Z)                  { via='比和'; base=null; }
  else if (GEN[Z] === A)        { via='生我'; base=true;  }
  else if (CTRL[A] === Z)       { via='我剋'; base=true;  }
  else if (GEN[A] === Z)        { via='我生'; base=false; }
  else if (CTRL[Z] === A)       { via='剋我'; base=false; }

  // PARITA' — scioglimento del pareggio 比和 (Edu, 08/08/2026):
  // quando i due trigrammi sono dello stesso elemento la relazione e' in pareggio.
  // Si legge allora il ramo del palazzo attivo del Yong contro il Trend.
  if (base === null) {
    if (process.env.NOPARITA) return { via, base:null };
    const pe = palazzoYong.length ? WX[palazzoYong[0]] : null;
    if (!pe) return { via, base:null };
    if (pe === A)                { via='比和·pari';  return { via, base:null }; }
    else if (GEN[pe] === A)      { via='比和·生我';  base=true;  }
    else if (CTRL[A] === pe)     { via='比和·我剋';  base=true;  }
    else if (GEN[A] === pe)      { via='比和·我生';  base=false; }
    else if (CTRL[pe] === A)     { via='比和·剋我';  base=false; }
    else return { via, base:null };
  }

  // regola del clash del palazzo
  // palazzi doppi: la linea mobile sceglie il ramo attivo (yang = linee 1,3,5)
  // l'ora ricavata dal seme sceglie il ramo attivo nei palazzi doppi.
  // VUOTO=1: se l'ora e' vuota (旬空) non svolge alcuna funzione e non sceglie:
  // il palazzo resta doppio e valgono entrambi i rami.
  const vuoti = dayStem ? vuotiDi(dayStem, dayBranch) : [];
  const monthEl = WX[monthBranch];
  const oraVuota = (vuoti.indexOf(oraBranch) >= 0) && !(process.env.VS_ORA && stagione(WX[oraBranch], monthEl) === '旺');
  // VUOTO=doppio   ora vuota -> non sceglie, restano attivi ENTRAMBI i rami
  //                (il Trend e' piu' facile da colpire)
  // VUOTO=nessuno  ora vuota -> non sceglie, non e' attivo NESSUN ramo
  //                (il Trend e' incolpibile)
  // VUOTO assente  l'ora sceglie sempre, anche se vuota
  let palazzo = HOUTIAN[corpoNum];
  const V = process.env.VUOTO || 'doppio';
  if (V && oraVuota && palazzo.length === 2) {
    if (V === 'nessuno') palazzo = [];
  } else if (V === 'nessuno' && oraVuota) {
    palazzo = [];                       // palazzo singolo, ora vuota: nessun ramo attivo
  } else if (palazzo.length === 2) {
    const oraYang = (B.indexOf(oraBranch) % 2) === 0;
    palazzo = palazzo.filter(b => ((B.indexOf(b) % 2) === 0) === oraYang);
  }
  let bazi = [ {b:yearBranch, ts:true}, {b:monthBranch, ts:false}, {b:dayBranch, ts:false} ];
  // l'ora ricavata dal seme sceglie il ramo attivo nei palazzi doppi,
  // ma NON entra nel Bazi: non attacca, non difende, non combina.

  // COMBINAZIONE: due rami che si combinano si legano a vicenda e non fanno niente.
  // Si appaiano uno a uno: con 卯 戌 戌 si lega una sola coppia, il secondo 戌 resta libero.
  const dettComb = [];
  if (!process.env.NOCOMB) {
    const usato = bazi.map(()=>false);
    for (let i=0;i<bazi.length;i++){
      if (usato[i]) continue;
      for (let j=i+1;j<bazi.length;j++){
        if (usato[j]) continue;
        if (COMBINA[bazi[i].b] === bazi[j].b){
          usato[i]=true; usato[j]=true;
          dettComb.push(bazi[i].b+'+'+bazi[j].b);
          break;
        }
      }
    }
    bazi = bazi.filter((x,i)=>!usato[i]);
  }

  // FORZE DENTRO LA DATA (Edu, 08/08/2026 — da USDJPY 06/09/2022):
  // fra i rami vivi del Bazi, due che si clashano si combattono. Vince il piu' forte
  // nel mese; il Tai Sui vince sempre il suo clash. Il perdente resta a meta' forza.
  // Ogni ramo porta ora una forza (1 pieno, 0,5 dimezzato) usata quando difende o
  // quando sostiene il Yong.  NOFORZE=1 disattiva: tutti restano a forza piena.
  const FORDINE = { '旺':4, '相':3, '休':2, '囚':1, '死':0 };
  bazi.forEach(x => x.forza = 1);
  const dettForze = [];
  // CLASH FRA TOMBE (Edu, 10/08/2026, da USDJPY 30/04/2026): il clash fra due rami di
  // Terra (辰戌 o 丑未) non e' un combattimento: produce piu' Terra e APRE le tombe,
  // liberando l'elemento custodito (辰 Acqua · 戌 Fuoco · 丑 Metallo · 未 Legno).
  //   TOMBE=forze   i due rami di Terra non si dimezzano (restano a forza piena)
  //   TOMBE=flusso  forze + gli elementi liberati entrano nel flusso del qi
  //   TOMBE=drena   forze + gli elementi liberati contano nel netStr del drenaggio
  //   TOMBE=tutto   tutte e tre
  const TOMBA = { '辰':'Water', '戌':'Fire', '丑':'Metal', '未':'Wood' };
  const TM = process.env.TOMBE;
  const liberati = [];
  if (TM) {
    for (let i=0;i<bazi.length;i++) for (let j=i+1;j<bazi.length;j++){
      if (CLASH[bazi[i].b] !== bazi[j].b) continue;
      if (WX[bazi[i].b] === 'Earth' && WX[bazi[j].b] === 'Earth') {
        liberati.push(TOMBA[bazi[i].b], TOMBA[bazi[j].b]);
        bazi[i].tomba = true; bazi[j].tomba = true;
        dettForze.push(bazi[i].b+' e '+bazi[j].b+' clash di tombe → più Terra, liberati '+TOMBA[bazi[i].b]+'/'+TOMBA[bazi[j].b]);
      }
    }
  }
  if (!process.env.NOFORZE) {
    for (let i=0;i<bazi.length;i++) for (let j=i+1;j<bazi.length;j++){
      if (CLASH[bazi[i].b] !== bazi[j].b) continue;
      if (TM && bazi[i].tomba && bazi[j].tomba) continue;   // clash di tombe: nessun dimezzamento
      let vinc = i, pers = j;
      if (bazi[j].ts) { vinc=j; pers=i; }
      else if (bazi[i].ts) { vinc=i; pers=j; }
      else {
        // vince chi ha piu' alleati nel Bazi (rami dello stesso elemento), non la stagione
        const alleati = b => bazi.filter(y => WX[y.b] === WX[b]).length;
        if (alleati(bazi[j].b) > alleati(bazi[i].b)) { vinc=j; pers=i; }
        else if (alleati(bazi[i].b) === alleati(bazi[j].b)) {
          // pari alleati: nessuno prevale, restano entrambi a meta'
          bazi[i].forza = Math.min(bazi[i].forza, 0.5);
          bazi[j].forza = Math.min(bazi[j].forza, 0.5);
          dettForze.push(bazi[i].b+' e '+bazi[j].b+' pari → entrambi a metà');
          continue;
        }
      }
      bazi[pers].forza = Math.min(bazi[pers].forza, 0.5);
      dettForze.push(bazi[vinc].b+' batte '+bazi[pers].b+' → '+bazi[pers].b+' a metà');
    }
  }

  // ECCITAZIONE: se l'elemento del Trend e' forte in stagione (旺 o 相) il clash
  // non lo spazza via, lo eccita. La regola non interviene affatto.
  const statoTrend = stagione(corpo.el, monthEl);
  const eccitato = !!process.env.ECC && (statoTrend === '旺' || statoTrend === '相');

  let att = 0, dif = 0;
  const dettAtt = [], dettDif = [];
  const dettPonte = [];
  // VUOTO CHE NON COLPISCE (Edu, 08/08/2026 — da USDJPY 13/12/2023):
  // un ramo del Bazi che sia fra i due vuoti (旬空) della decade del giorno non ha
  // sostanza e non puo' clashare il palazzo del Trend. Vale anche per il Tai Sui.
  // NOVUOTOATT=1 disattiva la regola, per confronto.
  const dettVuoti = [];
  bazi.forEach(x => {
    if (!process.env.NOVUOTOATT && vuoti.indexOf(x.b) >= 0 && !(process.env.VS_BAZI && stagione(WX[x.b], monthEl) === '旺')) {
      dettVuoti.push(x.b+' vuoto, non fa niente'); return;   // non attacca e non difende
    }
    const clasha = palazzo.some(p => CLASH[p] === x.b);
    if (clasha) {
      // il ponte: un altro ramo del Bazi che l'attaccante genera e che genera il Trend
      const ponte = bazi.find(y => y.b !== x.b &&
        GEN[WX[x.b]] === WX[y.b] && GEN[WX[y.b]] === corpo.el);
      let w = peso(x.b, monthEl, x.ts);
      if (ponte) {
        if (ponte.ts) w = w * TAISUI;      // ponte sul Tai Sui: porta di piu'
        dif += w;
        dettPonte.push(x.b+'→'+ponte.b+' '+w+(ponte.ts?' (ponte Tai Sui)':' (ponte)'));
      } else {
        att += w;
        dettAtt.push(x.b+' '+stagione(WX[x.b],monthEl)+' '+w+(x.ts?' (Tai Sui)':''));
      }
    }
    else if (WX[x.b] === corpo.el) { const w = peso(x.b, monthEl, x.ts) * (x.forza||1); dif += w;
      dettDif.push(x.b+' '+stagione(WX[x.b],monthEl)+' '+w+(x.forza<1?' (metà)':'')+(x.ts?' (Tai Sui)':'')); }
  });
  // BLOCCO PER COMBINAZIONE DEI PALAZZI (Edu, 08/08/2026 — da EURJPY 01/05/2024):
  // il Yong occupa anch'esso un palazzo Houtian; se i rami sono due, e' la LINEA MOBILE
  // a dire quale agisce (linee 1,3,5 = yang). Se il palazzo del Yong si combina con
  // quello del Trend, i due si legano e il Trend non puo' esercitare la relazione:
  // il verdetto e' INVERTE. Mai il contrario.
  // Il BLOCCO PER COMBINAZIONE fra il palazzo del Trend e quello del Yong e' stato
  // rimosso l'08/08/2026: misurato coi tre selettori dava -876, -418, -1.032 pip.
  const bloccato = false;

  // AUTOPENALITA' (Edu, 08/08/2026 — da EURJPY 01/05/2024): se un ramo del palazzo del
  // Trend e' fra 辰午酉亥 e compare due o piu' volte nel Bazi, si autopenalizza; il Trend
  // e' guasto e non vince: verdetto INVERTE. Mai il contrario.
  const baziTutti = [yearBranch, monthBranch, dayBranch];
  const autopen = !process.env.NOAUTOPEN && palazzo.some(pz =>
    AUTOPEN.indexOf(pz) >= 0 && baziTutti.filter(b => b === pz).length >= 2);

  // PONTE DEL PALAZZO DEL YONG (Edu, 08/08/2026 — da USDJPY 06/09/2022):
  // se il ramo del palazzo attivo del Yong e' dell'elemento che il Yong genera e che a
  // sua volta genera il Trend, il controllo del Yong non arriva: esce gia' trasformato,
  // passa dentro il proprio palazzo e diventa nutrimento. Il Trend regge e PROSEGUE.
  // E' l'unica regola che puo' portare un INVERTE a PROSEGUE.
  // SCARICO DEL YONG NEL PROPRIO PALAZZO (Edu, 08/08/2026 — da EURUSD 19/03/2020):
  // se il ramo attivo del palazzo del Yong e' dell'elemento che il Yong genera, il Yong
  // si scarica nel proprio palazzo e si indebolisce da solo: non riesce a esercitare la
  // relazione sul Trend, che regge e PROSEGUE.
  //   SCARICO=stretto  solo nelle carte in pareggio (比和)
  //   SCARICO=largo    su tutte le carte con verdetto di base INVERTE
  const yongScarico = palazzoYong.length === 1 &&
        GEN[yong.el] === WX[palazzoYong[0]];
  const SC = process.env.SCARICO;
  const scarico = !!SC && yongScarico && base === false &&
        (SC === 'largo' ? true : /比和/.test(via));

  // PONTE SULLA RELAZIONE (Edu, 08/08/2026 — da EURJPY 07/12/2023):
  // se fra i rami vivi del Bazi ce n'e' uno che il Yong genera e che a sua volta genera
  // il Trend, il controllo del Yong non arriva: passa dentro quel ramo e diventa
  // nutrimento. Il Trend regge e SEGUE il trend.
  //   PONTEREL=stretto  solo dove il Yong controlla il Trend (剋我)
  //   PONTEREL=largo    su tutte le carte con verdetto di base "non segue"
  const attivi = bazi.filter(x => vuoti.indexOf(x.b) < 0 || (process.env.VS_BAZI && stagione(WX[x.b], monthEl) === '旺'));
  // COMBINAZIONE COL PALAZZO DEL TREND (Edu, 08/08/2026 — da USDJPY 06/09/2022):
  // un ramo vivo del Bazi che si combini (六合) col ramo attivo del palazzo del Trend
  // lo protegge. Il Trend regge e SEGUE il trend.
  //   COMBPAL=verdetto  ribalta il verdetto a "segue"
  //   COMBPAL=difesa    conta solo come difensore in piu' nel conto del clash
  const ramiProt = attivi.filter(x => palazzo.some(pz => COMBINA[pz] === x.b));
  const CP = process.env.COMBPAL;
  const protetto = CP === 'verdetto' && base === false && ramiProt.length > 0;
  if (CP === 'difesa') ramiProt.forEach(x => { dif += peso(x.b, monthEl, x.ts); });
  const PR = process.env.NOPONTEREL ? null : (process.env.PONTEREL || 'taisui');
  const ramiPonte = attivi.filter(x => GEN[yong.el] === WX[x.b] && GEN[WX[x.b]] === corpo.el);
  const ponteRel = !!PR && base === false &&
        (PR === 'taisui' ? ramiPonte.some(x=>x.ts) : ramiPonte.length > 0);

  const ponteYong = !!process.env.PONTEY && via === '剋我' &&
    palazzoYong.some(py => GEN[yong.el] === WX[py] && GEN[WX[py]] === corpo.el);

  // SOSTEGNO DEL YONG INDEBOLITO (Edu, 08/08/2026 — da USDJPY 06/09/2022):
  // il Yong controlla il Trend (剋我). Se il ramo del Bazi che sostiene il Yong — un
  // ramo del suo stesso elemento — ha perso un clash dentro la data ed e' a meta' forza,
  // il controllo del Yong non ha appoggio e non passa. Il Trend regge e SEGUE il trend.
  //   SOSTEGNO=metà   basta un sostegno indebolito (a 0,5)
  //   SOSTEGNO=assente il Yong e' senza sostegno solo se il ramo e' proprio sparito
  const sostegni = bazi.filter(x => WX[x.b] === yong.el);
  const yongDebole = !process.env.NOSOSTEGNO && via === '剋我' && sostegni.length > 0 &&
        sostegni.every(x => x.forza <= 0.5);

  const spazzato = !eccitato && att > 0 && att > dif;
  // RAFFORZAMENTO: base=segue ma Yong rafforzato dalla mutazione (casi 1 生我, 5 比和) → non segue
  const rafforzato = !!process.env.RAFFORZA && base === true && (emaRun == null || emaRun < 20) &&
        (uso.el === trasf.el || GEN[trasf.el] === uso.el);
  // TREND VUOTO nel PAREGGIO: palazzo del Trend vuoto (旬空); ramo attivo scelto dalla posizione
  // della linea mutante (1,3,5 = yang · 2,4,6 = yin). Nel pareggio 比和 un corpo vuoto perde → non segue.
  const palTrend = HOUTIAN[corpoNum] || [];
  let ramoTrend;
  if (palTrend.length === 1) ramoTrend = palTrend[0];
  else if (process.env.VUOTOSEL === 'ora') {
    const oraY2 = (B.indexOf(oraBranch) % 2) === 0;
    ramoTrend = palTrend.find(b => ((B.indexOf(b) % 2) === 0) === oraY2);
  }
  else { const lineaYang = (linea % 2 === 1); ramoTrend = palTrend.find(b => ((B.indexOf(b) % 2) === 0) === lineaYang); }
  const trendVuotoRaw = ramoTrend != null && vuoti.indexOf(ramoTrend) >= 0;
  // 旺不为空: un ramo prospero di stagione non è davvero vuoto
  const stagRamoTrend = ramoTrend != null ? stagione(WX[ramoTrend], monthEl) : null;
  const ramoProspero = stagRamoTrend === '旺' || (process.env.VUOTOSTAG === 'wangxiang' && stagRamoTrend === '相');
  const trendVuoto = trendVuotoRaw && !(process.env.VUOTOSTAG && ramoProspero);
  const vuotoPareggio = !!process.env.VUOTO && via.indexOf('比和') === 0 && trendVuoto;
  // SOPRAFFAZIONE DEL TRASFORMATO (Edu, 09/08/2026): quando il verdetto è "segue" ma il Yong
  // TRASFORMATO finisce per controllare il Ti (剋 nella lettura trasformata), il corpo è
  // sopraffatto → non segue. Vale per qualsiasi caso di mutazione (non solo il caso 2).
  const sopraffTrasf = !!process.env.SOPRAF && CTRL[trasf.el] === corpo.el;
  // FLUSSO DEL QI DISCRETO (Edu, 10/08/2026): fra gli elementi dei tre rami del Bazi il qi
  // corre lungo la catena generativa. CAPOLINEA = elemento che riceve e non cede a un altro
  // presente: il qi converge su di lui e lo nutre. SORGENTE = cede senza ricevere: si svuota.
  const elsPres0 = Array.from(new Set([yearBranch, monthBranch, dayBranch].map(b => WX[b])));
  const conLib = (TM === 'flusso' || TM === 'tutto');
  const elsPres = conLib ? Array.from(new Set(elsPres0.concat(liberati))) : elsPres0;
  const fRiceve = e => elsPres.some(x => GEN[x] === e);
  const fCede   = e => elsPres.indexOf(GEN[e]) >= 0;
  const capolinea = elsPres.filter(e => fRiceve(e) && !fCede(e));
  const sorgenti  = elsPres.filter(e => fCede(e) && !fRiceve(e));
  const flussoVersoTi  = capolinea.indexOf(corpo.el) >= 0 || capolinea.some(e => GEN[e] === corpo.el);
  const flussoViaDalTi = sorgenti.indexOf(corpo.el) >= 0 ||
        (fCede(corpo.el) && !fRiceve(corpo.el) && elsPres.indexOf(corpo.el) < 0 && elsPres.indexOf(GEN[corpo.el]) >= 0);
  // FLUSSOTI (Edu, 10/08/2026): la sopraffazione NON scatta se il flusso del qi converge
  // sul Ti: il corpo è nutrito dalla data e regge l'attacco del trasformato.
  // NAYINDEB (Edu, 10/08/2026): il Na Yin dell'esagramma iniziale (XKDG: esagramma → jiazi
  // → Na Yin) dello stesso elemento del Ti salva un Ti debole di stagione (死/囚) dalla
  // sopraffazione, purché il flusso del qi non porti via dal Ti.
  const nayElS = NAYIN_ESAGRAMMA[sup+'-'+inf] || null;
  const tiStatoS = stagione(corpo.el, monthEl);
  const nayinSalva = !!process.env.NAYINDEB && nayElS === corpo.el &&
        (tiStatoS === '死' || tiStatoS === '囚') && !flussoViaDalTi;
  const sopraffAttiva = sopraffTrasf &&
        !(process.env.FLUSSOTI && flussoVersoTi) && !nayinSalva;
  // DRENAGGIO DEL TI (Edu, 09/08/2026): se il Ti genera il trasformato (Ti drenato) e il
  // trasformato è preponderante nel Bazi (netStr >= 3: sostenuto da tutti i rami, non
  // controllato), il corpo si svuota → non segue. Solo se il trasformato ha davvero la forza.
  const baziRami = [yearBranch, monthBranch, dayBranch];
  const elsDrena = (TM === 'drena' || TM === 'tutto') ? baziRami.map(b=>WX[b]).concat(liberati) : baziRami.map(b=>WX[b]);
  const nsTrasf = elsDrena.filter(e => e === trasf.el || GEN[e] === trasf.el).length
                - elsDrena.filter(e => CTRL[e] === trasf.el).length;
  const drenaggio = !!process.env.DRENA && GEN[corpo.el] === trasf.el && nsTrasf >= 3;
  let finale = (ponteYong || scarico || ponteRel || protetto || yongDebole) ? true
             : ((spazzato || bloccato || autopen || rafforzato) ? false : base);
  if (vuotoPareggio && finale === true) finale = false;
  if (sopraffAttiva && finale === true) finale = false;
  if (drenaggio && finale === true) finale = false;
  // RISCATTO DEL TRASFORMATO MORTO (Edu, 10/08/2026, da USDJPY 31/07/2024):
  // quando la base dice "non segue" ma il ramo attivo del palazzo del Yong ORIGINALE
  // (scelto dall'ORA per polarita', se l'ora non e' vuota) e' dell'elemento prospero
  // del mese E quell'elemento controlla il trasformato, il trasformato nasce morto
  // (schiacciato in stagione, non nutrito) e non minaccia il Ti -> torna "segue".
  //   RISCATTO=a  base 我生 + ramo=mese + ramo controlla il trasformato
  //   RISCATTO=b  a + Na Yin dell'esagramma = elemento del Ti (Ti rinfocolato)
  //   RISCATTO=c  come a ma senza vincolo del mese: ramo preponderante (>=2 nei rami)
  //   RISCATTO=d  come a ma su qualsiasi base "non segue" (non solo 我生)
  let riscatto = false;
  if (process.env.RISCATTO && base === false && !oraVuota) {
    const palOrig = HOUTIAN[usoNum];
    const oraY = (B.indexOf(oraBranch) % 2) === 0;
    const ramoOra = palOrig.length === 1 ? palOrig[0]
                  : palOrig.filter(b2 => ((B.indexOf(b2) % 2) === 0) === oraY)[0];
    if (ramoOra) {
      const we = WX[ramoOra];
      const controlla = CTRL[we] === trasf.el;
      const prospero = we === monthEl;
      const prepond = [yearBranch, monthBranch, dayBranch].filter(b2 => WX[b2] === we).length >= 2;
      const nayOk = NAYIN_ESAGRAMMA[sup+'-'+inf] === corpo.el;
      const RV = process.env.RISCATTO;
      riscatto = RV === 'a' ? (via === '我生' && prospero && controlla)
               : RV === 'b' ? (via === '我生' && prospero && controlla && nayOk)
               : RV === 'c' ? (via === '我生' && prepond && controlla)
               : RV === 'd' ? (prospero && controlla)
               : false;
    }
  }
  if (riscatto) finale = true;
  // ATTERRAGGIO NEL VUOTO (Edu, 11/08/2026, da Liu Yao su USDJPY 31/07/2024):
  // via Na Jia, la linea mutante atterra su un ramo del trigramma TRASFORMATO; se quel
  // ramo e' vuoto (旬空 del giorno) il trasformato nasce vuoto e non puo' agire.
  // (旺不为空 NON si applica: la correzione vale solo per il vuoto del Trend.)
  //   ATTVUOTO=a  il trasformato vuoto non sopraffa' (guardia sulla sopraffazione)
  //   ATTVUOTO=b  base "non segue" + trasformato vuoto che controllava il Ti -> segue
  //   ATTVUOTO=c  base "non segue" + trasformato vuoto (qualsiasi) -> segue
  const NAJIA_IN  = {1:['子','寅','辰'],2:['巳','卯','丑'],3:['卯','丑','亥'],4:['子','寅','辰'],
                     5:['丑','亥','酉'],6:['寅','辰','午'],7:['辰','午','申'],8:['未','巳','卯']};
  const NAJIA_OUT = {1:['午','申','戌'],2:['亥','酉','未'],3:['酉','未','巳'],4:['午','申','戌'],
                     5:['未','巳','卯'],6:['申','戌','子'],7:['戌','子','寅'],8:['丑','亥','酉']};
  let attVuoto = false;
  if (process.env.ATTVUOTO) {
    const interno = linea <= 3;
    const posL = interno ? linea : linea - 3;
    const ramoAtt = (interno ? NAJIA_IN : NAJIA_OUT)[usoTrasf][posL - 1];
    attVuoto = vuoti.indexOf(ramoAtt) >= 0;
  }
  if (attVuoto) {
    const AV = process.env.ATTVUOTO;
    if (AV === 'a' && sopraffAttiva && base === true) finale = true;
    if (AV === 'b' && base === false && CTRL[trasf.el] === corpo.el) finale = true;
    if (AV === 'c' && base === false) finale = true;
  }
  // SOCCORSO DEL TI (Edu, 12/08/2026, da USDCAD 17/06/2026): quando la base dice
  // "non segue" per relazione di controllo, ma la catena di soccorso e' COMPLETA
  // (il flusso del qi della data converge sul Ti + il Na Yin dell'esagramma e' dello
  // stesso elemento del Ti debole 死/囚 e il flusso non porta via), il Ti e' rinfocolato
  // e regge anche il controllo diretto del Yong -> torna "segue".
  //   SOCCORSO=k   solo sulle carte 剋我
  //   SOCCORSO=ks  su 剋我 e 我生
  //   SOCCORSO=kf  come k ma basta il flusso verso il Ti (senza richiedere il Na Yin)
  let soccorso = false;
  if (process.env.SOCCORSO && base === false && finale === false) {
    const SV = process.env.SOCCORSO;
    const viaOk = SV === 'ks' ? (via === '剋我' || via === '我生') : (via === '剋我');
    const catena = SV === 'kf' ? flussoVersoTi
      : (flussoVersoTi && nayElS === corpo.el && (tiStatoS === '死' || tiStatoS === '囚') && !flussoViaDalTi);
    if (viaOk && catena) { finale = true; soccorso = true; }
  }
  // LIUTAG: calcola i dati Liu Yao (palazzo, Shi/Ying, parenti) senza toccare il verdetto
  let liu = null;
  if (process.env.LIUTAG || process.env.LIUYAO) {
    const yangLine2 = (n,p) => ((((n-1) >> (3-p)) & 1) === 0);
    const bitsOf2 = (i8,s8) => { let s=''; for(let p=1;p<=3;p++) s+=(yangLine2(i8,p)?'1':'0');
                                for(let p=1;p<=3;p++) s+=(yangLine2(s8,p)?'1':'0'); return s; };
    if (!global.__PAL2) {
      global.__PAL2 = {};
      for (let P=1;P<=8;P++){
        const pure = bitsOf2(P,P).split('');
        const seq = [ {fl:[],shi:6},{fl:[1],shi:1},{fl:[1,2],shi:2},{fl:[1,2,3],shi:3},
                      {fl:[1,2,3,4],shi:4},{fl:[1,2,3,4,5],shi:5},{fl:[1,2,3,5],shi:4},{fl:[5],shi:3} ];
        for (const g of seq){
          const b2 = pure.slice(); g.fl.forEach(L => b2[L-1] = b2[L-1]==='1'?'0':'1');
          global.__PAL2[b2.join('')] = { shi: g.shi, ying: g.shi>3 ? g.shi-3 : g.shi+3, pal: P };
        }
      }
    }
    const pal2 = global.__PAL2[bitsOf2(inf, sup)];
    const ramoAl2 = p => p<=3 ? NAJIA_IN[inf][p-1] : NAJIA_OUT[sup][p-4];
    // linea mobile: partenza (originale) e arrivo (trasformato), semantica di Edu 11/08/2026:
    //  1. arrivo genera partenza (回頭生)  -> agisce la PARTENZA rafforzata
    //  2. partenza genera arrivo           -> agisce L'ARRIVO
    //  3. arrivo controlla partenza (回頭剋)-> linea spezzata, effetto NULLO
    //  4. partenza controlla arrivo        -> agisce L'ARRIVO
    //  5. stesso elemento                  -> come 1 (partenza rafforzata)
    const ramoDep = ramoAl2(linea);
    const ramoArr = linea<=3 ? NAJIA_IN[usoTrasf][linea-1] : NAJIA_OUT[usoTrasf][linea-4];
    const depEl = WX[ramoDep], arrEl = WX[ramoArr];
    let effEl, casoMut;
    if (GEN[arrEl] === depEl)      { effEl = depEl; casoMut = 1; }
    else if (GEN[depEl] === arrEl) { effEl = arrEl; casoMut = 2; }
    else if (CTRL[arrEl] === depEl){ effEl = null;  casoMut = 3; }
    else if (CTRL[depEl] === arrEl){ effEl = arrEl; casoMut = 4; }
    else                           { effEl = depEl; casoMut = 5; }
    // vuoti sulla mutante (Edu, 11/08/2026): la linea che si muove non e' mai vuota
    // (動不為空, nessuna correzione); se invece L'ARRIVO e' vuoto, il movimento e' NULLO.
    if (vuoti.indexOf(ramoArr) >= 0) { effEl = null; casoMut = 0; }
    // sospensione dal giorno (Edu, 11/08/2026): se il ramo del giorno COMBINA (六合) o
    // CLASHA (六冲) con la partenza o con l'arrivo, la linea non produce risultato ora
    // (lo produrra' quando combinazione/clash si scioglie — fuori dal nostro orizzonte).
    if (COMBINA[dayBranch] === ramoDep || COMBINA[dayBranch] === ramoArr ||
        CLASH[dayBranch] === ramoDep || CLASH[dayBranch] === ramoArr) { effEl = null; casoMut = -1; }
    const shiB = ramoAl2(pal2.shi), yingB = ramoAl2(pal2.ying);
    let shiElE = WX[shiB], yingElE = WX[yingB], shiValido = true, yingValido = true;
    // 1. (Edu, 11/08/2026) l'ARRIVO della mutante COMBINA (六合) con Shi o Ying:
    //    quello riceve la partenza della linea e "diventa" quella linea
    if (COMBINA[ramoArr] === shiB)  shiElE = depEl;
    if (COMBINA[ramoArr] === yingB) yingElE = depEl;
    // 2. l'ARRIVO CLASHA (六冲) Shi o Ying: quello e' invalidato
    if (CLASH[ramoArr] === shiB)  shiValido = false;
    if (CLASH[ramoArr] === yingB) yingValido = false;
    // 3. forza delle linee: stagione del mese, MA il ramo del giorno resta forte e
    //    influenza anch'esso — una linea e' forte se 旺/相 nel mese O sostenuta dal giorno
    const fortLinea = e => { const st = stagione(e, monthEl);
      if (st === '旺' || st === '相') return true;
      const de = WX[dayBranch];
      return de === e || GEN[de] === e; };
    // VUOTO sulle linee Shi/Ying (Edu, 12/08/2026):
    //   - vuota in movimento -> non vuota (動不為空)
    //   - vuota + clash (dal giorno O dall'arrivo della mutante) + timely (旺/相) -> ATTIVA (risvegliata)
    //   - vuota + clash + untimely -> ELIMINATA
    //   - vuota senza clash -> DORMIENTE (non genera, non sostiene, non e' Soggetto pieno)
    //   - non vuota -> stato normale (la validita' resta quella del clash dell'arrivo)
    const statoLin = (B, elLin, isMoving) => {
      if (isMoving) return 'attiva';                 // 動不為空
      const st = stagione(elLin, monthEl);
      const timely = (st === '旺' || st === '相');
      if (vuoti.indexOf(B) < 0) {
        // linea PIENA + clash del GIORNO (Edu, 12/08/2026):
        //   timely -> il clash la fa MUOVERE (movimento oscuro): resta viva
        //   untimely -> 日破: la linea e' ROTTA, non puo' vincere/sostenere
        if (CLASH[dayBranch] === B) return timely ? 'mossa' : 'rotta';
        return 'piena';
      }
      const clash = (CLASH[dayBranch] === B) || (CLASH[ramoArr] === B);
      if (!clash) return 'dormiente';
      return timely ? 'attiva' : 'eliminata';
    };
    const shiMoving = (pal2.shi === linea), yingMoving = (pal2.ying === linea);
    const shiStato  = statoLin(shiB, shiElE, shiMoving);
    const yingStato = statoLin(yingB, yingElE, yingMoving);
    // "effettiva" = puo' agire (generare/sostenere/essere Soggetto pieno):
    //   linea vuota effettiva solo se piena, attiva o in movimento; dormiente/eliminata = no.
    //   per le linee piene resta il vecchio criterio (invalidata dal clash dell'arrivo).
    const shiEff  = shiMoving ? shiValido : (shiStato==='dormiente'||shiStato==='eliminata'||shiStato==='rotta') ? false : shiValido;
    const yingEff = yingMoving ? yingValido : (yingStato==='dormiente'||yingStato==='eliminata'||yingStato==='rotta') ? false : yingValido;
    // 伏神 (Edu, 12/08/2026): quando una delle cinque funzioni manca dall'esagramma,
    // si va all'esagramma PURO del palazzo e si vede in quale linea sta la funzione
    // mancante: quella si mette NASCOSTA dietro la stessa linea dell'esagramma di lavoro.
    const palElX = TRIGRAM[pal2.pal].el;
    const parDi = e => e===palElX ? 'B' : GEN[palElX]===e ? 'C' : CTRL[palElX]===e ? 'W'
      : CTRL[e]===palElX ? 'G' : 'P';
    const ramoPuro = p => p<=3 ? NAJIA_IN[pal2.pal][p-1] : NAJIA_OUT[pal2.pal][p-4];
    const presenti = {};
    for (let p=1;p<=6;p++) presenti[parDi(WX[ramoAl2(p)])] = true;
    const fushen = {};   // posizione -> {b, el, par} del nascosto
    for (let p=1;p<=6;p++) { const bP=ramoPuro(p), fP=parDi(WX[bP]);
      if (!presenti[fP]) fushen[p] = { b: bP, el: WX[bP], par: fP }; }
    const fuShi = fushen[pal2.shi] || null;
    liu = { shi: pal2.shi, ying: pal2.ying,
            palEl: TRIGRAM[pal2.pal].el,
            shiEl: WX[ramoAl2(pal2.shi)], yingEl: WX[ramoAl2(pal2.ying)], mutEl: WX[ramoAl2(linea)],
            depEl, arrEl, effEl, casoMut,
            shiB, yingB, shiElE, yingElE, shiValido, yingValido,
            shiStato, yingStato, shiEff, yingEff, shiMoving, yingMoving,
            fushen, fuShi,
            shiForte: fortLinea(shiElE), yingForte: fortLinea(yingElE) };
  }
  // ================= LIU YAO AUTONOMO (Edu, 11/08/2026) =================
  // Shi (世) = il Trend/Soggetto. Ying (應) e la linea mutante confermano o no.
  // Palazzi di Jing Fang generati dalla sequenza canonica (puro s6, 1a-5a gen s1-s5,
  // 游魂 s4, 歸魂 s3), rami via Na Jia. Verificato su Jin=游魂 di Qian, Shi 4a.
  //   LIUYAO=v1  verdetto dalla sola relazione Ying->Shi (mappa PB); 比和 = NO TRADE
  //   LIUYAO=v2  verdetto dalla sola linea mutante->Shi; 比和 = NO TRADE
  //   LIUYAO=v3  base da Ying; la mutante che controlla Shi ribalta segue->non segue
  //   LIUYAO=v4  base da Ying; la mutante DEVE confermare (stessa direzione), se no NO TRADE
  if (process.env.LIUYAO) {
    const yangLine = (n,p) => ((((n-1) >> (3-p)) & 1) === 0);
    const bitsOf = (i8,s8) => { let s=''; for(let p=1;p<=3;p++) s+=(yangLine(i8,p)?'1':'0');
                               for(let p=1;p<=3;p++) s+=(yangLine(s8,p)?'1':'0'); return s; };
    if (!global.__PAL) {
      global.__PAL = {};
      const numFromBits = tb => { for(let n=1;n<=8;n++){ let ok=true;
          for(let p=1;p<=3;p++) if ((yangLine(n,p)?'1':'0')!==tb[p-1]) ok=false; if(ok) return n; } };
      for (let P=1;P<=8;P++){
        const pure = bitsOf(P,P).split('');
        const seq = [];
        seq.push({fl:[],shi:6}); seq.push({fl:[1],shi:1}); seq.push({fl:[1,2],shi:2});
        seq.push({fl:[1,2,3],shi:3}); seq.push({fl:[1,2,3,4],shi:4}); seq.push({fl:[1,2,3,4,5],shi:5});
        seq.push({fl:[1,2,3,5],shi:4}); seq.push({fl:[5],shi:3});
        for (const g of seq){
          const b = pure.slice(); g.fl.forEach(L => b[L-1] = b[L-1]==='1'?'0':'1');
          global.__PAL[b.join('')] = { shi: g.shi, ying: g.shi>3 ? g.shi-3 : g.shi+3 };
        }
      }
    }
    const key = bitsOf(inf, sup);
    const pal = global.__PAL[key];
    const ramoAl = p => p<=3 ? NAJIA_IN[inf][p-1] : NAJIA_OUT[sup][p-4];
    const shiEl = WX[ramoAl(pal.shi)], yingEl = WX[ramoAl(pal.ying)], mutEl = WX[ramoAl(linea)];
    const verd = (ti, yo) => yo===ti ? null
      : GEN[yo]===ti ? true : CTRL[ti]===yo ? true
      : GEN[ti]===yo ? false : false;
    const LV = process.env.LIUYAO;
    let v = null;
    if (LV==='v1') v = verd(shiEl, yingEl);
    else if (LV==='v2') v = verd(shiEl, mutEl);
    else if (LV==='v3') { v = verd(shiEl, yingEl); if (v===true && CTRL[mutEl]===shiEl) v = false; }
    else if (LV==='v4') { const a2=verd(shiEl,yingEl), b2=verd(shiEl,mutEl); v = (a2!==null && a2===b2) ? a2 : null; }
    base = v; finale = v;
  }
  return { via, base, soccorso, trendVuoto, vuotoPareggio, sopraffTrasf, drenaggio, finale, spazzato, rafforzato,
           corpo, uso, trasf, yong, sup, inf, linea, liu, palazzo, palazzoYong, bloccato, autopen, ponteYong, scarico, ponteRel, ramiPonte, protetto, ramiProt, yongDebole, sostegni, dettForze, oraVuota, vuoti, att, dif, dettAtt, dettDif, dettPonte, dettVuoti, dettComb, eccitato, statoTrend, monthEl, oraBranch };
}

const hist = JSON.parse(fs.readFileSync('full1h.json','utf8'));

if (process.env.CARTA) {
  const [cr, dt] = process.env.CARTA.split(' ');
  const bs = hist.crosses[cr].filter(x => x.t.slice(0,10) === dt);
  const o = bs.find(x=>x.t.slice(11,13)==='00').o, c = bs.find(x=>x.t.slice(11,13)==='21').c;
  const p = dt.split('-').map(Number);
  const ch = DLR.buildChartFromForexSeed(process.env.MEZZOGIORNO ? Date.UTC(p[0],p[1]-1,p[2],12,0,0) : mezzanotteTST(p[0],p[1],p[2]), 0, '子');
  const yb = yearBranchAt(p[0],p[1],p[2]);
  const seed = parseInt(f3(o),10);
  const r = leggi(seed, ch.dayBranch, ch.monthBranch, yb, ch.dayStem);
  const f = pipFactor(cr);
  console.log(cr+' — '+dt);
  console.log('seme '+seed+'   Bazi: anno '+yb+' · mese '+ch.monthBranch+' ('+r.monthEl+') · giorno '+ch.dayStem+ch.dayBranch);
  console.log('superiore '+r.sup+' → '+TRIGRAM[r.sup].name+'   inferiore '+r.inf+' → '+TRIGRAM[r.inf].name+'   linea mutante '+r.linea);
  console.log('Trend = '+r.corpo.name+' ('+r.corpo.el+')   Yong = '+r.uso.name+' ('+r.uso.el+')   Yong trasformato = '+r.trasf.name+' ('+r.trasf.el+')   letto: '+(process.env.YONG==='trasformato'?'trasformato':'originale'));
  console.log('relazione '+r.via+' → lettura di base: '+(r.base?'PROSEGUE':'INVERTE'));
  console.log('ora dal seme: '+r.oraBranch+'   palazzo del Trend: '+r.palazzo.join(''));
  console.log('attaccanti: '+(r.dettAtt.length?r.dettAtt.join(' · '):'nessuno')+'   totale '+r.att);
  console.log('rami vuoti che non colpiscono: '+(r.dettVuoti.length?r.dettVuoti.join(' · '):'nessuno'));
  console.log('forze della data: '+(r.dettForze.length?r.dettForze.join(' · '):'nessun clash fra i rami'));
  console.log('sostegno del Yong: '+(r.sostegni.length?r.sostegni.map(x=>x.b+(x.forza<1?'(metà)':'')).join(''):'nessuno')+(r.yongDebole?'  → controllo senza appoggio, il Trend segue':''));
  console.log('combinazione col palazzo del Trend: '+(r.ramiProt.length?r.ramiProt.map(x=>x.b).join(''):'nessuna')+(r.protetto?'  → il Trend e protetto':''));
  console.log('ponte sulla relazione: '+(r.ramiPonte.length?r.ramiPonte.map(x=>x.b).join(''):'nessuno')+(r.ponteRel?'  → il controllo non arriva':''));
  console.log('ponti:      '+(r.dettPonte.length?r.dettPonte.join(' · '):'nessuno'));
  console.log('difensori:  '+(r.dettDif.length?r.dettDif.join(' · '):'nessuno')+'   totale '+r.dif);
  console.log('combinazioni: '+(r.dettComb.length?r.dettComb.join(' · '):'nessuna'));
  console.log('stato del Trend in stagione: '+r.statoTrend+(r.eccitato?'  → forte, il clash ECCITA non spazza':''));
  console.log('vuoti del giorno: '+r.vuoti.join('')+'   ora vuota: '+(r.oraVuota?'SÌ':'no')+'   autopenalità sul palazzo: '+(r.autopen?'SÌ':'no'));
  console.log('palazzo del Yong: '+r.palazzoYong.join('')+'   combinazione dei palazzi: '+(r.bloccato?'SÌ, Trend bloccato':'no'));
  console.log('Trend spazzato via: '+(r.spazzato?'SÌ':'no'));
  console.log('verdetto finale: '+(r.finale?'PROSEGUE':'INVERTE'));
  const byD={}; hist.crosses[cr].forEach(x=>{const dd=x.t.slice(0,10),hh=x.t.slice(11,13);
    byD[dd]=byD[dd]||{}; if(hh==='00')byD[dd].o=x.o; if(hh==='21')byD[dd].c=x.c;});
  const gg=Object.keys(byD).sort().filter(x=>byD[x].o!=null&&byD[x].c!=null);
  const ki=gg.indexOf(dt); const cls=[]; for(let j=0;j<ki;j++) cls.push(byD[gg[j]].c);
  const em=T.emaTrend(cls);
  const sig = em.direction==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
  console.log('EMA '+em.direction+'   segnale '+sig+'   movimento '+((c-o)*f).toFixed(0)+' pip');
  console.log('pnl: '+(sig==='LONG'?(c-o)*f:-(c-o)*f).toFixed(0)+' pip');
  process.exit(0);
}

const FROM = process.env.FROM || '2020-01-01', TO = process.env.TO || '2026-12-31';
const rows = [];
const skipInfo = { n:0, w:0, l:0, pnl:0 };
const vetoInfo = { n:0, w:0, l:0, pnl:0 };
// EMA a periodo variabile per lo sweep (EMAPER). Finestra e cambi scalati col periodo.
function emaTrendVar(closes, period){
  if(!closes || closes.length < period) return { direction:null, consolidated:false };
  var k=2/(period+1), prev=null, ser=[];
  for(var i=0;i<closes.length;i++){
    if(i<period-1) continue;
    if(i===period-1){var sum=0;for(var j=0;j<period;j++)sum+=closes[j];prev=sum/period;ser.push(prev);continue;}
    prev=closes[i]*k+prev*(1-k); ser.push(prev);
  }
  var dirs=[]; for(var a=1;a<ser.length;a++) dirs.push(ser[a]>ser[a-1]?'u':(ser[a]<ser[a-1]?'d':'f'));
  if(!dirs.length) return { direction:null, consolidated:false };
  var WIN=Math.max(6, Math.round(period*1.25));
  var win=dirs.slice(-WIN), lastd=win[win.length-1];
  var ch=0, pr=null; for(var b=0;b<win.length;b++){var x=win[b];if(x==='f')continue;if(pr!==null&&x!==pr)ch++;pr=x;}
  return { direction: lastd==='u'?'up':(lastd==='d'?'down':'flat'), consolidated: ch<=2 };
}

Object.keys(hist.crosses).forEach(cross => {
  const by = {};
  hist.crosses[cross].forEach(x => { const d=x.t.slice(0,10), hh=x.t.slice(11,13);
    by[d]=by[d]||{}; if(hh==='00') by[d].o=x.o; if(hh==='21') by[d].c=x.c; });
  const days = Object.keys(by).sort().filter(d => by[d].o!=null && by[d].c!=null);
  const f = pipFactor(cross);
  for (let k=12;k<days.length;k++){
    const d=days[k]; if(d<FROM||d>TO) continue;
    const closes=[]; for(let j=0;j<k;j++) closes.push(by[days[j]].c);
    const ema=process.env.EMAPER ? emaTrendVar(closes, parseInt(process.env.EMAPER,10)) : T.emaTrend(closes);
    const runLen = ema.runLen || 0;
    if(!ema.direction||ema.direction==='flat'||!ema.consolidated) continue;
    const o=by[d].o, c=by[d].c;
    const e=seedEdge(o); if(e!=null&&e<3) continue;
    const move=(c-o)*f; if(Math.abs(move)<=10) continue;
    const seed=parseInt(f3(o),10);
    const p=d.split('-').map(Number);
    const ch=DLR.buildChartFromForexSeed(process.env.MEZZOGIORNO ? Date.UTC(p[0],p[1]-1,p[2],12,0,0) : mezzanotteTST(p[0],p[1],p[2]),0,'子');
    if(!ch||ch.error) continue;
    const yb=yearBranchAt(p[0],p[1],p[2]);
    const r=leggi(seed, ch.dayBranch, ch.monthBranch, yb, ch.dayStem, runLen);
    // ASTENSIONE SUI CLASH VALIDI (Edu, 10/08/2026): il clash e' effettivo solo fra
    // ramo del giorno<->ramo del mese, ramo del giorno<->ramo dell'anno, e stelo del
    // giorno<->stelo del mese (甲庚 乙辛 丙壬 丁癸).
    //   SKIPCLASH=tombe|rami|steli|tutti
    if (process.env.SKIPCLASH) {
      const SC = process.env.SKIPCLASH;
      const cGM = CLASH[ch.dayBranch] === ch.monthBranch;
      const cGA = CLASH[ch.dayBranch] === yb;
      const isTombe = (a,b2) => WX[a]==='Earth' && WX[b2]==='Earth';
      const tombeValide = (cGM && isTombe(ch.dayBranch, ch.monthBranch)) || (cGA && isTombe(ch.dayBranch, yb));
      const ys = yearStemAt(p[0],p[1],p[2]);
      const ms = monthStemFrom(ys, ch.monthBranch);
      const cSteli = STEMCLASH[ch.dayStem] === ms;
      const salta = SC==='tombe' ? tombeValide
                  : SC==='rami'  ? (cGM || cGA)
                  : SC==='gm'    ? cGM
                  : SC==='gmnontombe' ? (cGM && !isTombe(ch.dayBranch, ch.monthBranch))
                  : SC==='steli' ? cSteli
                  : SC==='tutti' ? (cGM || cGA || cSteli)
                  : false;
      if (salta && r.base !== null) {
        const pnlS = (ema.direction==='up'?(r.finale?'LONG':'SHORT'):(r.finale?'SHORT':'LONG'))==='LONG'?move:-move;
        skipInfo.n++; skipInfo.pnl += pnlS; if (pnlS>0) skipInfo.w++; else if (pnlS<0) skipInfo.l++;
        continue;
      }
    }
    if (r.base === null) continue;   // 比和 = NO TRADE
    // VETO ANTI-LONG DAL LIU YAO (Edu, 11/08/2026 — primo abbinamento PB+LY):
    // il PB decide come sempre; se il segnale risultante e' LONG e il Liu Yao mostra
    // un Brother sostenuto al Soggetto (Shi=Brother valido, Ying valido e FORTE che
    // lo genera), si sta fuori.
    //   LYVETO=up   veto solo sui LONG da trend su (segue col trend in salita) — la cella validata
    //   LYVETO=all  veto su tutti i segnali LONG (anche i contrarian da trend giu)
    //   LYVETO=mut  come up, ma serve anche la mutante favorevole (cella stretta)
    if (process.env.LYVETO && r.liu) {
      const L = r.liu;
      const broSost = L.shiValido && L.yingValido && L.shiElE === L.palEl &&
                      GEN[L.yingElE] === L.shiElE && L.yingForte;
      const favMut = L.effEl != null && (GEN[L.effEl] === L.shiElE || L.effEl === L.shiElE);
      const sig = ema.direction==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
      const M = process.env.LYVETO;
      const veto = broSost && sig === 'LONG' && (
          M === 'up'  ? ema.direction === 'up'
        : M === 'all' ? true
        : M === 'mut' ? (ema.direction === 'up' && favMut)
        : false);
      if (veto) {
        const pnlV = move;   // LONG evitato: pnl che avremmo avuto
        vetoInfo.n++; vetoInfo.pnl += pnlV; if (pnlV>0) vetoInfo.w++; else if (pnlV<0) vetoInfo.l++;
        continue;
      }
    }
    rows.push({cross,date:d,move,emaDir:ema.direction,via:r.via,linea:r.linea,sup:r.sup,inf:r.inf,
               liu:r.liu,
               yearBranchUsed:yb, dayStemUsed:ch.dayStem,
               base:r.base, finale:r.finale, soccorso:r.soccorso, emaRun:runLen, trendVuoto:r.trendVuoto, oraBranch:r.oraBranch, vuoti:r.vuoti, dayBranchUsed:ch.dayBranch, monthBranchUsed:ch.monthBranch, spazzato:r.spazzato, bloccato:r.bloccato, autopen:r.autopen, ponteYong:r.ponteYong, scarico:r.scarico, ponteRel:r.ponteRel, protetto:r.protetto, yongDebole:r.yongDebole,
               pnlBase: (ema.direction==='up'?(r.base?'LONG':'SHORT'):(r.base?'SHORT':'LONG'))==='LONG'?move:-move,
               pnl:     (ema.direction==='up'?(r.finale?'LONG':'SHORT'):(r.finale?'SHORT':'LONG'))==='LONG'?move:-move});
  }
});
function stat(sel, campo){
  campo = campo || 'pnl';
  const w=sel.filter(r=>r[campo]>0).length, l=sel.filter(r=>r[campo]<0).length, n=w+l; if(!n) return null;
  const ew=sel.filter(r=>(r.emaDir==='up'?r.move:-r.move)>0).length;
  const el=sel.filter(r=>(r.emaDir==='up'?r.move:-r.move)<0).length;
  const pE=ew/(ew+el), key = campo==='pnl'?'finale':'base';
  const sh=sel.filter(r=>!r[key]).length/sel.length;
  const exp=pE*(1-sh)+(1-pE)*sh, act=w/n, se=Math.sqrt(exp*(1-exp)/n);
  const pips=sel.reduce((s,r)=>s+r[campo],0);
  return {n,act,exp,z:(act-exp)/se,pips,ppt:pips/n};
}
function riga(lab,s){ if(!s) return;
  console.log(lab.padEnd(30)+String(s.n).padStart(6)+(100*s.act).toFixed(2).padStart(8)+'%'+
    (100*(s.act-s.exp)).toFixed(2).padStart(8)+' pp'+s.z.toFixed(2).padStart(7)+
    s.pips.toFixed(0).padStart(9)+s.ppt.toFixed(2).padStart(8)); }

console.log('periodo '+FROM+' → '+TO+'   moltiplicatore Tai Sui '+TAISUI+
            '   scala '+(process.env.SCALA==='stadi'?'cinque stadi':'piatta'));
console.log('carte: '+rows.length);
const tocc = rows.filter(r=>r.spazzato);
console.log('carte in cui il Trend è spazzato via: '+tocc.length+
            '   ('+(100*tocc.length/rows.length).toFixed(1)+'%)');
console.log();
console.log('                              trade    win%   scarto      z      pip  pip/tr');
riga('lettura di base', stat(rows,'pnlBase'));
riga('con clash del palazzo', stat(rows,'pnl'));
console.log('selettore del ramo del Yong: '+(process.env.SEL||'natura')+
  '   regole Yong attive: '+[process.env.NOPARITA?null:'parita',process.env.NOPONTEREL?null:'ponte-rel',process.env.NOSOSTEGNO?null:'sostegno',process.env.NOFORZE?null:'forze'].filter(Boolean).join(' ')||'nessuna');
{ const pv=rows.filter(r=>r.ponteYong), pa=rows.filter(r=>/比和/.test(r.via));
  const sc=(s)=>s.length?s.filter(r=>r.pnl>0).length+' giuste / '+s.filter(r=>r.pnl<0).length+' sbagliate, '+s.reduce((a,r)=>a+r.pnl,0).toFixed(0)+' pip':'nessuna carta';
  console.log('  ponte del palazzo del Yong: '+sc(pv));
  console.log('  parita (carte 比和 riaperte): '+sc(pa));
  const sk=rows.filter(r=>r.scarico), pr=rows.filter(r=>r.ponteRel);
  console.log('  ponte sulla relazione: '+sc(pr));
  const pt=rows.filter(r=>r.protetto), yd=rows.filter(r=>r.yongDebole);
  console.log('  combinazione col palazzo del Trend: '+sc(pt));
  console.log('  sostegno del Yong indebolito: '+sc(yd));
  console.log('  scarico del Yong nel proprio palazzo: '+sc(sk)); }
console.log();
const migl = tocc.filter(r=>r.pnl>0&&r.pnlBase<0), peg = tocc.filter(r=>r.pnl<0&&r.pnlBase>0);
console.log('sulle sole carte toccate: '+migl.length+' raddrizzate ('+
            migl.reduce((s,r)=>s+r.pnl,0).toFixed(0)+' pip) · '+peg.length+' guastate ('+
            peg.reduce((s,r)=>s+r.pnl,0).toFixed(0)+' pip)');
console.log('effetto netto della regola: '+
            (rows.reduce((s,r)=>s+r.pnl,0)-rows.reduce((s,r)=>s+r.pnlBase,0)).toFixed(0)+' pip');
console.log();
console.log('per relazione — base → con la regola');
['生我','我剋','我生','剋我','比和·生我','比和·我剋','比和·我生','比和·剋我'].forEach(v=>{
  const s=rows.filter(r=>r.via===v); if(!s.length) return;
  const a=stat(s,'pnlBase'), b=stat(s,'pnl');
  const t=s.filter(r=>r.spazzato).length;
  console.log('  '+v.padEnd(12)+String(s.length).padStart(5)+' carte  toccate '+String(t).padStart(4)+
    '   '+(100*a.act).toFixed(2)+'% '+a.pips.toFixed(0).padStart(7)+
    '  →  '+(100*b.act).toFixed(2)+'% '+b.pips.toFixed(0).padStart(7));
});
require('fs').writeFileSync('/tmp/research_rows.json', JSON.stringify(rows.map(r=>({c:r.cross,d:r.date,finale:r.finale,via:r.via}))));
if (process.env.CLASHREPORT) {
  // spaccato per tipo di clash valido (perno = giorno)
  const gruppi = {
    'giorno↔mese':      r => CLASH[r.dayBranchUsed] === r.monthBranchUsed,
    'giorno↔anno':      r => CLASH[r.dayBranchUsed] === r.yearBranchUsed,
    'g↔m di tombe':     r => CLASH[r.dayBranchUsed] === r.monthBranchUsed && WX[r.dayBranchUsed]==='Earth' && WX[r.monthBranchUsed]==='Earth',
    'g↔a di tombe':     r => CLASH[r.dayBranchUsed] === r.yearBranchUsed && WX[r.dayBranchUsed]==='Earth' && WX[r.yearBranchUsed]==='Earth',
    'g↔m NON tombe':    r => CLASH[r.dayBranchUsed] === r.monthBranchUsed && !(WX[r.dayBranchUsed]==='Earth' && WX[r.monthBranchUsed]==='Earth'),
    'g↔a NON tombe':    r => CLASH[r.dayBranchUsed] === r.yearBranchUsed && !(WX[r.dayBranchUsed]==='Earth' && WX[r.yearBranchUsed]==='Earth'),
    'steli g↔m':        r => { const p=r.date.split('-').map(Number); const ys=yearStemAt(p[0],p[1],p[2]); return STEMCLASH[r.dayStemUsed]===monthStemFrom(ys, r.monthBranchUsed); },
    'nessun clash valido': r => CLASH[r.dayBranchUsed]!==r.monthBranchUsed && CLASH[r.dayBranchUsed]!==r.yearBranchUsed,
  };
  console.log('\n=== SPACCATO PER TIPO DI CLASH (perno: giorno) ===');
  console.log('gruppo                 carte   win%     z      pip    pip/carta');
  for (const nome in gruppi) {
    const sel = rows.filter(gruppi[nome]);
    const s = stat(sel);
    if (!s) { console.log(nome.padEnd(22)+' 0'); continue; }
    console.log(nome.padEnd(22)+String(sel.length).padStart(6)+'  '+(100*s.act).toFixed(2)+'%  '+s.z.toFixed(2).padStart(6)+'  '+s.pips.toFixed(0).padStart(7)+'  '+(s.pips/sel.length).toFixed(2).padStart(7));
  }
}
if (process.env.LIUREP) {
  // TEST (Edu, 11/08/2026): Shi = Brother (ramo dello Shi = elemento del palazzo),
  // EMA giu', Ying genera lo Shi. Quanto rende SEGUIRE il trend (SHORT) in quei giorni?
  // LFROM/LTO: restringono il periodo del referto (spacco recente/vecchio).
  const inPer = r => (!process.env.LFROM || r.date >= process.env.LFROM) && (!process.env.LTO || r.date <= process.env.LTO);
  const seg = sel => {
    const n = sel.length; if (!n) return null;
    const w = sel.filter(r => r.move < 0).length;   // EMA giu': seguire = SHORT, vince se il mercato scende
    const pip = sel.reduce((a,r)=>a + (-r.move), 0);
    const z = (w/n - 0.5) / Math.sqrt(0.25/n);
    return { n, w, pct: 100*w/n, z, pip };
  };
  const broDown = rows.filter(r => inPer(r) && r.liu && r.emaDir==='down' && r.liu.shiValido && r.liu.yingValido
    && r.liu.shiElE===r.liu.palEl && GEN[r.liu.yingElE]===r.liu.shiElE && r.liu.yingForte);
  const broUp   = rows.filter(r => inPer(r) && r.liu && r.emaDir==='up' && r.liu.shiValido && r.liu.yingValido
    && r.liu.shiElE===r.liu.palEl && GEN[r.liu.yingElE]===r.liu.shiElE && r.liu.yingForte);
  // raffinamento con la semantica COMPLETA della mutante (Edu, 11/08/2026):
  // l'elemento efficace effEl (partenza rafforzata nei casi 1/5, arrivo nei casi 2/4,
  // nullo nel caso 3) favorisce lo Shi se lo genera o e' suo fratello
  const favor = r => r.liu.effEl != null && (GEN[r.liu.effEl]===r.liu.shiElE || r.liu.effEl===r.liu.shiElE);
  const broDownMut = broDown.filter(favor);
  const broUpMut   = broUp.filter(favor);
  const broDownAll = rows.filter(r => inPer(r) && r.liu && r.emaDir==='down' && r.liu.shiEl===r.liu.palEl);
  const allDown = rows.filter(r => inPer(r) && r.liu && r.emaDir==='down');
  const stampa = (nome, s) => console.log(nome.padEnd(46) + (s ? ('n '+String(s.n).padStart(5)+'   segue vince '+s.pct.toFixed(2)+'%   z '+s.z.toFixed(2)+'   pip(SHORT) '+s.pip.toFixed(0)) : 'nessuna'));
  console.log('\n=== LIU YAO: Shi=Brother · EMA giu · Ying genera Shi (quanto rende SEGUIRE) ===');
  stampa('B + trend giu + Ying genera Shi:', seg(broDown));
  stampa('  ... e ANCHE la mutante favorisce B:', seg(broDownMut));
  stampa('B + trend giu (tutti):', seg(broDownAll));
  stampa('tutti i trend giu (riferimento):', seg(allDown));
  const segUp = sel => { const n=sel.length; if(!n) return null;
    const w = sel.filter(r=>r.move>0).length; const pip = sel.reduce((a,r)=>a+r.move,0);
    return { n, w, pct:100*w/n, z:(w/n-0.5)/Math.sqrt(0.25/n), pip }; };
  const su = segUp(broUp);
  console.log('confronto speculare — B + trend SU + Ying genera Shi:' + (su ? ('  n '+su.n+'   segue vince '+su.pct.toFixed(2)+'%   z '+su.z.toFixed(2)+'   pip(LONG) '+su.pip.toFixed(0)) : ' nessuna'));
  const suM = segUp(broUpMut);
  console.log('  ... e ANCHE la mutante favorisce B:' + (suM ? ('           n '+suM.n+'   segue vince '+suM.pct.toFixed(2)+'%   z '+suM.z.toFixed(2)+'   pip(LONG) '+suM.pip.toFixed(0)) : ' nessuna'));
}
if (process.env.LYLARGO) {
  // Officer al Soggetto, basi larghe, spacco per mutante (Edu, 12/08/2026):
  //   base A = Shi=Officer valido + Ying valido che GENERA lo Shi (161, senza forza)
  //   base B = Shi=Officer valido (886, senza condizioni sull'Ying)
  // spacco: mutante favorevole allo Shi / sfavorevole (effEl controlla lo Shi) / neutra o nulla
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const baseA = rows.filter(r => { const L=r.liu; return L && L.shiValido && L.yingValido &&
    isOff(L) && GEN[L.yingElE]===L.shiElE; });
  const baseB = rows.filter(r => { const L=r.liu; return L && L.shiValido && isOff(L); });
  const fav = r => r.liu.effEl != null && (GEN[r.liu.effEl]===r.liu.shiElE || r.liu.effEl===r.liu.shiElE);
  const sfa = r => r.liu.effEl != null && CTRL[r.liu.effEl]===r.liu.shiElE;
  const quota = (sel, test) => { const n=sel.length; if(!n) return null;
    const w=sel.filter(test).length; return {n,w,pct:100*w/n,z:(w/n-0.5)/Math.sqrt(0.25/n)}; };
  const seguiTrend = r => (r.emaDir==='up' ? r.move>0 : r.move<0);
  const scende = r => r.move<0;
  const pb = sel => { const t=sel.filter(r=>r.finale!==null);
    const w=t.filter(r=>r.pnl>0).length, l2=t.filter(r=>r.pnl<0).length;
    return (w+l2) ? {n:t.length, pct:100*w/(w+l2), pip:t.reduce((a,r)=>a+r.pnl,0)} : null; };
  const st = (nome, sel) => { const a=quota(sel,seguiTrend), b=quota(sel,scende), c=pb(sel);
    console.log(nome.padEnd(34)+'n '+String(sel.length).padStart(4)+
      '   segue EMA '+(a?a.pct.toFixed(1):'-')+'%'+
      '   scende '+(b?b.pct.toFixed(1):'-')+'%'+
      '   PB '+(c?c.pct.toFixed(1)+'% ('+c.pip.toFixed(0)+' pip)':'-')); };
  const rec = sel => sel.filter(r=>r.date>='2023-05-01'), vec = sel => sel.filter(r=>r.date<'2023-05-01');
  const blocco = (nome, base) => {
    console.log('\n--- '+nome+' ---');
    st('tutte', base); st('  recente', rec(base)); st('  vecchio', vec(base));
    const f=base.filter(fav), s=base.filter(sfa), nn=base.filter(r=>!fav(r)&&!sfa(r));
    st('mutante FAVOREVOLE', f); st('  recente', rec(f)); st('  vecchio', vec(f));
    st('mutante SFAVOREVOLE', s); st('  recente', rec(s)); st('  vecchio', vec(s));
    st('mutante neutra/nulla', nn); st('  recente', rec(nn)); st('  vecchio', vec(nn));
  };
  console.log('\n=== OFFICER AL SOGGETTO — BASI LARGHE, SPACCO PER MUTANTE ===');
  blocco('base A: Ying valido che genera lo Shi (senza forza)', baseA);
  blocco('base B: solo Shi=Officer valido', baseB);
}
if (process.env.LYCONTA) {
  // imbuto: quante carte hanno l'Officer al Soggetto, e quante restano a ogni condizione
  const off = rows.filter(r => r.liu && CTRL[r.liu.shiElE]===r.liu.palEl);
  const v1 = off.filter(r => r.liu.shiValido);
  const v2 = v1.filter(r => r.liu.yingValido);
  const v3 = v2.filter(r => GEN[r.liu.yingElE]===r.liu.shiElE);
  const v4 = v3.filter(r => r.liu.yingForte);
  console.log('\n=== IMBUTO OFFICER AL SOGGETTO ===');
  console.log('Shi = Officer (tutte):                        '+off.length);
  console.log('  ... e Shi valido (non clashato):            '+v1.length);
  console.log('  ... e Ying valido:                          '+v2.length);
  console.log('  ... e Ying che GENERA lo Shi:               '+v3.length);
  console.log('  ... e Ying FORTE (= cella "sostenuto"):     '+v4.length);
}
if (process.env.LYIPOTESI) {
  // Due ipotesi alternative sull'Officer sostenuto (Edu, 12/08/2026):
  //  1. G = il trend, qualunque esso sia -> nei giorni-cella il mercato SEGUE l'EMA
  //  2. G = ribasso (Officer drena la Wealth) -> nei giorni-cella il mercato SCENDE
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const cellaTutti = rows.filter(r => { const L=r.liu; return L && L.shiValido && L.yingValido &&
    isOff(L) && GEN[L.yingElE]===L.shiElE && L.yingForte; });
  const rif = rows;   // riferimento: tutte le carte
  const quota = (sel, test) => { const n=sel.length; if(!n) return null;
    const w=sel.filter(test).length; return {n,w,pct:100*w/n,z:(w/n-0.5)/Math.sqrt(0.25/n)}; };
  const seguiTrend = r => (r.emaDir==='up' ? r.move>0 : r.move<0);
  const scende = r => r.move<0;
  const st = (nome, sel) => {
    const a=quota(sel,seguiTrend), b=quota(sel,scende);
    console.log(nome.padEnd(30)+'n '+String(sel.length).padStart(5)+
      '   segue EMA '+(a?a.pct.toFixed(1):'-')+'% (z '+(a?a.z.toFixed(2):'-')+')'+
      '   mercato scende '+(b?b.pct.toFixed(1):'-')+'% (z '+(b?b.z.toFixed(2):'-')+')');
  };
  const rec = sel => sel.filter(r=>r.date>='2023-05-01'), vec = sel => sel.filter(r=>r.date<'2023-05-01');
  console.log('\n=== OFFICER SOSTENUTO: ipotesi 1 (segue il trend EMA) e 2 (ribasso) ===');
  st('cella — TOTALE', cellaTutti);
  st('cella — recente', rec(cellaTutti));
  st('cella — vecchio', vec(cellaTutti));
  // raffinamento con la mutante (come per il Brother): l'elemento efficace
  // favorisce lo Shi se lo genera o e' suo fratello
  const favor = r => r.liu.effEl != null && (GEN[r.liu.effEl]===r.liu.shiElE || r.liu.effEl===r.liu.shiElE);
  const celM = cellaTutti.filter(favor);
  st('cella + mutante favorevole', celM);
  st('  recente', rec(celM));
  st('  vecchio', vec(celM));
  const upM = celM.filter(r=>r.emaDir==='up'), dnM = celM.filter(r=>r.emaDir==='down');
  st('  ... trend SU', upM); st('      recente', rec(upM)); st('      vecchio', vec(upM));
  st('  ... trend GIU', dnM); st('      recente', rec(dnM)); st('      vecchio', vec(dnM));
  // e il PB dentro la cella raffinata
  const pbrep = (nome, sel) => { const t=sel.filter(r=>r.finale!==null);
    const w=t.filter(r=>r.pnl>0).length, l2=t.filter(r=>r.pnl<0).length;
    console.log(nome.padEnd(30)+'n '+String(t.length).padStart(4)+
      (w+l2?('   PB vince '+(100*w/(w+l2)).toFixed(1)+'%   pip '+t.reduce((a,r)=>a+r.pnl,0).toFixed(0)):'')); };
  pbrep('PB nella cella + mutante:', celM);
  pbrep('  recente', rec(celM));
  pbrep('  vecchio', vec(celM));
  st('riferimento (tutte) TOTALE', rif);
  st('riferimento recente', rec(rif));
  st('riferimento vecchio', vec(rif));
  const up = cellaTutti.filter(r=>r.emaDir==='up'), dn = cellaTutti.filter(r=>r.emaDir==='down');
  console.log('  spacco per trend:');
  st('  trend SU', up); st('    recente', rec(up)); st('    vecchio', vec(up));
  st('  trend GIU', dn); st('    recente', rec(dn)); st('    vecchio', vec(dn));
}
if (process.env.LYCELLA) {
  // CELLE SORELLE (Edu, 12/08/2026): stessa struttura della cella Brother-sostenuto,
  // ma con lo Shi di un altro parente. LYCELLA=bro|off|wea|chi|par
  //   bro: Shi = elemento del palazzo (兄弟)
  //   off: Shi controlla il palazzo (官鬼)
  //   wea: il palazzo controlla lo Shi (妻財)
  //   chi: il palazzo genera lo Shi (子孫)
  //   par: lo Shi genera il palazzo (父母)
  // Cella: Shi=parente, Shi valido, Ying valido e FORTE che genera lo Shi, EMA su.
  // NB (12/08 tardo): usa shiEff/yingEff (post correzione vuoto/rotta), come nel
  // ricalcolo LYRICALC — coerente coi numeri definitivi Brother 94 / Officer 71.
  const P = process.env.LYCELLA;
  const isPar = L =>
      P==='bro' ? L.shiElE===L.palEl
    : P==='off' ? CTRL[L.shiElE]===L.palEl
    : P==='wea' ? CTRL[L.palEl]===L.shiElE
    : P==='chi' ? GEN[L.palEl]===L.shiElE
    : P==='par' ? GEN[L.shiElE]===L.palEl
    : false;
  const cella = dir => rows.filter(r => { const L=r.liu; return L && r.emaDir===dir &&
    L.shiEff && L.yingEff && isPar(L) && GEN[L.yingElE]===L.shiElE && L.yingForte; });
  const referto = (nome, sel) => {
    const segC = sel.filter(r=>r.finale===true), nonC = sel.filter(r=>r.finale===false);
    const rid = (n2, s2) => { const w=s2.filter(r=>r.pnl>0).length, l2=s2.filter(r=>r.pnl<0).length;
      console.log('  '+n2.padEnd(30)+'n '+String(s2.length).padStart(4)+
        (w+l2?('   vinte '+w+' / perse '+l2+'   win '+(100*w/(w+l2)).toFixed(1)+'%   pip '+
        s2.reduce((a,r)=>a+r.pnl,0).toFixed(0)):'')); };
    const su = sel.filter(r=>r.move>0).length;
    console.log(nome+'  ('+sel.length+' carte; mercato SALITO in '+su+'/'+sel.length+
      ' = '+(sel.length?(100*su/sel.length).toFixed(1):'0')+'%)');
    rid('PB dice SEGUE:', segC);
    rid('PB dice NON SEGUE:', nonC);
    const tot = sel.filter(r=>r.finale!==null);
    rid('PB complessivo:', tot);
  };
  const spacco = (nome, sel) => {
    referto('\n['+P+'] '+nome+' — TOTALE', sel);
    referto('['+P+'] '+nome+' — recente (05/2023→)', sel.filter(r=>r.date>='2023-05-01'));
    referto('['+P+'] '+nome+' — vecchio (→04/2023)', sel.filter(r=>r.date<'2023-05-01'));
  };
  spacco('Shi sostenuto + trend SU', cella('up'));
  spacco('Shi sostenuto + trend GIU', cella('down'));
}
if (process.env.LYATT) {
  // GENERALIZZAZIONE della cella "Officer + mutante sfavorevole" a qualunque parente
  // (Edu, 12/08/2026 sera). LYATT=bro|off|wea|chi|par
  // Cella: Shi=parente, Shi valido (shiEff, post vuoto/rotta), mutante sfavorevole
  // (l'elemento efficace della mutante CONTROLLA lo Shi). Nessuna condizione su Ying/trend.
  const P = process.env.LYATT;
  const isPar = L =>
      P==='bro' ? L.shiElE===L.palEl
    : P==='off' ? CTRL[L.shiElE]===L.palEl
    : P==='wea' ? CTRL[L.palEl]===L.shiElE
    : P==='chi' ? GEN[L.palEl]===L.shiElE
    : P==='par' ? GEN[L.shiElE]===L.palEl
    : false;
  const sfa = r => r.liu.effEl != null && CTRL[r.liu.effEl]===r.liu.shiElE;
  const cella = rows.filter(r => { const L=r.liu; return L && L.shiEff && isPar(L) && sfa(r); });
  const pb = sel => { const t=sel.filter(r=>r.finale!==null);
    const w=t.filter(r=>r.pnl>0).length, l2=t.filter(r=>r.pnl<0).length;
    return (w+l2)?{n:t.length,pct:100*w/(w+l2),pip:t.reduce((a,r)=>a+r.pnl,0)}:{n:0,pct:null,pip:0}; };
  const rec = sel=>sel.filter(r=>r.date>='2023-05-01'), vec = sel=>sel.filter(r=>r.date<'2023-05-01');
  const riga = (nome, sel) => { const a=pb(sel),b=pb(rec(sel)),c=pb(vec(sel));
    console.log(nome.padEnd(38)+'tot '+String(a.n).padStart(4)+' '+(a.pct!=null?a.pct.toFixed(1)+'%':'-').padStart(7)+
      '   rec '+String(b.n).padStart(3)+' '+(b.pct!=null?b.pct.toFixed(1)+'%':'-').padStart(7)+
      '   vec '+String(c.n).padStart(3)+' '+(c.pct!=null?c.pct.toFixed(1)+'%':'-').padStart(7)+
      '   pip '+(a.pip||0).toFixed(0)); };
  console.log('\n=== ['+P+'] mutante sfavorevole (shiEff, post vuoto/rotta) ===');
  riga('cella completa:', cella);
  riga('  ... solo NON SEGUE:', cella.filter(r=>r.finale===false));
  riga('  ... solo SEGUE:', cella.filter(r=>r.finale===true));
}
if (process.env.LYSPACCATO) {
  // nei giorni Brother-sostenuto + trend su: cosa fa gia' il PB da solo?
  const inPer2 = r => (!process.env.LFROM || r.date >= process.env.LFROM) && (!process.env.LTO || r.date <= process.env.LTO);
  const cel = rows.filter(r => { const L=r.liu; return inPer2(r) && L && r.emaDir==='up' && L.shiValido && L.yingValido &&
    L.shiElE===L.palEl && GEN[L.yingElE]===L.shiElE && L.yingForte; });
  const seg = cel.filter(r=>r.finale===true), non = cel.filter(r=>r.finale===false);
  const rid = (nome, s2) => { const w=s2.filter(r=>r.pnl>0).length, l2=s2.filter(r=>r.pnl<0).length;
    console.log(nome.padEnd(34)+'n '+String(s2.length).padStart(4)+'   vinte '+w+' / perse '+l2+
      (s2.length?('   win '+(100*w/Math.max(1,w+l2)).toFixed(1)+'%   pip '+s2.reduce((a,r)=>a+r.pnl,0).toFixed(0)):''));
  };
  console.log('\n=== giorni Brother-sostenuto + trend SU: il PB da solo ===');
  rid('PB dice SEGUE (LONG):', seg);
  rid('PB dice NON SEGUE (SHORT):', non);
  const mercatoGiu = cel.filter(r=>r.move<0).length;
  console.log('mercato sceso in '+mercatoGiu+'/'+cel.length+' giorni ('+(100*mercatoGiu/Math.max(1,cel.length)).toFixed(1)+'%)');
}
if (process.env.DUMP) {
  require('fs').writeFileSync(process.env.DUMP, JSON.stringify(rows.map(r=>({c:r.cross,d:r.date,move:r.move,emaDir:r.emaDir,via:r.via,linea:r.linea,sup:r.sup,inf:r.inf,base:r.base,finale:r.finale,emaRun:r.emaRun,trendVuoto:r.trendVuoto,via:r.via,oraBranch:r.oraBranch,vuoti:r.vuoti,dayBranch:r.dayBranchUsed,monthBranch:r.monthBranchUsed,ponteRel:r.ponteRel,ponteYong:r.ponteYong,scarico:r.scarico,protetto:r.protetto,yongDebole:r.yongDebole,p:r.pnl,b:r.pnlBase}))));
}
if (process.env.LISTA) {
  console.log('\npeggiori 15 carte dopo la regola');
  rows.slice().sort((a,b)=>a.pnl-b.pnl).slice(0,15).forEach(r=>
    console.log('  '+r.cross+' '+r.date+'  '+r.via+'  pnl '+r.pnl.toFixed(0)+
                (r.spazzato?'  (spazzato)':'')));
}

if (process.env.GUASTATE) {
  console.log('\npeggiori carte guastate dalla regola (base giusta → finale sbagliata)');
  rows.filter(r=>r.spazzato && r.pnlBase>0 && r.pnl<0)
      .sort((a,b)=>a.pnl-b.pnl).slice(0,10)
      .forEach(r=>console.log('  '+r.cross+' '+r.date+'  '+r.via+
        '   base +'+r.pnlBase.toFixed(0)+' → finale '+r.pnl.toFixed(0)));
}

if (process.env.GRUPPO) {
  const g = process.env.GRUPPO;
  const s = rows.filter(r=>r.via===g && r.spazzato && r.pnlBase>0 && r.pnl<0)
                .sort((a,b)=>a.pnl-b.pnl).slice(0,10);
  console.log('\npeggiori carte guastate nel gruppo '+g);
  s.forEach(r=>console.log('  '+r.date+' '+r.cross+'   base +'+r.pnlBase.toFixed(0)+' → finale '+r.pnl.toFixed(0)));
}

if (process.env.PERSE) {
  // carte che v5 (senza parità) raddrizzava e che ora tornano negative
  const fs2=require('fs');
  const prev = JSON.parse(fs2.readFileSync('/tmp/v5rows.json','utf8'));
  const m = {}; prev.forEach(r=>m[r.cross+'|'+r.date]=r);
  const persi = rows.filter(r=>{ const p=m[r.cross+'|'+r.date];
    return p && p.pnl>0 && r.pnl<0; }).sort((a,b)=>a.pnl-b.pnl).slice(0,10);
  console.log('\ncarte che la parità fa tornare negative');
  persi.forEach(r=>console.log('  '+r.date+' '+r.cross+'  '+r.via+'   ora '+r.pnl.toFixed(0)+' pip'));
}

if (process.env.PEGGIORI) {
if (skipInfo.n) console.log('\ncarte SALTATE per clash: '+skipInfo.n+'   (avrebbero dato: '+skipInfo.w+' giuste / '+skipInfo.l+' sbagliate · '+skipInfo.pnl.toFixed(0)+' pip)');
if (vetoInfo.n) console.log('\nLONG VETATI dal Liu Yao: '+vetoInfo.n+'   (avrebbero dato: '+vetoInfo.w+' vinti / '+vetoInfo.l+' persi · '+vetoInfo.pnl.toFixed(0)+' pip evitati se negativi)');
  console.log('\npeggiori 12 carte con la regola attiva');
  rows.slice().sort((a,b)=>a.pnl-b.pnl).slice(0,12).forEach(r=>
    console.log('  '+r.date+' '+r.cross+'  '+r.via+'  '+r.pnl.toFixed(0)+' pip'+(r.spazzato?'  (spazzato)':'')));
}

console.log('\ncarte bloccate dalla combinazione dei palazzi: '+rows.filter(r=>r.bloccato).length);
{
  const b=rows.filter(r=>r.bloccato && r.base===true);
  const g=b.filter(r=>r.pnl>0).length, m=b.filter(r=>r.pnl<0).length;
  console.log('  di cui '+b.length+' con verdetto di base PROSEGUE (le uniche che cambiano): '+
              g+' giuste, '+m+' sbagliate, '+b.reduce((s,r)=>s+r.pnl,0).toFixed(0)+' pip');
}

console.log('carte con autopenalità sul palazzo che cambiano verdetto: ' +
  rows.filter(r=>r.base===true && r.autopen).length);

console.log('\npeggiori 12 carte con la regola attiva');
rows.slice().sort((a,b)=>a.pnl-b.pnl).slice(0,12).forEach(r=>
  console.log('  '+r.date.split('-').reverse().join('/')+' '+r.cross+'  '+r.via+'  '+
    r.pnl.toFixed(0)+' pip'+(r.spazzato?'  (spazzato)':'')+(r.autopen?'  (autopen)':'')));

if (process.env.LYDIR) {
  // dentro la cella Officer valido + mutante sfavorevole: che direzione prende il mercato,
  // e come si distribuiscono i verdetti PB (segue/non segue, long/short)?
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const sfa = r => r.liu.effEl != null && CTRL[r.liu.effEl]===r.liu.shiElE;
  const cel = rows.filter(r => r.liu && r.liu.shiValido && isOff(r.liu) && sfa(r) && r.finale!==null);
  const rid = (nome, sel) => { const w=sel.filter(r=>r.pnl>0).length, l2=sel.filter(r=>r.pnl<0).length;
    console.log(nome.padEnd(36)+'n '+String(sel.length).padStart(4)+
      (w+l2?('   vinte '+w+'/'+(w+l2)+'   win '+(100*w/(w+l2)).toFixed(1)+'%   pip '+sel.reduce((a,r)=>a+r.pnl,0).toFixed(0)):''));};
  const per = (nome, sel) => {
    console.log('\n['+nome+']  ('+sel.length+' carte; mercato salito '+sel.filter(r=>r.move>0).length+
      ', sceso '+sel.filter(r=>r.move<0).length+')');
    const sig = r => r.emaDir==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
    rid('PB SEGUE:', sel.filter(r=>r.finale===true));
    rid('PB NON SEGUE:', sel.filter(r=>r.finale===false));
    rid('segnale LONG:', sel.filter(r=>sig(r)==='LONG'));
    rid('segnale SHORT:', sel.filter(r=>sig(r)==='SHORT'));
    rid('trend su:', sel.filter(r=>r.emaDir==='up'));
    rid('trend giu:', sel.filter(r=>r.emaDir==='down'));
  };
  per('TOTALE', cel);
  per('recente', cel.filter(r=>r.date>='2023-05-01'));
  per('vecchio', cel.filter(r=>r.date<'2023-05-01'));
}
if (process.env.LYPESCA) {
  // pesca una carta con Shi=Officer sostenuto (la cella "speculare del Brother" che
  // non ha prodotto direzione), preferibilmente recente e leggibile
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const cel = rows.filter(r => { const L=r.liu; return L && L.shiValido && L.yingValido &&
    isOff(L) && GEN[L.yingElE]===L.shiElE && L.yingForte && r.emaDir==='up' && r.finale!==null; });
  cel.sort((a,b)=> a.date<b.date?1:-1);
  console.log('\ncarte Officer sostenuto + trend su (piu recenti):');
  cel.slice(0,12).forEach(r=>console.log('  '+r.date.split('-').reverse().join('/')+'  '+r.cross+
    '   via '+r.via+'   PB '+(r.finale?'SEGUE':'NON SEGUE')+'   mov '+r.move.toFixed(0)+' pip'));
}
if (process.env.LYVUOTOCHECK) {
  // il motore controlla se Shi/Ying sono VUOTI (旬空)? verifica sulla cella Brother e Officer
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const isBro = L => L.shiElE===L.palEl;
  const cellaBro = rows.filter(r => { const L=r.liu; return L && L.shiValido && L.yingValido &&
    isBro(L) && GEN[L.yingElE]===L.shiElE && L.yingForte && r.emaDir==='up'; });
  const cellaOff = rows.filter(r => { const L=r.liu; return L && L.shiValido && L.yingValido &&
    isOff(L) && GEN[L.yingElE]===L.shiElE && L.yingForte; });
  const yingVuoto = r => r.vuoti.indexOf(r.liu.yingB) >= 0;
  const shiVuoto  = r => r.vuoti.indexOf(r.liu.shiB) >= 0;
  console.log('\n=== controllo VUOTO su Shi/Ying nelle celle ===');
  console.log('cella Brother sostenuto+su: '+cellaBro.length+' carte   di cui Ying VUOTO: '+
    cellaBro.filter(yingVuoto).length+'   Shi vuoto: '+cellaBro.filter(shiVuoto).length);
  console.log('cella Officer sostenuto:    '+cellaOff.length+' carte   di cui Ying VUOTO: '+
    cellaOff.filter(yingVuoto).length+'   Shi vuoto: '+cellaOff.filter(shiVuoto).length);
  // la carta di Edu
  const e = rows.find(r=>r.cross==='EURJPY' && r.date==='2026-06-16');
  if (e) console.log('\nEURJPY 16/06: Shi ramo '+e.liu.shiB+' (vuoto? '+(e.vuoti.indexOf(e.liu.shiB)>=0)+
    ')   Ying ramo '+e.liu.yingB+' (vuoto? '+(e.vuoti.indexOf(e.liu.yingB)>=0)+')   vuoti del giorno: '+e.vuoti.join(''));
}
if (process.env.LYRICALC) {
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const isBro = L => L.shiElE===L.palEl;
  const sfa = r => r.liu.effEl != null && CTRL[r.liu.effEl]===r.liu.shiElE;
  const pb = sel => { const t=sel.filter(r=>r.finale!==null);
    const w=t.filter(r=>r.pnl>0).length, l2=t.filter(r=>r.pnl<0).length;
    return (w+l2)?{n:t.length,pct:100*w/(w+l2),pip:t.reduce((a,r)=>a+r.pnl,0)}:{n:0}; };
  const rec = sel=>sel.filter(r=>r.date>='2023-05-01'), vec = sel=>sel.filter(r=>r.date<'2023-05-01');
  const riga = (nome, sel) => { const a=pb(sel),b=pb(rec(sel)),c=pb(vec(sel));
    console.log(nome.padEnd(40)+'tot '+String(a.n).padStart(4)+' '+(a.n?a.pct.toFixed(1)+'%':'-').padStart(7)+
      '   rec '+String(b.n).padStart(3)+' '+(b.n?b.pct.toFixed(1)+'%':'-').padStart(7)+
      '   vec '+String(c.n).padStart(3)+' '+(c.n?c.pct.toFixed(1)+'%':'-').padStart(7)+
      '   pip '+(a.pip||0).toFixed(0)); };
  console.log('\n=== RICALCOLO con VUOTO sulle linee ===');
  console.log('--- Brother sostenuto + trend su (PB nella cella) ---');
  const broVecchio = rows.filter(r=>{const L=r.liu;return L&&r.emaDir==='up'&&L.shiValido&&L.yingValido&&
    isBro(L)&&GEN[L.yingElE]===L.shiElE&&L.yingForte;});
  const broNuovo = rows.filter(r=>{const L=r.liu;return L&&r.emaDir==='up'&&L.shiEff&&L.yingEff&&
    isBro(L)&&GEN[L.yingElE]===L.shiElE&&L.yingForte;});
  riga('PRIMA (senza vuoto):', broVecchio);
  riga('DOPO (linee vuote escluse):', broNuovo);
  riga('  ... solo NON SEGUE, DOPO:', broNuovo.filter(r=>r.finale===false));
  console.log('\n--- Officer + mutante sfavorevole (PB nella cella) ---');
  const offVecchio = rows.filter(r=>r.liu&&r.liu.shiValido&&isOff(r.liu)&&sfa(r));
  const offNuovo = rows.filter(r=>r.liu&&r.liu.shiEff&&isOff(r.liu)&&sfa(r));
  riga('PRIMA (senza vuoto):', offVecchio);
  riga('DOPO (Shi vuoto escluso):', offNuovo);
  riga('  ... solo NON SEGUE, DOPO:', offNuovo.filter(r=>r.finale===false));
}
if (process.env.LYCARTA1) {
  const e = rows.find(r=>r.cross==='EURJPY' && r.date==='2026-06-16');
  if (e) {
    const L=e.liu;
    const sig = e.emaDir==='up' ? (e.finale?'LONG':'SHORT') : (e.finale?'SHORT':'LONG');
    console.log('EURJPY 16/06/2026');
    console.log('  PB: '+(e.finale?'SEGUE':'NON SEGUE')+' -> segnale '+sig);
    console.log('  movimento reale: '+e.move.toFixed(0)+' pip ('+(e.move>0?'salito':'sceso')+')');
    console.log('  esito PB: '+(e.pnl>0?'GIUSTO (+':'SBAGLIATO (')+e.pnl.toFixed(0)+' pip)');
    console.log('  Shi ramo '+L.shiB+' stato '+L.shiStato+' (eff '+L.shiEff+')');
    console.log('  Ying ramo '+L.yingB+' stato '+L.yingStato+' (eff '+L.yingEff+')');
  }
}
if (process.env.LYFORZA1) {
  const p=[2026,6,16];
  const ch=DLR.buildChartFromForexSeed(mezzanotteTST(p[0],p[1],p[2]),0,'子');
  const yb=yearBranchAt(p[0],p[1],p[2]);
  const seed=185;
  const r=leggi(seed, ch.dayBranch, ch.monthBranch, yb, ch.dayStem);
  console.log('EURJPY 16/06/2026 — anatomia del Ti (Qian, Metal)');
  console.log('  rami della data: anno '+yb+' ('+WX[yb]+') · mese '+ch.monthBranch+' ('+WX[ch.monthBranch]+') · giorno '+ch.dayBranch+' ('+WX[ch.dayBranch]+') · ora-seme '+r.oraBranch+' ('+WX[r.oraBranch]+')');
  console.log('  Ti = Qian Metal. In stagione: '+r.statoTrend);
  // conta i rami che attaccano/sostengono il Metal
  const rami=[yb, ch.monthBranch, ch.dayBranch, r.oraBranch];
  const attacca = rami.filter(b=>CTRL[WX[b]]==='Metal');   // Fire controlla Metal
  const genera  = rami.filter(b=>GEN[WX[b]]==='Metal');    // Earth genera Metal
  const pari    = rami.filter(b=>WX[b]==='Metal');
  console.log('  rami che ATTACCANO il Metal (Fuoco): '+(attacca.length?attacca.join(''):'nessuno'));
  console.log('  rami che GENERANO il Metal (Terra): '+(genera.length?genera.join(''):'nessuno'));
  console.log('  rami Metal (pari): '+(pari.length?pari.join(''):'nessuno'));
  // combinazioni che coinvolgono i rami-Terra
  rami.forEach(b=>{ if(WX[b]==='Earth'){ const c=COMBINA[b];
    if(rami.indexOf(c)>=0) console.log('  combinazione: '+b+'(Terra) 六合 '+c+' → la Terra e legata, non genera Metal'); }});
  // quale regola ha ribaltato?
  console.log('  base '+(r.base?'SEGUE':'NON SEGUE')+' → finale '+(r.finale?'SEGUE':'NON SEGUE'));
  console.log('  flag regole: rafforzato='+r.rafforzato+' drenaggio='+r.drenaggio+' sopraffTrasf='+r.sopraffTrasf+
    ' trendVuoto='+r.trendVuoto+' vuotoPareggio='+r.vuotoPareggio+' spazzato='+r.spazzato+' bloccato='+r.bloccato);
  console.log('  casoMutazione del Yong: Gen(Earth)→Kun(Earth) stesso elemento = 比和 (caso 5)');
}
if (process.env.LYDIR1) {
  const p=[2026,6,16];
  const ch=DLR.buildChartFromForexSeed(mezzanotteTST(p[0],p[1],p[2]),0,'子');
  const yb=yearBranchAt(p[0],p[1],p[2]);
  const r=leggi(185, ch.dayBranch, ch.monthBranch, yb, ch.dayStem);
  const L=r.liu;
  const nome=e=>e;
  console.log('EURJPY 16/06 — la carta LY, per direzione');
  console.log('  Shi (Soggetto) elemento '+L.shiEl+' ramo '+L.shiB+' — parente vs palazzo('+L.palEl+'): '+
    (L.shiEl===L.palEl?'Brother':CTRL[L.shiEl]===L.palEl?'Officer':CTRL[L.palEl]===L.shiEl?'Wealth':GEN[L.palEl]===L.shiEl?'Children':'Parent'));
  console.log('  Ying (Oggetto) elemento '+L.yingEl+' ramo '+L.yingB+'  stato '+L.yingStato);
  console.log('  mutante: partenza '+L.depEl+' → arrivo '+L.arrEl+'  effEl '+L.effEl+' (caso '+L.casoMut+')');
  const verd=(ti,yo)=> yo===ti?null : GEN[yo]===ti?true : CTRL[ti]===yo?true : GEN[ti]===yo?false : false;
  console.log('  effetto della mutante sullo Shi: '+ (L.effEl==null?'nullo':
    (GEN[L.effEl]===L.shiEl?'lo GENERA (sostiene)':L.effEl===L.shiEl?'stesso elemento':
     CTRL[L.effEl]===L.shiEl?'lo CONTROLLA (attacca)':GEN[L.shiEl]===L.effEl?'e generato da lui (drena)':'lo controlla al contrario')));
  console.log('  verdetto LY v1 (Ying→Shi): '+(verd(L.shiEl,L.yingEl)===null?'pareggio':verd(L.shiEl,L.yingEl)?'SEGUE':'NON SEGUE'));
  console.log('  verdetto LY v2 (mutante→Shi): '+(verd(L.shiEl,L.mutEl)===null?'pareggio':verd(L.shiEl,L.mutEl)?'SEGUE':'NON SEGUE'));
  console.log('  --- realtà: mercato SALITO, EMA su → risposta giusta = SEGUE ---');
  console.log('  PB ha detto: NON SEGUE (sbagliato)');
}
if (process.env.LYGPOS) {
  // IPOTESI (Edu, 12/08/2026): G (Officer) nel trigramma SUPERIORE = trend ascendente,
  // nel trigramma INFERIORE = trend discendente. Modulazione: se quel G "non se la
  // passa bene" (debole), il verdetto si ribalta.
  // Due letture della posizione di G:
  //   A) la linea dello Shi quando lo Shi e' Officer (posizioni 1-3 = inferiore, 4-6 = superiore)
  //   B) le linee Officer dell'esagramma (qualunque), quando stanno in un solo trigramma
  const NIN  = {1:['子','寅','辰'],2:['巳','卯','丑'],3:['卯','丑','亥'],4:['子','寅','辰'],
                5:['丑','亥','酉'],6:['寅','辰','午'],7:['辰','午','申'],8:['未','巳','卯']};
  const NOUT = {1:['午','申','戌'],2:['亥','酉','未'],3:['酉','未','巳'],4:['午','申','戌'],
                5:['未','巳','卯'],6:['申','午','辰'],7:['戌','子','寅'],8:['酉','亥','丑']};
  const q = (sel,test)=>{const n=sel.length;if(!n)return null;const w=sel.filter(test).length;
    return {n,w,pct:100*w/n,z:(w/n-0.5)/Math.sqrt(0.25/n)};};
  const st=(nome,sel,test)=>{const a=q(sel,test);
    console.log(nome.padEnd(44)+(a?('n '+String(a.n).padStart(4)+'   indovina '+a.pct.toFixed(1)+'%   z '+a.z.toFixed(2)):'n    0'));};
  const rec=s=>s.filter(r=>r.date>='2023-05-01'), vec=s=>s.filter(r=>r.date<'2023-05-01');
  // lettura A: Shi=Officer
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const baseA = rows.filter(r=>r.liu && isOff(r.liu));
  const su  = r => r.liu.shi>=4;   // Shi nel trigramma superiore
  // verdetto grezzo: superiore -> sale, inferiore -> scende. indovina se il mercato va nel verso detto
  const grezzoA = r => (su(r) ? r.move>0 : r.move<0);
  // modulato: se G (lo Shi) e' debole, ribalta
  const modA = r => { const forte=r.liu.shiForte; const dir = su(r) ? 1 : -1; const dir2 = forte?dir:-dir;
    return dir2>0 ? r.move>0 : r.move<0; };
  console.log('\n=== G-POSIZIONE: Officer sopra=sale, sotto=scende ===');
  console.log('--- lettura A: la linea dello Shi (Shi=Officer, '+baseA.length+' carte) ---');
  st('grezza — tutte',baseA,grezzoA); st('  recente',rec(baseA),grezzoA); st('  vecchio',vec(baseA),grezzoA);
  st('modulata dalla forza — tutte',baseA,modA); st('  recente',rec(baseA),modA); st('  vecchio',vec(baseA),modA);
  const forti=baseA.filter(r=>r.liu.shiForte), deboli=baseA.filter(r=>!r.liu.shiForte);
  st('solo G FORTE (grezza)',forti,grezzoA); st('  recente',rec(forti),grezzoA); st('  vecchio',vec(forti),grezzoA);
  st('solo G DEBOLE (grezza)',deboli,grezzoA); st('  recente',rec(deboli),grezzoA); st('  vecchio',vec(deboli),grezzoA);
  st('solo G DEBOLE (ribaltata)',deboli,r=>!grezzoA(r)); 
  // lettura B: linee Officer dell'esagramma
  const lineeOff = r => { const out=[];
    for(let p=1;p<=6;p++){ const b = p<=3 ? NIN[r.inf][p-1] : NOUT[r.sup][p-4];
      if (CTRL[WX[b]]===r.liu.palEl) out.push({p,b}); } return out; };
  const baseB = rows.filter(r=>{ if(!r.liu) return false; const L=lineeOff(r);
    if(!L.length) return false; const sup=L.some(x=>x.p>=4), inf=L.some(x=>x.p<=3);
    return sup!==inf; });   // solo carte con G in UN SOLO trigramma
  const suB = r => lineeOff(r).some(x=>x.p>=4);
  const grezzoB = r => (suB(r) ? r.move>0 : r.move<0);
  console.log('--- lettura B: linee Officer in un solo trigramma ('+baseB.length+' carte) ---');
  st('grezza — tutte',baseB,grezzoB); st('  recente',rec(baseB),grezzoB); st('  vecchio',vec(baseB),grezzoB);
}
if (process.env.LYGPOS2) {
  // verifica del fushen sulla carta campione, poi test "malmesso" (tre fattori di Edu)
  const e0 = rows.find(r=>r.cross==='EURJPY' && r.date==='2026-06-16');
  if (e0) { const L=e0.liu;
    console.log('verifica EURJPY 16/06: fushen sotto lo Shi = '+
      (L.fuShi ? (L.fuShi.par+' '+L.fuShi.b+' ('+L.fuShi.el+')') : 'nessuno')+
      '   [atteso: P 午 Fire]'); }
  // Tre fattori del "non se la passa bene" (Edu, 12/08/2026):
  //  F1: lo Shi GENERA il suo fushen (perde energia) e il nascosto e' forte nel mese (旺/相)
  //  F2: lo Ying non puo' generare: vuoto (dormiente/eliminata)
  //  F3: la linea mobile parte dall'elemento dello Shi e subisce 回頭剋 (caso 3): il G si spezza
  const F1 = r => r.liu.fuShi && GEN[r.liu.shiElE]===r.liu.fuShi.el &&
    (s=>s==='旺'||s==='相')(stagione(r.liu.fuShi.el, WX[r.monthBranchUsed]));
  const F2 = r => r.liu.yingStato==='dormiente' || r.liu.yingStato==='eliminata';
  const F3 = r => r.liu.casoMut===3 && r.liu.depEl===r.liu.shiElE;
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu));
  const su  = r => r.liu.shi>=4;
  const q=(sel,test)=>{const n=sel.length;if(!n)return null;const w=sel.filter(test).length;
    return {n,pct:100*w/n,z:(w/n-0.5)/Math.sqrt(0.25/n)};};
  const st=(nome,sel,test)=>{const a=q(sel,test);
    console.log(nome.padEnd(44)+(a?('n '+String(a.n).padStart(4)+'   indovina '+a.pct.toFixed(1)+'%   z '+a.z.toFixed(2)):'n    0'));};
  const rec=s=>s.filter(r=>r.date>='2023-05-01'), vec=s=>s.filter(r=>r.date<'2023-05-01');
  const punti = r => (F1(r)?1:0)+(F2(r)?1:0)+(F3(r)?1:0);
  console.log('distribuzione fattori (su '+base.length+' carte Shi=Officer): '+
    [0,1,2,3].map(k=>k+':'+base.filter(r=>punti(r)===k).length).join('  '));
  for (const soglia of [1,2,3]) {
    const mod = r => { const male = punti(r)>=soglia; const dir = su(r)?1:-1; const d2 = male?-dir:dir;
      return d2>0 ? r.move>0 : r.move<0; };
    console.log('--- malmesso = almeno '+soglia+' fattori ---');
    st('modulata — tutte', base, mod); st('  recente', rec(base), mod); st('  vecchio', vec(base), mod);
    const m=base.filter(r=>punti(r)>=soglia);
    st('solo carte malmesse (ribaltate)', m, r=>{const dir=su(r)?1:-1; return -dir>0?r.move>0:r.move<0;});
    st('  recente', rec(m), r=>{const dir=su(r)?1:-1; return -dir>0?r.move>0:r.move<0;});
    st('  vecchio', vec(m), r=>{const dir=su(r)?1:-1; return -dir>0?r.move>0:r.move<0;});
  }
}
if (process.env.LYCONF) {
  // G come conferma SEMPRE (Edu, 12/08/2026): su ogni carta con Shi=Officer,
  // il G-direzionale (posizione + salute) dice SALE o SCENDE; si confronta con la
  // direzione del segnale PB. Domanda: quando G CONFERMA il PB, il PB vince di piu'?
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu) && r.finale!==null);
  const F1 = r => r.liu.fuShi && GEN[r.liu.shiElE]===r.liu.fuShi.el &&
    (s=>s==='旺'||s==='相')(stagione(r.liu.fuShi.el, WX[r.monthBranchUsed]));
  const F2 = r => r.liu.yingStato==='dormiente' || r.liu.yingStato==='eliminata';
  const F3 = r => r.liu.casoMut===3 && r.liu.depEl===r.liu.shiElE;
  const gDir = (r, modo) => { let d = r.liu.shi>=4 ? 1 : -1;
    const male = modo==='forza' ? !r.liu.shiForte
               : modo==='fattori' ? ((F1(r)?1:0)+(F2(r)?1:0)+(F3(r)?1:0))>=1
               : (!r.liu.shiForte || ((F1(r)?1:0)+(F2(r)?1:0)+(F3(r)?1:0))>=2);
    return male ? -d : d; };
  const pbDir = r => { const sig = r.emaDir==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
    return sig==='LONG' ? 1 : -1; };
  const pb = sel => { const w=sel.filter(r=>r.pnl>0).length, l2=sel.filter(r=>r.pnl<0).length;
    return (w+l2)?{n:sel.length,pct:100*w/(w+l2),pip:sel.reduce((a,r)=>a+r.pnl,0)}:{n:0}; };
  const rec=s=>s.filter(r=>r.date>='2023-05-01'), vec=s=>s.filter(r=>r.date<'2023-05-01');
  const riga=(nome,sel)=>{const a=pb(sel),b=pb(rec(sel)),c=pb(vec(sel));
    console.log(nome.padEnd(34)+'tot '+String(a.n).padStart(4)+' '+(a.n?a.pct.toFixed(1)+'%':'-').padStart(7)+
      '   rec '+String(b.n).padStart(3)+' '+(b.n?b.pct.toFixed(1)+'%':'-').padStart(7)+
      '   vec '+String(c.n).padStart(3)+' '+(c.n?c.pct.toFixed(1)+'%':'-').padStart(7)+
      '   pip '+(a.pip||0).toFixed(0));};
  for (const modo of ['forza','fattori','misto']) {
    const conf = base.filter(r=>gDir(r,modo)===pbDir(r));
    const smen = base.filter(r=>gDir(r,modo)!==pbDir(r));
    console.log('\n=== G conferma il PB — salute via "'+modo+'" ===');
    riga('G CONFERMA il PB:', conf);
    riga('G SMENTISCE il PB:', smen);
  }
  riga('\nriferimento (tutte le 924):', base);
}
if (process.env.LYLITE) {
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu) && r.finale!==null);
  const gDir = r => { let d = r.liu.shi>=4 ? 1 : -1; return r.liu.shiForte ? d : -d; };
  const pbDir = r => { const sig = r.emaDir==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
    return sig==='LONG' ? 1 : -1; };
  const lit = base.filter(r=>gDir(r)!==pbDir(r)).sort((a,b)=>a.date<b.date?1:-1);
  console.log('carte in cui G smentisce il PB (piu recenti):');
  lit.slice(0,10).forEach(r=>{
    console.log('  '+r.date.split('-').reverse().join('/')+'  '+r.cross+
      '   PB: '+(pbDir(r)>0?'SALE':'SCENDE')+' ('+(r.finale?'segue':'non segue')+', EMA '+r.emaDir+')'+
      '   G: '+(gDir(r)>0?'SALE':'SCENDE')+' (Shi linea '+r.liu.shi+(r.liu.shi>=4?' sup':' inf')+', '+(r.liu.shiForte?'forte':'debole')+')'+
      '   mercato: '+(r.move>0?'+':'')+r.move.toFixed(0)+' pip → ragione: '+
      ((r.move>0?1:-1)===pbDir(r)?'PB':'G'));
  });
}
if (process.env.LYLITE2) {
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu) && r.finale!==null && r.move!==0);
  const gDir = r => { let d = r.liu.shi>=4 ? 1 : -1; return r.liu.shiForte ? d : -d; };
  const pbDir = r => { const sig = r.emaDir==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
    return sig==='LONG' ? 1 : -1; };
  const lit = base.filter(r=>gDir(r)!==pbDir(r));
  const q=(sel)=>{const n=sel.length;if(!n)return null;
    const g=sel.filter(r=>(r.move>0?1:-1)===gDir(r)).length;
    return {n,pct:100*g/n,z:(g/n-0.5)/Math.sqrt(0.25/n)};};
  const st=(nome,sel)=>{const a=q(sel);
    console.log(nome.padEnd(38)+(a?('n '+String(a.n).padStart(4)+'   G ha ragione '+a.pct.toFixed(1)+'%   z '+a.z.toFixed(2)):'n    0'));};
  const rec=s=>s.filter(r=>r.date>='2023-05-01'), vec=s=>s.filter(r=>r.date<'2023-05-01');
  console.log('=== LITI PB vs G: chi ha ragione, intero campione ===');
  st('tutte le liti', lit); st('  recente', rec(lit)); st('  vecchio', vec(lit));
  st('G forte (lettura diretta)', lit.filter(r=>r.liu.shiForte));
  st('  recente', rec(lit.filter(r=>r.liu.shiForte))); st('  vecchio', vec(lit.filter(r=>r.liu.shiForte)));
  st('G debole (lettura ribaltata)', lit.filter(r=>!r.liu.shiForte));
  st('  recente', rec(lit.filter(r=>!r.liu.shiForte))); st('  vecchio', vec(lit.filter(r=>!r.liu.shiForte)));
  st('PB con flip (base!=finale)', lit.filter(r=>r.base!==r.finale));
  st('  recente', rec(lit.filter(r=>r.base!==r.finale))); st('  vecchio', vec(lit.filter(r=>r.base!==r.finale)));
  st('PB senza flip', lit.filter(r=>r.base===r.finale));
  st('  recente', rec(lit.filter(r=>r.base===r.finale))); st('  vecchio', vec(lit.filter(r=>r.base===r.finale)));
}
if (process.env.LYCARTA2) {
  const e = rows.find(r=>r.cross===process.env.LYCARTA2.split(' ')[0] && r.date===process.env.LYCARTA2.split(' ')[1]);
  if (e) { const L=e.liu;
    const parN = {B:'Brother',C:'Children',W:'Wealth',G:'Officer',P:'Parent'};
    const parShi = L.shiElE===L.palEl?'Brother':CTRL[L.shiElE]===L.palEl?'Officer':CTRL[L.palEl]===L.shiElE?'Wealth':GEN[L.palEl]===L.shiElE?'Children':'Parent';
    console.log('LY: palazzo '+L.palEl+' · Shi linea '+L.shi+' ('+(L.shi>=4?'trigramma SUPERIORE':'trigramma INFERIORE')+') = '+parShi+' '+L.shiB+' ('+L.shiElE+') · stato '+L.shiStato+' · '+(L.shiForte?'FORTE':'DEBOLE'));
    console.log('    Ying linea '+L.ying+' = '+L.yingB+' ('+L.yingElE+') · stato '+L.yingStato+(L.yingForte?' · forte':' · debole'));
    console.log('    fushen sotto lo Shi: '+(L.fuShi?(parN[L.fuShi.par]+' '+L.fuShi.b+' ('+L.fuShi.el+')'):'nessuno'));
    console.log('    mutante linea '+e.linea+': partenza '+L.depEl+' → arrivo '+L.arrEl+' · caso '+L.casoMut+' · effetto '+(L.effEl||'nullo'));
    const gd = (L.shi>=4?1:-1)*(L.shiForte?1:-1);
    console.log('    G-direzionale: posizione dice '+(L.shi>=4?'SALE':'SCENDE')+', salute '+(L.shiForte?'forte → resta':'debole → ribalta')+' → G dice '+(gd>0?'SALE':'SCENDE'));
  }
}
if (process.env.SOCREP) {
  const s = rows.filter(r=>r.soccorso);
  const w=s.filter(r=>r.pnl>0).length, l2=s.filter(r=>r.pnl<0).length;
  const rec=s.filter(r=>r.date>='2023-05-01'), vec=s.filter(r=>r.date<'2023-05-01');
  const f=x=>{const a=x.filter(r=>r.pnl>0).length,b=x.filter(r=>r.pnl<0).length;
    return x.length+' carte, '+(a+b?(100*a/(a+b)).toFixed(1):'-')+'% giuste, '+x.reduce((q,r)=>q+r.pnl,0).toFixed(0)+' pip';};
  console.log('\ncarte SOCCORSE (non segue → segue): '+f(s));
  console.log('  recente: '+f(rec)+'   vecchio: '+f(vec));
  console.log('  (stesse carte SENZA soccorso avrebbero dato: '+(-s.reduce((q,r)=>q+r.pnl,0)).toFixed(0)+' pip)');
}
if (process.env.LYNETTO) {
  // "G SOPPRESSO NETTO" (Edu, 12/08/2026, da USDCAD 17/06 / Tong Ren):
  // Shi=Officer annuncia una direzione (posizione), ma e' soppresso da fattori concordi:
  //   S1: Shi debole (ne' 旺/相 nel mese, ne' sostenuto dal giorno)
  //   S2: Ying valida e FORTE che CONTROLLA lo Shi
  //   S3: il ramo del giorno CONTROLLA lo Shi
  //   S4: il movimento dello Shi e' legato dal clash del giorno (sospeso)
  // Predizione LY: la direzione annunciata FALLISCE -> il mercato va all'opposto.
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu) && r.move!==0);
  const S1 = r => !r.liu.shiForte;
  const S2 = r => r.liu.yingEff && r.liu.yingForte && CTRL[r.liu.yingElE]===r.liu.shiElE;
  const S3 = r => CTRL[WX[r.dayBranchUsed]]===r.liu.shiElE;
  const S4 = r => r.liu.shiMoving && r.liu.casoMut===-1;
  const punti = r => (S1(r)?1:0)+(S2(r)?1:0)+(S3(r)?1:0)+(S4(r)?1:0);
  const lyDir = r => (r.liu.shi>=4 ? -1 : 1);   // direzione annunciata fallisce -> opposto
  const q=(sel)=>{const n=sel.length;if(!n)return null;
    const g=sel.filter(r=>(r.move>0?1:-1)===lyDir(r)).length;
    return {n,pct:100*g/n,z:(g/n-0.5)/Math.sqrt(0.25/n)};};
  const st=(nome,sel)=>{const a=q(sel);
    console.log(nome.padEnd(40)+(a?('n '+String(a.n).padStart(4)+'   LY indovina '+a.pct.toFixed(1)+'%   z '+a.z.toFixed(2)):'n    0'));};
  const rec=s=>s.filter(r=>r.date>='2023-05-01'), vec=s=>s.filter(r=>r.date<'2023-05-01');
  console.log('=== G SOPPRESSO NETTO: la direzione annunciata fallisce ===');
  console.log('distribuzione punti: '+[0,1,2,3,4].map(k=>k+':'+base.filter(r=>punti(r)===k).length).join('  '));
  for (const k of [2,3,4]) {
    const sel = base.filter(r=>punti(r)>=k);
    console.log('--- soppressione con almeno '+k+' fattori ---');
    st('LY contro la direzione annunciata', sel); st('  recente', rec(sel)); st('  vecchio', vec(sel));
    // e come andrebbe seguire il LY quando litiga col PB in queste carte
    const pbDir = r => { const sig = r.emaDir==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
      return sig==='LONG' ? 1 : -1; };
    const liti = sel.filter(r=>r.finale!==null && pbDir(r)!==lyDir(r));
    st('  nelle liti col PB (seguendo il LY)', liti);
    st('    recente', rec(liti)); st('    vecchio', vec(liti));
  }
}
if (process.env.LYTESTA) {
  // testa-a-testa nei giorni "LY CHIARO" (G soppresso, >=k fattori):
  // seguire il LY (opposto della direzione annunciata) vs seguire il PB, sugli stessi giorni
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu) && r.move!==0 && r.finale!==null);
  const S1 = r => !r.liu.shiForte;
  const S2 = r => r.liu.yingEff && r.liu.yingForte && CTRL[r.liu.yingElE]===r.liu.shiElE;
  const S3 = r => CTRL[WX[r.dayBranchUsed]]===r.liu.shiElE;
  const S4 = r => r.liu.shiMoving && r.liu.casoMut===-1;
  const punti = r => (S1(r)?1:0)+(S2(r)?1:0)+(S3(r)?1:0)+(S4(r)?1:0);
  const lyDir = r => (r.liu.shi>=4 ? -1 : 1);
  const pbDir = r => { const sig = r.emaDir==='up' ? (r.finale?'LONG':'SHORT') : (r.finale?'SHORT':'LONG');
    return sig==='LONG' ? 1 : -1; };
  const f=(sel,dir)=>{const n=sel.length;if(!n)return null;
    const w=sel.filter(r=>(r.move>0?1:-1)===dir(r)).length;
    const pip=sel.reduce((a,r)=>a+(dir(r)>0?r.move:-r.move),0);
    return {n,pct:100*w/n,pip};};
  const st=(nome,sel,dir)=>{const a=f(sel,dir);
    console.log(nome.padEnd(36)+(a?('n '+String(a.n).padStart(4)+'   '+a.pct.toFixed(1)+'%   pip '+a.pip.toFixed(0)):'n    0'));};
  const rec=s=>s.filter(r=>r.date>='2023-05-01'), vec=s=>s.filter(r=>r.date<'2023-05-01');
  for (const k of [2,3]) {
    const sel = base.filter(r=>punti(r)>=k);
    console.log('=== giorni LY CHIARO (>= '+k+' fattori): '+sel.length+' carte ===');
    st('seguire il LY:', sel, lyDir); st('  recente', rec(sel), lyDir); st('  vecchio', vec(sel), lyDir);
    st('seguire il PB:', sel, pbDir); st('  recente', rec(sel), pbDir); st('  vecchio', vec(sel), pbDir);
  }
}
if (process.env.LYPERSA) {
  const isOff = L => CTRL[L.shiElE]===L.palEl;
  const base = rows.filter(r=>r.liu && isOff(r.liu) && r.move!==0 && r.finale!==null);
  const S1 = r => !r.liu.shiForte;
  const S2 = r => r.liu.yingEff && r.liu.yingForte && CTRL[r.liu.yingElE]===r.liu.shiElE;
  const S3 = r => CTRL[WX[r.dayBranchUsed]]===r.liu.shiElE;
  const S4 = r => r.liu.shiMoving && r.liu.casoMut===-1;
  const punti = r => (S1(r)?1:0)+(S2(r)?1:0)+(S3(r)?1:0)+(S4(r)?1:0);
  const lyDir = r => (r.liu.shi>=4 ? -1 : 1);
  const sel = base.filter(r=>punti(r)>=3)
    .map(r=>({r, pnlLY: lyDir(r)>0 ? r.move : -r.move}))
    .filter(x=>x.pnlLY<0).sort((a,b)=>a.pnlLY-b.pnlLY);
  console.log('peggiori carte LY-chiaro (>=3 fattori) seguendo il LY:');
  sel.slice(0,8).forEach(x=>{const r=x.r;
    console.log('  '+r.date.split('-').reverse().join('/')+'  '+r.cross+'   fattori '+punti(r)+
      '   Shi linea '+r.liu.shi+' ('+(r.liu.shi>=4?'sup':'inf')+') '+r.liu.shiB+
      '   LY dice '+(lyDir(r)>0?'SALE':'SCENDE')+'   mercato '+(r.move>0?'+':'')+r.move.toFixed(0)+' pip   pnl LY '+x.pnlLY.toFixed(0));});
}
if (process.env.LYSEI) {
  const e = rows.find(r=>r.cross===process.env.LYSEI.split(' ')[0] && r.date===process.env.LYSEI.split(' ')[1]);
  if (e) { const L=e.liu;
    const NIN  = {1:['子','寅','辰'],2:['巳','卯','丑'],3:['卯','丑','亥'],4:['子','寅','辰'],
                  5:['丑','亥','酉'],6:['寅','辰','午'],7:['辰','午','申'],8:['未','巳','卯']};
    const NOUT = {1:['午','申','戌'],2:['亥','酉','未'],3:['酉','未','巳'],4:['午','申','戌'],
                  5:['未','巳','卯'],6:['申','午','辰'],7:['戌','子','寅'],8:['酉','亥','丑']};
    const parDi = eL => eL===L.palEl?'B':GEN[L.palEl]===eL?'C':CTRL[L.palEl]===eL?'W':CTRL[eL]===L.palEl?'G':'P';
    console.log('sei linee (dal basso), vuoti del giorno: '+e.vuoti.join(''));
    for(let p=6;p>=1;p--){ const b = p<=3?NIN[e.inf][p-1]:NOUT[e.sup][p-4];
      const tag = (p===L.shi?'  ← Shi (S)':'')+(p===L.ying?'  ← Ying (Y)':'')+(p===e.linea?'  ← MOBILE (O)':'')
        +(L.fushen[p]?('   [nasconde '+L.fushen[p].par+' '+L.fushen[p].b+']'):'');
      console.log('  linea '+p+':  '+parDi(WX[b])+' '+b+' ('+WX[b]+')'+(e.vuoti.indexOf(b)>=0?' VUOTO':'')+tag); }
  }
}
if (process.env.LYOSCURO) {
  // MOVIMENTO OSCURO + SOSTITUZIONE DEL G VUOTO (Edu, 12/08/2026, da USDJPY 01/05/2024):
  //  - Shi=Officer VUOTO dormiente (il G originario tace)
  //  - una linea piena (non la mobile) e' clashata dal ramo del GIORNO ed e' TIMELY (旺/相)
  //    -> si muove (movimento oscuro); arrivo = ramo alla stessa posizione nell'esagramma trasformato
  //  - se l'arrivo e' un nuovo G (controlla il palazzo) -> sostituisce il G vuoto
  //  - posizione del nuovo G: se l'arrivo COMBINA (六合) con una linea statica, si ancora
  //    alla posizione di quella linea; altrimenti resta sulla linea che si e' mossa
  //  - direzione annunciata: ancora nel trigramma inferiore = ribasso, superiore = rialzo
  const NIN  = {1:['子','寅','辰'],2:['巳','卯','丑'],3:['卯','丑','亥'],4:['子','寅','辰'],
                5:['丑','亥','酉'],6:['寅','辰','午'],7:['辰','午','申'],8:['未','巳','卯']};
  const NOUT = {1:['午','申','戌'],2:['亥','酉','未'],3:['酉','未','巳'],4:['午','申','戌'],
                5:['未','巳','卯'],6:['申','午','辰'],7:['戌','子','寅'],8:['酉','亥','丑']};
  const MUT = {1:{1:5,2:4,3:3,4:2,5:1,6:7,7:6,8:8},0:{}};
  const FLIP = (tri,pos)=>({1:[5,3,2],2:[6,7,1],3:[7,6,4],4:[8,2,6],5:[1,8,7],6:[2,1,8],7:[3,4,5],8:[4,5,3]})[tri][pos-1];
  const isOffEl = (eL,pal) => CTRL[eL]===pal;
  const cnt = {tot:0, giuste:0, rec:[0,0], vec:[0,0], carte:[]};
  for (const r of rows) { const L=r.liu; if(!L) continue;
    if (!(isOffEl(L.shiElE,L.palEl) && L.shiStato==='dormiente')) continue;
    if (r.move===0) continue;
    // trigrammi trasformati dalla mobile PB
    const supT = r.linea>=4 ? FLIP(r.sup, r.linea-3) : r.sup;
    const infT = r.linea<=3 ? FLIP(r.inf, r.linea) : r.inf;
    const ramoLav = p => p<=3?NIN[r.inf][p-1]:NOUT[r.sup][p-4];
    const ramoTra = p => p<=3?NIN[infT][p-1]:NOUT[supT][p-4];
    let trovato=null;
    for (let p=1;p<=6;p++){ if(p===r.linea) continue;
      const b=ramoLav(p);
      if (CLASH[WX ? r.dayBranchUsed : r.dayBranchUsed]===undefined) {}
      if (CLASH[r.dayBranchUsed]!==b) continue;
      const st=stagione(WX[b], WX[r.monthBranchUsed]);
      if (!(st==='旺'||st==='相')) continue;
      const arr=ramoTra(p);
      if (!isOffEl(WX[arr],L.palEl)) continue;
      // ancoraggio via combinazione con una linea statica
      let anchor=p;
      for (let q2=1;q2<=6;q2++){ if(q2===p||q2===r.linea) continue;
        if (COMBINA[arr]===ramoLav(q2)) { anchor=q2; break; } }
      trovato={p,arr,anchor}; break; }
    if(!trovato) continue;
    const dir = trovato.anchor>=4 ? 1 : -1;
    const ok = (r.move>0?1:-1)===dir;
    cnt.tot++; if(ok) cnt.giuste++;
    const per = r.date>='2023-05-01'?'rec':'vec'; cnt[per][0]+= ok?1:0; cnt[per][1]++;
    cnt.carte.push(r.date.split('-').reverse().join('/')+' '+r.cross+' dice '+(dir>0?'SALE':'SCENDE')+' mercato '+(r.move>0?'+':'')+r.move.toFixed(0)+(ok?' ✓':' ✗'));
  }
  console.log('=== G SOSTITUITO dal movimento oscuro ===');
  console.log('casi trovati: '+cnt.tot+'   giusti: '+cnt.giuste+' ('+(cnt.tot?100*cnt.giuste/cnt.tot:0).toFixed(1)+'%)');
  console.log('  recente: '+cnt.rec[0]+'/'+cnt.rec[1]+'   vecchio: '+cnt.vec[0]+'/'+cnt.vec[1]);
  cnt.carte.slice(0,20).forEach(c=>console.log('  '+c));
}
