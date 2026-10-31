const fs=require('fs');
const frag=f=>fs.readFileSync(f,'utf8').replace(/<[^>]*onclick="document\.getElementById\('qimen-full-chart'\)\.remove\(\)"[^>]*>[^<]*<\/[a-z]+>/g,'').replace(/ onclick="[^"]*"/g,'').replace(/id="qimen-full-chart"/g,'class="qm"');
const C=[
{f:'NZDUSD_2026-10-28.frag',t:'NZDUSD · 28/10/2026',tr:'LONG',re:'SHORT 51 pip',seg:'NON segue',lio:'Lio LONG forte, sbagliato',ds:'乙 in Gen (sopra 辛)',hs:'癸 in Dui, con il TY',zf:'Qian',vu:'申酉 (Dui vuoto, Kun a metà)',bz:['癸未','乙亥','戊戌','丙午'],dec:'Gen',
 ore:[['丁丑','01-03','64','contro','sì','丑 in Gen · 丁 nel cielo di Li, che genera Gen'],['戊寅','03-05','4','contro','no','寅 in Gen · 戊 nel cielo di Li, che genera Gen']],
 com:['Decide Gen: il DS 乙 sopra il 辛 è il drago che fugge, il trend non ha appoggio. HS e TY in Dui vuoto non sostengono lo ZF.','Le due ore sono quasi uguali: tutte e due hanno il ramo in Gen e lo stelo nel cielo di Li, che genera Gen. Cambia solo il ramo.','丑 clasha il 未 del pilastro dell\'ora e punisce il 戌 del mese, che stava con lo ZF: libera il palazzo e muove 64 pip, più di tutta la giornata.','寅 si combina col 亥 del giorno (寅亥 合): il ramo è legato e l\'ora resta ferma.']},
{f:'NZDUSD_2025-11-26.frag',t:'NZDUSD · 26/11/2025',tr:'SHORT',re:'LONG 75 pip',seg:'NON segue',lio:'Lio SHORT, sbagliato',ds:'己 in Zhen',hs:'辛 in Gen (con 丁, fan yin)',zf:'Kun',vu:'戌亥 (Qian vuoto)',bz:['辛未','己亥','丁亥','乙巳'],dec:'Gen',
 ore:[['乙丑','01-03','59','contro','sì','丑 in Gen · 乙 nella terra di Li, che genera Gen'],['丙寅','03-05','5','contro','no','寅 in Gen · 丙 nel cielo di Li, che genera Gen']],
 com:['Decide Gen: l\'HS 辛 con 丁 in fan yin, il giorno non tiene.','È la stessa coppia di NZDUSD 28/10, con lo stesso cross e le stesse ore.','丑 clasha il 未 dell\'ora: 59 pip in due ore.','寅 si combina col 亥 del giorno e del mese: fermo, anche se il suo stelo sta nel cielo del palazzo che genera Gen. Qui il cielo non basta, conta il ramo.']},
{f:'GBPUSD_2026-10-14.frag',t:'GBPUSD · 14/10/2026',tr:'LONG',re:'SHORT 68 pip',seg:'NON segue',lio:'Lio SHORT, giusto',ds:'辛 in Kun, con ZF e Commander',hs:'己 in Dui',zf:'Kun',vu:'辰巳 (Xun vuoto)',bz:['己亥','辛酉','戊戌','丙午'],dec:'Kun',
 ore:[['甲午','11-13','60','contro','sì','甲 nasconde 辛 = DS in Kun · 午 nasconde 辛'],['乙未','13-15','49','contro','sì','未 in Kun · 乙 nel cielo di Li, che genera Kun'],['丙申','15-17','5','contro','no','申 in Kun · 丙 nella terra di Kun e nel cielo di Dui, con l\'HS']],
 com:['Decide Kun: il giorno genera l\'ora, il qi del DS esce verso l\'HS in Dui e il trend si svuota.','Qui nessun ramo clasha un pilastro, quindi la regola del ramo non spiega la differenza.','Muovono le ore che portano qi a Kun: 甲午 è il DS stesso (辛 nascosto), 乙未 arriva dal cielo di Li che genera Kun. In più 未 punisce il 戌 del mese.','丙申 non muove: il suo stelo sta nel cielo di Dui accanto all\'HS, cioè dal lato della controparte, e in Kun solo nella terra. Accende il palazzo ma non lo alimenta.']},
{f:'USDJPY_2025-11-13.frag',t:'USDJPY · 13/11/2025',tr:'LONG',re:'SHORT 15 pip',seg:'NON segue',lio:'Lio fermo',ds:'丙 in Kan',hs:'丁 in Kun',zf:'Zhen, con lo ZS',vu:'辰巳 (Xun vuoto)',bz:['丁酉','丙戌','丁亥','乙巳'],dec:'Kun',
 ore:[['壬辰','07-09','37','contro','sì','壬 nella terra di Kun · 辰 vuoto, nasconde 壬'],['丙申','15-17','1','contro','no','申 in Kun · 丙 = DS, nella terra di Kun e nel cielo di Kan']],
 com:['Decide Kun (ZFTY): il giorno controlla l\'ora, ma il ponte Birth fa da passamano e vince l\'ora.','壬辰 muove 37 pip anche se 辰 è vuoto: 辰 clasha il 戌 del giorno. Torna il ramo che clasha un pilastro, come 丑-未 nelle due NZDUSD.','丙申 è l\'ora del DS: porta il trend dentro il palazzo della controparte e si annulla, 1 pip.']}];
