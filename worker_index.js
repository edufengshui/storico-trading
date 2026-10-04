/* src/index.js — Cloudflare Worker: daily 00:00 GMT forex seed + EMA(12) trend direction.
 *
 * Two Twelve Data calls per cross:
 *   - interval=1day: completed daily closes for the EMA(12) trend (direction, consolidation, emaRun).
 *   - interval=1h:   (a) SEED = OPEN of today's 00:00 UTC hourly bar → first 3 significant digits
 *                        (2 digits when the quote is below 1, so the seed step is 100 pips for every
 *                        cross) mod 12 → 地支 (remainder counts 子=1 … 亥=12);
 *                    (b) ESITO DEL GIORNO PRECEDENTE: 00:00 open → 21:00 close of the last trading day.
 *
 * CORRETTO il 03/10/2026 (S52, confronto notturno col backtest, confronto_live.md):
 *   - il seme veniva dall'apertura della barra GIORNALIERA di Twelve Data, che non sempre coincide con
 *     l'apertura delle 00:00 UTC usata dal backtest (USDJPY 02/10: 158 contro 157; EURGBP 03/10: 84
 *     contro 85). Ora il seme viene dalla barra ORARIA delle 00:00, come nel backtest; se quella barra
 *     manca si ripiega sull'apertura giornaliera e il feed lo dice (seedSource = 'daily').
 *   - sabato e domenica il mercato e' chiuso: niente feed nuovo (il cron non fa nulla, /run restituisce
 *     l'ultimo feed). Prima usciva un feed anche il sabato, con trade che non esistono.
 *
 * scheduled (cron 00:10 GMT): recompute and store (Monday-Friday only).
 * fetch:  GET /            → latest cached seeds (CORS)
 *         GET /?date=YYYY-MM-DD → a past day
 *         GET /run[?token=] → recompute now and return the result (18 throttled calls)
 *         GET /earliest[?interval=1h] → earliest available timestamp per cross (probe depth)
 *         GET /page?symbol=EURUSD&interval=1h[&end=...][&size=5000][&full=1]
 *              → ONE page of at most 5000 bars ending at `end` (Twelve Data's per-call cap).
 *
 * Secret:  TWELVEDATA_API_KEY   Optional: RUN_TOKEN, DELAY_MS (throttle, default 8000)
 * Binding: SEEDS (KV).  Basic (free) plan = 8 credits/min, 800/day; 2 calls/cross, throttled.
 */

var BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
var BRANCH_PINYIN = ['Zi', 'Chou', 'Yin', 'Mao', 'Chen', 'Si', 'Wu', 'Wei', 'Shen', 'You', 'Xu', 'Hai'];

var CROSSES = ['EURUSD', 'GBPUSD', 'USDJPY', 'USDCHF', 'AUDUSD', 'USDCAD', 'NZDUSD', 'EURJPY', 'EURGBP'];
var ENDPOINT = 'https://api.twelvedata.com/time_series';
var EMA_PERIOD = 12;
var EMA_WINDOW = 15;
var EMA_MAX_CHANGES = 2;
var EMA_RUN_STRONG = 20;

function pipFactor(cross) { return /JPY$/.test(cross) ? 100 : 10000; }
function toPair(code) { return code.length === 6 ? code.slice(0, 3) + '/' + code.slice(3) : code; }
function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

function firstThreeSignificant(price) {
  var digits = String(price).replace(/[^0-9]/g, '').replace(/^0+/, '');
  var n = Math.abs(Number(price)) < 1 ? 2 : 3;
  return digits.slice(0, n);
}
function seedToBranchIndex(seed) { return (((seed - 1) % 12) + 12) % 12; }

