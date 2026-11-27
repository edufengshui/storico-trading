import json, sys, math, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']; out = {}
for c in H:
    P = 100 if c.endswith('JPY') else 10000
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    G = []
    for d in sorted(by):
        if dt.date.fromisoformat(d).weekday() > 4: continue
        bb = [b for b in by[d] if b['t'][11:13] <= '21']
        o = [b for b in bb if b['t'][11:13] == '00']; cl = [b for b in bb if b['t'][11:13] == '21']
        if not o or not cl: continue
        v = [x for b in bb for x in (b['o'], b['c'])]; G.append((d, o[0]['o'], cl[0]['c'], max(v), min(v)))
    n = len(G); cl = [g[2] for g in G]; ema = []
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + (2/13) * (x - ema[-1]))
    sl = [0] + [1 if ema[i] > ema[i-1] else -1 if ema[i] < ema[i-1] else 0 for i in range(1, n)]
    for i in range(30, n):
        y = i - 1; tr = sl[y]
        if not tr: continue
        s = y
        while s > 1 and sl[s-1] == tr: s -= 1
        ap = G[s][4] if tr > 0 else G[s][3]; O = G[i][1]
        a2 = min(G[j][4] for j in range(max(0, s-12), s+1)) if tr > 0 else max(G[j][3] for j in range(max(0, s-12), s+1))
        out[c + G[i][0]] = dict(tr='LONG' if tr > 0 else 'SHORT', run=y - s + 1,
            degB=round(tr * (math.sqrt(O*P) - math.sqrt(ap*P)) * 180), degA=round(tr * (math.sqrt(O*P) - math.sqrt(a2*P)) * 180),
            pipB=round(tr * (O - ap) * P))
json.dump(out, open('/tmp/gann/feat.json', 'w'))