const card=c=>`<section class="card"><header><h2>${c.t}</h2><p class="esito"><span>Trend ${c.tr}</span><span>Reale ${c.re}</span><span class="bad">${c.seg}</span></p></header>
<dl class="facts"><div><dt>DS</dt><dd>${c.ds}</dd></div><div><dt>HS</dt><dd>${c.hs}</dd></div><div><dt>ZF</dt><dd>${c.zf}</dd></div><div><dt>Vuoti</dt><dd>${c.vu}</dd></div><div><dt>Decide</dt><dd>${c.dec}</dd></div><div><dt>Lio</dt><dd>${c.lio}</dd></div></dl>
<div class="row"><table class="bz"><thead><tr><th>Ora</th><th>Giorno</th><th>Mese</th><th>Anno</th></tr></thead><tbody><tr>${c.bz.map(x=>`<td>${x[0]}</td>`).join('')}</tr><tr>${c.bz.map(x=>`<td>${x[1]}</td>`).join('')}</tr></tbody></table></div>
<div class="chart">${frag(c.f)}</div>
<div class="row"><table class="ore"><thead><tr><th>Ora</th><th>GMT</th><th>Pip</th><th>Muove</th><th>Perché tocca ${c.dec}</th></tr></thead><tbody>${c.ore.map(o=>`<tr class="${o[4]==='sì'?'si':'no'}"><td class="gz">${o[0]}</td><td>${o[1]}</td><td class="num">${o[2]} ${o[3]}</td><td>${o[4]}</td><td>${o[5]}</td></tr>`).join('')}</tbody></table></div>
<div class="com"><h3>Commento</h3>${c.com.map(x=>`<p>${x}</p>`).join('')}</div></section>`;
const css=fs.readFileSync('style.css','utf8');
fs.writeFileSync('oap_coppie.html',`<title>Coppie OAP</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500;700&family=Source+Sans+3:wght@400;600&display=swap">
<style>${css}</style>
<main><h1>Coppie OAP</h1><p class="lead">Quattro carte del 2025-26 in cui il palazzo che decide è giusto e, nello stesso palazzo, un'ora muove e un'altra resta ferma. L'ora è un trade di due ore, nella direzione della carta.</p>
${C.map(card).join('\n')}
<section class="sintesi"><h2>Cosa le separa</h2>
<p><b>Ramo.</b> In tre carte su quattro l'ora che muove ha il ramo che clasha un pilastro: 丑 contro il 未 dell'ora (due volte in NZDUSD), 辰 contro il 戌 del giorno (USDJPY). L'ora ferma ha il ramo legato in 合 col giorno (寅亥) o senza rapporti.</p>
<p><b>Stelo.</b> Dove nessun ramo clasha (GBPUSD), muovono le ore il cui stelo porta qi al palazzo che decide, dal cielo o perché è il DS nascosto. Non muove l'ora il cui stelo sta con la controparte (丙 accanto all'HS) o è il DS dentro il palazzo avversario.</p>
<p><b>Limite.</b> Sullo storico il clash da solo dà 47-50%, quindi non basta. Serve la tua lettura per capire quando il clash libera il palazzo e quando no.</p></section></main>`);