function todayGmtDate(now) {
  now = now || new Date();
  var y = now.getUTCFullYear();
  var m = String(now.getUTCMonth() + 1).padStart(2, '0');
  var d = String(now.getUTCDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}
// 03/10/2026: sabato (6) e domenica (0) il mercato e' chiuso
function isWeekend(now) { var g = (now || new Date()).getUTCDay(); return g === 0 || g === 6; }

var SEED_EDGE_GUARD = 3;

function seedEdgeDistance(price) {
  var p = Math.abs(Number(price));
  if (!(p > 0)) return null;
  var n = p < 1 ? 2 : 3;
  var step = Math.pow(10, Math.floor(Math.log10(p)) - n + 1);
  var frac = p / step - Math.floor(p / step);
  return Math.min(frac, 1 - frac) * 100;
}

function rowFor(cross, price) {
  var d3 = firstThreeSignificant(price);
  var seed = parseInt(d3, 10);
  var idx = seedToBranchIndex(seed);
  var edge = seedEdgeDistance(price);
  var fragile = edge != null && edge < SEED_EDGE_GUARD;
  return {
    cross: cross, price: price, digits: d3, seed: seed,
    branchIndex: idx, branch: BRANCHES[idx], branchPinyin: BRANCH_PINYIN[idx],
    seedEdgePips: edge == null ? null : Number(edge.toFixed(1)),
    seedFragile: fragile,
    seedNote: fragile
      ? 'NO TRADE — the 00:00 price is only ' + edge.toFixed(1) + ' pip from the seed boundary; ' +
        'another data source could produce a different 地支 (Earthly Branch)'
      : null
  };
}

function emaSeries(closes, period) {
  if (!closes || closes.length < period) return [];
  var k = 2 / (period + 1), prev = null, out = [];
  for (var i = 0; i < closes.length; i++) {
    if (i < period - 1) continue;
    if (i === period - 1) { var s = 0; for (var j = 0; j < period; j++) s += closes[j]; prev = s / period; out.push(prev); continue; }
    prev = closes[i] * k + prev * (1 - k); out.push(prev);
  }
  return out;
}
function emaDirs(series) {
  var d = [];
  for (var i = 1; i < series.length; i++) d.push(series[i] > series[i - 1] ? 'u' : (series[i] < series[i - 1] ? 'd' : 'f'));
  return d;
}
function countChanges(dirs) {
  var n = 0, prev = null;
  for (var i = 0; i < dirs.length; i++) {
    var x = dirs[i]; if (x === 'f') continue;
    if (prev !== null && x !== prev) n++;
    prev = x;
  }
  return n;
}
function emaRunLen(dirs) {
  var run = 0, ref = null;
  for (var q = dirs.length - 1; q >= 0; q--) {
    var s = dirs[q]; if (s === 'f') continue;
    if (ref === null) { ref = s; run = 1; }
    else if (s === ref) run++;
    else break;
  }
  return run;
}

async function fetchDailyAll(cross, dateStr, apiKey) {
  var pair = toPair(cross);
  var url = ENDPOINT + '?symbol=' + encodeURIComponent(pair) +
    '&interval=1day&outputsize=120&timezone=UTC&format=JSON&apikey=' + encodeURIComponent(apiKey);
  var res = await fetch(url); var text = await res.text(); var json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('non-JSON response: ' + text.slice(0, 140)); }
  if (json.status === 'error') { var err = new Error(json.message || 'error'); err.code = json.code; throw err; }
  var vals = (json.values || []).slice();
  vals.sort(function (a, b) { return (a.datetime || '') < (b.datetime || '') ? -1 : 1; });
  var todayOpen = null, closes = [];
  for (var i = 0; i < vals.length; i++) {
    var dt = (vals[i].datetime || '').slice(0, 10);
    if (dt === dateStr) { if (vals[i].open != null) todayOpen = Number(vals[i].open); }
    else if (dt < dateStr && vals[i].close != null) { closes.push(Number(vals[i].close)); }
  }
  return { todayOpen: todayOpen, closes: closes };
}

// serie ORARIA: apertura delle 00:00 di oggi (il seme, come nel backtest) + esito dell'ultimo giorno
// di trade prima di oggi (entrata 00:00, uscita 21:00 UTC, come nel backtest)
async function fetchHourlyInfo(cross, dateStr, apiKey) {
  var pair = toPair(cross);
  var url = ENDPOINT + '?symbol=' + encodeURIComponent(pair) +
    '&interval=1h&outputsize=200&timezone=UTC&format=JSON&apikey=' + encodeURIComponent(apiKey);
  var res = await fetch(url); var text = await res.text(); var json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('non-JSON response: ' + text.slice(0, 140)); }
  if (json.status === 'error') { var err = new Error(json.message || 'error'); err.code = json.code; throw err; }
  var vals = (json.values || []).slice();
  vals.sort(function (a, b) { return (a.datetime || '') < (b.datetime || '') ? -1 : 1; });
  var by = {};
  for (var i = 0; i < vals.length; i++) {
    var t = vals[i].datetime || '', d = t.slice(0, 10), hh = t.slice(11, 13);
    if (!d) continue;
    if (!by[d]) by[d] = {};
    if (hh === '00' && vals[i].open != null) by[d].o = Number(vals[i].open);
    if (hh === '21' && vals[i].close != null) by[d].c = Number(vals[i].close);
  }
  var open00 = by[dateStr] && by[dateStr].o != null ? by[dateStr].o : null;
  var days = Object.keys(by).filter(function (d) {
    return d < dateStr && by[d].o != null && by[d].c != null;
  }).sort();
  var prev = null;
  if (days.length) {
    var d0 = days[days.length - 1];
    var mv = (by[d0].c - by[d0].o) * pipFactor(cross);
    prev = { date: d0, open: by[d0].o, close: by[d0].c, movePip: Number(mv.toFixed(1)) };
  }
  return { open00: open00, prev: prev };
}

