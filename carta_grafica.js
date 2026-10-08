// Uso: node carta_grafica.js out.png "TITOLO" AAAA-MM-GG yearBr yearStem monthBr monthStem dayBr dayStem seed t1 t2 t3 t4 t5 t6
// rami: z c y m cn si w we s yo xu h ; linee: - | "- -" | O | X  (dal basso)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const [out, titolo, dataISO, yB, yS, mB, mS, dB, dS, seed, ...t] = process.argv.slice(2);
  let b; try { b = await chromium.launch(); } catch (e) { b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' }); }
  const p = await b.newPage({ viewport: { width: 760, height: 560 } });
  p.on('dialog', d => d.dismiss());
  await p.goto('file://' + path.resolve(__dirname, 'YijingWWG.html'));
  const f = 'form[name=frmGenHex] ';
  // la data occidentale della carta nei menu in alto (Edu 08/10/2026: "mi dai la carta con la data sbagliata???")
  const [Y, M, G] = dataISO.split('-');
  const MESI = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  await p.selectOption(f + 'select[name=cboWesternYear]', String(+Y));
  await p.selectOption(f + 'select[name=cboWesternMonth]', MESI[+M - 1]);
  await p.selectOption(f + 'select[name=cboWesternDay]', G.padStart(2, '0'));
  await p.selectOption(f + 'select[name=cboYear]', yB); await p.selectOption(f + 'select[name=cboYearStem]', yS);
  await p.selectOption(f + 'select[name=cboMonth]', mB); await p.selectOption(f + 'select[name=cboMonthStem]', mS);
  await p.selectOption(f + 'select[name=cboDayBranch]', dB); await p.selectOption(f + 'select[name=cboDayStem]', dS);
  await p.fill(f + 'input[name=txtSeed]', seed); await p.dispatchEvent(f + 'input[name=txtSeed]', 'keyup');
  for (let i = 1; i <= 6; i++) await p.selectOption(f + `select[name=cboToss${i}]`, t[i - 1]);
  await p.click(f + 'input[name=cmdGenerate]');
  await p.evaluate(tt => { const h = document.createElement('div'); h.textContent = tt;
    h.style.cssText = 'font:bold 18px Arial;color:#ff0;padding:6px 0'; document.body.prepend(h); }, titolo);
  await p.screenshot({ path: out, fullPage: true });
  console.log(await p.inputValue(f + 'textarea[name=txtHexagram]'));
  await b.close();
})();
