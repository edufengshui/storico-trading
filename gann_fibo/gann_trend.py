# 27/11/2026 (Edu: "Gann lavora su tempi lunghi. Facciamolo iniziare 12 giorni prima, quando inizia il nostro trend").
# Gli strumenti di Gann ancorati all'inizio del NOSTRO trend EMA12. Tre ancore:
#  A = estremo (minimo se trend su, massimo se giu') nei 12 giorni prima che l'EMA girasse, giorno del giro compreso
#  B = il giorno in cui l'EMA ha girato;  C = estremo degli ultimi 12 giorni
# Misura: "il mercato segue il trend" (00:00 -> 21:00 GMT), 2020-23 | 2024-26, pip a trade seguendo il trend.
import json, sys, math, datetime as dt
from collections import defaultdict
H = json.load(open(sys.argv[1]))['crosses']
pf = lambda c: 100 if c.endswith('JPY') else 10000
def giorni(c):
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    out = []
    for d in sorted(by):
        if dt.date.fromisoformat(d).weekday() > 4: continue
        bb = [b for b in by[d] if b['t'][11:13] <= '21']
        o = [b for b in bb if b['t'][11:13] == '00']; cl = [b for b in bb if b['t'][11:13] == '21']
        if not o or not cl: continue
        v = [x for b in bb for x in (b['o'], b['c'])]
        out.append(dict(d=d, o=o[0]['o'], c=cl[0]['c'], h=max(v), l=min(v)))
    return out
R = defaultdict(lambda: [[0, 0, 0.0], [0, 0, 0.0]])
def add(k, d, p):
    g = R[k][0 if d < '2024-01-01' else 1]; g[0] += 1; g[1] += p > 0; g[2] += p
def fascia(x, tagli, nomi):
    for t, n in zip(tagli, nomi):
        if x < t: return n
    return nomi[-1]
GD = [7, 9, 12, 14, 18, 21, 30, 45, 60, 90]
for c in H:
    G = giorni(c); P = pf(c); n = len(G)
    cl = [g['c'] for g in G]; hi = [g['h'] for g in G]; lo = [g['l'] for g in G]
    dates = [dt.date.fromisoformat(g['d']) for g in G]
    ema = []; k = 2 / 13
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + k * (x - ema[-1]))
    sl = [0] + [1 if ema[i] > ema[i-1] else -1 if ema[i] < ema[i-1] else 0 for i in range(1, n)]
    for i in range(60, n):
        g = G[i]; d = g['d']; O = g['o']; y = i - 1; tr = sl[y]
        if tr == 0: continue
        p = tr * (g['c'] - O) * P                      # pip seguendo il trend
        s = y
        while s > 1 and sl[s-1] == tr: s -= 1          # s = giorno del giro dell'EMA
        run = y - s + 1
        add('0 tutte le giornate: segue il trend', d, p)
        add('1 eta del trend (giorni dal giro dell\'EMA) ' + fascia(run, [3, 6, 10, 15, 22, 31], ['01-02', '03-05', '06-09', '10-14', '15-21', '22-30', '31+']), d, p)
        atr = sum(hi[j] - lo[j] for j in range(y-19, y+1)) / 20
        ext = lambda a, b: (min(range(a, b+1), key=lambda j: lo[j]) if tr > 0 else max(range(a, b+1), key=lambda j: hi[j]))
        anc = {'A (estremo nei 12 g prima del giro)': ext(max(0, s-12), s), 'B (giorno del giro)': s, 'C (estremo ultimi 12 g)': ext(y-11, y)}
        for nm, a in anc.items():
            ap = lo[a] if tr > 0 else hi[a]; t = i - a; cal = (dates[i] - dates[a]).days
            # angoli nel verso del trend
            for q, an in ((2, '2x1 ripido'), (4, '1x1'), (8, '1x2 piatto'), (16, '1x4')):
                line = ap + tr * (atr / q) * t
                ok = (O - line) * tr > 0
                add('2 ancora %s | angolo %-10s | prezzo %s' % (nm, an, 'oltre (trend forte)' if ok else 'dentro (trend debole)'), d, p)
            # giorni di Gann dall'ancora (di calendario, +-1)
            hit = any(abs(cal - x) <= 1 for x in GD)
            add('3 ancora %s | giorno di Gann (7,9,12,14,18,21,30,45,60,90) %s' % (nm, 'si' if hit else 'no'), d, p)
            add('3b ancora %s | giorni di calendario dall\'ancora %s' % (nm, fascia(cal, [7, 13, 19, 31, 46, 61], ['00-06', '07-12', '13-18', '19-30', '31-45', '46-60', '61+'])), d, p)
            # quadrato del 9: gradi percorsi dall'ancora (radice del prezzo in pip: +1 = 180 gradi)
            deg = tr * (math.sqrt(O * P) - math.sqrt(ap * P)) * 180
            add('4 ancora %s | quadrato del 9, gradi percorsi %s' % (nm, fascia(deg, [0, 45, 90, 180, 270, 360], ['sotto 0', '000-045', '045-090', '090-180', '180-270', '270-360', 'oltre 360'])), d, p)
            r = deg % 45; vic = min(r, 45 - r) if deg > 0 else 99
            if deg > 20: add('4b ancora %s | quadrato del 9, apertura %s' % (nm, 'vicina a un livello di 45 gradi (entro 5)' if vic <= 5 else 'lontana dai livelli'), d, p)
            # ritracciamento della gamba dall'ancora
            if t >= 2:
                top = max(hi[a:y+1]) if tr > 0 else min(lo[a:y+1]); leg = abs(top - ap)
                if leg > 0:
                    rr = abs(top - O) / leg
                    add('5 ancora %s | ritracciamento della gamba %s' % (nm, fascia(rr, [0.125, 1/3, 0.5, 2/3, 1], ['0 sul massimo (meno di 1/8)', '1 fra 1/8 e 1/3', '2 fra 1/3 e 1/2', '3 fra 1/2 e 2/3', '4 oltre 2/3', '5 oltre l\'ancora'])), d, p)
            # combinazione: oltre 1x2, niente giorno di Gann, ritracciamento piccolo
            if nm[0] == 'A':
                l8 = ap + tr * (atr / 8) * t; oltre = (O - l8) * tr > 0
                add('6 comb ancora A | oltre 1x2 e %s' % ('eta del trend fino a 9' if run < 10 else 'eta del trend 10+'), d, p) if oltre else None
                add('6 comb ancora A | dentro 1x2 e %s' % ('eta del trend fino a 9' if run < 10 else 'eta del trend 10+'), d, p) if not oltre else None
f = lambda g: '%5d %5.1f%% %+6.1f' % (g[0], 100 * g[1] / g[0] if g[0] else 0, g[2] / g[0] if g[0] else 0)
for k in sorted(R): print('%-92s %s | %s' % (k, f(R[k][0]), f(R[k][1])))