async function withRetry(fn) {
  try { return await fn(); }
  catch (e) {
    if (e && (e.code === 429 || /limit|run out|429/i.test(String(e.message)))) { await sleep(61000); return await fn(); }
    throw e;
  }
}

async function computeDaily(env) {
  var apiKey = env.TWELVEDATA_API_KEY;
  if (!apiKey) throw new Error('Missing TWELVEDATA_API_KEY secret');
  var delayMs = Number(env.DELAY_MS != null ? env.DELAY_MS : 8000);
  var date = todayGmtDate();
  var rows = [];
  for (var i = 0; i < CROSSES.length; i++) {
    var cross = CROSSES[i];
    try {
      var data = await withRetry((function (c) { return function () { return fetchDailyAll(c, date, apiKey); }; })(cross));
      if (delayMs > 0) await sleep(delayMs);
      var hourly = null, hourlyErr = null;
      try { hourly = await withRetry((function (c) { return function () { return fetchHourlyInfo(c, date, apiKey); }; })(cross)); }
      catch (e2) { hourlyErr = String((e2 && e2.message) || e2); }

      // il seme: apertura della barra oraria delle 00:00 (come il backtest); ripiego: apertura giornaliera
      var seedPrice = hourly && hourly.open00 != null ? hourly.open00 : data.todayOpen;
      if (seedPrice == null) throw new Error('no 00:00 bar for today (market closed?)');
      var row = rowFor(cross, seedPrice); row.status = 'ok';
      row.seedSource = (hourly && hourly.open00 != null) ? 'hourly-00' : 'daily';
      row.dailyOpen = data.todayOpen;

      var series = emaSeries(data.closes, EMA_PERIOD);
      var dirs = emaDirs(series);
      if (dirs.length) {
        var win = dirs.slice(-EMA_WINDOW);
        var last = win[win.length - 1];
        row.ema = Number(series[series.length - 1].toFixed(6));
        row.emaPrev = Number(series[series.length - 2].toFixed(6));
        row.direction = last === 'u' ? 'up' : (last === 'd' ? 'down' : 'flat');
        row.trendColor = row.direction === 'up' ? 'blue' : (row.direction === 'down' ? 'red' : 'flat');
        row.emaDirs = win.join('');
        row.emaChanges = countChanges(win);
        row.emaConsolidated = row.emaChanges <= EMA_MAX_CHANGES;
        row.emaRun = emaRunLen(dirs);
      } else { row.emaNote = 'insufficient daily history (' + data.closes.length + ' closes)'; }

      if (hourly && hourly.prev) {
        row.prevDate = hourly.prev.date; row.prevOpen = hourly.prev.open;
        row.prevClose = hourly.prev.close; row.prevMovePip = hourly.prev.movePip;
      } else row.prevNote = hourlyErr ? 'previous-day outcome unavailable: ' + hourlyErr : 'no usable hourly bars for the previous trading day';

      rows.push(row);
    } catch (e) {
      rows.push({ cross: cross, status: 'error', error: String((e && e.message) || e) });
    }
    if (i < CROSSES.length - 1 && delayMs > 0) await sleep(delayMs);
  }
  var out = {
    date: date, gmtTime: '00:00', generatedAt: new Date().toISOString(),
    source: 'Twelve Data — seed: open of the 00:00 UTC hourly bar · trend: EMA(12) on daily closes',
    seedGuardRule: 'no trade when the 00:00 price is within ' + SEED_EDGE_GUARD + ' pips of a seed-bucket edge (the branch would not be reproducible across data sources)',
    seedRule: 'open of the 00:00 UTC hourly bar (fallback: daily open, seedSource=daily); first 3 significant digits (2 if the quote is below 1) mod 12, remainder counts 子=1 … 亥=12 → 地支',
    emaRule: 'EMA period 12 on daily closes; direction = slope at the tip (up=blue, down=red); emaRun = consecutive days in that direction',
    filterRule: 'consolidation: <= ' + EMA_MAX_CHANGES + ' EMA reversals over the last ' + EMA_WINDOW + ' days (flat ignored); otherwise no trade',
    prevRule: 'prevMovePip = pips made by the previous trading day, entering at the 00:00 UTC hourly open and leaving at the 21:00 UTC hourly close (same convention as the backtest); JPY crosses x100, others x10000',
    rows: rows
  };
  var body = JSON.stringify(out);
  await env.SEEDS.put('daily', body);
  await env.SEEDS.put('daily:' + date, body);
  return out;
}

