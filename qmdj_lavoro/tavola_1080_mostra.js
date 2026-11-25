// S79: stampa in breve le carte indicate (per la lettura di Claude, senza esiti). Uso: node tavola_1080_mostra.js "yin 4 壬子" ...
global.window=global; const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
const path=require('path'), DIR=path.join(__dirname,'..'); global.XKDGSolarTime=require(DIR+'/solar-time.js'); global.XKDGJieQiGMT=require(DIR+'/jieqi-gmt.js');
const Q=require(DIR+'/qmdj.js'), N={1:'Kan',2:'Kun',3:'Zhen',4:'Xun',6:'Qian',7:'Dui',8:'Gen',9:'Li'}, BR='子丑寅卯辰巳午未申酉戌亥', ST='甲乙丙丁戊己庚辛壬癸';
for(const a of process.argv.slice(2)){const [dun,ju,gz]=a.split(' '),c=Q.cartaDi(+ju,dun,gz);let i=0;while(ST[i%10]+BR[i%12]!==gz)i++;const s=Math.floor(i/10)*10,vu=BR[(s+10)%12]+BR[(s+11)%12];
  console.log('## '+a+' | vuoti '+vu+' | HS '+(gz[0]==='甲'?'(Jia='+c.palaces[1].cmdStem+')':gz[0]));
  for(const k of [4,9,2,3,7,8,1,6]){const d=c.palaces[k];console.log('  '+N[k].padEnd(5),(d.tiH+(d.ti2H||'')+'/'+d.diH+(d.di2H||'')).padEnd(6),(d.star+(d.star2?'+'+d.star2:'')).padEnd(14),(d.doorName||'').padEnd(9),d.deity.padEnd(10),d.zhiFu?'ZF':'',d.zhiShi?'ZS':'');}}
