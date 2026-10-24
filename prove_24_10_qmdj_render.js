// Disegna una carta oraria rotante col renderer di XKDG (showQimenChart, eduXKDG/app-fengshui.js, estratto in /home/claude/qm/showqm.js).
// Uso: node prove_24_10_qmdj_render.js AAAA-MM-GG stelo ramo ju yin|yang  ->  /home/claude/qm/carta.html
global.window=global; global.document={getElementById:()=>null,querySelector:()=>null,createElement:()=>({style:{}}),body:{appendChild(){}}};
const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
require('/home/claude/trading/qmdj-water-scanner.js');
eval(require('fs').readFileSync('/home/claude/qm/showqm.js' /* = righe di showQimenChart da eduXKDG/app-fengshui.js */ + '','utf8')+';global.showQimenChart=showQimenChart;');
const [d,g,z,ju,dun]=process.argv.slice(2);
const h=showQimenChart(d,g,z,null,{mode:'rotating',returnHtml:true,forceJuDun:{ju:+ju,dun}});
require('fs').writeFileSync('/home/claude/qm/carta.html',h); console.log(h.length); 