async function fetchHistory(cross, size, apiKey) {
  var pair = toPair(cross);
  var url = ENDPOINT + '?symbol=' + encodeURIComponent(pair) +
    '&interval=1day&outputsize=' + size + '&timezone=UTC&format=JSON&apikey=' + encodeURIComponent(apiKey);
  var res = await fetch(url); var text = await res.text(); var json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('non-JSON: ' + text.slice(0, 140)); }
  if (json.status === 'error') { var err = new Error(json.message || 'error'); err.code = json.code; throw err; }
  var vals = (json.values || []).slice();
  vals.sort(function (a, b) { return (a.datetime || '') < (b.datetime || '') ? -1 : 1; });
  return vals.map(function (v) {
    return { d: (v.datetime || '').slice(0, 10), o: Number(v.open), h: Number(v.high), l: Number(v.low), c: Number(v.close) };
  });
}

async function fetchHourly(cross, size, apiKey, interval) {
  var pair = toPair(cross);
  var url = ENDPOINT + '?symbol=' + encodeURIComponent(pair) +
    '&interval=' + encodeURIComponent(interval || '1h') +
    '&outputsize=' + size + '&timezone=UTC&format=JSON&apikey=' + encodeURIComponent(apiKey);
  var res = await fetch(url); var text = await res.text(); var json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('non-JSON: ' + text.slice(0, 140)); }
  if (json.status === 'error') { var err = new Error(json.message || 'error'); err.code = json.code; throw err; }
  var vals = (json.values || []).slice();
  vals.sort(function (a, b) { return (a.datetime || '') < (b.datetime || '') ? -1 : 1; });
  return vals.map(function (v) { return { t: v.datetime, o: Number(v.open), c: Number(v.close) }; });
}

async function computeHourly(env, size, interval, only) {
  var apiKey = env.TWELVEDATA_API_KEY;
  if (!apiKey) throw new Error('Missing TWELVEDATA_API_KEY secret');
  var delayMs = Number(env.DELAY_MS != null ? env.DELAY_MS : 8000);
  interval = interval || '1h';
  var list = (only && only.length) ? CROSSES.filter(function (c) { return only.indexOf(c) >= 0; }) : CROSSES;
  var out = { generatedAt: new Date().toISOString(), interval: interval, outputsize: size, crosses: {} };
  for (var i = 0; i < list.length; i++) {
    var cross = list[i];
    try { out.crosses[cross] = await withRetry((function (c) { return function () { return fetchHourly(c, size, apiKey); }; })(cross)); }
    catch (e) { out.crosses[cross] = { error: String((e && e.message) || e) }; }
    if (i < CROSSES.length - 1 && delayMs > 0) await sleep(delayMs);
  }
  return out;
}

async function computeHistory(env, size) {
  var apiKey = env.TWELVEDATA_API_KEY;
  if (!apiKey) throw new Error('Missing TWELVEDATA_API_KEY secret');
  var delayMs = Number(env.DELAY_MS != null ? env.DELAY_MS : 8000);
  var out = { generatedAt: new Date().toISOString(), outputsize: size, crosses: {} };
  for (var i = 0; i < CROSSES.length; i++) {
    var cross = CROSSES[i];
    try { out.crosses[cross] = await withRetry((function (c) { return function () { return fetchHistory(c, size, apiKey); }; })(cross)); }
    catch (e) { out.crosses[cross] = { error: String((e && e.message) || e) }; }
    if (i < CROSSES.length - 1 && delayMs > 0) await sleep(delayMs);
  }
  return out;
}

