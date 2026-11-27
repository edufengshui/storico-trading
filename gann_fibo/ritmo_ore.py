# 27/11/2026 (Edu: "Puoi vedere se trovi un numero ricorrente nel trend di 12 giorni? Cioe' se per esempio a distanze di 17 o 27
# ore c'e' un ritracciamento?"). Si cerca un RITMO IN ORE dentro il trend EMA12, sulle barre orarie (movimento dell'ora nel verso
# del trend, diviso per il campo medio giornaliero, cosi' i cross si sommano). Periodi 2020-23 | 2024-26: conta solo cio' che c'e' in tutti e due.
#  A  ora del giorno (GMT): in quali ore il prezzo va contro il trend
#  B  ore trascorse dall'inizio del trend (00:00 GMT del primo giorno col trend nuovo): c'e' un'ora in cui ritraccia?
#  C  distanza in ore fra un movimento e l'altro (autocorrelazione): dopo un'ora col trend, k ore dopo viene un'ora contro?
#  D  distanza in ore fra l'inizio di un ritracciamento e il successivo (ritracciamento = ritorno di 0,3 campi dal massimo)
import json, sys, math, datetime as dt
from collections import defaultdict
import numpy as np
H = json.load(open(sys.argv[1]))['crosses']
A = [defaultdict(list), defaultdict(list)]; B = [defaultdict(list), defaultdict(list)]
SER = [[], []]; D = [defaultdict(int), defaultdict(int)]; D07 = [defaultdict(int), defaultdict(int)]
for c in H:
    by = defaultdict(list)
    for b in H[c]: by[b['t'][:10]].append(b)
    days = [d for d in sorted(by) if dt.date.fromisoformat(d).weekday() <= 4]
    G = []
    for d in days:
        bb = sorted(by[d], key=lambda b: b['t'])
        h = {b['t'][11:13] for b in bb}
        if '00' not in h or '21' not in h: continue
        v = [x for b in bb if b['t'][11:13] <= '21' for x in (b['o'], b['c'])]
        c21 = [b for b in bb if b['t'][11:13] == '21'][0]['c']
        G.append((d, bb, max(v) - min(v), c21))
    cl = [g[3] for g in G]; ema = []
    for i, x in enumerate(cl): ema.append(x if i == 0 else ema[-1] + (2/13) * (x - ema[-1]))
    sl = [0] + [1 if ema[i] > ema[i-1] else -1 if ema[i] < ema[i-1] else 0 for i in range(1, len(G))]
    eta = 0; prev = 0; serie = [[], []]; cur = None
    for i in range(21, len(G)):
        d, bb, _, _ = G[i]; tr = sl[i-1]; atr = sum(G[j][2] for j in range(i-20, i)) / 20; per = 0 if d < '2024-01-01' else 1
        if tr != prev: eta = 0; prev = tr; ext = None; lastR = None; ore = 0
        if not tr: continue
        for b in bb:
            eta += 1; ore += 1
            r = tr * (b['c'] - b['o']) / atr
            hh = int(b['t'][11:13])
            A[per][hh].append(r)
            if eta <= 312: B[per][eta].append(r)
            SER[per].append((c, d, eta, r))
            # D: zig-zag piccolo nel verso del trend
            p = tr * b['c']
            if ext is None or p > ext[0]: ext = (p, ore); inr = False
            elif not inr and p <= ext[0] - 0.3 * atr * 1:
                inr = True
                if lastR is not None:
                    D[per][ext[1] - lastR] += 1
                lastR = ext[1]
        # fine giorno
def st(v):
    v = np.array(v); n = len(v); m = v.mean(); s = v.std() / math.sqrt(n) if n > 1 else 9
    return n, m, m / s if s else 0
print('== A. ORA DEL GIORNO (GMT): movimento medio nel verso del trend, in millesimi di campo; t = quanto e\' sicuro (oltre 2 conta)')
for hh in range(24):
    a = st(A[0][hh]); b = st(A[1][hh])
    print('ora %02d  %6d %+6.1f t %+5.1f | %6d %+6.1f t %+5.1f %s' % (hh, a[0], a[1]*1000, a[2], b[0], b[1]*1000, b[2], '  <== contro nei due periodi' if a[2] < -2 and b[2] < -2 else '  <== col trend nei due periodi' if a[2] > 2 and b[2] > 2 else ''))
print('\n== B. ORE DALL\'INIZIO DEL TREND: ore in cui il movimento e\' contro (o col) trend nei due periodi con t oltre 2')
trov = 0
for e in range(1, 313):
    if len(B[0][e]) < 200 or len(B[1][e]) < 200: continue
    a = st(B[0][e]); b = st(B[1][e])
    if (a[2] < -2 and b[2] < -2) or (a[2] > 2 and b[2] > 2):
        trov += 1; print('ora %3d dal giro  %5d %+6.1f t %+5.1f | %5d %+6.1f t %+5.1f' % (e, a[0], a[1]*1000, a[2], b[0], b[1]*1000, b[2]))
print('trovate', trov, 'su 312 ore guardate (per puro caso se ne aspettano 0-1)')
for e in (17, 27, 34, 51, 54, 81):
    a = st(B[0][e]); b = st(B[1][e]); print('  ora %3d  %+6.1f t %+5.1f | %+6.1f t %+5.1f' % (e, a[1]*1000, a[2], b[1]*1000, b[2]))
print('\n== C. AUTOCORRELAZIONE a k ore (dopo un\'ora in un verso, k ore dopo: stesso verso + / verso opposto -), in millesimi')
ac = []
for per in (0, 1):
    S = SER[per]; r = np.array([x[3] for x in S]); key = np.array([hash(x[0]) for x in S]); row = []
    for k in range(1, 121):
        ok = key[:-k] == key[k:]
        x = r[:-k][ok]; y = r[k:][ok]; row.append(np.corrcoef(x, y)[0, 1])
    ac.append(row); n = len(r)
se = 1 / math.sqrt(n)
print('casi per periodo circa', n, '; una correlazione conta sopra', round(2 * se * 1000, 1), 'millesimi')
for k in range(1, 121):
    a, b = ac[0][k-1], ac[1][k-1]
    flag = '  <==' if abs(a) > 2.5 * se and abs(b) > 2.5 * se and a * b > 0 else ''
    if flag or k in (17, 24, 27, 48, 72): print('k %3d  %+6.1f | %+6.1f %s' % (k, a*1000, b*1000, flag))
print('\n== D. ORE FRA L\'INIZIO DI UN RITRACCIAMENTO E IL SUCCESSIVO (ritorno di 0,3 campi), dentro lo stesso trend')
for per in (0, 1):
    tot = sum(D[per].values()); print('periodo', per + 1, 'ritracciamenti', tot, 'mediana', sorted([k for k, v in D[per].items() for _ in range(v)])[tot // 2])
print('distanza: quota % nei due periodi, e quanto supera la media delle distanze vicine (+-3 ore)')
for k in range(2, 80):
    q = []
    for per in (0, 1):
        tot = sum(D[per].values()); vic = [D[per].get(j, 0) for j in range(k-3, k+4) if j != k]
        q.append((100 * D[per].get(k, 0) / tot, D[per].get(k, 0) / (sum(vic) / len(vic)) if sum(vic) else 0))
    flag = '  <== picco nei due periodi' if q[0][1] > 1.25 and q[1][1] > 1.25 else ''
    if flag or k in (17, 24, 27, 48): print('%3d ore  %4.2f%% x%.2f | %4.2f%% x%.2f %s' % (k, q[0][0], q[0][1], q[1][0], q[1][1], flag))
