function showQimenChart(isoDate, hGan, hZhi, highlightPalace, opts){
  if (!isoDate || !hGan || !hZhi) return;
  if (typeof window.QMDJWaterScanner === 'undefined') return;
  opts = opts || {};
  var isRot = (opts.mode === 'rotating' && typeof window.QMDJWaterScanner.getRotatingHourChart === 'function');
  var parts = isoDate.split('-');
  var Y = parseInt(parts[0]), M = parseInt(parts[1]), D = parseInt(parts[2]);
  // opts.bjInstant (Beijing-naive {y,mo,d,h,mi,s}) lets the engine decide Jie Qi / Jú at
  // INSTANT level in TST, not just day granularity. Optional: callers without a clock instant
  // (e.g. the dice tool, which only has a date) simply omit it — day-granular as before.
  // opts.forceJuDun {ju,dun} (session 26) — the QMDJ Feng Shui ANNUAL chart has no date:
  // its Ju is the Flying-Stars period we are in and its hour comes from the house facing.
  // Passing it makes THIS renderer draw that chart, so the annual view is pixel-identical
  // to the 🎲 dice chart instead of being a second, look-alike table.
  var chart = isRot
    ? window.QMDJWaterScanner.getRotatingHourChart(Y, M, D, hGan, hZhi, opts.bjInstant, opts.forceJuDun)
    : window.QMDJWaterScanner.getHourChart(Y, M, D, hGan, hZhi, opts.bjInstant, opts.forceJuDun);
  if (!chart) { if (opts.returnHtml) return ''; alert('Cannot load chart for ' + isoDate + ' ' + hGan + hZhi); return; }
  // opts.dipanDeities {palace: name} (session 32, QMDJ Li Qi): the Di Pan spirit of each
  // palace, shown small under the heaven spirit. Absent for every other chart.
  function _dpDeity(p){
    var n = opts.dipanDeities && opts.dipanDeities[p];
    return n ? '<div style="text-align:center;color:#8d6e63;font-size:10px;line-height:1.1;font-style:italic;">\u5730 ' + n + '</div>' : '';
  }

  // Direction info (label, hanzi, di-pan trigram)
  var DIR = {
    4:{dir:'SE',han:'巽',tri:'☴'}, 9:{dir:'S',han:'離',tri:'☲'}, 2:{dir:'SW',han:'坤',tri:'☷'},
    3:{dir:'E',han:'震',tri:'☳'},  5:{dir:'C',han:'',tri:''},     7:{dir:'W',han:'兌',tri:'☱'},
    8:{dir:'NE',han:'艮',tri:'☶'}, 1:{dir:'N',han:'坎',tri:'☵'},  6:{dir:'NW',han:'乾',tri:'☰'}
  };
  // Traditional QMDJ stem colors
  function stemColor(stem){
    if(!stem) return '#333';
    if(stem==='甲'||stem==='乙') return '#2e7d32'; // wood: green
    if(stem==='丙'||stem==='丁') return '#c62828'; // fire: red
    if(stem==='戊'||stem==='己') return '#bf6c00'; // earth: brown
    if(stem==='庚'||stem==='辛') return '#424242'; // metal: dark gray
    if(stem==='壬'||stem==='癸') return '#1565c0'; // water: blue
    return '#333';
  }
  var FAV = ['Open','Rest','Birth','View'];
  var GREEN = '#0d5e2c';  // dark forest green like the reference
  var gridOrder = [4,9,2, 3,5,7, 8,1,6]; // SE,S,SW, E,C,W, NE,N,NW

  function cellHtml(p){
    var d = chart.palaces[p];
    var di = DIR[p];
    if(!d){
      return '<td style="background:#fff;padding:6px;text-align:center;color:#aaa;border:1px solid '+GREEN+';">—</td>';
    }
    var doorTxt = d.doorName || d.door || '';
    var doorColor = FAV.indexOf(doorTxt)!==-1 ? '#1b5e20' : '#c62828';
    var isHighlight = (highlightPalace && p === highlightPalace);
    var bg = isHighlight ? '#fff3b0' : '#fff';
    var border = isHighlight ? '3px solid #f9a825' : '1px solid ' + GREEN;

    // Mark Zhi Shi only (Zhi Fu is visible via Commander deity already)
    var zMark = '';
    if(d.zhiShi) zMark = '<div onclick="event.stopPropagation();showZhiPopup(\'zhiShi\')" style="display:inline-block;font-size:10px;color:#e65100;font-weight:bold;line-height:1.2;cursor:pointer;background:#fff8e1;border:1px solid #ffb74d;border-radius:3px;padding:1px 5px;margin-top:2px;">Zhi Shi ℹ</div>';
    var jia = ''; // Jia hiding name removed per user request

    // Center palace: deity on top, star/heaven-stem centred, di-pan stem at the bottom.
    if(p === 5){
      return '<td style="background:'+bg+';padding:8px 7px;text-align:center;border:'+border+';width:33%;height:1px;">'
        + '<div style="display:flex;flex-direction:column;height:100%;min-height:90px;">'
        +   '<div style="color:#222;font-size:13px;font-weight:bold;">' + (d.deity||'Center') + '</div>'
        +   _dpDeity(5)
        +   '<div style="flex:1;display:flex;flex-direction:column;justify-content:center;">'
        +     '<div style="color:'+stemColor(d.tiH)+';font-weight:bold;font-size:18px;">' + (d.tiH||'') + '</div>'
        +     '<div style="color:#444;font-size:12px;">' + (d.star||'') + '</div>'
        +   '</div>'
        +   '<div style="color:'+stemColor(d.diH)+';font-weight:bold;font-size:18px;">' + (d.diH||'') + '</div>'
        + '</div>'
        + '</td>';
    }

    return '<td style="background:'+bg+';padding:6px 7px;border:'+border+';width:33%;height:1px;">'
      + '<div style="display:flex;flex-direction:column;height:100%;min-height:90px;">'
      +   '<div style="text-align:center;color:#222;font-size:13px;font-weight:bold;line-height:1.2;">' + (d.deity||'') + '</div>'
      +   _dpDeity(d.palace || p)
      +   '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:3px;">'
      +     '<span style="color:'+stemColor(d.tiH)+';font-weight:bold;font-size:17px;">' + (d.tiH||'') + '</span>'
      +     '<span style="color:#444;font-size:12px;">' + (d.star||'') + '</span>'
      +   '</div>'
      +   '<div style="text-align:center;font-weight:bold;color:'+doorColor+';font-size:16px;margin:4px 0;">' + doorTxt + '</div>'
      +   '<div style="margin-top:auto;display:flex;align-items:flex-end;gap:6px;">'
      +     '<span style="color:'+stemColor(d.diH)+';font-weight:bold;font-size:17px;">' + (d.diH||'') + '</span>' + jia + zMark
      +   '</div>'
      + '</div>'
      + '</td>';
  }

  // opts.cellsOnly (session 26) — hand back the nine cells one by one, exactly as they
  // are drawn inside the chart. The QMDJ annual ring places them around the luopan, so
  // the palaces on the wheel ARE the chart's own boxes, not a look-alike redrawn by hand.
  if (opts.cellsOnly) {
    var _cells = {};
    [1,2,3,4,5,6,7,8,9].forEach(function(_p){ _cells[_p] = cellHtml(_p); });
    return { cells: _cells, chart: chart };
  }

  // Branch labels around the perimeter (each side has 3 cells)
  // Top row of branches:    SE→巳  S→午  SW→未
  // Right col of branches:  SW→申  W→酉  NW→戌
  // Bottom row of branches: NW→亥  N→子  NE→丑
  // Left col of branches:   NE→寅  E→卯  SE→辰
  var labelStyle = 'color:#fff;font-weight:bold;font-size:14px;text-align:center;background:'+GREEN+';';
  var triStyle   = 'color:#cfe8d4;font-size:12px;text-align:center;background:'+GREEN+';width:18px;';
  var brStyle    = 'color:#fff;font-size:13px;text-align:center;background:'+GREEN+';width:18px;';
  var cornerStyle= 'color:#fff;font-weight:bold;font-size:10px;text-align:center;background:'+GREEN+';width:18px;';

  // Build the full table layout (5 rows × 5 cols)
  var html = '<div id="qimen-full-chart" style="margin:16px auto;max-width:480px;border-radius:8px;overflow:hidden;background:'+GREEN+';">';

  // Title bar
  html += '<div style="background:#fff;color:'+GREEN+';padding:8px 12px;font-weight:bold;font-size:14px;text-align:center;border-bottom:2px solid '+GREEN+';">'
       + '📅 QMDJ • Hour ' + (isRot ? 'Rotating' : 'Flying') + ' Chart'
       + '<span onclick="document.getElementById(\'qimen-full-chart\').remove()" style="float:right;cursor:pointer;font-size:18px;color:#666;">✕</span>'
       + '</div>';

  // Main table
  html += '<table style="width:100%;border-collapse:collapse;background:'+GREEN+';">';

  // Row 1: corner | SE label+branch | S label+branch | SW label+branch | corner
  html += '<tr>'
       + '<td style="'+cornerStyle+'padding:4px;">SE</td>'
       + '<td style="'+labelStyle+'padding:4px;">'+DIR[4].tri+' 巳</td>'
       + '<td style="'+labelStyle+'padding:4px;">'+DIR[9].tri+' S 午</td>'
       + '<td style="'+labelStyle+'padding:4px;">未 '+DIR[2].tri+'</td>'
       + '<td style="'+cornerStyle+'padding:4px;">SW</td>'
       + '</tr>';

  // Row 2: 辰 | P4 | P9 | P2 | 申
  html += '<tr>'
       + '<td style="'+brStyle+'padding:6px 2px;">辰</td>'
       + cellHtml(4) + cellHtml(9) + cellHtml(2)
       + '<td style="'+brStyle+'padding:6px 2px;">申</td>'
       + '</tr>';

  // Row 3: E+卯 | P3 | P5 | P7 | 酉+W
  html += '<tr>'
       + '<td style="'+labelStyle+'padding:6px 2px;line-height:1.3;">E<br>'+DIR[3].tri+'<br>卯</td>'
       + cellHtml(3) + cellHtml(5) + cellHtml(7)
       + '<td style="'+labelStyle+'padding:6px 2px;line-height:1.3;">W<br>'+DIR[7].tri+'<br>酉</td>'
       + '</tr>';

  // Row 4: 寅 | P8 | P1 | P6 | 戌
  html += '<tr>'
       + '<td style="'+brStyle+'padding:6px 2px;">寅</td>'
       + cellHtml(8) + cellHtml(1) + cellHtml(6)
       + '<td style="'+brStyle+'padding:6px 2px;">戌</td>'
       + '</tr>';

  // Row 5: NE | NE-丑 | N-子 | 亥-NW | NW
  html += '<tr>'
       + '<td style="'+cornerStyle+'padding:4px;">NE</td>'
       + '<td style="'+labelStyle+'padding:4px;">'+DIR[8].tri+' 丑</td>'
       + '<td style="'+labelStyle+'padding:4px;">'+DIR[1].tri+' N 子</td>'
       + '<td style="'+labelStyle+'padding:4px;">亥 '+DIR[6].tri+'</td>'
       + '<td style="'+cornerStyle+'padding:4px;">NW</td>'
       + '</tr>';

  html += '</table>';

  // Footer with date/hour
  html += '<div style="background:#fff;color:#444;padding:6px 12px;text-align:center;font-size:12px;border-top:2px solid '+GREEN+';">'
       + isoDate + ' · ' + hGan + hZhi
       + ' <span style="color:#888;">(' + chart.dun + ' dun, ju ' + chart.ju + ')</span>'
       + '</div>';

  html += '</div>';

  // Allow callers (e.g. travel planner) to embed the chart wherever they want
  if (opts.returnHtml) return html;

  // Remove previous chart if any
  var old = document.getElementById('qimen-full-chart');
  if(old) old.remove();

  // Insert at the bottom of the results area
  var area = document.getElementById('fs-results-area');
  if(area) area.insertAdjacentHTML('beforeend', html);
  // Scroll to it
  var el = document.getElementById('qimen-full-chart');
  if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
}

// ═══════════════════════════════════════════════════════════════════
// QMDJ CHART TOOL — a standalone panel so anyone can view a Qimen chart
// (Rotating 轉盤 or Flying 飛盤) for any date + 時辰, without scanning.
// Reuses showQimenChart (renderer) + QMDJWaterScanner.hourPillarsForDate.
// ═══════════════════════════════════════════════════════════════════