var EARLIEST_ENDPOINT = 'https://api.twelvedata.com/earliest_timestamp';

async function fetchEarliest(cross, interval, apiKey) {
  var pair = toPair(cross);
  var url = EARLIEST_ENDPOINT + '?symbol=' + encodeURIComponent(pair) +
    '&interval=' + encodeURIComponent(interval) + '&apikey=' + encodeURIComponent(apiKey);
  var res = await fetch(url); var text = await res.text(); var json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('non-JSON: ' + text.slice(0, 140)); }
  if (json.status === 'error') { var err = new Error(json.message || 'error'); err.code = json.code; throw err; }
  return { datetime: json.datetime || null, unixTime: json.unix_time || null };
}

async function computeEarliest(env, interval) {
  var apiKey = env.TWELVEDATA_API_KEY;
  if (!apiKey) throw new Error('Missing TWELVEDATA_API_KEY secret');
  var delayMs = Number(env.DELAY_MS != null ? env.DELAY_MS : 8000);
  var out = { generatedAt: new Date().toISOString(), interval: interval, crosses: {} };
  for (var i = 0; i < CROSSES.length; i++) {
    var cross = CROSSES[i];
    try { out.crosses[cross] = await withRetry((function (c) { return function () { return fetchEarliest(c, interval, apiKey); }; })(cross)); }
    catch (e) { out.crosses[cross] = { error: String((e && e.message) || e) }; }
    if (i < CROSSES.length - 1 && delayMs > 0) await sleep(delayMs);
  }
  return out;
}

async function fetchPage(cross, interval, size, endDate, startDate, apiKey, full) {
  var pair = toPair(cross);
  var url = ENDPOINT + '?symbol=' + encodeURIComponent(pair) +
    '&interval=' + encodeURIComponent(interval) +
    '&outputsize=' + size + '&timezone=UTC&format=JSON' +
    (endDate ? '&end_date=' + encodeURIComponent(endDate) : '') +
    (startDate ? '&start_date=' + encodeURIComponent(startDate) : '') +
    '&apikey=' + encodeURIComponent(apiKey);
  var res = await fetch(url); var text = await res.text(); var json;
  try { json = JSON.parse(text); } catch (e) { throw new Error('non-JSON: ' + text.slice(0, 140)); }
  if (json.status === 'error') { var err = new Error(json.message || 'error'); err.code = json.code; throw err; }
  var vals = (json.values || []).slice();
  vals.sort(function (a, b) { return (a.datetime || '') < (b.datetime || '') ? -1 : 1; });
  var bars = vals.map(function (v) {
    var b = { t: v.datetime, o: Number(v.open), c: Number(v.close) };
    if (full) { b.h = Number(v.high); b.l = Number(v.low); }
    return b;
  });
  return {
    symbol: cross, interval: interval, count: bars.length,
    first: bars.length ? bars[0].t : null,
    last: bars.length ? bars[bars.length - 1].t : null,
    bars: bars
  };
}

