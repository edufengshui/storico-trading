global.window=global; global.document={getElementById:()=>null,querySelector:()=>null,createElement:()=>({style:{}}),body:{appendChild(){}}};
const lj=require('lunar-javascript'); global.Solar=lj.Solar; global.Lunar=lj.Lunar;
require('/home/claude/trading/qmdj-water-scanner.js');
eval(require('fs').readFileSync('/home/claude/qm/showqm.js','utf8')+';global.showQimenChart=showQimenChart;');
const [d,g,z,ju,dun]=process.argv.slice(2);
const h=showQimenChart(d,g,z,null,{mode:'rotating',returnHtml:true,forceJuDun:{ju:+ju,dun}});
require('fs').writeFileSync('/home/claude/qm/carta.html',h); console.log(h.length); 
