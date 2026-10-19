#!/bin/sh
# CURVA DI APPRENDIMENTO (S58, 19/10/2026). Obiezione di Edu: "I cataloghi costruiti hanno lo stesso difetto di essere
# stati costruiti con backtest piu' limitati". Prova: stesse carte di prova (gennaio-ottobre 2026), cataloghi costruiti
# su sempre piu' anni (2020-22, 2020-23, 2020-24, 2020-25). Se piu' storia migliora le carte nuove, la curva sale.
cd "$(dirname "$0")"
for FINO in 2023-01-01 2024-01-01 2025-01-01 2026-01-01; do
  sh rigenera_cataloghi.sh /tmp/tresist.json $FINO > /dev/null 2>&1
  node voci_da_moduli.js /tmp/tresist.json /tmp/voci_curva.json > /dev/null
  node -e "
const db=require('/tmp/voci_curva.json').filter(x=>x.date>='2026-01-01');
const PIR=[['LYF','PBF','DLRF'],['D','LYF','DLRF'],['D','LYF','PBF'],['D','PBF','DLRF'],['DLR','LYF','DLRF'],['LYF','DLRF'],['DLR','PBF'],['LY','DLRF'],['LETT','MT'],['LY','AT','LETT']];
const conc=(x,c)=>{const d=x[c[0]];return d&&c.every(k=>x[k]===d)?d:null};const pir=x=>{for(const c of PIR){const d=conc(x,c);if(d)return d}return null};
const st=f=>{let n=0,w=0;db.forEach(x=>{const d=f(x);if(!d)return;n++;w+=d===x.real});return (100*w/n).toFixed(1)+'% su '+n};
console.log('cataloghi fino al $FINO -> carte 2026 ('+db.length+'):  D '+st(x=>x.D)+' · LYF '+st(x=>x.LYF)+' · PBF '+st(x=>x.PBF)+' · DLRF '+st(x=>x.DLRF)+' · piramide '+st(pir));"
done