function corsHeaders() {
  return { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Content-Type': 'application/json; charset=utf-8' };
}

export default {
  async scheduled(controller, env, ctx) {
    if (isWeekend()) return;   // 03/10/2026: niente feed il sabato e la domenica
    ctx.waitUntil(computeDaily(env));
  },

  async fetch(request, env, ctx) {
    var url = new URL(request.url);
    var headers = corsHeaders();
    if (request.method === 'OPTIONS') return new Response(null, { headers: headers });

    if (url.pathname === '/run') {
      if (env.RUN_TOKEN && url.searchParams.get('token') !== env.RUN_TOKEN) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: headers });
      }
      if (isWeekend()) {   // 03/10/2026: nel fine settimana si restituisce l'ultimo feed, senza ricalcolare
        var last = await env.SEEDS.get('daily');
        return new Response(last || JSON.stringify({ error: 'weekend — no new feed' }), { headers: headers });
      }
      try {
        var out = await computeDaily(env);
        return new Response(JSON.stringify(out, null, 2), { headers: headers });
      } catch (e) {
        return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 500, headers: headers });
      }
    }

    if (url.pathname === '/history') {
      if (env.RUN_TOKEN && url.searchParams.get('token') !== env.RUN_TOKEN) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: headers });
      }
      var size = Math.min(Math.max(parseInt(url.searchParams.get('size') || '800', 10) || 800, 20), 5000);
      try {
        var hist = await computeHistory(env, size);
        return new Response(JSON.stringify(hist), { headers: headers });
      } catch (e) {
        return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 500, headers: headers });
      }
    }

    if (url.pathname === '/hourly') {
      if (env.RUN_TOKEN && url.searchParams.get('token') !== env.RUN_TOKEN) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: headers });
      }
      var hsize = Math.min(Math.max(parseInt(url.searchParams.get('size') || '5000', 10) || 5000, 100), 5000);
      var hint = url.searchParams.get('interval') || '1h';
      if (['1min', '5min', '15min', '30min', '45min', '1h', '2h', '4h'].indexOf(hint) < 0) hint = '1h';
      var hsyms = (url.searchParams.get('symbols') || '').toUpperCase().split(',')
                    .map(function (x) { return x.trim(); }).filter(Boolean);
      try {
        var hr = await computeHourly(env, hsize, hint, hsyms);
        return new Response(JSON.stringify(hr), { headers: headers });
      } catch (e) {
        return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 500, headers: headers });
      }
    }

    if (url.pathname === '/earliest') {
      if (env.RUN_TOKEN && url.searchParams.get('token') !== env.RUN_TOKEN) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: headers });
      }
      var eint = url.searchParams.get('interval') || '1h';
      if (['1min', '5min', '15min', '30min', '45min', '1h', '2h', '4h', '1day'].indexOf(eint) < 0) eint = '1h';
      try {
        var ear = await computeEarliest(env, eint);
        return new Response(JSON.stringify(ear, null, 2), { headers: headers });
      } catch (e) {
        return new Response(JSON.stringify({ error: String((e && e.message) || e) }), { status: 500, headers: headers });
      }
    }

    if (url.pathname === '/page') {
      if (env.RUN_TOKEN && url.searchParams.get('token') !== env.RUN_TOKEN) {
        return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: headers });
      }
      var psym = (url.searchParams.get('symbol') || '').toUpperCase().trim();
      if (CROSSES.indexOf(psym) < 0) {
        return new Response(JSON.stringify({ error: 'unknown symbol; expected one of ' + CROSSES.join(',') }),
                            { status: 400, headers: headers });
      }
      var pint = url.searchParams.get('interval') || '1h';
      if (['1min', '5min', '15min', '30min', '45min', '1h', '2h', '4h', '1day'].indexOf(pint) < 0) pint = '1h';
      var psize = Math.min(Math.max(parseInt(url.searchParams.get('size') || '5000', 10) || 5000, 10), 5000);
      var pend = url.searchParams.get('end') || null;
      var pstart = url.searchParams.get('start') || null;
      var pfull = url.searchParams.get('full') === '1';
      var apiKey = env.TWELVEDATA_API_KEY;
      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'Missing TWELVEDATA_API_KEY secret' }), { status: 500, headers: headers });
      }
      try {
        var pg = await fetchPage(psym, pint, psize, pend, pstart, apiKey, pfull);
        return new Response(JSON.stringify(pg), { headers: headers });
      } catch (e) {
        var msg = String((e && e.message) || e);
        var code = (e && e.code === 429) || /limit|run out|429/i.test(msg) ? 429 : 500;
        return new Response(JSON.stringify({ error: msg, code: code }), { status: code, headers: headers });
      }
    }

    var key = url.searchParams.get('date') ? 'daily:' + url.searchParams.get('date') : 'daily';
    var cached = await env.SEEDS.get(key);
    if (!cached) {
      return new Response(JSON.stringify({ error: 'no data yet — call /run once to populate, or wait for the 00:10 GMT cron' }), { status: 404, headers: headers });
    }
    return new Response(cached, { headers: headers });
  }
};

export { computeDaily, computeEarliest, fetchPage, rowFor, seedEdgeDistance, SEED_EDGE_GUARD, firstThreeSignificant, seedToBranchIndex, todayGmtDate, isWeekend, toPair, emaSeries, emaDirs, countChanges, emaRunLen, fetchDailyAll, fetchHourlyInfo, pipFactor, CROSSES, BRANCHES };
